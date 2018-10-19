/* Initial properties */
this.includedComponents = ['nav', 'search', 'profile', 'help'];

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
        login-url=""
        logout-url=""&gt;
        &lt;a href="" slot="nav-item"&gt;&lt;/a&gt;
    &lt;/myuw-profile&gt;`;

this.helpTemplate = `&lt;myuw-help
        slot="myuw-help"
        myuw-help-title="Need more help?"
        show-button&gt;
        &lt;div slot="myuw-help-content"&gt;&lt;/div&gt;
    &lt;/myuw-help&gt;`;

this.customCssTemplate = `&#47;&#42; You didn't change any theme colors &#42;&#47;`;

this.customJsTemplate = profileJs = `\nvar profileLoginEvent = new CustomEvent('myuw-login', {\n\tdetail: {\n\t\tperson: {\n\t\t\tfirstName: "Bucky" // Name you want to pass to the component\n\t\t}\n\t}\n});\ndocument.dispatchEvent(profileLoginEvent);\n`;


/*
    THEME DEMO
*/
function toggleTheme() {
    var themeTooltip = document.getElementById('alternateThemeName');
    if (document.body.classList.contains('uw-madison-white-theme')) {
        document.body.classList.remove('uw-madison-white-theme');
        themeTooltip.innerText = 'MyUW White';
    } else {
        document.body.classList.add('uw-madison-white-theme');
        themeTooltip.innerText = 'MyUW Red';
    }
}
/*
    TOP BAR DEMO FUNCTIONS
*/
function updateTopAppBar(e) {
    e.preventDefault();

    // Get app bar
    var _appBar = document.getElementsByTagName('myuw-app-bar')[0];
    
    // Get property fields
    var themeText = document.getElementById('themeName');
    var appText = document.getElementById('appName');
    var appUrl = document.getElementById('appUrl');
    var barBackground = document.getElementById('barBackground');
    
    // Update attributes
    _appBar.setAttribute('theme-name', themeText.value);
    _appBar.setAttribute('app-name', appText.value);
    _appBar.setAttribute('app-url', appUrl.value);

    // Update template for code generation
    this.appBarTemplateStart = `&lt;myuw-app-bar
    theme-name="${themeName.value}"
    app-name="${appName.value}" 
    app-url="${appUrl.value}"&gt;`;

    // If value was entered for background, create and use custom css template
    if (barBackground.value.length > 0) {
        this.customCssTemplate = `
myuw-app-bar {
    --myuw-primary-bg: ${barBackground.value};
}
    `;
    var newCss = document.createElement('style');
    newCss.innerHTML = this.customCssTemplate;
    document.head.appendChild(newCss);
    }
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

    document.getElementById('nav').appendChild(newLink);

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

function noSession() {
  var initProfile = new CustomEvent('myuw-login', {
    detail: {}
  });
  document.dispatchEvent(initProfile);
}

function setSession(name) {
  var sessionEvent;
  if (name) {
    sessionEvent = new CustomEvent('myuw-login', {
      detail: {
        person: {
          "firstName": name
        }
      }
    });
  } else {
    sessionEvent = new CustomEvent('myuw-login', {
      detail: {
        person: {}
      }
    });
  }
  document.dispatchEvent(sessionEvent);
}

function updateProfileTemplate() {
    // Get all input fields
    var color = document.getElementById('profileColor');
    var login = document.getElementById('loginUrl');
    var logout = document.getElementById('logoutUrl');
    var linkText = document.getElementById('profileLinkLabel');
    var linkUrl = document.getElementById('profileLinkUrl');
    
    // Update template for code generation
    this.profileTemplate = `&lt;myuw-profile
        slot="myuw-profile"
        login-url="${login.value}"
        logout-url="${logout.value}"`;

    if (color.value.length > 0) {
        document.getElementsByTagName('myuw-profile')[0].setAttribute('background-color', color.value);
        this.profileTemplate += `\n\t\tbackground-color="${color.value}"`;
    }

    this.profileTemplate += `&gt;\n\t\t&lt;a href="${linkUrl.value}" slot="nav-item"&gt;${linkText.value}&lt;/a&gt;\n\t&lt;/myuw-profile&gt;`;

    // Clear fields and update helper text
    login.value = "";
    logout.value = "";
    linkText.value = "";
    linkUrl.value = "";
    document.getElementById('profileHelperText').innerText = 'Updated profile component';
}

/*
  HELP AND FEEDBACK DEMO FUNCTIONS
*/

function filterOutHtmlEntities(htmlInput) {
  var filteredHtml = htmlInput.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  return filteredHtml;
}

function updateHelpTemplate() {
  var helpComponent = document.getElementsByTagName('myuw-help')[0];
  var title = document.getElementById('helpTitle');
  var showButton = document.getElementById('helpShowButton');
  var showDefault = document.getElementById('helpShowDefault');
  var helperText = document.getElementById('helpHelperText');
  var content = document.getElementById('helpContent');

  // get html out of content
  var contentValue = filterOutHtmlEntities(content.value);

  // Update component attributes
  if (title.value.length > 0) {
    helpComponent.setAttribute('myuw-help-title', title.value);
  }

  if (showButton.checked) {
    helpComponent.setAttribute('show-button', 'true');
  } else {
    helpComponent.removeAttribute('show-button');
  }

  if (showDefault.checked) {
    helpComponent.setAttribute('show-default-content', 'true');
  } else {
    helpComponent.removeAttribute('show-default-content');
  }
  
  // Update template for code creation
  // Update template for code generation
  this.helpTemplate = `&lt;myuw-help\n\t\tslot="myuw-help"\n\t\tmyuw-help-title="${title.value}"`;

  if (showButton) {
    this.helpTemplate += `\n\t\tshow-button`;
  }

  if (showDefault) {
    this.helpTemplate += `\n\t\tshow-default-content`;
  }

  this.helpTemplate += `&gt;\n\t\t&lt;div slot="myuw-help-content"&gt;\n\t\t\t${contentValue}\n\t\t&lt;/div&gt;\n\t&lt;/myuw-help&gt;`;

  // Reset form fields
  title.value = '';
  showButton.checked = false;
  showDefault.checked = false;
  content.value = '';
  helperText.innerText = 'Updated help component';
}

/* SHOW/HIDE COMPONENTS */
function toggleComponent(componentId) {
    if (this.includedComponents.indexOf(componentId) != -1) {
        document.getElementById(componentId).hidden = true;
        document.getElementById(componentId + 'IconVisibility').innerText = 'visibility_off';
        document.getElementById(componentId + 'IconVisibilityTable').innerText = 'visibility_off';
        document.getElementById(componentId + 'ToggleTooltip').innerText = 'Show ' + componentId;
        // Remove hidden component from "included" array for code generation
        this.includedComponents.splice(this.includedComponents.indexOf(componentId), 1);
    } else {
        document.getElementById(componentId).hidden = false;
        document.getElementById(componentId + 'IconVisibility').innerText = 'visibility';
        document.getElementById(componentId + 'IconVisibilityTable').innerText = 'visibility';
        document.getElementById(componentId + 'ToggleTooltip').innerText = 'Hide ' + componentId;
        // Add component to "included" array for code generation
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
    var jsContainer = document.getElementById('generatedJs');
    
    var drawerImport = '';
    var drawerNoModule = '';
    var searchImport = '';
    var searchNoModule = '';
    var profileImport = '';
    var profileNoModule = '';
    var helpImport = '';
    var helpNoModule = '';

    
    if (this.includedComponents.indexOf('nav') != -1) {
        drawerImport = '&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-drawer@^1?module"&gt;&lt;/script&gt';
        drawerNoModule = '&lt;script nomodule src="https://unpkg.com/@myuw-web-components/myuw-drawer@^1"&gt;&lt;/script&gt';
    }
    if (this.includedComponents.indexOf('search') != -1) {
        searchImport = '&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-search@^1?module"&gt;&lt;/script&gt';
        searchNoModule = '&lt;script nomodule src="https://unpkg.com/@myuw-web-components/myuw-search@^1"&gt;&lt;/script&gt';
    }
    if (this.includedComponents.indexOf('profile') != -1) {
        profileImport = '&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-profile@^1?module"&gt;&lt;/script&gt';
        profileNoModule = '&lt;script nomodule src="https://unpkg.com/@myuw-web-components/myuw-profile@^1"&gt;&lt;/script&gt';
    }

    if (this.includedComponents.indexOf('help') != -1) {
        helpImport = '&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-help@^1?module"&gt;&lt;/script&gt';
        helpNoModule = '&lt;script nomodule src="https://unpkg.com/@myuw-web-components/myuw-help@^1"&gt;&lt;/script&gt';
    }

    // Include script tags for all components currently toggled ON
    var importsString = `
&lt;!-- The following tags are required for cross-browser support --&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
&lt;script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.1.3/webcomponents-loader.js"&gt;&lt;/script&gt;
&lt;script src="https://unpkg.com/css-vars-ponyfill@1"&gt;&lt;/script&gt;

&lt!-- UW-Madison app styles (recommended if you're a UW-Madison adopter) --&gt;
&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-app-styles@^1?module"&gt;&lt;/script&gt;
&lt;script nomodule src="https://unpkg.com/@myuw-web-components/myuw-app-styles@^1"&gt;&lt;/script&gt;

&lt!-- 
  Import selected myuw-web-components 
  Note: "nomodule" fallbacks are required for cross-browser support. They will only be loaded in browsers without ES6 module support. 
--&gt;
&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-app-bar@^1?module"&gt;&lt;/script&gt;
&lt;script nomodule src="https://unpkg.com/@myuw-web-components/myuw-app-bar@^1"&gt;&lt;/script&gt;
${drawerImport}
${drawerNoModule}
${searchImport}
${searchNoModule}
${profileImport}
${profileNoModule}
${helpImport}
${helpNoModule}
`;
    
    // Build component template string, including only markup for visible components
    var templateString = `${this.appBarTemplateStart}`;

    if (this.includedComponents.indexOf('nav') != -1) {
        templateString += `\n\t${this.drawerTemplateStart}\n\t\t${this.drawerLinkTemplate}\n\t${this.drawerTemplateEnd}`;
    }

    if (this.includedComponents.indexOf('search') != -1) {
        templateString += `\n\t${this.searchTemplate}`;
    }

    if (this.includedComponents.indexOf('profile') != -1) {
        templateString += `\n\t${this.profileTemplate}`;        
    } else {
      document.getElementById('profileJsDescription').hidden = true;
      jsContainer.hidden = true;
    }

    if (this.includedComponents.indexOf('help' != -1)) {
      templateString += `\n\t${this.helpTemplate}`;
    }
    
    templateString += `\n${this.appBarTemplateEnd}`;

    // Update DOM and call syntax highlighter
    importsContainer.innerHTML = importsString;
    templateContainer.innerHTML = templateString;
    cssContainer.innerHTML = this.customCssTemplate;
    jsContainer.innerHTML = this.customJsTemplate;
    
    Prism.highlightElement(importsContainer);
    Prism.highlightElement(templateContainer);
    Prism.highlightElement(cssContainer);
    Prism.highlightElement(jsContainer);
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
