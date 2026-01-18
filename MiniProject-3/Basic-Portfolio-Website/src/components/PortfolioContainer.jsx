import Header from "./Header/Header"
import ProjectsSection from "./ProjectsSection/ProjectsSection"
import AboutMeSection from "./AboutMeSection"
import SkillsSection from "./SkillsSection"

const PortfolioContainer = () => {
    return <div className="max-w-4xl h-fit rounded-2xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 my-10">
    <Header/>
    <AboutMeSection/>
    <ProjectsSection/>
    <SkillsSection/>
    </div>
}

export default PortfolioContainer