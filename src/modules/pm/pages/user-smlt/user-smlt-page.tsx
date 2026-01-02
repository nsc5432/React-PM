import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FlightPassengerEdit } from './flight-passenger-edit';
import { CheckInCounterEdit } from './check-in-counter-edit';
import { SelfCheckInBagDropEdit } from './self-checkin-bagdrop-edit';
import { DepartureGateEdit } from './departure-gate-edit';
import { SecurityCheckpointEdit } from './security-checkpoint-edit';

export default function UserSmltPage() {
    const navigate = useNavigate();
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
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <label className="font-medium">기준일자</label>
                        <select className="border rounded px-3 py-1">
                            <option>2024-10-18</option>
                        </select>
                        <div className="flex items-center gap-2 ml-8">
                            <label className="font-medium">터미널선택</label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="terminal" value="T1" />
                                T1 터미널
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="radio" name="terminal" value="T2" defaultChecked />
                                T2 터미널
                            </label>
                        </div>
                    </div>
                    <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded hover:bg-indigo-200">
                        불러오기
                    </button>
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
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => navigate('/pm/monitoring')}
                        className="bg-black text-white px-12 py-3 text-lg font-medium hover:bg-gray-800"
                    >
                        시뮬레이션 수행
                    </button>
                </div>
            </div>
        </div>
    );
}
