import ScrollableFeed from "react-scrollable-feed";
import VaccinationAccordianCard from "../components/VaccinationAccordianCard";
import React, { useEffect, useState } from "react";
import RadialChart from "../components/RadialChart";
import ChildDetailsFormModal from "../UI/ChildDetailsFormModal";
import { BASE_URL } from "../helper/endpoints";
import ChildCard from "../components/ChildCard";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext";
import AddVaccinationModal from "../UI/AddVaccinationModal";
interface Child {
  _id: number;
  name: string;
  birthdate: string;
  gender: string;
  vaccinationsDone: number;
  vaccinationsTotal: number;
}

enum Tab {
  All = "All",
  Pending = "Pending",
  Done = "Completed",
}

function VaccinationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(Tab.Pending);
 const [vaccinationsData, setVaccinationsData] = useState<any[]|null>(null);
 const [selectedChild, setSelectedChild] = useState<Child | null>(null);
 const {userData} = useAuth();

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    console.log("Switched to tab:", tab);
  };
  const [children, setChildren] = useState<Child[]>([]);
  const [deleteFlag, setDeleteFlag] = useState(false);
  const [newVaccineFlag, setNewVaccineFlag] = useState(false);
  const deleteChild = async (childId:any) => {
    try {
        // Assuming your API endpoint URL
       

        const response = await axios.delete(`${BASE_URL}api/v1/delete/${childId}`);

        if (response.status === 200) {
            console.log('Child deleted successfully');
            setDeleteFlag(!deleteFlag);
        } else {
            console.error('Failed to delete child');
        }
    } catch (error) {
        console.error('Error deleting child:', error);
    }
};
  

  useEffect(()=>{

    ;(async () => {
        try {
          const response = await axios.get(`${BASE_URL}api/v1/all-child/?userId=${userData.userId}`);
          console.log("Successfully fetched the child list: ", response.data);
          setChildren(response.data.data)
        }
        catch(error){
          console.log("Error in fetching the Child list");
        }
    })()

  }, [deleteFlag])

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        if(!selectedChild?._id) return ;
        const response = await axios.get(`${BASE_URL}api/v1/get-mychild-details/${selectedChild._id}`);
        // console.log(response.data) // Adjust the URL according to your API endpoint
        const formattedVaccines = response.data.data.vaccinations.map((vaccine : any) => ({
          id: vaccine._id,
          childId: response.data.data._id,
          vaccineId: vaccine.vaccineId._id,
          name: vaccine.vaccineId.name,
          date: new Date(vaccine.predictedDate), // Assuming predictedDate is the date of vaccination
          status: vaccine.status.toLowerCase() === 'done' ? 'completed' : vaccine.status.toLowerCase() === 'delayed'? 'delayed' : 'upcoming',
          notify: vaccine.notify,
          description: vaccine.vaccineId.desc,
          vaccinationDate: vaccine.vaccinatedDate ? new Date(vaccine.vaccinatedDate) : null,
        }));
        formattedVaccines.sort((a: any, b:any) => a.date - b.date);
        console.log(formattedVaccines)
        setVaccinationsData(formattedVaccines);
      } catch (error) {
        console.error('Error fetching vaccines:', error);
        // Handle error, show error message, etc.
      }
    };

    fetchVaccines();
  }, [selectedChild?._id, newVaccineFlag]); // Empty dependency array ensures the effect runs only once after the initial render

  // const vaccinationsData = [
  //   {
  //     id: 1,
  //     name: 'Vaccination 1',
  //     date: new Date(2024, 3, 15), // April 15th, 2024
  //     status: 'ontime',
  //     notify: false,
  //     description:
  //       'Routine vaccination including Diphtheria, Tetanus, Pertussis (DTaP), Haemophilus influenzae type b (Hib), Pneumococcal conjugate vaccine (PCV13), Polio vaccine (IPV), and Rotavirus vaccine.',
  //     vaccinationDate: new Date(2024, 3, 15), // Example vaccination date
  //   },
  //   {
  //     id: 2,
  //     name: 'Vaccination 2',
  //     date: new Date(2024, 2, 11), // April 20th, 2024
  //     status: 'delayed',
  //     notify: true,
  //     description:
  //       'Routine vaccination including Measles, Mumps, Rubella (MMR), Varicella (Chickenpox), Hepatitis A, and Hepatitis B.',
  //     vaccinationDate: new Date(), // Empty date until vaccinated
  //   },
    
  //   {
  //     id: 3,
  //     name: 'Vaccination 4',
  //     date: new Date(2024, 3, 10), // May 10th, 2024
  //     status: 'ontime',
  //     notify: false,
  //     description: 'Routine vaccination including Hepatitis A and Hepatitis B.',
  //     vaccinationDate: new Date(2024, 3, 9), // Example vaccination date
  //   },
  //   {
  //     id: 4,
  //     name: 'Vaccination 5',
  //     date: new Date(2024, 2, 15), // May 18th, 2024
  //     status: 'delayed',
  //     notify: false,
  //     description: 'Routine vaccination including Pneumococcal conjugate vaccine (PCV13).',
  //     vaccinationDate: new Date(), // Empty date until vaccinated
  //   },
  //   {
  //     id: 5,
  //     name: 'Vaccination 3',
  //     date: new Date(2024, 4, 1), // May 1st, 2024
  //     status: 'upcoming',
  //     notify: true,
  //     description: 'Routine vaccination including Influenza (Flu) vaccine.',
  //     vaccinationDate: null, // No vaccination date until taken
  //   },
  //   {
  //     id: 6,
  //     name: 'Vaccination 6',
  //     date: new Date(2024, 5, 5), // June 5th, 2024
  //     status: 'upcoming',
  //     notify: true,
  //     description: 'Routine vaccination including Varicella (Chickenpox) vaccine.',
  //     vaccinationDate: null, // No vaccination date until taken
  //   },
  //   {
  //     id: 7,
  //     name: 'Vaccination 7',
  //     date: new Date(2024, 5, 15), // June 15th, 2024
  //     status: 'upcoming',
  //     notify: true,
  //     description: 'Routine vaccination including Meningococcal conjugate vaccine (MCV4).',
  //     vaccinationDate: null, // Example vaccination date
  //   },
  //   {
  //     id: 8,
  //     name: 'Vaccination 8',
  //     date: new Date(2024, 5, 25), // June 25th, 2024
  //     status: 'upcoming',
  //     notify: true,
  //     description: 'Routine vaccination including Human papillomavirus (HPV) vaccine.',
  //     vaccinationDate: null, // Empty date until vaccinated
  //   },
  //   {
  //     id: 9,
  //     name: 'Vaccination 9',
  //     date: new Date(2024, 6, 8), // July 8th, 2024
  //     status: 'upcoming',
  //     notify: true,
  //     description: 'Routine vaccination including Tetanus, Diphtheria, Pertussis (Tdap) vaccine.',
  //     vaccinationDate: null, // No vaccination date until taken
  //   },
  //   {
  //     id: 10,
  //     name: 'Vaccination 10',
  //     date: new Date(2024, 6, 20), // July 20th, 2024
  //     status: 'upcoming',
  //     notify: true,
  //     description: 'Routine vaccination including Inactivated poliovirus vaccine (IPV).',
  //     vaccinationDate: null, // Example vaccination date
  //   },
  // ];
  

  
  

  const handleChildClick = (child: Child) => {
    setSelectedChild(child);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAddVaccineModal, setIsOpenAddVaccineModal] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const toggleAddVaccinationModal = ()=>{
    setIsOpenAddVaccineModal(!isOpenAddVaccineModal);
  }

  const handleChildFormSubmit = async (child: any) => {

  
  try {
 
    const response = await axios.post(`${BASE_URL}api/v1/create-new-child`, {...child,
    userId: userData.userId,
    });
    setChildren(prevChildren => [...prevChildren, {...response.data.data}]);
    console.log('Child data sent successfully:', response.data);
    toggleModal();
  } catch (error) {
    console.error('Error sending child data:', error);
  }
    
  };

  const addVaccineHandler = async (data:any) => {
    try {
      if(!selectedChild) return;
      const response = await axios.post(`${BASE_URL}api/v1/add-my-vaccine`,{ ...data, childId: selectedChild?._id}); // Adjust the URL according to your API endpoint
      console.log('POST request successful:', response.data);
      setNewVaccineFlag((prev)=> !prev);
      toggleAddVaccinationModal();
      // Handle success, show message, update UI, etc.
    } catch (error) {
      console.error('Error making POST request:', error);
      // Handle error, show error message, etc.
    }
  };

  
 
  

       


  return (
    <>
    {isOpen && <ChildDetailsFormModal onClose={toggleModal} onSubmit={handleChildFormSubmit}/>}
    {isOpenAddVaccineModal && <AddVaccinationModal onClose={toggleAddVaccinationModal} onSubmit={addVaccineHandler}/>}
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-4 pl-4">Vaccinations</h1>
      <div className="flex space-x-4 w-full pl-4 overflow-x-auto pb-2 border-b" style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {children.map((child) => (
          <ChildCard key={child._id} child={child} selectedChild={selectedChild}  onClick={() => handleChildClick(child)} handleDelete={()=>deleteChild(child._id)}/>
        ))}
        <div  onClick={toggleModal}
          className={`cursor-pointer p-4 border rounded-lg    w-auto flex items-center justify-center shrink-0 bg-blue-100"
            `}
        >
          <span className="rounded-full p-5 mx-24 items-center justify-center bg-opacity-10 bg-success flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-12 h-12 text-success"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
        
        </div>
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
      <div className="overflow-auto w-full flex justify-around max-h-[calc(100vh-335px)] " style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      <button
      onClick={()=>{setIsOpenAddVaccineModal(!isOpenAddVaccineModal)}}
      className="absolute right-4 bottom-99 flex h-16 w-16 mt-4 select-none items-center gap-3  bg-secondary  rounded-full text-center align-middle font-sans text-md font-semibold  text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20"
          type="button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 m-auto">
          <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
        </svg>
        </button>
        <ol className="relative border-s w-1/2 h-full mx-12 mt-8  border-gray-200 ">
          {vaccinationsData && vaccinationsData.map((vaccine)=> 
           <VaccinationAccordianCard key={vaccine.id} vaccine={vaccine}/>
          )}
          {/* <VaccinationAccordianCard />
          <VaccinationAccordianCard />
          <VaccinationAccordianCard />
          <VaccinationAccordianCard />
          <VaccinationAccordianCard /> */}
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
    </>
  );
}

export default VaccinationPage;
