import React, { useState } from 'react';
import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import Link from 'next/link';
import Image from 'next/image';
import { Landmark_type } from '@/lib/Types';

type EventMarkerProps = {
  landmark: Landmark_type;
}

/**
 * Renders a marker for an event on a map.
 *
 * @param { landmark: Landmark_type } The landmark to represent
 * @returns {JSX.Element} The rendered EventMarker component.
 */
function EventMarker({ landmark }: EventMarkerProps) {
  // state for the info window
  const [open, setIsOpen] = useState(false);

  return (
    <>
      {/* Link to the landmark page onclick, user pin has id -1, so don't route to it */}
      <Link href={landmark.landmarkId == -1 ? '' : `landmark?id=${landmark.landmarkId}`}>
        <AdvancedMarker position={{ lat: landmark.latitude, lng: landmark.longitude }}>
          {
            landmark.landmarkId === -1 ? (
              <Pin
                background={'#FF5A64'}
                borderColor={'white'}
              />
            ) : (
              <Image src={'/w.png'} alt='event' width={30} height={30}
                className='w-10 h-10'
              />
            )
          }
        </AdvancedMarker>
      </Link>
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
