// Subscription details page functionality
import { getState, setCurrentPage } from '../utils/state.js';
import { showPage } from '../utils/helpers.js';
import { showNotification } from '../utils/notifications.js';

// Render subscription details page HTML
export const renderSubscriptionPage = () => {
  // Mock subscription data
  const subscriptions = [
    {
      id: 1,
      name: 'باقة التميز',
      status: 'active',
      startDate: '6 شوال 1441 هـ',
      endDate: '30 شوال 1441 هـ',
      subjects: ['الرياضيات', 'اللغة العربية', 'اللغة الإنجليزية'],
      group: {
        id: 1,
        name: 'المجموعة الأولى',
        time: 'من 3:00 عصراً إلى 5:00 مساءً'
      }
    },
    {
      id: 2,
      name: 'باقة التميز',
      status: 'expired',
      daysLeft: 14,
      startDate: '6 شوال 1441 هـ',
      endDate: '30 شوال 1441 هـ',
      subjects: ['مهارات رقمية', 'لغة عربية', 'لعب وتعلم', 'نقد وتحليل', 'موسيقى', 'قصص وحكايات للصغار', 'قصص وحكايات للكبار'],
      group: {
        id: 2,
        name: 'المجموعة الثانية',
        time: 'من 5:30 مساءً إلى 7:30 مساءً'
      }
    }
  ];

  return `
    <div id="subscription-page" class="subscription-page hidden">
      <div class="subscription-header">
        <div class="subscription-title">الباقات والاشتراكات</div>
        <button class="back-to-profile-btn">
          <i class="fas fa-arrow-right"></i>
          <span>العودة للملف الشخصي</span>
        </button>
      </div>
      
      <button class="package-details-btn">
        <i class="fas fa-info-circle"></i>
        تفاصيل الباقات
      </button>
      
      <div class="subscriptions-list">
        ${subscriptions.map(subscription => `
          <div class="subscription-compact-card" data-id="${subscription.id}">
            <div class="subscription-compact-header">
              <h3 class="subscription-compact-name">${subscription.name}</h3>
              ${subscription.status === 'active' 
                ? `<span class="subscription-compact-badge active">فعّالة</span>` 
                : `<span class="subscription-compact-badge expired">(14 يوم متبقي)</span>`
              }
            </div>
            
            <div class="subscription-dates-row">
              <div class="subscription-date-col">
                <div class="date-col-label">تاريخ الاشتراك:</div>
                <div class="date-col-value">${subscription.startDate}</div>
              </div>
              <div class="subscription-date-col">
                <div class="date-col-label">تاريخ الانتهاء:</div>
                <div class="date-col-value">${subscription.endDate}</div>
              </div>
            </div>
            
            <div class="subscription-group-info">
              <div class="group-info-label">المجموعة:</div>
              <div class="group-info-value">${subscription.group.name}</div>
              <div class="group-info-time">${subscription.group.time}</div>
              <button class="change-group-btn" data-id="${subscription.id}">
                <i class="fas fa-exchange-alt"></i>
                تغيير المجموعة
              </button>
            </div>
            
            <div class="subscription-subjects">
              <div class="subjects-label">المواد:</div>
              <div class="subjects-list">
                ${subscription.subjects.map(subject => `
                  <span class="subject-pill">${subject}</span>
                `).join('')}
              </div>
            </div>
            
            ${subscription.status === 'expired' ? `
              <div class="subscription-actions">
                <button class="extend-trial-btn" data-id="${subscription.id}">
                  <i class="fas fa-clock"></i>
                  طلب تمديد الفترة التجريبية لمدة أسبوع
                </button>
                <button class="renew-subscription-btn" data-id="${subscription.id}">
                  <i class="fas fa-sync-alt"></i>
                  تجديد الاشتراك
                </button>
              </div>
            ` : `
              <button class="cancel-subscription-compact-btn" data-id="${subscription.id}">
                <i class="fas fa-times-circle"></i>
                إلغاء الاشتراك
              </button>
            `}
          </div>
        `).join('')}
      </div>
      
      <div class="add-package-container">
        <button class="add-package-btn">
          <i class="fas fa-plus-circle"></i>
          إضافة باقة جديدة
        </button>
      </div>
    </div>
  `;
};

