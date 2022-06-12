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
class AddCar extends Component {
    
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',pageNo:0,payment_orderId:'',carModelName:'',carType:'',carNo:'',rcBook:''};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {    
          this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});
        //console.log("++userId**********-------------==="+userId);        
        //this.setState({item:this.props.match.params.data});
        this.getCars(userId);
      }
    
      showPopup(object){
        console.log("Here confirm");
        this.prePayment(object);
      }
    async getCars(userId){
        console.log("*****get cars******");   
        
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          const response = await fetch(global.config.apiUrl+'agent/get_cars?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          //console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
              console.log("Here")
              this.setState({item:dataRes.data});
          }else{              console.log("errorr")
              this.setState({error:'some internal error please try later'})
          }          
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    addCar=async ()=>{
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        const headers = {'Authorization':`Bearer ${token}`} ;
        let carModelNo='';
        let carNo='';
          let urlData="&userId="+this.state.userId+"&carModelNo="+this.state.carModelName+"&carNo="+this.state.carNo+"&carType="+this.state.carType+"&rcBook="+this.state.rcBook;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          //console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'agent/add_car?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
         // console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
              //console.log("Here")
              this.setState({item:dataRes.data});
          }else{              console.log("errorr")
              this.setState({error:'some internal error please try later'})
          }          
          this.setState({isLoading:false});        
    }
    onInputHandler(e){
        const {name, value} = e.target;
        console.log("name="+name+"***value="+value);
       //this.setState({name: value});
  
    }
    setCarModelName =(carModelName)=>{
        this.setState({carModelName:carModelName.target.value});
    }
    setCarNo =(carNo)=>{
        this.setState({carNo:carNo.target.value});
    }
    setCarType =(carType)=>{
        this.setState({carType:carType.target.value});
    }
    setRcBook =(rcBook)=>{
        console.log("rcBook==="+rcBook);
        //this.setState({rcBook:rcBook});
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
                                        <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Add Car
                                            
                                        </Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                                {this.state.error}
                                            </div>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Car Model Name</Form.Label>
                                                        <Form.Control name="carModelName" type="text" placeholder="Car Model Name`" value={this.state.item.carModelName} onChange={this.setCarModelName} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Car No.</Form.Label>
                                                        <Form.Control name="carNo" type="text" placeholder="Car No." value={this.state.carNo} onChange={this.setCarNo}/>                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                    <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Type</Form.Label>
                                                        <Form.Control name="carType" type="text" placeholder="sedan, conpact, luxury" value={this.state.carType} onChange={this.setCarType} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>RC Book</Form.Label>
                                                        <Form.Control name="rcBook" type="file"  placeholder="RC Book" value={this.state.rcBook} onChange={this.setRcBook}/>                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12">        
                                                
                                                <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                    <Button variant="primary" type="button" onClick={this.addCar.bind(this)}>
                                                        Add Car
                                                    </Button>                                                                                                       
                                                </Form.Group>
                                            </div>                                            
                                        </Card.Body>
                                    </Card>                                    
                            </div>             
                            
                        </div>
                        <br/>
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">
                                    
                                    <Card>
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>My Cars </Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                    <th>Car model</th>
                                                    <th>Number </th>
                                                    <th>Type</th>
                                                    <th>Rc</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.item.map((object, i)=>{
                                                            return<tr> 
                                                                <td>{object.carModelName}</td>
                                                                <td>{object.carNo}</td>
                                                                <td>{object.carType}</td>
                                                                <td>{object.rcBook}</td>
                                                                
                                                                
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
 
export default AddCar;