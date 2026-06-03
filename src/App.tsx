import { lazy, Suspense, useState } from 'react';
import { Layout } from './components/layout/Layout';
import { ExploreSkeleton } from './components/skeletons/ExploreSkeleton';
import { HomeSkeleton } from './components/skeletons/HomeSkeleton';
import { InfrastructureSkeleton } from './components/skeletons/InfrastructureSkeleton';
import { ServicesSkeleton } from './components/skeletons/ServicesSkeleton';
import { StatisticsSkeleton } from './components/skeletons/StatisticsSkeleton';
import { TransparencySkeleton } from './components/skeletons/TransparencySkeleton';

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Infrastructure = lazy(() => import('./pages/Infrastructure').then(m => ({ default: m.Infrastructure })));
const Services = lazy(() => import('./pages/Services').then(m => ({ default: m.Services })));
const Transparency = lazy(() => import('./pages/Transparency').then(m => ({ default: m.Transparency })));
const Statistics = lazy(() => import('./pages/Statistics').then(m => ({ default: m.Statistics })));
const Explore = lazy(() => import('./pages/Explore').then(m => ({ default: m.Explore })));

function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');

  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <Suspense fallback={<HomeSkeleton />}>
            <Home setCurrentTab={setCurrentTab} />
          </Suspense>
        );
      case 'infrastructure':
        return (
          <Suspense fallback={<InfrastructureSkeleton />}>
            <Infrastructure />
          </Suspense>
        );
      case 'services':
        return (
          <Suspense fallback={<ServicesSkeleton />}>
            <Services />
          </Suspense>
        );
      case 'transparency':
        return (
          <Suspense fallback={<TransparencySkeleton />}>
            <Transparency />
          </Suspense>
        );
      case 'statistics':
        return (
          <Suspense fallback={<StatisticsSkeleton />}>
            <Statistics />
          </Suspense>
        );
      case 'explore':
        return (
          <Suspense fallback={<ExploreSkeleton />}>
            <Explore />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<HomeSkeleton />}>
            <Home setCurrentTab={setCurrentTab} />
          </Suspense>
        );
    }
  };

  return (
    <Layout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
