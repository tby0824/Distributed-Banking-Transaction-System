export const login = (email, password) => {
  console.log('Login:', { email, password });
  return { token: 'mock-token' }; // Mock response
};

export const register = (email, password) => {
  console.log('Register:', { email, password });
  return { token: 'mock-token' }; // Mock response
};