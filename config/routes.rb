Rails.application.routes.draw do
  get 'rooms' => 'rooms#index'
  get 'rooms/:room_id' => 'rooms#show', as: 'room'
end
