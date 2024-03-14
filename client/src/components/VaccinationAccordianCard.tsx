import Modal from '../UI/Modal';
import React, { useState } from 'react'

function VaccinationAccordianCard() {
 const [open, setOpen] =  useState(false);
 const [toggle, setToggle] = useState(false);
 const [ isChecked, setIsChecked] = useState(false);
 const  detailsOpenHandler = () =>{
  setOpen((prev)=>!prev);
 }

 const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      
      {isOpen && <Modal onClose={toggleModal} />}
    
<div id="accordion-collapse" data-accordion="collapse" className='my-2'>
  <h2 id="accordion-collapse-heading-1">
    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 rounded focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
      <span className='font-semibold flex items-center gap-2'> <span>
        <input  type="checkbox" id="react-option" checked={isChecked} className="hidden peer" required/>
        <label  onClick={()=>{
          setIsOpen(true);
          setIsChecked(!isChecked);
             
        }} htmlFor="react-option" className="inline-flex items-center justify-between  rounded-full text-gray-500 bg-white border-2 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:text-success peer-checked:border-success hover:text-gray-600 dark:peer-checked:text-gray-300 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
            <div className="block">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
          </svg>
            </div>
        </label>
    </span><span className='flex flex-col justify-start shrink-0'>
      <span className='text-start'>Vaccine  Information</span>
      <ul className='text-sm font-light text-start'>
      <li>Duration: 30 Days</li>
      <li>Number of Doses: 4 Doses</li>
      </ul>
      </span></span>
      <div className='flex shrink-0 items-center '>
      <label  className="hidden md:inline-flex items-center me-5 cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" onClick={()=> setToggle((prev)=> !prev)} checked={toggle} />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
        <span className="ms-3 text-sm font-medium text-secondary dark:text-gray-300">Notify me</span>
      </label>
      <svg onClick={detailsOpenHandler} data-accordion-icon className={`w-3 h-3 ${!open? `rotate-180` : ``} shrink-0`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
      </svg>
      </div>
    </button>
  </h2>
  <div id="accordion-collapse-body-1" className={`relative ${open ?"block" : "hidden"}`} aria-labelledby="accordion-collapse-heading-1">
    <div className="p-5 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 pb-8">
      <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
      <p className="text-gray-500 dark:text-gray-400">Check out this guide to learn how to get started and start developing websites even faster with components on top of Tailwind CSS.</p>
    </div>
    <label  className="inline-flex md:hidden items-center me-5 cursor-pointer absolute bottom-3 right-0">
        <input type="checkbox" value="" className="sr-only peer" onClick={()=> setToggle((prev)=> !prev)} checked={toggle} />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-gray-200 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-secondary"></div>
        <span className="ms-3 text-sm font-medium text-secondary dark:text-gray-300">Notify me</span>
      </label>
  </div>
</div>
</>
  )
}

export default VaccinationAccordianCard;