import React from 'react'
import { Link } from 'react-router-dom';

function Welcome({currentUser, logout}) {
  return (
    <div>
      <h3>Already a Member?</h3>
        <Link to='/login'>Login Here</Link>
      <h1>Christian Singles</h1>
        <h2>1 Corinthians 13:4</h2>
        <p>Are you a Christian and single? Sign up today and change one of those facts about yourself.</p>
        <Link to='/signup'>Create an account</Link>
    </div>
  );
};

export default Welcome;
