import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState,useRef } from 'react';
const MAPBOX_API_KEY =  'pk.eyJ1IjoiaGFyc2hpdGphaW4xNTYiLCJhIjoiY2x1cW1lY3htMWdrbzJrcG5pYjJjbDduZSJ9.LbrY_Z2yAs7jniAJYuMtdA'|| process.env.REACT_APP_MAPBOX_API_KEY;
import { Feature } from "../interface/places";


function AddOnMap(){
    const mapDiv = useRef<HTMLDivElement>(null);
    const defaultFomData={
      name:"",
      address:"",
      lat:0,
      lng:0,
      pincode:""
  }

  const [formData,setFormData]=useState(defaultFomData);
  const {
    name,address,lat, lng,pincode }=formData;
    const onPlaceClicked = (place: Feature) => {
        const cord=['lng', 'lat'];
        const [lng1, lat1] = place.center;
        setFormData((prevState)=>({
          ...prevState,
          [cord[0]]:lng1,
          [cord[1]]:lat1,
          ['address']:place.place_name,
          ['pincode']:place.short_code
          
      }))

     
        // setActiveId(place.id);
        // map?.flyTo({
        //   center: [lng, lat],
        //   zoom: 14
        // });
        console.log(formData);

      }
      const onChange=(e:any)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]:e.target.value
        }))
    };
    const [query, setQuery] = useState('');
    const [places,setPlaces]=useState<Feature[]>([]);
    const fetchLocationData = useCallback(async (): Promise<void> => {
        try {
          const URL_BASE = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
          const URL = `${URL_BASE}${query}.json?access_token=${MAPBOX_API_KEY}`;
          const response = await fetch(URL);
          const data = await response.json();
          const latitude = data.features[0].geometry.coordinates[1];
          const longitude = data.features[0].geometry.coordinates[0];
          const location = data.features[0].place_name;
          console.log(data);
          setPlaces(data.features);
        } catch (error) {
          let message = 'Unknown Error';
          if (error instanceof Error) {
            message =
              'No results to show. Please try again with a different search query.';
          }
         
        }
      }, [query]);
      const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log(query);
        setQuery(e.target.value);
      };
    
      const handleSubmitQuery=(e:any)=>{
        e.preventDefault();
          fetchLocationData();
          console.log('s');
      };
    return( 

    <div>
    <div className="bg-white px-10 py-10 w-full">
      <form>
        <div className="max-w-xl">
          <div className="flex space-x-1 items-center mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
          </div>
          <div className="flex space-x-4">
            <div className="flex rounded-md overflow-hidden w-full">
              <input type="text" className="w-full rounded-md rounded-r-none" onChange={handleChangeQuery} />
              <button className="bg-indigo-600 text-white px-6 text-lg font-semibold py-4 rounded-r-md" onClick={handleSubmitQuery}>Go</button>
            </div>
            <button className="bg-white px-6 text-lg font-semibold py-4 rounded-md">Clear</button>
          </div>
        </div>
        <label htmlFor="address">Address</label><br></br>
            <input type="text" id="address" value={formData.address} onChange={onChange} aria-label="Address"></input>
            <br />
            
      </form>
      <ul className="list-group mt-3 ">
        List
      {
      places.length > 0 &&
      places.map((place:any) => (
        <li key={`key-${place.id}`} className={`list-group-item list-group-item-action pointer  active`} 
        
        onClick={() =>onPlaceClicked(place)}
        
        >
          <h6>{place.text_es}</h6>
          <p style={{ fontSize: "12px" }}>
            {place.place_name}
          </p>
          {/* <button
        //   onClick={() => getRoute(place)}
          className={`btn btn-sm  ${(activeId === place.id) ? 'btn-outline-light' : 'btn-outline-primary'}`}>
            Direcciones
          </button> */}
        </li>
      ))
      }
    </ul>
    
        {formData.address}
    </div>

  
            </div>
    
   );
}

export  default AddOnMap;