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
import axios from "axios";
import { withRouter } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
class PendingBookingList extends Component {
    
    state = {userId:'',item:[],carData:[],driverData:[],error:'',isLoading:false,loadingColor:'#ffffff',pageNo:0,bookingId:'',showCarDialog:false,showDriverDialog:false,carNo:'',driverMobile:''};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {    
          this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});     
        this.getBooking(userId);
      }
    
    async getBooking(userId){
        //console.log("*****getBookigs******");   
        
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          //console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'agent/get_my_bookings?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          //console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
              //console.log("Here")
              this.setState({item:dataRes.data});
          }else{             
              this.setState({error:'some internal error please try later'})
          }          
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    
    setShowCarDialog=(objectData)=>{
        this.setState({bookingId:objectData.orderId});
        const currentState = this.state.showCarDialog;
        //console.log("val=="+currentState+"***");
        this.setState({showCarDialog:!currentState});
    }
    setHideCarDialog=()=>{
        const currentState = this.state.showCarDialog;
        //console.log("val=="+currentState+"***");
        this.setState({showCarDialog:!currentState});
    }
    
    setShowDriverDialog=(objectData)=>{
        this.setState({bookingId:objectData.orderId});
        let currentState = this.state.showDriverDialog;
        //console.log("val=="+currentState+"***");
        this.setState({showDriverDialog:!currentState});
    }
    setHideDriverDialog=()=>{
        let currentState = this.state.showDriverDialog;
        //console.log("val=="+currentState+"***");
        this.setState({showDriverDialog:!currentState});
    }
    setCarNo=(carNo)=>{
        this.setState({carNo:carNo.target.value});
    }
    setDriverMobile=(driverMobile)=>{
        this.setState({driverMobile:driverMobile.target.value});
    }  
    searchDriver=async()=>{
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&driverMobile="+this.state.driverMobile;
          //console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'agent/search_driver?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          //console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
              //console.log("Here")
              this.setState({driverData:dataRes.data});
              
              //console.log("++++driverData===="+this.state.driverData);
          }else{              
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
    }  
    searchCar=async()=>{
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&carno="+this.state.carNo;
          //console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'agent/search_car?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          //console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
              //console.log("Here")
              this.setState({carData:dataRes.data});
          }else{              
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
    }
    selectDriver=async(objectData)=>{
        //console.log("Booiking id=="+this.state.bookingId);
        //console.log(objectData);
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
        let driverName=objectData.firstName+" "+objectData.lastName;
        const data = {
            agentId: this.state.userId,
            driverId: objectData.id,
            driverName: driverName,
            mobileNo:objectData.mobileNo,
            bookingId:this.state.bookingId,
            contactNo:this.state.email
        };
        const result = await axios.post(global.config.apiUrl+"agent/assign_booking_driver", data,{ headers });
        //console.log("+++response=="+JSON.stringify(result));        
        if(result.data.code==200){            
            this.setState({error:result.data.msg});
            this.setHideDriverDialog();            
            this.getBooking(this.state.userId);
        }else{             
             console.log("errorr")
            this.setState({error:'some internal error please try later'})
        }          
        this.setState({isLoading:false}); 
    }
    
    selectCar=async(objectData)=>{
       // console.log(objectData)
        //console.log("Booiking id=="+this.state.bookingId);
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
        const data = {
            agentId: this.state.userId,
            carId: objectData.id,
            modelName: objectData.carModelName,
            carNo:objectData.carNo,
            carType:objectData.carType,
            bookingId:this.state.bookingId
        };
        
        const result = await axios.post(global.config.apiUrl+"agent/assign_booking_car", data,{ headers });
        //console.log("+++response=="+JSON.stringify(result));        
        if(result.data.code==200){            
            this.setState({error:result.data.msg});
            this.setHideCarDialog(); 
            this.getBooking(this.state.userId);
        }else{             
             //console.log("errorr")
            this.setState({error:'some internal error please try later'})
        }          
        this.setState({isLoading:false}); 
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
                <ClipLoader css={override} style={{borderColor:'red'}} color={this.state.loadingColor} loading={this.state.isLoading}  size={150} >  </ClipLoader>
                </div>
                
                
                <div> 
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">
                                    
                                    <Card>
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>My Pending Bookings </Card.Title>
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
                                                    <th>Booking Amount</th>
                                                    <th>Driver</th>
                                                    <th>Car</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.item.map((object, i)=>{
                                                            return<tr> 
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
                                                                <td>{object.agentPrice}</td>
                                                                <td>{object.agentPaid}</td>                                                                
                                                                <td>
                                                                    { object.driverId>0?<div>{object.driverName} {object.driverContact}</div>:<Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                        <Button variant="primary" type="button" onClick={this.setShowDriverDialog.bind(this,object)}>
                                                                            Driver
                                                                        </Button>                                                                                                       
                                                                    </Form.Group>
                                                                    }
                                                                    
                                                                </td>
                                                                <td>
                                                                { object.carId>0?<div>{object.gadiModel} {object.gadiNo}</div>:<Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                                        <Button variant="primary" type="button" onClick={this.setShowCarDialog.bind(this,object)}>
                                                                            Car
                                                                        </Button>                                                                                                       
                                                                    </Form.Group>
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
                <Modal show={this.state.showCarDialog} onHide={this.setHideCarDialog.bind(this.state.showCarDialog)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                        <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Select Car
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <section id="pricing" className="pricing">
                        <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>                        
                            <div className="row">  
                                <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 5 }}>
                                    <div>
                                        <Form.Group controlId="formBasicEmail" >
                                            <Form.Control type="text" placeholder="Search by Number" value={this.state.carNo} onChange={this.setCarNo}/>                                                                                                        
                                        </Form.Group>
                                    </div>
                                    <div >
                                        <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                            <Button variant="primary" type="button" onClick={this.searchCar.bind(this)}>
                                                Search
                                            </Button>                                                                                                       
                                        </Form.Group>
                                    </div>
                                </div>        
                            </div>
                        </div>
                        
                    </section>
                    <section id="pricing" className="pricing">
                        <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>                        
                            <div className="row">  
                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                    <th>Model Name</th>
                                                    <th>Type </th>
                                                    <th>carNo</th>
                                                    <th>#</th>
                                                    </tr>
                                                </thead>
                                                <tbody> 
                                    {
                                        this.state.carData.map((object, i)=>{
                                        return <tr><td>
                                                {object.carModelName}
                                                </td>
                                                <td>
                                                {object.carType}
                                                </td>
                                                <td>
                                                {object.carNo}
                                                </td>
                                                <td>
                                                    <Button variant="primary" type="button" onClick={this.selectCar.bind(this,object)}>
                                                        Select
                                                    </Button> 
                                                </td>
                                        </tr>;
                                        })
                                    }  </tbody>
                                </Table>       
                            </div>
                        </div>
                        
                    </section>
                    </Modal.Body>
                </Modal>
                <Modal show={this.state.showDriverDialog} onHide={this.setHideDriverDialog.bind(this.state.showDriverDialog)} dialogClassName="modal-90w"  aria-labelledby="example-custom-modal-styling-title">
                        <Modal.Header closeButton>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Select Driver
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <section id="pricing" className="pricing">
                            <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>                        
                                <div className="row">  
                                    <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2)", gridGap: 5 }}>
                                        <div>
                                            <Form.Group controlId="formBasicEmail" >
                                                <Form.Control type="text" placeholder="Search by mobile no." value={this.state.driverMobile} onChange={this.setDriverMobile}/>                                                                                                        
                                            </Form.Group>
                                        </div>
                                        <div >
                                            <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                <Button variant="primary" type="button" onClick={this.searchDriver.bind(this)}>
                                                    Search
                                                </Button>                                                                                                       
                                            </Form.Group>
                                        </div>
                                    </div>        
                                </div>
                            </div>
                        
                        </section>
                        
                        <section id="pricing" className="pricing">
                            <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>     
                                           
                                <div className="row"> 
                                <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                    <th>Name</th>
                                                    <th>Mobile </th>
                                                    <th>Lincese No</th>
                                                    <th>#</th>
                                                    </tr>
                                                </thead>
                                                <tbody> 
                                    {
                                        this.state.driverData.map((object, i)=>{
                                        return <tr><td>
                                                {object.firstName} {object.lastName}
                                                </td>
                                                <td>
                                                {object.mobileNo}
                                                </td>
                                                <td>
                                                {object.idNumber}
                                                </td>
                                                <td>
                                                    <Button variant="primary" type="button" onClick={this.selectDriver.bind(this,object)}>
                                                        Select
                                                    </Button> 
                                                </td>
                                        </tr>;
                                        })
                                    }  </tbody>
                                </Table>
                                </div>
                            </div>
                        
                        </section>
                        </Modal.Body>
                </Modal>
            </div>
        );
    }
}
 
export default withRouter(PendingBookingList);