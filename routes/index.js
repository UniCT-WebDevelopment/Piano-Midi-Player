const dbConnection =require ('../config/dbConnection');
var express = require('express');
var router = express.Router();
var fs = require('fs');
var Midi = require('jsmidgen');

var flash = require('connect-flash');
var nomeFile = "";
var _path = __dirname+ '/../file_midi/';
/*
var ws = require('../bin/www')

ws.on('connection', function(socket){
  socket.on('key_pressed', function(key){
    console.log(key)
  })
})
*/

var path = require('path')
  router.get('/download', (req,res,next)=>{
    res.download(path.join(__dirname,'../file_midi',nomeFile))
  });


  router.get('/', function(req, res, next){
  
    dbConnection.query('SELECT nome,nickname FROM canzoni,utenti where canzoni.ID_PROP=utenti.id',(err,result)=>{
      res.render('home',{
        home:result,
        message:req.flash('success')
        });
      console.log(result);
    })
    
    
  });


/*router.get('/registrazione', function(req, res, next){
  connection.query('SELECT * FROM utenti',(err,result)=>{
    console.log(result);
    res.render('registrazione',{
      utenti:result

    });
  });

});

MIDI PLAYER JS
*/


router.get('/registrazione', function(req, res, next){
 
  res.render('registrazione')
})

router.post('/registrazione',(req,res,next) =>{
  dbConnection.query('INSERT INTO utenti SET ?', req.body, (err,result)=>{
    console.log(result)
    console.log("utente registrato");
   
    

  })
  dbConnection.query('SELECT * FROM  utenti',(err,result)=>{
    console.log(result);
    req.flash('success', 'Registrazione effettuata,Esegui il login!');
    res.redirect('/');
    })  
});


router.post('/login',(req,res,next)=>{
  console.log("dati ricevuti:",req.body)
  dbConnection.query('SELECT id,email,password, nickname FROM utenti WHERE email="'+req.body.email+'" and password="'+req.body.password+'"',(error,data)=>{
    console.log("Errore",error)
    if(error)
      res.status(500).end()
    else {
      if(data.length>0){
        console.log(data);
        req.session.user=data[0];
        req.session.email=req.body.email;
        req.session.save()
        req.flash('login','Benvenuto \n\n'+req.session.user.nickname);
        res.redirect('/piano');
    }
      else {
        res.status(401).redirect('/');
      }
    } 
  });
});

router.get('/piano',(req,res,next)=>{
  
  if(req.session.email) {
    dbConnection.query('SELECT nome,nickname FROM canzoni,utenti where canzoni.ID_PROP=utenti.id ORDER BY canzoni.id',(err,result)=>{
      res.render('piano',{
        piano:result,
        messages:req.flash('login')});
      console.log(result);
    })
    
    //res.render('piano',{});
    ws.on('connection', function(socket){
      console.log('user connected');
      socket.recstatus = false;
      socket.handshake.session
    
      socket.on("test",function(data){
        console.log("test",data)
      })

      socket.on("startrec", function(data){
        socket.recstatus = true;
        socket.saved = false;
        if(socket.recstatus){
          socket.namefile =  data; //
          socket.track = new Midi.File();//
          socket.tracknotes = new Midi.Track();//
          socket.track.addTrack(socket.tracknotes);
          socket.emit("success", "Registrazione iniziata");
        }
      })
      socket.on("stoprec", function(){
        socket.recstatus = false;
        if(!socket.saved){
          socket.saved = true;
          console.log(req.session.user);
   
          nomeFile = socket.namefile +"_"+ req.session.user.id+"_"+Date.now()+'.mid';
          fs.writeFile( _path + nomeFile , socket.track.toBytes(), 'binary',function(){
            console.log("Midi salvato")
            dbConnection.query('INSERT INTO canzoni (ID_PROP,nome,path) values ("'+req.session.user.id+'","'+socket.namefile+'","'+socket.namefile +"_"+ req.session.user.id+'.mid'+'") ',)    
            //Cerco di resettare
            socket.namefile = undefined;
            socket.track = undefined;
            socket.tracknotes = undefined;    
          
          
          });    
          socket.emit("recsuccess", "Registrazione effettuata");
          
        }    
      })
    
      socket.on('addnote', function(key){
        if(socket.recstatus)
          socket.tracknotes.addNote(0, key, 30);
      });
    })
  }
  else {
		res.redirect("/");
	}
});

module.exports = router;