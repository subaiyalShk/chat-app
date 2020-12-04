const onlineUsers= []

const addUser = ({id, name, room}) => {
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();
    
    const existingUser = onlineUsers.find((user)=>user.room === room && user.name == name)
    if(existingUser){
        return{error:'Username is taken'}
    }

    const user = {id, name, room}
    onlineUsers.push(user)

    return {user}
}
const removeUser = (id) => {
    const index = onlineUsers.findIndex((user)=>user.id==id);

    if(index !== -1){
        return onlineUsers.splice(index, 1)[0];
    }
}
const getUser = (id) => onlineUsers.find((user)=> user.id == id);
const getUsersInRoom = (room) => onlineUsers.filter((user)=>user.room ===room)

module.exports = {addUser, removeUser, getUser, getUsersInRoom}