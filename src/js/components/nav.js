// Navigation component functionality
import { getState, setCurrentPage } from '../utils/state.js';
import { showPage } from '../utils/helpers.js';

// Render navigation bar HTML
export const renderNavBar = () => {
  const { currentPage } = getState();
  
  return `
    <div class="nav-bar ${currentPage === 'login' ? 'hidden' : ''}">
      <div class="nav-item ${currentPage === 'schedule' ? 'active' : ''}" data-page="schedule">
        <i class="fas fa-home"></i>
        <span>الرئيسية</span>
      </div>
      <div class="nav-item ${currentPage === 'profile' ? 'active' : ''}" data-page="profile">
        <i class="fas fa-user"></i>
        <span>الصفحة الشخصية</span>
      </div>
    </div>
  `;
};

// Setup navigation bar event listeners
export const setupNavEvents = () => {
  // Navigation clicks
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', handleNavItemClick);
  });
};

// Handle navigation item click
const handleNavItemClick = (e) => {
  const item = e.currentTarget;
  const page = item.getAttribute('data-page');
  
  // تحديث الصفحة الحالية وإظهارها
  if (page === 'schedule' || page === 'profile') {
    setCurrentPage(page);
    showPage(page);
  }
  
  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(navItem => {
    navItem.classList.remove('active');
  });
  item.classList.add('active');
}; 