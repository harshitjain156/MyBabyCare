// import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom';

// const BookingAppointmentForm = () => {
//   const {doctorId} = useParams();
//   console.log(doctorId)
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//     setSelectedTimeSlot(null);
//   };

//   const handleTimeSlotSelect = (timeSlot) => {
//     setSelectedTimeSlot(timeSlot);
//     setShowForm(true);
//   };

//   const handleFormClose = () => {
//     setShowForm(false);
//   };

//   const handleFormSubmit = (appointment) => {
//     // Handle form submission logic here, e.g., API call
//     console.log('Appointment Details:', appointment);
//     setShowForm(false);
//   };

//   // Dummy data for available time slots
//   const dummyAvailableSlots = {
//     '2024-03-01': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}, {startTime:'11:00 AM', endTime: '11:45 AM'}],
//     '2024-03-02': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}],
//     '2024-03-03': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}, {startTime:'11:00 AM', endTime: '11:45 AM'}],
//     '2024-03-04': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}],
//     '2024-03-05': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}, {startTime:'11:00 AM', endTime: '11:45 AM'}],
//     '2024-03-06': [{startTime:'09:00 AM', endTime: '09:45 AM'}, {startTime:'10:00 AM', endTime: '10:45 AM'}],
//     // Add more dates and time slots as needed
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className='flex justify-start items-center gap-4 mb-4'>
//       <Link
//          to="/user/appointment/doctor"
//         className="text-gray-600 hover:text-gray-800  inline-block"
//  >
//                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
//   <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
// </svg>
//               </Link>
//       <h1 className="text-xl font-bold ">Appointment Booking</h1></div>
//       <div className="flex flex-wrap -mx-4">
//         <div className="w-full md:w-1/2 px-4">
//           <h2 className="text-sm font-semibold mb-2">Select Date</h2>
//           <div className="mb-4">
//             <input
//               type="date"
//               className="border rounded px-4 py-2 w-full"
//               onChange={(e) => handleDateSelect(e.target.value)}
//             />
//           </div>
//           <h2 className="text-sm font-semibold mb-2">Select Time Slot</h2>
//           <div className="space-y-2">
//             {selectedDate &&
//               (dummyAvailableSlots[selectedDate] ? (
//                 dummyAvailableSlots[selectedDate].map((slot) => (
//                   <button
//                     key={slot}
//                     onClick={() => handleTimeSlotSelect(slot)}
//                     className={`block w-full border rounded px-4 py-2 ${
//                      selectedTimeSlot && selectedTimeSlot.startTime === slot.startTime && selectedTimeSlot.endTime === slot.endTime
//                         ? 'bg-primary text-white'
//                         : 'hover:bg-gray-200'
//                     }`}
//                   >
//                    {`${slot.startTime} - ${slot.endTime}`}
//                   </button>
//                 ))
//               ) : (
//                 <p>No available slots for selected date</p>
//               ))}
//           </div>
//         </div>
//         <div className="w-full md:w-1/2 px-4">
         
//             <div>
//               {/* <h2 className="text-xl font-semibold mb-2">Book Appointment</h2> */}
//               <AppointmentForm
//                 selectedDate={selectedDate}
//                 selectedTimeSlot={selectedTimeSlot}
//                 onSubmit={handleFormSubmit}
//               />
//             </div>
         
//         </div>
//       </div>
//     </div>
//   );
// };

// const AppointmentForm = ({ selectedDate, selectedTimeSlot, onSubmit }) => {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const childName = e.target.elements.childName.value;
//     const age = e.target.elements.age.value;
//     const reason = e.target.elements.reason.value;
//     const additionalDetails = e.target.elements.additionalDetails.value;

//     const appointment = {
//       date: selectedDate,
//       timeSlot: selectedTimeSlot,
//       childName,
//       age,
//       reason,
//       additionalDetails,
//     };
//     onSubmit(appointment);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//         <label htmlFor="childName" className="block text-sm  text-gray-700  font-semibold">
//           Child's Name:
//         </label>
//         <input type="text" id="childName" name="childName" className="form-input mt-1 block w-full" required />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="age" className="block text-sm  text-gray-700 font-semibold">
//           Age:
//         </label>
//         <input type="number" id="age" name="age" className="form-input mt-1 block w-full font-semibold" required />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="reason" className="block text-sm font-semibold text-gray-700">
//           Reason for Appointment:
//         </label>
//         <textarea id="reason" name="reason" className="form-textarea mt-1 block border rounded w-full" required />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="additionalDetails" className="block text-sm font-semibold text-gray-700">
//           Additional Details:
//         </label>
//         <textarea id="additionalDetails" name="additionalDetails" className="form-textarea mt-1 block rounded w-full border" />
//       </div>
//       <div className='flex justify-center items-center'>
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-secondary-dark">
//         Book Appointment
//       </button>
//       </div>
//     </form>
//   );
// };

