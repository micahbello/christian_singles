import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer>

    <Link className="footer-logo" to='/browse'>
      <img src={fish} alt="fish"/>
      <span>Christian Singles</span>
    </Link>

    <section>
      <figure className= "footer-icons">
          <i class="fab fa-github-square fa-3x"></i>
          <i class="fab fa-linkedin fa-3x"></i>
          <i class="far fa-address-card fa-3x"></i>
      </figure>
      <p>Created by Miqueas Bello</p>
    </section>

  </footer>
);

export default Footer;
