const express = require("express");

const BooksPath = require("./routes/Books");

const app = express();



//MiddelWares .. express doesnot understand json , it understands js
// so we use this to coonvert (لان ال post بيبعت اوبجيكت من ال json)
app.use(express.json());


app.use("/api/Books",BooksPath);


 
const PORT=5000;
app.listen(PORT,()=> console.log(`Server Listen on ${PORT}`));