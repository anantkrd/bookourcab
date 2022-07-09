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
class BookingList extends Component {
    
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',pageNo:0,payment_orderId:''};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {    
          this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});     
        //this.setState({item:this.props.match.params.data});
        this.getBooking(userId);
      }
    
      showPopup(object){
        this.prePayment(object);
      }
    async getBooking(userId){
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          //console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'agent/get_booking_agent?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          //console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
              this.setState({item:dataRes.data});
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

        //console.log("result==pay=="+resultpay);
        this.setState({payment_orderId:resultpay.data.id,currency:resultpay.data.currency,receipt:resultpay.data.receipt});
        //console.log("payment_orderId==="+this.state.payment_orderId);
        // Getting the order details back
        const { amount, id, currency } = resultpay.data;
        this.payNow(advance,resultpay.data.id,resultpay.data.currency)
        return false;
        
    }
    async payNow(advance,paymentid,currency){
        let bookingId=this.state.item.bookingId;
        const options = {
            key: "rzp_test_8KHr7ine3uj7uk", // Enter the Key ID generated from the Dashboard
            amount: advance,
            currency: currency,
            description: "Test Transaction",
            image: '',
            order_id: paymentid,
            handler: async function (response) {
                const data = {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    rawResponce:response
                };
                //console.log("payment Responce=="+JSON.stringify(response));
                const result = await axios.post(global.config.apiUrl+"agent/success", data);
                window.location.href="/ThankYou/"+bookingId;
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
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>New Booking </Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                    <th>BookingId</th>
                                                    <th>Name </th>
                                                    <th>Pickup</th>
                                                    <th>Destination</th>
                                                    <th>PickupDate</th>
                                                    <th>ReturnDate</th>
                                                    <th>Amount</th>
                                                    <th>Confirm</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.item.map((object, i)=>{
                                                            return<tr> 
                                                                <td>{object.orderId}</td>
                                                                <td>{object.userName}</td>
                                                                <td>{object.pickup}</td>
                                                                <td>{object.destination}</td>
                                                                <td>
                                                                    {object.pickupDate!="0000-00-00 00:00:00"?new Intl.DateTimeFormat('en-GB', { 
                                                                        month: 'long', 
                                                                        day: '2-digit',
                                                                        year: 'numeric', 
                                                                        hour:'numeric',
                                                                        minute:'numeric',
                                                                        hour12:true
                                                                    }).format(new Date(object.pickupDate)):null
                                                                    }
                                                                 </td>
                                                                <td>
                                                                    {object.returnDate!="0000-00-00 00:00:00"?new Intl.DateTimeFormat('en-GB', { 
                                                                        month: 'long', 
                                                                        day: '2-digit',
                                                                        year: 'numeric', 
                                                                        hour:'numeric',
                                                                        minute:'numeric',
                                                                        hour12:true
                                                                    }).format(new Date(object.returnDate)):null
                                                                    }
                                                                </td>
                                                                <td>{object.agentPrice}</td>
                                                                <td><Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                        <Button variant="primary" type="button" onClick={this.showPopup.bind(this,object)}>
                                                                            Pay ({(object.agentPrice*20)/100}) to confirm
                                                                        </Button>                                                                                                       
                                                                    </Form.Group>
                                                                </td>
                                                            </tr>;
                                                        })
                                                    }
                                                    
                                                </tbody>    
                                            </Table>
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
 
export default withRouter(BookingList);