import React from "react";
import TopNavBar from "../components/TopNavBar";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { auth } from "../services/api.js";
import { journal } from "../services/api.js";

function JournalViewer() {
  const [user, setUser] = useState(null);
  const [journalData, setJournalData] = useState(null);
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  const [isCreatingEntry, setIsCreatingEntry] = useState(false);
  const [newEntry, setNewEntry] = useState(null);
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await auth.getProfile();
      setUser(user.data.user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchJournal = async () => {
      const foundJournal = await journal.getJournalById(id);
      setJournalData(foundJournal.data.journal);
      console.log(foundJournal.data.journal);
    };

    fetchJournal();
  }, [id]);

  useEffect(() => {
    const fetchEntries = async () => {
      const foundEntries = await journal.getEntries(id);
      console.log(foundEntries.data.entries);
      setEntries(foundEntries.data.entries);
    };

    fetchEntries();
  }, [id]);

  const createNewEntry = async () => {
    const newEntry = await journal.createEntry(id, {
      title: "New Entry",
      content: ""
    });
    setNewEntry(newEntry.data.entry);
    setIsCreatingEntry(true);
    setNewEntryTitle("New Entry");
    setNewEntryContent("");
  };

  const saveEntry = async () => {
    const savedEntry = await journal.updateEntry(id, newEntry._id, newEntryTitle, newEntryContent);
    setNewEntry(savedEntry.data.entry);
    setIsCreatingEntry(false);
    setNewEntryTitle("");
    setNewEntryContent("");
    // Refresh entries list
    const foundEntries = await journal.getEntries(id);
    setEntries(foundEntries.data.entries);
  }

  const selectEntry = (entry) => {
    setSelectedEntry(entry);
    setIsCreatingEntry(false);
  }

  const deleteEntry = async () => {
    if (!selectedEntry || !selectedEntry._id) return;
    
    try {
      await journal.deleteEntry(id, selectedEntry._id);
      setSelectedEntry(null);
      // Refresh entries list
      const foundEntries = await journal.getEntries(id);
      setEntries(foundEntries.data.entries);
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-100 ">
      <TopNavBar user={user} />
      <div className="flex flex-row justify-center items-center gap-5 mt-5">
        {/* Journal entries on left bar */}
        <div className="w-1/4 h-screen bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Journal Entries</h1>
            <button
              onClick={createNewEntry}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              + New
            </button>
            {/* List existing entries */}
            <div className="mt-4 space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry._id}
                  onClick={() => selectEntry(entry)}
                  className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                >
                  <p className="font-medium">{entry.title || "Untitled"}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journal entry on right bar */}
        <div className="w-1/2 h-screen bg-white shadow-md rounded-lg p-4">
          {isCreatingEntry && newEntry && (
            <div>
              <input
                className="w-full h-10 bg-white rounded-md p-2 border-2 border-gray-300"
                placeholder={newEntry.title}
                type="text"
                value={newEntryTitle}
                onChange={(e) =>
                  setNewEntryTitle(e.target.value)
                }
              ></input>
              <div className="flex flex-row justify-between mt-3">
                <p>Created: {new Date(newEntry.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
                <p>Updated: {new Date(newEntry.updatedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <div className="flex flex-col gap-2 mt-3 justify-between p-3 bg-gray-100 rounded-md">
                <p className="text-md font-bold">
                  Lesson Summary: {journalData.title}
                </p>
                <p className="text-sm text-gray-500">
                  {journalData.lessonSummary}
                </p>
                <p className="text-md font-bold">
                  Key Points:
                </p>
                <ul>
                  {journalData.keyPoints.map((eachPoint) => (
                    <li key={eachPoint }>{eachPoint}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center p-3 bg-blue-100 rounded-md border-x-4 border-blue-700 mt-3">
                <p className="font-bold text-blue-500">
                  Reflection Prompt:
                </p>
                <p className="text-sm text-gray-500">
                  {journalData.reflectionPrompt}
                </p>
              </div>

              <textarea className="w-full h-50 bg-white rounded-md p-2 border-2 border-gray-300 mt-3"
                placeholder="Enter your entry here"
                value={newEntryContent}
                onChange={(e) => setNewEntryContent(e.target.value)}
              ></textarea>
              <button onClick={saveEntry}  className="self-end bg-blue-500 text-white p-2 rounded-md">Save Journal Entry</button>
            </div>
          )}
          
          {/* Show selected entry */}
          {selectedEntry && !isCreatingEntry && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">{selectedEntry.title || "Untitled"}</h2>
                <button 
                  onClick={deleteEntry}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
              <div className="flex flex-row justify-between mb-3 text-sm text-gray-500">
                <p>Created: {new Date(selectedEntry.createdAt).toLocaleDateString()}</p>
                <p>Updated: {new Date(selectedEntry.updatedAt).toLocaleDateString()}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="whitespace-pre-wrap">{selectedEntry.content || "No content"}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JournalViewer;
