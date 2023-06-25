const express = require("express");
const {
  getAllCards,
  createCard,
  getCardById,
  getCardByCardId,
  updateCard,
  deleteCard,
} = require("../controllers/CardController");
 
const router = express.Router();
 
router.route("/api/cards").get(getAllCards);
router.route("/api/cards/createcard/").post(createCard);
router.route("/api/cards/id/:id").get(getCardById)
router.route("/api/cards/:card_id").get(getCardByCardId);
router.route("/api/cards/updatecard/:id").post(updateCard);
//router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);
 
module.exports = router;