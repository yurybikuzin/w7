"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        function $me_easing_value(initial, target, t, fn = $$.$me_easing.linear) {
            const result = initial + (target - initial) * fn(t);
            return result;
        }
        $$.$me_easing_value = $me_easing_value;
        $$.$me_easing = {
            linear: function (t) { return t; },
            easeInQuad: function (t) { return t * t; },
            easeOutQuad: function (t) { return t * (2 - t); },
            easeInOutQuad: function (t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; },
            easeInCubic: function (t) { return t * t * t; },
            easeOutCubic: function (t) { return (--t) * t * t + 1; },
            easeInOutCubic: function (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; },
            easeInQuart: function (t) { return t * t * t * t; },
            easeOutQuart: function (t) { return 1 - (--t) * t * t * t; },
            easeInOutQuart: function (t) { return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t; },
            easeInQuint: function (t) { return t * t * t * t * t; },
            easeOutQuint: function (t) { return 1 + (--t) * t * t * t * t; },
            easeInOutQuint: function (t) { return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t; }
        };
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//easing.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        var isArray = Array.isArray;
        var keyList = Object.keys;
        var hasProp = Object.prototype.hasOwnProperty;
        function $me_equal(a, b) {
            if (a === b)
                return true;
            if (a && b && typeof a == 'object' && typeof b == 'object') {
                var arrA = isArray(a), arrB = isArray(b), i, length, key;
                if (arrA != arrB)
                    return false;
                if (arrA && arrB) {
                    length = a.length;
                    if (length != b.length)
                        return false;
                    for (i = length; i-- !== 0;)
                        if (!$me_equal(a[i], b[i])) {
                            const result = false;
                            return result;
                        }
                    return true;
                }
                let setA = a instanceof Set;
                let setB = b instanceof Set;
                if (setA != setB)
                    return false;
                if (setA && setB) {
                    if (a.size != b.size)
                        return false;
                    let iter = a.keys();
                    let next = iter.next();
                    while (!next.done) {
                        if (!b.has(next.value))
                            return false;
                        next = iter.next();
                    }
                    iter = b.keys();
                    next = iter.next();
                    while (!next.done) {
                        if (!a.has(next.value))
                            return false;
                        next = iter.next();
                    }
                    return true;
                }
                let mapA = a instanceof Map;
                let mapB = b instanceof Map;
                if (mapA != mapB)
                    return false;
                if (mapA && mapB) {
                    const result = $me_equal([...a], [...b]);
                    return result;
                }
                var dateA = a instanceof Date, dateB = b instanceof Date;
                if (dateA != dateB)
                    return false;
                if (dateA && dateB)
                    return a.getTime() == b.getTime();
                var regexpA = a instanceof RegExp, regexpB = b instanceof RegExp;
                if (regexpA != regexpB)
                    return false;
                if (regexpA && regexpB)
                    return a.toString() == b.toString();
                var keys = keyList(a);
                length = keys.length;
                if (length !== keyList(b).length)
                    return false;
                for (i = length; i-- !== 0;)
                    if (!hasProp.call(b, keys[i]))
                        return false;
                for (i = length; i-- !== 0;) {
                    key = keys[i];
                    if (!$me_equal(a[key], b[key]))
                        return false;
                }
                return true;
            }
            return a !== a && b !== b;
        }
        $$.$me_equal = $me_equal;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//equal.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        let $me_atom_state;
        (function ($me_atom_state) {
            $me_atom_state[$me_atom_state["invalid"] = 0] = "invalid";
            $me_atom_state[$me_atom_state["error"] = 1] = "error";
            $me_atom_state[$me_atom_state["valid"] = 2] = "valid";
        })($me_atom_state = $$.$me_atom_state || ($$.$me_atom_state = {}));
        let $me_atom_type;
        (function ($me_atom_type) {
            $me_atom_type[$me_atom_type["lazy"] = 0] = "lazy";
            $me_atom_type[$me_atom_type["force"] = 1] = "force";
        })($me_atom_type = $$.$me_atom_type || ($$.$me_atom_type = {}));
        class $me_atom_anim_class {
            constructor(anim) {
                this._anim = {
                    from: anim.from,
                    to: anim.to,
                    delay: anim.delay || 0,
                    duration: anim.duration || 200,
                    easing: anim.easing || $$.$me_easing.easeInOutQuad,
                };
            }
        }
        $$.$me_atom_anim_class = $me_atom_anim_class;
        function $me_atom_anim(anim) {
            return new $me_atom_anim_class(anim);
        }
        $$.$me_atom_anim = $me_atom_anim;
        let $me_atom_def_type;
        (function ($me_atom_def_type) {
            $me_atom_def_type[$me_atom_def_type["none"] = 0] = "none";
            $me_atom_def_type[$me_atom_def_type["simple"] = 1] = "simple";
            $me_atom_def_type[$me_atom_def_type["mastered"] = 2] = "mastered";
            $me_atom_def_type[$me_atom_def_type["shortcut"] = 3] = "shortcut";
        })($me_atom_def_type = $$.$me_atom_def_type || ($$.$me_atom_def_type = {}));
        function $me_atoms() {
            let _force_slaves_to_update = {};
            let _raf;
            function _update_force_slaves() {
                _raf = void 0;
                let slaves = Object.keys(_force_slaves_to_update);
                _force_slaves_to_update = {};
                while (slaves.length) {
                    for (let i = 0, count = slaves.length; i < count; i++) {
                        const atom = self.get(slaves[i]);
                        atom.value();
                    }
                    slaves = Object.keys(_force_slaves_to_update);
                    _force_slaves_to_update = {};
                }
            }
            function update_force_slaves(slaves) {
                for (let i = 0, count = slaves.length; i < count; i++) {
                    _force_slaves_to_update[slaves[i]] = true;
                }
                if (_raf === void 0)
                    _raf = requestAnimationFrame(_update_force_slaves);
            }
            const _anim_to_play = {};
            function play_animation(name, anim) {
                if (_anim_to_play[name]) {
                    const _anim = _anim_to_play[name];
                    _anim.to = anim.to;
                }
                else {
                    _anim_to_play[name] = Object.assign({}, anim, { value: anim.from });
                    _play_animation();
                }
            }
            let _play_animation_raf;
            function _play_animation() {
                if (_play_animation_raf === void 0)
                    _play_animation_raf = requestAnimationFrame((t) => {
                        _play_animation_raf = void 0;
                        const anim_names = Object.keys(_anim_to_play);
                        let needReplay = false;
                        for (let i = 0, count = anim_names.length; i < count; i++) {
                            const anim_name = anim_names[i];
                            if (_update_animation(anim_name, t)) {
                                needReplay = true;
                            }
                            else {
                                delete _anim_to_play[anim_name];
                            }
                        }
                        if (needReplay) {
                            _update_force_slaves();
                            _play_animation();
                        }
                    });
            }
            function _update_animation(name, t) {
                const anim = _anim_to_play[name];
                const result = !$$.$me_equal(anim.value, anim.to);
                if (result) {
                    if (anim.value == null || isNaN(anim.value)) {
                        console.error('anim "' + name + '" has value ' + anim.value);
                    }
                    else {
                        if (anim.start === void 0)
                            anim.start = t;
                        var progress = Math.max(0, Math.min(1, ((t - anim.start) - anim.delay) / anim.duration));
                        anim.value = anim.from + (anim.to - anim.from) * anim.easing(progress);
                        try {
                            self(name)(anim.value);
                        }
                        catch (e) {
                            console.error(e);
                        }
                    }
                }
                return result;
            }
            function _create_atom(name, atom_def) {
                let _state = $me_atom_state.invalid;
                let _value;
                let _error;
                let _force_slaves;
                let _r = atom_def.r;
                let _w = atom_def.w;
                let _d = atom_def.d;
                let _t = atom_def.t;
                let _masters = !atom_def.masters || !atom_def.masters.length ? void 0 : atom_def.masters.slice();
                if (_masters) {
                    for (let master of _masters) {
                        const master_atom = _store[master];
                        if (master_atom) {
                            master_atom.add_slave(name, _t);
                        }
                        else {
                            const msg = 'atom "' + master + '" can not be used as master before read definition';
                            console.error(msg, _store);
                            console.trace();
                            throw new Error(msg);
                        }
                    }
                }
                function master_values() {
                    const result = {};
                    if (_masters)
                        for (let i = 0, count = _masters.length; i < count; i++) {
                            const master_atom_name = _masters[i];
                            const atom = _store[master_atom_name];
                            const value = atom.value();
                            if (atom.state() != $me_atom_state.valid)
                                return;
                            result[master_atom_name] = value;
                        }
                    return function (value_id) {
                        let value_name;
                        if (typeof value_id === 'string') {
                            value_name = value_id;
                        }
                        else if (Number.isFinite(value_id)) {
                            const master_idx = value_id;
                            if (_masters && 0 <= master_idx && master_idx < _masters.length) {
                                value_name = _masters[master_idx];
                            }
                            else {
                                const msg = 'atom::' + name + ': value_id "' + value_id + '" is out of masters range';
                                console.error(msg, _masters);
                                console.trace();
                                throw new Error(msg);
                            }
                        }
                        else {
                        }
                        const value = result[value_name];
                        if (value === void 0) {
                            const msg = 'atom::' + name + ': value "' + value_name + '" not found in master values';
                            console.error(msg);
                            console.trace();
                            throw new Error(msg);
                        }
                        return value;
                    };
                }
                let _value_def_raf;
                let _value_def_invalid_atoms;
                let _invalid_masters;
                let _invalid_masters_raf;
                function read_val() {
                    let val;
                    const v = master_values();
                    if (!v && _d) {
                        if (_invalid_masters_raf !== void 0) {
                            clearTimeout(_invalid_masters_raf);
                            _invalid_masters_raf = void 0;
                        }
                        _invalid_masters = _masters.filter(master => _store[master].state() != $me_atom_state.valid);
                        _invalid_masters_raf = setTimeout(() => {
                            _invalid_masters_raf = void 0;
                            console.warn(name, _invalid_masters, _masters.filter(master => _store[master].state() != $me_atom_state.valid));
                        }, 100);
                    }
                    if (v) {
                        if (_invalid_masters_raf !== void 0) {
                            clearTimeout(_invalid_masters_raf);
                            _invalid_masters_raf = void 0;
                        }
                        if (_r) {
                            val = _r(v);
                        }
                        else if (!_masters) {
                            val = void 0;
                        }
                        else if (_masters.length == 1) {
                            val = v(_masters[0]);
                        }
                        else {
                            val = _masters.map(master_atom => v(master_atom));
                        }
                    }
                    return val;
                }
                function write_val(val) {
                    if (_w) {
                        let ret = _w(val);
                        if (ret !== void 0)
                            val = ret;
                    }
                    return val;
                }
                function atom_def_write(w, t, d) {
                    if (_w !== void 0) {
                        const msg = name + ': write method already defined ';
                        console.error(msg);
                        console.trace();
                        throw new Error(msg);
                    }
                    _w = w;
                    if (t == $me_atom_type.force && _t != t && _masters)
                        for (let master of _masters)
                            _store[master].add_slave(name, t);
                    _t = t;
                    if (d !== void 0)
                        _d = d;
                }
                function atom_def_read(masters, r, t, d) {
                    if (_r !== void 0) {
                        const msg = name + ': read method already defined';
                        console.error(msg);
                        console.trace();
                        throw new Error(msg);
                    }
                    _masters = !masters || !masters.length ? void 0 : masters.slice();
                    _r = r;
                    for (let master of _masters)
                        _store[master].add_slave(name, t);
                    _t = t;
                    if (d !== void 0)
                        _d = d;
                }
                function _invalidate_force_slaves() {
                    if (_masters) {
                        for (let i = 0, count = _masters.length; i < count; i++)
                            _store[_masters[i]].invalidate_force_slaves();
                    }
                }
                function atom_is_valid_value(val) {
                    return !(val === void 0 || Number.isNaN(val));
                }
                function atom_update(val) {
                    let result;
                    try {
                        const prev_value = _state === $me_atom_state.valid ? _value : void 0;
                        let ret;
                        if (val === void 0)
                            ret = read_val();
                        else
                            ret = write_val(val);
                        if (val === void 0 && ret !== void 0 && !(ret instanceof $me_atom_anim_class)) {
                            val = ret;
                            const ret2 = write_val(val = ret);
                            if (ret2 !== void 0)
                                ret = ret2;
                        }
                        if (!(ret instanceof $me_atom_anim_class)) {
                            result = _value = ret;
                        }
                        else {
                            const anim = ret._anim;
                            if (anim.from != void 0) {
                                result = _value = anim.from;
                            }
                            else if (_value == void 0) {
                                anim.from = result = _value = anim.to;
                            }
                            else {
                                anim.from = result = _value;
                            }
                            if (!$$.$me_equal(anim.from, anim.to)) {
                                anim.from = _value;
                                play_animation(name, anim);
                            }
                            else if (prev_value != _value) {
                                write_val(_value);
                            }
                        }
                        if (_value !== prev_value) {
                            self.state(_value === void 0 || Number.isNaN(_value) ? $me_atom_state.invalid : $me_atom_state.valid);
                        }
                    }
                    catch (err) {
                        console.error(err);
                        self.state($me_atom_state.error, result = err);
                    }
                    return result;
                }
                function atom_value(val) {
                    let result;
                    if (val !== void 0) {
                        if (val instanceof $me_atom_anim_class)
                            throw new Error("TODO");
                        if (!$$.$me_equal(val, _value)) {
                            result = atom_update(val);
                        }
                    }
                    else if (_state === $me_atom_state.valid) {
                        result = _value;
                    }
                    else if (_state === $me_atom_state.error) {
                        result = _error;
                    }
                    else if (_state === $me_atom_state.invalid) {
                        result = atom_update(val);
                    }
                    return result;
                }
                atom_value.def_write = atom_def_write;
                atom_value.def_read = atom_def_read;
                atom_value.is_valid_value = atom_is_valid_value;
                atom_value.update = atom_update;
                atom_value.value = atom_value;
                atom_value.type = function atom_type() { return _t; };
                atom_value.state = function atom_state(val, err) {
                    if (val !== void 0 && (val !== _state || val === $me_atom_state.valid || val === $me_atom_state.error && err && err !== _error)) {
                        _state = val;
                        if (_state === $me_atom_state.error) {
                            _error = err;
                            _spread_state();
                        }
                        else {
                            _error = void 0;
                            _spread_state($me_atom_state.invalid);
                        }
                    }
                    return _state;
                };
                atom_value.error = () => _error;
                atom_value._value = () => _value;
                atom_value.masters = () => _masters && _masters.slice();
                atom_value.is_read_defined = () => _r !== void 0;
                let _lazy_slaves;
                let _own_force_slaves;
                atom_value.add_slave = (slave_name, t) => {
                    if (t == $me_atom_type.lazy) {
                        if (!_lazy_slaves || !_lazy_slaves.has(slave_name)) {
                            if (!_lazy_slaves)
                                _lazy_slaves = new Set();
                            _lazy_slaves.add(slave_name);
                        }
                    }
                    else {
                        if (_lazy_slaves && _lazy_slaves.has(slave_name))
                            _lazy_slaves.delete(slave_name);
                        if (!_own_force_slaves || !_own_force_slaves.has(slave_name)) {
                            if (!_own_force_slaves)
                                _own_force_slaves = new Set();
                            _own_force_slaves.add(slave_name);
                            invalidate_force_slaves();
                        }
                    }
                };
                function _spread_state(state, error) {
                    if (state === void 0)
                        state = _state;
                    if (error === void 0)
                        error = _error;
                    if (_lazy_slaves)
                        for (let slave of _lazy_slaves)
                            _store[slave].state(state, error);
                    if (_own_force_slaves)
                        for (let slave of _own_force_slaves)
                            _store[slave].state(state, error);
                    if (state === $me_atom_state.invalid) {
                        const slaves = force_slaves();
                        if (slaves.length) {
                            update_force_slaves(slaves);
                        }
                    }
                }
                function force_slaves() {
                    if (!_force_slaves) {
                        _force_slaves = _own_force_slaves ? [..._own_force_slaves.keys()] : [];
                        if (_lazy_slaves)
                            for (let slave of _lazy_slaves)
                                _force_slaves.push(..._store[slave].force_slaves());
                    }
                    return _force_slaves;
                }
                atom_value.force_slaves = force_slaves;
                function invalidate_force_slaves() {
                    _force_slaves = void 0;
                    _invalidate_force_slaves();
                }
                atom_value.invalidate_force_slaves = invalidate_force_slaves;
                const self = atom_value;
                return self;
            }
            let _store = {};
            function get(name) {
                if (_store[name])
                    return _store[name];
                const msg = 'no atom "' + name + '"';
                console.error(msg);
                console.trace();
                throw new Error(msg);
            }
            function def_read_write(name, masters, r, w, p) {
                if (r != null && typeof r !== 'function') {
                    const msg = name + ': r expected to be a function, not ' + typeof r + `(${r})`;
                    console.error(msg);
                    console.trace();
                    throw new Error(msg);
                }
                if (r === void 0)
                    r = null;
                if (w != null && typeof w !== 'function') {
                    const msg = name + ': w expected to be a function, not ' + typeof w;
                    console.error(msg);
                    console.trace();
                    throw new Error(msg);
                }
                if (w === void 0)
                    w = null;
                let t = p && p.t;
                if (t === void 0)
                    t = w ? $me_atom_type.force : $me_atom_type.lazy;
                const atom_def = {
                    masters,
                    r,
                    w,
                    t,
                    d: p && p.d,
                };
                if (_store[name]) {
                    const msg = 'atom "' + name + '" already exists';
                    console.error();
                    console.trace();
                    throw new Error(msg);
                }
                else {
                    const atom = _store[name] = _create_atom(name, atom_def);
                    if (atom.type() == $me_atom_type.force)
                        atom.update();
                }
            }
            function def_write(name, w, p) {
                if (w !== void 0 && typeof w !== 'function') {
                    const msg = name + ': w expected to be a function, not ' + typeof w;
                    console.error(msg);
                    console.trace();
                    throw new Error(msg);
                }
                let atom = _store[name];
                if (atom) {
                    let t = p && p.t;
                    if (t === void 0)
                        t = $me_atom_type.force;
                    atom.def_write(w, t, p && p.d);
                }
                else {
                    let t = p && p.t;
                    if (t === void 0)
                        t = $me_atom_type.force;
                    atom = _store[name] = _create_atom(name, { w, t, d: p && p.d });
                }
                if (atom.type() == $me_atom_type.force)
                    atom.update();
            }
            function def_read(name, masters, r, p) {
                if (r !== void 0 && typeof r !== 'function') {
                    const msg = name + ': r expected to be a function, not ' + typeof r;
                    console.error(msg);
                    console.trace();
                    throw new Error(msg);
                }
                if (r === void 0)
                    r = null;
                let atom = _store[name];
                if (atom) {
                    let t = p && p.t;
                    if (t === void 0)
                        t = atom.type();
                    atom.def_read(masters, r, t, p && p.d);
                }
                else {
                    let t = p && p.t;
                    if (t === void 0)
                        t = $me_atom_type.lazy;
                    atom = _store[name] = _create_atom(name, { masters, r, t, d: p && p.d });
                }
                if (atom.type() == $me_atom_type.force)
                    atom.update();
            }
            get.get = get;
            get.rw = def_read_write;
            get.w = def_write;
            get.r = def_read;
            const self = get;
            return self;
        }
        $$.$me_atoms = $me_atoms;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//atom.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const period = '...';
        function $me_ctx_text_render(ctx, text, ctx_x, ctx_w, ctx_padding, ctx_y, align = 0) {
            let w = ctx.measureText(text).width;
            const w_max = ctx_w - ctx_padding * 2;
            if (w <= w_max) {
                if (align === 0) {
                    ctx.fillText(text, ctx_x + (ctx_w - w) / 2, ctx_y);
                }
                else if (align == 1) {
                    ctx.fillText(text, ctx_x + ctx_padding, ctx_y);
                }
                else {
                    throw new Error('TODO');
                }
            }
            else {
                let len = text.length;
                const ctxPeriodWidth = ctx.measureText(period).width;
                while (len && (w = ctx.measureText(text.slice(0, len)).width) > w_max - ctxPeriodWidth) {
                    len--;
                }
                if (len) {
                    text = text.slice(0, len);
                    ctx.fillText(text, ctx_x + ctx_padding, ctx_y);
                    ctx.fillText(period, ctx_x + ctx_padding + ctx.measureText(text).width, ctx_y);
                }
                else {
                    console.error('TODO');
                    throw new Error('TODO');
                }
            }
        }
        $$.$me_ctx_text_render = $me_ctx_text_render;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//ctx.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        let _pxStyleProps;
        function isPxStyleProp(prop) {
            if (!_pxStyleProps) {
                _pxStyleProps = {};
                const pxStyleProps = ['width', 'height'];
                const sides = ['left', 'top', 'right', 'bottom'];
                pxStyleProps.push(...sides);
                pxStyleProps.push('margin');
                pxStyleProps.push('padding');
                for (let i = 0, count = sides.length; i < count; i++) {
                    let side = sides[i];
                    side = side.charAt(0).toUpperCase() + side.slice(1);
                    pxStyleProps.push('margin' + side);
                    pxStyleProps.push('padding' + side);
                }
                for (let i = 0, count = pxStyleProps.length; i < count; i++)
                    _pxStyleProps[pxStyleProps[i]] = true;
            }
            return !!_pxStyleProps[prop];
        }
        function $me_elem(parent, p) {
            const dom_node = p && p.elem && typeof p.elem != 'string' ?
                p.elem :
                (p && p.ns && p.elem ?
                    document.createElementNS(p.ns, p.elem) :
                    document.createElement(p && p.elem || 'div'));
            const style = dom_node.style;
            function setStyleProp(prop, value) {
                if (Number.isFinite(value)) {
                    if (prop == 'opacity') {
                        value += '';
                    }
                    else if (isPxStyleProp(prop)) {
                        value += 'px';
                    }
                }
                else if (typeof value == 'boolean') {
                    if (prop == 'visibility')
                        value = value ? 'visible' : 'hidden';
                }
                if (typeof value != 'string') {
                    const msg = `prop: ${prop}, value: ${value}`;
                    console.error(msg);
                    console.trace();
                    throw new Error(msg);
                }
                else {
                    style[prop] = value;
                }
            }
            if (p.attrs)
                for (let attr in p.attrs)
                    dom_node.setAttribute(attr, p.attrs[attr]);
            if (p.style)
                for (let prop in p.style)
                    setStyleProp(prop, p.style[prop]);
            if (p.props)
                for (let prop in p.props)
                    dom_node[prop] = p.props[prop];
            if (p.events)
                for (let event in p.events)
                    dom_node.addEventListener(event, p.events[event], false);
            if (p.events_async)
                for (let event in p.events_async)
                    dom_node.addEventListener(event, p.events_async[event], { passive: true });
            if (p.events_sync)
                for (let event in p.events_sync)
                    dom_node.addEventListener(event, p.events_sync[event], { passive: false });
            if (p && p.cls)
                dom_node.classList.add(p.cls);
            if (parent) {
                let beforeNode;
                if (p && p.before) {
                    const before = p.before;
                    beforeNode = !before.dom_node ? before : before.dom_node();
                }
                if (parent.dom_node) {
                    if (!beforeNode) {
                        parent.dom_node_append_child(dom_node);
                    }
                    else {
                        parent.dom_node_insert_before(dom_node, beforeNode);
                    }
                }
                else {
                    if (!beforeNode) {
                        parent.appendChild(dom_node);
                    }
                    else {
                        parent.insertBefore(dom_node, beforeNode);
                    }
                }
            }
            let _raf;
            let _styleProps = {};
            let _nodeProps = {};
            let _nodeAttrs = {};
            function applyUpdates() {
                if (_raf === void 0)
                    _raf = requestAnimationFrame(function () {
                        _raf = void 0;
                        for (let prop in _styleProps) {
                            setStyleProp(prop, _styleProps[prop]);
                            delete _styleProps[prop];
                        }
                        for (let prop in _nodeProps) {
                            dom_node[prop] = _nodeProps[prop];
                            delete _nodeProps[prop];
                        }
                        for (let attr in _nodeAttrs) {
                            dom_node.setAttribute(attr, _nodeAttrs[attr]);
                            delete _nodeAttrs[attr];
                        }
                    });
            }
            const self = {
                dom_node() {
                    return dom_node;
                },
                dom_node_style(styleProps, immediatly = false) {
                    if (immediatly)
                        throw new Error('TODO');
                    for (let prop in styleProps)
                        _styleProps[prop] = styleProps[prop];
                    applyUpdates();
                },
                dom_node_props(nodeProps, immediatly = false) {
                    if (immediatly) {
                        for (let prop in nodeProps)
                            dom_node[prop] = nodeProps[prop];
                    }
                    else {
                        for (let prop in nodeProps)
                            _nodeProps[prop] = nodeProps[prop];
                        applyUpdates();
                    }
                },
                dom_node_attrs(nodeAttrs, immediatly = false) {
                    if (immediatly) {
                        for (let attr in nodeAttrs)
                            dom_node.setAttribute(attr, nodeAttrs[attr]);
                    }
                    else {
                        for (let attr in nodeAttrs)
                            _nodeAttrs[attr] = nodeAttrs[attr];
                        applyUpdates();
                    }
                },
                dom_node_append_child(child) {
                    const child_node = child.dom_node ? child.dom_node() : child;
                    dom_node.appendChild(child_node);
                    return self;
                },
                dom_node_insert_before(child, ref) {
                    const child_node = child.dom_node ? child.dom_node() : child;
                    const ref_node = ref.dom_node ? ref.dom_node() : ref;
                    dom_node.insertBefore(child_node, ref_node);
                    return self;
                }
            };
            if (p.children)
                for (let i in p.children)
                    $me_elem(self, p.children[i]);
            return self;
        }
        $$.$me_elem = $me_elem;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//elem.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        function $me_word_plural(count, word1, word2_4, word5more) {
            if (word5more === undefined) {
                word5more = word2_4;
            }
            let result = word5more;
            const decimal = Math.floor(count / 10) % 10;
            if (decimal != 1) {
                const unit = count % 10;
                if (unit == 1) {
                    result = word1;
                }
                else if (unit >= 2 && unit <= 4) {
                    result = word2_4;
                }
            }
            return result;
        }
        $$.$me_word_plural = $me_word_plural;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//me.js.map
