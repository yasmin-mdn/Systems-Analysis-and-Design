import React from 'react';
import ReactDOM from 'react-dom';
import '../../Style/design.scss';
import Av from './avatar.png';
import {
  UserOutlined
} from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import FormItem from 'antd/lib/form/FormItem';
import {
    Form,
    Input,
    Tabs,
    DatePicker,message 
} from "antd";
import{
    EditOutlined
  } from "@ant-design/icons";
const formItemLayout = {
 
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

const { TabPane } = Tabs;

class EditProfile extends React.Component {
    state = {
        avatar:"",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        newPassword: "",
        confirm_password: "",
        year:"",
        loggedIn:"",
         msg:"",
         edit:"",
         done:"",
         img:"",
         request: false
    };
    onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    onChange = (e) => {
        e.persist();
        console.log(e.target.value);
        console.log(e.target.name);
        this.setState(() => {
            return {
                [e.target.name]: e.target.value,
            };
        });
        console.log(this.state);
    };
    passChange=e=>{
        this.setState({password:e.target.value})
      }
      newPassChange=e=>{
        this.setState({newPassword:e.target.value})
      }
      confirmChange=e=>{
        this.setState({confirm_password:e.target.value})
      }
      firstChange=e=>{
        this.setState({firstname:e.target.value});
        this.setState({edit:"true"});

      }
      lastChange=e=>{
        this.setState({lastname:e.target.value});
        this.setState({edit:"true"});

      }
      emailChange=e=>{
        this.setState({email:e.target.value});
        this.setState({edit:"true"});

      }
    onyearChange=(date, dateString)=> {
         this.state.year=dateString;
         this.setState({edit:"true"});

      }
      Upload=async(e)=>{
        const file=e.target.files[0];
       const base64= await this.Convert(file)
       this.setState({img:base64});
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

      proxyurl= localStorage.getItem('url');

    onSaveGeneral = (e) => {
        if((this.state.edit==="true") &&(this.state.email.includes("@"))&&(this.state.email.includes(".com")))
        {
            e.preventDefault();
            this.setState({loggedIn:"logging in"})
        const data={
            email:this.state.email,
            first_name:this.state.firstname,
            last_name:this.state.lastname,
            avatar:this.state.img,
            age:this.state.year
        }
        axios.put(this.proxyurl+'/auth/edit_profile/',JSON.stringify(data),{headers:{
            'Content-Type' : 'application/json;charset=utf-8',
            'Access-Control-Allow-Credentials':true,
  'Accept' : 'application/json',
  'Authorization' :`Bearer ${localStorage.getItem('access')}`
        }}
    ).then((res)=>{ 
        message.open({content: 'Changes have been made successfully',duration: 2,style: {color: 'lime'}});
        this.setState({edit:""});
         this.setState({msg:"done"});
         this.setState({loggedIn:""});
         
         localStorage.setItem('avatar',data.avatar);
         localStorage.setItem('email',data.email);
         this.setState({done:""});
         this.getInfo();
        


    } )
    .catch((error)=>
    {
     this.setState({edit:""});
     this.setState({loggedIn:""});
     message.open({content: 'Failed to apply your changes',duration: 2,style: {color: 'red'}});
     this.setState({msg:"something went wrong please try again."});
            } 
            )
        
        }


        else
        {
            this.setState({msg:"You haven't changed any information."});
            this.setState({loggedIn:""});
        }

        
        }
    getInfo=(e)=>
    {
        
        if(this.state.done==="")
        {

        
        
        axios.get(this.proxyurl+'/auth/edit_profile/',{headers:{
            'Content-Type' : 'application/json;charset=utf-8',
            'Access-Control-Allow-Credentials':true,
  'Accept' : 'application/json',
  'Authorization' :`Bearer ${localStorage.getItem('access')}`
        }}
    ).then((res)=>{  
        
        this.setState({email:res.data.email});
        this.setState({firstname:res.data.first_name});
        this.setState({lastname:res.data.last_name});
        this.setState({img:res.data.avatar});
        this.setState({year:res.data.age});
        this.setState({done:"yes"});
        this.setState({request: true})
    
    } )
    .catch((error)=>
    {

            } 
            )
        
        }
    
    }
    
    onSavePassword = (e) => {
        if((this.state.newPassword!=="")&&(this.state.password!=="")&&(this.state.newPassword.length>=8)
  &&(this.state.newPassword===this.state.confirm_password))
   {
    
    
    e.preventDefault();
    this.setState({loggedIn:"logging in"})
    message.open({content: 'Changes have been made successfully',duration: 2,style: {color: 'lime'}});

        const data={
            old_password:this.state.password,
            password:this.state.newPassword
        }
        if(this.state.password===localStorage.getItem('pass'))
        {

        
        axios.put(this.proxyurl+'/auth/change_password/',JSON.stringify(data),{headers:{
            'Content-Type' : 'application/json;charset=utf-8',
            'Access-Control-Allow-Credentials':true,
  'Accept' : 'application/json',
  'Authorization' :`Bearer ${localStorage.getItem('access')}`
        }}
    ).then((res)=>{  
        
         
         this.setState({msg:"done"});
         this.setState({loggedIn:""});
         localStorage.setItem('pass',data.password);
    } )
    .catch((error)=>
    {

     this.setState({loggedIn:""});
     message.open({content: 'Failed to apply your changes',duration: 2,style: {color: 'red'}});

     this.setState({msg:"something went wrong please try again."});
     localStorage.setItem('pass',data.password);
            } 
            )
        
        }
        else
        {
            this.setState({msg:"Password is not correct!"});
            this.setState({loggedIn:""});
        }
    }
}
componentDidMount() {
    this.getInfo();
}
    render() {
        if(!this.state.request){
            return(
            <div class="d-flex justify-content-center" style={{marginTop: '23%'}}>
            <div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
            <span class="sr-only" >Loading...</span>
            </div>
            </div>
            )
          }
        return (
            
            <div className="EditProfile_container">
               
                <Form
                    {...formItemLayout}
                    name="Edit"
                     autocomplete="off"

                    onFinish={this.onSubmit}
                    scrollToFirstError
                >


                    <Tabs defaultActiveKey="1"  >
                        <TabPane tab="General" key="1" >
                            <FormItem><input type="file" onChange={this.Upload}  style={{display: 'none'}}
                            ref={fileInput=>this.fileInput=fileInput}></input>
                            
       <div    style={{backgroundImage: "url(" + this.state.img + ")",height: '34vh' ,position: 'relative',display: 'flex',backgroundSize: '100% 100%',backgroundAttachment: 'scroll'}}>
       <button  onClick={()=>this.fileInput.click()} className='btn btn-primary'
                            style={{marginTop: '25.5vh',borderRadius: '50%',marginLeft: '2%',width: '3.5vw',height: '3.5vw'}}><EditOutlined/> </button>
       </div>
      </FormItem>
                        <Form.Item
                        name="firstname"
                        rules={[
                            {
                                required: false,
                                whitespace: true,
                            }
                        ]}
                    >
                        <Input name="firstname" placeholder={this.state.firstname===""?"first name":this.state.firstname+" (optional)"} onChange={this.firstChange} />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        rules={[
                            {
                                required: false,
                                whitespace: true,
                            }
                        ]}
                    >
                        <Input name="lastname" placeholder={this.state.lastname===""?"last name":this.state.lastname+" (optional)"} onChange={this.lastChange} />
                    </Form.Item>


                    <Form.Item
                        name="email"
                        rules={[
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input name="email" placeholder={this.state.email} onChange={this.emailChange} />
                    </Form.Item>


                <span >
                    <Form.Item 
                        name="year"
                        rules={[
                            {
                                type:"date" ,
                                message: "The input is not valid year!",
                            },
                            {
                                required: false,
                            },
                        ]}
                    >
                         <DatePicker style={{width: '100%'}} name="year"  onChange={this.onyearChange} picker="year" />
                    </Form.Item></span>
                    <Form.Item {...tailFormItemLayout}>
                    <button type="button"  class="btn btn-primary" style={{width: '100%', marginLeft: '0%'}}
  
                        onClick={this.onSaveGeneral}  name="submit">
    
  
                        <span
                        class= {this.state.loggedIn==="logging in" ?"spinner-border spinner-border-sm":""}
                         role={this.state.loggedIn==="logging in" ?"status":""}
                        aria-hidden={this.state.loggedIn==="logging in" ?"true":""}>

                        </span>
                        {this.state.loggedIn==="logging in" ? "Loading...":"Save changes" }
                    </button>
                    </Form.Item>

                
             

                </TabPane>



                    <TabPane tab="Password" key="2" style={{float: 'right'}}>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your current password!",
                            },
                        ]}
                    >
                        <Input.Password name="password" placeholder='current password' onChange={this.passChange} />
                    </Form.Item>

                    <Form.Item
                        name="newPassword"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new password!",
                            },,({ getFieldValue }) => ({
                                validator(rule, value) {
                                  if (!value || JSON.stringify(value).length>=10) {
                
                                    return Promise.resolve();
                                  }
                
                                  return Promise.reject(
                                    "Password is too short." 
                                  );
                
                                },
                              }),
                        ]}
                        hasFeedback
                    >
                        <Input.Password name="newPassword" placeholder='new password' onChange={this.newPassChange} />
                    </Form.Item>


                    <Form.Item
                        name="confirm"
                        dependencies={["newPassword"]}
                        hasFeedback
                        onChange={this.confirmChange}
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your new password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue("newPassword") === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(
                                        "The two passwords that you entered do not match!"
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder='repeat password' />
                    </Form.Item>
                   

                    <Form.Item {...tailFormItemLayout}>
                    <button type="button" class="btn btn-primary" style={{width: '100%'}}
  
                        onClick={this.onSavePassword}  name="submit">
    
  
                        <span
                        class= {this.state.loggedIn==="logging in" ?"spinner-border spinner-border-sm":""}
                         role={this.state.loggedIn==="logging in" ?"status":""}
                        aria-hidden={this.state.loggedIn==="logging in" ?"true":""}>

                        </span>
                        {this.state.loggedIn==="logging in" ? "Loading...":"Change password" }
                    </button>
                    </Form.Item>
                  
                    </TabPane>
                </Tabs>
                </Form>
            </div>
        );
    }
}
export default EditProfile;