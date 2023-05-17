const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cybermacs"
});

connection.connect((err) => {
    if(err) {
        console.error('Veritabanina baglanirken hata olustu: ', err);
        return;
    }
    console.log('Veritabanina baglanildi.');
});
app.post('/kayit', (req,res) => {

    const {email , password} = req.body;

    const query = "INSERT INTO hesap (Email	,Sifre) VALUE (?,?)";
    console.log(email);
    
    connection.query(query, [email, password], (err,result) => {

        if(err){
            console.error("Veritabanina bilgi girereken hata: ", err);
            res.status(500).send({error: "Kayit olusturulurken bir hata olustu."});
            return;
        }
        res.status(200).send({message: "Kayit basarili!"});

    })
    
});
//kullanici girisinin saglanmasi
app.post('/', (req,res) => {
   
    
    const {email, password} = req.body;

    const query = "SELECT * FROM hesap WHERE Email=? AND Sifre=?";

    connection.query(query, [email, password], (err, result) => {
        if(err){
            console.error("Bilgilerin kontrolunde hata olustu. ", err);
            res.status(500).send({error: 'Bilgilerin kontrolunde hata olustu.'});
            return;
        }
        if(result.length > 0){
            const Kullanici_ID = result[0].Kullanici_ID;

            const isLoginQuery = "UPDATE hesap SET isLogin = 1 WHERE Kullanici_ID=?";
           
          

            connection.query(isLoginQuery, Kullanici_ID, (err,result) => {
                if(err){
                    console.error("Login bilgisi guncellenirken hata olustu. ", err);
                    res.status(500).send({error: 'Login guncellenemedi.'});
                }
            });

            res.status(200).send({message: '1', id: Kullanici_ID});
        }else{
            res.status(200).send({message: '0'});
        }
        

    })



});
app.post('/basvurugonder', (req,res) => {

    const {id, ad, soyad,kimlik,dogumtarihi,ulke,ikinciuyruk,basvurudurum} = req.body;

    const kontrolQuery = "SELECT * FROM kisisel_bilgiler WHERE Kullanici_ID = ?";

    connection.query(kontrolQuery, [id], (err,result) => {

        if(result.length > 0){
            res.status(201).send({error: "Aynı hesaptan yalnızca bir başvuru yapılabilir."});
            return;
        } else {
            const query = "INSERT INTO kisisel_bilgiler (Kullanici_ID, Ad, Soyad,Kimlik_No,Dogum_Tarihi, Uyruk,Ikinci_Uyruk) VALUES (?,?,?,?,?,?,?)";

            connection.query(query, [id, ad,soyad,kimlik,dogumtarihi,ulke,ikinciuyruk], (err,result) => {
                if(err){
                    console.error("Veritabanına ekleme yapılırken hata oluştu. ", err);
                    res.status(500).send({error: "Veritabanına ekleme yapılırken hata oluştu."});
                    return;
                }

                const query1 = "INSERT INTO basvuru (Kullanici_ID,Basvuru_Durum) VALUES (?,?)";
                connection.query(query1, [id,basvurudurum], (err,result) => {
                    if(err){
                        console.error("Veritabanına ekleme yapılırken hata oluştu. ", err);
                        res.status(500).send({error: "Veritabanına ekleme yapılırken hata oluştu."});
                        return;
                    }

                    res.status(200).send({message: "Başvuru başarıyla kaydedildi."});
                });
            });
        }
    });
});
//kisisel bilgiler tablosuna veri gönderme
app.post('/basvurugonder1', (req,res) => {
    

    const {id, ad, soyad,kimlik,dogumtarihi,ulke,ikinciuyruk,basvurudurum} = req.body;
   

    const kontrolQuery = "SELECT * FROM kisisel_bilgiler WHERE Kullanici_ID = ?";

    connection.query(kontrolQuery, [id], (err,result) => {

        if(result.length > 0){
            res.status(201).send({error: "Aynı hesaptan yalnizca bir basvuru yapilabilir."});
            return;
        }else{
            const query = "INSERT INTO kisisel_bilgiler (Kullanici_ID, Ad, Soyad,Kimlik_No,Dogum_Tarihi, Uyruk,Ikinci_Uyruk) VALUES (?,?,?,?,?,?,?)";

            connection.query(query, [id, ad,soyad,kimlik,dogumtarihi,ulke,ikinciuyruk], (err,result) => {
                if(err){
                    console.error("Veritabanina ekleme yapilirken hata olustu. ", err);
                    res.status(500).send({error: "Veritabanina ekleme yapilirken hata olustu."});
                    return;
                }

                res.status(200).send({message: "Basvuru basariyla kaydedildi."});
            });
        }const query1 = "INSERT INTO basvuru (Kullanici_ID,Basvuru_Durum) VALUES (?,?)";
          
        connection.query(query1, [id,basvurudurum], (err,result) => {
            console.log(basvurudurum);
            if(err){
                console.error("Veritabanina ekleme yapilirken hata olustu. ", err);
                res.status(500).send({error: "Veritabanina ekleme yapilirken hata olustu."});
                return;
            }

            res.status(200).send({message: "Basvuru basariyla kaydedildi."});
        });

    });

});
//Kişisel Bilgileri Güncelleme
app.post('/KisiselBilgileriguncelle', (req, res) => {
    const { id, ad, soyad, kimlikno,dogumtarihi ,uyruk,ikinciuyruk } = req.body;
  
    const kontrolQuery = "SELECT * FROM kisisel_bilgiler WHERE Kullanici_ID = ?";
  
    connection.query(kontrolQuery, [id], (err, result) => {
      if (err) {
        console.error("Veritabanına sorgu yapılırken hata oluştu: ", err);
        res.status(500).send({ error: "Veritabanına sorgu yapılırken hata oluştu." });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).send({ error: "Belirtilen ID değerine sahip kayıt bulunamadı." });
        return;
      }
  
      const query = "UPDATE kisisel_bilgiler SET Kimlik_No = ?, Ad = ?, Soyad = ?,Dogum_Tarihi = ?, Uyruk = ?, Ikinci_Uyruk=? WHERE Kullanici_ID = ?";
  
      connection.query(query, [kimlikno,ad , soyad,dogumtarihi, uyruk, ikinciuyruk,id], (err, result) => {
        if (err) {
          console.error("Veritabanına güncelleme yapılırken hata oluştu. ", err);
          res.status(500).send({ error: "Veritabanına güncelleme yapılırken hata oluştu." });
          return;
        }
  
        res.status(200).send({ message: "Basvuru basariyla kaydedildi." });
      });
    });
  });
