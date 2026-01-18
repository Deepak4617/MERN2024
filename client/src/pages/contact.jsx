import { useState, useEffect } from 'react';
import { useAuthSelector } from '../services/selectors/authSelector';
import { useCustomDispatch } from '../hooks';

import Image from '../assets/image/contact.png';
import getUserData from '../services/api/auth/getUserData';
import authContact from '../services/api/auth/contact';
import { resetAuthState } from '../services/slices/auth/contact';

const Contact = () => {

  const initialFormData = { userName: '', email: '', message: '' };
  const [userDetail, setUserDetail] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useCustomDispatch();
  const { getUserDataResponse, authContactResponse } = useAuthSelector();
  const data = getUserDataResponse?.data?.msg;

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  useEffect(() => {
    dispatch(resetAuthState())
  }, [dispatch])

  useEffect(() => {
    console.log('con form', authContactResponse)
  }, [authContactResponse])

  useEffect(() => {
    if (getUserDataResponse) {
      setUserDetail({
        userName: data?.username || '',
        email: data?.email || '',
        message: ''
      });
    }
  }, [getUserDataResponse]);

  const handalUserData = (e) => {
    const { name, value } = e.target;

    setUserDetail({
      ...userDetail,
      [name]: value
    });
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!userDetail?.email || !userDetail?.userName || !userDetail?.message) {
        setErrorMessage('Please fill all fields');
        setLoading(false);
        return;
      }

      const res = await dispatch(authContact(userDetail)).unwrap();
      if (res) {
        setOpenModal(true);
      } else {
        console.log("Form submission failed:", res);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <div className="flex flex-col lg:flex-row bg-gradient-to-r from-blue-900 via-purple-700 min-h-screen px-4">

        {/* Left Image Section */}
        <div className="hidden lg:flex items-center justify-center w-[34%]">
          <div className="flex flex-col items-center justify-center pb-24">
            <h2 className="text-3xl font-bold text-white text-center">
              Contact Us
            </h2>
            <img
              src={Image}
              alt="Illustration"
              className="mt-4 w-[400px] h-[416px] object-cover"
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="flex w-full lg:w-1/2 items-start lg:items-center justify-center py-10">
          <div className="w-full max-w-md">

            <form onSubmit={handleSubmit} className="space-y-6">

              <input
                type="text"
                name="userName"
                value={userDetail.userName}
                onChange={handalUserData}
                placeholder="User Name"
                className="w-full px-4 py-3 text-white bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />

              <input
                type="email"
                name="email"
                value={userDetail.email}
                onChange={handalUserData}
                placeholder="Email"
                className="w-full px-4 py-3 text-white bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />

              <textarea
                name="message"
                value={userDetail.message}
                onChange={handalUserData}
                placeholder="Message"
                rows="4"
                className="w-full px-4 py-3 text-white bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />

              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>
        </div>
      </div>


      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold">Success!</h2>
            <p>Your message has been sent successfully.</p>
            <button
              onClick={() => setOpenModal(false)}
              className="mt-4 py-2 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
