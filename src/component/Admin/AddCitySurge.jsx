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
class AddCitySurge extends Component {
    
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',pageNo:0,cityName:'',cabType:'',surge:''};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {    
          this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});
               
        //this.setState({item:this.props.match.params.data});
        this.getSurge(userId);
      }
    
      showPopup(object){
        
        this.prePayment(object);
      }
    async getSurge(userId){       
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          const response = await fetch(global.config.apiUrl+'admin/get_surge?'+urlData, { headers });
          console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
              
              this.setState({item:dataRes.data});
          }else{              console.log("errorr")
              //this.setState({error:'No data found'})
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
        if(this.state.carModelName=="" || this.state.carModelName==null){
            this.setState({error:"Please enter car model name"});
            return false;
        }
        if(this.state.carNo=="" || this.state.carNo==null){
            this.setState({error:"Please enter car number"})
            return false;
        }
        
        if(this.state.carType=="" || this.state.carType==null){
            this.setState({error:"Please enter car type"})
            return false;
        }
        
        /*if(this.state.rcBook=="" || this.state.rcBook==null){
            this.setState({error:"Please upload rc book"})
            return false;
        }*/
          let urlData="&userId="+this.state.userId+"&carModelNo="+this.state.carModelName+"&carNo="+this.state.carNo+"&carType="+this.state.carType+"&rcBook="+this.state.rcBook;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          
          const response = await fetch(global.config.apiUrl+'agent/add_car?'+urlData, { headers });
          
          const dataRes = await response.json();
          
          if(dataRes.code==200){
              
              this.setState({error:'Car added successfully'});
              this.getCars(this.state.userId);
          }else{              console.log("errorr")
              this.setState({error:'some internal error please try later'})
          }          
          this.setState({isLoading:false});        
    }
    onInputHandler(e){
        const {name, value} = e.target;
       
       //this.setState({name: value});
  
    }
    setCityName =(cityName)=>{
        this.setState({cityName:cityName.target.value});
    }
    setCabType =(cabType)=>{
        this.setState({cabType:cabType.target.value});
    }
    setSurge =(surge)=>{
        this.setState({surge:surge.target.value});
    }
    editSurge(dataObj){
        console.log("dataObj:"+dataObj);
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
                                        <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Add Surge
                                            
                                        </Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                                {this.state.error}
                                            </div>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>City Name <spam style={{color:'red'}}>*</spam></Form.Label>
                                                        <Form.Control name="cityName" type="text" placeholder="City Name" value={this.state.cityName} onChange={this.setCityName} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                
                                                </div>
                                            </div>
                                            
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                    <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Surge <spam style={{color:'red'}}>*</spam></Form.Label>
                                                        <Form.Control name="surge" type="text" placeholder="Surge Amount" value={this.state.surge} onChange={this.setSurge} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12">        
                                                
                                                <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                    <Button variant="primary" type="button" onClick={this.addCar.bind(this)}>
                                                        Add Surge
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
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>City/District-wise surge </Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>City</th>
                                                        <th>Surge </th>
                                                        <th># </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.item.map((object, i)=>{
                                                            return<tr> 
                                                                <td>{object.id}</td>
                                                                <td>{object.city}</td>
                                                                <td>{object.surge}</td> 
                                                                <td>
                                                                    <Button style={{float:'right',marginRight:5}} variant="primary" type="button" onClick={this.editSurge.bind(this,object)}>
                                                                        <i className="fa fa-edit" aria-hidden="true"></i>
                                                                    </Button>&nbsp;&nbsp;
                                                                     <Button style={{float:'right',marginRight:5}} variant="primary" type="button" onClick={this.editSurge.bind(this,object)}>
                                                                        <i className="fa fa-remove" aria-hidden="true"></i>
                                                                    </Button>
                                                                    
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
 
export default withRouter(AddCitySurge);