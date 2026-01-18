import Header from "./Header/Header"
import ProjectsSection from "./ProjectsSection/ProjectsSection"
import AboutMeSection from "./AboutMeSection"
import SkillsSection from "./SkillsSection"
import HobbieSection from "./HobbiesSection"
import ExtracuricularSection from "./ExtracuricularSection"

const PortfolioContainer = () => {
    return <div className="max-w-4xl h-fit rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 my-10">
    <Header/>
    <AboutMeSection/>
    <ProjectsSection/>
    <SkillsSection/>
    <HobbieSection/>
    <ExtracuricularSection/>
    </div>
}

export default PortfolioContainer