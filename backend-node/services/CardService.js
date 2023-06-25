const CardModel = require("../models/Card");
 
exports.getAllCards = async () => {
  return await CardModel.find();
};
 
exports.createCard = async (card) => {
  return await CardModel.create(card);
};
exports.getCardById = async (id) => {
  return await CardModel.findById(id);
};

exports.getCardByCardId = async(card_id) => {
  return await CardModel.findOne({card_id: card_id})
}
 
exports.updateCard = async (id, card) => {
  return await CardModel.findByIdAndUpdate(id, card);
};
 
exports.deleteCard = async (id) => {
  return await BlogModel.findByIdAndDelete(id);
};