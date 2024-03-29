import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table,Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';
//import Form from 'react-bootstrap/Form'
import  Header  from "../Header";
import  Footer  from "../Footer";

import axios from "axios";
import { withRouter } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
class TripComplete extends Component {
    
    state = {item:[],userType:'',id:'',error:'',bookingId:'',pickupDate:'0000-00-00 00:00:00',returnDate:'0000-00-00 00:00:00',isLoading:false,loadingColor:'#ffffff',showStartTrip:false,showEndTrip:false,startkm:0,endkm:0};
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
    
    completeTript=async()=>{
        let userId=localStorage.getItem("userId");
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        
        const headers = {'Authorization':`Bearer ${token}`} ;
        let urlData="&userId="+userId+"&bookingId="+this.state.item.orderId;
          const response = await fetch(global.config.apiUrl+'driver/complete_trip?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
                    
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
                                    <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Complete Trip </Card.Title>
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
                                                <div className="col-12" style={{color:"green",fontSize:14}}>Cars: {this.state.item.cars}</div>
                                            </div>
                                            <div className="row detials-div" style={{color:"red",fontSize:14}}>
                                                <div className="col-12">Note: <span >{this.state.item.note}</span></div>
                                            </div>
                                            
                                            <div className="row detials-div" style={{color:"red",fontSize:14}}>
                                                <div className="col-12">Status: <span >{this.state.item.status}</span></div>
                                            </div>
                                            <div>
                                                {
                                                    this.state.item.pending>0?<Button variant="primary" type="button" onClick={this.completeTript.bind(this)}>
                                                        Collect ({this.state.item.pending}) and complete
                                                    </Button>:<Button variant="primary" type="button" onClick={this.completeTript.bind(this)}>
                                                        Complet Now
                                                    </Button> 
                                                } 
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
 
export default withRouter(TripComplete);