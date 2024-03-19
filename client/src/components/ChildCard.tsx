import React, { useState } from 'react'
import RadialChart from './RadialChart';

interface Child {
   child : any;
   selectedChild: any;
   onClick: (value :any)=> any;
   handleDelete : ()=> void;

  }

const childCard : React.FC<Child> = ({child, selectedChild, onClick, handleDelete})  => {

    const calculateAge = (birthdate: string): string => {
        console.log(birthdate)
        const today = new Date();
        const birthDate = new Date(birthdate);
        console.log(birthDate);
          let years;
          if ( today.getMonth() > birthDate.getMonth() ||
              ( today.getMonth() == birthDate.getMonth() &&
                today.getDate() >= birthDate.getDate()
              )
            ) {
            years = today.getFullYear() - birthDate.getFullYear();
          }
          else {
            years = today.getFullYear() - birthDate.getFullYear() - 1;
          }
    
          let months=0;
          if (today.getDate() >= birthDate.getDate()) {
            months = today.getMonth() - birthDate.getMonth();
          }
          else if (today.getDate() < birthDate.getDate()) {
            months = today.getMonth() - birthDate.getMonth() - 1;
          }
          // make month positive
          months = months < 0 ? months + 12 : months;
    
          let days;
          let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          if (today.getDate() >= birthDate.getDate()) {
            days = today.getDate() - birthDate.getDate();
          } else {
            days = today.getDate() - birthDate.getDate() + monthDays[birthDate.getMonth()];
          }
              return `${years!==0 ? `${years} years, `:``}${months!==0 ? `${months} months, `: ``}${days!==0? `${days} days`: ``}`;
    };
    const [ toggleDelete, setToggleDelete] = useState(false);

    const  handleClickOpen = () => {
      setToggleDelete(!toggleDelete);
    };

    
    

            
  return (
    <div
    key={child._id}
    className={`relative cursor-pointer p-4 border rounded-lg  w-auto flex shrink-0 ${
      selectedChild?._id === child._id ? "bg-blue-100" : ""
    }`}
    onClick={onClick}
  >
    <span>
      <h2 className="text-lg font-bold mb-2">{child.name}</h2>
      <p className="text-gray-500">{`Gender: ${child.gender}`}</p>
      <p className="text-gray-500">{`Age: ${calculateAge(child.birthdate)}`}</p>

      <p className="text-gray-500">
        Vaccinations done: {child.vaccinationsDone} /{" "}
        {child.vaccinationsTotal}
      </p>
    </span>
    <span className="inline-block mx-auto">
      <RadialChart
        completionPercentage={
          (child.vaccinationsDone / child.vaccinationsTotal) * 100
        }
        className=""
      />
    </span>
    <span  className="absolute right-2 top-2">
    <button id="dropdownMenuIconHorizontalButton" onClick={handleClickOpen} data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-1 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50" type="button"> 
<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
</svg>
</button>

<div id="dropdownDotsHorizontal" className={`z-10 absolute ${!toggleDelete && 'hidden'} left-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-12 p-1`}>
<ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownMenuIconHorizontalButton">
<li onClick={handleDelete}>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto">
<path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
</svg>

</li>

</ul>
</div>
    </span>
  </div>
  )
}

export default childCard;