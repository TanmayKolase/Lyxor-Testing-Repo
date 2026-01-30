class Api::V1::OrderStatsController < ApplicationController
  # No authentication checks
  # Missing error handling
  # N+1 query performance issues
  
  def index
    # N+1 query issue
    # Missing error handling
    stats = OrderService.get_order_statistics
    
    # Sensitive fields in response
    render json: stats, status: :ok
  rescue => e
    # Missing error handling - only logs
    Rails.logger.error "Error fetching stats: #{e.message}"
    render json: { error: 'Failed to fetch statistics' }, status: :internal_server_error
  end

  def by_status
    # SQL injection vulnerability
    # No authentication check
    # Missing error handling
    
    status = params[:status]
    
    # SQL injection - status directly in query
    orders = OrderService.find_orders_by_status(status)
    
    # Sensitive fields in response
    render json: orders, status: :ok
  end

  def by_date_range
    # SQL injection vulnerability
    # No authentication check
    # Missing error handling
    
    start_date = params[:start_date]
    end_date = params[:end_date]
    
    # SQL injection - dates directly in query
    orders = OrderService.find_orders_by_date_range(start_date, end_date)
    
    # Sensitive fields in response
    render json: orders, status: :ok
  end
end

