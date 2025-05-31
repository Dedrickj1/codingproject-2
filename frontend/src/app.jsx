import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import CreateSpotForm from './components/CreateSpotForm';
import LandingPage from './Pages/LandingPage';
import UpdateSpotForm from './Pages/UpdateSpotPage';
import SpotDetailsPage from './Pages/SpotDetailsPage/SpotDetailsPage';
import ManageSpotsPage from './Pages/ManageSpotPage';
import LoginFormModal from './components/LoginFormModal';
import SignupFormPage from './components/SignupFormPage';


// function Layout() {
//   const dispatch = useDispatch();
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     dispatch(sessionActions.restoreUser()).then(() => {
//       setIsLoafded(true)
//     });
//   }, [dispatch]);

//   return (
//     <>
//       <Navigation isLoaded={isLoaded} />
//       {isLoaded && <Outlet />}
//     </>
//   );
// }

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser())
      .then(() => {
        console.log('✅ restoreUser resolved');
        setIsLoaded(true);
      })
      .catch((err) => {
        console.error('❌ restoreUser failed:', err);
        setIsLoaded(true); // Still render the rest of the app
      });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/spots/new',
        element: <CreateSpotForm />
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetailsPage />
      },
      {
        path: '/spots/current',
        element: <ManageSpotsPage />
      },
      {
        path: '/spots/:spotId/edit',
        element: <UpdateSpotForm />
      },
      {
        path: '/login',
        element: <LoginFormModal />
      },

      {
        path: '/signup',
        element: <SignupFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;