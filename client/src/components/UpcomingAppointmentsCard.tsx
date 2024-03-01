import React from 'react';
import doctorProfilePicture from "../assets/doctor-profile-picture.png";

interface Appointment {
  doctorName: string;
  date: string;
  time: string;
  duration: string;
  profilePicture?: string;
}

const UpcomingAppointmentsCard: React.FC = () => {
  // Sample data for upcoming appointments including doctor details and dates
  const appointments: Appointment[] = [
    { doctorName: 'Dr. John Doe', date: '2024-02-20', time: '10:00 AM', duration: '1 hour' },
    { doctorName: 'Dr. Jane Smith', date: '2024-03-15', time: '11:30 AM', duration: '45 minutes' },
    { doctorName: 'Dr. Michael Johnson', date: '2024-04-10', time: '02:15 PM', duration: '30 minutes' },
    { doctorName: 'Dr. John Doe', date: '2024-02-20', time: '10:00 AM', duration: '1 hour', profilePicture: 'https://via.placeholder.com/50' },
    { doctorName: 'Dr. Jane Smith', date: '2024-03-15', time: '11:30 AM', duration: '45 minutes', profilePicture: 'https://via.placeholder.com/50' },
    { doctorName: 'Dr. Michael Johnson', date: '2024-04-10', time: '02:15 PM', duration: '30 minutes', profilePicture: 'https://via.placeholder.com/50' },
    // Add more appointment data as needed
  ];

  return (
    <div className="bg-white h-96 mt-4 mx-2 shadow-2xl overflow-y-auto overflow-hidden w-full" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div>
        <table className="w-full px-6 py-6">
          <thead className="text-lg font-semibold mb-4 sticky top-0 p-6">
            <tr>
              <th colSpan={4} className="py-2  bg-secondary">
                <h2>Upcoming Appointments</h2>
              </th>
            </tr>
            <tr className='bg-gray-100'>
              <th className="py-2">Doctor</th>
              <th className="py-2">Date</th>
              <th className="py-2">Time</th>
              <th className="py-2">Duration</th>
            </tr>
          </thead>
          <tbody className="h-64">
            {appointments.map((appointment, index) => (
              <tr key={index}>
                <td className="border-t py-2 px-6 flex items-center">
                  {appointment.profilePicture && (
                    <div className="mr-4">
                      <img src={appointment.profilePicture} alt="Doctor" className="rounded-full h-12 w-12" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{appointment.doctorName}</p>
                  </div>
                </td>
                <td className="border-t py-2 px-6">{appointment.date}</td>
                <td className="border-t py-2 px-6">{appointment.time}</td>
                <td className="border-t py-2 px-6">{appointment.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingAppointmentsCard;

