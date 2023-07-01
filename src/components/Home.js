import React from 'react'
import Widget from './Widget'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Home = () => {

  return (
    <>
    <div className='options'>
      <div>
        <Link to="/addUserList" className='home-link'><Widget task="Add User" description="Add User to the Users List"/></Link>  
        <Link to="/removeUserList" className='home-link'><Widget task="Remove User" description="Remove User from the Users List"/></Link> 
        <Link to="/removeAllUserList" className='home-link'><Widget task="Remove All Users" description="Remove All Users from the Users List"/></Link>
        <Link to="/showUserList" className='home-link'><Widget task="Show Users List" description="Show All Users from the Users List"/></Link>
        <Link to="/updateUserList" className='home-link'><Widget task="Update Users List" description="Update All Users Data in the Users List"/></Link>
      </div>
      <div>
        <Link to="/showUpcomingContest" className='home-link'><Widget task="Show Upcoming Contests" description="Show Upcoming Contests on Codeforces"/></Link>  
        <Link to="/showPastContest" className='home-link'><Widget task="Show Past Contests" description="Show Past Contests on Codeforces"/></Link> 
        <Link to="/showUserSubmission" className='home-link'><Widget task="Show User Submission" description="Show Recent Submissions of user"/></Link>
        <Link to="/showUserRatingChange" className='home-link'><Widget task="Show Rating Change" description="Show rating changes of the user"/></Link>
        <Link to="/showUserInfo" className='home-link'><Widget task="Show User Data" description="Show User Information from codeforces"/></Link>
      </div>
    </div>  
    <ToastContainer />
    </>
  )
}

export default Home