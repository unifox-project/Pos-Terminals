define(function() {
	//var $ = Framework7.$;
    function pageBeforeInit(e) {
        var page = e.detail.route;
        load(page.name, page.query);
    }

	/**
	 * Init router, that handle page events
	 */
    function init() {
        document.addEventListener('page:beforein', pageBeforeInit);

        document.addEventListener('deviceready', function (e) {
            //cordova.plugins.autoStart.enable();
            OrderMonitoring();

            Dom7(document).on('click', '.back-to-main', function () { requirejs(['app'], function (app) { app.router.load('index', {}); }); });
            Dom7(document).on('submit', '.login-form', autnFormEvent);

            //$(document).on('click', '.scan-qr-btn', scanQRStart);
            Dom7(document).on('click', '.add-to-cart', scanAddToCart);
            Dom7(document).on('click', '.remove-from-cart', RemoveFromCart);
            Dom7(document).on('submit', '.update-product', function (e) {
                var form = this;
                e.preventDefault();
                requirejs(['app'], function (app) {
                    //app.router.load('index', {});

                    VIMApi.post(url, app.f7.form.convertToData(form), function (res) {
                        if ('success' === res.type) {
                            try {
                                app.router.load('index', {});
                                //app.f7.router.navigate('/', { ignoreCache: true });
                                app.f7.router.back('/', { force: true });
                                //Model.updSession('ServiceData', StepData);
                                //init({ step: ++step });

                            } catch (err) {
                                alert(err);
                            }
                        } else VIMApi.checkError(res);
                    });
                });
            });

            load('index', {});
        });
    }
    function load(controllerName, query) {
		require(['js/' + controllerName + '/'+ controllerName + 'Controller'], function(controller) {
			controller.init(query);
		});
	}
	return {
        init: init,
        BeforeInit: pageBeforeInit,
        load: load
    };
});