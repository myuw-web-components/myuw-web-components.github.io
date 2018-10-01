function showDialog(id) {
    var dialog = document.getElementById(id);
    
    // Register dialog if polyfill needed
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }
    
    dialog.showModal();
      
    dialog.querySelector('.close').addEventListener('click', function() {
        dialog.close();
    });
}