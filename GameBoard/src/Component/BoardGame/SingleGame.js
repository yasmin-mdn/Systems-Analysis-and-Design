import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import '../../Style/design.scss';

import 'antd/dist/antd.css';
import {
    Form,
    Input,
    Tooltip,
    Select,
    AutoComplete,
    Button,
    Collapse,
    Card,
    Row, Col 
} from "antd";

import 'font-awesome/css/font-awesome.min.css';

const { Meta } = Card;
const { Panel } = Collapse;
class SingleGame extends React.Component {
    state = {
        id: localStorage.getItem('game'),
        name: "",
        description: "",
        category: "",
        image: "",
        min_players: "",
        max_players: "",
        difficulty: "",
        rate: "",
        request: false
    };

    componentDidMount(){
       const id=window.location.href.substring(32);
    Axios.get(localStorage.getItem('url')+'/game/game_info/'+id)
   .then(res=>{
     const game=res.data;
     this.setState({name:game.name});
     this.setState({description:game.description});
     this.setState({category:game.category});
     this.setState({image:game.image});
     this.setState({min_players:game.min_players});
     this.setState({max_players:game.max_players});
     this.setState({difficulty:game.difficulty});
     this.setState({rate:game.rate});
    this.setState({request: true})


    })
}

    render() {
        <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
        if(!this.state.request){
            return(
            <div class="d-flex justify-content-center" style={{marginTop: '23%'}}>
            <div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
            <span class="sr-only" >Loading...</span>
            </div>
            </div>)
        }

        return (
            <div className="EditProfile_container"
                style={{ width: "50%",marginTop: '5%'}}>
                   <Row>
                    <Col span={10}>
                        
                    <img style={{width:"80%",height: '30vh'}} 
                    src={this.state.image} />

                       </Col>
                       <Col span={12}>
                        <h4 style={{fontSize: '21',color: 'white'}}>{"Name: "+this.state.name }</h4>
                    <p style={{fontSize: '18px',opacity: '0.9'}}  >
                       {"Categories: "+ this.state.category.replace('[','').replace(']','').replace(/'/g,"").replace(/,/g,' &')} </p>
                    <p style={{fontSize: '17px',color: 'whitesmoke'}}>{`Difficulty: ${this.state.difficulty}`.substring(0,15)}</p>
                    <p style={{fontSize: '17px',color: 'whitesmoke'}}>{'Range of players: '+this.state.min_players+" to "+this.state.max_players}</p>
                
                    

                    </Col>
                 
                   </Row>
                   
                 
                <div style={{marginTop: '5%' ,letterSpacing: '1.2' ,borderTop: '3px solid #515151'}} >
                <p style={{fontSize: '15px',marginTop: '2%',marginLeft: '0%',fontfamily: 'Verdana, sans-serif'}} >{this.state.description}</p>

                </div>
                   
            </div>
        )
    }
}
export default SingleGame;


