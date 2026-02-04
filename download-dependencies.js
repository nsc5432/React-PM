#!/usr/bin/env node

/**
 * package-lock.json에서 특정 키워드가 포함된 라이브러리들의 tgz 파일을 다운로드하는 스크립트
 *
 * 사용법:
 *   node download-dependencies.js <키워드>
 *   예: node download-dependencies.js postcss
 */

import fs from 'fs';
import https from 'https';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// ES Module에서 __dirname 대체
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 커맨드라인 인자 파싱
const keyword = process.argv[2];

if (!keyword) {
  console.error('❌ 에러: 키워드를 입력해주세요.');
  console.log('사용법: node download-dependencies.js <키워드>');
  console.log('예시: node download-dependencies.js postcss');
  process.exit(1);
}

// package-lock.json 파일 읽기
const packageLockPath = path.join(__dirname, 'package-lock.json');

if (!fs.existsSync(packageLockPath)) {
  console.error('❌ 에러: package-lock.json 파일을 찾을 수 없습니다.');
  process.exit(1);
}

console.log(`🔍 키워드 "${keyword}"로 검색 중...`);
console.log('');

const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf-8'));
const packages = packageLock.packages || {};

// 패키지명으로 패키지 정보 찾기
function findPackageInfo(packageName) {
  const packagePath = `node_modules/${packageName}`;
  return packages[packagePath];
}

// 재귀적으로 의존성 수집
function collectDependencies(packageName, collected = new Set()) {
  // 이미 처리한 패키지는 스킵 (순환 참조 방지)
  if (collected.has(packageName)) {
    return;
  }

  const packageInfo = findPackageInfo(packageName);
  if (!packageInfo) {
    return;
  }

  collected.add(packageName);

  // dependencies 재귀 탐색
  if (packageInfo.dependencies) {
    for (const depName of Object.keys(packageInfo.dependencies)) {
      collectDependencies(depName, collected);
    }
  }

  // optionalDependencies 탐색 (있는 경우)
  if (packageInfo.optionalDependencies) {
    for (const depName of Object.keys(packageInfo.optionalDependencies)) {
      collectDependencies(depName, collected);
    }
  }

  return collected;
}

// 1단계: 키워드가 포함된 직접 매칭 패키지 찾기
const directMatches = [];

for (const [packagePath, packageInfo] of Object.entries(packages)) {
  if (!packagePath) continue; // 루트 패키지 스킵

  // node_modules/ 제거하여 패키지명 추출
  const packageName = packagePath.replace(/^node_modules\//, '');

  // 키워드가 패키지명에 포함되어 있는지 확인
  if (packageName.toLowerCase().includes(keyword.toLowerCase())) {
    directMatches.push(packageName);
  }
}

console.log(`📌 키워드와 직접 매칭된 패키지: ${directMatches.length}개`);
directMatches.forEach((name, index) => {
  console.log(`   ${index + 1}. ${name}`);
});
console.log('');

// 2단계: 각 매칭 패키지의 의존성 재귀 수집
const allDependencies = new Set();

for (const packageName of directMatches) {
  const deps = collectDependencies(packageName);
  if (deps) {
    deps.forEach(dep => allDependencies.add(dep));
  }
}

console.log(`📦 의존성 포함 총 패키지: ${allDependencies.size}개`);
console.log('');

// 3단계: 다운로드 목록 생성
const matchedPackages = [];

for (const packageName of allDependencies) {
  const packageInfo = findPackageInfo(packageName);
  if (packageInfo && packageInfo.resolved) {
    matchedPackages.push({
      name: packageName,
      version: packageInfo.version,
      url: packageInfo.resolved,
      integrity: packageInfo.integrity,
      isDirect: directMatches.includes(packageName)
    });
  }
}

// 정렬: 직접 매칭 패키지를 먼저, 그 다음 의존성 패키지
matchedPackages.sort((a, b) => {
  if (a.isDirect && !b.isDirect) return -1;
  if (!a.isDirect && b.isDirect) return 1;
  return a.name.localeCompare(b.name);
});

if (matchedPackages.length === 0) {
  console.log(`⚠️  키워드 "${keyword}"와 일치하는 패키지를 찾을 수 없습니다.`);
  process.exit(0);
}

console.log(`✅ 다운로드할 패키지: ${matchedPackages.length}개`);
console.log('');
console.log('📋 직접 매칭된 패키지:');
matchedPackages.filter(pkg => pkg.isDirect).forEach((pkg, index) => {
  console.log(`   ${index + 1}. ${pkg.name}@${pkg.version}`);
});
console.log('');
console.log('🔗 의존성 패키지:');
const dependencies = matchedPackages.filter(pkg => !pkg.isDirect);
if (dependencies.length > 0) {
  dependencies.forEach((pkg, index) => {
    console.log(`   ${index + 1}. ${pkg.name}@${pkg.version}`);
  });
} else {
  console.log('   (없음)');
}
console.log('');

// 다운로드 디렉토리 생성
const downloadDir = path.join(__dirname, 'tarballs', keyword);
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

console.log(`📦 다운로드 위치: ${downloadDir}`);
console.log('');

// 파일 다운로드 함수
function downloadFile(url, destination) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const protocol = urlObj.protocol === 'https:' ? https : http;

    const file = fs.createWriteStream(destination);

    protocol.get(url, (response) => {
      // 리다이렉트 처리
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(destination);
        return downloadFile(response.headers.location, destination)
          .then(resolve)
          .catch(reject);
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destination);
        return reject(new Error(`Failed to download: ${response.statusCode}`));
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      file.close();
      fs.unlinkSync(destination);
      reject(err);
    });
  });
}

// 모든 패키지 다운로드
async function downloadAll() {
  let successCount = 0;
  let failCount = 0;

  for (const [index, pkg] of matchedPackages.entries()) {
    const fileName = `${pkg.name.replace(/\//g, '-')}-${pkg.version}.tgz`;
    const filePath = path.join(downloadDir, fileName);

    try {
      // 이미 다운로드된 파일이 있는지 확인
      if (fs.existsSync(filePath)) {
        console.log(`⏭️  [${index + 1}/${matchedPackages.length}] ${pkg.name}@${pkg.version} - 이미 존재함`);
        successCount++;
        continue;
      }

      console.log(`⬇️  [${index + 1}/${matchedPackages.length}] ${pkg.name}@${pkg.version} 다운로드 중...`);
      await downloadFile(pkg.url, filePath);
      console.log(`✅ [${index + 1}/${matchedPackages.length}] ${pkg.name}@${pkg.version} - 완료`);
      successCount++;
    } catch (error) {
      console.error(`❌ [${index + 1}/${matchedPackages.length}] ${pkg.name}@${pkg.version} - 실패: ${error.message}`);
      failCount++;
    }
  }

  console.log('');
  console.log('========================================');
  console.log('📊 다운로드 결과:');
  console.log(`   ✅ 성공: ${successCount}개`);
  console.log(`   ❌ 실패: ${failCount}개`);
  console.log(`   📁 저장 위치: ${downloadDir}`);
  console.log('========================================');
}

// 다운로드 시작
downloadAll().catch((error) => {
  console.error('❌ 예상치 못한 에러:', error);
  process.exit(1);
});
