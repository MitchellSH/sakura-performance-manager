class AddSubmittedByToReviews < ActiveRecord::Migration[6.0]
  def change
    add_column :reviews, :submitted_by, :string
  end
end
