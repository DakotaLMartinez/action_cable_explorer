Rails.application.routes.draw do
  resources :rooms, only: [:index, :show] do 
    resources :messages
  end
  post '/chat_names' => 'rooms#save_name', as: 'chat_names'
end
