import logo from './logo.svg';
import './App.css';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
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

import UserProfile from './component/User/Profile';

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
        <Route exact path='/Home'><Home/></Route>  
        <Route exact path='/admin/Home/'><AdminHome/></Route>        
        <Route exact path='/admin/newBookings/' ><AdminHome/></Route>         
        <Route exact path='/Plans'><Plans/></Route> 
        <Route exact path='/Servises'><Servises/></Route>  
        <Route exact path='/Login'><Login/></Route>  
        <Route exact path='/History' ><History/></Route>   
        <Route exact path='/Profile' ><UserProfile/></Route>      
        <Route exact path='/termCondition'><TermCondition/></Route>   
        <Route exact path='/privacyPolicy' ><PrivacyPolicy/></Route>   
        

        <Route exact path='/admin/Booking'><Booking/></Route>  
        <Route exact path='/admin/SearchLog'><SearchLog/></Route>  
        <Route exact path='/admin/completed' ><Completed/></Route>  
        <Route exact path='/admin/ready' ><ReadyToGo/></Route>  
        <Route exact path='/admin/driverWaiting' ><WaitingForDriver/></Route>  
        <Route exact path='/admin/agentWaiting' ><WaitingForAgent/></Route>  
        <Route exact path='/admin/AddCar' ><AddCar/></Route>   
        <Route exact path='/admin/AddDriver' ><AddDriver/></Route>  

        <Route exact path='/BookingDetails/:bookingId' ><BookingDetails/></Route>  
        <Route exact path='/ConfirmBooking/:data' ><ConfirmBooking/></Route>  
        <Route exact path='/ThankYou/:orderId' ><ThankYou/></Route>  
        <Route exact path='/Search2/:pickup/:destination/:pickdate/:returnDate/:pickupLocation/:destinationLocation/:mobileNo' ><Search/></Route>
        <Route exact path='/Search/:data' ><Search/></Route>
        
        <Route exact path='/agent/Login'><Partner/></Route>   
        <Route exact path='/agent/Home' ><BookingList/></Route>   
        <Route exact path='/agent/myPendingBookings'><PendingBookingList/></Route>   
        <Route exact path='/agent/myCompletedBookings' ><CompletedBookingList/></Route>   
        <Route exact path='/agent/Profile' ><Profile/></Route>   
        <Route exact path='/agent/AddCar' ><AddCar/></Route>   
        <Route exact path='/agent/AddDriver' ><AddDriver/></Route>   
        <Route exact path='/driver/home'><Driver/></Route>   
        <Route exact path='/driver/booking-report' ><BookingReport/></Route>   
        <Route exact path='/driver/payment-report'><PaymentReport/></Route>   
        <Route exact path='/driver/profile' ><DriverProfile/></Route>    
        <Route exact path='/driver/trip-details/:bookingId'><TripDetails/></Route>   
        <Route exact path='/driver/trip-complete/:bookingId'><TripComplete/></Route>  
        
        <Route exact path='/'><Home/></Route>  
        
        <Header/>
        </Switch>
      </Router>
      
  );
}

export default App;
