import ScrollableFeed from 'react-scrollable-feed';
import Modal from '../UI/Modal';
import SearchBar from '../components/SearchBar';
import VaccinationAccordianCard from '../components/VaccinationAccordianCard'
import React, { useState } from 'react'
enum Tab {
  All = 'All',
  Pending = 'Pending',
  Done = 'Done',
}

 

function VaccinationPage() {

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(Tab.Pending);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    // Your logic to handle tab change
    console.log('Switched to tab:', tab);
  };

  
 
  return (
    <div className='px-8 h-full'> 
      {/* <SearchBar searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}/> */}
  <h1 className="text-3xl font-bold mb-4">
      My Vaccinations
      </h1>
<div className="text-sm sticky top-2 font-medium text-center text-gray-500 border-b border-gray-200 bg-gray-50 dark:text-gray-400 dark:border-gray-700">
<ul className="flex flex-wrap -mb-px">
        {Object.values(Tab).map((tab) => (
          <li key={tab} className="me-2 cursor-pointer">
            <span
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${
                activeTab === tab ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500' : ''
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </span>
          </li>
        ))}
      </ul>
</div>

    <div className='mt-4'>
    
    
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
    <VaccinationAccordianCard />
    
    <VaccinationAccordianCard />
    
    </div>
    </div>

  )
}

export default VaccinationPage