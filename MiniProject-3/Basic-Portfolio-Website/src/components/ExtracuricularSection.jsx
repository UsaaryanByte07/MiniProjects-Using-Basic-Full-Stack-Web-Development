import { Award } from "lucide-react";

const ExtracuricularSection = () => {
  let activitiesArray = [
    "Volunteer at local coding bootcamp for underprivileged youth",
    "Organizer of city-wide hackathon event",
    "Member of the University Chess Club",
  ];
  return (
    <>
      <div className="mt-10">
        <div className="mx-5 flex items-center">
          <Award size={35} className="text-cyan-300" />
          <h1 className="text-3xl font-bold mx-2 text-white">
            Extracurricular Activities
          </h1>
        </div>
        <div className="mx-12 my-3 text-white/80">
          <ul className="space-y-2">
            {activitiesArray.map((activity) => {
              return <li className="list-disc px-3 hover:text-cyan-300 transition-colors duration-200">{activity}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ExtracuricularSection;
