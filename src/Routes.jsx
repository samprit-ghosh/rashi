
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import HomePage from "./homepage";
// import AdminDashboard from './pages/admin-dashboard';


// import TourPackageDetails from './pages/tour-package-details';
// import BookingManagement from './pages/booking-management';


const Routes = () => {
  return (
    <BrowserRouter>

    

        <RouterRoutes>
          {/* Define your route here */}

          <Route path="/" element={<HomePage />} />
     
        

        </RouterRoutes>


 
    </BrowserRouter>
  );
};

export default Routes;