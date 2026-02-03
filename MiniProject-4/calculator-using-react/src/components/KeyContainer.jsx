import Key from "./key";
import { Delete } from "lucide-react";
const KeyContainer = ({ displayText, setDisplayText }) => {
  const clickHandler = (e) => {
    if (e.target.innerText == "=") {
      if (displayText != "0") {
        try {
          displayText = displayText.replaceAll('x','*');
          displayText = String(eval(displayText));
          setDisplayText(displayText);
        } catch {
          setDisplayText("Error");
        }
      }
    } else if (e.target.closest(".is-delete-btn")) {
      if (displayText.length == 1 || displayText == 'Error') {
        setDisplayText("0");
      }else if (displayText != "0") {
        displayText = displayText.slice(0, -1);
        setDisplayText(displayText);
      }
    } else if (e.target.innerText == "C") {
      setDisplayText("0");
    } else if (e.target.innerText) {
      if (displayText == "0") {
        displayText = "";
      }
      displayText += e.target.innerText;
      setDisplayText(displayText);
    }
  };
  const keysList = [
    "-",
    ".",
    "C",
    <Delete size={30} />,
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
    "x",
    "0",
    "=",
  ];
  return (
    <>
      <div className="grid grid-cols-4 grid-rows-5 w-90 h-105">
        {keysList.map((keyName) => {
          if (keyName.type == Delete) {
            return (
              <Key
                keyText={keyName}
                isDelete={true}
                clickHandler={clickHandler}
              />
            );
          }
          return <Key keyText={keyName} clickHandler={clickHandler} />;
        })}
      </div>
    </>
  );
};

export default KeyContainer;
