var express = require("express");
var router = express.Router();

const ArtikelModel = require('../model/artikel')

router.post('/',   async(req, res) =>{
    const { author, title, body } = req.body

    const artikel = await ArtikelModel.create({
        author, title, body 
      });

    res.status(200).json({
        data: artikel,
        metadata: "berhasil di tambahkan"
      })

})


router.get('/', async(req, res) => {
    const { author } = req.body
   
    const authorFind = await ArtikelModel.findOne({where : { author :author}})


    res.status(200).json({
        authorFind
    })
})



module.exports = router;