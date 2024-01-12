import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import DriverPage from "./pages/DriverPage/DriverPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import DriversPage from "./pages/DriversPage/DriversPage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import InsuranceConstructor from "./components/InsuranceConstructor/InsuranceConstructor.tsx";
import InsurancePage from "./pages/InsurancePage/InsurancePage.tsx";
import InsurancesPage from "./pages/InsurancesPage/InsurancesPage.tsx";
import DriverEditPage from "./pages/DriverEditPage/DriverEditPage";
import DriverAddPage from "./pages/DriverAddPage/DriverAddPage";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && is_moderator && location.pathname.endsWith("drivers") && <InsuranceConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/work">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/drivers" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/drivers" element={<DriversPage />} />

                                    <Route path="/drivers/:id" element={<DriverPage />} />

                                    <Route path="/drivers/:id/edit" element={<DriverEditPage />} />

                                    <Route path="/drivers/create" element={<DriverAddPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/insurances/:id" element={<InsurancePage />} />

                                    <Route path="/insurances" element={<InsurancesPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
