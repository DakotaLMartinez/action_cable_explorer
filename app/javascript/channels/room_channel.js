import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const element = document.getElementById('room-id')
  if (!element) { return }
const chatName = element.dataset.chatName
  const roomId = element.dataset.roomId
  let oldHeight;
  let oldScrollTop;
  consumer.subscriptions.create({channel: "RoomChannel", room_id: roomId}, {
    connected() {
      console.log('connected to room channel: ' + roomId)
      // Called when the subscription is ready for use on the server
    },

    appendMessage(data) {
      let message = this.createMessage(data);
      element.appendChild(message);
      let newMessageHeight = element.scrollHeight - oldHeight;
      element.scrollTop = oldScrollTop + newMessageHeight;
    },

    createMessage(data) {
      oldHeight = element.scrollHeight;
      oldScrollTop = element.scrollTop;
      let position = data.author === chatName ? "float-right" : "float-left"
      let colors = data.author === chatName ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-800"
      let div = document.createElement('div')
      div.classList = "clearfix my-2"
      div.innerHTML = `
        <div class="${position}">
          <div>${data.author}</div>
          <p class="rounded px-2 ${colors}">
            ${data.content}
          </p>
        </div>
      `
      return div
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log(data)
      this.appendMessage(data)
    }
  });
})
