import React from 'react';
import { useFormik } from 'formik';

const DoctorProfilePage = () => {
  const formik = useFormik({
    initialValues: {
      name: 'Dr. John Doe',
      specialty: 'Cardiology',
      experience: '10+ years',
      location: 'New York, NY',
      availability: 'Monday - Friday',
      email: 'doctor@example.com',
      phone: '123-456-7890',
      bio: 'I am a passionate cardiologist dedicated to providing the best care for my patients.'
    },
    onSubmit: values => {
      // Handle form submission, e.g., send data to backend
      console.log(values);
    }
  });

  return (
    <div className="container mx-auto mt-10">
      <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:h-full md:w-48" src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg" alt="Doctor" />
          </div>
          <form className="p-8" onSubmit={formik.handleSubmit}>
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="border-b border-indigo-500 focus:outline-none"
              />
            </div>
            <p className="mt-2 text-gray-500">
              Specialty:
              <input
                type="text"
                name="specialty"
                value={formik.values.specialty}
                onChange={formik.handleChange}
                className="ml-2 border-b border-gray-400 focus:outline-none"
              />
            </p>
            <p className="mt-2 text-gray-500">
              Experience:
              <input
                type="text"
                name="experience"
                value={formik.values.experience}
                onChange={formik.handleChange}
                className="ml-2 border-b border-gray-400 focus:outline-none"
              />
            </p>
            <p className="mt-2 text-gray-500">
              Location:
              <input
                type="text"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                className="ml-2 border-b border-gray-400 focus:outline-none"
              />
            </p>
            <p className="mt-2 text-gray-500">
              Availability:
              <input
                type="text"
                name="availability"
                value={formik.values.availability}
                onChange={formik.handleChange}
                className="ml-2 border-b border-gray-400 focus:outline-none"
              />
            </p>
            <p className="mt-2 text-gray-500">
              Email:
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="ml-2 border-b border-gray-400 focus:outline-none"
              />
            </p>
            <p className="mt-2 text-gray-500">
              Phone:
              <input
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                className="ml-2 border-b border-gray-400 focus:outline-none"
              />
            </p>
            <p className="mt-2 text-gray-500">
              Bio:
              <textarea
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                className="ml-2 border border-gray-400 focus:outline-none"
              />
            </p>
            <div className="mt-4">
              <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfilePage;
