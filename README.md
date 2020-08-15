# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

### Dependencies (Gems/packages)
gem 'redis'
### Configuration (environment variables/other stuff in config folder)
```yml
# config/cable.yml
development:
  adapter: redis
  url: <%= ENV.fetch("REDIS_URL") { "redis://localhost:6379/1" } %>

test:
  adapter: test

production:
  adapter: redis
  url: <%= ENV.fetch("REDIS_URL") { "redis://localhost:6379/1" } %>
  channel_prefix: ac_explorer_production
```
Database

Models 

### Channels
```ruby
class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel_#{params[:room_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end

```

### Javascript
```js
import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const element = document.getElementById('room-id')
  const roomId = element.dataset.roomId
  consumer.subscriptions.create({channel: "RoomChannel", room_id: roomId}, {
    connected() {
      console.log('connected to room channel: ' + roomId)
      // Called when the subscription is ready for use on the server
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      // Called when there's incoming data on the websocket for this channel
      console.log(data)
    }
  });
})

```
### Views
```html
<!-- app/views/rooms/show.html.erb -->
<div class="px-16 py-8">
  <h2 class="text-xl semibold">Room #<%= @room_id %></h2>
  <div id="room-id" data-room-id="<%= @room_id %>">
  </div>
</div>
```
### Controllers
```ruby
# app/controllers/rooms_controller.rb
class RoomsController < ApplicationController
  def show
    @room_id = params[:room_id]
  end
end

```
### Routes
```ruby
Rails.application.routes.draw do
  get 'rooms/:room_id' => 'rooms#show'
end
```
