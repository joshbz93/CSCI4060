
  /*  document.getElementById("next-btn").addEventListener('click', (event)=>{
          document.getElementById("form").classList.toggle("show");
    });*/
  window.onload = function(){
    var form;
    document.getElementById("submit-button").addEventListener("click", saveData);
     function saveData(event){
       event.preventDefault();
         form = document.getElementById("vform");
         let values = [];
         //console.log(form.elements[0].value, " ", form.elements[0].name);

         for (let i = 0; i < form.elements.length; i++){
             let e = form.elements[i];
             if (e.type == "radio"){
                 if (e.checked){
                     if (e.value == "other"){
                         values.push(form.elements[++i].value);
                     }
                     else{
                         values.push(e.value);
                     }
                 }
             } else {
                 if (e.name != "otherReason" && e.type != "submit"){
                     values.push(e.value);
                 }
             }
         }
         console.info(values);
         //alert(values);
         storeInDatabase(values);
     }

     function storeInDatabase(values){
        //alert("connecting to database");
         var conn = dbConnection();

         conn.connect((err)=>{
           if(err){
             //alert('Database connection error', err);
             //e.preventDefault();
           } else{
             //alert('Database connection successful');
           }
         });
        // alert("connected to database");
         //HomeCity, HomeState
        // Zipcode, DestCity, DestState, NumInParty, TravelingFor, HearAboutCVB, Hotel
        //[values[0], values[1], values[2], values[3],values[4],values[5],values[6],values[7],values[8],values[9],values[10],values[11]]
         conn.query(`INSERT INTO VISITOR(Fname, Lname, Email, HomeCity, HomeState,
           Zipcode,DestCity, DestState, NumInParty, TravelingFor, HearAboutCVB,
           Hotel) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, values, (error, results, fields) => {
           if (error) {
             //e.preventDefault();
             //alert(values);
             console.log("An error occurred with the query", error);
           }else {
             alert('Thank you for visiting Monroe West-Monroe Convention and Visitors Bureau');
             form.submit();
             conn.end((err)=> {
               if (!err) {
                   console.log("database closed");
               }
             });
           }
          // alert("connected to database");
         });
         //alert("connected to database");
     }
  }
