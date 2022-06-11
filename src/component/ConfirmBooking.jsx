import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';

import Form from 'react-bootstrap/Form'
import  Header  from "./Header";
import  Footer  from "./Footer";

import axios from "axios";
class ConfirmBooking extends Component {
    //state = {  }
    /*
        {"id":2,"cabType":"Luxury","image":"/assets/img/ertiga2.png","ac":"Y","bags":3,"cars":"Audi,BMW,Toyota Innova Crysta, Mercedes-Benz E-Class",
        "capacity":4,"note":"Excluding Toll-Tax, Parking,",
        "amount":14553,"journyTime":"9 hours 47 mins","discountAmount":1323,"finalAmount":13230,
        "mobileNo":"7722055354","pickupCity":"Pune, Maharashtra, India","destinationCity":"Nanded, Maharashtra, India",
        "pickupDate":"2021-4-1 21:00:00","returnDateTime":"undefined","originlat":18.5204303,"originlng":73.8567437,
        "destinationlat":19.1382514,"destinationlng":77.3209555,"distance":441}
    */
    state = {item:[],id:'',cabType:'',image:'',ac:'',bags:'',cars:'',capacity:'',note:'',amount:0,journyTime:'',
    discountAmount:0,finalAmount:0,mobileNo:'',pickupCity:'',destinationCity:'',pickupDate:'',returnDateTime:'',originlat:0.0,
    originlng:0.0,destinationlat:0.0,destinationlng:0.0,distance:0,firstName:'',lastName:'',email:'',error:'',payment_orderId:'',currency:'',receipt:'',bookingAmount:0};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {
          
        console.log("++pickup**********==="+JSON.stringify(this.props.location.dataObj));
        this.setState({item:this.props.location.dataObj});
        this.setState({pickupCity:this.state.item.pickupCity});
        var bookingAmt=Math.round((this.props.location.dataObj.finalAmount*25)/100);
        console.log("bookingAmt==========="+this.props.location.dataObj.finalAmount);
        this.setState({bookingAmount:bookingAmt});
        //this.setState({item:this.props.match.params.data});
        this.prePayment();
        //this.testPay()
      }
    setFirstName =(fname)=>{
        this.setState({firstName:fname.target.value});
    }
    
    setLastName =(lname)=>{
        this.setState({lastName:lname.target.value});
    }
    
