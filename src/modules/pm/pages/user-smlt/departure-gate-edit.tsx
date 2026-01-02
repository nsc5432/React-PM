interface DepartureGateEditProps {
  expanded: boolean;
  onToggle: () => void;
}

export function DepartureGateEdit({ expanded, onToggle }: DepartureGateEditProps) {

  return (
    <div className="border rounded-lg bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
      >
        <span className="font-medium">
          출국장 수정 <span className="text-red-500">(1, 2, 3)</span>
        </span>
        <span>{expanded ? '∧' : '∨'}</span>
      </button>

      {expanded && (
        <div className="p-6 border-t">
          {/* Stats */}
          <div className="text-center mb-6">
            <span className="font-medium text-lg">
              전체 : 6 <span className="ml-8">운영 : 4</span>
            </span>
          </div>

          {/* Gate Timeline Visualizations */}
          <div className="border rounded-lg p-6 bg-gray-50 mb-6 space-y-6">
            {/* Gate 1 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">출국장 1</h3>
                <select className="border rounded px-3 py-1 text-sm">
                  <option>사용</option>
                  <option>미사용</option>
                </select>
              </div>
              <div className="h-8 bg-white rounded relative mb-2">
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className={`flex-1 border-r ${
                        i >= 5 && i < 17 ? 'bg-green-500' : 'bg-gray-200'
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

            {/* Gate 2 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">출국장 2</h3>
                <select className="border rounded px-3 py-1 text-sm">
                  <option>미사용</option>
                  <option>사용</option>
                </select>
              </div>
              <div className="h-8 bg-white rounded relative mb-2">
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className={`flex-1 border-r ${
                        i >= 5 && i < 17 ? 'bg-green-500' : 'bg-gray-200'
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

            {/* Dots indicating more gates */}
            <div className="text-center text-gray-400">•<br />•<br />•</div>

            {/* Gate 6 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">출국장 6</h3>
                <select className="border rounded px-3 py-1 text-sm">
                  <option>사용</option>
                  <option>미사용</option>
                </select>
              </div>
              <div className="h-8 bg-white rounded relative mb-2">
                <div className="absolute inset-0 flex">
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className={`flex-1 border-r ${
                        i >= 5 && i < 17 ? 'bg-green-500' : 'bg-gray-200'
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

          <div className="flex justify-center">
            <button className="bg-indigo-600 text-white px-8 py-2 rounded hover:bg-indigo-700">
              현재상태 저장
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
