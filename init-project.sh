# Удаляем информацию о репозитории проекта vue-project-layout
rm -Rf .git;

# Удаляем папку с документацией
rm -Rf docs

# Очищаем README.md
rm README.md
touch README.md

# Инициализируем git
git init;
git add . ;
git commit -m "Init project";
git branch -M main;

# Если есть в параметрах ссылка на github репозитрий - инициализирует удаленный репозиторий  и пушим на github
if [[ $1 ]]; then
  git remote add origin $1
  git push -u origin main
fi

# Ставим зависимости
yarn;

# Удаляем файл инициализации (этот)
rm -f init-project.sh;
