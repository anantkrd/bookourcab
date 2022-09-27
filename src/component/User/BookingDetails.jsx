import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Button,Table,Tabs,Tab } from 'react-bootstrap';
//import Form from 'react-bootstrap/Form'
import  Header  from "../Header";
import  Footer  from "../Footer";
//import { Link } from 'react-router-dom'
//import { useHistory } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
class BookingDetails extends Component {
    
    state = {item:[],userType:'',id:'',error:'',bookingId:'',pickupDate:'0000-00-00 00:00:00',returnDate:'0000-00-00 00:00:00',isLoading:false,loadingColor:'#ffffff'};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {
        this.setState({isLoading:true});
        
        //this.setState({item:this.props.location.dataObj});
        this.setState({bookingId:this.props.match.params.bookingId});
        //this.setState({item:this.props.match.params.data});
        this.geetDetails(this.props.match.params.bookingId);
        let userType=localStorage.getItem("userType");
        this.setState({userType:userType});
      }
    
    async geetDetails(bookingId){ 
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;  
          let urlData="bookingId="+bookingId;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          
          const response = await fetch(global.config.apiUrl+'user/get_booking_details?'+urlData, { headers });
         
          const data = await response.json();
          
          if(data.code==='200'){
              this.setState({item:data.data[0]});
              this.setState({pickupDate:data.data[0].pickupDate});
              this.setState({returnDate:data.data[0].returnDate})
          }else{
              this.setState({error:'some internal error please try later'})
          }
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    sendBill(){
        console.log("Send bill");
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
                <ClipLoader css={override} style={{borderColor:'red'}} color={this.state.loadingColor} loading={this.state.isLoading} 
                css={override} size={150} >  </ClipLoader>
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">   
                             
                            <div className="col-lg-12 col-md-12 col-sm-12">
                            <Card>
                                    <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Booking Details </Card.Title>
                                        <Card.Body>
                                        <div className="row detials-div">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className='col-md-4'>Name</div>
                                                        <div className='col-md-8'>{this.state.item.userName}</div>
                                                    </div>                                                    
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className='col-md-4'>Mobile No</div>
                                                        <div className='col-md-8'>{this.state.item.mobileNo}</div>
                                                    </div>                                                    
                                                </div>                                                
                                            </div>
                                            <div className="row detials-div">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">BookingId</div>
                                                        <div className="col-8">{this.state.item.orderId}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'></div>
                                                </div>
                                                
                                            </div>      
                                                                                      
                                            <div className="row detials-div">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Driver Details</div>
                                                        <div className="col-8">{this.state.item.driverName}({this.state.item.driverContact})</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Cab Details</div>
                                                        <div className="col-8">{this.state.item.gadiNo}</div>
                                                    </div>
                                                </div>
                                                
                                            </div>                                      
                                            <div className="row detials-div">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Pickup</div>
                                                        <div className="col-8">{this.state.item.pickup}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Destination</div>
                                                        <div className="col-8">{this.state.item.destination}</div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="row detials-div">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Pickup Date</div>
                                                        <div className="col-8">
                                                    
                                                            {this.state.pickupDate!="0000-00-00 00:00:00"?new Intl.DateTimeFormat('en-GB', { 
                                                                                month: 'long', 
                                                                                day: '2-digit',
                                                                                year: 'numeric', 
                                                                                hour:'numeric',
                                                                                minute:'numeric',
                                                                                hour12:true
                                                                }).format(new Date(this.state.pickupDate)):null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Return Date</div>
                                                        <div className="col-8">
                                                        {this.state.returnDate!="0000-00-00 00:00:00"?new Intl.DateTimeFormat('en-GB', { 
                                                                                month: 'long', 
                                                                                day: '2-digit',
                                                                                year: 'numeric', 
                                                                                hour:'numeric',
                                                                                minute:'numeric',
                                                                                hour12:true
                                                                }).format(new Date(this.state.returnDate)):null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="row detials-div">
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Cab Type</div>
                                                        <div className="col-8">{this.state.item.cabType}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">AC</div>
                                                        <div className="col-8">{this.state.item.ac}</div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="row detials-div">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Bags</div>
                                                        <div className="col-8">{this.state.item.bags}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Capacity</div>
                                                        <div className="col-8">{this.state.item.capacity}</div>
                                                    </div>
                                                </div>                                                
                                            </div>
                                            <div className="row detials-div">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Amount</div>
                                                        <div className="col-8">{this.state.item.amount}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Discount</div>
                                                        <div className="col-8">{this.state.item.discount}</div>
                                                    </div>
                                                </div>                                                
                                            </div>
                                            
                                            
                                            <div className="row detials-div">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Start Km</div>
                                                        <div className="col-8" style={{fontWeight:700}}>{this.state.item.startKm}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>                                                        
                                                        <div className="col-4">End Km</div>
                                                        <div className="col-8" style={{fontWeight:700}}>{this.state.item.endKm}</div>
                                                    </div>
                                                </div>                                                
                                            </div>
                                            
                                            <div className="row detials-div">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Extra Km</div>
                                                        <div className="col-8" style={{fontWeight:700}}>{this.state.item.extraDistance}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>                                                        
                                                        <div className="col-4">Extra Amount</div>
                                                        <div className="col-8" style={{fontWeight:700}}> {this.state.item.extraAmount} ({this.state.item.extraRate}/KM)</div>
                                                    </div>
                                                </div>                                                
                                            </div>
                                            
                                            <div className="row detials-div">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Remaining</div>
                                                        <div className="col-8" style={{fontWeight:700}}>{this.state.item.pending}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>                                                        
                                                        <div className="col-4">Journy</div>
                                                        <div className="col-8" style={{fontWeight:700}}>{this.state.item.distance}KM  ({this.state.item.journyTime})</div>
                                                    </div>
                                                </div>                                                
                                            </div>
                                            
                                            <div className="row detials-div">
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Total</div>
                                                        <div className="col-8" style={{fontWeight:700}}>{this.state.item.finalAmount}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Paid</div>
                                                        <div className="col-8" style={{fontWeight:700}}>{this.state.item.paid}</div>
                                                    </div>
                                                </div>                                                
                                            </div>
                                            <div className="row detials-div">
                                                <div className="col-12" style={{fontSize:14}}>Cars: {this.state.item.cars}</div>
                                            </div>
                                            <div className="row detials-div" style={{fontSize:14}}>
                                                <div className="col-12">Note: <span >{this.state.item.note}</span></div>
                                            </div>
                                            
                                            <div className="row detials-div" style={{fontSize:14}}>
                                            <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Trip Status</div>
                                                        <div className="col-8" style={{fontWeight:700}}>{this.state.item.status}</div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6">
                                                    <div className='row'>
                                                        <div className="col-4">Journy Status</div>
                                                        <div className="col-8" style={{fontWeight:700}}>{this.state.item.journyStatus}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                this.state.userType=='user'&& this.state.item.pending>0?<div className="row" style={{color:"red",fontSize:14}}>
                                                    <div className="col-12">
                                                        <Button style={{float:'right'}} variant="primary" type="button" onClick={this.sendBill}>
                                                           Pay {this.state.item.pending}
                                                        </Button>
                                                    </div>
                                                </div>:null
                                            }
                                            {
                                                this.state.userType=='admin'?<div className="row" style={{color:"red",fontSize:14}}>
                                                    <div className="col-12">
                                                        <Button style={{float:'right'}} variant="primary" type="button" onClick={this.sendBill}>
                                                            Send Bill
                                                        </Button>
                                                    </div>
                                                </div>:null
                                            }
                                            
                                            
                                        </Card.Body>
                                    </Card>
                            </div>
                            <div className="bookingConfirmTabs">
                                <Tabs defaultActiveKey="tnc" id="uncontrolled-tab-example" className="mb-12">
                                    <Tab eventKey="includes" title="Includes">
                                        <div className="row">
                                            <div className="col-4" style={{textAlign:'center',padding:20}}>
                                                <i style={{padding:10,borderStyle:'ridge',borderRadius:'20%'}} class="fa fa-user-secret" aria-hidden="true"></i> Driver Allowance</div>
                                            <div className="col-4" style={{textAlign:'center',padding:20}}>
                                                <i style={{padding:10,borderStyle:'ridge',borderRadius:'20%'}} className="fa fa-inr" aria-hidden="true"></i> GST (5%)</div>
                                            <div className="col-4" style={{textAlign:'center',padding:20}}>
                                                <i style={{padding:10,borderStyle:'ridge',borderRadius:'20%'}} className="fa fa-road" aria-hidden="true"></i> {this.state.item.distance}Km Charges</div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="excludes" title="Excludes">
                                        <div className="row">
                                            <div className="col-4" style={{textAlign:'center',padding:20}}>
                                                <i style={{padding:10,borderStyle:'ridge',borderRadius:'20%'}} className="fa fa-inr" aria-hidden="true"></i> Toll / State tax</div>
                                            <div className="col-4" style={{textAlign:'center',padding:20}}>
                                                <i style={{padding:10,borderStyle:'ridge',borderRadius:'20%'}} className="fa fa-product-hunt" aria-hidden="true"></i> Parking</div>
                                            <div className="col-4" style={{textAlign:'center',padding:20}}>
                                                <i style={{padding:10,borderStyle:'ridge',borderRadius:'20%'}} className="fa fa-road" aria-hidden="true"></i> Pay ₹{this.state.item.extraRate}/km after {this.state.item.distance} km</div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="tnc" title="T&C">
                                        <div style={{backgroundColor:'white',padding:10}}>
                                            <ul style={{textAlign:'justify'}}>
                                                <li> <i class="fa fa-check-circle" aria-hidden="true"></i>Your Trip has a KM limit. If your usage exceeds this limit, you will be charged for the excess KM used.</li>
                                                <li><i class="fa fa-check-circle" aria-hidden="true"></i>We promote cleaner fuel and thus your cab can be a CNG vehicle. The driver may need to fill CNG once or more during your trip. Please cooperate with the driver.</li>
                                                <li><i class="fa fa-check-circle" aria-hidden="true"></i>For driving between 10:00 pm to 6:00 am on any of the nights, an additional allowance will be applicable and is to be paid to the driver.</li>
                                                <li><i class="fa fa-check-circle" aria-hidden="true"></i>Your trip includes one pick up in Pick-up city and one drop to destination city. It does not include within city travel.</li>
                                                <li><i class="fa fa-check-circle" aria-hidden="true"></i>If your Trip has Hill climbs, cab AC may be switched off during such climbs.</li>
                                            </ul>
                                        </div>
                                    </Tab>
                                </Tabs>
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
 
export default withRouter(BookingDetails);