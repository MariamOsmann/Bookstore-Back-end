const express = require("express");

const router = express.Router();

const Joi = require("joi");


const books=[{
    id:1,
    Title : "javaScript" ,
    description : "Learn js",
    author : "Willim" ,
    price :30
},

{
    id:2,
    Title : "Python" ,
    description : "Learn python",
    author : "Diiang" ,
    price :20
}
]

/**
 * @desc Get All Books
 * @route /api/Books
 * @method Get
 * @access public
 */


router.get("/",(req,res)=>{
    res.json(books)
})

/**
 * @desc Get a book by ID
 * @route /api/Books/:id
 * @method Get
 * @access public
 */


router.get("/:id",(req,res)=>{

  const book =  books.find(b => b.id === parseInt(req.params.id));
  if(book){
    res.status(200).json(book)
  }
  else
  {
    res.status(404).json({message : " Not found "});
}
});


/**
 * @desc Add new Book
 * @route /api/Books
 * @method POST
 * @access public
 */

router.post("/",(req,res)=>{

const {error} = ValidateCreateBook(req.body);

if(error){
  return res.status(400).json({ message : error.details[0].message})
}
  
const book={
  id : books.length+1 ,
  Title : req.body.Title ,
  description :req.body.description,
  author : req.body.author ,
  price :req.body.price
}
books.push(book);
res.status(201).json(book);
});


/**
 * @desc Update a Book
 * @route /api/Books/:id
 * @method Update
 * @access public
 */

router.put("/:id",(req,res)=>{

  const {error} = ValidateUpdateBook(req.body);
  
  if(error){
    return res.status(400).json({ message : error.details[0].message})
  }

  const book =  books.find(b => b.id === parseInt(req.params.id));

  if(book){
    res.status(200).json({message : " The Book has been Updated"})  
  }
  else
  {
    res.status(404).json({message : " The Book is not found "});
}
  
  });
  
/**
 * @desc Delete a Book
 * @route /api/Books/:id
 * @method Delete
 * @access public
 */
router.delete("/:id",(req,res)=>{

  const book = books.find(b=>b.id === parseInt(req.params.id));
  if(book){
    res.status(200).json({message : "The Book is deleted"});
  }
  else{

    res.status(404).json({ message : " This id is not found !"});
  }


})


//Validate Create Book Function 
function ValidateCreateBook(object){
const schema = Joi.object({
  Title : Joi.string().min(3).max(100).required() ,
  description : Joi.string().min(3).max(100).required() ,
  author: Joi.string().min(3).max(50).required() ,
  price : Joi.number().min(0).required()
 });
 return schema.validate(object);
}

//Validate Update Book Function 
function ValidateUpdateBook(object){
  const schema = Joi.object({
    Title : Joi.string().min(3).max(100),
    description : Joi.string().min(3).max(100),
    author: Joi.string().min(3).max(50),
    price : Joi.number().min(0)
   });
   return schema.validate(object);
  }
  
module.exports=router;