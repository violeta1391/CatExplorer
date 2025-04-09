import { CatProvider } from "./context/CatContext";
import { CatTable } from "./components/CatTable/CatTable";
import { CatImageGallery } from "./components/CatImageGallery/CatImageGallery";
import { ContainerLayout } from "./layout/ContainerLayout";
import Filters from "./components/Filters/Filters";
import Header from "./components/Header/Header";

function App() {
  return (
    <CatProvider>
      <ContainerLayout>
        <Header />
        <Filters />
        <CatImageGallery />
        <CatTable />
      </ContainerLayout>
    </CatProvider>
  );
}

export default App;
