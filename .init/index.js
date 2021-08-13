const fsp = require('fs').promises

// https://www.npmjs.com/package/shelljs
const shell = require('shelljs')

// https://www.npmjs.com/package/consola
const consola = require('consola')

// https://www.npmjs.com/package/enquirer#-prompts
const { prompt, Toggle, Input } = require('enquirer')

//~~~~~~~~~~~~~~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~~~~~~~~~~
const dev = true

;(async () => {
  // Удаляем информацию о репозитории проекта vue-project-layout
  shell.exec('rm -Rf .git')

  // Удаляем папку с документацией
  shell.exec('rm -Rf docs')

  // Очищаем README.md и создаем чистый
  shell.exec('rm README.md')
  shell.exec('touch README.md')

  // Удаляем команду init-project из package.json
  const packageJson = require('../package.json')
  delete packageJson.scripts['init-project']

  const projectName = await new Input({
    message: 'Введите название проекта',
  }).run()

  if (projectName) packageJson.name = projectName

  await fsp.writeFile('package.json', JSON.stringify(packageJson))

  // Инициализируем git
  shell.exec('git init')
  shell.exec('git add .')

  // Спрашиваем как юзер хочет назвать первый коммит
  const commit = await prompt({
    type: 'input',
    name: 'name',
    message: 'Как вы хотите назвать первый коммит?',
    initial: 'Init project',
  })
  shell.exec(`git commit -m "${commit.name}"`)
  shell.exec('git branch -M main')
  shell.exec('git checkout -b dev')
  shell.exec('git checkout -b build')

  // Github init
  const githubRepoInit = await new Toggle({
    message: 'Вы хотите инициализировать удаленный репозиторий?',
    enabled: 'Yes',
    disabled: 'No',
  }).run()

  if (githubRepoInit) {
    await initGithubRepo()

    const githubRepoPush = await new Toggle({
      message: 'Вы хотите сделать PUSH данных в удаленный репозиторий?',
      enabled: 'Yes',
      disabled: 'No',
    }).run()

    if (githubRepoPush) githubPush()
  }

  shell.exec('git checkout dev')
})()

// Инициализация репозитория
const initGithubRepo = async () => {
  const githuRepoLink = await new Input({
    message: 'Вставьте cсылку на репозиторий',
  }).run()

  if (!githuRepoLink) return ''

  shell.exec(`git remote add origin ${githuRepoLink}`)

  consola.success(`Репозиторий ${githuRepoLink} инициализирован!`)

  return githuRepoLink
}

// push в удаленный репозиторий
const githubPush = () => {
  const branches = ['main', 'dev', 'build']

  branches.forEach(branch => {
    const resp = shell.exec(`git push -u origin ${branch}`)

    if (resp.code === 128) consola.error(`Ошибка при PUSH в ветку ${branch}`)
  })
}
