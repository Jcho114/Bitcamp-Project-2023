import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import markerIconPng from '../Assets/house.png';
import {Icon} from 'leaflet';

import './Visualizer.css';
import MarkerButton from "./MarkerButton";

const Visualizer = ({ data }) => {
    const position = [36.7783, -119.4179];

   return (

       <div>
        
        <MapContainer center = {position} zoom={8} scrollWheelZoom={false} className='map-overall'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />


            {data.map((item) => (
                <Marker key={item.id} position={[item.latitude, item.longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [30, 30], iconAnchor: [15, 5]})} >
                    <Popup>
                        <span>
                            {"Zipcode: " + item.zipcode}<br/>
                            {"Year: " + item.year}<br/>
                            {"Median House Value: $" + Math.round(item.house_value)}
                            <MarkerButton />
                            <a href={'https://www.zillow.com/homes/' + item.zipcode + '_rb/'} target="_blank" rel="noopener noreferrer">Zillow</a>
                        </span>
                    </Popup>
                </Marker>
            ))}
           
           </MapContainer>
        
        </div>






   );
}


export default Visualizer;
