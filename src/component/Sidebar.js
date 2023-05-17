import React from 'react';
import { Link,useNavigate} from 'react-router-dom';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import  { useState, useEffect } from 'react';
import axios from 'axios';
import SignOut from '../functions/SignOut';

function Sidebar(props){
  const navigate = useNavigate();

    return(
        <>
        {/*SIDEBAR*/}
        
         <div className="d-flex flex-column flex-shrink-0 p-3 bg-light"  style={{width:"250px",height:"100vh"}}>
           <svg className="bi pe-none me-2"style={{marginTop:"0px"}} ></svg>
              <span className="fs-4 " >CYBERMACS</span>
              <hr></hr>
              <ul className="nav nav-pills flex-column mb-auto">
                  <li className="nav-item">
                  <svg className="bi pe-none me-2" style={{width:"16px" ,height:"16px"}}></svg>
                  <Link  className={`nav-link ${props.hesabim_active} ${props.hesabim_disable}`}  aria-current="page" to={`${props.hesabim}`}><span className="nav-link active ">Hesabım</span></Link>
                  </li>
                  <li>
                  <svg className="bi pe-none me-2" style={{width:"16px" ,height:"16px"}}></svg>
                  <Link className={`nav-link ${props.form_active} ${props.form_disable}`}  aria-current="page" to={`${props.form_to}`}><span className="nav-link link-dark ">Başvuru</span></Link>
                  </li>
                  <li>
                  <svg className="bi pe-none me-2" style={{width:"16px" ,height:"16px"}}></svg>
                  <Link className={`nav-link ${props.bilgiguncelle_active} ${props.bilgiguncelle_disable}`}  aria-current="page" to={`${props.bilgiguncelle}`}><span className="nav-link link-dark"> Bilgi Güncelleme</span></Link>
                  </li>
                  <li>
                  <svg className="bi pe-none me-2" style={{width:"16px" ,height:"16px"}}></svg>
                  <Link className={`nav-link ${props.basvurusorgulama_active} ${props.basvurusorgulama_disable}`}  aria-current="page" to={`${props.basvurusorgulama}`}><span className="nav-link link-dark" >Başvuru Sorgulama</span></Link>
                  </li>
                  <li>
                  <svg className="bi pe-none me-2" style={{width:"16px" ,height:"16px"}}></svg>
                  <Link className={`nav-link ${props.sifreyenileme_active} ${props.sifreyenileme_disable}`}  aria-current="page" to={`${props.sifreyenileme}`}><span className="nav-link link-dark" style={{marginBottom:"150px"}}>Şifre Yenileme</span></Link>
                  </li>

              </ul>
              <hr>
              </hr>
              <div class="dropdown">
              <span class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <strong id="kullaniciadi"></strong>
              </span>
              <ul class="dropdown-menu text-small shadow">
                <li ><Link onClick={() => SignOut(navigate)}><span class="dropdown-item" >Çıkış Yap</span></Link></li>
              </ul>
            </div>
              
            </div>
       
        {/*SIDEBAR END*/}
        </>
    );


}

export default Sidebar;