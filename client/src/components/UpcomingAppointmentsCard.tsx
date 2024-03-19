// import React from 'react';
// import doctorProfilePicture from "../assets/doctor-profile-picture.png";

// interface Appointment {
//   doctorName: string;
//   date: string;
//   time: string;
//   duration: string;
//   profilePicture?: string;
// }

// const UpcomingAppointmentsCard: React.FC = () => {
//   // Sample data for upcoming appointments including doctor details and dates
//   const appointments: Appointment[] = [
//     { doctorName: 'Dr. John Doe', date: '2024-02-20', time: '10:00 AM', duration: '1 hour' },
//     { doctorName: 'Dr. Jane Smith', date: '2024-03-15', time: '11:30 AM', duration: '45 minutes' },
//     { doctorName: 'Dr. Michael Johnson', date: '2024-04-10', time: '02:15 PM', duration: '30 minutes' },
//     { doctorName: 'Dr. John Doe', date: '2024-02-20', time: '10:00 AM', duration: '1 hour', profilePicture: 'https://via.placeholder.com/50' },
//     { doctorName: 'Dr. Jane Smith', date: '2024-03-15', time: '11:30 AM', duration: '45 minutes', profilePicture: 'https://via.placeholder.com/50' },
//     { doctorName: 'Dr. Michael Johnson', date: '2024-04-10', time: '02:15 PM', duration: '30 minutes', profilePicture: 'https://via.placeholder.com/50' },
//     // Add more appointment data as needed
//   ];

//   return (
//     <div className="bg-white h-96 mt-4 mx-2 shadow-2xl overflow-y-auto overflow-hidden w-full" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//       <div>
//         <table className="w-full px-6 py-6">
//           <thead className="text-lg font-semibold mb-4 sticky top-0 p-6">
//             <tr>
//               <th colSpan={4} className="py-2  bg-secondary">
//                 <h2>Upcoming Appointments</h2>
//               </th>
//             </tr>
//             <tr className='bg-gray-100'>
//               <th className="py-2">Doctor</th>
//               <th className="py-2">Date</th>
//               <th className="py-2">Time</th>
//               <th className="py-2">Duration</th>
//             </tr>
//           </thead>
//           <tbody className="h-64">
//             {appointments.map((appointment, index) => (
//               <tr key={index}>
//                 <td className="border-t py-2 px-6 flex items-center">
//                   {appointment.profilePicture && (
//                     <div className="mr-4">
//                       <img src={appointment.profilePicture} alt="Doctor" className="rounded-full h-12 w-12" />
//                     </div>
//                   )}
//                   <div>
//                     <p className="font-semibold">{appointment.doctorName}</p>
//                   </div>
//                 </td>
//                 <td className="border-t py-2 px-6">{appointment.date}</td>
//                 <td className="border-t py-2 px-6">{appointment.time}</td>
//                 <td className="border-t py-2 px-6">{appointment.duration}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UpcomingAppointmentsCard;


import React from 'react';

// Dummy data for upcoming doctor appointments
const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. John Doe",
    specialization: "Pediatrician",
    status: "Booked",
    date: "2024-03-25",
    timeSlot: "10:00 AM - 11:00 AM"
  },
  {
    id: 2,
    doctorName: "Dr. Jane Smith",
    specialization: "Dermatologist",
    status: "Booked",
    date: "2024-03-28",
    timeSlot: "02:00 PM - 03:00 PM"
  },
  {
    id: 3,
    doctorName: "Dr. Michael Johnson",
    specialization: "Orthopedic Surgeon",
    status: "Booked",
    date: "2024-03-30",
    timeSlot: "09:00 AM - 10:00 AM"
  }
];

// Component for displaying upcoming doctor appointments table
const UpcomingAppointmentsTable = () => {
  const handleRowClick = (id:any) => {
    // Handle row click action here
    console.log("Row clicked with ID:", id);
  };

  return (
    <div className="p-6 px-0 overflow-scroll">
      <table className="w-full mt-4 text-left table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
              <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Doctor
              </p>
            </th>
            <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
              <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Specialization
              </p>
            </th>
            <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
              <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Status
              </p>
            </th>
            <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
              <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Date of Appointment
              </p>
            </th>
            <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
              <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Time Slot
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {upcomingAppointments.map((appointment) => (
            <tr key={appointment.id} onClick={() => handleRowClick(appointment.id)} className="hover:bg-blue-100 cursor-pointer">
              <td className="p-4 border-b border-blue-gray-50">
                <div className="flex items-center gap-3">
                  <span className='relative'>
                    <img src={`https://via.placeholder.com/40?text=${appointment.doctorName}`} alt={appointment.doctorName} className="relative inline-block h-9 w-9 !rounded-full object-cover object-center" />
                  </span>
                  <div className="flex flex-col">
                    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                      {appointment.doctorName}
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {appointment.specialization}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <div className={`relative grid items-center py-1 font-sans text-xs font-bold ${appointment.status === 'Booked' ? 'text-green-900 bg-green-500/20' : 'text-blue-gray-900 bg-blue-gray-500/20'} rounded-md select-none whitespace-nowrap`}>
                  <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${appointment.status === 'Booked' ? 'bg-success text-success' : 'bg-warning text-warning'}`}>
                    {appointment.status}
                  </span>
                </div>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {appointment.date}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {appointment.timeSlot}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpcomingAppointmentsTable;


