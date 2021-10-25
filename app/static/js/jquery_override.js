$.fn.formData = function () {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function () {
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
};
$.fn.error = function (is_error) {
	if (is_error) {
		this.addClass("danger")
	} else {
		this.removeClass("danger")
	}
	return this;
};

(function (b) { b.fn.extend({ autofill: function (h, f) { var d = { findbyname: !0, restrict: !0 }, g = this; f && b.extend(d, f); return this.each(function () { b.each(h, function (e, c) { var a; if (d.findbyname) a = '[name="' + e + '"]', a = d.restrict ? g.find(a) : b(a), 1 == a.length ? a.val("checkbox" == a.attr("type") ? [c] : c) : 1 < a.length ? a.val([c]) : (a = '[name="' + e + '[]"]', a = d.restrict ? g.find(a) : b(a), a.each(function () { b(this).val(c) })); else if (a = "#" + e, a = d.restrict ? g.find(a) : b(a), 1 == a.length) a.val("checkbox" == a.attr("type") ? [c] : c); else { var f = !1; a = d.restrict ? g.find('input:radio[name="' + e + '"]') : b('input:radio[name="' + e + '"]'); a.each(function () { f = !0; if (this.value == c) this.checked = !0 }); f || (a = d.restrict ? g.find('input:checkbox[name="' + e + '[]"]') : b('input:checkbox[name="' + e + '[]"]'), a.each(function () { b(this).val(c) })) } }) }) } }) })(jQuery);
