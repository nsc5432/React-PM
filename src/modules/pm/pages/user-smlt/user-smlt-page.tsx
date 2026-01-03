import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Calendar as CalendarIcon, Building2, Download, Play } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FlightPassengerEdit } from './flight-passenger-edit';
import { CheckInCounterEdit } from './check-in-counter-edit';
import { SelfCheckInBagDropEdit } from './self-checkin-bagdrop-edit';
import { DepartureGateEdit } from './departure-gate-edit';
import { SecurityCheckpointEdit } from './security-checkpoint-edit';

export default function UserSmltPage() {
    const navigate = useNavigate();
    const [date, setDate] = useState<Date>(new Date(2024, 9, 18)); // 2024-10-18
    const [expandedSections, setExpandedSections] = useState({
        flightPassenger: false,
        checkInCounter: false,
        selfCheckInBagDrop: false,
        departureGate: false,
        securityCheckpoint: false,
    });

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto space-y-4">
                {/* Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            {/* 기준일자 */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <CalendarIcon className="w-4 h-4" />
                                    <label className="font-semibold text-sm">기준일자</label>
                                </div>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="justify-start text-left font-normal text-sm border-gray-300 hover:border-indigo-400 hover:bg-white px-4 py-2 h-auto"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, 'yyyy-MM-dd', { locale: ko }) : '날짜 선택'}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={date} onSelect={(newDate) => newDate && setDate(newDate)} />
                                    </PopoverContent>
                                </Popover>
                            </div>

                            {/* 터미널 선택 */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Building2 className="w-4 h-4" />
                                    <label className="font-semibold text-sm">터미널 선택</label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-700">
                                        <input type="radio" name="terminal" value="T1" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                                        <span className="text-sm font-medium">T1 터미널</span>
                                    </label>
                                    <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-500 has-[:checked]:text-indigo-700">
                                        <input type="radio" name="terminal" value="T2" defaultChecked className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                                        <span className="text-sm font-medium">T2 터미널</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* 불러오기 버튼 */}
                        <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm font-medium text-sm">
                            <Download className="w-4 h-4" />
                            불러오기
                        </button>
                    </div>
                </div>

                {/* Flight Passenger Edit Section */}
                <FlightPassengerEdit
                    expanded={expandedSections.flightPassenger}
                    onToggle={() => toggleSection('flightPassenger')}
                />

                {/* Check-in Counter Edit Section */}
                <CheckInCounterEdit
                    expanded={expandedSections.checkInCounter}
                    onToggle={() => toggleSection('checkInCounter')}
                />

                {/* Self Check-in/Bag Drop Edit Section */}
                <SelfCheckInBagDropEdit
                    expanded={expandedSections.selfCheckInBagDrop}
                    onToggle={() => toggleSection('selfCheckInBagDrop')}
                />

                {/* Departure Gate Edit Section */}
                <DepartureGateEdit
                    expanded={expandedSections.departureGate}
                    onToggle={() => toggleSection('departureGate')}
                />

                {/* Security Checkpoint Edit Section */}
                <SecurityCheckpointEdit
                    expanded={expandedSections.securityCheckpoint}
                    onToggle={() => toggleSection('securityCheckpoint')}
                />

                {/* Submit Button */}
                <div className="flex justify-center pt-6">
                    <button
                        onClick={() => navigate('/pm/monitoring')}
                        className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-16 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 active:scale-[0.98] transition-all duration-200"
                    >
                        <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        시뮬레이션 수행
                        <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                    </button>
                </div>
            </div>
        </div>
    );
}
