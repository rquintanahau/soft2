const responderLinks = document.querySelectorAll('.responderf');

const responderEdit =document.querySelector('.responderbutton');
responderEdit.addEventListener('click', (e) => {
  e.preventDefault();
  responderLinks.forEach(item => item.style.display = 'block');
  var withdospuntos = document.querySelector('#asuntoynombre').innerHTML;
  var withoutdospuntos = withdospuntos.slice(withdospuntos.indexOf(':')+2);
  var sendresponse = document.querySelector('#message-name');
  sendresponse.value= withoutdospuntos;
  var asunt = withdospuntos.slice(0,withdospuntos.indexOf('-')-1);
  var sendresponse2 = document.querySelector('#message-asunto');
  asuntpre="RE: ";
  asunt = asuntpre.concat(asunt);
  sendresponse2.value= asunt;

  });

const enviar =document.querySelector('.enviarbutton');
enviar.addEventListener('click', (e) => {
  e.preventDefault();
  responderLinks.forEach(item => item.style.display = 'block');
});

function esconder()
{
  var responderLinkss = document.querySelectorAll('.responderf');
  responderLinkss.forEach(item => item.style.display = 'none');
  var verLinks = document.querySelectorAll('.verf');
  verLinks.forEach(item => item.style.display = 'none');
};

const messageform = document.querySelector('#message-form');
messageform.addEventListener('submit', (e) => {
  e.preventDefault();
  user = firebase.auth().currentUser;
  const sendinguid=user.uid;
  const asunto = messageform['message-asunto'].value;
  const cuerpo = messageform['message-cuerpo'].value;
  const namee = messageform['message-name'].value;
  var receivinguid = '';
  db.collection('users').get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
    if(namee==doc.data().nombre)
    {
      receivinguid=doc.id;
    };

  });}).then(() => {
    const doco = sendinguid.concat(',',asunto);
    db.collection(receivinguid).doc(doco).set({
      asunto: asunto,
      cuerpo: cuerpo,
      estado: "No Leido"
    })
    .then(() => {
      messageform.reset();
      window.location.reload();
      alert("Mensaje Enviado");
    })
  });
  });


const tabla = document.querySelector('#tablamensajes');


firebase.auth().onAuthStateChanged(function(user) {
  if (user!= null) {
    user = firebase.auth().currentUser;
    var withcomas=[];
    db.collection(user.uid).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      var withcoma = doc.id;
      withcomas.push(withcoma);
      var withoutcoma = withcoma.slice(0,withcoma.indexOf(","));
      console.log(withoutcoma);
      var names='';
      var asun =doc.data().asunto;
      var esta=doc.data().estado;
      db.collection('users').doc(withoutcoma).get().then(doc =>{
        var names = `${doc.data().nombre}`;
        var newq ="<tr><td>".concat(names,"</td><td>",asun,"</td><td>",esta,"</td></tr>");
        tabla.innerHTML =tabla.innerHTML.concat(newq);
        addRowHandlers(withcomas);
      });
    });});};

  });

function addRowHandlers(withcomas) {
  var table = document.getElementById("tablaid");
  var rows = table.getElementsByTagName("tr");
  for (i = 0; i < rows.length; i++) {
    var currentRow = table.rows[i];
    var currentuid= withcomas[i-1];
    var createClickHandler = function(row,uid) {
      return function() {
        var verLinks = document.querySelectorAll('.verf');
        verLinks.forEach(item => item.style.display = 'block');
        var enviador = row.getElementsByTagName("td")[0].innerHTML;
        var asas =row.getElementsByTagName("td")[1].innerHTML;
        var full= asas.concat(" - enviado por: ",enviador);
        const fill1 = document.querySelector('#asuntoynombre');
        const fill2 = document.querySelector('#contenido');
        fill1.innerHTML=full;
        user = firebase.auth().currentUser;
        db.collection(user.uid).doc(uid).get().then(doc =>{
          var full2 = `${doc.data().cuerpo}`;
          fill2.innerHTML=full2;
        });
        if (row.getElementsByTagName("td")[2].innerHTML!="Leido")
        {
          row.getElementsByTagName("td")[2].innerHTML="Leido";
          db.collection(user.uid).doc(uid).update({
            estado: 'Leido'
          });
        };
      };
    };
    currentRow.onclick = createClickHandler(currentRow,currentuid);
  }
}
