import React from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../Style/design.scss';
import Gallery from './galleryedit'
import Play from './playlist'
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
const { RangePicker } = TimePicker;
const { Option } = Select;
const { Dragger } = Upload;
let index = 0;
let base64="";
let p="";
//const mapdetail={CafeMap}
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

class Eventedit extends React.Component {
  state = {
    id:"",
    //image: "",
      owner: "",
     // img:"",
      members: [],
      msg: "",
      memberList: [],
      plays:[],
      playsList:[],
      games:[],
      gameget:[],
      date:Date().toLocaleString(),
      time:"00:00",
      maxmember:"",
      place:"",
    selected_game:"",
    gamestring:[],
      necessary_inputs:"",
      suggestlist_user: [],
      suggestlist_game:[],
      suggestlist_cafe:[],
      selected_cafe: "",
      selected_user: "",
      getmembers:[],
      memberstring:[],
    List_of_board_games: [],
      lock:"",
    done:"",
    edit:"",
    loggedIn:""

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
Upload=async(e)=>{
  const file=e.target.files[0];
 const base64= await this.Convert(file)
 this.setState({image:base64});
 console.log(this.state.image)
 this.setState({edit:"true"})
}
Convert=(f)=>{
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(f);
    fileReader.onload=()=>{
      resolve(fileReader.result);
    };
    fileReader.onerror=(err)=>{
      reject(err);
    };
  }) ;
}

