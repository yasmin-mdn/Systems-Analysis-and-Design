import React from "react";
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
//import 'font-awesome/css/font-awesome.min.css';
import '../../Style/design.scss'
import {ClockCircleFilled ,PhoneFilled,CoffeeOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';
import {
  List,
  Divider
} from "antd";
import { Thumbnail } from "react-bootstrap";
const paginationProps = {
  showSizeChanger: false,
  showQuickJumper: false,
  pageSize:10,
  
};
let a="";
class AllCafe extends React.Component {
  state={
      id:"",
      name:"",
      owner:"",
      description:"",
      cafe:[],
      games: [],
      price:"",
      open_time:"",
      close_time:"",
      phone_number:"",
      gallery:[],
      request: false,
      city:"", 
      proxyurl : localStorage.getItem('url')
  };
      
  componentDidMount() {
    Axios.get(localStorage.getItem('url')+"/cafe/cafe_list/")
       .then(res=>{
        //alert("reeeee")
        const cafe_list=res.data;
         this.setState(prevState => {
          console.log(cafe_list)
           return {cafe: cafe_list}
         })
         this.setState({request: true})
       })
       .catch(error=>{
         //alert("qqqqq")
         console.log(error.response)
       })
  }
  

  allCafe(){
    <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>
    
    return(

      <div className="cafelist_container"
       style={{marginTop: '5%', fontSize:'20px'}}
      dataSource={this.state.cafe}
        Pagination={paginationProps}><h3 style={{marginLeft: '5%'}}>Cafe In Site<CoffeeOutlined  style={{position:'relative' , top:'-0.25em', marginLeft: '0.5%', fontSize:'27px'}}/></h3>
 
               {     <List
      size="large"
      itemLayout="horizontal"
      pagination={paginationProps}
      dataSource={this.state.cafe}
      renderItem={item => (
        this.state.gallery=(item.gallery),
        this.state.gallery.forEach(item => a=(item.base64)),
        <List.Item className="cafe_part">
          <List.Item.Meta 
            avatar={<img src={a} style={{width: "200px",height: "150px"}} className="cafe_img"/>}
            title={<Link to={'/allcafes/:'+item.id}><p style={{color: 'whitesmoke'}} className="cafe_name">{item.name}</p></Link>}
            description={<p><span className="icon"><ClockCircleFilled /></span><p key={item.close_time} style={{color: 'whitesmoke'}}className="cafe_desc"> {`${item.close_time}`}{`-`}{`${item.open_time} `}<span className="icon"><PhoneFilled /> </span><p className="cafe_desc">{`${item.phone_number}`}
            </p></p></p>}
          
/>  
        </List.Item>
      )}
    /> }
 </div>
    );
  }
  render(){
    if(!this.state.request){
      return(
      <div class="d-flex justify-content-center" style={{marginTop: '23%'}}>
      <div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
      <span class="sr-only" >Loading...</span>
      </div>
      </div>
      )
    }
     return this.allCafe();
         
    }
  }
  export default AllCafe;


/* { this.state.cafe.map(item =>
              <Card className="cafe_card" 
              hoverable
              Pagination={paginationProps}
              title={item.name}
              cover={<img src={"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"}/>}   
              style={{ width: 240 ,border: 'transparent'}}
                //cover={<img  src={this.state.cafe_img} />}
                actions={[
                  <div style={{color:'#fff'}}>
                    see cafe details <CoffeeOutlined />
                  </div>,
                ]}
               
              >
             
              </Card> )}
 
 */
// import React from "react";
// import { Card, List} from "antd";
// import "antd/dist/antd.css";
// import { CoffeeOutlined } from "@ant-design/icons";
// import { Link } from "react-bootstrap/lib/Navbar";
// const { Meta } = Card;
// const paginationProps = {
//   showSizeChanger: false,
//   showQuickJumper: false,
//   pageSize: 20,
// };
// class All_cafe extends React.Component {
//   state = {
//     cafe_name: "Ananas",
//     cafe_img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
//   };
//   render() {
//     return (
//       <div className="cafelist_container">
//             <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1.0"
//         ></meta>{" "}
//         <div className="cafe_list"> <div className="cafe_card">
//               {" "}
//               <Card
//                 hoverable
//                 style={{ width: 240 }}
//                 cover={<img alt="example" src={this.state.cafe_img} />}
//                 actions={[
//                   <div style={{color:'#fff'}}>
//                     see cafe details <CoffeeOutlined />
//                   </div>,
//                 ]}
//               >
//                 <Link>{this.state.cafe_name}</Link>
//               </Card>
//             </div>
//             <div className="cafe_card">
//               {" "}
//               <Card
//                 hoverable
//                 style={{ width: 240 }}
//                 cover={<img alt="example" src={this.state.cafe_img} />}
//                 actions={[
//                   <div style={{color:'#fff'}}>
//                     see cafe details <CoffeeOutlined />
//                   </div>,
//                 ]}
//               >
//                 <Link>{this.state.cafe_name}</Link>
//               </Card>
//             </div>
//           </div>
//           <div className="cafe_card">
//               {" "}
//               <Card
//                 hoverable
//                 style={{ width: 240 }}
//                 cover={<img alt="example" src={this.state.cafe_img} />}
//                 actions={[
//                   <div style={{color:'#fff'}}>
//                     see cafe details <CoffeeOutlined />
//                   </div>,
//                 ]}
//               >
//                 <Link>{this.state.cafe_name}</Link>
//               </Card>
//             </div>
//       </div>
//     );
//   }
// }
// export default All_cafe;