import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';
import Slider from './Slider';
import  Header  from "./Header";
import  Footer  from "./Footer";

import './../config';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class TermCondition extends Component {
    state = {  };
    
    render() { 
        return (
            <div> 
                <Header/>  
                    
                <div>
                <section id="termsCondition" className="termsCondition">
                        <div className="container" data-aos="fade-up">                   
                            <div className="col-lg-12 col-md-12 aos-init aos-animate" style={{backgroundColor: "white", paddingTop: "30px"}}>

                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>Introduction</div>
                                    <div>
                                        Welcome to our website. If you continue to browse and use this website, you are agreeing to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern Savaari's relationship with you in relation to this website. If you disagree with any part of these terms and conditions, please do not use our website.
                                    </div>
                               </div>
                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>Ownership</div>
                                    <div>
                                        The term 'Bookourcar' or 'us' or 'we' refers to the BookOurCar Service LLP whose registered office is 'BookOurCar Service LLP., Shree Vishal Chs Ltd. PlotNo 17
                                        Sectore -18 Koperkhairane New Mumbai.' The term 'you' refers to the user or viewer of our website.
                                    </div>
                               </div>
                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>Terms of Use:</div>
                                    <div>
                                        The use of this website is subject to the following terms of use:

                                        <li>The content of the pages of this website is for your general information and use only. It is subject to change without notice.</li>
                                        <li>This website uses cookies to monitor browsing preferences. If you do allow cookies to be used, the following personal information may be stored by us for use by third parties: IP Address, Location</li>
                                        <li>Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.</li>
                                        <li>Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.</li>
                                        <li>This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.</li>
                                        <li>All trademarks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.</li>
                                        <li>Unauthorized use of this website may give rise to a claim for damages and/or be a criminal offence.</li>
                                        <li>From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).</li>
                                        <li>Your use of this website and any dispute arising out of such use of the website is subject to the laws of India.</li>
                                        <li>Specific offers will have might have additional Terms & Conditions which the user has to comply with in case he chooses to avail that offer.</li>
                                    </div>
                               </div>
                               
                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>our Use of the Services</div>
                                    <div>
                                    In order to use most aspects of the Services, you must register for and maintain an active personal user Services account (“Account”). 
                                    You must be at least 18 years of age to obtain an Account. Account registration requires you to submit to book our car certain personal
                                    information, such as your name, address, mobile phone number and email. 
                                    You agree to maintain accurate, complete, and up-to-date information in your Account. 
                                    Your failure to maintain accurate, complete, and up-to-date Account information, may result in your inability to access and use 
                                    the Services or bookourcar's termination of these Terms with you. 
                                    You are responsible for all activity that occurs under your Account, and also indemnifies the Bookourcar from any claim or damages.
                                    You agree to maintain the security and secrecy of your Account password at all times. 
                                    Unless otherwise permitted by Bookourcar in writing, you may only possess one Account.
                                    </div>
                                    <div>
                                        You may also register as B2B Partner in various available modes like affiliate partner or travel agent partner; 
                                        wherein you will be generating business for BookOurCar though your channels and get a sales commision in return. 
                                        These terms equally applies for B2B Partner and end users using services through B2B Partners.
                                    </div>
                               </div>
                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>Cancellation and Returns</div>
                                    <div>
                                        You may cancel the booking 24 hour prior to the time of journey, without any cancellation charges for all services. In case cancellation or shorting of the trip is requested within 24 hours of the pick-up time, then following rules will apply:
                                        <li>Befor 24 hours full return</li>
                                        <li>After 24 to befor 2 hours 50%</li>
                                        <li>After 2 hours no returs</li>
                                    </div>
                               </div>
                               <div>
                                    <div style={{color: '#ffbb2c', fontStyle:'bold'}}>Refunds</div>
                                    <div>If you are eligible for refunds based on the “Cancellation and Returns” policy above, then the refund will be remitted back to you in 5-7 working days. In case of any issues, write to us at bookourcar@gmail.com</div>
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
 
export default TermCondition;