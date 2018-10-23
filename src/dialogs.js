
function showDialog(id) {
  // instantiate new modal
  MicroModal.show(id);
}

function closeDialog(id) {
  switch(id) {
    case 'topBarDialog':
      // Make sure we're not in an active tour
      if (Shepherd.activeTour && Shepherd.activeTour.getCurrentStep().id === 'step3') {
        MicroModal.close(id);
        Shepherd.activeTour.show('step2');
      } else {
        MicroModal.close(id);
      }
    default:
      MicroModal.close(id);
      break;
  }
}