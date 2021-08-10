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
  Modal,
  Row,
  Col
} from "antd";
import axios from 'axios';
import "antd/dist/antd.css";
import { QuestionCircleOutlined, CheckCircleOutlined,DeleteFilled,CheckCircleFilled} from "@ant-design/icons";
import { PlusOutlined } from "@ant-design/icons";
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

class Cafe extends React.Component {
  state = {
    Avatar: "",
    name: "",
    Description: "",
    selected_game:"",
    List_of_board_games: [],
    suggestlist_game:[],
    //items: ["Chess", "tic-tac-toe", "monopoly"],
    Price: "",
    Open_time: "00:00",
    Close_time: "00:00",
    Telephone: "",
    lat:"",
    lon:"",
    msg: "",
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
    necessary_inputs:"",
    accept:false,
    massage:"",
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


  nameChange = (e) => {
    this.setState({ name: e.target.value });
  };
  descriptionChange = (e) => {
    this.setState({ Description: e.target.value });
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
  pricechange = (e) => {
    this.setState({ Price: e.target.value });
    //console.log("changed", e);
    // if (e > 0) {
    //   return Promise.resolve();
    // }
    // return Promise.reject("Price must be greater than zero!");
  };
  open_tChange = (e) => {
    if (e !== null) this.setState({ Open_time: e.format("LT") });
  };
  close_tCange = (e) => {
    if (e !== null) this.setState({ Close_time: e.format("LT") });
  };
  telephoneChange = (e) => {
    this.setState({ Telephone: e.target.value });
  };
  mapChange=(e)=>{
  console.log(e.target.geom)
  console.log(e.target.value.longitude)
    this.setState({ lat: e.target.geom , lon: e.target.value.longitude });
  
  };
 
 
  proxyurl= localStorage.getItem('url');
  onSubmit = (e) => {
     e.preventDefault();
     this.setState({loggedIn:"logging in"})

     let list=(localStorage.getItem('base64'));
     console.log(JSON.parse(list))
     const data={
      name:this.state.name,
      description:this.state.Description,
      price:this.state.Price,
      open_time:this.state.Open_time,
      close_time:this.state.Close_time,
      phone_number:this.state.Telephone,
      games:this.state.List_of_board_games,
      gallery:JSON.parse(list),
      latitude:localStorage.getItem('lat'),
      longitude:localStorage.getItem('lng'),
      city:localStorage.getItem('city')

  }

     if((this.state.name!=="") && (this.state.description!=="")&&(this.state.Price!==0)&&(this.state.Telephone!=="")){
    // e.target.reset();
    this.setState({necessary_inputs:"Ok"})
    axios.post(this.proxyurl+'/cafe/create_cafe/',JSON.stringify(data),{headers:{
      'Content-Type' : 'application/json','Access-Control-Allow-Credentials':true,
      'Accept' : 'application/json',
      'Authorization' :`Bearer ${localStorage.getItem('access')}`
    }}
  ).then((res)=>{
    message.open({content: 'Cafe added successfully.',duration: 2,style: {color: 'lime'}});
    this.setState({loggedIn:""});
    console.log(res.data+"reeee")
    this.setState({necessary_inputs:"added"})
  })
  .catch((error)=>
    {
   this.setState({loggedIn:""});
   message.open({content: 'something went wrong please try again.',duration:2,style: {color: 'red'}});
      console.log(error.respose+"errrr")
    })
  }
else
this.setState({necessary_inputs:"!Ok"})
message.open({content: 'Some required inputs not filled',duration:2,style: {color: 'red'}});
this.setState({loggedIn:""});
  };

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
onChangegame=(value)=>
{
  this.state.List_of_board_games=[]
  var dict = { "id": value }
  value.forEach(i=>{
  this.state.List_of_board_games.push({"id":i});})
  console.log(this.state.List_of_board_games)
  this.setState({ selected_game: value }, () => {
    console.log(this.state.selected_game, 'dealersOverallTotal1')
  })
}
  render() {
    const { items } = this.state;
    const previewVisible = this.state.previewVisible;
    const previewImage = this.state.previewImage;
    const fileList = this.state.fileList;
    const previewTitle = this.state.previewTitle;
    return (
      <div className="createplay" style={{with:'36%'}}>
       <h2 >Create Cafe</h2>
        <Form
          {...formItemLayout}
          // form={this.form}
          name="register-cafe"
          ref={(el) => (this.myFormRef = el)}
          onFinish={this.onSubmit}
          autocomplete="off"

          scrollToFirstError
          onSubmit={this.onSubmit.bind(this)}
        >
          {/* <p className ="ant-form-item-extra" >{this.state.msg==="There was something wrong with the server please try again"?
        "There was something wrong with the server please try again":""}</p> */}
             <Row>
      <Col span={10}><Form.Item
            name="name"
            onChange={this.onChange}
            rules={[
              {
                required: true,
                message: "Please input cafename!",
                whitespace: true,
              },
            ]}
          ><p> <span style={{color:"red"}}>*</span>cafe name :&nbsp;</p>
            <Input
              required
              name="name"
              onChange={(this.onChange, this.nameChange)}
            />
          </Form.Item>
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
            <p>Open : </p>
            <TimePicker
              style={{ width: '100%' }}
              use24Hours
              format={"HH:mm"}
              defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.onChange, this.open_tChange)}
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
          Board games :&nbsp;
          <Tooltip title="What board games are there in the cafe?">
            <QuestionCircleOutlined />
          </Tooltip>
        </p>
           <Select
           mode="multiple"
              showSearch
              style={{ width: '100%' }}
              placeholder="Select a game"
              optionFilterProp="children"
              onSearch={this.onSearchgame}
              //onSelect={this.onSelectgame}
              onChange={this.onChangegame}
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
          <Col span={2}></Col>
      <Col span={10}>
      <Form.Item
            onChange={this.onChange}
            name="Telephone"
            rules={[
              {
                required: true,
                message: "Please input phone number!",
                whitespace: true,
              },
            ]}
          >
            <p> <span style={{color:"red"}}>*</span> Phone number : &nbsp;</p>
            <Input
              name="Telephone"
              defaultValue="021-00000000"
              onChange={(this.onChange, this.telephoneChange)}
              style={{ width: '100%' }}
            />
          </Form.Item>
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
            <p>Close : </p>
            <TimePicker
               style={{ width: '100%' }}
              use24Hours
              format={"HH:mm"}
              defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.onChange, this.close_tCange)}
            />
          </Form.Item>
          <Form.Item
            name="Price"
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
            <span style={{color:"red"}}>*</span> Price : &nbsp;
                <Tooltip title="How much does each hour of playing in the cafe cost?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </p>
            <Input
               style={{ width: '100%' }}
              name="Price"
              defaultValue="100,000"
              onChange={(this.onChange, this.pricechange)}
            />
          </Form.Item>
          
          
          </Col>
    </Row> <Form.Item
            name="Description"
            rules={[
              {
                required: true,
                message: "Please input cafe address and some necessary description !",
                whitespace: true,
              },
            ]}
            onChange={this.onChange}
          >  <p> <span style={{color:"red"}}>*</span>
          Description :&nbsp;
          <Tooltip title="Type address and some descriptions about caffe">
            <QuestionCircleOutlined />
          </Tooltip>
        </p>
            <Input.TextArea
              required
              name="Description"
              onChange={(this.onChange, this.descriptionChange)}
            />
            </Form.Item>

        
          <Form.Item style={{color:"white"}}>to save each picture click on <CheckCircleFilled /> and for delete picture click on <DeleteFilled />
          <Gallery  />
          </Form.Item>
          <Form.Item  onChange={this.onChange}>
            <CafeMap onSelect={this.mapChange}  {...this.state}/>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
             className="btn btn-primary" style={{width: '100%'}}
              onClick={(this.onSubmit)}
              name="submit"
            >
              <span
                class={
                  this.state.necessary_inputs === "Ok"
                    ? "spinner-border spinner-border-sm"
                    : "all"
                }
                role={this.state.necessary_inputs === "Ok"
                ? "spinner-border spinner-border-sm"
                : "all"}
                aria-hidden={this.state.necessary_inputs === "Ok"
                ? "spinner-border spinner-border-sm"
                : "all"}
              ></span>
              {this.state.necessary_inputs === "added"
                ? "ََAdded"
                : "Add Caffe"}
            </Button>
            {/* <p style={{color:"green", width:'100%',fontSize:'11px', marginLeft:'-1%'}} className ="ant-form-item-extra2 ">{
                  this.state.necessary_inputs === "added"
                    ? "Cafe added successfuly"
                    : ""
            }</p><p style={{color:"red", width:'100%',fontSize:'11px', marginLeft:'-1%',marginTop:'2%'}} className ="ant-form-item-extra2 ">
              { this.state.necessary_inputs === "!Ok"
            ? "*All nessecory inputs should write"
            : ""}</p> */}
          </Form.Item>
        </Form>
      </div>
    );
  }
}
export default Cafe;