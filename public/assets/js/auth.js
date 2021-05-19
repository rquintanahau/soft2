const signupform = document.querySelector('#signup-form');
signupform.addEventListener('submit', (e) => {
  e.preventDefault();

  //conseguir info
  const email = signupform['signup-email'].value;
  const pass = signupform['signup-pass'].value;
  const nombre = signupform['signup-nombre'].value;
  const tipo = "";
  if(signupform['tipo-cliente'].checked){
    const tipo = "Cliente";
  }
  if(signupform['tipo-profesional'].checked){
    const tipo = "Profesional";
  }
  console.log(tipo);
  //crear usuario
  auth.createUserWithEmailAndPassword(email, pass).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      nombre: nombre,
      bio: signupform['signup-bio'].value,
      tipo: tipo
    });
  }).then(() => {
    signupform.reset();
  });
});

const logout =document.querySelector('#logout11');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signed out");
  });
});




const loginform = document.querySelector('#login-form');
loginform.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginform['login-email'].value;
  const pass = loginform['login-pass'].value;

  auth.signInWithEmailAndPassword(email,pass).then(cred =>{
    loginform.reset();
  })
})
