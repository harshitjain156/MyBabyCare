import React from 'react';
import { StarIcon } from '@heroicons/react/solid'; // Import StarIcon from Heroicons
import doctorProfilePicture from "../assets/doctor-profile-picture.png";

interface ProfilePictureProps {
  alt: string;
  name: string;
  rating: any;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ alt, name, rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <StarIcon key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
      );
    }
    return stars;
  };

  return (
    <div className="flex-col items-center justify-center bg-white  transition duration-300 ease-in-out transform hover:scale-105">
      <div className="p-4 flex-col items-center">
        <img src={doctorProfilePicture} alt={alt} className="h-16 w-16 z-0 border-2 border-spacing-4  rounded-full p-3 object-cover mx-auto" />
        <div className='flex-col items-center justify-center'>
          <p className="font-semibold">{name}</p>
          <div className="flex items-center justify-center">
            {renderStars()}
          </div>
         
        </div>
        
      </div>
      <button
          className="block mx-auto select-none items-center gap-3 rounded-lg bg-secondary py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          Book Now
        </button>
    </div>
  );
};

export default ProfilePicture;