getInfo=(e)=>
{
    
    if(this.state.done==="")
    {
let com_id=localStorage.getItem("com_id")    
    axios.get(this.proxyurl+'/community/edit_event/'+3+"/",{headers:{
        'Content-Type' : 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
    }}
).then((res)=>{  
    console.log(res.data);
    
    this.setState({id:res.data.id});
    this.setState({owner:res.data.owner});
    this.setState({List_of_board_games:res.data.games}) ;  
    this.state.List_of_board_games.forEach((element) => {
        this.state.gameget.push(element.name)
        }); 
     this.state.List_of_board_games.forEach((e)=>{
        this.state.gamestring.push({'name':e.name,"id":e.id})
    })
    this.setState({place:res.data.place});
    this.setState({time:res.data.time.substring(0,5)});
    this.setState({date:res.data.date});
    this.setState({members:res.data.members});
    this.state.members.map(m=>this.state.memberList.push(m.username) )
    this.state.members.forEach((e)=>{
        this.state.getmembers.push(e.username)
    })
    this.state.members.forEach((e)=>{
        this.state.memberstring.push({"username":e.username})
    })
   
   this.setState({maxmember:res.data.maxMember});
  
 console.log(this.state.date);
    this.setState({plays:res.data.plays});
    this.state.plays.map(p=>this.state.playsList.push(p.id) );


this.setState({done:"yes"});
})
.catch((error)=>
{

        } 
        )
    
    }

}
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
onSelectCafe = (value) => {
if(value!==null)
    this.setState({ selected_cafe: value })
    this.setState({ place: value })
console.log(this.state.place)
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
onSelectuser = (value) => {
  this.state.members=[]
  var dict =[]
  value.forEach(v=> this.state.members.push({ "username": v}))
  this.setState({ selected_user: value }, () => {
    console.log(this.state.selected_user, 'dealersOverallTotal1')
  })
  console.log(this.state.members)
  this.setState({edit:"true"});
}
onuserchange=(e)=>{
    console.log(e) 
this.state.memberstring=[]
e.forEach(
    v=> this.state.memberstring.push({ "username": v}));
    // {for(var i=0;i<this.state.members.length;i++)
    // {
    
    //   if(element==this.state.members[i].username)
    //   {  console.log(this.state.members[i].username)
    //     this.state.memberstring.push({'username':this.state.members[i].username,'email':this.state.members[i].email})
    //   }
    // }}  );
    this.setState({edit:"true"});
    console.log(this.state.memberstring) 

}
disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
gameChange=(e,value)=>{
    console.log(e,value) 
    this.state.gamestring=[]
  
 e.forEach(element=> 
 {for(var i=0;i<this.state.List_of_board_games.length;i++)
 {
 
   if(element==this.state.List_of_board_games[i].name)
   {  console.log(this.state.List_of_board_games[i].name)
     this.state.gamestring.push({'name':this.state.List_of_board_games[i].name,'id':this.state.List_of_board_games[i].id})
   }
 }}  );
 value.forEach(i=>
    { if(typeof(i.key) !== "undefined"){
     console.log("wwww")
     this.state.gamestring.push({'name':i.value,'id':parseInt(i.key)})}})
   // e.forEach(element=>dict.push({"id":parseInt(element.split('#')[1]),"name":element.split('#')[0]}))
    //console.log(dict)
    //this.state.Gamestring=(dict)
    console.log(this.state.gamestring);
    this.setState({edit:"true"}
   );};
nameChange=e=>{
  this.setState({name:e.target.value});
  this.setState({edit:"true"});
  //console.log(this.state.name);
};
onChangemax=e=>{
    this.setState({maxmember:e.target.value});
    this.setState({edit:"true"});  
}
timeChange=e=>{ 
     console.log(e.format("LT"))
     this.setState({ time:e.format("LT") });
     this.setState({edit:"true"});
     console.log(this.state.time);
};
onChangedate=e=>{
    console.log(e.format("YYYY-MM-DD"));
    if(e!== null)
  this.setState({date:e.format("YYYY-MM-DD")});
  this.setState({edit:"true"});
  console.log(this.state.date);
};
onChangelock(checked) {
  //  console.log(`switch to ${checked}`);
  this.setState(prevState =>{
    return {lock: checked}
  })
  this.setState({edit:"true"});}
onSaveGeneral = (e) => {
  if((this.state.edit==="true" && this.state.memberstring.length<=this.state.maxmember)
  || (localStorage.getItem('base64')!==null))
  {
  console.log(this.state.gamestring);
  console.log(this.state.memberstring);


      e.preventDefault();
      this.setState({loggedIn:"logging in"})
      let list=(localStorage.getItem('base64'));
       p=( localStorage.getItem("plays"))
       console.log(p.split(','))
      if(p!==null)
      {
      for(let i=0;i<p.split(',').length;i++)
      {
          this.state.plays.push({"id":p.split(',')[i]});
      }
        }
       console.log(this.state.plays)

  const data={
      id:this.state.id,
      date:this.state.date,
      time:this.state.time,
      place:this.state.place,
      maxMember:this.state.maxmember,
      owner:localStorage.getItem('id'),
      members:this.state.memberstring,
      games:this.state.gamestring,
      gallery:JSON.parse(list),
      plays:this.state.plays
      
      
  }
  console.log("save")
  console.log(data)
  axios.put(this.proxyurl+'/community/edit_event/'+this.state.id+ '/',JSON.stringify(data),{headers:{
      'Content-Type' : 'application/json;charset=utf-8',
      'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
  }}
).then((res)=>{  
    message.open({content: 'Changes have been made successfully',duration: 2,style: {color: 'lime'}});
  this.setState({edit:""});
   this.setState({msg:"done"});
   this.setState({done:""});
   this.setState({loggedIn:""});
   this.getInfo();


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
if(this.state.memberstring.length>this.state.maxmember)
{
    message.open({content: 'The selected members are more than maxmember ',duration:2,style: {color: 'red'}});

}

  else
  {
    message.open({content: "You haven't changed any information.",duration:2,style: {color: 'red'}});
      this.setState({msg:""});
      this.setState({loggedIn:""});
  }

  
  }
componentDidMount() {
    this.getInfo();
}

    render() {
        return (   
            <div className="Cafe_container" style={{with:'30%'}}>
       
       <Form
          {...formItemLayout}
          // form={this.form}
          name="register-event"
          ref={(el) => (this.myFormRef = el)}
          onFinish={this.onSubmit}
          autocomplete="off"
          scrollToFirstError
          //onSubmit={this.onSubmit.bind(this)}
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
              onChange={this.onChangedate} 
              placeholder={this.state.date}
              disabledDate={this.disabledDate}
              />
            </Form.Item>

            <Form.Item>
          <p>Place : </p>
              <AutoComplete
              onSelect={this.onSelectCafe}
              onSearch={this.onSearchcafe}
              placeholder={this.state.place===""?"where did you play?":this.state.place}
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
              defaultValue={this.state.getmembers}
              filterOption={false}
              //onChange={this.onSelectuser}
              onSearch={this.handleChange}
              onChange={this.onuserchange}
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
           // onChange={this.onChange}
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
              placeholder={this.state.time}
              onChange={(this.timeChange)}
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
            <p> Max member :
              </p>
            <Input
               style={{ width: '100%' }}
              name="Max"
              onChange={(this.onChangemax)}
            placeholder={this.state.maxmember}

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
             // onSelect={this.onSelectgame}
             onChange={this.gameChange}

              defaultValue={this.state.gameget}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }

            >
              {this.state.suggestlist_game.map(item => (
                <Option value={item.name} key={item.id}>{item.name}</Option>
              ))
              }</Select>
          </Form.Item>
          
         </Col>
         </Row>
         <Form.Item>
              <Play/>
          </Form.Item>
          <Form.Item style={{color:"white"}}>to save each picture click on <CheckCircleFilled /> and for delete picture click on <DeleteFilled />
          <Gallery  />
          </Form.Item> 
          <p></p>
          <Form.Item {...tailFormItemLayout}>
          <button type="button" class="btn btn-primary" style={{width: '100%'}}
  
  onClick={this.onSaveGeneral}  name="submit">


  <span
  class= {this.state.loggedIn==="logging in" ?"spinner-border spinner-border-sm":""}
   role={this.state.loggedIn==="logging in" ?"status":""}
  aria-hidden={this.state.loggedIn==="logging in" ?"true":""}>

  </span>
  {this.state.loggedIn==="logging in" ? "Loading...":"Change password" }
</button>
            <p style={{color:"green", width:'100%',fontSize:'11px', marginLeft:'-1%'}} className ="ant-form-item-extra2 ">{
                  this.state.necessary_inputs === "added"
                    ? "Cafe added successfuly"
                    : ""
            }</p><p style={{color:"red", width:'100%',fontSize:'11px', marginLeft:'-1%',marginTop:'2%'}} className ="ant-form-item-extra2 ">
              { this.state.necessary_inputs === "!Ok"
            ? "*All nessecory inputs should write"
            : ""}</p>
          </Form.Item>
       </Form>
          </div>
        );
    }
}
export default Eventedit;