const cors = require('cors');
const express = require('express');
const connectDb = require('./config/dbConnection');
const cookieParser = require('cookie-parser');
const router = require('./routes/userRoutes');
const taskRoute = require("./routes/taskRoutes")
const app = express();

require('dotenv').config();

// app.use(cors()); // Moved this to the top to ensure it applies to all routes

// app.use(cors({
//     origin: 'http://localhost:3000', // Frontend URL
//     credentials: true,               // Allow cookies and credentials
// }));

app.use(cors({
    origin:"*", // Allow both local and Vercel frontends
    credentials: true,  // Allow cookies and credentials
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);
app.use("/home",taskRoute)

connectDb();

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
