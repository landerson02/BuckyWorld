import React, { useState } from 'react';
import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import Link from 'next/link';
import { Landmark_type } from '@/lib/Types';

type EventMarkerProps = {
  landmark: Landmark_type;
}

function EventMarker({ landmark }: EventMarkerProps) {
  // state for the info window
  const [open, setIsOpen] = useState(false);

  return (
    <>
      <AdvancedMarker position={{ lat: landmark.latitude, lng: landmark.longitude }}
        onClick={() => {
          console.log(landmark);
          window.location.href = '/landmark?id=' + landmark.id;
        }
        }>
        <Pin
          background={'#FF5A64'}
          borderColor={'white'}
        // glyphColor={'#FFFFFF'} // this is the inner circle color
        />
      </AdvancedMarker>
      {
        open && (
          <InfoWindow position={{ lat: landmark.latitude, lng: landmark.longitude }} onCloseClick={() => setIsOpen(false)}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h1 style={{ color: '#FF0000', fontWeight: 'bold', margin: '10px 0px 10px 0px' }}>{landmark.landmarkName}</h1>
              <p>{landmark.description}</p>
              <Link href='#' style={{ color: 'blue', margin: '10px 0px 10px 0px' }}>More Info</Link>
            </div>
          </InfoWindow>
        )
      }
    </>
  );
}

export default EventMarker;
