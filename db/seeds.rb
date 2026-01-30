# Seed data for development

# Create users
user1 = User.create!(name: 'John Doe', email: 'john@example.com', password_digest: 'hashed_password_1', phone: '555-1234')
user2 = User.create!(name: 'Jane Smith', email: 'jane@example.com', password_digest: 'hashed_password_2', phone: '555-5678')

# Create products
product1 = Product.create!(name: 'Laptop', price: 999.99, description: 'High performance laptop')
product2 = Product.create!(name: 'Mouse', price: 29.99, description: 'Wireless mouse')
product3 = Product.create!(name: 'Keyboard', price: 79.99, description: 'Mechanical keyboard')

# Create orders
order1 = Order.create!(
  user: user1,
  total_amount: 1029.98,
  status: 'completed',
  payment_method: 'credit_card',
  credit_card_number: '4111111111111111',
  cvv: '123',
  billing_address: '123 Main St, City, State 12345',
  shipping_address: '123 Main St, City, State 12345',
  notes: 'Please deliver during business hours'
)

order2 = Order.create!(
  user: user2,
  total_amount: 79.99,
  status: 'pending',
  payment_method: 'paypal',
  credit_card_number: nil,
  cvv: nil,
  billing_address: '456 Oak Ave, City, State 67890',
  shipping_address: '456 Oak Ave, City, State 67890',
  notes: nil
)

# Create order items
OrderItem.create!(order: order1, product: product1, quantity: 1, price: 999.99)
OrderItem.create!(order: order1, product: product2, quantity: 1, price: 29.99)
OrderItem.create!(order: order2, product: product3, quantity: 1, price: 79.99)

