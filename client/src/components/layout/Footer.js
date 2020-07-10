import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const Footer = ({ title, icon }) => {
  return (
    <div className="footer bg-dark text-center">
      <h4>Made with Love</h4>
    </div>
  );
};

Footer.prototype = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Footer.defaultProps = {
  title: 'URL Shortener',
  icon: 'fas fa-id-card-alt',
};
