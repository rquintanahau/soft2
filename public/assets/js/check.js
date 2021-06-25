const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI=(user) => {
  const espeform = document.querySelectorAll('.espef');
  espeform.forEach(item => item.style.display = 'none');

  if(user){
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }

};

const logout1 =document.querySelector('#logout11');
logout1.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signed out");
    window.location.href = "index.html"
  });
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user!= null) {
    console.log("1");
    setupUI(user);


  } else {
    console.log("0");
    setupUI();
  }
});
