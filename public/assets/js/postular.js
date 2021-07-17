const messageform = document.querySelector('#postular-form');
messageform.addEventListener('submit', (e) => {
  e.preventDefault();
  user = firebase.auth().currentUser;
  const sendinguid=user.uid;
  const titulo = messageform['postular-name'].value;
  var des = messageform['postular-cuerpo'].value;
  var e = document.getElementById("postular-category");
  var strUser = e.value;
  var ubi = [];
  if (document.getElementById("Surco").checked)
  {
    ubi.push("Surco");
  }
  if (document.getElementById("San Borja").checked)
  {
    ubi.push("San Borja");
  }
  if (document.getElementById("Miraflores").checked)
  {
    ubi.push("Miraflores");
  }
  if (document.getElementById("Barranco").checked)
  {
    ubi.push("Barranco");
  }
  if (document.getElementById("Magdalena").checked)
  {
    ubi.push("Magdalena");
  }
  if (document.getElementById("La Molina").checked)
  {
    ubi.push("La Molina");
  }
  db.collection("servicios").add({
    titulo: titulo,
    especialidad: strUser,
    ubicacion: ubi,
    descripcion: des,
    publisheruid: sendinguid
  })
  .then(() => {
    messageform.reset();
    window.location.reload();
    alert("Publicacion Creada");
  })

  });
