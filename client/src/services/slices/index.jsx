import { combineReducers } from "redux";
import * as auth from './auth';
import * as service from './service';
import * as admin from './admin';
// import * as EncryptedKey from '../constants/encryptedRootReducerKeys';

export const rootReducer = combineReducers({

    authLogin: auth?.authLoginSlice,
    authRegister: auth?.authRegisterSlice,
    authContact: auth?.authContactSlice,
    getUserData: auth?.getUserDataSlice,
    getServicesData: service?.getServicesDataSlice,
    getAllUsers: admin?.getAllUsersSlice,
    getAllContacts: admin?.getAllContactsSlice,
    deleteUsers: admin?.deleteUsersSlice,
    updateUser: admin?.updateUserSlice,
    deleteContact: admin?.deleteContactSlice

})