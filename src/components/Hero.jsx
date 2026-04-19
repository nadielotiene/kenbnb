export default function Hero(props) {
  return (
    <div 
      className={`hero-div ${props.isActive ? 'hero-div--active' : ''}`}
      onClick={props.onClick}
    >
      <img
        className="rent-type"
        src={props.source}
        alt={props.alt}
      />
      <p className="icons-name">{props.alt}</p>
    </div>
  )
}
