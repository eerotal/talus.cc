# talus.cc - Portfolio website

This repository contains the source code for my portfolio website at
[talus.cc](https://talus.cc). Key technologies used in the website are:

- Pug (https://pugjs.org)
- TailwindCSS (https://tailwindcss.com/)
- PostCSS (https://postcss.org/)
- Gulp.js (/https://gulpjs.com/)
- NPM (https://www.npmjs.com/)

The website is served with Caddy running in a Docker Swarm cluster. However, the
server configuration is not included in this repository for security reasons.

## Repository structure

The repository structure is outlined below:

```
.
├── src                  # Source files
│   ├── assets             # Assets, images, etc.
│   ├── css                # CSS stylesheets
│   ├── gallery            # Gallery images
│   ├── index.pug          # Index page pug template
│   └── templates          # Pug templates
├── gulpfile.js          # Gulp.js configuration file
├── package.json         # NPM configuration file
├── package-lock.json    # NPM configuration file (locked)
├── postcss.config.js    # PostCSS configuration file
├── pug-locals.js        # Pug configuration file
├── README.md            # This readme
└── tailwind.config.js   # TailwindCSS configuration file
```

## Copyright

Copyright 2021 Eero Talus

All rights reserved
