const mongoose = require('mongoose');

const ticketChatSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true }
});

module.exports = mongoose.model('TicketChat', ticketChatSchema);