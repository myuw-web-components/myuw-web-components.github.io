import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HighlightService } from '../prism.service';
import 'dialog-polyfill';

declare var dialogPolyfill: any;

@Component({
  selector: 'demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss']
})

export class DemoPageComponent implements AfterViewInit {
  
  constructor(
    private router: Router,
    private highlightService: HighlightService
  ) { }

  /* Initial properties */
  public includedComponents = ['drawer', 'search', 'profile'];
  public searchCallbackCode = `\ndocument.getElementById('search').callback = (value) => {\n\twindow.alert('You searched for: ' + value);\n}\n\n`;
  public callbacks = [
      { label: 'Generate an alert', value: 'alert' },
      { label: 'Change some text on screen', value: 'yahoo' }
  ];

  // Code generation templates
  public appBarTemplateStart = `&lt;myuw-app-bar
    theme-name="MyUW"
    app-name="Web Components" 
    app-url=""&gt;`;
  
  public appBarTemplateEnd = `&lt;/myuw-app-bar&gt;`;
  public drawerTemplateStart = `&lt;myuw-drawer slot="myuw-navigation"&gt;`;
  public drawerLinkTemplate = `&lt;myuw-drawer-link
            slot="myuw-drawer-links"
            name=""
            icon=""
            href=""&gt;
        &lt;/myuw-drawer-link&gt;`;
  public drawerTemplateEnd = `&lt;/myuw-drawer&gt`;
  public searchTemplate = `&lt;myuw-search
        input-label="Search"
        button-label="Submit search"
        icon="search"
        slot="myuw-search"&gt;
    &lt;/myuw-search&gt;`;

  public profileTemplate = `&lt;myuw-profile
        slot="myuw-profile"
        session-endpoint=""
        login-url=""
        logout-url=""&gt;
        &lt;a href="" slot="nav-item"&gt;&lt;/a&gt;
    &lt;/myuw-profile&gt;`;

  public customCssTemplate = `&#47;&#42; You didn't change any theme colors &#42;&#47;`;

  /**
   * 
   */
  ngAfterViewInit() {
    (document.getElementById('search') as any).callback = (value: string) => {
      window.alert('You searched for: ' + value);
    };
    (document.getElementById('searchCallbackCode') as any).innerText = this.searchCallbackCode;
    this.highlightService.highlightAll();
  }

  /**
   * 
   * @param id 
   */
  showDialog(id) {
    var dialog = (document.getElementById(id) as any);

    // Register dialog if polyfill needed
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    
    dialog.showModal();
      
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
  }

  /**
   * 
   */
  toggleTheme() {
    var themeTooltip = document.getElementById('alternateThemeName');
    if (document.body.classList.contains('uw-madison-white-theme')) {
        document.body.classList.remove('uw-madison-white-theme');
        themeTooltip.innerText = 'MyUW White';
    } else {
        document.body.classList.add('uw-madison-white-theme');
        themeTooltip.innerText = 'MyUW Red';
    }
  }

