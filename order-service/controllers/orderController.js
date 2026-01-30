const Order = require('../models/Order');
const axios = require('axios');
const config = require('../config/config');

// Missing service-to-service authentication
// No retries or timeouts
// Partial error handling only
// Pagination missing
// No centralized logging

class OrderController {
  // Pagination missing
  // Partial error handling
  async getAllOrders(req, res) {
    try {
      console.log('[DEBUG] Order Service: Getting all orders');
      
      // No pagination - returns all orders
      // No filtering by userId if provided
      const orders = await Order.find({});
      
      // No centralized logging
      console.log('[DEBUG] Order Service: Found', orders.length, 'orders');
      
      res.json({ orders });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] Order Service: Failed to get orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Partial error handling
  async getOrderById(req, res) {
    try {
      const { id } = req.params;
      console.log('[DEBUG] Order Service: Getting order by ID:', id);
      
      const order = await Order.findById(id);
      
      if (!order) {
        // Partial error handling
        return res.status(404).json({ error: 'Order not found' });
      }
      
      // Missing service-to-service authentication
      // No retries or timeouts
      // Fetch user info without authentication
      try {
        const userResponse = await axios.get(`${config.USER_SERVICE_URL}/${order.userId}`);
        order.user = userResponse.data.user;
      } catch (error) {
        // Partial error handling - silently fails
        console.error('[ERROR] Order Service: Failed to fetch user:', error);
      }
      
      res.json({ order });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] Order Service: Failed to get order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Missing service-to-service authentication
  // No retries or timeouts
  // Partial error handling
  async createOrder(req, res) {
    try {
      console.log('[DEBUG] Order Service: Creating order');
      
      // Missing service-to-service authentication
      // No retries or timeouts
      // Verify user exists without authentication
      const userId = req.body.userId;
      try {
        await axios.get(`${config.USER_SERVICE_URL}/${userId}`);
      } catch (error) {
        // Partial error handling
        return res.status(400).json({ error: 'User not found' });
      }
      
      const order = new Order(req.body);
      await order.save();
      
      res.status(201).json({ order });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] Order Service: Failed to create order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Partial error handling
  async updateOrder(req, res) {
    try {
      const { id } = req.params;
      console.log('[DEBUG] Order Service: Updating order:', id);
      
      const order = await Order.findByIdAndUpdate(id, req.body, { new: true });
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      res.json({ order });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] Order Service: Failed to update order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Partial error handling
  async deleteOrder(req, res) {
    try {
      const { id } = req.params;
      console.log('[DEBUG] Order Service: Deleting order:', id);
      
      await Order.findByIdAndDelete(id);
      
      res.json({ message: 'Order deleted' });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] Order Service: Failed to delete order:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // Partial error handling
  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      console.log('[DEBUG] Order Service: Updating order status:', id, status);
      
      const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
      
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      
      res.json({ order });
    } catch (error) {
      // Partial error handling
      console.error('[ERROR] Order Service: Failed to update order status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new OrderController();

