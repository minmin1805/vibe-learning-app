import React from 'react'
import TopNavBar from '../components/TopNavBar'
import {useState} from "react"
import {useEffect} from "react"
import {useParams} from "react-router-dom"
import {auth} from "../services/api.js"
import {journal} from "../services/api.js"

function JournalViewer() {

  const [user, setUser] = useState(null);
  const [journal, setJournal] = useState(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await auth.getProfile();
      setUser(user.data.user);
    }

    fetchUser();
  }, []);
  return (
    <div>
      <TopNavBar user={user} />
      <div className="flex flex-col justify-center m-5">

      </div>
    </div>
  )
}

export default JournalViewer
