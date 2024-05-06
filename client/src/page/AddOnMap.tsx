import React, { MouseEventHandler, useCallback, useEffect, useMemo, useState, useRef } from 'react';
const MAPBOX_API_KEY = 'pk.eyJ1IjoiaGFyc2hpdGphaW4xNTYiLCJhIjoiY2x1cW1lY3htMWdrbzJrcG5pYjJjbDduZSJ9.LbrY_Z2yAs7jniAJYuMtdA' || process.env.REACT_APP_MAPBOX_API_KEY;
import { Feature } from "../interface/places";
import './style.css'

function AddOnMap() {
  const mapDiv = useRef<HTMLDivElement>(null);
  const defaultFomData = {
    name: "",
    address: "",
    lat: 0,
    lng: 0,
    pincode: ""
  }
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState<Feature[]>([]);
  const [isSelected, setSelected] = useState<boolean>(true);
  const [formData, setFormData] = useState(defaultFomData);
  const {
    name, address, lat, lng, pincode } = formData;
  const onPlaceClicked = (place: Feature) => {
    const cord = ['lng', 'lat'];
    const [lng1, lat1] = place.center;
    setFormData((prevState) => ({
      ...prevState,
      [cord[0]]: lng1,
      [cord[1]]: lat1,
      ['address']: place.place_name,


    }))
    setQuery(place.place_name);
    setSelected(true);
    console.log(formData);

  }


  const fetchLocationData = useCallback(async (query: string): Promise<void> => {
    try {
      const URL_BASE = `https://api.mapbox.com/geocoding/v5/mapbox.places/`;
      const URL = `${URL_BASE}${query}.json?access_token=${MAPBOX_API_KEY}`;
      const response = await fetch(URL);
      const data = await response.json();
      const latitude = data.features[0].geometry.coordinates[1];
      const longitude = data.features[0].geometry.coordinates[0];
      const location = data.features[0].place_name;
      // console.log(data);
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
    setFormData((prevState)=>({
      ...prevState,[e.target.name]:e.target.value
    }))
    handleSubmitQuery(e);
    console.log(query);
  };

  const handleSubmitQuery = async (e: any) => {
    e.preventDefault();
    console.log("second", query)
    // await fetchLocationData();

  };

  const onChange = async (e: any) => {

    // console.log("first",e.target.value);
    //  setFormData((prevState)=>({
    //     ...prevState,
    //     [e.target.id]:e.target.value
    // }))
    setQuery(e);
    fetchLocationData(e);
    console.log(e)
    console.log(query)
    // handleChangeQuery(e);
    setSelected(false)


  };
  const onSubmitEvent=(e:any)=>{
    e.preventDefault()
    console.log(formData)
  }

  return (
    <form onSubmit={(e)=>onSubmitEvent}>
      <div className='p-6 pl-10 pr-10'>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                onChange={handleChangeQuery}
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>
          

            <div className="sm:col-span-3">
              <label htmlFor="Phone" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  required
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>



            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  value={query} onChange={(e) => onChange(e.target.value)} onInput={(e) => handleSubmitQuery(e)}
                  type="text"
                  name="street-address"
                  id="address"
                  onEmptied={() => setSelected(false)}
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
               

                {!isSelected ? <ul className="list-group mt-3 " >
                  <div className='flex justify-between w-full'>

                    Search
                    {/* <div className='flex justify-end' onClick={() => setSelected(true)}>
                      <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div> */}

                  </div>
                  <br />
                  <br />
                  {
                    places.length > 0 &&
                    places.map((place: any) => (
                      <>
                        <div className="box border-r border-b border-l border-t border-gray-400  lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-5 flex flex-col justify-between leading-normal">

                          <li key={`key-${place.id}`} className={`list-group-item list-group-item-action pointer  active`}

                            onClick={() => onPlaceClicked(place)}

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
                        </div>
                        <br />
                      </>
                    ))
                  }
                </ul> :
                  <div className="mt-6 flex w-full  justify-end ">
                    <div className='w-48 flex justify-end'>
                      <button type='submit' onClick={onSubmitEvent} > Save</button>
                    </div>
                  </div>}

              </div>
            </div>




          </div>
        </div>



      </div>
    </form>
  );
}

export default AddOnMap;