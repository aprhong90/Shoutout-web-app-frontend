import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import QueryStringParams from "../model/QueryStringParams";
import Shoutout from "../model/Shoutout";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/ShoutoutService";
import AddShoutoutForm from "./AddShoutoutForm";
import ShoutoutCard from "./ShoutoutCard";
import "./ShoutoutsByNameRoute.css";

const ShoutoutsByNameRoute = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);
  const name: string | undefined = useParams().name;

  const getAndSetShoutouts = (params: QueryStringParams): void => {
    getShoutouts(params).then((response) => setShoutouts(response));
  };

  const addShoutoutHandler = (shoutout: Shoutout): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts({ to: name });
    });
  };

  useEffect(() => {
    getAndSetShoutouts({ to: name });
  }, [name]);

  return (
    <div className="ShoutoutsByNameRoute">
      <h2>Shoutouts By {name}</h2>
      <Link to="/" className="back-to-all">
        Back to All Shoutouts
      </Link>

      <ul>
        {shoutouts.map((shoutout) => {
          return (
            <ShoutoutCard
              key={shoutout._id}
              shoutout={shoutout}
              onDeleteShoutout={deleteShoutoutHandler}
            />
          );
        })}
      </ul>
      <AddShoutoutForm onAddShoutout={addShoutoutHandler} name={name!} />
    </div>
  );
};

export default ShoutoutsByNameRoute;
