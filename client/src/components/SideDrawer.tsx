import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useAuth } from "../AuthContext/AuthContext";

interface SideDrawerProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
}


const SideDrawer: React.FC<SideDrawerProps> = ({ sidebarOpen, setSidebarOpen }) => {

  const { userData, updateUser } = useAuth();
  // console.log(userData)

 const  location = useLocation();
 const {pathname } = location;



  const trigger = useRef<HTMLDivElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!sidebarOpen || !sidebar.current || !trigger.current) return;
      const target = event.target as HTMLElement;
      if (trigger.current.contains(target) || sidebar.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!sidebarOpen || event.key !== '27') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute h-full lg:h-auto left-0 top-0 z-30 mt-16 flex  w-[75%] md:w-[25%] flex-col justify-start  overflow-y-hidden bg-primary duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col w-[100%] overflow-y-auto duration-300 ease-linear pt-2">
        {/* <!-- Sidebar Menu --> */}
        <nav className=" w-full text-white">
          {/* <!-- Menu Group --> */}
          <div>
            <ul className="mb-6 flex flex-col ">
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                <NavLink
                  to={`/${userData?.role.toLowerCase()}/dashboard`}
                  className={`group relative flex items-center gap-2.5 rounded-sm px-6 py-4 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-secondary-dark dark:hover:bg-meta-4 ${
                    (pathname === '#' || pathname.includes('dashboard')) && 'bg-secondary'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>

                  Home
                </NavLink>
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              {userData?.role.toLowerCase().toLocaleLowerCase() === "admin" && (
                <li>
                  <NavLink
                    to="#"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-4 px-6 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4 ${
                      pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    List of users
                  </NavLink>
                </li>
              )}
              {userData?.role.toLowerCase().toLocaleLowerCase() !== "doctor" && (
                <li>
                  <NavLink
                    to="#"
                    className={`group relative flex items-center gap-2.5 rounded-sm py-4 px-6 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4 ${
                      pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    Doctors
                  </NavLink>
                </li>
              )}
               <li>
                <NavLink
                  to={`/${userData?.role.toLowerCase()}/appointment`}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-4 px-6 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4 ${
                    pathname.includes('appointment') && 'bg-secondary'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>

                  Appointments
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-4 px-6 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Calendar
                </NavLink>
              </li>
              {userData?.role.toLowerCase().toLocaleLowerCase() !== "doctor" && (<li>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-4 px-6 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4 ${
                    pathname.includes('medical-records') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                    </svg>

                  Medical Records
                </NavLink>
              </li>)}
              <li>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-4 px-6 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="#"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-4 px-6 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4 ${
                    pathname.includes('settings') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 11.25h-.022a.75.75 0 0 1-.727-.783l.022-.094.885-5.31a1.5 1.5 0 0 0-1.33-1.737l-.134-.007a1.5 1.5 0 0 0-1.36 1.007l-1.045 3.143a.75.75 0 0 1-.718.513H8.43a.75.75 0 0 1-.717-.514l-1.054-3.155a1.5 1.5 0 0 0-1.36-1.006l-.133.006a1.5 1.5 0 0 0-1.33 1.737l.89 5.344a.75.75 0 0 1-.727.883H3.75a1.5 1.5 0 0 0 0 3h-.374a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 .75-.75H4.5v-.749a1.5 1.5 0 0 0-.206-.769l-.206-.309a1.5 1.5 0 0 0-.775-.508l-.184-.028a.75.75 0 0 1-.677-.747l.002-.098a.75.75 0 0 1 .746-.752l.185.002a.75.75 0 0 1 .673.535l.261.784a1.5 1.5 0 0 0 .69.767l.239.114v5.033a1.5 1.5 0 0 0 .436 1.059l.195.195a1.5 1.5 0 0 0 2.121 0l.195-.195a1.5 1.5 0 0 0 .436-1.059v-5.033l.239-.114a1.5 1.5 0 0 0 .69-.767l.26-.784a.75.75 0 0 1 1.31-.282l.262.393a1.5 1.5 0 0 0-.207.77v.748h.376a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75H15v.751h.008a1.5 1.5 0 0 0 .198.78l.207.309a1.5 1.5 0 0 0 .774.508l.185.028a.75.75 0 0 1 .675.748l-.001.099a.75.75 0 0 1-.728.752l-.183-.001a.75.75 0 0 1-.677-.535l-.262-.784a1.5 1.5 0 0 0-.69-.767l-.239-.114V11.25zM9 14.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg> */}

<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/${userData?.role.toLowerCase()}/login`}
                  onClick={()=>{ updateUser(null)}}
                  className={`group relative flex items-center gap-2.5 rounded-sm py-4 px-6 font-semibold text-bodydark1 duration-300 ease-in-out hover:bg-secondary dark:hover:bg-meta-4 ${
                    pathname.includes('logout') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 11.25h-.022a.75.75 0 0 1-.727-.783l.022-.094.885-5.31a1.5 1.5 0 0 0-1.33-1.737l-.134-.007a1.5 1.5 0 0 0-1.36 1.007l-1.045 3.143a.75.75 0 0 1-.718.513H8.43a.75.75 0 0 1-.717-.514l-1.054-3.155a1.5 1.5 0 0 0-1.36-1.006l-.133.006a1.5 1.5 0 0 0-1.33 1.737l.89 5.344a.75.75 0 0 1-.727.883H3.75a1.5 1.5 0 0 0 0 3h-.374a.75.75 0 0 1-.75-.75v-.5a.75.75 0 0 1 .75-.75H4.5v-.749a1.5 1.5 0 0 0-.206-.769l-.206-.309a1.5 1.5 0 0 0-.775-.508l-.184-.028a.75.75 0 0 1-.677-.747l.002-.098a.75.75 0 0 1 .746-.752l.185.002a.75.75 0 0 1 .673.535l.261.784a1.5 1.5 0 0 0 .69.767l.239.114v5.033a1.5 1.5 0 0 0 .436 1.059l.195.195a1.5 1.5 0 0 0 2.121 0l.195-.195a1.5 1.5 0 0 0 .436-1.059v-5.033l.239-.114a1.5 1.5 0 0 0 .69-.767l.26-.784a.75.75 0 0 1 1.31-.282l.262.393a1.5 1.5 0 0 0-.207.77v.748h.376a.75.75 0 0 1 .75.75v.5a.75.75 0 0 1-.75.75H15v.751h.008a1.5 1.5 0 0 0 .198.78l.207.309a1.5 1.5 0 0 0 .774.508l.185.028a.75.75 0 0 1 .675.748l-.001.099a.75.75 0 0 1-.728.752l-.183-.001a.75.75 0 0 1-.677-.535l-.262-.784a1.5 1.5 0 0 0-.69-.767l-.239-.114V11.25zM9 14.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg> */}

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                </svg>


                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SideDrawer;
