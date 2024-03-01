import React from 'react';

interface Vaccination {
  name: string;
  status: 'Pending' | 'Completed' | 'Delayed';
  date: string;
}

const VaccinationCard: React.FC = () => {
  // Sample data for upcoming vaccinations including dates
  const vaccinations: Vaccination[] = [
    { name: 'COVID-19 Vaccine', status: 'Completed', date: '2024-02-20' },
    { name: 'Flu Vaccine', status: 'Pending', date: '2024-03-15' },
    { name: 'Hepatitis B Vaccine', status: 'Delayed', date: '2024-04-10' },
    { name: 'Tetanus Vaccine', status: 'Completed', date: '2024-05-05' },
    { name: 'Measles Vaccine', status: 'Pending', date: '2024-06-20' },
    { name: 'Polio Vaccine', status: 'Delayed', date: '2024-07-15' },
    { name: 'Pneumococcal Vaccine', status: 'Pending', date: '2024-08-10' },
    { name: 'Hepatitis B Vaccine', status: 'Delayed', date: '2024-04-10' },
    { name: 'Tetanus Vaccine', status: 'Completed', date: '2024-05-05' },
    { name: 'Measles Vaccine', status: 'Pending', date: '2024-06-20' },
    { name: 'Polio Vaccine', status: 'Delayed', date: '2024-07-15' },
    { name: 'Pneumococcal Vaccine', status: 'Pending', date: '2024-08-10' },
    // Add more vaccination data as needed
  ];

  return (
    <div className="bg-white h-full mt-4 shadow-2xl  overflow-y-auto   w-full mx-2" style={{  overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <div >
        {/* <h2 className="text-lg font-semibold mb-4 sticky top-0 p-6 bg-slate-400">Scheduled Vaccinations</h2> */}
        <table className="w-full px-auto py-6">

          <thead className="text-lg font-semibold mb-4 sticky top-0 p-6">
            <tr><th colSpan={3} className="py-2  bg-secondary"><h2 >Scheduled Vaccinations</h2></th></tr>
            
            <tr className='bg-gray-100'>
              <th className="py-2">Vaccination</th>
              <th className="py-2">Status</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>
          <tbody className="h-64">
            {vaccinations.map((vaccination, index) => (
              <tr key={index}>
                <td className="block mx-auto border-t py-2 px-2 text-center">{vaccination.name}</td>
                <td className="border-t py-2  px-auto text-center">
                  <span className={`inline-block px-auto py-2 px-2 rounded text-center ${
                    vaccination.status === 'Pending' ? 'bg-yellow-200 text-yellow-800' :
                    vaccination.status === 'Completed' ? 'bg-green-200 text-green-800' :
                    'bg-red-200 text-red-800'
                  }`}>
                    {vaccination.status}
                  </span>
                </td>
                <td className="border-t py-2 px-2 text-center">{vaccination.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VaccinationCard;
