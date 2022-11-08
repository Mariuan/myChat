import './App.css';
import { useEffect } from 'react';
import { Auth, Header } from './components';
import { Route, Routes, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { Main } from './Main';

function App() {
  
  const navigate = useNavigate();
  const { profile } = useSelector(state=>state.store);

  useEffect(()=>{
    if (!profile) navigate('/auth');
  }, [navigate, profile]);

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/auth" element={<Auth store={{profile: null}}/>}/>
          {
            profile &&
            <Route path="/*" element={<Main />}/>
          }
        </Routes>
      </div>  
    </div>
  );
}

export default App;
