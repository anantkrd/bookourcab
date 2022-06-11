import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Table } from 'react-bootstrap';
//import Form from 'react-bootstrap/Form';
import  Header  from "../Header";
//import  Footer  from "../Footer";
//import { Link } from 'react-router-dom'
//import { useHistory } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ClipLoader from "react-spinners/ClipLoader";
class SearchLog extends Component {
    
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff'};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {    
        this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});
        console.log("++userId**********==="+userId);        
        //this.setState({item:this.props.match.params.data});
        this.getBookingLog(userId);
      }
    
    async getBookingLog(userId){
        console.log("*****getHistory******");   
        
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          console.log("urlData=="+urlData)
          const response = await fetch('http://localhost:3001/user/get_search_log?'+urlData, { headers });
          console.log("+++response=="+response)
          const data = await response.json();
          console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              this.setState({item:data.data});
          }else{
              this.setState({error:'some internal error please try later'})
          }
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
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
        return (
            
            <div> 
                <Header/> 
                <div> 
                <ClipLoader css={override} style={{borderColor:'red'}} color={this.state.loadingColor} loading={this.state.isLoading} 
                css={override} size={150} >  </ClipLoader>
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">
                                    
                                    <Card>
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Search History </Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                    <th>sr no</th>
                                                    <th>Name </th>
                                                    <th>Pickup</th>
                                                    <th>Destination</th>
                                                    <th>Distance</th>
                                                    <th>PickupDate</th>
                                                    <th>ReturnDate</th>
                                                    <th>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.item.map(function(object, i){
                                                            return<tr> <td>{i+1}</td>
                                                                <td>{object.mobileNo}</td>
                                                                <td>{object.pickup}</td>
                                                                <td>{object.destination}</td>
                                                                <td>{object.distance}</td>
                                                                <td>
                                                                    {object.pickupDate!="0000-00-00 00:00:00"?new Intl.DateTimeFormat('en-GB', { 
                                                                        month: 'long', 
                                                                        day: '2-digit',
                                                                        year: 'numeric', 
                                                                        hour:'numeric',
                                                                        minute:'numeric',
                                                                        hour12:true
                                                                    }).format(new Date(object.pickupDate)):null
                                                                    }
                                                                 </td>
                                                                <td>
                                                                    {object.returnDate!="0000-00-00 00:00:00"?new Intl.DateTimeFormat('en-GB', { 
                                                                        month: 'long', 
                                                                        day: '2-digit',
                                                                        year: 'numeric', 
                                                                        hour:'numeric',
                                                                        minute:'numeric',
                                                                        hour12:true
                                                                    }).format(new Date(object.returnDate)):null
                                                                    }
                                                                </td>
                                                                
                                                                <td>
                                                                    {
                                                                        object.returnDate!="0000-00-00 00:00:00"?<span>
                                                                        <label>Compact:{object.distance*object.compact*2}</label>
                                                                        <label>Sedan:{object.distance*object.sedan*2}</label>
                                                                        <label>Luxury:{object.distance*object.luxury*2}</label></span>:
                                                                        <span><label>Compact:{object.distance*object.compact}</label>
                                                                        <label>Sedan:{object.distance*object.sedan}</label>
                                                                        <label>Luxury:{object.distance*object.luxury}</label></span>
                                                                    }
                                                                </td>
                                                            </tr>;
                                                        })
                                                    }
                                                    
                                                </tbody>    
                                            </Table>
                                            </div>
                                            
                                        </Card.Body>
                                    </Card>                                   
                            </div>             
                            
                        </div>

                    </div>
                    
                </section>
                 
                    
                </div>
            </div>
        );
    }
}
 
export default SearchLog;