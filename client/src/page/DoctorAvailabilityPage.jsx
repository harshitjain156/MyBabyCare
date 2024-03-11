// import React, { useEffect, useState } from "react";

// function DoctorAvailability() {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [selectedSlots, setSelectedSlots] = useState([]);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [slotDuration, setSlotDuration] = useState("");
//   const [doctorStartHour, setDoctorStartHour] = useState("01");
//   const [doctorStartMinute, setDoctorStartMinute] = useState("00");
//   const [doctorStartPeriod, setDoctorStartPeriod] = useState("AM");
//   const [doctorEndHour, setDoctorEndHour] = useState("01");
//   const [doctorEndMinute, setDoctorEndMinute] = useState("00");
//   const [doctorEndPeriod, setDoctorEndPeriod] = useState("AM");

//   const [minDate, setMinDate] = useState(null);

//   // Function to set the minimum date to today
//   const setMinDateToToday = () => {
//     const today = new Date();
//     const minDateString = today.toISOString().split('T')[0];
//     setMinDate(minDateString);
//   };

//   // Call the function when the component mounts
//   useEffect(() => {
//     setMinDateToToday();
//   }, []);
//   const [errors, setErrors] = useState({
//     date: "",
//     duration: "",
//     start: "",
//     end: ""
//   });

//   function handleDateChange(event) {
//     setErrors((prev)=> {
//         return { ...prev, date:""}
//     })
//     var selectedDate = new Date(event.target.value);
//     var disabledDates = ["2024-03-11", "2024-03-15", "2024-03-20"]; // Example disabled dates
//     var formattedDate = formatDate(selectedDate);

//     if (disabledDates.includes(formattedDate)) {
//         event.target.value = ""; // Clear the input value
//         setErrors((prev)=> {
//              return { ...prev, date:"Slots are already added for this date. Please select another one."}
//     })
//         // alert("Slots are already added for this date. Please select another one.");
//         return ;
//     }
//     setTimeSlots([]);
//     setSelectedDate(event.target.value)
// }

// function formatDate(date) {
//     var year = date.getFullYear();
//     var month = (date.getMonth() + 1).toString().padStart(2, '0');
//     var day = date.getDate().toString().padStart(2, '0');
//     return year + "-" + month + "-" + day;
// }

//   // Function to handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // alert(
//     //   `Date: ${selectedDate}\nSelected Time Slots: ${selectedSlots.join(", ")}`
//     // );
//   };

//   // Function to handle time slot selection
//   const handleTimeSlotSelect = (slot) => {
//     if (selectedSlots.includes(slot)) {
//       setSelectedSlots(selectedSlots.filter((s) => s !== slot));
//     } else {
//       setSelectedSlots([...selectedSlots, slot]);
//     }
//   };

//   // Function to remove selected slot
//   const removeSelectedSlot = (slot) => {
//     setSelectedSlots(selectedSlots.filter((s) => s !== slot));
//   };

//   // Function to reset selected time slots when input details are changed
//   const handleInputChange = () => {
//     setSelectedSlots([]);
//   };

//   // Function to generate time slots based on duration and available time of the doctor
//   const generateTimeSlots = () => {
//     const startHour = parseInt(doctorStartHour) + (doctorStartPeriod === "PM" ? 12 : 0);
//     const startMinute = parseInt(doctorStartMinute);
//     const endHour = parseInt(doctorEndHour) + (doctorEndPeriod === "PM" ? 12 : 0);
//     const endMinute = parseInt(doctorEndMinute);

//     if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
//       setErrors({
//         ...errors,
//         start: "End time must be greater than start time."
//       });
//       setTimeSlots([]);
//       return;
//     }

//     setErrors({
//       ...errors,
//       start: ""
//     });

//     const durationInMinutes = parseInt(slotDuration);

//     let currentTime = new Date(selectedDate);
//     currentTime.setHours(startHour, startMinute, 0, 0);

