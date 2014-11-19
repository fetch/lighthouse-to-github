var openGitHubIssue = function(){
  var re = new RegExp('//(.*)\.lighthouseapp\.com/projects/([0-9]+)-(.+)/tickets/([0-9]+)-(.+)');
  
  var result = document.location.href.match(re);
  
  var account = result[1]
    , projectId = result[2]
    , permalink = result[3]
    , ticketNumber = result[4]
    , ticketSlug = result[5];

  var bodyElement = document.querySelector('.greet-cnt');

  var title = document.querySelector('#page-top .gcnt h2').innerHTML.trim()
    , body = bodyElement.textContent || bodyElement.innerText;

  body += "\n\n" + '[Open Lighthouse discussion](' + document.location.href + ')';

  return !window.open('https://github.com/' + account + '/' + permalink + '/issues/new?title=' + window.encodeURIComponent(title) + '&body=' + window.encodeURIComponent(body), 'githubissue');
};

window.onload = function(){

  var githubLogoUrl = chrome.extension.getURL('images/github-logo.png');

  var githubBar = document.createElement('div');
  githubBar.className = 'github-bar-ext gbar clear';
  githubBar.innerHTML = '<ul class="clear"><li><button class="button" id="create-github-issue" type="button" ><img src="'+ githubLogoUrl +'" alt="">Create GitHub issue</button></li></ul>';
  
  var pagetop = document.getElementById('page-top'), createButton;
  if(pagetop){
    pagetop.appendChild(githubBar);
    var createButton = document.getElementById('create-github-issue');

    createButton.addEventListener('click', function() {
      openGitHubIssue()
    }, false);
  }
};
