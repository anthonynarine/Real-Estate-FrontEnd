import React from "react";

// get latitude and longitude https://www.latlong.net/
//react leaflet (note Popup and Marker is NOTE part of link from site.)
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";

function Listings() {


  return (
    // NOTE height must be set to 100vh in order to display map. 
  <div style={{height: "100vh"}} >
      {/* Start - code from react-leaflet docs. */}
      <MapContainer center={[40.653110, -73.9440220]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      {/* END code from react-leaflet docs */}
    </div>
  );
}

export default Listings;


