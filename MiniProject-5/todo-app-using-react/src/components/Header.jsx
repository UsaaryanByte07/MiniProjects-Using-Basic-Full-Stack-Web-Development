import ThemeToggleBtn from "./ThemeToggleBtn";

export const Header = () => {
    return (
        <div className="w-full flex justify-between items-center py-6 mb-8 px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] tracking-wide drop-shadow-sm transition-colors duration-300">
                Todo App
            </h1>
            <div className="scale-75 md:scale-100 origin-right">
                <ThemeToggleBtn/>
            </div>
        </div>
    );
}