//adding new chat document
//setting up a real-time listener to get new chats
//updateing the username
//updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
  }
  async addChat(message){
    //chat object
    const now = new Date();
    const chat = {
      message, 
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    //save the chat document
    const response = await this.chats.addChat(chat);
    return response;
  }
}

const chatroom = new Chatroom('gaming', 'shaun');
console.log(chatroom);