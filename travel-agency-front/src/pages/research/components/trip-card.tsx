import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Trip } from "@/types/entities/trip";
import { Link } from "react-router-dom";

const TripCard = ({ trip }: { trip: Trip }) => {
  const { _id, title } = trip;

  return (
    <Card>
      <Link to={`/research/${_id}`}>
        <CardHeader></CardHeader>
        <CardContent>{title}</CardContent>
        <CardFooter></CardFooter>
      </Link>
    </Card>
  );
};

export default TripCard;
