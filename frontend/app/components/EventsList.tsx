'use client';
import { useState, useEffect } from "react";
import EventListItem from "@/app/components/EventListItem";
import fakeLocations from "@/data/dummy_data.json";

type EventType = {
    EventID: number;
    Name: string;
    Description: string;
    Latitude: number;
    Longitude: number;
    Points: number;
}

const EventsList = () => {
    // Create events state
    const [events, setEvents] = useState<EventType[]>([]);

    // TODO: Replace 'url' with the actual API endpoint and remove fake data
    // Fetch locations data
    // useEffect(() => {
    //   fetch('url')
    //     .then(response => response.json())
    //     .then(data => setLocations(data));
    // }, []);

    // Load fake data while in development
    let data = require('../../data/dummy_data.json');
    useEffect(() => {
        const dummyEvents: EventType[] = data.Events;
        dummyEvents.push({EventID: 14, Description: "Test", Latitude: 0, Longitude: 0, Name: "Test", Points: 8});
        setEvents(dummyEvents);
    }, []);

    return (
          <div className={'flex flex-row items-center w-full overflow-x-scroll border-t border-black ps-3 gap-3 h-[20%]'}>
              {events.map(event => (
                  <EventListItem key={event.EventID} event={event} />
              ))}
          </div>
    )
}

export default EventsList;
