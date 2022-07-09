import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table,Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import  Header  from "../Header";
import  Footer  from "../Footer";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Home extends Component {
    state = { isLoginShow:false,isRegShow:false,firstName:'',lastName:'',email:'',mobileNo:'',userMobileNo:'' };
    super(){
        this.showLogin.bind(this);
        this.showRegister.bind(this);
    }
    handleClick() {
        //alert("Here");
        this.props.history.push('/');
      }
      onClick = () => this.props.history.push("/Search");
     
    showLogin=(val)=>{
        this.setState({isOtpSent:'N'});
        this.setState({mobileNo:''});
        this.setState({otp:''});
        const currentState = this.state.isLoginShow;
        console.log("val=="+currentState+"***");
        this.setState({isLoginShow:!currentState});
    } 
    showRegister=(val)=>{
        this.setState({mobileNo:''});
        this.setState({otp:''});
        const currentState = this.state.isRegShow;
        console.log("val=="+currentState+"***");
        this.setState({isRegShow:!currentState});
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
        if(this.state.mobileNo=="" || this.state.mobileNo.length!=10){
            this.setState({error:"Invalid mobile number"});
            return false;
        }
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
          const response = await fetch(global.config.apiUrl+'user/send_otp?'+urlData, { headers });
          
          const data = await response.json();
          console.log("Data="+JSON.stringify(data));
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
        //  let url="https://c77b3hr0m0.execute-api.ap-south-1.amazonaws.com/v1/prayag-verifyOtp?mobileNo="+this.state.mobileNo+"&otp="+this.state.otp;
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
                    window.location.href="/agent/Home";
                }else if(userObj.userType=='admin'){
                    window.location.href="/admin/Home";
                }else{
                    window.location.href="/Home";
                }
                //console.log("UserId:"+localStorage.getItem("userId"));
                
          }else{
            this.setState({isOtpSent:'N'});
              this.setState({error:'user not found'})
          }
    }
    async register(){
        this.setState({error:''});
        
        if(this.state.firstName=="" || this.state.firstName==undefined){
            this.setState({error:"Please enter first name"});
            return false;
        }
        if(this.state.lastName=="" || this.state.lastName==undefined){
            this.setState({error:"Please enter last name"});
            return false;
        }
        if(this.state.userMobileNo=="" || this.state.userMobileNo.length!=10){
            this.setState({error:"Invalid mobile number"});
            return false;
        }
        if(this.state.email=="" || this.state.email==undefined){
            this.setState({error:"Please enter email"});
            return false;
        }
        let urlData="&mobileNo="+this.state.userMobileNo+"&fname="+this.state.firstName+"&lname="+this.state.lastName+"&email="+this.state.email+"&type=agent";
        const headers = { 'Content-Type': 'application/json' }  
        //  let url="https://c77b3hr0m0.execute-api.ap-south-1.amazonaws.com/v1/prayag-verifyOtp?mobileNo="+this.state.mobileNo+"&otp="+this.state.otp;
          const response = await fetch(global.config.apiUrl+'user/register?'+urlData, { headers });
          //let result = await axios.get(url);
         // console.log("+++response=="+JSON.stringify(response));
          const result = await response.json();
          console.log("Data="+JSON.stringify(result));
          if(result.code==200){              
            this.setState({error:'Register successfully'});  
            this.setState({userMobileNo:""});               
            this.setState({firstName:""});               
            this.setState({lastName:""});               
            this.setState({email:""});              
          }else{
            this.setState({isOtpSent:'N'});
              this.setState({error:result.msg})
          }
    }
    setFirstName =(fname)=>{
        this.setState({firstName:fname.target.value});
    }
    
    setLastName =(lname)=>{
        this.setState({lastName:lname.target.value});
    }
    
    setEmail =(email)=>{
        this.setState({email:email.target.value});
    }
    setUserMobileNo =(rmobile)=>{
        console.log("herer"+rmobile.target.value);
        this.setState({userMobileNo:rmobile.target.value});
    }
    render() { 
        return (
            <div> 
                <Header/>    
                    
                <div>
                <section id="about-us" className="about-us">
                        <div className="container" data-aos="fade-up">                   
                            <div className="row content">

                                <div className="row" style={{margin:15}}>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5}}>
                                        <Card style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%',backgroundColor: '#9e4827',color: 'white'}}>
                                            <Card.Body>
                                                <Card.Title>Best Price Guaranteed</Card.Title>
                                                <Card.Text style={{textAlign:'justify'}}>
                                                   We guaranteed that we have very best and low price rate
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>                                     
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5}}>
                                        <Card style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%',backgroundColor: '#04579b',color: 'white'}}>
                                        <Card.Body>
                                            <Card.Title>24/7 Customer Care</Card.Title>
                                            <Card.Text style={{textAlign:'justify'}}>
                                            Our service is on 24/7 hours you can call us any time.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card> 
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5}}>
                                        <Card style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%' ,backgroundColor: '#d3663b',color: 'white'}}>
                                        <Card.Body>
                                            <Card.Title>Home Pickups</Card.Title>
                                            <Card.Text style={{textAlign:'justify'}}>
                                                We Provide pickup and drop to your selected point. like home or office.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card> 
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5}}>
                                        <Card style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%',backgroundColor: '#4b4b4b',color: 'white'}}>
                                        <Card.Body>
                                            <Card.Title>Easy Bookings</Card.Title>
                                            <Card.Text style={{textAlign:'justify'}}>
                                                We have very easy and simple booking process 
                                            </Card.Text>
                                        </Card.Body>
                                    </Card> 
                                    </div>
                                </div>
                            </div>

                        </div>
                </section>
                    
                 
                    <section id="features" className="features">
                        <div className="container" data-aos="fade-up">  
                            <div className="section-title"></div>
                            <div className='row'>
                                <div className="col-md-6" style={{textAlign:'center'}}>
                                    <Form.Group controlId="formBasicEmail" >
                                        <Button variant="primary" type="button" onClick={this.showLogin.bind(this.state.isLoginShow)}>
                                            Login
                                        </Button>                                                                                                       
                                    </Form.Group>
                                            
                                    
                                </div>
                                <div className="col-md-6" style={{textAlign:'center'}}>
                                    <Form.Group controlId="formBasicEmail" style={{textAlign:'center'}}>
                                        <Button variant="primary" type="button" onClick={this.showRegister.bind(this.state.isRegShow)}>
                                            Register
                                        </Button>                                                                                                       
                                    </Form.Group>
                                </div>
                               
                               
                            </div>                      
                            
                        </div>
                    </section>
                    
                </div>
                <Footer/>

                <Modal show={this.state.isLoginShow} onHide={this.showLogin.bind(this.state.isLoginShow)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
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

                
                <Modal show={this.state.isRegShow} onHide={this.showRegister.bind(this.state.isRegShow)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        New Agent
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
                                                    <div className="col-12">
                                                        <Form.Group controlId="formBasicEmail" >
                                                            <Form.Label>First Name</Form.Label>
                                                            <Form.Control name="firstName" value={this.state.firstName} type="text" placeholder="First Name" onChange={this.setFirstName} />                                                                                                        
                                                        </Form.Group>
                                                    </div> 
                                                    <div className="col-12">
                                                        <Form.Group controlId="formBasicEmail" >
                                                            <Form.Label>Last Name</Form.Label>
                                                            <Form.Control name="lastName" value={this.state.lastName} type="text" placeholder="Last Name" onChange={this.setLastName} />                                                                                                        
                                                        </Form.Group>
                                                    </div> 
                                                    <div className="col-12">
                                                        <Form.Group controlId="formBasicEmail" >
                                                            <Form.Label>Mobile No</Form.Label>
                                                            <Form.Control name="userMobileNo" value={this.state.userMobileNo} type="number" placeholder="Mobile No" onChange={this.setUserMobileNo} />                                                                                                        
                                                        </Form.Group>
                                                    </div> 
                                                    <div className="col-12">
                                                        <Form.Group controlId="formBasicEmail" >
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control name="email" value={this.state.email} type="text" placeholder="Email" onChange={this.setEmail} />                                                                                                        
                                                        </Form.Group>
                                                    </div> 
                                                    <div me="col-12">
                                                        <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                            <Button variant="primary" type="button" onClick={this.register.bind(this)}>
                                                                        Register
                                                            </Button>                                                                                                       
                                                        </Form.Group>
                                                    </div> 
                                                    
                                                    
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
 
export default Home;