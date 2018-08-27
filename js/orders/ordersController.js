define(["app", "js/orders/ordersView"], function (app, OrdersView) {
    function init(query) {
        if (!Model.LoggedIn()) {
            app.f7.loginScreen.open('.login-screen', true);
            return;
        }

        VIMApi.post(url, {}, function (res) {
            OrdersView.render({
                data: {
                    order_list: res.answer || [],
                    currency: app.conf.currency
                }, bindings: []
            });
        });
    }

	return {
		init: init
	};
});