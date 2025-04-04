// Schedule page functionality
import { boyAvatarUrl, lessons } from '../utils/constants.js';
import { getState, setCurrentPage, setSelectedLesson, navigateDay } from '../utils/state.js';
import { getDayName, showPage } from '../utils/helpers.js';
import { showNotification } from '../utils/notifications.js';

// Mock data for subscribed packages with daily lessons
const subscribedPackages = [
  {
    id: 1,
    name: 'باقة التميز',
    status: 'active', // active, expired
    startDate: '6 شوال 1441 هـ',
    endDate: '30 شوال 1441 هـ',
    // Lesson IDs that belong to this package
    lessonIds: [1, 2, 3, 5] 
  },
  {
    id: 2,
    name: 'باقة المتفوق',
    status: 'expired', // active, expired
    startDate: '15 شوال 1441 هـ',
    endDate: '15 ذو القعدة 1441 هـ',
    // Lesson IDs that belong to this package
    lessonIds: [4, 6, 7]
  }
];

// Active filter package ID (null means show all lessons)
let activePackageFilter = null;

// Render schedule page HTML
export const renderSchedulePage = () => {
  return `
    <div id="schedule-page" class="schedule-page hidden">
      <div class="header">
        <div class="schedule-title">الجدول الدراسي</div>
        <div class="user-info">
          <img src="${boyAvatarUrl}" alt="صورة المستخدم" class="user-avatar" />
          <div class="user-name">احمد الاحمدي</div>
        </div>
      </div>
      
      ${renderSubscribedPackages()}
      
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
        ${renderLessonsList()}
      </div>
    </div>
  `;
};

// Render subscribed packages section
const renderSubscribedPackages = () => {
  return `
    <div class="subscribed-packages-section">
      <div class="packages-section-header">
        <h3>الباقات المشترك بها</h3>
        <button class="view-all-packages-btn" id="view-all-packages">
          <i class="fas fa-cog"></i>
          إدارة الاشتراك
        </button>
      </div>
      
      <div class="subscribed-packages-slider">
        <div class="packages-slider-wrapper">
          <div class="package-slider-item all-packages ${activePackageFilter === null ? 'active-filter' : ''}" data-package-id="all">
            <div class="package-slider-content">
              <div class="package-slider-name">جميع الباقات</div>
            </div>
          </div>
          ${subscribedPackages.map(pkg => `
            <div class="package-slider-item ${pkg.status === 'expired' ? 'expired' : ''} ${activePackageFilter === pkg.id ? 'active-filter' : ''}" data-package-id="${pkg.id}">
              <div class="package-slider-content">
                <div class="package-slider-name">${pkg.name}</div>
                <div class="package-slider-status ${pkg.status}">
                  ${pkg.status === 'active' 
                    ? '<i class="fas fa-check-circle"></i> فعالة' 
                    : '<i class="fas fa-lock"></i> منتهية'}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
};

// Render lessons list HTML
const renderLessonsList = () => {
  // Filter lessons based on activePackageFilter
  const filteredLessons = activePackageFilter === null 
    ? lessons // Show all lessons if no filter
    : lessons.filter(lesson => {
        const selectedPackage = subscribedPackages.find(pkg => pkg.id === activePackageFilter);
        return selectedPackage && selectedPackage.lessonIds.includes(lesson.id);
      });
  
  // If there are no lessons after filtering
  if (filteredLessons.length === 0) {
    return `
      <div class="no-lessons-message">
        <i class="fas fa-info-circle"></i>
        <p>لا توجد حصص مرتبطة بهذه الباقة في الوقت الحالي</p>
      </div>
    `;
  }

  return filteredLessons.map(lesson => {
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
  }).join('');
};

// Setup schedule page event listeners
export const setupScheduleEvents = () => {
  // Date navigation
  const datePrevBtn = document.querySelector('.date-prev');
  if (datePrevBtn) {
    datePrevBtn.addEventListener('click', () => handleDateNavigation(-1));
  }
  
  const dateNextBtn = document.querySelector('.date-next');
  if (dateNextBtn) {
    dateNextBtn.addEventListener('click', () => handleDateNavigation(1));
  }
  
  // Lesson item click
  document.querySelectorAll('.lesson-item').forEach(item => {
    item.addEventListener('click', (e) => {
      // Skip if play button was clicked (it has its own handler)
      if (e.target.closest('.play-button')) return;
      
      handleLessonClick(parseInt(item.getAttribute('data-lesson-id')));
    });
  });
  
  // Play button click for lessons
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent the lesson item click from firing too
      handlePlayButtonClick(parseInt(button.getAttribute('data-lesson-id')));
    });
  });
  
  // View all packages button
  const viewAllPackagesBtn = document.getElementById('view-all-packages');
  if (viewAllPackagesBtn) {
    viewAllPackagesBtn.addEventListener('click', handleViewAllPackages);
  }
  
  // Package slider item click - filter lessons
  document.querySelectorAll('.package-slider-item').forEach(item => {
    item.addEventListener('click', handlePackageFilter);
  });
};

// Handle package filter click
const handlePackageFilter = (e) => {
  const item = e.currentTarget;
  const packageIdStr = item.getAttribute('data-package-id');
  
  // Set the active filter
  if (packageIdStr === 'all') {
    activePackageFilter = null;
  } else {
    activePackageFilter = parseInt(packageIdStr);
  }
  
  // Update UI to show active filter
  document.querySelectorAll('.package-slider-item').forEach(pkg => {
    pkg.classList.remove('active-filter');
  });
  item.classList.add('active-filter');
  
  // Re-render lessons list with filter
  const lessonsContainer = document.querySelector('.lessons-list');
  if (lessonsContainer) {
    lessonsContainer.innerHTML = renderLessonsList();
    
    // Re-attach event listeners to newly rendered lessons
    document.querySelectorAll('.lesson-item').forEach(item => {
      item.addEventListener('click', (e) => {
        if (!e.target.closest('.play-button')) {
          handleLessonClick(parseInt(item.getAttribute('data-lesson-id')));
        }
      });
    });
    
    document.querySelectorAll('.play-button').forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        handlePlayButtonClick(parseInt(button.getAttribute('data-lesson-id')));
      });
    });
  }
};

// Handle view all packages button click
const handleViewAllPackages = () => {
  setCurrentPage('subscription');
  showPage('subscription');
};

// Handle date navigation
const handleDateNavigation = (direction) => {
  navigateDay(direction);
  
  // Update UI
  const dateTextElement = document.querySelector('.date-text');
  if (dateTextElement) {
    dateTextElement.textContent = getDayName(0);
  }
};

// Handle lesson item click
const handleLessonClick = (lessonId) => {
  const lesson = lessons.find(l => l.id === lessonId);
  
  if (lesson && lesson.status === 'started') {
    setSelectedLesson(lesson);
    setCurrentPage('session');
    showPage('session');
  }
};

// Handle play button click
const handlePlayButtonClick = (lessonId) => {
  const lesson = lessons.find(l => l.id === lessonId);
  
  if (lesson && lesson.status === 'started') {
    setSelectedLesson(lesson);
    setCurrentPage('session');
    showPage('session');
  } else {
    showNotification('هذه الجلسة غير متاحة حالياً', 'تنبيه', 'warning');
  }
};