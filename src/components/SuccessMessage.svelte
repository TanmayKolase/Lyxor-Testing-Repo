<script>
  // XSS via unsanitized input
  // No accessibility labels
  // Console logs
  
  export let message = '';
  export let onClose;
  
  console.log('[DEBUG] SuccessMessage displayed:', message);
  
  // XSS risk - message rendered without sanitization
  // Should sanitize HTML before rendering
</script>

<div class="success-message">
  <div class="success-content">
    <!-- XSS risk - using {@html} with unsanitized input -->
    <p class="success-text">{@html message}</p>
    <button
      on:click={onClose}
      class="close-button"
    >
      <!-- Missing accessibility label and role -->
      Close
    </button>
  </div>
</div>

<style>
  .success-message {
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    padding: 1rem;
    margin-bottom: 1.5rem;
  }

  .success-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .success-text {
    color: #155724;
    margin: 0;
  }

  .close-button {
    padding: 0.5rem 1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .close-button:hover {
    background-color: #218838;
  }
</style>

