import { useContext, useEffect, useState } from "react";
import Shoutout from "../model/Shoutout";
import ShoutoutCard from "./ShoutoutCard";
import {
  addShoutout,
  deleteShoutout,
  getShoutouts,
} from "../services/ShoutoutService";
import "./HomeRoute.css";
import AddShoutoutForm from "./AddShoutoutForm";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";

const HomeRoute = () => {
  const { user } = useContext(AuthContext);
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const getAndSetShoutouts = () => {
    getShoutouts({}).then((response) => setShoutouts(response));
  };

  const addShoutoutHandler = (shoutout: Shoutout): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts();
    });
  };

  const deleteShoutoutHandler = (id: string): void => {
    deleteShoutout(id).then(() => {
      getAndSetShoutouts();
    });
  };

  useEffect(() => {
    getAndSetShoutouts();
  }, []);

  return (
    <div className="HomeRoute">
      <h2>All Shoutouts</h2>

      <ul>
        {shoutouts.map((shoutout) => (
          <ShoutoutCard
            key={shoutout._id}
            shoutout={shoutout}
            onDeleteShoutout={deleteShoutoutHandler}
          />
        ))}
      </ul>
      {user ? (
        <AddShoutoutForm onAddShoutout={addShoutoutHandler} name="" />
      ) : (
        <div className="message-to-signIn">
          <p>Sign In to leave a shoutout</p>
          <button onClick={signInWithGoogle}>Sign In</button>
        </div>
      )}
    </div>
  );
};

export default HomeRoute;
