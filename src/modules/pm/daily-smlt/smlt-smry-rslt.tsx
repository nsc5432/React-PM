const SmltSmryRslt = () => {
    return (
        <div className="max-w-[1800px] mx-auto p-5 bg-gray-100 min-h-screen">
            {/* Header */}
            <header className="bg-white p-4 rounded-lg mb-5 shadow flex justify-between items-center">
                <div className="flex items-center space-x-5">
                    <div className="bg-[#003366] text-white px-5 py-2 rounded text-lg font-bold">운항계획</div>
                    <div className="text-blue-700 font-semibold">
                        총운항편 <span className="font-bold text-xl">1,354 편</span>
                    </div>
                    <div className="text-green-600 font-semibold">
                        총여객수 <span className="font-bold text-xl">223,582 명</span>
                    </div>
                </div>

                <div className="flex items-center space-x-5">
                    <div className="flex items-center bg-gray-200 px-4 py-1 rounded-full space-x-1">
                        <span>기준일자 2025-06-02 10시 20분</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-1 rounded">SEARCH</button>
                    <div className="text-right text-gray-600 text-sm">
                        마지막 계산 시각: 2025-10-18 10:17:00
                        <br />
                        <span className="text-red-600 font-bold">
                            재계산 예정 시각: 2025-06-18 11:00:00
                        </span>
                    </div>
                </div>
            </header >

            {/* Navigation Tabs */}
            < nav className="grid grid-cols-4 gap-2 mb-5" >
                <div className="bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-lg text-center py-3 font-medium shadow">터미널에 여객수가 가장 많을때</div>
                <div className="bg-white border rounded-lg text-center py-3 text-gray-500 font-medium">체크인카운터가 가장 혼잡할 때</div>
                <div className="bg-white border rounded-lg text-center py-3 text-gray-500 font-medium">출국장이 가장 혼잡할 때</div>
                <div className="bg-white border rounded-lg text-center py-3 text-gray-500 font-medium">보안검색대가 가장 혼잡할 때</div>
            </nav >

            {/* Main Content */}
            < main className="grid grid-cols-2 gap-5" >

                {/* Mini Charts Row */}
                < div className="col-span-2 grid grid-cols-2 gap-5 mb-5" >
                    {
                        [1, 2].map((_, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-lg flex justify-between items-center">
                                <div className="flex-1">
                                    <div className="text-gray-500 text-sm mb-1">CAST/Xovis 비교선 그래프</div>
                                    <div className="h-12 border-b border-gray-300 relative">
                                        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                                            {idx === 0 ? (
                                                <>
                                                    <polyline points="0,40 20,20 40,30 60,10 80,25 100,5" className="fill-none stroke-blue-500 stroke-2" />
                                                    <polyline points="0,45 20,30 40,35 60,20 80,35 100,15" className="fill-none stroke-green-500 stroke-2" />
                                                </>
                                            ) : (
                                                <polyline points="0,30 20,40 40,20 60,30 80,10 100,20" className="fill-none stroke-red-600 stroke-2" />
                                            )}
                                        </svg>
                                    </div>
                                </div>
                                {idx === 0 && (
                                    <div className="text-center ml-5 border p-2 rounded">
                                        <div className="text-gray-500 text-sm">모델설명 (R2 Square)</div>
                                        <h3 className="text-xl font-bold">86%</h3>
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div >

                {/* Terminal Cards T1, T2 */}
                {
                    [
                        {
                            id: "T1",
                            headerBg: "bg-teal-500",
                            flightCount: 270,
                            passengerCount: 12423,
                            flightDiff: "+2 편",
                            passengerDiff: "+268 명",
                            chartData: [30, 40, 50, 80, 70, 60, 55, 40, 30, 20],
                            detailRows: [
                                {
                                    title: "체크인카운터",
                                    congestion: "혼잡 4개 or 원활",
                                    name: "아일랜드",
                                    code: "B2",
                                    stats: "전체 14 | 운영 12 | 대기열 640",
                                    status: "추천",
                                    circles: [
                                        { value: "00", label: "Pcs/Min" },
                                        { value: "11:00", label: "여유" }
                                    ],
                                    blocks: ["A", "B", "C", "D", "E", "F"],
                                    blockColors: ["red", "red", "green", "green", "green", "green"]
                                },
                                {
                                    title: "출국장",
                                    congestion: "혼잡 4개 or 원활",
                                    name: "출국장 번호",
                                    code: "3번",
                                    stats: "예상인원 640",
                                    status: "추천",
                                    circles: [
                                        { value: "00", label: "Pcs/Min" },
                                        { value: "11:00", label: "혼잡" }
                                    ],
                                    blocks: [1, 2, 3, 4, 5],
                                    blockColors: ["darkgreen", "green", "green", "red", "red"]
                                }
                            ]
                        },
                        {
                            id: "T2",
                            headerBg: "bg-[#55b9c9]",
                            flightCount: 270,
                            passengerCount: 12423,
                            flightDiff: "-4 편",
                            passengerDiff: "-300 명",
                            chartData: [20, 35, 45, 90, 85, 60, 50, 35, 25, 20],
                            detailRows: [
                                {
                                    title: "체크인카운터",
                                    congestion: "혼잡 4개 or 원활",
                                    name: "아일랜드",
                                    code: "B1",
                                    stats: "전체 14 | 운영 12 | 대기열 640",
                                    status: "추천",
                                    circles: [
                                        { value: "00", label: "Pcs/Min" },
                                        { value: "11:00", label: "여유" }
                                    ],
                                    blocks: ["A", "B", "C", "D", "E"],
                                    blockColors: ["red", "red", "green", "green", "green"]
                                },
                                {
                                    title: "출국장",
                                    congestion: "혼잡 4개 or 원활",
                                    name: "출국장 번호",
                                    code: "1번",
                                    stats: "예상인원 640",
                                    status: "추천",
                                    circles: [
                                        { value: "00", label: "Pcs/Min" },
                                        { value: "11:00", label: "여유" }
                                    ],
                                    blocks: [1, 2],
                                    blockColors: ["darkgreen", "green"]
                                }
                            ]
                        }
                    ].map((terminal) => (
                        <article key={terminal.id} className="bg-white rounded-xl shadow overflow-hidden">
                            <div className={`${terminal.headerBg} text-white flex justify-between p-3 font-bold`}>
                                시뮬레이션 요약 <span>+</span>
                            </div>
                            <div className="p-5">
                                <div className="text-center font-bold mb-2">{terminal.id} 출국장 예측</div>

                                <div className="flex gap-5 mb-5">
                                    <div className="flex-1 bg-gray-100 p-3 rounded text-center">
                                        <div className="text-blue-600 text-2xl font-bold">
                                            {terminal.flightCount} <span className="text-sm mt-2">편</span>
                                        </div>
                                        <div className="text-red-600 text-sm mt-1">지난주 목요일 대비 {terminal.flightDiff}</div>
                                    </div>
                                    <div className="flex-1 bg-gray-100 p-3 rounded text-center">
                                        <div className="text-green-600 text-2xl font-bold">
                                            {terminal.passengerCount} <span className="text-sm mt-2">명</span>
                                        </div>
                                        <div className="text-blue-600 text-sm mt-1">지난주 목요일 대비 {terminal.passengerDiff}</div>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between h-52 border-b border-gray-200 mb-5">
                                    {terminal.chartData.map((h, idx) => (
                                        <div
                                            key={idx}
                                            className="w-[5%] bg-gradient-to-t from-blue-500 to-cyan-300 rounded-t"
                                            style={{ height: `${h}%` }}
                                        ></div>
                                    ))}
                                </div>

                                <div className="bg-blue-100 text-blue-800 font-bold text-center py-1 rounded mb-5">
                                    2025-11-08 FRI 10:00:AM
                                </div>

                                {/* Detail Rows */}
                                <div className="grid grid-cols-2 gap-5">
                                    {terminal.detailRows.map((row, idx) => (
                                        <div key={idx} className="border rounded-lg overflow-hidden">
                                            <div className="bg-gray-100 flex justify-between p-2 font-bold text-sm">
                                                <span className={row.title === "출국장" ? "text-green-600" : ""}>{row.title}</span>
                                                <span className="text-red-600">{row.congestion}</span>
                                            </div>
                                            <div className="p-4 text-center">
                                                <div className="text-gray-600 font-bold">{row.name}</div>
                                                <div className="text-2xl font-bold text-red-600">{row.code}</div>
                                                <div className="text-sm">{row.stats}</div>
                                                <span className="inline-block mt-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs">{row.status}</span>

                                                <div className="flex justify-around mt-3">
                                                    {row.circles.map((c, cIdx) => (
                                                        <div key={cIdx} className="w-12 h-12 rounded-full border-2 border-gray-200 flex flex-col items-center justify-center text-xs">
                                                            {c.value}
                                                            <br />
                                                            {c.label}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex justify-center gap-1 mt-3">
                                                    {row.blocks.map((b, bIdx) => (
                                                        <div
                                                            key={bIdx}
                                                            className={`w-4 h-4 text-white text-xs flex items-center justify-center rounded ${row.blockColors[bIdx].startsWith("dark") ? "bg-green-800" : `bg-${row.blockColors[bIdx]}-600`}`}
                                                        >
                                                            {b}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </article>
                    ))
                }

            </main >
        </div >
    );
};

export default SmltSmryRslt;
