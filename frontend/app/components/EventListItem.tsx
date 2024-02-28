

type locationListItemProps = {
    location: {
        id: number;
        name: string;
    }

}

const EventListItem = ({ location }: locationListItemProps) => {
    return (
        <div className={'h-24 flex justify-around'}>
            <div>{location.name}</div>
            <div>{location.id}</div>
        </div>
    )

}

export default EventListItem;
