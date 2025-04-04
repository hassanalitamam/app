import './style.css'
import intlTelInput from 'intl-tel-input'
import 'intl-tel-input/build/css/intlTelInput.css'

// New logo URL
const logoImageUrl = 'https://d2lvzun4f7o52g.cloudfront.net/nvvx9heu41uh1chyc8mrha5znirt?response-content-disposition=inline%3B+filename%3D%22Logo%2BColor%2BVersion2.png%22%3B&response-content-type=image%2Fpng&Expires=1742940907&Signature=Al-f2wZqkVZqDzE4uE5JBByMIO-AteLz6549EZ9oA36Tr0IXXVeeq95IFJllVmDMxigJ3y7XbaaN98rBlgpOomaE2acEWaTdsZVlWGqh~mr3a-woc-cvSajIdIiAxEZz2XTrmTstnwAER5leuYDScP6jsOMzyVVFZNlym8SdMOcUO8Ec7LsytfCFpAksmiG3E7561R0z~L-ICrR4WxhknlzEVfyO37sw5zJbM041GoMjXHe2bKm6dKeTucaidZoiTIt3ncdKhAuLkBSmiDvhROBmYAB~WlRWnN7PHZ6pH0~1xLEnNCtlK5jrmJIThBsFxX1PTMwW5RpEJnAQZgvUSg__&Key-Pair-Id=APKAW7BNAWUPQ4R5C3FU'

// Boy avatar URL
const boyAvatarUrl = 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png'

// Current page state
let currentPage = 'login'

// Selected lesson for session page
let selectedLesson = null;

// Current session view (class or practice)
let currentSessionView = 'class';

// Current date selection
let currentDateSelection = 'day';

// Wallet balance
let walletBalance = 500;

// Days in Arabic
const daysInArabic = [
  'الأحد',
  'الإثنين',
  'الثلاثاء',
  'الأربعاء',
  'الخميس',
  'الجمعة',
  'السبت'
];

// Get current date object
const today = new Date();
let currentDayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

// Lesson data with times
const lessons = [
  {
    id: 1,
    title: 'اللغة العربية',
    status: 'started',
    startTime: '09:00',
    endTime: '10:30',
    remainingMinutes: 45,
    meetingUrl: 'https://live.higheredlab.com/api/v1/60304d3d/join/1359?viewer_name=ahmed_alahmadi'
  },
  {
    id: 2,
    title: 'اللغة الإنجليزية',
    status: 'coming-soon',
    startTime: '11:00',
    endTime: '12:30',
    remainingMinutes: 0,
    meetingUrl: 'https://live.higheredlab.com/api/v1/60304d3d/join/1359?viewer_name=ahmed_alahmadi'
  },
  {
    id: 3,
    title: 'الرياضيات',
    status: 'scheduled',
    startTime: '13:30',
    endTime: '15:00',
    remainingMinutes: 0,
    meetingUrl: 'https://live.higheredlab.com/invite/60304d3d/1359'
  },
  {
    id: 4,
    title: 'العلوم',
    status: 'scheduled',
    startTime: '15:30',
    endTime: '17:00',
    remainingMinutes: 0,
    meetingUrl: 'https://live.higheredlab.com/invite/60304d3d/1359'
  },
  {
    id: 5,
    title: 'التاريخ',
    status: 'scheduled',
    startTime: '09:00',
    endTime: '10:30',
    remainingMinutes: 0,
    meetingUrl: 'https://live.higheredlab.com/invite/60304d3d/1359'
  },
  {
    id: 6,
    title: 'الجغرافيا',
    status: 'scheduled',
    startTime: '11:00',
    endTime: '12:30',
    remainingMinutes: 0,
    meetingUrl: 'https://live.higheredlab.com/invite/60304d3d/1359'
  },
  {
    id: 7,
    title: 'التربية الإسلامية',
    status: 'scheduled',
    startTime: '13:30',
    endTime: '15:00',
    remainingMinutes: 0,
    meetingUrl: 'https://live.higheredlab.com/invite/60304d3d/1359'
  }
];

