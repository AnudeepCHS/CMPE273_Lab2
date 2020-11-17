import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";



const ReactGoogleMaps = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.locations[0]}
  >
  {props.locations.map((location, index) => (
    <Marker
        key={index}
        position={location}
    />
  ))}
  </GoogleMap>
));

export default ReactGoogleMaps;