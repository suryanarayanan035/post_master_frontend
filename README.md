This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

put the following at the end of your $HOMe/.bashrc
cdnvm() {
    command cd "$@" || return $?
    nvm_path="$(nvm_find_up .nvmrc | command tr -d '\n')"

    # If there are no .nvmrc file, use the default nvm version
    if [[ ! $nvm_path = *[^[:space:]]* ]]; then

        declare default_version
        default_version="$(nvm version default)"

        # If there is no default version, set it to `node`
        # This will use the latest version on your machine
        if [ $default_version = 'N/A' ]; then
            nvm alias default node
            default_version=$(nvm version default)
        fi

        # If the current version is not the default version, set it to use the default version
        if [ "$(nvm current)" != "${default_version}" ]; then
            nvm use default
        fi
    elif [[ -s "${nvm_path}/.nvmrc" && -r "${nvm_path}/.nvmrc" ]]; then
        declare nvm_version
        nvm_version=$(<"${nvm_path}"/.nvmrc)

        declare locally_resolved_nvm_version
        # `nvm ls` will check all locally-available versions
        # If there are multiple matching versions, take the latest one
        # Remove the `->` and `*` characters and spaces
        # `locally_resolved_nvm_version` will be `N/A` if no local versions are found
        locally_resolved_nvm_version=$(nvm ls --no-colors "${nvm_version}" | command tail -1 | command tr -d '\->*' | command tr -d '[:space:]')

        # If it is not already installed, install it
        # `nvm install` will implicitly use the newly-installed version
        if [ "${locally_resolved_nvm_version}" = 'N/A' ]; then
            nvm install "${nvm_version}";
        elif [ "$(nvm current)" != "${locally_resolved_nvm_version}" ]; then
            nvm use "${nvm_version}";
        fi
    fi

}

alias cd='cdnvm'
cdnvm "$PWD" || exit

# Good to know

### Start in HTTP

`npm run dev`

### start in HTTPS

`npm run dev --experimental-https`

### Folder Structure

```
├── components.json - used by shadcn
├── tailwind.config.js - Configuration for tailwind
├── deployment.sh - will be adding script to automate deployment here.
├── jsconfig.json - configuration for js
├── next.config.mjs - Configuration for next js
├── package.json - File for maintaining scripts and dependencies
├── package-lock.json - Same as package.json but the version of dependencies will be locked.
├── postcss.config.mjs - Configuration of PostCSS
├── public - folder for assets such as images and clips
├── README.md - This file
├── src - Folder containing actual business logic
    ├── app
    │   ├── components - any custom component that is built will reside here
    │   ├── favicon.ico - favicon file for the site. The icon you see at the title bar
    │   ├── fonts
    │   ├── globals.css - css file containing global variables
    │   ├── layout.js - specifies common layout for the whole application. The layout.js inside each folder will take precedence over this layout.js.
    │   ├── page.js - File for homepage
    │   ├── siteData.js - Contains data about commonly used UI elements such as plans, features and etc.
    │   └── .... other page folders
    ├── components - This folder is used by shadcn
    │   └── ui - This folder will contain the components added from shadcn
    └── lib
        └── utils.js - Used by shadcn

```

# ESLint and prettier setup

eslint-config-airbnb
Prettier and ESLint checks will run on every pre-commit
Unless all the ESLint errors reported in a pre-commit are fixed, changes cannot be pushed to the branch

Additionally, run eslint explicitly using "npm run lint" command

Skip pre-commit checks with the command: git commit -m "commit-message" --no-verify --> \***\*NOT A GOOD PRACTICE\*\*** but can be acceptable in case of very small changes and developer confident about the code to be pushed

DONOT PUSH TO MASTER WITHOUT RUNNING PRE-COMMIT!!!
