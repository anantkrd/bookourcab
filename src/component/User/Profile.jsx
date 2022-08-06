import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import  Header  from "../Header";
import  Footer  from "../Footer";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { withRouter } from 'react-router-dom';
class UserProfile extends Component {
    
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',pageNo:0,mobileNo:'',firstName:''};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {    
          this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});
                
        //this.setState({item:this.props.match.params.data});
        this.getProfile(userId);
      }
    
      showPopup(object){
        
        this.prePayment(object);
      }
    async getProfile(userId){
        
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          
          const response = await fetch(global.config.apiUrl+'user/get_user_byid?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
                    
          if(dataRes.code==200){
             
              this.setState({item:dataRes.data[0]});
          }else{              console.log("errorr")
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    
    loadScript=(src) =>{
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);

            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    prePayment=async(object)=>{
         
        const res = await this.loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        // creating a new order
        const headers = { 'Content-Type': 'application/json' }  
        let UrlData="amount=";
        let advance=(object.agentPrice*20)/100;
        let userAmount=object.finalAmount-object.paid;
        const dataPay = {
            amount: advance*100,
            bookingId: object.orderId,
            agentId: this.state.userId,
            bookingAmount:object.agentPrice,
            tripAmount:object.finalAmount,
            userPaid:object.paid,
            userAmount:userAmount

        };
        const resultpay = await axios.post(global.config.apiUrl+"agent/payment",dataPay);
        
        if (!resultpay) {
            alert("Server error. Are you online?");
            return;
        }

        
        this.setState({payment_orderId:resultpay.data.id,currency:resultpay.data.currency,receipt:resultpay.data.receipt});
        //console.log("payment_orderId==="+this.state.payment_orderId);
        // Getting the order details back
        const { amount, id, currency } = resultpay.data;
        this.payNow(advance,resultpay.data.id,resultpay.data.currency)
        return false;
        
    }
    async payNow(advance,paymentid,currency){
        const options = {
            key: global.config.paymentKey,//"rzp_test_8KHr7ine3uj7uk", // Enter the Key ID generated from the Dashboard
            amount: advance,
            currency: currency,
            description: "Booking ID: ",
            image: '',
            order_id: paymentid,
            handler: async function (response) {
                const data = {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    rawResponce:response
                };
                
                const result = await axios.post(global.config.apiUrl+"agent/success", data);
                window.location.href="/ThankYou/"+this.state.item.bookingId;
                alert(result.data.msg);
            },
            prefill: {
                name: this.state.firstName+" "+this.state.lastName,
                email: this.state.email,
                contact: this.state.item.mobileNo,
            },
            notes: {
                address: this.state.item.pickupCity,
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        
    }

    async addProfile(){

    }
    render() { 
        const override =`
        display: block;
        margin: 0 auto;
        border-color: red;
        position: absolute;
        z-index: 9;
        margin: 0px auto;
        left: 40%;
        `;
        return (
           
            <div> 
                <Header/> 
                <div>
                <ClipLoader css={override} style={{borderColor:'red'}} color={this.state.loadingColor} loading={this.state.isLoading}  size={150} >  </ClipLoader>
                </div>
                
                
                <div> 
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">
                                    
                                    <Card>
                                        <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Profile</Card.Title>
                                        <Card.Body>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>First Name</Form.Label>
                                                        <Form.Control type="text" placeholder="First Name" value={this.state.item.firstName} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Last Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Last Name" value={this.state.item.lastName} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                    <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Mobile No.</Form.Label>
                                                        <Form.Control type="text" placeholder="Mobile No" value={this.state.item.mobileNo} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type="email" placeholder="Mobile No" value={this.state.item.email} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Adhaar No.</Form.Label>
                                                        <Form.Control type="text" placeholder="Addhaar No" value={this.state.item.adharNo} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Upload Adhaar</Form.Label>
                                                        <Form.Control type="file" placeholder="Select Adhaar" value={this.state.item.adhaarLink} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Pan No.</Form.Label>
                                                        <Form.Control type="text"  placeholder="Pan Card No" value={this.state.item.panNo} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >                                                    
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Upload Pan</Form.Label>
                                                        <Form.Control type="file" placeholder="Select pan" value={this.state.item.panLink} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Company Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Company Name" value={this.state.item.companyName} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Office Address</Form.Label>
                                                        <Form.Control type="text" placeholder="Office Address" value={this.state.item.officeAddress} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Company Reg No.</Form.Label>
                                                        <Form.Control type="text" placeholder="Registration No." value={this.state.item.companyRegNo} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Company License</Form.Label>
                                                        <Form.Control type="file" placeholder="Upload Licence" value={this.state.item.companyLicense} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12">        
                                                
                                                <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                    <Button variant="primary" type="button" onClick={this.addProfile.bind(this)}>
                                                        Update
                                                    </Button>                                                                                                       
                                                </Form.Group>
                                            </div>
                                            
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
 
export default withRouter(UserProfile);