// Profile page functionality
import { getState, setCurrentPage, setWalletBalance, setAuthState, getAuthStates } from '../utils/state.js';
import { showPage, updateWalletDisplay } from '../utils/helpers.js';
import { showNotification } from '../utils/notifications.js';
import { showFriendInvitationModal } from '../utils/modals.js';

// Render profile page HTML
export const renderProfilePage = () => {
  const { walletBalance } = getState();
  
  // Student profile picture URL (replaced with a better quality avatar)
  const studentAvatarUrl = 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png';
  
  return `
    <div id="profile-page" class="profile-page hidden">
      <div class="profile-header">
        <div class="profile-title">الملف الشخصي</div>
        <button class="back-to-home-btn">
          <i class="fas fa-arrow-right"></i>
          <span>العودة للرئيسية</span>
        </button>
      </div>
      
      <div class="student-profile-container">
        <div class="student-avatar-wrapper">
          <img src="${studentAvatarUrl}" alt="صورة الطالب" class="student-avatar" />
          <div class="avatar-edit-btn">
            <i class="fas fa-camera"></i>
          </div>
        </div>
        <h2 class="student-name">أحمد الأحمدي</h2>
        <div class="student-grade">الصف الثالث المتوسط</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">الاسم</label>
        <input type="text" class="form-input" value="احمد الاحمدي" />
      </div>
      
      <div class="form-group">
        <label class="form-label">رقم الجوال</label>
        <div class="custom-phone-input">
          <input type="tel" class="form-input phone-input" value="+966591998000" dir="ltr" />
          <div class="country-flag">
            <img src="https://flagcdn.com/w40/sa.png" alt="SA" />
          </div>
        </div>
      </div>
      
      <div class="subscription-section">
        <div class="section-header">
          <h2>الباقات والاشتراكات</h2>
          <button class="view-details-btn" id="view-subscription-details">
            <i class="fas fa-external-link-alt"></i>
            تفاصيل الباقات
          </button>
        </div>
        
        <div class="subscription-simple-card">
          <div class="subscription-simple-header">
            <div class="subscription-simple-title">باقة التميز</div>
            <div class="subscription-simple-status active">فعّالة</div>
          </div>
          <div class="subscription-simple-dates">
            <div class="simple-date-item">
              <span class="simple-date-label">تاريخ الاشتراك:</span>
              <span class="simple-date-value">6 شوال 1441 هـ</span>
            </div>
            <div class="simple-date-item">
              <span class="simple-date-label">تاريخ الانتهاء:</span>
              <span class="simple-date-value">30 شوال 1441 هـ</span>
            </div>
          </div>
        </div>
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
          <button class="wallet-action-btn add-balance-btn">
            <i class="fas fa-ticket-alt"></i>
            إدخال كود خصم
          </button>
          <button class="wallet-action-btn view-balance-btn">
            <i class="fas fa-wallet"></i>
            تفاصيل الرصيد
          </button>
        </div>
      </div>

      <div class="invite-friend-section">
        <button class="invite-friend-btn">
          <i class="fas fa-user-plus"></i>
          دعوة صديق
        </button>
        <p class="invite-note">احصل على 50 ريال عند انضمام صديق باستخدام رابط الدعوة الخاص بك</p>
      </div>
      
      <button class="logout-btn">
        <i class="fas fa-sign-out-alt"></i>
        تسجيل الخروج
      </button>
    </div>
  `;
};

// Setup profile page event listeners
export const setupProfileEvents = () => {
  // Back to home from profile
  const backToHomeBtn = document.querySelector('.back-to-home-btn');
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', handleBackToHome);
  }
  
  // Wallet action buttons
  const addBalanceBtn = document.querySelector('.add-balance-btn');
  if (addBalanceBtn) {
    addBalanceBtn.addEventListener('click', handleAddBalance);
  }
  
  const viewBalanceBtn = document.querySelector('.view-balance-btn');
  if (viewBalanceBtn) {
    viewBalanceBtn.addEventListener('click', handleViewBalance);
  }
  
  // Invite friend button
  const inviteFriendBtn = document.querySelector('.invite-friend-btn');
  if (inviteFriendBtn) {
    inviteFriendBtn.addEventListener('click', handleInviteFriend);
  }
  
  // Avatar edit button
  const avatarEditBtn = document.querySelector('.avatar-edit-btn');
  if (avatarEditBtn) {
    avatarEditBtn.addEventListener('click', handleAvatarEdit);
  }
  
  // View subscription details button
  const viewSubscriptionDetailsBtn = document.getElementById('view-subscription-details');
  if (viewSubscriptionDetailsBtn) {
    viewSubscriptionDetailsBtn.addEventListener('click', handleViewSubscriptionDetails);
  }
  
  // Logout button
  const logoutBtn = document.querySelector('.logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
};

// Handle back to home button click
const handleBackToHome = () => {
  setCurrentPage('schedule');
  showPage('schedule');
};

// Handle add balance button click
const handleAddBalance = () => {
  // Show coupon redemption modal
  const { walletBalance } = getState();
  showCouponRedemptionModal(walletBalance);
};

// Handle view balance button click
const handleViewBalance = () => {
  setCurrentPage('balance');
  showPage('balance');
};

// Handle view subscription details button click
const handleViewSubscriptionDetails = () => {
  setCurrentPage('subscription');
  showPage('subscription');
};

// Handle invite friend button click
const handleInviteFriend = () => {
  // Show the friend invitation modal instead of using notifications
  showFriendInvitationModal();
};

// Handle avatar edit button click
const handleAvatarEdit = () => {
  showNotification('سيتم إتاحة تغيير الصورة الشخصية قريباً', 'قريباً', 'info');
};

