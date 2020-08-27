let css = require("css");

module.exports = function(source, map) {
    // console.log(source);
    let styleSheet = css.parse(source);
    let name = this.resourcePath.match(/([^\\]+).css$/)[1];
    console.log(name);
    console.log(this.resourcePath);
    for (let rule of styleSheet.stylesheet.rules) {
        rule.selectors = rule.selectors.map(selector =>
            selector.match(new RegExp(`^.${name}`)) ? selector:
            `.${name} ${selector}`
        );
        // console.log(rule);
    }

    // console.log(css.stringify(styleSheet));
    // console.log(obj);

    return `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(css.stringify(styleSheet))};
    document.documentElement.appendChild(style);
    `;
}