import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Pdf from './components/pdf';
import Header from './components/header';
import Docx from './components/docx';
import ThemeProvider from './components/theme';
import Alert from './components/alert';

function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
    <Header/>
    <Alert>
        <Routes>
          <Route path="/pdf" element={<Pdf/>} />
          <Route path='/docx' element={<Docx/>}/>
        </Routes>
    </Alert>
    </BrowserRouter>
    </ThemeProvider>
  );
  
}

export default App;
