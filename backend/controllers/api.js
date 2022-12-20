const Gallery = require("../models/Gallery");
const Board = require("../models/Board");
const Art = require("../models/Art");
module.exports = {
  getAllPictures: async (req, res) => {
    try {
      const pictures = await Gallery.find()
      res.json(pictures)
    } catch (err) {
      console.log(err);
    }

  },
  getAllBoards: async (req, res) => {
    let user = req.params.user
    try {
      const boards = await Board.find({user:user})
      res.json(boards)
    } catch (err) {
      console.log(err);
    }

  },
  getAllDefaultBoards: async (req, res) => {
    let user = req.params.user
    try {
      const boards = await Board.find({user:'6399d3c069d7646c73e3159c'})
      res.json(boards)
    } catch (err) {
      console.log(err);
    }

  },
  getOneBoard: async (req, res) => {
    let id = req.params.id
    try {
      const board = await Board.find({_id:id})
      res.json(board)
    } catch (err) {
      console.log(err);
    }

  },
  editThumbnails: async (req, res) => {
    
    if(!req.body){
      return res
      .status(400)
      .send({message: 'nothing to update'})
    }
      let id = req.params.id

      let thumbnails = req.body.thumbnails

    let unique = [...new Set(thumbnails)]
    
       Board.findOneAndUpdate({ "_id" : id }, { "thumbnails": thumbnails})
         .then(data =>{
          if(!data){
            res.status(404).send({message: 'cannot update'})
          } else{
            res.send(res.data)
          }
         })
         .catch(err =>{
          res.status(500).send({message:'error update board'})
         })
    
  },
  editBoard: async (req, res) => {
    if(!req.body){
      return res
      .status(400)
      .send({message: 'nothing to update'})
    }
  
    let id = req.params.id
    let updatedBoard = req.body
  
    try {
      let data = await Board.findByIdAndUpdate(id, { $set: { name: updatedBoard.name} }, {new: true})
      if(!data){
        res.status(404).send({message: 'cannot update'})
      } else {
        res.send(data)
     
      }
    } catch(err) {
      res.status(500).send({message: 'error updating board'})
    }
  },
  editArt: async (req, res) => {
    if(!req.body){
      return res
      .status(400)
      .send({message: 'nothing to update'})
    }
  
    let id = req.params.id
    let updatedArt = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        image:req.body.image,
        'artist.name': req.body.artist.name,
        'artist.image': req.body.artist.image,
        year: req.body.year,
        source: req.body.source
      }
    };
   
    try {
      let data = await Art.findByIdAndUpdate(id, updatedArt, {new: true})
      if(!data){
        res.status(404).send({message: 'art piece not found'})
      } else {
        res.send(data)
      }
    } catch(err) {
      res.status(500).send({message: 'error updating art piece: ' + err})
    }
  
  },
  getOneBoardPictures: async (req, res) => {
        let id = req.params.id
      
        try {
          const board = await Gallery.find({board:id})
          if(board.length == 0) res.json([])
          else res.json(board)
         
        } catch (err) {
          console.log(err);
        }
      },
      getOneBoardArt: async (req, res) => {
        let id = req.params.id
      
        try {
          const board = await Art.find({board:id})
          if(board.length == 0) res.status(404).send({message:'no art found'})
          else res.json(board)
         
        } catch (err) {
          console.log(err);
        }
      },
    deleteBoard: async (req, res) => {

      const id = req.params.id

      try {
        Board.findByIdAndDelete(id, err =>{
          if(err) return console.log(err)
         })
         Gallery.findOneAndDelete({board:id}, err =>{
          if(err) return console.log(err)
         })
         Art.findOneAndDelete({board:id}, err =>{
          if(err) return console.log(err)
         })
         res.send('board deleted')
      }
      catch (err) {
        console.log(err);
      }
     
  
  },
  deletePicture: async (req, res) => {

    const id = req.params.id
   
     try {
      Gallery.findByIdAndDelete(id, err =>{
        if(err) return console.log(err)
        res.send('art deleted')
       
       })
    }
    catch (err) {
      console.log(err);
    }
   


},
deleteArt: async (req, res) => {

  const id = req.params.id
  try {
    Art.findByIdAndDelete(id, err =>{
      if(err) return console.log(err)
      res.send('art deleted')
     
     })
  }
  catch (err) {
    console.log(err);
  }
  
 


},
  postPicture: async (req, res) => {
    
    try {
      let user = req.body.user
      let board = req.body.board
      let links = req.body.links

       links.map(link => {
         Gallery.create({
          board:board,
          image:link.link
        
        });
      })
              
              res.send(true)
            } catch (err) {
              console.log(err);
            }
  },
  postArt: async (req, res) => {
    try {
      let user = req.body.user
      let board = req.body.board
      let links = req.body.links

      links.map(link => {
        Art.create({
         board:board,
         image:link.link,
         title:link.title,
         year:link.year,
         description:link.description || "",
         source:link.wiki || "",
         artist:{name:link.artist || "", image:link.artistlink || ""}
       });
     })
        
              res.send('art added')
            } catch (err) {
              console.log(err);
            }
  },
  postBoard: async (req, res) => {
    try {
      let user = req.body.user
      let name = req.body.name
      let art = req.body.art
      const board = await Board.create({
                user:user,
                name:name,
                art:art
              
              });
              res.send(board._id)
            } catch (err) {
              console.log(err);
            }
  }}
