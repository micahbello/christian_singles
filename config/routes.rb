Rails.application.routes.draw do

  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :destroy]
    resources :users do
      resources :likes, only: [:create]
    end
    resources :likes, only: [:destroy, :index]
    get 'matches', :to => 'users#matches'
  end
end
