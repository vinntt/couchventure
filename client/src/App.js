import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Signup from './pages/Profile/Signup'
import Login from './pages/Profile/Login'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute'
import TripsList from './pages/Trips/TripsList';
import AddCouch from './components/Couches/AddCouch';
import TripDetails from './pages/Trips/TripDetails';
import CouchPage from './pages/Couches/CouchPage';
import ProfilePage from './pages/Profile/ProfilePage';
import TripCard from './components/Trips/TripCard';
import EditProfile from './components/Profile/EditProfile';

// https://mui.com/customization/theming/
// https://mui.com/customization/palette/
// https://material-foundation.github.io/material-theme-builder/#/custom
const theme = createTheme({
  palette: {
    primary: {
      main: '#006494',
    },
    secondary: {
      main: '#4f606e',
    },
    error: {
      main: '#ba1b1b',
    },
    warning: {
      main: '#4f606e',
    },
    info: {
      main: '#4f606e',
    },
    success: {
      main: '#4f606e',
    },
  },
});

function App() {


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Routes>
          <Route path='/' element={
            <ProtectedRoute redirectTo='/login'>
              <Navbar />
              <Homepage />
            </ProtectedRoute>
          } />

          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />

          <Route path='/profile/:userId' element={
            <ProtectedRoute redirectTo='/login'>
               <Navbar />
              <ProfilePage />
            </ProtectedRoute>
          } />

          <Route path='/profile/:userId/trips' element={
            <ProtectedRoute redirectTo='/login'>
              <ProfilePage />
            </ProtectedRoute>
          } />

          <Route path='/profile/:userId/couch' element={
            <ProtectedRoute redirectTo='/login'>
              <ProfilePage content={<CouchPage />} />
            </ProtectedRoute>
          } />

          {/* Test routes below */}
          <Route
            path='/test/trips'
            element={
              <ProtectedRoute redirectTo='/login'>
                <TripsList />
              </ProtectedRoute>
            }
          />

          <Route
            path='/test/trips:id'
            element={
              <ProtectedRoute redirectTo='/login'>
                <TripDetails />
              </ProtectedRoute>
            }
          />

          {/* <Route path='/trips' element={<TripsList />} /> */}
          <Route path='/test/trips/new' element={<TripCard />} />
          {/* <Route path='/test/trips/:id' element={<TripDetails />} /> */}
          <Route path='/test/couches' element={<CouchPage userId="me" />} />
          <Route path='/test/couches/new' element={<AddCouch />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
