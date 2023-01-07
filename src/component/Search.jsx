import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Slider from './Slider';
import  Header  from "./Header";
import  Footer  from "./Footer";
import { Link,withRouter } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClipLoader from "react-spinners/ClipLoader";
import {Helmet} from "react-helmet";
import axios from "axios";

import 'react-calendar/dist/Calendar.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId } from 'react-google-places-autocomplete';
import { getDistance,getPreciseDistance } from 'geolib';
import timespan from 'jsonwebtoken/lib/timespan';
import moment from 'moment';
class Search extends Component {
    //state = {  }
    
    state = {cabsList: [],pickup:'',destination:'',pickdate:'',returnDate:'',distance:0,locationUrl:'',isLoading:false,loadingColor:'#ffffff',pickupTime:new Date(),returnTime:new Date(),pickupTimeSelected:'',
        returnTimeSelected:'',history:'',handleColor:'',pickupPlace:'',destinationPlace:'',pickupLatlng:{},destinationLatlng:{},
      distance:'',pickupLat:0.0,pickupLng:0.0,destinationLat:0.0,destinationLng:0.0,mobileNo:'',isReturn:'N',pickupCity:'',pickupDistrict:'',pickupState:'',
      dropCity:'',dropDistrict:'',dropState:'',showBooking:false}
    constructor(props) {
        super(props);        
      }
    
