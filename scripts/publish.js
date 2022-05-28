const fs = require('fs')
const { argv } = require('process')
const { resolve } = require('path')
const { coerce } = require('semver')

const minimist = require('minimist')
const { platform } = minimist(argv)
const revision = require('child_process')
  .execSync('git show --pretty=format:"%B" --no-patch')
  .toString().trim()

async function publish() {
  if (!platform) {
    throw new Error('Please specify platform by node scripts/publish.js --platform web')
  }
  if (!coerce(revision)) {
    return
  }
  const dir = platform === 'node' ? 'pkg' : `pkg-${platform}`
  const publishName = platform === 'node' ? '' : `-${platform}`
  const jsonPath = resolve(process.cwd(), `./${dir}/package.json`)
  const package = require(jsonPath)
  package.name = `${package.name}${publishName}`
  package.version = require('../package.json').version
  fs.writeFileSync(jsonPath, JSON.stringify(package, null, 2) + '\n')
  const publicArgs = ['publish', '--access', 'public']
  const cwd = resolve(process.cwd(), `./${dir}`)
  await execa(npm, publicArgs, { stdio: 'inherit', cwd })
}


publish().then()