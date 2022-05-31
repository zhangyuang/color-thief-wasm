import { writeFile, readFile } from 'fs/promises'
import { argv } from 'process'
import { resolve } from 'path'
import { execSync } from 'child_process'
import { coerce } from 'semver'
import { execa } from 'execa'
import {cp} from 'shelljs'
const minimist = require('minimist')
const { platform } = minimist(argv)
const revision = execSync('git show --pretty=format:"%B" --no-patch')
  .toString().trim()

  const cwd = process.cwd()
async function publish() {
  if (!platform) {
    throw new Error('Please specify platform by node scripts/publish.js --platform web')
  }
  if (!coerce(revision)) {
    return
  }
  const dir = platform === 'node' ? 'pkg' : `pkg-${platform}`
  if (platform === 'miniprogram') {
    await getMiniProgramFromWeb()
  }
  const publishName = platform === 'node' ? '' : `-${platform}`
  const jsonPath = resolve(cwd, `./${dir}/package.json`)
  const packageContent = require(jsonPath)
  packageContent.name = `${packageContent.name}${publishName}`
  packageContent.version = require('../package.json').version
  await writeFile(jsonPath, JSON.stringify(packageContent, null, 2) + '\n')
  const publicArgs = ['publish', '--access', 'public']
  const pkgCwd = resolve(cwd, `./${dir}`)
  await execa('npm', publicArgs, { stdio: 'inherit', cwd: pkgCwd })
}

async function getMiniProgramFromWeb() {
  const jsonPath = resolve(cwd, './pkg-miniprogram/package.json')
  const packageContent = require(jsonPath)
  const moduleEntry = resolve(cwd, `./pkg-miniprogram/${packageContent.module}`)
  const source = (await readFile(moduleEntry)).toString()
  delete packageContent.files
  cp(resolve(cwd, './scripts/textencoder.js'), resolve(cwd, './pkg-miniprogram'))
  const re = /input(.*)?import\.meta\.url\);/
  const result = re.exec(source)
  let shouldReplace = result ? result?.[0] : ''
  const code = `
  require('./textencoder');
  const TextDecoder = global.TextDecoder;
  const TextEncoder = global.TextEncoder;
  const WebAssembly = WXWebAssembly;
  const fetch = (e) => { return e; };
  ${source.replace(shouldReplace, `// there should be annotated ${shouldReplace}`)}
  `
  await writeFile(jsonPath, JSON.stringify(packageContent, null, 2) + '\n')
  await writeFile(moduleEntry, code)
}


publish().then()