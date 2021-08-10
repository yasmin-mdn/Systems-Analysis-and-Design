
import React from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import '../../Style/design.scss';
import StarRatings from 'react-star-ratings';
import 'antd/dist/antd.css';
import {
  Form,
  Input,
  Tooltip,
  Select,
  AutoComplete,
  Button,
  Collapse,
  Card ,
  List,
  Avatar, 
  Skeleton,
  Pagination, 
  Row
} from "antd";

const paginationProps = {
  showSizeChanger: false,
  showQuickJumper: false,
  pageSize:20
  
  
};
class AllBoardGames extends React.Component {
  state={
      id:"",
      name:"",
      description:"",
      request: false,
      category:"",
      image:"",
      min_players:"",
      max_players:"",
      difficulty:"",
      proxyurl : "",
      rate:"",
      games: [],
      game:"",
      vision:""
      
      
  };
  componentDidMount() {
    
    Axios.get(localStorage.getItem('url')+'/game/games_list/')
       .then(res=>{
         const games_list=res.data;
         this.setState(prevState => {
          console.log(games_list)

           return {games: games_list}
         })
         this.setState({request: true})
       })
  }
  
  
  allBoard(){
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>

    return(

      <body style={{background: 'transparent',marginTop: '5%',clear: 'both'}} >
        <h4 style={{ letterSpacing: '1.2px',marginLeft: '5%'}}>Gameboard sorted by BGG Rating Descending.</h4>
        <h6 style={{ letterSpacing: '1.1px',marginLeft: '5%',opacity: '0.8'}}>Tap on image to view boardgame's profile.</h6>
      <List style={{marginTop: '2%'}}
      size="large"
      itemLayout="horizontal"
      pagination={paginationProps}
      dataSource={this.state.games}
      renderItem={item => (
        <List.Item >
          <List.Item.Meta 
            avatar={<Link to={'/allgames/:'+item.id}   ><img src={item.image} className="img-text" style={{width: "100px",height: "110px"}}/></Link>}
            
            title={<h5>{item.name} </h5>}
            description={<div>
              <p style={{marginBottom: '5px',fontFamily: 'Times, serif;'}}>
                Categories: {item.category.replace('[','').replace(']','').replace(/'/g,"").replace(/,/g,' &')}
              </p>
              <StarRatings
              rating={parseFloat((parseFloat(item.rate)/2).toFixed(2))}
              
              starRatedColor="yellow" starDimension='17px' starSpacing='2px' starEmptyColor='#757575'
              numberOfStars={5}
              name='rating' 
            />
            <p style={{fontSize: '15px',fontFamily: 'Courier, monospace',marginTop: '9px'}}>{item.description.substring(0,110)}...</p>
             </div>}
/>
        </List.Item>
      )}
    />
    </body>
    );
  }
  render(){
    if(!this.state.request){
      return(
      <div class="d-flex justify-content-center" style={{marginTop: '23%'}}>
      <div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
      <span class="sr-only" >Loading...</span>
      </div>
      </div>)
    }
     return this.allBoard();
         
    }
  }
  export default AllBoardGames;
  
  