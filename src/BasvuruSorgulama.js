import { Link} from 'react-router-dom';
import Sidebar from './component/Sidebar.js';
import logo from './logo.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
function BasvuruSorgulama(){
  const [basvurudurum,setBasvurudurum]=useState('');
  const [error, setError] = useState('');
  const id = sessionStorage.getItem("id");
  useEffect( () => {
  
    const bilgiGetir = async () => {
            
            

            console.log(id);

        try{

            const response = await axios.post("http://localhost:3001/Basvurusorgulama",
            {id}
        );

        if(response.status===200){
            setBasvurudurum(response.data.message);
            console.log(response.data.message);
           
           
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
          basvurusorgulama_active="active" 
          basvurusorgulama_disable="disabled" 
          gor_to="/portal/BasvuruGoruntule"
         bilgiguncelle="/portal/BilgiGuncelle"
          form_to="/portal/BasvuruFormu"
        sifreyenileme="/portal/Sifredegistirme"
        hesabim="/portal/Hesabim"/>
        </div>
        <div class="col-8">
          <div class="row mt-3 mb-4">
            <div class="col-4"><img src={logo} style={{width:"70px",height:"50px"}}/></div>
                <div class="col-6"><h4 class="mb-4">Cybermacs Başvuru Sorgulama</h4>
                   
                </div>
                <div class="col-2"></div>
                <hr/>
          </div>
          <div class="row mt-4">
            <div class="col-2"></div>
            <div class="col-8">
              <h4>Başvuru Değerlendirme Aşamaları</h4>
              <p>
                CyberMACS programına kabul, rekabetçi bir temelde verilir ve başvuranlar, önceki akademik kayıtlarına göre değerlendirilir. Seçim belge tabanlıdır. Uygun başvuruların nihai değerlendirmesi ve nitelikli öğrencilerin sıralaması aşağıdaki kriterlere göre yapılır:
              <ol>
                <li>Önceki Çalışmaların Uygunluğu</li>
                <li>Akademik Performans</li>
                <li>Kurumun Tanınması ve Kalitesi</li>
                <li>CyberMACS Çalışmalarına Motivasyon ve Bağlılık</li>
                <li>İngilizce Dil Yeterliliği</li>
              </ol>
              </p>
              <div class="row bg-primary rounded" style={{width:"700px",height:"100px",marginTop:"100px"}}>
                <br/>
            
                  <h3 style={{marginTop:"20px",textAlign:"center"}} >{basvurudurum}</h3>
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
export default BasvuruSorgulama;