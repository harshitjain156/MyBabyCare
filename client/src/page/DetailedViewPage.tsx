// DetailedView.tsx

import { StarIcon } from '@heroicons/react/solid';
import { useAuth } from '../AuthContext/AuthContext';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../helper/endpoints';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import profile from "../assets/profile-picture.png";

// interface Doctor {
//   name: string;
//   phone: string;
//   specialization: string;
//   department: string;
//   imageUrl: string;
//   rating: number;
// }

// interface Appointment {
//   date: string;
//   timeslot: string;
//   childName: string;
//   age: number;
//   reason: string;
//   additionalDetails: string;
//   status: string;
// }

// interface Props {
//   doctor: Doctor;
//   appointment: Appointment;
// }

const DetailedViewPage: React.FC = () => {
   const {userData, updateUser}= useAuth();
   const {id} = useParams();
   const [doctor , setDoctor] =  React.useState<any>(null);
   const [ user, setUser] = React.useState<any>(null);
   const [appointment, setAppointment] =React.useState<any>(null);
  const navigate =  useNavigate();
//    const doctor = {
//     name: 'Rohit',
//     phone: '6392184098',
//     specialization: 'Neurologist',
//     department: 'Neurology',
//     imageUrl: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg',
//     rating: 4,
//   };
  
//   const appointment = {
//     date: '2024-03-14',
//     timeslot: '8:15 AM - 8:30 AM',
//     childName: 'Harshit Jain',
//     age: 5,
//     reason: 'ghb ghb ghnn fxvb vhnn cfdxv vvnnn vcgn gfcbn vvcc',
//     additionalDetails: 'hfgjn gnbc vvghjnv hbnbcg hbbvcghn gfgjn. vvn cb bhb.',
//     status: "Pending"
//   };
const [ flag, setFlag] = useState(false);

   console.log(id);
 
    const renderStars = (rating: any) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
          stars.push(
            <StarIcon key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
          );
        }
        return stars;
      };

      useEffect( ()=>{
        const fetchDetails = async() =>{
        try{
            const response = await axios.get(`${BASE_URL}api/v1/appointment/${id}`);
        //   console.log('Appointment details fetched successfully:', response.data.appointment);
          setDoctor({
            name: response.data.appointment.doctorId.name,
            specialization: response.data.appointment.doctorId.specialization,
            department: response.data.appointment.doctorId.department,
            imageUrl: response.data.appointment.doctorId.imageUrl,
            rating: response.data.appointment.doctorId.rating,
            status: response.data.appointment.doctorId.status
          })
          setUser({
            name: response.data.appointment.userId.name,
            imageUrl: response.data.appointment.userId.imageUrl,
            status: response.data.appointment.userId.status
          })
          setAppointment({
            date: ((response.data.appointment.date as string).split("T")[0]).split("-").reverse().join("-"),
            timeslot: response.data.appointment.timeslot,
            childName: response.data.appointment.childName,
            age: response.data.appointment.age,
            reason: response.data.appointment.reason,
            additionalDetails: response.data.appointment.additionalDetails,
            status: response.data.appointment.status,
            timeslotId: response.data.appointment.timeslotId
          })
        }
        catch{
            console.log("Error in Fetching Appointment Details");

        }
    }
    fetchDetails();

      }, [id, flag])



      const statusHandler =async (data:any)=>{
        try {
          const response = await axios.put(`${BASE_URL}api/v1/appointments/${data.id}/status`, { status: data.newStatus, timeslotId: data.timeslotId });
        //   console.log('Appointment status updated successfully:', response.data);
          setFlag((prev)=> !prev);
        
        } catch (error:any) {
          if (error.response) {
            console.error('Error updating appointment status:', error.response.data);
          } else if (error.request) {
            console.error('Error making request:', error.request);
          } else {
            console.error('Error:', error.message);
          }
        }
      }

  return (
    <div className="container mx-auto py-8 px-8">
      <div className="flex items-center justify-between mb-8">
      <span className='flex items-center justify-start gap-2'>
      <Link
          to={`/${userData.role.toLowerCase()}/appointment`}
          className="text-gray-600 hover:text-gray-800  inline-block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900"> Appointment Details</h1></span>
        <div className='flex justify-start items-center gap-4 mb-4'>
       
        {/* <h1 className="text-xl font-bold ">Appointment Booking</h1> */}
      </div>
        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Back
        </button> */}
      </div>
      {doctor && appointment && <div className="flex flex-wrap">
        <div className="md:w-1/2">
          <h2 className="font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900  mb-4">{`${userData.role==="DOCTOR"? "User":"Doctor"} Information`}</h2>
          { userData.role === "USER" && <div className="flex items-center mb-4">
          <span className='relative mr-4'>
        <img src={doctor.imageUrl || profile} alt={doctor.name} className="relative inline-block h-20 w-20 !rounded-full object-cover object-center" />
        <span
                className={`absolute right-0 bottom-0 h-5 w-5 rounded-full border-2 border-white ${doctor.status ==="online" ? `bg-success`: `bg-slate-400`}`}
               
              ></span>
              </span>
            <div>
              <h3 className="text-lg font-semibold">{doctor.name}</h3>
              <p>{doctor.specialization}</p>
              <p>{doctor.department}</p>
            </div>
          </div>}
          { userData.role === "DOCTOR" && <div className="flex items-center mb-4">
          <span className='relative mr-4'>
        <img src={user.imageUrl || profile} alt={user.name} className="relative inline-block h-20 w-20 !rounded-full object-cover object-center" />
        <span
                className={`absolute right-0 bottom-0 h-5 w-5 rounded-full border-2 border-white ${user.status ==="online" ? `bg-success`: `bg-slate-400`}`}
               
              ></span>
              </span>
              <div>
              <h3 className="text-lg font-semibold">{user.name}</h3>
            
            </div>
            
          </div>}
          {/* <p>Phone: {doctor.phone}</p> */}
          { userData.role === "USER" &&  <span className='block my-8'>
          <h3 className=" font-semibold">Rating:</h3>
          <span className="flex font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-900">
            {renderStars(doctor.rating)}
          </span>
          </span> }
          <span className='block mb-8'>
          <h3 className="font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mb-2">Appointment Status</h3>
          <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 mt-2 px-3 text-sm font-medium ${
                        appointment.status === 'Booked'
                        ? 'bg-success text-success'
                        : appointment.status === 'Cancelled'
                        ? 'bg-danger text-danger'
                        : 'bg-warning text-warning'
                    }`}
                  >
                    {appointment.status}
          </span>
          </span> 

        </div>
        <div className="md:w-1/2 flex flex-col gap-2">
          <h2 className="font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 mb-4">Appointment Details</h2>
          <span>
          <h3 className=" font-semibold">Date:</h3>
          <p>{appointment.date}</p>
          </span>
          <span>
          <h3 className=" font-semibold">Timeslot:</h3>
          <p>{appointment.timeslot}</p>
          </span>
          <span>
          <h3 className=" font-semibold">Child Name:</h3>
          <p>{appointment.childName}</p>
          </span>
          
          <span>
          <h3 className=" font-semibold">Age:</h3>
          <p>{appointment.age}</p>
          </span>
          <span>
          <h3 className=" font-semibold">Reason:</h3>
          <p> {appointment.reason}</p>
          </span>
          {appointment.additionalDetails.length> 0 && <span>
          <h3 className=" font-semibold">Additional Details:</h3>
          <p>{appointment.additionalDetails}</p>
          </span>}
        </div>
       
      </div>}
      
      {doctor && appointment && <div className='flex flex-wrap gap-2 justify-evenly items-center font-semibold mt-4'>
        {userData.role === "DOCTOR" &&  appointment.status=== "Pending" &&  <button onClick={()=> statusHandler({id: id, timeslotId: appointment.timeslotId, newStatus: "Booked"})}  className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-20 rounded-full">
        Approve
        </button>}
        {userData.role === "USER" && (appointment.status=== "Pending" || appointment.status=== "Booked" )&& <button  onClick={()=>{navigate(`/user/reschedule-appointment/${id}`)}}   className="bg-secondary hover:bg-secondary-dark text-white font-semibold py-2 px-20 rounded-full">
        Reschedule
        </button>}
                
        <button onClick={()=> statusHandler({id: id, timeslotId: appointment.timeslotId, newStatus: "Cancelled"})} className="bg-transparent hover:bg-danger text-danger font-semibold hover:text-white py-2 px-20 border border-danger hover:border-transparent rounded-full">
        Cancel
        </button>

        </div>}
    </div>
  );
};

export default DetailedViewPage;