//iletisimbilgileri verisine bilgi gonderme
app.post('/iletisimgonder', (req,res) => {
    
    const {id, telefon, ulke,sehir,adres} = req.body;

    const kontrolQuery = "SELECT * FROM iletisim WHERE Kullanici_ID = ?";

    connection.query(kontrolQuery, [id], (err,result) => {

        if(result.length > 0){
            res.status(201).send({error: "Aynı hesaptan yalnizca bir basvuru yapilabilir."});
            return;
        }else{
            const query = "INSERT INTO iletisim (Kullanici_ID, Telefon, Ulke, Sehir,Adres) VALUES (?,?,?,?,?)";

            connection.query(query, [id, telefon,ulke,sehir,adres], (err,result) => {
                if(err){
                    console.error("Veritabanina ekleme yapilirken hata olustu. ", err);
                    res.status(500).send({error: "Veritabanina ekleme yapilirken hata olustu."});
                    return;
                }

                res.status(200).send({message: "Basvuru basariyla kaydedildi."});
            });
        }

    });

});

app.post('/iletisimguncelle', (req, res) => {
    const { id, telefon, ulke, sehir, adres } = req.body;
  
    const kontrolQuery = "SELECT * FROM iletisim WHERE Kullanici_ID = ?";
  
    connection.query(kontrolQuery, [id], (err, result) => {
      if (err) {
        console.error("Veritabanına sorgu yapılırken hata oluştu: ", err);
        res.status(500).send({ error: "Veritabanına sorgu yapılırken hata oluştu." });
        return;
      }
  
      if (result.length === 0) {
        res.status(404).send({ error: "Belirtilen ID değerine sahip kayıt bulunamadı." });
        return;
      }
  
      const query = "UPDATE iletisim SET Telefon = ?, Ulke = ?, Sehir = ?, Adres = ? WHERE Kullanici_ID = ?";
  
      connection.query(query, [telefon, ulke, sehir, adres, id], (err, result) => {
        if (err) {
          console.error("Veritabanına güncelleme yapılırken hata oluştu. ", err);
          res.status(500).send({ error: "Veritabanına güncelleme yapılırken hata oluştu." });
          return;
        }
  
        res.status(200).send({ message: "Basvuru basariyla kaydedildi." });
      });
    });
  });
  
