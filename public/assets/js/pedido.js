var urlParams;
const responderLinks = document.querySelectorAll('.responderf');
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
    console.log(urlParams);
})();

function esconder()
{
  var responderLinkss = document.querySelectorAll('.responderf');
  responderLinkss.forEach(item => item.style.display = 'none');
  var verLinks = document.querySelectorAll('.verf');
  verLinks.forEach(item => item.style.display = 'none');
};

const responderEdit =document.querySelector('.mensajebutton');
responderEdit.addEventListener('click', (e) => {
  e.preventDefault();
  responderLinks.forEach(item => item.style.display = 'block');
  var withdospuntos = document.querySelector('#espeid2').innerHTML;
  var sendresponse = document.querySelector('#message-name');
  sendresponse.value= withdospuntos;
  var tituu = document.querySelector('#tituloid').innerHTML;
  var sendresponse2 = document.querySelector('#message-asunto');
  asuntpre="RE: ";
  asunt = asuntpre.concat(tituu);
  sendresponse2.value= asunt;

  });

  const messageform = document.querySelector('.contratarbutton');
  messageform.addEventListener('click', (e) => {
    e.preventDefault();
    user = firebase.auth().currentUser;
    const sendinguid=user.uid;
    var receivinguid = '';
    var params= urlParams["docid"];
    var html ="";
    db.collection('servicios').doc(params).get().then(doc =>{
      var html = `${doc.data().publisheruid}`;
      console.log(html);
      db.collection('notificaciones').add({
            usuario: sendinguid,
            publicacion: params,
            profesional: html
          })
          .then(() => {
            alert("Publicacion Contratada");
            window.location.reload();

          })
        });
    });



const tituloinfo = document.querySelector('#tituloid');
const espeinfo = document.querySelector('#espeid');
const ubiinfo = document.querySelector('#ubiid');
const descinfo = document.querySelector('#descid');
const nombreinfo = document.querySelector('#espeid2');
const espeinfo2 = document.querySelector('#ubiid2');
const descinfo2 = document.querySelector('#descid2');
const repinfo2 = document.querySelector('#repid2');
firebase.auth().onAuthStateChanged(function(user) {
  if (user!= null) {
    console.log("1");
    setupUI(user);
    db.collection('servicios').doc(urlParams["docid"]).get().then(doc =>{
      const espe = `${doc.data().especialidad}`;
      const des = `${doc.data().descripcion}`;
      const titu = `${doc.data().titulo}`;
      const publi = `${doc.data().publisheruid}`;
      const ubis = `${doc.data().ubicacion}`;
      tituloinfo.innerHTML = titu;
      espeinfo.innerHTML = espe;
      ubiinfo.innerHTML = ubis.toString();;
      descinfo.innerHTML = des;
      db.collection('users').doc(publi).get().then(doc =>{
        var names = `${doc.data().nombre}`;
        var espes = `${doc.data().especialidad}`;
        var bios = `${doc.data().bio}`;
        var reps = `${doc.data().reputacion}`;
        nombreinfo.innerHTML = names;
        espeinfo2.innerHTML = espes;
        descinfo2.innerHTML = bios;
        repinfo2.innerHTML = reps;
      });
    })}
   else {
    console.log("0");
    setupUI();
    editLinks.forEach(item => item.style.display = 'none');
  }
});
