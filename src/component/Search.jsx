import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';
import Slider from './Slider';
import  Header  from "./Header";
import  Footer  from "./Footer";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
class Search extends Component {
    //state = {  }
    
    state = {cabsList: [],pickup:'',destination:'',pickdate:'',returnDate:'',distance:0,locationUrl:'',isLoading:false,loadingColor:'#ffffff'};
    constructor(props) {
        super(props);        
      }
    
      componentDidMount() {
          this.setState({isLoading:true});
        console.log("++pickup**********==="+JSON.stringify(this.props.match.params.data));
        let JsonObj=JSON.parse(this.props.match.params.data)

        let pickupPlace=JsonObj['pickupPlace'];
        
        console.log("here*********destinationDistObj***********"+JsonObj['destinationDistObj']);
        let destinationPlace=JsonObj['destinationPlace'];
        let pickupTimeSelected=JsonObj['pickupTimeSelected'];
        let returnTimeSelected=JsonObj['returnTimeSelected'];
        let pickupDistObj=JsonObj['pickupDistObj'];
        let destinationDistObj=JsonObj['destinationDistObj'];
        let mobileNo=JsonObj['mobileNo'];
       
        console.log("pickupPlace=="+pickupPlace);
        let pickupLocation=pickupPlace.split(",");
        let destinationLocation=destinationPlace.split(",");
        let destinationLocationData=destinationPlace;
        let pickupLocationData=pickupPlace;
        //console.log("pickupLocation=="+pickupLocation[0]);
        let pickupCity=pickupPlace;
        let destinationCity=destinationPlace;
        let pickdateTime=pickupTimeSelected;
        let returnDateTime=returnTimeSelected;
        this.setState({pickup:pickupLocation[0]});
        this.setState({destination:destinationLocation[0]});
        this.setState({pickdate:pickupTimeSelected});
        this.setState({returnDate:returnTimeSelected});
        
        let originObj=pickupDistObj;
        let destinationObj=destinationDistObj;
        //console.log("originLat="+originObj.lat);
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
        //console.log("***********");    
        const headers = { 'Content-Type': 'application/json'}  
            var destinationObj=JSON.stringify(destinationObj); 
            var originObj=JSON.stringify(originObj);
          let urlData="&pickupCity="+pickupCity+"&destinationCity="+destinationCity+"&pickdateTime="+pickdateTime+"&returnDateTime="+returnDateTime+"&mobileNo="+mobileNo+"&originObj="+originObj+"&destinationObj="+destinationObj
          +"&pickupCityName="+pickupCityName+"&pickupDistrict="+pickupDistrict+"&pickupState="+pickupState+"&dropCityName="+dropCity+"&dropDistrict="+dropDistrict+"&dropState="+dropState;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          const response = await fetch(global.config.apiUrl+'booking/getCabs?'+urlData, { headers });
          const data = await response.json();
          //console.log("Data="+JSON.stringify(data));
          this.setState({cabsList:data.data});
          
          this.setState({isLoading:false});
          /*let url="https://nd45kbm83l.execute-api.ap-south-1.amazonaws.com/v1/search-cabs?"+urlData;
          let result = await axios.get(url);
            console.log(JSON.stringify(result.data.data));
            this.setState({cabsList:result.data.data});*/
    }
    confirmBooking(data){
        //console.log("data==="+JSON.stringify(data));
        let dataObj=JSON.stringify(data);
        console.log("dataObj=="+dataObj);
        console.log("**************"+data.id);
        window.location.href="/ConfirmBooking/"+dataObj;
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
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">   
                        {this.state.cabsList.map((item, key) => (
                            <div className="col-lg-4 col-md-4" key={item['id']} style={{marginTop:20,paddingRight: 5,paddingLeft: 5}}>
                                    
                                <Card>
                                    <Card.Img variant="top" src={item['image']} style={{height:200}}/>
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
                                        <div className="col-12" style={{fontSize:13,color:'gray',padding:0}}>{item['distance']}KM {item['journyTime']}</div>
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
 
export default Search;