import TextBox from "../../Components/TextBox";
import { BiCalendar, BiStopwatch } from "react-icons/bi";
import SubmitButton from "../../Components/Button";

export default function PasteArea({ data }: { data: any }) {
  const createdAt = new Date(data.createdAt);
  const expiresAt = new Date(data.expiresAt);
  console.log(expiresAt);
  const timeLeft = expiresAt.getTime() - Date.now();
  console.log(timeLeft);
  let burnOnRead = false;
  let daysLeft = 0;
  let hoursLeft = 0;
  let minutesLeft = 0;

  if (timeLeft < 0) {
    burnOnRead = true;
  } else {
    daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    hoursLeft = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    minutesLeft = Math.floor((timeLeft / (1000 * 60)) % 60);
  }

  async function copyBody() {
    await navigator.clipboard.writeText(data.body);
    const copyAlert = document.getElementById("copyAlert")!;
    copyAlert.innerHTML = "Copied to clipboard!";
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="pb-1">
          <div className="flex flex-row items-center gap-5">
            <p className="font-bold my-2 text-xl">{data.title}</p>
            <div className="rounded bg-gray-200 px-1 text-sm">
              <p>{data.syntax}</p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <BiCalendar size={20} />
            <p>
              {createdAt.toDateString()}, {createdAt.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 text-red-600">
            <BiStopwatch size={20} />
            {burnOnRead ? (
              <p>
                BURN ON READ IS ENABLED. COPY THE PASTE NOW OR THIS DATA WILL BE
                PERMANENTLY DELETED FOREVER.
              </p>
            ) : (
              <p>
                {daysLeft} days, {hoursLeft} hours, {minutesLeft} minutes
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center gap-3">
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
