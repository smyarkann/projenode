import {BrowserRouter as Router, Route, Routes, Link, Outlet, Navigate} from 'react-router-dom';
import Giris from './Giris';
import Kayit from './Kayit';
import Portal from './Portal';
import BasvuruFormu from './BasvuruFormu';
import BasvuruGoruntule from './BasvuruGoruntule';
import IletisimBilgileri from './IletisimBilgileri';
import DokumanYukleme from './DokumanYukleme';
import BilgiGuncelle from './BilgiGuncelle';
import BasvuruSorgulama from './BasvuruSorgulama';
import Hesabim from './Hesabim';
import Sifredegistirme from './Sifredegistirme';

function App() {
  
  return (
    
    <Router>
    <Routes>
      <Route path="/" element={<Giris />} />
      <Route path="/kayit" element={<Kayit />} />
      <Route path="/portal" element={<Portal/>}/>
      <Route path="/portal/Hesabim" element={<Hesabim/>}/>
      <Route path="/portal/BasvuruFormu" element={<BasvuruFormu/>} />
      <Route path="/portal/BasvuruGoruntule" element={<BasvuruGoruntule/>} />
      <Route path="/portal/IletisimBilgileri" element={<IletisimBilgileri/>}/>
      <Route path="/portal/DokumanYukleme" element={<DokumanYukleme/>}/>
      <Route path="/portal/BilgiGuncelle" element={<BilgiGuncelle/>}/>
      <Route path="/portal/BasvuruSorgulama" element={<BasvuruSorgulama/>}/>
      <Route path="/portal/Sifredegistirme" element={<Sifredegistirme/>}/>
 
    </Routes>
  </Router>

  );
}

export default App;
