interface SelfCheckInBagDropEditProps {
    expanded: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export function SelfCheckInBagDropEdit({ expanded, onToggle, disabled = false }: SelfCheckInBagDropEditProps) {
    const gates = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];

    return (
        <div className="border rounded-lg bg-white">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
                <span className="font-medium">
                    셀프체크인/백드롭 수정 <span className="text-red-500">(셀프체크인 17개)</span>
                </span>
                <span>{expanded ? '∧' : '∨'}</span>
            </button>

            {expanded && (
                <div className="p-6 border-t">
                    {/* Stats */}
                    <div className="text-center mb-6">
                        <span className="font-medium text-lg">
                            전체 : 14 <span className="ml-8">운영 : 4</span>
                        </span>
                    </div>

                    {/* Kiosk and Bag Drop Views */}
                    <div className="border rounded-lg p-6 bg-gray-50 mb-6">
                        {/* Self Check-in Kiosk */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium">셀프체크인 키오스크</h3>
                                <label className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                                    <input type="checkbox" disabled={disabled} />
                                    미운영
                                </label>
                            </div>
                            <div className="h-8 bg-white rounded relative mb-2">
                                <div className="absolute inset-0 flex">
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 border-r ${
                                                i >= 6 && i < 18 ? 'bg-green-500' : 'bg-gray-200'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>04:00</span>
                                <span>10:00</span>
                                <span>20:00</span>
                                <span>02:00</span>
                            </div>
                        </div>

                        {/* Bag Drop */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium">셀프백드롭</h3>
                                <label className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                                    <input type="checkbox" disabled={disabled} />
                                    미운영
                                </label>
                            </div>
                            <div className="h-8 bg-white rounded relative mb-2">
                                <div className="absolute inset-0 flex">
                                    {Array.from({ length: 24 }, (_, i) => (
                                        <div
                                            key={i}
                                            className={`flex-1 border-r ${
                                                i >= 6 && i < 18 ? 'bg-green-500' : 'bg-gray-200'
                                            }`}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>04:00</span>
                                <span>10:00</span>
                                <span>20:00</span>
                                <span>02:00</span>
                            </div>
                        </div>
                    </div>

                    {/* Gate Selection */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {gates.map((gate) => (
                            <button
                                key={gate}
                                disabled={disabled}
                                className={`w-10 h-10 rounded ${
                                    gate === 'D' || gate === 'E'
                                        ? 'bg-blue-400 text-white'
                                        : gate === 'L'
                                          ? 'bg-blue-400 text-white'
                                          : gate === 'M'
                                            ? 'bg-blue-400 text-white'
                                            : 'bg-gray-300 text-gray-600'
                                } hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {gate}
                            </button>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button className="bg-indigo-600 text-white px-8 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>
                            현재상태 저장
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
