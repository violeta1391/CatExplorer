import { Card, CardContent } from "@mui/material";
import "./App.css";
import { CatTable } from "./components/CatTable/CatTable";
import { CatProvider } from "./context/CatContext";
import { CatImageGallery } from "./components/CatImageGallery/CatImageGallery";

function App() {
  return (
    <CatProvider>
      <Card sx={{ width: 1000 }}>
        <CardContent>
          <div style={{ padding: "2rem" }}>
            <h1>🐱 Cat Breeds</h1>
            <CatImageGallery />
            <CatTable />
          </div>
        </CardContent>
      </Card>
    </CatProvider>
  );
}

export default App;
