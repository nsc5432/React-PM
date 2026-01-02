interface CheckInCounterEditProps {
  expanded: boolean;
  onToggle: () => void;
}

export function CheckInCounterEdit({ expanded, onToggle }: CheckInCounterEditProps) {
  const counters = Array.from({ length: 18 }, (_, i) => i + 1);
  const airlines = ['OZ', 'KE'];

  return (
    <div className="border rounded-lg bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50"
      >
        <span className="font-medium">
          체크인카운터 수정 <span className="text-red-500">(A, B, C, D)</span>
        </span>
        <span>{expanded ? '∧' : '∨'}</span>
      </button>

      {expanded && (
        <div className="p-6 border-t">
          {/* Stats */}
          <div className="text-center mb-6">
            <span className="font-medium text-lg">
              전체 : 14 <span className="ml-8">운영 : 8</span>
            </span>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-4 mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              미운영
            </label>
            <input
              type="number"
              defaultValue="08"
              className="border rounded px-3 py-1 w-16"
            />
            <span>시</span>
            <input
              type="number"
              defaultValue="00"
              className="border rounded px-3 py-1 w-16"
            />
            <span>분</span>
            <span className="mx-2">~</span>
            <input
              type="number"
              defaultValue="20"
              className="border rounded px-3 py-1 w-16"
            />
            <span>시</span>
            <input
              type="number"
              defaultValue="00"
              className="border rounded px-3 py-1 w-16"
            />
            <span>분</span>
            <select className="border rounded px-3 py-1 ml-4">
              <option>OZ</option>
              <option>KE</option>
            </select>
            <button className="bg-indigo-600 text-white px-6 py-1 rounded hover:bg-indigo-700">
              설정
            </button>
          </div>

          {/* Counter Grid */}
          <div className="border rounded-lg p-6 bg-gray-50 mb-6">
            <h3 className="text-center font-medium mb-4">체크인카운터 N</h3>
            <div className="mb-4">
              <div className="grid grid-cols-18 gap-1 mb-2">
                <div className="col-span-1 text-center text-sm font-medium">항공사</div>
                {airlines.map((airline, idx) => (
                  <div key={idx} className="col-span-1 text-center text-sm font-medium">
                    {airline}
                  </div>
                ))}
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="col-span-1 text-center text-sm font-medium">
                    {airlines[i % 2]}
                  </div>
                ))}
                {airlines.map((airline, idx) => (
                  <div key={idx + 10} className="col-span-1 text-center text-sm font-medium">
                    {airline === 'OZ' ? 'KE' : airline}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-18 gap-1 mb-2">
                <div className="col-span-1 text-center text-sm font-medium">번호</div>
                {counters.map((num) => (
                  <div key={num} className="col-span-1 text-center text-sm">
                    {num}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-18 gap-1 mb-2">
                <div className="col-span-1 text-center text-sm font-medium">항공사</div>
                {counters.map((num) => (
                  <div
                    key={num}
                    className={`col-span-1 h-8 ${
                      num === 6 ? 'bg-green-400' : num >= 12 && num <= 18 ? 'bg-gray-300' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-4 text-xs mb-6">
              <span>04:00</span>
              <span>12:00</span>
              <span>24:00</span>
            </div>
          </div>

          {/* Gate Selection */}
          <div className="flex items-center justify-center gap-2 mb-6">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'].map(
              (gate) => (
                <button
                  key={gate}
                  className={`w-10 h-10 rounded ${
                    gate === 'N'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-400 text-white hover:bg-blue-500'
                  }`}
                >
                  {gate}
                </button>
              )
            )}
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
