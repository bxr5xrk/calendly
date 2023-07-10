import { createBrowserRouter } from 'react-router-dom';
import { WallchartPage } from '../../../../pages/WallchartPage';
import { Layout } from '../../../layout/ui/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <WallchartPage />,
      },
    ],
  },
]);
