
// Mock user data
interface User {
  id: string;
  email: string;
  name?: string;
}

// Mock authentication state
let currentUser: User | null = null;

// Simulated API delay
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 800));

// Register a new user
export const register = async (email: string, password: string): Promise<User> => {
  await simulateApiDelay();
  
  // In a real app, this would create a user in Firebase or another auth provider
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 15),
    email: email,
  };
  
  currentUser = newUser;
  localStorage.setItem('gloprice_user', JSON.stringify(newUser));
  
  return newUser;
};

// Login user
export const login = async (email: string, password: string): Promise<User> => {
  await simulateApiDelay();
  
  // In a real app, this would validate credentials with Firebase or another auth provider
  // For demo purposes, we'll accept any credentials
  
  const user: User = {
    id: Math.random().toString(36).substring(2, 15),
    email: email,
  };
  
  currentUser = user;
  localStorage.setItem('gloprice_user', JSON.stringify(user));
  
  return user;
};

// Logout user
export const logout = async (): Promise<void> => {
  await simulateApiDelay();
  
  currentUser = null;
  localStorage.removeItem('gloprice_user');
};

// Get current user
export const getCurrentUser = async (): Promise<User | null> => {
  if (currentUser) return currentUser;
  
  // Try to load from localStorage
  const savedUser = localStorage.getItem('gloprice_user');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    return currentUser;
  }
  
  return null;
};

// Check if a user is logged in
export const isLoggedIn = async (): Promise<boolean> => {
  const user = await getCurrentUser();
  return user !== null;
};
