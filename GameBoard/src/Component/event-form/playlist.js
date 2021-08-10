import React from 'react';
import axios from 'axios';
import '../../Style/design.scss';
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete, } from "react-icons/ai"
import 'font-awesome/css/font-awesome.min.css';
import '../../Style/play.css'
import { Radio, Input ,Checkbox} from 'antd';

import { Select, Space,message ,Button} from 'antd';

const proxyurl = localStorage.getItem('url');
let plays=[]

class LogPlay extends React.Component {
    state = {
        dataSource: [],
        editbool: false,
        Members: [],
        players:[],
        semi_players:[],
        suggestlist_play:[],
        Colors: [],
        playes: []
       
    }
    onChange(checkedValues) {
        console.log('checked = ', checkedValues);
        plays=[]
       plays=checkedValues
      };
       onclick(){
           localStorage.setItem("plays",plays); 
            console.log(  localStorage.getItem("plays"))
      
      }
    componentDidMount() {


        axios.get(proxyurl + '/game/plays_list/', {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        }
        ).then((res) => {
            this.setState({ dataSource: res.data })
            this.state.dataSource.forEach(element=>
              {
                console.log(element.playes.id)

              }  )
            console.log(res.data.place)
           // this.setState({ dataSource: tmp })
            this.setState({players: res.data.players})
            this.state.dataSource.forEach(element => {
                const members=[];
                const colors=[];
                let aa=element.semi_players;
               this.state.semi_players.push(aa.substring(0,aa.length-1).replaceAll("(not a user)",''));

                element.players.forEach(user=>{
                    members.push(user.username);
                    colors.push(user.color)
                })
                this.setState({Members: members})

                this.setState({Colors: colors})
            });
            console.log(this.state.players)
        })
            .catch((error) => {
                message.error('somthing went wrong')
            }
            )
        
    }
    render() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
         
               
        return ( <div> <Checkbox.Group onChange={this.onChange} >
            {this.state.dataSource.map(item=>(         
              <Checkbox style={radioStyle}style={{marginLeft:"0px",display:"block"}} name={"play"} value={item.id}>
{item.place+" / "+item.date+" / "+item.players.map(i=>(i.username))}
              </Checkbox>))            }
          </Checkbox.Group> 
          <Button className="btn btn-primary" onClick={this.onclick} style={{width: '50%',display:"block" ,marginTop:'5%'}}>Accept playes</Button>
</div>
        )
    }
}

export default LogPlay;