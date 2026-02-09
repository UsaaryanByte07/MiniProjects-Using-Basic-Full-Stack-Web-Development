import { FileDown } from "lucide-react";
const DownloadBtn = () => {
  return (
      <button onClick={window.print}>
        <FileDown size={35} className="text-cyan-300" />
      </button>
  );
};

export default DownloadBtn;
