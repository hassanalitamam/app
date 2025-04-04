// Helper functions used throughout the application
import { daysInArabic } from './constants.js';
import { getState } from './state.js';

// Get the day name (previous, current or next)
export const getDayName = (offset) => {
  const { currentDayIndex } = getState();
  let dayIndex = (currentDayIndex + offset + 7) % 7; // +7 ensures positive result with modulo
  return daysInArabic[dayIndex];
};

// Show specific page and hide others
export const showPage = (pageName) => {
  // First, make sure we properly hide ALL pages
  document.querySelectorAll('#login-page, #schedule-page, #profile-page, #session-page, #balance-page, #packages-page, #subscription-page').forEach(page => {
    if (page) {
      page.classList.add('hidden');
    }
  });
  
  // Show requested page
  const pageToShow = document.getElementById(`${pageName}-page`);
  if (pageToShow) {
    pageToShow.classList.remove('hidden');
    // Scroll to top when showing a new page
    window.scrollTo(0, 0);
  }
  
  // Show/hide nav bar based on page
  const navBar = document.querySelector('.nav-bar');
  if (navBar) {
    if (pageName === 'login' || pageName === 'packages') {
      navBar.classList.add('hidden');
    } else {
      navBar.classList.remove('hidden');
    }
  }
  
  // Update active nav item
  updateNavActiveState(pageName);
};

// Update active state in nav bar
export const updateNavActiveState = (currentPage) => {
  document.querySelectorAll('.nav-item').forEach(item => {
    const page = item.getAttribute('data-page');
    if (page === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

// Update wallet display
export const updateWalletDisplay = (balance) => {
  const balanceElements = document.querySelectorAll('.balance-amount');
  balanceElements.forEach(element => {
    if (element) {
      element.textContent = `${balance} ريال`;
    }
  });
};

// Start countdown timer for active lessons
export const startCountdownTimer = (lessons) => {
  return setInterval(() => {
    const startedLessons = lessons.filter(lesson => lesson.status === 'started');
    if (startedLessons.length > 0) {
      startedLessons.forEach(lesson => {
        if (lesson.remainingMinutes > 0) {
          lesson.remainingMinutes--;
        }
        
        // Update the UI to display the new remaining time
        const remainingTimeElement = document.querySelector('.remaining-time');
        if (remainingTimeElement) {
          const hours = Math.floor(lesson.remainingMinutes / 60);
          const minutes = lesson.remainingMinutes % 60;
          
          if (hours > 0) {
            remainingTimeElement.textContent = `${hours} ساعة و ${minutes} دقيقة`;
          } else {
            remainingTimeElement.textContent = `${minutes} دقيقة`;
          }
        }
      });
    }
  }, 60000); // Update every minute
};

// Toggle between class and practice views
export const toggleSessionView = (currentSessionView) => {
  const classIframe = document.getElementById('class-iframe');
  const practiceIframe = document.getElementById('practice-iframe');
  const showClassBtn = document.getElementById('show-class');
  const showPracticeBtn = document.getElementById('show-practice');
  
  if (!classIframe || !practiceIframe || !showClassBtn || !showPracticeBtn) return;
  
  if (currentSessionView === 'class') {
    classIframe.classList.remove('hidden');
    practiceIframe.classList.add('hidden');
    showClassBtn.classList.add('active');
    showPracticeBtn.classList.remove('active');
  } else {
    classIframe.classList.add('hidden');
    practiceIframe.classList.remove('hidden');
    showClassBtn.classList.remove('active');
    showPracticeBtn.classList.add('active');
  }
};