    setEmail =(uemail)=>{
        this.setState({email:uemail.target.value});
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
    prePayment=async()=>{
         
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
        const dataPay = {
            amount: this.state.bookingAmount*100,
            bookingId: this.state.item.bookingId,
            mobileNo: this.state.item.mobileNo,
        };
        const resultpay = await axios.post("http://localhost:3001/booking/payment",dataPay);
        
        if (!resultpay) {
            alert("Server error. Are you online?");
            return;
        }

        console.log("result==pay=="+resultpay);
        this.setState({payment_orderId:resultpay.data.id,currency:resultpay.data.currency,receipt:resultpay.data.receipt});
        //console.log("payment_orderId==="+this.state.payment_orderId);
        // Getting the order details back
        const { amount, id, currency } = resultpay.data;

        return false;
        
    }
    async testPay(){
        const data = {
            razorpayPaymentId: 'order_J9r1WIGwfTNdVP',
            razorpayOrderId: '',
            razorpaySignature: '',
            rawResponce:''
        };
        console.log("payment Responce=="+JSON.stringify(data));
        const result = await axios.post("http://localhost:3001/booking/success", data);
    }
    async payNow(){
        const options = {
            key: "rzp_test_8KHr7ine3uj7uk", // Enter the Key ID generated from the Dashboard
            amount: this.state.bookingAmount*100,
            currency: this.state.currency,
            name: this.state.firstName+" "+this.state.lastName,
            description: "Test Transaction",
            image: '',
            order_id: this.state.payment_orderId,
            handler: async function (response) {
                const data = {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    rawResponce:response
                };
                console.log("payment Responce=="+JSON.stringify(response));
                const result = await axios.post("http://localhost:3001/booking/success", data);
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
    async confirm(){
        const headers = { 'Content-Type': 'application/json' }  
        let returnDate=this.state.item.returnDateTime;
        let isReturn='Y';
        if(returnDate=="" || returnDate==undefined  || returnDate=='undefined'){
            returnDate='';
            isReturn='N';
        }
        console.log("payment_orderId==="+this.state.payment_orderId);
        //return false;
       
          let urlData="&fname="+this.state.firstName+"&lname="+this.state.lastName+"&email="+this.state.email+"&cabId="+this.state.item.id+"&pickup="+this.state.item.pickupCity+"&destination="+this.state.item.destinationCity+"&pickupDate="+this.state.item.pickupDate+"&returnDate="+returnDate+"&isReturn="+isReturn+"&pickupLat="+this.state.item.originlat+"&pickupLong="+this.state.item.originlng+"&destinationLat="+this.state.item.destinationlat+"&destinationLong="+this.state.item.destinationlng+"&distance="+this.state.item.distance+"&journyTime="+this.state.item.journyTime+"&cabType="+this.state.item.cabType+"&ac="+this.state.item.ac+"&bags="+this.state.item.bags+"&cars="+this.state.item.cars+"&capacity="+this.state.item.capacity+"&note="+this.state.item.note+"&rate="+this.state.item.rate+"&amount="+this.state.item.amount+"&discountAmount="+this.state.item.discountAmount+"&finalAmount="+this.state.item.finalAmount+"&mobileNo="+this.state.item.mobileNo+"&bookingId="+this.state.item.bookingId+"&payment_orderId="+this.state.payment_orderId;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          console.log("urlData=="+urlData)
          const response = await fetch('http://localhost:3001/booking/book_cab?'+urlData, { headers });
          console.log("+++response=="+response)
          const data = await response.json();
          console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              //alert("Thank you, Your bokking is confimed");
              
              await this.payNow();
              
          }else{
              this.setState({error:'some internal error please try later'})
          }
          //this.setState({cabsList:data.data});
    }
    render() { 
        
        return (
            
            <div> 
                <Header/> 
                
                <div> 
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">   
                    
                            <div className="col-lg-7 col-md-7">
                                    
                                    <Card>
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Booking Confirmation </Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                                {this.state.error}
                                            </div>
                                            <div className="col-12">
                                                <Form.Group controlId="formBasicEmail" >
                                                    <Form.Label>Mobile No</Form.Label>
                                                    <Form.Control type="text" disabled placeholder="Mobile No" value={this.state.item.mobileNo} />                                                                                                        
                                                </Form.Group>
                                            </div>
                                            
                                            <div className="col-12">
                                                <Form.Group controlId="formBasicEmail" >
                                                    <Form.Label>First Name</Form.Label>
                                                    <Form.Control type="text" placeholder="First name" onChange={this.setFirstName} />                                                                                                        
                                                </Form.Group>
                                            </div>
                                            
                                            <div className="col-12">
                                                <Form.Group controlId="formBasicEmail" >
                                                    <Form.Label>Last Name</Form.Label>
                                                    <Form.Control type="text" placeholder="Last name" onChange={this.setLastName} />                                                                                                        
                                                </Form.Group>
                                            </div>
                                            
                                            <div className="col-12">
                                                <Form.Group controlId="formBasicEmail" >
                                                    <Form.Label>Email</Form.Label>
                                                    <Form.Control type="text" placeholder="Email" onChange={this.setEmail} />                                                                                                        
                                                </Form.Group>
                                            </div>
                                            
                                            <div className="col-12">
                                                <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                    <Button variant="primary" type="button" onClick={this.confirm.bind(this)}>
                                                        Pay ({this.state.bookingAmount}) to confirm
                                                    </Button>                                                                                                       
                                                </Form.Group>
                                            </div>
                                            
                                        </Card.Body>
                                    </Card>                                   
                            </div>             
                            <div className="col-lg-5 col-md-5">
                            <Card>
                                    <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Booking Details </Card.Title>
                                        <Card.Body>
                                        
                                            <div className="row">
                                                <div className="col-6">BookingId</div>
                                                <div className="col-6">{this.state.item.bookingId}</div>
                                            </div>                                            
                                            <div className="row">
                                                <div className="col-6">Pickup</div>
                                                <div className="col-6">{this.state.pickupCity}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Destination</div>
                                                <div className="col-6">{this.state.item.destinationCity}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Pickup Date</div>
                                                <div className="col-6">{this.state.item.pickupDate}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Return Date</div>
                                                <div className="col-6">{this.state.item.returnDateTime}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Cab Type</div>
                                                <div className="col-6">{this.state.item.cabType}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">AC</div>
                                                <div className="col-6">{this.state.item.ac}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Bags</div>
                                                <div className="col-6">{this.state.item.bags}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Capacity</div>
                                                <div className="col-6">{this.state.item.capacity}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Amount</div>
                                                <div className="col-6">{this.state.item.amount}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Discount</div>
                                                <div className="col-6">{this.state.item.discountAmount}</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-6">Total</div>
                                                <div className="col-6">{this.state.item.finalAmount}</div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-12" style={{color:"green",fontSize:14}}>Cars: {this.state.item.cars}</div>
                                            </div>
                                            <div className="row" style={{color:"#e738eb",fontSize:14}}>
                                                <div className="col-12">Journy: {this.state.item.distance}KM  ({this.state.item.journyTime})</div>
                                            </div>
                                            <div className="row" style={{color:"red",fontSize:14}}>
                                                <div className="col-12">Note: <span >{this.state.item.note}</span></div>
                                            </div>
                                            
                                        </Card.Body>
                                    </Card>
                            </div>
                        </div>

                    </div>
                    
                </section>
                 
                    
                </div>
                <Footer/>
            </div>
        );
    }
}
 
export default ConfirmBooking;