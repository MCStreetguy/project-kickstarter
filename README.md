# Project Kickstarter

**is a small tool based on Node.js for managing project blueprints.**

### Installation

via npm: `npm install project-kickstarter -g`

### Usage

After installing the package globally, you can use the following commands in the terminal:

```
kickstarter cmd <options>
```

| cmd | description | options |
|--------|----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| trace | Create a new blueprint and store it locally. | **name** *(required)*: The name of the new blueprint. **path**: The directory where the project files are located, defaults to current directory |
| link | Create a new git-link object and store it locally. | **name** *(required)*: The name of the new git-link. **repo** *(required)*: The link to the git repo (can be https or ssh) |
| list | Lists all available blueprints and git-links. | - |
| remove | Removes a blueprint or git-link. | **name** *(required)*: The name of the blueprint or git-link that should be deleted |
| help | Displays an overview of these commands. | - |

```
kickstart name
```

| description | options |
|-------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Kickstart a new project | **name** *(required)*: The name of the blueprint or git-link. **path**: The directory where the project should be kickstarted, defaults to the current directory. |
