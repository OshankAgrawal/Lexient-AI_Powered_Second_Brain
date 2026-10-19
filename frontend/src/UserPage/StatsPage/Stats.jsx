import React, { useState, useMemo } from 'react';

// --- SAMPLE DATA ---
const MOTIVATIONAL_FACTS = [
  {
    fact: "Active recall through flashcards strengthens synaptic connections, increasing long-term retention by up to 150% compared to passive reading.",
    source: "Cognitive Psychology Research"
  },
  {
    fact: "The 'Testing Effect' proves that retrieving a memory alters it in a way that makes it significantly more resistant to future forgetting.",
    source: "Roediger & Karpicke"
  },
  {
    fact: "Spaced repetition flattens the Ebbinghaus forgetting curve. Reviewing right as a memory decays locks it into permanent neural pathways.",
    source: "Memory & Neuroscience Labs"
  },
  {
    fact: "Studying just 15 minutes every single day outperforms a 4-hour weekend cram session by over 3x in durable comprehension.",
    source: "Habit Formation Studies"
  }
];

const GRAPH_NODES = [
  { id: 'harper-lee', label: 'Harper Lee', type: 'author', x: 220, y: 150, color: '#10b981' },
  { id: 'mockingbird', label: 'To Kill a Mockingbird', type: 'book', x: 100, y: 220, color: '#6366f1' },
  { id: 'watchman', label: 'Go Set a Watchman', type: 'book', x: 90, y: 70, color: '#8b5cf6' },
  { id: 'pulitzer', label: 'Pulitzer Prize (1961)', type: 'award', x: 330, y: 90, color: '#ec4899' },
  { id: 'atticus', label: 'Atticus Finch', type: 'character', x: 250, y: 240, color: '#a855f7' },
  { id: 'southern-gothic', label: 'Southern Gothic', type: 'genre', x: 380, y: 200, color: '#06b6d4' },
  { id: 'civil-rights', label: 'Civil Rights Movement', type: 'theme', x: 430, y: 110, color: '#10b981' },
  { id: 'scout', label: 'Scout Finch', type: 'character', x: 160, y: 280, color: '#8b5cf6' },
];

const GRAPH_LINKS = [
  { source: 'harper-lee', target: 'mockingbird' },
  { source: 'harper-lee', target: 'watchman' },
  { source: 'harper-lee', target: 'pulitzer' },
  { source: 'mockingbird', target: 'atticus' },
  { source: 'mockingbird', target: 'scout' },
  { source: 'mockingbird', target: 'southern-gothic' },
  { source: 'southern-gothic', target: 'civil-rights' },
  { source: 'atticus', target: 'scout' },
  { source: 'pulitzer', target: 'civil-rights' }
];

const TOPIC_HEATMAP_DATA = {
  columns: ['Recalled', 'Hesitant', 'Forgot', 'Skipped', 'Mastered'],
  rows: [
    { name: 'Neuroscience', scores: [48, 12, 4, 1, 62] },
    { name: 'Algorithms', scores: [35, 18, 9, 3, 41] },
    { name: 'History', scores: [22, 5, 2, 0, 38] },
    { name: 'Philosophy', scores: [19, 14, 8, 4, 25] },
    { name: 'Linguistics', scores: [30, 8, 3, 2, 44] },
    { name: 'Psychology', scores: [42, 11, 5, 1, 53] }
  ]
};

