// Login page functionality
import { logoImageUrl, boyAvatarUrl } from '../utils/constants.js';
import { 
  getState, 
  setCurrentPage, 
  setAuthState, 
  getAuthStates, 
  setUserType, 
  updateRegistrationData,
  setVerificationCode,
  setWalletBalance 
} from '../utils/state.js';
import { showPage } from '../utils/helpers.js';
import { showNotification } from '../utils/notifications.js';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

// Global variable to store the intl-tel-input instance
let phoneInputInstance = null;

// Render login page HTML
export const renderLoginPage = () => {
  const { authState } = getState();
  const AUTH_STATES = getAuthStates();
  
  switch (authState) {
    case AUTH_STATES.USER_SELECTION:
      return renderUserTypeSelection();
    case AUTH_STATES.PHONE_INPUT:
      return renderPhoneInput();
    case AUTH_STATES.VERIFICATION:
      return renderVerificationCode();
    case AUTH_STATES.REGISTRATION:
      return renderRegistrationForm();
    default:
      return renderUserTypeSelection();
  }
};

// Render user type selection (new or existing user)
const renderUserTypeSelection = () => {
  return `
    <div id="login-page" class="login-page">
      <div class="login-top">
        <div class="logo-container">
          <img src="${logoImageUrl}" alt="شعار التطبيق" />
        </div>
      </div>
      
      <h1 class="login-title">  هلا بيك  </h1>
      
      <div class="user-type-container">
        <div class="user-type-option" id="new-user">
          <div class="user-type-icon">
            <img src="${boyAvatarUrl}" alt="مستخدم جديد" />
            <div class="user-badge new">جديد</div>
          </div>
          <h3>أنا جديد هنا</h3>
          <p>(سوف تحتاج إلى رقم هاتفك)</p>
        </div>
        
        <div class="user-type-option" id="existing-user">
          <div class="user-type-icon">
            <img src="${boyAvatarUrl}" alt="مستخدم حالي" />
          </div>
          <h3>أنا أمتلك حساب</h3>
          <p>(أنت بحاجة إلى تسجيل الدخول)</p>
        </div>
      </div>
      
      <div class="bg-circles">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>
    </div>
  `;
};

// Render phone input form
const renderPhoneInput = () => {
  const { userType } = getState();
  const title = userType === 'new' ? 'إنشاء حساب جديد' : 'تسجيل الدخول';
  
  return `
    <div id="login-page" class="login-page">
      <div class="login-top">
        <div class="logo-container">
          <img src="${logoImageUrl}" alt="شعار التطبيق" />
        </div>
      </div>
      
      <div class="login-back-button" id="back-to-user-selection">
        <i class="fas fa-arrow-right"></i>
      </div>
      
      <h1 class="login-title">${title}</h1>
      
      <div class="phone-input-container">
        <label class="phone-input-label">أدخل رقم جوالك</label>
        <input type="tel" class="phone-input" dir="ltr" />
        <p class="phone-hint">سيتم إرسال رمز التحقق إلى هذا الرقم</p>
        
        <button id="continue-button" class="login-button">متابعة</button>
      </div>
      
      <div class="bg-circles">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>
    </div>
  `;
};