app.post('/dokumanyukle', (req,res) => {
    
    const {id, ogrencibelgesi, cv, diploma, yeterlilikbelgesi, pasaport, niyetmektubu} = req.body;

    const kontrolQuery = "SELECT * FROM dokuman WHERE Kullanici_ID = ?";

    connection.query(kontrolQuery, [id], (err,result) => {

      
            const query = "INSERT INTO dokuman (Kullanici_ID,Dokuman_Tipi, Dokuman_Veri) VALUES (?,?,?)";

            connection.query(query, [id, 'ogrencibelgesi',ogrencibelgesi], (err,result) => {
                if(err){
                    console.error("Veritabanina ekleme yapilirken hata olustu. ", err);
                    res.status(500).send({error: "Veritabanina ekleme yapilirken hata olustu."});
                    return;
                }

                res.status(200).send({message: "Basvuru basariyla kaydedildi."});
            });
            connection.query(query, [id, 'Cv',cv], (err,result) => {
                if(err){
                    console.error("Veritabanina ekleme yapilirken hata olustu. ", err);
                    res.status(500).send({error: "Veritabanina ekleme yapilirken hata olustu."});
                    return;
                }

                res.status(200).send({message: "Basvuru basariyla kaydedildi."});
            });
            connection.query(query, [id, 'diploma',diploma], (err,result) => {
                if(err){
                    console.error("Veritabanina ekleme yapilirken hata olustu. ", err);
                    res.status(500).send({error: "Veritabanina ekleme yapilirken hata olustu."});
                    return;
                }

                res.status(200).send({message: "Basvuru basariyla kaydedildi."});
            });
            connection.query(query, [id, 'yeterlilikbelgesi',yeterlilikbelgesi], (err,result) => {
                if(err){
                    console.error("Veritabanina ekleme yapilirken hata olustu. ", err);
                    res.status(500).send({error: "Veritabanina ekleme yapilirken hata olustu."});
                    return;
                }

                res.status(200).send({message: "Basvuru basariyla kaydedildi."});
            });
            connection.query(query, [id, 'pasaport',pasaport], (err,result) => {
                if(err){
                    console.error("Veritabanina ekleme yapilirken hata olustu. ", err);
                    res.status(500).send({error: "Veritabanina ekleme yapilirken hata olustu."});
                    return;
                }

                res.status(200).send({message: "Basvuru basariyla kaydedildi."});
            });
            connection.query(query, [id, 'niyetmektubu',niyetmektubu], (err,result) => {
                if(err){
                    console.error("Veritabanina ekleme yapilirken hata olustu. ", err);
                    res.status(500).send({error: "Veritabanina ekleme yapilirken hata olustu."});
                    return;
                }

                res.status(200).send({message: "Basvuru basariyla kaydedildi."});
            });
        

    });

});
//dokuman tablosuna veri gönderme
app.post('/dokumanyukle1', (req,res) => {
    
    const {id, ogrencibelgesi, cv, diploma, yeterlilikbelgesi, pasaport, niyetmektubu} = req.body;

    const kontrolQuery = "SELECT * FROM dokuman WHERE Kullanici_ID = ?";
    var kontrol=0;
    connection.query(kontrolQuery, [id], (err,result) => {

        if(err){
            console.error("Veritabanı sorgulanırken hata oluştu. ", err);
            res.status(500).send({error: "Veritabanı sorgulanırken hata oluştu."});
            return;
        }

        if(result && result.length > 0){
            console.error("Doküman zaten yüklenmiş. ", err);
            res.status(400).send({error: "Doküman zaten yüklenmiş."});
            return;
        }

        const query = "INSERT INTO dokuman (Kullanici_ID, Dokuman_Tipi, Dokuman_Veri) VALUES (?,?,?)";

        // Öğrenci Belgesi
        connection.query(query, [id,'ogrencibelgesi', ogrencibelgesi], (err,result) => {
            if(err){
                console.error("Veritabanına ekleme yapılırken hata oluştu. ", err);
                res.status(500).send({error: "Veritabanına ekleme yapılırken hata oluştu."});
                return;
            }
            res.status(200).send({message: "Belgeler basariyla yüklendi."});
            
            
        });

        // CV
        connection.query(query, [id,'Cv', cv], (err,result) => {
            if(err){
                console.error("Veritabanına ekleme yapılırken hata oluştu. ", err);
                res.status(500).send({error: "Veritabanına ekleme yapılırken hata oluştu."});
                return;
            }
            
            
        });

        // Diploma
        connection.query(query, [id,'diploma', diploma], (err,result) => {
            if(err){
                console.error("Veritabanına ekleme yapılırken hata oluştu. ", err);
                res.status(500).send({error: "Veritabanına ekleme yapılırken hata oluştu."});
                return;
            }
            
            
        });

        // Yeterlilik Belgesi
        connection.query(query, [id, 'yeterlilikbelgesi',yeterlilikbelgesi], (err,result) => {
            if(err){
                console.error("Veritabanına ekleme yapılırken hata oluştu. ", err);
                res.status(500).send({error: "Veritabanına ekleme yapılırken hata oluştu."});
                return;
            }
            
            
        });

        // Pasaport
        connection.query(query, [id,'pasaport', pasaport], (err,result) => {
            if(err){
                console.error("Veritabanına ekleme yapılırken hata oluştu. ", err);
                res.status(500).send({error: "Veritabanına ekleme yapılırken hata oluştu."});
                return;
            }
            
            
        });

        // Niyet Mektubu
        connection.query(query, [id,'niyetmektubu', niyetmektubu], (err,result) => {
            if(err){
                console.error("Veritabanına ekleme yaptabilirken hata oluştu. ", err);
                res.status(500).send({error: "Veritabanına ekleme yapılırken hata oluştu."});
                return;
                }
                
                
        });
  
   
});
});
//dokuman güncelleme
app.post('/dokumanguncelle', (req, res) => {

    const { id,ogrenciBelgesi, cv, diploma, yeterlilikbelgesi, pasaport, niyetmektubu } = req.body;
   

    const query = "UPDATE dokuman SET Dokuman_Veri = ? WHERE Kullanici_ID = ? AND Dokuman_Tipi = ?";

    // Öğrenci Belgesi
    connection.query(query, [ogrenciBelgesi, id, 'ogrencibelgesi'], (err, result) => {
        if (err) {
            console.error("Veritabanında güncelleme yapılırken hata oluştu. ", err);
            res.status(500).send({ error: "Veritabanında güncelleme yapılırken hata oluştu." });
            return;
        }
    });

    // CV
    connection.query(query, [cv, id, 'Cv'], (err, result) => {
        if (err) {
            console.error("Veritabanında güncelleme yapılırken hata oluştu. ", err);
            res.status(500).send({ error: "Veritabanında güncelleme yapılırken hata oluştu." });
            return;
        }
    });

    // Diploma
    connection.query(query, [diploma, id, 'diploma'], (err, result) => {
        if (err) {
            console.error("Veritabanında güncelleme yapılırken hata oluştu. ", err);
            res.status(500).send({ error: "Veritabanında güncelleme yapılırken hata oluştu." });
            return;
        }
    });

    // Yeterlilik Belgesi
    connection.query(query, [yeterlilikbelgesi, id, 'yeterlilikbelgesi'], (err, result) => {
        if (err) {
            console.error("Veritabanında güncelleme yapılırken hata oluştu. ", err);
            res.status(500).send({ error: "Veritabanında güncelleme yapılırken hata oluştu." });
            return;
        }
    });

    // Pasaport
    connection.query(query, [pasaport, id, 'pasaport'], (err, result) => {
        if (err) {
            console.error("Veritabanında güncelleme yapılırken hata oluştu. ", err);
            res.status(500).send({ error: "Veritabanında güncelleme yapılırken hata oluştu." });
            return;
        }
    });

    // Niyet Mektubu
    connection.query(query, [niyetmektubu, id, 'niyetmektubu'], (err, result) => {
        if (err) {
            console.error("Veritabanında güncelleme yapılırken hata oluştu. ", err);
            res.status(500).send({ error: "Veritabanında güncelleme yapılırken hata oluştu." });
            return;
        }
    });

    res.status(200).send({ message: "Belgeler başarıyla güncellendi." });
});