export default function Stats() {
  const [userName] = useState('user');
  const [factIndex, setFactIndex] = useState(0);
  const [activeNode, setActiveNode] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  // --- GITHUB STREAK CALENDAR GENERATOR (36 Weeks) ---
  const streakCalendar = useMemo(() => {
    const weeks = [];
    const seed = [0, 0, 1, 2, 0, 3, 4, 1, 0, 2, 3, 0, 4, 2, 1, 3];
    for (let w = 0; w < 36; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const rand = (w * 7 + d * 13) % seed.length;
        const level = (w > 20 && d % 2 === 0) ? Math.min(4, seed[rand] + 1) : seed[rand];
        days.push({
          dayOfWeek: d,
          level: level,
          count: level * 8 + (level > 0 ? (d + 2) : 0),
          date: `Week ${w + 1}, Day ${d + 1}`
        });
      }
      weeks.push(days);
    }
    return weeks;
  }, []);

  const getHeatmapColor = (level) => {
    switch (level) {
      case 1: return 'bg-[#0e4429] border-[#0e4429]';
      case 2: return 'bg-[#006d32] border-[#006d32]';
      case 3: return 'bg-[#26a641] border-[#26a641]';
      case 4: return 'bg-[#39d353] border-[#39d353]';
      default: return 'bg-[#161b22] border-transparent';
    }
  };

  const nextFact = () => {
    setFactIndex((prev) => (prev + 1) % MOTIVATIONAL_FACTS.length);
  };

  return (
    <>
      {/* Custom Scrollbar Styles */}
      <style>{`
        /* Vertical page scrollbar */
        .custom-scroll::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #e2e8f0;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: #94a3b8;
          border-radius: 6px;
          border: 2px solid #e2e8f0;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }

        /* Dark horizontal scrollbar for GitHub streak */
        .dark-streak-scroll::-webkit-scrollbar {
          height: 8px;
        }
        .dark-streak-scroll::-webkit-scrollbar-track {
          background: #0d1117;
        }
        .dark-streak-scroll::-webkit-scrollbar-thumb {
          background: #30363d;
          border-radius: 4px;
        }
        .dark-streak-scroll::-webkit-scrollbar-thumb:hover {
          background: #484f58;
        }
      `}</style>

      {/* Main Container with vertical scrollbar enabled */}
      <div className="h-screen w-full overflow-y-auto overflow-x-hidden custom-scroll bg-[#ececec] text-slate-900 p-4 sm:p-8 font-sans">
        <div className="max-w-[1360px] mx-auto space-y-6 pb-20">

          {/* 1. Greeting Header */}
          <header className="pt-2 pb-1">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
              Hi {userName},
            </h1>
            <p className="text-xl sm:text-2xl text-slate-700 mt-1 font-normal">
              How was your day today
            </p>
          </header>

          {/* 2. Main Bento Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* ==================== LEFT COLUMN ==================== */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Card 1: Answer Quality Circular Gauge */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col items-center justify-between min-h-[340px]">
                <div className="w-full flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <span>Accuracy Metric</span>
                  <span className="text-emerald-600 font-bold">Top 2%</span>
                </div>

                <div className="relative flex items-center justify-center my-3">
                  <svg className="w-52 h-52 transform -rotate-90" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="82" className="fill-[#2b3547]" />
                    <circle cx="100" cy="100" r="70" className="stroke-[#374459] fill-transparent" strokeWidth="16" />
                    <circle
                      cx="100"
                      cy="100"
                      r="70"
                      className="stroke-[#4f8eff] fill-transparent transition-all duration-1000 ease-out"
                      strokeWidth="16"
                      strokeDasharray={2 * Math.PI * 70}
                      strokeDashoffset={0}
                      strokeLinecap="round"
                      style={{ filter: 'drop-shadow(0px 0px 10px rgba(79, 142, 255, 0.75))' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-extrabold tracking-tight text-white drop-shadow-sm">
                      100%
                    </span>
                    <span className="text-xs font-medium text-slate-300 mt-0.5">
                      Answer Quality
                    </span>
                  </div>
                </div>

                <div className="w-full grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-100">
                  <div>
                    <div className="text-lg font-bold text-slate-800">412</div>
                    <div className="text-[11px] text-slate-400 font-medium">Reviewed Today</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-emerald-600">0</div>
                    <div className="text-[11px] text-slate-400 font-medium">Lapses</div>
                  </div>
                </div>
              </div>

              {/* Card 2: Heatmap of Topics */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">Topic Matrix Heatmap</h3>
                    <p className="text-xs text-slate-400">Flashcard response cross-correlation</p>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    Updated Today
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr>
                        <th className="pb-2 font-medium text-slate-400 text-[11px]">Domain</th>
                        {TOPIC_HEATMAP_DATA.columns.map((col, idx) => (
                          <th key={idx} className="pb-2 font-medium text-slate-400 text-[10px] text-center px-1">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TOPIC_HEATMAP_DATA.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="border-t border-slate-100/80">
                          <td className="py-2 pr-2 font-medium text-slate-700 truncate max-w-[100px]">
                            {row.name}
                          </td>
                          {row.scores.map((val, cIdx) => {
                            const intensity = Math.min(val / 65, 1);
                            return (
                              <td key={cIdx} className="p-1 text-center">
                                <div
                                  style={{
                                    backgroundColor: `rgba(239, 68, 68, ${0.08 + intensity * 0.72})`,
                                    color: intensity > 0.45 ? '#fff' : '#991b1b'
                                  }}
                                  className="w-7 h-7 mx-auto rounded flex items-center justify-center font-mono font-medium text-[11px] transition-transform hover:scale-110 cursor-pointer"
                                  title={`${row.name} - ${TOPIC_HEATMAP_DATA.columns[cIdx]}: ${val}`}
                                >
                                  {val}
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* ==================== RIGHT COLUMN ==================== */}
            <div className="lg:col-span-8 flex flex-col gap-6">

              {/* Sub-Row: Facts + Knowledge Graph */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Card 3: Motivation Fact */}
                <div className="md:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                      💡 Daily Motivation
                    </span>
                    <button
                      onClick={nextFact}
                      className="text-xs text-slate-400 hover:text-slate-800 transition-colors p-1"
                    >
                      Shuffle ↻
                    </button>
                  </div>

                  <div className="my-auto py-5">
                    <p className="text-slate-800 text-base leading-relaxed font-medium">
                      "{MOTIVATIONAL_FACTS[factIndex].fact}"
                    </p>
                    <p className="text-xs text-slate-400 mt-3 font-semibold">
                      — {MOTIVATIONAL_FACTS[factIndex].source}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Fact {factIndex + 1} of {MOTIVATIONAL_FACTS.length}</span>
                    <span className="text-indigo-600 font-semibold cursor-pointer" onClick={nextFact}>
                      Next insight →
                    </span>
                  </div>
                </div>

                {/* Card 4: Knowledge Graph */}
                <div className="md:col-span-7 bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80 flex flex-col relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-800 text-sm">Flashcard Knowledge Graph</h3>
                      <p className="text-xs text-slate-400">Interlinked concepts & tags</p>
                    </div>
                    <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {GRAPH_NODES.length} Nodes
                    </span>
                  </div>

                  <div className="w-full h-[260px] bg-slate-50/50 rounded-2xl relative border border-slate-100 flex items-center justify-center overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 500 310">
                      {GRAPH_LINKS.map((link, idx) => {
                        const source = GRAPH_NODES.find(n => n.id === link.source);
                        const target = GRAPH_NODES.find(n => n.id === link.target);
                        if (!source || !target) return null;
                        const isHighlighted = activeNode && (activeNode.id === source.id || activeNode.id === target.id);
                        return (
                          <line
                            key={idx}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke={isHighlighted ? '#6366f1' : '#cbd5e1'}
                            strokeWidth={isHighlighted ? 2.5 : 1.2}
                            strokeDasharray={isHighlighted ? 'none' : '3,3'}
                          />
                        );
                      })}

                      {GRAPH_NODES.map((node) => {
                        const isHovered = activeNode?.id === node.id;
                        return (
                          <g
                            key={node.id}
                            className="cursor-pointer transition-transform"
                            onMouseEnter={() => setActiveNode(node)}
                            onMouseLeave={() => setActiveNode(null)}
                          >
                            <circle
                              cx={node.x}
                              cy={node.y}
                              r={isHovered ? 16 : 13}
                              fill={node.color}
                              style={{ filter: isHovered ? 'drop-shadow(0px 0px 8px rgba(99, 102, 241, 0.6))' : 'none' }}
                            />
                            <circle cx={node.x} cy={node.y} r={isHovered ? 6 : 4} fill="#ffffff" opacity={0.85} />
                            <text
                              x={node.x}
                              y={node.y + 22}
                              textAnchor="middle"
                              fontSize="9.5"
                              fontWeight={isHovered ? "700" : "500"}
                              fill={isHovered ? "#1e293b" : "#64748b"}
                              className="select-none pointer-events-none"
                            >
                              {node.label}
                            </text>
                          </g>
                        );
                      })}
                    </svg>

                    {activeNode && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg shadow-md border border-slate-200 text-xs">
                        <div className="font-semibold text-slate-800">{activeNode.label}</div>
                        <div className="text-slate-400 capitalize">{activeNode.type} flashcard</div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Card 5: Bottom GitHub Streak Display */}
              <div className="bg-[#0d1117] text-white rounded-3xl p-6 shadow-sm border border-slate-800 flex flex-col justify-between">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-slate-100">Study Streak & Activity</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 font-medium px-2 py-0.5 rounded-full border border-emerald-500/30">
                      🔥 24 Day Streak
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    842 cards reviewed this year
                  </span>
                </div>

                {/* Horizontal scroll area for the calendar */}
                <div className="relative overflow-x-auto dark-streak-scroll pb-3 pt-1">
                  <div className="min-w-[680px]">
                    {/* Months Row */}
                    <div className="flex text-[10px] text-slate-400 ml-8 mb-2 gap-[36px] select-none font-mono">
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                    </div>

                    <div className="flex gap-2">
                      {/* Weekday labels */}
                      <div className="flex flex-col justify-between text-[10px] text-slate-400 font-mono h-[86px] pr-1 select-none">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* Day cells */}
                      <div className="flex gap-[3.5px]">
                        {streakCalendar.map((week, wIdx) => (
                          <div key={wIdx} className="flex flex-col gap-[3.5px]">
                            {week.map((day, dIdx) => (
                              <div
                                key={dIdx}
                                className={`w-[11px] h-[11px] rounded-[2px] transition-transform hover:scale-125 cursor-pointer ${getHeatmapColor(day.level)}`}
                                onMouseEnter={() => setTooltip(`${day.count} flashcards on ${day.date}`)}
                                onMouseLeave={() => setTooltip(null)}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer and Legend */}
                <div className="flex flex-wrap items-center justify-between pt-4 mt-2 border-t border-slate-800/80 text-xs text-slate-400 gap-2">
                  <div className="flex items-center gap-2">
                    <a href="#learn-more" className="text-slate-400 hover:text-slate-200 transition-colors">
                      Learn how we count contributions
                    </a>
                    {tooltip && (
                      <span className="text-emerald-400 font-mono ml-3 text-[11px]">
                        • {tooltip}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px]">
                    <span>Less</span>
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22]" />
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]" />
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]" />
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641]" />
                    <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353]" />
                    <span>More</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
}