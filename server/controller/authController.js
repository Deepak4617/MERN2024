const User = require('../models/userModel')
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
    try {
        res
            .status(200)
            .send('Hey guys lets start for mern stack language')

    } catch (error) {

    }
}

const about = async (req, res) => {
    try {
        res.status(200).send('Start mern stack project')
    }
    catch (error) {
        res.status(400).send('This is page is not found!')

    }
}

const register = async (req,res,next) => {
    try {
        console.log("msg",req.body)
        const { username , email, phone, password } = req.body;

        const userExist = await User.findOne({email});

        if (userExist) {
            return res.status(400).json({msg:"email is already exist"})
        }

        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        });
        console.log("usercreatd", userCreated)

        // await User.create({username, email, phone,  password})

        res.status(201).json({
            msg:'registration successful' , 
            token: await userCreated.generateToken(), 
            userId: userCreated._id.toString(), 
        });

    } catch (error) {
        res.status(500).json("Internal server error")
        next(error)
        
    }
}

const login = async (req,res,next) => {
    try {
        const {email,password} = req.body;

        const userExist = await User.findOne({email})

        if (!userExist) {
           return res.status(400).json("Invalid Credential")
        }

        const user = await userExist.comparePassword(password);
        

        if (user) {
            res.status(200).json({
                msg:'Login Successfully' , 
                token: await userExist.generateToken(), 
                userId: userExist._id.toString(), 
            })
        } else{
            res.status(401).json({msg:"Invalid email or password"});
        }
        
    } catch (error) {
        // res.status(500).json('Internal server error');
        next(error)
        
    }

}

const user = async (req,res) => {
 try {
    const userData = req.user;
    console.log(userData)
    return res.status(200).json({msg: userData});
 } catch (error) {
    console.log(`error from the user route ${error}`)
    
 }
}


module.exports = { home, about, register,login,user };
