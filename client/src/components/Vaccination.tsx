// import React from 'react';

// interface Vaccination {
//   name: string;
//   status: 'Pending' | 'Completed' | 'Delayed';
//   date: string;
// }

// const VaccinationCard: React.FC = () => {
//   // Sample data for upcoming vaccinations including dates
//   const vaccinations: Vaccination[] = [
//     { name: 'COVID-19 Vaccine', status: 'Completed', date: '2024-02-20' },
//     { name: 'Flu Vaccine', status: 'Pending', date: '2024-03-15' },
//     { name: 'Hepatitis B Vaccine', status: 'Delayed', date: '2024-04-10' },
//     { name: 'Tetanus Vaccine', status: 'Completed', date: '2024-05-05' },
//     { name: 'Measles Vaccine', status: 'Pending', date: '2024-06-20' },
//     { name: 'Polio Vaccine', status: 'Delayed', date: '2024-07-15' },
//     { name: 'Pneumococcal Vaccine', status: 'Pending', date: '2024-08-10' },
//     { name: 'Hepatitis B Vaccine', status: 'Delayed', date: '2024-04-10' },
//     { name: 'Tetanus Vaccine', status: 'Completed', date: '2024-05-05' },
//     { name: 'Measles Vaccine', status: 'Pending', date: '2024-06-20' },
//     { name: 'Polio Vaccine', status: 'Delayed', date: '2024-07-15' },
//     { name: 'Pneumococcal Vaccine', status: 'Pending', date: '2024-08-10' },
//     // Add more vaccination data as needed
//   ];

//   return (
//     <div className="bg-white h-full mt-4 shadow-2xl  overflow-y-auto   w-full mx-2" style={{  overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//       <div >
//         {/* <h2 className="text-lg font-semibold mb-4 sticky top-0 p-6 bg-slate-400">Scheduled Vaccinations</h2> */}
//         <table className="w-full px-auto py-6">

//           <thead className="text-lg font-semibold mb-4 sticky top-0 p-6">
//             <tr><th colSpan={3} className="py-2  bg-secondary"><h2 >Scheduled Vaccinations</h2></th></tr>
            
//             <tr className='bg-gray-100'>
//               <th className="py-2">Vaccination</th>
//               <th className="py-2">Status</th>
//               <th className="py-2">Date</th>
//             </tr>
//           </thead>
//           <tbody className="h-64">
//             {vaccinations.map((vaccination, index) => (
//               <tr key={index}>
//                 <td className="block mx-auto border-t py-2 px-2 text-center">{vaccination.name}</td>
//                 <td className="border-t py-2  px-auto text-center">
//                   <span className={`inline-block px-auto py-2 px-2 rounded text-center ${
//                     vaccination.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
//                     vaccination.status === 'Completed' ? 'bg-green-200 text-green-800' :
//                     'bg-red-200 text-red-800'
//                   }`}>
//                     {vaccination.status}
//                   </span>
//                 </td>
//                 <td className="border-t py-2 px-2 text-center">{vaccination.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default VaccinationCard;
import React from 'react';

// Dummy data for child vaccinations
const childVaccinations = [
  {
    id: 1,
    childName: "Child 1",
    vaccinationDate: "2024-03-10",
    vaccineName: "Vaccine A"
  },
  {
    id: 2,
    childName: "Child 2",
    vaccinationDate: "2024-03-15",
    vaccineName: "Vaccine B"
  },
  {
    id: 3,
    childName: "Child 3",
    vaccinationDate: "2024-03-20",
    vaccineName: "Vaccine C"
  }
];

// Component for displaying child vaccination table
const ChildVaccinationTable = () => {
  const handleRowClick = (id:any) => {
    // Handle row click action here
    console.log("Row clicked with ID:", id);
  };

  return (
    <div className="p-6 px-0 w-full overflow-y-scroll">
      <table className="w-full mt-4 text-left table-auto min-w-max">
        <thead>
          <tr>
            <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
              <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Child Name
              </p>
            </th>
            <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
              <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Vaccination Date
              </p>
            </th>
            <th className="p-4 transition-colors cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 hover:bg-blue-gray-50">
              <p className="flex items-center justify-between gap-2 font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                Vaccine Name
              </p>
            </th>
          </tr>
        </thead>
        <tbody>
          {childVaccinations.map((vaccination) => (
            <tr key={vaccination.id} onClick={() => handleRowClick(vaccination.id)}>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {vaccination.childName}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {vaccination.vaccinationDate}
                </p>
              </td>
              <td className="p-4 border-b border-blue-gray-50">
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {vaccination.vaccineName}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
    <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
    Page  1 of 1
    </p>
    <div className="flex gap-2">
      <button
        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        Previous
      </button>
      <button
        className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        Next
      </button>
    </div>
  </div>
    </div>
  );
};

export default ChildVaccinationTable;

