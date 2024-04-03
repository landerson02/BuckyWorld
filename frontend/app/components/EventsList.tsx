'use client';
import { useState, useEffect } from "react";
import EventListItem from "@/app/components/EventListItem";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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
    const [isOpen, setIsOpen] = useState(false);

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
    }, [data.Events]);

    return (
        <>
        {
            isOpen ? 
                <div className="flex flex-col">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex justify-center text-4xl">
                        <FaChevronDown />
                    </button>
                    <div className={'flex flex-row items-center w-full overflow-x-scroll ' +
                                'border-t border-black ps-3 gap-3 h-48 z-2 bg-white'}>
                        {
                            events.map(event => (
                                <EventListItem key={event.EventID} event={event} />
                            ))
                        }
                    </div>
                </div> 
                : 
                <div className="flex flex-col">
                    <button onClick={() => setIsOpen(!isOpen)} className="flex justify-center text-4xl">
                        <FaChevronUp />
                    </button>
                </div>
            }
        </>
        // <div className={`w-full flex flex-col items-center`}>
        //     <div className={`flex flex-row justify-center z-1 bg-white rounded-t-[50%] w-12 items-center`}>
        //         <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaChevronDown /> : <FaChevronUp />}</button>
        //     </div>
        //     {isOpen ? <div className={'flex flex-row items-center w-full overflow-x-scroll ' +
        //         'border-t border-black ps-3 gap-3 h-48 z-2 bg-white'}>
        //         {events.map(event => (
        //             <EventListItem key={event.EventID} event={event} />
        //         ))}
        //     </div> : null}
        // </div>
    )
}

export default EventsList;
