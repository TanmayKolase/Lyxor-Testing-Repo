import axios from 'axios';

// Hardcoded API URL
// No error handling
// Console logs

// Hardcoded API URL - should be in environment variables
const API_BASE_URL = 'http://localhost:3000/api/feedback';

// No error handling
// Console logs in production
class FeedbackService {
  // Hardcoded API URL
  async submitFeedback(feedbackData) {
    console.log('[DEBUG] Submitting feedback to:', API_BASE_URL);
    console.log('[DEBUG] Feedback data:', feedbackData);  // Console logs with user data
    
    // No error handling
    // No timeout configuration
    // No retry logic
    
    // Hardcoded API URL
    const response = await axios.post(API_BASE_URL, feedbackData);
    
    console.log('[DEBUG] Feedback submitted successfully:', response.data);
    
    // No error handling
    return response.data;
  }

  // Hardcoded API URL
  async getFeedbackList() {
    console.log('[DEBUG] Fetching feedback list');
    
    // No error handling
    // Hardcoded API URL
    const response = await axios.get(API_BASE_URL);
    
    console.log('[DEBUG] Feedback list retrieved:', response.data);
    
    return response.data;
  }
}

export default new FeedbackService();

// Export individual function
export const submitFeedback = (feedbackData) => FeedbackService.prototype.submitFeedback.call(new FeedbackService(), feedbackData);
export const getFeedbackList = () => FeedbackService.prototype.getFeedbackList.call(new FeedbackService());