// Render verification code input
const renderVerificationCode = () => {
  const { registrationData } = getState();
  
  return `
    <div id="login-page" class="login-page">
      <div class="login-top">
        <div class="logo-container">
          <img src="${logoImageUrl}" alt="شعار التطبيق" />
        </div>
      </div>
      
      <div class="login-back-button" id="back-to-phone">
        <i class="fas fa-arrow-right"></i>
      </div>
      
      <h1 class="login-title">التحقق من رقم الجوال</h1>
      <p class="verify-subtitle">تم إرسال رمز التحقق إلى الرقم</p>
      <p class="verify-phone">${registrationData.phoneNumber}</p>
      
      <div class="verification-container">
        <div class="verification-code-inputs">
          <input type="number" maxlength="1" class="code-input" data-index="0" pattern="[0-9]*" inputmode="numeric" />
          <input type="number" maxlength="1" class="code-input" data-index="1" pattern="[0-9]*" inputmode="numeric" />
          <input type="number" maxlength="1" class="code-input" data-index="2" pattern="[0-9]*" inputmode="numeric" />
          <input type="number" maxlength="1" class="code-input" data-index="3" pattern="[0-9]*" inputmode="numeric" />
        </div>
        
        <p class="resend-code">
          لم يصلك الرمز؟ <a href="#" id="resend-code-btn">إعادة إرسال</a>
          <span class="countdown" id="resend-countdown"></span>
        </p>
        
        <button id="verify-button" class="login-button" disabled>تحقق</button>
      </div>
      
      <div class="bg-circles">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>
    </div>
  `;
};

// Render registration form for new users
const renderRegistrationForm = () => {
  return `
    <div id="login-page" class="login-page registration-form">
      <div class="login-top">
        <div class="logo-container">
          <img src="${logoImageUrl}" alt="شعار التطبيق" />
        </div>
      </div>
      
      <div class="login-back-button" id="back-to-verification">
        <i class="fas fa-arrow-right"></i>
      </div>
      
      <h1 class="login-title">إكمال التسجيل</h1>
      
      <div class="registration-container">
        <div class="form-group">
          <label class="form-label">الاسم الكامل</label>
          <input type="text" id="reg-name" class="form-input" placeholder="اكتب اسمك الكامل" />
        </div>
        
        <div class="form-group">
          <label class="form-label">الصف الدراسي</label>
          <select id="reg-grade" class="form-input">
            <option value="" disabled selected>اختر الصف الدراسي</option>
            <option value="الصف الأول الابتدائي">الصف الأول الابتدائي</option>
            <option value="الصف الثاني الابتدائي">الصف الثاني الابتدائي</option>
            <option value="الصف الثالث الابتدائي">الصف الثالث الابتدائي</option>
            <option value="الصف الرابع الابتدائي">الصف الرابع الابتدائي</option>
            <option value="الصف الخامس الابتدائي">الصف الخامس الابتدائي</option>
            <option value="الصف السادس الابتدائي">الصف السادس الابتدائي</option>
            <option value="الصف الأول المتوسط">الصف الأول المتوسط</option>
            <option value="الصف الثاني المتوسط">الصف الثاني المتوسط</option>
            <option value="الصف الثالث المتوسط">الصف الثالث المتوسط</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">الرمز السري (6 أرقام)</label>
          <div class="pin-code-container">
            <input type="number" maxlength="1" class="pin-input" data-index="0" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="1" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="2" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="3" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="4" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="5" pattern="[0-9]*" inputmode="numeric" />
          </div>
          <p class="pin-hint">ستحتاج إلى هذا الرمز عند تسجيل الدخول</p>
        </div>
        
        <div class="form-group">
          <label class="form-label">كود الدعوة أو الخصم (اختياري)</label>
          <input type="text" id="reg-code" class="form-input" placeholder="أدخل كود الدعوة أو الخصم إن وجد" />
        </div>
        
        <div id="coupon-info" class="coupon-info hidden">
          <div class="coupon-details">
            <i class="fas fa-tag"></i>
            <div class="coupon-text">
              <h4 id="coupon-title">كود خصم صحيح</h4>
              <p id="coupon-description">تم إضافة <span id="coupon-amount">100</span> ريال إلى المحفظة</p>
            </div>
          </div>
        </div>
        
        <button id="complete-registration" class="login-button">إكمال التسجيل</button>
      </div>
      
      <div class="bg-circles">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>
    </div>
  `;
};

