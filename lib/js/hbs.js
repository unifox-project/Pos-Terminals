define(["handlebars"], function (Handlebars) {
    Handlebars = Handlebars || this.Handlebars;

    Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
        switch (operator) {
            case '==':
                return (v1 == v2) ? options.fn(this) : options.inverse(this);
            case '===':
                return (v1 === v2) ? options.fn(this) : options.inverse(this);
            case '!=':
                return (v1 != v2) ? options.fn(this) : options.inverse(this);
            case '!==':
                return (v1 !== v2) ? options.fn(this) : options.inverse(this);
            case '<':
                return (v1 < v2) ? options.fn(this) : options.inverse(this);
            case '<=':
                return (v1 <= v2) ? options.fn(this) : options.inverse(this);
            case '>':
                return (v1 > v2) ? options.fn(this) : options.inverse(this);
            case '>=':
                return (v1 >= v2) ? options.fn(this) : options.inverse(this);
            case '&&':
                return (v1 && v2) ? options.fn(this) : options.inverse(this);
            case '||':
                return (v1 || v2) ? options.fn(this) : options.inverse(this);
            default:
                return options.inverse(this);
        };
    });

    Handlebars.registerHelper('getBlock', function (block, params) {
        try {
            require(['hbs!js/' + block], function (Block) {
                $ = Framework7.$;
                $('.block-' + block.replaceArray(['/', '/', '/'], ['', '', ''])).html(Block({ data: params }));
            });

            return new Handlebars.SafeString('<div class="block-' + block.replaceArray(['/', '/', '/'], ['', '', '']) + '"></div>');
        }
        catch (err) {
            console.error(err);
            return 'Block not found';
        };
    });
    Handlebars.registerHelper('plusOne', function (n) {
        return n + 1;
    });
    Handlebars.registerHelper('priceFormat', function (n) {
        return numeric_format(parseFloat(n).toFixed(2), ',', '.');
    });
    Handlebars.registerHelper('cryptoFormat', function (n) {
        return numeric_format(parseFloat(n).toFixed(8), ',', '.');
    });

  var templateExtension = ".hbs";

  return {

    pluginBuilder: "./hbs-builder",

    // http://requirejs.org/docs/plugins.html#apiload
    load: function (name, parentRequire, onload, config) {

      // Get the template extension.
      var ext = (config.hbs && config.hbs.templateExtension ? config.hbs.templateExtension : templateExtension);

      // In browsers use the text-plugin to the load template. This way we
      // don't have to deal with ajax stuff
      parentRequire(["text!" + name + ext], function (raw) {
        // Just return the compiled template
        onload(Handlebars.compile(raw));
      });

    }

  };
});
