import { useSelector } from 'react-redux';
// import * as EncryptedKey from '../constants/encryptedRootReducerKeys';

export const useAuthSelector = () => {

    const authLoginResponse = useSelector((state) => state.authLogin);
    const authRegisterResponse = useSelector((state) => state.authRegister);
    const authContactResponse = useSelector((state) => state.authContact);
    const getUserDataResponse = useSelector((state) => state.getUserData);
    const getServicesDataResponse = useSelector((state) => state.getServicesData);
    const getAllUsersResponse = useSelector((state) => state.getAllUsers);
    const getAllContactsResponse = useSelector((state) => state.getAllContacts);
    const deleteUsersResponse = useSelector((state) => state.deleteUsers);
    const updateUserResponse = useSelector((state) => state.updateUser);
    const deleteContactResponse = useSelector((state) => state.deleteContact);
    // console.log('getServicesDataResponse se', authContactResponse)
    // const authEmail = authLoginResponse?.data?.data?.email;
    // const verifyDriverPasscodeResponse = useSelector((state) => state.verifyDriverPasscode);
    // console.log('register',authRegisterResponse)

    return {
        authLoginResponse,
        authRegisterResponse,
        getUserDataResponse,
        getServicesDataResponse,
        authContactResponse,
        getAllUsersResponse,
        getAllContactsResponse,
        deleteUsersResponse,
        updateUserResponse,
        deleteContactResponse
    }
}