import logo from './logo.svg';
import './App.css';
import {  Route,  Switch } from "react-router-dom";
import Header from './component/Header';
import Home from './component/Home';
//import AboutUs from './component/Home';
import Plans from './component/Plans';
import Servises from './component/Servises';
import Search from './component/Search';
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
    
    <>
    <Switch>  
      <Route path='/Home/' component={Home}></Route>  
      <Route path='/admin/Home/' component={AdminHome}></Route>        
      <Route path='/admin/newBookings/' component={AdminHome}></Route>         
      <Route path='/Plans' component={Plans}></Route> 
      <Route path='/Servises' component={Servises}></Route>  
      <Route path='/Login' component={Login}></Route>  
      <Route path='/History' component={History}></Route>  
      <Route path='/admin/Booking' component={Booking}></Route>  
      <Route path='/admin/SearchLog' component={SearchLog}></Route>  
      <Route path='/admin/completed' component={Completed}></Route>  
      <Route path='/admin/ready' component={ReadyToGo}></Route>  
      <Route path='/admin/driverWaiting' component={WaitingForDriver}></Route>  
      <Route path='/admin/agentWaiting' component={WaitingForAgent}></Route>  
      <Route path='/BookingDetails/:bookingId' component={BookingDetails}></Route>  
      <Route path='/ConfirmBooking/:data' component={ConfirmBooking}></Route>  
      <Route path='/ThankYou/:orderId' component={ThankYou}></Route>  
      <Route path='/Search2/:pickup/:destination/:pickdate/:returnDate/:pickupLocation/:destinationLocation/:mobileNo' component={Search}></Route>
      <Route path='/Search/:data' component={Search}></Route>
       
      <Route path='/agent/Login' component={Partner}></Route>   
      <Route path='/agent/Home' component={BookingList}></Route>   
      <Route path='/agent/myPendingBookings' component={PendingBookingList}></Route>   
      <Route path='/agent/myCompletedBookings' component={CompletedBookingList}></Route>   
      <Route path='/agent/Profile' component={Profile}></Route>   
      <Route path='/agent/AddCar' component={AddCar}></Route>   
      <Route path='/agent/AddDriver' component={AddDriver}></Route>   
      <Route path='/driver/home' component={Driver}></Route>   
      <Route path='/driver/booking-report' component={BookingReport}></Route>   
      <Route path='/driver/payment-report' component={PaymentReport}></Route>   
      <Route path='/driver/profile' component={DriverProfile}></Route>    
      <Route path='/driver/trip-details/:bookingId' component={TripDetails}></Route>   
      <Route path='/driver/trip-complete/:bookingId' component={TripComplete}></Route>   
      
      
      <Header/>
    </Switch>
    </>
  );
}

export default App;
