//<!--
//global js var
var isNav;

// on load, run this
function doLoad() {

    MM_reloadPage(true);
    isNav = (navigator.appName.indexOf("Netscape") !=-1);

    //register event listeners
    //document.onkeypress = getKey;
    if (isNav)
    {
        document.captureEvents(Event.KEYPRESS);
        document.LoginForm.loginPasswd.onkeypress = getKey;
        document.LoginForm.loginName.onkeypress = getKey;
    }
    else
    {
        document.onkeypress = getKey; //Bug 10331785
    }
    setFocus();
}


//registered event listener, passes all key ASCII values to checkKey method
function getKey(keyStroke) {
    keyHit = (isNav) ? keyStroke.which : event.keyCode;
    whichKey = String.fromCharCode(keyHit).toLowerCase();
    checkKey(keyHit);
}

//if this method is passed the return key (13) char, then do a login
function checkKey(key) {
  if (key=="13")
  {
    doLogin(document.LoginForm);
  }
}

//reloads the window if Nav4 resized
function MM_reloadPage(init) {
    if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
        document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
    else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}

//perform a login for the LoginForm
function doLogin(form) {

    var username = form.loginName.value;
    var password = form.loginPasswd.value;
    if (username == "" || password == "") {
        $('#loginErrorMsg').text('请输入您的用户名和密码');
        document.getElementById('required').className = "error-show";
        setFocus();
        return true;
    }

    $.post('/admin/checkLogin.do',{
        loginName: username,
        loginPasswd: password
    },function(result){
        if (result.success){
            location.replace('/admin/login.do');
        } else {
            $('#loginErrorMsg').text(result.msg);
            document.getElementById('required').className = "error-show";
            setFocus();
        }
    }, 'json');

}
// function to strip crossSite script in URLs
function stripHTML()
{
	var orgURL=location.href;
	var tempURL=orgURL;
	orgURL.replace(/[\"\'][\s]*javascript:(.*)[\"\']/g, "\"\"");
    orgURL = orgURL.replace(/%22%3E%3Cscript(.*)/g, "");
	orgURL = orgURL.replace(/script(.*)/g, "");
	orgURL = orgURL.replace(/eval\((.*)\)/g, "");
	if(tempURL.length!= orgURL.length)
      location.href=orgURL;

}

// set the focus on password field if username exists
function setFocus(){
    document.LoginForm.loginName.focus();
}
//-->