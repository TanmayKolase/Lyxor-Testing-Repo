class Product < ApplicationRecord
  has_many :order_items
  
  # Missing model validations
  # No presence validations
  # No price validations
end

