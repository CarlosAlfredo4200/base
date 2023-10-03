const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dbConnect = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const URL = process.env.FRONTEND_URL;
 

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

 

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede consultar la API
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// //Routes Middlewares
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactus", contactRoute);

//Routes
app.get("/", (req, res) => {
  res.send("Home page");
});

//Error Middlewares
app.use(errorHandler);

//connect to DB and start server
const PORT = process.env.PORT || 5000;
dbConnect();

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
