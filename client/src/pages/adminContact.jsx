import { useEffect } from "react";
import { useCustomDispatch } from "../hooks";
import { useAuthSelector } from "../services/selectors/authSelector";

import { resetDeleteContacts } from "../services/slices/admin/deleteContacts";
import { DeleteMessage } from "../common/toastMessage";
import { UserLoader } from "../common/loader";

import getAllContacts from "../services/api/admin/getAllContacts";
import deleteContact from "../services/api/admin/deleteContacts";

const AdminContact = () => {

    const dispatch = useCustomDispatch();
    const { getAllContactsResponse, deleteContactResponse } = useAuthSelector();
    const userData = getAllContactsResponse?.data

    useEffect(() => {
        dispatch(getAllContacts())
    }, [dispatch])

    useEffect(() => {
        console.log(getAllContactsResponse)
    }, [getAllContactsResponse])

    const deleteUser = async (id) => {
        await dispatch(deleteContact(id));
        dispatch(getAllContacts())
    };

    useEffect(() => {
        if (deleteContactResponse?.data) {
            const timer = setTimeout(() => {
                dispatch(resetDeleteContacts());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [deleteContactResponse, dispatch]);

    return <>
        <div className="sm:ml-64 h-screen">
            <div className="h-full p-4 bg-purple-700">
                <div className="h-full rounded-base border border-default bg-purple-400 flex flex-col">
                    <div className="px-4 py-3 border-b border-default font-semibold">
                        Contacts Table
                    </div>

                    <div className="flex-1 overflow-y-auto pb-8">
                        {getAllContactsResponse?.loading ? (
                            <UserLoader />
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="sticky top-0 z-10 bg-purple-300">
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">E-Mail</th>
                                        <th className="px-6 py-3">Message</th>
                                        <th className="px-6 py-3">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData?.map(user => (
                                        <tr
                                            key={user._id}
                                            className="border-b last:border-b-0"
                                        >
                                            <td className="px-6 py-4 font-medium whitespace-nowrap">
                                                {user?.userName}
                                            </td>

                                            <td className="px-6 py-4">{user?.email}</td>
                                            <td className="px-6 py-4">{user?.message}</td>

                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => deleteUser(user._id)}
                                                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-4 py-2.5 focus:outline-none"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {!deleteContactResponse?.loading &&
                            deleteContactResponse?.data &&
                            !deleteContactResponse?.error &&
                            (<DeleteMessage message={deleteContactResponse?.data?.message}
                                onClose={() => { dispatch(resetDeleteUsers()) }} />)}
                    </div>

                </div>
            </div>
        </div>
    </>
}

export default AdminContact;