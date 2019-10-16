class CreateReviews < ActiveRecord::Migration[6.0]
  def change
    create_table :reviews do |t|
      t.string :title
      t.text :description
      t.string :performance
      t.text :comment

      t.timestamps
    end
  end
end
