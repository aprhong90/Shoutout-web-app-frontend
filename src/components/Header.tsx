import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="Header">
      <Link className="h1" to="/">
        <h1>Shoutouts</h1>
      </Link>
      <div className="btn-container">
        <Link className="me" to="/me">
          Me
        </Link>
        {user ? (
          <div className="sign-out-box">
            <p>{user.displayName}</p>
            <button onClick={signOut}>Sign Out</button>
          </div>
        ) : (
          <button onClick={signInWithGoogle}>Sign In</button>
        )}
      </div>
    </header>
  );
};

export default Header;
