import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar'
import Userhome from '../Components/Userhome';

const Home = () => {

  const navigate = useNavigate()
  const userAuthenticeted = () => {
    axios.get("http://localhost:4000/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("user"),
      },
    }).then((response) => {
      console.log(response);
      if (!response.data.auth) {
        navigate('/')
      }
    });
  };

  useEffect(()=>{
    userAuthenticeted()
  },[])


  return (
    <div className='bg-slate-100 min-h-screen scrollbar-hide'>
      <Navbar/>
      <Userhome/>
    </div>
  )
}

export default Home