;
"use strict";
//demo.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        const mobile_viewport_width_max = 1024;
        function viewport() {
            const result = {
                width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
                height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            };
            return result;
        }
        const pixelRatio = window.devicePixelRatio;
        function $me_demo_search_params(parent, _a, dataWorker, p) {
            const self = $$.$me_elem(parent, {
                props: { id: 'search_params' },
                style: Object.assign({}, (p && p.style), { position: 'absolute', background: 'white' }),
            });
            let elem_canvas_render_raf;
            function elem_canvas_render() {
                if (elem_canvas_render_raf === void 0)
                    elem_canvas_render_raf = requestAnimationFrame(() => {
                        elem_canvas_render_raf = void 0;
                        const ctxHeight = 44 * pixelRatio;
                        const ctxItemMargin = 8 * pixelRatio;
                        const ctxTextY = 36 * pixelRatio;
                        const ctxFontSize = 14 * pixelRatio;
                        let w = 0;
                        elem_canvas_ctx.font = ctxFontSize + 'px system-ui';
                        for (let i = 0, count = modes.length; i < count; i++) {
                            const item = modes[i];
                            w += item.ctx.w = elem_canvas_ctx.measureText(item.title).width;
                            w += 2 * ctxItemMargin;
                        }
                        const clientRect = elem_canvas.dom_node().getBoundingClientRect();
                        modes[0].ctx.x = _a('search_params_canvas_width')() - w;
                        for (let i = 0, count = modes.length; i < count; i++) {
                            const item = modes[i];
                            if (_a('search_params_mode')() == i) {
                                elem_canvas_ctx.fillStyle = '#0070a4';
                                elem_canvas_ctx.fillRect(item.ctx.x, 0, item.ctx.w + 2 * ctxItemMargin, ctxHeight);
                                const ctxTextX = item.ctx.x + ctxItemMargin;
                                elem_canvas_ctx.fillStyle = 'white';
                                elem_canvas_ctx.fillText(item.title, ctxTextX, ctxTextY);
                                if (i < count - 1) {
                                    modes[i + 1].ctx.x = ctxTextX + item.ctx.w + ctxItemMargin;
                                }
                            }
                            else {
                                const ctxTextX = item.ctx.x + ctxItemMargin;
                                elem_canvas_ctx.fillStyle = '#0070a4';
                                elem_canvas_ctx.fillText(item.title, ctxTextX, ctxTextY);
                                if (i < count - 1) {
                                    modes[i + 1].ctx.x = ctxTextX + item.ctx.w + ctxItemMargin;
                                }
                            }
                            item.clientRect.left = clientRect.left + item.ctx.x / pixelRatio;
                            item.clientRect.top = clientRect.top;
                            item.clientRect.bottom = clientRect.top + ctxHeight / pixelRatio;
                            item.clientRect.right = clientRect.left + (item.ctx.x + item.ctx.w + 2 * ctxItemMargin) / pixelRatio;
                        }
                    });
            }
            const elem_canvas = $$.$me_elem(self, { elem: 'canvas', style: { width: '100%', height: '100%' } });
            const elem_canvas_ctx = elem_canvas.dom_node().getContext('2d');
            const modes = [
                { title: 'ПОЛНЫЙ', ctx: { w: 0, x: 0 }, clientRect: { left: 0, top: 0, right: 0, bottom: 0 } },
                { title: 'ОСНОВНОЙ', ctx: { w: 0, x: 0 }, clientRect: { left: 0, top: 0, right: 0, bottom: 0 } },
                { title: 'СЖАТЫЙ', ctx: { w: 0, x: 0 }, clientRect: { left: 0, top: 0, right: 0, bottom: 0 } },
            ];
            const elem_body = $$.$me_elem(null, { elem: document.body, events: {
                    mousemove: 'ontouchstart' in window ? void 0 : (event) => {
                        let i_found;
                        for (let i = 0, count = modes.length; i < count; i++) {
                            const item = modes[i];
                            if (item.clientRect.left < event.clientX && event.clientX < item.clientRect.right &&
                                item.clientRect.top < event.clientY && event.clientY < item.clientRect.bottom &&
                                true) {
                                i_found = i;
                                break;
                            }
                        }
                        if (i_found === void 0) {
                            elem_body.dom_node_style({ cursor: 'default' });
                        }
                        else {
                            elem_body.dom_node_style({ cursor: 'pointer' });
                        }
                    },
                    mousedown: 'ontouchstart' in window ? void 0 : (event) => {
                        click_mode(event.clientX, event.clientY);
                    },
                    touchstart: !('ontouchstart' in window) ? void 0 : (event) => {
                        click_mode(event.touches[0].clientX, event.touches[0].clientY);
                    },
                } });
            function click_mode(clientX, clientY) {
                let i_found;
                for (let i = 0, count = modes.length; i < count; i++) {
                    const item = modes[i];
                    if (item.clientRect.left < clientX && clientX < item.clientRect.right &&
                        item.clientRect.top < clientY && clientY < item.clientRect.bottom &&
                        true) {
                        i_found = i;
                        break;
                    }
                }
                const result = i_found !== void 0;
                if (result) {
                    _a('search_params_mode')(i_found);
                }
                return result;
            }
            setTimeout(() => {
                const conditions = {
                    published_days_ago: { days: 7 },
                    realty_section: { code: ["flat"] },
                    deal_type: { code: ["sale"] },
                    area: { code: ["msk"] },
                    is_deal_actual: true,
                    use_strict_conditions: true,
                };
                dataWorker.postMessage({ cmd: 'conditions', conditions });
            }, 100);
            dataWorker.addEventListener('message', (event) => {
                const response = event.data;
                if (response.status === 'ok' && response.cmd === 'count') {
                    parent.dom_node().dispatchEvent(new CustomEvent('count', { detail: response.count }));
                }
            });
            _a.rw('search_params_mode', [], () => 2, (val) => val % 3);
            _a.rw('search_params_top', ['app_padding'], null, (top) => self.dom_node_style({ top }));
            _a.rw('search_params_left', ['app_padding'], null, (left) => self.dom_node_style({ left }));
            _a.rw('search_params_width', ['viewport_width', 'app_padding'], (v) => v(0) - v(1) * 2, (width) => self.dom_node_style({ width }));
            _a.rw('search_params_height', ['search_params_mode'], (v) => $$.$me_atom_anim({ to: [300, 200, 100][v(0)] }), (height) => self.dom_node_style({ height }));
            _a.rw('search_params_canvas_width', ['search_params_width'], (v) => v(0) * pixelRatio, (width) => elem_canvas.dom_node_props({ width }));
            _a.rw('search_params_canvas_height', ['search_params_height'], (v) => v(0) * pixelRatio, (height) => elem_canvas.dom_node_props({ height }));
            _a.rw('elem_canvas_renderer', ['search_params_canvas_width', 'search_params_canvas_height'], null, (val) => elem_canvas_render());
            return self;
        }
        $$.$me_demo_search_params = $me_demo_search_params;
        function $me_demo_search_result(parent, _a, dataWorker, p) {
            const self = $$.$me_elem(parent, {
                props: { id: 'search_result' },
                style: Object.assign({}, (p && p.style), { position: 'absolute', background: 'white' }),
            });
            const elem_header = $$.$me_elem(self, {
                elem: 'canvas',
                props: { id: 'search_result_header' },
                style: {
                    position: 'absolute',
                    top: 0,
                },
            });
            const modes = [
                { title: 'TАБЛИЦА', ctx: { w: 0, x: 0 }, clientRect: { left: 0, top: 0, right: 0, bottom: 0 } },
                { title: 'ПЛИТКА', ctx: { w: 0, x: 0 }, clientRect: { left: 0, top: 0, right: 0, bottom: 0 } },
            ];
            let search_result_header_canvas_render_raf;
            function search_result_header_canvas_render() {
                if (search_result_header_canvas_render_raf === void 0)
                    search_result_header_canvas_render_raf = requestAnimationFrame(() => {
                        search_result_header_canvas_render_raf = void 0;
                    });
            }
            const grid = $me_demo_search_result_grid(self, _a, dataWorker, { row_height_min: 28, columns: [
                    { id: 'blank', title: '', width: 120 },
                    { id: 'photo', title: 'Фото', width: 36 },
                    { id: 'room_qt', title: 'Комнат', width: 36 },
                    { id: 'metro', title: 'Метро/ЖД', width: 120, align: 1 },
                    { id: 'address', title: 'Адрес', width: 200, align: 1 },
                ] });
            _a.rw('search_result_top', ['search_params_height', 'app_padding'], (v) => v(0) + v(1) + 16, (top) => self.dom_node_style({ top }));
            _a.rw('search_result_left', ['app_padding'], null, (left) => self.dom_node_style({ left }));
            _a.rw('search_result_width', ['viewport_width', 'app_padding'], (v) => v(0) - v(1) * 2, (width) => self.dom_node_style({ width }));
            _a.rw('search_result_height', ['viewport_height', 'search_params_height', 'app_padding'], (v) => v(0) - v(1) - 2 * v(2) - 16, (height) => self.dom_node_style({ height }));
            _a.r('search_result_padding', ['viewport_width'], (v) => v(0) <= mobile_viewport_width_max ? 0 : 16);
            _a.rw('search_result_header_left', ['search_result_padding'], null, (left) => elem_header.dom_node_style({ left }));
            _a.rw('search_result_header_width', ['search_result_width', 'search_result_padding'], (v) => v(0) - 2 * v(1), (width) => elem_header.dom_node_style({ width }));
            _a.rw('search_result_header_height', [], () => 40, (height) => elem_header.dom_node_style({ height }));
            _a.r('search_result_header_margin_bottom', [], () => 16);
            _a.rw('search_result_header_canvas_width', ['search_result_header_width'], (v) => v(0) * pixelRatio, (width) => elem_header.dom_node_props({ width }));
            _a.rw('search_result_header_canvas_height', ['search_result_header_height'], (v) => v(0) * pixelRatio, (height) => elem_header.dom_node_props({ height }));
            _a.rw('search_result_header_canvas_renderer', ['search_result_header_canvas_width', 'search_result_header_canvas_height'], null, (val) => search_result_header_canvas_render());
            _a.r('search_result_grid_width', ['search_result_width', 'search_result_padding'], (v) => v(0) - 2 * v(1));
            _a.rw('_search_result_grid_top', ['search_result_header_height', 'search_result_header_margin_bottom'], (v) => v(0) + v(1), (top) => grid.props({ top }));
            _a.r('search_result_grid_left', ['search_result_padding'], (v) => v(0));
            _a.r('search_result_grid_height', ['search_result_height', '_search_result_grid_top'], (v) => v(0) - v(1));
            return self;
        }
        $$.$me_demo_search_result = $me_demo_search_result;
        function $me_demo_search_result_grid(parent, _a, dataWorker, p) {
            let lastDelta;
            let scrollAccu = 0;
            let wheel_raf;
            const isPassive = false;
            dataWorker.addEventListener('message', (event) => {
                const response = event.data;
                if (response.status === 'ok' && response.cmd === 'conditions') {
                    _a('search_result_grid_conditions')(response.conditions);
                }
                else if (response.status === 'ok' && response.cmd === 'count') {
                    _a('search_result_grid_count')(response.count);
                }
                else if (response.status === 'ok' && response.cmd === 'cell_texts') {
                    _a('search_result_grid_count')(response.count);
                    let idx_min, idx_max;
                    for (let i = _row_i_min; i != _row_i_max; i = (i + 1) % _rows.length) {
                        const item = _rows[i];
                        if (idx_min === void 0)
                            idx_min = item.idx;
                        if (idx_max === void 0 || idx_max < item.idx)
                            idx_max = item.idx;
                    }
                    for (let entry of response.cell_texts) {
                        const idx = entry[0];
                        entry[1].set('idx', entry[0]);
                        _cell_texts.set(entry[0], entry[1]);
                        if (idx_min <= idx && idx <= idx_max) {
                            const i = _row_idx_to_i.get(idx);
                            row_render(i);
                        }
                    }
                }
                else {
                    console.error(response);
                }
            });
            let clientY;
            let lastClientY;
            let accel;
            let prev_time;
            let curr_time;
            let inert_raf;
            let inert_delay;
            let prev_t;
            let accel_k;
            const self = Object.assign({}, $$.$me_elem(parent, {
                props: { id: 'search_result_grid' },
                style: {
                    position: 'absolute',
                    overflow: 'hidden',
                },
                events: {
                    touchstart: !('ontouchstart' in window) ? void 0 : (event) => {
                        clientY = event.touches[0].clientY;
                        lastDelta = 0;
                        prev_time = void 0;
                        if (inert_raf !== void 0) {
                            cancelAnimationFrame(inert_raf);
                            inert_raf = void 0;
                        }
                    },
                    touchmove: !('ontouchstart' in window) ? void 0 : (event) => {
                        const deltaY = clientY - event.touches[0].clientY;
                        if (!deltaY)
                            return;
                        if (Math.sign(lastDelta) != Math.sign(deltaY)) {
                            scrollAccu = deltaY;
                            prev_time = performance.now();
                        }
                        else {
                            if (prev_time === void 0)
                                prev_time = performance.now();
                            scrollAccu += deltaY;
                        }
                        lastClientY = event.touches[0].clientY;
                        lastDelta = deltaY;
                        if (scrollAccu < 0 || scrollAccu > 0) {
                            if (!isPassive)
                                event.preventDefault();
                            if (wheel_raf === void 0)
                                wheel_raf = requestAnimationFrame((t) => {
                                    wheel_raf = void 0;
                                    if (scroll_y(scrollAccu)) {
                                        if (prev_time !== void 0) {
                                            prev_t = t;
                                            const curr_time = performance.now();
                                            accel = scrollAccu / (curr_time - prev_time);
                                            prev_time = curr_time;
                                        }
                                        scrollAccu = 0;
                                        clientY = lastClientY;
                                    }
                                });
                        }
                        else {
                            accel = 0;
                        }
                    },
                    touchend: !('ontouchstart' in window) ? void 0 : (event) => {
                        prev_time = void 0;
                        accel_k = 0.99;
                        function touch_inert(accel) {
                            if (Math.abs(accel) >= 1 / 17) {
                                inert_raf = requestAnimationFrame((t) => {
                                    inert_raf = void 0;
                                    const scrollAccu = accel * (t - prev_t);
                                    if (Math.abs(scrollAccu) > 1 && scroll_y(Math.round(scrollAccu))) {
                                        const accel_new = accel * accel_k;
                                        accel_k = accel_k * 0.99;
                                        prev_t = t;
                                        touch_inert(accel_new);
                                    }
                                });
                            }
                        }
                        if (Math.abs(accel) >= 1)
                            touch_inert(accel);
                    },
                },
                events_sync: {
                    wheel: 'ontouchstart' in window ? void 0 : (event) => {
                        const deltaY = event.deltaY;
                        if (!deltaY)
                            return;
                        if (Math.sign(lastDelta) != Math.sign(deltaY)) {
                            scrollAccu = deltaY;
                        }
                        else {
                            scrollAccu += deltaY;
                        }
                        lastDelta = deltaY;
                        if (scrollAccu < 0 || scrollAccu > 0) {
                            if (!isPassive)
                                event.preventDefault();
                            if (wheel_raf === void 0)
                                wheel_raf = requestAnimationFrame(() => {
                                    wheel_raf = void 0;
                                    if (scroll_y(scrollAccu))
                                        scrollAccu = 0;
                                });
                        }
                    },
                },
            }), { props: (p) => {
                    for (let prop in p) {
                        _a('search_result_grid_' + prop)(p[prop]);
                    }
                } });
            const elem_header = $$.$me_elem(self, {
                elem: 'canvas', style: { position: 'absolute', top: 0, left: 0 },
            });
            const header_ctx = elem_header.dom_node().getContext('2d');
            _a.w('search_result_grid_width', (width) => self.dom_node_style({ width }));
            _a.w('search_result_grid_height', (height) => self.dom_node_style({ height }), { t: $$.$me_atom_type.force });
            _a.w('search_result_grid_top', (top) => self.dom_node_style({ top }));
            _a.w('search_result_grid_left', (left) => self.dom_node_style({ left }));
            let _row_i_min, _row_i_max;
            _a.r('search_result_grid_columns');
            _a.r('search_result_grid_provider');
            _a.w('search_result_grid_count', (grid_count) => {
                if (!_rows.length)
                    throw new Error('TODO');
                setTimeout(() => adjust_rows());
            });
            _a.w('search_result_grid_conditions', (grid_conditions) => {
                _row_i_min = void 0;
                _row_i_max = void 0;
                dataWorker.postMessage({ cmd: 'idx_min_max' });
                const grid_height = _a('search_result_grid_height')();
                const row_height_min = _a('search_result_grid_row_height_min')();
            });
            _a.r('search_result_grid_columns_ctx', ['search_result_grid_columns'], (v) => {
                const columns = v(0);
                let _columns = [];
                let cols = [];
                for (let i = 0, count = columns.length; i < count; i++) {
                    const col = columns[i];
                    _columns.push(Object.assign({}, col, { ctx: { w: 0, x: 0 }, clientRect: { left: 0, top: 0, right: 0, bottom: 0 } }));
                    cols.push(col.id);
                }
                dataWorker.postMessage({ cmd: 'cols', cols });
                return _columns;
            });
            _a.r('search_result_grid_row_height_min');
            _a.rw('search_result_grid_header_height', ['search_result_grid_row_height_min'], null, (height) => elem_header.dom_node_style({ height }));
            let _visible_row_count;
            let _rows = [];
            _a.rw('search_result_grid_visible_row_count', ['search_result_grid_height', 'search_result_grid_row_height_min'], (v) => {
                const visible_row_count = Math.max(0, Math.ceil(v(0) / v(1)) + 1);
                if (_visible_row_count === void 0 || _visible_row_count < visible_row_count)
                    return visible_row_count;
                return _visible_row_count;
            }, (visible_row_count) => {
                const delta = _visible_row_count === void 0 ? visible_row_count : visible_row_count - _visible_row_count;
                if (delta) {
                    _visible_row_count = visible_row_count;
                    const ctxSize = _a('search_result_grid_header_canvas_ctx_size')();
                    for (let i = 0; i < delta; i++) {
                        let item = {};
                        item.row = $$.$me_elem(self, { before: elem_header, style: {
                                width: '100%',
                                height: _a('search_result_grid_row_height_min')(),
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            } });
                        item.canvas = $$.$me_elem(item.row, { elem: 'canvas', style: {
                                width: '100%',
                                height: _a('search_result_grid_row_height_min')(),
                                position: 'absolute',
                                top: 0,
                                left: 0,
                            }, props: Object.assign({}, ctxSize) });
                        item.ctx = item.canvas.dom_node().getContext('2d');
                        _rows.push(item);
                    }
                    dataWorker.postMessage({ cmd: 'page', page: _rows.length });
                }
            });
            _a.rw('search_result_grid_header_width', ['search_result_grid_width'], null, (width) => elem_header.dom_node_style({ width }));
            _a.rw('search_result_grid_header_canvas_ctx_size', ['search_result_grid_width', 'search_result_grid_row_height_min'], (v) => ({ width: v(0) * pixelRatio, height: v(1) * pixelRatio }), (val) => elem_header.dom_node_props(val));
            _a.rw('search_result_grid_header_renderer', ['search_result_grid_columns_ctx', 'search_result_grid_header_canvas_ctx_size'], null, () => {
                search_result_grid_header_render();
                let idx_min, idx_max;
                for (let i = _row_i_min; i != _row_i_max; i = (i + 1) % _rows.length)
                    row_render(i);
            });
            let search_result_grid_header_render_raf;
            const ctxLineWidth = 1 * pixelRatio;
            const ctxFontSize = 14 * pixelRatio;
            const ctxTextMarginHor = 4 * pixelRatio;
            const ctxTextMarginVert = 8 * pixelRatio;
            const fontFamily = 'system-ui';
            const lineColor = '#adb0b8';
            const textColor = '#313745';
            const headerBackground = '#D8DCE3';
            const cellBackground = '#f5f8f8';
            function search_result_grid_header_render() {
                if (search_result_grid_header_render_raf === void 0)
                    search_result_grid_header_render_raf = requestAnimationFrame(() => {
                        search_result_grid_header_render_raf = void 0;
                        const ctx = header_ctx;
                        const ctx_size = _a('search_result_grid_header_canvas_ctx_size')();
                        ctx.globalAlpha = 1;
                        ctx.fillStyle = headerBackground;
                        ctx.fillRect(0, 0, ctx_size.width, ctx_size.height);
                        ctx.beginPath();
                        ctx.strokeStyle = lineColor;
                        ctx.lineWidth = ctxLineWidth;
                        const _columns = _a('search_result_grid_columns_ctx')();
                        {
                            const y = ctx_size.height - ctxLineWidth;
                            ctx.moveTo(0, y);
                            ctx.lineTo(ctx_size.width, y);
                        }
                        const clientRect = elem_header.dom_node().getBoundingClientRect();
                        for (let i = 0, count = _columns.length; i < count; i++) {
                            const col = _columns[i];
                            col.ctx.x = !i ? 0 : _columns[i - 1].ctx.x + _columns[i - 1].ctx.w;
                            col.ctx.w = col.width * pixelRatio;
                            const x = col.ctx.x + col.ctx.w;
                            ctx.moveTo(x, 0);
                            ctx.lineTo(x, ctx_size.height);
                            col.clientRect.left = clientRect.left + col.ctx.x / pixelRatio;
                            col.clientRect.right = col.clientRect.left + col.ctx.w / pixelRatio;
                            col.clientRect.top = clientRect.top;
                            col.clientRect.bottom = clientRect.top + ctx_size.height;
                        }
                        ctx.closePath();
                        ctx.stroke();
                        ctx.font = ctxFontSize + 'px ' + fontFamily;
                        ctx.fillStyle = textColor;
                        for (let i = 0, count = _columns.length; i < count; i++) {
                            const col = _columns[i];
                            const text = col.title;
                            $$.$me_ctx_text_render(ctx, text, col.ctx.x, col.ctx.w, ctxTextMarginHor, ctx_size.height - ctxTextMarginVert - ctxLineWidth);
                        }
                    });
            }
            let row_render_raf;
            let _row_render_i;
            function row_render(row_i) {
                if (_row_render_i === void 0)
                    _row_render_i = new Set();
                _row_render_i.add(row_i);
                if (row_render_raf === void 0)
                    row_render_raf = requestAnimationFrame(() => {
                        row_render_raf = void 0;
                        const ctx_size = _a('search_result_grid_header_canvas_ctx_size')();
                        for (let row_i of _row_render_i) {
                            const start = performance.now();
                            _rows[row_i].canvas.dom_node().width = ctx_size.width;
                            _rows[row_i].canvas.dom_node().height = ctx_size.height;
                            const ctx = _rows[row_i].ctx;
                            ctx.fillStyle = cellBackground;
                            ctx.fillRect(0, 0, ctx_size.width, ctx_size.height);
                            ctx.strokeStyle = lineColor;
                            ctx.lineWidth = ctxLineWidth;
                            const _columns = _a('search_result_grid_columns_ctx')();
                            {
                                const y = Math.round(ctx_size.height - ctxLineWidth);
                                ctx.moveTo(0, y);
                                ctx.lineTo(ctx_size.width, y);
                            }
                            for (let i = 0, count = _columns.length; i < count; i++) {
                                const col = _columns[i];
                                col.ctx.x = Math.round(!i ? 0 : _columns[i - 1].ctx.x + _columns[i - 1].ctx.w);
                                col.ctx.w = Math.round(col.width * pixelRatio);
                                const x = col.ctx.x + col.ctx.w;
                                ctx.moveTo(x, 0);
                                ctx.lineTo(x, ctx_size.height);
                            }
                            ctx.closePath();
                            ctx.stroke();
                            ctx.font = ctxFontSize + 'px ' + fontFamily;
                            ctx.fillStyle = textColor;
                            let was_clip = false;
                            for (let i = 0, count = _columns.length; i < count; i++)
                                do_render_cell(row_i, i);
                            const duration = performance.now() - start;
                            if (duration >= 7)
                                console.warn({ row_render: duration, row_i, row_idx: _rows[row_i].idx });
                        }
                        _row_render_i = void 0;
                    });
            }
            function do_render_cell(row_i, i) {
                const ctx = _rows[row_i].ctx;
                const ctx_size = _a('search_result_grid_header_canvas_ctx_size')();
                const _columns = _a('search_result_grid_columns_ctx')();
                const col = _columns[i];
                const text = cell_text(_rows[row_i].idx, i);
                $$.$me_ctx_text_render(ctx, text, col.ctx.x, col.ctx.w, ctxTextMarginHor, ctx_size.height - ctxTextMarginVert - ctxLineWidth, col.align);
            }
            const _cell_texts = new Map();
            function cell_text(idx, col_i) {
                if (idx === void 0) {
                    console.error(_rows.length);
                    throw new Error('here');
                }
                const _columns = _a('search_result_grid_columns_ctx')();
                const col = _columns[col_i].id;
                let result = '';
                if (_cell_texts.has(idx)) {
                    const row = _cell_texts.get(idx);
                    if (row.has(col))
                        result = row.get(col);
                }
                return result;
            }
            function adjust_rows(val, fromBottom = false) {
                const start = performance.now();
                const grid_count = _a('search_result_grid_count')();
                if (grid_count === void 0 || grid_count == 0)
                    return;
                let idx;
                let _row_i_min_new, _row_i_max_new;
                const grid_height = _a('search_result_grid_height')();
                const row_height_min = _a('search_result_grid_row_height_min')();
                if (!fromBottom) {
                    if (_row_i_max === void 0 || _rows[(_row_i_max + _rows.length - 1) % _rows.length].idx < grid_count - 1) {
                        let bottom_prev = val;
                        if (bottom_prev === void 0) {
                            bottom_prev = _row_i_min === void 0 ? row_height_min : _rows[_row_i_min].top;
                        }
                        if (_row_i_min === void 0)
                            _row_i_min = 0;
                        idx = _rows[_row_i_min].idx || 0;
                        for (let i = _row_i_min; idx < grid_count; i = (i + 1) % _rows.length) {
                            const item = _rows[i];
                            const top = item.top = bottom_prev;
                            if (item.height === void 0)
                                item.height = row_height_min;
                            bottom_prev = top + item.height;
                            if (item.idx === void 0 || idx != item.idx) {
                                item.idx = idx;
                                item.need_render = true;
                            }
                            idx++;
                            if (top + item.height <= row_height_min) {
                                continue;
                            }
                            if (_row_i_min_new === void 0) {
                                _row_i_min_new = i;
                            }
                            _row_i_max_new = (i + 1) % _rows.length;
                            if (bottom_prev >= grid_height)
                                break;
                        }
                    }
                }
                else if (_rows[_row_i_min].idx > 0) {
                    let top_next = val;
                    const last_visible_row_i = (_row_i_max + _rows.length - 1) % _rows.length;
                    idx = _rows[last_visible_row_i].idx;
                    for (let i = last_visible_row_i; idx >= 0; i = (i + _rows.length - 1) % _rows.length) {
                        const item = _rows[i];
                        if (item.height === void 0)
                            item.height = row_height_min;
                        const top = item.top = top_next - item.height;
                        if (Number.isNaN(item.top)) {
                            console.log();
                            throw new Error('here');
                        }
                        top_next = top;
                        if (item.idx === void 0 || idx != item.idx) {
                            item.idx = idx;
                            item.need_render = true;
                        }
                        idx--;
                        if (top >= grid_height) {
                            continue;
                        }
                        if (_row_i_max_new === void 0) {
                            _row_i_max_new = (i + 1) % _rows.length;
                        }
                        _row_i_min_new = i;
                        if (top_next <= row_height_min)
                            break;
                    }
                }
                if (_row_i_min_new === void 0 || _row_i_max_new === void 0)
                    return;
                _row_i_min = _row_i_min_new;
                _row_i_max = _row_i_max_new;
                const duration = performance.now() - start;
                if (duration > 10)
                    console.warn({ adjust_rows: duration });
                if (idx <= 0) {
                    adjust_rows(row_height_min);
                }
                else if (idx >= grid_count) {
                    adjust_rows(grid_height, true);
                }
                else {
                    after_adjust_rows();
                }
            }
            let _row_idx_to_i;
            function after_adjust_rows() {
                const start = performance.now();
                let render_time = 0;
                let render_count = 0;
                let idx_min, idx_max;
                const row_idx_to_i = new Map();
                for (let i = _row_i_min; i != _row_i_max; i = (i + 1) % _rows.length) {
                    const item = _rows[i];
                    row_idx_to_i.set(item.idx, i);
                    if (idx_min === void 0)
                        idx_min = item.idx;
                    if (idx_max === void 0 || idx_max < item.idx)
                        idx_max = item.idx;
                    if (item.need_render) {
                        const render_start = performance.now();
                        row_render(i);
                        render_time += performance.now() - render_start;
                        item.need_render = false;
                        render_count++;
                    }
                    _rows[i].row.dom_node_style({ visibility: 'visible', top: _rows[i].top });
                }
                _row_idx_to_i = row_idx_to_i;
                if (idx_min === void 0 || idx_max === void 0)
                    console.error({ _row_i_min, _row_i_max }, [..._rows]);
                dataWorker.postMessage({ cmd: 'idx_min_max', idx_min, idx_max });
                const data_idx_min = Math.max(0, idx_min - _rows.length);
                const data_idx_max = Math.min(_a('search_result_grid_count')() - 1, data_idx_min + 3 * _rows.length);
                const idx_set = new Set();
                for (let i = data_idx_min; i <= data_idx_max; i++) {
                    if (!_cell_texts.has(i))
                        idx_set.add(i);
                }
                let deleted_entries = 0;
                for (let entry of _cell_texts) {
                    const idx = entry[0];
                    if (idx < data_idx_min || idx > data_idx_max) {
                        deleted_entries++;
                        _cell_texts.delete(idx);
                    }
                }
                if (deleted_entries)
                    console.log({ deleted_entries });
                if (idx_set.size) {
                    dataWorker.postMessage({ cmd: 'idx_set', idx_set });
                }
                for (let i = _row_i_max; i != _row_i_min; i = (i + 1) % _rows.length) {
                    _rows[i].row.dom_node_style({ visibility: 'hidden' });
                }
                const duration = performance.now() - start;
                if (duration > 10)
                    console.warn({ after_adjust_rows: duration, render_time, render_count });
            }
            function scroll_y(val) {
                if (_row_i_min === void 0 || _row_i_max === void 0) {
                    console.error({ _row_i_min, _row_i_max });
                    return false;
                }
                if (val > 0) {
                    if (_rows[_row_i_min] === void 0) {
                        console.error({ _row_i_min, val }, [..._rows]);
                    }
                    let bottom_prev = _rows[_row_i_min].top - val;
                    adjust_rows(bottom_prev);
                }
                else {
                    const last_visible_row_i = (_row_i_max + _rows.length - 1) % _rows.length;
                    const last_visible_row = _rows[last_visible_row_i];
                    if (last_visible_row === void 0) {
                        console.error({ last_visible_row_i, _row_i_max }, [..._rows]);
                    }
                    let top_next = last_visible_row.top + last_visible_row.height - val;
                    adjust_rows(top_next, true);
                }
                return true;
            }
            if (p)
                self.props(p);
            return self;
        }
        $$.$me_demo_search_result_grid = $me_demo_search_result_grid;
        function $me_demo_app(root) {
            const margin = 16;
            const self = $$.$me_elem(null, {
                elem: root,
                style: {
                    background: '#EEE',
                    position: 'relative',
                    margin: 0,
                    fontFamily: 'system-ui',
                    fontWeight: '400',
                    fontSize: '100%',
                },
            });
            const _a = $$.$me_atoms();
            const _viewport = viewport();
            _a.r('viewport_width', [], () => _viewport.width);
            _a.r('viewport_height', [], () => _viewport.height);
            _a.r('app_padding', ['viewport_width'], (v) => {
                const result = v(0) <= mobile_viewport_width_max ? 0 : 16;
                return result;
            });
            let dataWorker;
            try {
                dataWorker = new Worker('dw.js');
            }
            catch (e) {
                self.dom_node_style({ background: 'red' });
            }
            const _search_params = $me_demo_search_params(self, _a, dataWorker);
            const _search_result = $me_demo_search_result(self, _a, dataWorker);
            const _search_params_height = 400;
            window.addEventListener('resize', function () {
                const _viewport = viewport();
                _a('viewport_width')(_viewport.width);
                _a('viewport_height')(_viewport.height);
            });
            return self;
        }
        $$.$me_demo_app = $me_demo_app;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//demo.view.js.map
