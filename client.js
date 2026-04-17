/* exported toId */
function toId() {
	// toId has been renamed toID
	alert("You have an old extension/script for Pokemon Showdown which is incompatible with this client. It needs to be removed or updated.");
}

(function ($) {

	Config.sockjsprefix = '/showdown';
	Config.root = '/';

	if (window.nodewebkit) {
		window.gui = require('nw.gui');
		window.nwWindow = gui.Window.get();
	}
	if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
		// Android mobile-web-app-capable doesn't support it very well, but iOS
		// does it fine, so we're only going to show this to iOS for now
		window.isiOS = true;
		$('head').append('<meta name="apple-mobile-web-app-capable" content="yes" />');
	}

	$(document).on('keydown', function (e) {
		if (e.keyCode === 27) { // Esc
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			app.closePopup();
		}
	});
	$(window).on('dragover', function (e) {
		if (/^text/.test(e.target.type)) return; // Ignore text fields

		e.preventDefault();
	});
	$(document).on('dragenter', function (e) {
		if (/^text/.test(e.target.type)) return; // Ignore text fields

		e.preventDefault();

		if (!app.dragging && app.curRoom.id === 'teambuilder') {
			var dataTransfer = e.originalEvent.dataTransfer;
			if (dataTransfer.files && dataTransfer.files[0]) {
				var file = dataTransfer.files[0];
				if (file.name.slice(-4) === '.txt') {
					// Someone dragged in a .txt file, hand it to the teambuilder
					app.curRoom.defaultDragEnterTeam(e);
				}
			} else if (dataTransfer.items && dataTransfer.items[0]) {
				// no files or no permission to access files
				var item = dataTransfer.items[0];
				if (item.kind === 'file' && item.type === 'text/plain') {
					// Someone dragged in a .txt file, hand it to the teambuilder
					app.curRoom.defaultDragEnterTeam(e);
				}
			}
		}

		// dropEffect !== 'none' prevents buggy bounce-back animation in
		// Chrome/Safari/Opera
		e.originalEvent.dataTransfer.dropEffect = 'move';
	});
	$(wind
