import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import Slider from './Slider';
import  Header  from "./Header";
import  Footer  from "./Footer";
import { withRouter } from 'react-router-dom';
import {Helmet} from "react-helmet";
import './../config';
//import { Link } from 'react-router-dom'
//import { useHistory } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Home extends Component {
    state = {  };
    handleClick() {
        //alert("Here");
        this.props.history.push('/');
      }
      onClick = () => this.props.history.push("/Home");
      
    render() { 
        return (
            <div> 
                <Header/>    
                <Slider/> 
                <Helmet>
                    <title>BookOurCar Indias Chepest Car Rental Service</title>
                    <meta name="Title" content="Book Local and Outstation Cabs, Local & Airport Taxi Service - India's Chepeast Car Rentals service" />
                    <meta name="Keywords" content="Cheap car rental, Sasta car rental, Car Rental , Car Hire, Taxi Service, Cab Service, Cab Hire, Taxi Hire ,Cab Rental, Taxi Booking, Rent A Car, Car Rental India, Online Cab Booking, Taxi Cab , Car Rental Service, Online Taxi Booking, Local Taxi Service, Cheap Car Rental, Cab , Taxi , Car Rental, Car Hire Services , Car Rentals India, Taxi Booking India, Cab Booking India Car For Hire,  Taxi Services, Online Car Rentals , Book A Taxi  , Book A Cab, Car Rentals Agency India, Rental Cars In India, Car Hire India, India Car Hire, Car Hire In India, India Car Rentals, Car Rent In India, India Rental Cars, India Cabs, Rent Car In India, Car Rental India, India Car Rental, Rent A Car India, Car Rental In India, Rent A Car In India, India Car Rental Company, Corporate Car Rental India, City Cabs India, Car Rental Company In India" />
                    <meta name="Keywords" content="Mumbai to Pune, Pune To Mumbai,Mumbai To Goa,Goa To Mumbai, Pune To Goa,Goa To Pune,Pune To Nashik,Mumbai To Nashik, Navi Mumbai To Pune" />
                    <meta name="description" content="India's chepeast Car Rentals | India's Largest Intercity/outercity Car Rentals | Hire Outstation and Local AC cabs with Attractive Rates, Clean Cars, Courteous Drivers & Transparent Billing" />

                </Helmet>    
                <div>
                    <section id="about-us" className="about-us">
                        <div className="container" data-aos="fade-up">                   
                            <div className="row content">

                                <div className="row" style={{margin:15}}>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5}}>
                                        <Card style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%',backgroundColor: '#9e4827',color: 'white'}}>
                                            <Card.Body>
                                                <Card.Title>Best Price Guaranteed.</Card.Title>
                                                <Card.Text style={{textAlign:'justify'}}>
                                                   We guaranteed that we have very best and low price rate.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>                                     
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5}}>
                                        <Card style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%',backgroundColor: '#04579b',color: 'white'}}>
                                        <Card.Body>
                                            <Card.Title>24/7 Customer Care</Card.Title>
                                            <Card.Text style={{textAlign:'justify'}}>
                                            Our service is on 24/7 hours you can call us any time.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card> 
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5}}>
                                        <Card style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%' ,backgroundColor: '#d3663b',color: 'white'}}>
                                        <Card.Body>
                                            <Card.Title>Home Pickups</Card.Title>
                                            <Card.Text style={{textAlign:'justify'}}>
                                                We Provide pickup and drop to your selected point. like home or office.
                                            </Card.Text>
                                        </Card.Body>
                                    </Card> 
                                    </div>
                                    <div className="col-lg-3 col-md-3" style={{paddingRight: 5,paddingLeft: 5}}>
                                        <Card style={{margin:2,paddingRight: 5,paddingLeft: 5,height:'100%',backgroundColor: '#4b4b4b',color: 'white'}}>
                                        <Card.Body>
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
                                <div className="col-lg-3 col-md-4">
                                    <div className="icon-box">
                                    <i className="bx bxs-car" style={{color: '#ffbb2c'}}></i>
                                    <h3><a href="">Sanitized cars</a></h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                    <div className="icon-box">
                                    <i className="fa fa-user" style={{color: '#ffbb2c'}}></i>
                                    <h3><a href="">Fully vaccinated drivers</a></h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                    <div className="icon-box">
                                    <i className="fa fa-server" style={{color: '#ffbb2c'}}></i>
                                    <h3><a href="">best service</a></h3>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-4">
                                    <div className="icon-box">
                                    <i className="fa fa-inr" style={{color: '#ffbb2c'}}></i>
                                    <h3><a href="">pay cashless</a></h3>
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
                                                <Card.Img variant="top" src="assets/img/cars/dzire4.png" style={{height:200}}/>
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
                                                <Card.Img variant="top" src="assets/img/cars/crysta2.png" style={{height:200}}/>
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
                                                <Card.Img variant="top" src="assets/img/cars/ertiga1.webp" style={{height:200}} />
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
                                                <Card.Img variant="top" src="assets/img/cars/innova2.png" style={{height:200}} />
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
                                                <Card.Img variant="top" src="assets/img/cars/dzire1.png" style={{height:200}} />
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
                                                <Card.Img variant="top" src="assets/img/cars/ertiga1.webp"  style={{height:200}} />
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
                                                            <Button variant="primary" size='small' style={{padding: "4px",fontSize: 12, textAlign: "center"}}>Book Now</Button>
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