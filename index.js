const express = require("express");
const app = express();
const path = require('path');


const PORT = 3000;
app.get("/", function (req, res) {
    res.send("<h1>Hello Express</h1>");
});
app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname, 'public/about.html'));
});
app.get('/users', function (req, res) {
    res.json({ 
   "employees":[
  {id: "1", ime:"Mario", prezime :"Manic"},
  {id: "2", ime:"Mladen", prezime :"Bakic"},
  {id: "3", ime:"Alen", prezime :"Pakic"},
  
]
    });
 
});

app.listen(PORT, (error) => {
    if (error) {
        console.error("Greška prilikom pokretanja poslužitelja: ${error.message}");
    } else{
        console.log("Server je pokrenut na http://localhost:${PORT}");
    }
});

