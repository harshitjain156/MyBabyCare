// import React, { useEffect, useState } from 'react'
// // import avatar from '../assets/profile.png';
// import { adminLoginValidation, registerValidation } from '../helper/validate';
// import { useFormik } from 'formik';
// import heroImage  from "../assets/Hero-image.jpg";
// import { Link, useNavigate } from 'react-router-dom';
// import Hero from '../components/Hero';
// import { toast } from 'react-toastify';


// // import { Link } from 'react-router-dom';

// export default function AdminPage() {
 
// const navigate = useNavigate();

//     const formik = useFormik({
//       initialValues : {
//         email: '',
//         // username: '',
//         password : '',
//         // password: ''
//       },
//       validate : adminLoginValidation,
//       validateOnBlur: false,
//       validateOnChange: false,
//       onSubmit : async values => {

//         // values = await Object.assign(values, { profile : file || ''})
//         // let registerPromise = registerUser(values)
//         // // toast.promise(registerPromise, {
//         // //   loading: 'Creating...',
//         // //   success : <b>Register Successfully...!</b>,
//         // //   error : <b>Could not Register.</b>
//         // // });
  
//         // registerPromise.then(function(){ navigate('/')});
//         try {
//           // Simulate form submission
//           console.log('Form submitted with values:', values);
//           // Show success message
//           toast.success('Sign In Successful!');

//           navigate("/dasboard")

//         } catch (error) {
//           // Log any errors
//           console.error('Error occurred:', error);
//           // Show error message
//           toast.error('An error occurred. Please try again.');
//         }
//       }
//     })



//   return (
//     <div className="container  w-screen mx-auto h-screen flex justify-center items-center ">
//       <div className='w-full flex justify-center items-center'>
       
//         <div className='w-full md:max-w-md py-4 border-2'>
//           <div className="title flex flex-col items-center">
//             <h4 className='text-xl font-bold py-4 '>Admin sign in</h4>
//             {/* <span className='py-4 text-ms w-2/3 text-center text-gray-500'>
//                 Welcome back to BabyCare
//             </span> */}
//           </div>

//           <form className='py-1' onSubmit={formik.handleSubmit}>
//               {/* <div className='profile flex justify-center py-4'>
//                   <label htmlFor="profile">
//                     <img src={file}  alt="avatar" />
//                   </label>
                  
//                   <input onChange={onUpload} type="file" id='profile' name='profile' />
//               </div> */}

//               <div className="textbox flex flex-col items-center gap-8 w-full">
//                   {/* <input {...formik.getFieldProps('email')}  type="text" placeholder='Email' /> */}
//                   {/* <input {...formik.getFieldProps('username')}  type="text" placeholder='Name' /> */}
//                  {/* <input {...formik.getFieldProps('email')}  type="text" placeholder='Email'  className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border ${
//                     false ? "border-red-500" : "border-gray-200"
//                   } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} />
                
//              <input {...formik.getFieldProps('password')}  type="password" placeholder='Password'  className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border ${
//                     false ? "border-red-500" : "border-gray-200"
//                   } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} /> */}
//                    <input
//                   {...formik.getFieldProps('email')}
//                   type="text"
//                   placeholder="Email"
//                   className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border ${
//                     formik.errors.email ? 'border-red-500' : 'border-gray-200'
//                   } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
//                 />
//                 <input
//                   {...formik.getFieldProps('password')}
//                   type="password"
//                   placeholder="Password"
//                   className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border ${
//                     formik.errors.password ? 'border-red-500' : 'border-gray-200'
//                   } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
//                 />
                 
                
            

//                   <button  type='submit'  className='hover:bg-secondary-dark'>Sign In</button>
//               </div>

//               <div className="text-center py-4 text-xs">
//               <span  className='text-blue-700 hover:underline cursor-pointer mb-2 block'>Forgot Password?</span>
               
//               </div>

//           </form>

//         </div>
//       </div>
//     </div>
//   )
// }


import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { adminLoginValidation } from '../helper/validate';

interface FormValues {
  email: string;
  password: string;
}

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: adminLoginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        // Simulate form submission
        console.log('Form submitted with values:', values);
        // Show success message
        toast.success('Sign In Successful!');
        navigate('/dasboard');
      } catch (error) {
        // Log any errors
        console.error('Error occurred:', error);
        // Show error message
        toast.error('An error occurred. Please try again.');
      }
    },
  });

  return (
    <div className="container  w-screen mx-auto h-screen flex justify-center items-center ">
      <div className="w-full flex justify-center items-center">
        <div className="w-full md:max-w-md py-4 border-2">
          <div className="title flex flex-col items-center">
            <h4 className="text-xl font-bold py-4 ">Admin sign in</h4>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-8 w-full">
              <input
                {...formik.getFieldProps('email')}
                type="text"
                placeholder="Email"
                className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border ${
                  formik.errors.email ? 'border-red-500' : 'border-gray-200'
                } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
              />
              <input
                {...formik.getFieldProps('password')}
                type="password"
                placeholder="Password"
                className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border ${
                  formik.errors.password ? 'border-red-500' : 'border-gray-200'
                } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
              />
              <button type="submit" className="hover:bg-secondary-dark">
                Sign In
              </button>
            </div>

            <div className="text-center py-4 text-xs">
              <span className="text-blue-700 hover:underline cursor-pointer mb-2 block">Forgot Password?</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
