import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (e:any)=> void;
}

  const SearchBar: React.FC<SearchBarProps> = ({searchTerm, setSearchTerm}) => {
  return (
    

        <div className="relative w-full  mx-8">

            <input value={searchTerm} type="text" className="h-14 w-[100%] pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search By Name, Phone no., Specialization and Department" onChange={(e)=>setSearchTerm(e.target.value)}/>

            <div className="absolute top-4 right-3">
                <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
            </div>

        </div>


  );
};

export default SearchBar;


