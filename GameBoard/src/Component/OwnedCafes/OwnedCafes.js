import React from "react";
import axios from "axios";
import { Card, } from 'antd';
import { FaCoffee } from "react-icons/fa";
import { AiFillDelete,AiFillClockCircle,AiOutlinePhone } from "react-icons/ai"
import { EditOutlined ,DeleteFilled,EditFilled} from '@ant-design/icons';
import '../../Style/OwnedCafes.css'
import '../../Style/design.scss'
import Av from './default_picture.png';
import { GiTwoCoins } from "react-icons/gi";
import { Modal, Button, Space ,message} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
let a="";
const { Meta } = Card;
const { confirm } = Modal;
class OwnedCafe extends React.Component {
  state = {
    mycafe:[],
    id: "",
    name: "",
    owner: "",
    description: "",
    games: [],
    price: "",
    open_time: "",
    close_time: "",
    phone_number: "",
    gallery: [],
    latitude: "",
    longitude: "",
    loggedIn:"",
    proxyurl: localStorage.getItem('url'),
    requests: 'false'
  }
 
   showDeleteConfirm(){
  confirm({
    title: 'Are you sure delete this cafe?',
    icon: <ExclamationCircleOutlined />,
    content: '',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk:()=>{
     const id= localStorage.getItem("cafeid");
     console.log(id);
     this.onClickDelete(id);
    },
    onCancel() {
      console.log('Cancel');
    },
  });
} 
  onClickDelete = (id) => {
    this.setState({loggedIn:"logging in"})
 
    //console.log("click")
    axios.delete(localStorage.getItem('url')+'/cafe/edit_cafe/'+id+'/', {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': true,
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    }
    )
      .then(res => {
        message.open({content: 'Cafe deleted successfully.',duration: 2,style: {color: 'lime'}});
        const data = res.data;
       // console.log(data);
       // alert("Cafe Deleted")
 this.setState({loggedIn:""});
        this.getInfo();
      })
      .catch((error) => {
      //  alert("somthing went wrong!")
      message.open({content: "something went wrong please try again.",duration: 2,style: {color: 'lime'}});
      this.setState({loggedIn:""});
      }
      )
    
  };
  getInfo=(e)=>
  { 
      axios.get(this.state.proxyurl+"/cafe/owner_cafes_list/",{headers:{
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
      }}
  ).then((res)=>{ 
    console.log(res.data)
    this.setState({mycafe:res.data})
    this.setState({requests: 'true'});
  }
  ).catch((error)=>{
   // alert('some thing is wrong')
  })};

  componentDidMount() {
    this.getInfo();
};
onClickedit = (id) => {
  localStorage.setItem("cafeid",id)
  console.log(localStorage.getItem("cafeid")+"=="+ id);
  window.location.href = "/editcafe/:" + id;
};
  render() {
    //alert('an');
    if( this.state.requests==='false')
        {

        
        return( <div style={{marginTop: '23%'}}> 
        <div class="d-flex justify-content-center" style={{marginTop: '0%'}}>
<div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
<span class="sr-only" >Loading...</span>
</div>
</div></div>)}
    return (
      <div className="mycafe_container">
      { this.state.mycafe.map(item =>(
        localStorage.setItem("cafeid",item.id),
       // console.log(localStorage.getItem('cafeid')),
      this.state.gallery=(item.gallery),
      this.state.gallery.forEach(item => a=(item.base64)),
        <Card className="mycafe_card"
        style={{width:'25%'}} 
        title={item.name}  
       cover={<img  className="photocafe" src={a===''?Av:a} style={{width:"98%", marginLeft:'1%'}}/>}
        description={item.description}
          actions={[
            <button className="button"  onClick ={() => this.onClickedit(item.id)}style={{backgroundColor:'#333',color:'#fff',width:'80%'}}>
          <EditFilled className="icon"/> 
          <p className="text_button">Edit</p>
            </button>,
          //   <button  className="button" onClick ={ this.onClickDelete(item.id)}style={{backgroundColor:'#333', color:'#fff',width:'80%'}}>
          // <DeleteFilled className="icon"/> 
          // <p className="text_button" >Delete</p>
          //   </button>
           <button className="button" onClick={()=>this.showDeleteConfirm()} type="dashed"
           style={{backgroundColor:'#333', color:'#fff',width:'80%'}}>
             <DeleteFilled className="icon"/> 
             <p className="text_button" >Delete</p>
         </button>
          ]}
        >
       
        </Card> ))}
      </div>
    )   
  }
}
export default OwnedCafe;