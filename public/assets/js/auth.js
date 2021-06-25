const signupform = document.querySelector('#signup-form');
const espeform = document.querySelectorAll('.espef');

signupform.addEventListener('submit', (e) => {
  e.preventDefault();

  //conseguir info
  const email = signupform['signup-email'].value;
  const pass = signupform['signup-pass'].value;
  const nombre = signupform['signup-nombre'].value;
  var e = document.getElementById("demo-category");
  var strUser = e.value;
  if(document.getElementById('cliente').checked) {
    var especial = "cliente";
  }else if(document.getElementById('profe').checked) {
    var especial = "Profesional";
  };
  if (especial=="Profesional")
  {
  //crear usuario
  auth.createUserWithEmailAndPassword(email, pass).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      nombre: nombre,
      bio: signupform['signup-bio'].value,
      tipo: "Profesional",
      especialidad: strUser
    });
  }).then(() => {
    signupform.reset();
    window.location.href = "index.html"
    console.log(tipo);
  });
  }
  else
  {
    auth.createUserWithEmailAndPassword(email, pass).then(cred => {
      return db.collection('users').doc(cred.user.uid).set({
        nombre: nombre,
        bio: signupform['signup-bio'].value,
        tipo: "Cliente"
      });
    }).then(() => {
      signupform.reset();
      window.location.href = "index.html"
      console.log(tipo);
    });
  };
});

const logout =document.querySelector('#logout11');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signed out");
    window.location.href = "index.html"
  });
});



var radios = document.forms["formlogin"].elements["demo-priority"];
for(var i = 0, max = radios.length; i < max; i++) {
    radios[i].onclick = function() {
        if(this.value =="Profesional")
        {espeform.forEach(item => item.style.display = 'block');}
        else{
          espeform.forEach(item => item.style.display = 'none');
        }
        var tipotipo= this.value;

    }
}


const loginform = document.querySelector('#login-form');
loginform.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginform['login-email'].value;
  const pass = loginform['login-pass'].value;

  auth.signInWithEmailAndPassword(email,pass).then(cred =>{
    loginform.reset();
    window.location.href = "index.html"
  })
})
