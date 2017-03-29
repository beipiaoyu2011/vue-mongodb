const express = require('express');
const router = express.Router();
const Movie = require('../models/movie');
//查询所有电影
router.get('/movie', (req, res) => {
  Movie.find({})
  .sort({ update_at: -1 })
  .then(movies => {
    res.json(movies);
  }).catch(err => {
    res.json(err);
  });
});
//添加
router.post('/movie', (req, res)=>{
    Movie.create(req.body, (err, movie)=>{
        if(err){
            res.json(err);
        }else {
            res.json(movie);
        }
    })
});
//获取详情
// router.get('/movie/:id', (req, res)=>{
//     // console.log(req.params);
//     Movie.find({"_id": ObjectId(req.params.id)}).then(movie =>{
//         // console.log(movie);
//     });
// });
//修改
router.put('/movie/:id', (req, res)=>{
    Movie.findOneAndUpdate({_id: req.params.id},
        {$set: {
            title: req.body.title,
            image: req.body.image,
            introduction: req.body.introduction,
            rating: req.body.rating
        }
    },{
        new: true
    }).then(movie => res.json(movie))
    .catch(err => res.json(err))
});
//删除
router.delete('/movie/:id', (req, res)=>{
    Movie.findOneAndRemove({_id: req.params.id})
    .then(movie => {
        res.send(`${movie.title}删除成功`)
    }).catch(err=>{
        res.json(err);
    })
});
module.exports = router;
