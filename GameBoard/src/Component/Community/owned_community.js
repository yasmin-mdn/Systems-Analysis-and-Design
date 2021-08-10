import React from "react";
import axios from "axios";
import {Modal, Card,message} from 'antd';
import { FaCoffee } from "react-icons/fa";
import { AiFillDelete,AiFillClockCircle,AiOutlinePhone } from "react-icons/ai"
import { EditOutlined ,DeleteFilled,EditFilled} from '@ant-design/icons';
import '../../Style/OwnedCafes.css'
import '../../Style/design.scss'
import Av from './images.png';
import { GiTwoCoins } from "react-icons/gi";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { confirm } = Modal;
class OwnedCommunity extends React.Component {
  state = {
    mycommunity:[],
    Avatar: "",
    name: "",
    img:[],
    description: "",
    owner:"",
    members: [],
    msg: "",
    fileList: [],
    necessary_inputs:"",
    suggestlist_user: [],
    requests: 'false',
    lock:"",
  done:"",
  edit:"",
  loggedIn:"",
    proxyurl:localStorage.getItem('url'),
  }

  showDeleteConfirm(id){
    confirm({
      title: 'Are you sure delete this community?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk:()=>{
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
      axios.delete(localStorage.getItem('url')+'/community/edit_community/'+id+'/', {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Credentials': true,
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      }
      )
        .then(res => {
    message.open({content: 'Community deleted successfully.',duration: 2,style: {color: 'lime'}});
          const data = res.data;
         // console.log(data);
         // alert("Cafe Deleted")
   this.setState({loggedIn:""});
          this.getInfo();
        })
        .catch((error) => {
    message.open({content: "something went wrong please try again.",duration: 2,style: {color: 'lime'}});
    this.setState({loggedIn:""});
        //  alert("somthing went wrong!")
        }
        )
      
    };
    onClickedit = (id) => {
      localStorage.setItem("com_id",id)
      console.log(localStorage.getItem("com_id")+"=="+ id);
      window.location.href = "/editCommunity/:" + id;
    };
  getInfo=(e)=>
  { 
      axios.get(this.state.proxyurl+"/community/owner_communities_list/",{headers:{
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Credentials':true,
'Accept' : 'application/json',
'Authorization' :`Bearer ${localStorage.getItem('access')}`
      }}
  ).then((res)=>{ 
   console.log(res.data)
    this.setState({mycommunity:res.data})
    this.setState({requests: 'true'});
  }
  ).catch((error)=>{
   // alert('some thing is wrong')
  })};

  componentDidMount() {
    this.getInfo();
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
      { this.state.mycommunity.map(item =>(
        //localStorage.setItem("com_id",item.id),
       // console.log(localStorage.getItem('cafeid')),
      this.state.img=(item.image.base64),
      <Card className="mycafe_card"
      style={{width:'25%'}} 
      title={item.name}  
     cover={<img  className="photocafe" src={this.state.img===''?Av:this.state.img} style={{width:"98%", marginLeft:'1%'}}/>}
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
         <button className="button" onClick={()=>this.showDeleteConfirm(item.id)} type="dashed"
         style={{backgroundColor:'#333', color:'#fff',width:'80%'}}>
           <DeleteFilled className="icon"/> 
           <p className="text_button" >Delete</p>
       </button>
        ]}
      >
     
      </Card> ))}</div>
    ) 
  }
}
export default OwnedCommunity;