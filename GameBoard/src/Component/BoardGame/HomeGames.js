import React from "react";
import Axios from "axios";
import StarRatings from 'react-star-ratings';
import { GiTwoCoins,GiLevelFourAdvanced,GiLevelThreeAdvanced,GiLevelTwoAdvanced} from "react-icons/gi";
import {  FaMapMarkerAlt,FaClock,FaPenNib,FaPhone,FaQuoteRight,FaEye, FaLock } from "react-icons/fa";
import {  FiMoreVertical} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import 'antd/dist/antd.css';
import { LockFilled   } from "@ant-design/icons";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import '../../Style/design.scss';
import Im from '../../Style/a.png';
import Com from '../../Style/com.png';

import {
    Row, Col ,Avatar, Button
} from "antd";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';

let a="";


 class HomeGames extends React.Component {
    state = {
        games: [],
        member_id:[],
        cafes: [],
        gallery:[],
        communitys: [],
        vision: "",
        request1: "false",
        request2: "false",
        request3: "false"
    };
     componentDidMount() {
         Axios.get( localStorage.getItem('url')+'/game/hot_games/')
            .then(res => {
                const games_list = res.data;
                this.setState(prevState => {
                    return { games: games_list }
                })
                this.setState(prevState =>{
                  return {request1: "true"}
                }) 
            })
            
            Axios.get( localStorage.getItem('url')+'/cafe/day_cafe_list/')
            .then(res => {
              const cafe_list=res.data;
              this.setState(prevState => {
                return {cafes: cafe_list}
                })
                this.setState(prevState =>{
                  return {request2: "true"}
                }) 
              
              
            })
            Axios.get( localStorage.getItem('url')+'/community/day_communities_list/')
            .then(res => {
              const cafe_list=res.data;
              this.setState(prevState => {
                return {communitys: cafe_list}
                })
               this.setState(prevState =>{
                 return {request3: "true"}
               }) 
            })
            
            
    }

    seeAll(){
        this.setState({vision:"true"});

    }
   
  
    
    caro(){
        const rows = this.state.games.reduce(function (rows, key, index) { 
            return (index % 4 == 0 ? rows.push([key]) 
              : rows[rows.length-1].push(key)) && rows;
          }, []);
          const arrays = this.state.cafes.reduce(function (arrays, key, index) { 
            return (index % 5 == 0 ? arrays.push([key]) 
              : arrays[arrays.length-1].push(key)) && arrays;
          }, []);
          const coms = this.state.communitys.slice(0,6);

         

        return(
            
            <div style={{paddingTop: "2%",marginTop: "2%",height: 'max-content',width: '90%',marginLeft: '5%'}}>
                      {this.state.request1==='false'?<div style={{marginTop: '9%'}}><h3 > THE HOT GAMES
                     
                     </h3><div class="d-flex justify-content-center" style={{marginTop: '0%'}}>
          <div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
          <span class="sr-only" >Loading...</span>
          </div>
          </div></div>:<div>  <h3 > THE HOT GAMES
                     
                     </h3>
                     <span>
                       
                     <h4 style={{fontSize: "13px",verticalAlign: 'middle'}}>
                     < Link to='/allgames' style={{color: "cyan",marginRight: "2%",fontSize: "18px",lineHeight: '0.5'}}><GiLevelFourAdvanced style={{color: "cyan",marginTop: '-3'}}/> Click to see more</Link>
                     
                     </h4>  </span>
                     
                     <Carousel infiniteLoop   autoPlay  width="100%" >
                         
                       {rows.map(game => (
                         <body style={{backgroundColor: 'transparent',height: '35vh',marginTop: '1%'}}>
                         <Row  justify='start'>
                         <Col span={8}>
                         <Link to={'/allgames/:'+game[0].id}>
                             <Row style={{borderRadius: '4%',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}className="homestyle">
                             <Col span={12} >
                                    <div className='roundedcircle' style={{marginLeft: '7%'}}>
                                     <img src={game[0].image}  className='imageinside' />
         
                                    </div>
                                    </Col> 
                            <Col span={12}>
                                    <div style={{marginLeft: '7%'}}>
                                    <h5 >{game[0].name}</h5>
                                   
                                     <StarRatings
                                      rating={parseFloat((parseFloat(game[0].rate)/2).toFixed(2))}
                   
                                      starRatedColor="yellow" starDimension='17px' starSpacing='2px' starEmptyColor='#757575'
                                      numberOfStars={5}
                                      name='rating' 
                                      />
                 <h6 style={{fontSize: '15px',fontFamily: 'Courier, monospace',marginTop: '9px'}}><FaQuoteRight style={{fill: 'orange'}}/> {game[0].description.substring(0,48)}...</h6>
     
                                      </div>
                                    </Col>
     
                             
                                  
                             </Row></Link>
                             </Col>
                             <Col span={8}><Link to={'/allgames/:'+game[1].id}>
                             <Row style={{borderRadius: '4%',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}className="homestyle">
                             <Col span={12} >
                                    <div className='roundedcircle' style={{marginLeft: '7%'}}>
                                     <img src={game[1].image}  className='imageinside' />
         
                                    </div>
                                    </Col> 
                             <Col span={12}>
                                    <div style={{marginLeft: '7%'}}>
                                    <h5 >{game[1].name}</h5>
                                   
                                     <StarRatings
                                      rating={parseFloat((parseFloat(game[1].rate)/2).toFixed(2))}
                   
                                      starRatedColor="yellow" starDimension='17px' starSpacing='2px' starEmptyColor='#757575'
                                      numberOfStars={5}
                                      name='rating' 
                                      />
                 <h6 style={{fontSize: '15px',fontFamily: 'Courier, monospace',marginTop: '9px'}}><FaQuoteRight style={{fill: 'orange'}}/> {game[1].description.substring(0,48)}...</h6>
     
                                      </div>
                                    </Col>
     
                               
                                  
                             </Row></Link>
                             </Col>
                             <Col span={8}><Link to={'/allgames/:'+game[2].id}>
                             <Row style={{borderRadius: '4%',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}className="homestyle">
                             <Col span={12} >
                                    <div className='roundedcircle' style={{marginLeft: '7%'}}>
                                     <img src={game[2].image}  className='imageinside' />
         
                                    </div>
                                    </Col> 
                             <Col span={12}>
                                    <div style={{marginLeft: '7%'}}>
                                    <h5 >{game[2].name}</h5>
                                   
                                     <StarRatings
                                      rating={parseFloat((parseFloat(game[2].rate)/2).toFixed(2))}
                   
                                      starRatedColor="yellow" starDimension='17px' starSpacing='2px' starEmptyColor='#757575'
                                      numberOfStars={5}
                                      name='rating' 
                                      />
                 <h6 style={{fontSize: '15px',fontFamily: 'Courier, monospace',marginTop: '9px'}}><FaQuoteRight style={{fill: 'orange'}}/> {game[2].description.substring(0,48)}...</h6>
     
                                      </div>
                                    </Col>
     
                              
                                  
                             </Row></Link>
                             </Col>
                         </Row>
                        
                        
                        
                        
                         
                          </body>
                          
                         ))
                         }
                     </Carousel></div>}
          
          
         
              
                     {this.state.request2==='false'?<div style={{marginTop: '9%'}}> <h3 >VISIT CAFES
                     
                     </h3><div class="d-flex justify-content-center" style={{marginTop: '0%'}}>
          <div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
          <span class="sr-only" >Loading...</span>
          </div>
          </div></div>:<div style={{height: 'max-content',width: '100%'}}>
                <h3 >VISIT CAFES
                     
                     </h3>
                     <span>
                    
                    <h4 style={{fontSize: "13px",verticalAlign: 'middle'}}>
                     < Link to='/allcafes' style={{color: "cyan",marginRight: "2%",fontSize: "18px",lineHeight: '0.5'}}><GiLevelFourAdvanced style={{color: "cyan",marginTop: '-3'}}/> Click to see more</Link>
                    </h4></span>
                     {arrays.map(cafe => (
                         <Row justify='start' style={{marginTop: '2%'}}>
                             <Col span={8} >
                             <Row style={{borderRadius: '4%',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}className="homestyle">
                             <Col span={12} >
                               <div>
                               <img src={cafe[0].gallery.length===0?Im:cafe[0].gallery[0].base64} className='imageinside' style={{maxWidth: '90%',width: '90%',height: '20vh',boxShadow: 'none'}} />
    
                               </div>
                               </Col> 
                        <Col span={12}>
                               <div style={{marginLeft: '7%'}}>
                               <Link to={'/allcafes/:'+cafe[0].id}> <h5 style={{paddingBottom: '3%'}}>{cafe[0].name}</h5></Link>

                        <h6 style={{alignContent: 'center'}}> <FaPhone style={{fill: 'rgb(22, 221, 111)'}}/>  {cafe[0].phone_number}</h6>
                        <h6 style={{borderBottom: '4px dotted gray',paddingBottom: '7%',paddingRight: '5%'}}> <FaMapMarkerAlt style={{fill: '#ff3434' }}/>  {cafe[0].city}</h6>

                        <h6><FaPenNib style={{fill: 'orange'}}/> {cafe[0].description}</h6>

                                 </div>
                               </Col>

                          
                             
                        </Row>
                             </Col>
                             <Col span={8} >
                             <Row style={{borderRadius: '4%',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}className="homestyle">
                             <Col span={12} >
                               <div>
                               <img src={cafe[1].gallery.length===0?Im:cafe[1].gallery[0].base64} className='imageinside' style={{maxWidth: '90%',width: '90%',height: '20vh',boxShadow: 'none'}} />
    
                               </div>
                               </Col> 
                        <Col span={12}>
                               <div style={{marginLeft: '7%'}}>
                               <Link to={'/allcafes/:'+cafe[1].id}> <h5 style={{paddingBottom: '3%'}}>{cafe[1].name}</h5></Link>

                        <h6 style={{alignContent: 'center'}}> <FaPhone style={{fill: 'rgb(22, 221, 111)'}}/>  {cafe[1].phone_number}</h6>
                        <h6 style={{borderBottom: '4px dotted gray',paddingBottom: '7%',paddingRight: '5%'}}> <FaMapMarkerAlt style={{fill: '#ff3434' }}/>  {cafe[1].city}</h6>

                        <h6><FaPenNib style={{fill: 'orange'}}/> {cafe[1].description}</h6>

                                 </div>
                               </Col>

                          
                             
                        </Row>
                             </Col><Col span={8} >
                             <Row style={{borderRadius: '4%',width: '95%',height: '28vh',display: 'flex',alignItems: 'center'}}className="homestyle">
                             <Col span={12} >
                               <div>
                               <img src={cafe[2].gallery.length===0?Im:cafe[2].gallery[0].base64} className='imageinside' style={{maxWidth: '90%',width: '90%',height: '20vh',boxShadow: 'none'}} />
    
                               </div>
                               </Col> 
                        <Col span={12}>
                               <div style={{marginLeft: '7%',width: '90%'}}>
                               <Link to={'/allcafes/:'+cafe[2].id}> <h5 style={{paddingBottom: '3%'}}>{cafe[2].name}</h5></Link>

                        <h6 style={{alignContent: 'center'}}> <FaPhone style={{fill: 'rgb(22, 221, 111)'}}/>  {cafe[2].phone_number}</h6>
                        <h6 style={{borderBottom: '4px dotted gray',paddingBottom: '7%'}}> <FaMapMarkerAlt style={{fill: '#ff3434' }}/>  {cafe[2].city}</h6>

                        <h6><FaPenNib style={{fill: 'orange'}}/> {cafe[2].description}</h6>

                                 </div>
                               </Col>

                          
                             
                        </Row>
                             </Col>
                         </Row>
                     ))}
                </div>}
                {this.state.request3==='false'?<div style={{marginTop: '9%'}}> <h3 >JOIN A COMMUNITY
                     
                     </h3><div class="d-flex justify-content-center" style={{marginTop: '0%'}}>
          <div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
          <span class="sr-only" >Loading...</span>
          </div>
          </div></div>:<div style={{height: 'max-content',width: '100%',marginTop: '7%',paddingBottom: '7%'}}>
                <h3 >JOIN A COMMUNITY</h3>
                <span>
                    
                    <h4 style={{fontSize: "13px",verticalAlign: 'middle'}}>
                    < Link to='/community' style={{color: "cyan",marginRight: "2%",fontSize: "20px",lineHeight: '0.5',marginTop: '1%'}}><GiLevelFourAdvanced style={{color: "cyan",marginTop: '-3'}}/> Click to see more</Link>
 
                      </h4></span>
                     <Row justify='start' style={{marginTop: '-1%'}}>
                     {coms.map(cafe => (
                         
                             <Col span={8} style={{marginTop: '2%'}}>
                             <Row style={{borderRadius: '4%',width: '95%',height: '28vh',display: 'flex'}}className="homestyle">
                               <Row style={{height: '80%' ,width: '100%'}}>
                                   
                                 <Col span={11}>
                                 <div style={{marginLeft: '7%',width: '70%',overflow: 'hidden'}}>
                                 <img src={cafe.image.base64===''?Com:cafe.image.base64}style={{height: '7.77vw',borderRadius: '50%',marginTop: '14%',width: '7.77vw',boxShadow: 'none'}} />

                                </div></Col>
                                 <Col span={13}>
                                 <div style={{marginLeft: '-13%',overflow: 'hidden',marginTop: '6%'}}>
                               <h5 style={{paddingBottom: '3%'}}>{cafe.name}</h5>
                              
                 
                                <div style={{height: '16%',marginTop: '13%',display: 'flex'}}><Avatar.Group
       
          style={{marginTop: '-7%',paddingTop: '0%'}}
        >
          <Avatar src={cafe.members[0].avatar} style={{borderColor: '#414141',backgroundColor: 'rgb(38 156 21)'}}>{cafe.members[0].username[0]}</Avatar>
         {cafe.members.length<=1?'':<Avatar src={cafe.members[1].avatar} style={{borderColor: '#414141',backgroundColor: 'rgb(38 156 21)'}}>{cafe.members[1].username[0]}</Avatar>
            } 
            {cafe.members.length<=1?'':<Avatar style={{  backgroundColor: '#f56a00' ,borderColor: 'transparent'}} hidden={cafe.members.length<3}>+{cafe.members.length-2}</Avatar>
    }</Avatar.Group></div>
                               
                                 </div>
                                 </Col>
                        
                        </Row>
                        <Row justify='center' style={{width: '100%'}}>
                        <div style={{overflow: 'hidden',display: 'flex',marginTop: '-2%',
                        marginLeft: '5%',width: '90%',textAlign: 'center',borderTop: '2px dotted gray',paddingTop: '1%',alignContent: 'center',alignItems: 'center'}}>
                                                       <h5 style={{marginLeft: 'auto',marginRight: 'auto'}}>  
                               {this.state.member_id=[],
                      cafe.members.map(element => this.state.member_id.push(element.username) ),
                      console.log(this.state.member_id)}
               
                      
                 {!cafe.lock ||this.state.member_id.includes(localStorage.getItem('user'))?<h5><Link to={'../community/:'+cafe.id}><span 
                style={{fontSize:"27px", textAlign:'center'}}>
                      <FaEye style={{fill: 'cyan',marginTop: '-3%'}}/> View
                      </span></Link></h5>:<h5 style={{fontSize: '25px',marginTop: '3%'}}><span 
                style={{ textAlign:'center'}}> <FaLock style={{fill: 'gold',fontSize: '20px',marginTop: '-5%'}}/> Private
                </span></h5>
                      }
                        
                      
                     </h5>

                         </div>  
                        </Row>
                        </Row> 
                             </Col>
                        

                     ))}                             </Row>
                     </div>}             <br/>
                   
                </div>
                

        );
    }


    render(){
       
         return this.caro();
         
    }

}
export default HomeGames;