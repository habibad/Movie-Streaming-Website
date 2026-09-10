import { auth } from './src/apps/modules/auth/auth.config.ts';

console.log('Starting direct Better Auth signup test...');

try {
  const result = await auth.api.signUpEmail({
    body: {
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'Pass1234!'
    },
    headers: {
      host: 'localhost:5000',
      'content-type': 'application/json'
    }
  });
  console.log('RESULT', JSON.stringify(result, null, 2));
} catch (error: any) {
  console.error('ERROR_CAUGHT');
  console.error(error);
  console.error('STATUS', error?.status);
  console.error('BODY', JSON.stringify(error?.body ?? null));
  console.error('MESSAGE', error?.message);
  process.exitCode = 1;
}
