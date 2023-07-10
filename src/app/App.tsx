import { RouterProvider } from 'react-router-dom';
import { FetchProvider } from './providers/FetchProvider';
import { router } from './providers/RouterProvider';

function App() {
  return (
    <>
      <FetchProvider>
        <RouterProvider router={router} />
      </FetchProvider>
    </>
  );
}

export default App;
