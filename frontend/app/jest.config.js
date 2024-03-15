module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    },
  };