class AddPictureToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :picture, :string
  end
end
