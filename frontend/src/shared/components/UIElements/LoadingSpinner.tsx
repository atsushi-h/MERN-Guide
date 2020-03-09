import React from 'react';

import './LoadingSpinner.css';

type Props = {
  asOverlay: boolean,
};

const LoadingSpinner: React.FC<Props> = props => (
  <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
    <div className="lds-dual-ring"></div>
  </div>
);

export default LoadingSpinner;