      componentDidMount(props) {
        let  handleColor1 = time => {
            return time.getHours() > 12 ? "text-success" : "text-error";
          };
          this.setState({handleColor:handleColor1});
          
          var new_date = moment(moment.now()).format("YYYY-MM-DD H:mm:ss");
          var new_dateTime = moment(new_date).add(5, 'hours');
          var new_dateTime1 = moment(new_dateTime).format("YYYY-MM-DD H:mm:ss");
          console.log("new_date-="+new_date+"====new_dateTime==="+new_dateTime1);
          this.setState({isLoading:true});
        //console.log("++pickup**********==="+JSON.stringify(this.props));
        //console.log("useParams()==="+JSON.stringify(props));
        let JsonObj=JSON.parse(this.props.match.params.data)

        let pickupPlace=JsonObj['pickupPlace'];
        //console.log("====JsonObj==="+JSON.stringify(JsonObj));
        //console.log("here*********destinationDistObj***********"+JsonObj['destinationDistObj']);
        let destinationPlace=JsonObj['destinationPlace'];
        let pickupTimeSelected=JsonObj['pickupTimeSelected'];
       
        let returnTimeSelected=JsonObj['returnTimeSelected'];
        let pickupDistObj=JsonObj['pickupDistObj'];
        let destinationDistObj=JsonObj['destinationDistObj'];
        let mobileNo=JsonObj['mobileNo'];
       
        let pickupLocation=pickupPlace.split(",");
        let destinationLocation=destinationPlace.split(",");
        let destinationLocationData=destinationPlace;
        let pickupLocationData=pickupPlace;
        
        let pickupCity=pickupPlace;
        let destinationCity=destinationPlace;
        let pickdateTime=pickupTimeSelected;
        let returnDateTime=returnTimeSelected;
        
        this.setState({mobileNo:mobileNo});
        this.setState({pickup:pickupLocation[0]});
        this.setState({destination:destinationLocation[0]});
        this.setState({pickdate:pickupTimeSelected});
        this.setState({returnDate:returnTimeSelected});
        
        let originObj=pickupDistObj;
        let destinationObj=destinationDistObj;
        
        let originLat=originObj.lat;        
        let originLng=originObj.lng;
        
        let destinationLat=destinationObj.lat;
        let destinationLng=destinationObj.lng;
        let pickupLocationData1=pickupDistObj;        
        let destinationLocationData1=destinationDistObj;
        let pickupCityName=JsonObj['pickupCity'];
        let pickupDistrict=JsonObj['pickupDistrict'];
        let pickupState=JsonObj['pickupState'];
        let dropCity=JsonObj['dropCity'];
        let dropDistrict=JsonObj['dropDistrict'];
        let dropState=JsonObj['dropState'];
        let isReturn=JsonObj['isReturn'];
        
        this.setState({isReturn:isReturn});
        const locationUrl1 = {
            pathname: '/ConfirmBooking',
            state: { fromDashboard: true }
          }
          this.setState({locationUrl:locationUrl1});

        this.getCabs(pickupLocationData1,destinationLocationData1,pickupCity,destinationCity,pickdateTime,returnDateTime,mobileNo,pickupCityName,pickupDistrict,
            pickupState,dropCity,dropDistrict,dropState);
      }
      async  getCabs(originObj,destinationObj,pickupCity,destinationCity,pickdateTime,returnDateTime,mobileNo,pickupCityName,pickupDistrict,
        pickupState,dropCity,dropDistrict,dropState) {  
          
        const headers = { 'Content-Type': 'application/json'}  
            var destinationObj=JSON.stringify(destinationObj); 
            var originObj=JSON.stringify(originObj);
          let urlData="&pickupCity="+pickupCity+"&destinationCity="+destinationCity+"&pickdateTime="+pickdateTime+"&returnDateTime="+returnDateTime+"&mobileNo="+mobileNo+"&originObj="+originObj+"&destinationObj="+destinationObj
          +"&pickupCityName="+pickupCityName+"&pickupDistrict="+pickupDistrict+"&pickupState="+pickupState+"&dropCityName="+dropCity+"&dropDistrict="+dropDistrict+"&dropState="+dropState;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          const response = await fetch(global.config.apiUrl+'booking/getCabs?'+urlData, { headers });
          const data = await response.json();
          
          this.setState({cabsList:data.data});
          
          this.setState({isLoading:false});
          /*let url="https://nd45kbm83l.execute-api.ap-south-1.amazonaws.com/v1/search-cabs?"+urlData;
          let result = await axios.get(url);
           
            this.setState({cabsList:result.data.data});*/
    }
    confirmBooking(data){
        //console.log("data==="+JSON.stringify(data));
        let dataObj=JSON.stringify(data);
        
        window.location.href="/ConfirmBooking/"+dataObj;
    }
    onpickTimeChange=(date)=>{ 
        let picktime=date;
        let timeNow=moment(moment.now()).format("YYYY-MM-DD H:mm:ss");
        let timeOnly=moment(date).format("H:mm:ss");
        console.log(date+"==timeOnly=="+timeOnly);
        
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
        //let dateNew=Moment(date).format('YYYY-MM-DD HH:MM:SS');
        // console.log("dateNew=="+dateNew);
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
        
        if(this.state.pickupTimeSelected=="" || this.state.pickupTimeSelected==undefined || this.state.pickupTimeSelected=='Invalid date'){
          alert("Please select pickup date");
          return false;
        }
        if(this.state.isReturn=='Y' && (this.state.returnTimeSelected=="" || this.state.returnTimeSelected==undefined || this.state.returnTimeSelected=='Invalid date')){
          alert("Please select return date");
          return false;
        }
        let returnTimeSelected='';
        if(this.state.isReturn=='N'){
            returnTimeSelected='';
        }else{
            returnTimeSelected=this.state.returnTimeSelected;
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
        
        //console.log(this.state.pickupLat+"=pickup==="+this.state.pickupLng);
        //console.log(this.state.destinationLat+"=destination==="+this.state.destinationLng);
        //console.log("*****"+JSON.stringify(this.state.destinationLatlng));
        let pickupDistObj=JSON.stringify(this.state.pickupLatlng);
        let destinationDistObj=JSON.stringify(this.state.destinationLatlng);
        let dataObj={pickupPlace:this.state.pickupPlace,
          destinationPlace:this.state.destinationPlace,
          pickupTimeSelected:this.state.pickupTimeSelected,
          returnTimeSelected:returnTimeSelected,
          pickupDistObj:this.state.pickupLatlng,
          destinationDistObj:this.state.destinationLatlng,
          mobileNo:this.state.mobileNo,
          pickupCity:this.state.pickupCity,
          pickupDistrict:this.state.pickupDistrict,
          pickupState:this.state.pickupState,
          dropCity:this.state.dropCity,
          dropDistrict:this.state.dropDistrict,
          dropState:this.state.dropState,
          isReturn:this.state.isReturn,
        };
        let data=JSON.stringify(dataObj);
        console.log("data==="+data);
        //return false;
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
        //console.log("placeLabel=="+placeLabel);
        geocodeByPlaceId(placeId)
        .then(results => {
          //console.log("resut=="+JSON.stringify(results));
          //console.log("resut=="+JSON.stringify(results[0].geometry.location));
          
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
          //console.log("resut=="+JSON.stringify(results[0].geometry));
          //console.log("resut=location="+JSON.stringify(results[0].geometry.location));
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
      modify=()=>{
        let showBooking=!this.state.showBooking;
        this.setState({showBooking:showBooking});
        //this.setState({pickupTimeSelected:''});
        
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
    const newTo = { 
        pathname: "/ConfirmBooking/595212758daa6810cbba4104", 
        param1: "Par1" 
      };
        return (
            <div> 
                <Header/> 
                <ClipLoader color={this.state.loadingColor} loading={this.state.isLoading}  size={150} css={override} />
                <div> 
                <Helmet>
                    <title>Booking For {this.state.pickup} To {this.state.destination}</title>
                    <meta name="Title" content="Book Local and Outstation Cabs, Local & Airport Taxi Service - India's Chepeast Car Rentals service" />
                    <meta name="Keywords" content="Cheap car rental, Sasta car rental, Car Rental , Car Hire, Taxi Service, Cab Service, Cab Hire, Taxi Hire ,Cab Rental, Taxi Booking, Rent A Car, Car Rental India, Online Cab Booking, Taxi Cab , Car Rental Service, Online Taxi Booking, Local Taxi Service, Cheap Car Rental, Cab , Taxi , Car Rental, Car Hire Services , Car Rentals India, Taxi Booking India, Cab Booking India Car For Hire,  Taxi Services, Online Car Rentals , Book A Taxi  , Book A Cab, Car Rentals Agency India, Rental Cars In India, Car Hire India, India Car Hire, Car Hire In India, India Car Rentals, Car Rent In India, India Rental Cars, India Cabs, Rent Car In India, Car Rental India, India Car Rental, Rent A Car India, Car Rental In India, Rent A Car In India, India Car Rental Company, Corporate Car Rental India, City Cabs India, Car Rental Company In India" />
                    <meta name="Keywords" content="Mumbai to Pune, Pune To Mumbai,Mumbai To Goa,Goa To Mumbai, Pune To Goa,Goa To Pune,Pune To Nashik,Mumbai To Nashik, Navi Mumbai To Pune" />
                    <meta name="description" content="India's chepeast Car Rentals | India's Largest Intercity/outercity Car Rentals | Hire Outstation and Local AC cabs with Attractive Rates, Clean Cars, Courteous Drivers & Transparent Billing" />
                    <meta name="Keywords" content="Book Now, car on rent, bookcar on rent,hire car,hire car from pune,hire car from mumbai,hire gaadi" />
                </Helmet>  
                <section id="pricing" className="pricing">
                <div className="container align-items-center" data-aos="fade-up" style={{width:'95%!important',backgroundColor: 'rgb(83, 181, 235)',padding:16,borderRadius:'10px',marginBottom:20}}>
                    <div className="row">
                        <div className="col-md-5">Pickup: <h5>{this.state.pickup}</h5></div>
                        <div className="col-md-5">Drop: <h5>{this.state.destination}</h5></div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="row">
                        <div className="col-md-5">Pickup Time: {this.state.pickdate}</div>
                        <div className="col-md-5">{ this.state.isReturn=="Y" ? <spam>Return Time: {this.state.returnDate}</spam>:''}</div>
                        <div className="col-md-2">
                            <Button variant="primary" type="button" onClick={this.modify}>
                                Modify
                            </Button>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-4">
                            
                        </div>
                    </div>
                </div>
                {this.state.showBooking?<div className=" bookingOption container align-items-center bookingcontainer" data-aos="fade-up" style={{width:'95%!important',backgroundColor: 'rgb(225 92 139)',padding:16,borderRadius:'10px',color:'white',fontWeight:'bold'}}>
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
                    </div>:null
                }
                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">   
                        {this.state.cabsList.map((item, key) => (
                            <div className="col-lg-4 col-md-4" key={item['id']} style={{marginTop:20,paddingRight: 5,paddingLeft: 5}}>
                                    
                                <Card>
                                    <Card.Img variant="top" src={item['image']} alt="Car Image" style={{height:200}}/>
                                    <Card.Body>
                                        <Card.Title style={{fontSize:16}}>{this.state.pickup} ({item['pickupCityName']},{item['pickupDistrict']}) 
                                        To {this.state.destination} ({item['dropCityName']},{item['dropDistrict']})
                                        </Card.Title>
                                        <div style={{color:'red'}}>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star" aria-hidden="true"></i>
                                            <i className="fa fa-star-half-o" aria-hidden="true"></i>
                                        </div>
                                        <Card.Text style={{fontSize:13,color:'gray'}}>
                                        {item['cars'].substring(0,50)}
                                        </Card.Text>
                                        <div className="col-12" style={{fontSize:13,color:'gray',padding:0}}>Up To: {item['distance']}KM {item['journyTime']} Approx</div>
                                        <div className="row">
                                            <div className="col-5" style={{padding: "4px",fontSize: 12, textAlign: "left",fontWeight:700}}><i className="fa fa-inr" aria-hidden="true"></i><span>{item['finalAmount']}</span>  <span style={{color:'gray',textDecoration:'line-through'}}> {item['amount']}</span></div>
                                            <div className="col-3" style={{padding: "4px",fontSize: 12, textAlign: "center"}}>{item['cabType']}</div>
                                            <div className="col-4" style={{textAlign:"end"}}>
                                                
                                                <Link variant="success" className="btn btn-primary btn-small" style={{padding: "4px",fontSize: 12, textAlign: "center"}} to={{ pathname: `/ConfirmBooking/${item['bookingId']}`, dataObj: item}} >Book Now</Link>
                                                
                                            </div>
                                        </div>
                                        <div className="row" style={{padding: "4px",fontSize: 12, textAlign: "left",fontWeight:700,color:'red'}}>You saved  <i className="fa fa-inr" style={{paddingLeft:5,paddingTop:5}}aria-hidden="true"></i>{item['discountAmount']}</div>
                                        
                                    </Card.Body>
                                </Card>                                   
                            </div> 
                        
                        ))}
                                          
                       </div>

                    </div>
                    
                </section>
                 
                    
                </div>
                <Footer/>
            </div>
        );
    }
}
 
export default withRouter(Search);