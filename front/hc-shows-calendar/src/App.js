import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/Root';
import HomePage from './pages/Home/Home';
import ShowDetailPage, { loader as showDetailLoader, action as deleteShowAction } from './pages/ShowDetail';
import { action as manipulateShowAction } from './components/ShowForm';
import NewShowPage from './pages/NewShow';
import EditShowPage from './pages/EditShow';
import UserDetailPage from './pages/UserDetail';
import UserShowListPage from './pages/UserShowList';

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
            element: <UserShowListPage />
          },
          {
            path: 'new',
            element: <NewShowPage />,
            action: manipulateShowAction
          },
          {
            path: ":id",
            id: 'show-detail',
            children: [
              {
                index: true,
                element: <ShowDetailPage />,
              },
              {
                path: 'edit',
                element: <EditShowPage />,
              }
            ]
          }
        ]
      },
      {
        path: 'user',
        element: <UserDetailPage />,
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
