import React from 'react';
import ReactDOM from 'react-dom';
import { useFormik } from 'formik';

interface Vaccination {
    name: string;
    desc: string;
    date: string;
}

interface ModalProps {
    onClose: () => void;
    onSubmit: (vaccination: Vaccination) => void;
}

const AddVaccinationModal: React.FC<ModalProps> = ({ onClose, onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            scheduledDate: '',
        },
        validate: values => {
            const errors: Record<string, string> = {};
            if (!values.name.trim()) {
                errors.name = "Vaccination name is required";
            }
            else  if(values.name.length > 50){
                errors.name = "Name must be less than 50 characters";
            }
            if (!values.description.trim()) {
                errors.description = "Description is required";
            }
            if (!values.scheduledDate) {
                errors.scheduledDate = "Scheduled date is required";
            }
            return errors;
        },
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: values => {
            const newVaccination: Vaccination = {
                name: values.name,
                desc: values.description,
                date: values.scheduledDate,
            };
            
            onSubmit(newVaccination);
          
        },
    });

    return ReactDOM.createPortal(
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-md p-6 rounded-lg">
                <div className="flex justify-between items-center border-b pb-4">
                    <h3 className="text-xl font-semibold text-gray-900">Add Vaccination</h3>
                    <button className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-full w-8 h-8 flex justify-center items-center" onClick={onClose}>
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 12.586l-4.293 4.293-1.414-1.414L8.586 11 4.293 6.707l1.414-1.414L10 9.586l4.293-4.293 1.414 1.414L11.414 11l4.293 4.293-1.414 1.414L10 12.586z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Vaccination Name:</label>
                        <input
                            type="text"
                            id="name"
                            {...formik.getFieldProps('name')}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                            placeholder="Vaccination Name"
                        />
                        {formik.touched.name && formik.errors.name && <div className="text-red-500 block text-center mt-1 mx-4 text-[14px]">{formik.errors.name}</div>}
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description:</label>
                        <textarea
                            id="description"
                            {...formik.getFieldProps('description')}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                            placeholder="Description"
                            rows={4}
                        />
                        {formik.touched.description && formik.errors.description && <div className="text-red-500 block text-center mt-1 mx-4 text-[14px]">{formik.errors.description}</div>}
                    </div>
                    <div>
                        <label htmlFor="scheduledDate" className="block mb-2 text-sm font-medium text-gray-900">Scheduled Date:</label>
                        <input
                            type="date"
                            id="scheduledDate"
                            {...formik.getFieldProps('scheduledDate')}
                            min={new Date().toISOString().split('T')[0]}
                            value={formik.values.scheduledDate}
                            onChange={formik.handleChange}
                            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5"
                        />
                        {formik.touched.scheduledDate && formik.errors.scheduledDate && <div className="text-red-500 block text-center mt-1 mx-4 text-[14px]">{formik.errors.scheduledDate}</div>}
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
                            {formik.isSubmitting ? "Adding....." : "Add"}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById('modal-root')!
    );
};

export default AddVaccinationModal;
