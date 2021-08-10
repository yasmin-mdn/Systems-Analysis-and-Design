import React from "react";
import Axios from "axios";
import Mapir from "mapir-react-component";
import "antd/dist/antd.css";
import { GiTwoCoins, GiPerspectiveDiceSixFacesSix } from "react-icons/gi";
import { FaMapMarkerAlt, FaClock, FaPenNib,FaPhoneAlt } from "react-icons/fa";
import { Row, Carousel, Tag, Col,Card } from "antd";
import "../../Style/SingleCafeShow.css";
import "../../Style/design.scss";
const {Meta}=Card;
const Map = Mapir.setToken({
  transformRequest: (url) => {
    return {
      url: url,
      headers: {
        "x-api-key":
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3In0.eyJhdWQiOiIxMTU3MyIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3IiwiaWF0IjoxNjA2MDM1OTYwLCJuYmYiOjE2MDYwMzU5NjAsImV4cCI6MTYwODU0MTU2MCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.GlBztlovbk9H-x4WErTuD3Cth2bp1Bd4myRJ96uOEYOy3LlK2RQEq-4G3hPDQ8IGuEq18vmBakeh7UNg0OA1BCFb5AwDUEl7kzO4wmZ6-AZrGo92b9AQ--5aGLhqUEYcTi0Y0DXOxviyeBM49eHGzmm6Oa0bJ1eRvDG6C07UH4MvMNfv0xwpSMoB9czJSwyfUYzXR9P0St4-ayv6nxOmsAiDUb-1gfUCNff-HHiiLq0z_eVa0Fy_Vj11aC0smz1T7_qQvzMkOhHGptxYDICqNFXYpgNjf_eELdk67_DLrn6-bG5HNC82gr4ZEeFOmuh7Ka5jdl_AMM09oAT1UypXNQ", //Mapir api key

        "Mapir-SDK": "reactjs",
      },
    };
  },
});

class SingleCafeShow extends React.Component {
  state = {
    id: "",request: false,
    name: "",
    owner: "",
    description: "",
    games: [],
    price: "",
    open_time: "",
    close_time: "",
    phone_number: "",
    gallery: "",
    latitude: "",
    city: "",
    longitude: "",
    Gamestring: "",
    galleryarray: [],
    game_pic:""
  };

  componentDidMount() {
    const id = window.location.href.substring(32);
    Axios.get(localStorage.getItem('url')+"/cafe/cafe_info/" + id + "/", {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Credentials": true,
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }).then((res) => {
      const cafe = res.data;
      console.log(cafe);
      this.setState({ name: cafe.name });
      this.setState({ owner: cafe.owner });
      this.setState({ description: cafe.description });
      this.setState({ games: cafe.games });
      this.state.games.forEach((element) => {
        this.setState({
          Gamestring: this.state.Gamestring + "," + element.name +","+element.image
        });
      });
      this.setState({ gallery: cafe.gallery });
      this.setState({ city: cafe.city });
      this.setState({ price: cafe.price });
      this.state.gallery.forEach((element) => {
        this.state.galleryarray.push(element.base64);

      });      this.setState({request: true})

      this.setState({ open_time: cafe.open_time });
      this.setState({ close_time: cafe.close_time });
      this.setState({ phone_number: cafe.phone_number });
      this.setState({ latitude: cafe.latitude });
      this.setState({ longitude: cafe.longitude });
    });
  }

  onclicktag = (id) => {
    window.location.href = "/allgames/:" + id;
  };

  render() {
    if(!this.state.request){
      return(
      <div class="d-flex justify-content-center" style={{marginTop: '20%'}}>
      <div class="spinner-grow"style={{backgroundColor: 'hsl(22, 94%, 49%)'}} role="status">
      <span class="sr-only" >Loading...</span>
      </div>
      </div>
      )
    }
    return (
      <div className="SingleCafeShow_container">
        <div className="cafe_info">
          <h2>{this.state.name}</h2>
          <Row>
            <Col span={14}>
              <div className="carousel_container">
                <Carousel autoplay className="Gallery">
                  {this.state.galleryarray.map((item) => (
                    <img className="photo" src={item}></img>
                  ))}
                </Carousel>
              </div>
            </Col>
            <Col span={10}>
           
                <div className="cafe_specification_container">
               
                <p>
                  <GiTwoCoins className="cafe_icon"/>Price :  {this.state.price}
                </p>
                <p>
                  {" "}
                  <FaMapMarkerAlt className="cafe_icon"/>Address :  {this.state.city}
                </p>
                <p>
                  {" "}
                  <FaClock className="cafe_icon"/>Hours : {this.state.open_time} - {this.state.close_time}
                </p>
                <p>
                  {" "}
                  <FaPhoneAlt  className="cafe_icon"/>Phone : {this.state.phone_number}
                </p>
              </div>
            </Col>
            <div className="cafe_desc_container"> <p>
                  <FaPenNib className="cafe_icon"/>Description :  {this.state.description}
                </p></div>
                <div className="cards"> <p style={{marginTop:'2%' , width:'30%'}}>
                  <GiPerspectiveDiceSixFacesSix style={{marginLeft:'4%'}}className="cafe_icon"/>Board Games</p>
            <div className="scroll">
              {this.state.games.map((item) => (
                <Card
                className="game_card"
                  /*icon={<GiPerspectiveDiceSixFacesSix/>}*/
                  hoverable
                  onClick={() => this.onclicktag(item.id)}
                  cover={<img src={item.image} className="card_img" /> }
                  style={{ width:'23%' , height:'auto' }}
                >
                  <div className="game_meta">
                <div className="meta_text"  onClick={() => this.onclicktag(item.id)}> {item.name} </div></div>
                </Card>
              ))}
              </div>
            </div>
          </Row>
        
          <div>
            <Mapir
              className="map"
              center={[this.state.longitude, this.state.latitude]}
              Map={Map}
            >
              <Mapir.Layer
                type="symbol"
                layout={{ "icon-image": "harbor-15" }}
              ></Mapir.Layer>
              <Mapir.Marker
                coordinates={[this.state.longitude, this.state.latitude]}
                anchor="bottom"
              ></Mapir.Marker>
            </Mapir>
          </div>
        </div>
      </div>
    );
  }
}
export default SingleCafeShow;