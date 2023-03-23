// Centralized all the file paths here

function redirectPage(page, customArgs, returnBase){ //page you need to be redirected ||| custom args like ?page ||| if you just need to get the path
  let baseUrl
  let redirectTo
  let hostname = window.location.hostname
  // Check if current page is localhost or github project
  switch(hostname){
    case "localhost": baseUrl = ''; hostname = 'localhost:5500';break;
    case "127.0.0.1": baseUrl = ''; hostname = '127.0.0.1:5500'; break
    default: baseUrl = '/webtatsu/';
  }

  // All paths defined here
  const PATH = {
    // All pages
    home: `${baseUrl}/`,
    profile: `${baseUrl}/pages/profile.html`,
    ranking: `${baseUrl}/pages/ranking.html`,
    compare: `${baseUrl}/pages/compare.html`,
  };

  if(returnBase) return baseUrl

  !customArgs ? redirectTo = PATH[page] : redirectTo = PATH[page] + customArgs
  if(customArgs) return redirectTo
  window.location.href = redirectTo
}

