import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import LocationPin from './LocationPin';

const Map = ({ location, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAUfx3GmSvMMXeOUflpw9JrGrw7G46TL5E' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
    </div>
  </div>
);

Map.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
    address: PropTypes.string,
  }).isRequired,
  zoomLevel: PropTypes.shape({
  }).isRequired,
};

export default Map;
