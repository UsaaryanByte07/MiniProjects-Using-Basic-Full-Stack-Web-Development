import DetailsBox from "./DetailsBox";
import MyPhoto from "./MyPhoto";
import MyPhotoJPG from '../../assets/MyPhoto.jpg'

const Header = () => {
    return <div className="bg-blue-600 w-full min-h-[125px] flex justify-between items-center px-10 rounded-2xl">
        <DetailsBox name="Aryan" proffesion="Student"/>
        <MyPhoto photoLink={MyPhotoJPG}/>
    </div>
}

export default Header;