import Model from "./model"
import Header from "./Components/Header"

export default function App() {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Model />

      <div className="Container">
        <Header />
      </div>

    </div>
  )
}