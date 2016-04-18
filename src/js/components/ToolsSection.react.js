var React = require('react');
var ToolsStore = require('../stores/ToolsStore');
var classNames = require('classnames');

function getStateFromStores() {
    return {
        artboard: ToolsStore.getArtboard(),
        layer: ToolsStore.getLayer(),
        isExportEveryLayer: ToolsStore.getIsExportEveryLayer(),
        url: ToolsStore.getProjectUrl()
    };
}

function formatStyle(styleJson){
    var style = [];
    for(var k in styleJson){
        style.push('<span class="tools__textarea-classname">'+k+'</span>'+
        ': '+ '<span class="tools__textarea-value'+(k.indexOf('font-family') !== -1 ? '_font-family' : '')+'">'
        + styleJson[k] + '</span>;');
    }
    return style.join('<br>');
}

var ToolsSection = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        ToolsStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ToolsStore.removeChangeListener(this._onChange);
    },

    render: function() {
        var layer = this.state.layer;

        layer.name = decodeURIComponent(layer.name); // @TODO FIX @ symbol
        layer.html = decodeURIComponent(layer.html);

        var tools = [];



        if ((!layer.html || layer.html == 'undefined') && this.state.isExportEveryLayer && layer.id) {
            var fileUrl = this.state.url + this.state.artboard + '/' + layer.id + '@2x.png';
            var fileName = layer.name + '.png'

            tools.push(
                <a href='img/logo.png' download='test.png' className="tools__download">
                    <span style={{backgroundImage:'url('+fileUrl+')'}} className="tools__download-image"></span>
                    <span className="tools__download-text">download</span>
                </a>
            )
        }

        //temporary solution for gradient properties

        tools.push(
            <div className="tools__gradient-opts tools-container">
                <ul className="tools__gradient-list">
                    <li className="tools__gradient-item clearfix">
                        <span className="tools__gradient-color">
                            <span className="icon-paint-color-2" style={{color: '#2cc4d5'}}></span>
                            #<span className="tools__gradient-code">2CC4D5</span> (30%)
                        </span>
                        <span className="tools__copy-info">Copy</span>
                    </li>
                    <li className="tools__gradient-item clearfix ">
                        <div className="icon-gradient-down-arrow"></div>
                        <span className="tools__gradient-color">
                            <span className="icon-paint-color-2" style={{color: '#f45602'}}></span>
                            #<span className="tools__gradient-code">F45602</span> (30%)
                        </span>
                        <span className="tools__copy-info">Copy</span>
                    </li>
                    <li className="tools__gradient-item clearfix">
                        <div className="icon-gradient-down-arrow"></div>
                        <span className="tools__gradient-color">
                            <span className="icon-paint-color-2" style={{color: '#eee300'}}></span>
                            #<span className="tools__gradient-code">EEE300</span> (30%)
                        </span>
                        <span className="tools__copy-info">Copy</span>
                    </li>
                </ul>
            </div>
        );

        if (layer.style) {

            var styleHtml = formatStyle(layer.style);
            tools.push(
                <div className="tools-container clearfix">
                    <h5 className="tools__title">Code style</h5>
                    <div className="tools__textarea tools__textarea_style" onClick={this._onClick}
                         dangerouslySetInnerHTML={{__html: styleHtml}}>
                    </div>
                    <span className="tools__copy-info">Copy</span>
                </div>
            )
        }


        if (layer.html && layer.html !== 'undefined') {
            tools.push(
                <div className="tools-container clearfix">
                    <h5 className="tools__title">Content</h5>
                    <div className="tools__textarea tools__textarea-content" onClick={this._onClick}>
                        {layer.html}
                    </div>
                    <span className="tools__copy-info">Copy</span>
                </div>
            )
        }

        return (
            <div className={classNames({
                    'tools': true,
                    'tools_disabled': !layer.id
                 })}>
                <h5 className="tools__title">Object measure</h5>
                <ul className="tools__list">
                    <li className="tools__item">
                        <span className="tools__item-label">X</span>
                        <span className="icon-x-coord"></span>
                        <span className="tools__item-value">{layer.x} px</span>
                    </li>
                    <li className="tools__item">
                        <span className="tools__item-label">Width</span>
                        <span className="icon-width"></span>
                        <span className="tools__item-value">{layer.width} px</span>
                    </li>

                    <li className="tools__item">
                        <span className="tools__item-label">Y</span>
                        <span className="icon-y-coord"></span>
                        <span className="tools__item-value">{layer.y} px</span>
                    </li>
                    <li className="tools__item">
                        <span className="tools__item-label">Height</span>
                        <span className="icon-height"></span>
                        <span className="tools__item-value">{layer.height} px</span>
                    </li>
                </ul>

                {tools}

            </div>
        );
    },

    /**
    * Event handler for 'change' events coming from the stores
    */
    _onChange: function() {
        this.setState(getStateFromStores());
    },

    _onClick: function(e) {
        e.target.select();
        document.execCommand('copy');
    }

});

module.exports = ToolsSection;
