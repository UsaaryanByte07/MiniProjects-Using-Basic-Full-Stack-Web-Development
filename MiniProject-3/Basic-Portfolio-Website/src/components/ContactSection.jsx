import { Github } from "lucide-react";
import { Twitter } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Globe } from "lucide-react";

const Contactsection = () => {
  return (
    <>
      <div className="mt-10">
        <div className="mx-5 flex items-center">
          <Globe size={35} className="text-cyan-300" />
          <h1 className="text-3xl font-bold mx-2 text-white">
            Contact & Social Media
          </h1>
        </div>
        <div className="text-white/80 mx-8 my-4">
          <p className="hover:text-cyan-300 transition-colors duration-200"><span className="font-semibold text-white">Email:</span> sample@gmail</p>
          <p className="hover:text-cyan-300 transition-colors duration-200"><span className="font-semibold text-white">Phone:</span> (123) 456-7890</p>
        </div>
        <div className="mx-8 my-3">
          <a
            href="https://github.com/UsaaryanByte07"
            target="main"
            className="inline-flex items-center gap-2 my-2 text-cyan-300 hover:text-purple-400 transition-colors duration-300"
          >
            <Github size={30} />
            <span>Github</span>
          </a>
          <br />
          <a
            href="https://x.com"
            target="main"
            className="inline-flex items-center gap-2 my-2 text-cyan-300 hover:text-purple-400 transition-colors duration-300"
          >
            <Twitter size={30} />
            <span>Twitter</span>
          </a>
          <br />
          <a
            href="https://in.linkedin.com/"
            target="main"
            className="inline-flex items-center gap-2 my-2 text-cyan-300 hover:text-purple-400 transition-colors duration-300"
          >
            <Linkedin size={30} />
            <span>LinkendIn</span>
          </a>
          <br />
        </div>
      </div>
    </>
  );
};

export default Contactsection;
