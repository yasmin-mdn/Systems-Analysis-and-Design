import React from "react";
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
  Switch 
} from "antd";
import axios from 'axios';
import "antd/dist/antd.css";
import { QuestionCircleOutlined, CheckCircleOutlined,DeleteFilled,CheckCircleFilled} from "@ant-design/icons";
import Av from './images.png';

const { Option } = Select;
const proxyurl =localStorage.getItem('url');

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
  
  class Community extends React.Component {
    state = {
      Avatar: "",
      name: "",
      img:"",
      description: "",
      owner:"",
      members: [],
      msg: "",
      fileList: [],
      necessary_inputs:"",
      suggestlist_user: [],
      lock: false
        };
      nameChange = (e) => {
        this.setState({ name: e.target.value });
      };
     
      descChange = (e) => {
        this.setState({ description: e.target.value });
      };
      
  handleChange = (value) => {
    axios.get(proxyurl + "/game/search_user/username/?search=" + value)
      .then(res => {
        const tmp = res.data.results;
        console.log(tmp)
        this.setState(prevState => {
          return { suggestlist_user: tmp }
        })
      })
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
  onChangelock=()=>{
    //  console.log(`switch to ${checked}`);
    if(this.state.lock){
      this.setState({lock: false});
    }
    else{
      this.setState({lock: true});
    }
   
  //  console.log(localStorage.getItem('lock'));

 //   this.setState({lock:checked});
//     if(checked){
//     this.setState({lock:"true"});
// }
// else{
//     this.setState({lock:"false"});

// }
  
}

  Upload=async(e)=>{
    const file=e.target.files[0];
   const base64= await this.Convert(file)
   this.setState({img:base64});
   console.log(this.state.img)
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
    onChange = (e) => {
      e.persist();
      console.log(this.state);
      this.setState((a) => {
        return {
          [e.target.name]: e.target.value,
        };
      });
    };
    proxyurl= localStorage.getItem('url');
    onSubmit = (e) => {
       e.preventDefault();
      // let list=(localStorage.getItem('base64'));
       //console.log(JSON.parse(list))
       const data={
        name:this.state.name,
        description:this.state.description,
      //  owner:this.state.owner,
        members:this.state.members,
       image:this.state.img,
       lock:this.state.lock,
     //  owner:localStorage.getItem('id')
    }
       if((this.state.name!=="") && (this.state.description!=="")){
      // e.target.reset();
      console.log(data)
      this.setState({necessary_inputs:"Ok"})
      axios.post(this.proxyurl+'/community/create_community/',JSON.stringify(data),{headers:{
        'Content-Type' : 'application/json','Access-Control-Allow-Credentials':true,
        'Accept' : 'application/json',
        'Authorization' :`Bearer ${localStorage.getItem('access')}`
      }}
    ).then((res)=>{
      console.log(res.data+"reeee")
      this.setState({necessary_inputs:"added"})
    })
    .catch((error)=>
      {
        console.log(error.respose+"errrr")
      })
    }
  else
  this.setState({necessary_inputs:"!Ok"})
    };
    render() {
 return (
          <div className="EditProfile_container" style={{with:'36%'}}>
       <h2  style={{marginLeft:"-0.5%"}}>Create Community</h2>
           
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
              <Form.Item>
              <img src={this.state.img===''?Av:this.state.img} style={{float: 'left' , marginBottom:'5%'}}height="50px" ></img>
       
        <input type="file" onChange={this.Upload}  style={{display: 'none'}}
                            ref={fileInput=>this.fileInput=fileInput}></input>
                            <Button  className="btn btn-primary" onClick={()=>this.fileInput.click()}
                            style={{float: 'left'}}>Choose image</Button>
                            
                            </Form.Item>
              <Form.Item
                name="name"
                onChange={this.onChange}
                rules={[
                  {
                    required: true,
                    message: "Please input community name!",
                    whitespace: true,
                  },
                ]}
              ><p> <span style={{color:"red"}}>*</span>Community name :&nbsp;</p>
                <Input
                  required
                  name="name"
                  onChange={(this.nameChange)}
                />
              </Form.Item>
              
              <Form.Item
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
              <Tooltip title="Descriptions about community">
                <QuestionCircleOutlined />
              </Tooltip>
            </p>
                <Input.TextArea
                  required
                  name="description"
                  onChange={(this.onChange, this.descriptionChange)}
                />
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
          <Form.Item>
              <p>Set community private:</p>
          <Switch defaultChecked onChange={this.onChangelock} />
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
                : "Add Community"}
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
export default Community;