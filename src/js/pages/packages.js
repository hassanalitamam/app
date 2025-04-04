// Packages selection page functionality
import { getState, setCurrentPage, updateSelectedPackages } from '../utils/state.js';
import { showPage } from '../utils/helpers.js';
import { showNotification } from '../utils/notifications.js';

// Define groups data
const groups = [
  { id: 1, name: 'المجموعة الأولى', time: 'من 3:00 عصراً إلى 5:00 مساءً' },
  { id: 2, name: 'المجموعة الثانية', time: 'من 5:30 مساءً إلى 7:30 مساءً' },
  { id: 3, name: 'المجموعة الثالثة', time: 'من 8:00 مساءً إلى 10:00 مساءً' },
  { id: 4, name: 'المجموعة الرابعة', time: 'من 10:00 مساءً إلى 11:30 مساءً' }
];

// Render packages selection page HTML
export const renderPackagesPage = () => {
  // Define packages data
  const packages = [
    {
      id: 1,
      name: 'باقة التميز الدراسي',
      price: 249,
      period: 'شهر',
      level: 'جميع المراحل من رياض الأطفال إلى ثالث متوسط',
      description: 'مجموعة من المواد الدراسية وفق المنهج السعودي ( رياضيات - انجليزي - لغتي - مهارات رقمية .... )',
      subjects: ['رياضيات', 'اللغة الإنجليزية', 'اللغة العربية', 'مهارات رقمية'],
      weeklyClasses: 2,
      monthlyClasses: 8,
      bestValue: false,
      color: 'blue'
    },
    {
      id: 2,
      name: 'باقة المتفوق',
      price: 349,
      period: 'شهر',
      level: 'جميع المراحل من رياض الأطفال إلى ثالث متوسط',
      description: 'باقة متكاملة تشمل جميع المواد الأساسية مع جلسات تقوية ومتابعة مستمرة',
      subjects: ['رياضيات', 'اللغة الإنجليزية', 'اللغة العربية', 'العلوم', 'مهارات رقمية'],
      weeklyClasses: 3,
      monthlyClasses: 12,
      bestValue: true,
      color: 'green'
    },
    {
      id: 3,
      name: 'باقة الأساسيات',
      price: 149,
      period: 'شهر',
      level: 'جميع المراحل من رياض الأطفال إلى ثالث متوسط',
      description: 'الباقة الأساسية للمواد الرئيسية فقط بسعر مناسب',
      subjects: ['رياضيات', 'اللغة الإنجليزية', 'اللغة العربية'],
      weeklyClasses: 1,
      monthlyClasses: 4,
      bestValue: false,
      color: 'orange'
    }
  ];

  return `
    <div id="packages-page" class="packages-page hidden">
      <div class="packages-header">
        <h1 class="packages-title">اختر الباقة التعليمية المناسبة</h1>
        <p class="packages-subtitle">يمكنك اختيار أكثر من باقة والاستفادة من جميع المزايا</p>
      </div>
      
      <div class="packages-note">
        <i class="fas fa-info-circle"></i>
        <span>ملاحظة: يمكنك تغيير المجموعة لاحقاً إذا أردت</span>
      </div>
      
      <div class="packages-container">
        ${packages.map(pkg => renderPackageCard(pkg)).join('')}
      </div>
      
      <div class="group-selection-container">
        <h3 class="group-selection-title">اختيار المجموعة</h3>
        <p class="group-selection-subtitle">اختر المجموعة المناسبة لجميع الباقات</p>
        
        <div class="group-options-grid">
          ${groups.map((group, index) => `
            <div class="group-option">
              <input type="radio" name="group-selection" id="group-${group.id}" class="group-radio" value="${group.id}" ${index === 0 ? 'checked' : ''}>
              <label for="group-${group.id}" class="group-label">
                <div class="group-name">${group.name}</div>
                <div class="group-time">${group.time}</div>
              </label>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="packages-summary">
        <div class="summary-title">الباقات المختارة: <span id="selected-count">0</span></div>
        <div class="summary-price">المجموع: <span id="total-price">0</span> ريال</div>
        <button id="continue-btn" class="continue-btn" disabled>متابعة الاشتراك</button>
      </div>
    </div>
  `;
};

// Render a single package card
const renderPackageCard = (pkg) => {
  return `
    <div class="package-card" data-id="${pkg.id}">
      ${pkg.bestValue ? `<div class="best-value-badge">أفضل قيمة</div>` : ''}
      <div class="package-header ${pkg.color}">
        <div class="package-name-container">
          <h2 class="package-name">${pkg.name}</h2>
          <div class="package-price"><span class="price-amount">${pkg.price}</span> ريال</div>
          <div class="package-period">${pkg.period} | ${pkg.subjects.length} مواد</div>
        </div>
        <div class="package-checkbox-container">
          <input type="checkbox" id="package-${pkg.id}" class="package-checkbox" data-id="${pkg.id}" data-price="${pkg.price}">
          <label for="package-${pkg.id}" class="package-checkbox-label"></label>
        </div>
      </div>
      
      <div class="package-content">
        <div class="package-description">${pkg.description}</div>
        
        <div class="package-subjects">
          <div class="subjects-title">المواد المشمولة:</div>
          <div class="subjects-list">
            ${pkg.subjects.map(subject => `<div class="subject-tag">${subject}</div>`).join('')}
          </div>
        </div>
        
        <div class="package-sessions">
          <div class="sessions-info">
            <div class="sessions-item">
              <div class="sessions-icon">
                <i class="fas fa-calendar-week"></i>
              </div>
              <div class="sessions-text">
                <span class="sessions-count">${pkg.weeklyClasses}</span>
                <span class="sessions-label">حصص أسبوعية</span>
              </div>
            </div>
            <div class="sessions-item">
              <div class="sessions-icon">
                <i class="fas fa-calendar-alt"></i>
              </div>
              <div class="sessions-text">
                <span class="sessions-count">${pkg.monthlyClasses}</span>
                <span class="sessions-label">حصص شهرية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

// Setup packages page event listeners
export const setupPackagesEvents = () => {
  // Package selection
  const packageCheckboxes = document.querySelectorAll('.package-checkbox');
  packageCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handlePackageSelection);
  });
  
  // Continue button
  const continueBtn = document.getElementById('continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', handleContinue);
  }

  // Group radio buttons
  const groupRadios = document.querySelectorAll('.group-radio');
  if (groupRadios.length > 0) {
    groupRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        const radio = e.currentTarget;
        const label = radio.nextElementSibling;
        if (label) {
          label.classList.add('selected-animation');
          setTimeout(() => {
            label.classList.remove('selected-animation');
          }, 500);
        }
      });
    });
  }
};

