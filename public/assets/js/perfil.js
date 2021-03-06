const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const editLinks = document.querySelectorAll('.editf');
const espelinks = document.querySelectorAll('.espef');

const setupUI=(user) => {
  editLinks.forEach(item => item.style.display = 'none');
  if(user){
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    espelinks.forEach(item => item.style.display = 'none');
  } else {
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }

};
const emailinfo = document.querySelector('#emailid');
const nombreinfo = document.querySelector('#nombreid');
const bioinfo = document.querySelector('#bioid');
const especialidadinfo = document.querySelector('#especialidadid');
firebase.auth().onAuthStateChanged(function(user) {
  if (user!= null) {
    console.log("1");
    setupUI(user);
    db.collection('users').doc(user.uid).get().then(doc =>{
      const html = `${user.email}`;
      const bio = `${doc.data().bio}`;
      const name = `${doc.data().nombre}`;
      var espe = "";
      if (doc.data().tipo == 'Profesional')
      {
        espelinks.forEach(item => item.style.display = 'block');
        espe = `${doc.data().especialidad}`;
      }
      emailinfo.innerHTML = html;
      nombreinfo.innerHTML = name;
      bioinfo.innerHTML = bio;
      especialidadinfo.innerHTML = espe;
    })}
   else {
    console.log("0");
    setupUI();
    editLinks.forEach(item => item.style.display = 'none');
  }
});



const setupEdit =document.querySelector('.editbutton');
setupEdit.addEventListener('click', (e) => {
  editLinks.forEach(item => item.style.display = 'block');
  });


const editform = document.querySelector('#edit-form');
editform.addEventListener('submit', (e) => {
  e.preventDefault();
  user = firebase.auth().currentUser;
  db.collection('users').doc(user.uid).update({
    nombre: editform['edit-nombre'].value,
    bio: editform['edit-bio'].value
  }).then(() =>{
    editform.reset();
    window.location.reload();
  });
  });


  const logout1 =document.querySelector('#logout11');
  logout1.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
      console.log("signed out");
      window.location.href = "index.html"
    });
  });