// Setup subscription page event listeners
export const setupSubscriptionEvents = () => {
  // Back to profile button
  const backToProfileBtn = document.querySelector('.back-to-profile-btn');
  if (backToProfileBtn) {
    backToProfileBtn.addEventListener('click', handleBackToProfile);
  }
  
  // Package details button
  const packageDetailsBtn = document.querySelector('.package-details-btn');
  if (packageDetailsBtn) {
    packageDetailsBtn.addEventListener('click', handleViewPackageDetails);
  }
  
  // Change group buttons
  const changeGroupBtns = document.querySelectorAll('.change-group-btn');
  if (changeGroupBtns && changeGroupBtns.length > 0) {
    changeGroupBtns.forEach(btn => {
      btn.addEventListener('click', handleChangeGroup);
    });
  }
  
  // Cancel subscription buttons
  const cancelSubscriptionBtns = document.querySelectorAll('.cancel-subscription-compact-btn');
  if (cancelSubscriptionBtns.length > 0) {
    cancelSubscriptionBtns.forEach(btn => {
      btn.addEventListener('click', handleCancelSubscription);
    });
  }
  
  // Extend trial buttons
  const extendTrialBtns = document.querySelectorAll('.extend-trial-btn');
  if (extendTrialBtns.length > 0) {
    extendTrialBtns.forEach(btn => {
      btn.addEventListener('click', handleExtendTrial);
    });
  }
  
  // Renew subscription buttons
  const renewSubscriptionBtns = document.querySelectorAll('.renew-subscription-btn');
  if (renewSubscriptionBtns.length > 0) {
    renewSubscriptionBtns.forEach(btn => {
      btn.addEventListener('click', handleRenewSubscription);
    });
  }
  
  // Add package button
  const addPackageBtn = document.querySelector('.add-package-btn');
  if (addPackageBtn) {
    addPackageBtn.addEventListener('click', handleAddPackage);
  }
};

// Handle back to profile button click
const handleBackToProfile = () => {
  setCurrentPage('profile');
  showPage('profile');
};

// Handle view package details
const handleViewPackageDetails = () => {
  // In a real app, we would open the package details page
  // For now, we'll just show a notification
  showNotification('سيتم توفير تفاصيل الباقات قريباً', 'قريباً', 'info');
};

// Handle change group button click
const handleChangeGroup = (e) => {
  const btn = e.currentTarget;
  const subscriptionId = btn.getAttribute('data-id');
  
  // Show group selection modal
  showGroupSelectionModal(subscriptionId);
};

// Handle cancel subscription button click
const handleCancelSubscription = (e) => {
  const btn = e.currentTarget;
  const subscriptionId = btn.getAttribute('data-id');
  
  // Show cancel confirmation modal
  showCancelConfirmationModal(subscriptionId);
};

// Handle extend trial button click
const handleExtendTrial = (e) => {
  const btn = e.currentTarget;
  const subscriptionId = btn.getAttribute('data-id');
  
  // Show success notification
  showNotification('تم إرسال طلب تمديد الفترة التجريبية بنجاح، سنقوم بالرد عليك قريباً', 'تم الإرسال', 'success');
};

// Handle renew subscription button click
const handleRenewSubscription = (e) => {
  const btn = e.currentTarget;
  const subscriptionId = btn.getAttribute('data-id');
  
  // Redirect to packages page
  setCurrentPage('packages');
  showPage('packages');
};

// Handle add package button click
const handleAddPackage = () => {
  setCurrentPage('packages');
  showPage('packages');
};

