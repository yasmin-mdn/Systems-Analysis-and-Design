import {  Upload ,Button,Form }from 'antd';
import {  PlusOutlined  } from '@ant-design/icons';
import React from "react";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
let base64=[];
class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
  };

  handleCancel = async file => {
   // console.log(base64)

    if (!file.url) {
      file.preview = await getBase64(file.originFileObj);
      for( var i = 0; i < base64.length; i++){ 
                                   
        if ( base64[i] === file.preview) { 
            base64.splice(i, 1); 
            i--; 
        }
    }
    console.log(base64)
     this.setState({ previewVisible: false });
    }};

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
      var dict={"base64":file.preview}
      base64.push(dict);
    }
console.log(base64)
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });
  onSubmit  = () => {
   localStorage.setItem('base64',JSON.stringify(base64))
  };
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
        </Upload></Form.Item>
        <Button className="btn btn-primary"  style={{width: '100%'}} onClick={this.onSubmit}>Submit all pictures</Button>
      </>
    );
  }
}

export default PicturesWall;