import { ScrollRestoration, Outlet } from "react-router-dom";

import SideBar from "./components/elements/SideBar";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <div className="flex bg-dark-1">
        <ScrollRestoration />
          <SideBar />
        <Outlet />
      </div>
    </UserProvider>

  );
}

export default App;
