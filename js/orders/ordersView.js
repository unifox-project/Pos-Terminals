define(['hbs!js/orders/new', 'hbs!js/orders/sent', 'hbs!js/orders/paid'], function (newView, sentView, paidView) {
	function render(params) {
        $('.order-status-new').html(newView({ data: params.data }));
        $('.order-status-sent').html(sentView({ data: params.data }));
        $('.order-status-paid').html(paidView({ data: params.data }));

        setTimeout(function () {
            bindEvents(params.bindings);
        }, 300);
	}
	function bindEvents(bindings) {
        for (var i in bindings) $(bindings[i].element).on(bindings[i].event, bindings[i].handler);
	}
    return {
        render: render
    };
});