const Display = (props) => {
    return <div className="w-90 my-5 h-20 bg-black border border-[var(--neon-cyan)] text-[var(--neon-cyan)] shadow-[inset_0_0_10px_rgba(0,243,255,0.3)] rounded-xl flex justify-end items-center p-2 text-4xl drop-shadow-[0_0_5px_rgba(0,243,255,0.8)]" tabIndex="0" onKeyDown={props.onKeyHandler}>
        {props.displayText}
    </div>
}

export default Display;