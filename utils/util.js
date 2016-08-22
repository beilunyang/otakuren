// xhr 相对于 fetch, xhr可以abort
export const ajax = (obj) => {
	const request = new XMLHttpRequest();
	let timeout;
	if (obj.timeout) {
		timeout = setTimeout(() => {
			request.abort();
		}, obj.timeout);
	}
	request.onreadystatechange = (err) => {
		if (request.readyState === 4) {
	  	  if (timeout) {
	  	  	clearTimeout(timeout);
	  	  }
		  if (request.status >= 200 && request.status < 300) {
		  	const json = JSON.parse(request.responseText);
		  	obj.success(json);
		  } else {
		 	obj.error(new Error(request.status));
		  }
		}
	};

	request.open('GET', obj.url);
	request.send();
}