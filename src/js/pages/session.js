// Session page functionality
import { getState, setCurrentPage, setCurrentSessionView, setSelectedLesson } from '../utils/state.js';
import { showPage, toggleSessionView } from '../utils/helpers.js';
import { lessons } from '../utils/constants.js';

// Render session page HTML
export const renderSessionPage = () => {
  const { selectedLesson, currentSessionView } = getState();
  
  // إذا لم يكن هناك درس مختار، نختار الدرس الأول الذي بدأ أو أي درس
  let currentLesson = selectedLesson;
  if (!currentLesson) {
    // البحث عن درس بحالة "started"
    currentLesson = lessons.find(lesson => lesson.status === 'started') || lessons[0];
  }
  
  return `
    <div id="session-page" class="session-page hidden">
      <div class="session-header">
        <button class="back-button" id="back-to-schedule">
          <i class="fas fa-arrow-right"></i>
          <span>العودة للجدول</span>
        </button>
        <h1>${currentLesson ? currentLesson.title : 'الحصة الدراسية'}</h1>
        
        <div class="session-buttons-container">
          <button class="session-button ${currentSessionView === 'class' ? 'active' : ''}" id="show-class">الحصة</button>
          <button class="session-button ${currentSessionView === 'practice' ? 'active' : ''}" id="show-practice">تدريب</button>
        </div>
      </div>
      
      <div class="session-content">
        <iframe 
          src="${currentLesson ? currentLesson.meetingUrl : 'https://live.higheredlab.com/api/v1/60304d3d/join/1359?viewer_name=ahmed_alahmadi'}" 
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
};

// Setup session page event listeners
export const setupSessionEvents = () => {
  // Back to schedule button
  const backToScheduleBtn = document.getElementById('back-to-schedule');
  if (backToScheduleBtn) {
    backToScheduleBtn.addEventListener('click', handleBackToSchedule);
  }
  
  // Session view buttons (class/practice toggle)
  const showClassBtn = document.getElementById('show-class');
  if (showClassBtn) {
    showClassBtn.addEventListener('click', () => handleSessionViewChange('class'));
  }
  
  const showPracticeBtn = document.getElementById('show-practice');
  if (showPracticeBtn) {
    showPracticeBtn.addEventListener('click', () => handleSessionViewChange('practice'));
  }
};

// Handle back to schedule button click
const handleBackToSchedule = () => {
  setCurrentPage('schedule');
  showPage('schedule');
};

// Handle session view change
const handleSessionViewChange = (view) => {
  setCurrentSessionView(view);
  const { currentSessionView } = getState();
  toggleSessionView(currentSessionView);
};

// دالة مباشرة للوصول إلى صفحة الحصة
export const goToSession = (lessonId = null) => {
  if (lessonId) {
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
    }
  } else {
    // اختيار أول درس بحالة "started" أو أول درس
    const startedLesson = lessons.find(lesson => lesson.status === 'started') || lessons[0];
    setSelectedLesson(startedLesson);
  }
  
  setCurrentPage('session');
  showPage('session');
}; 