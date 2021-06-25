const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const editLinks = document.querySelectorAll('.editf');
const espelinks = document.querySelectorAll('.espef');

const setupUI=(user) => {
  editLinks.forEach(item => item.style.display = 'none');
  if(user){
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }

};
const repuinfo = document.querySelector('#repuid');
firebase.auth().onAuthStateChanged(function(user) {
  if (user!= null) {
    console.log("1");
    setupUI(user);
    db.collection('users').doc(user.uid).get().then(doc =>{
      const bio = `${doc.data().reputacion}`;
      repuinfo.innerHTML = bio;
    })}
   else {
    console.log("0");
    setupUI();
    editLinks.forEach(item => item.style.display = 'none');
  }
});

const tabla = document.querySelector('#tablamensajes');


firebase.auth().onAuthStateChanged(function(user) {
  if (user!= null) {
    user = firebase.auth().currentUser;
    var withcomas=[];
    var ee = user.uid;
    var ee = ee.concat(",repu");
    db.collection(ee).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      var asun =doc.data().calificacion;
      var esta=doc.data().mensaje;
      var newq ="<tr><td>".concat(asun,"</td><td>",esta,"</td></tr>");
      tabla.innerHTML =tabla.innerHTML.concat(newq);
      
    });});};

  });

const setupEdit =document.querySelector('.editbutton');
setupEdit.addEventListener('click', (e) => {
  editLinks.forEach(item => item.style.display = 'block');
  });



  const logout1 =document.querySelector('#logout11');
  logout1.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("signed out");
      window.location.href = "index.html"
    });
  });
