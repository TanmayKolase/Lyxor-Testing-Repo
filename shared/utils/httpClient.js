const axios = require('axios');

// This file exists but is never actually used
// Dead code - HTTP client utility defined but not imported

class HttpClient {
  // This class is defined but never used
  // No retries or timeouts implementation
  
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      timeout: 5000,  // Timeout defined but never used
      retries: 3  // Retries defined but never used
    });
  }
  
  async get(url, config) {
    // Retry logic would go here but never used
    return this.client.get(url, config);
  }
  
  async post(url, data, config) {
    // Retry logic would go here but never used
    return this.client.post(url, data, config);
  }
}

module.exports = HttpClient;

