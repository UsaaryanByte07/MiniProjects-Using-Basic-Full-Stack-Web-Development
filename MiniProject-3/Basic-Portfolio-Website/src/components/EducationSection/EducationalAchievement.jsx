const EducationalAchievement = (props) => {
    return <>
    <div className="my-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-200">
        <h1 className="text-xl font-bold text-white">{props.achievementName}</h1>
        <p className="text-sm text-white/70 mt-1">{props.achievementDescription}</p>
    </div>
    </>
}

export default EducationalAchievement;