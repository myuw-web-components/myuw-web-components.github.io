/* Initial properties */
this.includedComponents = ['drawer', 'search', 'profile'];

this.searchCallbackCode = `\ndocument.getElementById('search').callback = (value) => {\n\twindow.alert('You searched for: ' + value);\n}\n\n`;

// Code generation templates
this.appBarTemplateStart = `&lt;myuw-app-bar
    theme-name="MyUW"
    app-name="Web Components" 
    app-url=""&gt;`;

this.appBarTemplateEnd = `&lt;/myuw-app-bar&gt;`;

this.drawerTemplateStart = `&lt;myuw-drawer slot="myuw-navigation"&gt;`
this.drawerLinkTemplate = `&lt;myuw-drawer-link
            slot="myuw-drawer-links"
            name=""
            icon=""
            href=""&gt;
        &lt;/myuw-drawer-link&gt;`;

this.drawerTemplateEnd = `&lt;/myuw-drawer&gt`;

this.searchTemplate = `&lt;myuw-search
        input-label="Search"
        button-label="Submit search"
        icon="search"
        slot="myuw-search"&gt;
    &lt;/myuw-search&gt;`;

this.profileTemplate = `&lt;myuw-profile
        slot="myuw-profile"
        session-endpoint=""
        login-url=""
        logout-url=""&gt;
        &lt;a href="" slot="nav-item"&gt;&lt;/a&gt;
    &lt;/myuw-profile&gt;`;

this.customCssTemplate = `&#47;&#42; You didn't change any theme colors &#42;&#47;`;


/*
    TOP BAR DEMO FUNCTIONS
*/
function updateTitle(e, attribute, newValue) {
    e.preventDefault();
    // Get app bar
    var _appBar = document.getElementsByTagName('myuw-app-bar')[0];
    // Update attribute
    _appBar.setAttribute(attribute, newValue);

    // Get property fields
    var themeText = document.getElementById('themeName');
    var appText = document.getElementById('appName');
    var appUrl = document.getElementById('appUrl');

    // Update template for code generation
    this.appBarTemplateStart = `&lt;myuw-app-bar
    theme-name="${themeName.value}"
    app-name="${appName.value}" 
    app-url="${appUrl.value}"&gt;`;
}
function updateBarBackground(e, property, value) {
    e.preventDefault();
    this.customCssTemplate = `
myuw-app-bar {
    --${property}: ${value};
}
    `;
    var newCss = document.createElement('style');
    newCss.innerHTML = this.customCssTemplate;
    document.head.appendChild(newCss);
}
function updateTheme(theme) {
    document.body.className = theme;
}
/*
    NAV DRAWER DEMO FUNCTIONS
*/
function addDrawerLink(label, url, icon) {
    // Get form elements
    var linkText = document.getElementById('navItemLabel');
    var linkUrl = document.getElementById('navItemHref');
    var linkIcon = document.getElementById('navItemIcon');
    
    // Update template for code generation
    this.drawerLinkTemplate = `&lt;myuw-drawer-link
            slot="myuw-drawer-links"
            name="${linkText.value}"
            icon="${linkIcon.value}"
            href="${linkUrl.value}"&gt;
        &lt;/myuw-drawer-link&gt;`;
    
    // Update demo drawer
    var newLink = document.createElement('myuw-drawer-link');
    newLink.setAttribute('slot', 'myuw-drawer-links');
    newLink.setAttribute('name', linkText.value);
    newLink.setAttribute('icon', linkIcon.value);
    newLink.setAttribute('href', linkUrl.value);

    document.getElementById('drawer').appendChild(newLink);

    // Reset fields and update helper text
    document.getElementById('drawerHelperText').innerText = `Added "${linkText.value}"`;
    document.getElementById('navItemLabel').value = "";
    document.getElementById('navItemHref').value = "";
    document.getElementById('navItemIcon').value = "";
}

