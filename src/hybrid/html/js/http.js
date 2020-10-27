function createCORS(method, url){
	var xhr = new XMLHttpRequest();
    if('withCredentials' in xhr){
		console.log(111111)
		
		xhr.open(method, url, true);
    }else if(typeof XDomainRequest != 'undefined'){
        var xhr = new XDomainRequest();
        xhr.open(method, url);
    }else{
        xhr = null;
    }
    return xhr; 
};