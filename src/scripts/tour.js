
const banner = document.getElementById('tour-banner');
const mediator = new Shepherd.Evented();
const tableRow = document.getElementById('tourHighlightAppBar');
const themeNameField = document.getElementById('themeName');
const updateButton = document.getElementById('tour-button__step3');
const visibilityButton = document.getElementById('tour-button__step4');
const generateCodeButton = document.getElementById('tour-button__step5');

let tour = new Shepherd.Tour({
  defaultStepOptions: {
    classes: 'shepherd-theme-myuw'
  },
  confirmCancel: true,
  confirmCancelMessage: 'Skip the rest of the tour?'
});

const stepOne = tour.addStep('step1', {
  title: 'Welcome to myuw-web-components!',
  text: `This site was created to allow anyone to see, test, and play with the
  <a href="https://github.com/myuw-web-components" target="_blank">MyUW Web Components</a> library. This tour 
  will explain how to configure the components and use them in your own projects.
  <p>You can exit the tour at any time by clicking the "X" in the top right corner.</p>`,
  showCancelLink: true,
  buttons: [
    {
      text: 'Next step',
      action: tour.next
    }
  ],
  when: {
    show: function() {
      window.scrollTo(0,0);
    }
  }
});

const stepTwo = tour.addStep('step2', {
  title: 'Check out component options',
  text: 'Click the "Top app bar" row to see the component\'s customization options.',
  showCancelLink: true,
  attachTo: "#tourAnchorAppBar top",
  buttons: [
    {
      text: 'Click highlighted row to proceed',
      classes: 'disabled'
    }
  ],
  when: {
    show: function() {
      tableRow.classList.add('tour__highlight');
    }
  }
});

const stepThree = tour.addStep('step3', {
  title: 'Try changing the app title',
  text: 'Type a new title, then click "Update top bar." When you\'re done the text at the top of this page will reflect your change.',
  showCancelLink: true,
  attachTo: '#themeName bottom',
  classes: 'reposition-bottom',
  buttons: [
    {
      text: 'Enter some text to proceed',
      classes: 'disabled'
    }
  ],
  when: {
    show: function() {
      themeNameField.focus();
      tableRow.classList.remove('tour__highlight');
      themeNameField.classList.add('tour__highlight');
      updateButton.classList.add('tour__button-highlight');
    }
  }
});

const stepFour = tour.addStep('step4', {
  title: 'Update it!',
  text: 'When you\'re done, click "Update top bar" to see your changes live on this page.',
  showCancelLink: true,
  attachTo: '#tour-button__step3 left',
  buttons: [
    {
      text: 'Click "Update top bar"',
      classes: 'disabled'
    }
  ],
  when: {
    show: function() {
      themeNameField.classList.remove('tour__highlight');
      themeNameField.classList.add('tour__highlight-green');
      updateButton.classList.add('tour__button-highlight');
    }
  }
});

const stepFive = tour.addStep('step5', {
  title: 'Now hide some components',
  text: 'To hide a component, click the corresponding eye icon in the list of components or when viewing its customization options. Try hiding and showing the myuw-profile component now.',
  showCancelLink: true,
  attachTo: '#tour-button__step4 left',
  buttons: [
    {
      text: 'Change the visibility',
      classes: 'tour-action__visibility disabled',
      action: tour.next
    }
  ],
  when: {
    show: function() {
      themeNameField.classList.remove('tour__highlight');
      themeNameField.classList.remove('tour__highlight-green');
      updateButton.classList.remove('tour__button-highlight');
      visibilityButton.classList.add('tour__button-highlight');
    }
  }
});

const stepSix = tour.addStep('step6', {
  title: 'Generate custom HTML',
  text: `Now that you've customized some components, click this button to generate
  all the HTML (along with any extra info) needed to display the components exactly as you see them 
  on this page.`,
  showCancelLink: true,
  attachTo: '#tour-button__step5 right',
  scrollTo: true,
  advanceOn: "#tour-button__step6-trigger click",
  buttons: [
    {
      text: 'Click "Generate code"',
      classes: 'disabled'
    }
  ],
  when: {
    show: function() {
      visibilityButton.classList.remove('tour__button-highlight');
      generateCodeButton.classList.add('tour__button-highlight');
    }
  }
});

const stepSeven = tour.addStep('step7', {
  title: 'Copy the generated code',
  text: `Here you'll find of the code you need to use myuw-web-components. Just copy and paste it into your own app or web page. If you have 
   questions or concerns, or if you need more help getting started, feel free to <a href="contacts.html">contact our development team</a>.
  `,
  showCancelLink: true,
  buttons: [
    {
      text: 'Finish tour',
      action: function() {
        localStorage.setItem("firstTimeTour", true);
        return tour.complete();
      }
    }
  ],
  when: {
    show: function() {
      generateCodeButton.classList.remove('tour__button-highlight');
    }
  }
});


mediator.on('show-step-3', () => {
  // Check if we got here out of sync
  if (Shepherd.activeTour && Shepherd.activeTour.getCurrentStep().id === 'step1') {
    Shepherd.activeTour.show('step2');
  }
  if (Shepherd.activeTour && Shepherd.activeTour.getCurrentStep().id === 'step2') {
    // Show next step and remove highlights
    Shepherd.activeTour.show('step3');
  }
});

mediator.on('show-step-4', () => {
  if (Shepherd.activeTour && Shepherd.activeTour.getCurrentStep().id === 'step3') {
    // Highlight text field on input
    themeNameField.classList.remove('tour__highlight');
    themeNameField.classList.add('tour__highlight-green');
    Shepherd.activeTour.show('step4')
  }
});

mediator.on('show-step-5', () => {
  if (Shepherd.activeTour && Shepherd.activeTour.getCurrentStep().id === 'step4') {
    // Close the dialog for the top app bar
    MicroModal.close('topAppBar');
    // Show next step and remove highlights
    Shepherd.activeTour.show('step5');
    
  }
});

mediator.on('enable-step-6', () => {
  if (Shepherd.activeTour && Shepherd.activeTour.getCurrentStep().id === 'step5') {
    document.getElementsByClassName('tour-action__visibility')[0].innerText = 'Next step';
    document.getElementsByClassName('tour-action__visibility')[0].classList.remove('disabled');
  }
});

function setupTour() {
  if (!localStorage.getItem("firstTimeTour")) {
    // Display a message about taking the tour
    banner.classList.add('open');
    localStorage.setItem("firstTimeTour", true);
  }
}

function dismissTourBanner() {
  banner.classList.remove('open');
}

function startTour() {
  if (Shepherd.activeTour) {
    Shepherd.activeTour.cancel();
  }
  banner.classList.remove('open');
  tour.start();
}
