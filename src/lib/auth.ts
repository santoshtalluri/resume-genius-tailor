import bcrypt from 'bcryptjs';
import { User, UserWithPassword } from './types';

// Mock database for users (would be replaced with a real database in production)
let users: UserWithPassword[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: '$2a$10$JmRH1z8IbQIx6YRWG1NLEOAFgj76HOh5pTLXMJqQbS4KAFneZVZH2', // 'admin123'
    role: 'admin',
    isApproved: true,
    created: new Date().toISOString()
  },
  {
    id: '2',
    username: 'john_pending',
    email: 'john.pending@example.com',
    password: '$2a$10$JmRH1z8IbQIx6YRWG1NLEOAFgj76HOh5pTLXMJqQbS4KAFneZVZH2', // 'password123'
    role: 'standard',
    isApproved: false,
    created: new Date().toISOString()
  },
  {
    id: '3',
    username: 'jane_standard',
    email: 'jane.standard@example.com',
    password: '$2a$10$JmRH1z8IbQIx6YRWG1NLEOAFgj76HOh5pTLXMJqQbS4KAFneZVZH2', // 'password123'
    role: 'standard',
    isApproved: true,
    created: new Date().toISOString()
  }
];

// Get all users (for admin use)
export const getAllUsers = (): User[] => {
  return users.map(({ password, ...user }) => user);
};

// Get user by email
export const getUserByEmail = (email: string): UserWithPassword | undefined => {
  return users.find(user => user.email === email);
};

// Get user by ID
export const getUserById = (id: string): User | undefined => {
  const user = users.find(user => user.id === id);
  if (!user) return undefined;
  
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Register a new user
export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<User> => {
  // Check if user already exists
  if (getUserByEmail(email)) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser: UserWithPassword = {
    id: String(users.length + 1),
    username,
    email,
    password: hashedPassword,
    role: 'standard',
    isApproved: false, // Requires admin approval
    created: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Verify user credentials
export const verifyCredentials = async (
  email: string,
  password: string
): Promise<User> => {
  const user = getUserByEmail(email);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  if (!user.isApproved) {
    throw new Error('Your account is pending approval');
  }
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Admin functions
export const approveUser = (userId: string): User | undefined => {
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return undefined;
  
  users[userIndex].isApproved = true;
  
  const { password, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

export const rejectUser = (userId: string): boolean => {
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return false;
  
  users = users.filter(user => user.id !== userId);
  return true;
};

export const resetUserPassword = async (
  userId: string,
  newPassword: string
): Promise<User | undefined> => {
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) return undefined;
  
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  users[userIndex].password = hashedPassword;
  
  const { password, ...userWithoutPassword } = users[userIndex];
  return userWithoutPassword;
};

// Emergency auth mode - ONLY FOR DEVELOPMENT - would be removed in production
export const getEmergencyAuthenticatedUser = (): User => {
  const adminUser = users.find(user => user.role === 'admin');
  if (!adminUser) throw new Error('No admin user found');
  
  const { password, ...userWithoutPassword } = adminUser;
  return userWithoutPassword;
};

// User data isolation utilities
export const getUserDataPath = (userId: string): string => {
  return `user_data/${userId}/`;
};

export const validateUserAccess = (
  requestUserId: string,
  resourceUserId: string, 
  userRole: 'admin' | 'standard'
): boolean => {
  // Admins can access any data
  if (userRole === 'admin') return true;
  
  // Standard users can only access their own data
  return requestUserId === resourceUserId;
};

// Create a new user (admin function)
export const createUserByAdmin = async (
  username: string,
  email: string,
  password: string,
  role: 'admin' | 'standard' = 'standard',
  isApproved: boolean = true
): Promise<User> => {
  // Check if user already exists
  if (getUserByEmail(email)) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const newUser: UserWithPassword = {
    id: String(users.length + 1),
    username,
    email,
    password: hashedPassword,
    role,
    isApproved,
    created: new Date().toISOString()
  };
  
  users.push(newUser);
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

// Delete user (admin function)
export const deleteUser = (userId: string): boolean => {
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return false;
  }
  
  users = users.filter(user => user.id !== userId);
  return true;
};
