import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import Slider from './Slider';
import Form from 'react-bootstrap/Form'
import  Header  from "./Header";
import  Footer  from "./Footer";
import { withRouter } from 'react-router-dom';
import {Helmet} from "react-helmet";
import './../config';
import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { compareAsc, format } from 'date-fns'
import { getDistance,getPreciseDistance } from 'geolib';
import timespan from 'jsonwebtoken/lib/timespan';
import moment from 'moment';
class Home extends Component {
    state = { pickupTime:new Date(),returnTime:new Date(),pickupTimeSelected:new Date(),
        returnTimeSelected:new Date(),history:'',handleColor:'',pickupPlace:'',destinationPlace:'',pickupLatlng:{},destinationLatlng:{},
      distance:'',pickupLat:0.0,pickupLng:0.0,destinationLat:0.0,destinationLng:0.0,mobileNo:'',isReturn:'N',pickupCity:'',pickupDistrict:'',pickupState:'',
      dropCity:'',dropDistrict:'',dropState:'' };
      constructor(props) {
        super(props);      
        this.state = {cabsList: [],pickup:'',destination:'',isReturn:'N'};      
      }
    handleClick() {
        //alert("Here");
        this.props.history.push('/');
      }
      onClick() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
      }
      componentDidMount(){
        let  handleColor1 = time => {
           return time.getHours() > 12 ? "text-success" : "text-error";
         };
         this.setState({handleColor:handleColor1});
         
         var new_date = moment(moment.now()).format("YYYY-MM-DD H:mm:ss");
         var new_dateTime = moment(new_date).add(5, 'hours');
         var new_dateTime1 = moment(new_dateTime).format("YYYY-MM-DD H:mm:ss");
         console.log("new_date-="+new_date+"====new_dateTime==="+new_dateTime1);
         //this.setState({pickupTime:new_dateTime1});
       }
      // const [value, onChange] = useState(new Date());
      onpickTimeChange=(date)=>{ 
       let picktime=date;
       let timeNow=moment(moment.now()).format("YYYY-MM-DD H:mm:ss");
       let timeOnly=moment(date).format("H:mm:ss");
       console.log("timeOnly=="+timeOnly);
       
       let formattedDate=moment(date).format("YYYY-MM-DD H:mm:ss");
       console.log(timeNow+"==pickdate ="+moment(date).format("YYYY-MM-DD H:mm:ss"));
       let tripBookingBEforHours=moment(formattedDate).diff(moment(timeNow), 'hours');
       let tripBookingBEforDays=moment(formattedDate).diff(moment(timeNow), 'days');
       console.log("Diff="+moment(formattedDate).diff(moment(timeNow), 'hours'));
       if(tripBookingBEforHours<=0 && timeOnly!='0:00:00'){
         alert("Please select valid time");
         this.setState({pickupTime:''});
         return false;
       }
       if(tripBookingBEforHours>0 && tripBookingBEforHours<3 && timeOnly!='0:00:00'){
         alert("Please plan your trip 2 Hours in advance");
         this.setState({pickupTime:''});
         return false;
       }
       
       console.log("pickupTimeSelected=="+formattedDate);
       this.setState({pickupTimeSelected:formattedDate});
       //console.log("picktime=="+picktime);
        this.setState({pickupTime:date});
      }
      onEndTimeChange=(date)=>{     
       this.setState({returnTime:date});
       let formattedDate=moment(date).format("YYYY-MM-DD H:mm:ss");
       
       this.setState({returnTimeSelected:formattedDate});
     }
     searchCabs=()=>{
       
      // console.log(this.state.pickupPlace+"*****"+this.state.pickupTimeSelected+"**pickupLatlng"+JSON.stringify(this.state.pickupLatlng)+"===destinationLatlng=="+JSON.stringify(this.state.destinationLatlng));
       if(this.state.pickupPlace=="" || this.state.pickupPlace==undefined || this.state.destinationPlace=="" || this.state.destinationPlace==undefined){
         alert("Please enter pickup and destionation");
         return false;
       }
       if(this.state.mobileNo==""  || isNaN(this.state.mobileNo)){
         alert("Invalid mobile no.");
         return false;
       }
       if(this.state.mobileNo.length!=10){
         alert("Invalid mobile no.");
         return false;
       }
       
       if(this.state.pickupTimeSelected=="" || this.state.pickupTimeSelected==undefined){
         alert("Please select pickup date");
         return false;
       }
       if(this.state.isReturn=='Y' && (this.state.returnTimeSelected=="" || this.state.returnTimeSelected==undefined)){
         alert("Please select return date");
         return false;
       }
       let distance=getPreciseDistance(
         { latitude: this.state.pickupLat, longitude: this.state.pickupLng },
         { latitude: this.state.destinationLat, longitude: this.state.destinationLng }
       );
       if(distance<0){
         alert("Invalid locations");
         return false;
       }
       //console.log("distance==="+distance);
       
       let pickupDistObj=JSON.stringify(this.state.pickupLatlng);
       let destinationDistObj=JSON.stringify(this.state.destinationLatlng);
       let dataObj={pickupPlace:this.state.pickupPlace,
         destinationPlace:this.state.destinationPlace,
         pickupTimeSelected:this.state.pickupTimeSelected,
         returnTimeSelected:this.state.returnTimeSelected,
         pickupDistObj:this.state.pickupLatlng,
         destinationDistObj:this.state.destinationLatlng,
         mobileNo:this.state.mobileNo,
         pickupCity:this.state.pickupCity,
         pickupDistrict:this.state.pickupDistrict,
         pickupState:this.state.pickupState,
         dropCity:this.state.dropCity,
         dropDistrict:this.state.dropDistrict,
         dropState:this.state.dropState,
       };
       let data=JSON.stringify(dataObj);
       //console.log("data==="+data);
       //window.location.href="/Search/"+this.state.pickupPlace+"/"+this.state.destinationPlace+"/"+this.state.pickupTimeSelected+"/"+this.state.returnTimeSelected+"/"+pickupDistObj+"/"+destinationDistObj+"/"+this.state.mobileNo;
       window.location.href="/Search/"+data;
     }
     setDestination=(dest)=>{
       this.setState({destination:dest.target.value})
     }
     setMobile=(mobile)=>{
       this.setState({mobileNo:mobile.target.value})
     }
     setPickupData=(dataApi)=>{
       //console.log(JSON.stringify(dataApi));
       let placeId=dataApi.value.place_id;
       let placeLabel=dataApi.label;
       this.setState({pickupPlace:placeLabel});
       
       geocodeByPlaceId(placeId)
       .then(results => {
         
         let address_components=JSON.parse(JSON.stringify(results[0].address_components));
         let addressLength=address_components.length;
         let i=0;
         let state='';
         let disctrict='';
         let city='';
         while(i<addressLength){
           let addressType=address_components[i]['types'][0];
           if(addressType=="administrative_area_level_1"){
             state=address_components[i]['long_name'];
           }
           if(addressType=="administrative_area_level_2"){
             disctrict=address_components[i]['long_name'];
           }
           if(addressType=="locality"){
             city=address_components[i]['long_name'];
           }
           i++;
         }     
         
         
         this.setState({pickupCity:city,pickupDistrict:disctrict,pickupState:state});
         //console.log("addressLength==="+addressLength+"===state=="+state+"==disctrict=="+disctrict+"=====city===="+city);
         let locationObj=JSON.parse(JSON.stringify(results[0].geometry.location));
   
         var lat=results[0].geometry.location.lat;
         var lng=results[0].geometry.location.lng;
   
         this.setState({pickupLat:locationObj.lat});
         this.setState({pickupLng:locationObj.lng});
   
          this.setState({pickupLatlng:results[0].geometry.location});
       }).catch(error => console.error(error));
     }
     
     setDestination=(dataApi)=>{
       //console.log(JSON.stringify(dataApi));
       let placeId=dataApi.value.place_id;    
       let placeLabel=dataApi.label;
       this.setState({destinationPlace:placeLabel});
       geocodeByPlaceId(placeId)
       .then(results => {
         let address_components=JSON.parse(JSON.stringify(results[0].address_components));
         let addressLength=address_components.length;
         let i=0;
         let state='';
         let disctrict='';
         let city='';
         while(i<addressLength){
           let addressType=address_components[i]['types'][0];
           if(addressType=="administrative_area_level_1"){
             state=address_components[i]['long_name'];
           }
           if(addressType=="administrative_area_level_2"){
             disctrict=address_components[i]['long_name'];
           }
           if(addressType=="locality"){
             city=address_components[i]['long_name'];
           }
           i++;
         }  
         this.setState({dropCity:city,dropDistrict:disctrict,dropState:state});
         //console.log("addressLength==="+addressLength+"===state=="+state+"==disctrict=="+disctrict+"=====city===="+city);
         let locationObj=JSON.parse(JSON.stringify(results[0].geometry.location));
         var lat=results[0].geometry.location.lat;
         var lng=results[0].geometry.location.lng;
   
         this.setState({destinationLat:locationObj.lat});
         this.setState({destinationLng:locationObj.lng});
          
         this.setState({destinationLatlng:locationObj});
       }).catch(error => console.error(error));
     }
     onTypeChange=(val)=>{
       var value=val.target.value;    
       //console.log(value);
       this.setState({isReturn:value})
     }  
    render() { 
        return (
            <div> 
                <Header/>    
                
                <Helmet>
                    <title>BookOurCar Indias Chepest Car Rental Service</title>
                    <meta name="Title" content="Book Local and Outstation Cabs, Local & Airport Taxi Service - India's Chepeast Car Rentals service" />
                    <meta name="Keywords" content="Cheap car rental, Sasta car rental, Car Rental , Car Hire, Taxi Service, Cab Service, Cab Hire, Taxi Hire ,Cab Rental, Taxi Booking, Rent A Car, Car Rental India, Online Cab Booking, Taxi Cab , Car Rental Service, Online Taxi Booking, Local Taxi Service, Cheap Car Rental, Cab , Taxi , Car Rental, Car Hire Services , Car Rentals India, Taxi Booking India, Cab Booking India Car For Hire,  Taxi Services, Online Car Rentals , Book A Taxi  , Book A Cab, Car Rentals Agency India, Rental Cars In India, Car Hire India, India Car Hire, Car Hire In India, India Car Rentals, Car Rent In India, India Rental Cars, India Cabs, Rent Car In India, Car Rental India, India Car Rental, Rent A Car India, Car Rental In India, Rent A Car In India, India Car Rental Company, Corporate Car Rental India, City Cabs India, Car Rental Company In India" />
                    <meta name="Keywords" content="Mumbai to Pune, Pune To Mumbai,Mumbai To Goa,Goa To Mumbai, Pune To Goa,Goa To Pune,Pune To Nashik,Mumbai To Nashik, Navi Mumbai To Pune" />
                    <meta name="Keywords" content="Book Now, car on rent, bookcar on rent,hire car,hire car from pune,hire car from mumbai,hire gaadi" />
                    <meta name="description" content="India's chepeast Car Rentals | India's Largest Intercity/outercity Car Rentals | Hire Outstation and Local AC cabs with Attractive Rates, Clean Cars, Courteous Drivers & Transparent Billing" />

                </Helmet>  
                <div className=" container align-items-center" data-aos="fade-up" style={{width:'95%!important',backgroundColor: 'rgb(225 92 139)',padding:16,borderRadius:'10px',color:'white',fontWeight:'bold'}}>
                    <div className="col-12" style={{width:"50vh",height:"515px",left:'0',right:'0',margin:'auto',border:'solid rgb(243 245 167)',borderRadius:'2%'}}>
                        
                        <div className="row" style={{marginTop:10}}>
                            <div className="col-12">
                            <span className="">Single : <input type="radio" checked={this.state.isReturn=='N'} name="bookingType" value="N" onChange={this.onTypeChange}/></span>
                            <span style={{marginLeft:10}}>Return : <input type="radio" name="bookingType" value="Y" onChange={this.onTypeChange}/></span>
                            
                            </div>
                            <div className="col-12">
                            
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Pickup</Form.Label>
                                <GooglePlacesAutocomplete
                                apiKey="AIzaSyDzlGIoqMbQKaNwu1tCMXCtW3UEjzCfUvs"                              
                                autocompletionRequest={{                                
                                    componentRestrictions: {
                                    country: ['in'],
                                    }
                                }}
                                selectProps={{
                                    placeholder: 'Pickup Location',
                                    onChange: this.setPickupData,
                                    styles: {
                                    input: (provided) => ({
                                        ...provided,
                                        color: 'blue',
                                    }),
                                    option: (provided) => ({
                                        ...provided,
                                        color: 'blue',
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'blue',
                                    }),
                                    },
                                }}
                                />
                            </Form.Group>
                            </div>
                            <div className="col-12">
                            <Form.Group controlId="formBasicEmail" >                            
                                <Form.Label>Destination</Form.Label>
                                <GooglePlacesAutocomplete
                                apiKey="AIzaSyDzlGIoqMbQKaNwu1tCMXCtW3UEjzCfUvs"
                                autocompletionRequest={{                                
                                    componentRestrictions: {
                                    country: ['in'],
                                    }
                                }}
                                selectProps={{
                                    placeholder: 'Destination Location',
                                    onChange: this.setDestination,
                                    styles: {
                                    input: (provided) => ({
                                        ...provided,
                                        color: 'blue',
                                    }),
                                    option: (provided) => ({
                                        ...provided,
                                        color: 'blue',
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'blue',
                                    }),
                                    },
                                }}
                                />
                            </Form.Group>
                            </div>
                            
                            <div className="col-12">
                            <Form.Group controlId="formBasicEmail" >
                                <Form.Label>PickupTime</Form.Label>
                                <DatePicker popperPlacement="auto" showTimeSelect dateFormat="yyyy-MM-dd h:mm aa" className="form-control"
                                selected={this.state.pickupTime}
                                minDate={new Date()}                             
                                onChange={date => this.onpickTimeChange(date)} />
                                                                                    
                            </Form.Group>
                            </div> 
                            { this.state.isReturn=="Y" ? <div className="col-12" >
                            <Form.Group controlId="formBasicEmail" >                           
                                <Form.Label>Return Time</Form.Label>
                                <DatePicker minDate={new Date()}
                                className="form-control"
                                popperPlacement="auto"
                                dateFormat="yyyy-MM-dd h:mm aa"
                                showTimeSelect
                                selected={this.state.returnTime}
                                onChange={date => this.onEndTimeChange(date)}
                                />
                            </Form.Group>
                            </div> : null }
                                            
                            <div className="col-12">
                            <Form.Group controlId="formBasicEmail" >
                                <Form.Label>Mobile No</Form.Label>
                                <Form.Control type="text" value={this.state.mobileNo} placeholder="Mobile No" onChange={this.setMobile} />
                                                                                    
                            </Form.Group>
                            </div>
                            <div className="col-12" style={{textAlign:'end'}} >
                            <Form.Group controlId="formBasicEmail" >
                                <Button variant="primary" type="button" onClick={this.searchCabs}>
                                Search Cabs
                                </Button>
                            </Form.Group>
                            </div>
                            
                        </div>
                    </div>
                </div>  
                <div>
                    <section id="about-us" className="about-us">
                        <div className="container" data-aos="fade-up">                   
                            <div className="row content">

                                <div className="row" style={{margin:1}}>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5,marginBottom:5}}>
                                        <Card className='bestPrice' style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%',color: 'white'}}>
                                            <Card.Body className='bestPrice'>
                                                <Card.Title>Best Price Guaranteed.</Card.Title>
                                                <Card.Text style={{textAlign:'justify'}}>
                                                   We guaranteed that we have very best and low price rate.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>                                     
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5,marginBottom:5}}>
                                        <Card className='customerCare' style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%',color: 'white'}}>
                                        <Card.Body className='customerCare'>
                                            <Card.Title>24/7 Customer Care</Card.Title>
                                            <Card.Text style={{textAlign:'justify'}}>
                                            Our service is on 24/7 hours you can call us any time.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card> 
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5,marginBottom:5}}>
                                        <Card className="homePickup" style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%' ,color: 'white'}}>
                                        <Card.Body className='homePickup'>
                                            <Card.Title>Home Pickups</Card.Title>
                                            <Card.Text style={{textAlign:'justify'}}>
                                                We Provide pickup and drop to your selected point. like home or office.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card> 
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5,marginBottom:5}}>
                                        <Card className="easyBooking" style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%',color: 'white'}}>
                                        <Card.Body className='easyBooking'>
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
                                <div className="col-lg-3 col-md-4" style={{marginBottom:5}}>
                                    <div className="icon-box">
                                    <i className="bx bxs-car" style={{color: '#ffbb2c'}}></i>
                                    <h3><a href="">Sanitized Cars</a></h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4" style={{marginBottom:5}}>
                                    <div className="icon-box">
                                    <i className="fa fa-user" style={{color: '#ffbb2c'}}></i>
                                    <h3><a href="">Fully Vaccinated Drivers</a></h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4" style={{marginBottom:5}}>
                                    <div className="icon-box">
                                    <i className="fa fa-server" style={{color: '#ffbb2c'}}></i>
                                    <h3><a href="">Best Service</a></h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4" style={{marginBottom:5}}>
                                    <div className="icon-box">
                                    <i className="fa fa-inr" style={{color: '#ffbb2c'}}></i>
                                    <h3><a href="">Pay Cashless</a></h3>
                                    </div>
                                </div>
                            </div>                      
                            
                        </div>
                    </section>
                    <section id="pricing" className="pricing">

                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                                    <h2>Regular Trips
                                    
                                    <span className="fa fa-envelope-open"></span>
                                    </h2>
                                    
                                </div>
                            <div className="row">                    
                                        
                                                    
                                        <div className="col-lg-4 col-md-4" style={{marginTop:20,paddingRight: 5,paddingLeft: 5}}>
                                            
                                            <Card>
                                                <Card.Img variant="top" src="assets/img/cars/dzire4.png" alt="Car Image" style={{height:200}}/>
                                                <Card.Body>
                                                    <Card.Title><h5>Mumbai To Pune </h5></Card.Title>
                                                    <div style={{color:'red'}}>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    </div>
                                                    <Card.Text>
                                                    Mumbia To Pune.
                                                    </Card.Text>
                                                    
                                                    <div className="row">
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}><i className="fa fa-inr" aria-hidden="true"></i>***</div>
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Sedan</div>
                                                        <div className="col-6" style={{textAlign:"end"}}>
                                                            <Button onClick={this.onClick} variant="primary" size='small' style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Book Now</Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>                                   
                                        </div> 
                                        <div className="col-lg-4 col-md-4" style={{marginTop:20,paddingRight: 5,paddingLeft: 5}}>                                        
                                            <Card>
                                                <Card.Img variant="top" src="assets/img/cars/crysta2.png" alt="Car Image" style={{height:200}}/>
                                                <Card.Body>
                                                    <Card.Title>Pune To Mumbai</Card.Title>
                                                    <div style={{color:'red'}}>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    </div>
                                                    <Card.Text>
                                                    Pune To Mumbai
                                                    </Card.Text>                                                
                                                    <div className="row">
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}><i className="fa fa-inr" aria-hidden="true"></i>***</div>
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Innova Crysta</div>
                                                        <div className="col-6" style={{textAlign:"end"}}>
                                                            <Button onClick={this.onClick} variant="primary" size='small' style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Book Now</Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>                                   
                                        </div>  
                                        <div className="col-lg-4 col-md-4" style={{marginTop:20,paddingRight: 5,paddingLeft: 5}}>                                        
                                            <Card>
                                                <Card.Img variant="top" src="assets/img/cars/ertiga1.webp" alt="Car Image" style={{height:200}} />
                                                <Card.Body>
                                                    <Card.Title>Pune To Aurangabad</Card.Title>
                                                    <div style={{color:'red'}}>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    </div>
                                                    <Card.Text>
                                                    Pune To Aurangabad
                                                    </Card.Text>                                                
                                                    <div className="row">
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}><i className="fa fa-inr" aria-hidden="true"></i>***</div>
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Ertiga</div>
                                                        <div className="col-6" style={{textAlign:"end"}}>
                                                            <Button onClick={this.onClick} variant="primary" size='small' style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Book Now</Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>                                   
                                        </div>  
                                        <div className="col-lg-4 col-md-4" style={{marginTop:20,paddingRight: 5,paddingLeft: 5}}>                                        
                                            <Card >
                                                <Card.Img variant="top" src="assets/img/cars/innova2.png" alt="Car Image" style={{height:200}} />
                                                <Card.Body>
                                                    <Card.Title>Mumbai To Auragabad</Card.Title>
                                                    <div style={{color:'red'}}>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    </div>
                                                    <Card.Text>
                                                    Mumbai To Auragabad
                                                    </Card.Text>                                                
                                                    <div className="row">
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}><i className="fa fa-inr" aria-hidden="true"></i>***</div>
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Innova</div>
                                                        <div className="col-6" style={{textAlign:"end"}}>
                                                            <Button onClick={this.onClick} variant="primary" size='small' style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Book Now</Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>                                   
                                        </div>  
                                        <div className="col-lg-4 col-md-4" style={{marginTop:20,paddingRight: 5,paddingLeft: 5}}>                                        
                                            <Card >
                                                <Card.Img variant="top" src="assets/img/cars/dzire1.png" alt="Car Image" style={{height:200}} />
                                                <Card.Body>
                                                    <Card.Title>Mumbai To Surat</Card.Title>
                                                    <div style={{color:'red'}}>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    </div>
                                                    <Card.Text>
                                                    Mumbai To Surat
                                                    </Card.Text>                                                
                                                    <div className="row">
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}><i className="fa fa-inr" aria-hidden="true"></i>
                                                        ***</div>
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Sedan</div>
                                                        <div className="col-6" style={{textAlign:"end"}}>
                                                            <Button onClick={this.onClick} variant="primary" size='small' style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Book Now</Button>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>                                   
                                        </div>  
                                        <div className="col-lg-4 col-md-4" style={{marginTop:20,paddingRight: 5,paddingLeft: 5}}>                                        
                                            <Card>
                                                <Card.Img variant="top" src="assets/img/cars/ertiga1.webp" alt="Car Image" style={{height:200}} />
                                                <Card.Body>
                                                    <Card.Title>Mumbai To Bhopal</Card.Title>
                                                    <div style={{color:'red'}}>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star" aria-hidden="true"></i>
                                                        <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                                    </div>
                                                    <Card.Text>
                                                    Mumbai To Bhopal
                                                    </Card.Text>                                                
                                                    <div className="row">
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}><i className="fa fa-inr" aria-hidden="true"></i>****</div>
                                                        <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Ertiga</div>
                                                        <div className="col-6" style={{textAlign:"end"}}>
                                                            <Button onClick={this.onClick} variant="primary" size='small' style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Book Now</Button>
                                                        </div>
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
 
export default withRouter(Home);