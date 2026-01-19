import { BookText } from "lucide-react";
import EducationalAchievement from "./EducationalAchievement";

const EducationSection = () => {
  let eduAchievementsArray = [
    {
      achievementName: "Bachelor of Technology in Computer Science Engineering",
      achievementDescription: "University of Technology, 2024-28",
    },
    {
      achievementName: "Bachelor of Technology in Computer Science Engineering",
      achievementDescription: "University of Technology, 2024-28",
    },
    {
      achievementName: "Bachelor of Technology in Computer Science Engineering",
      achievementDescription: "University of Technology, 2024-28",
    },
  ];
  return (
    <>
      <div className="mt-10">
        <div className="mx-5 flex items-center">
          <BookText size={35} className="text-cyan-300" />
          <h1 className="text-3xl font-bold mx-2 text-white">Education</h1>
        </div>
        <div className="text-white/80 mx-8 my-3">
          {eduAchievementsArray.map((achievement) => {
            return (
              <EducationalAchievement
                achievementName={achievement.achievementName}
                achievementDescription={achievement.achievementDescription}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default EducationSection;
