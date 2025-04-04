// Main application module
import '../styles/main.css';
import { lessons } from './utils/constants.js';
import { getState, getAuthStates } from './utils/state.js';
import { startCountdownTimer, showPage } from './utils/helpers.js';
import { initializeNotificationSystem } from './utils/notifications.js';
import { initializeFriendInvitationModal } from './utils/modals.js';

// Page modules
import { renderLoginPage, setupLoginEvents } from './pages/login.js';
import { renderSchedulePage, setupScheduleEvents } from './pages/schedule.js';
import { renderProfilePage, setupProfileEvents } from './pages/profile.js';
import { renderSessionPage, setupSessionEvents } from './pages/session.js';
import { renderBalanceDetailsPage, setupBalanceDetailsEvents } from './pages/balance.js';
import { renderPackagesPage, setupPackagesEvents } from './pages/packages.js';
import { renderSubscriptionPage, setupSubscriptionEvents } from './pages/subscription.js';

// Component modules
import { renderNavBar, setupNavEvents } from './components/nav.js';

// Render the entire app
const renderApp = () => {
  const appDiv = document.querySelector('#app');
  const { authState } = getState();
  const AUTH_STATES = getAuthStates();

  // If user is not authenticated, show only login page
  if (authState !== AUTH_STATES.AUTHENTICATED) {
    appDiv.innerHTML = renderLoginPage();
    // Hide navigation bar
    const navBar = document.createElement('div');
    navBar.className = 'nav-bar hidden';
    appDiv.appendChild(navBar);
  } else {
    // If authenticated, show the full app with all pages (each page will be hidden/shown as needed)
    appDiv.innerHTML = `
      ${renderLoginPage()}
      <div class="content-container">
        ${renderSchedulePage()}
        ${renderProfilePage()}
        ${renderSessionPage()}
        ${renderBalanceDetailsPage()}
        ${renderPackagesPage()}
        ${renderSubscriptionPage()}
      </div>
      ${renderNavBar()}
    `;
    
    // Show only current page
    const { currentPage } = getState();
    showPage(currentPage);
  }
};

// Setup all event listeners after rendering
const setupEventListeners = () => {
  const { authState } = getState();
  const AUTH_STATES = getAuthStates();

  // If not authenticated, only setup login events
  if (authState !== AUTH_STATES.AUTHENTICATED) {
    setupLoginEvents();
  } else {
    // If authenticated, setup all events
    setupLoginEvents();
    setupScheduleEvents();
    setupProfileEvents();
    setupSessionEvents();
    setupBalanceDetailsEvents();
    setupPackagesEvents();
    setupSubscriptionEvents();
    setupNavEvents();
  }
};

// Initialize the application
const initializeApp = () => {
  renderApp();
  // Add a small delay to ensure DOM is fully rendered before attaching event listeners
  setTimeout(() => {
    setupEventListeners();
    startCountdownTimer(lessons);
  }, 100);
  
  // Initialize notification system
  initializeNotificationSystem();
  
  // Initialize friend invitation modal
  initializeFriendInvitationModal();
  
  // Listen for auth state changed event
  document.addEventListener('authStateChanged', (e) => {
    if (e.detail.authenticated) {
      renderApp();
      setupEventListeners();
    }
  });
};

// Start the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Export for testing or external access
export { renderApp, setupEventListeners, initializeApp };