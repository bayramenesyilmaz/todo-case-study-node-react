import { useParams } from "react-router";

export default function ByCategoryNotes() {
  const { catId } = useParams();
  return <div>ByCategoryNotes {catId}</div>;
}
