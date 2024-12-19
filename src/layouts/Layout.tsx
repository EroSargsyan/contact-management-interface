import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <aside className="w-1/4 bg-white shadow-lg h-full">
        <Sidebar />
      </aside>

      <main className="flex-1 bg-white p-6 flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
