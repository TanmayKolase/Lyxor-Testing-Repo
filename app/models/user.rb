class User < ApplicationRecord
  has_many :orders, dependent: :destroy
  
  # Missing model validations
  # No email format validation
  # No password validation
end

