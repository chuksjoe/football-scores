import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter, faGithub, faLinkedinIn, faCodepen
} from '@fortawesome/free-brands-svg-icons';
import { faCopyright, faFutbol } from '@fortawesome/free-regular-svg-icons';

const Footer = () => (
  <footer>
    <div className="inner-div">
      <p>
        <FontAwesomeIcon icon={faCopyright} />
        {' '}
        F
        <FontAwesomeIcon icon={faFutbol} />
        <FontAwesomeIcon icon={faFutbol} />
        tball Score 2019
      </p>
      <div className="footer-right">
        <p>React.JS Solo Project by</p>
        <ul>
          <a href="https://twitter.com/Chuksjoe" target="_blank" rel="noopener noreferrer">
            <li>
              <FontAwesomeIcon icon={faTwitter} />
            </li>
          </a>
          <a
            href="https://www.linkedin.com/in/chukwunonso-orjiakor"
            target="_blank" rel="noopener noreferrer"
          >
            <li>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </li>
          </a>
          <a href="https://github.com/chuksjoe" target="_blank" rel="noopener noreferrer">
            <li>
              <FontAwesomeIcon icon={faGithub} />
            </li>
          </a>
          <a href="https://codepen.io/chuksjoe" target="_blank" rel="noopener noreferrer">
            <li>
              <FontAwesomeIcon icon={faCodepen} />
            </li>
          </a>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
