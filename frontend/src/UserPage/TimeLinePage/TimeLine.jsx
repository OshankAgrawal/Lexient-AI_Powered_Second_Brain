import React from 'react';

const timelineData = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  fileName: 'File name',
  date: 'Date',
}));

export default function TimeLine() {
  return (
    <div className="h-screen bg-[#d0d4d8] flex items-center justify-center p-8">
      <div className="max-h-[620px] w-full overflow-y-auto pr-3">
        <div className="grid grid-cols-2 gap-6">
          {timelineData.map((item) => (
            <div key={item.id} className="bg-[#aba1a2] rounded-2xl p-6 flex flex-col gap-4">
              <div className="bg-[#d8dadc] rounded-xl py-5 px-4 flex justify-center items-center">
                <span className="text-gray-900 text-lg font-medium">{item.fileName}</span>
              </div>
              <div className="bg-[#d8dadc] rounded-full py-2 px-6 self-start">
                <span className="text-gray-800 text-sm font-medium">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}