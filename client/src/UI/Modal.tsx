import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [vaccinationDate, setVaccinationDate] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setVaccinationDate(e.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to handle form submission
    console.log('Vaccination Date:', vaccinationDate);
    onClose();
  };

  
  const [minDate, setMinDate] = useState<string>('');

  // Function to set the minimum date to today
  const setMinDateToToday = () => {
    const today = new Date();
    const minDateString = today.toISOString().split('T')[0];
    setMinDate(minDateString);
  };

  // Call the function when the component mounts
  useEffect(() => {
    setMinDateToToday();
  }, []);

  

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white w-full max-w-md p-6 rounded-lg">
      <div className="flex justify-between items-center border-b pb-4">
        <h3 className="text-xl font-semibold text-gray-900">Vaccination Date</h3>
        <button className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-full w-8 h-8 flex justify-center items-center" onClick={onClose}>
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 12.586l-4.293 4.293-1.414-1.414L8.586 11 4.293 6.707l1.414-1.414L10 9.586l4.293-4.293 1.414 1.414L11.414 11l4.293 4.293-1.414 1.414L10 12.586z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label htmlFor="vaccinationDate" className="block mb-2 text-sm font-medium text-gray-900">Vaccination Date</label>
          <input type="date" id="vaccinationDate" min={minDate} value={vaccinationDate} onChange={handleDateChange} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-secondary focus:border-secondary block w-full p-2.5" />
        </div>
        <button type="submit" className="block w-full hover:bg-seconadry-dark mx-auto text-white text-sm font-medium rounded-lg p-2.5">Submit</button>
      </form>
    </div>
  </div>,
    document.getElementById('modal-root')!
  );
};

export default Modal;