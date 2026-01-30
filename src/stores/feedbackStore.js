import { writable } from 'svelte/store';

// Poor state handling
// No proper state management
// Console logs

// Poor state handling - multiple stores instead of single store
export const feedbackList = writable([]);
export const isLoading = writable(false);
export const error = writable(null);

// Poor state handling - functions not in store
export function addFeedback(feedback) {
  console.log('[DEBUG] Adding feedback to store:', feedback);
  
  // Poor state handling - directly updating store
  feedbackList.update(list => {
    // Poor state handling - mutating array
    list.push(feedback);
    return list;
  });
}

// Poor state handling - function not reactive
export function clearFeedback() {
  console.log('[DEBUG] Clearing feedback store');
  
  // Poor state handling
  feedbackList.set([]);
  error.set(null);
}