// App initialization
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
  // Add a small delay to ensure DOM is fully rendered before attaching event listeners
  setTimeout(() => {
    setupEventListeners();
    startCountdownTimer();
  }, 100);
  
  // Initialize international phone input after rendering
  const phoneInputField = document.querySelector(".phone-input");
  if (phoneInputField) {
    const phoneInput = intlTelInput(phoneInputField, {
      preferredCountries: ["sa", "ae", "kw", "bh", "qa", "om"],
      initialCountry: "sa",
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.3.5/js/utils.js",
    });
  }
  
  // Add modal notification container
  if (!document.querySelector('.notification-overlay')) {
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'notification-overlay';
    notificationContainer.innerHTML = `
      <div class="notification-modal">
        <div class="notification-close">
          <i class="fas fa-times"></i>
        </div>
        <div class="notification-icon success">
          <i class="fas fa-check"></i>
        </div>
        <h3 class="notification-title">تمت العملية بنجاح</h3>
        <p class="notification-message">تم تنفيذ العملية المطلوبة بنجاح.</p>
        <button class="notification-btn success">موافق</button>
      </div>
    `;
    document.body.appendChild(notificationContainer);
    
    // Add event listeners to close the notification
    notificationContainer.querySelector('.notification-close').addEventListener('click', () => {
      closeNotification();
    });
    
    notificationContainer.querySelector('.notification-btn').addEventListener('click', () => {
      closeNotification();
    });
    
    // Close when clicking on overlay
    notificationContainer.addEventListener('click', (e) => {
      if (e.target === notificationContainer) {
        closeNotification();
      }
    });
  }
});

// Custom notification function
function showNotification(message, title = 'إشعار', type = 'success') {
  const overlay = document.querySelector('.notification-overlay');
  const modal = document.querySelector('.notification-modal');
  const iconContainer = document.querySelector('.notification-icon');
  const icon = iconContainer.querySelector('i');
  const titleElement = document.querySelector('.notification-title');
  const messageElement = document.querySelector('.notification-message');
  const button = document.querySelector('.notification-btn');
  
  // Set content based on type
  titleElement.textContent = title;
  messageElement.textContent = message;
  
  // Set icon and styles based on type
  iconContainer.className = `notification-icon ${type}`;
  button.className = `notification-btn ${type}`;
  
  if (type === 'success') {
    icon.className = 'fas fa-check';
  } else if (type === 'info') {
    icon.className = 'fas fa-info';
  } else if (type === 'warning') {
    icon.className = 'fas fa-exclamation-triangle';
  }
  
  // Show the notification
  overlay.classList.add('active');
  
  // Add pulse animation to the modal
  modal.classList.add('modal-pulse');
  setTimeout(() => {
    modal.classList.remove('modal-pulse');
  }, 2000);
  
  // Auto close after 4 seconds for success notifications
  if (type === 'success') {
    setTimeout(() => {
      closeNotification();
    }, 4000);
  }
}

