import React, { Component } from 'react';
import Card from 'react-bootstrap/Card'
import { Table } from 'react-bootstrap';
//import Form from 'react-bootstrap/Form';
import  Header  from "../Header";
import { withRouter } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "@material-ui/lab/Pagination";
class SearchLog extends Component {
    
    state = {userId:'',item:[],error:'',isLoading:false,loadingColor:'#ffffff',pageId:1,rowCount:0,totalPage:0};
    constructor(props) {
        super(props);    
        //console.log("++pickup**********==="+JSON.stringify(this.props));    
      }
    
      componentDidMount() {    
        this.setState({isLoading:true});      
       let userId=localStorage.getItem("userId");
       this.setState({userId:userId});
       this.setState({pageId:1});
        //console.log("++userId**********==="+userId);        
        //this.setState({item:this.props.match.params.data});
        this.getBookingLog(userId,1);
      }
    
    async getBookingLog(userId,pageId){
        console.log("*****getHistory******");   
        
        //const headers = { 'Content-Type': 'application/json' } 
        let token=localStorage.getItem("token");
        const headers = {'Authorization':`Bearer ${token}`} ;
          let urlData="&userId="+userId+"&pageId="+pageId;
          //const response = await fetch('http://localhost:3001/booking/getCabs?originObj='+originObj+'&destinationObj='+destinationObj, { headers });
          //console.log("urlData=="+urlData)
          const response = await fetch(global.config.apiUrl+'user/get_search_log?'+urlData, { headers });
          //console.log("+++response=="+response)
          const data = await response.json();
          //console.log("Data="+JSON.stringify(data));
          if(data.code==200){
            this.setState({totalPage:data.totalPage});
            this.setState({rowCount:data.rowCount});
              this.setState({item:data.data});
          }else{
              this.setState({error:'some internal error please try later'})
          }
          this.setState({isLoading:false});
          //this.setState({cabsList:data.data});
    }
    handlePageChange=async(event, value)=>{
        //this.setState({pageId:value});
        let userId=this.state.userId;
        let pageId=value;
        this.setState({pageId:pageId});
        this.getBookingLog(userId,pageId);
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
                                                    <th>Searched On</th>
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
                                                                <td> {object.createdTime!="0000-00-00 00:00:00"?new Intl.DateTimeFormat('en-GB', { 
                                                                        month: 'short', 
                                                                        day: '2-digit',
                                                                        year: 'numeric', 
                                                                        hour:'numeric',
                                                                        minute:'numeric',
                                                                        hour12:true
                                                                    }).format(new Date(object.createdTime)):null
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        object.returnDate!="0000-00-00 00:00:00"?<span>
                                                                        <label>{object.note}</label>
                                                                        </span>:
                                                                        <span><label>{object.note}</label></span>
                                                                    }
                                                                </td>
                                                            </tr>;
                                                        })
                                                    }
                                                    
                                                </tbody>    
                                            </Table>
                                            
                                            <Pagination
                                                className="paging"
                                                count={this.state.totalPage}
                                                page={this.state.pageId}
                                                defaultPage={this.state.pageId}
                                                siblingCount={2}
                                                boundaryCount={2}
                                                color="primary"
                                                showFirstButton showLastButton
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
            </div>
        );
    }
}
 
export default withRouter(SearchLog);