import Header from "./Header/Header"
import ProjectsSection from "./ProjectsSection/ProjectsSection"

const PortfolioContainer = () => {
    return <div className="max-w-4xl my-15 rounded-2xl shadow-2xl bg-white overflow-hidden">
    <Header/>
    <ProjectsSection/>
    </div>
}

export default PortfolioContainer