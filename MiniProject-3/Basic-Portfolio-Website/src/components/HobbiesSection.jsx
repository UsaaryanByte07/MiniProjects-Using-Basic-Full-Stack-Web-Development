import { Heart } from "lucide-react";

const HobbieSection = () => {
  let hobbiesArray = [
    "Photography",
    "Hiking",
    "Playing guitar",
    "Reading sci-fi novels",
    "Watching Anime",
    "Quantum Mechanics",
  ];
  return (
    <>
      <div className="mt-10">
        <div className="mx-5 flex items-center">
          <Heart size={35} className="text-cyan-300" />
          <h1 className="text-3xl font-bold mx-2 text-white">
            Hobbies & Interests
          </h1>
        </div>
        <div className="mx-12 my-3 text-white/80">
          <ul>
            {hobbiesArray.map((hobby) => {
              return <li className="list-disc px-3">{hobby}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default HobbieSection;