// Handle logout button click
const handleLogout = () => {
  // Confirm logout
  const confirmLogoutModal = `
    <div class="modal-overlay logout-confirm-modal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>تسجيل الخروج</h3>
        </div>
        <div class="modal-body">
          <p>هل أنت متأكد من رغبتك في تسجيل الخروج؟</p>
        </div>
        <div class="modal-actions">
          <button class="cancel-logout-btn">إلغاء</button>
          <button class="confirm-logout-btn">تأكيد</button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', confirmLogoutModal);
  
  // Show modal
  const modal = document.querySelector('.logout-confirm-modal');
  if (modal) {
    modal.classList.add('active');
    
    // Setup event listeners
    // Cancel button
    const cancelBtn = modal.querySelector('.cancel-logout-btn');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
      });
    }
    
    // Confirm button
    const confirmBtn = modal.querySelector('.confirm-logout-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        // Perform logout
        setAuthState(getAuthStates().USER_SELECTION);
        setCurrentPage('login');
        
        // Remove modal
        modal.classList.remove('active');
        setTimeout(() => {
          modal.remove();
          showPage('login');
          showNotification('تم تسجيل الخروج بنجاح', 'تسجيل الخروج', 'success');
        }, 300);
      });
    }
  }
};

// Show coupon redemption modal
const showCouponRedemptionModal = (currentBalance) => {
  // Create modal HTML
  const modalHTML = `
    <div class="modal-overlay payment-modal">
      <div class="modal-container">
        <div class="modal-close">
          <i class="fas fa-times"></i>
        </div>
        <div class="coupon-modal-content">
          <h3>إدخال كود خصم</h3>
          
          <div class="coupon-form">
            <div class="form-group">
              <label>أدخل كود الخصم:</label>
              <input type="text" id="coupon-code" placeholder="مثال: DOLPHIN2025" />
            </div>
            
            <div id="coupon-status" class="coupon-status hidden">
              <div class="coupon-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="coupon-message">
                كود صحيح! سيتم إضافة <span id="coupon-amount">100</span> ريال إلى رصيدك.
              </div>
            </div>
          </div>
          
          <button class="confirm-coupon-btn disabled">تأكيد الكود</button>
        </div>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Show modal with animation
  setTimeout(() => {
    const modal = document.querySelector('.payment-modal');
    if (modal) {
      modal.classList.add('active');
      
      // Modal entrance animation
      const modalContainer = modal.querySelector('.modal-container');
      modalContainer.classList.add('modal-enter');
      setTimeout(() => {
        modalContainer.classList.remove('modal-enter');
      }, 500);
      
      // Setup event listeners
      setupCouponModalEvents(currentBalance);
    }
  }, 10);
};

// Setup coupon modal event listeners
const setupCouponModalEvents = (currentBalance) => {
  const modal = document.querySelector('.payment-modal');
  if (!modal) return;
  
  // Close button
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  
  // Close when clicking on overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Coupon code input
  const couponInput = document.getElementById('coupon-code');
  const couponStatus = document.getElementById('coupon-status');
  const couponAmount = document.getElementById('coupon-amount');
  const confirmBtn = modal.querySelector('.confirm-coupon-btn');
  
  if (couponInput) {
    couponInput.addEventListener('input', () => {
      const code = couponInput.value.trim().toUpperCase();
      
      // Validate coupon code
      if (code) {
        if (code === 'DOLPHIN2025') {
          // Valid coupon
          if (couponStatus) couponStatus.classList.remove('hidden');
          if (couponAmount) couponAmount.textContent = '100';
          if (confirmBtn) confirmBtn.classList.remove('disabled');
        } else if (code === 'STUDENT50') {
          // Another valid coupon
          if (couponStatus) couponStatus.classList.remove('hidden');
          if (couponAmount) couponAmount.textContent = '50';
          if (confirmBtn) confirmBtn.classList.remove('disabled');
        } else if (code === 'WELCOME200') {
          // Another valid coupon
          if (couponStatus) couponStatus.classList.remove('hidden');
          if (couponAmount) couponAmount.textContent = '200';
          if (confirmBtn) confirmBtn.classList.remove('disabled');
        } else {
          // Invalid coupon
          if (couponStatus) couponStatus.classList.add('hidden');
          if (confirmBtn) confirmBtn.classList.add('disabled');
        }
      } else {
        // Empty input
        if (couponStatus) couponStatus.classList.add('hidden');
        if (confirmBtn) confirmBtn.classList.add('disabled');
      }
    });
  }
  
  // Confirm coupon button
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      if (confirmBtn.classList.contains('disabled')) return;
      
      const code = couponInput.value.trim().toUpperCase();
      let amount = 0;
      
      if (code === 'DOLPHIN2025') {
        amount = 100;
      } else if (code === 'STUDENT50') {
        amount = 50;
      } else if (code === 'WELCOME200') {
        amount = 200;
      }
      
      if (amount > 0) {
        // Add amount to balance
        const newBalance = currentBalance + amount;
        setWalletBalance(newBalance);
        updateWalletDisplay(newBalance);
        
        // Show success notification
        showNotification(`تم إضافة ${amount} ريال إلى رصيدك بنجاح`, 'تم إضافة الرصيد', 'success');
        
        // Close modal
        closeModal();
      }
    });
  }
};

// Close modal
const closeModal = () => {
  const modal = document.querySelector('.payment-modal');
  if (modal) {
    const modalContainer = modal.querySelector('.modal-container');
    modalContainer.classList.add('modal-exit');
    
    setTimeout(() => {
      modal.classList.remove('active');
      setTimeout(() => {
        modal.remove();
      }, 100);
    }, 300);
  }
};