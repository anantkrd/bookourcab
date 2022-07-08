import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,  Switch } from "react-router-dom";
import Header from './component/Header';
import Home from './component/Home';
//import AboutUs from './component/Home';
import Plans from './component/Plans';
import Servises from './component/Servises';
import Search from './component/Search';
import TermCondition from './component/TermCondition';
import PrivacyPolicy from './component/PrivacyPolicy';

import ConfirmBooking from './component/ConfirmBooking';
import ThankYou from './component/ThankYou';
import Login from './component/Login/Login';
import History from './component/User/History';
import Booking from './component/Admin/Booking';
import SearchLog from './component/Admin/SearchLog';


import BookingDetails from './component/User/BookingDetails';
import AdminHome from './component/Admin/AdminHome';
import Completed from './component/Admin/Completed';
import ReadyToGo from './component/Admin/ReadyToGo';
import WaitingForDriver from './component/Admin/WaitingForDriver';
import WaitingForAgent from './component/Admin/WaitingForAgent';

import Partner from './component/Partner/Home';
import BookingList from './component/Partner/BookingList';
import PendingBookingList from './component/Partner/PendingBookingList';
import CompletedBookingList from './component/Partner/CompletedBookingList';

import Profile from './component/Partner/Profile';
import AddCar from './component/Partner/AddCar';
import AddDriver from './component/Partner/AddDriver';
import Driver from './component/Driver/Home';
import BookingReport from './component/Driver/BookingReport';
import PaymentReport from './component/Driver/PaymentReport';
import DriverProfile from './component/Driver/Profile';
import TripDetails from './component/Driver/TripDetails';
import TripComplete from './component/Driver/TripComplete';

function App() {
  return (
    
      <Router>  
        <Switch>
        <Route path='/Home'><Home/></Route>  
        <Route path='/admin/Home/'><AdminHome/></Route>        
        <Route path='/admin/newBookings/' ><AdminHome/></Route>         
        <Route path='/Plans'><Plans/></Route> 
        <Route path='/Servises'><Servises/></Route>  
        <Route path='/Login'><Login/></Route>  
        <Route path='/History' ><History/></Route>         
        <Route path='/termCondition'><TermCondition/></Route>   
        <Route path='/privacyPolicy' ><PrivacyPolicy/></Route>   
        

        <Route path='/admin/Booking'><Booking/></Route>  
        <Route path='/admin/SearchLog'><SearchLog/></Route>  
        <Route path='/admin/completed' ><Completed/></Route>  
        <Route path='/admin/ready' ><ReadyToGo/></Route>  
        <Route path='/admin/driverWaiting' ><WaitingForDriver/></Route>  
        <Route path='/admin/agentWaiting' ><WaitingForAgent/></Route>  
        <Route path='/BookingDetails/:bookingId' ><BookingDetails/></Route>  
        <Route path='/ConfirmBooking/:data' ><ConfirmBooking/></Route>  
        <Route path='/ThankYou/:orderId' ><ThankYou/></Route>  
        <Route path='/Search2/:pickup/:destination/:pickdate/:returnDate/:pickupLocation/:destinationLocation/:mobileNo' ><Search/></Route>
        <Route path='/Search/:data' ><Search/></Route>
        
        <Route path='/agent/Login'><Partner/></Route>   
        <Route path='/agent/Home' ><BookingList/></Route>   
        <Route path='/agent/myPendingBookings'><PendingBookingList/></Route>   
        <Route path='/agent/myCompletedBookings' ><CompletedBookingList/></Route>   
        <Route path='/agent/Profile' ><Profile/></Route>   
        <Route path='/agent/AddCar' ><AddCar/></Route>   
        <Route path='/agent/AddDriver' ><AddDriver/></Route>   
        <Route path='/driver/home'><Driver/></Route>   
        <Route path='/driver/booking-report' ><BookingReport/></Route>   
        <Route path='/driver/payment-report'><PaymentReport/></Route>   
        <Route path='/driver/profile' ><DriverProfile/></Route>    
        <Route path='/driver/trip-details/:bookingId'><TripDetails/></Route>   
        <Route path='/driver/trip-complete/:bookingId'><TripComplete/></Route>  
        
        <Route exact path='/'><Home/></Route>  
        
        <Header/>
        </Switch>
      </Router>
      
  );
}

export default App;
