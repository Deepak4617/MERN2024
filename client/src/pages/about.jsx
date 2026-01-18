import { Card } from "flowbite-react";

import Profile from '../assets/image/profile.png';
import ContactAndDownloadButton from "../common/downloadButton";

const About = () => {

  const skills = ["React.js", "JavaScript", "HTML & CSS", "Tailwind CSS", "Bootstrap"];

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-700 min-h-screen overflow-y-auto">

        {/* Hero Section */}
        <div className="relative h-[250px] md:h-[400px] flex items-center justify-center">
          <div className="text-center text-white space-y-4 px-4">
            <h1 className="text-3xl md:text-5xl font-bold">About Me</h1>
            <p className="text-base md:text-xl">
              Frontend Developer and MERN Stack passionate about crafting interactive web applications
            </p>
          </div>
        </div>

        {/* About Details */}
        <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8 mt-8">

          <Card className="bg-purple-400 shadow-lg transform transition duration-300 md:hover:scale-105">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <img
                src={Profile}
                alt="Profile"
                className="w-36 h-36 md:w-48 md:h-48 rounded-full shadow-lg"
              />

              <div className="w-full text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                  Hello, I'm Deepak Kumar
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  I am a passionate Frontend Developer with expertise in React.js, JavaScript, and modern web technologies.
                </p>
                <ContactAndDownloadButton />
              </div>
            </div>
          </Card>

          {/* Skills */}
          <div className="bg-purple-400 p-4 md:p-6 rounded-lg shadow-md">
            <h3 className="text-xl md:text-2xl font-semibold mb-4">Skills</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skills.map((skill, index) => (
                <Card
                  key={index}
                  className="p-4 bg-purple-500 shadow-lg transform transition duration-300 md:hover:scale-105"
                >
                  <h4 className="text-sm md:text-lg font-medium">{skill}</h4>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </div>

    </>
  );
}

export default About;
