Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users do
      resources :likes, only: [:create]
      resources :views, only: [:create]
    end
    resources :likes, only: [:destroy, :index]
    resources :views, only: [:index]
    get 'matches', :to => 'users#matches'
  end
end
