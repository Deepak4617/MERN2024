require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();

const authRoute = require('./router/authRouter');
const contactRoute = require('./router/contactRouter');
const serviceRoute = require('./router/servicesRouter');

const adminRoute = require('./router/adminRouter');
const connectDb = require('./utils/database/db');
const errorMiddleware = require("./middleWare/errorMiddleware");


const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://192.168.158.197:5173"
    ],
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);

app.use('/api/admin', adminRoute);

app.use(errorMiddleware);


const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, "0.0.0.0", () => {
        console.log(`Server is running on ${PORT}`)
    })
})