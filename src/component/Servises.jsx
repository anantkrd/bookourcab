import React, { Component,Text } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import  Header  from "./Header";
class Servises extends Component {
    state = {  }
    render() { 
        return ( <div>
            <Header/> 
            <section id="services" className="services section-bg">
                <div className="container" data-aos="fade-up">

                    <div className="row">
                    <div className="col-lg-6 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay="100">
                        <div className="icon-box iconbox-blue">
                        <div className="icon">
                            <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,521.0016835830174C376.1290562159157,517.8887921683347,466.0731472004068,529.7835943286574,510.70327084640275,468.03025145048787C554.3714126377745,407.6079735673963,508.03601936045806,328.9844924480964,491.2728898941984,256.3432110539036C474.5976632858925,184.082847569629,479.9380746630129,96.60480741107993,416.23090153303,58.64404602377083C348.86323505073057,18.502131276798302,261.93793281208167,40.57373210992963,193.5410806939664,78.93577620505333C130.42746243093433,114.334589627462,98.30271207620316,179.96522072025542,76.75703585869454,249.04625023123273C51.97151888228291,328.5150500222984,13.704378332031375,421.85034740162234,66.52175969318436,486.19268352777647C119.04800174914682,550.1803526380478,217.28368757567262,524.383925680826,300,521.0016835830174"></path>
                            </svg>
                            <i className="bx bx-notepad"></i>
                        </div>
                        <h4><a href="">VAT Return Filling</a></h4>
                        <p> As per Article 72 of chapter 2, every taxable person or entity is required to submit the tax return to the authority at the end of each tax period within the time limits and according to the procedures specified in the Executive regulation of the decree law declaring all supplies made and received the tax period</p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
                        <div className="icon-box iconbox-orange ">
                        <div className="icon">
                            <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,582.0697525312426C382.5290701553225,586.8405444964366,449.9789794690241,525.3245884688669,502.5850820975895,461.55621195738473C556.606425686781,396.0723002908107,615.8543463187945,314.28637112970534,586.6730223649479,234.56875336149918C558.9533121215079,158.8439757836574,454.9685369536778,164.00468322053177,381.49747125262974,130.76875717737553C312.15926192815925,99.40240125094834,248.97055460311594,18.661163978235184,179.8680185752513,50.54337015887873C110.5421016452524,82.52863877960104,119.82277516462835,180.83849132639028,109.12597500060166,256.43424936330496C100.08760227029461,320.3096726198365,92.17705696193138,384.0621239912766,124.79988738764834,439.7174275375508C164.83382741302287,508.01625554203684,220.96474134820875,577.5009287672846,300,582.0697525312426"></path>
                            </svg>
                            <i className="bx bx-trending-up"></i>
                        </div>
                        <h4><a href="">VAT Registration Services</a></h4>
                        <p>Every person having a place of residence in the State of UAE or any other implementing State shall be required to get registration if the total value of supplies made by such person exceeds AED 375,000 in a immediately preceding 12 month period, or if it is expected to exceed AED 375,000 in the next 30 days.</p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="300">
                        <div className="icon-box iconbox-pink">
                        <div className="icon">
                            <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,541.5067337569781C382.14930387511276,545.0595476570109,479.8736841581634,548.3450877840088,526.4010558755058,480.5488172755941C571.5218469581645,414.80211281144784,517.5187510058486,332.0715597781072,496.52539010469104,255.14436215662573C477.37192572678356,184.95920475031193,473.57363656557914,105.61284051026155,413.0603344069578,65.22779650032875C343.27470386102294,18.654635553484475,251.2091493199835,5.337323636656869,175.0934190732945,40.62881213300186C97.87086631185822,76.43348514350839,51.98124368387456,156.15599469081315,36.44837278890362,239.84606092416172C21.716077023791087,319.22268207091537,43.775223500013084,401.1760424656574,96.891909868211,461.97329694683043C147.22146801428983,519.5804099606455,223.5754009179313,538.201503339737,300,541.5067337569781"></path>
                            </svg>
                            <i className="bx bx-font"></i>
                        </div>
                        <h4><a href="">VAT Advisory</a></h4>
                            <p style={{textAlign:'justify'}}>Managing VAT obligations will be an ongoing challenge for businesses. With the passage of time, VAT legislation is likely to witness changes, which will have an impact on businesses.</p>
                            <p style={{textAlign:'justify'}}>
                                Further VAT considerations will come into play with changes in business scenarios, such as the launch of new services, new transactions being added to your business, or with changes in your supply-chain structure. All these would need review and advice from a VAT impact perspective.
                            </p>
                            <p style={{textAlign:'justify'}}>
                                Since all the VAT related expertise may not be available to you in-house, it is critical that you partner with qualified and experienced professional, who can guide you on all VAT related matters.
                            </p>
                            <p style={{textAlign:'justify'}}>
                                Our specialists can provide client focused advisory services on VAT related matters. Our dedicated VAT team can provide a range of VAT services. We can perform current AS IS assessment and impact assessment to review the current tax position of your business and provide relevant VAT advice. 
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay="100">
                        <div className="icon-box iconbox-yellow">
                        <div className="icon">
                            <svg width="100" height="100" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                            <path stroke="none" stroke-width="0" fill="#f5f5f5" d="M300,503.46388370962813C374.79870501325706,506.71871716319447,464.8034551963731,527.1746412648533,510.4981551193396,467.86667711651364C555.9287308511215,408.9015244558933,512.6030010748507,327.5744911775523,490.211057578863,256.5855673507754C471.097692560561,195.9906835881958,447.69079081568157,138.11976852964426,395.19560036434837,102.3242989838813C329.3053358748298,57.3949838291264,248.02791733380457,8.279543830951368,175.87071277845988,42.242879143198664C103.41431057327972,76.34704239035025,93.79494320519305,170.9812938413882,81.28167332365135,250.07896920659033C70.17666984294237,320.27484674793965,64.84698225790005,396.69656628748305,111.28512138212992,450.4950937839243C156.20124167950087,502.5303643271138,231.32542653798444,500.4755392045468,300,503.46388370962813"></path>
                            </svg>
                            <i className="bx bx-clipboard"></i>
                        </div>
                        <h4><a href="">VAT Impact Assessment Review</a></h4>
                        <p>With the implementation of Value Added Tax (VAT) in the UAE from January 1, 2018, almost all organisations are experiencing its effect.</p>
                        </div>
                    </div>

                    </div>

                </div>
            </section>

      </div> 
      );
    }
}
 
export default Servises;