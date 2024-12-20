import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../layouts/Layout';
import CreateContactPage from '../pages/CreateContactPage';
import ContactDetailsPage from '../pages/ContactDetailsPage';
import EditContactPage from '../pages/EditContactPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/create-contact" element={<CreateContactPage />} />
          <Route path="/contacts/:id" element={<ContactDetailsPage />} />
          <Route path="/contacts/:id/edit" element={<EditContactPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
