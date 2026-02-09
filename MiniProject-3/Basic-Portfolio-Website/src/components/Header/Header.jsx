import DetailsBox from "./DetailsBox";
import MyPhoto from "./MyPhoto";
import MyPhotoJPG from '../../assets/MyPhoto.png'
import DownloadBtn from "../DownloadBtn";

const Header = () => {
    return <div className="bg-gradient-to-r from-cyan-500/30 to-purple-500/30 backdrop-blur-md w-full min-h-31.25 flex justify-between items-center px-10 rounded-2xl border-b border-white/20">
        <div className="flex flex-wrap items-center">
        <MyPhoto photoLink={MyPhotoJPG}/>
        <DetailsBox name="Aryan" proffesion="Student"/>
        </div>
        <DownloadBtn/>
    </div>
}

export default Header;