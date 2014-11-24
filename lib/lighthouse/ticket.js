var openGitHubIssue = function(event){
  var re = new RegExp('//(.*)\.lighthouseapp\.com/projects/([0-9]+)-(.+)/tickets/([0-9]+)(?:-(.+))?');

  var bodyEl = document.querySelector('.greet-cnt')
    , pageTopEl = document.querySelector('#page-top')
    , metaEl = document.querySelector('.ticket-meta');

  var href = metaEl.querySelector('.ticketnum a').href;

  var result = href.match(re);

  var account = result[1]
    , projectId = result[2]
    , permalink = result[3]
    , ticketNumber = result[4]
    , ticketSlug = result[5];

  var title = pageTopEl.querySelector('.gcnt h2').innerHTML.trim()
    , body = bodyEl.textContent || bodyEl.innerText;

  body += "\n\n" + '[Open Lighthouse discussion](' + href + ')';

  var params = {
    title: title,
    body: body,
    labels: [metaEl.querySelector('.tstate').innerText]
  };

  return !window.open('https://github.com/' + account + '/' + permalink + '/issues/new?' + toQueryParams(params), 'githubissue').focus();
};

var toQueryParams = function(obj){
  var queryParams = [], k, v;
  for(k in obj){
    v = obj[k];
    if(v instanceof Array){
      var i = 0
        , len = v.length;
      for(; i < len; ++i){
        queryParams.push(k + '[]=' + window.encodeURIComponent(v[i]));
      }
    }else{
      queryParams.push(k + '=' + window.encodeURIComponent(v));
    }
  }
  return queryParams.join('&');
};

window.onload = function(){

  var githubLogoUrl = chrome.extension.getURL('images/github-logo.png');

  var githubBar = document.createElement('div');
  githubBar.className = 'github-bar-ext gbar clear';
  githubBar.innerHTML = '<ul class="clear"><li><button class="button" id="create-github-issue" type="button" ><img src="'+ githubLogoUrl +'" alt="">Create GitHub issue</button></li></ul>';
  
  var pagetop = document.getElementById('page-top'), createButton;
  if(pagetop){
    pagetop.appendChild(githubBar);
    createButton = document.getElementById('create-github-issue');

    createButton.addEventListener('click', openGitHubIssue, false);
  }
};
