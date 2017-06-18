'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = withSelectFiles;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fileSelector = null;

function selectFiles(options) {
  return fileSelector.selectFiles(options);
}

var FilesSelector = function (_React$Component) {
  _inherits(FilesSelector, _React$Component);

  function FilesSelector() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FilesSelector);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FilesSelector.__proto__ || Object.getPrototypeOf(FilesSelector)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      inputOptions: {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FilesSelector, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      fileSelector = this;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('input', _extends({}, this.state.inputOptions, { onChange: this.onChange.bind(this), type: 'file', ref: 'input',
        style: { display: 'none' }, value: '' }));
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var files = e.target.files;
      this._resolve([].concat(_toConsumableArray(files)));
      this._resolve = null;
    }
  }, {
    key: 'selectFiles',
    value: function selectFiles() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return new Promise(function (resolve, reject) {
        _this2.setState({ inputOptions: options });
        _this2._resolve = resolve;
        setTimeout(function () {
          return _this2.refs.input.click();
        }, 0);
      });
    }
  }]);

  return FilesSelector;
}(_react2.default.Component);

var initialized = false;

function withSelectFiles(name) {
  if (!initialized) {
    var container = document.createElement('div');
    container.id = 'react-files-selector-container';
    document.body.appendChild(container);
    _reactDom2.default.render(_react2.default.createElement(FilesSelector, null), container);
    initialized = true;
  }

  return function hoc(Component) {
    return function (props) {
      return _react2.default.createElement(Component, _extends({}, _defineProperty({}, name, selectFiles), props));
    };
  };
}