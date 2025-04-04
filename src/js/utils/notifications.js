// Notification system utilities

// Create notification element if it doesn't exist
export const initializeNotificationSystem = () => {
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
};

// Show notification
export const showNotification = (message, title = 'إشعار', type = 'success') => {
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
};

// Close notification
export const closeNotification = () => {
  const overlay = document.querySelector('.notification-overlay');
  if (overlay) {
    overlay.classList.remove('active');
  }
}; 