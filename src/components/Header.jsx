import { NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Header({ pageTitle }) {
  function handleLogOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <h1>{pageTitle}</h1>

      <div className="header-btns">
        <NavLink to="/">
          <button className="btn">Books</button>
        </NavLink>

        <NavLink to="/add-book">
          <button className="btn">Add Book +</button>
        </NavLink>

        <button onClick={handleLogOut} className="btn transparent">
          Logout
        </button>
      </div>
    </>
  );
}

export default Header;
