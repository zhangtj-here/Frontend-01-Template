let Generator = require("yeoman-generator");

module.exports = class extends Generator {
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }



    // method1() {
    //     this.log('method 1 just ran');
    // }
    //
    // method2() {
    //     this.log('method 2 just ran');
    // }

    collecting() {
        this.log("collecting");
    }

    creating() {
        // this.npmInit();
        this.fs.copyTpl(
            this.templatePath('package.json'),
            this.destinationPath('package.json'),
            { title: 'temp-name' }
        );
        this.fs.copyTpl(
            this.templatePath('createElement.js'),
            this.destinationPath('lib/createElement.js')
        );
        this.fs.copyTpl(
            this.templatePath('gesture.js'),
            this.destinationPath('lib/gesture.js')
        );
        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('src/main.js'),
            { title: 'Templating with Yeoman' }
        );
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            { title: 'Templating with Yeoman' }
        );
        this.fs.copyTpl(
            this.templatePath('main.test.js'),
            this.destinationPath('test/main.test.js'),
            { title: 'Templating with Yeoman' }
        );
        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
            { title: 'Templating with Yeoman' }
        );
        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc'),
            { title: 'Templating with Yeoman' }
        );
        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'),
            { title: 'Templating with Yeoman' }
        );
        this.npmInstall([
            "webpack",
            "webpack-cli",
            "webpack-dev-server",
            "babel-loader",
            "@babel/core",
            "@babel/preset-env",
            "@babel/register",
            "@babel/plugin-transform-react-jsx",
            "mocha",
            "nyc",
            "@istanbuljs/nyc-config-babel",
            "babel-plugin-istanbul",
            "html-webpack-plugin"
        ], {"save-dev": true});
        // this.fs.copyTpl(
        //     this.templatePath('index.html'),
        //     this.destinationPath('public/index.html'),
        //     { title: 'Templating with Yeoman' }
        // );
    }
}