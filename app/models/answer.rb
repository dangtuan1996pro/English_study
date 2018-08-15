class Answer < ApplicationRecord
  belongs_to :question

  scope :true_answer,
    ->(question_id){where(question_id: question_id, truth: 1)}
  mount_uploader :picture, PictureUploader
end
