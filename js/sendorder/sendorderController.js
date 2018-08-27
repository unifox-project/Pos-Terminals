define(["app", "js/sendorder/sendorderView"], function (app, SendOrderView) {

    var data = {};
    var bindings = [

    ];

    function init(query) {
        if (!Model.LoggedIn()) {
            app.f7.loginScreen.open('.login-screen', true);
            return;
        }
        data.currency = app.conf.currency;
        data.order = Model.getSession('order');

        if (data.order && 2 > parseInt(data.order.status)) {
            VIMApi.post(url, { id_order: data.order.id_order || false, total_eur: data.order.total }, function (res) {
                Model.updSession('order', { res: res.answer, status: parseInt(res.answer.status) });

                data.order = Model.getSession('order');

                SendOrderView.render({ data: data, bindings: bindings });
            });
        } else if (data.order && 2 === parseInt(data.order.status)) {
            data.order = Model.getSession('order');

            //var QR = makeQR(data.service[1].data.wallet);
            

            if (BTPrinter) {

               var list = '', text = '';
               if (data.order.list){
                    for (i in data.order.list) {
                        var product = data.order.list[i];
                        var price_total = product.price * product.count;
                        list +=
                            product.product_name + '\n' +
                            product.count + 'x' + numeric_format(parseFloat(product.price).toFixed(2), ',', '.') + ' = ' + numeric_format(parseFloat(price_total).toFixed(2), ',', '.') + " EUR" +
                            "\n---------------------------\n";
                    }
               }
               text =
                    "Receipt For Order #" + data.order.id_order + "\n\n" +
                    (list ? '---------------------------\n' + list + "\n" : '') +



                    "Total EUR: " + numeric_format(parseFloat(data.order.total).toFixed(2), ',', '.') + "\n" +
                    "Total " + app.conf.currency.type + ": " + data.order.res.total + "\n" +
                    "Rate: 1 " + app.conf.currency.type + " = " + numeric_format(parseFloat(data.order.res.rate).toFixed(2), ',', '.') + " EUR" +

                    //"\n" +"Time: " + data.order.res.time_payment +
                    //"\n" +"Transaction: " +  data.order.res.time_payment +

                    "\n\n" +


                    //"Destination:\n\n " + QR + "\n\n" +
                    "Thank you for using our service.\n\n\n\n";

               BTPrinter.list(function (Printers) {
                   if (Printers.length && Printers[0]) {
                       var Printer = Printers[0];

                       BTPrinter.connect(function () {
                           BTPrinter.printText(function (success) { }, BTPrinterError, text);
                       }, BTPrinterError, Printer);
                   } else {
                       alert(JSON.stringify(Printers)); //list of printer in data array
                   }
               }, BTPrinterError);


               /*BTPrinter.connect(function (data) {
                    BTPrinter.printText(function (data) { }, function (err) { console.log(err); alert(err); }, text);
               }, function (err) { console.log(err); }, "InnerPrinter");*/
            }

            Model.removeSession('order');
            app.router.load('index', {});

            //app.mainView.back();

            SendOrderView.render({ data: data, bindings: bindings });
        } else {
            setTimeout(function () {
                app.router.load('index', {});
                app.mainView.back();
            }, 500);
        }
    }

	return {
		init: init
	};
});