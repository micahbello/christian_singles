import React from 'react';
import { Link } from 'react-router-dom';


function inTheWorks() {

  return (
    <div>
      <p>Under Construction. Come back later.</p>
      <Link className="th-small-logo-link "to='/browse'>Back to browse</Link>
    </div>
  );

}

export default inTheWorks;