/*
    SEARCH BAR DEMO FUNCTIONS
*/
// Set up code demo
document.getElementById('searchCallbackCode').innerText = this.searchCallbackCode;
// Set up initial callback
document.getElementById('search').callback = (value) => {
    window.alert('You searched for: ' + value);
}

function updateSearchBar() {
    // Get all elements
    var searchBar = document.getElementsByTagName('myuw-search')[0];
    var ariaLabel = document.getElementById('searchAriaLabel');
    var placeholder = document.getElementById('searchPlaceholder');
    var icon = document.getElementById('searchIcon');

    // Update search template for code generation
    this.searchTemplate = `&lt;myuw-search id="search" 
        input-label="${placeholder.value}"
        button-label="${ariaLabel.value}"
        icon="${icon.value}"
        slot="myuw-search"&gt;
    &lt;/myuw-search&gt;`;

    // Update populated fields
    if (ariaLabel.value) {
        searchBar.setAttribute('button-label', ariaLabel.value);
    }
    if (placeholder.value) {
        searchBar.setAttribute('input-label', placeholder.value);
    }
    if (icon.value) {
        searchBar.setAttribute('icon', icon.value);
    }
}

function updateCallback(value) {
    if (value === 'alert') {
        document.getElementById('search').callback = (value) => {
            window.alert('You searched for: ' + value);
        }
        document.getElementById('searchCallbackCode').innerText = `\ndocument.getElementById('search').callback = (value) => {\n\twindow.alert('You searched for: ' + value);\n}\n\n`;
    } else {
        document.getElementById('search').callback = (value) => {
           document.getElementById('page-title').innerText = value;
        }
        document.getElementById('searchCallbackCode').innerText = `\ndocument.getElementById('search').callback = (value) => {\n\tdocument.getElementById('page-title').innerText = value;\n}\n\n`;
    }
    // Call syntax highlighter
    Prism.highlightElement(document.getElementById('searchCallbackCode'));
}

/*
    PROFILE DEMO FUNCTIONS
*/
function setProfileColor(e, newColor) {
    if (newColor.indexOf('#') < 0) {
        newColor = '#' + newColor;
    }
    document.getElementsByTagName('myuw-profile')[0].setAttribute('background-color', newColor);
}

function setSession(session) {
    // Remove profile from DOM
    document.getElementsByTagName('myuw-profile')[0].remove();
    // Construct new profile template
    var newProfileTemplate = document.createElement('myuw-profile');
    newProfileTemplate.setAttribute('id', 'profile');
    newProfileTemplate.setAttribute('slot', 'myuw-profile');
    newProfileTemplate.setAttribute('login-url', 'https://wisc.edu/');
    newProfileTemplate.setAttribute('logout-url', 'https://wisc.edu/');
    newProfileTemplate.setAttribute('session-endpoint', session);
    newProfileTemplate.setAttribute('color', '#fb686d');
    newProfileTemplate.innerHTML = `
        <a href="https://myuw-web-components.github.io/myuw-profile/" slot="nav-item">Profile demo page</a>
    `;
    // Reinsert into DOM
    document.getElementsByTagName('myuw-app-bar')[0].appendChild(newProfileTemplate);
}

function updateProfileTemplate() {
    // Get all input fields
    var color = document.getElementById('profileColor');
    var login = document.getElementById('loginUrl');
    var logout = document.getElementById('logoutUrl');
    var session = document.getElementById('sessionEndpoint');
    var linkText = document.getElementById('profileLinkLabel');
    var linkUrl = document.getElementById('profileLinkUrl');

    if (!session.value) {
        session.value = '';
    }
    // Update template for code generation
    this.profileTemplate = `&lt;myuw-profile
        slot="myuw-profile"
        session-endpoint="${session.value}"
        login-url="${login.value}"
        logout-url="${logout.value}"&gt;
        &lt;a href="${linkUrl.value}" slot="nav-item"&gt;${linkText.value}&lt;/a&gt;
    &lt;/myuw-profile&gt;`;
    
    // TODO: Print template to page for copy+paste

    // Clear fields and update helper text
    login.value = "";
    logout.value = "";
    session.value = "";
    linkText.value = "";
    linkUrl.value = "";
    document.getElementById('profileHelperText').innerText = 'Updated profile component';
}

