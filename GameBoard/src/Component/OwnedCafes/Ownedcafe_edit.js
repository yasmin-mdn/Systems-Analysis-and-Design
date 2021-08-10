import React from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import CafeMap from "./Map";
import Gallery from './gallery'
import '../../Style/design.scss';
import Mapir from "mapir-react-component";
import {
  Form,
  Input,
  Tooltip,
  InputNumber,
  AutoComplete,
  Button,
  Select,
  Divider,
  Upload,
  message,
  Modal,
  TimePicker,
  Row,
  Col
} from "antd";
import axios from 'axios';
import "antd/dist/antd.css";
import { QuestionCircleOutlined, CheckCircleOutlined,DeleteFilled,CheckCircleFilled} from "@ant-design/icons";
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

class Cafeedit extends React.Component {
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
    done:"",
    edit:"",
    Gamestring:[],
    Gameget:[],
    latitude: "",
    longitude: "",
    loggedIn:"",
    requests: 'false'

  };
  onFinish = (values) => {
  //  console.log("Received values of form: ", values);
};
onChange = (e) => {
    e.persist();
   // console.log(e.target.value);
   // console.log(e.target.name);
    this.setState(() => {
        return {
            [e.target.name]: e.target.value,
        };
    });
   // console.log(this.state);
};
proxyurl= localStorage.getItem('url');


getInfo=(e)=>
{
    
    if(this.state.done==="")
    {
let cafeid=localStorage.getItem("cafeid")    
    axios.get(this.proxyurl+'/cafe/edit_cafe/'+cafeid,{headers:{
        'Content-Type' : 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
    }}
).then((res)=>{  
    this.setState({requests: 'true'});
    this.setState({name:res.data.name});
    this.setState({description:res.data.description});
    this.setState({List_of_board_games:res.data.games});
    this.setState({open_time:res.data.open_time});
    this.setState({close_time:res.data.close_time});
    this.setState({price:res.data.price});
    this.setState({Telephone:res.data.phone_number});
    this.state.List_of_board_games.forEach((element) => {
      this.state.Gameget.push(element.name/* +"#"+element.id */)
      });
      this.state.List_of_board_games.forEach((element) => {
        this.state.Gamestring.push({"name":element.name ,"id":element.id})
        });
console.log(this.state.List_of_board_games)

this.setState({ latitude: res.data.latitude });
this.setState({ longitude: res.data.longitude });
this.setState({done:"yes"});
})
.catch((error)=>
{

        } 
        )
    
    }

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
  var dict = { "name": value }
  this.state.List_of_board_games.push(dict);
  this.setState({ selected_game: value }, () => {
  console.log(this.state.selected_game, 'dealersOverallTotal1')
  })
  console.log(this.state.List_of_board_games)

//  this.setState({edit:"true"});

};
nameChange=e=>{
  this.setState({name:e.target.value});
  this.setState({edit:"true"});
  //console.log(this.state.name);
};
descChange=e=>{
  this.setState({description:e.target.value});
  this.setState({edit:"true"});
  //console.log(this.state.description);
};
 gameChange=(e,value)=>{
   console.log(e,value) 
   this.state.Gamestring=[]
 
e.forEach(element=> 
{for(var i=0;i<this.state.List_of_board_games.length;i++)
{

  if(element==this.state.List_of_board_games[i].name)
  {  console.log(this.state.List_of_board_games[i].name)
    this.state.Gamestring.push({'name':this.state.List_of_board_games[i].name,'id':this.state.List_of_board_games[i].id})
  }
}}  );

   //console.log(value)
  //  var temp=this.state.Gamestring.filter(item=>{
  //   value.forEach(i=>{
  //   //  console.log(i.value)
  //     if(i.value===item.name)
  //     return true;
  //   }
   //   )
 // })
  //console.log(temp)
 
 value.forEach(i=>
 { if(typeof(i.key) !== "undefined"){
  console.log("wwww")
  this.state.Gamestring.push({'name':i.value,'id':parseInt(i.key)})}})
// e.forEach(element=>dict.push({"id":parseInt(element.split('#')[1]),"name":element.split('#')[0]}))
 //console.log(dict)
 //this.state.Gamestring=(dict)
 console.log(this.state.Gamestring);
 this.setState({edit:"true"}
);};
openChange=e=>{
  if (e !== null) this.setState({ open_time: e.format("LT") });
  this.setState({edit:"true"});
 // console.log(this.state.open_time);
};
closeChange=e=>{
  if (e !== null) this.setState({ close_time: e.format("LT") });
  this.setState({edit:"true"});
 // console.log(this.state.close_time);
};
priceChange=e=>{
  this.setState({price:e.target.value});
  this.setState({edit:"true"});
 // console.log(this.state.price);
};
phoneChange=e=>{
  this.setState({phone_number:e.target.value});
  this.setState({edit:"true"});
 // console.log(this.state.phone_number);
};
gamename(e){
  var array=[]
  if(e!==null){
  e.forEach(i=>array.push(i.name))
  }console.log(array)
   return array;
}
onSaveGeneral = (e) => {
  if((this.state.edit==="true") || (localStorage.getItem('base64')!==null))
  {
      e.preventDefault();
      let list=(localStorage.getItem('base64'));
    //  console.log(JSON.parse(list))
      this.setState({loggedIn:"logging in"})
  const data={
      id:localStorage.getItem("cafeid"),
      name:this.state.name,
      description:this.state.description,
      price:this.state.price,
      open_time:this.state.open_time,
      close_time:this.state.close_time,
      owner:parseInt((localStorage.getItem('id'))),
      games:this.state.Gamestring,
      gallery:JSON.parse(list),
      
  }
  console.log(data)
  axios.put(this.proxyurl+'/cafe/edit_cafe/'+localStorage.getItem("cafeid") + '/',JSON.stringify(data),{headers:{
      'Content-Type' : 'application/json;charset=utf-8',
      'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
  }}
).then((res)=>{  
  message.open({content: 'Changes have been made successfully.',duration: 2,style: {color: 'lime'}});
  this.setState({edit:""});
   this.setState({msg:"done"});
   this.setState({loggedIn:""});
   
   localStorage.setItem('avatar',data.avatar);
   localStorage.setItem('email',data.email);
   this.setState({done:""});
   this.getInfo();

//console.log("tttt")
} )
.catch((error)=>
{
this.setState({edit:""});
this.setState({loggedIn:""});
this.setState({msg:"something went wrong please try again."});
message.open({content: 'something went wrong please try again.',duration:2,style: {color: 'red'}});

      } 
      )
  
  }


  else
   { 
     message.open({content: "You haven't changed any information.",duration:2,style: {color: 'red'}});
      this.setState({msg:"You haven't changed any information."});
      this.setState({loggedIn:""});
  }

  
  }
