import { Link } from "react-router-dom";
import Shoutout from "../model/Shoutout";
import "./ShoutoutCard.css";

interface Props {
  shoutout: Shoutout;
  onDeleteShoutout: (id: string) => void;
}

const ShoutoutCard = ({ shoutout, onDeleteShoutout }: Props) => {
  return (
    <li className="ShoutoutCard">
      <div>
        <p className="to">
          Shout out to <Link to={`/user/${shoutout.to}`}>{shoutout.to} </Link>
        </p>
        <button onClick={() => onDeleteShoutout(shoutout._id!)}>delete</button>
      </div>

      <p className="from">
        -from
        <Link to={`/user/${shoutout.from}`}> {shoutout.from} </Link>
        <img src={shoutout.avatar} alt="avatar" />
      </p>

      <p className="text">{shoutout.text}</p>
      {shoutout.image && (
        <img
          className="shoutout-image"
          src={shoutout.image}
          alt="shoutout image"
        />
      )}
    </li>
  );
};

export default ShoutoutCard;
