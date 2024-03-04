import React, { use, useEffect, useState } from 'react';
import { AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';

function EventMarker(props: any) {
    const [open, setIsOpen] = useState(false);

    return (
        <>
            <AdvancedMarker position={{lat: parseFloat(props.lat), lng: parseFloat(props.lng)}} onClick={() => setIsOpen(true)}> 
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
                    <a href='#' style={{color: 'blue', margin:'10px 0px 10px 0px'}}>More Info</a>
                  </div>
                </InfoWindow>
              )
            }
        </>
    );
}

export default EventMarker;