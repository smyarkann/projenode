import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

function Kayit(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passRepeat, setPassRepeat] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

   const handleSubmit = async (e) => {
        e.preventDefault();

        if(password != passRepeat){
            setError("Sifreler eslesmiyor!");
            return;
        }


        try{

            const response = await axios.post('http://localhost:3001/kayit', {
                    email,
                    password
            });

            if(response.status === 200){
                setSuccess('Kayit Basarili. Simdi giris yapabilirsiniz.');
                setEmail('');
                setPassword('');
                setPassRepeat('');
                setError('');
            }else{
                setError('Kayit olusturulurken bir hata olustu.');
            }


        }catch (err){
            setError('Kayit olusturulurken bir hata olustu.');
        }


        
        
        
    }

    return(
        <div className="row bt-4">
            <div className="col-3"></div>
            <div className="col-6">
    <form onSubmit={handleSubmit}>
                <div class="row">
                <div className="col-4"></div>
                <div className="col-6"><img class="mt-4" src={logo} alt="" /></div>
                <div className="col-2"></div>
                </div>
    
    <h1 class="h3 mb-3 fw-normal">Giriş Yapın</h1>
    
    <div class="form-floating mb-3">
      <input type="email" class="form-control" id="email" placeholder="name@example.com"  value={email} 
                        onChange= {(e) => setEmail(e.target.value)}
                        required/>
      <label for="floatingInput">Email adresi</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="sifre" placeholder="Password"  value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                        minLength = "6"
                        required />
      <label for="floatingPassword">Şifre</label>
    </div>
    <div class="form-floating">
      <input type="password" class="form-control" id="resifre" placeholder="Password" value={passRepeat}
                        onChange= {(e) => setPassRepeat(e.target.value)}
                        minLength = "6"
                        required  />
      <label for="floatingPassword">Şifre</label>
    </div>

    <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"/> Beni Hatırla
      </label>
      {error && <p style={{color:'red'}}> {error} </p> }
      {success && <p style={{color: 'green'}}>{success}</p>}
    </div>
    <p> Hesabınız var mı? <Link to="/">Giriş Yap</Link></p>
    <button class="w-100 btn btn-lg btn-primary"  >Giriş Yap</button>
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </form>




            </div>
            <div className="col-3"></div>
     
        </div>
    );
}
export default Kayit;