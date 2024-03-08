import React, { useState } from 'react';
import { useFormik } from 'formik';

const DoctorProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: 'Dr. John Doe',
    specialization: 'Cardiologist',
    department: 'Cardiology',
    experience: '10+ years',
    location: 'New York, NY',
    phone: '+911234567890',
  });
  const formik = useFormik({
    initialValues: formValues,
    onSubmit: values => {
      // Handle form submission, e.g., send data to backend
      console.log(values);
      setFormValues(values);
      // setIsEditing(false); // Assuming you want to exit edit mode after submission
    }
  });

  const onEditHandler = () =>{
    setIsEditing((prev)=>!prev);
  }

 const [imgUrl, setImgUrl] = useState(null);

  function handleFileSelect(event) {
    const file = event.target.files[0];
    console.log(file);
    setImgUrl(file.name);
    // const reader = new FileReader();
  
    // reader.onload = function(event) {
    //   const imgElement = document.getElementById('profilePicture');
    //   imgElement.src = event.target.result;
    // }
  
    // reader.readAsDataURL(file);
  }
  

  return (
    <div className="container mx-auto mt-20">
      <div className=" mx-auto overflow-hidden">
        <div className="md:flex items-center">
          <div className="flex justify-center items-start">
            <span className='flex relative w-1/2 md:w-full mb-10'>
            <img className="rounded-full   object-cover" src={imgUrl || "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg"} alt="Doctor" />
            <label htmlFor="profilePicInput" className="cursor-pointer">
            <span className='absolute right-4 bottom-4 bg-slate-50 rounded-full hover:opacity-80 hover:text-slate-600'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
              <path d="M12 9a3.75 3.75 0 1 0 0 7.5A3.75 3.75 0 0 0 12 9Z" />
              <path fill-rule="evenodd" d="M9.344 3.071a49.52 49.52 0 0 1 5.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 0 1-3 3h-15a3 3 0 0 1-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 0 0 1.11-.71l.822-1.315a2.942 2.942 0 0 1 2.332-1.39ZM6.75 12.75a5.25 5.25 0 1 1 10.5 0 5.25 5.25 0 0 1-10.5 0Zm12-1.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
            </svg>
            </span>
            </label>
            <input type="file" id="profilePicInput" className="hidden" accept="image/*" onChange={handleFileSelect} />
            </span>
  
          </div>
          <form className="p-8 w-full" onSubmit={formik.handleSubmit}>
            {/* <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              <input
                type="text"
                name="name"
               
                value={formik.values.name}
                onChange={formik.handleChange}
                className="border-0 border-indigo-500 focus:outline-none px-0 text-3xl"
              />
            </div> */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm  text-gray-700  font-semibold">
                Name:
                </label>
                <input

               {...formik.getFieldProps("name")}
                  type="text"
                  id="name"
                  name="name"
                  disabled={true}
                  className={`form-input mt-1 block w-full ${ true  && `bg-slate-100`}`}
               
                />
              </div>
            {/* <p className="text-gray-500 flex  items-center font-semibold">
              <textarea
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                className="border-0 border-gray-400 w-[100%] px-0 mx-0 focus:outline-none"
              />
            </p> */}
            <div className="mb-4">
                <label htmlFor="phone" className="block text-sm  text-gray-700  font-semibold">
                Phone:
                </label>
                <input

               {...formik.getFieldProps("phone")}
                  type="text"
                  id="phone"
                  name="phone"
                  disabled={true}
                  className="form-input mt-1 block w-full bg-slate-100"
               
                />
              </div>

              <div className="mb-4">
                <label htmlFor="department" className="block text-sm  text-gray-700  font-semibold">
                Department:
                </label>
                <input

               {...formik.getFieldProps("department")}
                  type="text"
                  id="department"
                  name="department"
                  disabled={!isEditing}
                  className={`form-input mt-1 block w-full ${ !isEditing  && `bg-slate-100`}`}
               
                />
              </div>
            
            <div className="mb-4">
                <label htmlFor="specialization" className="block text-sm  text-gray-700  font-semibold">
                Specialization:
                </label>
                <input

               {...formik.getFieldProps("specialization")}
                  type="text"
                  id="specialization"
                  name="specialization"
                  disabled={!isEditing}
                  className={`form-input mt-1 block w-full ${ !isEditing  && `bg-slate-100`}`}
               
                />
              </div>
              <div className="mb-4">
                <label htmlFor="experience" className="block text-sm  text-gray-700  font-semibold">
                Experience:
                </label>
                <input

               {...formik.getFieldProps("experience")}
                  type="text"
                  id="experience"
                  name="experience"
                  disabled={!isEditing}
                  className={`form-input mt-1 block w-full ${ !isEditing  && `bg-slate-100`}`}
               
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm  text-gray-700  font-semibold">
                Location:
                </label>
                <input

               {...formik.getFieldProps("location")}
                  type="text"
                  id="location"
                  name="location"
                  disabled={!isEditing}
                  className={`form-input mt-1 block w-full ${ !isEditing  && `bg-slate-100`}`}
               
                />
              </div>
           
          
           
            {/* <p className="mt-2 text-gray-500  font-semibold">
              Availability:
              <input
                type="text"
                name="availability"
                value={formik.values.availability}
                onChange={formik.handleChange}
                className="ml-2 border-0 border-gray-400  focus:outline-none"
              />
            </p> */}
            {/* <p className="mt-2 text-gray-500  font-semibold">
              Email:
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="ml-2 border-0 border-gray-400  focus:outline-none"
              />
            </p> */}
            
           
            <div className="mt-2 text-center">
              <button type={isEditing? "submit": ""} className="border bg-secondary w-2/4 py-2 rounded-full text-white text-sm shadow-sm text-center" onClick={onEditHandler}>{!isEditing? `Edit Profile`:`Update Profile`}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfilePage;
