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
class PrivacyPolicy extends Component {
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
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>Introduction</div>
                                    <div>
                                        This privacy policy sets out how BookOurCar uses and protects any information that you give BookOurCar when you use this website.
                                    </div>
                                    <div>
                                        BookOurCar is committed to ensuring that your privacy is protected with us. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy policy statement.

                                        BookOurCar may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes.
                                    </div>
                               </div>
                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>Information we collect ON BookOurCar</div>
                                    <div>
                                        <p>We may collect following information from you.</p>
                                        <li>Details about you name</li>
                                        <li>Contact information including mobile and email</li>
                                        <li>Demographic information such as postcode, preferences and interests</li>
                                        <li>Other information relevant to customer surveys and/or offers</li>
                                    </div>
                                    <p>We require this information to understand your needs and provide you with a better service</p>
                               </div>
                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>Security:</div>
                                    <div>
                                        <p>We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.</p>
                                    </div>
                               </div>
                               
                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>How we use your Information</div>
                                    <div>
                                    BookOurCar uses this information to enable reliable and convenient transportation. We also use the information we collect:

                                    <li>To enhance the safety and security of our users and services</li>
                                    <li>For customer support</li>
                                    <li>For research and development to improve our products and services.</li>
                                    <li>To enable communications to or between users</li>
                                    <li>To provide promotions or contests</li>
                                    <li>In connection with legal proceedings</li>
                                    <li>we can also use your information for promoting our product and our partenrs product</li>
                                    <li>Our other subsidery and parent/child companies and partner companies can also use these information </li>
                                    
                                    
                                    
                                    
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
 
export default withRouter(PrivacyPolicy);