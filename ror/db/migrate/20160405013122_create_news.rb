class CreateNews < ActiveRecord::Migration
  def change
    create_table :news do |t|
      t.datetime :date
      t.string :source
      t.string :image
      t.string :title

      t.timestamps null: false
    end
  end
end
