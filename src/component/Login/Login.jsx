import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';

import axios from "axios";
import Form from 'react-bootstrap/Form'
import { withRouter } from 'react-router-dom';
class Login extends Component {
    //state = {  }
    
    state = {item:[],id:'',bookingId:'',mobileNo:'',otp:'',isOtpSent:'N',error:''};
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
        console.log("++pickup**********==="+JSON.stringify(this.props.match.params.orderId));
        this.setState({bookingId:this.props.match.params.orderId});
        //this.setState({item:this.props.match.params.data});
      }
    setMobile=(mobile)=>{
        console.log("===="+mobile.target.value);
        this.setState({mobileNo:mobile.target.value});
    }
    setOtp=(otp)=>{
        this.setState({otp:otp.target.value});
    }
    async sendOtpold(){
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
          //const response = await fetch('http://localhost:3001/user/send_otp?'+urlData, { headers });
          try {
              /*let res=await fetch("https://vsu8l5to11.execute-api.ap-south-1.amazonaws.com/v1/login");
              console.log("Res==="+res)
              let data=await res.json();
              console.log("data===="+data);*/
            let result = await axios.get("https://vsu8l5to11.execute-api.ap-south-1.amazonaws.com/v1/login");
            console.log({ loading: false, products: result.data });
          } catch (error) {
            console.log(error);
          }
         /* const response = await fetch('https://vsu8l5to11.execute-api.ap-south-1.amazonaws.com/v1/login', options);
          console.log("+++response=="+JSON.stringify(response))
          console.log("+++response=="+response);
          const data = await response.json();
          console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              //alert("Thank you, Your bokking is confimed");
              this.setState({isOtpSent:'Y'});
          }else{
            this.setState({isOtpSent:'N'});
              this.setState({error:'user not found'})
          }*/
    }
    async verifyOtpold(){
        let urlData="&mobileNo="+this.state.mobileNo+"&otp="+this.state.otp;
        const headers = { 'Content-Type': 'application/json' }  
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'user/verify_otp?'+urlData, { headers });
          console.log("+++response=="+response)
          const data = await response.json();
          console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              let userObj=data.data[0];
            localStorage.setItem("userId",userObj.id);
            localStorage.setItem("firstName",userObj.firstName);
            localStorage.setItem("lastName",userObj.lastName);
            localStorage.setItem("mobileNo",userObj.mobileNo);
            localStorage.setItem("email",userObj.email);
            localStorage.setItem("userType",userObj.userType);
            localStorage.setItem("token",userObj.token);
            
            
            window.location.href="/Home";
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
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          //console.log("urlData=="+urlData)
          //const response = await fetch('http://localhost:3001/user/send_otp?'+urlData, { headers });
          try {
              /*let res=await fetch("https://vsu8l5to11.execute-api.ap-south-1.amazonaws.com/v1/login");
              console.log("Res==="+res)
              let data=await res.json();
              console.log("data===="+data);*/
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
          }
         /* const response = await fetch('https://vsu8l5to11.execute-api.ap-south-1.amazonaws.com/v1/login', options);
          console.log("+++response=="+JSON.stringify(response))
          console.log("+++response=="+response);
          const data = await response.json();
          console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              //alert("Thank you, Your bokking is confimed");
              this.setState({isOtpSent:'Y'});
          }else{
            this.setState({isOtpSent:'N'});
              this.setState({error:'user not found'})
          }*/
    }
    async verifyOtp(){
        this.setState({error:''});
        let urlData="&mobileNo="+this.state.mobileNo+"&otp="+this.state.otp;
        const headers = { 'Content-Type': 'application/json' }  
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          console.log("urlData=="+urlData);
          let url="https://c77b3hr0m0.execute-api.ap-south-1.amazonaws.com/v1/prayag-verifyOtp?mobileNo="+this.state.mobileNo+"&otp="+this.state.otp;
          //const response = await fetch('http://localhost:3001/user/verify_otp?'+urlData, { headers });
          let result = await axios.get(url);
          //console.log("+++response=="+JSON.stringify(result));
          //const data = await response.json();
         // console.log("Data="+JSON.stringify(data));
          if(result.data.code==200){
              let userObj=result.data.data[0];
              console.log("userObj=="+JSON.stringify(userObj)+"==id="+userObj.id);
            localStorage.setItem("userId",userObj.id);
            localStorage.setItem("firstName",userObj.firstName);
            localStorage.setItem("lastName",userObj.lastName);
            localStorage.setItem("mobileNo",userObj.mobileNo);
            localStorage.setItem("email",userObj.email);
            localStorage.setItem("userType",userObj.userType);
            localStorage.setItem("token",userObj.token);
            
            console.log("UserId:"+localStorage.getItem("userId"));
            window.location.href="/Home";
          }else{
            this.setState({isOtpSent:'N'});
              this.setState({error:'user not found'})
          }
    }
    render() { 
        
        return (
            
            <div> 
                
                <div> 
                <section id="pricing" className="pricing">
                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>                        
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">                                    
                                    <Card>
                                        <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Login Now <span style={{paddingLeft:'55%'}}><a href='/Home' style={{color:'white'}}>Home</a></span></Card.Title>
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
                 
                    
                </div>
            </div>
        );
    }
}
 
export default withRouter(Login);