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
import { action as authorizeAction } from './components/AuthForm';
import AuthPage from './pages/Auth';

//TODO add auth loader
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'login',
        element: <AuthPage />,
        action: authorizeAction,
      },
      {
        path: 'shows',
        children: [
          {
            index: true,
            element: <UserShowListPage />,
            loader: userShowListLoader
          },
          {
            path: 'new',
            element: <NewShowPage />,
            action: manipulateShowAction
          },
          {
            path: ":id",
            id: 'show-detail',
            loader: showDetailLoader,
            children: [
              {
                index: true,
                element: <ShowDetailPage />,
                action: deleteShowAction
              },
              {
                path: 'edit',
                element: <EditShowPage />,
                action: manipulateShowAction,
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
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
