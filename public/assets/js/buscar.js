const servicioss = document.querySelector('#tablamensajess');
firebase.auth().onAuthStateChanged(function(user) {
  if (user!= null) {
    user = firebase.auth().currentUser;
    var withcomas=[];
    db.collection('servicios').get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      var titulo = doc.data().titulo;
      var descripc = doc.data().descripcion;
      var espec = doc.data().especialidad;
      var ubi = doc.data().ubicacion;
      var publisheruid = doc.data().publisheruid;
      var newq ="<h4><a href='pedido.html?docid=".concat(doc.id,"'>",titulo,"</a></h4>Especialidad: ",espec,"<br>Ubicacion: ",ubi,"<br><hr>");
      servicioss.innerHTML =servicioss.innerHTML.concat(newq);

    });});

  };

  });


  var radios = document.forms["formlogin"].elements["demo-priority"];
  for(var i = 0, max = radios.length; i < max; i++) {
      radios[i].onclick = function() {
        var srx=[];
        var filt = servicioss.innerHTML;
        servicioss.innerHTML ="";
        while(filt!="")
        {

        var toshow=[];
        var x=filt.lastIndexOf("<h4>");
        var sr=filt.substr(x);
        srx.push(sr);
        filt = filt.replace(sr, "");
        console.log("check");
        console.log(srx);
        };
        if(this.value =="Mudanza")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Especialidad: Mudanza");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="Limpieza")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Especialidad: Limpieza");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="Vidrieria")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Especialidad: Vidrieria");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="Pintura")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Especialidad: Pintura");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="Cerrajeria")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Especialidad: Cerrajeria");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="Electricista")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Especialidad: Electricista");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };

        if(this.value =="Todos")
        {

        };
      }
  }

  var radios = document.forms["formlogin"].elements["demo-priority2"];
  for(var i = 0, max = radios.length; i < max; i++) {
      radios[i].onclick = function() {
        var srx=[];
        var filt = servicioss.innerHTML;
        servicioss.innerHTML ="";
        while(filt!="")
        {
          var toshow=[];
          var x=filt.lastIndexOf("<h4>");
          var sr=filt.substr(x);
          srx.push(sr);
          filt = filt.replace(sr, "");
          console.log("check");
          console.log(srx);
        };
        if(this.value =="Surco")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Surco");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="San Borja")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("San Borja");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="Miraflores")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Miraflores");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="Barranco")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Barranco");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="Magdalena")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("Magdalena");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };
        if(this.value =="La Molina")
        {
          for(let ax of srx){
            var q=ax.lastIndexOf("La Molina");
            if (q!=-1){
              servicioss.innerHTML =servicioss.innerHTML.concat(ax);
            }
          }
        };

        if(this.value =="Todos")
        {
        };
      }
  }