//form görüntüleme
app.post("/formGoruntule1", (req,res) => {

    const user_id = req.body.id;

    const query = "SELECT * FROM kisisel_bilgiler WHERE Kullanici_ID=?";

    connection.query(query, [user_id], (err,result) => {
        if(err){
            console.error("Veritabanindan bilgi alinirken hata olustu.", err);
            res.status(500).send({error: "Veritabanindan bilgi alinirken hata olustu."});
            return;
        }
        if(result.length===0){
            res.status(404).send({message: "Basvuru Bulunamadi."});
        }else{
            res.status(200).send({kimlikno: result[0].Kimlik_No, 
                ad: result[0].Ad, 
                soyad: result[0].Soyad,
            dogumtarihi:result[0].Dogum_Tarihi,
            uyruk:result[0].Uyruk});
        }
       


    });
    const query1 = "SELECT * FROM iletisim WHERE Kullanici_ID=?";

    connection.query(query1, [user_id], (err,result) => {
        if(err){
            console.error("Veritabanindan bilgi alinirken hata olustu.", err);
            res.status(500).send({error: "Veritabanindan bilgi alinirken hata olustu."});
            return;
        }
        if(result.length===0){
            res.status(404).send({message: "Basvuru Bulunamadi."});
        }else{
            res.status(201).send({telefon: result[0].Telefon, 
                ulke: result[0].Ulke, 
                sehir: result[0].Sehir,
            adres:result[0].Adres});
        }
       


    });



});
app.post("/formGoruntule", (req, res) => {

    const user_id = req.body.id;

    const query = "SELECT * FROM kisisel_bilgiler WHERE Kullanici_ID=?";
    const query1 = "SELECT * FROM iletisim WHERE Kullanici_ID=?";
    

    connection.query(query, [user_id], (err, result) => {
        if (err) {
            console.error("Veritabanından bilgi alınırken hata oluştu.", err);
            res.status(500).send({ error: "Veritabanından bilgi alınırken hata oluştu." });
            return;
        }
        if (result.length === 0) {
            res.status(404).send({ message: "Başvuru Bulunamadı." });
        } else {
            const kisiselBilgiler = {
                kimlikno: result[0].Kimlik_No,
                ad: result[0].Ad,
                soyad: result[0].Soyad,
                dogumtarihi: result[0].Dogum_Tarihi,
                uyruk: result[0].Uyruk,
                
            };
            connection.query(query1, [user_id], (err, result) => {
                if (err) {
                    console.error("Veritabanından bilgi alınırken hata oluştu.", err);
                    res.status(500).send({ error: "Veritabanından bilgi alınırken hata oluştu." });
                    return;
                }
                if (result.length === 0) {
                    res.status(404).send({ message: "Başvuru Bulunamadı." });
                } else {
                    const iletisimBilgileri = {
                        telefon: result[0].Telefon,
                        ulke: result[0].Ulke,
                        sehir: result[0].Sehir,
                        adres: result[0].Adres
                    };
                    res.status(200).send({ kisiselBilgiler, iletisimBilgileri });
                }
            });
            
        }
    });
});
app.post('/sifreYenile', (req, res) => {
    const { id, eskiSifre, yeniSifre } = req.body;
    console.log(id);
 
    const query = "SELECT * FROM hesap WHERE Kullanici_ID= ?";

    connection.query(query, [id], (err, result) => {

        if(err){
            console.error("Bilgilerin kontrolunde hata olustu. ", err);
            res.status(500).send({error: 'Bilgilerin kontrolunde hata olustu.'});
            return;
        }
        console.log(result);
        if(result.length > 0){
            const Kullanici_ID = result[0].Kullanici_ID;

            const Sifredegistirme = "UPDATE hesap SET Sifre = ? WHERE Kullanici_ID=?";

            connection.query(Sifredegistirme,[yeniSifre, Kullanici_ID], (err,result) => {
                if(err){
                    console.error("Login bilgisi guncellenirken hata olustu. ", err);
                    res.status(500).send({error: 'Login guncellenemedi.'});
                }
            });

            res.status(200).send({message: '1'});
        }else{
            res.status(200).send({message: '0'});
        }
        

    })


});
//Başvuru Durum Bilgisinin Alınması
app.post('/Basvurusorgulama', (req,res) => {
   
    
    const {id} = req.body;

    const query = "SELECT * FROM basvuru WHERE Kullanici_ID=?";

    connection.query(query, [id], (err, result) => {
        if(err){
            console.error("Bilgilerin kontrolunde hata olustu. ", err);
            res.status(500).send({error: 'Bilgilerin kontrolunde hata olustu.'});
            
            return;
        }
        if(result.length > 0){
            const Basvurudurumu = result[0].Basvuru_Durum;
            console.log(result);

            res.status(200).send({message:Basvurudurumu});
        }else{
            res.status(200).send({message: 'Başvurunuz Bulunmamaktadır'});
        }
        

    })



});

app.post('/signout', (req,res) => {

    const {id} = req.body;

    const query = "UPDATE hesap SET isLogin = 0 WHERE Kullanici_id=?";

    connection.query(query, [id], (err,result) => {
        if(err){
            console.error("isLogin guncellemesinde hata olustu. ", err);
            res.status(500).send({error: 'isLogin guncellemesinde hata olustu.'});
            return;
        }
        
        res.status(200).send({message: 'Kullanici cikisi guncellendi.'});
    });

});




const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server ${PORT} üzerinde dinleniyor.`);
});