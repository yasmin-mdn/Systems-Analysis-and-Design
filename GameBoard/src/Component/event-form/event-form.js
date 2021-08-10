import React from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import CafeMap from "../Map/Map";
import Gallery from "./gallery"
import '../../Style/design.scss';
import {
  Form,
  Input,
  Tooltip,
  InputNumber,
  AutoComplete,
  Button,
  Select,
  Divider,
  TimePicker,
  Upload,
  message,
  Col,
  Row,
  Modal,
  DatePicker
} from "antd";
import axios from 'axios';
import "antd/dist/antd.css";
import { QuestionCircleOutlined, CheckCircleOutlined,DeleteFilled,CheckCircleFilled} from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
const { RangePicker } = TimePicker;
const { Option } = Select;
const { Dragger } = Upload;
let index = 0;
let base64="";
const mapdetail={CafeMap}
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
        span: 0,
    },
    sm: {
        span: 24,
    },
},
};
const tailFormItemLayout = {
wrapperCol: {
    xs: {
        span: 24,
        offset: 8,
    },
    sm: {
        span: 24,
        offset: 0,
    },
},
};

class Event extends React.Component {
  state = {
    selected_game:"",
    List_of_board_games: [],
    suggestlist_game:[],
    time: "00:00",
    eventdate:Date().toLocaleString(),
    Max:"1",
    place:'',
    msg: "",
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    necessary_inputs:"",
    accept:false,
    massage:"",
    suggestlist_user: [],
    suggestlist_game:[],
    suggestlist_cafe: [],
    selected_cafe: "",
    community:[],
    loggedIn:""
  };

  
  onChange = (e) => {
    e.persist();
    console.log(this.state);
    this.setState((a) => {
      return {
        [e.target.name]: e.target.value,
      };
    });
  };
  l_o_bgChange = (e) => {
    var dict = { item: e };
    // this.state.List_of_board_games.push(dict);
    this.setState(
      { List_of_board_games: this.state.List_of_board_games + " " + e },
      () => {
        console.log(this.state.List_of_board_games);
      }
    );
  };
  
  timeChange = (e) => {
    if (e !== null) this.setState({ time: e.format("LT") });
  };
 
  proxyurl= localStorage.getItem('url');
  onSubmit = (e) => {
     e.preventDefault();
     this.setState({loggedIn:"logging in"})

     let list=(localStorage.getItem('base64'));
     console.log(JSON.parse(list))
     const data={
      members:this.state.members,
      games:this.state.List_of_board_games,
      gallery:JSON.parse(list),
      date:this.state.eventdate,
      time:this.state.time,
      maxMember:parseInt(this.state.Max),
      place:this.state.place,
      community:localStorage.getItem('com_id')
  }

    
  
    this.setState({necessary_inputs:"Ok"})
    axios.post(this.proxyurl+'/community/create_event/',JSON.stringify(data),{headers:{
      'Content-Type' : 'application/json','Access-Control-Allow-Credentials':true,
      'Accept' : 'application/json',
      'Authorization' :`Bearer ${localStorage.getItem('access')}`
    }}
  ).then((res)=>{
    message.open({content: 'Event added successfully.',duration: 2,style: {color: 'lime'}});
    this.setState({loggedIn:""});
    this.setState({necessary_inputs:"added"})
     window.location.href='/community/:'+localStorage.getItem('com_id')
    
  })
  .catch((error)=>
    {this.setState({loggedIn:""});
    message.open({content: 'something went wrong please try again.',duration:2,style: {color: 'red'}}); 
      console.log(error.respose+"errrr")
    })
  };
     
  handleChange = (value) => {
    axios.get(this.proxyurl + "/game/search_user/username/?search=" + value)
      .then(res => {
        const tmp = res.data.results;
        console.log(tmp)
        this.setState(prevState => {
          return { suggestlist_user: tmp }
        })
      })
  }
  onChangedate(date,dateString) {
    this.setState({eventdate:dateString})
    console.log(dateString);
  }
  onChangemax(e){
      console.log(e.target.value)
      this.setState({Max:e.target.value})
  }
  onSelectuser = (value) => {
    this.state.members=[]
    var dict =[]
    value.forEach(v=> this.state.members.push({ "username": v}))
    this.setState({ selected_user: value }, () => {
      console.log(this.state.selected_user, 'dealersOverallTotal1')
    })
    console.log(this.state.members)
  }
  onSearchgame = (value) => {
    axios.get(this.proxyurl + "/game/search_game/name?search=" + value)
      .then(res => {
        const tmp = res.data.results;
        this.setState(prevState => {
          return { suggestlist_game: tmp }
        })
      })
  };

