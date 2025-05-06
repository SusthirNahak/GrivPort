require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3306;
const path = require('path');

const CreateDatabase = require('./Routes/Database/AllDatabase');

// require('events').EventEmitter.defaultMaxListeners = 20;
CreateDatabase();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "Public")));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }))

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
const UpdateLocation = require('./Routes/Database/UpdateLocation')

ShareDepartmentData = require('./Routes/ShareDepartmentData')
ResolutionPage = require('./Routes/ResolutionPage')


app.use(grievanceFormRoutes); 

app.use(sendOtpRouter.router);
app.use(verifyOtpRouter);

app.use(dbConnection);

app.use('/Admin', AdminSignIn);
app.use('/Admin', AdminFetchData);
app.use('/Admin', AcceptChange);
app.use('/Admin', RejectReason);
app.use('/Admin', ChartData);
app.use('/Admin', UpdateLocation);

app.use('/user', UserData);
app.use('/user', TicketRaiseReason);

app.use('/ShareDepartmentData', ShareDepartmentData);
app.use('/status-update', ResolutionPage);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
