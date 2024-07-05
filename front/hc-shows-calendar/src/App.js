import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/Home/Home';
import ShowDetailPage, { loader as showDetailLoader, action as deleteShowAction } from './pages/ShowDetail';
import { action as manipulateShowAction } from './components/ShowForm';
import NewShowPage from './pages/NewShow';
import EditShowPage from './pages/EditShow';
import UserDetailPage from './pages/UserDetail';
import UserShowListPage, { loader as userShowListLoader } from './pages/UserShowList';

//TODO add auth loader
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    children: [
      { index: true, element: <HomePage /> },
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
        //user should only be able to get here if logged in...
        path: 'user',
        id: 'user-detail',
        loader: userDetailLoader,
        children: [
          {
            index: true,
            element: <UserDetailPage />,
            
          }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