//     const slots = [];
//     while (
//       currentTime.getHours() < endHour ||
//       (currentTime.getHours() === endHour &&
//         currentTime.getMinutes() <= endMinute)
//     ) {
//       const nextTime = new Date(currentTime);
//       nextTime.setMinutes(nextTime.getMinutes() + durationInMinutes);
//       if (
//         nextTime.getHours() < endHour ||
//         (nextTime.getHours() === endHour && nextTime.getMinutes() <= endMinute)
//       ) {
//         const startTime =
//           (currentTime.getHours() % 12 || 12) + ":" +
//           (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes() +
//           " " + (currentTime.getHours() >= 12 ? "PM" : "AM");
//         const endTime =
//           (nextTime.getHours() % 12 || 12) + ":" +
//           (nextTime.getMinutes() < 10 ? "0" : "") + nextTime.getMinutes() +
//           " " + (nextTime.getHours() >= 12 ? "PM" : "AM");
//         slots.push({ startTime, endTime });
//       }
//       currentTime = nextTime;
//     }
//     setTimeSlots(slots);
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">
//         Select Date and Doctor Availability
//       </h2>
//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4"
//         onChange={handleInputChange}
//       >
//         <div className="flex flex-col md:flex-row md:space-x-4">
//           <div className="flex-grow">
//             <label htmlFor="selectedDate" className="block mb-1">
//               Select Date:
//             </label>
//             <input
//               type="date"
//               id="selectedDate"
//               name="selectedDate"
//               min={minDate}
//               value={selectedDate}
//               onChange={handleDateChange}
//               className="border rounded px-4 py-2 w-full"
//               required
//             />
//             {errors.date && <p className="text-red-500">{errors.date}</p>}
//           </div>
//           <div className="flex-grow">
//             <label htmlFor="slotDuration" className="block mb-1">
//               Time Slot Duration (minutes):
//             </label>
//             <input
//               type="number"
//               id="slotDuration"
//               min={15}
//               max={60}
//               name="slotDuration"
//               value={slotDuration}
//               onChange={(e) =>{
//                 setTimeSlots([]);
//                 // if(e.target.value>=15 && e.target.value<=60)
//                  setSlotDuration(e.target.value)}}
//               className="border rounded px-4 py-2 w-full"
//               required
//             />
//             {errors.duration && <p className="text-red-500">{errors.duration}</p>}
//           </div>
//         </div>

