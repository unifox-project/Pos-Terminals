define(["app", "js/addtocart/addtocartView"], function (app, AddtocartView) {

    var data = {};
    var bindings = [
        /*{
            element: 'input[name="productcode"]',
            event: 'change',
            handler: function (e) {
                VIMApi.post(url, { productcode: $(this).val()}, function (res) {
                    if ('success' === res.type) {
                        $('input[name="name"]').val(res.answer.name);
                        $('input[name="price"]').val(res.answer.price);

                        //Model.updSession('ServiceData', StepData);
                        //init({ step: ++step });
                    } else VIMApi.checkError(res);
                });
            }
        }*/

        /*{
            element: '.update-product',
            event: 'submit',
            handler: function (e) {
                e.preventDefault();

                VIMApi.post(url, app.f7.form.convertToData(this), function (res) {
                    if ('success' === res.type) {
                        app.router.load('index', {});
                        app.f7.router.navigate('/', { reloadPrevious: true, ignoreCache: true });

                        //Model.updSession('ServiceData', StepData);
                        //init({ step: ++step });
                    } else VIMApi.checkError(res);
                });
            }
        }*/
    ];

    function init(query) {
        if (!Model.LoggedIn()) {
            app.f7.loginScreen.open('.login-screen', true);
            return;
        }
        data.currency = app.conf.currency;

        Model.removeSession('ServiceData');

        if (query.productcode) {
            VIMApi.post(url, { productcode: query.productcode }, function (res) {
                if ('success' === res.type) AddtocartView.render({ data: { product: res.answer }, bindings: bindings });
                else VIMApi.checkError(res);
            });
        } else {
            /*setTimeout(function () {
                $('.scan-qr-btn').trigger('click');
            }, 1000);*/
        
		    AddtocartView.render({
			    data: data,
			    bindings: bindings
            });
        }
    }

	return {
		init: init
	};
});