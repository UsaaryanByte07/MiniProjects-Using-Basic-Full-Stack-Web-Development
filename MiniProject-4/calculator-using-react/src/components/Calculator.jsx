import { useState } from "react";
import KeyContainer from "./KeyContainer";
import Display from "./display";
const Calculator = () => {
    const keysList = [
    "-",
    ".",
    "/",
    "1",
    "2",
    "3",
    "+",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "*",
    "0",
  ];
  let [displayText, setDisplayText] = useState("0");
  const onKeyHandler = (e) => {
    if (e.key == "=" || e.key == "Enter" ) {
      if (displayText != "0") {
        try {
          displayText = displayText.replaceAll("x", "*");
          displayText = String(eval(displayText));
          setDisplayText(displayText);
        } catch {
          setDisplayText("Error");
        }
      }
    } else if (e.key == 'Backspace') {
      if (displayText.length == 1 || displayText == "Error") {
        setDisplayText("0");
      } else if (displayText != "0") {
        displayText = displayText.slice(0, -1);
        setDisplayText(displayText);
      }
    } else if (e.key == 'Delete') {
      setDisplayText("0");
    } else if(keysList.includes(e.key)){
      if (displayText == "0") {
        displayText = "";
      }
      displayText += e.key;
      displayText = displayText.replaceAll("*", "x");
      setDisplayText(displayText);
    }
  };
  return (
    <>
      <div className="border-2 border-[var(--neon-cyan)] rounded-2xl p-5 bg-[var(--bg-panel)] shadow-[0_0_20px_rgba(0,243,255,0.3)]">
        <Display displayText={displayText} onKeyHandler={onKeyHandler} />
        <KeyContainer
          setDisplayText={setDisplayText}
          displayText={displayText}
        />
      </div>
    </>
  );
};

export default Calculator;
