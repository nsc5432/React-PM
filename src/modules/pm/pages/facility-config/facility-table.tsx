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
import { CommercialFacilityPosition } from '@/types/api.types';

interface Props {
    facilities: CommercialFacilityPosition[];
    onUpdate: (facilities: CommercialFacilityPosition[]) => void;
}

export function FacilityTable({ facilities, onUpdate }: Props) {
    const handleDelete = (facilityId: string) => {
        onUpdate(facilities.filter((f) => f.id !== facilityId));
    };

    const handleCoordinateChange = (
        facilityId: string,
        field: 'startCoord' | 'endCoord',
        value: string
    ) => {
        onUpdate(facilities.map((f) => (f.id === facilityId ? { ...f, [field]: value } : f)));
    };

    const handleNameChange = (facilityId: string, name: string) => {
        onUpdate(facilities.map((f) => (f.id === facilityId ? { ...f, name } : f)));
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
                                <TableHead>시설명</TableHead>
                                <TableHead className="w-32">위치좌표(시작)</TableHead>
                                <TableHead className="w-32">위치좌표(끝)</TableHead>
                                <TableHead className="w-24 text-center">터미널</TableHead>
                                <TableHead className="w-20 text-center">삭제</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {facilities.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-gray-500">
                                        등록된 시설이 없습니다. "추가" 버튼을 눌러 시설을 등록하세요.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                facilities.map((facility, index) => (
                                    <TableRow key={facility.id}>
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        <TableCell>
                                            <Input
                                                value={facility.name}
                                                onChange={(e) =>
                                                    handleNameChange(facility.id, e.target.value)
                                                }
                                                className="min-w-40"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={facility.startCoord}
                                                onChange={(e) =>
                                                    handleCoordinateChange(
                                                        facility.id,
                                                        'startCoord',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="M2-05"
                                                className="font-mono"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={facility.endCoord}
                                                onChange={(e) =>
                                                    handleCoordinateChange(
                                                        facility.id,
                                                        'endCoord',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="M3-07"
                                                className="font-mono"
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className="text-sm font-medium">
                                                {facility.terminal}
                                            </span>
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
            </div>
        </Card>
    );
}