;
(function() { 'use strict'
// ============================================================================

const DB_NAME = 'bw'
const DB_VERSION = 1
const headers = new Headers([
  ['Accept', 'application/json'],
  ['Content-Type', 'application/json'],
])
const _idx_set = new Set()

let _idx_min
let _idx_max
let _page = 0
let _conditions = void 0
let _count = void 0
let cols = void 0

function open_idb(onsuccess) {
  const open = indexedDB.open(DB_NAME, DB_VERSION )
  open.onupgradeneeded = event => {
    const idb = event.target.result
    const searchResultStore = idb.createObjectStore('searchResult', {keyPath: 'idx'})
    searchResultStore.createIndex('guid', 'guid', {unique: true})

    const advStore = idb.createObjectStore('adv', {keyPath: 'guid'})
  }
  open.onversionchange = event => console.warn(event)
  open.onerror = event => console.error(event)
  open.onsuccess = event => onsuccess(event.target.result)
}

onmessage = function(event) {
  const start = performance.now()
  if (event.data.cmd == 'conditions') {
    let conditions = event.data.conditions
    _count = void 0

    open_idb(idb => {
      const transaction = idb.transaction(['searchResult'], 'readwrite')
      transaction.onerror = () => console.error(transaction.error)
      transaction.oncomplete = function(event) {
        postMessage({cmd: 'conditions', status: 'ok', _conditions})
        _conditions = conditions
        process()
      }
      var objectStore = transaction.objectStore("searchResult")
      var objectStoreRequest = objectStore.clear()
    })

  } else if (event.data.cmd == 'page') {
    _page = event.data.page
  } else if (event.data.cmd == 'idx_min_max') {
    _idx_min = event.data.idx_min
    _idx_max = event.data.idx_max
    process()
  } else if (event.data.cmd == 'idx_set') {
    for (let idx of event.data.idx_set) _idx_set.add(idx)
    open_idb(idb => {
      fetchHelper(idb, () => process(), (error) => finish(error) )
    })
  } else if (event.data.cmd == 'cols') {
    cols = event.data.cols
  } else {
    console.error(event.data)
  }
}

let _guids_to_fetch = new Set()
let _process_in_progress
let _process_failed
function finish(error) {
  if (error) {
    console.error(error, error.message, error.name)
    console.trace()
    _process_failed = true
  } else {
    _process_in_progress = false
    process()
  }
}

let _process_in_progress_raf
let _last_section
function process() {
  if (_process_failed) { console.error({_process_failed}); return }
  if (_process_in_progress_raf !== void 0) {
    clearTimeout(_process_in_progress_raf)
    _process_in_progress_raf = void 0
  }
  if (_process_in_progress) {
    _process_in_progress_raf = setTimeout(() => {
      _process_in_progress_raf = void 0
      if (_process_in_progress) console.warn({_process_in_progress, _last_section})
    }, 1000)
    return
  }
  // console.log(_idx_set, {_count}, _guids_to_fetch.size)
  if (_conditions && _page && (_count === void 0 || _idx_set.size) ) {
    _last_section = 'idx'
    _process_in_progress = true
    if (_count === void 0) {
      fetchSearchResult(0, _page * 3 + 1)
    } else {
      open_idb(idb => {
        fetchHelper(idb, () => {
          if (!_idx_set.size) { finish(); return }
          const idx_sorted = [..._idx_set].sort((a, b) => a - b)
          for (let i = idx_sorted.length - 1; i >= 0; i--) {
            const idx = idx_sorted[i]
            if (idx < _count) break
            _idx_set.delete(idx)
            idx_sorted.pop()
          }
          if (!idx_sorted.length) { finish(); return }
          let i, j
          for (i = 0; i < idx_sorted.length && idx_sorted[i] < _idx_min; i++);
          if (i >= idx_sorted.length) {
            _idx_set.clear()
            finish();
            return
          }
          let fetch_size = 0
          for (
            j = i;
            j - 1 >= 0 && idx_sorted[j - 1] + 1 == idx_sorted[j] && fetch_size <= _page;
            j--, fetch_size++
          );
          const fetch_from = idx_sorted[j]
          for (j--; j >= 0; j--) _idx_set.delete(idx_sorted[j])
          for (
            j = i;
            j < idx_sorted.length - 1 && idx_sorted[j] + 1 == idx_sorted[j + 1] && fetch_size < _page * 3;
            j++, fetch_size++
          );
          for (; j < idx_sorted.length; j++) _idx_set.delete(idx_sorted[j])
          if (fetch_size > 0) fetchSearchResult(fetch_from, fetch_size); else finish()
        }, (error) => finish(error) )
      })
    }
  } else if (_guids_to_fetch.size && _idx_min !== void 0 && _idx_max !== void 0) {
    _last_section = 'guid'
    _process_in_progress = true
    open_idb(idb => {
      const guids_to_fetch = new Set()
      var transaction = idb.transaction(["searchResult"], "readonly")
      transaction.onerror = () => finish(transaction.error)
      transaction.oncomplete = function(event) {
        try {
          _guids_to_fetch = guids_to_fetch
          if (guids_to_fetch.size) fetchAdv(guids_to_fetch); else finish()
        } catch(e) {
          finish(e)
        }
      }
      const idx_min = Math.max(0, _idx_min - _page)
      const idx_max = Math.min(_count - 1, idx_min + _page * 3 - 1)
      const searchResultStore = transaction.objectStore('searchResult')
      for (let idx = idx_min; idx <= idx_max; idx++) {
        const idxRequest = searchResultStore.get(idx)
        idxRequest.onerror = (event) => finish(event.target.result)
        idxRequest.onsuccess = (event) => {
          if (event.target.result) {
            const guid = event.target.result.guid
            if (_guids_to_fetch.has(guid)) guids_to_fetch.add(guid)
          }
        }
      }
    })
  }
}

function fetchAdv(guids_to_fetch) {
  const bodyJson = {
    fields: [
      // key
      "guid",
      // adv hash like
      'search_update_datetime',

      "w6_offer_id",
      'object_guid',

      // linked to offer id
      "offer_pub_list",

      "deal_status_id",
      "user_deal_status_id",
      "winner_relevance",
      "free_mode_relevance",
      "photo_count",
      "video_count",
      "geo_cache_street_name",
      "price_rub",
      "pub_datetime",
      "media_id",
      "media_name",
      "broker.short_name",
      "broker.url",
      "external_url",
      "phone_list.is_black",
      "phone_list.black_note",
      "creation_datetime",
      "deal_type_id",
      "geo_cache_building_name",
      "storey",
      "storeys_count",
      "walls_material_type_id",
      "total_square",
      "life_square",
      "kitchen_square",
      "security_type_id",
      "note",
      "owners_count",
      "ownership_type_id",
      "ownership_year",
      "balcony_type_id",
      "price_change_date",
      "price_change_type_id",
      "video_list",
      "built_year",
      "sale_type_name",
      "agency_bonus",
      "agency_bonus_type_id",
      "agency_bonus_currency_type_id",
      "total_room_count",
      "offer_room_count",
      "is_studio",
      "is_free_planning",
      "realty_type_id",
      "rooms_adjacency_type_id",
      "geo_cache_subway_station_name_1",
      "geo_subway_station_guid_1",
      "transport_access_1",
      "walking_access_1",
      "geo_cache_subway_station_name_2",
      "geo_subway_station_guid_2",
      "transport_access_2",
      "walking_access_2",
      "geo_cache_subway_station_name_3",
      "geo_subway_station_guid_3",
      "transport_access_3",
      "walking_access_3",
      "geo_cache_subway_station_name_4",
      "geo_subway_station_guid_4",
      "transport_access_4",
      "walking_access_4",
      'water_closet_type_id',
      'parking_type_id',
      'territory_type_id',
      'window_overlook_type_id',
      'apartment_condition_type_id',
      'elevator_type_id',
      'square_explication',
      'meter_price_rub',
    ],
    filters: { guid: [...guids_to_fetch] },
    size: guids_to_fetch.size,
    conditions: _conditions,
    dsl_version:2,
  }

  const body = JSON.stringify(bodyJson)
  fetch(_url, {method: 'POST', headers, body, mode: 'cors'})
  .catch(error => finish(error) )
  .then(response => {
      if (response.status != 200) {
      finish([response.status, response.statusText, bodyJson])
    } else {
      const start = Date.now()
      response.json()
      .catch(error => finish(error))
      .then(data => {
        open_idb(idb => {
          var transaction = idb.transaction(["adv"], "readwrite")
          transaction.onerror = () => finish(transaction.error)
          transaction.oncomplete = function(event) {
            const cell_texts = new Map()
            const transaction = idb.transaction(["searchResult", 'adv'], "readonly")
            transaction.onerror = () => finish(transaction.error)
            let finished = false
            transaction.oncomplete = (event) => {
              postMessage({cmd: 'cell_texts', status: 'ok', cell_texts})
              if (finished) console.log('finish')
              finish()
            }
            const searchResultStore = transaction.objectStore('searchResult')
            const guidIndex = searchResultStore.index('guid')
            if (_idx_min === void 0 || _idx_max === void 0) {
              console.error({_idx_min, _idx_max})
              finish()
            } else {
              const idx_min = Math.max(0, _idx_min - _page)
              const idx_max = Math.min(_count - 1, idx_min + _page * 3 - 1)

              let didSet = false
              for (let i = 0; i < data.advs.length; i++) {
                const adv = data.advs[i]
                const guidRequest = guidIndex.get(adv.guid)
                guidRequest.onerror = (event) => finish(event.target.result)
                guidRequest.onsuccess = (event) => {
                  if (event.target.result) {
                    const idx = event.target.result.idx
                    if (idx_min <= idx && idx <= idx_max) {
                      add_row_to(cell_texts, idx, adv)
                      didSet = true
                    }
                  }
                  if (i === data.advs.length - 1 && !didSet) {
                    console.warn('finish')
                    finished = true
                    finish()
                  }
                }
              }
            }
          }
          if (!data.advs.length) {
            finish()
          } else {
            var objectStore = transaction.objectStore("adv");
            for (let i = 0; i < data.advs.length; i++) {
              const adv = data.advs[i]
              var request = objectStore.put(adv) // TODO: use add instead of put
              _guids_to_fetch.delete(adv.guid)
            }
          }
        })
      })
    }
  })
}

const _url = 'https://mls.baza-winner.ru/v2/users/unauthenticated/items/_search.json?project_code=w7'
function fetchSearchResult(fetchFrom, size) {
   const bodyJson = {
    aggregations: {
      avg_price_rub: true,
      avg_meter_price_rub: true,
    },
    fields: [
      "guid",
      'search_update_datetime',

      // "w6_offer_id",
      // 'object_guid',

      // user specific (linked to offer id)
      // "is_selected",
      // "is_favorite",
      // "is_hidden",
      // "is_sended_to_viewboard",
      // "is_liked_on_viewboard",
      // "is_disliked_on_viewboard",
      // "is_monitored",
      // "user_note",
    ],
    sort: [
      { winner_relevance: { order:"desc" } },
      { w6_offer_id: { order:"desc" } },
    ],
    from: fetchFrom,
    size,
    conditions: _conditions,
    // mixins: { is_selected: true },
    dsl_version:2,
  }
  const body = JSON.stringify(bodyJson)
  // console.log({fetchFrom, size})
  fetch(_url, {method: 'POST', headers, body, mode: 'cors'})
  .catch(error => finish(error))
  .then(response => {
    if (response.status != 200) {
      console.error(response.statusText)
      _count = null
      _process_in_progress = false
      _process_failed = true
    } else {
      const start = Date.now()
      response.json()
      .catch(error => {
        console.error(error)
        _count = null
        _process_in_progress = false
        _process_failed = true
      })
      .then(data => {
        postMessage({cmd: 'count', status: 'ok', count: _count = data.meta.total, timing: Date.now() - start})
        // console.warn({_count, fetchFrom, size}, data.advs)

        open_idb(idb => {

          var transaction = idb.transaction(["searchResult"], "readwrite")
          transaction.onerror = () => finish(transaction.error)
          transaction.oncomplete = function(event) {
            fetchHelper(idb, () => finish(), (error) => finish(error))
          }
          if (!data.advs.length) {
            finish()
          } else {
            var objectStore = transaction.objectStore("searchResult");
            for (let i = 0;  i < data.advs.length; i++) {
              const idx = fetchFrom + i
              _idx_set.add(idx)
              const adv = data.advs[i]
              const item = {idx, guid: adv.guid, search_update_datetime: adv.search_update_datetime}
              // objectStore.add(item);
              objectStore.put(item); // TODO: use add instead put
            }
          }
        })
      })
    }
  })
}

function fetchHelper(idb, oncomplete, onerror) {
  var transaction = idb.transaction(["searchResult"], "readwrite")
  transaction.onerror = () => onerror(transaction.error)
  transaction.oncomplete = function(event) {
    const transaction = idb.transaction(["searchResult", 'adv'], "readonly")
    const searchResultStore = transaction.objectStore('searchResult')
    const advStore = transaction.objectStore('adv')
    const cell_texts = new Map()
    transaction.onerror = () => onerror(transaction.error)
    transaction.oncomplete = function(event) {
      // console.log(_guids_to_fetch)
      if (cell_texts.size) postMessage({cmd: 'cell_texts', status: 'ok', cell_texts})
      oncomplete()
    }
    for (let idx of _idx_set) {
      searchResultStore.get(idx).onsuccess = function(event) {
        if (!event.target.result) return
        _idx_set.delete(idx)
        const {guid, search_update_datetime} = event.target.result
        const guidRequest = advStore.get(guid)
        guidRequest.onerror = (event) => onerror(event.target.result)
        guidRequest.onsuccess = function(event) {
          try {
            // console.log(event.target.result)
            const adv = event.target.result
            if (adv) add_row_to(cell_texts, idx, adv)
            if (!adv || adv.search_update_datetime != search_update_datetime) _guids_to_fetch.add(guid)
          } catch (e) {
            finish(e)
          }
        }
      }
    }
  }
}

function add_row_to(cell_texts, idx, adv) {
  const row = new Map()
  for (let fld of cols) {
    let result
    if (fld == 'blank') {

    } else if (fld == 'photo') {

    } else if (fld == 'room_qt') {
      result = adv['total_room_count']
    } else if (fld == 'metro') {
      result = adv['geo_cache_subway_station_name_1']
    } else if (fld == 'far') {
      const walking = adv['walking_access_1']
      const transport = adv['transport_access_1']
      result =
          walking ? walking + 'п' :
          transport ? transport + 'т' :
          ''
    } else if (fld == 'address') {
      const geo_cache_street_name = adv['geo_cache_street_name']
      const geo_cache_building_name = adv['geo_cache_building_name']
      result = !geo_cache_building_name ? geo_cache_street_name : geo_cache_street_name + ', ' + geo_cache_building_name
    }
    if (result != null) row.set(fld, result)
  }
  cell_texts.set(idx, row)
}

// ============================================================================
})()

//# sourceMappingURL=web.js.map