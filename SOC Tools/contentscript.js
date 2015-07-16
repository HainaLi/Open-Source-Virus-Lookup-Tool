//Author: Haina Li
//University of Virginia

/************Configurations**************/
//Update this when website changes
//change the id's/Class/Name here if the web contents change
var brightCloudURLInput = document.getElementById('inputEndpoint'); //get the element
var brightCloudCaptchaInput = document.getElementsByName('captcha_code')[0]; 
var brightCloudCaptcha = document.getElementById('captcha'); 
var brightCloudSubmit = document.getElementsByTagName("input")[2]; 

var robTexInput = document.getElementsByClassName("zinputtext")[0]
var robTextSearch = document.getElementsByClassName("zinputsearch")[0]

var urlVoidInput = document.getElementById('websiteURL'); 
var urlVoidSubmit = document.getElementsByClassName("btn btn-warning")[1]; 

var virusTotalURLInput = document.getElementById('url');
var virusTotalURLSubmit = document.getElementById('btn-scan-url');  
var virusTotalSearchInput = document.getElementById('query'); 
var virusTotalSearchSubmit = document.getElementById('search'); 
var switchToURLTab = document.getElementById("url-tab-chooser"); 
var switchToSearch = document.getElementById("search-tab-chooser"); 
/**************** End Configurations****************/

console.log("Script Loaded"); 
var requestdomainIP = "";
/**
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		requestdomainIP = request.greeting
});
**/

if (document.URL.indexOf("brightcloud") != -1) { //BrightCloud
	//document.body.style.backgroundColor = "blue";
	brightCloudURLInput.value=requestdomainIP;
	if (requestdomainIP != "")
		alert(requestdomainIP)
	//document.title = "BC " + requestdomainIP

}

if (document.URL.indexOf("robtex") != -1) { //RobTex
	//document.body.style.backgroundColor = "blue";
	//document.title = "RobTex " + requestdomainIP
}


if (document.URL.indexOf("urlvoid") != -1) { //URLVoid
	//document.body.style.backgroundColor = "blue";
	//document.title = "URLVoid " + requestdomainIP
	
}


if (document.URL.indexOf("virustotal") != -1) { //VirusTotal
	//document.body.style.backgroundColor = "blue";
	//document.title = "VT " + requestdomainIP
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.greeting == "hello")
		sendResponse({farewell: "goodbye"});
});

