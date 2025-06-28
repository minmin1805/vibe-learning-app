import React from 'react'
import { useEffect } from 'react'
import TopNavBar from '../components/TopNavBar'
import {auth} from "../services/api.js"
import {journal} from "../services/api.js"
import {useState} from "react"
import JournalCard from '../components/MyJournalComponents/JournalCard'
import {useNavigate} from "react-router-dom"

function Journal() {

  const [user ,setUser] = useState(null);
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();
  const [chosenJournal, setChosenJournal] = useState(null);


  useEffect(() => {
    const fetchUser = async () => {
      const user = await auth.getProfile();
      setUser(user.data.user);
    }

    fetchUser();

    const fetchJournals = async () => {
      const journals = await journal.getJournals();
      console.log(journals.data.journals);
      setJournals(journals.data.journals);
    }

    fetchJournals();
  }, []);

  const handleJournalClick = (journal) => {
    setChosenJournal(journal);
    console.log(journal._id);
    navigate(`/journal/${journal._id}`);
  }

  return (
    <div className="bg-[#edf9f8] h-screen">
      <TopNavBar user={user} />
      
    <div className="flex flex-col justify-center m-5">


        <h1 className="text-2xl font-bold mt-7">My Journals</h1>

        <div className="grid grid-cols-3 mt-5 bg-white rounded-lg p-4 shadow-md gap-4">

            {journals.map((eachJournal) => (
                <JournalCard handleJournalClick={handleJournalClick} key={eachJournal._id} journal={eachJournal} />
            ))}
        </div>
    </div>

    </div>
  )
}


export default Journal
