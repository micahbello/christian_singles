import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>

    <Link className="footer-header-logo" to='/browse'>
      <img src={fish} alt="fish"/>
      <span>Christian Singles</span>
    </Link>

    <section>
      <figure className= "footer-icons">
          <a href="https://github.com/micahbello"><i className="fab fa-github-square fa-3x"></i></a>
          <a href="https://www.linkedin.com/in/miqueasbello/"><i className="fab fa-linkedin fa-3x"></i></a>
          <a href="http://www.micahbello.com"><i className="far fa-address-card fa-3x"></i></a>
      </figure>
      <p>Created by Miqueas Bello</p>
    </section>

  </footer>
);

export default Footer;
