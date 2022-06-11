import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';

import Form from 'react-bootstrap/Form'
import Slider from './Slider';
import  Header  from "./Header";
import  Footer  from "./Footer";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class ThankYou extends Component {
    //state = {  }
    /*
        {"id":2,"cabType":"Luxury","image":"/assets/img/ertiga2.png","ac":"Y","bags":3,"cars":"Audi,BMW,Toyota Innova Crysta, Mercedes-Benz E-Class",
        "capacity":4,"note":"Excluding Toll-Tax, Parking,",
        "amount":14553,"journyTime":"9 hours 47 mins","discountAmount":1323,"finalAmount":13230,
        "mobileNo":"7722055354","pickupCity":"Pune, Maharashtra, India","destinationCity":"Nanded, Maharashtra, India",
        "pickupDate":"2021-4-1 21:00:00","returnDateTime":"undefined","originlat":18.5204303,"originlng":73.8567437,
        "destinationlat":19.1382514,"destinationlng":77.3209555,"distance":441}
    */
    state = {item:[],id:'',bookingId:''};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {
          
        console.log("++pickup**********==="+JSON.stringify(this.props.match.params.orderId));
        this.setState({bookingId:this.props.match.params.orderId});
        //this.setState({item:this.props.match.params.data});
      }
    
    render() { 
        
        return (
            
            <div> 
                <Header/> 
                
                <div> 
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">   
                    
                            <div className="col-lg-12 col-md-12">
                                    
                                    <Card>
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Thank You </Card.Title>
                                        <Card.Body>
                                        
                                            <div className="col-12">
                                                Your booking is successfull<br/>
                                                BookingId: {this.state.bookingId}
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
 
export default ThankYou;