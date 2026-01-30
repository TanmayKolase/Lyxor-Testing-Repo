class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :total_amount, precision: 10, scale: 2
      t.string :status
      t.string :payment_method
      t.string :credit_card_number
      t.string :cvv
      t.text :billing_address
      t.text :shipping_address
      t.text :notes
      t.timestamps
    end
  end
end

