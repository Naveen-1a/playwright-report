const { execSync } = require('child_process');

try {
  execSync('git add ortoni-report', { stdio: 'inherit' });
  execSync('git commit -m "Update report"', { stdio: 'inherit' });
  execSync('git push', { stdio: 'inherit' });

  console.log('✅ Report uploaded');

} catch (error) {
  console.error('❌ Error:', error);
}