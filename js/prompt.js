function promptPopup() {
	let params = `scrollbars=no, resizable=no, status=no, location=no,
		toolbar=no, menubar=no, width=600, height=400`;

	open('prompt window.html', 'test', params);
}