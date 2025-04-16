require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const path = require('path');

// require('events').EventEmitter.defaultMaxListeners = 20;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "Public")));

const grievanceFormRoutes = require("./Routes/GrievanceForm/GrievanceFormIndex");
const sendOtpRouter = require("./Routes/Authentication/SendOTP")
const verifyOtpRouter = require("./Routes/Authentication/VerifyOTP")
const dbConnection = require('./Routes/Database/CreateDatabase')


const AdminSignIn = require('./Routes/Database/AdminSignIn')
const AdminFetchData = require('./Routes/Database/AdminFetchData')
const AcceptChange = require('./Routes/Database/AcceptChange')
const RejectReason = require('./Routes/Database/Reject')
const UserData = require('./Routes/Database/UserSpecificAllData')
const TicketRaiseReason = require('./Routes/Database/TicketRaiseReason')
const ChartData = require('./Routes/Database/ChartData')

ShareDepartmentData = require('./Routes/ShareDepartmentData')


app.use(grievanceFormRoutes); 

app.use(sendOtpRouter.router);
app.use(verifyOtpRouter);

app.use(dbConnection);

app.use('/Admin', AdminSignIn);
app.use('/Admin', AdminFetchData);
app.use('/Admin', AcceptChange);
app.use('/Admin', RejectReason);
app.use('/Admin', ChartData);

app.use('/user', UserData);
app.use('/user', TicketRaiseReason);

app.use('/ShareDepartmentData', ShareDepartmentData);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
