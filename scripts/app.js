//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');

//add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
  .then(() => newChatForm.reset()) //clearing input field
  .catch(err => console.log(err));
});

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', 'shaun');


// get chats and render
chatroom.getChats((data) => {
  chatUI.render(data);
});