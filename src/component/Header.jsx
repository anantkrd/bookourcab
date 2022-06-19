
import isValid from 'date-fns/isValid';
import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
//import Slider from './Slider';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';
import './../config';
import axios from "axios";
import Form from 'react-bootstrap/Form'
class Header extends Component {
    state = { uid:'',userId:'', firstName:'',lastName:'',mobileNo:'',email:'',userType:'', show:false}
    state = {item:[],id:'',bookingId:'',mobileNo:'',otp:'',isOtpSent:'N',error:''};
    super(){
        this.setShow.bind(this);
    }
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));
        this.setState({isOtpSent:'N'});
      }
    componentDidMount(){
        
       let userId=localStorage.getItem("userId");
       console.log("UserId=="+localStorage.getItem("userType"));
       console.log("UserId=="+global.config.apiUrl);
        if(userId>0){
            let firstName =localStorage.getItem("firstName");
            let lastName=localStorage.getItem("lastName");
            let mobileNo=localStorage.getItem("mobileNo");
            let email=localStorage.getItem("email");
            let userType=localStorage.getItem("userType");
            let token=localStorage.getItem("token");

            this.setState({userId:userId});
            this.setState({firstName:firstName});
            this.setState({lastName:lastName});
            this.setState({mobileNo:mobileNo});
            this.setState({email:email});
            this.setState({userType:userType});
       }
        

    }
    setShow=(val)=>{
        this.setState({isOtpSent:'N'});
        this.setState({mobileNo:''});
        this.setState({otp:''});
        const currentState = this.state.show;
        console.log("val=="+currentState+"***");
        this.setState({show:!currentState});
    }
    setMobile=(mobile)=>{
        console.log("===="+mobile.target.value);
        this.setState({mobileNo:mobile.target.value});
    }
    setOtp=(otp)=>{
        this.setState({otp:otp.target.value});
    }
    
    async sendOtp(){
        this.setState({error:''});
        let urlData="&mobileNo="+this.state.mobileNo;
        const headers = { 'Content-Type': 'application/json'} 
        let options = {
            method: 'GET',
            mode:'no-cors',
            headers: {                
                'Content-Type': 'application/json',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Origin':'*'
            }
        }
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          //console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'user/send_otp?'+urlData, { headers });
          /*try {
            let result = await axios.get("https://vsu8l5to11.execute-api.ap-south-1.amazonaws.com/v1/login");
            console.log({ loading: false, products: result.data });
            if(result.data.code==200){
                //alert("Thank you, Your bokking is confimed");
                this.setState({isOtpSent:'Y'});
            }else{
              this.setState({isOtpSent:'N'});
                this.setState({error:'user not found'})
            }
          } catch (error) {
            console.log(error);
          }*/
         // const response = await fetch('https://vsu8l5to11.execute-api.ap-south-1.amazonaws.com/v1/login', options);
          //console.log("+++response=="+JSON.stringify(response))
          const data = await response.json();
          //console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              //alert("Thank you, Your bokking is confimed");
              this.setState({isOtpSent:'Y'});
          }else{
            this.setState({isOtpSent:'N'});
              this.setState({error:'user not found'})
          }
    }
    async verifyOtp(){
        this.setState({error:''});
        let urlData="&mobileNo="+this.state.mobileNo+"&otp="+this.state.otp;
        const headers = { 'Content-Type': 'application/json' }  
          //console.log("urlData=="+urlData);
          let url="https://c77b3hr0m0.execute-api.ap-south-1.amazonaws.com/v1/prayag-verifyOtp?mobileNo="+this.state.mobileNo+"&otp="+this.state.otp;
          const response = await fetch(global.config.apiUrl+'user/verify_otp?'+urlData, { headers });
          //let result = await axios.get(url);
         // console.log("+++response=="+JSON.stringify(response));
          const result = await response.json();
          console.log("Data="+JSON.stringify(result));
          if(result.code==200){
              let userObj=result.data[0];
              console.log("userObj=="+JSON.stringify(userObj)+"==id="+userObj.id);
                localStorage.setItem("userId",userObj.id);
                localStorage.setItem("firstName",userObj.firstName);
                localStorage.setItem("lastName",userObj.lastName);
                localStorage.setItem("mobileNo",userObj.mobileNo);
                localStorage.setItem("email",userObj.email);
                localStorage.setItem("userType",userObj.userType);
                localStorage.setItem("token",userObj.token);
                if(userObj.userType=='agent'){
                    window.location.href="agent/Home";
                }else if(userObj.userType=='admin'){
                    window.location.href="admin/Home";
                }else if(userObj.userType=='driver'){
                    window.location.href="driver/Home";
                }else{
                    window.location.href="/Home";
                }
                
                //console.log("UserId:"+localStorage.getItem("userId"));
                //window.location.href="/Home";
          }else{
            this.setState({isOtpSent:'N'});
              this.setState({error:'user not found'})
          }
    }
    signOut=()=>{
        console.log("here===sign out");
        localStorage.setItem("userId",'');
        localStorage.setItem("firstName",'');
        localStorage.setItem("lastName",'');
        localStorage.setItem("mobileNo",'');
        localStorage.setItem("email",'');
        localStorage.setItem("userType",'');
        localStorage.setItem("token",'');
        this.setState({userId:''});
        this.setState({firstName:''});
        this.setState({lastName:''});
        this.setState({mobileNo:''});
        this.setState({email:''});
        this.setState({userType:''});
        window.location.href="/Home";
    }
    getMenus(){
        if(this.state.userType=='admin'){
            return <ul>
                <li className="nav-item"><a href="/admin/Home">Home</a></li>
                <li className="nav-item dropdown">
                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Booking
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/admin/newBooking">New Booking</a>
                        <a className="dropdown-item" href="/admin/agentWaiting">Waiting for Agent</a>
                        <a className="dropdown-item" href="/admin/driverWaiting">Waiting for Driver</a>
                        <a className="dropdown-item" href="/admin/ready">Ready</a>
                        <a className="dropdown-item" href="/admin/completed">Completed</a>
                    </div>
                </li> 
                <li className="nav-item dropdown">
                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Report
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="/admin/Booking">Bookings</a>
                    <a className="dropdown-item" href="/admin/SearchLog">Search Log</a>
                    </div>
                </li> 

                <li><a href="#"onClick={this.signOut.bind(this)}><span>Sign Out</span></a></li>
            </ul>
        }else if(this.state.userType=='user'){
            return <ul>
                <li className="nav-item"><a href="/Home">Home</a></li>
                <li className="nav-item"><a href="/History">History</a></li>
                                                 
                <li><a href="#"onClick={this.signOut.bind(this)}><span>Sign Out</span></a></li>
            </ul>
        }else if(this.state.userType=='agent'){
            return <ul>
                <li className="nav-item"><a href="/agent/Home">Home</a></li>
                <li className="nav-item dropdown">
                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My Bookings
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/agent/myPendingBookings">Pending</a>
                        <a className="dropdown-item" href="/agent/myCompletedBookings">Completed</a>
                    </div>
                </li> 
                <li className="nav-item dropdown">
                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My Profile
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/agent/profile">Profile</a>
                        <a className="dropdown-item" href="/agent/AddCar">My Cabs</a>
                        <a className="dropdown-item" href="/agent/addDriver">My Driver</a>
                    </div>
                </li>           
                <li className="nav-item dropdown">
                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Report
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/agent/booking-report">Booking Report</a>
                        <a className="dropdown-item" href="/agent/payment-report">Payment Report</a>
                    </div>
                </li>                                 
                <li><a href="#"onClick={this.signOut.bind(this)}><span>Sign Out</span></a></li>
            </ul>
        }else if(this.state.userType=='driver'){     
            return <ul>
                <li className="nav-item"><a href="/driver/Home">Home</a></li>
                <li className="nav-item dropdown">
                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    My Profile
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/driver/profile">Profile</a>
                    </div>
                </li>           
                <li className="nav-item dropdown">
                    <a className="dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Report
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/driver/booking-report">Booking Report</a>
                        <a className="dropdown-item" href="/driver/bankDetails">Payment Report</a>
                    </div>
                </li>                                 
                <li><a href="#"onClick={this.signOut.bind(this)}><span>Sign Out</span></a></li>
            </ul>       
        }else if(this.state.userType=='operator'){
            return (<ul>
                <li className="active"><a href="/Home">Home</a></li>
                <li className="active"><a href="/History">History</a></li>  
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Report
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="#">My Assign</a>
                    </div>
                </li>                               
                <li><a href="#" onClick={this.signOut}><span>Sign Out</span></a></li>
            </ul>);
        }else{
            return (<ul>
                <li className="nav-item"><a href="/Home" >Home</a></li>                                
                <li><a href="#" onClick={this.setShow.bind(this.state.show)}><span>Sign In</span></a></li>
                <li className="nav-item"><a href="/agent/Login" >Partner</a></li> 
            </ul> );
        }
    }
    render() { 
        
        return (
                <div className="container d-flex align-items-center" style={{backgroundColor:'white'}}>
                   
                    <h1 className="logo mr-auto">
                        <a href="/Home">
                            <img src="/assets/img/logo/prayag.png" style={{width:60}}></img>
                        </a>
                    </h1>
                    <nav className="nav-menu d-none d-lg-block">
                        {
                            this.getMenus()
                        }
                       
                    </nav>
                    
                    <Modal show={this.state.show} onHide={this.setShow.bind(this.state.show)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                        <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Login
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <section id="pricing" className="pricing">
                        <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>                        
                            <div className="row">                       
                                <div className="col-lg-12 col-md-12">                                    
                                        <Card>
                                            
                                            <Card.Body>
                                                <div className="col-lg-12 col-md-12" style={{color:'red'}}>{this.state.error}</div>
                                                {
                                                    this.state.isOtpSent=='N'?<div >
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" >
                                                                <Form.Label>Mobile No</Form.Label>
                                                                <Form.Control name="mobileNo" value={this.state.mobileNo} type="text" placeholder="Mobile No" onChange={this.setMobile} />
                                                            </Form.Group>
                                                        </div> 
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                <Button variant="primary" type="button" onClick={this.sendOtp.bind(this)}>
                                                                    Send Otp
                                                                </Button>                                                                                                       
                                                            </Form.Group>
                                                        </div>
                                                    </div>:<div>
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" >
                                                                <Form.Label>OTP</Form.Label>
                                                                <Form.Control name="otp" value={this.state.otp} type="text" placeholder="Otp" onChange={this.setOtp} />                                                                                                        
                                                            </Form.Group>
                                                        </div>
                                                        
                                                        <div me="col-12">
                                                            <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                <Button variant="primary" type="button" onClick={this.verifyOtp.bind(this)}>
                                                                    Verify Otp
                                                                </Button>                                                                                                       
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                }
                                                
                                                
                                            </Card.Body>
                                        </Card>                                   
                                </div> 
                            </div>
                        </div>
                        
                    </section>
                        </Modal.Body>
                    </Modal>
                </div>
        );
    }
}
 
export default Header;