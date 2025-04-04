// Modal system utilities

// Create friend invitation modal and append to body if it doesn't exist
export const initializeFriendInvitationModal = () => {
  if (!document.querySelector('.friend-invitation-modal')) {
    const invitationText = `📢 أصدقائي الأعزاء، لدي لكم هدية مميزة! 🎁🐬

لأنكم غاليين عندي، 🤩 أشارككم عرضًا خاصًا مقدمًا من منصة الدلفين التعليمية!

✨ احصل على خصم خاص [20%] عند التسجيل باستخدام كود الدعوة الخاص بي!
🔹 كود الدعوة: Dolphinc271d
🔹 محبكم: حسن

📌 للاستفادة من العرض، اضغطوا على الرابط وسجلوا الآن:
👉 https://app.learnadolphin.com/login/?ref=Dolphinc271d

🎉 لا تفوتوا الفرصة! تعلموا واستمتعوا معي في منصة الدلفين 🚀💙`;

    const inviteLink = 'https://app.learnadolphin.com/login/?ref=Dolphinc271d';
    const inviteCode = 'Dolphinc271d';
    
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-overlay friend-invitation-modal';
    modalContainer.innerHTML = `
      <div class="modal-container">
        <div class="modal-close">
          <i class="fas fa-times"></i>
        </div>
        
        <div class="modal-header">
          <div class="modal-icon-wrapper">
            <div class="modal-icon">
              <i class="fas fa-gift"></i>
            </div>
          </div>
          <h2 class="modal-title">دعوة صديق</h2>
          <p class="modal-subtitle">شارك رابط الدعوة واحصل على مكافآت حصرية</p>
        </div>
        
        <div class="invite-code-container">
          <div class="invite-code-label">كود الدعوة الخاص بك</div>
          <div class="invite-code">${inviteCode}</div>
        </div>
        
        <div class="invitation-link-container">
          <button class="copy-link-btn">
            <i class="fas fa-copy"></i>
            نسخ الرابط
          </button>
          <input type="text" class="invitation-link" value="${inviteLink}" readonly />
        </div>
        
        <div class="share-options">
          <div class="share-title">مشاركة سريعة عبر</div>
          <div class="share-buttons">
            <button class="share-option-btn share-whatsapp" aria-label="مشاركة عبر واتساب">
              <i class="fab fa-whatsapp"></i>
            </button>
            
            <button class="share-option-btn share-telegram" aria-label="مشاركة عبر تليجرام">
              <i class="fab fa-telegram-plane"></i>
            </button>
            
            <button class="share-option-btn share-snapchat" aria-label="مشاركة عبر سناب شات">
              <i class="fab fa-snapchat-ghost"></i>
            </button>
            
            <button class="share-option-btn share-email" aria-label="مشاركة عبر البريد الإلكتروني">
              <i class="fas fa-envelope"></i>
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modalContainer);
    
    // Add event listeners to the modal
    const closeBtn = modalContainer.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      closeFriendInvitationModal();
    });
    
    // Close when clicking on overlay
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        closeFriendInvitationModal();
      }
    });
    
    // Copy link button functionality
    const copyLinkBtn = modalContainer.querySelector('.copy-link-btn');
    copyLinkBtn.addEventListener('click', () => {
      const linkInput = modalContainer.querySelector('.invitation-link');
      linkInput.select();
      document.execCommand('copy');
      
      // Show feedback
      copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
      setTimeout(() => {
        copyLinkBtn.innerHTML = '<i class="fas fa-copy"></i> نسخ الرابط';
      }, 2000);
    });
    
    // Copy invite code on click
    const inviteCodeElement = modalContainer.querySelector('.invite-code');
    if (inviteCodeElement) {
      inviteCodeElement.addEventListener('click', () => {
        const textArea = document.createElement('textarea');
        textArea.value = inviteCode;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        // Show feedback
        const originalContent = inviteCodeElement.innerHTML;
        inviteCodeElement.innerHTML = '<i class="fas fa-check"></i> تم النسخ';
        setTimeout(() => {
          inviteCodeElement.innerHTML = originalContent;
        }, 2000);
      });
    }
    
    // Share options functionality
    const whatsappBtn = modalContainer.querySelector('.share-whatsapp');
    whatsappBtn.addEventListener('click', () => {
      const encodedText = encodeURIComponent(invitationText);
      window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    });
    
    const telegramBtn = modalContainer.querySelector('.share-telegram');
    telegramBtn.addEventListener('click', () => {
      const encodedText = encodeURIComponent(invitationText);
      window.open(`https://t.me/share/url?url=${inviteLink}&text=${encodedText}`, '_blank');
    });
    
    const snapchatBtn = modalContainer.querySelector('.share-snapchat');
    snapchatBtn.addEventListener('click', () => {
      // Try to open Snapchat with deep linking first
      const encodedText = encodeURIComponent(invitationText);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        // Use snapchat deep linking protocol for mobile
        location.href = `snapchat://share?text=${encodedText}`;
        
        // Set a timeout to check if Snapchat opened
        setTimeout(() => {
          // If we're still here after timeout, Snapchat might not be installed
          // Fallback to web share if available
          if (navigator.share) {
            navigator.share({
              title: 'دعوة خاصة لمنصة الدلفين التعليمية',
              text: invitationText,
              url: inviteLink
            }).catch(err => {
              console.log('Error sharing:', err);
              copyToClipboardWithFeedback(invitationText, snapchatBtn);
            });
          } else {
            // If web share API is not available, copy to clipboard
            copyToClipboardWithFeedback(invitationText, snapchatBtn);
          }
        }, 500);
      } else {
        // Try to open Snapchat web
        window.open('https://www.snapchat.com/scan', '_blank');
        
        // Also copy to clipboard for convenience
        copyToClipboardWithFeedback(invitationText, snapchatBtn);
      }
    });
    
    const emailBtn = modalContainer.querySelector('.share-email');
    emailBtn.addEventListener('click', () => {
      const subject = encodeURIComponent('دعوة خاصة لمنصة الدلفين التعليمية');
      const body = encodeURIComponent(invitationText);
      window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    });
  }
};

