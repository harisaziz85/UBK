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
import VehicleAssignment from "./admin/VehicleAssignment";
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
import Vehicleprofile from "./admin/Vehicleprofile";
import Storagepdf from "./driver/component/Postform/pdf/Storagepgf";
import AdminCaadoc from "./admin/components/AdminCaadoc";
import Towpdf from "./driver/component/Postform/pdf/Towpdf";
import FormDetails from "./driver/component/Postform/FormDetails";
import ForgotPasswordFlow from "./auth/ForgetPassword";
import MyProfilePage from "./driver/MyprofilePage";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPasswordFlow/>}/>
        <Route path="/" element={<Login />} />

   {/* Driver Routes */}
        <Route element={<DriverLayout />}>
          <Route path="/driverdashboard" element={<Driverdashboard />} />
          <Route path="/meterhistory" element={<MeterHistoryTable />} />
          <Route path="/vehiclelist" element={<VehiclesTable />} />
          <Route path="/vehicles/:id" element={<VehicleDetailsPage />} />
          <Route path="/truckdocuments" element={<TruckDock />} />

          {/* form */}
          <Route path="/form" element={<Froms />} />
          <Route path="/consent-form" element={ <ConsentForm/>} />
          <Route path='/form-details/:id' element={<FormDetails/>}/>
          {/* <Route path="/vehicleassignment" element={<VehicleAssignment />} /> */}
          <Route path="/profile" element={<Userprofile />} />
          <Route path="/myprofile/:userId" element={<MyProfilePage />} />
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
        <Route element={<AdminLayout/>}>
          {/* Profile Routes */}
          <Route path="/admin/profile" element={<Adminprofile />} />
          <Route path="/admin/update-password" element={<PassUpdate />} />
          {/* Dashboard Route */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* Drivers Route */}
          <Route path="/admin/drivers" element={<AllDrivers />} />
          <Route path="/admin/add-drivers" element={<AddDriver />} />
          <Route path="/admin/driver/details/:id" element={<DriverDetailsPage />} />
          <Route path="/admin/add-driver/:id" element={<AddDriver />} />

          {/* Vehicle Routes */}
          <Route path="/admin/vehicles" element={<Vahicles/>} />
          <Route path="/admin/unassigned-vehicles" element={<UnassignedVehicles />} />
          <Route path="/admin/assigned-vehicles" element={<AssignedVehicles />} />
          <Route path="/admin/createvehicles" element={<CreateVehicle />} />
          <Route path='/admin/vehicle-assignment' element={<VehicleAssignment />} />
         <Route path="/admin/vehicleprofile/:vehicleId" element={<Vehicleprofile />} />
          {/* Inspeciton Routes */}
          <Route path='/admin/start-inspection' element={<VehicleInspectionSystem />} />
          <Route path="/admin/inspectionhistory" element={<InspectionHistory />} />
        <Route path="/admin/inspection/:id" element={<InspectionDetails/>}/>
          <Route path="/admin/tripinspection" element={<TripInspection />} />

          {/* Docuemnts Routes */}
          <Route path="/admin/doc" element={<AdminDoc />} />
          <Route path="/admin/document/:id" element={<DocumentDetails />} />
          <Route path="/admin/ubktowing" element={<UBKTowing/>} />
          <Route path="/admin/caadocuments" element={<AdminCaadoc />} />


          {/* Forms Route */}
          <Route path="/admin/forms" element={<AdminForms />} />
           <Route path='admin/form-details/:id' element={<FormDetails/>}/>






          {/* <Route path="/admin/general-setting" element={<AdminGeneralsetting />} />
          <Route path="/admin/pretripsafety" element={<Pretripsafety />} />
          <Route path="/admin/detailpage" element={<Detailspage />} />
          <Route path="/admin/inspectiondetails" element={<InspectionDetails />} />
          <Route path="/admin/inspectionform" element={<Inspectionform />} />
          <Route path="/admin/inspectionschedules" element={<Inspectionschdues />} />
          <Route path="/admin/inspection-failure-items" element={<Inspectionfailureitems />} />
          <Route path="/admin/general-setting" element={<AdminGeneralsetting/>} />
        
          <Route path="/admin/pretripsafety" element={<TripInspection/>} />
           <Route path="/admin/inspection/:id" element={<InspectionDetails/>}/>
            <Route path='/admin/start-inspection' element={<VehicleInspectionSystem/>}/>

          <Route path="/admin/detailpage" element={<Detailspage/>} />
          <Route path="/admin/inspectiondeta" element={<InspectionDetails/>} />
          <Route path="/admin/inspectionhistory" element={<InspectionHistory/>} />
          <Route path="/admin/inspectiondetails" element={<InspectionDetails/>} />
          <Route path="/admin/inspectionform" element={<Inspectionform/>} />
          <Route path="/admin/inspectionschedules" element={<Inspectionschdues/>} />
          <Route path="/admin/inspection-failure-items" element={<Inspectionfailureitems/>} /> */}



        </Route>

        {/* Logout Route */}
        <Route path="/logout" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;