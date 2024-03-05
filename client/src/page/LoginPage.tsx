// import React, { useEffect, useState } from 'react'
// // import avatar from '../assets/profile.png';

// import { useFormik } from 'formik';
// import heroImage  from "../assets/Hero-image.jpg";
// import { Link, useNavigate } from 'react-router-dom';
// import Hero from '../components/Hero';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { loginValidation, otpValidation, phoneNumberVerify } from '../helper/validate';

// // import { Link } from 'react-router-dom';

// export default function LoginPage() {

//     const [showOtpBox, setShowOtpBox] = useState(false);
//     const [seconds, setSeconds] = useState(60);
//     const navigate = useNavigate();

//     useEffect(() => {
//       const intervalId = setInterval(() => {
//         setSeconds(prevSeconds => prevSeconds===0?0: prevSeconds - 1);
//       }, 1000);

//       // Clear interval when the component unmounts or when seconds reach 0
//       return () => clearInterval(intervalId);
//     }, []);

//     const formikSendOtp = useFormik({
//       initialValues: {
//         phoneNumber: ''
//       },
//       validate: loginValidation,
//       validateOnBlur: false,
//       validateOnChange: false,
//       onSubmit: async values => {

//         try {
//           // Simulate sending OTP (replace with actual logic)
//           // setTimeout(() => {
//           //   // Simulate success message after OTP is sent
//           //   toast.success('OTP sent to your phone!');
//           // }, 2000);

//           // For demonstration, immediately show success message
//           toast.success('OTP sent to your phone!');
//           setShowOtpBox(true);
//           setSeconds(60);
//           // You can add your actual logic for sending OTP here
//         } catch (error) {
//           console.error('Error occurred:', error);
//           toast.error('Failed to send OTP. Please try again.');
//         }
//         // Logic to send OTP

//       }
//     });

//     const formikVerifyOtp = useFormik({
//       initialValues: {
//         otp1: '',
//         otp2: '',
//         otp3: '',
//         otp4: ''
//       },
//       validate: otpValidation,
//       validateOnBlur: false,
//       validateOnChange: false,
//       onSubmit: async values => {
//         // Logic to verify OTP
//         try {
//           // Simulate sending OTP (replace with actual logic)
//           // setTimeout(() => {
//           //   // Simulate success message after OTP is sent
//           //   toast.success('OTP sent to your phone!');
//           // }, 2000);

//           // For demonstration, immediately show success message
//           toast.success('OTP verified');
//           navigate("/user/dashboard");

//           // You can add your actual logic for sending OTP here
//         } catch (error) {
//           console.error('Error occurred:', error);
//           toast.error('Failed to verify OTP. Please try again.');
//         }
//         // Logic to send OTP

//       }
//     });

//   return (
//     <>

// <div className="container w-screen mx-auto h-screen flex justify-center items-center">
//       <div className="w-full flex justify-center items-center">
//         <div className="w-full md:max-w-md py-4 border-2">
//           <div className="title flex flex-col items-center">
//             <h4 className="text-xl font-bold">Sign In</h4>
//             <span className="py-4 text-ms w-2/3 text-center text-gray-500">
//               Hi User, Welcome back to BabyCare
//             </span>
//           </div>

//           {!showOtpBox ? (
//             <form className="py-1" onSubmit={formikSendOtp.handleSubmit}>
//               <div className="textbox flex flex-col items-center gap-8 w-full">
//                 <input
//                   {...formikSendOtp.getFieldProps('phoneNumber')}
//                   type="text"
//                   placeholder="Phone no."
//                   className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border ${
//                     formikSendOtp.errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
//                   } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
//                 />
//                 <button type="submit" className="hover:bg-secondary-dark">
//                   Generate OTP
//                 </button>
//               </div>

