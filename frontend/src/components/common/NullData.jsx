import Card from "./Card";

export default function NullData({ note, text }) {
  return (
    <Card className="flex flex-row flex-wrap items-center gap-4 text-lg">
      {note && <span className="font-bold text-black dark:text-white">{note}</span>}
      <p className="text-black dark:text-white">{text}</p>
    </Card>
  );
}
