import { AnimateSharedLayout } from "framer-motion";
import Routers from "./components/Routers";
import { DataProvider } from './GlobaleCotext'

function App() {
  return (
    <DataProvider>
      <AnimateSharedLayout>
        <Routers />
      </AnimateSharedLayout>
    </DataProvider>
  );
}

export default App;
