const DetailsBox = (props) => {
    return (
        <div>
        <h1 className="text-white text-4xl font-bold">{props.name}</h1>
        <p className="text-white text-xl">{props.proffesion}</p>
        </div>
    )
}

export default DetailsBox;