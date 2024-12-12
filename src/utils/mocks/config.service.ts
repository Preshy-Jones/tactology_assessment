export const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_EXPIRATION':
        return '12000';
      case 'JWT_SECRET':
        return 'secret';
    }
  },
};
