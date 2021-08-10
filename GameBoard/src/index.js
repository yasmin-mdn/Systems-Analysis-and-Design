import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Component/homepage';
import Login from "./Component/Login/Login";
import Signup from "./Component/Signup/Signup";
import 'antd/dist/antd.css';
import Routes from "./Routes";
import './Style/Login.css'
import App from "./Component/EditProfile/EditProfile.js"
import Cafelist from "./Component/Listofallcafe/all-cafe-list"
import './Style/all-cafe-list.css'
import Single from "./Component/SingleCafeShow/SingleCafeShow"
import './Style/SingleCafeShow.css'
import './Style/cafe-form.css'
import Mycafe from './Component/OwnedCafes/OwnedCafes'
ReactDOM.render(<Routes />, document.getElementById('root'));

