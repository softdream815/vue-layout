BOLD=$(tput bold)
NORMAL=$(tput sgr0)
echo "
████─████─████───██─███─████─███
█──█─█──█─█──█────█─█───█──█──█
████─████─█──█────█─███─█─────█
█────█─█──█──█─█──█─█───█──█──█
█────█─█──████─████─███─████──█


███─█──█─███─███─███─████─█───███─████─████─███─███─████─█──█
─█──██─█──█───█───█──█──█─█────█────██─█──█──█───█──█──█─██─█
─█──█─██──█───█───█──████─█────█───██──████──█───█──█──█─█─██
─█──█──█──█───█───█──█──█─█────█──██───█──█──█───█──█──█─█──█
███─█──█─███──█──███─█──█─███─███─████─█──█──█──███─████─█──█
"

# Удаляем информацию о репозитории проекта vue-project-layout
rm -Rf .git;

# Удаляем папку с документацией
rm -Rf docs

# Очищаем README.md
rm README.md
touch README.md

# Инициализируем git
git init
git add . 
git commit -m "Init project"
git branch -M main
git checkout -b dev
git checkout -b build

# Если есть в параметрах ссылка на github репозитрий - инициализирует удаленный репозиторий  и пушим на github
if [[ $1 ]]; then
  git remote add origin $1

  # Заменить на цикл
  # BRANCHES=("main" "dev" "build")
  # for i in ${!BRANCHES[*]}
  #   do
  #       git push -u origin ${BRANCHES[$i]} 
  #   done
  # fi

  git push -u origin main
  git push -u origin dev
  git push -u origin build
fi

git checkout dev

# Ставим зависимости
yarn;

# Удаляем файл инициализации (этот)
rm -f init-project.sh;
