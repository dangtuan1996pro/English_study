Rails.application.routes.draw do
  resources :listening
  resources :writing
  resources :static_pages
  resources :reading
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
end
