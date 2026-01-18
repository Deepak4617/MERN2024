import { useEffect, useState } from 'react';
import { useCustomDispatch, useCustomNavigate } from '../hooks';

import { useAuthSelector } from '../services/selectors/authSelector';
import { Loader } from '../common/loader';
import { resetAuthState } from '../services/slices/auth/authLogin';

import authLogin from '../services/api/auth/authLogin';
import Image from '../assets/image/login1.png';

import * as routeNames from '../routes/routeNames';

const Login = () => {

    const initialFormData = { email: '', password: '' };
    const [userDetail, setUserDetail] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState(null);
    const [succesMessage, setSuccesMessage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useCustomNavigate();
    const dispatch = useCustomDispatch();

    const { authLoginResponse } = useAuthSelector();

    const handalUserData = (e) => {
        const { name, value } = e.target;

        setUserDetail({
            ...userDetail,
            [name]: value
        })
        setErrorMessage(null)
    }

    useEffect(() => {
        dispatch(resetAuthState());
    }, [dispatch]);

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validateLogin = () => {
        if (!userDetail.email && !userDetail.password)
            return "Please Enter Email and Password";

        if (!userDetail.email)
            return "Please Enter Your Email";

        if (!isValidEmail(userDetail.email))
            return "Enter a valid email address";

        if (!userDetail.password)
            return "Please Enter Your Password";

        if (userDetail.password.length < 6)
            return "Password must be at least 6 characters";

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = validateLogin();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            setErrorMessage(null);
            setSuccesMessage(null);

            const res = await dispatch(authLogin(userDetail)).unwrap();

            if (res?.token) {
                setSuccesMessage(res.msg);
                navigate(routeNames.HOME_ROUTE);
            }

        } catch (error) {
            setErrorMessage(
                error?.extraDetails &&
                error?.message

            );
        }
    };


    return (
        <>
            <div className="flex flex-col lg:flex-row bg-gradient-to-r from-blue-900 via-purple-700 min-h-screen">
                {/* Side Image */}
                <div className="hidden lg:flex items-center justify-center w-full" style={{ width: '34%' }}>
                    <img
                        src={Image}
                        alt="Registration Illustration"
                        className="object-cover w-full h-full"
                        style={{ width: '400px', height: '411px', marginBottom: '2rem' }}
                    />
                </div>

                {/* login Form */}
                <div className="flex items-center justify-center w-full lg:w-1/2 p-8" style={{ height: '560px' }}>
                    <div className="w-full max-w-md">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className='relative'>
                                    <input
                                        type="email"
                                        name="email"
                                        value={userDetail.email}
                                        onChange={handalUserData}
                                        placeholder="Email"
                                        className="block pl-10 pt-4 w-full text-sm text-white bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={userDetail.password}
                                        onChange={handalUserData}
                                        placeholder="Password"
                                        className="block w-full pl-10 pr-16 pt-4 text-sm text-white bg-transparent rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600"
                                    />

                                    {/* Show / Hide button */}
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 text-sm select-none"
                                    >
                                        {showPassword ? "Hide" : "Show"}
                                    </span>
                                </div>

                            </div>

                            {errorMessage && (
                                <p className="text-red-500 mt-2">{errorMessage}</p>
                            )}

                            {authLoginResponse?.error && (
                                <p className="text-red-500 mt-2">
                                    {typeof authLoginResponse.error === "string"
                                        ? authLoginResponse.error
                                        : authLoginResponse.error.extraDetails ||
                                        authLoginResponse.error.msg}
                                </p>
                            )}

                            {authLoginResponse?.data?.msg && (
                                <p className="text-green-500 mt-2">
                                    {authLoginResponse.data.msg}
                                </p>
                            )}


                            <button
                                type="submit"
                                disabled={authLoginResponse?.loading}
                                className="w-full mt-8 py-3 bg-purple-500 text-white font-semibold rounded-lg disabled:opacity-50"
                            >
                                {authLoginResponse?.loading ?
                                    <p className='flex items-center justify-center'><Loader /></p>
                                    : "Login"}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login