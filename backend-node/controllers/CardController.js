const cardService = require("../services/CardService");
 
exports.getAllCards = async (req, res) => {
  try {
    const cards = await cardService.getAllCards();
    res.json({ data: cards, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.createCard = async (req, res) => {
  try {
    const card = await cardService.createCard(req.body);
    res.json({ data: card, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.getCardById = async (req, res) => {
  try {
    const card = await cardService.getCardById(req.params.id);
    res.json({ data: card, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCardByCardId = async (req, res) => {
  try {
    const card = await cardService.getCardByCardId(req.params.card_id);
    res.json({ data: card, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.updateCard = async (req, res) => {
  try {
    const card = await cardService.updateCard(req.params.id, req.body);
    res.json({ data: card, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
 
exports.deleteCard = async (req, res) => {
  try {
    const card = await cardService.deleteCard(req.params.id);
    res.json({ data: card, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};