  onSelectgame = (value) => {
    var dict = { "id": value }
    this.state.List_of_board_games.push(dict);
    this.setState({ selected_game: value }, () => {
      console.log(this.state.selected_game, 'dealersOverallTotal1')
    })
  };
  onSelectCafe = (value) => {

    this.setState({ selected_cafe: value })
    this.setState({ place: value })

  }
  onSearchcafe = (value) => {
    axios.get(this.proxyurl + "/cafe/search_cafe/name?search=" + value)
      .then(res => {
        const tmp = res.data.results;
        this.setState(prevState => {
          return { suggestlist_cafe: tmp }
        })
      })
  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.onChangedate = this.onChangedate.bind(this);
    this.onChangemax = this.onChangemax.bind(this);

  };

  render() {
    const { items } = this.state;
    const previewVisible = this.state.previewVisible;
    const previewImage = this.state.previewImage;
    const fileList = this.state.fileList;
    const previewTitle = this.state.previewTitle;
    return (
      <div className="EditProfile_container" style={{width:'50%'}}>
       <h2>Event Form</h2>
      <Form
          {...formItemLayout}
          // form={this.form}
          name="register-event"
          ref={(el) => (this.myFormRef = el)}
          onFinish={this.onSubmit}
          autocomplete="off"

          scrollToFirstError
          onSubmit={this.onSubmit.bind(this)}
        >
          {/* <p className ="ant-form-item-extra" >{this.state.msg==="There was something wrong with the server please try again"?
        "There was something wrong with the server please try again":""}</p> */}
         
          <Row><Col span={10}> 
          <Form.Item>
                <p>
          Date
        </p>
              <DatePicker
               style={{ width: '100%' }}
              onChange={this.onChangedate} />
            </Form.Item>

            <Form.Item>
          <p>Place : </p>
              <AutoComplete
              onSelect={this.onSelectCafe}
              onSearch={this.onSearchcafe}
              placeholder="where did you play?"
             onChange={this.onSelectCafe}
            >

              {this.state.suggestlist_cafe.map(item => (
                <Option value={item.name}>{item.name}</Option>
              ))
              }
            </AutoComplete>

          </Form.Item>

         <Form.Item>
                <p>
          Members :&nbsp;
          <Tooltip title="Users in your community">
            <QuestionCircleOutlined />
          </Tooltip>
        </p>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="users"
              defaultValue={[]}
              filterOption={false}
              //onChange={this.onSelectuser}
              onSearch={this.handleChange}
              onChange={this.onSelectuser}
            >
              {
                this.state.suggestlist_user.map(d => (
                  <Option key={d.username}>{d.username}</Option>
                ))}
            </Select>
          </Form.Item>
          </Col><Col span={2}></Col>
          <Col span={10}>
              <Form.Item
            onChange={this.onChange}
            rules={[
              {
                required: true,
                message: "this item is require",
                whitespace: true,
              },
            ]}
          >
            <p>Time : </p>
            <TimePicker
              style={{ width: '100%' }}
              use24Hours
              format={"HH:mm"}
              defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.onChange, this.timeChange)}
            />
          </Form.Item>
          <Form.Item
            name="Max"
            onChange={this.onChange}
            rules={[
              {
                required: true,
                message: "Please input cafe address and some necessary description !",
                whitespace: true,
              },
            ]}
          >
            <p>
            <span style={{color:"red"}}>*</span> Max member : &nbsp;
                <Tooltip title="How much does each hour of playing in the cafe cost?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </p>
            <Input
               style={{ width: '100%' }}
              name="Max"
              defaultValue={this.state.Max}
              onChange={(this.onChangemax)}
            />
          </Form.Item>
         
            
           <Form.Item
            rules={[
              {
                required: false,
                message: "Select Board games of caffe",
                whitespace: true,
              },
            ]}
            onChange={this.onChange}
          ><p>
          Board games 
        </p>
           <Select
           mode="multiple"
              showSearch
              style={{ width: '100%' }}
              placeholder="Select a game"
              optionFilterProp="children"
              onSearch={this.onSearchgame}
              onSelect={this.onSelectgame}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }

            >
              {this.state.suggestlist_game.map(item => (
                <Option value={item.id}>{item.name}</Option>
              ))
              }</Select>
          </Form.Item>
         </Col>
         </Row>
         
          <Form.Item style={{color:"white"}}>to save each picture click on <CheckCircleFilled /> and for delete picture click on <DeleteFilled />
          <Gallery  />
          </Form.Item> 
          <p></p>
          <Form.Item {...tailFormItemLayout}>
            <Button
             className="btn btn-primary" style={{width: '100%'}}
              onClick={(this.onSubmit)}
              name="submit"
            >
               <span
                        class= {this.state.loggedIn==="logging in" ?"spinner-border spinner-border-sm":""}
                         role={this.state.loggedIn==="logging in" ?"status":""}
                        aria-hidden={this.state.loggedIn==="logging in" ?"true":""}>

                        </span>
                        {this.state.loggedIn==="logging in" ? "Loading...":"Add Event" }
                  
            </Button>

          </Form.Item>
       </Form>
      </div>
    );
  }
}
export default Event;