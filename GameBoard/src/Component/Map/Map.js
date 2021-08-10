import React, { Component } from 'react'
import '../../Style/map.css';
import Mapir from 'mapir-react-component';
import axios from 'axios';
const Map = Mapir.setToken({
    transformRequest: url => {
        return {
            url: url,
            headers: {
                "x-api-key": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3In0.eyJhdWQiOiIxMTU3MyIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3IiwiaWF0IjoxNjA2MDM1OTYwLCJuYmYiOjE2MDYwMzU5NjAsImV4cCI6MTYwODU0MTU2MCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.GlBztlovbk9H-x4WErTuD3Cth2bp1Bd4myRJ96uOEYOy3LlK2RQEq-4G3hPDQ8IGuEq18vmBakeh7UNg0OA1BCFb5AwDUEl7kzO4wmZ6-AZrGo92b9AQ--5aGLhqUEYcTi0Y0DXOxviyeBM49eHGzmm6Oa0bJ1eRvDG6C07UH4MvMNfv0xwpSMoB9czJSwyfUYzXR9P0St4-ayv6nxOmsAiDUb-1gfUCNff-HHiiLq0z_eVa0Fy_Vj11aC0smz1T7_qQvzMkOhHGptxYDICqNFXYpgNjf_eELdk67_DLrn6-bG5HNC82gr4ZEeFOmuh7Ka5jdl_AMM09oAT1UypXNQ", //Mapir api key
                "Mapir-SDK": "reactjs"
            }
        };
    }
});
 class CafeMap extends React.Component {
  proxyurl= localStorage.getItem('url');
    constructor(props) {
        super(props);
        this.state = {
            markerArray: [],
            lat: 35.72,
            lon: 51.42
        }
        this.reverseFunction = this.reverseFunction.bind(this);
    }
    state={
        cafe_lon:"111",
        cafe_lat:"",
        cafe_city:""
}
    reverseFunction(map, e) {
        this.setState({cafe_lat:e.lngLat.lat})
        this.setState({cafe_lon:e.lngLat.lng})
        var url = `https://map.ir/reverse/no?lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`
        fetch(url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3In0.eyJhdWQiOiIxMTU3MyIsImp0aSI6ImM4MGI2ZGNkZjNmMmZjMTJiZGJlZDlhNGQ2MDM1YWI0MmYwZWI0YTdjZWRiZTAxZjkwY2E3NWY2ODRjOGE0NGVhYjNhYzA5OWE2ZTI3ODY3IiwiaWF0IjoxNjA2MDM1OTYwLCJuYmYiOjE2MDYwMzU5NjAsImV4cCI6MTYwODU0MTU2MCwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.GlBztlovbk9H-x4WErTuD3Cth2bp1Bd4myRJ96uOEYOy3LlK2RQEq-4G3hPDQ8IGuEq18vmBakeh7UNg0OA1BCFb5AwDUEl7kzO4wmZ6-AZrGo92b9AQ--5aGLhqUEYcTi0Y0DXOxviyeBM49eHGzmm6Oa0bJ1eRvDG6C07UH4MvMNfv0xwpSMoB9czJSwyfUYzXR9P0St4-ayv6nxOmsAiDUb-1gfUCNff-HHiiLq0z_eVa0Fy_Vj11aC0smz1T7_qQvzMkOhHGptxYDICqNFXYpgNjf_eELdk67_DLrn6-bG5HNC82gr4ZEeFOmuh7Ka5jdl_AMM09oAT1UypXNQ'
                }
            })
            .then(response => response.json())
            .then(data => { 
              this.setState({cafe_city:data.address.split('،')[1]})
              this.setState({cafe_lat:e.lngLat.lat})
              this.setState({cafe_lon:e.lngLat.lng})
                const mapdata={
                    latitude: e.lngLat.lat,
                    longitude: e.lngLat.lng,
                    city:this.state.cafe_city
                }
                console.log(data.address.split('،')[1])
                localStorage.setItem('lat',e.lngLat.lat)
                localStorage.setItem('lng',e.lngLat.lng)
                localStorage.setItem('city',data.address.split('،')[1])

               
            })
        const array = [];
        array.push(<Mapir.Marker
            coordinates={[e.lngLat.lng, e.lngLat.lat]}
            anchor="bottom">
        </Mapir.Marker>);
        this.setState({ cafe_lat: e.lngLat.lat, cafe_lon: e.lngLat.lng });
        this.setState({ markerArray: array, lat: e.lngLat.lat, lon: e.lngLat.lng });
       // console.log( this.state.cafe_lat)
    }
    render() {
        return (
            
            <div className="container_map" style={{width: '100%'}} >
                <Mapir className="map"
                    center={[this.state.lon, this.state.lat]}
                    Map={Map}
                    onClick={this.reverseFunction}
                >
                    {this.state.markerArray}
                </Mapir>
            </div >
            
           
        )
    }
}
export default CafeMap;