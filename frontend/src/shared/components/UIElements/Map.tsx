import React, { useRef, useEffect } from 'react';
import * as ol from 'openlayers';

import './Map.css';

type Props = {
  className?: string,
  center: Location,
  zoom: number,
};

type Location = {
  lat: number,
  lng: number,
};

const Map: React.FC<Props> = props => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { center, zoom } = props;

  useEffect(() => {
    if (mapRef.current === null) return;
    
    new ol.Map({
      target: mapRef.current.id,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      id="map"
    ></div>
  );
};

export default Map;
