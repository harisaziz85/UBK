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
import InspectionDetails from "./driver/Inspection/InspectionDetails";
import Inspectionform from "./admin/Inspectionform"
import Inspectionschdues from "./admin/Inspectionschdues";
import Inspectionfailureitems from "./admin/Inspectionfailureitems";
import Adminpassup from "./admin/Adminpassup";
import AdminGeneralsetting from "./admin/AdminGeneralsetting";
import AdminDashboard from "./admin/AdminDashboard";
import ConsentForm from "./driver/component/Postform/ConsentForm";
import VehiclesTable from "./driver/component/Vechile/VechicleTable";
import MeterHistoryTable from "./driver/component/Vechile/HistoryMeterTable";
import VehicleInspectionSystem from "./driver/Inspection/StartInspection";
import AllDrivers from "./admin/AllDrivers";
import AddDriver from "./admin/AddDriver";
import DateInputCanada from "./driver/Inspection/Clender";
import VehicleDetailsPage from "./driver/component/Vechile/VechileDetails";
import Vahicles from "./admin/Vahicles";
import CreateVehicle from "./admin/CreateVehicle";
import DocumentDetails from "./admin/DocumentDetails";
import DriverDetailsPage from "./admin/DriverDetailsPage";
import AssignedVehicles from "./admin/components/AssignedVehicles";
import UnassignedVehicles from "./admin/components/UnassignedVehicles";
import Storagepdf from "./driver/component/Postform/pdf/Storagepgf";
import Towpdf from "./driver/component/Postform/pdf/Towpdf";


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
          <Route path="/meterhistory" element={<MeterHistoryTable />} />
          <Route path="/vehiclelist" element={<VehiclesTable />} />
          <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
          <Route path="/truckdocuments" element={<TruckDock />} />
          <Route path="/form" element={<Froms />} />
          <Route path="/consent-form" element={ <ConsentForm/>} />
          {/* <Route path="/vehicleassignment" element={<VehicleAssignment />} /> */}
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/updatepassword" element={<PassUpdate />} />
          <Route path="/testing" element={<Testing />} />
        {/* inspections module route */}
         <Route path="/tripinspection" element={<TripInspection />} />
        <Route path='/start-inspection' element={<VehicleInspectionSystem/>}/>
        <Route path="/inspection/:id" element={<InspectionDetails/>}/>
        <Route path="/storage" element={<Storagepdf/>}/>
        <Route path='/towpdf' element={<Towpdf/>}/>
        
        {/* profile */}
         <Route path="/profile" element={<Adminprofile/>} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/profile" element={<Adminprofile/>} />
          <Route path="/admin/update-password" element={<Adminpassup/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard/>} />
          <Route path="/admin/drivers" element={<AllDrivers/>} />
          <Route path="/admin/add-drivers" element={<AddDriver/>} />
          <Route path="/admin/vehicles" element={<Vahicles/>} />
          <Route path="/admin/unassigned-vehicles" element={<UnassignedVehicles/>} />
          <Route path="/admin/assigned-vehicles" element={<AssignedVehicles/>} />

          <Route path="/admin/createvehicles" element={<CreateVehicle/>} />
          <Route path="/admin/doc" element={<AdminDoc/>} />
          <Route path="/admin/document/details" element={<DocumentDetails/>} />
          <Route path="/admin/driver/details/:id" element={<DriverDetailsPage />} />
          <Route path="/admin/vehicle-assignment" element={<VehicleAssignment/>} />
          <Route path="/admin/forms" element={<AdminForms/>} />





          <Route path="/admin/general-setting" element={<AdminGeneralsetting/>} />
        
          <Route path="/admin/pretripsafety" element={<TripInspection/>} />
           <Route path="/admin/inspection/:id" element={<InspectionDetails/>}/>
            <Route path='/admin/start-inspection' element={<VehicleInspectionSystem/>}/>

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