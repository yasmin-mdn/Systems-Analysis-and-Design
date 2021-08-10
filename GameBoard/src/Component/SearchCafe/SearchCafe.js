import React, { useState } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import { Select } from 'antd';


const { Option } = Select;
const proxyurl = localStorage.getItem('url');
class CafeSearchShow extends React.Component {
    state = {
        suggestlist: [],
        selected_cafe: "1",
    };

    onSelect = (value) => {

        this.setState({ selected_cafe: value }, () => {
            console.log(this.state.selected_cafe, 'dealersOverallTotal1')
        })
        


    }
    onSearch = (value) => {
        axios.get(proxyurl + "/cafe/search_cafe/name?search=" + value)
            .then(res => {
                const tmp = res.data.results;
                console.log(tmp);
                this.setState(prevState => {
                    return { suggestlist: tmp }
                })
            })
    }

    render() {
        return (
            <div>
                <span style={{ width: '30%', height: '20%' }}>


                </span>
                <Select
                    showSearch
                    style={{ width: "20%", height: '5px', float: "right" }}

                    placeholder="Select a cafe"
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

                </Select>   
                 </div>

        );
    }

}
export default CafeSearchShow;