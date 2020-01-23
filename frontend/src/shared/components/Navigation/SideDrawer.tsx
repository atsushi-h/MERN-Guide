import React from 'react';

import './SideDrawer.css';

const SideDrawer: React.FC = props => (
  <aside className="side-drawer">
    {props.children}
  </aside>
);

export default SideDrawer;
