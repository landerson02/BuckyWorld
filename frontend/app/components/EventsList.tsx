'use client';
import { useState, useEffect } from "react";
import EventListItem from "@/app/components/EventListItem";

type fakeLocationType = {
    id: number;
    name: string;
    address: string;
}

const EventsList = () => {
    // Create locations state
    const [locations, setLocations] = useState<fakeLocationType[]>([]);

    // TODO: Replace 'url' with the actual API endpoint
    // Fetch locations data
    // useEffect(() => {
    //   fetch('url')
    //     .then(response => response.json())
    //     .then(data => setLocations(data));
    // }, []);

    // Load fake data while in development
    useEffect(() => {
        const fakeLocations = [
            { id: 1, name: 'Location 1', address: '123 X St', visited: true},
            { id: 2, name: 'Location 2', address: '456 Y St', visited: false},
            { id: 3, name: 'Location 3', address: '789 Z St', visited: true},
        ];
        setLocations(fakeLocations);
    }, []);

    return (
          <div className={'flex flex-row items-center w-full overflow-x-scroll border border-black gap-2 h-[20%]'}>
              {locations.map(location => (
                  <EventListItem key={location.id} location={location} />
              ))}
          </div>
    )
}

export default EventsList;
