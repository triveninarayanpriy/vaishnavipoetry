#!/usr/bin/env node

/**
 * Deployment Readiness Checker
 * Verifies the app is ready for Vercel Edge deployment
 */

const fs = require('fs');
const path = require('path');

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

function check(name, condition, errorMsg = '') {
  if (condition) {
    checks.passed.push(`✅ ${name}`);
  } else {
    checks.failed.push(`❌ ${name}${errorMsg ? ': ' + errorMsg : ''}`);
  }
}

function warn(name, message = '') {
  checks.warnings.push(`⚠️  ${name}${message ? ': ' + message : ''}`);
}

console.log('🔍 Checking deployment readiness...\n');

// Check key files
check('next.config.ts exists', fs.existsSync('next.config.ts'));
check('package.json exists', fs.existsSync('package.json'));
check('.env.example exists', fs.existsSync('.env.example'));

// Check app structure
check('app/layout.tsx exists', fs.existsSync('app/layout.tsx'));
check('app/page.tsx exists', fs.existsSync('app/page.tsx'));
check('app/poems/page.tsx exists', fs.existsSync('app/poems/page.tsx'));
check('app/poems/[slug]/page.tsx exists', fs.existsSync('app/poems/[slug]/page.tsx'));
check('app/api/poems/route.ts exists', fs.existsSync('app/api/poems/route.ts'));

// Check CMS setup
check('public/admin/config.yml exists', fs.existsSync('public/admin/config.yml'));
check('public/admin/index.html exists', fs.existsSync('public/admin/index.html'));
check('content/poems directory exists', fs.existsSync('content/poems'));

// Check content
const poemsDir = 'content/poems';
if (fs.existsSync(poemsDir)) {
  const poems = fs.readdirSync(poemsDir).filter(f => f.endsWith('.md'));
  check(`Sample poems found (${poems.length})`, poems.length > 0);
}

// Check dependencies
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
check('next installed', pkg.dependencies.next);
check('react installed', pkg.dependencies.react);
check('framer-motion installed', pkg.dependencies['framer-motion']);
check('gray-matter installed', pkg.dependencies['gray-matter']);
check('@supabase/supabase-js installed', pkg.dependencies['@supabase/supabase-js']);

// Check git
check('.git directory exists', fs.existsSync('.git'));

// Check documentation
check('README.md exists', fs.existsSync('README.md'));
check('DEPLOY_VERCEL.md exists', fs.existsSync('DEPLOY_VERCEL.md'));
check('EDGE_RUNTIME.md exists', fs.existsSync('EDGE_RUNTIME.md'));
check('CMS_GUIDE.md exists', fs.existsSync('CMS_GUIDE.md'));
check('GITHUB_OAUTH_SETUP.md exists', fs.existsSync('GITHUB_OAUTH_SETUP.md'));

// Check for common issues
if (fs.existsSync('.env.local')) {
  warn('.env.local found', 'Make sure NOT to commit this file');
}

if (!fs.existsSync('.gitignore')) {
  warn('.gitignore missing', 'May expose sensitive data');
}

// Print results
console.log('\n📋 RESULTS:\n');

if (checks.passed.length > 0) {
  console.log('✅ Passed checks:');
  checks.passed.forEach(check => console.log('  ' + check));
}

if (checks.warnings.length > 0) {
  console.log('\n⚠️  Warnings:');
  checks.warnings.forEach(check => console.log('  ' + check));
}

if (checks.failed.length > 0) {
  console.log('\n❌ Failed checks:');
  checks.failed.forEach(check => console.log('  ' + check));
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`
Passed: ${checks.passed.length}
Warnings: ${checks.warnings.length}
Failed: ${checks.failed.length}
`);

if (checks.failed.length === 0) {
  console.log('🚀 Ready to deploy! Run:');
  console.log('   npm run build');
  console.log('   vercel deploy --prod');
  process.exit(0);
} else {
  console.log('❌ Fix the failed checks before deploying');
  process.exit(1);
}
