import React, { useState } from 'react';
import antd, { AutoComplete } from "antd";
import 'antd/dist/antd.css';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import '../BoardGame/boardstyle.css'
import { Select } from 'antd';
import 'font-awesome/css/font-awesome.min.css';
import {Link } from 'react-router-dom';
import Item from 'antd/lib/list/Item';
import { Redirect } from 'react-router-dom';
const { Option } = Select;
const proxyurl = localStorage.getItem('url');
class SearchShow extends React.Component {
  state={
    suggestlist:[],
    selected_game:"1",
  };
  
 onSelect=(value)=> {
  
  this.setState({selected_game:value}, () => {
    console.log(this.state.selected_game, 'dealersOverallTotal1')})


}
find=()=>{
  <Link to={"/allgames/:"+this.state.selected_game}/>
}
onSearch=(value)=> {
  axios.get(proxyurl + "/game/search_game/name?search=" + value)
    .then(res => {
      const tmp = res.data.results;
      console.log(tmp);
      this.setState(prevState => {
        return { suggestlist: tmp }
      })
    })
}

render(){
  <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"></link>

  return(
    <div>
      <span style={{width: '30%',height: '20%'}}>
        
      <Link to={'/allgames/:'+this.state.selected_game}><i className="fa fa-search " style={{color: '#FF652F',backgroundColor: '#272727',fontSize: '54%',float: 'right'}}/> </Link> <span>

      </span>
    <Select
    showSearch
    style={{ width: "20%",height: '5px',float: "right" }}
    
    placeholder="Select a person"
    optionFilterProp="children"
    onSearch={this.onSearch}
    onSelect={this.onSelect}
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    
  >
    {this.state.suggestlist.map(item => (
                    <Option value={item.id}>{item.name}</Option>
                    ))
                    }
    
  </Select>   </span> </div>

);
}
  
}
export default SearchShow;
