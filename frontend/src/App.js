import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.js';
import FormIndividual from './components/FormIndividual';

function App() {
  return (
    <div className="App">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/salarioColaboradorIndividual' element={<FormIndividual />} />
            <Route path='/*' element={<Home />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;