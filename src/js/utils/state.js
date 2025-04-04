// Application state management

// Authentication states
const AUTH_STATES = {
  USER_SELECTION: 'user_selection',
  PHONE_INPUT: 'phone_input',
  VERIFICATION: 'verification',
  REGISTRATION: 'registration',
  AUTHENTICATED: 'authenticated'
};

// Current auth state
let authState = AUTH_STATES.USER_SELECTION;

// User type (new or existing)
let userType = null; // 'new' or 'existing'

// Registration data
let registrationData = {
  phoneNumber: '',
  name: '',
  grade: '',
  invitationCode: ''
};

// Verification code
let verificationCode = '';

// Current page state
let currentPage = 'login';

// Selected lesson for session page
let selectedLesson = null;

// Current session view (class or practice)
let currentSessionView = 'class';

// Current date selection
let currentDateSelection = 'day';

// Wallet balance
let walletBalance = 500;

// Selected packages
let selectedPackages = [];

// Get current date object
const today = new Date();
let currentDayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.

// Export getters and setters for state
export const getState = () => ({
  currentPage,
  selectedLesson,
  currentSessionView,
  currentDateSelection,
  walletBalance,
  currentDayIndex,
  authState,
  userType,
  registrationData,
  verificationCode,
  selectedPackages
});

// Authentication state management
export const setAuthState = (state) => {
  if (Object.values(AUTH_STATES).includes(state)) {
    authState = state;
  }
  return authState;
};

export const setUserType = (type) => {
  userType = type;
  return userType;
};

export const updateRegistrationData = (data) => {
  registrationData = { ...registrationData, ...data };
  return registrationData;
};

export const setVerificationCode = (code) => {
  verificationCode = code;
  return verificationCode;
};

// Get authentication constants
export const getAuthStates = () => AUTH_STATES;

// Set current page
export const setCurrentPage = (page) => {
  currentPage = page;
  return currentPage;
};

// Set selected lesson
export const setSelectedLesson = (lesson) => {
  selectedLesson = lesson;
  return selectedLesson;
};

// Set current session view
export const setCurrentSessionView = (view) => {
  currentSessionView = view;
  return currentSessionView;
};

// Set current date selection
export const setCurrentDateSelection = (selection) => {
  currentDateSelection = selection;
  return currentDateSelection;
};

// Set wallet balance
export const setWalletBalance = (balance) => {
  walletBalance = balance;
  return walletBalance;
};

// Set current day index
export const setCurrentDayIndex = (index) => {
  currentDayIndex = index;
  return currentDayIndex;
};

// Navigate current day index
export const navigateDay = (direction) => {
  currentDayIndex = (currentDayIndex + direction + 7) % 7;
  return currentDayIndex;
};

// Update selected packages
export const updateSelectedPackages = (packages) => {
  selectedPackages = packages;
  return selectedPackages;
};