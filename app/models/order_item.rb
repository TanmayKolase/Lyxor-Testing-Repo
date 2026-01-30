class OrderItem < ApplicationRecord
  belongs_to :order
  belongs_to :product
  
  # Missing model validations
  # No presence validations
  # No numericality validations for quantity and price
end

