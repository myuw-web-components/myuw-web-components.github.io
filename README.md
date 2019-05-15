# MyUW Web Components Github pages

Cross-browser testing provided by:<br/>
<a href="https://www.browserstack.com/"><img width="160" src="https://myuw-web-components.github.io/img/Browserstack-logo.svg" alt="BrowserStack"/></a>

## How to use the site

This site was developed as a proof of concept for a design system (with elements of a style guide, element library, framework, etc.) based on web components that are written in plain HTML, Javascript, and CSS. Some of the things you can do on the site include:

- View best practices and usage guidance for individual components on their respective pages (see hamburger menu)
- Use the home page to turn components off and on, tinker with their customizable features, and generate the code you need to use them (more detailed instructions are included in the site tour and on the home page)
- Test the latest versions of all entries in the @myuw-web-components organization before deciding to adopt them

## Running locally

Ensure you are able to run Jekyll on your command line.
Clone the repository and run the following command from the root directory:

```
bundle exec jekyll serve
```

View the site at http://127.0.0.1:4000/

### Contribution guidelines

Follow these basic rules when contributing to the site:

- Clone the repo and do all your work on a new feature branch
- Submit a merge request comparing the master branch to your feature branch
- If your merge request goes unreviewed for more than a few days, notify a team member (see: [pages/contacts.html](pages/contacts.html))
- Merge your own merge request once it has received at least one approval
- If you are adding a new web component to the site:
    - Include it in the table of components on the home page (see: [index.html](index.html))
    - Create a dialog on the home page to house the interactive/demo content (see: [index.html](index.html))
    - Create a page in the `/pages/` directory and link to it from the side navigation (see: [_includes/header.html](_includes/header.html))
    - Ensure the proper import statements and markup templates are generated during code generation (see: [src/scripts/interactions.js](src/scripts/interactions.js))
