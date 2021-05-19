const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const editLinks = document.querySelectorAll('.editf');

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
const emailinfo = document.querySelector('#emailid');
const nombreinfo = document.querySelector('#nombreid');
const bioinfo = document.querySelector('#bioid');

firebase.auth().onAuthStateChanged(function(user) {
  if (user!= null) {
    console.log("1");
    setupUI(user);
    db.collection('users').doc(user.uid).get().then(doc =>{
      const html = `${user.email}`;
      const bio = `${doc.data().bio}`;
      const name = `${doc.data().nombre}`;
      emailinfo.innerHTML = html;
      nombreinfo.innerHTML = name;
      bioinfo.innerHTML = bio;
    })
  } else {
    userinfo.innerHTML = '';
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
