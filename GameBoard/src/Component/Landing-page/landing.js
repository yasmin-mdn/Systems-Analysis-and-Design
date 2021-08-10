import React from "react";
import Axios from "axios";
import background from "./background2.png";
import FormItem from "antd/lib/form/FormItem";
import dice from "./dice.gif.gif";
import "../../Style/land.css";
import sepehr from "./sepehr.jpg";
import sana from "./sana.jpg";
import zahra from "./zahra.jpg";
import yasamin from "./yasamin.jpg";
import mohammad from "./mohammad.jpg";
import twitter from "./twitter2.png";
import instagram from "./I.jpg";
import telegram from "./telegram2.png";
import "../../Style/design.scss";
import { Button } from "antd";
import { Row, Col, Slider } from "antd";
class Land extends React.Component {
  render() {
    return (
      <FormItem style={{ backgroundColor: "#212121" }}>
        <div style={{ display: "inline" }}>
          <img
            src={background}
            style={{
              float: "right",
              display: "block",
              height: "50%",
              width: "50%",
              marginTop: "7%",
            }}
          />

          <img
            className="dice3"
            src={dice}
            style={{
              float: "left",
              height: "5%",
              width: "3%",
              marginTop: "15%",
            }}
          />
          <img
            className="dice1"
            src={dice}
            style={{
              float: "left",
              height: "5%",
              width: "2%",
              marginTop: "15%",
            }}
          />
          <img
            className="dice2"
            src={dice}
            style={{
              float: "left",
              height: "5%",
              width: "4%",
              marginTop: "15%",
            }}
          />
          <img
            className="dice3"
            src={dice}
            style={{
              float: "left",
              height: "5%",
              width: "2%",
              marginTop: "15%",
            }}
          />
          <img
            className="dice2"
            src={dice}
            style={{
              float: "left",
              height: "5%",
              width: "3%",
              marginTop: "15%",
            }}
          />
          <img
            className="dice1"
            src={dice}
            style={{
              float: "left",
              height: "5%",
              width: "1%",
              marginTop: "15%",
            }}
          />
          <img
            className="dice3"
            src={dice}
            style={{
              float: "left",
              height: "5%",
              width: "3%",
              marginTop: "15%",
            }}
          />
        </div>
        <div className="header">
          <p
            className="gradient_text"
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: "60px",
            }}
          >
            GoardBame
          </p>
          <p
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: "30px",
              marginLeft:"9.5%"
            }}
          >
           Those who play <b>together</b>
          </p>
          <p
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: "30px",
              marginLeft:"7.5%"
              
            }}
          > 
           stay <b>together</b>
           
          </p>
         
          <Button
            className="btn btn-primary"
            style={{ width: "20%" , marginLeft:"8%"}}
            onClick={this.onSaveGeneral}
            name="submit"
          >
            Join us
          </Button>
        </div>
        <div className="description" style={{marginLeft:"20%",marginTop:"9%"}}>
          
            <h2 style={{fontSize:"20px"}}>What is goardbame?</h2>
            <p>An online cafe reservation to :</p>
            <p>Play together</p>
            <p>Have fun together</p>
            <p>Laugh together</p>
            <p>Compete together !</p>
            </div>
            <div  className="description" style={{marginLeft:"7%",marginTop:"6.5%"}}>  <h2 style={{fontSize:"20px"}}>Why board games cafe?</h2>
            <p>Diverse board games</p>
            <p>Testing the board game </p>
            <p>Free learning</p>
            <p>Exciting tournament with prizes</p>
            <p>New friends</p>
          </div>
          <div  className="description" style={{marginLeft:"5%",marginTop:"6.5%"}}>
            <h2 style={{fontSize:"20px"}}>What we are going to do?</h2>
            <p>Connect up!</p>
            <p>Let’s see what will happen</p>
          
         </div>
        <div
          className="teamcontainer"
          style={{ display: "block", clear: "both", marginTop: "35%" }}
        >
                
          <div>
            <h2
              style={{
                marginLeft:"-1%",
                fontFamily: "Times New Roman, Times, serif",
                fontSize: "20px",
              }}
            >
              {" "}
              MEET OUR TEAM
            </h2>
          </div>
          <div className="back">
            <div className="team_back">
              <img
                width="100%"
                height="100%"
                style={{ borderRadius: "50%", marginLeft: "33%" }}
                src={zahra}
              />
              <div>Zahra Hosseini</div>
            </div>
            <div className="team_back" style={{ marginLeft: "2%" }}>
              <img
                width="100%"
                height="100%"
                style={{ borderRadius: "50%", marginLeft: "33%" }}
                src={sepehr}
              />
              <div>Sepehr Babapour</div>
            </div>
          </div>
          <div className="front" style={{ marginBottom: "2%" }}>
            <div className="team_front">
              <img
                width="100%"
                height="100%"
                style={{ borderRadius: "50%", marginLeft: "33%" }}
                src={sana}
              />
              <div>
                Sana <p style={{fontSize:"10px"}}>Shoeibi</p>
              </div>
            </div>
            <div className="team_front" style={{ marginLeft: "2%" }}>
              <img
                width="100%"
                height="100%"
                style={{ borderRadius: "50%", marginLeft: "33%" }}
                src={yasamin}
              />
              <div>Yasamin Madani</div>
            </div>
            <div className="team_front" style={{ marginLeft: "2%" }}>
              <img
                width="100%"
                height="100%"
                style={{ borderRadius: "50%", marginLeft: "33%" }}
                src={mohammad}
              />
              <div>Mohammad Karimian</div>
            </div>
          </div>
        </div>
        <div className="social">
          <div
            style={{
              fontFamily: "Times New Roman, Times, serif",
              fontSize: "15px",
              marginTop:"1%"
            }}
          >
            Follow us :
          </div>
          <img
            src={instagram}
            style={{ width: "9%", marginLeft: "0", marginTop: "0.5%" }}
          />
          <img src={twitter} style={{ width: "7%" }} />
          <img src={telegram} style={{ width: "9%" }} />
        </div>
      </FormItem>
    );
  }
}
export default Land;
