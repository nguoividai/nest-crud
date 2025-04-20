export const DatabaseConfig = {
  type: 'mysql' as const,
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test_crud',
  synchronize: false,
  logging: true,
};