//         <div className="flex flex-col md:flex-row md:space-x-4">
//           <div className="flex-grow">
//             <label htmlFor="doctorStartTimeHour" className="block mb-1">
//               Doctor's Available Time (Start):
//             </label>
//             <div className="flex">
//               {/* Hour */}
//               <select
//                 id="doctorStartTimeHour"
//                 name="doctorStartTimeHour"
//                 value={doctorStartHour}
//                 onChange={(e) =>{
//                     setTimeSlots([]);
//                      setDoctorStartHour(e.target.value)}}
//                 className="border rounded px-4 py-2 mr-2"
//               >
//                 {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
//                   <option key={hour} value={hour.toString().padStart(2, "0")}>
//                     {hour.toString().padStart(2, "0")}
//                   </option>
//                 ))}
//               </select>
//               {/* Minute */}
//               <select
//                 id="doctorStartTimeMinute"
//                 name="doctorStartTimeMinute"
//                 value={doctorStartMinute}
//                 onChange={(e) =>{
//                     setTimeSlots([]);
//                      setDoctorStartMinute(e.target.value)
//                     }}
//                 className="border rounded px-4 py-2 mr-2"
//               >
//                 {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
//                   <option key={minute} value={minute.toString().padStart(2, "0")}>
//                     {minute.toString().padStart(2, "0")}
//                   </option>
//                 ))}
//               </select>
//               {/* Period */}
//               <select
//                 id="doctorStartTimePeriod"
//                 name="doctorStartTimePeriod"
//                 value={doctorStartPeriod}
//                 onChange={(e) =>{ 
//                     setTimeSlots([]);
//                     setDoctorStartPeriod(e.target.value)
//                 }}
//                 className="border rounded px-4 py-2"
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//             </div>
//             {errors.start && <p className="text-red-500">{errors.start}</p>}
//           </div>
//           <div className="flex-grow">
//             <label htmlFor="doctorEndTimeHour" className="block mb-1">
//               Doctor's Available Time (End):
//             </label>
//             <div className="flex">
//               {/* Hour */}
//               <select
//                 id="doctorEndTimeHour"
//                 name="doctorEndTimeHour"
//                 value={doctorEndHour}
//                 onChange={(e) =>{
//                     setTimeSlots([]);
//                      setDoctorEndHour(e.target.value)
//                     }}
//                 className="border rounded px-4 py-2 mr-2"
//               >
//                 {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
//                   <option key={hour} value={hour.toString().padStart(2, "0")}>
//                     {hour.toString().padStart(2, "0")}
//                   </option>
//                 ))}
//               </select>
//               {/* Minute */}
//               <select
//                 id="doctorEndTimeMinute"
//                 name="doctorEndTimeMinute"
//                 value={doctorEndMinute}
//                 onChange={(e) =>{ 
//                     setTimeSlots([]);
//                     setDoctorEndMinute(e.target.value)}}
//                 className="border rounded px-4 py-2 mr-2"
//               >
//                 {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
//                   <option key={minute} value={minute.toString().padStart(2, "0")}>
//                     {minute.toString().padStart(2, "0")}
//                   </option>
//                 ))}
//               </select>
//               {/* Period */}
//               <select
//                 id="doctorEndTimePeriod"
//                 name="doctorEndTimePeriod"
//                 value={doctorEndPeriod}
//                 onChange={(e) =>{ 
//                     setTimeSlots([]);
//                     setDoctorEndPeriod(e.target.value)}}
//                 className="border rounded px-4 py-2"
//               >
//                 <option value="AM">AM</option>
//                 <option value="PM">PM</option>
//               </select>
//             </div>
//             {errors.end && <p className="text-red-500">{errors.end}</p>}
//           </div>
//         </div>

//         <div>
//           <button
//             type="button"
//             onClick={generateTimeSlots}
//             className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
//           >
//             Generate Time Slots
//           </button>
//         </div>

//         <div className="grid grid-cols-3 gap-4">
//           {timeSlots.map((slot, index) => (
//             <button
//               key={index}
//               onClick={() =>
//                 handleTimeSlotSelect(`${slot.startTime} - ${slot.endTime}`)
//               }
//               className={`block w-full border rounded px-4 py-2 ${
//                 selectedSlots.includes(`${slot.startTime} - ${slot.endTime}`)
//                   ? "bg-primary text-white"
//                   : "hover:bg-gray-200"
//               }`}
//             >
//               {`${slot.startTime} - ${slot.endTime}`}
//             </button>
//           ))}
//         </div>

//         <div className="bg-gray-100 p-4 rounded">
//           <h3 className="font-semibold mb-2">Selected Time Slots:</h3>
//           <div className="flex flex-wrap">
//             {selectedSlots.map((slot, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-200 rounded px-2 py-1 mr-2 mb-2 flex items-center"
//               >
//                 <span className="mr-2">{slot}</span>
//                 <button
//                   type="button"
//                   onClick={() => removeSelectedSlot(slot)}
//                   className="text-red-500"
//                 >
//                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//                     <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
//                     </svg>

//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="text-center">
//           <button
//             type="submit"
//             className="mt-4  text-white px-4 py-2 rounded mx-auto hover:bg-secondary-dark"
//           >
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default DoctorAvailability;

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useAuth } from "../AuthContext/AuthContext";
import { BASE_URL } from "helper/endpoints";
import axios from "axios";
import { toast } from "react-toastify";

