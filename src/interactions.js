/* Initial properties */
this.includedComponents = ['search', 'profile', 'drawer'];

this.searchCallbackCode = `\ndocument.getElementById('search').callback = (value) => {\n\twindow.alert('You searched for: ' + value);\n}\n\n`;

// Code generation templates
this.searchTemplate = `
    <myuw-search id="search" 
        input-label="Search"
        button-label="Submit search"
        icon="search"
        slot="myuw-search">
    </myuw-search>
`;
this.profileTemplate = `
    <myuw-profile id="profile" 
        slot="myuw-profile"
        session-endpoint="./demo/session.json"
        login-url="#"
        logout-url="#"
        color="#fb686d">
        <a href="https://myuw-web-components.github.io/myuw-profile/" slot="nav-item">Profile demo page</a>
    </myuw-profile>
`;


/*
    TOP BAR DEMO FUNCTIONS
*/
function updateTitle(e, attribute, newValue) {
    e.preventDefault();
    // Get app bar
    var _appBar = document.getElementsByTagName('myuw-app-bar')[0];
    _appBar.setAttribute(attribute, newValue);
}
function updateBarBackground(e, property, value) {
    e.preventDefault();
    var _newCss = document.createElement('style');
    _newCss.innerHTML = `
        myuw-app-bar {
            --${property}: ${value};
        }
    `
    document.head.appendChild(_newCss);
}
function updateTheme(theme) {
    document.body.className = theme;
}
/*
    NAV DRAWER DEMO FUNCTIONS
*/
function addDrawerLink(label, url, icon) {
    var linkTemplate = `
        <myuw-drawer-link
            slot="myuw-drawer-links"
            name="${label}"
            icon="${icon}"
            href="${url}">
        </myuw-drawer-link>
    `;
    console.log(linkTemplate);
    // Reset fields and update helper text
    document.getElementById('drawerHelperText').innerText = `Added "${label}"`;
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
    this.searchTemplate = `
        <myuw-search id="search" 
            input-label="${placeholder.value}"
            button-label="${ariaLabel.value}"
            icon="${icon.value}"
            slot="myuw-search">
        </myuw-search>
    `;

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

    searchBar.setAttribute(attribute, value);
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

    // Update template for code generation
    this.profileTemplate = `
        <myuw-profile id="profile" 
            slot="myuw-profile"
            session-endpoint="${session.value}"
            login-url="${login.value}"
            logout-url="${logout.value}">
            <a href="${linkUrl.value}" slot="nav-item">${linkText.value}</a>
        </myuw-profile>
    `;
    
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
