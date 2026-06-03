import { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Explore } from './pages/Explore';
import { Home } from './pages/Home';
import { Infrastructure } from './pages/Infrastructure';
import { Services } from './pages/Services';
import { Transparency } from './pages/Transparency';

function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} />;
      case 'infrastructure':
        return <Infrastructure />;
      case 'services':
        return <Services />;
      case 'transparency':
        return <Transparency />;
      case 'explore':
        return <Explore />;
      default:
        return <Home setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <Layout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