// Show group selection modal
const showGroupSelectionModal = (subscriptionId) => {
  // Define groups
  const groups = [
    { id: 1, name: 'المجموعة الأولى', time: 'من 3:00 عصراً إلى 5:00 مساءً' },
    { id: 2, name: 'المجموعة الثانية', time: 'من 5:30 مساءً إلى 7:30 مساءً' },
    { id: 3, name: 'المجموعة الثالثة', time: 'من 8:00 مساءً إلى 10:00 مساءً' },
    { id: 4, name: 'المجموعة الرابعة', time: 'من 10:00 مساءً إلى 11:30 مساءً' }
  ];
  
  // Remove any existing modal
  const existingModal = document.querySelector('.group-selection-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  // Create modal HTML
  const modalHTML = `
    <div class="modal-overlay group-selection-modal">
      <div class="modal-container">
        <div class="modal-close">
          <i class="fas fa-times"></i>
        </div>
        <div class="modal-header">
          <h3>تغيير المجموعة</h3>
          <p>اختر المجموعة الجديدة المناسبة</p>
        </div>
        
        <div class="group-options">
          ${groups.map((group, index) => `
            <div class="group-option">
              <input type="radio" name="group-radio" id="modal-group-${group.id}" class="group-radio" value="${group.id}" ${index === 0 ? 'checked' : ''}>
              <label for="modal-group-${group.id}" class="group-label">
                <div class="group-name">${group.name}</div>
                <div class="group-time">${group.time}</div>
              </label>
            </div>
          `).join('')}
        </div>
        
        <div class="modal-footer">
          <button class="confirm-group-btn">تأكيد التغيير</button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Show modal
  setTimeout(() => {
    const modal = document.querySelector('.group-selection-modal');
    if (modal) {
      modal.classList.add('active');
      
      // Modal entrance animation
      const modalContainer = modal.querySelector('.modal-container');
      modalContainer.classList.add('modal-enter');
      setTimeout(() => {
        modalContainer.classList.remove('modal-enter');
      }, 500);
      
      // Close button event
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          closeModal(modal);
        });
      }
      
      // Close when clicking on overlay
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
      
      // Confirm button event
      const confirmBtn = modal.querySelector('.confirm-group-btn');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          const selectedGroupRadio = modal.querySelector('input[name="group-radio"]:checked');
          let selectedGroupId = 1;
          
          if (selectedGroupRadio) {
            selectedGroupId = parseInt(selectedGroupRadio.value);
          }
          
          // Get group name
          const selectedGroup = groups.find(g => g.id === selectedGroupId);
          
          // Update the group info in the UI
          const subscriptionCard = document.querySelector(`.subscription-compact-card[data-id="${subscriptionId}"]`);
          if (subscriptionCard) {
            const groupNameEl = subscriptionCard.querySelector('.group-info-value');
            const groupTimeEl = subscriptionCard.querySelector('.group-info-time');
            
            if (groupNameEl && groupTimeEl && selectedGroup) {
              groupNameEl.textContent = selectedGroup.name;
              groupTimeEl.textContent = selectedGroup.time;
              
              // Add a highlight effect to show the change
              groupNameEl.classList.add('highlight-change');
              groupTimeEl.classList.add('highlight-change');
              
              setTimeout(() => {
                groupNameEl.classList.remove('highlight-change');
                groupTimeEl.classList.remove('highlight-change');
              }, 2000);
            }
          }
          
          // Show success notification
          showNotification(
            `تم تغيير المجموعة إلى "${selectedGroup.name}" بنجاح`,
            'تغيير المجموعة',
            'success'
          );
          
          // Close modal
          closeModal(modal);
        });
      }
    }
  }, 10);
};

// Show cancel confirmation modal
const showCancelConfirmationModal = (subscriptionId) => {
  // Create modal HTML
  const modalHTML = `
    <div class="modal-overlay cancel-confirm-modal">
      <div class="modal-container">
        <div class="modal-close">
          <i class="fas fa-times"></i>
        </div>
        <div class="modal-header">
          <div class="warning-icon">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <h3>إلغاء الاشتراك</h3>
        </div>
        <div class="modal-body">
          <p>هل أنت متأكد من رغبتك في إلغاء الاشتراك؟</p>
          <p class="warning-text">ملاحظة: لن تتمكن من استرداد المبلغ المدفوع في حال الإلغاء.</p>
        </div>
        <div class="modal-footer">
          <button class="cancel-modal-btn">عودة</button>
          <button class="confirm-cancel-btn">تأكيد الإلغاء</button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Show modal
  setTimeout(() => {
    const modal = document.querySelector('.cancel-confirm-modal');
    if (modal) {
      modal.classList.add('active');
      
      // Modal entrance animation
      const modalContainer = modal.querySelector('.modal-container');
      modalContainer.classList.add('modal-enter');
      setTimeout(() => {
        modalContainer.classList.remove('modal-enter');
      }, 500);
      
      // Close button event
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          closeModal(modal);
        });
      }
      
      // Cancel button event
      const cancelBtn = modal.querySelector('.cancel-modal-btn');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          closeModal(modal);
        });
      }
      
      // Close when clicking on overlay
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
      
      // Confirm button event
      const confirmBtn = modal.querySelector('.confirm-cancel-btn');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          // Show success notification
          showNotification(
            'تم إلغاء الاشتراك بنجاح',
            'إلغاء الاشتراك',
            'success'
          );
          
          // Close modal
          closeModal(modal);
          
          // Remove the subscription card from UI
          const subscriptionCard = document.querySelector(`.subscription-compact-card[data-id="${subscriptionId}"]`);
          if (subscriptionCard) {
            subscriptionCard.classList.add('removing');
            setTimeout(() => {
              subscriptionCard.remove();
            }, 300);
          }
        });
      }
    }
  }, 10);
};

// Generic close modal function
const closeModal = (modal) => {
  if (!modal) return;
  
  const modalContainer = modal.querySelector('.modal-container');
  if (modalContainer) {
    modalContainer.classList.add('modal-exit');
  
    setTimeout(() => {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.remove();
      }, 100);
    }, 300);
  }
};