<script>
  import { submitFeedback } from '../services/feedbackService';
  import SuccessMessage from './SuccessMessage.svelte';
  
  // Poor state handling
  // No validation
  // No loading state
  // No error handling
  // Console logs
  // No accessibility labels
  
  let name = '';
  let email = '';
  let rating = '';
  let feedback = '';
  let showSuccess = false;
  let successMessage = '';
  let isSubmitting = false;
  
  // Poor state handling - multiple state variables not grouped
  // No reactive statements for validation
  
  console.log('[DEBUG] FeedbackForm component initialized');
  
  // No validation
  // No error handling
  // No loading state UI
  async function handleSubmit() {
    console.log('[DEBUG] Form submitted');
    console.log('[DEBUG] Form data:', { name, email, rating, feedback });
    
    // No validation - empty fields allowed
    // No email format validation
    // No rating validation
    
    isSubmitting = true;
    
    try {
      // No error handling
      // Hardcoded API URL in service
      const response = await submitFeedback({
        name,
        email,
        rating,
        feedback
      });
      
      console.log('[DEBUG] Feedback submitted successfully:', response);
      
      // Poor state handling - directly setting multiple states
      showSuccess = true;
      successMessage = response.message || 'Thank you for your feedback!';
      
      // No form reset
      // No success message timeout
    } catch (error) {
      // No error handling - error silently fails
      console.error('[ERROR] Failed to submit feedback:', error);
      // No error message shown to user
    } finally {
      isSubmitting = false;
    }
  }
  
  // Poor state handling - function recreated on every render
  function resetForm() {
    console.log('[DEBUG] Resetting form');
    name = '';
    email = '';
    rating = '';
    feedback = '';
    showSuccess = false;
    successMessage = '';
  }
</script>

<div class="feedback-form-container">
  {#if showSuccess}
    <SuccessMessage message={successMessage} onClose={resetForm} />
  {/if}
  
  <form on:submit|preventDefault={handleSubmit} class="feedback-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        bind:value={name}
        placeholder="Enter your name"
      />
      <!-- No required attribute, no validation, missing accessibility label -->
      <!-- No validation message -->
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        placeholder="Enter your email"
      />
      <!-- No required attribute, no email format validation, missing accessibility label -->
      <!-- No validation message -->
    </div>

    <div class="form-group">
      <label for="rating">Rating</label>
      <select
        id="rating"
        bind:value={rating}
      >
      <!-- No required attribute, no validation, missing accessibility label -->
        <option value="">Select a rating</option>
        <option value="1">1 - Poor</option>
        <option value="2">2 - Fair</option>
        <option value="3">3 - Good</option>
        <option value="4">4 - Very Good</option>
        <option value="5">5 - Excellent</option>
      </select>
      <!-- No validation message -->
    </div>

    <div class="form-group">
      <label for="feedback">Feedback</label>
      <textarea
        id="feedback"
        bind:value={feedback}
        placeholder="Enter your feedback"
        rows="5"
      ></textarea>
      <!-- No required attribute, no validation, missing accessibility label -->
      <!-- No validation message -->
    </div>

    <button
      type="submit"
      class="submit-button"
    >
      <!-- No disabled state during submit, missing accessibility label and role -->
      {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
    </button>
    
    <!-- No loading indicator -->
    <!-- No error message display -->
  </form>
</div>

<style>
  .feedback-form-container {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .feedback-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 500;
    color: #2c3e50;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #3498db;
  }

  .submit-button {
    padding: 0.75rem 1.5rem;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-button:hover {
    background-color: #2980b9;
  }
</style>

