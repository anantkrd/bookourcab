import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table,Select } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import  Header  from "../Header";
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-bootstrap/Modal'
import Pagination from "@material-ui/lab/Pagination";
import { withRouter } from 'react-router-dom';
class AdminHome extends Component {
    
    state = {agents:[],agentId:'',userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',show:false,showAgent:false,error:'',agentAmont:0,bookingId:0,pageId:0,rowCount:0,totalPage:0};
    constructor(props) {
        super(props);    
        
      }
      
    componentDidMount() {    
          this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});
       this.setState({pageId:0});
        //console.log("++userId**********==="+userId);        
        //this.setState({item:this.props.match.params.data});
        this.getBooking(userId,1);
        this.getAgents(userId,1);
    }
    
    async getAgents(userId,pageId){
        //console.log("*****get admin home******");   
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;  
        let urlData="&userId="+userId+"&pageId="+pageId;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          
          const response = await fetch(global.config.apiUrl+'admin/get_agent?'+urlData, { headers });
        //const headers = { 'Content-Type': 'application/json' } 
        
          //console.log("+++response=="+response)
          const data = await response.json();
         // console.log("Data="+JSON.stringify(data));
          
          if(data.code==200){
            console.log("Agent Data="+JSON.stringify(data.data));
              this.setState({agents:data.data});
          }else{
              if(data.code==200){
                this.setState({error:'Session expired'});
              }
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    async getBooking(userId,pageId=1){
        //console.log("*****get admin home******");   
        
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
        
          let urlData="&userId="+userId+"&pageId="+pageId;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          //console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'admin/get_booking_admin?'+urlData, { headers });
          //console.log("+++response=="+response)
          const data = await response.json();
         // console.log("Data="+JSON.stringify(data));
          this.setState({totalPage:data.totalPage});
          this.setState({rowCount:data.rowCount});
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
        //console.log("Here ..."+JSON.stringify(object))
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
        //console.log("val=="+currentState+"***");
        this.setState({show:!currentState});
    }
    setShowAgentPopup=async(object)=>{        
        this.setState({agentId:0});
        const currentState = this.state.showAgent;
        console.log("val=="+currentState+"***");
        this.setState({bookingId:object.bookingId});
        this.setState({showAgent:!currentState});
    }
    setShowAgent=async(object)=>{        
        this.setState({agentId:0});
        const currentState = this.state.showAgent;
        console.log("val=="+currentState+"***");
        this.setState({showAgent:!currentState});
    }
    assignAgent=async(obj)=>{
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
        let urlData="&agentId="+this.state.agentId+"&bookingId="+this.state.bookingId;
        const response = await fetch(global.config.apiUrl+'admin/assign_agent?'+urlData, { headers });
         // console.log("+++response=="+response)
          const data = await response.json();
          //console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              //this.setState({item:data.data});
              const currentState = this.state.showAgent;
              //console.log("val=="+currentState+"***");
              this.setState({showAgent:!currentState});
              this.getBooking(this.state.userId,1);
          }else{
              if(data.code==200){
                this.setState({error:'Session expired'});
              }
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
    }
    async addAgentPrice(bookingId){
     //console.log("here in add")   ;
     if(this.state.agentAmont<1){
         this.setState({error:"amount must be >0"});
     }else{
        this.setState({error:''});
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&amount="+this.state.agentAmont+"&bookingId="+this.state.bookingId;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          //console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'admin/update_agent_amount?'+urlData, { headers });
         // console.log("+++response=="+response)
          const data = await response.json();
          //console.log("Data="+JSON.stringify(data));
          if(data.code==200){
              //this.setState({item:data.data});
              const currentState = this.state.show;
              //console.log("val=="+currentState+"***");
              this.setState({show:!currentState});
              this.getBooking(this.state.userId,1);
          }else{
              if(data.code==200){
                this.setState({error:'Session expired'});
              }
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
        
     }
    }
    handlePageChange=async(event, value)=>{
        //this.setState({pageId:value});
        let userId=this.state.userId;
        let pageId=value;
        this.getBooking(userId,pageId);
    }
    setAgentId=(id)=>{
        console.log(this.state.bookingId+"Agent Id=="+id);
        this.setState({agentId:id});
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
                <ClipLoader css={override} style={{borderColor:'red'}} color={this.state.loadingColor} loading={this.state.isLoading} size={150} >  </ClipLoader>
                </div>
                
                
                <div> 
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">
                                    
                                    <Card>
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Bookings </Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                    <th>BookingId.</th>
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
                                                                <td><Link variant="success" style={{padding: "4px",fontSize: 12, textAlign: "center"}} to={{ pathname: `/BookingDetails/${object.bookingId}`}} >{object.bookingId}</Link></td>
                                                                <td>{object.userName}({object.mobileNo})</td>
                                                                <td>{object.pickup}</td>
                                                                <td>{object.destination}</td>
                                                                <td>
                                                                    {object.pickupDate!=="0000-00-00 00:00:00"?new Intl.DateTimeFormat('en-GB', { 
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
                                                                    {object.returnDate!=="0000-00-00 00:00:00"?new Intl.DateTimeFormat('en-GB', { 
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
                                                                        <div className="col-12" style={{paddingTop:5}}>
                                                                            <Button style={{float:'right'}} size="sm" variant="primary" type="button" onClick={this.showPopup.bind(this,object)}>
                                                                                Update
                                                                            </Button>
                                                                        </div>
                                                                    </div>:<div className="row" style={{paddingTop:5}}>
                                                                        <div className="col-12">
                                                                            <Button style={{float:'right'}} size="sm" variant="primary" type="button" onClick={this.showPopup.bind(this,object)}>
                                                                                Add Amount
                                                                            </Button>
                                                                        </div>
                                                                    </div>}
                                                                    {object.agentId<=0?<div className="row" style={{color:"red",fontSize:14}}>
                                                                        {object.agentId}
                                                                        <div className="col-12" style={{paddingTop:5}}>
                                                                            <Button style={{float:'right'}} size="sm" variant="primary" type="button" onClick={this.setShowAgentPopup.bind(this,object)}>
                                                                                Add Agent
                                                                            </Button>
                                                                        </div>
                                                                    </div>:<div className="row" style={{paddingTop:5}}>
                                                                        <div className="col-12">
                                                                            <Button style={{float:'right'}} size="sm" variant="primary" type="button" onClick={this.setShowAgentPopup.bind(this,object)}>
                                                                                Update Agent
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
                                            <div>
                                            <Pagination
                                                className="paging"
                                                count={this.state.totalPage}
                                                page={this.state.rowCount}
                                                siblingCount={1}
                                                boundaryCount={1}
                                                variant="outlined"
                                                shape="rounded"
                                                onChange={this.handlePageChange.bind()}
                                            />
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

                <Modal show={this.state.showAgent} onHide={this.setShowAgent.bind(this.state.showAgent)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Select Agent
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
                                                    <Form.Group controlId="formBasicSelect">
                                                        <Form.Label>Select Norm Type</Form.Label>
                                                        <Form.Control as="select" value={this.state.agentId}
                                                            onChange={e => {
                                                                console.log("e.target.value", e.target.value);
                                                                this.setAgentId(e.target.value);
                                                            }}
                                                            >
                                                                <option value="0">Select Agent</option>
                                                                {
                                                                    this.state.agents.map((object, i) =>{
                                                                        return <option value={object.id}>{object.firstName}</option>
                                                                    })
                                                                }                                                       
                                                        
                                                        </Form.Control>
                                                    </Form.Group>
                                                    </div> 
                                                    <div className="col-12">
                                                        <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                            <Button variant="primary" type="button" onClick={this.assignAgent.bind(this)}>
                                                                Assign
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
 
export default withRouter(AdminHome);