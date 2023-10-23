# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  root 'api/v1/home#index'
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create, :update, :destroy]
      resources :posts, only: [:index, :show, :create, :update, :destroy]
      resources :comments, only: [:index, :show, :create, :update, :destroy]
      resources :replies, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