//               <div className="text-center py-4 text-xs">
//                 <span className="text-gray-500 block">
//                   Not Registered?{' '}
//                   <Link to="/user/signup" replace={true} className="text-blue-700 hover:underline cursor-pointer">
//                     Create an account
//                   </Link>
//                 </span>
//               </div>
//             </form>
//           ) : (
//             <form className="py-1" onSubmit={formikVerifyOtp.handleSubmit}>
//               <div className="textbox flex flex-col items-center gap-8 w-full">
//                 <div className="flex flex-row justify-center items-center gap-3 w-[50%]">
//                   <input
//                     {...formikVerifyOtp.getFieldProps('otp1')}
//                     maxLength="1"
//                     type="text"
//                     placeholder="0"
//                     className={`appearance-none block w-1/4 bg-gray-200 text-gray-700 border ${
//                       formikSendOtp.errors.otp1 ? 'border-red-500' : 'border-gray-200'
//                     } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
//                   />
//                   <input
//                     {...formikVerifyOtp.getFieldProps('otp2')}
//                     maxLength="1"
//                     type="text"
//                     placeholder="0"
//                     className={`appearance-none block w-1/4 bg-gray-200 text-gray-700 border ${
//                       formikSendOtp.errors.otp2 ? 'border-red-500' : 'border-gray-200'
//                     } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
//                   />
//                   <input
//                     {...formikVerifyOtp.getFieldProps('otp3')}
//                     maxLength="1"
//                     type="text"
//                     placeholder="0"
//                     className={`appearance-none block w-1/4 bg-gray-200 text-gray-700 border ${
//                       formikSendOtp.errors.otp4 ? 'border-red-500' : 'border-gray-200'
//                     } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
//                   />
//                   <input
//                     {...formikVerifyOtp.getFieldProps('otp4')}
//                     maxLength="1"
//                     type="text"
//                     placeholder="0"
//                     className={`appearance-none block w-1/4 bg-gray-200 text-gray-700 border ${
//                       formikSendOtp.errors.otp4 ? 'border-red-500' : 'border-gray-200'
//                     } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
//                   />
//                 </div>

//                 <button type="submit" className="hover:bg-secondary-dark">
//                   Submit
//                 </button>
//               </div>

//               <div className="text-center py-4 text-xs">
//                 {seconds !== 0 && (
//                   <span className="text-blue-700 cursor-pointer mb-2">{`${seconds} seconds left`}</span>
//                 )}
//                 {seconds === 0 && (
//                   <span className="text-blue-700 hover:underline cursor-pointer mb-2" onClick={() => setSeconds(60)}>
//                     Resend OTP
//                   </span>
//                 )}
//                 <span className="text-gray-500 block">
//                   Not Registered?{' '}
//                   <Link to="/doctor/signup" replace={true} className="text-blue-700 hover:underline cursor-pointer">
//                     Create an account
//                   </Link>
//                 </span>
//               </div>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//     </>
//   )
// }

import React, { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginValidation, otpValidation } from "../helper/validate";
import axios from "axios";
import { BASE_URL } from "../helper/endpoints";
import { useAuth } from "../AuthContext/AuthContext";

interface LoginPageProps {}

interface FormValuesSendOtp {
  phoneNumber: string;
}

interface FormValuesVerifyOtp {
  otp0: string;
  otp1: string;
  otp2: string;
  otp3: string;
}

