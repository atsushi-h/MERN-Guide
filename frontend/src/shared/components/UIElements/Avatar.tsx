import React from 'react';
import './Avatar.css';

type Props = {
  className?: string,
  image: string,
  alt: string,
  width?: string,
};

const Avatar: React.FC<Props> = props => {
  return (
    <div className={`avatar ${props.className}`}>
      <img
        src={props.image}
        alt={props.alt}
        style={{ width: props.width, height: props.width }}
      />
    </div>
  );
};

export default Avatar;
