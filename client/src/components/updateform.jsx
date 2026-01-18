import { useState } from "react";
import { useCustomDispatch } from "../hooks";
import updateUser from "../services/api/admin/updateUser";

const UpdateForm = ({ user, onClose, onSuccess }) => {
    const dispatch = useCustomDispatch();

    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
        phone: user.phone,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdateUser = async () => {
        const res = await dispatch(
            updateUser({
                id: user._id,
                payload: formData,
            })
        );

        if (res?.payload) {
            onSuccess();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">Edit User</h2>

                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full mb-3 border p-2 rounded"
                    placeholder="Username"
                />

                <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-3 border p-2 rounded"
                    placeholder="Email"
                />

                <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full mb-4 border p-2 rounded"
                    placeholder="Phone"
                />

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleUpdateUser}
                        className="px-4 py-2 bg-purple-600 text-white rounded"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateForm;
