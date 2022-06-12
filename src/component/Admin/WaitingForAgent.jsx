import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import  Header  from "../Header";
import  Footer  from "../Footer";
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-bootstrap/Modal'

class WaitingForAgent extends Component {
    
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',show:false,error:'',agentAmont:0,bookingId:0};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));  
        //this.setShow.bind(this);
      }
      
    componentDidMount() {    
          this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});
        console.log("++userId**********==="+userId);        
        //this.setState({item:this.props.match.params.data});
        this.getBooking(userId);
    }
    
    async getBooking(userId){
        console.log("*****get admin home******");   
        
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'admin/get_waiting_agent_bookings?'+urlData, { headers });
          console.log("+++response=="+response)
          const data = await response.json();
          console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              this.setState({item:data.data});
          }else{
              if(data.code==200){
                this.setState({error:'Session expired'});
              }
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    showPopup(object){
        console.log("Here ..."+JSON.stringify(object))
        this.setState({agentAmont:0});
        this.setState({error:''});
        const currentState = this.state.show;
        //console.log("val=="+currentState+"***");
        this.setState({bookingId:object.bookingId});
        this.setState({show:!currentState});
    }
    setAgentAmont=(amount)=>{
        console.log("===="+amount.target.value);
        this.setState({agentAmont:amount.target.value});        
    }
    
    setShow=(val)=>{
        this.setState({agentAmont:0});
        const currentState = this.state.show;
        console.log("val=="+currentState+"***");
        this.setState({show:!currentState});
    }
    async addAgentPrice(bookingId){
     console.log("here in add")   ;
     if(this.state.agentAmont<1){
         this.setState({error:"amount must be >0"});
     }else{
        this.setState({error:''});
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&amount="+this.state.agentAmont+"&bookingId="+this.state.bookingId;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'user/update_agent_amount?'+urlData, { headers });
          console.log("+++response=="+response)
          const data = await response.json();
          console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              this.setState({item:data.data});
              this.getBooking(this.state.userId);
          }else{
              if(data.code==200){
                this.setState({error:'Session expired'});
              }
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
        
     }
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
                </div>
                
                
                <div> 
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">
                                    
                                    <Card>
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Wating for Agent Confirmation</Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                    <th>BookingId</th>
                                                    <th>Name </th>
                                                    <th>Pickup</th>
                                                    <th>Destination</th>
                                                    <th>PickupDate</th>
                                                    <th>ReturnDate</th>
                                                    <th>Amount</th>
                                                    <th>Paid</th>
                                                    <th>Agent Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                       this.state.item.map((object, i) =>{
                                                           return <tr> 
                                                                <td><Link variant="success" style={{padding: "4px",fontSize: 12, textAlign: "center"}} to={{ pathname: `/BookingDetails/${object.orderId}`}} >{object.orderId}</Link></td>
                                                                <td>{object.userName}({object.mobileNo})</td>
                                                                <td>{object.pickup}</td>
                                                                <td>{object.destination}</td>
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
                                                                <td>{object.finalAmount}</td>
                                                                <td>{object.paid}</td>
                                                                <td>
                                                                    {object.agentPrice>0?<div className="row" style={{color:"red",fontSize:14}}>
                                                                        {object.agentPrice}
                                                                        <div className="col-12">
                                                                            <Button style={{float:'right'}} variant="primary" type="button" onClick={this.showPopup.bind(this,object)}>
                                                                                Update
                                                                            </Button>
                                                                        </div>
                                                                    </div>:<div className="row" style={{color:"red",fontSize:14}}>
                                                                        <div className="col-12">
                                                                            <Button style={{float:'right'}} variant="primary" type="button" onClick={this.showPopup.bind(this,object)}>
                                                                                Add Amount
                                                                            </Button>
                                                                        </div>
                                                                    </div>}
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

                
                <Modal show={this.state.show} onHide={this.setShow.bind(this.state.show)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Add Amount
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <section id="pricing" className="pricing">
                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>                        
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">                                    
                                    <Card>                                        
                                        <Card.Body>
                                            <div className="col-lg-12 col-md-12" style={{color:'red'}}>{this.state.error}</div>
                                            <div >
                                                    <div className="col-12">
                                                        <Form.Group controlId="formBasicEmail" >
                                                            <Form.Label>Enter agent amount</Form.Label>
                                                            <Form.Control name="mobileNo" value={this.state.agentAmont} type="text" placeholder="Mobile No" onChange={this.setAgentAmont} />                                                                                                        
                                                        </Form.Group>
                                                    </div> 
                                                    <div className="col-12">
                                                        <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                            <Button variant="primary" type="button" onClick={this.addAgentPrice.bind(this)}>
                                                                Save
                                                            </Button>                                                                                                       
                                                        </Form.Group>
                                                    </div>
                                                </div>
                                            
                                            
                                        </Card.Body>
                                    </Card>                                   
                            </div> 
                        </div>
                    </div>
                    
                </section>
                    </Modal.Body>
                </Modal>
            </div>
            
        );
    }
}
 
export default WaitingForAgent;