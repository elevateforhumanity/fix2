function readPackage(pkg, context) {
  // Allow build scripts for these packages
  const allowedBuildScripts = [
    'sharp',
    'esbuild',
    '@swc/core',
    'puppeteer',
    'protobufjs',
    '@sentry/cli',
    'core-js',
    'core-js-pure'
  ];

  if (allowedBuildScripts.includes(pkg.name)) {
    context.log(`Allowing build scripts for ${pkg.name}`);
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage
  }
};
