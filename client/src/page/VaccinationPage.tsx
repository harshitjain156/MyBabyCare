import ScrollableFeed from 'react-scrollable-feed';
import VaccinationAccordianCard from '../components/VaccinationAccordianCard';
import React, { useState } from 'react';
import RadialChart from '../components/RadialChart';
interface Child {
  id: number;
  name: string;
  age: number;
  vaccinationsDone: number;
  vaccinationsTotal: number;
}

enum Tab {
  All = 'All',
  Pending = 'Pending',
  Done = 'Completed',
}

function VaccinationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(Tab.Pending);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    console.log('Switched to tab:', tab);
  };
  const [children, setChildren] = useState<Child[]>([
    {
      id: 1,
      name: "Child 1",
      age: 5,
      vaccinationsDone: 4,
      vaccinationsTotal: 6,
    },
    {
      id: 2,
      name: "Child 2",
      age: 3,
      vaccinationsDone: 2,
      vaccinationsTotal: 5,
    },
    
    // Add more children as needed
  ]);

  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  const handleChildClick = (child: Child) => {
    setSelectedChild(child);
  };
  

  return (
    <div className='vaccination-page-container p-4 w-full'>
      
      <h1 className="text-3xl font-bold mb-4">Vaccinations</h1>
      <div className="flex space-x-4 w-full overflow-x-auto pb-2 border-b">
        {children.map((child) => (
        
          <div
            key={child.id}
            className={`cursor-pointer p-4 border rounded-lg  w-auto flex shrink-0 ${
              selectedChild?.id === child.id ? 'bg-blue-100' : ''
            }`}
            onClick={() => handleChildClick(child)}
          >
            <span>
            <h2 className="text-lg font-bold mb-2">{child.name}</h2>
            <p className="text-gray-500">Age: {child.age} years</p>
        
      <p className="text-gray-500">
        Vaccinations done: {child.vaccinationsDone} / {child.vaccinationsTotal}
      </p>
      </span>
  <span className='inline-block mx-auto'>
    <RadialChart
        completionPercentage={(child.vaccinationsDone / child.vaccinationsTotal) * 100}
        className=""
      /></span>
          </div>
        ))}
      </div>
{/* 
      <div className="text-sm sticky top-2 font-medium text-center text-gray-500 border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
        {Object.values(Tab).map((tab) => (
          <li key={tab} className="me-2 cursor-pointer">
            <span
              className={`inline-block p-4 border-b-2  rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === tab ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500' : ''
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </span>
          </li>
        ))}
      </ul>
      </div> */}
      <div className='overflow-auto w-full flex justify-around max-h-[calc(100vh-240px)]'>
      <ol className="relative border-s w-1/2 h-full mx-12 mt-8  border-gray-200 dark:border-gray-700">  
            <VaccinationAccordianCard/> 
            <VaccinationAccordianCard/> 
            <VaccinationAccordianCard/> 
            <VaccinationAccordianCard/> 
            <VaccinationAccordianCard/> 
    {/* <li className="mb-10 ms-12">            
        <span className="absolute left-[-23px] flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9" />
        </svg>

        </span>
        <h3 className="flex  items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">2 Months Vaccination</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Scheduled for April 15th, 2024</time>
        <p className="mb-4  text-base font-normal text-gray-500 dark:text-gray-400">Routine vaccination including Diphtheria, Tetanus, Pertussis (DTaP), Haemophilus influenzae type b (Hib), Pneumococcal conjugate vaccine (PCV13), Polio vaccine (IPV), and Rotavirus vaccine.</p>
    </li>
    <li className="mb-10 ms-12">
        <span className="absolute left-[-23px] flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9" />
        </svg>

        </span>
        <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">4 Months Vaccination</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Scheduled for June 15th, 2024</time>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Routine vaccination including DTaP, Hib, PCV13, IPV, Rotavirus vaccine, and Inactivated Polio Vaccine (IPV).</p>
    </li>
    <li className="mb-10 ms-12">
        <span className="absolute left-[-23px] flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="m15 11.25 1.5 1.5.75-.75V8.758l2.276-.61a3 3 0 1 0-3.675-3.675l-.61 2.277H12l-.75.75 1.5 1.5M15 11.25l-8.47 8.47c-.34.34-.8.53-1.28.53s-.94.19-1.28.53l-.97.97-.75-.75.97-.97c.34-.34.53-.8.53-1.28s.19-.94.53-1.28L12.75 9M15 11.25 12.75 9" />
        </svg>

        </span>
        <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">6 Months Vaccination</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Scheduled for August 15th, 2024</time>
        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Routine vaccination including DTaP, Hib, PCV13, IPV, Rotavirus vaccine, and Inactivated Polio Vaccine (IPV).</p>
    </li>  */}
</ol>
</div>





      {/* <div className='mt-4 overflow-y-auto max-h-[calc(100vh-240px)]'>
        <ScrollableFeed>
         
          <VaccinationAccordianCard />
          <VaccinationAccordianCard />

          <VaccinationAccordianCard />
          <VaccinationAccordianCard />
          <VaccinationAccordianCard />
          <VaccinationAccordianCard />
     
          <VaccinationAccordianCard />
          <VaccinationAccordianCard />
          <VaccinationAccordianCard />
          <VaccinationAccordianCard />
          <VaccinationAccordianCard />

        </ScrollableFeed>
      </div> */}
    </div>
  );
}

export default VaccinationPage;
