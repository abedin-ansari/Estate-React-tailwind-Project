import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase.js";

const LogoutButton = () => {
  const handleLogout = () => signOut(auth);

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 px-8 py-3 hover:bg-red-600 cursor-pointer rounded-full"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
