var isFunction = function isFunction( obj ) {
	return typeof obj === "function" && typeof obj.nodeType !== "number" &&
		typeof obj.item !== "function";
};

var isWindow = function isWindow( obj ) {
	return obj != null && obj === obj.window;
};

function isArrayLike(obj) {
	let type = typeof obj;

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}
	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

class Mscript extends Array {
	ready(cb) {
		const isReady = this.some(e => {
			return e.readyState != null && e.readyState != "loading"
		})
		if (isReady) {
			cb()
		} else {
			this.on("DOMContentLoaded", cb)
		}
		return this
	}

	on(event, cbOrSelector, cb) {
		if (typeof cbOrSelector === "function") {
			this.forEach(e => e.addEventListener(event, cbOrSelector))
		} else {
			this.forEach(elem => {
				elem.addEventListener(event, e => {
					if (e.target.matches(cbOrSelector)) cb(e)
				})
			})
		}
		return this
	}

	next() {
		return this.map(e => e.nextElementSibling).filter(e => e != null)
	}

	prev() {
		return this.map(e => e.previousElementSibling).filter(e => e != null)
	}

	first() {
		return this.eq(0)
	}

	last() {
		return this.eq(-1)
	}

	removeClass(className) {
		this.forEach(e => e.classList.remove(className))
		return this
	}

	addClass(className) {
		this.forEach(e => e.classList.add(className))
		return this
	}

	toggle(className, state) {
		if (state == undefined) {
			this.forEach(e => e.classList.toggle(className))
		} else if (typeof (state) == "boolean") {
			this.forEach(e => e.classList.toggle(className, state))
		} else {
			this.forEach(e => e.classList.toggle(className))
		}
		return this
	}

	getStyles(elem) {
		elem = elem? elem: this[0]
		var view = elem.ownerDocument.defaultView;
		if ( !view || !view.opener ) {
			view = window;
		}
		return view.getComputedStyle(elem);
	}

	css(property, value) {
		if (value == undefined) {
			return this.getStyles(this[0])[property]
		} else {
			const camelProp = property.replace(/(-[a-z])/, g => {
				return g.replace("-", "").toUpperCase()
			})
			this.forEach(e => (e.style[camelProp] = value))
		}
		return this
	}

	rcss(property) {
		this.forEach(e => (e.style.removeProperty(property)));
		return this
	}

	show() {
		return this.css("display");
	}

	hide() {
		return this.css("display", "none")
	}

	pushStack(arr) {
		return new Mscript(...arr)
	}

	children(arr) {
		let lst = [];
		this.forEach(e => {
			lst.push(...(e.children))
		})
		return this.pushStack(lst)
	}

	eq(i) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack(( j >= 0 && j < len ? [ this[ j ] ] : [] ));
	}

	find(selector) {
		let arr = [];
		if (typeof selector !== "string") {
			return false
		}
		this.forEach(e => {
			arr.push(...(e.querySelectorAll(selector)))
		})
		return this.pushStack(arr)
	}

	each(obj,cb) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( cb.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( cb.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	}

	val() {
		let mselect = [];
		if (!this.length) return '';
		let field = this[0];
		if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
		if (field.type === 'select-multiple') {
			Array.prototype.slice.call(field.options).forEach(function (option) {
				if (!option.selected) return;
				mselect.push(option.value)
			});
			return mselect;
		}
		if (mselect.length) {
			return mselect
		}
		if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;
		return field.value;
	}

	text(txt) {
		
	}
}

function $(selector) {
	if (!selector) {
		return new Mscript()
	} else if (typeof selector == "function") {
		window.addEventListener('DOMContentLoaded', selector)
	} else if (typeof selector === "string" || selector instanceof String) {
		return new Mscript(...document.querySelectorAll(selector))
	} else {
		return new Mscript(selector)
	}
	return new Mscript(selector)
}

Mscript.fn = Mscript.prototype

Mscript.extend = Mscript.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( Mscript.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !Mscript.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = Mscript.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

// Form things
let mscript_func_form = {
	serializeArray: function () {
		var arr = [];
		this.forEach(e => {
			Array.prototype.slice.call(e.elements).forEach(function (field) {
				if (!field.name || field.disabled || ['file', 'reset', 'submit', 'button'].indexOf(field.type) > -1) return;
				if (field.type === 'select-multiple') {
					Array.prototype.slice.call(field.options).forEach(function (option) {
						if (!option.selected) return;
						arr.push({
							name: field.name,
							value: option.value
						});
					});
					return;
				}
				if (['checkbox', 'radio'].indexOf(field.type) > -1 && !field.checked) return;
				arr.push({
					name: field.name,
					value: field.value
				});
			});
		})
		return arr;
	},
	formData: function () {
		var o = {};
		var a = this.serializeArray();
		this.each(a, function () {
			if (o[this.name]) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	},
	autoFill: function(map) {

	}
}

Mscript.fn.extend(mscript_func_form)


Mscript.fn.each(
	( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( _i, name ) {

		// Handle event binding
		Mscript.fn[ name ] = function(fn) {
			return arguments.length > 0 ?
				this.on( name, fn ) :
				this.trigger( name );
		};
	}
);