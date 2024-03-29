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
import { faCommentSlash } from '@fortawesome/free-solid-svg-icons';
class AddDriver extends Component {
    
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',pageNo:0,firstName:'',lastName:'',mobileNo:'',email:'',licenseNo:'',
    licenseUrl:'',licenseFile:'',licenseFileName:'',imageData:''};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {    
        this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});
             
        //this.setState({item:this.props.match.params.data});
        this.getDrivers(userId);
      }
    
      showPopup(object){
        
        this.prePayment(object);
      }
    async getDrivers(userId){
        
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageNo;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
         try{
            const response = await fetch(global.config.apiUrl+'agent/get_drivers?'+urlData, { headers });
            //console.log("+++response=="+JSON.stringify(response))
            const dataRes = await response.json();
            
            
            if(dataRes.code==200){
                
                this.setState({item:dataRes.data});
            }else{              console.log("errorr")
                //this.setState({error:'some internal error please try later'})
            }
            
         }catch(error) {
            console.log(error)
          }
          
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    
    addDriver=async ()=>{
        let token=localStorage.getItem("token");
        let pageNo=this.state.pageNo+1;
        const headers = {'Authorization':`Bearer ${token}`} ;
        let carModelNo='';
        let carNo='';
        if(this.state.firstName=="" || this.state.firstName==null){
            this.setState({error:"Please enter first name"})
            return false;
        }
        if(this.state.lastName=="" || this.state.lastName==null){
            this.setState({error:"Please enter last name"})
            return false;
        }
        if(this.state.mobileNo=="" || this.state.mobileNo==null){
            this.setState({error:"Please enter mobile number"})
            return false;
        }
        if(this.state.licenseNo=="" || this.state.licenseNo==null){
            this.setState({error:"Please enter license number"})
            return false;            
        }
        /*if(this.state.licenseUrl=="" || this.state.licenseUrl==null){
            this.setState({error:"Please upload license photo"})
            return false;
        }*/
          let urlData="&userId="+this.state.userId+"&firstName="+this.state.firstName+"&lastName="+this.state.lastName+"&mobileNo="+this.state.mobileNo+"&email="+this.state.email+"&licenseNo="+this.state.licenseNo+"&licenseUrl="+this.state.licenseUrl;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          
          //const response = await fetch('http://localhost:3001/agent/add_driver?'+urlData, { headers });
          const data = {
            userId: this.state.userId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            mobileNo:this.state.mobileNo,
            email:this.state.email,
            licenseNo:this.state.licenseNo,
            licenseUrl:this.state.licenseUrl,
        };
        //console.log("payment Responce=="+JSON.stringify(response));

        const result = await axios.post(global.config.apiUrl+"agent/add_driver", data,{ headers });

          if(result.data.code==200){            
              this.setState({error:result.data.msg});
              this.getDrivers(this.state.userId);
          }else{            
               
              this.setState({error:result.data.msg})
          }          
          this.setState({isLoading:false});     
    }
    setFirstName =(firstName)=>{
        this.setState({firstName:firstName.target.value});
    }
    
    setLastName =(lastName)=>{
        this.setState({lastName:lastName.target.value});
    }
    setMobileNo =(mobileNo)=>{
        this.setState({mobileNo:mobileNo.target.value});
    }
    setEmail =(email)=>{
        this.setState({email:email.target.value});
    }
    setLicenseNo =(licenseNo)=>{
        this.setState({licenseNo:licenseNo.target.value});
    }
    setLicenseUrl =async(event)=>{
        this.setState({error:""});
        
        console.log("File Details=="+event.target.files[0]);
        console.log("size=="+JSON.stringify(event.target.files[0]));
        console.log("name=="+event.target.files[0].name);
        if(event.target.files[0].size>512000){
            this.setState({error:"Max file size allowed 500KB"});
            return false;
        }
        
        this.setState({licenseFile:event.target.files[0]});
        this.setState({licenseUrl:event.target.files[0].name});
        this.setState({licenseFileName:event.target.files[0].name});
        /*
            try {
                const formData = new FormData();
                //formData.append("fileName", event.target.files[0].name);
                formData.append("file", event.target.files[0]);
                console.log(":"+formData);
                const configData = {
                    headers: {              
                      'content-type': 'multipart/form-data',              
                    },              
                  };
                  let res = await fetch(
                    global.config.apiUrl+"agent/uploadfile",
                    {
                      method: 'post',
                      body: formData,
                      headers: {
                        'Content-Type': 'multipart/form-data; ',
                      },
                    }
                  );
                  let responseJson = await res.json();
                  if (responseJson.status == 1) {
                    alert('Upload Successful');
                  }else{

                  }
              } catch (ex) {
                console.log(ex);
              }*/

    }
    UploadImage =async (event) => {
        console.log("licenseFile=="+this.state.licenseFile.name);
        //event.preventDefault()
        
        try {
            //const result = await axios.post(global.config.apiUrl+"agent/add_driver", data,{ headers });
            let formData = new FormData();
            formData.append("fileName", this.state.licenseFileName);
            formData.append("file", this.state.licenseFile);
            console.log(":"+JSON.stringify(formData));
            try {
                const res = await axios.post(
                    global.config.apiUrl+"agent/uploadfile",
                    formData
                );
                console.log("Response:"+res);
              } catch (ex) {
                console.log(ex);
              }
              return false;
          const response = await axios({
            method: "post",
            url: global.config.apiUrl+"agent/uploadfile",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          });
        } catch(error) {
          console.log(error)
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
                <ClipLoader css={override} style={{borderColor:'red'}} color={this.state.loadingColor} loading={this.state.isLoading}  size={150} >  </ClipLoader>
                </div>
                
                
                <div> 
                <section id="pricing" className="pricing">

                    <div className="container" data-aos="fade-up" style={{width:'95%!important'}}>
                        
                        <div className="row">                       
                            <div className="col-lg-12 col-md-12">
                                    
                                <Card>
                                        <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>Add Driver</Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                                {this.state.error}
                                            </div>
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>First Name<span style={{color:'red'}}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="First Name" value={this.state.firstName} onChange={this.setFirstName}/>                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div >
                                                    <Form.Group controlId="formBasicEmail">
                                                        <Form.Label>Last Name<span style={{color:'red'}}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="Last Name" value={this.state.lastName} onChange={this.setLastName} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                    <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Mobile No<span style={{color:'red'}}>*</span></Form.Label>
                                                        <Form.Control type="number" placeholder="Mobile No" value={this.state.mobileNo} onChange={this.setMobileNo} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>Email</Form.Label>
                                                        <Form.Control type="email" placeholder="Email" value={this.state.email} onChange={this.setEmail} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                            </div>
                                            
                                            <div className="col-12" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 10 }}>
                                                    <div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>License No.<span style={{color:'red'}}>*</span></Form.Label>
                                                        <Form.Control type="text" placeholder="License No" value={this.state.licenseNo} onChange={this.setLicenseNo} />                                                                                                        
                                                    </Form.Group>
                                                </div>
                                                {/*<div>
                                                    <Form.Group controlId="formBasicEmail" >
                                                        <Form.Label>License<span style={{color:'red'}}>*</span></Form.Label>
                                                        <Form.Control type="file" accept="image/*" placeholder="upload license" onChange={this.setLicenseUrl} />                                                                                                        
                                                        
                                                        
                                                    </Form.Group>
                                                </div>*/}
                                            </div>
                                            <div className="col-12">        
                                                
                                                <Form.Group controlId="formBasicEmail" style={{float:'right'}}>
                                                    <Button variant="primary" type="button" onClick={this.addDriver.bind(this)}>
                                                        Add
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
                                            <Card.Title style={{fontSize:16,padding:10,color:'white',backgroundColor:'gray'}}>My Drivers </Card.Title>
                                        <Card.Body>
                                            <div style={{color:'red'}}>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                    <th>Diver Name</th>
                                                    <th>Mobile No. </th>
                                                    <th>License No</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.item.map((object, i)=>{
                                                            return<tr> 
                                                                <td>{object.firstName} {object.lastName}</td>
                                                                <td>{object.mobileNo}</td>
                                                                <td>{object.idNumber}</td>
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
 
export default withRouter(AddDriver);