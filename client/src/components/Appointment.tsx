import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DatePicker from './DatePicker';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../helper/endpoints';
import { useAuth } from "../AuthContext/AuthContext";

type DashboardType = 'admin' | 'user'| 'doctor';


const Appointment: React.FC = () => {
  const { userData, updateUser } = useAuth();
  // console.log(userData)
 


const  navigate = useNavigate();

    // const doctors = [
    //     {
    //       name: "Dr. John Michael",
    //       phone: "+1234567890",
    //       specialization: "Eye Specialist",
    //       department: "Ophthalmology",
    //       status: "online",
    //       appointmentDate: "2022-04-23",
    //       timeslot: "10:00 AM - 12:00 PM",
    //       imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
    //     },
    //     {
    //       name: "Dr. Alexa Liras",
    //       phone: "+1987654321",
    //       specialization: "Cardiologist",
    //       department: "Cardiology",
    //       status: "offline",
    //       appointmentDate: "2024-04-23",
    //       timeslot: "1:00 PM - 3:00 PM",
    //       imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg"
    //     },
    //     {
    //       name: "Dr. Laurent Perrier",
    //       phone: "+1122334455",
    //       specialization: "Orthopedic Surgeon",
    //       department: "Orthopedics",
    //       status: "offline",
    //       appointmentDate: "2024-09-19",
    //       timeslot: "9:00 AM - 11:00 AM",
    //       imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg"
    //     },
    //     {
    //       name: "Dr. Michael Levi",
    //       phone: "+9876543210",
    //       specialization: "Dermatologist",
    //       department: "Dermatology",
    //       status: "online",
    //       appointmentDate: "2024-12-24",
    //       timeslot: "3:00 PM - 5:00 PM",
    //       imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
    //     },
    //     {
    //       name: "Dr. Richard Gran",
    //       phone: "+4433221100",
    //       specialization: "Neurologist",
    //       department: "Neurology",
    //       status: "offline",
    //       appointmentDate: "2024-10-04",
    //       timeslot: "11:00 AM - 1:00 PM",
    //       imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg"
    //     },

    //     {
    //         name: "Dr. Laurent Perrier",
    //         phone: "+1122334455",
    //         specialization: "Orthopedic Surgeon",
    //         department: "Orthopedics",
    //         status: "offline",
    //         appointmentDate: "2023-09-19",
    //         timeslot: "9:00 AM - 11:00 AM",
    //         imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg"
    //       },
    //       {
    //         name: "Dr. Michael Levi",
    //         phone: "+9876543210",
    //         specialization: "Dermatologist",
    //         department: "Dermatology",
    //         status: "online",
    //         appointmentDate: "2023-12-24",
    //         timeslot: "3:00 PM - 5:00 PM",
    //         imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
    //       },
    //       {
    //         name: "Dr. Richard Gran",
    //         phone: "+4433221100",
    //         specialization: "Neurologist",
    //         department: "Neurology",
    //         status: "offline",
    //         appointmentDate: "2024-10-04",
    //         timeslot: "11:00 AM - 1:00 PM",
    //         imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg"
    //       },

    //     {
    //         name: "Dr. John Michael",
    //         phone: "+1234567890",
    //         specialization: "Eye Specialist",
    //         department: "Ophthalmology",
    //         status: "online",
    //         appointmentDate: "2023-04-23",
    //         timeslot: "10:00 AM - 12:00 PM",
    //         imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
    //       },
    //       {
    //         name: "Dr. Alexa Liras",
    //         phone: "+1987654321",
    //         specialization: "Cardiologist",
    //         department: "Cardiology",
    //         status: "offline",
    //         appointmentDate: "2023-04-23",
    //         timeslot: "1:00 PM - 3:00 PM",
    //         imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg"
    //       },
    //       {
    //         name: "Dr. Laurent Perrier",
    //         phone: "+1122334455",
    //         specialization: "Orthopedic Surgeon",
    //         department: "Orthopedics",
    //         status: "offline",
    //         appointmentDate: "2024-09-19",
    //         timeslot: "9:00 AM - 11:00 AM",
    //         imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg"
    //       },
    //       {
    //         name: "Dr. Michael Levi",
    //         phone: "+9876543210",
    //         specialization: "Dermatologist",
    //         department: "Dermatology",
    //         status: "online",
    //         appointmentDate: "2024-12-24",
    //         timeslot: "3:00 PM - 5:00 PM",
    //         imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"
    //       },
    //       {
    //         name: "Dr. Richard Gran",
    //         phone: "+4433221100",
    //         specialization: "Neurologist",
    //         department: "Neurology",
    //         status: "offline",
    //         appointmentDate: "2024-10-04",
    //         timeslot: "11:00 AM - 1:00 PM",
    //         imageUrl: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg"
    //       }
    //   ];

    const [selectedDate ,setSelectedDate] = useState('');

    const handleDateSelect = (date:any) => {
      setSelectedDate(date);
    };


    console.log(selectedDate);
  


      const [appointment, setAppointments] = useState([]);

      useEffect(() => {
        const fetchAppointments = async () => {
          try {
            const response = await axios.get(`${BASE_URL}api/v1/user-appointments/${userData.userId}`);
            console.log(response.data)
            const doctorAppointments = await response.data.data.map((appointment:any) => ({
    name: appointment.doctorId.name,
    phone: appointment.doctorId.phone,
    specialization: appointment.doctorId.specialization,
    department: appointment.doctorId.department,
    status: appointment.doctorId.status,
    appointmentDate: (appointment.date as string).split("T")[0],
    timeslot: appointment.timeslot,
    imageUrl: appointment.doctorId.imageUrl
  }));

      // console.log(doctorAppointments);// Replace '/api/appointments' with your backend endpoint
            setAppointments(doctorAppointments);
            
          
          } catch (error) {
            console.error('Error fetching appointments:', error);
           
          }
        };
    
        fetchAppointments();
      }, []);



      const [doctorAppointments, setDoctorAppointments] = useState<any[]>([]); // Assuming doctorAppointments data structure

      useEffect(() => {
        // Fetch doctor appointments data from API
        const fetchDoctorAppointments = async () => {
          try {
            const response = await axios.get(`${BASE_URL}api/v1/doctor-appointments/${userData.userId}`); // Replace with your API endpoint
            // Filter appointments for the logged-in doctor
         
    
           const doctorAppointments = await response.data.data.map((appointment:any) => ({
            childName: appointment.childName,
            age: appointment.age,
            appointmentDate: (appointment.date as string).split("T")[0],
            timeslot: appointment.timeslot,
            reason: appointment.reason,
            additionalDetails: appointment.additionalDetails
    
          }));
          // console.log("doctors", doctorAppointments);
            setDoctorAppointments(doctorAppointments);
          } catch (error) {
            console.error('Error fetching doctor appointments:', error);
          }
        };
    
        fetchDoctorAppointments();
      }, []);

      
      // console.log(appointment)
      const [isCalendarVisible, setCalendarVisibility] = useState(false);

  const toggleCalendarVisibility = () => {
    setCalendarVisibility(!isCalendarVisible);
  };
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const filterAppointments = (filter: string) => {
    setFilter(filter);
    setCurrentPage(1);
    setCurrentPage2(1) // Reset current page when changing filters
};


const isPastAppointment = (appointmentDate: string) => {
    const today = new Date();
    // console.log(today)
    const appointmentDateObj = new Date(appointmentDate);
    return appointmentDateObj.getTime() < today.getTime();
};

const isUpcomingAppointment = (appointmentDate: string) => {
    const today = new Date();
    const appointmentDateObj = new Date(appointmentDate);
    return appointmentDateObj.getTime() >= today.getTime();
};

const filteredDoctors = appointment.filter((doctor :any) => {
    if (filter === 'past') {
        return isPastAppointment(doctor?.appointmentDate);
    } else if (filter === 'upcoming') {
        return isUpcomingAppointment(doctor?.appointmentDate);
    } else {
        return true;
    }
}).filter((doctor:any) =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    || doctor.phone.includes(searchTerm)||doctor?.specialization.toLowerCase().includes(searchTerm.toLowerCase())||doctor.department.toLowerCase().includes(searchTerm.toLowerCase()));




  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

 

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);



  const [searchTerm2, setSearchTerm2] = useState('');
  const [currentPage2, setCurrentPage2] = useState(1);
  const [doctorAppointments2, setDoctorAppointments2] = useState([]);

  useEffect(() => {
    // Fetch doctor appointments data from API
    const fetchDoctorAppointments2 = async () => {
      try {
        const response = await axios.get(`${BASE_URL}api/v1/doctor-appointments/${userData.userId}`); // Replace with your API endpoint
        
        const doctorAppointments = response.data.data.map((appointment :any) => ({
          childName: appointment.childName,
          age: appointment.age,
          appointmentDate: (appointment.date as string).split("T")[0],
          timeslot: appointment.timeslot,
          reason: appointment.reason,
          additionalDetails: appointment.additionalDetails
        }));

        setDoctorAppointments2(doctorAppointments);
      } catch (error) {
        console.error('Error fetching doctor appointments:', error);
      }
    };

    fetchDoctorAppointments2();
  }, []);




  const filteredDoctors2 = doctorAppointments2.filter((doctor :any) => {
    if (filter === 'past') {
      return isPastAppointment(doctor.appointmentDate);
    } else if (filter === 'upcoming') {
      return isUpcomingAppointment(doctor.appointmentDate);
    } else {
      return true;
    }
  }).filter((doctor: any) =>
    doctor.childName.toLowerCase().includes(searchTerm.toLowerCase())
    || doctor.age.toString().includes(searchTerm)
    || doctor.reason.toLowerCase().includes(searchTerm.toLowerCase())
    || doctor.additionalDetails.toLowerCase().includes(searchTerm.toLowerCase()));

  const doctorsPerPage2 = 5;
  const indexOfLastDoctor2 = currentPage2 * doctorsPerPage2;
  const indexOfFirstDoctor2 = indexOfLastDoctor2 - doctorsPerPage2;
  const currentDoctors2 = filteredDoctors2.slice(indexOfFirstDoctor2, indexOfLastDoctor2);

  const paginate2 = (pageNumber: any) => setCurrentPage2(pageNumber);
  



      
      
  return (
   <div>
   {/* <SearchBar/> */}

   <div className="relative flex flex-col w-full h-full text-gray-700 bg-white  bg-clip-border">
  <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white rounded-none bg-clip-border">
    <div className="flex items-center justify-between gap-8 mb-8">
      <div>
        <h5
          className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          Appointments
        </h5>
        <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          See information about all booked appointments
        </p>
      </div>
      <div className="flex flex-col gap-2 shrink-0 sm:flex-row">
        {/* <button
          className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          view all
        </button> */}
        {userData?.role.toLocaleLowerCase() ==="user" && <button
          className="flex select-none items-center gap-3 rounded-lg bg-secondary py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"  onClick={()=> navigate("doctor")}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
          Book Appointment
        </button>}
      </div>
    </div>
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="block w-full overflow-hidden md:w-max">
        <nav>
          <ul role="tablist" className="relative flex flex-row p-1 rounded-lg bg-blue-gray-50 bg-opacity-60">
            <li role="tab"
              className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
              data-value="all">
              <div className="z-20 text-inherit"   onClick={() => filterAppointments('all')}>
                &nbsp;&nbsp;All&nbsp;&nbsp;
              </div>
            { filter==='all' && <div className="absolute inset-0 z-10 h-full bg-white rounded-md shadow shadow-secondary"></div>}
            </li>
            <li role="tab"
              className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
              data-value="Upcoming">
              <div className="z-20 text-inherit"   onClick={() => filterAppointments('upcoming')}>
                &nbsp;&nbsp;Upcoming&nbsp;&nbsp;
              </div>
              { filter==='upcoming' && <div className="absolute inset-0 z-10 h-full bg-white rounded-md shadow shadow-secondary"></div>}
            </li>
            <li role="tab"
              className="relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-blue-gray-900"
              data-value="Past">
              <div className="z-20 text-inherit"   onClick={() => filterAppointments('past')}>
                &nbsp;&nbsp;Past&nbsp;&nbsp;
              </div>
              { filter==='past' && <div className="absolute inset-0 z-10 h-full bg-white rounded-md shadow shadow-secondary"></div>}
            </li>
          </ul>
        </nav>
      </div>
      <div className="w-full md:w-2/3 flex content-start justify-around">
      
        <SearchBar searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}/>

        <input type='date' value={selectedDate}  onChange={(e) => handleDateSelect(e.target.value)}/>
      
        {/* <span onClick={toggleCalendarVisibility} className="text-white py-2 px-4   rounded-md bg-secondary cursor-pointer flex gap-1 justify-center items-center  hover:bg-secondary-dark">
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
               
               {isCalendarVisible && <Calendar className="text-black fixed z-50 top-64 right-16 " />}
                  
           
          </span> */}
          {/* <DatePicker /> */}
        {/* <div className="relative h-10 w-full min-w-[200px]">
          <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" aria-hidden="true" className="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
            </svg>
          </div>
          <input
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" " />
          <label
            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Search
          </label>
        </div> */}
       
      </div>
    </div>
   
  </div>
  <div className="p-6 px-0 overflow-scroll">
    {userData?.role.toLocaleLowerCase() ==="user" && <table className="w-full mt-4 text-left table-auto min-w-max">
      <thead>
        <tr>
          <th
            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <p
              className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Doctor
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg> */}
            </p>
          </th>
          <th
            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <p
              className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Specialization
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg> */}
            </p>
          </th>
          <th
            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <p
              className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Status
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg> */}
            </p>
          </th>
          <th
            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <p
              className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
              Date of appointment
              {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" aria-hidden="true" className="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"></path>
              </svg> */}
            </p>
          </th>
          <th
            className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            <p
              className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Time slot
            </p>
          </th>
        </tr>
      </thead>
     { currentDoctors.map((doctor:any, index) => 
  <tr>
    <td key={index} className="p-4 border-b border-blue-gray-50">
      <div className="flex items-center gap-3">
        <img src={doctor.imageUrl} alt={doctor.name} className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
        <div className="flex flex-col">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {doctor.name}
          </p>
          {/* <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
            {doctor.phone}
          </p> */}
        </div>
      </div>
    </td>
    <td className="p-4 border-b border-blue-gray-50">
      <div className="flex flex-col">
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
          {doctor.specialization}
        </p>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900 opacity-70">
          {doctor.department}
        </p>
      </div>
    </td>
    <td className="p-4 border-b border-blue-gray-50">
      <div className="w-max">
        <div className={`relative grid items-center px-2 py-1 font-sans text-xs font-bold ${doctor.status === 'online' ? 'text-green-900 bg-green-500/20' : 'text-blue-gray-900 bg-blue-gray-500/20'} uppercase rounded-md select-none whitespace-nowrap`}>
          <span>{doctor.status}</span>
        </div>
      </div>
    </td>
    <td className="p-4 border-b border-blue-gray-50">
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {doctor.appointmentDate}
      </p>
    </td>
    <td className="p-4 border-b border-blue-gray-50">
      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
        {doctor.timeslot}
      </p>
    </td>
  </tr>
)}
    </table>}
    {userData?.role.toLowerCase() ==='doctor' && <table className="w-full mt-4 text-left table-auto min-w-max">
      <thead>
        <tr>
          <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            Date
          </th>
          <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            Time slot
          </th>
          <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            Child Name
          </th>
          <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            Age
          </th>
          <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            Reason
          </th>
          <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
            Additional Details
          </th>
        </tr>
      </thead>
      <tbody>
        {currentDoctors2.map((appointment : any, index) => (
          <tr key={index}>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {appointment.appointmentDate}
              </p>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {appointment.timeslot}
              </p>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {appointment.childName}
              </p>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {appointment.age}
              </p>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {appointment.reason}
              </p>
            </td>
            <td className="p-4 border-b border-blue-gray-50">
              <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                {appointment.additionalDetails}
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>}
  </div>
  <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
    Page {userData?.role.toLowerCase() ==='doctor'? currentPage2 :currentPage} of {userData?.role.toLowerCase() ==='doctor'?  Math.ceil(filteredDoctors2.length / doctorsPerPage2) :  Math.ceil(filteredDoctors.length / doctorsPerPage)}
    </p>
    <div className="flex gap-2">
      <button
      onClick={userData?.role.toLowerCase() ==='doctor'?() => paginate2(currentPage2 - 1) :() => paginate(currentPage - 1)}
      disabled={userData?.role.toLowerCase() ==='doctor'? currentPage2 === 1:currentPage === 1}
        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        Previous
      </button>
      <button
       onClick={userData?.role.toLowerCase() ==='doctor'? () => paginate2(currentPage2 + 1) : () => paginate(currentPage + 1)}
         
         disabled={userData?.role.toLowerCase() ==='doctor'? indexOfLastDoctor2 >= filteredDoctors2.length : indexOfLastDoctor >= filteredDoctors.length}
        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        Next
      </button>
    </div>
  </div>
</div>
   </div>
  )
}

export default Appointment;