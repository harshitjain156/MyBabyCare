// // import logo from './logo.svg';
// import './App.css';
// import LoginPage from './page/LoginPage';
// import NavBar from './components/NavBar';
// import SignUpPage from './page/SignUpPage';
// import WelcomePage from './page/WelcomePage';
// import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
// import DoctorLoginPage from './page/DoctorLoginPage';
// import DoctorSignUpPage from './page/DoctorSignUpPage';
// import AdminPage from './page/AdminLoginPage';
// import { ToastContainer } from 'react-toastify';
// import Dashboard from './page/Dashboard';
// import { useState } from 'react';
// import ChatDrawer from './components/ChatDrawer';
// import ChatContainer from './components/ChatContainer';
// import VideoCall from './videoCall/VideoCall';
// import Layout from './UI/Layout';

// function App() {

//  const [type, setType] = useState('user');

//  const [sidebarOpen, setSidebarOpen] = useState(false);
//  const[hideChatContainer, setHideChatContainer]=useState(true);


//   return (
   

//     <Router>
//           <ToastContainer />
//       <NavBar setHideChatContainer={setHideChatContainer} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
//       <Routes path="/">
//       <Route path="/" element={<Navigate to="user/login" />}/>
//       <Route index  path="user/login" element={<LoginPage />} />
//       <Route path="user/signup" element={<SignUpPage />} />
//       <Route path="doctor/login" element={<DoctorLoginPage />} />
//       <Route path="doctor/signup" element={<DoctorSignUpPage />} />
//       <Route path="meeting" element={<VideoCall/>}/>
//       <Route path="admin" element={<AdminPage/>}/>
//       <Route path={`/${type}/dashboard`} element={<Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}><Dashboard type={type}/></Layout> }/>
      
//       </Routes>
//       <ChatContainer hideChatContainer={hideChatContainer} setHideChatContainer={setHideChatContainer}/>
//     </Router>
   




// // const [isChatOpen, setIsChatOpen] = useState(false);

// //   const handleChatToggle = () => {
// //     setIsChatOpen(!isChatOpen);
// //   };

// //   // return <h1>Hello</h1>

// //   return (
// //     <div className="h-screen flex">
// //       <div className="flex-1 bg-gray-100 p-4">
// //         <h1 className="text-2xl font-semibold mb-4">Main Content</h1>
// //         <p>This is the main content area.</p>
// //       </div>
// //       <div className="fixed inset-y-0 right-0 z-50">
// //         <button className="bg-blue-500 text-white px-4 py-2 rounded-l-full cursor-pointer" onClick={handleChatToggle}>
// //           Open Chat
// //         </button>
// //         <ChatDrawer isOpen={isChatOpen} onClose={handleChatToggle} />
// //        </div>
// //     </div>
// //   );
//   );

// };

// export default App;


import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './page/LoginPage';
import NavBar from './components/NavBar';
import SignUpPage from './page/SignUpPage';
import DoctorLoginPage from './page/DoctorLoginPage';
import DoctorSignUpPage from './page/DoctorSignUpPage';
import AdminPage from './page/AdminLoginPage';
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './page/Dashboard';
import ChatDrawer from './components/ChatDrawer';
import VideoConferencing  from "../src/videoConferencing/VideoConferencing";
import ChatContainer from './components/ChatContainer';
import VideoCall from './videoCall/VideoCall';
import Layout from './UI/Layout';
import { getToken } from './videoConferencing/api';
import { createMeeting } from './videoConferencing/api';
import Appointment from './components/Appointment';
import Booking from './components/Booking';
import BookingAppointmentForm from "./components/BookingAppointmentForm";
import { useAuth } from '../src/AuthContext/AuthContext';
import NotFoundPage from "../src/page/NotFoundPage"
import DoctorProfilePage from "../src/page/DoctorProfilePage"