  /**
   * 
   * @param e 
   */
  updateTopAppBar(e) {
    e.preventDefault();

    // Get app bar
    var _appBar = document.getElementsByTagName('myuw-app-bar')[0];
    
    // Get property fields
    var themeText = document.getElementById('themeName') as HTMLInputElement;
    var appText = document.getElementById('appName') as HTMLInputElement;
    var appUrl = document.getElementById('appUrl') as HTMLInputElement;
    var barBackground = document.getElementById('barBackground') as HTMLInputElement;
    
    // Update attributes
    _appBar.setAttribute('theme-name', themeText.value);
    _appBar.setAttribute('app-name', appText.value);
    _appBar.setAttribute('app-url', appUrl.value);

    // Update template for code generation
    this.appBarTemplateStart = `&lt;myuw-app-bar
    theme-name="${themeText.value}"
    app-name="${appText.value}" 
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

  /**
   * 
   * @param label 
   * @param url 
   * @param icon 
   */
  addDrawerLink(label, url, icon) {
    // Get form elements
    var linkText = document.getElementById('navItemLabel') as HTMLInputElement;
    var linkUrl = document.getElementById('navItemHref') as HTMLInputElement;
    var linkIcon = document.getElementById('navItemIcon') as HTMLInputElement;
    
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
    (document.getElementById('navItemLabel') as HTMLInputElement).value = "";
    (document.getElementById('navItemHref') as HTMLInputElement).value = "";
    (document.getElementById('navItemIcon') as HTMLInputElement).value = "";
  }

  /**
   * 
   */
  updateSearchBar() {
    // Get all elements
    var searchBar = document.getElementsByTagName('myuw-search')[0];
    var ariaLabel = document.getElementById('searchAriaLabel') as HTMLInputElement;
    var placeholder = document.getElementById('searchPlaceholder') as HTMLInputElement;
    var icon = document.getElementById('searchIcon') as HTMLInputElement;

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

  /**
   * 
   * @param value 
   */
  updateCallback(value) {
    if (value === 'alert') {
        (document.getElementById('search') as any).callback = (value) => {
            window.alert('You searched for: ' + value);
        }
        document.getElementById('searchCallbackCode').innerText = `\ndocument.getElementById('search').callback = (value) => {\n\twindow.alert('You searched for: ' + value);\n}\n\n`;
    } else {
        (document.getElementById('search') as any).callback = (value) => {
           document.getElementById('page-title').innerText = value;
        }
        document.getElementById('searchCallbackCode').innerText = `\ndocument.getElementById('search').callback = (value) => {\n\tdocument.getElementById('page-title').innerText = value;\n}\n\n`;
    }
    // Call syntax highlighter
    this.highlightService.highlightAll();
  }

  /**
   * 
   * @param session 
   */
  setSession(session) {
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

  /**
   * 
   */
  updateProfileTemplate() {
    // Get all input fields
    var color = document.getElementById('profileColor') as HTMLInputElement;
    var login = document.getElementById('loginUrl') as HTMLInputElement;
    var logout = document.getElementById('logoutUrl') as HTMLInputElement;
    var session = document.getElementById('sessionEndpoint') as HTMLInputElement;
    var linkText = document.getElementById('profileLinkLabel') as HTMLInputElement;
    var linkUrl = document.getElementById('profileLinkUrl') as HTMLInputElement;

    if (!session.value) {
        session.value = '';
    }
    // Update template for code generation
    this.profileTemplate = `&lt;myuw-profile
        slot="myuw-profile"
        session-endpoint="${session.value}"
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
    session.value = "";
    linkText.value = "";
    linkUrl.value = "";
    document.getElementById('profileHelperText').innerText = 'Updated profile component';
  }

  /**
   * 
   * @param componentId 
   */
  toggleComponent(componentId) {
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
   * 
   */
  generateComponentMarkup() {
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
&lt;script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.1.3/webcomponents-loader.js"&gt;&lt;/script&gt;

&lt!-- UW-Madison app styles (recommended if you're a UW-Madison adopter) --&gt;
&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-app-styles@^1?module"&gt;&lt;/script&gt;

&lt!-- Import selected myuw-web-components --&gt;
&lt;script type="module" src="https://unpkg.com/@myuw-web-components/myuw-app-bar@^1?module"&gt;&lt;/script&gt
${drawerImport}
${searchImport}
${profileImport}
    `;
    
    // Build component template string, including only markup for visible components
    var templateString = `${this.appBarTemplateStart}`;

    if (this.includedComponents.indexOf('drawer') != -1) {
        templateString += `\n\t${this.drawerTemplateStart}\n\t\t${this.drawerLinkTemplate}\n\t${this.drawerTemplateEnd}`;
    }

    if (this.includedComponents.indexOf('search') != -1) {
        templateString += `\n\t${this.searchTemplate}`;
    }

    if (this.includedComponents.indexOf('profile') != -1) {
        templateString += `\n\t${this.profileTemplate}`;
    }
    
    templateString += `\n${this.appBarTemplateEnd}`;

    // Update DOM and call syntax highlighter
    importsContainer.innerHTML = importsString;
    templateContainer.innerHTML = templateString;
    cssContainer.innerHTML = this.customCssTemplate;
    this.highlightService.highlightAll();
  }
}