function DoctorAvailability() {
   const { userData} =  useAuth();
  //  console.log(userData)
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const[disabledDates, setDisabledDates] = useState([]);
  const[isSubmitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    date: "",
    duration: "",
    start: "",
    end: ""
  });

  const today = new Date();
  const minDateString = today.toISOString().split('T')[0];



  const formik = useFormik({
    initialValues: {
      selectedDate: "",
      slotDuration: "",
      doctorStartHour: "01",
      doctorStartMinute: "00",
      doctorStartPeriod: "AM",
      doctorEndHour: "01",
      doctorEndMinute: "00",
      doctorEndPeriod: "AM"
    },
    validate: values => {
      const errors = {};
      const startHour = parseInt(values.doctorStartHour) + (values.doctorStartPeriod === "PM" ? 12 : 0);
      const startMinute = parseInt(values.doctorStartMinute);
      const endHour = parseInt(values.doctorEndHour) + (values.doctorEndPeriod === "PM" ? 12 : 0);
      const endMinute = parseInt(values.doctorEndMinute);
      if (!values.selectedDate) {
        errors.date = "Date is required";
      }
      else if(values.selectedDate){
        // const disabledDates = ["2024-03-11", "2024-03-15", "2024-03-20", "null"];
        // console.log(values.selectedDate) // Example disabled dates
        if (disabledDates.includes(values.selectedDate)) {
            errors.date =  "Slots are already added for this date. Please select another one.";
        
        }
      }
      if (!values.slotDuration) {
        errors.duration = "Duration is required";
      } else if (isNaN(values.slotDuration) || values.slotDuration < 15 || values.slotDuration > 60) {
        errors.duration = "Duration must be between 15 minutes and 60 minutes";
      }
      if (startHour > endHour || (startHour === endHour && startMinute >= startMinute)) {
        errors.start = "End time must be greater than start time.";
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
         console.log(values.selectedDate, userData.userId, selectedSlots);
         try {
            const response = await axios.post(`${BASE_URL}api/v1/create-slots`, {
                doctorId : userData.userId, date: values.selectedDate, slots : selectedSlots
            });
            
            // console.log('Slot data sent successfully:', response.data);
            setSubmitted((prev)=>!prev);
          
            toast.success("Slots are added successfully!");
             resetForm();
            setSelectedSlots([]);
            // Handle response from server if needed
        } catch (error) {
            console.error('Error sending slot data:', error);
            // Handle error if needed
        }
    },
  });

//   const handleDateChange = (event) => {
//     const { name, value } = event.target;
//     setErrors((prev) => ({ ...prev, date: "" }));
//     formik.handleChange(event);
//     const disabledDates = ["2024-03-11", "2024-03-15", "2024-03-20"]; // Example disabled dates
//     const formattedDate = value;

//     if (disabledDates.includes(formattedDate)) {
//       setErrors((prev) => ({ ...prev, date: "Slots are already added for this date. Please select another one." }));
//       formik.setErrors({ date: "Slots are already added for this date. Please select another one." });
//       formik.setFieldValue(name, "ALREADY_ADDED");
//       return;
//     }
//     setTimeSlots([]);
//   };
useEffect(
  ()=>{
 const fetchdata =  async()=>{
  try {
    const response = await axios.get(`${BASE_URL}api/v1/all-added-slots/${userData.userId}`);
    
    setDisabledDates(response.data.dates)
    console.log("all added slots' date ", response);
    // Handle response from server if needed
} catch (error) {
    console.error("Error in slots' date data:", error);
    // Handle error if needed
}
} 
fetchdata();
}, [isSubmitted])




  useEffect(() => {
    setTimeSlots([]);
  }, [formik.values.selectedDate, formik.values.slotDuration, formik.values.doctorStartHour, formik.values.doctorStartMinute, formik.values.doctorStartPeriod, formik.values.doctorEndHour, formik.values.doctorEndMinute, formik.values.doctorEndPeriod]);

  const handleTimeSlotSelect = (timeslot) => {
    if (selectedSlots.some(slot => slot.timeslot === timeslot)) {
        setSelectedSlots(selectedSlots.filter(slot => slot.timeslot !== timeslot));
    } 
    // If the timeslot is not selected, add it to the selected slots array
    else {
        setSelectedSlots([...selectedSlots, { timeslot }]);
    }
    // if (selectedSlots.includes(slot)) {
    //   setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    // } else {
    //   setSelectedSlots([...selectedSlots, slot]);
    // }
  };

  const removeSelectedSlot = (slot) => {
    setSelectedSlots(selectedSlots.filter((s) => s !== slot));
  };

  const generateTimeSlots = () => {
    const { doctorStartHour, doctorStartMinute, doctorStartPeriod, doctorEndHour, doctorEndMinute, doctorEndPeriod, slotDuration } = formik.values;
  
    const startHour = parseInt(doctorStartHour) + (doctorStartPeriod === "PM" ? 12 : 0);
    const startMinute = parseInt(doctorStartMinute);
    const endHour = parseInt(doctorEndHour) + (doctorEndPeriod === "PM" ? 12 : 0);
    const endMinute = parseInt(doctorEndMinute);
    console.log(startHour, startMinute, endHour, endMinute);
  
    if (startHour > endHour || (startHour === endHour && startMinute >= endMinute)) {
      setErrors({
        ...errors,
        start: "End time must be greater than start time."
      });
      setTimeSlots([]);
      return;
    }
  
    setErrors({
      ...errors,
      start: ""
    });
  
    const durationInMinutes = parseInt(slotDuration);
  
    let currentTime = new Date(formik.values.selectedDate);
    currentTime.setHours(startHour, startMinute, 0, 0);
  
    const slots = [];
    while (
      currentTime.getHours() < endHour ||
      (currentTime.getHours() === endHour &&
        currentTime.getMinutes() <= endMinute)
    ) {
      const nextTime = new Date(currentTime);
      nextTime.setMinutes(nextTime.getMinutes() + durationInMinutes);
      if (
        nextTime.getHours() < endHour ||
        (nextTime.getHours() === endHour && nextTime.getMinutes() <= endMinute)
      ) {
        const startTime =
          (currentTime.getHours() % 12 || 12) + ":" +
          (currentTime.getMinutes() < 10 ? "0" : "") + currentTime.getMinutes() +
          " " + (currentTime.getHours() >= 12 ? "PM" : "AM");
        const endTime =
          (nextTime.getHours() % 12 || 12) + ":" +
          (nextTime.getMinutes() < 10 ? "0" : "") + nextTime.getMinutes() +
          " " + (nextTime.getHours() >= 12 ? "PM" : "AM");
        slots.push({ startTime, endTime });
      }
      currentTime = nextTime;
    }
    setTimeSlots(slots);
  };
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        Select Date and Doctor Availability
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow">
            <label htmlFor="selectedDate" className="block mb-1">
              Select Date:
            </label>
            <input
              type="date"
              id="selectedDate"
              name="selectedDate"
              
              min={minDateString}
              value={formik.values.selectedDate}
            //   onChange={handleDateChange}
            onChange={formik.handleChange}
              className="border rounded px-4 py-2 w-full"
              required
            />
            {formik.errors.date && <p className="text-red-500 text-[12px]">{formik.errors.date}</p>}
          </div>
          <div className="flex-grow">
            <label htmlFor="slotDuration" className="block mb-1">
              Time Slot Duration (minutes):
            </label>
            <input
              type="number"
              id="slotDuration"
            
              name="slotDuration"
              value={formik.values.slotDuration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border rounded px-4 py-2 w-full"
            
            />
            {formik.errors.duration && <p className="text-red-500 text-[12px]">{formik.errors.duration}</p>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-grow">
            <label htmlFor="doctorStartHour" className="block mb-1">
              Doctor's Available Time (Start):
            </label>
            <div className="flex">
              {/* Hour */}
              <select
                id="doctorStartHour"
                name="doctorStartHour"
                value={formik.values.doctorStartHour}
                onChange={formik.handleChange}
                className="border rounded px-4 py-2 mr-2"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <option key={hour} value={hour.toString().padStart(2, "0")}>
                    {hour.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              {/* Minute */}
              <select
                id="doctorStartMinute"
                name="doctorStartMinute"
                value={formik.values.doctorStartMinute}
                onChange={formik.handleChange}
                className="border rounded px-4 py-2 mr-2"
              >
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <option key={minute} value={minute.toString().padStart(2, "0")}>
                    {minute.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              {/* Period */}
              <select
                id="doctorStartPeriod"
                name="doctorStartPeriod"
                value={formik.values.doctorStartPeriod}
                onChange={formik.handleChange}
                className="border rounded px-4 py-2"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            {formik.errors.start && <p className="text-red-500 text-[12px]">{formik.errors.start}</p>}
          </div>
          <div className="flex-grow">
            <label htmlFor="doctorEndHour" className="block mb-1">
              Doctor's Available Time (End):
            </label>
            <div className="flex">
              {/* Hour */}
              <select
                id="doctorEndHour"
                name="doctorEndHour"
                value={formik.values.doctorEndHour}
                onChange={formik.handleChange}
                className="border rounded px-4 py-2 mr-2"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                  <option key={hour} value={hour.toString().padStart(2, "0")}>
                    {hour.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              {/* Minute */}
              <select
                id="doctorEndMinute"
                name="doctorEndMinute"
                value={formik.values.doctorEndMinute}
                onChange={formik.handleChange}
                className="border rounded px-4 py-2 mr-2"
              >
                {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                  <option key={minute} value={minute.toString().padStart(2, "0")}>
                    {minute.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
              {/* Period */}
              <select
                id="doctorEndPeriod"
                name="doctorEndPeriod"
                value={formik.values.doctorEndPeriod}
                onChange={formik.handleChange}
                className="border rounded px-4 py-2"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            {formik.errors.end && <p className="text-red-500 text-[12px]">{formik.errors.end}</p>}
          </div>
        </div>
        
     <div>           
        <button
            type="button"
            disabled={!formik.isValid}
            onClick={generateTimeSlots}
            className={`bg-primary text-white px-4 py-2 rounded ${!formik.isValid ? `opacity-60 cursor-not-allowed` :  `cursor-pointer hover:bg-primary-dark`}`}
          >
            Generate Time Slots
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                handleTimeSlotSelect(`${slot.startTime} - ${slot.endTime}`)
              }
              className={`block w-full border rounded px-4 py-2 ${
                selectedSlots.some(s => s.timeslot === `${slot.startTime} - ${slot.endTime}`)
                // selectedSlots.includes()
                  ? "bg-primary text-white"
                  : "hover:bg-gray-200"
              }`}
            >
              {`${slot.startTime} - ${slot.endTime}`}
            </button>
          ))}
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">Selected Time Slots:</h3>
          <div className="flex flex-wrap">
            {selectedSlots.map((slot, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded px-2 py-1 mr-2 mb-2 flex items-center"
              >
                <span className="mr-2">{slot.timeslot}</span>
                <button
                  type="button"
                  onClick={() => removeSelectedSlot(slot)}
                  className="text-red-500"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button
            disabled={selectedSlots.length===0 }
            type="submit"
            className={`mt-4  text-white px-4 py-2 rounded mx-auto ${ (selectedSlots.length===0) ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:bg-secondary-dark" }`}
          >
            Submit
          </button>
        </div>

        {/* Remaining JSX remains the same */}
      </form>
      
    </div>
  );
}

export default DoctorAvailability;
