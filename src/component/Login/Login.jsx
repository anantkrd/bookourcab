import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';

import axios from "axios";
import Form from 'react-bootstrap/Form'
import  Footer  from "../Footer";
import { withRouter } from 'react-router-dom';
class Login extends Component {
    //state = {  }
    
    state = { uid:'',userId:'', firstName:'',lastName:'',mobileNo:'',email:'',userType:'', show:false}
    state = {item:[],id:'',bookingId:'',mobileNo:'',otp:'',isOtpSent:'N',error:'',userPassword:''};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));
        this.setState({isOtpSent:'N'});
      }
    
      componentDidMount() {
        let userId=localStorage.getItem("userId");
        if(userId>0){
            window.location.href="/Home";            
        }
        
        this.setState({bookingId:this.props.match.params.orderId});
        //this.setState({item:this.props.match.params.data});
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
    setUserPassword=(obj)=>{
        this.setState({userPassword:obj.target.value})
    }
    
    loginWithPassword=async()=>{
        this.setState({error:''});
        let urlData="&mobileNo="+this.state.mobileNo+"&userPassword="+this.state.userPassword;
        const headers = { 'Content-Type': 'application/json' }  
          //console.log("urlData=="+urlData);
          let url=global.config.apiUrl+"v1/user_login?mobileNo="+this.state.mobileNo+"&userPassword="+this.state.userPassword;
          const response = await fetch(global.config.apiUrl+'user/user_login?'+urlData, { headers });
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
          
          const response = await fetch(global.config.apiUrl+'user/send_otp?'+urlData, { headers });
         
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
    render() { 
        
        return (
            
            <div> 
                
                <div style={{width:"50vh",height:"515px",left:'0',right:'0',margin:'auto',borderRadius:'2%'}}> 
                <section id="pricing" className="pricing">
                <div >
                    <div className="col-12" style={{textAlign:'center'}}>
                        <h3>Login To BookOurCar</h3>
                    </div>
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" >
                                                                <Form.Label>Mobile No</Form.Label>
                                                                <Form.Control name="mobileNo" value={this.state.mobileNo} type="text" placeholder="Mobile No" onChange={this.setMobile} />
                                                            </Form.Group>
                                                        </div> 
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" >
                                                                <Form.Label>Password</Form.Label>
                                                                <Form.Control name="userPassword" value={this.state.userPassword} type="password" placeholder="Paasword/Mobile No" onChange={this.setUserPassword} />
                                                            </Form.Group>
                                                        </div> 
                                                        
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                <Button variant="primary" type="button" onClick={this.loginWithPassword.bind(this)}>
                                                                   Login
                                                                </Button>                                                                                                       
                                                            </Form.Group><Form.Group controlId="formBasicEmail" style={{float:'left',color:'white'}}>
                                                                <Button variant="primary" type="button">
                                                                <a style={{color:'white'}} href="/Home" ><span>Sign In</span></a>
                                                                </Button>                                                                                                       
                                                            </Form.Group>
                                                        </div>
                                                        
                                                    </div>
                    
                </section>
                 
                    
                </div>
                <Footer/>
            </div>
        );
    }
}
 
export default withRouter(Login);