const ProtectedRouteUser : React.FC<{ children: any }> = ({ children }) => {
  const  location = useLocation();
  const {pathname } = location;
  const {userData} = useAuth();
  return userData && userData?.role ==="USER" ? (
    children
  ) : (
    <Navigate to="/user/login" replace />
  );
 
};

const ProtectedRouteDoctor : React.FC<{ children: any }> = ({ children }) => {
  const  location = useLocation();
  const {pathname } = location;
  const {userData} = useAuth();
  return userData && userData?.role==="DOCTOR" ? (
    children
  ) : (
    <Navigate to="/doctor/login" replace />
  );
 
};


function App() {
 
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [hideChatContainer, setHideChatContainer] = useState<boolean>(true);
  const [meetingId, setMeetingId] = useState<string>("");
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [participantName, setParticipantName] = useState("");
  
  const navigate = useNavigate();


  const createMeetingHandler = async () => {
      const token = await getToken();
      console.log(token);
      const { meetingId, err } = await createMeeting({ token });
      // const { meetingId, err } = await _handleOnCreateMeeting();
       console.log(meetingId + " " + err);
      if (meetingId) {
        setToken(token);
        setMeetingId(meetingId);
        setIscreateMeetingClicked(true);
         navigate('/meeting')
      } else {
        toast.error(
          `${err}`);
      }
    }


  const eraseTokenHandler = () =>{
     setToken("");
    setMeetingId("");
  }

 const handleTokenAndId=(token:any, id:any)=>{
  setToken(token);
  setMeetingId(id);
 }

 const setMeetingIdHandler=(e:any)=>{
    setMeetingId(e.target.value);
 }




  return (
<>



       <ToastContainer />
      <NavBar setHideChatContainer={setHideChatContainer} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
      <Routes>
        <Route path="/" element={<Navigate to="user/login" />} />
        <Route index path="user/login" element={<LoginPage />} />
        <Route path="user/signup" element={<SignUpPage />} />
        <Route path="doctor/login" element={<DoctorLoginPage />} />
        <Route path="doctor/signup" element={<DoctorSignUpPage />} />
        <Route path="meeting" element={<VideoConferencing meetingId={meetingId} iscreateMeetingClicked={iscreateMeetingClicked} token={token} eraseTokenHandler={eraseTokenHandler} setMeetingIdHandler={setMeetingIdHandler} handleTokenAndId={handleTokenAndId}/>} />
        <Route path="admin" element={<AdminPage />} />
       
        <Route path={`/user/appointment`} element={<ProtectedRouteUser><Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}><Appointment/></Layout></ProtectedRouteUser> } />
        <Route path={`/user/appointment/doctor`} element={<ProtectedRouteUser><Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}><Booking/></Layout> </ProtectedRouteUser>} />
        <Route path={`/user/appointment/doctor/:doctorId`} element={<ProtectedRouteUser><Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}><BookingAppointmentForm/> </Layout></ProtectedRouteUser>} />
        <Route path={`/user/dashboard`} element={<ProtectedRouteUser><Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}><Dashboard sidebarOpen={sidebarOpen} /></Layout></ProtectedRouteUser> } />
        {/* <Route path={`/doctor/appointment/doctor/:doctorId`} element={<ProtectedRoute><Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}><BookingAppointmentForm/> </Layout></ProtectedRoute>} /> */}
        <Route path={`/doctor/appointment`} element={<ProtectedRouteDoctor><Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}><Appointment/></Layout></ProtectedRouteDoctor> } />
        {/* <Route path={`/doctor/appointment/doctor`} element={<ProtectedRoute><Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}><Booking/></Layout> </ProtectedRoute>} /> */}
        <Route path={`/doctor/dashboard`} element={<ProtectedRouteDoctor><Layout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}><Dashboard sidebarOpen={sidebarOpen} /></Layout></ProtectedRouteDoctor> } />
        <Route path={`/doctor/profile`} element={<DoctorProfilePage/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      <ChatContainer hideChatContainer={hideChatContainer} setHideChatContainer={setHideChatContainer} createMeetingHandler={createMeetingHandler}/>
</>
  );
}

export default App;
