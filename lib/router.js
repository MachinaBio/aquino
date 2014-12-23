
function root () {
 this.render('main');
}

function dashboard () {
  this.render('dashboard');
}

Router.route('/', root);

Router.route('/dashboard', dashboard);
