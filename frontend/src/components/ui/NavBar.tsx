import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/index";
import axios from "axios";
import toast from "react-hot-toast";

const navLinks = [
  { title: "home", link: "/", id: 1 },
  { title: "profile", link: "/profile", id: 2 },
  //   { title: "men", link: "/products/men", id: 3 },
];

export default function NavBar() {
  const { state, dispatch } = useContext(GlobalContext);

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        `${state.baseUrl}/logout`,
        {},
        { withCredentials: true }
      );
      console.log("response: ", response);
      toast.success("Here is your toast.");

      dispatch({ type: "USER_LOGOUT" });
    } catch (error) {
      console.log("axios error: ", error);
      toast.error("err");
    }
  };

  return (
    <nav className="flex justify-around">
      <ul className="flex">
        {navLinks.map((item) => (
          <li className="border" key={item.id}>
            <Link to={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        {state?.user?.firstName} {state?.user?.lastName}
      </div>
      <button className="border" onClick={logoutHandler}>
        Logout
      </button>
    </nav>
  );
}
