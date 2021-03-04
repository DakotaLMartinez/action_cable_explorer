import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const element = document.getElementById('room-id')
  if (!element){ return}
  const roomId = element.dataset.roomId
  consumer.subscriptions.create({channel: "RoomChannel", room_id: roomId}, {
    connected() {
      console.log('connected to room channel: ' + roomId)
      // Called when the subscription is ready for use on the server
    },

    appendMessage(data) {
      let message = this.createMessage(data)
      element.appendChild(message)
    },

    createMessage(data) {
      let div = document.createElement('div')
      div.classList = "float-left"
      div.innerHTML = `
        <div class="float-left">
          <div>${data.author}</div>
          <p class="rounded px-2 bg-gray-400 text-gray-800">
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
