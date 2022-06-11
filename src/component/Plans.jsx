import React, { Component,Text } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import { Button,Table } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Grid } from '@material-ui/core';
import  Header  from "./Header";
class Plans extends Component {
    state = {  }
    componentDidMount(){
        this.fetchClasses(1);
    }
    fetchClasses=(pageId)=>{
        this.setState({refreshing: false});
        console.log('http://13.232.89.167/superhisaab/public/api/getEllipseHome?userId=1&type=&schoolId=&userToken=&appVersion=&appType=1');
        fetch('http://13.232.89.167/superhisaab/public/api/getEllipseHome?userId=1&type=parrent&schoolId=7&userToken=11&appVersion=2&appType=android')
          .then(results => results.json())
          .then(res => {
            if(res.code==200){
                console.log("--------***-----"+JSON.stringify(res.data));
            }else{
              //ToastAndroid.show(res.message, ToastAndroid.SHORT);
            }
              //this.setState({loading:false});
          })
          .catch((error) => {
            console.log("************"+error);
          });
      }
    render() { 
        return ( <div>
            <Header/> 
            
            <section id="pricing" className="pricing ">
                <div className="container" data-aos="fade-up">
                    
                    <div data-aos="fade-up">
                      <h2 style={{backgroundColor:'#3869f3'}}>Small Enterprise </h2> 
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>
                              
                            </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Monthly</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Quarterly </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Half Yearly</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Annually</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>No. of VAT Return</td>
                            <td>1</td>
                            <td>3 </td>
                            <td>6 </td>
                            <td>12</td>
                          </tr>
                          <tr>
                            <td>Original Price </td>
                            <td rowSpan='3'>AED 499</td>
                            <td>AED 2,997 for 3 months </td>
                            <td>AED 5,994 for 6 months </td>
                            <td>AED 11,988 for 12 months </td>
                          </tr>
                          <tr>
                            <td>Discount  </td>
                            <td>25% </td>
                            <td>30% </td>
                            <td>42% </td>
                          </tr>
                          <tr>
                            <td>Final Price After Discount </td>
                            <td>AED 2,249 for 3 months  </td>
                            <td>AED 4,199 for 6 months </td>
                            <td>AED 6,999 for 12 months  </td>
                          </tr>
                          
                          <tr>
                            <td></td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started</td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                          </tr>
                          
                          
                        </tbody>
                      </Table>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>
                              
                            </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill One Quarter</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill Two Quarters </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill Three Quarters</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill Four Quarters </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>No. of VAT Return</td>
                            <td>1</td>
                            <td>3 </td>
                            <td>6 </td>
                            <td>12</td>
                          </tr>
                          <tr>
                            <td>Original Price </td>
                            <td rowSpan='3'>AED 1,099</td>
                            <td>AED 2,198 for 2 quarters </td>
                            <td>AED 3,297 for 3 quarters </td>
                            <td>AED 4,396 for 4 quarters </td>
                          </tr>
                          <tr>
                            <td>Discount  </td>
                            <td>55% for 2nd  Quarter </td>
                            <td>55% for 2nd & 3rd Quarter </td>
                            <td>55% for 2nd, 3rd & 4th Quarter </td>
                          </tr>
                          <tr>
                            <td>Final Price After Discount </td>
                            <td>AED 1,599 for 2 quarters  </td>
                            <td>AED 2,099 for 3 quarters </td>
                            <td>AED 2,599 for 4 quarters </td>
                          </tr>
                          
                          <tr>
                            <td></td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started</td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                          </tr>
                          
                          
                        </tbody>
                      </Table>
                    </div>    
                    <div data-aos="fade-right">
                      <h2 style={{backgroundColor:'#4faeff'}}>Medium Enterprise </h2> 
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>
                              
                            </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Monthly</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Quarterly </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Half Yearly</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Annually</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>No. of VAT Return</td>
                            <td>1</td>
                            <td>3 </td>
                            <td>6 </td>
                            <td>12</td>
                          </tr>
                          <tr>
                            <td>Original Price </td>
                            <td rowSpan='3'>AED 1,599</td>
                            <td>AED 4,797 for 3 months  </td>
                            <td>AED 9,594 for 6 months </td>
                            <td>AED 19,188 for 12 months </td>
                          </tr>
                          <tr>
                            <td>Discount  </td>
                            <td>25% </td>
                            <td>30% </td>
                            <td>42% </td>
                          </tr>
                          <tr>
                            <td>Final Price After Discount </td>
                            <td>AED 3,599 for 3 months </td>
                            <td>AED 6,699 for 6 months  </td>
                            <td>AED 11,199 for 12 months  </td>
                          </tr>                          
                          <tr>
                            <td></td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started</td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                          </tr>
                          
                          
                        </tbody>
                      </Table>
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>
                              
                            </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill One Quarter</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill Two Quarters </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill Three Quarter</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill Four Quarters</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>No. of VAT Return</td>
                            <td>1</td>
                            <td>2 </td>
                            <td>3 </td>
                            <td>4</td>
                          </tr>
                          <tr>
                            <td>Original Price </td>
                            <td rowSpan='3'>AED 2,099</td>
                            <td>AED 4,198 for 2 quarters  </td>
                            <td>AED 6,297 for 3 quarters </td>
                            <td>AED 8,396 for 4 quarters</td>
                          </tr>
                          <tr>
                            <td>Discount  </td>
                            <td>52% for 2nd  Quarter </td>
                            <td>52% for 2nd & 3rd Quarter </td>
                            <td>52% for 2nd, 3rd & 4th Quarter </td>
                          </tr>
                          <tr>
                            <td>Final Price After Discount </td>
                            <td>AED 3,099 for 2 quarters </td>
                            <td>AED 4,099 for 3 quarters </td>
                            <td>AED 5,099 for 4 quarters  </td>
                          </tr>                          
                          <tr>
                            <td></td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started</td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>  
                    <div data-aos="fade-left">
                      <h2 style={{backgroundColor:'red'}}>Large Enterprise </h2> 
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>
                              
                            </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Monthly</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Quarterly </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Half Yearly</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Billed Annually</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>No. of VAT Return</td>
                            <td>1</td>
                            <td>3 </td>
                            <td>6 </td>
                            <td>12</td>
                          </tr>
                          <tr>
                            <td>Original Price </td>
                            <td rowSpan='3'>AED 2,499</td>
                            <td>AED 7,497 for 3 months  </td>
                            <td>AED 14,994 for 6 months </td>
                            <td>AED 29,988 for 12 months </td>
                          </tr>
                          <tr>
                            <td>Discount  </td>
                            <td>25% </td>
                            <td>30% </td>
                            <td>42% </td>
                          </tr>
                          <tr>
                            <td>Final Price After Discount </td>
                            <td>AED 5,599 for 3 months </td>
                            <td>AED 10,499 for 6 months </td>
                            <td>AED 16,999 for 12 months  </td>
                          </tr>
                          
                          <tr>
                            <td></td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started</td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                          </tr>
                          
                          
                        </tbody>
                      </Table>
                      
                      <Table striped bordered hover responsive>
                        <thead>
                          <tr>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>
                              
                            </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill One Quarter</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill Two Quarters </th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill Three Quarter</th>
                            <th style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold'}}>Bill Four Quarters</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>No. of VAT Return</td>
                            <td>1</td>
                            <td>2 </td>
                            <td>3 </td>
                            <td>4</td>
                          </tr>
                          <tr>
                            <td>Original Price </td>
                            <td rowSpan='3'>AED 2,999</td>
                            <td>AED 5,998 for 2 quarters </td>
                            <td>AED 8,997 for 3 quarters</td>
                            <td>AED 11,996 for 4 quarters</td>
                          </tr>
                          <tr>
                            <td>Discount  </td>
                            <td>50% for 2nd  Quarter </td>
                            <td>50% for 2nd & 3rd Quarter </td>
                            <td>50% for 2nd, 3rd & 4th Quarter </td>
                          </tr>
                          <tr>
                            <td>Final Price After Discount </td>
                            <td>AED 4,499 for 2 quarters</td>
                            <td>AED 5,999 for 3 quarters </td>
                            <td>AED 5,099 for 4 quarters  </td>
                          </tr>                          
                          <tr>
                            <td></td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started</td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started </td>
                            <td style={{backgroundColor:'#1bbd36',color:'white',fontWeight:'bold',cursor:'pointer'}}>Get Started  </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>                   
                </div>
            </section>
      </div> 
      );
    }
}
 
export default Plans;