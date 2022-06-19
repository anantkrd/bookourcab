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
class Profile extends Component {
    
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',pageNo:0,mobileNo:'',firstName:''};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {    
          this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});
        console.log("++userId**********-------------==="+userId);        
        //this.setState({item:this.props.match.params.data});
        this.getProfile(userId);
      }
    
    async getProfile(userId){
        console.log("*****getBookigs******");   
        
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        console.log("token==="+token);
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'user/get_user_byid?'+urlData, { headers });
          //console.log("+++response=="+JSON.stringify(response))
          const dataRes = await response.json();
          console.log("Data="+JSON.stringify(dataRes));
          
          if(dataRes.code==200){
              console.log("Here")
              this.setState({item:dataRes.data[0]});
          }else{              console.log("errorr")
              this.setState({error:'some internal error please try later'})
          }
          
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    
    loadScript=(src) =>{
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);

            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    

    async addProfile(){

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
                                        <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Profile</Card.Title>
                                        <Card.Body>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>First Name</Form.Label>
                                                        <Form.Control type="text" placeholder="First Name" value={this.state.item.firstName} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Last Name</Form.Label>
                                                        <Form.Control type="text" placeholder="Last Name" value={this.state.item.lastName} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                    <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Mobile No.</Form.Label>
                                                        <Form.Control type="text" placeholder="Mobile No" value={this.state.item.mobileNo} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type="email" placeholder="Mobile No" value={this.state.item.email} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Diver License</Form.Label>
                                                        <Form.Control type="text" placeholder="License No" value={this.state.item.idNumber} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Upload License</Form.Label>
                                                        <Form.Control type="file" placeholder="Select License" value={this.state.item.licenseLink} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            <div className="col-12">        
                                                
                                                <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                    <Button variant="primary" type="button" onClick={this.addProfile.bind(this)}>
                                                        Update
                                                    </Button>                                                                                                       
                                                </Form.Group>
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
 
export default Profile