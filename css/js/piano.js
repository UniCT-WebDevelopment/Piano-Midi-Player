// CLICK CONSECUTIVO 
function play(id){
    var audio= document.getElementById(id);
    audio.currentTime=0;
    audio.play();
}

function recording_start(){
    $('#spartito').empty();          
    reset_document();
    document.getElementById('start').classList.add('hide');
    document.getElementById('stop').classList.add('show');
}

function reset_document(){
    $('#nota').empty(); 
}

function recording_stop_failed(){
    document.getElementById('stop').classList.remove('show');
    document.getElementById('start').classList.remove('hide');
    
}

function recording_stop_success(){
    document.getElementById('stop').classList.remove('show');
    document.getElementById('start').classList.remove('hide');
    document.getElementById('download').classList.add('show');
    
}

var note = {
    65: ["c4","#do"],
    87: ["c3","#bdo"],
    69: ["d3","#bre"],
    83: ["d4","#re"],
    84: ["g3","#bmi"],
    68: ["e4","#mi"],
    70: ["g4","#fa"],
    71: ["a4","#sol"],
    89: ["a3","#bsol"],  
    72: ["b4","#la"],
    85: ["b3","#bla"],
    74: ["c4","#si"],
    75: ["c5","#do1"] 
};

//funzione che riprende i rispettivi valori
var note2= {
    65: ["c4","do"],
    87: ["d2","bdo"],
    69: ["d3","bre"],
    83: ["d4","re"],
    84: ["g3","bmi"],
    68: ["e4","mi"],
    70: ["g4","fa"],
    71: ["a4","sol"],
    89: ["a3","bsol"],
    72: ["b4","la"],
    85: ["b3","bla"],
    74: ["c4","si"],
    75: ["c5","do"] 
};
                
var socket ;
var connected =false;

socket = io.connect('');
socket.on('connect', function(){
    console.log('connected');
    connected=true;
})

$("#start").on("click",function(){
    var nome = $("#testo").val();
    if(!nome){
        alert("Devi inserire un nome!");
        recording_stop_failed();           //richiamo la funzione per evitare di cambiare il pulsante
    }
        
    socket.emit("startrec",nome );
    socket.on("success",function(data){
        console.log(data);
        });

})

$("#stop").on("click",function(){
    socket.emit("stoprec");
    socket.on("recsuccess",function(data){
        console.log(data);
    });
    recording_stop_success();
})

//=====================================================//

$("#do").on("click",function(){
    $("#nota").append("#do"+" ");
    socket.emit('addnote', "c4")
   
});
    
$("#re").on("click",function(){
    $("#nota").append("#re"+" ");
    socket.emit('addnote', "d4")    
})

$("#mi").on("click",function(){
    $("#nota").append("#mi"+" ");
    socket.emit('addnote', "e4")
})

$("#fa").on("click",function(){
    $("#nota").append("#fa"+" ");
    socket.emit('addnote', "g4")
})

$("#sol").on("click",function(){
    $("#nota").append("#sol"+" ");
    socket.emit('addnote', "a4")
})

$("#la").on("click",function(){
    $("#nota").append("#la"+" ");
    socket.emit('addnote', "b4")
})

$("#si").on("click",function(){
    $("#nota").append("#si"+" ");
    socket.emit('addnote', "c5")
})

$("#do1").on("click",function(){
    $("#nota").append("#do"+" ");
    socket.emit('addnote', "c4")
})


$("#bdo").on("click",function(){
    $("#nota").append("#bdo"+" ");
    socket.emit('addnote',"c3");
})
$("#bre").on("click",function(){
    $("#nota").append("#bre"+" ");
    socket.emit('addnote',"d3");
})
$("#bmi").on("click",function(){
    $("#nota").append("#bmi"+"");
    socket.emit('addnote',"g3");
})
/* Non esiste
$("#bfa").on("click",function(){
    $("#nota").append("#bfa"+"");
    socket.emit('addnote',"c4");
})
*/

$("#bsol").on("click",function(){
    $("#nota").append("#bsol"+" ");
    socket.emit('addnote',"a3");
})
$("#bla").on("click",function(){
    $("#nota").append("#bla"+" ");
    socket.emit('addnote',"b3");
})
/* non esiste si nella tastiera
$("#bsi").on("click",function(){
    $("#nota").append("#bsi"+" ");
    
    socket.emit('addnote',"");
})
*/



    
var shiftdown = false;

$(document).on("keydown",function(event){
    if(event.keyCode == 16){
        console.log("Down")
        shiftdown=true;           
    }
});

$(document).on("keyup",function(event){
    if(event.keyCode == 16){
        console.log("up")
        shiftdown=false;
    }
})


$(document).on("keypress",function(key){
    if(note[key.keyCode]!=undefined && event.keyCode != 16 && shiftdown){
        //perché non funziona sulle barre nere?? 
        $(note[key.keyCode][1]).css("background-color", "rgb(25, 16, 199)");
        const audio= document.querySelector('audio[data-keyboard="'+key.keyCode+'"]');
        document.getElementById(note2[key.keyCode][1]).click();        
        const keyobject = document.querySelector('.key[data-keyboard="${key.keyCode}"]');
        if (!audio) return;
        console.log(keyobject);
        audio.currentTime= 0;
        audio.play();
        keyobject.classList.add('playing');
        this.setTimeout(function(){
           keyobject.classList.remove('playing');
        },1);
            socket.emit('addnote',note[key.keyCode][0])
    }
});

$(window).on("keyup",function(key){
    if (note[key.keyCode]!= undefined){
        $(note[key.keyCode][1]).css("background-color", "  rgb(237, 237, 237)");                    
    }
});
