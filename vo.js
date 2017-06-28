	(function (window) {

		const SPACES = /[\ ]/g;

		var Ann = {
			createReg(start, final, word) {
				return new RegExp(start + word + final, "g");
			},
			replaceString(string, reg, value) {
				return string.replace(reg, value);
			},
			get(selector) {
				return document.querySelector(selector);
			},
			getAll(selector) {
				return document.querySelectorAll(selector);
			},
			addMethod(fun) {
				this.__proto__[fun["name"]] = fun;
				return this;
			},
			addObject(name, obj) {
				this.__proto__[name] = obj;
				return this;
			},
			ObjectProto : {
				get : function (number) {
					return this[number];
				}
			}
		}


		// Prototyping Ann Object

		Ann.addMethod(function Array (...args){
			args.__proto__ = Object.assign({}, args.__proto__, {

				each: function (callback) {
					for(var i = 0 ; i < this.length; i++) {
						callback(this[i]);
					}

				}

			})

			return args;
		})

		Ann.addMethod(function error(message) {
			return new Error(message);
		})

		Ann.addMethod(function html (el, value) {
			if(value) {
				el.innerHTML = value;
				return el;
			}	
			else {
				return el.innerHTML
			}
		})

		// ----------------------

		var VO = {

			// Configuration

			variables: [],

			config: {

				startHash: "%",
				finalHash: "%",

				rootElement: "",
				variablesTag: "vo"

			},

			inner: {},

			render(selector, config) {
				// If not config
				config = config || {};

				if(selector === "" || selector === undefined || selector.length == 0) {
					throw Ann.error("Required argument in Render method must be a selector of DOM element")
				}

				// Config hash
				this.config.startHash = config.startHash || this.config.startHash;
				this.config.finalHash = config.finalHash || this.config.finalHash;

				this.rootElement = Ann.get(selector) || undefined;
				this.config.variablesElement = Ann.get(this.config.variablesTag) || undefined;

				if(this.rootElement === undefined) {
					throw Ann.error("Root element of project cannot be an undefined!")
				}

				this.inner._html = this.rootElement.innerHTML.trim();

				if(this.config.variablesElement === undefined) {

					this.inner._vo = ""

				}
				else {
					this.inner._vo = Ann.html(this.config.variablesElement);
					this.inner._vo = _vo =this.inner._vo.trim();

					this.variables = _vo.split("|");
					this.variables.pop()

					for(var i = 0 ; i < this.variables.length ; i++) {

						var varItem = this.variables[i];

						varItem = varItem.split("=")

						this.variables[i] = {
							tag: varItem[0].trim(),
							value: varItem[1].trim()
						}

					}

					this.config.variablesElement.parentNode.removeChild(this.config.variablesElement)

				}


				for(var i = 0 ; i < this.variables.length ; i++) {
					
					var reg = Ann.createReg(this.config.startHash, this.config.finalHash, this.variables[i].tag);

					this.inner._html = this.inner._html.replace(reg, this.variables[i].value)

				}

				Ann.html(this.rootElement, this.inner._html);


			}

		}

		var vo = function (selector) {
			return new VO.Dom.createElement(selector);
		}

		VO.__proto__.Dom = {
			addProto(funWithName) {

				this.prototyping[funWithName["name"]] = funWithName;
				return this;
			},
			addProtos(array) {
				array.forEach(el => {
					this.prototyping[el["name"]] = el;
				})

				return this;
			}
		}

		var Dom = VO.__proto__.Dom;



		VO.__proto__.Dom.prototyping = {}

		Dom.addProtos([
			function find(selector) {
				return this.querySelectorAll(selector);
			}
		])




		VO.__proto__.Dom.__proto__.createElement = function (selector) {

			var element = Ann.getAll(selector);

			if(element.length > 1) {
				
				var VOArray = {};
				element.forEach(function (el, index) {

					var VOProto = Object.assign(el.__proto__, {}, VO.__proto__.Dom.prototyping);

					var voElement = el;

					voElement.__proto__ = VOProto;

					VOArray[index.toString()] = voElement;

				})

				VOArray["length"] = element.length;

				VOArray.__proto__ = Object.assign({}, VOArray.__proto__, Ann.ObjectProto)

				return VOArray;

			}
			else {

				var VOProto = Object.assign(element[0].__proto__, {}, VO.__proto__.Dom.prototyping);

				var element = element[0];
				element.__proto__ = VOProto;

				return element;

			}

		}




		window.VO = VO;
		window.vo = vo;

	})(window)