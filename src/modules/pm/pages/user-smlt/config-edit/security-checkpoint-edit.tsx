import { ConfirmDialog } from '@/components/ui/confirm-dialog';

interface SecurityCheckpointEditProps {
    expanded: boolean;
    onToggle: () => void;
    disabled?: boolean;
}

export function SecurityCheckpointEdit({ expanded, onToggle, disabled = false }: SecurityCheckpointEditProps) {
    const tableData = [
        { selected: false, time: '00 시 00 분 ~ 00 시 00 분', count: '개' },
        { selected: false, time: '08 시 00 분 ~ 20 시 00 분', count: '4 개' },
        { selected: false, time: '06 시 00 분 ~ 22 시 00 분', count: '6 개' },
        { selected: false, time: '07 시 00 분 ~ 20 시 00 분', count: '8 개' },
        { selected: false, time: '05 시 00 분 ~ 20 시 00 분', count: '2 개' },
    ];

    return (
        <div className="border rounded-lg bg-white">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
            >
                <span className="font-medium">
                    보안검색대 수정 <span className="text-red-500">(4 개)</span>
                </span>
                <span>{expanded ? '∧' : '∨'}</span>
            </button>

            {expanded && (
                <div className="p-6 border-t">
                    {/* Title */}
                    <div className="text-center mb-6">
                        <h3 className="text-lg font-medium">4번 출국장 10개 보안검색대 운영예정</h3>
                    </div>

                    {/* Table */}
                    <div className="border rounded-lg overflow-hidden mb-6">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-blue-100">
                                    <th className="border px-4 py-3 w-20">선택</th>
                                    <th className="border px-4 py-3">운영시간</th>
                                    <th className="border px-4 py-3 w-32">갯수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((row, idx) => (
                                    <tr
                                        key={idx}
                                        className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
                                    >
                                        <td className="border px-4 py-3 text-center">
                                            <input
                                                type="checkbox"
                                                checked={row.selected}
                                                disabled={disabled}
                                                readOnly
                                            />
                                        </td>
                                        <td className="border px-4 py-3">
                                            <div className="flex items-center justify-center gap-2">
                                                {row.time.split(' ').map((part, i) => {
                                                    if (part.match(/\d+/)) {
                                                        return (
                                                            <input
                                                                key={i}
                                                                type="text"
                                                                value={part}
                                                                className="border rounded px-2 py-1 w-12 text-center bg-blue-100"
                                                                disabled={disabled}
                                                                readOnly
                                                            />
                                                        );
                                                    }
                                                    return (
                                                        <span key={i} className="text-sm">
                                                            {part}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </td>
                                        <td className="border px-4 py-3 text-center">
                                            {row.count}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button className="bg-blue-400 text-white px-6 py-2 rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>
                            추가
                        </button>
                        <button className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>
                            삭제
                        </button>
                    </div>

                    {/* Gate Selection Buttons */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        {['1출국장', '2출국장', '3출국장', '4출국장', '5출국장', '6출국장'].map(
                            (gate, idx) => (
                                <button
                                    key={gate}
                                    disabled={disabled}
                                    className={`px-6 py-2 rounded ${
                                        idx === 3
                                            ? 'bg-red-500 text-white'
                                            : 'bg-blue-400 text-white hover:bg-blue-500'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {gate}
                                </button>
                            ),
                        )}
                    </div>

                    <div className="flex justify-center">
                        <ConfirmDialog
                            trigger={
                                <button className="bg-indigo-600 text-white px-8 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled}>
                                    현재상태 저장
                                </button>
                            }
                            title="저장 확인"
                            description="현재 상태를 저장하시겠습니까?"
                            confirmText="저장"
                            cancelText="취소"
                            onConfirm={() => {
                                // TODO: 실제 저장 로직 구현
                                console.log('저장됨');
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
