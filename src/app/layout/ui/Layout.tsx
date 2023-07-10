import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="h-screen w-screen overflow-y-auto px-3">
      <Outlet />
    </div>
  );
}
