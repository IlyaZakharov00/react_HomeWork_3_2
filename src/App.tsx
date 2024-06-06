import './App.css'
import { Listing } from "./components/listing/listing";
import items from "./components/data.json";


function App() {

  return (
    <>
      <Listing items={items} />
    </>
  )
}

export default App
