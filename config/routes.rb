Rails.application.routes.draw do
  get 'rooms/:room_id' => 'rooms#show'
end
