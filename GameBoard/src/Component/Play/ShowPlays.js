import React from 'react';
import axios from 'axios';
import '../../Style/design.scss';
import { FaRegEdit } from 'react-icons/fa'
import { AiFillDelete, } from "react-icons/ai"
import 'font-awesome/css/font-awesome.min.css';
import '../../Style/play.css'
import {
    Card,Row,Col,
    Table,
    message
} from "antd";
const proxyurl = localStorage.getItem('url');
const { Meta } = Card;

    const columns = [
        {
            title: 'Number',
            dataIndex: 'key',
            key: 'key',
    
        },
    {
        title: 'Game',
        dataIndex: 'game',
        key: 'game',

    },
    {
        title: 'Place',
        dataIndex: 'place',
        key: 'place',
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Players',
        dataIndex: 'players',
        key: 'players',
    },
    {
        title: 'Semi Players',
        dataIndex: 'semiplayers',
        key: 'semiplayers',
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',

    }, {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',

    }
]




class LogPlay extends React.Component {
    state = {
        dataSource: [],
        allgames: {},
        editbool: false,
        Members: [],
        players:[],
        semi_players:[],
        requests: 'false',
        Colors: []
        
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
            const tmp = res.data;
            this.setState({ dataSource: tmp })
            this.setState({players: tmp.players})
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
            this.setState({requests: 'true'})
        })
            .catch((error) => {
                message.error('somthing went wrong')
            }
            )
        
    }

    onClickdelete = (id) => {
        axios.delete(proxyurl + "/game/edit_play/" + id + "/", {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
        }
        ).then((res) => {

           message.success('play was deleted succesfully')
            axios.get(proxyurl + '/game/plays_list/', {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Access-Control-Allow-Credentials': true,
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access')}`
                }
            }
            ).then((res) => {
                const tmp = res.data;
                console.log(tmp)
                this.setState({ dataSource: tmp })

            })
                .catch((error) => {
                    message.error('somthing went wrong')
                }
                )

        })
            .catch((error) => {
                message.error('cant delete play try again')
            }
            )

    }

    onClickedit = (id) => {
        window.location.href = '/editplay/:' + id
    }

    renderItems = () => {
        return (
            this.state.dataSource.map(item => (
                <div>

               
                <Card className="play_card"
                    actions={
                        [
                            <AiFillDelete onClick={() => this.onClickdelete(item.id)} />,
                            <FaRegEdit onClick={() => this.onClickedit(item.id)} />
                        ]
                    }
                    
                        >
                            <div style={{marginTop: '10%',height: '20vh'}}>
                            <p> {item.game.name}</p>
                            <p> {item.place}</p>
                             <p> {item.date}</p>
                             <p>{item.users}</p> 
                            </div>
                   
                     
                    
                     
                                   
                </Card>
                <div style={{backgroundColor: 'red',height: '40px',width: '120px'}}>
                        {this.state.Members}
                </div>
                </div>
            )
            )
        )

    }

    render() {
        
        if( this.state.requests==='false')
        {

        
        return( <div style={{marginTop: '23%'}}> 
        <div class="d-flex justify-content-center" style={{marginTop: '0%'}}>
<div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
<span class="sr-only" >Loading...</span>
</div>
</div></div>)}

        return (
            
            <div style={{ marginTop: '4%' }}>

              <div style={{width: '90%',marginLeft: '5%'}}>
                  <h5>List of plays</h5>
              <Table columns={columns}    style={{marginTop: '2%'}}    pagination={false}  dataSource={
                  Object.entries(this.state.dataSource).map(([k, value]) => (
                  {  key: parseInt(k)+1,
                    game: value.game.name,
                    date: value.date,
                    place: value.place,
                    players:  Object.entries(value.players).map(([cnt, val]) => (
                        <Row style={{display: 'flex',alignContent: 'center',alignItems: 'center',height: 'max-content'}}>
                                <Col span={1}>
                                    <div style={{width: '1vw',height: '1vw',borderRadius: '50%',backgroundColor: val.color===''?'gray':val.color }} />
                                </Col>
                                <Col span={23}>
                                <p style={{fontSize: '12px',marginTop: '4.5%',marginLeft: '4%'}}>{val.username} scored {val.score===''?'-':val.score} started at {val.starting_position===''?'-':val.starting_position} and {val.is_won?'won':'lost'}.</p>
                                </Col>
                                
                        </Row>
                    )),
                    semiplayers: this.state.semi_players[k],
                    edit: <FaRegEdit style={{color: 'orange',marginLeft: '15%',marginTop: '-6%',fontSize: '18px'}} onClick={() => this.onClickedit(value.id)} />,
                    delete: <AiFillDelete style={{color: 'orange',marginLeft: '25%',fontSize: '18px'}} onClick={() => this.onClickdelete(value.id)} />



                    
                }

                  ))
              } />
              </div>
            </div>
            
            
            



        )
    }
}

export default LogPlay;