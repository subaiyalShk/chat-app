const messageController = require("../controllers/Message.controller");
const {authenticate} = require('../config/jwt.config');


module.exports = function(app){
    app.get("/api/messages", authenticate, messageController.list);
    app.post("/api/message", messageController.create);
    app.get("/api/message/:id", messageController.detail);
    app.put("/api/message/:id", messageController.update);
    app.delete("/api/message/:id", messageController.delete);
}
