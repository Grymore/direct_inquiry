var express = require("express");
var router = express.Router();

var cacheService = require("express-api-cache");
var cache = cacheService.cache;

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


router.get('/', cache("10 minutes"), async(req, res) => {
    const { author } = req.body
   
    const authorFind = await ArtikelModel.findOne({where : { author :author}})


    res.status(200).json({
        res : authorFind.author,
        req : authorFind.title
    })
})



module.exports = router;