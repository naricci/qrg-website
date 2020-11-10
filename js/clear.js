// eslint-disable-next-line no-unused-vars
function f()
{
	document.querySelector('#H').value = null;
	document.querySelector('#W').value = null;
	document.querySelector('#L').value = null;
	document.querySelector('#results').innerHTML = '<p class="subtitle has-text-weight-bold" style="color: red;">' + 'Please enter positive numbers for Height, Width, and Length.' + '</p>';
	var dropDown = document.getElementById('unit');
	dropDown.selectedIndex = 0;
}
