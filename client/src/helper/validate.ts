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

export async function appointmentBookingValidation(values: any): Promise<Errors> {
  const errors: Errors = {};
 // Validate childName
if (!values.childName.trim()) {
  errors.childName = 'Child\'s name is required';

} else if (!/^[a-zA-Z ]{1,20}$/.test(values.childName)) {
  errors.childName = 'Child\'s name must be alphabets and spaces only, up to 20 characters';

}
// Validate age
if (!values.age) {
  errors.age = 'Age is required';
  
} else if (isNaN(values.age) || parseInt(values.age) < 0) {
  errors.age ='Invalid age';
  
}
else if(parseInt(values.age)>20){
  errors.age = 'Age should not exceed 20 years old';
}
// Validate reason
if (!values.reason) {
  errors.reason = 'Reason for appointment is required';

}
else if(values.reason.length > 50){
  errors.reason= "The length of the reason should not exceed 50 characters";
}


if(values.additionalDetails.length > 50){
  errors.additionalDetails = "The length of the additional Details should not exceed 50 characters";
}
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
    errors.password = "Password Required...!";
  } else if (values.password.length < 4) {
    errors.password = "Password must be more than 4 characters long";
  } else if (!specialChars.test(values.password)) {
    errors.password = "Password must have special character";
  }

  return errors;
}

function usernameVerify(errors: any, values: any): Errors {
  if (!values.username) {
    errors.username = 'Name Required...!';
  } else if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/.test(values.username)) {
    errors.username = 'Name cannot contain special characters or numbers...!';
  }
  return errors;
}

function emailVerify(errors: any, values: any): Errors {
  if (!values.email) {
    errors.email = "Email Required...!";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address...!";
  }
  return errors;
}

export function phoneNumberVerify(errors: any, values: any): Errors {
  if (!values.phoneNumber) {
    errors.phoneNumber = "Phone Number Required...!";
  } else if (!(/^\+?\d{10,12}$/.test(values.phoneNumber))) {
    errors.phoneNumber = "Invalid phone number. Please enter a valid phone number...!";
  }
  return errors;
}

function otpVerify(errors: ValidationErrors, values: any) {
  const otpFields = ['otp0', 'otp1', 'otp2', 'otp3'];
  const emptyField = otpFields.find(field => !values[field]);
  if (emptyField) {
    errors[`otp1`] = 'All OTP fields are required';
  
  }
  return errors;
}
