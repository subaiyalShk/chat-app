const { Message } = require('../models/Message.model')

module.exports.list = (request, response) => {
    Message.find({})
    // .sort({"dueDate": -1})
    // get list ordered ordered by due date 
    .then(messages => {
        response.json(messages);
    })
    .catch(err=>{
        response.status(400).json(err);
    })
}

module.exports.create = (request, response) =>{
    const {message} = request.body;
    Message.create({
        message
    })
        .then(message => {
            response.json(message)
        })
        .catch(err=>{
            response.status(400).json(err)
        })
}   

module.exports.detail = (request, response) => {
    const {id}= request.params;
    Message.findOne({_id:id})
    .then(message => {
        response.json(message)
    })
    .catch(err => {
        response.status(400).json(err)
    })
}

module.exports.update = (request, response) => {
    const { id } = request.params;
    const {message} = request.body;
    Message.findOneAndUpdate({_id: id},{
        message
    },
        {
            new:true,
            useFundAndModify: true
        })
        .then(message =>{
            response.json(message)
        })
        .catch(err => {
            response.status(400).json(err)
        })
}
module.exports.delete = (request, response) => {
    const {id} = request.params;
    Message.deleteOne({_id:id})
    .then(deleteConfirmation => {
        response.json(deleteConfirmation);
    })
    .catch(err=>{
        response.json(err)
    })
}