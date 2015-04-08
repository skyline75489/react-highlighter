var supportLanguage = ['python', 'c', 'java'];
var HighlightBox = React.createClass({displayName: 'HighilghtBox',
  getInitialState: function() {
    return {rawContent: "",
            resultMarkup: "",
            renderPending: false};
  },
  updateResult: function(languageSet) {
    var text = React.findDOMNode(this.refs.text).value.trim();
    var language = React.findDOMNode(this.refs.language);
    this.setState({rawContent: text});
    if (! this.state.renderPending) {
      this.setState({renderPending: true});
      var that = this;
      setTimeout(function() {
        var result = hljs.highlightAuto(that.state.rawContent, languageSet);
        if (supportLanguage.indexOf(result.language) > -1) {
            $(language).val(result.language);
        }
        that.setState({
                      resultMarkup: result.value,
                      renderPending :false});
      }, 500);
    }
  },
  handleTextareaChange: function() {
    this.updateResult(supportLanguage);
  },
  handleLanguageChange: function() {
    var language = React.findDOMNode(this.refs.language).value.trim();
    if (language === 'Auto') {
      this.updateResult(supportLanguage);
    } else {
      this.updateResult([language]);
    }
  },
  handleThemeChange: function() {
    var theme = React.findDOMNode(this.refs.theme).value.trim();
    $('link[title]').each(function(i, link) {
      link.disabled = (link.title != theme);
    });
    var language = React.findDOMNode(this.refs.language).value.trim();
    if (language === 'Auto') {
      this.updateResult(supportLanguage);
    } else {
      this.updateResult([language]);
    }
  },
  handleFontSizeChange: function() {
      var fontSize = React.findDOMNode(this.refs.fontSize).value;
      $('div#resultBlock').css('font-size', fontSize + 'px');
  },
  render: function() {
    return (
      React.createElement("div", {className: "hbox"}, 
        React.createElement("h2", null, "React Code Highlighter"), 
        React.createElement("form", {className: "hform"}, 
          React.createElement("p", null, 
            React.createElement("span", {className: "label"}, "Font Size(px):"), 
          React.createElement("input", {name: "fontSize", id: "formFontSize", type: "number", onChange: this.handleFontSizeChange, ref: "fontSize"}), 
          React.createElement("span", {className: "label"}, "Language: "), 
          React.createElement("select", {onChange: this.handleLanguageChange, ref: "language", id: "formLanguage"}, 
            React.createElement("option", {value: "Auto"}, "Autodetect"), 
            React.createElement("option", {value: "python"}, "Python"), 
            React.createElement("option", {value: "c"}, "C"), 
            React.createElement("option", {value: "java"}, "Java")
          ),  
          React.createElement("span", {className: "label"}, "Theme: "), 
          React.createElement("select", {onChange: this.handleThemeChange, ref: "theme", id: "formTheme"}, 
            React.createElement("option", {value: "Github"}, "Github"), 
            React.createElement("option", {value: "Solarized Light"}, "Solarized Light"), 
            React.createElement("option", {value: "Solarized Dark"}, "Solarized Dark"), 
            React.createElement("option", {value: "IDEA"}, "IDEA"), 
            React.createElement("option", {value: "Sunburst"}, "Sunburst"), 
            React.createElement("option", {value: "Visual Studio"}, "Visual Studio")
            
          )
        ), 
          React.createElement("textarea", {ref: "text", id: "formTextarea", onChange: this.handleTextareaChange}
          )
        ), 
        React.createElement("div", {id: "resultBlock"}, 
        React.createElement("pre", {ref: "block"}, React.createElement("code", {className: "hljs", dangerouslySetInnerHTML: {__html: this.state.resultMarkup}})
        )
        )
      )
    );
  }
});

React.render(
  React.createElement(HighlightBox, null),
  document.getElementById('content')
);