import './App.css';
import Navbar from './components/Navbar';
import { Outlet, Route, Routes } from 'react-router-dom';
import SelectBoard from './pages/SelectBoard';

const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

function App() {
  return (
    <div className='App'>
      <Routes>
        <Navbar />
        <Route path='/' element={<Layout />}>
          <Route path='/selectgrid' element={<SelectBoard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
