import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>User Settings</h1>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
    }
    .app-header {
      background-color: #2c3e50;
      color: white;
      padding: 1rem 2rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .app-header h1 {
      margin: 0;
      font-size: 1.5rem;
    }
    .app-main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'user-settings-app';
}

