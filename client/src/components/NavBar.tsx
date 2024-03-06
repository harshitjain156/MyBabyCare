// import React, { useState } from 'react'
// import profile from "../assets/profile-picture.png";
// import logo from "../assets/logo.png";
// import { MenuIcon, XIcon } from "@heroicons/react/outline";
// import { Link } from 'react-router-dom';
// import SearchBar from './SearchBar';

// export default function NavBar({setHideChatContainer, setSidebarOpen, sidebarOpen}) {
//   const handleClick = () => setSidebarOpen((sidebar)=>!sidebar);

//   console.log(sidebarOpen)
//   return (
//     <nav className="bg-primary py-4  w-screen fixed top-0 left-0 shadow-lg z-30">
//     <div className="w-full mx-auto px-8 flex justify-between items-center">
   
//         {/* Logo */}
//         <div className="text-lg text-white font-semibold flex justify-start items-center">
//         <div className="mr-4 text-white" onClick={handleClick}>
//           {!sidebarOpen ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
//         </div>
//         <span className='hidden md:block relative w-[80px]'>
//           <img src={logo} alt="Logo" width="80px" className='absolute top-[-50px]' />
//           </span>
//         BabyCare
//         </div>
        
       
//         {/* Navigation Links */}
//         <ul className="flex item-center gap-6">
//         {/* <SearchBar  sidebarOpen={nav}
//                       setSidebarOpen={setNav}/> */}
            
        
//             <li className="text-white py-2 px-4 rounded-full bg-secondary cursor-pointer flex gap-1 justify-center items-center  hover:bg-secondary-dark"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
//                  </svg>
                 
//                  </li>
//             <li onClick={()=>{setHideChatContainer(false)}} className="text-white py-2 px-4 rounded-full bg-secondary cursor-pointer flex gap-1 justify-center items-center  hover:bg-secondary-dark"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
//                 </svg> 
//                 </li> 
//                 <li>
//                 <div className="w-full flex items-center rounded-full  bg-secondary overflow-hidden">
//                 <img src={profile} alt={"Profile picture"} className="h-11 w-11 pt-2  object-cover opacity-75" />
//                  </div>
//                 </li>
//             {/* <li className="bg-secondary text-white py-2 px-8 rounded-full cursor-pointer hover:bg-secondary-dark"><Link to="/login">Sign In</Link></li> */}
//             {/* <li className="bg-white text-gray-500 py-2 px-8 rounded-full cursor-pointer hover:bg-gray-200"><Link to="/user/signup">New User?</Link></li> */}
//         </ul>
        
//     </div>
    
        

// </nav>
//   )
// }

import React, { useState } from 'react';
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import logo from "../assets/logo.png";
import profile from "../assets/profile-picture.png";
import Calendar from 'react-calendar';
import { useAuth } from '../AuthContext/AuthContext';


interface NavBarProps {
  setHideChatContainer: (isOpen: boolean)=>void;
  setSidebarOpen: (isOpen: boolean)=>void;
  sidebarOpen: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ setHideChatContainer, setSidebarOpen, sidebarOpen }) => {
  const  location = useLocation();
  const {pathname } = location;

const {userData} =  useAuth();

  const handleClick = () => setSidebarOpen(!sidebarOpen);
  const [iscreateMeetingClicked, setIscreateMeetingClicked] = useState(false);
  const [meetingId, setMeetingId] = useState("");

  return (
    <nav className="bg-primary py-4 inline-block  w-screen fixed top-0 left-0 shadow-lg z-40">
      
      <div className="w-full mx-auto px-4   flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg text-white font-semibold flex justify-start items-center">
          <div className="lg:hidden mr-4 text-white" onClick={handleClick}>
            {!sidebarOpen ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
          </div>
          <span className='hidden md:block relative w-[80px]'>
            <img src={logo} alt="Logo" width="80px" className='absolute top-[-50px]' />
          </span>
          BabyCare
        </div>
        {/* Navigation Links */}
        <ul className="flex item-center gap-6 ">
          {userData && <li className="text-white py-2 px-4 relative rounded-full bg-secondary cursor-pointer flex gap-1 justify-center items-center  hover:bg-secondary-dark">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
           
          </li>}
          {userData && <li onClick={() => { setHideChatContainer(false) }} className="text-white py-2 px-4 rounded-full bg-secondary cursor-pointer flex gap-1 justify-center items-center  hover:bg-secondary-dark">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
            </svg>
          </li>}
          {userData && <li>
            <div className="w-full flex items-center rounded-full  bg-secondary overflow-hidden">
              <img src={profile} alt={"Profile picture"} className="h-11 w-11 pt-2  object-cover opacity-75" />
            </div>
          </li>}
          {/* <li className="bg-secondary text-white py-2 px-8 rounded-full cursor-pointer hover:bg-secondary-dark"><Link to="/login">Sign In</Link></li> */}
          {!userData && pathname.includes('user') && pathname.includes('login')  && <li className="bg-white text-gray-500 py-2 px-8 rounded-full cursor-pointer hover:bg-gray-200"><Link to="/user/signup">New User?</Link></li>}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;

