import { Card, CardContent} from '@mui/material'
import './App.css'
import { CatTable } from './components/CatTable/CatTable'

function App() {

  return (
    <>
      <Card sx={{ Width: 1000 }}>
        <CardContent>
          <div style={{ padding: "2rem" }}>
            <h1>🐱 Cat Breeds</h1>
            <CatTable />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default App