/* SHOW/HIDE COMPONENTS */
function toggleComponent(componentId) {
    if (this.includedComponents.indexOf(componentId) != -1) {
        document.getElementById(componentId).hidden = true;
        document.getElementById(componentId + 'IconVisibility').innerText = 'visibility_off';
        document.getElementById(componentId + 'ToggleTooltip').innerText = 'Show ' + componentId;
        this.includedComponents.splice(this.includedComponents.indexOf(componentId), 1);
    } else {
        document.getElementById(componentId).hidden = false;
        document.getElementById(componentId + 'IconVisibility').innerText = 'visibility';
        document.getElementById(componentId + 'ToggleTooltip').innerText = 'Hide ' + componentId;
        this.includedComponents.push(componentId);
    }
}

/**
 * Generate all markup necessary for including myuw-web-components
 * on a page.
 */
function generateComponentMarkup() {
    // Get container elements
    var importsContainer = document.getElementById('generatedModuleImports');
    var templateContainer = document.getElementById('generatedTemplate');
    var cssContainer = document.getElementById('generatedCss');
    var drawerImport = '';
    var searchImport = '';
    var profileImport = '';

    if (this.includedComponents.indexOf('drawer') != -1) {
        drawerImport = '&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-drawer@^1?module"&gt;&lt;/script&gt';
    }
    if (this.includedComponents.indexOf('search') != -1) {
        searchImport = '&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-search@^1?module"&gt;&lt;/script&gt';
    }
    if (this.includedComponents.indexOf('profile') != -1) {
        profileImport = '&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-profile@^1?module"&gt;&lt;/script&gt';
    }

    // Include script tags for all components currently toggled ON
    var importsString = `
&lt;!-- Viewport metage tag (required for cross-browser support) --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;

&lt;!-- Web component polyfill loader (required for cross-browser support) --&gt;
&lt;script src="https://cdn.rawgit.com/webcomponents/webcomponentsjs/webcomponents-bundle.js"&gt;&lt;/script&gt;

&lt!-- UW-Madison app styles (recommended if you're a UW-Madison adopter) --&gt;
&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-app-styles@^1?module"&gt;&lt;/script&gt;

&lt!-- Import selected myuw-web-components --&gt;
&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-app-bar@^1?module"&gt;&lt;/script&gt
${drawerImport}
${searchImport}
${profileImport}
    `;
    
    // Build component template string
    var templateString = `${this.appBarTemplateStart}
    ${this.drawerTemplateStart}
        ${this.drawerLinkTemplate}
    ${this.drawerTemplateEnd}
    ${this.searchTemplate}
    ${this.profileTemplate}
${this.appBarTemplateEnd}
    `;

    // Update DOM and call syntax highlighter
    importsContainer.innerHTML = importsString;
    templateContainer.innerHTML = templateString;
    cssContainer.innerHTML = this.customCssTemplate;
    Prism.highlightElement(importsContainer);
    Prism.highlightElement(templateContainer);
    Prism.highlightElement(cssContainer);
}

/**
 * Copy code to the clipboard
 * @param {string} id ID of the <code> block to copy
 */
function copyMarkup(id) {
    // Get plain text
    var snippet = document.getElementById(id).innerText;
    // Create textarea
    var selection = document.createElement('textarea');
    selection.value = snippet;
    document.body.appendChild(selection);
    // Select and copy
    selection.select();
    document.execCommand('copy');
    // Remove textarea
    document.body.removeChild(selection);
}
