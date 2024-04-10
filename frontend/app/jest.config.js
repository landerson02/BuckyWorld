module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '^next-auth/react$': '<rootDir>/node_modules/next-auth/react/index.js',
    },
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  };