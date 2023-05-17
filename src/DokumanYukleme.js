import { Link} from 'react-router-dom';
import Sidebar from './component/Sidebar.js';
import logo from './logo.png';
import React, {useState} from 'react';
import axios from 'axios';
function DokumanYukleme(){

  
    function goster(){
      if(document.getElementById("engellidurum").value==1){
         document.getElementById("engelli").style.display="";
      }
     
    }
    function tamamlamayuzde(){
      var yuzde = parseInt(sessionStorage.getItem("yuzde"));
      yuzde=yuzde+34;
      sessionStorage.setItem("yuzde", yuzde);
    }
    const [ogrencibelgesi, setOgrencibelgesi] = useState('');
    const [cv, setCv] = useState('');
    const [diploma, setDiploma] = useState('');
    const [yeterlilikbelgesi,setYeterlilikbelgesi]=useState('');
    const [pasaport,setPasaport]=useState('');
    const[niyetmektubu,setNiyetMektubu]=useState('');
    const[engellibelgesi,setEngellibelgesi]=useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const id = sessionStorage.getItem('id');

    const handleSubmit = async (e) => {

        e.preventDefault();

        try{

            const response = await axios.post("http://localhost:3001/dokumanyukle1",{
                id,
                ogrencibelgesi,
                cv,
                diploma,
                yeterlilikbelgesi,
                pasaport,
                niyetmektubu,
                engellibelgesi

            }
            );
            console.log(response);
            if(response.status === 200){
                setSuccess("Basvuru basarili sekilde alindi.");
           
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
          <Sidebar/>
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
          <div class="row mt-4">
            <div class="col-2"></div>
            <div class="col-8">
              <h4 style={{textAlign:"center"}}>Dökümanlar</h4>
              <div class="row g-3 mb-3">
                <div class="col">
                    <label for="exampleFormControlInput1" class="form-label">Öğrenci Belgesi</label>
                  <input type="File" class="form-control" id="ogrencibelgesi" value={ogrencibelgesi} 
                        onChange= {(e) => setOgrencibelgesi(e.target.value)}placeholder="" aria-label=""/>
                </div>
                <div class="col ">
                    <label for="exampleFormControlInput1" class="form-label">CV</label>
                  <input type="file" class="form-control" id="cvbelgesi"value={cv} 
                        onChange= {(e) => setCv(e.target.value)}placeholder="" aria-label=""/>
                </div>
              </div>
              <div class="row g-3 mb-3">
                <div class="col">
                    <label for="exampleFormControlInput1" class="form-label">Diploma</label>
                  <input type="file" class="form-control" id="diplomabelgesi"value={diploma} 
                        onChange= {(e) => setDiploma(e.target.value)} placeholder="" aria-label=""/>
                </div>
                <div class="col ">
                    <label for="exampleFormControlInput1" class="form-label">Yeterlilik Belgesi</label>
                  <input type="file" class="form-control" id="yeterlilikbelgesi" value={yeterlilikbelgesi} 
                        onChange= {(e) => setYeterlilikbelgesi(e.target.value)} placeholder="" aria-label=""/>
                </div>
                
              </div>
              <div class="row g-3 mb-3">
                <div class="col">
                    <label for="exampleFormControlInput1" class="form-label">Pasaport</label>
                  <input type="file" class="form-control" id="pasaportbelgesi" value={pasaport} 
                        onChange= {(e) => setPasaport(e.target.value)}placeholder="" aria-label=""/>
                </div>
                <div class="col ">
                    <label for="exampleFormControlInput1" class="form-label">Niyet Mektubu</label>
                  <input type="file" class="form-control"  id="niyetmektubu" value={niyetmektubu} 
                        onChange= {(e) => setNiyetMektubu(e.target.value)}placeholder="" aria-label=""/>
                </div>
                
              </div>
              <div class="form-check" >
                <input class="form-check-input" id="engellidurum" type="checkbox" onClick={goster} value="1"/>
                <label class="form-check-label"  for="flexCheckDefault">
                  Engelli Durum
                </label>
              </div>
              <div class="mb-3" id="engelli"style={{display:"none"}}>
                <label for="exampleFormControlInput1" class="form-label">Engelli Belgesi</label>
                <input type="file" class="form-control" id="engellibelgesi" value={engellibelgesi} 
                        onChange= {(e) => setEngellibelgesi(e.target.value)}placeholder=""/>
              </div>
            
              {error && <p style={{color: 'red'}}> {error} </p>}
            {success && <p style={{color: 'green'}}> {success} </p>}
              <div class="mb-3 " style={{marginLeft:"150px"}}>
                <button type="submit" class="btn btn-primary btn-lg btn-block " >Gönder</button>
                
               </div>
            </div>
            <div class="col-2"></div>
        
          </div>
          </form>
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
export default DokumanYukleme;