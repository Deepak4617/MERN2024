import { useEffect, useState } from 'react';
import { useCustomDispatch } from '../hooks';
import { useAuthSelector } from '../services/selectors/authSelector';

import { DeleteMessage, UpdateMessage } from '../common/toastMessage';
import { UserLoader } from '../common/loader';

import { resetDeleteUsers } from '../services/slices/admin/deleteUsers';
import { resetUpdateUser } from '../services/slices/admin/updateUser';

import UpdateForm from '../components/updateform';
import getAllUsers from '../services/api/admin/getAllUsers';
import deleteUsers from '../services/api/admin/deleteUsers';

const AdminUser = () => {
    const dispatch = useCustomDispatch();
    const { getAllUsersResponse, deleteUsersResponse, updateUserResponse } = useAuthSelector();

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const data = getAllUsersResponse?.data;

    useEffect(() => {
        dispatch(getAllUsers());
    }, [dispatch]);

    const deleteUser = async (id) => {
        await dispatch(deleteUsers(id));
        dispatch(getAllUsers());
    };

    const openEditModal = (user) => {
        setSelectedUser(user);
        setIsEditOpen(true);
    };

    const closeEditModal = () => {
        setSelectedUser(null);
        setIsEditOpen(false);
    };

    useEffect(() => {
        if (deleteUsersResponse?.data?.message) {
            const timer = setTimeout(() => {
                dispatch(resetDeleteUsers());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [deleteUsersResponse, dispatch]);

    useEffect(() => {
        if (updateUserResponse?.data) {
            const timer = setTimeout(() => {
                dispatch(resetUpdateUser());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [updateUserResponse, dispatch]);


    return (
        <div className="sm:ml-64 h-screen">
            <div className="h-full p-4 bg-purple-700">
                <div className="h-full bg-purple-400 flex flex-col rounded-lg">

                    <div className="px-4 py-3 border-b font-semibold">
                        Users Table
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        {getAllUsersResponse?.loading ? (
                            <UserLoader />
                        ) : (
                            <table className="w-full text-sm text-left">
                                <thead className="sticky top-0 bg-purple-300">
                                    <tr>
                                        <th className="px-6 py-3">Name</th>
                                        <th className="px-6 py-3">Email</th>
                                        <th className="px-6 py-3">Phone</th>
                                        <th className="px-6 py-3">Edit</th>
                                        <th className="px-6 py-3">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.map(user => (
                                        <tr key={user._id} className="border-b">
                                            <td className="px-6 py-4">{user.username}</td>
                                            <td className="px-6 py-4">{user.email}</td>
                                            <td className="px-6 py-4">{user.phone}</td>

                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2.5 focus:outline-none"
                                                >
                                                    Edit
                                                </button>
                                            </td>

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

                        {!deleteUsersResponse?.loading &&
                            deleteUsersResponse?.data &&
                            !deleteUsersResponse?.error &&
                            (<DeleteMessage message={deleteUsersResponse?.data?.message}
                                onClose={() => { dispatch(resetDeleteUsers()) }} />)}

                        {isEditOpen && selectedUser && (
                            <UpdateForm
                                user={selectedUser}
                                onClose={closeEditModal}
                                onSuccess={() => {
                                    closeEditModal();
                                    dispatch(getAllUsers());
                                }}
                            />
                        )}
                        {updateUserResponse?.data &&
                            (<UpdateMessage message={updateUserResponse?.data?.message}
                                onClose={() => dispatch(resetUpdateUser())} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUser;