// Setup login page event listeners
export const setupLoginEvents = () => {
  const { authState } = getState();
  const AUTH_STATES = getAuthStates();
  
  switch (authState) {
    case AUTH_STATES.USER_SELECTION:
      setupUserTypeSelection();
      break;
    case AUTH_STATES.PHONE_INPUT:
      setupPhoneInput();
      break;
    case AUTH_STATES.VERIFICATION:
      setupVerificationCode();
      break;
    case AUTH_STATES.REGISTRATION:
      setupRegistrationForm();
      break;
  }
};

// Setup user type selection event listeners
const setupUserTypeSelection = () => {
  const newUserBtn = document.getElementById('new-user');
  const existingUserBtn = document.getElementById('existing-user');
  
  if (newUserBtn) {
    newUserBtn.addEventListener('click', () => {
      setUserType('new');
      setAuthState(getAuthStates().PHONE_INPUT);
      renderApp();
    });
  }
  
  if (existingUserBtn) {
    existingUserBtn.addEventListener('click', () => {
      setUserType('existing');
      setAuthState(getAuthStates().PHONE_INPUT);
      renderApp();
    });
  }
};

// Setup phone input event listeners
const setupPhoneInput = () => {
  // Initialize international phone input
  const phoneInputField = document.querySelector(".phone-input");
  if (phoneInputField) {
    phoneInputInstance = intlTelInput(phoneInputField, {
      preferredCountries: ["sa", "ae", "kw", "bh", "qa", "om"],
      initialCountry: "sa",
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.3.5/js/utils.js",
    });
    
    // Set the appropriate placeholder
    if (phoneInputField) {
      phoneInputField.placeholder = "591998000";
    }
  }
  
  // Back button
  const backBtn = document.getElementById('back-to-user-selection');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      setAuthState(getAuthStates().USER_SELECTION);
      renderApp();
    });
  }
  
  // Continue button
  const continueBtn = document.getElementById('continue-button');
  if (continueBtn) {
    continueBtn.addEventListener('click', () => {
      if (phoneInputField && phoneInputInstance) {
        const phoneNumber = phoneInputInstance.getNumber();
        
        if (phoneInputInstance.isValidNumber()) {
          // Save phone number
          updateRegistrationData({ phoneNumber });
          
          // Move to verification screen
          setAuthState(getAuthStates().VERIFICATION);
          renderApp();
        } else {
          showNotification('يرجى إدخال رقم هاتف صحيح', 'خطأ في الإدخال', 'warning');
        }
      }
    });
  }
};

