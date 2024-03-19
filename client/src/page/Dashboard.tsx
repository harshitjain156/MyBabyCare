// import React, { useEffect, useRef, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';

// import logo from "../assets/logo.png"
// import ProfilePicture from '../components/ProfilePicture';
// import VaccinationCard from '../components/Vaccination';
// import UpcomingAppointmentsCard from '../components/UpcomingAppointmentsCard';




// const SidebarLinkGroup = ({
//   children,
//   activeCondition,
// }) => {
//   const [open, setOpen] = useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return <li>{children(handleClick, open)}</li>;
// };


// const Dashboard = ({ sidebarOpen, setSidebarOpen, type }) => {
//   const location = useLocation();
//   const { pathname } = location;

//   const trigger = useRef(null);
//   const sidebar = useRef(null);

//   const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
//   const [sidebarExpanded, setSidebarExpanded] = useState(
//     storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
//   );

//   // close on click outside
//   useEffect(() => {
//     const clickHandler = ( target ) => {
//       if (!sidebar.current || !trigger.current) return;
//       if (
//         !sidebarOpen ||
//         sidebar.current.contains(target) ||
//         trigger.current.contains(target)
//       )
//         return;
//       // setSidebarOpen(false);
//     };
//     document.addEventListener('click', clickHandler);
//     return () => document.removeEventListener('click', clickHandler);
//   });

//   // close if the esc key is pressed
//   useEffect(() => {
//     const keyHandler = ( keyCode ) => {
//       if (!sidebarOpen || keyCode !== 27) return;
//       // setSidebarOpen(false);
//     };
//     document.addEventListener('keydown', keyHandler);
//     return () => document.removeEventListener('keydown', keyHandler);
//   });

//   useEffect(() => {
//     localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
//     if (sidebarExpanded) {
//       document.querySelector('body')?.classList.add('sidebar-expanded');
//     } else {
//       document.querySelector('body')?.classList.remove('sidebar-expanded');
//     }
//   }, [sidebarExpanded]);

//   return (
//    <>
//   <h1 className="block font-semibold pl-8">Recommended Doctors</h1>
//   <div className="w-full overflow-x-auto flex whitespace-no-wrap scrollbar-hide py-4" style={{  overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//   {/* <div className="w-full overflow-x-auto flex whitespace-no-wrap scrollbar-hide py-4" > */}
//     <div className="flex-shrink-0 w-auto  bg-white shadow-2xl mx-2  p-4">
//       <ProfilePicture alt="Doctor Image" name="Dr. John Doe" rating={4} />
//     </div>
//     <div className="flex-shrink-0 w-auto bg-white shadow-2xl mx-2 p-4">
//       <ProfilePicture alt="Doctor Image" name="Dr. Jane Smith" rating={5} />
//     </div>
//     <div className="flex-shrink-0 w-auto  bg-white shadow-2xl mx-2  p-4">
//       <ProfilePicture alt="Doctor Image" name="Dr. John Doe" rating={4} />
//     </div>
//        <div className="flex-shrink-0 w-auto bg-white shadow-2xl mx-2 p-4">
//       <ProfilePicture alt="Doctor Image" name="Dr. Michael Johnson" rating={3} />
//     </div>
//     <div className="flex-shrink-0 w-auto bg-white shadow-2xl mx-2 p-4">
//       <ProfilePicture alt="Doctor Image" name="Dr. Emily Williams" rating={4} />
//     </div>
//     <div className="flex-shrink-0 w-auto  bg-white shadow-2xl mx-2  p-4">
//       <ProfilePicture alt="Doctor Image" name="Dr. John Doe" rating={4} />
//     </div>
//     <div className="flex-shrink-0 w-auto bg-white shadow-2xl mx-2 p-4">
//       <ProfilePicture alt="Doctor Image" name="Dr. David Brown" rating={5} />
//     </div>
//     <div className="flex-shrink-0 w-auto bg-white shadow-2xl mx-2 p-4">
//       <ProfilePicture alt="Doctor Image" name="Dr. Sarah Lee" rating={4} />
//     </div>
//   </div>
//   <div className='flex justify-evenly items-center'>
      
//   {/* <VaccinationCard/> */}
//   {/* <UpcomingAppointmentsCard/> */}
//   <VaccinationCard/>
//   </div>
// </>


//   );
// };

// export default Dashboard;


import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import logo from "../assets/logo.png"
import ProfilePicture from '../components/ProfilePicture';
import VaccinationCard from '../components/Vaccination';
import UpcomingAppointmentsCard from '../components/UpcomingAppointmentsCard';
import SearchBar from '../components/SearchBar';

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => React.ReactNode;
  activeCondition: boolean;
}

const SidebarLinkGroup: React.FC<SidebarLinkGroupProps> = ({
  children,
  activeCondition,
}) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

interface DashboardProps {
  sidebarOpen: boolean;

}

const Dashboard: React.FC<DashboardProps> = ({ sidebarOpen }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<HTMLDivElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!sidebarOpen || !sidebar.current || !trigger.current) return;
      if (
        sidebar.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      ) return;
      // setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.keyCode !== 27) return;
      // setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <>
  
      <h1 className="block font-bold pl-8">Recommended Doctors</h1>
      <div className="w-full  overflow-x-auto flex whitespace-no-wrap scrollbar-hide py-4" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex-shrink-0 w-auto  bg-white border mx-2  p-4">
          <ProfilePicture alt="Doctor Image" name="Dr. John Doe" rating={4} />
        </div>
        <div className="flex-shrink-0 w-auto  bg-white border  mx-2  p-4">
       <ProfilePicture alt="Doctor Image" name="Dr. John Doe" rating={4} />
     </div>
     <div className="flex-shrink-0 w-auto bg-white border  mx-2 p-4">
       <ProfilePicture alt="Doctor Image" name="Dr. Jane Smith" rating={5} />
     </div>
     <div className="flex-shrink-0 w-auto  bg-white border  mx-2  p-4">
       <ProfilePicture alt="Doctor Image" name="Dr. John Doe" rating={4} />
     </div>
        <div className="flex-shrink-0 w-auto bg-white border  mx-2 p-4">
       <ProfilePicture alt="Doctor Image" name="Dr. Michael Johnson" rating={3} />
     </div>
     <div className="flex-shrink-0 w-auto bg-white border  mx-2 p-4">
       <ProfilePicture alt="Doctor Image" name="Dr. Emily Williams" rating={4} />
     </div>
     <div className="flex-shrink-0 w-auto  bg-white border  mx-2  p-4">
       <ProfilePicture alt="Doctor Image" name="Dr. John Doe" rating={4} />
     </div>
     <div className="flex-shrink-0 w-auto bg-white border  mx-2 p-4">
       <ProfilePicture alt="Doctor Image" name="Dr. David Brown" rating={5} />
     </div>
     <div className="flex-shrink-0 w-auto bg-white border  mx-2 p-4">
       <ProfilePicture alt="Doctor Image" name="Dr. Sarah Lee" rating={4} />
     </div>
        {/* Add more ProfilePicture components */}
      </div>
  
      <div className='h-auto'>

        <h1 className="block font-bold pl-8 mt-8">Upcoming vaccinations</h1>
      <div className="w-full mt-4  flex justify-around px-4">
      
      <SearchBar searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}/>

      <input type='date'/>
     
    </div>
 
        <VaccinationCard />
        {/* <UpcomingAppointmentsCard/> */}
      </div>
    </>
  );
};

export default Dashboard;
