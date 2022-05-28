import { writeFile } from 'fs/promises'
import { argv } from 'process'
import { resolve } from 'path'
import { execSync } from 'child_process'
import { coerce } from 'semver'
import { execa } from 'execa'
const minimist = require('minimist')
const { platform } = minimist(argv)
const revision = execSync('git show --pretty=format:"%B" --no-patch')
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
  const packageContent = require(jsonPath)
  packageContent.name = `${packageContent.name}${publishName}`
  packageContent.version = require('../package.json').version
  await writeFile(jsonPath, JSON.stringify(packageContent, null, 2) + '\n')
  const publicArgs = ['publish', '--access', 'public']
  const cwd = resolve(process.cwd(), `./${dir}`)
  await execa('npm', publicArgs, { stdio: 'inherit', cwd })
}


publish().then()