## How to work with Git?

### How to name a branch?

##### `feature/branch-name`

If you are working on a new feature, you should checkout from `dev` branch and name the branch as `feature/branch-name`.\
After finishing your task, merge your current branch into the `dev` branch by creating `pull request`

##### `bugfix/branch-name`

If you are fixing a bug on a development environment, you should checkout from `dev` and name the branch as `bugfix/branch-name`.\
After finishing your bugfix, merge your current branch into the `dev` branch

##### `hotfix/branch-name`

If you are fixing a urgent bug on a production, you should chekout from `main` branch and name the branch as `hotfix/branch-name`\
After finishing your hotfix, merge your current branch into the `staging` branche by creating `pull request`.\
Then test your changes on the `staging` environment, if it's OK, then you must merge changes with `dev` and `main` branches.


### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
