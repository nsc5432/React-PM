import { useState, useEffect, useRef, useCallback } from 'react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon, Building2, Search, Save, Plus, FileDown } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FacilityGridMap } from './facility-grid-map';
import { FacilityTable } from './facility-table';
import {
    getCommercialFacilities,
    saveCommercialFacilities,
    loadCommercialFacilitiesFromStorage,
} from '@/lib/mock-data';
import type { CommercialFacilityPosition, Terminal, FacilityType } from '@/types/api.types';
import { FACILITY_TYPE_LABELS, FACILITY_TYPE_COLORS } from '@/types/api.types';
import { useToast } from '@/hooks/use-toast';
import { gridCoordToLatLng, printCalibrationResults } from '@/lib/grid-utils';
import { facilityService } from '@/api/services/facility.service';

export default function FacilityConfigPage() {
    const { toast } = useToast();
    const [date, setDate] = useState<Date>(new Date(2024, 9, 18));
    const [terminal, setTerminal] = useState<Terminal>('T1');
    const [selectedFacilityType, setSelectedFacilityType] = useState<FacilityType | 'all'>('all');
    const [facilities, setFacilities] = useState<CommercialFacilityPosition[]>([]);
    const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const gridMapRef = useRef<HTMLDivElement>(null);

    const handleSelectFacility = useCallback((facilityId: string | null) => {
        setSelectedFacilityId(facilityId);
        if (facilityId && gridMapRef.current) {
            gridMapRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    // 필터링된 시설 목록
    const filteredFacilities = selectedFacilityType === 'all'
        ? facilities
        : facilities.filter((f) => f.facilityType === selectedFacilityType);

    // 초기 데이터 로드
    useEffect(() => {
        const stored = loadCommercialFacilitiesFromStorage();
        if (stored) {
            setFacilities(stored.filter((f) => f.terminal === terminal));
        } else {
            setFacilities(getCommercialFacilities(terminal));
        }
    }, [terminal]);

    // 시설 이동 핸들러 (정밀 위도/경도 또는 그리드 좌표 기반 변환)
    const handleFacilityMove = (
        facilityId: string,
        newStartCoord: string,
        newEndCoord: string,
        latitude?: number,
        longitude?: number,
    ) => {
        const newLatLng = latitude != null && longitude != null
            ? { latitude, longitude }
            : gridCoordToLatLng(newStartCoord);

        const finalLat = newLatLng?.latitude;
        const finalLng = newLatLng?.longitude;

        // UI 즉시 업데이트
        setFacilities((prev) =>
            prev.map((f) => {
                if (f.id === facilityId) {
                    return {
                        ...f,
                        startCoord: newStartCoord,
                        endCoord: newEndCoord,
                        latitude: finalLat ?? f.latitude,
                        longitude: finalLng ?? f.longitude,
                    };
                }
                return f;
            })
        );

        // API 호출 (실패 시 toast 경고, mock 모드에서는 스킵)
        if (finalLat != null && finalLng != null && import.meta.env.VITE_ENABLE_MOCK !== 'true') {
            facilityService.updatePosition(facilityId, finalLat, finalLng).catch(() => {
                toast({
                    title: '위치 서버 저장 실패',
                    description: '서버에 위치 정보를 저장하지 못했습니다. 로컬에는 반영되었습니다.',
                    variant: 'destructive',
                });
            });
        }
    };

    // 시설 추가 핸들러
    const handleAddFacility = () => {
        const facilityType = selectedFacilityType === 'all' ? 'commercial' : selectedFacilityType;
        const defaultCoord = 'M2-08';
        const defaultLatLng = gridCoordToLatLng(defaultCoord);

        const newFacility: CommercialFacilityPosition = {
            id: `${facilityType.toUpperCase()}-${Date.now()}`,
            name: `새 ${FACILITY_TYPE_LABELS[facilityType]} ${facilities.length + 1}`,
            facilityType,
            terminal,
            latitude: defaultLatLng?.latitude ?? 37.4533,
            longitude: defaultLatLng?.longitude ?? 126.4480,
            startCoord: defaultCoord,
            endCoord: 'M3-09',
            color: FACILITY_TYPE_COLORS[facilityType],
        };
        setFacilities((prev) => [...prev, newFacility]);
        toast({
            title: '시설 추가 완료',
            description: `${newFacility.name}이(가) 추가되었습니다.`,
        });
    };

    // 저장 핸들러
    const handleSave = async () => {
        if (saving) return;
        setSaving(true);
        // 모든 터미널의 데이터 병합
        const stored = loadCommercialFacilitiesFromStorage();
        const otherTerminalFacilities = stored
            ? stored.filter((f) => f.terminal !== terminal)
            : getCommercialFacilities().filter((f) => f.terminal !== terminal);

        const allFacilities = [...otherTerminalFacilities, ...facilities];

        // API 호출 시도
        if (import.meta.env.VITE_ENABLE_MOCK !== 'true') {
            try {
                await facilityService.saveBatch(
                    facilities.map((f) => ({
                        id: f.id,
                        latitude: f.latitude,
                        longitude: f.longitude,
                        startCoord: f.startCoord,
                        endCoord: f.endCoord,
                    })),
                );
            } catch {
                toast({
                    title: '서버 저장 실패',
                    description: 'localStorage에 백업 저장합니다.',
                    variant: 'destructive',
                });
            }
        }

        // localStorage에도 저장 (백업)
        saveCommercialFacilities(allFacilities);

        toast({
            title: '저장 완료',
            description: `${facilities.length}개의 시설 정보가 저장되었습니다.`,
        });
        setSaving(false);
    };

    // Excel 내보내기 핸들러
    const handleExcelExport = () => {
        const header = '번호,시설명,시작좌표,끝좌표,터미널,매출\n';
        const csvContent =
            header +
            facilities
                .map(
                    (f, idx) =>
                        `${idx + 1},${f.name},${f.startCoord},${f.endCoord},${f.terminal},${f.revenue || 0}`
                )
                .join('\n');

        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `facilities_${format(date, 'yyyyMMdd')}_${terminal}.csv`;
        a.click();
        URL.revokeObjectURL(url);

        toast({
            title: 'Excel 내보내기 완료',
            description: `${facilities.length}개의 시설 정보가 내보내기되었습니다.`,
        });
    };

    // 조회 핸들러
    const handleSearch = () => {
        const stored = loadCommercialFacilitiesFromStorage();
        if (stored) {
            setFacilities(stored.filter((f) => f.terminal === terminal));
        } else {
            setFacilities(getCommercialFacilities(terminal));
        }

        toast({
            title: '조회 완료',
            description: `${terminal} 터미널의 ${facilities.length}개 시설을 조회했습니다.`,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* 헤더 */}
                <Card className="p-6">
                    <div className="space-y-4">
                        {/* 첫 번째 줄: 날짜, 터미널, 조회 */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                {/* 날짜 선택 */}
                                <div className="flex items-center gap-3">
                                    <label className="text-sm font-semibold whitespace-nowrap">
                                        기준일자
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className="w-52 justify-start">
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {format(date, 'yyyy-MM-dd', { locale: ko })}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent align="start" className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={(d) => d && setDate(d)}
                                                locale={ko}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

                                {/* 터미널 선택 */}
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap">
                                        <Building2 className="h-4 w-4" />
                                        터미널선택
                                    </label>
                                    <div className="flex gap-2">
                                        <Button
                                            variant={terminal === 'T1' ? 'default' : 'outline'}
                                            onClick={() => setTerminal('T1')}
                                            className="w-28"
                                        >
                                            T1 터미널
                                        </Button>
                                        <Button
                                            variant={terminal === 'T2' ? 'default' : 'outline'}
                                            onClick={() => setTerminal('T2')}
                                            className="w-28"
                                        >
                                            T2 터미널
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* 조회 버튼 */}
                            <Button onClick={handleSearch} className="gap-2">
                                <Search className="h-4 w-4" />
                                조회
                            </Button>
                        </div>

                        {/* 두 번째 줄: 시설 타입 필터 */}
                        <div className="flex items-center gap-3">
                            <label className="text-sm font-semibold whitespace-nowrap">시설유형</label>
                            <div className="flex gap-2 flex-wrap">
                                <Button
                                    variant={selectedFacilityType === 'all' ? 'default' : 'outline'}
                                    onClick={() => setSelectedFacilityType('all')}
                                    size="sm"
                                >
                                    전체
                                </Button>
                                {(Object.keys(FACILITY_TYPE_LABELS) as FacilityType[]).map((type) => (
                                    <Button
                                        key={type}
                                        variant={selectedFacilityType === type ? 'default' : 'outline'}
                                        onClick={() => setSelectedFacilityType(type)}
                                        size="sm"
                                    >
                                        {FACILITY_TYPE_LABELS[type]}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 그리드 지도 */}
                <div ref={gridMapRef}>
                    <FacilityGridMap facilities={filteredFacilities} selectedFacilityId={selectedFacilityId} onFacilityMove={handleFacilityMove} />
                </div>

                {/* 액션 버튼 */}
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={handleAddFacility} className="gap-2">
                        <Plus className="h-4 w-4" />
                        추가
                    </Button>
                    <Button variant="outline" onClick={handleExcelExport} className="gap-2">
                        <FileDown className="h-4 w-4" />
                        엑셀저장
                    </Button>

                    <Button onClick={handleSave} disabled={saving} className="gap-2">
                        <Save className="h-4 w-4" />
                        {saving ? '저장 중...' : '저장'}
                    </Button>
                    {import.meta.env.DEV && (
                        <Button variant="outline" onClick={printCalibrationResults}>
                            좌표 검증
                        </Button>
                    )}
                </div>

                {/* 시설 테이블 */}
                <FacilityTable
                    facilities={filteredFacilities}
                    selectedFacilityId={selectedFacilityId}
                    onDeleteFacility={(id) => setFacilities((prev) => prev.filter((f) => f.id !== id))}
                    onUpdateFacility={(id, updates) => setFacilities((prev) => prev.map((f) => f.id === id ? { ...f, ...updates } : f))}
                    onSelectFacility={handleSelectFacility}
                />
            </div>
        </div>
    );
}
