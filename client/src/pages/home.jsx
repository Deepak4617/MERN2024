import React from 'react';
import Image from '../assets/image/login.png'
import Profile from '../assets/image/profile.png';
import ContactAndDownloadButton from '../common/downloadButton';

const Home = () => {

  return (
        <>
        <div className="flex items-center justify-center bg-gradient-to-r from-blue-900 via-purple-700 min-h-screen" >
        <main className="flex flex-col items-center space-y-8 md:flex-row md:space-y-0 md:space-x-8 p-6">
          {/* Profile Image with Shadow */}
          <img src={Profile} alt="Deepak Kumar" className="w-64 h-64 rounded-full shadow-xl mx-auto transform transition duration-300 hover:scale-105 hover:shadow-2xl" />
  
          {/* Text Section */}
          <div className="text-center md:text-left">
            <div className="marquee-container2">
              <div className="marquee-text">
                <h2 className="text-lg text-gray-300 transition duration-500 ease-in-out hover:text-gray-200">
                  Hello, I'm
                </h2>
                <h1 className="mt-2 text-5xl font-extrabold text-white transition duration-500 ease-in-out hover:text-gray-100">
                  Deepak Kumar
                </h1>
                <h3 className="mt-2 text-2xl text-gray-400 hover:text-gray-300 transition ease-in-out">
                  Mern Stack Developer
                </h3>
              </div>
            </div>
  
            {/* Buttons */}
           <ContactAndDownloadButton/>
  
            {/* Social Links (Optional) */}
            <div className="flex space-x-4 mt-8 justify-center md:justify-start">
              {/* Placeholder for GitHub, LinkedIn Icons */}
              {/* Add your own icons and links here */}
              {/* <GithubAndLinklind /> */}
            </div>
          </div>
        </main>
  
      </div>
      </>
    );
};

export default Home;