// Helper function to copy text to clipboard with feedback
function copyToClipboardWithFeedback(text, buttonElement) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  
  // Show tooltip feedback
  showTooltip(buttonElement, 'تم نسخ النص للمشاركة في سناب شات');
}

// Show tooltip for share buttons
function showTooltip(element, message) {
  // Remove any existing tooltips
  const existingTooltip = document.querySelector('.share-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }
  
  // Create tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'share-tooltip';
  tooltip.textContent = message;
  
  // Position tooltip
  const rect = element.getBoundingClientRect();
  tooltip.style.top = `${rect.top - 40}px`;
  tooltip.style.left = `${rect.left + (rect.width / 2)}px`;
  
  // Add to body
  document.body.appendChild(tooltip);
  
  // Remove after delay
  setTimeout(() => {
    tooltip.classList.add('hide');
    setTimeout(() => {
      tooltip.remove();
    }, 300);
  }, 2000);
}

// Show friend invitation modal
export const showFriendInvitationModal = () => {
  const modal = document.querySelector('.friend-invitation-modal');
  if (modal) {
    modal.classList.add('active');
    
    // Add entrance animation
    const modalContainer = modal.querySelector('.modal-container');
    modalContainer.classList.add('modal-enter');
    setTimeout(() => {
      modalContainer.classList.remove('modal-enter');
    }, 500);
  }
};

// Close friend invitation modal
export const closeFriendInvitationModal = () => {
  const modal = document.querySelector('.friend-invitation-modal');
  if (modal) {
    const modalContainer = modal.querySelector('.modal-container');
    modalContainer.classList.add('modal-exit');
    
    setTimeout(() => {
      modal.classList.remove('active');
      modalContainer.classList.remove('modal-exit');
    }, 300);
  }
};