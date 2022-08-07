import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';
import Slider from './Slider';
import  Header  from "./Header";
import  Footer  from "./Footer";
import { withRouter } from 'react-router-dom';
import './../config';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class AboutUs extends Component {
    state = {  };
    
    render() { 
        return (
            <div> 
                <Header/>  
                    
                <div>
                <section id="termsCondition" className="termsCondition">
                        <div className="container" data-aos="fade-up">                   
                            <div className="col-lg-12 col-md-12 aos-init aos-animate" style={{backgroundColor: "white",paddingBottom:'30px', paddingTop: "30px"}}>

                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>About</div>
                                    <div>
                                        Prayag Tours and Travels in Navi Mumbai, Mumbai is one of the leading businesses in the Car Rental. Also known for Car Rental, Car Rental For Outstation, Car Rental-Toyota Innova, Car Rental For Pune, 24 Hours Car Rental, Car Rental For Wedding, Car Rental-Maruti Suzuki Ertiga, Car Rental For Nashik and much more. Find Address, Contact Number, Reviews & Ratings, Photos, Maps of Prayag Tours and Travels, Navi Mumbai, Mumbai.
                                    </div>
                                    
                               </div>
                               <br/>
                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>We offer well maintained neat and Clean Cars</div>
                                    <div>
                                        All our Drivers are experienced and have great track record. We offer fully automatic billing. Our drivers are equipped with Driver App to give you GPS Tracking exact Km Calculation and more. Customer satisfaction and Safety is our top priority. You can pay us in Cash / Paytm or Gpay UPI
                                    </div>
                                    
                               </div>
                               
                               
                               
                            </div>

                        </div>
                    </section>
                    
                <section id="pricing" className="pricing">

                    
                    
                </section>
                 
                    
                </div>
                <Footer/>
            </div>
        );
    }
}
 
export default withRouter(AboutUs);