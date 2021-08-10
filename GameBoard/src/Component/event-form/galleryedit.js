import {  Upload ,Button,Form }from 'antd';
import {  PlusOutlined  } from '@ant-design/icons';
import React from "react";
import axios from 'axios';
function getBase64(file) {
    return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
let base=[];
let b=[];
let base64 = require('base-64');
let dict="";
let fileList= [];
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
fileList:[],
    gallery:'',
    galleryarray:[],
 done:'',

};
 proxyurl= localStorage.getItem('url');
  handleCancel = async file => {
   console.log(file)
if(file.name!=="cafe**image**base")
   { if (!file.url) {
      file.preview = await getBase64(file.originFileObj);
      if(base!==null){
      for( var i = 0; i < base.length; i++){ 
                                   
        if ( base[i] === file.preview) { 
            base.splice(i, 1); 
            i--; 
        }
    }
    console.log(base)
     this.setState({ previewVisible: false });
    }}}
  else
{ console.log("yesss")
  for( var i = 0; i < base.length; i++){ 
                                   
    if ( base[i] === file.url) { 
        base.splice(i, 1); 
        i--; 
    }
} 
console.log(base)
}
};

  handlePreview = async file => {
    console.log(file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      var dict={"base64":file.preview}
      base.push(dict);
      console.log(base)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  getInfo=(e)=>
  {
      
      if(this.state.done==="")
      {
  let cafeid=localStorage.getItem("cafeid")    
      axios.get(this.proxyurl+'/community/edit_event/'+3+"/",{headers:{
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Credentials':true,
  'Accept' : 'application/json',
  'Authorization' :`Bearer ${localStorage.getItem('access')}`
      }}
  ).then((res)=>{   
    const event = res.data;
   
    //console.log(cafe);
    this.setState({ gallery: event.gallery });
     console.log(this.state.gallery);
     var i=1;
     {this.state.gallery.map((item) => (
      dict ={"url":item.base64,"uid":i,"name":'cafe**image**base','preview':false},i=i+1,
      this.state.fileList.push(dict),
      base.push(item.base64)
      ))}
     //this.state.gallery.forEach((element) => {
    //   this.state.fileList.push(element.base64)
    // var encoded = base64.encode(element.base64);
    // console.log(encoded)
     //console.log(this.state.fileList)
     //console.log('000')
      //});
       console.log(base)
       console.log(this.state.fileList)
  } )
  .catch((error)=>
  {
  
          } 
          )
      
      }
  
  }

  handleChange = ({ fileList }) => this.setState({ fileList });
  onSubmit  = () => {
   localStorage.setItem('base64',JSON.stringify(base))
   localStorage.setItem("true",true)
  };
  componentDidMount() {
    this.getInfo();
}
  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    ); 
    return (
      <>
      <Form.Item style={{marginLeft:'-55%' , marginTop:'2%', width:'110%'}}>
    <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleCancel}
        >
          {fileList.length >= 20 ? null : uploadButton}
        </Upload>
      </Form.Item>
        <Button className="btn btn-primary"  style={{width: '100%'}} onClick={this.onSubmit}>Submit all pictures</Button>
      </>
    );
  }
}

export default PicturesWall;