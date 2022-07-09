import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Button,Table,Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import  Header  from "../Header";
import  Footer  from "../Footer";
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class Home extends Component {
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',pageNo:0,showStartTrip:false,showEndTrip:false,startkm:0,endkm:0};
    super(){
        this.showLogin.bind(this);
        this.showRegister.bind(this);
    }
    
    componentDidMount() {    
        this.setState({isLoading:true});      
     let userId=localStorage.getItem("userId");
     this.setState({userId:userId});     
      //this.setState({item:this.props.match.params.data});
      this.getBooking(userId);
    }
    async getBooking(userId){
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          const response = await fetch(global.config.apiUrl+'driver/get_my_trip?'+urlData, { headers });
          
          const dataRes = await response.json();
                    
          if(dataRes.code==200){
              this.setState({item:dataRes.data});
          }else{              console.log("errorr")
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    startTrip=()=>{

    }
    showStartTrip=()=>{
        this.setState({startkm:0});
        const currentState = this.state.showStartTrip;
        
        this.setState({showStartTrip:!currentState});
    }
    showEndTrip=()=>{
        this.setState({endkm:0});
        const currentState = this.state.showEndTrip;
        
        this.setState({showEndTrip:!currentState});
    }
    setTripStart=(mobile)=>{
        
        this.setState({startkm:mobile.target.value})
    }
    setMobile=(mobile)=>{
        
        this.setState({startkm:mobile.target.value})
    }
    saveStartKM=async()=>{
        let userId=localStorage.getItem("userId");
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          const response = await fetch(global.config.apiUrl+'driver/start_trip?'+urlData, { headers });
          
          const dataRes = await response.json();
                    
          if(dataRes.code==200){
              this.setState({item:dataRes.data});
          }else{              console.log("errorr")
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
        
    }
    
    setTripEnd=(endkm)=>{
        this.setState({endkm:endkm.target.value})
    }
    
    saveEndKM=async()=>{
        let userId=localStorage.getItem("userId");
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          const response = await fetch(global.config.apiUrl+'driver/end_trip?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
                    
          if(dataRes.code==200){
              this.setState({item:dataRes.data});
          }else{              console.log("errorr")
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
        
    }
    render() { 
        return (
            <div> 
                <Header/>    
                    
                <div>
                <section id="about-us" className="about-us">
                        <div className="container" data-aos="fade-up">                   
                            
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">
                                    
                                    <Card>
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>MY upcomming Trip </Card.Title>
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
                                                    <th>Trip Status</th>
                                                    <th>Journy Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.item.map((object, i)=>{
                                                            return<tr> 
                                                                <td><Link variant="success" style={{padding: "4px",fontSize: 12, textAlign: "center"}} to={{ pathname: `/driver/trip-details/${object.orderId}`}} >{object.orderId}</Link></td>
                                                                <td>{object.userName} ({object.mobileNo})</td>
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
                                                                <td>{object.agentPrice}</td>
                                                                <td><Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                        {
                                                                            object.status
                                                                        } 
                                                                                                                                                                             
                                                                    </Form.Group>
                                                                </td>
                                                                <td><Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                        {
                                                                            object.journyStatus
                                                                        } 
                                                                                                                                                                             
                                                                    </Form.Group>
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
                <Modal show={this.state.showStartTrip} onHide={this.showStartTrip.bind(this.state.showStartTrip)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Trip Starting KM
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
                                                                <Form.Label>Enter Start KM</Form.Label>
                                                                
                                                                <Form.Control name="startkm" value={this.state.startkm} type="text" placeholder="Mobile No" onChange={this.setTripStart} />                                                                                                        
                                                            </Form.Group>
                                                        </div> 
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                <Button variant="primary" type="button" onClick={this.saveStartKM.bind(this)}>
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
                <Modal show={this.state.showEndTrip} onHide={this.showEndTrip.bind(this.state.showEndTrip)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                    <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Trip Ending KM
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
                                                                <Form.Label>Enter End KM</Form.Label>
                                                                <Form.Control name="endkm" value={this.state.endkm} type="text" placeholder="Trip End KM" onChange={this.setTripEnd} />                                                                                                        
                                                            </Form.Group>
                                                        </div> 
                                                        <div className="col-12">
                                                            <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                <Button variant="primary" type="button" onClick={this.saveEndKM.bind(this)}>
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
                <Footer/>

            </div>
        );
    }
}
 
export default withRouter(Home);