import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import '../../Style/design.scss';
import 'antd/dist/antd.css';
import {
    message,
    Avatar,
    Row, Col,
    Button,
    Card,
    Tooltip
} from "antd";
import { SiGooglecalendar } from "react-icons/si"
import { MdPlace } from "react-icons/md"
import { FaClock, FaCrown, FaUserAlt } from "react-icons/fa"
import { RiGroupFill } from "react-icons/ri"
const username = localStorage.getItem('user')
const proxyUrl = localStorage.getItem('url');
class SingleEvent extends React.Component {
    state = {
        id: "",
        date: "",
        owner: "",
        gallery: [],
        games: [],
        place: "",
        maxMember: "",
        members: [{}],
        plays: [],
        time: "",
        members_username: [],
        Com: []
    };

    onclicktag = (id) => {
        window.location.href = "/allgames/:" + id;
    };

    componentDidMount() {
        const id = window.location.href.substring(29);
        this.setState({ id: id });
        Axios.get(proxyUrl + "/community/event_info/" + id + "/", {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Credentials": true,
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
        }).then((res) => {
            const event = res.data;
            this.setState({ Com: res.data })
            this.setState({ time: event.time });
            this.setState({ date: event.date });
            this.setState({ members: event.members });
            this.setState({ owner: event.owner });
            this.setState({ place: event.place });
            this.setState({ games: event.games });
            this.setState({ gallery: event.gallery });
            this.setState({ plays: event.plays });
            this.setState({ maxMember: event.maxMember });
            console.log(event);

        })

    }
    onClickJoin = () => {

        Axios.put(proxyUrl + '/community/join_event/' + this.state.id + '/',JSON.stringify(this.state.Com), {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Credentials": true,
                'Accept': "application/json",
                'Authorization': `Bearer ${localStorage.getItem("access")}`,
            },
        }).then(
            res => {
                console.log(res.data)
                console.log("join")
                window.location.reload()
            }
        ).catch((error) => {
            if(JSON.stringify(error.response).includes("finished")){
                message.error({content: 'Can not join this event because it has ended',duration: 2,style: {color: 'red'}});
            }
            if(JSON.stringify(error.response).includes("full")){
                
                message.error({content: 'Can not join this event because it is full',duration: 2,style: {color: 'red'}});
            }
        })
    }
    onClickLeave = () => {

        Axios.put(proxyUrl + '/community/leave_event/' + this.state.id + '/', JSON.stringify(this.state.Com), {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Access-Control-Allow-Credentials': true,
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            },
        }).then(
            res => {
                console.log(res.data)
                console.log("left")
                window.location.reload()
            }
        ).catch(() => {
        })


    }
    onClickEditEvent = () => {
        window.location.href = ''
    }
    render() {
        this.state.members.map(element => { this.state.members_username.push(element.username) })
        return (
            <div>
                <Row>
                    <div className="event_main" style={{width: "80%"}}>
                        <Col span={8}>
                            <h2  ><MdPlace style={{ display: "inline" },{marginLeft: "-4%"}} /> {this.state.place === '' ? '-' : this.state.place}</h2>
                            <div className="event_text" style={{ marginLeft: '5%' }, { display: "inline" }} >
                                <h5><SiGooglecalendar style={{ display: "inline" }} /> {this.state.date}</h5>
                                <h5 ><FaClock style={{ display: "inline" }} /> {this.state.time}</h5>
                                <h5 ><RiGroupFill style={{ display: "inline" }} /> Max players: {this.state.maxMember}</h5>
                                <h5 ><RiGroupFill style={{ display: "inline" }} /> needed players: {this.state.maxMember - this.state.members.length}</h5>
                            </div>
                            <Row>
                            <Col span={8}>
                            <Avatar.Group
                            >
                                <Tooltip title={this.state.members[0].username} placement="top">
                                    <Avatar size={40} src={this.state.members[0].avatar === "" ? '' : this.state.members[0].avatar} style={{ background: 'hsl(22, 94%, 49%)' }}>{this.state.members[0].username}</Avatar>
                                </Tooltip>
                                <Avatar size={40} style={{ backgroundColor: 'hsl(22, 94%, 49%)' }} hidden={this.state.members.length === 1}>+{this.state.members.length - 1}</Avatar>
                            </Avatar.Group>
                            </Col>
                            <Col span={16}>
                            <div style={{ display: "inline" },{marginLeft: "-15%",marginTop:"-1%"}}>
                                <span hidden={!this.state.members_username.includes(localStorage.getItem('user'))}  >
                                    <Button onClick={this.onClickLeave} className="btn btn-primary" style={{ width: "15vh" }} hidden={this.state.owner.username === localStorage.getItem('user')} style={{ marginLeft: '10%' }}>
                                        Leave
                                    </Button>
                                    <Button className="btn btn-primary" style={{ width: "15vh" }} hidden={this.state.owner.username !== localStorage.getItem('user')} style={{ marginLeft: '10%' }}>
                                        <Link to={"/editCommunity/:" + localStorage.getItem('com_id')}>Edit</Link>
                                    </Button>
                                    <Button onClick={this.onClickEditEvent} className="btn btn-primary" style={{ marginLeft: '5%', width: "15vh" }}>
                                        Edit Event
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
                           


                           
                        </Col>
                        <Col span={16}>
                            <div className="scroll" style={{width: "100%",height: "70vh"}}>
                                {this.state.games.map((item) => (
                                    <Card
                                        className="game_card"
                                        hoverable
                                        onClick={() => this.onclicktag(item.id)}
                                        cover={<img src={item.image} className="card_img" />}
                                        style={{ width: '20%', height: 'auto' }}
                                    >
                                        <div className="game_meta">
                                            <div className="meta_text" onClick={() => this.onclicktag(item.id)}> {item.name} </div></div>
                                    </Card>
                                ))}
                            </div>
                        </Col>


                    </div>
                </Row>


            </div>
        )
    }
}
export default SingleEvent;