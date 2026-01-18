import { useState, useEffect } from 'react';
import { Loader } from '../common/loader';

import { useCustomDispatch, useCustomNavigate } from '../hooks';
import { useAuthSelector } from '../services/selectors/authSelector';
import { resetAuthState } from '../services/slices/auth/register';

import authRegister from '../services/api/auth/register';
import Image from '../assets/image/register1.png';

import * as routeNames from '../routes/routeNames';

const Register = () => {
    
    const initialFormData = { username: '', email: '', phone: '', password: '' };
    const [userDetail, setUserDetail] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useCustomNavigate();
    const dispatch = useCustomDispatch();

    const {authRegisterResponse} = useAuthSelector();

    // useEffect(()=>{
    //     console.log('register', authRegisterResponse, errorMessage)
    // },[authRegisterResponse,])

     useEffect(() => {
        dispatch(resetAuthState());
    }, [dispatch]);

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
        try {
            if (!userDetail?.username) {
                setErrorMessage('Please Enter Your Username');
            } else if (!userDetail?.email || !/\S+@\S+\.\S+/.test(userDetail?.email)) {
                setErrorMessage('Please Enter a Valid Email');
            } else if (!userDetail?.phone || userDetail?.phone.length < 10) {
                setErrorMessage('Please Enter a Valid Phone Number');
            } else if (!userDetail?.password || userDetail?.password.length < 6) {
                setErrorMessage('Password must be at least 6 characters');
            } else {
                setErrorMessage(null);
                await dispatch(authRegister(userDetail)).unwrap(),
                navigate(routeNames?.Login_ROUTE)
            }
        } catch (error) {
            console.error('Register failed', error);
        }
    };

    return (
        <>
        <div className="flex flex-col lg:flex-row bg-gradient-to-r from-blue-900 via-purple-700" style={{height:'685px'}}>
            {/* Side Image */}
            <div className="hidden lg:flex items-center justify-center w-full" style={{width:'34%'}}>
                <img
                    src={Image} 
                    alt="Registration Illustration"
                    className="object-cover w-full h-full"
                    style={{width:'400px', height:'411px', marginBottom:'2rem'}}
                /> 
            </div>

            {/* Registration Form */}
            <div className="flex items-center justify-center w-full lg:w-1/2 p-8" style={{height:'560px'}}>
                <div className="w-full max-w-md">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="username"
                                value={userDetail.username}
                                onChange={handalUserData}
                                placeholder="User Name"
                                className="block pl-10 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                // required
                            />
                            <input
                                type="email"
                                name="email"
                                value={userDetail.email}
                                onChange={handalUserData}
                                placeholder="Email"
                                className="block pl-10 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                // required
                            />
                            <input
                                type="tel"
                                name="phone"
                                value={userDetail.phone}
                                onChange={handalUserData}
                                placeholder="Phone"
                                className="block pl-10 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                // required
                            />
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={userDetail.password}
                                    onChange={handalUserData}
                                    placeholder="Password"
                                    className="block pl-10 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    // required
                                />
                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-white cursor-pointer"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </span>
                            </div>
                        </div>
                        
                        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}

                         {authRegisterResponse?.error && (
                                <p className="text-red-500 mt-2">
                                    {typeof authRegisterResponse.error === "string"
                                        ? authRegisterResponse.error
                                        : authRegisterResponse.error.extraDetails ||
                                        authRegisterResponse.error.msg}
                                </p>
                            )}
                        <button
                            type="submit"
                            className="w-full mt-4 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600"
                        >
                                {authRegisterResponse?.loading ? <p className='flex items-center justify-center'><Loader/></p> : ('Register') }
                            
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
};

export default Register;
