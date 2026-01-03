import { useState, useEffect } from 'react';
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
import type { CommercialFacilityPosition, Terminal } from '@/types/api.types';
import { useToast } from '@/hooks/use-toast';

export default function FacilityConfigPage() {
    const { toast } = useToast();
    const [date, setDate] = useState<Date>(new Date(2024, 9, 18));
    const [terminal, setTerminal] = useState<Terminal>('T1');
    const [facilities, setFacilities] = useState<CommercialFacilityPosition[]>([]);

    // 초기 데이터 로드
    useEffect(() => {
        const stored = loadCommercialFacilitiesFromStorage();
        if (stored) {
            setFacilities(stored.filter((f) => f.terminal === terminal));
        } else {
            setFacilities(getCommercialFacilities(terminal));
        }
    }, [terminal]);

    // 시설 이동 핸들러
    const handleFacilityMove = (
        facilityId: string,
        newStartCoord: string,
        newEndCoord: string
    ) => {
        setFacilities((prev) =>
            prev.map((f) =>
                f.id === facilityId ? { ...f, startCoord: newStartCoord, endCoord: newEndCoord } : f
            )
        );
    };

    // 시설 추가 핸들러
    const handleAddFacility = () => {
        const newFacility: CommercialFacilityPosition = {
            id: `COMM-${Date.now()}`,
            name: `새 시설 ${facilities.length + 1}`,
            facilityType: 'commercial',
            terminal,
            startCoord: 'M2-08',
            endCoord: 'M3-09',
            color: '#9333ea',
        };
        setFacilities((prev) => [...prev, newFacility]);
        toast({
            title: '시설 추가 완료',
            description: `${newFacility.name}이(가) 추가되었습니다.`,
        });
    };

    // 저장 핸들러
    const handleSave = () => {
        // 모든 터미널의 데이터 병합
        const stored = loadCommercialFacilitiesFromStorage();
        const otherTerminalFacilities = stored
            ? stored.filter((f) => f.terminal !== terminal)
            : getCommercialFacilities().filter((f) => f.terminal !== terminal);

        const allFacilities = [...otherTerminalFacilities, ...facilities];
        saveCommercialFacilities(allFacilities);

        toast({
            title: '저장 완료',
            description: `${facilities.length}개의 시설 정보가 저장되었습니다.`,
        });
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
                    <div className="flex items-center justify-between">
                        {/* 왼쪽: 날짜 및 터미널 선택 */}
                        <div className="flex items-center gap-6">
                            {/* 날짜 선택 */}
                            <div className="flex items-center gap-3">
                                <label className="flex items-center gap-2 text-sm font-semibold">
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
                                <label className="flex items-center gap-2 text-sm font-semibold">
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

                        {/* 오른쪽: 조회 버튼 */}
                        <Button onClick={handleSearch} className="gap-2">
                            <Search className="h-4 w-4" />
                            조회
                        </Button>
                    </div>
                </Card>

                {/* 그리드 지도 */}
                <FacilityGridMap facilities={facilities} onFacilityMove={handleFacilityMove} />

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

                    <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        저장
                    </Button>

                </div>

                {/* 시설 테이블 */}
                <FacilityTable facilities={facilities} onUpdate={setFacilities} />
            </div>
        </div>
    );
}
