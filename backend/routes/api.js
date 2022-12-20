const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api");


//Main Routes - simplified for now
router.get("/pictures", apiController.getAllPictures);
router.get("/boards", apiController.getAllDefaultBoards);
router.get("/allboards/:user", apiController.getAllBoards);
router.put("/boards/thumbnails/:id", apiController.editThumbnails);
router.put("/boards/:id", apiController.editBoard);
router.put("/art/:id", apiController.editArt);
router.delete("/boards/:id", apiController.deleteBoard);
router.delete("/art/:id", apiController.deleteArt);
router.delete("/pictures/:id", apiController.deletePicture);
router.get("/pictures/:id", apiController.getOneBoardPictures);
router.get("/art/:id", apiController.getOneBoardArt);
router.get("/boards/:id", apiController.getOneBoard);
router.post("/addPicture", apiController.postPicture);
router.post("/addArt", apiController.postArt);
router.post("/addBoard", apiController.postBoard);
module.exports = router;
