require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const authRoute = require("./router/authRouter");
const contactRoute = require("./router/contactRouter");
const serviceRoute = require("./router/servicesRouter");
const adminRoute = require("./router/adminRouter");

const connectDb = require("./utils/database/db");
const errorMiddleware = require("./middleWare/errorMiddleware");

const corsOptions = {
  origin: [
    "https://mernfrontend-gn3f.onrender.com",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));

// ✅ VERY IMPORTANT — allow preflight
app.options("*", cors(corsOptions));

app.use(express.json());

// routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);

// error middleware (must be last)
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on ${PORT}`);
  });
});
