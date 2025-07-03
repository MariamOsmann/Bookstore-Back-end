const express = require("express");

const BooksPath = require("./routes/Books");
const AuthorPath =require("./routes/authors");
const mongoose =require("mongoose");

const app = express();

mongoose
.connect("mongodb://127.0.0.1:27017/BookStoreDB")
.then(()=>console.log("Connected to mongodb")) 
.catch((error)=>console.log(" Faild to Connect ! ",error))


//MiddelWares .. express doesnot understand json , it understands js
// so we use this to coonvert (لان ال post بيبعت اوبجيكت من ال json)
app.use(express.json());


app.use("/api/Books",BooksPath);
app.use("/api/authors",AuthorPath);

 
const PORT=5000;
app.listen(PORT,()=> console.log(`Server Listen on ${PORT}`));