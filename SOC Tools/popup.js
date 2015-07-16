//Author: Haina Li
//University of Virginia

/*****Configurations****/
//link to web pages. Change the link here if the website changes
var virusTotalURL = 'https://www.virustotal.com';
var brightCloudURL = 'http://www.brightcloud.com/tools/url-ip-lookup.php';
var urlVoidURL = 'http://urlvoid.com/';
var robTexURL = 'https://www.robtex.com/'; 
var hybridAnalysisURL = 'https://www.hybrid-analysis.com/';
var mxToolBoxURL = 'https://www.mxtoolbox.com'; 
var domainToolsURL = 'http://whois.domaintools.com/'; 
var centralOpsURL = 'http://centralops.net/co/'; 

/******End Configurations******/


//Make sure that the green button doesn't open up multiple options_pages 
chrome.browserAction.onClicked.addListener(function() {
	chrome.tabs.query({
		currentWindow: true, 
		title: 'Quick Access to OSINT Tools'
	}, function(array_of_tabs) {

		if (array_of_tabs.length > 0){
			for (var i = 1; i < array_of_tabs.length; i++){
				chrome.tabs.remove(array_of_tabs[i].id)
			}
		}
		else if (array_of_tabs.length == 0){
			window.open(chrome.runtime.getURL('popup.html'));
		}
		

		if (array_of_tabs[0].active == false) {
			chrome.tabs.update(array_of_tabs[0].id, {active: true})
		}


	});
	
});
  
//chrome.runtime.sendMessage(tab.id, {greeting: searchurl});

function urlButtonAction(searchurl) {
	//console.log(searchurl);
	chrome.tabs.create({url: brightCloudURL}, function(tab) {
		chrome.tabs.executeScript(tab.id,{
			file: "contentscript.js", 
			runAt: "document_end"
		});
		console.log("Sending message from background page")
		var onready = function() {
			onready = function(){}; 
			chrome.tabs.sendMessage(tab.id, {greeting: "hello"})
		}; 

	});
	
	
	var parsedURLArray = searchurl.split("."); 
	
	var urlpattern = "/"
	
	for (var i = 0; i < parsedURLArray.length; i++) {
		urlpattern = urlpattern + parsedURLArray[parsedURLArray.length-1-i] + "/"
	}
	
	
	chrome.tabs.create({url: robTexURL+"en/advisory/dns"+urlpattern}, function(tab) {
		
		chrome.tabs.executeScript(tab.id,{
			file: "contentscript.js", 
			runAt: "document_end"
		});
	});
	chrome.tabs.create({url: urlVoidURL+"scan/"+searchurl+"/"}, function(tab) {
		chrome.tabs.executeScript(tab.id,{
			file: "contentscript.js", 
			runAt: "document_end"
		});
	});
	chrome.tabs.create({url: virusTotalURL+"/en/domain/"+searchurl+"/information/"}, function(tab) {
		chrome.tabs.executeScript(tab.id,{
			file: "contentscript.js", 
			runAt: "document_end"
		});
	});
}
document.addEventListener('DOMContentLoaded', function () {
	//temporarily hide the captcha
	//document.getElementById("captchaform").style.visibility = 'hidden'; 
	
	
	
	//listeners for the submit buttons
	//Listener for File Submission 
	/***
	document.getElementById("submitfile").addEventListener("click", function() { //File
		var filepath = document.getElementById("enterfile").value; 
		if (filepath == "")
			alert("Please choose a file!")
		else {
			chrome.tabs.create({url: virusTotalURL}, function(tab) {
				chrome.tabs.executeScript(tab.id,{
					file: "contentscript.js", 
					runAt: "document_idle"
				});

			});
			
			chrome.tabs.create({url: hybrid-analysis}, function(tab) {
				chrome.tabs.executeScript(tab.id,{
					file: "contentscript.js", 
					runAt: "document_idle"
				});

			});
		}
	});
	***/


	
	//Listener for URL Submission enter key
	document.getElementById("submiturl").addEventListener("click", function() { //URL
		var searchurl = document.getElementById("enterurl").value; 
		searchurl = searchurl.trim()
		searchurl = searchurl.toLowerCase()
		if (searchurl == "") {
			alert("Please enter an URL!");
		}
		else {
			urlButtonAction(searchurl); 
		}	
	});
	
	//Listener for IP Submission
	document.getElementById("submitip").addEventListener("click", function() { //IP Address
		var searchip = document.getElementById("enterip").value; 
		searchip = searchip.trim();

		if (searchip == "") {
			alert("Please enter an IP Address!");
		}
		else {
			chrome.tabs.create({url: brightCloudURL}, function(tab) {
				chrome.tabs.executeScript(tab.id,{
					file: "contentscript.js", 
					runAt: "document_end"
				});
				/**
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
						console.log(response.farewell);
					});
				});
				**/
			});
			
			
			var parsedIPArray = searchip.split("."); 
			
			var ippattern = "/"
			
			for (var i = 0; i < parsedIPArray.length; i++) {
				ippattern = ippattern + parsedIPArray[i] + "/"
			}
			
			
			chrome.tabs.create({url: robTexURL+"en/advisory/dns"+ippattern}, function(tab) {
				chrome.tabs.executeScript(tab.id,{
					file: "contentscript.js", 
					runAt: "document_end"
				});
			});
			chrome.tabs.create({url: virusTotalURL+"/en/ip-address/"+searchip+"/information/"}, function(tab) {
				chrome.tabs.executeScript(tab.id,{
					file: "contentscript.js", 
					runAt: "document_end"
				});

			});

		}	
	});
	
	/***
	//Listener for Hash Submission
	document.getElementById("submithash").addEventListener("click", function() { //Hash
		var searchhash = document.getElementById("enterhash").value; 
		if (searchhash == "") {
			alert("Please enter a hash!");
		}
		else {
			chrome.tabs.create({url: virusTotalURL+"/en/file/7026a5bd51c6fc923e4fa7c0d0f3525e "}, function(tab) {
				chrome.tabs.executeScript(tab.id,{
					file: "contentscript.js", 
					runAt: "document_end"
				});
			});
		}	
	});
	***/
	
	//listeners for file and hash
	document.getElementById("filebutton").addEventListener("click", function() {
		window.open(virusTotalURL);
		window.open(hybridAnalysisURL);
	});
	
	/**
	document.getElementById("hashbutton").addEventListener("click", function() {
		chrome.tabs.create({url: virusTotalURL}, function(tab) {
			chrome.tabs.executeScript(tab.id,{
				file: "contentscripthash.js", 
				runAt: "document_end"
			});

		});
	});**/
	
	//listeners for the quick links on top 
	document.getElementById("virustotal").addEventListener("click", function() {
		window.open(virusTotalURL);
	});

	document.getElementById("brightcloud").addEventListener("click", function() {
		window.open(brightCloudURL);
	});

	document.getElementById("urlvoid").addEventListener("click", function() {
		window.open(urlVoidURL);
	});  

	document.getElementById("robtex").addEventListener("click", function() {
		window.open(robTexURL);
	});  

	document.getElementById("hybridanalysis").addEventListener("click", function() {
		window.open(hybridAnalysisURL);
	});  
	
	document.getElementById("mxtoolbox").addEventListener("click", function() {
		window.open(mxToolBoxURL);
	});  
	
	document.getElementById("domaintools").addEventListener("click", function() {
		window.open(domainToolsURL);
	});  
	
	document.getElementById("centralops").addEventListener("click", function() {
		window.open(centralOpsURL);
	});  
});

