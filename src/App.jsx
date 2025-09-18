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

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Driver Routes with Common Layout */}
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




        </Route>
      </Routes>
    </Router>
  );
}

export default App;
