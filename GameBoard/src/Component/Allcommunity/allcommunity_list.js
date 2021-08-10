import React from "react";
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
//import 'font-awesome/css/font-awesome.min.css';
import "../../Style/design.scss";
import { TeamOutlined, LockFilled ,UserOutlined, AntDesignOutlined  } from "@ant-design/icons";
import "antd/dist/antd.css";
import "../../Style/all-community-list.css";
import { List,Avatar, Tooltip } from "antd";
import { Button, Thumbnail } from "react-bootstrap";
import AV_community from "./images.png";
const paginationProps = {
  showSizeChanger: false,
  showQuickJumper: false,
  pageSize: 12,
};

let a = "";
class AllCommunity extends React.Component {
  state = {
    id: "",
    name: "",
    owner: "",
    description: "",
    members: [],
    gallery: "",
    lock: "",
    community: [],
    proxyurl: "http://gameboard.pythonanywhere.com/communities_list/",
    member_id:[]
  };

  componentDidMount() {
    Axios.get(localStorage.getItem('url')+"/community/communities_list/")
      .then((res) => {
        //alert("reeeee")
        const cafe_list = res.data;
        this.setState((prevState) => {
          console.log(cafe_list);
          return { community: cafe_list };
        });
      })
      .catch((error) => {
        //alert("qqqqq")
        console.log(error.response);
      });
  }

  allCommunity() {
    <link
      href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css"
      rel="stylesheet"
    ></link>;

    return (
      <div
        className="cafelist_container"
        style={{ marginTop: "5%", fontSize: "20px" }}
        dataSource={this.state.community}
        Pagination={paginationProps}
      >
        <h3 style={{ marginLeft: "5%" }}>
          Communities
          <TeamOutlined
            style={{
              position: "relative",
              top: "-0.25em",
              marginLeft: "0.5%",
              fontSize: "27px",
            }}
          />
        </h3>

        {
          <List
            grid={{ column: 3, gutter: 16 }}
            size="large"
            itemLayout="horizontal"
            pagination={paginationProps}
            dataSource={this.state.community}
            className="allcommunity_container"
            renderItem={(item) => (
              <List.Item className="community_part">
                <span
                        style={{ color: "whitesmoke"}}
                        className="community_name"
                      >
                        <Link to={'community/'+ item.id}>{item.name}</Link>
                      </span>
                       <List.Item.Meta
                  avatar={
                    <img
                      src={item.image.base64 === "" ? AV_community : item.image.base64}
                      style={{
                        width: "90%",
                        height: "150px",
                        margintop: "3px",
                      }}
                      className="community_img"
                    />
                  }
                />
                  <p className="community_desc"><p>
                        {item.description}
                      </p>
                {/* {item.members.map(element => ( */}
             <Avatar.Group
             size="large"
             className="avatar"
           >
             <Tooltip title={item.members[0].username} placement="top">
             <Avatar  src={item.members[0].avatar===""?'':item.members[0].avatar} style={{background:'hsl(22, 94%, 49%)' }}><p style={{margintop:'-15em',fontSize:'20px'}}>{item.members[0].username[0]}</p></Avatar> 
               </Tooltip>
             {item.members.length<=1?'': <Tooltip title={item.members[1].username} placement="top">
             <Avatar  src={item.members[1].avatar===""?'':item.members[1].avatar} style={{background:'hsl(22, 94%, 49%)'}}><p style={{margintop:'-15em',fontSize:'20px'}}>{item.members[1].username[0]}</p></Avatar> 
               </Tooltip>}  
               <Avatar style={{ backgroundColor: 'hsl(22, 94%, 49%)' }} hidden={item.members.length===2}>+{item.members.length-2}</Avatar>
           </Avatar.Group>
           {/*            {this.state.member_id=[],
                      item.members.map(element => this.state.member_id.push(element.username) ),
                      console.log(this.state.member_id)} */}</p> 
 {this.state.member_id=[],
                      item.members.map(element => this.state.member_id.push(element.username) ),
                      console.log(this.state.member_id)}
                <Button
                  type="link"
                  style={{ marginLeft:"10%",marginTop:"2%",marginBottom:'5%',width:"80%"}}
                  className="btn btn-primary"
                  disabled={item.lock}
                > 
                <Link to={'community/:'+item.id}>
                <span hidden={!item.lock ||!this.state.member_id.includes(localStorage.getItem('user'))}  
                style={{fontSize:"27px", textAlign:'center'}}>
                        view
                      </span>
                      </Link>
                 <span hidden={!item.lock ||this.state.member_id.includes(localStorage.getItem('user'))}>
                        <LockFilled
                          style={{
                            position: "relative",
                            marginLeft: "5%",
                            marginRight:"0",
                            fontSize: "27px",
                          }}
                        />
                      </span>
                      <Link to={'community/:'+item.id}>
                 <span hidden={item.lock} style={{fontSize:"27px", textAlign:'center'}}>view</span>
                 </Link>
                </Button>
              </List.Item>
            )}
          />
        }
      </div>
    );
  }
  render() {
    return this.allCommunity();
  }
}
export default AllCommunity;