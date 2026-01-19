const MyPhoto = (props) => {
    return <img src={props.photoLink} alt="My Passprt Size Photo" className="w-25 h-25 rounded-full border-4 border-cyan-300/40 shadow-2xl shadow-cyan-500/20 hover:border-purple-400/40 hover:shadow-purple-500/20 transition-all duration-300"/>
}

export default MyPhoto;