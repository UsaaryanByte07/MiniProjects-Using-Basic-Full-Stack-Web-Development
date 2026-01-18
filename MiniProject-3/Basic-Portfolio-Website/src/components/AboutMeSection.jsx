import { User } from "lucide-react";

const AboutMeSection = () => {
  return (
    <>
      <div className="mt-10">
        <div className="mx-5 flex items-center">
          <User size={35} className="text-cyan-300" />
          <h1 className="text-3xl font-bold mx-2 text-white">About Me</h1>
        </div>
        <div className="text-white/80 mx-6 my-3">
          I'm a under graduate student who aspires to become a Full Stack
          Developer. I love creating efficient, scalable, and user-friendly
          solutions to complex problems.
        </div>
      </div>
    </>
  );
};

export default AboutMeSection;
