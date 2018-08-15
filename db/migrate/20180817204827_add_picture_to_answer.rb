class AddPictureToAnswer < ActiveRecord::Migration[5.2]
  def change
    add_column :answers, :picture, :string
  end
end
