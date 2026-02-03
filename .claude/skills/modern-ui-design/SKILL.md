# Modern UI Design Skill

이 스킬은 React-PM 프로젝트에 세련되고 모던한 UI 디자인을 적용하기 위한 가이드입니다.

## 사용법

사용자가 다음과 같이 요청할 때 이 스킬을 적용하세요:

- "디자인 개선해줘"
- "UI 예쁘게 만들어줘"
- "세련된 디자인 적용해줘"
- "모던하게 바꿔줘"

## 프로젝트 디자인 시스템

### 색상 팔레트 (HSL)

```css
/* Primary - Navy Blue */
--primary: 221 83% 53%; /* #2563EB */

/* Status Colors */
--destructive: 0 84% 60%; /* Red - 오류/위험 */
--warning: 48 96% 53%; /* Yellow - 경고 */
--success: 142 71% 45%; /* Green - 성공 */

/* Chart Colors */
--chart-1: 221 83% 53%; /* Blue */
--chart-2: 48 96% 53%; /* Yellow */
--chart-3: 0 84% 60%; /* Red */
--chart-4: 199 89% 48%; /* Cyan */
--chart-5: 280 67% 55%; /* Purple */
```

### 반경 (Border Radius)

```css
--radius: 0.5rem; /* tailwind.config.js에서 lg/md/sm 자동 계산 */
/* lg: var(--radius) = 0.5rem */
/* md: calc(var(--radius) - 2px) */
/* sm: calc(var(--radius) - 4px) */
```

## 세련된 디자인 패턴

### 1. 그림자 (Shadows)

```tsx
// 미묘한 그림자 - 카드, 버튼
className = 'shadow-sm';

// 부드러운 상승 효과
className = 'shadow-md hover:shadow-lg transition-shadow';

// 글래스모피즘 효과
className = 'bg-white/80 backdrop-blur-sm shadow-lg';

// 컬러 그림자 (Primary)
className = 'shadow-lg shadow-primary/20';
```

### 2. 그라디언트 (Gradients)

```tsx
// 기본 그라디언트 배경
className = 'bg-gradient-to-br from-primary/5 to-primary/10';

// 헤더 그라디언트
className = 'bg-gradient-to-r from-primary to-primary/80';

// 미묘한 메시 그라디언트
className =
    'bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent';

// 유리 효과 카드
className = 'bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md';
```

### 3. 애니메이션 (Animations)

```tsx
// 부드러운 호버 전환
className = 'transition-all duration-200 ease-out';

// 스케일 효과
className = 'hover:scale-[1.02] active:scale-[0.98] transition-transform';

// 페이드 인
className = 'animate-in fade-in duration-300';

// 슬라이드 업
className = 'animate-in slide-in-from-bottom-4 duration-300';

// 펄스 효과 (로딩)
className = 'animate-pulse';

// 회전 (로딩 스피너)
className = 'animate-spin';
```

### 4. 카드 스타일

```tsx
// 기본 모던 카드
<Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-card/80 backdrop-blur-sm">

// 강조 카드
<Card className="border-2 border-primary/20 shadow-lg shadow-primary/5 bg-gradient-to-br from-primary/5 to-transparent">

// 인터랙티브 카드
<Card className="group cursor-pointer border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-200">
  <div className="group-hover:translate-x-1 transition-transform">
    콘텐츠
  </div>
</Card>

// 플로팅 카드
<Card className="shadow-xl shadow-black/5 border-0 bg-white">
```

### 5. 버튼 스타일 확장

```tsx
// 그라디언트 버튼
<Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25">

// 글로우 버튼
<Button className="shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-shadow">

// 아웃라인 호버
<Button variant="outline" className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">

// 아이콘 버튼 (둥근)
<Button size="icon" className="rounded-full hover:bg-primary/10">
```

### 6. 입력 필드

```tsx
// 모던 인풋
<Input className="border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all" />

// 플로팅 라벨 효과 (수동 구현 필요)
<div className="relative">
  <Input className="peer pt-6 pb-2" placeholder=" " />
  <Label className="absolute left-3 top-4 text-muted-foreground peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary transition-all">
    라벨
  </Label>
</div>

// 검색 입력
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
  <Input className="pl-10 bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20" />
</div>
```

### 7. 테이블 스타일

```tsx
// 모던 테이블
<Table className="[&_th]:bg-muted/50 [&_th]:font-semibold [&_tr]:border-border/50 [&_tr:hover]:bg-muted/30">

// 스트라이프 테이블
<Table className="[&_tr:nth-child(even)]:bg-muted/30">

// 호버 행 강조
<TableRow className="hover:bg-primary/5 transition-colors cursor-pointer">
```