componentDidMount() {
    this.getInfo();
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
            <div className="Cafe_container">
       <h2 style={{marginLeft:"-0.5%"}}>Edit Cafe</h2>
       
        <Form
          {...formItemLayout}
          // form={this.form}
          name="register-cafe"
          ref={(el) => (this.myFormRef = el)}
          onFinish={this.onSubmit}
          autocomplete="off"

          scrollToFirstError
          //onSubmit={this.onSubmit.bind(this)}
        >
          {/* <p className ="ant-form-item-extra" >{this.state.msg==="There was something wrong with the server please try again"?
        "There was something wrong with the server please try again":""}</p> */}
         <Row>
         <Col span={10}> <Form.Item
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
              placeholder={this.state.name===""?"cafe name":this.state.name}
              onChange={(this.nameChange)}
            />
          </Form.Item>
          <Form.Item
           // onChange={this.onChange}
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
              placeholder={this.state.open_time===""?"last name":this.state.open_time}
              //defaultValue={moment("00:00", "HH:mm")}
              onChange={(this.openChange)}
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
           // onChange={this.onChange}
          ><p>
          Board games :&nbsp;
          <Tooltip title="What board games are there in the cafe?">
            <QuestionCircleOutlined />
          </Tooltip>
        </p>
       <div>
           <Select
           mode="multiple"
              showSearch
              style={{ width: '100%' }}
              defaultValue={this.state.Gameget}
              optionFilterProp="children"
              onSearch={this.onSearchgame}
              //onSelect={this.onSelectgame}
              onChange={this.gameChange}
              
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }

            >
              {this.state.suggestlist_game.map(i => (
                <Option value={i.name/* +"#"+i.id */} key={i.id}>{i.name/* +"#"+i.id */}</Option>
              ))
              }</Select>
        </div> 
          
          </Form.Item>
          </Col>
          <Col span={2}></Col>
      <Col span={10}>  
      <Form.Item
           // onChange={this.onChange}
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
              placeholder={this.state.Telephone===""?"Phone":this.state.Telephone}
             // defaultValue="021-00000000"
              onChange={(this.phoneChange)}
              style={{ width: '100%' }}
            />
          </Form.Item>
          
           
          <Form.Item
          //  onChange={this.onChange}
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
              placeholder={this.state.close_time===""?"last name":this.state.close_time}
              //defaultValue={moment("00:00", "HH:mm")}
              onChange={( this.closeChange)}
            />
          </Form.Item>
          <Form.Item
            name="Price"
           // onChange={this.onChange}
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
              placeholder={this.state.price===""?"Price":this.state.price}
             // defaultValue="100,000"
              onChange={(this.priceChange)}
            />
          </Form.Item>
          </Col>
    </Row>
          <Form.Item
            name="Description"
            rules={[
              {
                required: true,
                message: "Please input cafe address and some necessary description !",
                whitespace: true,
              },
            ]}
          >  <p> <span style={{color:"red"}}>*</span>
          Description :&nbsp;
          <Tooltip title="Type address and some descriptions about caffe">
            <QuestionCircleOutlined />
          </Tooltip>
        </p>
            <Input.TextArea
              required
              name="description"
              placeholder={this.state.description===""?"description":this.state.description}
              onChange={this.descChange}
            
            />
            </Form.Item>
          <Form.Item>
<Gallery />
          </Form.Item>

          <div>
            <Button
             className="btn btn-primary" style={{width: '100%'}}
              onClick={this.onSaveGeneral} 
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
                ? "ََEdited"
                : "Edit Caffe"}
            </Button>
          </div>
          </Form>
          </div>
        );
    }
}
export default Cafeedit;