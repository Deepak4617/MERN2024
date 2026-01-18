const Contact = require('../models/contactModel');
const User = require('../models/userModel');

const getAllUsers = async (req, res) => {

    try {
        const users = await User.find({}, { password: 0 });
        console.log(users)
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No Users Found' })
        }
        res.status(200).json(users);

    } catch (error) {
        next(error);
    }

}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 })
        console.log(id)
        if (!id) {
            return res.status(404).json({ message: 'User data is not found' })
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)

    }
}

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        if (!id) {
            return res.status(404).json({ message: 'User id not found' });
        }

        const updatedData = await User.findByIdAndUpdate(
            id,
            { $set: updatedUserData },
            { new: true }
        ).select("-password");

        if (!updatedData) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: "User updated successfully",
            data: updatedData
        });

    } catch (error) {
        next(error);
    }
};


const getAllContacts = async (req, res) => {

    try {
        const contacts = await Contact.find();
        console.log(contacts)
        if (!contacts || contacts.length === 0) {
            return res.status(404).json({ message: 'No contacts Found' })
        }
        res.status(200).json(contacts);
    } catch (error) {

    }

}

const deleteUserById = async (req, res, next) => {

    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id })
        console.log(id)
        if (!id) {
            return res.status(404).json({ message: 'User id is not correct' })
        }
        res.status(200).json({ message: 'User Deleted Successfully' })
    } catch (error) {
        next(error)

    }

}

const deleteContactById = async (req, res, next) => {

    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id })
        console.log(id)
        if (!id) {
            return res.status(404).json({ message: 'Contact id is not correct' });
        }
        res.status(200).json({ message: 'Contact Deleted Successfully' })
    } catch (error) {
        next(error)
    }

}

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById };