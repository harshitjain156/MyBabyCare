import React, { useEffect, useRef, useState } from "react";
// import avatar from '../assets/profile.png';

import { useFormik } from "formik";

import { Link, useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { otpValidation, signUpValidation } from "../helper/validate";
import axios from "axios";
import { BASE_URL } from "../helper/endpoints";
import { useAuth } from "../AuthContext/AuthContext";

// import { Link } from 'react-router-dom';

interface FormValuesSendOtp {
  username: string;
  phoneNumber: string;
}

interface FormValuesVerifyOtp {
  otp0: string;
  otp1: string;
  otp2: string;
  otp3: string;
}

export default function SignUpPage() {
  const { userData, updateUser } = useAuth();
  const [userId, setUserId] = useState(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const [showOtpBox, setShowOtpBox] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(60);

  const [resendLoading, setResendLoading] = useState(false);
  const [resendError, setResendError] = useState<string | null>(null);

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

    // Clear interval when the component unmounts or when seconds reach 0
    return () => clearInterval(intervalId);
  }, []);

  const formikSendOtp = useFormik<FormValuesSendOtp>({
    initialValues: {
      username: "",
      phoneNumber: "",
    },
    validate: signUpValidation,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values: any) => {
      try {
        setPhone(values.phoneNumber);
        setName(values.username);
        // toast.info("Pending...");
        // Simulate sending OTP (replace with actual logic)
        const response = await axios.post(
          `${BASE_URL}api/v1/register_with_phone`,
          { phone: values.phoneNumber, name: values.username, role: "doctor" }
        );
        // console.log(response);
        console.log(`Your otp is ${response.data.data.OTP}`);
        setUserId(response.data.data.userId);
        // toast.success("OTP sent to your phone!");
        setShowOtpBox(true);
        setSeconds(60);
      } catch (error: any) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // toast.error(error.response.data.message);
          formikSendOtp.setErrors({phoneNumber : error.response.data.message})
          
        } else {
          // toast.error("Failed to send OTP. Please try again.");
          formikSendOtp.setErrors({phoneNumber : "Failed to send OTP. Please try again."})
          
        }
      }
      // Logic to send OTP
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
    validateOnBlur: true,
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
        // toast.success("OTP verified");
        navigate("/doctor/dashboard");
      } catch (error: any) {
        // console.error('Error occurred:', error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          // toast.error(error.response.data.message);
          formikVerifyOtp.setErrors( {otp1 : error.response.data.message});
        } else {
          // toast.error("Failed to verify OTP. Please try again.");
          formikVerifyOtp.setErrors( {otp1 : "Failed to verify OTP. Please try again."});
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
      // toast.info("Resending OTP...");
      // Set loading state to true
      setResendLoading(true);
      // Clear any previous error message
      setResendError(null);

      const response = await axios.post(
        `${BASE_URL}api/v1/register_with_phone`,
        { phone, name, role: "doctor" }
      );
      console.log(`Your OTP is ${response.data.data.OTP}`); // Assuming you have an API endpoint to resend OTP
      // toast.success("OTP resent to your phone!");
      setSeconds(60);
    } 
    catch (error: any) {
      // console.error('Error occurred while resending OTP:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // toast.error(error.response.data.message);
        setResendError(error.response.data.message);
      
      } else {
        setResendError("Failed to resend OTP. Please try again.");
        // toast.error("Failed to resend OTP. Please try again.");
      }
    }
    finally {
      // Reset loading state regardless of success or failure
      setResendLoading(false);
    }
  };

  



  // Inside the JSX:

  return (
    <>
      <div className="container w-screen mx-auto h-screen flex justify-center items-center">
        <div className="w-full flex justify-center items-center">
          <div className="w-full md:max-w-md py-4 border-2">
            <div className="title flex flex-col items-center">
              <h4 className="text-xl font-bold">Sign Up</h4>
              <span className="py-4 text-ms w-2/3 text-center text-gray-500">
                Hi Doctor, Welcome to BabyCare
              </span>
            </div>

            {!showOtpBox ? (
              <form className="py-1" onSubmit={formikSendOtp.handleSubmit}>
                <div className="textbox flex flex-col items-center gap-8 w-full">
                <span className="w-full flex-col justify-center">
                  <input
                    {...formikSendOtp.getFieldProps("username")}
                    type="text"
                    placeholder="Name"
                    className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border mx-auto ${
                      formikSendOtp.errors.username
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  />
                    {formikSendOtp.errors.username && (
                  <span className="text-red-500 block text-center mt-1 mx-4 text-[10px]">
                    {formikSendOtp.errors.username}
                  </span>
                )}
                </span>
                <span className="w-full flex-col justify-center">
                  <input
                    {...formikSendOtp.getFieldProps("phoneNumber")}
                    type="text"
                    placeholder="Phone no."
                    className={`appearance-none block sm:w-2/4 bg-gray-200 text-gray-700 border mx-auto ${
                      formikSendOtp.errors.phoneNumber
                        ? "border-red-500"
                        : "border-gray-200"
                    } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                  />
                   {formikSendOtp.errors.phoneNumber && (
                  <span className="text-red-500 block text-center mt-1 mx-4 text-[10px]">
                    {formikSendOtp.errors.phoneNumber}
                  </span>
                )}
                </span>
                  <button
                  type="submit"
                  className={`${
                    formikSendOtp.isValidating || formikSendOtp.isSubmitting || !formikSendOtp.isValid
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-secondary-dark"
                  }`}
                  disabled={formikSendOtp.isSubmitting || !formikSendOtp.isValid}
                >
                    
                    {formikSendOtp.isSubmitting? "Sending OTP...": "Generate OTP"}
                  </button>
                </div>

                <div className="text-center py-4 text-xs">
                  <span className="text-gray-500 block">
                    Already Registered?{" "}
                    <Link
                      to="/doctor/login"
                      replace={true}
                      className="text-blue-700 hover:underline cursor-pointer"
                    >
                      Login now
                    </Link>
                  </span>
                </div>
              </form>
            ) : (
              <form
                className="py-1"
                ref={formRef}
                onSubmit={formikVerifyOtp.handleSubmit}
              >
                <div className="textbox flex flex-col items-center gap-8 w-full">
                <span className="w-full flex-col justify-center">
                  <div className="flex flex-row justify-center items-center gap-3 w-[50%] mx-auto">
                    {[0, 1, 2, 3].map((index) => (
                      <input
                        key={index}
                        {...formikVerifyOtp.getFieldProps(`otp${index}`)}
                        maxLength={1}
                        type="text"
                        placeholder="0"
                        className={`appearance-none block w-1/4 bg-gray-200 text-gray-700 border ${
                          formikVerifyOtp.errors[
                            `otp${1}` as keyof typeof formikVerifyOtp.errors
                          ]
                            ? "border-red-500"
                            : "border-gray-200"
                        } rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}
                      />
                    ))}
                  </div>
                  {formikVerifyOtp.errors[
                            `otp${1}` as keyof typeof formikVerifyOtp.errors
                          ] && (
                  <span className="text-red-500 block text-center mt-1 mx-4 text-[10px]">
                    {formikVerifyOtp.errors[
                            `otp${1}` as keyof typeof formikVerifyOtp.errors
                          ]}
                  </span>
                )}
                 </span>

                  <button
                  type="submit"
                  className={`${
                    formikVerifyOtp.isValidating || formikVerifyOtp.isSubmitting || !formikVerifyOtp.isValid
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-secondary-dark"
                  }`}
                  disabled={formikVerifyOtp.isSubmitting || !formikVerifyOtp.isValid}
                 >
                    {/* Submit */}
                    {formikVerifyOtp.isSubmitting ? "Verifying.....": "Submit"}
                  </button>
                </div>

                <div className="text-center py-4 text-xs">
                  {seconds !== 0 && (
                    <span className="text-blue-700 cursor-pointer mb-2">{`${seconds} seconds left`}</span>
                  )}
                  {seconds === 0 && (
                    <button
                    disabled={resendLoading}
                      className={` ${resendLoading ? "cursor-not-allowed": "hover:underline cursor-pointer"} text-blue-700  mb-2`}
                    onClick={handleResendOTP}
                      
                    >
                       {/* Resend OTP */}
                       {resendLoading ? "Resending OTP..." : "Resend OTP"}
                    </button>
                    
                  )}
                  {/* Display error message if there's any */}
                  {resendError && <span className="text-red-500">{resendError}</span>}
                  <span className="text-gray-500 block">
                    Already Registered?{" "}
                    <Link
                      to="/doctor/login"
                      replace={true}
                      className="text-blue-700 hover:underline cursor-pointer"
                    >
                      Login now
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