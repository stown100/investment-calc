import { AppRouter } from "./app/AppRouter";
import { Notifications } from "@mantine/notifications";

// Main application component
function App() {
  return (
    <>
      <Notifications />
      <AppRouter />
    </>
  );
}

export default App;
