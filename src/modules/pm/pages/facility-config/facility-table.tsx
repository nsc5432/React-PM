import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { type CommercialFacilityPosition, FACILITY_TYPE_LABELS } from '@/types/api.types';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { useState } from 'react';
import { gridCoordToLatLng } from '@/lib/grid-utils';

interface Props {
    facilities: CommercialFacilityPosition[];
    onUpdate: (facilities: CommercialFacilityPosition[]) => void;
}

const ITEMS_PER_PAGE = 10;

export function FacilityTable({ facilities, onUpdate }: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(facilities.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentFacilities = facilities.slice(startIndex, endIndex);

    const handleDelete = (facilityId: string) => {
        onUpdate(facilities.filter((f) => f.id !== facilityId));
        // 현재 페이지가 범위를 벗어나면 조정
        if (currentFacilities.length === 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCoordinateChange = (
        facilityId: string,
        field: 'startCoord' | 'endCoord',
        value: string,
    ) => {
        onUpdate(
            facilities.map((f) => {
                if (f.id === facilityId) {
                    // startCoord 변경 시 위도/경도도 함께 업데이트
                    if (field === 'startCoord') {
                        const newLatLng = gridCoordToLatLng(value);
                        return {
                            ...f,
                            [field]: value,
                            latitude: newLatLng?.latitude ?? f.latitude,
                            longitude: newLatLng?.longitude ?? f.longitude,
                        };
                    }
                    return { ...f, [field]: value };
                }
                return f;
            }),
        );
    };

    const handleNameChange = (facilityId: string, name: string) => {
        onUpdate(facilities.map((f) => (f.id === facilityId ? { ...f, name } : f)));
    };

    const handleFieldChange = (
        facilityId: string,
        field: 'castSimulationCode' | 'adjacentFacilityCode',
        value: string,
    ) => {
        onUpdate(facilities.map((f) => (f.id === facilityId ? { ...f, [field]: value } : f)));
    };

    return (
        <Card className="p-6">
            <div className="space-y-4">
                <h2 className="text-xl font-bold">시설 목록</h2>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16 text-center">번호</TableHead>
                                <TableHead className="w-24">터미널ID</TableHead>
                                <TableHead>시설그룹</TableHead>
                                <TableHead className="w-32">시설ID코드</TableHead>
                                <TableHead className="w-32">여객시설코드</TableHead>
                                <TableHead>CAST시뮬레이션코드</TableHead>
                                <TableHead className="w-28">위치좌표(시작)</TableHead>
                                <TableHead className="w-28">위치좌표(끝)</TableHead>
                                <TableHead className="w-24">위도</TableHead>
                                <TableHead className="w-24">경도</TableHead>
                                <TableHead>사용여부</TableHead>
                                <TableHead>삭제</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {facilities.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={12}
                                        className="h-24 text-center text-gray-500"
                                    >
                                        등록된 시설이 없습니다. "추가" 버튼을 눌러 시설을
                                        등록하세요.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentFacilities.map((facility, index) => (
                                    <TableRow key={facility.id}>
                                        <TableCell className="text-center">
                                            {startIndex + index + 1}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-sm font-medium">
                                                {facility.terminal}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm">
                                                {FACILITY_TYPE_LABELS[facility.facilityType]}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={facility.name}
                                                onChange={(e) =>
                                                    handleNameChange(facility.id, e.target.value)
                                                }
                                                className="min-w-32"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={facility.adjacentFacilityCode || ''}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        facility.id,
                                                        'adjacentFacilityCode',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="8-20-1"
                                                className="font-mono w-28"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={facility.castSimulationCode || ''}
                                                onChange={(e) =>
                                                    handleFieldChange(
                                                        facility.id,
                                                        'castSimulationCode',
                                                        e.target.value,
                                                    )
                                                }
                                                className="min-w-32"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={facility.startCoord}
                                                onChange={(e) =>
                                                    handleCoordinateChange(
                                                        facility.id,
                                                        'startCoord',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="M2-05"
                                                className="font-mono w-24"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={facility.endCoord}
                                                onChange={(e) =>
                                                    handleCoordinateChange(
                                                        facility.id,
                                                        'endCoord',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="M3-07"
                                                className="font-mono w-24"
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-xs font-mono text-gray-600">
                                                {facility.latitude.toFixed(4)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-xs font-mono text-gray-600">
                                                {facility.longitude.toFixed(4)}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-sm">기준</span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(facility.id)}
                                                className="h-8 w-8"
                                            >
                                                <Trash2 className="h-4 w-4 text-red-500" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    className={
                                        currentPage === 1
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer'
                                    }
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        onClick={() => setCurrentPage(page)}
                                        isActive={currentPage === page}
                                        className="cursor-pointer"
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    className={
                                        currentPage === totalPages
                                            ? 'pointer-events-none opacity-50'
                                            : 'cursor-pointer'
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                )}
            </div>
        </Card>
    );
}
