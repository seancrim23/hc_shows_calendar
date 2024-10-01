import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/Home/Home';
import ShowDetailPage, { loader as showDetailLoader, action as deleteShowAction } from './pages/ShowDetail';
import { action as manipulateShowAction } from './components/ShowForm';
import NewShowPage from './pages/NewShow';
import EditShowPage from './pages/EditShow';
import UserDetailPage, { loader as userDetailLoader} from './pages/UserDetail';
import UserShowListPage, { loader as userShowListLoader } from './pages/UserShowList';
import EmailResetAuthPage from './pages/EmailResetAuth';
import ResetAuthPage from './pages/ResetAuth';
import { action as authorizeAction } from './components/AuthForm';
import { action as sendAdminEmailAction } from './components/UserAdminForm';
import { action as resetAuthAction } from './components/AuthResetForm';
import { action as newUserAction } from './components/UserForm';
import { action as logoutAction } from './components/Logout';
import AuthPage from './pages/Auth';
import { tokenLoader, checkAuthLoader } from './util/auth';
import LogoutPage from './pages/Logout';
import NewUserPage from './pages/NewUser';
import ErrorPage from './pages/Error';
import EmailSetupAuthPage from './pages/EmailSetupAuth';

//TODO add auth loader
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'login',
        element: <AuthPage />,
        action: authorizeAction,
      },
      {
        path: 'logout',
        element: <LogoutPage />,
        action: logoutAction,
      },
      {
        path: 'reset',
        element: <EmailResetAuthPage />,
        action: sendAdminEmailAction,
      },
      {
        path: 'setup',
        element: <EmailSetupAuthPage />,
        action: sendAdminEmailAction,
      },
      {
        path: 'shows',
        children: [
          {
            path: 'new',
            element: <NewShowPage />,
            action: manipulateShowAction,
            loader: checkAuthLoader
          },
          {
            path: ":id",
            id: 'show-detail',
            loader: showDetailLoader,
            children: [
              {
                index: true,
                element: <ShowDetailPage />,
                action: deleteShowAction,
                loader: checkAuthLoader
              },
              {
                path: 'edit',
                element: <EditShowPage />,
                action: manipulateShowAction,
                loader: checkAuthLoader
              }
            ]
          }
        ]
      },
      {
        path: 'user/profile',
        loader: userDetailLoader,
        id: 'user-detail',
        element: <UserDetailPage />
      },
      {
        path: 'user/shows',
        loader: userShowListLoader,
        id: 'user-show-list',
        element: <UserShowListPage />,
        action: deleteShowAction,
      },
      {
        path: 'user/reset',
        element: <ResetAuthPage />,
        action: resetAuthAction,
      },
      {
        path: 'user/new',
        element: <NewUserPage />,
        action: newUserAction,
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