// export default BookingAppointmentForm;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { BASE_URL } from 'helper/endpoints';
import { toast } from 'react-toastify';
import { useAuth } from "../AuthContext/AuthContext";
import {appointmentBookingValidation} from "../helper/validate"

const RescheduleAppointmentForm = () => {
    const { id } = useParams();
    const [appointment, setAppointment] =React.useState({
        doctorId: "",
        date: "",
        timeslot: "",
        childName: "",
        age: "",
        reason: "",
        additionalDetails: "",
        status: "Pending",
        timeslotId: ""
      });
    
    useEffect( ()=>{
        const fetchDetails = async() =>{
        try{
            const response = await axios.get(`${BASE_URL}api/v1/appointment/${id}`);
        //   console.log('Appointment details fetched successfully:', response.data.appointment);
        
          setAppointment({
            doctorId: response.data.appointment.doctorId._id,
            date: response.data.appointment.date,
            timeslot: response.data.appointment.timeslot,
            childName: response.data.appointment.childName,
            age: response.data.appointment.age,
            reason: response.data.appointment.reason,
            additionalDetails: response.data.appointment.additionalDetails,
            status: response.data.appointment.status,
            timeslotId: response.data.appointment.timeslotId
          })

          formik.setValues({
            childName: response.data.appointment.childName,
            age: response.data.appointment.age,
            reason: response.data.appointment.reason,
            additionalDetails: response.data.appointment.additionalDetails,
           
          })

          console.log(appointment);
        }
        catch{
            console.log("Error in Fetching Appointment Details");

        }
    }
    fetchDetails();

      }, [id])

  const { userData, updateUser } = useAuth();
  // console.log(userData)

 const navigate =  useNavigate();

 
  // console.log(doctorId)
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [ availableSlot, setAvailableSlots] = useState([]);

  const [slotError, setSlotError] = useState(null)

  const [minDate, setMinDate] = useState(null);

  // Function to set the minimum date to today
  const setMinDateToToday = (date) => {
    const today = new Date(date);
    console.log(date)
    today.setDate(today.getDate() + 3);
    const minDateString = today.toISOString().split('T')[0];
    setMinDate(minDateString);
  };

  // Call the function when the component mounts
  useEffect(() => {
    if(appointment.date)
    setMinDateToToday(appointment.date);
  }, [appointment.date]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    console.log(timeSlot);
    setSelectedTimeSlot(timeSlot);
    setShowForm(true);
  };


    // Fetch available slots when doctor or date changes
    useEffect(() => {
      const fetchAvailableSlots = async () => {
        try {
          if (appointment.doctorId && selectedDate) {
            const response = await axios.post(`${BASE_URL}api/v1/available-slots`, {
             doctorId: appointment.doctorId, date: selectedDate 
            
            });

            console.log(appointment.doctorId, selectedDate)
            setAvailableSlots(response.data.availableSlots);
            console.log(response)

          }
        } catch (error) {
          console.error('Error fetching available slots:', error);
        }
      };
      fetchAvailableSlots();
    }, [appointment.doctorId, selectedDate]);

    // console.log(selectedDate, selectedTimeSlot)

    const [loading, setLoading] = useState(false);

  const handleFormClose = () => {
    setShowForm(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
    
      const response = await axios.patch(`${BASE_URL}api/v1/reschedule/${id}`, {
        ...values,
        _id: id,
        doctorId: appointment.doctorId,
        userId: userData.userId,
        date: selectedDate,
        timeslot: selectedTimeSlot.timeslot,
        timeslotId: selectedTimeSlot._id,
        status: "Pending",

      });
      toast.success('Rescheduled Appointment submitted successfully')
      console.log('Rescheduled Appointment submitted successfully:', response.data);
      navigate("/user/appointment");

    setLoading(false)
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast.error("An unexpected error occurred while processing your request");
      setLoading(false)
      // Handle error, e.g., show an error message
    }
  };


  const formik = useFormik({
    initialValues: {
      childName: "",
      age: "",
      reason: "",
      additionalDetails: ""
    },
    validate: appointmentBookingValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: handleSubmit
  });



  



  return (
    <div className="container mx-auto px-4 py-8">
      <div className='flex justify-start items-center gap-4 mb-4'>
        <Link
          to="/user/appointment/doctor"
          className="text-gray-600 hover:text-gray-800  inline-block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
        </Link>
        <h1 className="text-xl font-bold ">Appointment Booking</h1>
      </div>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full md:w-1/2 px-4">
          <h2 className="text-sm font-semibold mb-2">Select Date to book time slot<span className="text-red-500">*</span></h2>
          <div className="mb-4">
            <input
              type="date"
              min={minDate}
              className="border rounded px-4 py-2 w-full"
              onChange={(e) => handleDateSelect(e.target.value)}
            />
          </div>
          {/* <h2 className="text-sm font-semibold mb-2">Select Time Slot</h2> */}
          <div className="space-y-2">
            {selectedDate &&
              (availableSlot.length!==0 ? (
                availableSlot.map((slot, index) => (
                  <button
                    key={index}
                    onClick={() => handleTimeSlotSelect(slot)}
                    className={`block w-full border rounded px-4 py-2 ${
                      selectedTimeSlot && selectedTimeSlot.timeslot === slot.timeslot
                        ? 'bg-primary text-white'
                        : 'hover:bg-gray-200'
                      }`}
                  >
                    {`${slot.timeslot}`}
                  </button>
                ))
              ) : (
                <p  className='text-center'>No available slots for selected date</p>
              ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 px-4">
          <div>
            <form onSubmit={formik.handleSubmit}>
             
              <div className="mb-4">
                <label htmlFor="childName" className="block text-sm  text-gray-700  font-semibold">
                  Child's Name:<span className="text-red-500">*</span>
                </label>
                <span >
                <input

               {...formik.getFieldProps("childName")}

               value={formik.values.childName || appointment.childName}
                  type="text"
                  id="childName"
                  name="childName"
                  className="form-input mt-1 block w-full"
               
                />
                {formik.errors.childName && (
                  <span className="text-red-500 block text-center  mt-1 mx-4 text-[12px]">
                    {formik.errors.childName}
                  </span>
                )}
                </span>
              </div>
              
              
              <div className="mb-4">
                <label htmlFor="age" className="block text-sm  text-gray-700 font-semibold">
                  Age:<span className="text-red-500">*</span>
                </label>
                <span>
                <input

          {...formik.getFieldProps("age")}
          value={formik.values.age || appointment.age}
                  type="number"
                  id="age"
                  name="age"
                  min="0"
                  max="20"
                  className="form-input mt-1 block w-full font-medium"
                 
                 
                />
                {formik.errors.age && (
                  <span className="text-red-500 block text-center  mt-1 mx-4 text-[12px]">
                    {formik.errors.age}
                  </span>
                )}
                </span>
              </div>
              
              
              <div className="mb-4">
                <label htmlFor="reason" className="block text-sm font-semibold text-gray-700">
                  Reason for Appointment:<span className="text-red-500">*</span>
                </label>
                <span>
                <textarea

          {...formik.getFieldProps("reason")}
          value={formik.values.reason || appointment.reason}
                  id="reason"
                  name="reason"
                  className="form-textarea mt-1 block border rounded w-full"
                  
                
                />
                {formik.errors.reason && (
                  <span className="text-red-500 block text-center  mt-1 mx-4 text-[12px]">
                    {formik.errors.reason}
                  </span>
                )}
                </span>
              </div>
              
              
              <div className="mb-4">
                <label htmlFor="additionalDetails" className="block text-sm font-semibold text-gray-700">
                  Additional Details:
                </label>
                <span>
                <textarea

              {...formik.getFieldProps("additionalDetails")}
              value={formik.values.additionalDetails || appointment.additionalDetails}
                  id="additionalDetails"
                  name="additionalDetails"
                  className="form-textarea mt-1 block rounded w-full border"
                
                />
                 {formik.errors.additionalDetails && (
                  <span className="text-red-500 block text-center mt-1 mx-4 text-[12px]">
                    {formik.errors.additionalDetails}
                  </span>
                )}
                </span>
              </div>
             

              <div className='flex justify-center items-center'>
              <button
                  type="submit"
                  className={`${
                    formik.isValidating || formik.isSubmitting || !formik.isValid || !selectedTimeSlot?.timeslot
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-secondary-dark"
                  }`}
                  disabled={formik.isSubmitting || !formik.isValid || !selectedTimeSlot?.timeslot}
                >
                  {formik.isSubmitting ? "Booking......" : 'Book Appointment'}
                  </button>
               
                {/* <button
                  type="submit"
                  className=" text-white px-4 py-2 rounded hover:bg-secondary-dark"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Booking...' : 'Book Appointment'}
                </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RescheduleAppointmentForm;

