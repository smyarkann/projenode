import Sidebar from './component/Sidebar.js';
import logo from './logo.png';
import axios from 'axios';
import React, {useState} from 'react';


function Sifredegistirme(){
  const[eskiSifre,seteskiSifre]=useState('');
  const [yeniSifre, setyeniSifre] = useState('');
  const[repassword,setRepassword]=useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(repassword==yeniSifre){
    const id = sessionStorage.getItem("id");
    try{

        const response = await axios.post('http://localhost:3001/sifreYenile',
            {
                 id,
                eskiSifre,
                yeniSifre
              
            }
        );

        if(response.status === 200){
            if(response.data.message === '1'){
              var mesaj= response.data.message;
                //sessionStorage.setItem("id", response.data.id);
                setSuccess('Şifreniz başarıyla değiştirildi')
               
            }else{
            setError('Sifre degistirilirken bir hata oluştu');
            console.log(response.data.message);

            }
        }
    }catch(err){
        setError('Şifre değiştirilirken hata ');
        console.log(mesaj);
    }
  }else{
    alert( "Şifrelerin Eşleştiğinden emin olun");
  }

}

    return(
        <div class="row">
        <div class="col-3" >
          <Sidebar
         sifreyenileme_active="active" 
         sifreyenileme_disable="disabled" 
         gor_to="/portal/BasvuruGoruntule"
        bilgiguncelle="/portal/BilgiGuncelle"
         form_to="/portal/BasvuruFormu"
         basvurusorgulama="/portal/BasvuruSorgulama"
         hesabim="/portal/Hesabim"/>
        </div>
        <div class="col-8">
        <form onSubmit={handleSubmit}>
          <div class="row mt-3 mb-4">
            <div class="col-4"><img src={logo} style={{width:"70px",height:"50px"}}/></div>
                <div class="col-6"><h4 class="mb-4">Şifre Yenileme</h4>
                   
                </div>
                <div class="col-2"></div>
                <hr/>
          </div>
          <div class="row mt-4">
            <div class="col-2"></div>
            <div class="col-8">
              
            <div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Eski Şifre</span>
  <input type="text" id="eskisifre" class="form-control" value={eskiSifre} 
                        onChange= {(e) => seteskiSifre(e.target.value)}aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Yeni Şifre</span>
  <input type="text" id="yenisifre"class="form-control" value={yeniSifre} 
                        onChange= {(e) => setyeniSifre(e.target.value)}aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>
<div class="input-group mb-3">
  <span class="input-group-text" id="inputGroup-sizing-default">Yeni Sifre Tekrar</span>
  <input type="text" id="yenisifretekrar"value={repassword} 
                        onChange= {(e) => setRepassword(e.target.value)} class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
</div>
<button type="submit" class="btn btn-primary" >Şifre Yenile</button>
<p id="sonuc"></p>
                </div>
            <div class="col-2"></div>
        
          </div>
        </form>
        {error && <p style={{color:'red'}}> {error} </p> }
      {success && <p style={{color: 'green'}}>{success}</p>}

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
export default Sifredegistirme;