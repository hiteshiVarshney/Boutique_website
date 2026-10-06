import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { useRoute } from '@/hooks/useRoute';
import { Home } from '@/pages/Home';
import { About } from '@/pages/About';
import { Products } from '@/pages/Products';
import { Gallery } from '@/pages/Gallery';
import { Contact } from '@/pages/Contact';
import { AdminProducts } from '@/pages/AdminProducts';

function App() {
  const [route, navigate] = useRoute();

  const renderPage = () => {
    switch (route) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'about':
        return <About navigate={navigate} />;
      case 'products':
        return <Products />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      case 'admin/products':
        return <AdminProducts navigate={navigate} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar current={route} navigate={navigate} />
      <main>{renderPage()}</main>
      <Footer navigate={navigate} />
      <WhatsAppButton />
    </div>
  );
}

export default App;
