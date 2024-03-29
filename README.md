# TaskManager

## Requirements
* Node.js >= 18
* npm >= 10.2.3

## Useful commands
* serve: ```npx nx serve task-manager```
* e2e: ```npx playwright install && npx nx run  task-manager-e2e:e2e```
* test: ```npx nx run-many --target=test```
* lint: ```npx nx run-many --target=lint```
* build: ```npx nx build task-manager``` (add --prod for production build)


## Features
This app allows you to manage your tasks. You can add, remove and mark tasks as completed.
This app use the following technologies:
* **Angular**: A platform and framework for building single-page client applications
* **Nx**: Extensible Dev Tools for Monorepos
* **Nx Cache**: A distributed cache for Nx
* **TailwindCSS**: A utility-first CSS framework
* **Playwright**: A browser automation library
* **Jest**: Delightful JavaScript Testing
* **NgRx**: Reactive State for Angular
* **ESLint**: Find and fix problems in your typescript code
* **Husky**: Git hooks made easy

## Start the application

Run `npx nx serve task-manager` to start the development server. Happy coding!

## Build for production

Run `npx nx build task-manager` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).


## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.
