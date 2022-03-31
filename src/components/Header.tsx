import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";

const Header = () => {
  // const name: string | undefined = useParams().name;
  //const location = useLocation();
  // console.log(location.pathname);

  const { user } = useContext(AuthContext);

  return (
    <header className="Header">
      <h1>Shoutouts</h1>
      <div className="btn-container">
        <Link to="/me">Me</Link>
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
