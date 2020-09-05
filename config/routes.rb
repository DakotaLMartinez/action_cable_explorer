Rails.application.routes.draw do
  get 'rooms' => 'rooms#index'
  get 'rooms/:room_id' => 'rooms#show', as: 'room'
  post '/chat_names' => 'rooms#save_name', as: 'chat_names'
end