// Setup verification code event listeners
const setupVerificationCode = () => {
  // Back button
  const backBtn = document.getElementById('back-to-phone');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      setAuthState(getAuthStates().PHONE_INPUT);
      renderApp();
    });
  }
  
  // Code inputs
  const codeInputs = document.querySelectorAll('.code-input');
  
  codeInputs.forEach((input, index) => {
    // Focus on first input initially
    if (index === 0) {
      setTimeout(() => input.focus(), 100);
    }
    
    // Ensure only numbers are allowed
    input.addEventListener('beforeinput', (e) => {
      // Allow only digits
      if (e.data && !/^\d+$/.test(e.data)) {
        e.preventDefault();
      }
      
      // Prevent entering more than one digit
      if (e.data && input.value.length >= 1) {
        e.preventDefault();
        
        // If user tries to enter another digit, move to next input and put the digit there
        const nextIndex = parseInt(input.getAttribute('data-index')) + 1;
        const nextInput = document.querySelector(`.code-input[data-index="${nextIndex}"]`);
        
        if (nextInput && nextInput.value.length < 1) {
          nextInput.value = e.data;
          nextInput.focus();
          updateVerifyButtonState();
        }
      }
    });
    
    // Handle input
    input.addEventListener('input', (e) => {
      // Keep only the first digit
      if (input.value.length > 1) {
        input.value = input.value.substring(0, 1);
      }
      
      // Move to next input when current one is filled
      if (input.value.length === 1) {
        const nextIndex = parseInt(input.getAttribute('data-index')) + 1;
        const nextInput = document.querySelector(`.code-input[data-index="${nextIndex}"]`);
        
        if (nextInput) {
          nextInput.focus();
        }
      }
      
      // Check if all inputs are filled
      updateVerifyButtonState();
    });
    
    // Handle backspace key
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (input.value.length === 0) {
          const prevIndex = parseInt(input.getAttribute('data-index')) - 1;
          const prevInput = document.querySelector(`.code-input[data-index="${prevIndex}"]`);
          
          if (prevInput) {
            prevInput.focus();
            // Optional: Clear the previous input
            // prevInput.value = '';
          }
        } else {
          // If there's content, the default backspace behavior will clear it
          setTimeout(() => {
            if (input.value.length === 0) {
              updateVerifyButtonState();
            }
          }, 10);
        }
      }
    });
    
    // Improved paste event handler for entire code
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedText = (e.clipboardData || window.clipboardData).getData('text').trim();
      
      // Extract only digits from pasted text
      const digitsOnly = pastedText.replace(/\D/g, '');
      
      if (digitsOnly.length > 0) {
        // Fill all inputs with the digits
        codeInputs.forEach((input, i) => {
          if (i < digitsOnly.length && i < 4) {
            input.value = digitsOnly[i];
          } else if (i < 4) {
            input.value = '';
          }
        });
        
        // Focus on the last filled input or the first empty one
        const lastFilledIndex = Math.min(digitsOnly.length, 4) - 1;
        if (lastFilledIndex >= 0 && lastFilledIndex < 4) {
          codeInputs[lastFilledIndex].focus();
          
          // Move cursor to end of input
          const lastInput = codeInputs[lastFilledIndex];
          if (lastInput.value.length > 0) {
            const val = lastInput.value;
            lastInput.value = '';
            lastInput.value = val;
          }
          
          // If all inputs are filled, focus on the last one
          if (lastFilledIndex === 3) {
            codeInputs[3].focus();
          } else if (digitsOnly.length < 4) {
            // Focus on the next empty input
            codeInputs[lastFilledIndex + 1].focus();
          }
        }
        
        updateVerifyButtonState();
      }
    });
  });
  
  // Enable pasting to the entire verification container
  const verificationContainer = document.querySelector('.verification-container');
  if (verificationContainer) {
    verificationContainer.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedText = (e.clipboardData || window.clipboardData).getData('text').trim();
      
      // Extract only digits from pasted text
      const digitsOnly = pastedText.replace(/\D/g, '');
      
      if (digitsOnly.length > 0) {
        // Fill all inputs with the digits
        codeInputs.forEach((input, i) => {
          if (i < digitsOnly.length && i < 4) {
            input.value = digitsOnly[i];
          } else if (i < 4) {
            input.value = '';
          }
        });
        
        // Focus on the appropriate input
        if (digitsOnly.length >= 4) {
          codeInputs[3].focus();
        } else {
          codeInputs[digitsOnly.length - 1].focus();
        }
        
        updateVerifyButtonState();
      }
    });
  }
  
  // Verify button
  const verifyBtn = document.getElementById('verify-button');
  if (verifyBtn) {
    verifyBtn.addEventListener('click', () => {
      const code = Array.from(codeInputs).map(input => input.value).join('');
      setVerificationCode(code);
      
      // Check if it's a new user or existing user
      const { userType } = getState();
      
      if (userType === 'new') {
        setAuthState(getAuthStates().REGISTRATION);
      } else {
        // For existing user, go directly to schedule page
        setAuthState(getAuthStates().AUTHENTICATED);
        setCurrentPage('schedule');
      }
      
      renderApp();
    });
  }
  
  // Resend code button
  const resendBtn = document.getElementById('resend-code-btn');
  if (resendBtn) {
    resendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      startResendCountdown();
      showNotification('تم إعادة إرسال رمز التحقق', 'إرسال الرمز', 'info');
    });
  }
  
  // Start countdown timer
  startResendCountdown();
};

