Rails.application.routes.draw do
  namespace :admin do
    scope :question do
      namespace :listening, path: "/" do
        resources :listening_questions
        resources :conversation_questions
        resources :picture_questions
      end
      namespace :reading, path: "/" do
        resources :reading_questions
        resources :grammar_questions
        resources :sign_questions
        resources :paragraph_questions
        resources :filling_questions
      end
      namespace :writing, path: "/" do
        resources :writing_questions 
        resources :questions
      end
    end
    scope :exam do
      namespace :reading, path: "/" do
        resources :reading_exams
        resources :grammar_exams
      end
      namespace :listening, path: "/" do
        resources :listening_exams
      end
      namespace :writing, path: "/" do
        resources :writing_exams
      end
    end
  end
  root "static_pages#index"
  get "listening", to: "listening#index"
  get "writing", to: "writing#index"
  get "listening", to: "listening#index"
  get "static_pages", to: "static_pages#index"
  get "reading", to: "reading#index"
  post "reading/exams", to: "reading#exams_by_topic"
  get "reading/show/:id", to: "reading#show"
  get "/signup", to: "users#new"
  post "/signup", to: "users#create"
  get "sessions/new"
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  resources :users
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:new, :create, :edit, :update]
end
