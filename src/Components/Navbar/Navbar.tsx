import { SiPastebin } from "react-icons/si";
import { BsGithub } from "react-icons/bs";

export default function Navbar() {
  return (
    <>
      <div className="w-[100%] z-40 bg-opacity-10 backdrop-blur-sm bg-red-500">
        <div className="container mx-auto flex flex-row py-5 justify-between items">
          <a
            href={process.env.REACT_APP_URL}
            className="flex items-center text-2xl"
          >
            <SiPastebin />
            <div className="pl-2">PASTEBIN</div>
          </a>
          <a href={"https://github.com/servatom"}>
            <BsGithub size={30} />
          </a>
        </div>
      </div>
    </>
  );
}