### 8. 배지 (Badge) 확장

```tsx
// 상태 배지 - Busy
<Badge className="bg-destructive/10 text-destructive border-destructive/20">혼잡</Badge>

// 상태 배지 - Warning
<Badge className="bg-warning/10 text-warning-foreground border-warning/20">주의</Badge>

// 상태 배지 - Success
<Badge className="bg-success/10 text-success border-success/20">원활</Badge>

// 펄스 배지 (실시간)
<Badge className="relative">
  <span className="absolute -top-1 -right-1 size-2 bg-success rounded-full animate-ping" />
  <span className="absolute -top-1 -right-1 size-2 bg-success rounded-full" />
  실시간
</Badge>
```

### 9. 레이아웃 패턴

```tsx
// 센터 컨테이너
<div className="container mx-auto px-4 max-w-7xl">

// 그리드 갭
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// 플렉스 센터
<div className="flex items-center justify-center min-h-100">

// 스티키 헤더
<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">

// 풀 블리드 섹션
<section className="-mx-4 px-4 py-8 bg-muted/30">
```

### 10. 타이포그래피

```tsx
// 대형 제목
<h1 className="text-3xl font-bold tracking-tight">

// 그라디언트 텍스트
<span className="bg-gradient-to-r from-primary to-chart-4 bg-clip-text text-transparent">

// 부제목
<p className="text-muted-foreground text-sm leading-relaxed">

// 강조 텍스트
<span className="font-semibold text-foreground">
```

## 컴포넌트별 디자인 가이드

### 대시보드 카드

```tsx
<Card className="overflow-hidden border-0 shadow-md">
    <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Icon className="size-5 text-primary" />
            제목
        </CardTitle>
    </CardHeader>
    <CardContent className="pt-4">{/* 콘텐츠 */}</CardContent>
</Card>
```

### KPI 카드

```tsx
<Card className="relative overflow-hidden border-0 shadow-md group hover:shadow-lg transition-shadow">
    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full" />
    <CardContent className="pt-6">
        <div className="flex items-start justify-between">
            <div>
                <p className="text-sm text-muted-foreground">대기 인원</p>
                <p className="text-3xl font-bold text-foreground mt-1">1,234</p>
                <p className="text-xs text-success flex items-center gap-1 mt-2">
                    <TrendingUp className="size-3" />
                    +12% 전일 대비
                </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-xl">
                <Users className="size-6 text-primary" />
            </div>
        </div>
    </CardContent>
</Card>
```

### 네비게이션 아이템

```tsx
<NavLink
    className={({ isActive }) =>
        cn(
            'flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200',
            isActive
                ? 'bg-primary text-primary-foreground shadow-md shadow-primary/25'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted',
        )
    }
>
    <Icon className="size-5" />
    <span>메뉴명</span>
</NavLink>
```

### 차트 컨테이너

```tsx
<Card className="border-0 shadow-md">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">시간대별 혼잡도</CardTitle>
        <Select defaultValue="today">
            <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="today">오늘</SelectItem>
                <SelectItem value="week">이번 주</SelectItem>
            </SelectContent>
        </Select>
    </CardHeader>
    <CardContent>
        <div className="h-75">{/* Chart */}</div>
    </CardContent>
</Card>
```

## 반응형 디자인

```tsx
// 모바일 우선 접근
<div className="
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
  gap-4 md:gap-6
">

// 숨김/표시
<div className="hidden md:block">데스크탑 전용</div>
<div className="md:hidden">모바일 전용</div>

// 텍스트 크기 반응형
<h1 className="text-2xl md:text-3xl lg:text-4xl">
```

## 다크 모드 고려사항

```tsx
// 다크 모드에서 다른 스타일
className = 'bg-white dark:bg-gray-900';
className = 'shadow-lg dark:shadow-none dark:border';
className = 'text-gray-900 dark:text-gray-100';
```

## 성능 최적화 팁

1. **애니메이션은 `transform`과 `opacity`만 사용** - GPU 가속 활용
2. **큰 그림자는 호버 시에만 적용** - 렌더링 부하 감소
3. **backdrop-blur는 필요한 곳에만** - 모바일 성능 고려
4. **transition은 구체적으로 지정** - `transition-all` 대신 `transition-shadow`

## 접근성 체크리스트

- [ ] 색상 대비 4.5:1 이상 유지
- [ ] 포커스 상태 명확히 표시 (`focus-visible:ring-2`)
- [ ] 호버 효과에 의존하지 않는 정보 전달
- [ ] 애니메이션 축소 선호 존중 (`motion-reduce:`)
