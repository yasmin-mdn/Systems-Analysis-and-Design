import React from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../Style/design.scss';

import {
  Form,
  Input,
  Tooltip,
  Select,
  AutoComplete,
  Button,
  Divider 
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {Link, Redirect, Route} from 'react-router-dom'
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
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

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    loggedIn:"",
    msg:"",
    
  };
  proxyurl= localStorage.getItem('url');
  emailChange=e=>{
   this.setState({email:e.target.value})
  }
  userChange=e=>{
    this.setState({username:e.target.value})
  }
  passChange=e=>{
    this.setState({password:e.target.value})
  }
  confirmChange=e=>{
    this.setState({confirm_password:e.target.value})
  }
  
  handle=e=>{
    if((this.state.email!=="")&&(this.state.username!=="")&&(this.state.password.length>=8)
    &&(this.state.email.includes("@"))&&(this.state.email.includes(".com"))&&(this.state.password===this.state.confirm_password))
   {
    e.preventDefault();
    this.setState({loggedIn:"logging in"})
    
    axios.post('http://goardbame.ir:8000/auth/register/',JSON.stringify(this.state) 
    ,{
      headers:
      {'Content-Type': 'application/json',
      }
    }
    ).then((res)=>{  
      const refreshToken = res.data.refresh;
      const accessToken = res.data.access;
      localStorage.setItem('refresh', refreshToken);
      localStorage.setItem('access', accessToken);
      localStorage.setItem('user', this.state.username);
      localStorage.setItem('email', this.state.email);
      localStorage.setItem('pass', this.state.password);
      localStorage.setItem('id',res.data.id);
      window.location.href=window.location.origin + "/homePage/:"+res.data.id;
      this.setState({msg:"signed_in"});
       
    })
    .catch((error)=>
    {
    if(JSON.stringify(error.response).substring(1,100).includes("A user with that username already exists."))
    {
      this.setState({loggedIn:""})
      this.setState({msg:"A user with that username already exists."});
       
    }
      //
    else if(JSON.stringify(error.response).substring(1,100).includes("The fields email must make a unique set."))
    {
      this.setState({loggedIn:""})
      this.setState({msg:"There is already an account with this email"});
    }
    else
    {
      this.setState({loggedIn:""})
      this.setState({msg:"There was something wrong with the server please try again"})
     
    }
    }
    )
  }
}

  onFinish = (values) => {
   //this.handle;
  };
  onChange = (e) => {
    e.persist();

    this.setState((a) => {
      return {
        [e.target.name]: e.target.value,
      };
    });
  };
  onSubmit = (e) => {
    
      e.preventDefault();
      e.target.reset();
 
  };
  
  render() {
    return (
      <div className="bg" >
     
      <div className="Signup_container" style={{backgroundColor: '#333333'}}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        {" "}
        <Form
          {...formItemLayout}
          // form={this.form}
          name="register"
          ref={(el) => this.myFormRef = el}
          onFinish={this.onSubmit}
          scrollToFirstError
          autocomplete="off"
          onSubmit={this.onSubmit.bind(this)}
        >
           <p className ="ant-form-item-extra" >{this.state.msg==="There was something wrong with the server please try again"?
    "There was something wrong with the server please try again":""}</p>
          <Form.Item
            name="username"
            
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input name="username" placeholder='Username' required onChange={this.onChange , this.userChange} />
          </Form.Item>
          <p className ="ant-form-item-extra" >{this.state.msg==="A user with that username already exists."? 
    "A user with that username already exists.":""}</p>
          <Form.Item
            name="email"
            
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",

              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input name="email" placeholder="E-mail" required onChange={this.onChange , this.emailChange} />
          </Form.Item>
            <p className ="ant-form-item-extra" >{this.state.msg==="There is already an account with this email"?
    "There is already an account with this email":""}</p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },({ getFieldValue }) => ({
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
          <Input.Password name="password" placeholder='password' required onChange={this.onChange,this.passChange} />
          </Form.Item>

          <Form.Item
            name="confirm"
            
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );

                },
              }),
            ]}
          >
            <Input.Password name="confirm"  placeholder="Confirm Password"required onChange={this.onChange,this.confirmChange}/>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
          <button type="button" id="myBtn" class="btn btn-primary" 
          style={{width: "100%"}}
          onClick={this.handle}  name="submit">
            
          
          <span
           class= {this.state.loggedIn==="logging in" ?"spinner-border spinner-border-sm":""}
            role={this.state.loggedIn==="logging in" ?"status":""}
          aria-hidden={this.state.loggedIn==="logging in" ?"true":""}>

          </span>
        {this.state.loggedIn==="logging in" ? "Loading...":"Create account  " }
      </button>
      </Form.Item>
      

        </Form>
        <Divider style={{marginLeft: "0%" ,color: "white" }}>OR</Divider>
      <div style={{display: 'flex',position: 'relative',width: '100%',textAlign: 'center'}}>  <p className ="ant-form-item-change"style={{marginLeft: "auto",marginRight: 'auto',color: "white" }}  >Already have an account? <Link to="/">Log in</Link></p></div>
      </div>
      </div>
    );
  }
}
export default Signup;