export default function LoginPage() {
  const { userData, updateUser } = useAuth();
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [userId, setUserId] = useState(null);
  const [seconds, setSeconds] = useState(60);
  const [phone, setPhone] = useState<string | null>(null);
  const navigate = useNavigate();
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds === 0 ? 0 : prevSeconds - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formikSendOtp = useFormik<FormValuesSendOtp>({
    initialValues: {
      phoneNumber: "",
    },
    validate: loginValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        setPhone(values.phoneNumber);

        toast.info("Pending...");
        // Simulate sending OTP (replace with actual logic)
        const response = await axios.post(
          `${BASE_URL}api/v1/login_with_phone`,
          { phone: values.phoneNumber }
        );
        // console.log(response);
        console.log(`Your otp is ${response.data.data.OTP}`);
        setUserId(response.data.data.userId);
        toast.success("OTP sent to your phone!");
        setShowOtpBox(true);
        setSeconds(60);
      } catch (error: any) {
        // console.error('Error occurred:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
      }
    },
  });

  const formikVerifyOtp = useFormik<FormValuesVerifyOtp>({
    initialValues: {
      otp0: "",
      otp1: "",
      otp2: "",
      otp3: "",
    },
    validate: otpValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        console.log("Clicked....");
        // Assuming you have an API endpoint to verify OTP
        const response = await axios.post(`${BASE_URL}api/v1/verify`, {
          otp: `${values.otp0}${values.otp1}${values.otp2}${values.otp3}`,
          userId,
        });

        updateUser(response.data.data);
        toast.success("OTP verified");
        navigate("/user/dashboard");
      } catch (error: any) {
        // console.error('Error occurred:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to verify OTP. Please try again.");
        }
      }
    },
  });

  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (
        !/^[0-9]{1}$/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "Tab" &&
        !e.metaKey
      ) {
        e.preventDefault();
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        const inputs = formRef.current?.querySelectorAll(
          "input[type=text]"
        ) as NodeListOf<HTMLInputElement>;
        const index = Array.from(inputs).indexOf(e.target as HTMLInputElement);

        const currentInput = inputs[index];

        if (index >= 0) {
          // Check if the current input is empty and not the first input
          if (currentInput.value === "" && index > 0) {
            // Clear the value of the current input and focus on the previous input
            currentInput.value = "";
            inputs[index - 1].focus();
          }
        }
      }
    };

    const handleInput = (e: any) => {
      const { target } = e;
      const inputs = formRef.current?.querySelectorAll(
        "input[type=text]"
      ) as NodeListOf<HTMLInputElement>;
      const index = Array.from(inputs).indexOf(target);
      // console.log(index);
      if (target.value && index !== -1) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      }
    };

    const handleFocus = (e: any) => {
      e.target.select();
    };

    const handlePaste = (e: any) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text");
      const inputs = formRef.current?.querySelectorAll(
        "input[type=text]"
      ) as NodeListOf<HTMLInputElement>;
      if (!new RegExp(`^[0-9]{${inputs.length}}$`).test(text)) {
        return;
      }
      // const digits = text.split('');
      // inputs.forEach((input, index) => input.value = digits[index]);
      // (formRef.current?.querySelector('button[type=submit]') as HTMLButtonElement).focus();
    };

    const form = formRef.current;

    console.log(form);
    if (form) {
      const inputs = form.querySelectorAll("input[type=text]");
      inputs.forEach((input) => {
        input.addEventListener("input", handleInput);
        input.addEventListener("keydown", handleKeyDown);
        input.addEventListener("focus", handleFocus);
        input.addEventListener("paste", handlePaste);
      });
    }

    return () => {
      const inputs = formRef.current?.querySelectorAll("input[type=text]");
      if (inputs) {
        inputs.forEach((input) => {
          input.removeEventListener("input", handleInput);
          input.removeEventListener("keydown", handleKeyDown);
          input.removeEventListener("focus", handleFocus);
          input.removeEventListener("paste", handlePaste);
        });
      }
    };
  }, [showOtpBox]);

  const handleResendOTP = async () => {
    try {
      toast.info("Resending OTP...");
      const response = await axios.post(`${BASE_URL}api/v1/login_with_phone`, {
        phone,
      });
      console.log(`Your OTP is ${response.data.data.OTP}`); // Assuming you have an API endpoint to resend OTP
      toast.success("OTP resent to your phone!");
      setSeconds(60);
    } catch (error: any) {
      // console.error('Error occurred while resending OTP:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    }
  };

  // Inside the JSX:

  return (
    <>
      <div className="container w-screen mx-auto h-screen flex justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <div className="w-full md:max-w-md py-4 border-2">
            <div className="title flex flex-col items-center">
              <h4 className="text-xl font-bold">Sign In</h4>
              <span className="py-4 text-ms w-2/3 text-center text-gray-500">
                Hi User, Welcome back to BabyCare
              </span>
            </div>

            {!showOtpBox ? (
              <form className="py-1" onSubmit={formikSendOtp.handleSubmit}>
                <div className="textbox flex flex-col items-center gap-8 w-full">
                  <input
                    {...formikSendOtp.getFieldProps("phoneNumber")}
                    type="text"
                    placeholder="Phone no."
                    className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border ${
                      formikSendOtp.errors.phoneNumber
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  />
                  <button type="submit" className="hover:bg-secondary-dark">
                    Generate OTP
                  </button>
                </div>

                <div className="text-center py-4 text-xs">
                  <span className="text-gray-500 block">
                    Not Registered?{" "}
                    <Link
                      to="/user/signup"
                      replace={true}
                      className="text-blue-700 hover:underline cursor-pointer"
                    >
                      Create an account
                    </Link>
                  </span>
                </div>
              </form>
            ) : (
              <form
                id="otp-form"
                className="py-1"
                ref={formRef}
                onSubmit={formikVerifyOtp.handleSubmit}
              >
                <div className="textbox flex flex-col items-center gap-8 w-full">
                  <div className="flex flex-row justify-center items-center gap-3 w-[50%]">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        {...formikVerifyOtp.getFieldProps(`otp${index}`)}
                        maxLength={1}
                        type="text"
                        placeholder="0"
                        className={`appearance-none block w-1/4 bg-gray-200 text-gray-700 border ${
                          formikVerifyOtp.errors[
                            `otp${index}` as keyof typeof formikVerifyOtp.errors
                          ]
                            ? "border-red-500"
                            : "border-gray-200"
                        } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                      />
                    ))}
                  </div>

                  <button type="submit" className="hover:bg-secondary-dark">
                    Submit
                  </button>
                </div>

                <div className="text-center py-4 text-xs">
                  {seconds !== 0 && (
                    <span className="text-blue-700 cursor-pointer mb-2">{`${seconds} seconds left`}</span>
                  )}
                  {seconds === 0 && (
                    <span
                      className="text-blue-700 hover:underline cursor-pointer mb-2"
                      onClick={handleResendOTP}
                    >
                      Resend OTP
                    </span>
                  )}
                  <span className="text-gray-500 block">
                    Not Registered?{" "}
                    <Link
                      to="/user/signup"
                      replace={true}
                      className="text-blue-700 hover:underline cursor-pointer"
                    >
                      Create an account
                    </Link>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}