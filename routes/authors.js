const express = require("express");

const router = express.Router();

const Joi = require("joi");


const authors=[
    {
        id : 1,
        FirstName : "Willim",
        LastName : "Denn",
        nationality : "American",
        image : "default-image-png"

    },
    {
        id : 2,
        FirstName : "Diiang",
        LastName : "Juli",
        nationality : "Asian",
        image : "default-image-png"
    }
];

/**
 * @desc Get All Authors
 * @route /api/authors
 * @method Get
 * @access public
 */

router.get("/",(req,res)=>{
res.json(authors)
});


/**
 * @desc Get an Author By ID
 * @route /api/author/:id
 * @method Get
 * @access public
 */

router.get("/:id",(req,res)=>{
const author = authors.find(a => a.id === parseInt(req.params.id));
if(author){
res.status(200).json(author);
}
else
res.status(404).json({message : "author not found "})
});

/**
 * @desc Add New Author
 * @route /api/authors
 * @method POST
 * @access public
 */

router.post("/",(req,res)=>{
    const {error} = ValidateCreateAuthor(req.body);
    if(error){
    res.status(404).json({message : error.details[0].message})
    }

    const author ={
        id : authors.length+1,
        FirstName : req.body.FirstName,
        LastName : req.body.LastName,
        nationality : req.body.nationality,
        image : req.body.image
    }
    authors.push(author);
    res.status(201).json(author)
});

/**
 * @desc Update Author
 * @route /api/authors/:id
 * @method put
 * @access public
 */

router.put("/:id",(req,res)=>{

    const {error}= ValidateUpdateAuthor(req.body);

    if(error){
        res.status(400).json({message : error.details[0].message});
    }
    const author = authors.find(a => a.id === parseInt(req.params.id));
    if (author){
        res.status(200).json({message : "Author has been Updated "});
    }
    else{
    res.status(404).json({message: "The Author is not found"});
    }
});


// router.delete("/:id",(req,res)=>{
//     const author=authors.find(a=>a.id === parseInt(req.params.id));
//     if(author){
//     res.status(200).json({message :" Author has been deleted" });   
//     }
//     else
//     {
//         res.status(404).json({message: "The Author is not found"});
//     }
// })


router.delete("/:id",(req,res)=>{
    const index =authors.findIndex(a=>a.id === parseInt(req.params.id));
    if(index !== -1){
    authors.splice(index,1);    
    res.status(200).json({message :" Author has been deleted" });   
    }
    else
    {
        res.status(404).json({message: "The Author is not found"});
    }
})



// Validate Create Author Function
function ValidateCreateAuthor(object){
const schema = Joi.object({
    id : authors.length+1,
    FirstName : Joi.string().min(3).max(20).required(),
    LastName : Joi.string().min(3).max(20).required(),
    nationality :Joi.string().min(5).max(20).required(),
    image : Joi.string().min(5).max(100).required()
})
return schema.validate(object);
};

// Validate Update Author Function
function ValidateUpdateAuthor(object){
    const schema =Joi.object({
        FirstName : Joi.string().min(3).max(20),
        LastName : Joi.string().min(3).max(20),
        nationality :Joi.string().min(5).max(20),
        image : Joi.string().min(5).max(100)
    })
    return schema.validate(object);
    };
    

module.exports=router;