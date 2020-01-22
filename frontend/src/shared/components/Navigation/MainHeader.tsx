import React from 'react';

import './MainHeader.css';

const MainHeader: React.FC = props => (
  <header className="main-header">
    {props.children}
  </header>
);

export default MainHeader;
