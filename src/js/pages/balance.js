// Balance details page functionality
import { getState, setCurrentPage, setWalletBalance } from '../utils/state.js';
import { showPage, updateWalletDisplay } from '../utils/helpers.js';
import { showNotification } from '../utils/notifications.js';

// Render balance details page HTML
export const renderBalanceDetailsPage = () => {
  const { walletBalance } = getState();
  
  // Mock transaction history data
  const transactions = [
    { id: 1, date: '2023-12-15', amount: 100, type: 'deposit', description: 'إضافة كوبون خصم' },
    { id: 2, date: '2023-12-10', amount: -50, type: 'withdrawal', description: 'رسوم الاشتراك الشهري' },
    { id: 3, date: '2023-11-28', amount: 50, type: 'deposit', description: 'مكافأة دعوة صديق' },
    { id: 4, date: '2023-11-20', amount: 200, type: 'deposit', description: 'إضافة كوبون خصم' },
    { id: 5, date: '2023-11-15', amount: -50, type: 'withdrawal', description: 'رسوم الاشتراك الشهري' },
    { id: 6, date: '2023-11-01', amount: 500, type: 'deposit', description: 'إضافة كوبون خصم أولي' },
  ];
  
  // Calculate totals
  const addedBalance = transactions
    .filter(t => t.type === 'deposit')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const spentBalance = transactions
    .filter(t => t.type === 'withdrawal')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  return `
    <div id="balance-page" class="balance-page hidden">
      <div class="balance-header">
        <div class="balance-title">تفاصيل الرصيد</div>
        <button class="back-to-home-btn">
          <i class="fas fa-arrow-right"></i>
          <span>العودة للرئيسية</span>
        </button>
      </div>
      
      <div class="balance-summary-card">
        <div class="balance-summary-header">
          <h2>رصيد المحفظة</h2>
          <div class="balance-summary-amount">${walletBalance} ريال</div>
        </div>
        
        <div class="balance-actions">
          <button class="balance-action-btn coupon-btn">
            <i class="fas fa-ticket-alt"></i>
            إضافة كوبون خصم
          </button>
        </div>
      </div>
      
      <div class="balance-statistics">
        <div class="stat-card income">
          <div class="stat-icon">
            <i class="fas fa-arrow-down"></i>
          </div>
          <div class="stat-details">
            <div class="stat-title">الرصيد المضاف</div>
            <div class="stat-value">${addedBalance} ريال</div>
          </div>
        </div>
        
        <div class="stat-card expenses">
          <div class="stat-icon">
            <i class="fas fa-arrow-up"></i>
          </div>
          <div class="stat-details">
            <div class="stat-title">الرصيد المصروف</div>
            <div class="stat-value">${spentBalance} ريال</div>
          </div>
        </div>
      </div>
      
      <div class="transactions-section">
        <h3 class="section-title">سجل المعاملات</h3>
        
        <div class="transactions-list">
          ${transactions.map(transaction => {
            const isDeposit = transaction.type === 'deposit';
            const amountClass = isDeposit ? 'transaction-amount deposit' : 'transaction-amount withdrawal';
            const amountPrefix = isDeposit ? '+' : '';
            const formattedDate = new Date(transaction.date).toLocaleDateString('ar-SA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            return `
              <div class="transaction-item">
                <div class="transaction-icon ${transaction.type}">
                  <i class="fas fa-${isDeposit ? 'arrow-down' : 'arrow-up'}"></i>
                </div>
                <div class="transaction-details">
                  <div class="transaction-title">${transaction.description}</div>
                  <div class="transaction-date">${formattedDate}</div>
                </div>
                <div class="${amountClass}">${amountPrefix}${Math.abs(transaction.amount)} ريال</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
};

// Setup balance details page event listeners
export const setupBalanceDetailsEvents = () => {
  // Back to home button
  const backToHomeBtn = document.querySelector('.balance-page .back-to-home-btn');
  if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', handleBackToHome);
  }
  
  // Coupon button
  const couponBtn = document.querySelector('.balance-page .coupon-btn');
  if (couponBtn) {
    couponBtn.addEventListener('click', handleCouponRedemption);
  }
};

// Handle back to home button click
const handleBackToHome = () => {
  setCurrentPage('profile');
  showPage('profile');
};

// Handle coupon redemption
const handleCouponRedemption = () => {
  showCouponModal();
};

// Show coupon redemption modal
const showCouponModal = () => {
  // Remove any existing modal first to prevent duplicates
  const existingModal = document.querySelector('.payment-modal');
  if (existingModal) {
    existingModal.remove();
  }
  
  const modalHTML = `
    <div class="coupon-modal-content">
      <h3>إضافة كوبون خصم</h3>
      
      <div class="coupon-form">
        <div class="form-group">
          <label>أدخل كود الكوبون:</label>
          <input type="text" id="coupon-code" placeholder="مثال: DOLPHIN2025" />
        </div>
        
        <div id="coupon-status" class="coupon-status hidden">
          <div class="coupon-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="coupon-message">
            كوبون صحيح! سيتم إضافة <span id="coupon-amount">100</span> ريال إلى رصيدك.
          </div>
        </div>
      </div>
      
      <button class="confirm-coupon-btn disabled">تأكيد الكوبون</button>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-overlay payment-modal">
      <div class="modal-container">
        <div class="modal-close">
          <i class="fas fa-times"></i>
        </div>
        ${modalHTML}
      </div>
    </div>
  `);
  
  // Show modal
  setTimeout(() => {
    const modal = document.querySelector('.payment-modal');
    if (modal) {
      modal.classList.add('active');
      const modalContainer = modal.querySelector('.modal-container');
      modalContainer.classList.add('modal-enter');
      setTimeout(() => {
        modalContainer.classList.remove('modal-enter');
      }, 500);
      
      // Setup event listeners
      setupCouponModalEvents();
    }
  }, 10);
};

// Setup coupon modal event listeners
const setupCouponModalEvents = () => {
  const modal = document.querySelector('.payment-modal');
  if (!modal) return;
  
  // Close button
  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closePaymentModal);
  }
  
  // Close when clicking on overlay
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closePaymentModal();
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
        applyCoupon(code, amount);
        closePaymentModal();
      }
    });
  }
};

// Close payment modal
const closePaymentModal = () => {
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

// Apply coupon
const applyCoupon = (code, amount) => {
  // For demo, just add to wallet balance
  const { walletBalance } = getState();
  const updatedBalance = walletBalance + amount;
  
  // Update state
  setWalletBalance(updatedBalance);
  
  // Update UI
  updateWalletDisplay(updatedBalance);
  
  // Show success notification
  showNotification(`تم إضافة ${amount} ريال إلى رصيدك بنجاح من كوبون ${code}`, 'تفعيل الكوبون', 'success');
  
  // Reload balance page to reflect changes
  const balancePage = document.getElementById('balance-page');
  if (balancePage) {
    balancePage.innerHTML = renderBalanceDetailsPage().replace('<div id="balance-page" class="balance-page hidden">', '<div id="balance-page" class="balance-page">');
    setupBalanceDetailsEvents();
  }
};