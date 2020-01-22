import React from 'react';
import './Card.css';

type Props = {
  className: string,
  children: React.ReactNode,
};

const Card: React.FC<Props> = props => {
  return (
    <div className={`card ${props.className}`}>
      {props.children}
    </div>
  );
};

export default Card;
