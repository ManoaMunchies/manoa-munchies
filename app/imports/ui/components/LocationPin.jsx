import React from 'react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';
import PropTypes from 'prop-types';

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
);

LocationPin.propTypes = {
  text: PropTypes.shape({
  }).isRequired,
};

export default LocationPin;
