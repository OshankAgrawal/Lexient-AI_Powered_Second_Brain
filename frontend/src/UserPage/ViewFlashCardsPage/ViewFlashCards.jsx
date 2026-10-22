import React, { useState, useMemo } from 'react';

const initialCards = [
  { id: 1, question: "Question 1", topic: "Topics", date: "Creation Date" },
  { id: 2, question: "Question 2", topic: "Topics", date: "Creation Date" },
  { id: 3, question: "Question 3", topic: "Topics", date: "Creation Date" },
  { id: 4, question: "Question 4", topic: "Topics", date: "Creation Date" },
  { id: 5, question: "Question 5", topic: "Topics", date: "Creation Date" },
  { id: 6, question: "Question 6", topic: "Topics", date: "Creation Date" },
  { id: 7, question: "Question 7", topic: "Topics", date: "Creation Date" },
  { id: 8, question: "Question 8", topic: "Topics", date: "Creation Date" },
  { id: 9, question: "Question 9", topic: "Topics", date: "Creation Date" },
];

export default function ViewFlashCards() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return initialCards;
    return initialCards.filter(
      (card) =>
        card.question.toLowerCase().includes(q) ||
        card.topic.toLowerCase().includes(q) ||
        card.date.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    /* h-screen + overflow-hidden prevents the screen itself from scrolling/cutting off */
    <div className="w-full h-screen bg-neutral-200 p-6 flex flex-col items-center overflow-hidden font-sans box-border">
      
      {/* Inner wrapper fills 100% of height within the screen */}
      <div className="w-full max-w-5xl h-full flex flex-col">
        
        {/* ================= Search Bar (shrink-0 stays pinned at the top) ================= */}
        <div className="w-full mb-6 shrink-0">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your flashcard"
              className="w-full bg-[#aba1a2]/60 hover:bg-[#aba1a2]/70 focus:bg-[#aba1a2]/80 text-gray-900 placeholder-neutral-700 text-base md:text-lg rounded-2xl py-4 px-6 outline-none transition-all duration-200 border border-neutral-400/40 shadow-sm focus:ring-2 focus:ring-[#123C69]/40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold px-2.5 py-1 bg-[#d8dadc] text-neutral-700 rounded-lg hover:bg-[#c6c9cc] transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* ================= Scrollable Cards Section ================= 
            flex-1 min-h-0 ensures it fits exactly in the remaining space 
            pb-8 gives Question 9 full clearance when scrolled to the end */}
        <div className="flex-1 min-h-0 w-full overflow-y-auto pr-3 pb-8 custom-flashcards-scrollbar">
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6">
              {filteredCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-[#aba1a2] hover:bg-[#a29899] rounded-2xl p-6 md:p-7 flex flex-col justify-between min-h-[160px] shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.99]"
                >
                  {/* Question */}
                  <h2 className="text-xl md:text-2xl font-normal text-neutral-900 tracking-tight leading-snug">
                    {card.question}
                  </h2>

                  {/* Topic & Date */}
                  <div className="mt-5 flex flex-col gap-1">
                    <span className="text-base font-normal text-neutral-800">
                      {card.topic}
                    </span>
                    <span className="text-sm font-light text-neutral-700">
                      {card.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-600">
              <p className="text-base font-medium">No flashcards found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-sm underline font-semibold text-[#123C69] hover:text-[#AC3B61]"
              >
                Reset search
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ================= Custom Scrollbar (Matched with Timeline component) ================= */}
      <style>{`
        .custom-flashcards-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-flashcards-scrollbar::-webkit-scrollbar-track {
          background: #d8dadc;
          border-radius: 9999px;
        }
        .custom-flashcards-scrollbar::-webkit-scrollbar-thumb {
          background: #9a9293;
          border-radius: 9999px;
        }
        .custom-flashcards-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #63595d;
        }
      `}</style>
    </div>
  );
}