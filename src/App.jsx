import { Group } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import Sidebar from "./components/Sidebar";
import MapCamera from "./components/MapCamera/MapCamera";
import AdminLogin from "./components/AdminLogin/AdminLogin";

function App() {
  return (
    <>
      {/* <Sidebar /> */}
      <MapCamera />
      {/* <AdminLogin /> */}
    </>
  );
}

export default App;
