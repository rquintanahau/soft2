const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI=(user) => {
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
  }
});
