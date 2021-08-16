//dom queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');

//add a new chat
newChatForm.addEventListener('submit', e => {
  e.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
  .then(() => newChatForm.reset()) //clearing input field
  .catch(err => console.log(err));
});

//update username
newNameForm.addEventListener('submit', e => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset update name form 
  newNameForm.reset();
  //show and hide an update message
  updateMssg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() => updateMssg.innerText = '', 3000);
});

// check local storage  for a name
const username = localStorage.username ? localStorage.username : 'unknownUser';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('gaming', username);


// get chats and render
chatroom.getChats((data) => {
  chatUI.render(data);
});