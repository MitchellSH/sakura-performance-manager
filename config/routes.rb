Rails.application.routes.draw do

  resources :comments
  scope '/api', defaults: {format: :json} do
    post 'user_token' => 'user_token#create'
    get 'users/:id/reviews' => 'users#reviews'
    get 'reviews/:id/comments' => 'reviews#comments'
    post 'user/new' => 'users#create'
    resources :users
    resources :reviews
    resources :comments
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
