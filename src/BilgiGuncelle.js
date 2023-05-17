import Sidebar from "./component/Sidebar.js";
import logo from './logo.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function BilgiGuncelle(){
  const [telefon, setTelefon] = useState('');
  const [ulke, setUlke] = useState('');
  const [sehir, setSehir] = useState('');
  const [adres,setAdres]=useState('');
  const [dogumtarihi,setDogumTarihi]=useState('');
  const [ad, setAd] = useState('');
  const [soyad, setSoyad] = useState('');
  const [kimlikno, setKimlikNo] = useState('');
  const [uyruk,setUyruk]=useState('');
  const [ikinciuyruk,setIkinciUyruk]=useState('');
  const [ogrenciBelgesi,setOgrenciBelgesi]=useState('');
  const [cv, setCv] = useState('');
  const [diploma, setDiploma] = useState('');
  const [yeterlilikbelgesi, setYeterlilikBelgesi] = useState('');
  const [niyetmektubu,setNiyetMektubu]=useState('');
  const [engellibelgesi,setEngelliBelgesi]=useState('');
  const [pasaport,setPasaport]=useState('');
  const [success, setSuccess] = useState('');
  const id = sessionStorage.getItem('id');
  function uyrukgoster(){
    if(document.getElementById("ikinciuyruk").value==1){
       document.getElementById("ikinciuyrukalani").style.display="";
    }
   
  }
  function engellidurumgoster(){
    if(document.getElementById("engellidurum").value==1){
       document.getElementById("engellibelgediv").style.display="";
    }
   
  }
  const KisiselBilgilerSubmit = async (e) => {

    e.preventDefault();

    try{

        const response = await axios.post("http://localhost:3001/KisiselBilgileriguncelle",{
            id,
            ad,
            soyad,
            kimlikno,
            dogumtarihi,
            uyruk,
            ikinciuyruk


        }
        );
        console.log(response);
        if(response.status === 200){
            setSuccess("Belgeler basarili sekilde guncellendi.");
            setAd('');
            setSoyad('');
            setKimlikNo('');
            setUyruk('');
            setIkinciUyruk('');
            setError('');
            
        }else{
            setError(response.data.error);
        }


    }catch(err){
        console.log(err);
        setError("Veritabani baglantisinda hata olustu. ", err);
    }
}
const DokumanguncellemeSubmit = async (e) => {

  e.preventDefault();

  try{

      const response = await axios.post("http://localhost:3001/dokumanguncelle",{
          id,
          ogrenciBelgesi,
          cv,
         diploma,
        yeterlilikbelgesi,
        niyetmektubu,
        pasaport,
        engellibelgesi

      }
      );
      console.log(response);
      if(response.status === 200){
          setSuccess("Belgeler basarili sekilde guncellendi.");
          setTelefon('');
          setUlke('');
          setSehir('');
          setAdres('');
          setError('');
      }else{
          setError(response.data.error);
      }


  }catch(err){
      console.log(err);
      setError("Veritabani baglantisinda hata olustu. ", err);
  }
}
const IletisimSubmit = async (e) => {

  e.preventDefault();

  try{

      const response = await axios.post("http://localhost:3001/iletisimguncelle",{
          id,
          telefon,
          ulke,
         sehir,
          adres

      }
      );
      console.log(response);
      if(response.status === 200){
          setSuccess("Belgeler basarili sekilde guncellendi.");
          setTelefon('');
          setUlke('');
          setSehir('');
          setAdres('');
          setError('');
      }else{
          setError(response.data.error);
      }


  }catch(err){
      console.log(err);
      setError("Veritabani baglantisinda hata olustu. ", err);
  }
}

  const [bilgi, setBilgi] = useState('');
  const [iletisim, setIletisim] = useState('');
  const [error, setError] = useState('');

  useEffect( () => {

      const bilgiGetir = async () => {
              const id = sessionStorage.getItem("id");
              const bilgi=sessionStorage.getItem("bilgi");
              console.log(bilgi)

              console.log(id);

          try{

              const response = await axios.post("http://localhost:3001/formGoruntule",
              {id}
          );

          if(response.status===200){
              setBilgi(response.data.kisiselBilgiler);
              setIletisim(response.data.iletisimBilgileri);
             
          }
         
          }catch(err){
              setError("Kullanici bilgileri gosterilemedi.");
          }
      }

    
          bilgiGetir();

  }, []);
  
    return(
        <div class="row">
            <div class="col-3"><Sidebar
            bilgiguncelle_active="active" 
            bilgiguncelle_disable="disabled" 
           gor_to="/portal/BasvuruGoruntule"
           form_to="/portal/BasvuruFormu"
          basvurusorgulama="/portal/BasvuruSorgulama"
          sifreyenileme="/portal/Sifredegistirme"
          hesabim="/portal/Hesabim"/></div>
            

            <div class="col-8">
          <div class="row mt-3 mb-4">
            <div class="col-4"><img src={logo} style={{width:"70px",height:"50px"}}/></div>
                <div class="col-6"><h4 class="mb-4">Cybermacs Başvuru Güncelleme</h4>
                   
                </div>
                <div class="col-2"></div>
                <hr/>
          </div>
          <div class="row mt-4">
            <div class="col-2"></div>
            <form >
            <div class="col-8">
                <div class="container">

                
                    <div class="accordion accordion-flush" id="accordionFlushExample">
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                             Kişisel Bilgi Güncelleme
                            </button>
                          </h2>
                          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body"> 
                            
                                <div class="row mt-4">
                                    <div class="col-2"></div>
                                    <div class="col-8">
                                      <h4 style={{textAlign:"center"}}>Kişisel Bilgiler</h4>
                                      <div class="row g-3 mb-3">
                                        <div class="col">
                                            <label for="exampleFormControlInput1" class="form-label">Ad</label>
                                          <input type="text" class="form-control"onChange= {(e) => setAd(e.target.value)} id="ad" placeholder="Ad" aria-label="First name"/>
                                        </div>
                                        <div class="col ">
                                            <label for="exampleFormControlInput1" class="form-label">Soyad</label>
                                          <input type="text" class="form-control" onChange= {(e) => setSoyad(e.target.value)}id="soyad" placeholder="Soyad" aria-label="Last name"/>
                                        </div>
                                      </div>
                                      <div class="row g-3 mb-3">
                                        <div class="col">
                                            <label for="exampleFormControlInput1" class="form-label">TC Kimlik/Pasaport No</label>
                                          <input type="text" class="form-control" id="kimlikno" onChange= {(e) => setKimlikNo(e.target.value)}placeholder="" aria-label="First name"/>
                                        </div>
                                        <div class="col ">
                                            <label for="exampleFormControlInput1" class="form-label">Doğum Tarihi</label>
                                          <input type="date" class="form-control" id="dogumtarihi" onChange= {(e) => setDogumTarihi(e.target.value)}placeholder="" aria-label="Last name"/>
                                        </div>
                                      </div>
                                      <div class="mb-3">
                                       
                                          
                                            
                                      </div>
                                    
                                      <div class="mb-3">
                                      
                                        <label for="exampleFormControlInput1" class="form-label">Uyruk</label>
                                        <select class="form-select" id="uyruk"onChange= {(e) => setUyruk(e.target.value)} aria-label="Default select example">
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
                                        <input class="form-check-input" type="checkbox" value="1" id="ikinciuyruk" onClick={uyrukgoster}/>
                                        <label class="form-check-label" for="flexCheckDefault">
                                          İkinci Uyruk
                                        </label>
                                      </div>
                                      <div class="mb-3"id="ikinciuyrukalani" style={{display:"none"}}>
                                        <br/>
                                        <label for="exampleFormControlInput1" class="form-label">İkinci Uyruk</label>
                                        <select class="form-select" onChange= {(e) => setIkinciUyruk(e.target.value)}aria-label="Default select example">
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
                                        <button type="button" class="btn btn-primary btn-lg btn-block" onClick={KisiselBilgilerSubmit}>Güncelle</button>
                                        {error && <p style={{color: 'red'}}> {error} </p>}
                                      {success && <p style={{color: 'green'}}> {success} </p>}
                                       </div>
                                    </div>
                                    <div class="col-2"></div>
                                
                                  </div>
                               </div>                              
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingTwo">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                              Döküman Güncelleme
                            </button>
                          </h2>
                          <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div class="row mt-4">
                                    <div class="col-2"></div>
                                    <div class="col-8">
                                      <h4 style={{textAlign:"center"}}>Dökümanlar</h4>
                                      <div class="row g-3 mb-3">
                                        <div class="col">
                                            <label for="exampleFormControlInput1" class="form-label">Öğrenci Belgesi</label>
                                          <input type="File" class="form-control" onChange= {(e) => setOgrenciBelgesi(e.target.value)}id="ogrencibelgesi"placeholder="" aria-label=""/>
                                        </div>
                                        <div class="col ">
                                            <label for="exampleFormControlInput1" class="form-label">CV</label>
                                          <input type="file" class="form-control" onChange= {(e) => setCv(e.target.value)}id="cv" placeholder="" aria-label=""/>
                                        </div>
                                      </div>
                                      <div class="row g-3 mb-3">
                                        <div class="col">
                                            <label for="exampleFormControlInput1" class="form-label">Diploma</label>
                                          <input type="file" class="form-control" onChange= {(e) => setDiploma(e.target.value)}id="diploma" placeholder="" aria-label=""/>
                                        </div>
                                        <div class="col ">
                                            <label for="exampleFormControlInput1" class="form-label">Yeterlilik Belgesi</label>
                                          <input type="file" class="form-control" id="yeterlilikbelgesi" onChange= {(e) => setYeterlilikBelgesi(e.target.value)}placeholder="" aria-label=""/>
                                        </div>
                                        
                                      </div>
                                      <div class="row g-3 mb-3">
                                        <div class="col">
                                            <label for="exampleFormControlInput1" class="form-label">Pasaport</label>
                                          <input type="file" class="form-control" onChange= {(e) => setPasaport(e.target.value)} id="pasaport" placeholder="" aria-label=""/>
                                        </div>
                                        <div class="col ">
                                            <label for="exampleFormControlInput1" class="form-label">Niyet Mektubu</label>
                                          <input type="file" class="form-control" onChange= {(e) => setNiyetMektubu(e.target.value)} id="niyetmektubu" placeholder="" aria-label=""/>
                                        </div>
                                        
                                      </div>
                                      <div class="form-check">
                                        <input class="form-check-input" id="engellidurum" onClick={engellidurumgoster}type="checkbox" value="1" />
                                        <label class="form-check-label" for="flexCheckDefault">
                                          Engelli Durum
                                        </label>
                                      </div>
                                      <div class="mb-3" id="engellibelgediv" style={{display:'none'}}>
                                        <label for="exampleFormControlInput1" class="form-label">Engelli Belgesi</label>
                                        <input type="file" class="form-control" onChange= {(e) => setEngelliBelgesi(e.target.value)} id="engellibelgesi" placeholder=""/>
                                        
                                      </div>
                                    
                                     
                                      <div class="mb-3 " style={{marginLeft:"150px"}}>
                                      {error && <p style={{color: 'red'}}> {error} </p>}
                                      {success && <p style={{color: 'green'}}> {success} </p>}
                                        <button type="button" class="btn btn-primary btn-lg btn-block " onClick={DokumanguncellemeSubmit}>Güncelle</button>
                                       </div>
                                    </div>
                                    <div class="col-2"></div>
                                
                                  </div>
                               
                                
                            </div>
                          </div>
                        </div>
                        <div class="accordion-item">
                          <h2 class="accordion-header" id="flush-headingThree">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                              İletişim Bilgileri Güncelleme
                            </button>
                          </h2>
                          <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div class="accordion-body">
                                <div class="row mt-4">
                                    <div class="col-2"></div>
                                    <div class="col-8">
                                      <h4 style={{textAlign:"center"}}>İletişim Bilgileri</h4>
                                      <div class="row g-3 mb-3">
                                        <div class="col">
                                            <label for="exampleFormControlInput1" class="form-label">Telefon</label>
                                          <input type="text" id="telefon"onChange= {(e) => setTelefon(e.target.value)} class="form-control" placeholder="" aria-label=""/>
                                        </div>
                                        
                                        <div class="col">
                                            <label for="exampleFormControlInput1" class="form-label">Ülke</label>
                                            <select class="form-select"  onChange= {(e) => setUlke(e.target.value)}  id="ulke" aria-label="Default select example">
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
                                            
                            </div>
                                      <div class="row g-3 mb-3">
                                        <div class="col">
                                            <label for="exampleFormControlInput1" class="form-label">Şehir</label>
                                          <input type="text" id="sehir" onChange= {(e) => setSehir(e.target.value)}class="form-control" placeholder="" aria-label=""/>
                                        </div>
                                        <div class="col ">
                                            <label for="exampleFormControlInput1" class="form-label">Adres</label>
                                          <input type="text" id="adres"class="form-control" onChange= {(e) => setAdres(e.target.value)}  placeholder="" aria-label=""/>
                                        </div>
                                      </div>
                                      {error && <p style={{color: 'red'}}> {error} </p>}
                                      {success && <p style={{color: 'green'}}> {success} </p>}
                                      
                                      <div class="mb-3 " style={{marginLeft:"150px"}}>
                                        <button type="button" class="btn btn-primary btn-lg btn-block" onClick={IletisimSubmit} >Güncelle</button>
                                       
                                       </div>
                                    </div>
                                    <div class="col-2"></div>
                                
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        
                        
                      </div>
                    </div>
                    </form>
                    <div class="col-2"></div>
            </div>
            </div>
            
            
       
        </div>
    );
}
export default BilgiGuncelle;