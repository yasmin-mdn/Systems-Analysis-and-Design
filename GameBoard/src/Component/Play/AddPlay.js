import React from 'react';
import Axios from 'axios';
import moment from 'moment';
import '../../Style/addplay.css';
import FormItem from 'antd/lib/form/FormItem';
import {
  Form,
  Select,
  Button,
  DatePicker,
  AutoComplete,Row,Col
} from "antd";
import { PlusOutlined } from '@ant-design/icons';

const user_username = localStorage.getItem('user')
const layout = {

  wrapperCol: {
    span: 0,
  },
};
const { Option } = Select;
const proxyurl = localStorage.getItem('url');
const dateFormat = 'YYYY-MM-DD';


let index = 0;

class AddPlay extends React.Component {
  state = {
    date: "2020-1-1",
    place: "",
    inputplace: "",
    msg: "",
    players: [],
    suggestlist_game: [],
    suggestlist_user: [],
    selected_game: "",
    selected_user: "",
    semi_players: "",
    suggestlist_cafe: [],
    selected_cafe: ""
  }

  componentDidMount() {
    var dict = { "username": user_username }
    this.state.players.push(dict);
  }
  onSelectuser = (value) => {
    if (value.includes("(not a user)")) {
      this.state.semi_players += value + ",";
    }
    else {
      var dict = { "username": value }
      this.state.players.push(dict);
      this.setState({ selected_user: value })
      this.setState({ suggestlist_user: [] })
    }
  }
  onChangeUser=(value)=>
{
  
  this.state.players=[]
  this.state.semi_players='';
  value.forEach(i=>{
    if (i.includes("(not a user)")) {
      this.state.semi_players += i + ",";
    }
    else{
      this.state.players.push({"username":i});}

    })
}
  onUserSearch = (value) => {
    let searchvalue = value
    let tmp = []
    if (typeof searchvalue !== "string" && searchvalue !== "") {
      searchvalue = ""
    }
    else {
      tmp.push({ id: null, username: searchvalue + "(not a user)", email: "notAuser@gmail.com" })
    }
    Axios.get(proxyurl + "/game/search_user/username/?search=" + searchvalue)
      .then(res => {
        tmp = [...tmp, ...res.data.results]
        this.setState({ suggestlist_user: tmp });
        console.log(this.state.suggestlist_user)

      })
  }

  onSelectgame = (value) => {
    this.setState({ selected_game: value })
  }
  onSearchgame = (value) => {
    Axios.get(proxyurl + "/game/search_game/name?search=" + value)
      .then(res => {
        const tmp = res.data.results;
        this.setState(prevState => {
          return { suggestlist_game: tmp }
        })
      })
  }
  onyearChangedate = (value) => {
    if (value != null)
      this.setState({ date: value.format(dateFormat) })
  }
  onSave = (e) => {
    e.preventDefault();
    e.persist()
    const data = {
      players: this.state.players,
      game: this.state.selected_game,
      date: this.state.date,
      place: this.state.place,
      semi_players: this.state.semi_players

    }
    console.log(JSON.stringify(data))
    Axios.post(proxyurl + '/game/create_play/', JSON.stringify(data)
      , {
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Access-Control-Allow-Credentials': true,
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
      }
    )
      .then((res) => {

        this.setState({ msg: "done" });
        alert("play was created succesfully")
        window.location.reload(true)
      })
      .catch((error) => {
        this.setState({ msg: "something went wrong please try again." });
        alert(this.state.msg)
      }
      )


  }
  


  onSelectCafe = (value) => {

    this.setState({ selected_cafe: value })
    this.setState({ place: value })

  }
  onSearchcafe = (value) => {
    Axios.get(proxyurl + "/cafe/search_cafe/name?search=" + value)
      .then(res => {
        const tmp = res.data.results;
        this.setState(prevState => {
          return { suggestlist_cafe: tmp }
        })
      })
  }


  render() {

    return (
      <div className="createplay" style={{ width: '70%' }}> 
        <Form   {...layout}>
        <h4 style={{marginLeft: '0.5%' ,paddingBottom: '1%'}}>Create Play</h4>
        <Row style={{marginLeft: '0.5%'}}>
                            <Col span={12}>
                            <Form.Item  style={{width: '85%'}}
            name="date"
            rules={[
              {
                type: "date",
                message: "The input is not valid year!",
              },
              {
                required: false,
              },
            ]}
          >
            <DatePicker allowEmpty={false} name="date" format={dateFormat} style={{ width: '100%' }} defaultValue={moment('2020-1-1')} onChange={this.onyearChangedate} picker="date" />
          </Form.Item></Col>
          <Col span={12}>
                            <Form.Item  style={{width: '85%'}}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Select a game"
              optionFilterProp="children"
              onChange={this.onSearchgame}
              onSearch={this.onSearchgame}
              onSelect={this.onSelectgame}
              onInputKeyDown={this.onSelectgame}

            >
              {this.state.suggestlist_game.map(item => (
                <Option value={item.id}>{item.name}</Option>
              ))
              }

            </Select>
          </Form.Item></Col>
          <Col span={12}>
                            <Form.Item  style={{width: '85%'}}>
            <Select
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="players"
              defaultValue={[user_username]}
              filterOption={false}
              onSearch={this.onUserSearch}
              onChange={this.onChangeUser}
              
            >
              {
                this.state.suggestlist_user.map(d => (
                  <Option key={d.username}>{d.username}</Option>
                ))}
            </Select>
          </Form.Item></Col>
          <Col span={12}>
                            <Form.Item  style={{width: '85%'}}>
            {/* <Select
              showSearch
              placeholder="Where did you play?"
              optionFilterProp="children"
              onSearch={this.onSearchcafe}
              onSelect={this.onSelectCafe}
              onInputKeyDown={this.onSelectCafe}
              dropdownRender={menu => (
                <div>
                  {menu}
                  <Divider style={{ margin: '4px 0' }} />
                  <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                    <Input style={{ flex: 'auto' }}  />
                    <a
                      style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                      onClick={this.addItem}
                    >
                      <PlusOutlined /> Add item
                    </a>
                  </div>
                </div>
              )}
            >
              {this.state.suggestlist_cafe.map(item => (
                <Option value={item.name}>{item.name}</Option>
              ))
              }

            </Select> */}
            <AutoComplete
              onSelect={this.onSelectCafe}
              onSearch={this.onSearchcafe}
              placeholder="where did you play?"
             onChange={this.onSelectCafe}
            >

              {this.state.suggestlist_cafe.map(item => (
                <Option value={item.name}>{item.name}</Option>
              ))
              }
            </AutoComplete>

          </Form.Item></Col>          </Row>

          <div style={{ display: 'flex',alignContent: 'center',alignItems: 'center',textAlign:'center' }}>
            <Button className="btn btn-primary" style={{ width: '25%',marginLeft: 'auto',marginRight: 'auto' }}  shape="round" onClick={this.onSave} >Add</Button>
          </div>

        </Form>
      </div>

    );
  }


}

export default AddPlay;
