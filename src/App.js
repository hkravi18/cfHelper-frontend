import AddUserList from './components/AddUserList';
import RemoveUserList from './components/RemoveUserList';
import RemoveAllUserList from './components/RemoveAllUserList';
import ShowUserList from './components/ShowUserList';

import { Route, Routes } from 'react-router-dom'; 
import { DataProvider } from './context/DataContext';

import Home from './components/Home';
import UpdateUserList from './components/UpdateUserList';
import ShowUpcomingContest from './components/ShowUpcomingContest';
import ShowUserRatingChange from './components/ShowUserRatingChange';
import ShowPastContest from './components/ShowPastContest';
import ShowUserInfo from './components/ShowUserInfo';
import ShowUserSubmission from './components/ShowUserSubmission';
import About from './components/About';
import Contact from './components/Contact';

import Nav from './components/Nav';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <Nav />
      <div className='gradient'></div>
      <div className='outlet'>
      <DataProvider>
      <Routes>
          <Route index element={<Home />}/>
          <Route path="/addUserList" element={<AddUserList />}/>
          <Route path="/removeUserList" element={<RemoveUserList />}/>
          <Route path="/removeAllUserList" element={<RemoveAllUserList />}/>
          <Route path="/showUserList" element={<ShowUserList />}/>
          <Route path="/updateUserList" element={<UpdateUserList />}/>

          <Route path="/showUpcomingContest" element={<ShowUpcomingContest />}/>
          <Route path="/showPastContest" element={<ShowPastContest />}/>
          <Route path="/showUserSubmission" element={<ShowUserSubmission />}/>
          <Route path="/showUserRatingChange" element={<ShowUserRatingChange />}/>
          <Route path="/showUserInfo" element={<ShowUserInfo />}/>

          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
        </Routes>
        </DataProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
