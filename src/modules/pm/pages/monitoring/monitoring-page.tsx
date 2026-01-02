import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle2, Clock, PlayCircle, Loader2 } from 'lucide-react';

interface SimulationHistory {
    id: string;
    userName: string;
    department: string;
    startTime: string;
    endTime?: string;
    status: 'completed' | 'running' | 'pending';
}

type SimulationStep =
    | 'initialization'
    | 'data-loading'
    | 'passenger-processing'
    | 'counter-simulation'
    | 'gate-simulation'
    | 'analysis'
    | 'completed';

interface StepInfo {
    id: SimulationStep;
    label: string;
    progress: number;
}

const steps: StepInfo[] = [
    { id: 'initialization', label: '초기화', progress: 0 },
    { id: 'data-loading', label: '데이터 로딩', progress: 10 },
    { id: 'passenger-processing', label: '승객 데이터 처리', progress: 30 },
    { id: 'counter-simulation', label: '체크인 카운터 시뮬레이션', progress: 50 },
    { id: 'gate-simulation', label: '출국장 시뮬레이션', progress: 70 },
    { id: 'analysis', label: '결과 분석', progress: 90 },
    { id: 'completed', label: '완료', progress: 100 },
];

export default function MonitoringPage() {
    const [currentStep, setCurrentStep] = useState<SimulationStep>('counter-simulation');
    const [progress, setProgress] = useState(52);
    const [baseDate] = useState('2024-10-18');

    // Mock simulation history data
    const [historyData] = useState<SimulationHistory[]>([
        {
            id: '1',
            userName: '김철수',
            department: '공항운영팀',
            startTime: '2024-10-18 09:30:15',
            endTime: '2024-10-18 09:45:22',
            status: 'completed',
        },
        {
            id: '2',
            userName: '이영희',
            department: '시설관리팀',
            startTime: '2024-10-18 10:15:30',
            endTime: '2024-10-18 10:28:45',
            status: 'completed',
        },
        {
            id: '3',
            userName: '박민수',
            department: '보안운영팀',
            startTime: '2024-10-18 11:20:10',
            status: 'running',
        },
        {
            id: '4',
            userName: '정수진',
            department: '여객서비스팀',
            startTime: '2024-10-18 13:45:00',
            endTime: '2024-10-18 14:02:18',
            status: 'completed',
        },
        {
            id: '5',
            userName: '최동욱',
            department: '공항정보팀',
            startTime: '2024-10-18 14:30:25',
            endTime: '2024-10-18 14:47:55',
            status: 'completed',
        },
    ]);

    // Simulate progress animation
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100;
                return prev + 0.5;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getCurrentStepIndex = () => {
        return steps.findIndex((step) => step.id === currentStep);
    };

    const getStepStatus = (stepIndex: number) => {
        const currentIndex = getCurrentStepIndex();
        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'current';
        return 'pending';
    };

    const getStatusBadge = (status: SimulationHistory['status']) => {
        switch (status) {
            case 'completed':
                return (
                    <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        완료
                    </Badge>
                );
            case 'running':
                return (
                    <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        진행중
                    </Badge>
                );
            case 'pending':
                return (
                    <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        대기중
                    </Badge>
                );
        }
    };

    const calculateDuration = (startTime: string, endTime?: string) => {
        if (!endTime) return '-';
        const start = new Date(startTime);
        const end = new Date(endTime);
        const diffMs = end.getTime() - start.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);
        return `${diffMins}분 ${diffSecs}초`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">시뮬레이션 모니터링</h1>
                        <p className="text-slate-600 mt-1">실시간 시뮬레이션 진행 상황을 확인하세요</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm bg-white px-4 py-2 rounded-lg shadow-sm border">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="font-medium text-slate-700">기준일자:</span>
                        <span className="font-semibold text-slate-900">{baseDate}</span>
                    </div>
                </div>

                {/* Current Simulation Progress */}
                <Card className="border-2 shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <PlayCircle className="w-6 h-6 text-blue-600" />
                                    현재 진행중인 시뮬레이션
                                </CardTitle>
                                <CardDescription className="mt-1">
                                    박민수 (보안운영팀) - 시작 시간: 11:20:10
                                </CardDescription>
                            </div>
                            <div className="text-right">
                                <div className="text-4xl font-bold text-blue-600">{progress.toFixed(1)}%</div>
                                <div className="text-sm text-slate-600">전체 진척률</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        {/* Progress Bar */}
                        <div className="space-y-2 mb-8">
                            <Progress value={progress} className="h-3" />
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>시작</span>
                                <span className="font-medium text-blue-600">
                                    {steps[getCurrentStepIndex()]?.label || '진행중'}
                                </span>
                                <span>완료</span>
                            </div>
                        </div>

                        {/* Step Timeline */}
                        <div className="grid grid-cols-7 gap-2">
                            {steps.map((step, index) => {
                                const status = getStepStatus(index);
                                return (
                                    <div key={step.id} className="flex flex-col items-center">
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm mb-2 transition-all ${
                                                status === 'completed'
                                                    ? 'bg-green-500 text-white shadow-lg'
                                                    : status === 'current'
                                                      ? 'bg-blue-500 text-white shadow-lg ring-4 ring-blue-200 animate-pulse'
                                                      : 'bg-slate-200 text-slate-500'
                                            }`}
                                        >
                                            {status === 'completed' ? (
                                                <CheckCircle2 className="w-6 h-6" />
                                            ) : (
                                                <span>{index + 1}</span>
                                            )}
                                        </div>
                                        <div
                                            className={`text-xs text-center font-medium ${
                                                status === 'current'
                                                    ? 'text-blue-600'
                                                    : status === 'completed'
                                                      ? 'text-green-600'
                                                      : 'text-slate-500'
                                            }`}
                                        >
                                            {step.label}
                                        </div>
                                        {status === 'current' && (
                                            <div className="text-xs text-blue-600 font-semibold mt-1">
                                                {step.progress}%
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Simulation History */}
                <Card className="shadow-lg">
                    <CardHeader className="bg-slate-50">
                        <CardTitle className="text-xl">시뮬레이션 수행 이력</CardTitle>
                        <CardDescription>
                            {baseDate} 기준으로 수행된 모든 시뮬레이션 내역
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50">
                                    <TableHead className="font-semibold w-16 text-center">번호</TableHead>
                                    <TableHead className="font-semibold">성명</TableHead>
                                    <TableHead className="font-semibold">부서</TableHead>
                                    <TableHead className="font-semibold">시작 시간</TableHead>
                                    <TableHead className="font-semibold">종료 시간</TableHead>
                                    <TableHead className="font-semibold">소요 시간</TableHead>
                                    <TableHead className="font-semibold text-center">상태</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {historyData.map((item, index) => (
                                    <TableRow
                                        key={item.id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <TableCell className="text-center font-medium text-slate-600">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell className="font-medium">{item.userName}</TableCell>
                                        <TableCell className="text-slate-600">
                                            {item.department}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {item.startTime}
                                        </TableCell>
                                        <TableCell className="font-mono text-sm">
                                            {item.endTime || '-'}
                                        </TableCell>
                                        <TableCell className="text-slate-600">
                                            {calculateDuration(item.startTime, item.endTime)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {getStatusBadge(item.status)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Statistics Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                            <CardDescription>총 시뮬레이션 수행 횟수</CardDescription>
                            <CardTitle className="text-3xl font-bold text-blue-600">
                                {historyData.length}회
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                            <CardDescription>완료된 시뮬레이션</CardDescription>
                            <CardTitle className="text-3xl font-bold text-green-600">
                                {historyData.filter((h) => h.status === 'completed').length}회
                            </CardTitle>
                        </CardHeader>
                    </Card>
                    <Card className="shadow-md hover:shadow-lg transition-shadow">
                        <CardHeader className="pb-3">
                            <CardDescription>평균 소요 시간</CardDescription>
                            <CardTitle className="text-3xl font-bold text-purple-600">
                                14분 28초
                            </CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}
