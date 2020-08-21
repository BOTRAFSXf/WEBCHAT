var messages = document.getElementById('messages');
var sendButoon = document.getElementById('send-btn');

sendButoon.addEventListener('click', sendUserMessage);
getMessageFromServer();

async function getMessageFromServer() {
  var response = await  fetch('https://fchatiavi.herokuapp.com/get/arick/?offset=0&limit=1000000'); // збільшив ліміт повідомлень
  response = await response.json();
  var allMessageHTML ='';
  for (var i = 0; i < response.length; i++){
    var messageData =  response[i];
    var message = `
      <div class="massage">
        <div class="message-nickname"> ${messageData.Name} </div>
        <div class="message-text>"> ${messageData.Message}</div>
      </div>
      `;
      allMessageHTML = allMessageHTML + message;
  }

    messages.innerHTML = allMessageHTML;
  }
async function sendUserMessage(){
  var userNickname = document.getElementById('nickname-input').value;
  var userMessage = document.getElementById('message-input').value;
  if(userNickname.length === 0)  {
    alert("Ты должен ввести имя!");
    return;
  }
  if(userMessage.length === 0)  {
    alert("Ты должен ввести сообщение!")
    return;
  }
  await  fetch('https://fchatiavi.herokuapp.com/send/arick/' , {
    method: 'POST' ,
    body: JSON.stringify({
      Name: userNickname ,
      Message: userMessage
    })
  });

  getMessageFromServer()

}
