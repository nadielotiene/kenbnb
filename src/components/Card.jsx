export default function Card(props) {
    return (
        <main className="card-div">
            <div style={{ position: "relative" }}>
                <img
                    className="place-photo"
                    src={props.imageUrl}
                    alt={props.title}
                    onClick={props.onClick}
                    crossOrigin="anonymous"
                />
                <img
                    className="card-favorite"
                    src={`/${props.heartIcon}`}
                    onClick={props.toggleClick}
                />
            </div>
            <span className="title-span">
            <h4 className="title">{props.title}, {props.location}</h4>
            <p className="rating">★ {props.rating}</p>
            </span>
            <p className="dates">{props.startDate} - {props.endDate}</p>
            <a className="map-location" href={props.googleMapsUrl}>
                View on google maps
            </a>
            <p className="price">
                <span className="price-span">${props.price}</span> night
            </p>
        </main>
    )
}
