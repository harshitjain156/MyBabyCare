import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';
import { formatMonth } from 'react-calendar/dist/cjs/shared/dateFormatter';

interface Child {
    name: string;
    birthdate: string;
    gender: string;
    vaccinationsDone: number;
    vaccinationsTotal: number;
  }
  
interface ModalProps {
    onClose: () => void;
    onSubmit: (child: Child) => void;
  }

const ChildDetailsFormModal: React.FC<ModalProps> = ({ onClose , onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      birthdate: '',
      gender: '',
    },
    validate: values => {
        const errors: Record<string, string> = {};
        if (!values.name) {
          errors.name = "Child's name is required";
        }
        else if(values.name.trim().length === 0){
          errors.name = "Child's name is required";
        }
        if (!values.birthdate) {
          errors.birthdate = "Child's birthdate is Required";
        }
        if (!values.gender) {
          errors.gender = "Child's gender is Required";
        }
        return errors;
      },
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: values => {
        const newChild: Child = {
           // You can generate a unique id using Date.now() or any other method
            name: values.name,
            gender: values.gender,
            birthdate: values.birthdate,
            vaccinationsDone: parseInt(`0`),
            vaccinationsTotal: parseInt(`10`),
          };
          onSubmit(newChild);
      // Logic to handle form submission
      console.log('Form Values:', values);
      onClose();
    },
  
  });

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg">
        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-900">Child Details</h3>
          <button className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-full w-8 h-8 flex justify-center items-center" onClick={onClose}>
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 12.586l-4.293 4.293-1.414-1.414L8.586 11 4.293 6.707l1.414-1.414L10 9.586l4.293-4.293 1.414 1.414L11.414 11l4.293 4.293-1.414 1.414L10 12.586z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name:</label>
            <input
              type="text"
              id="name"
             
              {...formik.getFieldProps( 'name')}
              value={formik.values.name}
              onChange={formik.handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
              placeholder="Child's Name"
            />
            {formik.touched.name && formik.errors.name && <div className="text-red-500 block text-center mt-1 mx-4 text-[14px]">{formik.errors.name}</div>}
          </div>
          <div>
            <label htmlFor="birthdate" className="block mb-2 text-sm font-medium text-gray-900">Birthdate:</label>
            <input
              type="date"
              id="birthdate"
             
              {...formik.getFieldProps( 'birthdate')}
              max={new Date().toISOString().split('T')[0]}
              value={formik.values.birthdate}
              onChange={formik.handleChange}
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
            />
            {formik.touched.birthdate && formik.errors.birthdate && <div className="text-red-500 block text-center mt-1 mx-4 text-[14px]">{formik.errors.birthdate}</div>}
          </div>
          <div>
            <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">Gender:</label>
            <ul className="grid w-full gap-6 md:grid-cols-2">
              <li>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={formik.values.gender === 'Male'}
                  onChange={formik.handleChange}
                  className="hidden peer"
                />
                <label htmlFor="male" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-secondary peer-checked:text-secondary peer-checked:bg-secondary peer-checked:bg-opacity-10 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 ">
                  <span className='mx-auto'>Male</span>
                </label>
              </li>
              <li>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={formik.values.gender === 'Female'}
                  onChange={formik.handleChange}
                  className="hidden peer"
                />
                <label htmlFor="female" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-secondary peer-checked:text-secondary peer-checked:bg-secondary peer-checked:bg-opacity-10 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 ">
                  <span className='mx-auto'>Female</span>
                </label>
              </li>
            </ul>
            {formik.touched.gender && formik.errors.gender && <div className="text-red-500 block text-center mt-1 mx-4 text-[14px]">{formik.errors.gender}</div>}
          </div>
          
          <div className='flex items-center justify-center'>
          <button
                  type="submit"
                  className={`${
                    formik.isValidating || formik.isSubmitting || !formik.isValid
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-secondary-dark"
                  }`}
                  disabled={formik.isSubmitting || !formik.isValid}
                 >
                    {/* Submit */}
                    {formik.isSubmitting ? "Verifying.....": "Submit"}
                  </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')!
  );
};

export default ChildDetailsFormModal;
