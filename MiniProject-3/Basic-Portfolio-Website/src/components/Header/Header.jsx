import DetailsBox from "./DetailsBox";
import MyPhoto from "./MyPhoto";
import MyPhotoJPG from '../../assets/MyPhoto.png'

const Header = () => {
    return <div className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 backdrop-blur-md w-full min-h-31.25 flex justify-between items-center px-10 rounded-2xl border-b border-white/20">
        <DetailsBox name="Aryan" proffesion="Student"/>
        <MyPhoto photoLink={MyPhotoJPG}/>
    </div>
}

export default Header;