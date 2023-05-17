import { Link} from 'react-router-dom';
import Sidebar from './component/Sidebar.js';
import logo from './logo.png';
import React, {useState} from 'react';
import axios from 'axios';
function BasvuruFormu(){
  function uyrukgoster(){
    if(document.getElementById("ikinciuyruk").value==1){
       document.getElementById("ikinciuyrukalani").style.display="";
    }
   
  }
  function tamamlamayuzde(){
    var yuzde = 0;
    var yuzde=yuzde+33;
    sessionStorage.setItem("yuzde", yuzde);
  }
    const [ad, setAd] = useState('');
    const [soyad, setSoyad] = useState('');
    const [kimlik, setKimlik] = useState('');
    const[basvurudurum,setbasvurudurum]=useState('Basvuru Alındı');
    const [dogumtarihi,setDogumtarihi]=useState('');
    const [email,setEmail]=useState('');
    const[ulke,setUlke]=useState('');
    const[ikinciuyruk,setIkinciuyruk]=useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const id = sessionStorage.getItem('id');

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            const response = await axios.post("http://localhost:3001/basvurugonder",{
                id,
                ad,
                soyad,
                kimlik,
                dogumtarihi,
                email,
                ulke,
                ikinciuyruk,
                basvurudurum

            }
            );
            console.log(response);
            if(response.status === 200){
                setSuccess("Basvuru basarili sekilde alindi.");
                setAd('');
                setSoyad('');
                setKimlik('');
                setDogumtarihi('');
                setEmail('');
                setUlke('');
                setIkinciuyruk('');
                setError('');
            }else{
                setError(response.data.error);
            }


        }catch(err){
            console.log(err);
            setError("Veritabani baglantisinda hata olustu. ", err);
        }
    }
  
    return(

        <div class="row">
        <div class="col-3" >
           <Sidebar
            form_active="active" 
            form_disable="disabled" 
            gor_to="/portal/BasvuruGoruntule"
           bilgiguncelle="/portal/BilgiGuncelle"
          basvurusorgulama="/portal/BasvuruSorgulama"
          sifreyenileme="/portal/Sifredegistirme"
          hesabim="/portal/Hesabim"/>
        </div>
        
        <div class="col-8">
          <div class="row mt-3 mb-4">
            <div class="col-4"><img src={logo} style={{width:"70px",height:"50px"}}/></div>
                <div class="col-6"><h4 class="mb-4">Cybermacs Başvuru Formu</h4>
                   
                </div>
                <div class="col-2"></div>
                <hr/>
          </div>
          <form onSubmit={handleSubmit}>
          <div className="row">
            <div class="row mt-4">
            <div class="col-2"></div>
            <div class="col-8">
              <h4 style={{textAlign:"center"}}>Kişisel Bilgiler</h4>
              <div class="row g-3 mb-3">
                <div class="col">
                    <label for="exampleFormControlInput1" class="form-label">Ad</label>
                  <input type="text" class="form-control" id="ad"placeholder="Ad"value={ad} 
                        onChange= {(e) => setAd(e.target.value)} aria-label="First name"/>
                </div>
                <div class="col ">
                    <label for="exampleFormControlInput1" class="form-label">Soyad</label>
                  <input type="text" class="form-control" id="soyad"placeholder="Soyad" value={soyad} 
                        onChange= {(e) => setSoyad(e.target.value)}aria-label="Last name"/>
                </div>
              </div>
              <div class="row g-3 mb-3">
                <div class="col">
                    <label for="exampleFormControlInput1" class="form-label">TC Kimlik No/Pasaport No</label>
                  <input type="text" class="form-control" id="kimlik" placeholder=""value={kimlik} 
                        onChange= {(e) => setKimlik(e.target.value)} aria-label="First name"/>
                </div>
                <div class="col ">
                    <label for="exampleFormControlInput1" class="form-label">Doğum Tarihi</label>
                  <input type="date" class="form-control" id="dogumtarih"value={dogumtarihi} 
                        onChange= {(e) => setDogumtarihi(e.target.value)} placeholder="" aria-label="Last name"/>
                </div>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Cinsiyet</label>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                    <label class="form-check-label" for="flexRadioDefault1">
                     Kadın
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
                    <label class="form-check-label" for="flexRadioDefault2">
                      Erkek
                    </label>
                  </div>
                    
              </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label" value={email} 
                        onChange= {(e) => setEmail(e.target.value)}>E-Mail</label>
                <input type="email" class="form-control" id="email" placeholder="E-Mail"/>
              </div>
              <div class="mb-3">
              
                <label for="exampleFormControlInput1" class="form-label">Uyruk</label>
                <select class="form-select" id="ulke" value={ulke} 
                        onChange= {(e) => setUlke(e.target.value)}aria-label="Default select example">
                  <option selected>Ülke Seçiniz</option>
                  <option value="Türkiye">Türkiye</option>
<option value="ABD Virgin Adaları">ABD Virgin Adaları</option>
<option value="Almanya">Almanya</option>
<option value="Amerika Birleşik Devletleri">Amerika Birleşik Devletleri</option>
<option value="Andorra">Andorra</option>
<option value="Antigua ve Barbuda">Antigua ve Barbuda</option>
<option value="Arjantin">Arjantin</option>
<option value="Arnavutluk">Arnavutluk</option>
<option value="Aruba">Aruba</option>
<option value="Avustralya">Avustralya</option>
<option value="Avusturya">Avusturya</option>
<option value="Azerbaycan">Azerbaycan</option>
<option value="Bahama">Bahama</option>
<option value="Bahamas">Bahamas</option>
<option value="Bahreyn">Bahreyn</option>
<option value="Bangladeş">Bangladeş</option>
<option value="Barbados">Barbados</option>
<option value="Belçika">Belçika</option>
<option value="Belize">Belize</option>
<option value="Benin">Benin</option>
<option value="Beyaz Rusya">Beyaz Rusya</option>
<option value="Birleşik Arap Emirlikleri">Birleşik Arap Emirlikleri</option>
<option value="Bolivya">Bolivya</option>
<option value="Bosna Hersek">Bosna Hersek</option>
<option value="Brezilya">Brezilya</option>
<option value="Brunei">Brunei</option>
<option value="Bulgaristan">Bulgaristan</option>
<option value="Burma">Burma</option>
<option value="Cebelitarık">Cebelitarık</option>
<option value="Çek Cumhuriyeti">Çek Cumhuriyeti</option>
<option value="Çin">Çin</option>
<option value="Danimarka">Danimarka</option>
<option value="Dominik Cumhuriyeti">Dominik Cumhuriyeti</option>
<option value="Ekvator">Ekvator</option>
<option value="El Salvador">El Salvador</option>
<option value="Endonezya">Endonezya</option>
<option value="Eritre">Eritre</option>
<option value="Ermenistan">Ermenistan</option>
<option value="Estonya">Estonya</option>
<option value="Fas">Fas</option>
<option value="Fiji">Fiji</option>
<option value="Filipinler">Filipinler</option>
<option value="Finlandiya">Finlandiya</option>
<option value="Fransa">Fransa</option>
<option value="Fransız Polinezyası">Fransız Polinezyası</option>
<option value="Grenada">Grenada</option>
<option value="Guadalup">Guadalup</option>
<option value="Guam">Guam</option>
<option value="Guatemala">Guatemala</option>
<option value="Güney Afrika">Güney Afrika</option>
<option value="Gürcistan">Gürcistan</option>
<option value="Hırvatistan">Hırvatistan</option>
<option value="Hindistan">Hindistan</option>
<option value="Hollanda">Hollanda</option>
<option value="Hollanda Antilleri">Hollanda Antilleri</option>
<option value="Honduras">Honduras</option>
<option value="Hong Kong">Hong Kong</option>
<option value="İngiliz Virginia Adaları">İngiliz Virginia Adaları</option>
<option value="İngiltere">İngiltere</option>
<option value="İrlanda">İrlanda</option>
<option value="İspanya">İspanya</option>
<option value="İsrail">İsrail</option>
<option value="İsveç">İsveç</option>
<option value="İsviçre">İsviçre</option>
<option value="İtalya">İtalya</option>
<option value="İzlanda">İzlanda</option>
<option value="Jamaika">Jamaika</option>
<option value="Japonya">Japonya</option>
<option value="Kamboçya">Kamboçya</option>
<option value="Kanada">Kanada</option>
<option value="Katar">Katar</option>
<option value="Kayman Adaları">Kayman Adaları</option>
<option value="Kıbrıs">Kıbrıs</option>
<option value="Kolombiya">Kolombiya</option>
<option value="Kore">Kore</option>
<option value="Kosta Rika">Kosta Rika</option>
<option value="Kuveyt">Kuveyt</option>
<option value="Küba">Küba</option>
<option value="Letonya">Letonya</option>
<option value="Liechtenstein">Liechtenstein</option>
<option value="Litvanya">Litvanya</option>
<option value="Lübnan">Lübnan</option>
<option value="Lüksemburg">Lüksemburg</option>
<option value="Macaristan">Macaristan</option>
<option value="Makedonya">Makedonya</option>
<option value="Maldivler">Maldivler</option>
<option value="Malezya">Malezya</option>
<option value="Malta">Malta</option>
<option value="Mauritius">Mauritius</option>
<option value="Meksika">Meksika</option>
<option value="Mısır">Mısır</option>
<option value="Moldova">Moldova</option>
<option value="Monako">Monako</option>
<option value="Mozambik">Mozambik</option>
<option value="Nikaragua">Nikaragua</option>
<option value="Norveç">Norveç</option>
<option value="Özbekistan">Özbekistan</option>
<option value="Panama">Panama</option>
<option value="Paraguay">Paraguay</option>
<option value="Peru">Peru</option>
<option value="Polonya">Polonya</option>
<option value="Portekiz">Portekiz</option>
<option value="Porto Riko">Porto Riko</option>
<option value="Romanya">Romanya</option>
<option value="Rusya">Rusya</option>
<option value="Saint Kitts ve Nevis">Saint Kitts ve Nevis</option>
<option value="Saint Lucia">Saint Lucia</option>
<option value="San Marino">San Marino</option>
<option value="Senegal">Senegal</option>
<option value="Seyşel">Seyşel</option>
<option value="Singapur">Singapur</option>
<option value="Slovakya">Slovakya</option>
<option value="Slovenya">Slovenya</option>
<option value="Sri Lanka">Sri Lanka</option>
<option value="Suriye">Suriye</option>
<option value="Suudi Arabistan">Suudi Arabistan</option>
<option value="Şili">Şili</option>
<option value="Tayland">Tayland</option>
<option value="Tayvan">Tayvan</option>
<option value="Tunus">Tunus</option>
<option value="Turks ve Caicos Adaları">Turks ve Caicos Adaları</option>
<option value="Ukrayna">Ukrayna</option>
<option value="Umman">Umman</option>
<option value="Uruguay">Uruguay</option>
<option value="Ürdün">Ürdün</option>
<option value="Vanuatu">Vanuatu</option>
<option value="Venezuela">Venezuela</option>
<option value="Vietnam">Vietnam</option>
<option value="Yeni Zelanda">Yeni Zelanda</option>
<option value="Yunanistan">Yunanistan</option>
                </select>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="ikinciuyruk" onclick={uyrukgoster}value="1"/>
                <label class="form-check-label" for="flexCheckDefault">
                  İkinci Uyruk
                </label>
              </div>
              <div class="mb-3" id="ikinciuyrukalani" style={{display:"none"}}>
                <br/>
                <label for="exampleFormControlInput1" class="form-label">İkinci Uyruk</label>
                <select class="form-select" id="ikinciuyruk"value={ikinciuyruk} 
                        onChange= {(e) => setIkinciuyruk(e.target.value)}aria-label="Default select example">
                  <option selected>Ülke Seçiniz</option>
                  <option value="Türkiye">Türkiye</option>
<option value="ABD Virgin Adaları">ABD Virgin Adaları</option>
<option value="Almanya">Almanya</option>
<option value="Amerika Birleşik Devletleri">Amerika Birleşik Devletleri</option>
<option value="Andorra">Andorra</option>
<option value="Antigua ve Barbuda">Antigua ve Barbuda</option>
<option value="Arjantin">Arjantin</option>
<option value="Arnavutluk">Arnavutluk</option>
<option value="Aruba">Aruba</option>
<option value="Avustralya">Avustralya</option>
<option value="Avusturya">Avusturya</option>
<option value="Azerbaycan">Azerbaycan</option>
<option value="Bahama">Bahama</option>
<option value="Bahamas">Bahamas</option>
<option value="Bahreyn">Bahreyn</option>
<option value="Bangladeş">Bangladeş</option>
<option value="Barbados">Barbados</option>
<option value="Belçika">Belçika</option>
<option value="Belize">Belize</option>
<option value="Benin">Benin</option>
<option value="Beyaz Rusya">Beyaz Rusya</option>
<option value="Birleşik Arap Emirlikleri">Birleşik Arap Emirlikleri</option>
<option value="Bolivya">Bolivya</option>
<option value="Bosna Hersek">Bosna Hersek</option>
<option value="Brezilya">Brezilya</option>
<option value="Brunei">Brunei</option>
<option value="Bulgaristan">Bulgaristan</option>
<option value="Burma">Burma</option>
<option value="Cebelitarık">Cebelitarık</option>
<option value="Çek Cumhuriyeti">Çek Cumhuriyeti</option>
<option value="Çin">Çin</option>
<option value="Danimarka">Danimarka</option>
<option value="Dominik Cumhuriyeti">Dominik Cumhuriyeti</option>
<option value="Ekvator">Ekvator</option>
<option value="El Salvador">El Salvador</option>
<option value="Endonezya">Endonezya</option>
<option value="Eritre">Eritre</option>
<option value="Ermenistan">Ermenistan</option>
<option value="Estonya">Estonya</option>
<option value="Fas">Fas</option>
<option value="Fiji">Fiji</option>
<option value="Filipinler">Filipinler</option>
<option value="Finlandiya">Finlandiya</option>
<option value="Fransa">Fransa</option>
<option value="Fransız Polinezyası">Fransız Polinezyası</option>
<option value="Grenada">Grenada</option>
<option value="Guadalup">Guadalup</option>
<option value="Guam">Guam</option>
<option value="Guatemala">Guatemala</option>
<option value="Güney Afrika">Güney Afrika</option>
<option value="Gürcistan">Gürcistan</option>
<option value="Hırvatistan">Hırvatistan</option>
<option value="Hindistan">Hindistan</option>
<option value="Hollanda">Hollanda</option>
<option value="Hollanda Antilleri">Hollanda Antilleri</option>
<option value="Honduras">Honduras</option>
<option value="Hong Kong">Hong Kong</option>
<option value="İngiliz Virginia Adaları">İngiliz Virginia Adaları</option>
<option value="İngiltere">İngiltere</option>
<option value="İrlanda">İrlanda</option>
<option value="İspanya">İspanya</option>
<option value="İsrail">İsrail</option>
<option value="İsveç">İsveç</option>
<option value="İsviçre">İsviçre</option>
<option value="İtalya">İtalya</option>
<option value="İzlanda">İzlanda</option>
<option value="Jamaika">Jamaika</option>
<option value="Japonya">Japonya</option>
<option value="Kamboçya">Kamboçya</option>
<option value="Kanada">Kanada</option>
<option value="Katar">Katar</option>
<option value="Kayman Adaları">Kayman Adaları</option>
<option value="Kıbrıs">Kıbrıs</option>
<option value="Kolombiya">Kolombiya</option>
<option value="Kore">Kore</option>
<option value="Kosta Rika">Kosta Rika</option>
<option value="Kuveyt">Kuveyt</option>
<option value="Küba">Küba</option>
<option value="Letonya">Letonya</option>
<option value="Liechtenstein">Liechtenstein</option>
<option value="Litvanya">Litvanya</option>
<option value="Lübnan">Lübnan</option>
<option value="Lüksemburg">Lüksemburg</option>
<option value="Macaristan">Macaristan</option>
<option value="Makedonya">Makedonya</option>
<option value="Maldivler">Maldivler</option>
<option value="Malezya">Malezya</option>
<option value="Malta">Malta</option>
<option value="Mauritius">Mauritius</option>
<option value="Meksika">Meksika</option>
<option value="Mısır">Mısır</option>
<option value="Moldova">Moldova</option>
<option value="Monako">Monako</option>
<option value="Mozambik">Mozambik</option>
<option value="Nikaragua">Nikaragua</option>
<option value="Norveç">Norveç</option>
<option value="Özbekistan">Özbekistan</option>
<option value="Panama">Panama</option>
<option value="Paraguay">Paraguay</option>
<option value="Peru">Peru</option>
<option value="Polonya">Polonya</option>
<option value="Portekiz">Portekiz</option>
<option value="Porto Riko">Porto Riko</option>
<option value="Romanya">Romanya</option>
<option value="Rusya">Rusya</option>
<option value="Saint Kitts ve Nevis">Saint Kitts ve Nevis</option>
<option value="Saint Lucia">Saint Lucia</option>
<option value="San Marino">San Marino</option>
<option value="Senegal">Senegal</option>
<option value="Seyşel">Seyşel</option>
<option value="Singapur">Singapur</option>
<option value="Slovakya">Slovakya</option>
<option value="Slovenya">Slovenya</option>
<option value="Sri Lanka">Sri Lanka</option>
<option value="Suriye">Suriye</option>
<option value="Suudi Arabistan">Suudi Arabistan</option>
<option value="Şili">Şili</option>
<option value="Tayland">Tayland</option>
<option value="Tayvan">Tayvan</option>
<option value="Tunus">Tunus</option>
<option value="Turks ve Caicos Adaları">Turks ve Caicos Adaları</option>
<option value="Ukrayna">Ukrayna</option>
<option value="Umman">Umman</option>
<option value="Uruguay">Uruguay</option>
<option value="Ürdün">Ürdün</option>
<option value="Vanuatu">Vanuatu</option>
<option value="Venezuela">Venezuela</option>
<option value="Vietnam">Vietnam</option>
<option value="Yeni Zelanda">Yeni Zelanda</option>
<option value="Yunanistan">Yunanistan</option>
                </select>
              </div>
              <div class="mb-3 " style={{marginLeft:"150px"}}>
              <button type="submit" class="btn btn-primary btn-lg btn-block" >Kaydet</button>
              <Link to="/portal/IletisimBilgileri"><button type="button" class="btn btn-secondary btn-lg btn-block">İlerle</button></Link>
               </div>
            </div>
            {error && <p style={{color: 'red'}}> {error} </p>}
            {success && <p style={{color: 'green'}}> {success} </p>}
            
            
            <div class="col-2"></div>
        
          </div>
          
        </div>
        </form>
        </div>
        
          
         
  <div class="b-example-divider"></div>

<div class="container pt-5">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        
      </a>
      <span class="mb-3 mb-md-0 text-muted">&copy; 2023 Company, Inc</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3"></li>
      <li class="ms-3"></li>
      <li class="ms-3"></li>
    </ul>
  </footer>
</div>
</div>


        
       
    );
}
export default BasvuruFormu;