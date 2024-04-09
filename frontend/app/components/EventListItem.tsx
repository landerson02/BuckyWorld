

type EventListItemProps = {
    event: {
        EventID: number;
        Name: string;
        Description: string;
        Latitude: number;
        Longitude: number;
        Points: number;
    }
}

/**
 * Renders an event list item component.
 * @param event - The event object.
 * @returns The rendered event list item component.
 */
const EventListItem = ({ event }: EventListItemProps) => {
    return event && (
        <div className={'min-w-[30%] h-[90%] flex flex-col items-center'}>
            <div className={'border border-black w-[70%] h-[60%]'}>
                {/* TODO: REPLACE WITH ACTUAL IMAGE */}
                IMAGE
            </div>
            <div className={'text-center'}>{event.Name}</div>
            <div className={'w-[90%] flex justify-between font-light'}>
                {/* TODO: REPLACE WITH ACTUAL DISTANCE */}
                <div className={'text-[#FF5A64]'}>X mi.</div>
                <div>{event.Points}Pts</div>
            </div>
        </div>
    )
}
export default EventListItem;
