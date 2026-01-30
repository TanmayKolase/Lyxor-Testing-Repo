class Order < ApplicationRecord
  belongs_to :user
  has_many :order_items, dependent: :destroy
  
  # Missing model validations
  # No presence validations
  # No format validations
  # No numericality validations
  
  # Mass assignment vulnerability - no strong parameters protection in model
  # All attributes can be mass assigned
end

