import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Homepage from "./pages/Homepage";
import InboxDetailPage from "./pages/Inbox/InboxDetailPage";
import InboxPage from "./pages/Inbox/InboxPage";
import Login from "./pages/Profile/Login";
import ProfileCouchPage from "./pages/Profile/ProfileCouchPage";
import ProfileEditCouchPage from "./pages/Profile/ProfileEditCouchPage";
import ProfileEditPage from "./pages/Profile/ProfileEditPage";
import ProfileEditTripPage from "./pages/Profile/ProfileEditTripPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Signup from "./pages/Profile/Signup";
import SearchPage from "./pages/SearchPage";

// https://mui.com/customization/theming/
// https://mui.com/customization/palette/
// https://material-foundation.github.io/material-theme-builder/#/custom
const theme = createTheme({
    palette: {
        primary: {
            main: "#006494",
        },
        secondary: {
            main: "#4f606e",
        },
        error: {
            main: "#ba1b1b",
        },
        warning: {
            main: "#4f606e",
        },
        info: {
            main: "#4f606e",
        },
        success: {
            main: "#4f606e",
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className='App'>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <Homepage />
                            </ProtectedRoute>
                        }
                    />

                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />

                    <Route
                        path='/profile/me/edit'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <ProfileEditPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/profile/:userId'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/profile/:userId/trips'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/profile/:userId/couch'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <ProfileCouchPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/profile/:userId/couch/edit'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <ProfileEditCouchPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/profile/:userId/trips/new'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <ProfileEditTripPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/profile/:userId/trips/:tripId/edit'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <ProfileEditTripPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/inbox'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <InboxPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/inbox/:userId'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <InboxDetailPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/search'
                        element={
                            <ProtectedRoute redirectTo='/login'>
                                <Navbar />
                                <SearchPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
