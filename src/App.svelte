<script>
  import FeedbackForm from './components/FeedbackForm.svelte';
</script>

<main>
  <div class="container">
    <h1>Feedback Form</h1>
    <p class="subtitle">We'd love to hear your feedback!</p>
    <FeedbackForm />
  </div>
</main>

<style>
  main {
    min-height: 100vh;
    padding: 2rem;
    background-color: #f5f5f5;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    color: #2c3e50;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #7f8c8d;
    text-align: center;
    margin-bottom: 2rem;
  }
</style>

