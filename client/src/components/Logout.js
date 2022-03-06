import { AuthContext } from "../context/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Logout () {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    return (
      <nav>
        {isLoggedIn && (
          <>
            <button onClick={logOutUser}>Logout</button>
            <span>{user && user.name}</span>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/signup"> <button>Sign Up</button> </Link>
            <Link to="/login"> <button>Login</button> </Link>
          </>
        )}

      </nav>
    );
  }

  export default Logout;
