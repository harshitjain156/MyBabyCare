// import React, { useEffect, useRef, useState } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';

// import logo from "../assets/logo.png"
// import ProfilePicture from '../components/ProfilePicture';
// import VaccinationCard from '../components/Vaccination';
// import UpcomingAppointmentsCard from '../components/UpcomingAppointmentsCard';
// import SideDrawer from '../components/SideDrawer';




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


// const Layout = ({ sidebarOpen, setSidebarOpen, type, children }) => {
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
//     <div className='flex w-full'>
    
//   <SideDrawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
//    <div class={`h-auto w-full md:w-[75%] mt-24  flex-col justify-start `}>
//    {children}
//   </div>

//   </div>
//   );
// };

// export default Layout;


import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SideDrawer from '../components/SideDrawer';

interface SidebarLinkGroupProps {
  children: (handleClick: () => void, open: boolean) => JSX.Element;
  activeCondition: boolean;
}

const SidebarLinkGroup: React.FC<SidebarLinkGroupProps> = ({ children, activeCondition }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return <li>{children(handleClick, open)}</li>;
};

interface LayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string; // Add appropriate type for 'type' prop
}

const Layout: React.FC<LayoutProps> = ({ sidebarOpen, setSidebarOpen, children }) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<HTMLDivElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = (target: Event) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target.target as Node) || trigger.current.contains(target.target as Node))
        return;
      // setSidebarOpen(false);
    };
    
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.key !== '27') return;
      // setSidebarOpen(false);
    };
    
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <div className="flex  w-full ">
      
      <SideDrawer sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} type="someType"/>
     
      <div className={`h-full w-full pt-24  flex-col justify-start  overflow-scroll`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
