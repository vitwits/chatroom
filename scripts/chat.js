//adding new chat document
//setting up a real-time listener to get new chats
//updateing the username
//updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub; //unsubscribe from room update when we change room
  }
  async addChat(message) {
    //adding new chatroom for a specific user
    const now = new Date();
    const chat = {
      message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    //save the chat document
    const response = await this.chats.add(chat);
    return response;
  }

  getChats(callback) {  //realtime listener for new chats
    this.unsub = this.chats  //this returns a function, so unsub becomes a function
      .where('room', '==', this.room) // listen to changes on particular room
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            //update UI
            callback(change.doc.data());
          }
        });
      });
  }
  // update username functionality
  updateName(username){
    this.username = username;
  }

  // update chatroom
  updateRoom(room){
    this.room = room;
    console.log(`current room is ${this.room}`);
    if(this.unsub) {
      this.unsub(); //unsubscribing from old room live changes
    }
  }
}
