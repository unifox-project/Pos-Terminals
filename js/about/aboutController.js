define(["app", "js/about/aboutView"], function (app, AboutView) {

    var data = {};
    var bindings = [
        
    ];

    function init(query) {
        if (!Model.LoggedIn()) {
            app.f7.loginScreen.open('.login-screen', true);
            return;
        }
        data.currency = app.conf.currency;

		AboutView.render({
            data: data,
			bindings: bindings
        });
    }

	return {
		init: init
	};
});