import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table,Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
//import Form from 'react-bootstrap/Form'
import  Header  from "../Header";
import  Footer  from "../Footer";
//import { Link } from 'react-router-dom'
//import { useHistory } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
class TripDetails extends Component {
    
    state = {item:[],userType:'',id:'',error:'',bookingId:'',pickupDate:'0000-00-00 00:00:00',returnDate:'0000-00-00 00:00:00',isLoading:false,loadingColor:'#ffffff',showStartTrip:false,showEndTrip:false,startkm:0,endkm:0};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {
        this.setState({isLoading:true});
        console.log("details**********==="+JSON.stringify(this.props));
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
          console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'user/get_booking_details?'+urlData, { headers });
          console.log("+++response=="+response)
          const data = await response.json();
          console.log("Data="+JSON.stringify(data));
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
    
    showStartTrip=()=>{
        this.setState({startkm:0});
        const currentState = this.state.showStartTrip;
        console.log("val=="+currentState+"***");
        this.setState({showStartTrip:!currentState});
    }
    showEndTrip=()=>{
        this.setState({endkm:0});
        const currentState = this.state.showEndTrip;
        console.log("val=="+currentState+"***");
        this.setState({showEndTrip:!currentState});
    }
    setTripStart=(mobile)=>{
        console.log("=======================")
        this.setState({startkm:mobile.target.value})
    }
    setMobile=(mobile)=>{
        console.log("=mobile==="+mobile.target.value);
        this.setState({startkm:mobile.target.value})
    }
    saveStartKM=async()=>{
        let userId=localStorage.getItem("userId");
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        console.log("token==="+token+"***userId**"+userId);
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&bookingId="+this.state.item.orderId+"&startkm="+this.state.startkm;
          const response = await fetch(global.config.apiUrl+'driver/start_trip?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
            this.setState({error:'record updated'});
            
            this.setState({showStartTrip:false});
            this.geetDetails(this.state.item.orderId);
          }else{              console.log("errorr")
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
        
    }
    
    setTripEnd=(endkm)=>{
        this.setState({endkm:endkm.target.value})
    }
    
    saveEndKM=async()=>{
        let userId=localStorage.getItem("userId");
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        console.log("token==="+token+"***userId**"+userId+"===endkm=="+this.state.endkm+"***startkm*"+this.state.item.startKm);
        const headers = {'Authorization':`Bearer ${token}`} ;
        if(this.state.endkm<=this.state.item.startKm){
            this.setState({error:'Invalid values'});
            return false;
        }
        let urlData="&userId="+userId+"&bookingId="+this.state.item.orderId+"&endkm="+this.state.endkm;
          const response = await fetch(global.config.apiUrl+'driver/end_trip?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
             // this.setState({item:dataRes.data});
             this.setState({error:'record updated'});
             this.geetDetails(this.props.match.params.bookingId);
             window.location.href="/driver/trip-complete/"+this.state.item.orderId;
          }else{              
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
        
    }
    completeTript=async()=>{
        let userId=localStorage.getItem("userId");
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        console.log("token==="+token+"***userId**"+userId);
        const headers = {'Authorization':`Bearer ${token}`} ;
        let urlData="&userId="+userId+"&bookingId="+this.state.item.orderId;
          const response = await fetch(global.config.apiUrl+'driver/complete_trip?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
             // this.setState({item:dataRes.data});
             this.setState({error:'Trip completed'});
             window.location.href="/driver/home";
          }else{              
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
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
                                            <div style={{color:'red'}}>
                                                {this.state.error}
                                            </div>
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
                                            <div>
                                                {
                                                    this.state.item.journyStatus=='pending'?<Button variant="primary" type="button" onClick={this.showStartTrip.bind(this)}>
                                                        Start Now
                                                    </Button>:this.state.item.journyStatus=='start'?<Button variant="primary" type="button" onClick={this.showEndTrip.bind(this)}>
                                                        End Now
                                                    </Button> :this.state.item.tripStatus=='started'?<Button variant="primary" type="button" onClick={this.completeTript.bind(this)}>
                                                        End Trip
                                                    </Button> :<div>Completed</div>
                                                } 
                                            </div>

                                           
                                            
                                            
                                        </Card.Body>
                                    </Card>
                            </div>
                        </div>

                    </div>
                    
                </section>
                                                
                <Modal show={this.state.showStartTrip} onHide={this.showStartTrip.bind(this.state.showStartTrip)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Trip Starting KM
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
                                                <div >
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" >
                                                                <Form.Label>Enter Start KM</Form.Label>
                                                                
                                                                <Form.Control name="startkm" value={this.state.startkm} type="text" placeholder="Mobile No" onChange={this.setTripStart} />                                                                                                        
                                                            </Form.Group>
                                                        </div> 
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                <Button variant="primary" type="button" onClick={this.saveStartKM.bind(this)}>
                                                                    Save
                                                                </Button>                                                                                                       
                                                            </Form.Group>
                                                        </div>
                                                    </div>
                                                
                                                
                                            </Card.Body>
                                        </Card>                                   
                                </div> 
                            </div>
                        </div>
                        
                        </section>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showEndTrip} onHide={this.showEndTrip.bind(this.state.showEndTrip)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Trip Ending KM
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
                                                <div >
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" >
                                                                <Form.Label>Enter End KM</Form.Label>
                                                                <Form.Control name="endkm" value={this.state.endkm} type="text" placeholder="Trip End KM" onChange={this.setTripEnd} />                                                                                                        
                                                            </Form.Group>
                                                        </div> 
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                <Button variant="primary" type="button" onClick={this.saveEndKM.bind(this)}>
                                                                    Save
                                                                </Button>                                                                                                       
                                                            </Form.Group>
                                                        </div>
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
                <Footer/>
            </div>
        );
    }
}
 
export default withRouter(TripDetails);