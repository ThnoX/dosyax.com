import { Route, Routes } from 'react-router-dom';
import Shell from './components/Shell';
import HomePage from './pages/HomePage';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';
import DealsPage from './pages/DealsPage';
import LinkPage from './pages/LinkPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<HomePage />} />
        <Route path="haberler" element={<NewsPage />} />
        <Route path="haberler/:id" element={<NewsDetailPage />} />
        <Route path="indirimler" element={<DealsPage />} />
        <Route path="link" element={<LinkPage />} />
      </Route>
    </Routes>
  );
}
