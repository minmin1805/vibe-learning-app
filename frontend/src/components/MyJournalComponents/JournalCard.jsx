import React from 'react'
import { FiCalendar } from 'react-icons/fi'

function JournalCard({journal, handleJournalClick}) {
    return (
        <div onClick={() => handleJournalClick(journal)} className="bg-white rounded-lg shadow-md h-full overflow-hidden cursor-pointer">
          <div className="h-45 bg-blue-600 flex flex-col justify-center items-center">
          <h1 className="text-center text-white text-md font-bold">{journal.title}</h1>
          </div>
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              <p>{new Date(journal.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>
          </div>
          <div className="flex justify-between items-center p-4">
          <p className="text-sm text-gray-500 ml-2">{journal.summary}</p>
          </div>
        </div>
      );
    }

export default JournalCard
