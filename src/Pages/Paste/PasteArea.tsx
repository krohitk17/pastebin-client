import TextBox from "../../Components/TextField/TextBox";
import { BiCalendar, BiStopwatch } from "react-icons/bi";
import SubmitButton from "../../Components/Button";

export default function PasteArea({ data }: { data: any }) {
  const createdAt = new Date(data.createdAt);
  const expiresAt = new Date(data.expiresAt);
  const timeLeft = expiresAt.getTime() - Date.now();
  const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
  console.log(timeLeft);

  async function copyBody() {
    await navigator.clipboard.writeText(data.body);
    const copyAlert = document.getElementById("copyAlert")!;
    copyAlert.innerHTML = "Copied to clipboard!";
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col pb-1">
          <p className="font-bold my-2 text-xl">{data.title}</p>
          <div className="flex flex-row items-center gap-2">
            <BiCalendar size={20} />
            <p>
              {createdAt.toDateString()}, {createdAt.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 text-red-600">
            <BiStopwatch size={20} />
            <p>
              {daysLeft} days, {hoursLeft} hours, {minutesLeft} minutes
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          <p id="copyAlert" className="text-green-600"></p>
          <SubmitButton
            onClick={copyBody}
            className="bg-green-500 hover:bg-green-600"
          >
            Copy
          </SubmitButton>
        </div>
      </div>

      <TextBox
        value={data.body}
        onChange={() => {}}
        language={data.syntax}
        disabled={true}
      />
    </div>
  );
}
