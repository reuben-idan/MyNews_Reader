import React from 'react';

const UserProfile = ({ imageUrl, name, email }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full overflow-hidden bg-gray-200">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={name || 'User profile'}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-500 text-xl">
              {name ? name.charAt(0).toUpperCase() : 'U'}
            </span>
          </div>
        )}
      </div>
      {name && <h2 className="mt-4 text-lg font-semibold">{name}</h2>}
      {email && <p className="text-gray-600 text-sm">{email}</p>}
    </div>
  );
};

export default UserProfile;