// Close notification function
function closeNotification() {
  const overlay = document.querySelector('.notification-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}

// Start countdown timer for active lessons
function startCountdownTimer() {
  setInterval(() => {
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
}

// Get the day name (previous, current or next)
function getDayName(offset) {
  let dayIndex = (currentDayIndex + offset + 7) % 7; // +7 ensures positive result with modulo
  return daysInArabic[dayIndex];
}

// Render the entire app
function renderApp() {
  const appDiv = document.querySelector('#app');
  
  appDiv.innerHTML = `
    ${renderLoginPage()}
    <div class="content-container">
      ${renderSchedulePage()}
      ${renderProfilePage()}
      ${renderSessionPage()}
    </div>
    ${renderNavBar()}
  `;
  
  // Show only current page
  showPage(currentPage);
}

// Render login page
function renderLoginPage() {
  return `
    <div id="login-page" class="login-page">
      <div class="login-top">
        <div class="logo-container">
          <img src="${logoImageUrl}" alt="شعار التطبيق" />
        </div>
      </div>
      
      <h1 class="login-title">تسجيل الدخول</h1>
      
      <div class="phone-input-container">
        <label class="phone-input-label">أدخل رقم جوالك</label>
        <input type="tel" class="phone-input" value="+966591998000" dir="ltr" />
        
        <button id="login-button" class="login-button">تسجيل الدخول</button>
      </div>
      
      <div class="bg-circles">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>
    </div>
  `;
}

// Render schedule page
function renderSchedulePage() {
  return `
    <div id="schedule-page" class="schedule-page hidden">
      <div class="header">
        <div class="schedule-title">الجدول الدراسي</div>
        <div class="user-info">
          <div>
            <div class="welcome-text">مرحباً</div>
            <div class="user-name">احمد الاحمدي</div>
          </div>
          <img src="${boyAvatarUrl}" alt="صورة المستخدم" class="user-avatar" />
        </div>
      </div>
      
      <div class="date-nav">
        <div class="date-selector-new">
          <button class="date-arrow date-prev">
            <i class="fas fa-chevron-right"></i>
          </button>
          <div class="date-text">${getDayName(0)}</div>
          <button class="date-arrow date-next">
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
      </div>
      
      <div class="lessons-list">
        ${lessons.map(lesson => {
          const statusText = lesson.status === 'started' ? 'بدأت' : 
                            lesson.status === 'coming-soon' ? 'ستبدأ قريبا' : 'مجدولة';
          
          const timeDisplay = `${lesson.startTime} - ${lesson.endTime}`;
          
          const remainingTimeHTML = lesson.status === 'started' ? 
            `<div class="remaining-time-container">
              <i class="fas fa-clock"></i>
              <span class="remaining-time">${Math.floor(lesson.remainingMinutes / 60)} ساعة و ${lesson.remainingMinutes % 60} دقيقة</span>
            </div>` : '';
          
          return `
            <div class="lesson-item ${lesson.status}" data-lesson-id="${lesson.id}">
              <div class="lesson-info">
                <div class="lesson-title-container">
                  <div class="lesson-title">${lesson.title}</div>
                  <div class="lesson-time">${timeDisplay}</div>
                  ${remainingTimeHTML}
                </div>
              </div>
              <div class="lesson-status">${statusText}</div>
              <div class="play-button" data-lesson-id="${lesson.id}">
                <i class="fas fa-play"></i>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

// Render profile page
function renderProfilePage() {
  return `
    <div id="profile-page" class="profile-page hidden">
      <div class="profile-header">
        <div class="profile-title">الملف الشخصي</div>
        <button class="back-to-home-btn">
          <i class="fas fa-arrow-right"></i>
          <span>العودة للرئيسية</span>
        </button>
      </div>
      
      <div class="form-group">
        <label class="form-label">الاسم</label>
        <input type="text" class="form-input" value="احمد الاحمدي" />
      </div>
      
      <div class="form-group">
        <label class="form-label">رقم الجوال</label>
        <input type="tel" class="form-input" value="+966591998000" dir="ltr" />
      </div>
      
      <div class="form-group">
        <label class="form-label">نوع الباقة</label>
        <input type="text" class="form-input" value="باقة التميز الدراسي" />
      </div>

      <div class="wallet-section">
        <div class="wallet-header">
          <h2>المحفظة</h2>
          <div class="wallet-balance">
            <span>الرصيد الحالي:</span>
            <span class="balance-amount">${walletBalance} ريال</span>
          </div>
        </div>
        <div class="wallet-actions">
          <button class="wallet-action-btn">
            <i class="fas fa-plus-circle"></i>
            إضافة رصيد
          </button>
          <button class="wallet-action-btn">
            <i class="fas fa-sync-alt"></i>
            تحديث الرصيد
          </button>
        </div>
      </div>

      <div class="invite-friend-section">
        <button class="invite-friend-btn">
          <i class="fas fa-user-plus"></i>
          دعوة صديق
        </button>
      </div>
    </div>
  `;
}

// Render session page with BigBlueButton iframe
function renderSessionPage() {
  if (!selectedLesson) {
    return `<div id="session-page" class="session-page hidden"></div>`;
  }
  
  return `
    <div id="session-page" class="session-page hidden">
      <div class="session-header">
        <button class="back-button" id="back-to-schedule">
          <i class="fas fa-arrow-right"></i>
          <span>العودة للجدول</span>
        </button>
        <h1>${selectedLesson.title}</h1>
        
        <div class="session-buttons-container">
          <button class="session-button ${currentSessionView === 'class' ? 'active' : ''}" id="show-class">الحصة</button>
          <button class="session-button ${currentSessionView === 'practice' ? 'active' : ''}" id="show-practice">تدريب</button>
        </div>
      </div>
      
      <div class="session-content">
        <iframe 
          src="${selectedLesson.meetingUrl}" 
          class="session-iframe ${currentSessionView === 'class' ? '' : 'hidden'}"
          id="class-iframe"
          allow="camera *;microphone *;display-capture *;" 
          allowfullscreen>
        </iframe>
        
        <iframe 
          src="https://kahoot.it/?pin=77662298&refer_method=link" 
          class="session-iframe ${currentSessionView === 'practice' ? '' : 'hidden'}"
          id="practice-iframe"
          allow="camera *;microphone *;" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;
}

// Render navigation bar
function renderNavBar() {
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
}

// Setup event listeners
function setupEventListeners() {
  // Login button click
  const loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.addEventListener('click', () => {
      currentPage = 'schedule';
      showPage(currentPage);
    });
  }
  
  // Navigation clicks
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const page = item.getAttribute('data-page');
      
      // Only allow navigation to schedule or profile from nav bar
      if (page === 'schedule' || page === 'profile') {
        currentPage = page;
        showPage(currentPage);
        
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(navItem => {
          navItem.classList.remove('active');
        });
        item.classList.add('active');
      }
    });
  });

  // Date navigation
  const datePrevBtn = document.querySelector('.date-prev');
  if (datePrevBtn) {
    datePrevBtn.addEventListener('click', () => {
      navigateDay(-1);
    });
  }
  
  const dateNextBtn = document.querySelector('.date-next');
  if (dateNextBtn) {
    dateNextBtn.addEventListener('click', () => {
      navigateDay(1);
    });
  }

  // Back to home from profile
  const backToHomeBtn = document.querySelector('.back-to-home-btn');
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', () => {
      currentPage = 'schedule';
      showPage(currentPage);
      updateNavActiveState();
    });
  }
  
  // Play button click for lessons
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the lesson item click from firing too
      const lessonId = parseInt(button.getAttribute('data-lesson-id'));
      const lesson = lessons.find(l => l.id === lessonId);
      
      if (lesson && lesson.status === 'started') {
        selectedLesson = lesson;
        currentSessionView = 'class'; // Default to class view
        renderApp();
        currentPage = 'session';
        showPage(currentPage);
        // Re-setup event listeners after rendering
        setupEventListeners();
      } else {
        // Show modal notification instead of alert
        showNotification('هذه الجلسة غير متاحة حالياً', 'تنبيه', 'warning');
      }
    });
  });
  
  // Lesson item click
  document.querySelectorAll('.lesson-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // Skip if play button was clicked (it has its own handler)
      if (e.target.closest('.play-button')) return;
      
      const lessonId = parseInt(item.getAttribute('data-lesson-id'));
      const lesson = lessons.find(l => l.id === lessonId);
      
      if (lesson && lesson.status === 'started') {
        selectedLesson = lesson;
        currentSessionView = 'class'; // Default to class view
        renderApp();
        currentPage = 'session';
        showPage(currentPage);
        // Re-setup event listeners after rendering
        setupEventListeners();
      }
    });
  });
  
  // Back to schedule button - FIXED
  const backToScheduleBtn = document.getElementById('back-to-schedule');
  if (backToScheduleBtn) {
    backToScheduleBtn.addEventListener('click', () => {
      currentPage = 'schedule';
      renderApp(); // Re-render the app to ensure all elements are updated
      setupEventListeners(); // Re-setup event listeners
    });
  }
  
  // Session view buttons (class/practice toggle)
  const showClassBtn = document.getElementById('show-class');
  if (showClassBtn) {
    showClassBtn.addEventListener('click', () => {
      currentSessionView = 'class';
      toggleSessionView();
    });
  }
  
  const showPracticeBtn = document.getElementById('show-practice');
  if (showPracticeBtn) {
    showPracticeBtn.addEventListener('click', () => {
      currentSessionView = 'practice';
      toggleSessionView();
    });
  }

  // Wallet action buttons
  document.querySelectorAll('.wallet-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.textContent.includes('إضافة')) {
        walletBalance += 100;
        updateWalletDisplay();
        // Show modal notification instead of alert
        showNotification('تم إضافة 100 ريال إلى رصيدك بنجاح', 'إضافة رصيد', 'success');
      } else {
        // Show modal notification instead of alert
        showNotification('تم تحديث الرصيد', 'تحديث', 'info');
      }
    });
  });

  // Invite friend button
  const inviteFriendBtn = document.querySelector('.invite-friend-btn');
  if (inviteFriendBtn) {
    inviteFriendBtn.addEventListener('click', () => {
      const inviteLink = 'https://edu-app.example.com/invite/12345';
      
      // Check if we can use the clipboard API
      if (navigator.clipboard) {
        navigator.clipboard.writeText(inviteLink)
          .then(() => showNotification('تم نسخ رابط الدعوة. شاركه مع أصدقائك!', 'دعوة صديق', 'success'))
          .catch(() => showNotification('رابط الدعوة: ' + inviteLink, 'دعوة صديق', 'info'));
      } else {
        showNotification('رابط الدعوة: ' + inviteLink, 'دعوة صديق', 'info');
      }
    });
  }
}

// Toggle between class and practice views
function toggleSessionView() {
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
}

// Update active state in nav bar
function updateNavActiveState() {
  document.querySelectorAll('.nav-item').forEach(item => {
    const page = item.getAttribute('data-page');
    if (page === currentPage) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Update wallet display
function updateWalletDisplay() {
  const balanceElement = document.querySelector('.balance-amount');
  if (balanceElement) {
    balanceElement.textContent = `${walletBalance} ريال`;
  }
}

// Navigate between days
function navigateDay(direction) {
  currentDayIndex = (currentDayIndex + direction + 7) % 7;
  
  // Update UI
  const dateTextElement = document.querySelector('.date-text');
  if (dateTextElement) {
    dateTextElement.textContent = getDayName(0);
  }
}

// Show specific page and hide others
function showPage(pageName) {
  // Hide all pages
  document.querySelectorAll('#login-page, #schedule-page, #profile-page, #session-page').forEach(page => {
    page.classList.add('hidden');
  });
  
  // Show requested page
  const pageToShow = document.getElementById(`${pageName}-page`);
  if (pageToShow) {
    pageToShow.classList.remove('hidden');
  }
  
  // Show/hide nav bar based on page
  const navBar = document.querySelector('.nav-bar');
  if (navBar) {
    if (pageName === 'login') {
      navBar.classList.add('hidden');
    } else {
      navBar.classList.remove('hidden');
    }
  }
  
  // Update active nav item
  updateNavActiveState();
}