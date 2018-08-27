define(['hbs!js/about/about'], function(viewTemplate) {
	function render(params) {
        $('.page-about').html(viewTemplate({ data: params.data }));
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