import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import PlaceItem from './PlaceItem';
import './PlaceList.css';

type Props = {
  items: Places[]
};

type Places = {
  id: string,
  title: string,
  description: string,
  imageUrl: string,
  address: string,
  location: Location,
  creator: string,
};

type Location = {
  lat: number,
  lng: number,
};

const PlaceList: React.FC<Props> = props => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {props.items.map(place => (
        <PlaceItem
          key={place.id}
          id={place.id}
          title={place.title}
          image={place.imageUrl}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
