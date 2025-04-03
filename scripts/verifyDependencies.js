const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const REQUIRED_VERSIONS = {
  'expo': '~49.0.15',
  'react-native': '0.72.6',
  'react': '18.2.0'
};

function checkAndFixDependencies() {
  const packagePath = path.join(process.cwd(), 'package.json');
  const package = require(packagePath);
  let needsInstall = false;

  Object.entries(REQUIRED_VERSIONS).forEach(([pkg, version]) => {
    if (!package.dependencies[pkg] || package.dependencies[pkg] !== version) {
      console.log(`Fixing ${pkg} version to ${version}`);
      package.dependencies[pkg] = version;
      needsInstall = true;
    }
  });

  if (needsInstall) {
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  } else {
    console.log('All dependencies are correct');
  }
}

checkAndFixDependencies();
