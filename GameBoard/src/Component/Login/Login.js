import React from "react";
import { Form, Input, Button, Checkbox,Divider } from "antd";
import Axios from "axios";
import {Link} from 'react-router-dom'
import '../../Style/design.scss';
const layout = {
  
  wrapperCol: {
    span: 0,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
};
class Login extends React.Component {
  state = {
    password: "",
    username: "",
    loggedIn:"",
    msg:""
  };
  onFinish = (values) => {
    console.log("Success:", values);
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  onChange = (e) => {
    e.persist()
    this.setState(a=>{
      return {
        [e.target.name]:e.target.value
      }
    })
    console.log(this.state)

  };
  
  proxyurl= localStorage.getItem('url');
  onSubmit=(e)=>{
    const login={
      username:this.state.username,
      password:this.state.password
    }
    if((this.state.username!=="")&&(this.state.password.length>=8)
   )
   {
    this.setState({loggedIn:"logging in"})
    Axios.post('http://goardbame.ir:8000/auth/login/',JSON.stringify(this.state),
    {
      headers:{'Content-Type':'application/json'}
    }).then((res)=>{
      const refreshToken = res.data.refresh;
      const accessToken = res.data.access;
      localStorage.setItem('refresh', refreshToken);
      localStorage.setItem('access', accessToken);
      localStorage.setItem('user', this.state.username);
      localStorage.setItem('email', this.state.email);
      localStorage.setItem('id',res.data.id);
      localStorage.setItem('pass', this.state.password);
      window.location.href=window.location.origin + "/homePage/:"+res.data.id;
      this.setState({msg:"loged_in"});

    })
    .catch((error)=>{
     if(JSON.stringify(error.response).includes("No active account found with the given credentials"))
     {
      this.setState({loggedIn:""});
       this.setState({msg:"Username or Password is wrong."});
     
     }
    else if(JSON.stringify(error.response).includes("Either the username or entry doesn't exist."))
     {
      this.setState({loggedIn:""});
      this.setState({msg:"Username or Password is wrong."});
    
     }
     else
     {
      this.setState({loggedIn:""});

     }
     
     
     // alert(JSON.stringify(error.response));
    })
    const login_json=JSON.stringify(login)
  }
  };
  render() {
    return (
      <div className="bg" >
      <div className="Login_container" style={{backgroundColor: '#333333'}}>
        {" "}
        <Form
                             autocomplete="off"

          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onSubmit}

          onFinishFailed={this.onFinishFailed}
          
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
            name="username"
            placeholder='Username'
            required
            onChange={this.onChange}

            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password 
            name="password"
            placeholder='password' 
            required
            onChange={this.onChange}
            />
          </Form.Item>

          
          <p className ="ant-form-item-extra" >
            {this.state.msg==="Username or Password is wrong."?"Username or Password is wrong. try again!":""}</p>
          <Form.Item {...tailLayout}>
            <Button className="btn btn-primary" htmlType="submit" name="submit"  style={{width: "100%"}} onClick={this.onSubmit}>
            <span
           class= {this.state.loggedIn==="logging in" ?"spinner-border spinner-border-sm":""}
            role={this.state.loggedIn==="logging in" ?"status":""}
          aria-hidden={this.state.loggedIn==="logging in" ?"true":""}>

          </span>
        {this.state.loggedIn==="logging in" ? "Loading...":"Submit" }
      
            </Button>
          </Form.Item>
        </Form>
        <Divider style={{marginLeft: "0%",color: "white" }}>OR</Divider>

        <div style={{display: 'flex',position: 'relative',width: '100%',textAlign: 'center'}}><p className ="ant-form-item-change" style={{color: "white",marginLeft: 'auto',marginRight: 'auto'}} >Don’t have an account? <Link to="signup">Sign up</Link></p></div> 
      </div>
      </div>
    );
  }
}
export default Login;