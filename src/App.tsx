import { useState } from 'react'

import DriverList from "./pages/DriverList/DriverList.tsx";



import "./styles/Main.sass"
import "./styles/Reset.sass"

import Header from "./components/header/Header.tsx";
import {Driver} from "./Types.ts";
import { Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import DriverPage from "./pages/DriverPage/DriverPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs.tsx";


function App() {

  const [selectedDriver, setSelectedDriver] = useState<Driver | undefined>(undefined)

  return (

      // <DriverList/>
      <BrowserRouter>

        <div className="App">

          <div className="wrapper">

            <Header />

            <div className={"content-wrapper"}>
              <Breadcrumbs selectedDriver={selectedDriver} setSelectedDriver={setSelectedDriver}/>

              <Routes>

                <Route path="/" element={<Navigate to="/drivers" replace />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/drivers" element={<DriverList />} />
                <Route path="/drivers/:id" element={<DriverPage selectedDriver={selectedDriver} setSelectedDriver={setSelectedDriver} />} />

              </Routes>

            </div>

          </div>

        </div>

      </BrowserRouter>
  )
}

export default App
