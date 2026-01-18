// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');


// const authMiddleware = async (req, res, next) => {
//     const token = req.header("Authorization");

//     if (!token) {
//         return res
//             .status(401)
//             .json({ msg: "Unauthorized HTTP, Token not provided" })
//     }

//     const jwtToken = token.replace("Bearer", "").trim();
//     console.log("Token form auth middleware", jwtToken);

//     try {
//         const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY)

//         const userData = await User.findOne({email:isVerified.email});
//         Selection({
//             password:0,
//         })
//         console.log(userData)

//         req.user = userData;
//         req.token = token;
//         req.userID =userData._id;

//         next()
//     } catch (error) {
//         return res.status(401).json({msg: "Unauthorized. Invalid token"})

//     }


// }

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    // 1. Token fetch karein
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({ msg: "Unauthorized HTTP, Token not provided" });
    }

    // 2. "Bearer " prefix hatayein
    const jwtToken = authHeader.replace("Bearer", "").trim();

    try {
        // 3. Token verify karein
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        // 4. User find karein aur password exclude karein (Correct Syntax)
        // .select("-password") use karein password na bhejne ke liye
        const userData = await User.findOne({ email: isVerified.email }).select("-password");

        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }

        // 5. Request object mein data save karein
        req.user = userData;
        req.token = jwtToken;
        req.userID = userData._id;

        next(); // Agle step par bhejein
    } catch (error) {
        return res.status(401).json({ msg: "Unauthorized. Invalid token" });
    }
}

module.exports = authMiddleware;