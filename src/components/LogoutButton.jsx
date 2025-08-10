import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";

const LogoutButton = () => {
  const handleLogout = () => signOut(auth);

  return (
    <button onClick={handleLogout} className="btn-logout">
      Logout
    </button>
  );
};

export default LogoutButton;