// Setup registration form event listeners
const setupRegistrationForm = () => {
  // Back button
  const backBtn = document.getElementById('back-to-verification');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      setAuthState(getAuthStates().VERIFICATION);
      renderApp();
    });
  }
  
  // PIN inputs
  const pinInputs = document.querySelectorAll('.pin-input');
  
  pinInputs.forEach((input, index) => {
    // Focus on first input initially
    if (index === 0) {
      setTimeout(() => input.focus(), 100);
    }
    
    // Ensure only numbers are allowed
    input.addEventListener('beforeinput', (e) => {
      // Allow only digits
      if (e.data && !/^\d+$/.test(e.data)) {
        e.preventDefault();
      }
      
      // Prevent entering more than one digit
      if (e.data && input.value.length >= 1) {
        e.preventDefault();
        
        // If user tries to enter another digit, move to next input and put the digit there
        const nextIndex = parseInt(input.getAttribute('data-index')) + 1;
        const nextInput = document.querySelector(`.pin-input[data-index="${nextIndex}"]`);
        
        if (nextInput && nextInput.value.length < 1) {
          nextInput.value = e.data;
          nextInput.focus();
        }
      }
    });
    
    // Handle input
    input.addEventListener('input', (e) => {
      // Keep only the first digit
      if (input.value.length > 1) {
        input.value = input.value.substring(0, 1);
      }
      
      // Move to next input when current one is filled
      if (input.value.length === 1) {
        const nextIndex = parseInt(input.getAttribute('data-index')) + 1;
        const nextInput = document.querySelector(`.pin-input[data-index="${nextIndex}"]`);
        
        if (nextInput) {
          nextInput.focus();
        }
      }
    });
    
    // Handle backspace key
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (input.value.length === 0) {
          const prevIndex = parseInt(input.getAttribute('data-index')) - 1;
          const prevInput = document.querySelector(`.pin-input[data-index="${prevIndex}"]`);
          
          if (prevInput) {
            prevInput.focus();
          }
        }
      }
    });
    
    // Improved paste event handler
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pastedText = (e.clipboardData || window.clipboardData).getData('text').trim();
      
      // Extract only digits from pasted text
      const digitsOnly = pastedText.replace(/\D/g, '');
      
      if (digitsOnly.length > 0) {
        // Fill inputs with digits up to the limit of 6
        pinInputs.forEach((input, i) => {
          if (i < digitsOnly.length && i < 6) {
            input.value = digitsOnly[i];
          } else if (i < 6) {
            input.value = '';
          }
        });
        
        // Focus on the appropriate input
        if (digitsOnly.length >= 6) {
          pinInputs[5].focus();
        } else {
          pinInputs[digitsOnly.length - 1].focus();
        }
      }
    });
  });
  
  // Check discount code as user types
  const discountCodeInput = document.getElementById('reg-code');
  if (discountCodeInput) {
    discountCodeInput.addEventListener('input', () => {
      const code = discountCodeInput.value.trim();
      checkDiscountCode(code);
    });
    
    discountCodeInput.addEventListener('blur', () => {
      const code = discountCodeInput.value.trim();
      if (code) {
        checkDiscountCode(code);
      }
    });
  }
  
  // Complete registration button
  const completeRegBtn = document.getElementById('complete-registration');
  if (completeRegBtn) {
    completeRegBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('reg-name');
      const gradeInput = document.getElementById('reg-grade');
      const codeInput = document.getElementById('reg-code');
      
      // Get PIN code from individual inputs
      const pinValues = Array.from(pinInputs).map(input => input.value);
      const pinCode = pinValues.join('');
      
      if (!nameInput.value.trim()) {
        showNotification('يرجى إدخال الاسم الكامل', 'خطأ في الإدخال', 'warning');
        return;
      }
      
      if (!gradeInput.value) {
        showNotification('يرجى اختيار الصف الدراسي', 'خطأ في الإدخال', 'warning');
        return;
      }
      
      if (!pinCode || pinCode.length !== 6) {
        showNotification('يرجى إدخال رمز سري مكون من 6 أرقام', 'خطأ في الإدخال', 'warning');
        return;
      }
      
      // Save registration data
      updateRegistrationData({
        name: nameInput.value.trim(),
        grade: gradeInput.value,
        pin: pinCode,
        invitationCode: codeInput.value.trim()
      });
      
      // Apply discount code if valid
      if (codeInput.value.trim().toUpperCase() === 'DOLPHIN2025') {
        const { walletBalance } = getState();
        setWalletBalance(walletBalance + 100);
      }
      
      // Complete registration and go to packages page
      setAuthState(getAuthStates().AUTHENTICATED);
      setCurrentPage('packages');
      
      renderApp();
      
      showNotification('تم تسجيل حسابك بنجاح', 'تم التسجيل', 'success');
    });
  }
};

