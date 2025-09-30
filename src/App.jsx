// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Driverdashboard from "./driver/Driverdashboard";
import Meterhistory from "./driver/Meterhistory";
import TripInspection from "./driver/TripInspection";
import Vehiclelist from "./driver/Vehiclelist";
import TruckDock from "./driver/TruckDock";
import DriverLayout from "./driver/DriverLayout";
import Froms from "./driver/Froms";
import VehicleAssignment from "./driver/VehicleAssignment";
import Userprofile from "./driver/Userprofile";
import PassUpdate from "./driver/PassUpdate";
import Testing from "./driver/Testing";
import AdminLayout from "./admin/AdminLayout";
import Adminprofile from "./admin/Adminprofile";
import AdminForms from "./admin/AdminForms";
import AdminDoc from "./admin/AdminDoc";
import Pretripsafety from "./admin/Pretripsafety";
import Detailspage from "./admin/Detailspage";
import UBKTowing from "./admin/components/UBKTowing";
import InspectionHistory from "./admin/InspectionHistory";
import InspectionDetails from "./admin/InspectionDetails";
import Inspectionform from "./admin/Inspectionform"
import Inspectionschdues from "./admin/Inspectionschdues";
import Inspectionfailureitems from "./admin/Inspectionfailureitems";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />

        {/* Driver Routes */}
        <Route element={<DriverLayout />}>
          <Route path="/driverdashboard" element={<Driverdashboard />} />
          <Route path="/meterhistory" element={<Meterhistory />} />
          <Route path="/tripinspection" element={<TripInspection />} />
          <Route path="/vehiclelist" element={<Vehiclelist />} />
          <Route path="/truckdocuments" element={<TruckDock />} />
          <Route path="/form" element={<Froms />} />
          <Route path="/vehicleassignment" element={<VehicleAssignment />} />
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/updatepassword" element={<PassUpdate />} />
          <Route path="/testing" element={<Testing />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/profile" element={<Adminprofile/>} />
          <Route path="/admin/forms" element={<AdminForms/>} />
          <Route path="/admin/doc" element={<AdminDoc/>} />
          <Route path="/admin/pretripsafety" element={<Pretripsafety/>} />
          <Route path="/admin/detailpage" element={<Detailspage/>} />
          <Route path="/admin/ubktowing" element={<UBKTowing/>} />
          <Route path="/admin/inspectionhistory" element={<InspectionHistory/>} />
          <Route path="/admin/inspectiondetails" element={<InspectionDetails/>} />
          <Route path="/admin/inspectionform" element={<Inspectionform/>} />
          <Route path="/admin/inspectionschedules" element={<Inspectionschdues/>} />
          <Route path="/admin/inspection-failure-items" element={<Inspectionfailureitems/>} />











        </Route>

        {/* Logout Route */}
        <Route path="/logout" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;