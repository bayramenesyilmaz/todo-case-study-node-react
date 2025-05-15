import Card from "./Card";
import Button from "./Button";

export default function Error({ message }) {
  console.log(message);

  return (
    <Card>
      <div className="text-red-600 text-center p-4">
        <p className="p-4">{message}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Yeniden Dene
        </Button>
      </div>
    </Card>
  );
}
