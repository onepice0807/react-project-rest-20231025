import './App.css';
import Navbar from './components/Navbar';
import { Outlet, Route, Routes } from 'react-router-dom';
import SelectBoard from './pages/SelectBoard';
import DetailPage from './pages/DetailPage';
import ReviewBoard from './pages/ReviewBoard';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/selectgrid' element={<SelectBoard />} />
          <Route path='/detail' element={<DetailPage />} />
          <Route path='/review' element={<ReviewBoard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
