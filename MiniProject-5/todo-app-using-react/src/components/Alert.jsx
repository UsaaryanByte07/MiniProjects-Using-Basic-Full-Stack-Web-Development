export default function Alert({warningText, deleteAlert}) {
    return (
        <div className="flex items-center justify-between px-4 py-3 min-w-[300px] w-full bg-[var(--bg-color)] neu-flat rounded-2xl text-[var(--accent-red)] animate-[fadeIn_0.3s_ease-out]">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full neu-pressed flex items-center justify-center text-[var(--accent-red)] shadow-inner">
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="icon line">
                        <path style={{fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.95}} d="M11.95 16.5h.1"/>
                        <path d="M3 12a9 9 0 0 1 9-9h0a9 9 0 0 1 9 9h0a9 9 0 0 1-9 9h0a9 9 0 0 1-9-9m9 0V7" style={{fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5}}/>
                    </svg>
                </div>
                <p className="text-sm font-semibold">{warningText}</p>
            </div>   
            <button 
                type="button" 
                aria-label="close" 
                className="w-8 h-8 rounded-full neu-button flex items-center justify-center text-gray-400 hover:text-[var(--accent-red)] active:neu-pressed transition-all" 
                onClick={deleteAlert}
            >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    );
};