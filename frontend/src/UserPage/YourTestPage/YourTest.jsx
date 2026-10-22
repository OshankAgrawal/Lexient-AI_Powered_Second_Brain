import React, { useState } from 'react';

// Sample questions list to test Prev / Next navigation
const sampleCards = [
  {
    id: 1,
    question: "Explain the difference between SQL and NoSQL databases.",
    defaultAnalysis: `1. Data Structure:
• SQL databases are relational, table-based with predefined schemas (e.g., PostgreSQL, MySQL).
• NoSQL databases are non-relational, document, key-value, graph, or wide-column stores (e.g., MongoDB, Redis).

2. Scalability:
• SQL databases typically scale vertically (increasing CPU, RAM).
• NoSQL databases are designed to scale horizontally across distributed clusters.

3. ACID vs BASE:
• SQL adheres strictly to ACID properties (Atomicity, Consistency, Isolation, Durability) for transaction integrity.
• NoSQL typically follows BASE properties (Basically Available, Soft state, Eventual consistency) prioritizing speed and partitioning.`
  },
  {
    id: 2,
    question: "What is the Virtual DOM in React and how does reconciliation work?",
    defaultAnalysis: `1. Virtual DOM Overview:
• A lightweight in-memory representation of the real DOM.
• Manipulating JavaScript objects is much faster than directly modifying browser DOM nodes.

2. Diffing & Reconciliation:
• When state changes, a new VDOM tree is created.
• React computes the difference (diff) between the old and new VDOM using a heuristic O(n) algorithm.
• Only the nodes that actually changed are patched onto the real DOM, minimizing costly layout repaints.`
  },
  {
    id: 3,
    question: "What is Event Bubbling and how do you stop it?",
    defaultAnalysis: `1. Event Propagation Flow:
• Capture Phase: The event travels down from Window to the target element.
• Target Phase: Reaches the triggering element.
• Bubbling Phase: Bubbles up from the target back to the root of the document tree.

2. Stopping Propagation:
• Use e.stopPropagation() to prevent the event from traveling further up the parent hierarchy.
• Use e.stopImmediatePropagation() to stop other listeners on the exact same element from executing.`
  }
];

export default function YourTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = sampleCards[currentIndex];
  const currentAnswer = answers[currentCard.id] || "";

  const handleAnswerChange = (e) => {
    setAnswers((prev) => ({
      ...prev,
      [currentCard.id]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFlipped(true);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : sampleCards.length - 1));
  };

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < sampleCards.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="h-screen bg-[#EEE2DC] flex flex-col items-center justify-center p-6 select-none font-sans">
      
      {/* 3D Flip Container */}
      <div className="w-full h-[600px] perspective-distant">
        <div
          className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* ================= FRONT SIDE ================= */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-[#a8a1a3] rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
            
            {/* Question Box */}
            <div className="w-full bg-[#d7dadc] rounded-2xl min-h-[100px] flex items-center justify-center px-6 py-4 shadow-inner text-center">
              <p className="text-gray-800 text-lg md:text-xl font-medium leading-relaxed">
                {currentCard.question}
              </p>
            </div>

            {/* Answer Input Box */}
            <div className="w-full bg-[#d7dadc] rounded-2xl h-44 p-4 shadow-inner flex flex-col">
              <textarea
                value={currentAnswer}
                onChange={handleAnswerChange}
                placeholder="Type your answer"
                className="w-full h-full bg-transparent resize-none text-gray-800 placeholder-gray-500 font-normal focus:outline-none text-base custom-scrollbar"
              />
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 bg-[#d7dadc] hover:bg-[#caced0] active:scale-95 transition-all text-gray-800 font-semibold py-3 px-6 rounded-2xl shadow-sm text-center"
              >
                Prev
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 bg-[#d7dadc] hover:bg-[#caced0] active:scale-95 transition-all text-gray-800 font-semibold py-3 px-6 rounded-2xl shadow-sm text-center"
              >
                Submit
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-[#d7dadc] hover:bg-[#caced0] active:scale-95 transition-all text-gray-800 font-semibold py-3 px-6 rounded-2xl shadow-sm text-center"
              >
                Next
              </button>
            </div>
          </div>

          {/* ================= BACK SIDE (ANALYSIS) ================= */}
          <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#a8a1a3] rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
            
            {/* Top Box: "Your Answer" */}
            <div className="w-full bg-[#d7dadc] rounded-2xl h-[100px] px-6 py-4 shadow-inner overflow-y-auto custom-scrollbar flex flex-col">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">
                Your Answer
              </span>
              <p className="text-gray-800 text-sm md:text-base italic whitespace-pre-wrap">
                {currentAnswer.trim() ? currentAnswer : "No answer provided."}
              </p>
            </div>

            {/* Bottom Box: "Analysis" with Custom Scrollbar */}
            <div className="w-full bg-[#d7dadc] rounded-2xl h-[240px] p-6 shadow-inner flex flex-col overflow-hidden">
              <h3 className="text-gray-800 text-center font-medium text-lg mb-3">
                Analysis
              </h3>
              
              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto pr-3 custom-scrollbar text-gray-700 text-sm leading-relaxed whitespace-pre-line text-left">
                {currentCard.defaultAnalysis}
              </div>
            </div>

            {/* Back to Question Button / Navigation */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 bg-[#d7dadc] hover:bg-[#caced0] active:scale-95 transition-all text-gray-800 font-semibold py-2.5 px-4 rounded-2xl shadow-sm text-center text-sm"
              >
                Prev
              </button>
              
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="flex-[1.5] bg-[#63595d] hover:bg-[#52494d] active:scale-95 transition-all text-white font-semibold py-2.5 px-4 rounded-2xl shadow-sm text-center text-sm"
              >
                Flip to Question
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="flex-1 bg-[#d7dadc] hover:bg-[#caced0] active:scale-95 transition-all text-gray-800 font-semibold py-2.5 px-4 rounded-2xl shadow-sm text-center text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Styled Scrollbar CSS */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 7px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #c8cbd0;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #8e8789;
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #63595d;
        }
      `}</style>
    </div>
  );
}