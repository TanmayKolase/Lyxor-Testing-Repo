class Api::V1::OrdersController < ApplicationController
  # No authentication checks
  # No before_action :authenticate_user!
  # No authorization checks
  
  # Missing error handling
  # No rescue_from blocks
  # No error responses
  
  # N+1 query performance issue
  # No includes or eager loading
  
  # Sensitive fields in response
  # Returns all fields including sensitive data
  
  # No pagination
  # Returns all orders without limit
  
  def index
    # N+1 query issue - loads orders without eager loading associations
    # Missing pagination
    @orders = Order.all.order(created_at: :desc)
    
    # Sensitive fields in response
    render json: @orders, status: :ok
  end

  def show
    # N+1 query issue - loads order without eager loading
    # Missing error handling
    @order = Order.find(params[:id])
    
    # Sensitive fields in response
    render json: @order, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    # Missing error handling - no proper error response
    render json: { error: 'Order not found' }, status: :not_found
  end

  def create
    # Mass assignment vulnerability - no strong parameters
    # Missing error handling
    # No authentication check
    
    # Direct mass assignment - vulnerable
    @order = Order.new(order_params)
    
    if @order.save
      # Sensitive fields in response
      render json: @order, status: :created
    else
      # Missing error handling - no proper error messages
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    # Mass assignment vulnerability
    # Missing error handling
    # No authentication check
    
    @order = Order.find(params[:id])
    
    # Direct mass assignment - vulnerable
    if @order.update(order_params)
      # Sensitive fields in response
      render json: @order, status: :ok
    else
      # Missing error handling
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  rescue ActiveRecord::RecordNotFound => e
    # Missing error handling
    render json: { error: 'Order not found' }, status: :not_found
  end

  def destroy
    # Missing error handling
    # No authentication check
    
    @order = Order.find(params[:id])
    @order.destroy
    
    render json: { message: 'Order deleted successfully' }, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    # Missing error handling
    render json: { error: 'Order not found' }, status: :not_found
  end

  private

  # Mass assignment vulnerability - permits all parameters
  # No strong parameter filtering
  def order_params
    params.require(:order).permit(:user_id, :total_amount, :status, :payment_method, :credit_card_number, :cvv, :billing_address, :shipping_address, :notes)
  end
end

