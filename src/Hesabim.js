import { Link} from 'react-router-dom';
import Sidebar from './component/Sidebar.js';
import logo from './logo.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Hesabim(){
  const [bilgi, setBilgi] = useState('');
  const [iletisim, setIletisim] = useState('');
    const [error, setError] = useState('');
  useEffect( () => {
    
    const bilgiGetir = async () => {
            const id = sessionStorage.getItem("id");
            //const bilgi=sessionStorage.getItem("bilgi");
            //console.log(bilgi)

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
        <div class="col-3" >
          <Sidebar
          hesabim_active="active" 
          hesabim_disable="disabled" 
          gor_to="/portal/BasvuruGoruntule"
         bilgiguncelle="/portal/BilgiGuncelle"
          form_to="/portal/BasvuruFormu"
          basvurusorgulama="/portal/BasvuruSorgulama"
          sifreyenileme="/portal/Sifredegistirme"/>
        </div>
        <div class="col-8">
          <div class="row mt-3 mb-4">
            <div class="col-4"><img src={logo} style={{width:"70px",height:"50px"}}/></div>
                <div class="col-6"><h4 class="mb-4"><p id="kullaniciad">Hoşgeldin {bilgi.ad}</p></h4>
                   
                </div>
                <div class="col-2"></div>
                <hr/>
          </div>
          <div class="row mt-4">
            <div class="col-2"></div>
            <div class="col-8">
              <div class="row mb-4">
               
                <div class="col-5 bg-light" style={{height:"300px"}}>
                <p><span>Kişisel Bilgiler</span></p>
                  <div id="bolumad" >Ad: {bilgi.ad}</div>
                  <br/>
                  <div id="bolumsoyad" >Soyad: {bilgi.soyad}</div>
                  <br/>
                  <div id="bolumtc" >Ad: {bilgi.kimlikno}</div>
                  <br/>
                  <div id="bolumemail" >Doğum Tarihi: {bilgi.dogumtarihi}</div>
                  <br/>
                  <div id="bolumdogumtarihi" >Uyruk: {bilgi.uyruk}</div>
                  
                </div>
                <div class="col-1"></div>
                <div class="col-5 bg-light">
                  <p><span >İletişim Bilgileri</span></p>
                
                  <div id="cvbel">Telefon: {iletisim.telefon}</div>
                  <br/>
                  <div id="diplomabel">Ülke: {iletisim.ulke}</div>
                  <br/>
                  <div id="yeterlilikbel">Şehir: {iletisim.sehir}</div>
                  <br/>
                  <div id="pasaportbel">Adres: {iletisim.adres} </div>
                  

                </div>
                <div class="col-1"></div>
              </div>
              
                <div class="col-2"></div>
              </div>
              
              
            
            </div>
            <div class="row mt-4" >
                <div class="col-2"></div>
                <div class="col-8">
                    <h4>Başvuru Tamamlama Durumu</h4>

                    <div class="progress" role="progressbar" aria-label="Example with label" id="yuzdeoran"aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar"  id="yuzde"></div>
                      </div>
                </div>
            <div class="col-2"></div>
        
          </div>
        </div>
        
          
         
  <div class="b-example-divider"></div>

<div class="container pt-5">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
      
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
export default Hesabim;