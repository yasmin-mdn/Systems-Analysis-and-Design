import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import '../../Style/design.scss';
import 'antd/dist/antd.css';
import { SiGooglecalendar } from "react-icons/si"
import { MdPlace } from "react-icons/md"
import { FaClock, FaCrown, FaUserAlt } from "react-icons/fa"
import { RiGroupFill } from "react-icons/ri"
import eventpic from '../SingleCommunity/event.jpg'
import {
    List,
    Avatar,
    Row, Col,
    Tabs,
    Button,
    Card,
    Tooltip
} from "antd";
import 'font-awesome/css/font-awesome.min.css';
const { TabPane } = Tabs;
const username = localStorage.getItem('user')
//const proxyUrl='http://gameboard.pythonanywhere.com';
const proxyUrl = localStorage.getItem('url');

class SingleCommunity extends React.Component {
    state = {
        name: "",
        requests:'false',
        owner: "",
        image: "",
        members: [],
        description: "",
        lock: false,
        events: [],
        is_a_member: false,
        members_username: [],
        event_image: "",
        id: '',
        Com: []

    };

    componentDidMount() {
        const id = window.location.href.substring(33)
        //this.setState({id:id})
        localStorage.setItem('com_id', id)
        Axios.get(proxyUrl + '/community/community_info/' + id, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Credentials": true,
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        }).then(res => {
            console.log(res.data)
            this.setState({ name: res.data.name })
            this.setState({ Com: res.data })

            this.setState({ image: res.data.image })
            this.setState({ description: res.data.description })
            this.setState({ owner: res.data.owner })
            this.setState({ lock: res.data.lock })
            this.setState({ members: res.data.members })
            this.setState({ events: res.data.events })
            this.setState({requests: 'true'});
           
            
        })

    }
    onClickJoin = () => {

        Axios.put(proxyUrl + '/community/join_community/' + localStorage.getItem('com_id') + '/', JSON.stringify(this.state.Com), {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Credentials": true,
                'Accept': "application/json",
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
            },
        }).then(
            res => {
                console.log(res.data)
                window.location.reload()
            }
        )
    }
    onClickLeave = () => {

        Axios.put(proxyUrl + '/community/leave_community/' + localStorage.getItem('com_id') + '/', JSON.stringify(this.state.Com), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            },
        }).then(
            res => {
                console.log(res.data)
                window.location.reload()
            }
        ).catch(() => {
        })


    }
    onClickaddEvent = () => {
        window.location.href = '/event'
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
            <div className="EditProfile_container"
                style={{ width: "90%", marginTop: '3%', borderRadius: '6px' }}>
                     {this.state.members.map(element => { this.state.members_username.push(element.username) })}
                <Row className='banner' style={{ marginBottom: '-8%' }}>
                <Col span={12}>
               
                    <Avatar className='avatarstyle'
                        style={{ marginLeft: '15%',marginTop: "1%" }}
                        src={this.state.image.base64}
                        title={this.state.name}
                        size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    >
                        {this.state.name[0]}
                    </Avatar>
                    <h3 style={{ color: 'hsl(22, 94%, 49%)',marginLeft: "5%" ,display: "inline"}}>{this.state.name}</h3>
                    </Col>
                    <Col span={12}>
                    <div style={{ marginLeft: "35%",display: "inline"}}>
                        <span hidden={!this.state.members_username.includes(localStorage.getItem('user'))}  >
                            <Button onClick={this.onClickLeave} className="btn btn-primary"style={{width: "15vh" }} hidden={this.state.owner.username === localStorage.getItem('user')} style={{ marginLeft: '10%' }}>
                                Leave
                    </Button>
                            <Button className="btn btn-primary"style={{width: "15vh" }} hidden={this.state.owner.username !== localStorage.getItem('user')} style={{ marginLeft: '10%' }}>
                                <Link to={"/editCommunity/:" + localStorage.getItem('com_id')}>Edit</Link>
                            </Button>
                            <Button onClick={this.onClickaddEvent} className="btn btn-primary" style={{ marginLeft: '5%',width: "15vh" }}>
                                Add Event
                    </Button>
                        </span>
                        <span hidden={this.state.members_username.includes(localStorage.getItem('user'))}  >
                            <Button onClick={this.onClickJoin} className="btn btn-primary" style={{ marginLeft: '10%' }}>
                                Join
                    </Button>
                        </span>
                        </div>
                    </Col>  
                </Row>
                
                   
                   
               


                <Row >
                    <Col span={18} className='communitystyle' style={{ borderRadius: '10px', display: 'flex' }}>
                        <List
                            grid={{ column: 2, gutter: 16 }}
                            size="large"
                            itemLayout="horizontal"
                            dataSource={this.state.events}

                            renderItem={(item) => (
                                <List.Item className="event">
                                    <Row>
                                        <Col span={6}>
                                            <List.Item.Meta
                                                avatar={
                                                    <div >
                                                        <img className='event_pic' src={item.gallery.length == 0 ? eventpic : item.gallery[0].base64} />
                                                    </div>
                                                } />
                                        </Col>
                                        <Col span={12} >

                                            <div className="event_text" style={{ marginLeft: '20%' }} >
                                                <h5 ><MdPlace /> {item.place === '' ? '-' : item.place}</h5>
                                                <h6 ><SiGooglecalendar /> {item.date}</h6>
                                                <h6 ><FaClock /> {item.time}</h6>
                                                <h6 ><RiGroupFill /> players: {item.maxMember}</h6>
                                            </div>
                                        </Col>
                                        <Col span={4}>
                                            <Avatar.Group
                                                size="small"
                                                className="event_avatar"
                                            >
                                                <Tooltip title={item.members[0].username} placement="top">
                                                    <Avatar src={item.members[0].avatar === "" ? '' : item.members[0].avatar} style={{ background: 'hsl(22, 94%, 49%)' }}><p style={{ margintop: '-15em', fontSize: '20px' }}>{item.members[0].username[0]}</p></Avatar>
                                                </Tooltip>
                                                <Tooltip title={item.members[1].username} placement="top">
                                                    <Avatar src={item.members[1].avatar === "" ? '' : item.members[1].avatar} style={{ background: 'hsl(22, 94%, 49%)' }}><p style={{ margintop: '-15em', fontSize: '20px' }}>{item.members[1].username[0]}</p></Avatar>
                                                </Tooltip>
                                                <Avatar style={{ backgroundColor: 'hsl(22, 94%, 49%)' }} hidden={item.members.length === 2}>+{item.members.length - 2}</Avatar>
                                            </Avatar.Group>
                                            <Link to={"/event/:"+item.id} >View</Link>
                                        </Col>
                                    </Row>
                                </List.Item>

                            )}
                        />
                    </Col>
                    <Col span={4} className='communitystyle' style={{ marginLeft: "2%", borderRadius: '10px', overflow: 'hidden' }}>
                        <List
                            dataSource={this.state.members}
                            renderItem={item => (

                                <List.Item hidden={item.username !== this.state.owner.username}>
                                    <List.Item.Meta
                                        avatar={<Avatar size='large' className='avatarstyle' style={{ width: '4vw', height: '4vw', backgroundColor: "lime", lineHeight: '4vw', display: 'flex', alignItems: 'center' }} src={item.avatar} >{item.username[0]}</Avatar>}
                                        title={<h5 style={{ marginTop: '16%', fontSize: '19px' }}><FaCrown style={{ color: 'gold', marginTop: '-3%' }} />  {item.username}</h5>}
                                    />
                                </List.Item>
                            )}
                        />
                        <List

                            itemLayout="horizontal"
                            dataSource={this.state.members}
                            renderItem={item => (

                                <List.Item hidden={item.username === this.state.owner.username}>
                                    <List.Item.Meta
                                        avatar={<Avatar size='large' className='avatarstyle' style={{ width: '4vw', height: '4vw', backgroundColor: "lime", lineHeight: '4vw', display: 'flex', alignItems: 'center' }} src={item.avatar} >{item.username[0]}</Avatar>}
                                        title={<h5 style={{ marginTop: '16%', fontSize: '19px' }}><FaUserAlt style={{ fontSize: '14px', color: 'cyan', marginTop: '-5%' }} />  {item.username}</h5>}
                                    />
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>

            </div>
        )
    }
}
export default SingleCommunity;


