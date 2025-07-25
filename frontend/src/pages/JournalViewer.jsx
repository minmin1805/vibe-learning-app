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
  const [newEntryTitle, setNewEntryTitle] = useState("");
  const [newEntryContent, setNewEntryContent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() =>{ 
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

    if(isCreatingEntry) {
      return;
    }

    // const newEntry = await journal.createEntry(id, {
    //   title: "New Entry",
    //   content: "",
    // });
    // setNewEntry(newEntry.data.entry);
    setIsCreatingEntry(true);
    // setNewEntryTitle("New Entry");
    // setNewEntryContent("");
  };

  const saveAndCreateNewEntry = async () => {
    const savedEntry = await journal.createEntry(
      id,
      {
        title: newEntryTitle,
        content: newEntryContent,
      }
    );
    setIsCreatingEntry(false);
    setNewEntryTitle("");
    setNewEntryContent("");
    // Refresh entries list
    const foundEntries = await journal.getEntries(id);
    setEntries(foundEntries.data.entries);
  };

  const selectEntry = (entry) => {
    setSelectedEntry(entry);
    setIsCreatingEntry(false);
  };

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
  };

  return (
    <div className="w-screen min-h-screen bg-[#edf9f8] ">
      <TopNavBar user={user} />
      <div className="flex flex-row justify-center items-start gap-5 mt-5 p-4">
        {/* Journal entries on left bar */}
        <div className="w-1/4 min-w-[320px] bg-white shadow-md rounded-lg p-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">Journal Entries</h1>
            <button
              onClick={createNewEntry}
              className="bg-[#02C6B3] text-white p-2 rounded-md hover:bg-[#025e55] transition-colors cursor-pointer"
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
                  <p className="text-sm text-[#2D2F4A]">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Journal entry on right bar */}
        <div className="w-2/4 bg-white shadow-md rounded-lg p-4">
          {isCreatingEntry && (
            <div>
              <input
                className="w-full h-10 bg-white rounded-md p-2 border-2 border-gray-300 mb-8 mt-3"
                placeholder={"New entry"}
                type="text"
                value={newEntryTitle}
                onChange={(e) => setNewEntryTitle(e.target.value)}
              ></input>
              <div className="flex flex-col gap-2 mt-3 justify-between p-3 bg-gray-100 rounded-md mb-8">
                <p className="text-md font-bold">
                  Lesson Summary: {journalData.title}
                </p>
                <p className="text-sm text-[#2D2F4A]">
                  {journalData.lessonSummary}
                </p>
                <p className="text-md font-bold">Key Points:</p>
                <ul>
                  {journalData.keyPoints.map((eachPoint) => (
                    <li key={eachPoint}>{eachPoint}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center p-3 bg-[#FFD38C] rounded-md border-x-4 border-[#ebb842] mt-3 mb-5">
                <p className="font-bold text-[#c58a00]">Reflection Prompt:</p>
                <p className="text-sm text-[#2D2F4A]">
                  {journalData.reflectionPrompt}
                </p>
              </div>

              <textarea
                className="w-full h-50 bg-white rounded-md p-2 border-2 border-gray-300 mt-3"
                placeholder="Enter your entry here"
                value={newEntryContent}
                onChange={(e) => setNewEntryContent(e.target.value)}
              ></textarea>
              <button
                onClick={saveAndCreateNewEntry}
                className="self-end bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer transition-colors mt-5"
              >
                Save Journal Entry
              </button>
            </div>
          )}

          {/* Show selected entry */}
          {selectedEntry && !isCreatingEntry && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold">
                  {selectedEntry.title || "Untitled"}
                </h2>
                <button
                  onClick={deleteEntry}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 cursor-pointer"
                >
                  Delete
                </button>
              </div>
              <div className="flex flex-row justify-between mb-3 text-sm text-gray-500">
                <p>
                  Created:{" "}
                  {new Date(selectedEntry.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Updated:{" "}
                  {new Date(selectedEntry.updatedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="whitespace-pre-wrap">
                  {selectedEntry.content || "No content"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JournalViewer;
