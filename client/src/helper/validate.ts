import { toast } from 'react-toastify';

interface Errors {
  [key: string]: string;
}

export interface ValidationErrors {
  [key: string]: any;
}


export async function loginValidation(values: any): Promise<Errors> {
  const errors: Errors = {};
  phoneNumberVerify(errors, values);
  return errors;
}

export async function adminLoginValidation(values: any): Promise<Errors> {
  const errors: Errors = {};
  passwordVerify(errors, values);
  emailVerify(errors, values);
  return errors;
}

export async function signUpValidation(values: any): Promise<Errors> {
  const errors: Errors = {};
  usernameVerify(errors, values);
  phoneNumberVerify(errors, values);
  return errors;
}

export async function otpValidation(values: any): Promise<Errors> {
  const errors: Errors = {};
  otpVerify(errors, values);
  return errors;
}

function passwordVerify(errors: any, values: any): Errors {
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!values.password) {
    errors.password = toast.error("Password Required...!");
  } else if (values.password.length < 4) {
    errors.password = toast.error("Password must be more than 4 characters long");
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have special character");
  }

  return errors;
}

function usernameVerify(errors: any, values: any): Errors {
  if (!values.username) {
    errors.username = toast.error('Username Required...!');
  } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(values.username)) {
    errors.username = toast.error('Username cannot contain special characters or numbers...!');
  }
  return errors;
}

function emailVerify(errors: any, values: any): Errors {
  if (!values.email) {
    errors.email = toast.error("Email Required...!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = toast.error("Invalid email address...!");
  }
  return errors;
}

export function phoneNumberVerify(errors: any, values: any): Errors {
  if (!values.phoneNumber) {
    errors.phoneNumber = toast.error("Phone Number Required...!");
  } else if (!(/^\+?\d{10,12}$/.test(values.phoneNumber))) {
    errors.phoneNumber = toast.error("Invalid phone number. Please enter a valid phone number...!");
  }
  return errors;
}

function otpVerify(errors: ValidationErrors, values: any) {
  const otpFields = ['otp0', 'otp1', 'otp2', 'otp3'];
  const emptyField = otpFields.find(field => !values[field]);
  if (emptyField) {
    errors[emptyField] = toast.error('All OTP fields are required');
  
  }
  return errors;
}
