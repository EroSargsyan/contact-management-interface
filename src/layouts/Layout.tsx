import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <aside className="w-1/4 bg-white shadow-lg h-full border-r border-gray-200">
        <Sidebar />
      </aside>

      <main className="flex-1 bg-white p-8 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
