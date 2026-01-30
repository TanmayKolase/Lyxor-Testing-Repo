class OrderService
  # SQL injection via raw SQL
  # N+1 query performance issues
  
  def self.find_orders_by_status(status)
    # SQL injection - status directly in query
    # No parameterized queries
    Order.find_by_sql("SELECT * FROM orders WHERE status = '#{status}'")
  end

  def self.find_orders_by_date_range(start_date, end_date)
    # SQL injection - dates directly in query
    query = "SELECT * FROM orders WHERE created_at >= '#{start_date}' AND created_at <= '#{end_date}'"
    Order.find_by_sql(query)
  end

  def self.find_orders_by_user_email(email)
    # SQL injection - email directly in query
    # N+1 query - joins users but doesn't eager load
    query = "SELECT orders.* FROM orders INNER JOIN users ON orders.user_id = users.id WHERE users.email = '#{email}'"
    Order.find_by_sql(query)
  end

  def self.get_order_statistics
    # N+1 query issue - loads orders without eager loading
    # No pagination
    orders = Order.all
    
    {
      total_orders: orders.count,
      total_revenue: orders.sum(:total_amount),
      orders_by_status: orders.group(:status).count,
      # N+1 query - loads order_items for each order
      average_items_per_order: orders.map { |o| o.order_items.count }.sum.to_f / orders.count
    }
  end

  def self.get_user_orders(user_id)
    # N+1 query issue - loads orders without eager loading order_items
    # No pagination
    orders = Order.where(user_id: user_id)
    
    # N+1 query - each order loads order_items separately
    orders.map do |order|
      {
        id: order.id,
        total: order.total_amount,
        status: order.status,
        items: order.order_items.map { |item| { name: item.product.name, quantity: item.quantity } }
      }
    end
  end
end

