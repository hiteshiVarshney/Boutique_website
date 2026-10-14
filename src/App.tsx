import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useRoute } from '@/hooks/useRoute';
import { useAuth } from '@/hooks/useAuth';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Products } from '@/pages/Products';
import { Gallery } from '@/pages/Gallery';
import { Contact } from '@/pages/Contact';
import { AdminLogin } from '@/pages/AdminLogin';
import { AdminProducts } from '@/pages/AdminProducts';

function App() {
  const [route, query, navigate] = useRoute();
  const { auth, checkSession, logout } = useAuth();

  const handleLoginSuccess = () => {
    checkSession().then(() => navigate('admin/products'));
  };

  const handleLogout = () => {
    logout().then(() => navigate('admin/login'));
  };

  const renderPage = () => {
    switch (route) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'about':
        return <About navigate={navigate} />;
      case 'products':
        return <Products initialCategory={query.category} />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      case 'admin/login':
        return <AdminLogin navigate={navigate} onSuccess={handleLoginSuccess} />;
      case 'admin/products':
        if (auth.loading) {
          return (
            <div className="flex min-h-screen items-center justify-center bg-ink-50">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-rose-300 border-t-rose-600" />
            </div>
          );
        }
        if (!auth.authenticated) {
          return <AdminLogin navigate={navigate} onSuccess={handleLoginSuccess} />;
        }
        return <AdminProducts navigate={navigate} onLogout={handleLogout} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  const isAdminRoute = route === 'admin/login' || route === 'admin/products';

  return (
    <div className="min-h-screen bg-ink-50">
      {!isAdminRoute && <Navbar current={route} navigate={navigate} />}
      <main>{renderPage()}</main>
      {!isAdminRoute && <Footer navigate={navigate} />}
      {!isAdminRoute && <WhatsAppButton />}
    </div>
  );
}

export default App;