// Handle package selection
const handlePackageSelection = () => {
  // Get all selected packages
  const selectedPackages = Array.from(document.querySelectorAll('.package-checkbox:checked'))
    .map(checkbox => ({
      id: parseInt(checkbox.getAttribute('data-id')),
      price: parseInt(checkbox.getAttribute('data-price'))
    }));
  
  // Update state
  updateSelectedPackages(selectedPackages);
  
  // Update UI
  updatePackageSummary(selectedPackages);
};

// Update package summary
const updatePackageSummary = (selectedPackages) => {
  const selectedCountElement = document.getElementById('selected-count');
  const totalPriceElement = document.getElementById('total-price');
  const continueBtn = document.getElementById('continue-btn');
  
  if (selectedCountElement && totalPriceElement && continueBtn) {
    const count = selectedPackages.length;
    const totalPrice = selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0);
    
    selectedCountElement.textContent = count;
    totalPriceElement.textContent = totalPrice;
    
    // Enable/disable continue button
    continueBtn.disabled = count === 0;
  }
};

// Handle continue button click
const handleContinue = () => {
  const { selectedPackages } = getState();
  
  if (selectedPackages.length > 0) {
    // Get selected group
    const selectedGroupRadio = document.querySelector('input[name="group-selection"]:checked');
    let selectedGroupId = 1; // Default group
    
    if (selectedGroupRadio) {
      selectedGroupId = parseInt(selectedGroupRadio.value);
    }
    
    // Get group name and time
    const selectedGroup = groups.find(g => g.id === selectedGroupId);
    
    // For all selected packages, use the same group
    const packagesWithGroup = selectedPackages.map(pkg => ({
      ...pkg,
      groupId: selectedGroupId,
      groupName: selectedGroup ? selectedGroup.name : 'المجموعة الأولى'
    }));
    
    // Calculate total price
    const totalPrice = selectedPackages.reduce((sum, pkg) => sum + pkg.price, 0);
    
    // Show success notification
    showNotification(
      `تم اختيار ${packagesWithGroup.length} باقات في ${selectedGroup.name} بقيمة ${totalPrice} ريال`, 
      'تم الاشتراك بنجاح', 
      'success'
    );
    
    // Redirect to schedule page
    setCurrentPage('schedule');
    showPage('schedule');
  }
};