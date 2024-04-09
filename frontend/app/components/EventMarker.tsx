import React, { useState } from 'react';
import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import Link from 'next/link';
import { useRouter } from 'next/router';


/**
 * Renders a marker for an event on a map.
 *
 * @param {any} props - The component props.
 * @returns {JSX.Element} The rendered EventMarker component.
 */
function EventMarker(props: any): JSX.Element {
    // state for the info window
    const [open, setIsOpen] = useState(false);

    return (
        <>
          <AdvancedMarker position={{lat: parseFloat(props.lat), lng: parseFloat(props.lng)}} 
            onClick={() => window.location.href = 'signin'
          }> 
              <Pin 
                background={'#FF5A64'}
                borderColor={'white'}
                // glyphColor={'#FFFFFF'} // this is the inner circle color
                />
            </AdvancedMarker>
            {
              open && (
                <InfoWindow position={{lat: parseFloat(props.lat), lng: parseFloat(props.lng)}} onCloseClick={() => setIsOpen(false)}> 
                  <div style={{display: 'flex', flexDirection: 'column'}}>
                    <h1 style={{color:'#FF0000', fontWeight:'bold', margin:'10px 0px 10px 0px'}}>{props.title}</h1>
                    <p>{props.description}</p>
                    <Link href='#' style={{color: 'blue', margin:'10px 0px 10px 0px'}}>More Info</Link>
                  </div>
                </InfoWindow>
              )
            }
        </>
    );
}

export default EventMarker;