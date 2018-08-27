define(["app","js/index/indexView"], function(app,IndexView) {

    var data = {};
    var bindings = [];

    function init(query) {
        if (!Model.LoggedIn()) {
            app.f7.loginScreen.open('.login-screen', true);
            return;
        }

        data.currency = app.conf.currency;
        data.order = Model.getSession('order');

        if (data.order && data.order.id_order) {
            $('.btn-send-order').show();
            VIMApi.post(url, { id_order: data.order.id_order || false }, function (res) {
                if ('success' === res.type) {
                    var total = 0;
                    if (res.answer) for (i in res.answer) total += res.answer[i].price * res.answer[i].count; else $('.btn-send-order').hide();

                    Model.updSession('order', { list: res.answer, total: total });

                    data.order = Model.getSession('order');

                } else $('.btn-send-order').hide();

                IndexView.render({ data: data , bindings: bindings });
            });
        } else {
            $('.btn-send-order').hide();
            IndexView.render({
                data: data,
                bindings: bindings
            });
        }		
    }

	return {
		init: init
	};
});