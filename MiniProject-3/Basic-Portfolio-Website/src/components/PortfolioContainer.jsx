import Header from "./Header/Header"
import ProjectsSection from "./ProjectsSection/ProjectsSection"
import AboutMeSection from "./AboutMeSection"
import SkillsSection from "./SkillsSection"
import HobbieSection from "./HobbiesSection"
import ExtracuricularSection from "./ExtracuricularSection"
import EducationSection from "./EducationSection/EducationSection"
import Contactsection from "./ContactSection"

const PortfolioContainer = () => {
    return <div className="max-w-4xl h-fit rounded-2xl shadow-2xl shadow-cyan-500/10 bg-white/10 backdrop-blur-xl border border-white/20 my-10 hover:shadow-black/50 transition-shadow duration-500">
    <Header/>
    <AboutMeSection/>
    <ProjectsSection/>
    <SkillsSection/>
    <EducationSection/>
    <HobbieSection/>
    <ExtracuricularSection/>
    <Contactsection/>
    </div>
}

export default PortfolioContainer