// Update verify button state based on code inputs
const updateVerifyButtonState = () => {
  const codeInputs = document.querySelectorAll('.code-input');
  const verifyBtn = document.getElementById('verify-button');
  
  if (verifyBtn) {
    const allFilled = Array.from(codeInputs).every(input => input.value.length > 0);
    verifyBtn.disabled = !allFilled;
  }
};

// Start resend countdown timer
const startResendCountdown = () => {
  const countdownElement = document.getElementById('resend-countdown');
  const resendBtn = document.getElementById('resend-code-btn');
  
  if (countdownElement && resendBtn) {
    let countdown = 30;
    resendBtn.style.display = 'none';
    countdownElement.textContent = `(${countdown} ثانية)`;
    countdownElement.style.display = 'inline';
    
    const interval = setInterval(() => {
      countdown--;
      countdownElement.textContent = `(${countdown} ثانية)`;
      
      if (countdown <= 0) {
        clearInterval(interval);
        countdownElement.style.display = 'none';
        resendBtn.style.display = 'inline';
      }
    }, 1000);
  }
};

// Check discount code
const checkDiscountCode = (code) => {
  const couponInfo = document.getElementById('coupon-info');
  const couponTitle = document.getElementById('coupon-title');
  const couponAmount = document.getElementById('coupon-amount');
  
  if (couponInfo) {
    if (code.toUpperCase() === 'DOLPHIN2025') {
      couponInfo.classList.remove('hidden');
      couponTitle.textContent = 'كود خصم صحيح';
      couponAmount.textContent = '100';
    } else if (code) {
      // Check if this is a regular invite code (not special discount)
      if (code.startsWith('Dolphin') && code.length > 8) {
        couponInfo.classList.remove('hidden');
        couponTitle.textContent = 'كود دعوة صحيح';
        couponAmount.textContent = '50';
      } else {
        couponInfo.classList.add('hidden');
      }
    } else {
      couponInfo.classList.add('hidden');
    }
  }
};

// Function to render the entire app - needed for the login flow updates
const renderApp = () => {
  const { authState } = getState();
  const AUTH_STATES = getAuthStates();
  
  // Render the login page with its current state
  const appDiv = document.querySelector('#app');
  const { currentPage } = getState();
  
  if (authState !== AUTH_STATES.AUTHENTICATED) {
    appDiv.innerHTML = renderLoginPage();
    setupLoginEvents();
  } else {
    // If we're in schedule page but using the external function
    // we need to let the main app.js handle the rendering
    const event = new CustomEvent('authStateChanged', { detail: { authenticated: true } });
    document.dispatchEvent(event);
  }
};

// Handle login button click (legacy function kept for backward compatibility)
const handleLogin = () => {
  const newPage = 'schedule';
  setCurrentPage(newPage);
  showPage(newPage);
};