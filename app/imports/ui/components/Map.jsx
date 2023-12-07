import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import LocationPin from './LocationPin';

const Map = ({ location: mapLocation, zoomLevel }) => (
  <div className="map">
    <h2 className="map-h2">Come Visit Us At Our Campus</h2>

    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyAUfx3GmSvMMXeOUflpw9JrGrw7G46TL5E' }}
        defaultCenter={mapLocation}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={mapLocation.lat}
          lng={mapLocation.lng}
          text={mapLocation.address}
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
  zoomLevel: PropTypes.number.isRequired,
};

export default Map;
