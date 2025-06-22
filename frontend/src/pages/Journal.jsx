import React from 'react'
import { useEffect } from 'react'
import TopNavBar from '../components/TopNavBar'
import {auth} from "../services/api.js"
import {journal} from "../services/api.js"
import {useState} from "react"

function Journal() {

  const [user ,setUser] = useState(null);
  const [journals, setJournals] = useState([]);

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

  return (
    <div>
        <TopNavBar user={user}/>
        <h1>Journal</h1>
    </div>
  )
}

export default Journal
