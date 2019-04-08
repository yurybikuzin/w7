
var $node = $node || {}
void function( module ) { var exports = module.exports = this; function require( id ) { return $node[ id.replace( /^.\// , "../mol/" ) + ".js" ] }; 

;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports;
//mol.js.map
;

$node[ "../mol/mol.js" ] = $node[ "../mol/mol.js" ] = module.exports }.call( {} , {} )

;
"use strict"
/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$$ { export var x = 2 } // overrides
/// 	namespace $.$$ { console.log( x , y ) } // usage
///
var $ = ( typeof module === 'object' ) ? Object.setPrototypeOf( module['export'+'s'] , self ) : self
$.$$ = $

$.$mol = $  // deprecated

;
"use strict";
var $;
(function ($) {
    let $$;
    (function ($$_1) {
    })($$ = $.$$ || ($.$$ = {}));
    function $mol_ambient(overrides) {
        return Object.setPrototypeOf(overrides, this);
    }
    $.$mol_ambient = $mol_ambient;
})($ || ($ = {}));
//ambient.js.map
;
"use strict";
var $;
(function ($_1) {
    let $$;
    (function ($$) {
        let $;
    })($$ = $_1.$$ || ($_1.$$ = {}));
    class $mol_object {
        get $() {
            const owner = this.object_owner();
            return (owner && owner.$ || $);
        }
        static make(config) {
            const instance = new this;
            for (let key in config)
                instance[key] = config[key];
            return instance;
        }
        static toString() {
            return this.name;
        }
        object_owner(next) {
            return this['object_owner()'] || (this['object_owner()'] = next);
        }
        object_host(next) {
            return this['object_host()'] || (this['object_host()'] = next);
        }
        object_field(next) {
            return this['object_field()'] || (this['object_field()'] = next) || '';
        }
        object_id(next) {
            return this[Symbol.toStringTag] || (this[Symbol.toStringTag] = next) || '';
        }
        toString() {
            return this.object_id();
        }
        toJSON() {
            return this.toString();
        }
        destructor() { }
    }
    $mol_object.$ = $;
    $_1.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_compare_any(a, b) {
        if (a === b)
            return true;
        if (!Number.isNaN(a))
            return false;
        if (!Number.isNaN(b))
            return false;
        return true;
    }
    $.$mol_compare_any = $mol_compare_any;
})($ || ($ = {}));
//any.js.map
;
"use strict";
var $;
(function ($) {
    const cache = new WeakMap();
    $.$mol_conform_stack = [];
    function $mol_conform(target, source) {
        if ($.$mol_compare_any(target, source)) {
            const result = source;
            return result;
        }
        if (!target || typeof target !== 'object')
            return target;
        if (!source || typeof source !== 'object')
            return target;
        if (target instanceof Error)
            return target;
        if (source instanceof Error)
            return target;
        if (target.constructor !== source.constructor)
            return target;
        if (cache.get(target))
            return target;
        cache.set(target, true);
        const conform = $.$mol_conform_handlers.get(target.constructor);
        if (!conform)
            return target;
        if ($.$mol_conform_stack.indexOf(target) !== -1)
            return target;
        $.$mol_conform_stack.push(target);
        try {
            return conform(target, source);
        }
        finally {
            $.$mol_conform_stack.pop();
        }
    }
    $.$mol_conform = $mol_conform;
    $.$mol_conform_handlers = new WeakMap();
    function $mol_conform_handler(cl, handler) {
        $.$mol_conform_handlers.set(cl, handler);
    }
    $.$mol_conform_handler = $mol_conform_handler;
    function $mol_conform_array(target, source) {
        let equal = target.length === source.length;
        for (let i = 0; i < target.length; ++i) {
            const conformed = $mol_conform(target[i], source[i]);
            if (!$.$mol_compare_any(conformed, target[i])) {
                try {
                    target[i] = conformed;
                }
                catch (error) {
                    equal = false;
                }
            }
            if (equal && !$.$mol_compare_any(conformed, source[i]))
                equal = false;
        }
        return equal ? source : target;
    }
    $mol_conform_handler(Array, $mol_conform_array);
    $mol_conform_handler(Uint8Array, $mol_conform_array);
    $mol_conform_handler(Uint16Array, $mol_conform_array);
    $mol_conform_handler(Uint32Array, $mol_conform_array);
    $mol_conform_handler(Object, (target, source) => {
        let count = 0;
        let equal = true;
        for (let key in target) {
            const conformed = $mol_conform(target[key], source[key]);
            if (conformed !== target[key]) {
                try {
                    target[key] = conformed;
                }
                catch (error) { }
                if (!$.$mol_compare_any(conformed, target[key]))
                    equal = false;
            }
            if (!$.$mol_compare_any(conformed, source[key]))
                equal = false;
            ++count;
        }
        for (let key in source)
            if (--count < 0)
                break;
        return (equal && count === 0) ? source : target;
    });
    $mol_conform_handler(Date, (target, source) => {
        if (target.getTime() === source.getTime())
            return source;
        return target;
    });
    $mol_conform_handler(RegExp, (target, source) => {
        if (target.toString() === source.toString())
            return source;
        return target;
    });
})($ || ($ = {}));
//conform.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_fail_hidden(error) {
        throw error;
    }
    $.$mol_fail_hidden = $mol_fail_hidden;
    function $mol_fail(error) {
        throw error;
    }
    $.$mol_fail = $mol_fail;
})($ || ($ = {}));
//fail.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log(path, ...values) {
        if ($.$mol_log_filter() == null)
            return;
        path = String(path);
        if (path.indexOf($.$mol_log_filter()) === -1)
            return;
        if ($.$mol_log_context())
            $.$mol_log_context()();
        if ($.$mol_log_debug() == null)
            return;
        if (path.indexOf($.$mol_log_debug()) === -1)
            return;
        debugger;
    }
    $.$mol_log = $mol_log;
})($ || ($ = {}));
//log.js.map
;
"use strict";
var $;
(function ($) {
    let context = null;
    function $mol_log_context(next = context) {
        return context = next;
    }
    $.$mol_log_context = $mol_log_context;
})($ || ($ = {}));
//log_context.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log_debug(next) {
        if (next !== undefined) {
            if (next == null) {
                sessionStorage.removeItem('$mol_log_debug()');
            }
            else {
                sessionStorage.setItem('$mol_log_debug()', next);
            }
        }
        return sessionStorage.getItem('$mol_log_debug()');
    }
    $.$mol_log_debug = $mol_log_debug;
})($ || ($ = {}));
//log_debug.web.js.map
;
"use strict";
var $;
(function ($) {
    let filter;
    $.$mol_log_filter = function $mol_log_filter(next) {
        if (next !== undefined) {
            if (next == null) {
                sessionStorage.removeItem('$mol_log_filter()');
            }
            else {
                sessionStorage.setItem('$mol_log_filter()', next);
            }
            filter = next;
        }
        if (filter !== undefined)
            return filter;
        return filter = sessionStorage.getItem('$mol_log_filter()');
    };
    if (typeof sessionStorage === 'undefined')
        $.$mol_log_filter = (next) => filter = next;
    if ($.$mol_log_filter() == null)
        console.info('Use $mol_log_filter( needle : string|null ) to toggle logs');
})($ || ($ = {}));
//log_filter.web.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_log_group(name, task) {
        const filter = $.$mol_log_filter();
        if (filter == null)
            return task;
        return function $mol_log_group_wrapper(...args) {
            let started = false;
            let prev = $.$mol_log_context();
            $.$mol_log_context(() => {
                if (prev)
                    prev();
                started = true;
                if (filter)
                    console.group(name);
                else
                    console.groupCollapsed(name);
                $.$mol_log_context(prev = null);
            });
            try {
                return task.apply(this, args);
            }
            finally {
                if (started)
                    console.groupEnd();
                $.$mol_log_context(prev);
            }
        };
    }
    $.$mol_log_group = $mol_log_group;
})($ || ($ = {}));
//log_group.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_defer extends $.$mol_object {
        constructor(run) {
            super();
            this.run = run;
            $mol_defer.add(this);
        }
        destructor() {
            $mol_defer.drop(this);
        }
        static schedule() {
            if (this.timer)
                return;
            this.timer = this.scheduleNative(() => {
                this.timer = null;
                this.run();
            });
        }
        static unschedule() {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = null;
        }
        static add(defer) {
            this.all.push(defer);
            this.schedule();
        }
        static drop(defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        }
        static run() {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.shift();)
                defer.run();
        }
    }
    $mol_defer.all = [];
    $mol_defer.timer = null;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? handler => requestAnimationFrame(handler)
        : handler => setTimeout(handler, 16);
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_state_stack = new Map();
})($ || ($ = {}));
//stack.js.map
;
void function() {

	if( typeof alert === 'function' ) {
		var nativeAlert = alert
		window.alert = function alert( message ) {
			console.warn( 'Alerts causes atom synchronization problems in IE. Use custom notificator instead.' )
			return nativeAlert( message )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativeConfirm = confirm
		window.confirm = function confirm( question ) {
			console.warn( 'Confirms causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativeConfirm( question )
		}
	}

	if( typeof confirm === 'function' ) {
		var nativePrompt = prompt
		window.prompt = function prompt( question , def ) {
			console.warn( 'Prompts causes atom synchronization problems in IE. Use custom dialog instead.' )
			return nativePrompt( question , def )
		}
	}

}()

;
"use strict";
var $;
(function ($) {
    let $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status["obsolete"] = "obsolete";
        $mol_atom_status["checking"] = "checking";
        $mol_atom_status["pulling"] = "pulling";
        $mol_atom_status["actual"] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    class $mol_atom extends $.$mol_object {
        constructor(id, handler = next => next) {
            super();
            this.masters = null;
            this.slaves = null;
            this.status = $mol_atom_status.obsolete;
            this.object_id(id);
            this.handler = handler;
        }
        destructor() {
            this.unlink();
            this.status = $mol_atom_status.actual;
            const value = this['value()'];
            if (value instanceof $.$mol_object) {
                if (value.object_owner() === this)
                    value.destructor();
            }
            this['value()'] = undefined;
        }
        unlink() {
            this.disobey_all();
            if (this.slaves)
                this.check_slaves();
        }
        get(force) {
            const slave = $mol_atom.stack[0];
            if (slave) {
                this.lead(slave);
                slave.obey(this);
            }
            this.actualize(force);
            const value = this['value()'];
            if (typeof Proxy !== 'function' && value instanceof Error) {
                throw value;
            }
            return value;
        }
        actualize(force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error(`Cyclic atom dependency of ${this}`);
            }
            if (!force && this.status === $mol_atom_status.actual) {
                return;
            }
            const slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(master => {
                    if (this.status !== $mol_atom_status.checking) {
                        return;
                    }
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                const oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(master => {
                        master.dislead(this);
                    });
                this.status = $mol_atom_status.pulling;
                const next = this.pull(force);
                if (next === undefined) {
                    this.status = $mol_atom_status.actual;
                }
                else {
                    this.push(next);
                }
            }
            $mol_atom.stack[0] = slave;
        }
        pull(force) {
            try {
                const result = this.handler(this._next, force);
                return result;
            }
            catch (error) {
                if (error['$mol_atom_catched'])
                    return error;
                if (error instanceof $mol_atom_wait)
                    return error;
                console.error(error.stack || error);
                if (!(error instanceof Error)) {
                    error = new Error(error.stack || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        }
        set(next) {
            return this.value(next);
        }
        push(next_raw) {
            if (!(next_raw instanceof $mol_atom_wait)) {
                this._ignore = this._next;
                this._next = undefined;
            }
            this.status = next_raw === undefined ? $mol_atom_status.obsolete : $mol_atom_status.actual;
            const prev = this['value()'];
            let next = (next_raw instanceof Error || prev instanceof Error) ? next_raw : $.$mol_conform(next_raw, prev);
            if (next === prev)
                return prev;
            if (prev instanceof $.$mol_object) {
                if (prev.object_owner() === this)
                    prev.destructor();
            }
            if (next instanceof $.$mol_object) {
                next.object_owner(this);
            }
            if ((typeof Proxy === 'function') && (next instanceof Error)) {
                next = new Proxy(next, {
                    get(target) {
                        return $.$mol_fail_hidden(target.valueOf());
                    },
                    ownKeys(target) {
                        return $.$mol_fail_hidden(target.valueOf());
                    },
                });
            }
            this['value()'] = next;
            $.$mol_log(this, prev, '➔', next);
            this.obsolete_slaves();
            return next;
        }
        obsolete_slaves() {
            if (!this.slaves)
                return;
            this.slaves.forEach(slave => slave.obsolete());
        }
        check_slaves() {
            if (this.slaves) {
                this.slaves.forEach(slave => slave.check());
            }
            else {
                $mol_atom.actualize(this);
            }
        }
        check() {
            if (this.status === $mol_atom_status.actual || this.status === $mol_atom_status.pulling) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        }
        obsolete() {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return;
        }
        lead(slave) {
            if (!this.slaves) {
                this.slaves = new Set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        }
        dislead(slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        }
        obey(master) {
            if (!this.masters)
                this.masters = new Set();
            this.masters.add(master);
        }
        disobey(master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        }
        disobey_all() {
            if (!this.masters)
                return;
            this.masters.forEach(master => master.dislead(this));
            this.masters = null;
        }
        cache(next) {
            if (next === undefined)
                return this['value()'];
            return this['value()'] = next;
        }
        value(next, force) {
            if (force === $mol_atom_force_cache) {
                const result = this.push(next);
                return result;
            }
            if (next !== undefined) {
                if (force === $mol_atom_force) {
                    const result = this.push(next);
                    return result;
                }
                let next_normal = $.$mol_conform(next, this._ignore);
                if (next_normal === this._ignore) {
                    const nn = next_normal;
                    const ignore = this._ignore;
                    const result = this.get(force);
                    return result;
                }
                if (!(this['value()'] instanceof Error)) {
                    next_normal = $.$mol_conform(next, this['value()']);
                    if (next_normal === this['value()']) {
                        const result = this.get(force);
                        return result;
                    }
                }
                this._next = next_normal;
                this._ignore = next_normal;
                force = $mol_atom_force_update;
            }
            const result = this.get(force);
            return result;
        }
        static actualize(atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        }
        static reap(atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        }
        static unreap(atom) {
            $mol_atom.reaping.delete(atom);
        }
        static schedule() {
            if (this.scheduled)
                return;
            new $.$mol_defer($.$mol_log_group('$mol_atom.sync()', () => {
                if (!this.scheduled)
                    return;
                this.scheduled = false;
                this.sync();
            }));
            this.scheduled = true;
        }
        static sync() {
            this.schedule();
            while (true) {
                const atom = this.updating.shift();
                if (!atom)
                    break;
                if (this.reaping.has(atom))
                    continue;
                if (atom.status !== $mol_atom_status.actual)
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(atom => {
                    this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destructor();
                });
            }
            this.scheduled = false;
        }
        then(done, fail) {
            let prev;
            let next;
            const atom = new $mol_atom(`${this}.then(${done})`, () => {
                try {
                    if (prev == undefined) {
                        const val = this.get();
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val.valueOf();
                        prev = val;
                    }
                    if (next == undefined) {
                        const val = done(prev);
                        if (val instanceof $mol_atom_wait)
                            return val;
                        if (val)
                            val.valueOf();
                        next = val;
                    }
                    return next;
                }
                catch (error) {
                    if (error instanceof $mol_atom_wait)
                        return error;
                    if (fail)
                        return fail(error);
                    return error;
                }
            });
            $mol_atom.actualize(atom);
            return atom;
        }
        catch(fail) {
            return this.then(next => next, fail);
        }
    }
    $mol_atom.stack = [];
    $mol_atom.updating = [];
    $mol_atom.reaping = new Set();
    $mol_atom.scheduled = false;
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    function $mol_atom_current() {
        return $mol_atom.stack[0];
    }
    $.$mol_atom_current = $mol_atom_current;
    class $mol_atom_wait extends Error {
        constructor() {
            super(...arguments);
            this.name = '$mol_atom_wait';
        }
    }
    $.$mol_atom_wait = $mol_atom_wait;
    class $mol_atom_force extends Object {
        static toString() { return this.name; }
    }
    $.$mol_atom_force = $mol_atom_force;
    class $mol_atom_force_cache extends $mol_atom_force {
    }
    $.$mol_atom_force_cache = $mol_atom_force_cache;
    class $mol_atom_force_update extends $mol_atom_force {
    }
    $.$mol_atom_force_update = $mol_atom_force_update;
})($ || ($ = {}));
//atom.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dict_key(value) {
        if (!value)
            return JSON.stringify(value);
        if (typeof value !== 'object')
            return JSON.stringify(value);
        if (value instanceof Array)
            return JSON.stringify(value);
        if (value.constructor === Object)
            return JSON.stringify(value);
        return value;
    }
    $.$mol_dict_key = $mol_dict_key;
    class $mol_dict extends Map {
        get(key) {
            return super.get($mol_dict_key(key));
        }
        has(key) {
            return super.has($mol_dict_key(key));
        }
        set(key, value) {
            return super.set($mol_dict_key(key), value);
        }
        delete(key) {
            return super.delete($mol_dict_key(key));
        }
        forEach(back, context) {
            return super.forEach((val, key, dict) => {
                if (typeof key === 'string')
                    key = JSON.parse(key);
                return back.call(this, val, key, dict);
            }, context);
        }
        [Symbol.iterator]() {
            const iterator = super[Symbol.iterator]();
            return {
                [Symbol.iterator]() {
                    return this;
                },
                next() {
                    const iteration = iterator.next();
                    if (!iteration.done) {
                        const key = iteration.value[0];
                        if (typeof key === 'string')
                            iteration.value[0] = JSON.parse(key);
                    }
                    return iteration;
                }
            };
        }
    }
    $.$mol_dict = $mol_dict;
})($ || ($ = {}));
//dict.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_mem(obj, name, descr) {
        const value = descr.value;
        const store = new WeakMap();
        descr.value = function $mol_mem_value(next, force) {
            const host = this;
            let atom = store.get(host);
            if (!atom) {
                const id = `${host}.${name}()`;
                atom = new $.$mol_atom(id, function () {
                    const v = value.apply(host, arguments);
                    if (v instanceof $.$mol_object) {
                        if (!v.object_host()) {
                            v.object_host(host);
                            v.object_field(name);
                            v.object_id(id);
                        }
                    }
                    return v;
                });
                atom.object_owner(host);
                const destructor = atom.destructor;
                atom.destructor = () => {
                    store.delete(host);
                    destructor.call(atom);
                };
                store.set(host, atom);
            }
            const result = atom.value(next, force);
            return result;
        };
        Object.defineProperty(obj, name + "()", { get: function () { return store.get(this); } });
        descr.value['value'] = value;
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(obj, name, descr) {
        const value = descr.value;
        const store = new WeakMap();
        descr.value = function $mol_mem_key_value(key, next, force) {
            const host = this;
            let dict = store.get(host);
            if (!dict)
                store.set(host, dict = new $.$mol_dict);
            let atom = dict.get(key);
            if (!atom) {
                const id = `${host}.${name}(${JSON.stringify(key)})`;
                atom = new $.$mol_atom(id, function (...args) {
                    const v = value.apply(host, [key, ...args]);
                    if (v instanceof $.$mol_object) {
                        if (!v.object_host()) {
                            v.object_host(host);
                            v.object_field(name);
                            v.object_id(id);
                        }
                    }
                    return v;
                });
                const destructor = atom.destructor;
                atom.destructor = () => {
                    dict.delete(key);
                    destructor.call(atom);
                };
                dict.set(key, atom);
            }
            return atom.value(next, force);
        };
        Object.defineProperty(obj, name + "()", { get: function () { return store.get(this); } });
        void (descr.value['value'] = value);
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_window extends $.$mol_object {
        static size(next, force) {
            return next || {
                width: self.innerWidth,
                height: self.innerHeight,
            };
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_window, "size", null);
    $.$mol_window = $mol_window;
    self.addEventListener('resize', $.$mol_log_group(`$mol_window resize`, () => {
        $mol_window.size(undefined, $.$mol_atom_force_cache);
    }));
})($ || ($ = {}));
//window.web.js.map
;
"use strict";
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
;
"use strict";
var $;
(function ($) {
    $.$mol_dom_context = self;
})($ || ($ = {}));
//context.web.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_dom_render_fields(el, fields) {
        for (let key in fields) {
            const val = fields[key];
            if (val === undefined)
                continue;
            el[key] = val;
        }
    }
    $.$mol_dom_render_fields = $mol_dom_render_fields;
    function $mol_dom_render_children(el, childNodes) {
        const node_list = [];
        const node_set = new Set();
        for (let i = 0; i < childNodes.length; ++i) {
            let node = childNodes[i];
            if (node == null)
                continue;
            if (Object(node) === node) {
                if (node['dom_tree'])
                    node = node['dom_tree']();
                node_list.push(node);
                node_set.add(node);
            }
            else {
                node_list.push(String(node));
            }
        }
        let didChange = false;
        let nextNode = el.firstChild;
        for (let view_ of node_list) {
            const view = view_.valueOf();
            if (view instanceof $.$mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        didChange = true;
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            didChange = true;
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            didChange = true;
                            nextNode = nn;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    const str = String(view);
                    if (nextNode.nodeValue !== str)
                        nextNode.nodeValue = str;
                    nextNode = nextNode.nextSibling;
                }
                else {
                    const textNode = $.$mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                    didChange = true;
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
            didChange = true;
        }
    }
    $.$mol_dom_render_children = $mol_dom_render_children;
    function $mol_dom_render_attributes(el, attrs) {
        for (let name in attrs) {
            let val = attrs[name];
            if (val === null || val === false)
                el.removeAttribute(name);
            else
                el.setAttribute(name, String(val));
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
    function $mol_dom_render_styles(el, styles) {
        for (let name in styles) {
            let val = styles[name];
            const style = el.style;
            const cur = style[name];
            if (typeof val === 'number') {
                if (parseFloat(cur) == val)
                    continue;
                style[name] = `${val}px`;
            }
            if (cur !== val)
                style[name] = val;
        }
    }
    $.$mol_dom_render_styles = $mol_dom_render_styles;
    function $mol_dom_render_events(el, events) {
        for (let name in events) {
            el.addEventListener(name, $.$mol_log_group(el.id + ' ' + name, events[name]), { passive: false });
        }
    }
    $.$mol_dom_render_events = $mol_dom_render_events;
    function $mol_dom_render_events_async(el, events) {
        const asyncEventListeners = (el.asyncEventListeners || {});
        for (let name in events) {
            const listener = $.$mol_log_group(el.id + ' ' + name, events[name]);
            if (!asyncEventListeners[name])
                asyncEventListeners[name] = [];
            asyncEventListeners[name].push(listener);
            el.addEventListener(name, listener, { passive: true });
        }
        el.asyncEventListeners = asyncEventListeners;
    }
    $.$mol_dom_render_events_async = $mol_dom_render_events_async;
})($ || ($ = {}));
//render.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_func_name(func) {
        return func.name;
    }
    $.$mol_func_name = $mol_func_name;
    function $mol_func_name_from(target, source) {
        Object.defineProperty(target, 'name', { value: source.name });
        return target;
    }
    $.$mol_func_name_from = $mol_func_name_from;
})($ || ($ = {}));
//name.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    let $$;
    (function ($$_1) {
        let $$;
    })($$ = $.$$ || ($.$$ = {}));
    let $mol;
    (function ($mol_1) {
        let $mol;
    })($mol = $.$mol || ($.$mol = {}));
    function $mol_view_visible_width() {
        return $.$mol_window.size().width;
    }
    $.$mol_view_visible_width = $mol_view_visible_width;
    function $mol_view_visible_height() {
        return $.$mol_window.size().height;
    }
    $.$mol_view_visible_height = $mol_view_visible_height;
    function $mol_view_state_key(suffix) {
        return suffix;
    }
    $.$mol_view_state_key = $mol_view_state_key;
    class $mol_view extends $.$mol_object {
        static Root(id) {
            return new this;
        }
        static autobind() {
            const nodes = $.$mol_dom_context.document.querySelectorAll('[mol_view_root]');
            for (let i = nodes.length - 1; i >= 0; --i) {
                const name = nodes.item(i).getAttribute('mol_view_root');
                const View = $[name];
                if (!View) {
                    console.error(`Can not attach view. Class not found: ${name}`);
                    continue;
                }
                const view = View.Root(i);
                view.dom_tree(nodes.item(i));
                document.title = view.title();
            }
        }
        title() {
            return this.constructor.toString();
        }
        focused(next) {
            let node = this.dom_node();
            const value = $.$mol_view_selection.focused(next === undefined ? undefined : next ? [node] : []) || [];
            return value.indexOf(node) !== -1;
        }
        context(next) {
            return next || $;
        }
        get $() {
            return this.context();
        }
        set $(next) {
            this.context(next);
        }
        context_sub() {
            return this.context();
        }
        state_key(suffix = '') {
            return this.$.$mol_view_state_key(suffix);
        }
        dom_name() {
            return this.constructor.toString().replace('$', '');
        }
        dom_name_space() { return 'http://www.w3.org/1999/xhtml'; }
        sub() {
            return null;
        }
        sub_visible() {
            const sub = this.sub();
            if (!sub)
                return sub;
            const context = this.context_sub();
            sub.forEach(child => {
                if (child instanceof $mol_view) {
                    child.$ = context;
                }
            });
            return sub;
        }
        minimal_width() {
            const sub = this.sub();
            if (!sub)
                return 0;
            let min = 0;
            sub.forEach(view => {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_width());
                }
            });
            return min;
        }
        minimal_height() {
            return this.content_height();
        }
        content_height() {
            const sub = this.sub();
            if (!sub)
                return 0;
            let min = 0;
            sub.forEach(view => {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_height());
                }
            });
            return min;
        }
        dom_id() {
            return this.toString();
        }
        dom_node(next) {
            const node = next || this.$.$mol_dom_context.document.createElementNS(this.dom_name_space(), this.dom_name());
            node.setAttribute('id', this.dom_id());
            $.$mol_dom_render_attributes(node, this.attr_static());
            $.$mol_dom_render_events(node, this.event());
            $.$mol_dom_render_events_async(node, this.event_async());
            return node;
        }
        dom_tree(next) {
            const node = this.dom_node(next);
            try {
                for (let plugin of this.plugins()) {
                    plugin.dom_node(node);
                    plugin.render();
                }
                this.render();
            }
            catch (error) {
                $.$mol_dom_render_attributes(node, { mol_view_error: error.name });
                if (error instanceof $.$mol_atom_wait)
                    return node;
                try {
                    void (node.innerText = error.message);
                }
                catch (e) { }
                if (error['$mol_atom_catched'])
                    return node;
                console.error(error);
                error['$mol_atom_catched'] = true;
            }
            return node;
        }
        render() {
            const node = this.dom_node();
            const sub = this.sub_visible();
            if (sub)
                $.$mol_dom_render_children(node, sub);
            $.$mol_dom_render_attributes(node, this.attr());
            $.$mol_dom_render_styles(node, this.style());
            const fields = this.field();
            $.$mol_dom_render_fields(node, fields);
            new $.$mol_defer(() => $.$mol_dom_render_fields(node, fields));
        }
        static view_classes() {
            const proto = this.prototype;
            let current = proto;
            const classes = [];
            while (current) {
                classes.push(current.constructor);
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return classes;
        }
        view_names_owned() {
            const names = [];
            let owner = this.object_host();
            if (owner instanceof $mol_view) {
                const suffix = this.object_field();
                const suffix2 = '_' + suffix[0].toLowerCase() + suffix.substring(1);
                for (let Class of owner.constructor.view_classes()) {
                    if (suffix in Class.prototype)
                        names.push($.$mol_func_name(Class) + suffix2);
                    else
                        break;
                }
                for (let prefix of owner.view_names_owned()) {
                    names.push(prefix + suffix2);
                }
            }
            return names;
        }
        view_names() {
            const names = [];
            for (let name of this.view_names_owned()) {
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            for (let Class of this.constructor.view_classes()) {
                const name = $.$mol_func_name(Class);
                if (names.indexOf(name) < 0)
                    names.push(name);
            }
            return names;
        }
        attr_static() {
            let attrs = {};
            for (let name of this.view_names())
                attrs[name.replace(/\$/g, '').toLowerCase()] = '';
            return attrs;
        }
        attr() {
            return {
                'mol_view_error': false,
            };
        }
        style() {
            return {};
        }
        field() {
            return {};
        }
        event() {
            return {};
        }
        event_async() {
            return {};
        }
        plugins() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "context", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "content_height", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "dom_node", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem
    ], $mol_view.prototype, "view_names", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_view, "Root", null);
    __decorate([
        $.$mol_mem
    ], $mol_view, "autobind", null);
    __decorate([
        $.$mol_mem
    ], $mol_view, "view_classes", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
"use strict";
var $;
(function ($) {
    if ($.$mol_dom_context.document) {
        const event_name = self.cordova ? 'deviceready' : 'DOMContentLoaded';
        $.$mol_dom_context.document.addEventListener(event_name, $.$mol_log_group(`$mol_view ${event_name}`, (event) => {
            $.$mol_view.autobind();
            $.$mol_defer.run();
        }));
    }
})($ || ($ = {}));
//view.web.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_view_selection extends $.$mol_object {
        static focused(next, force) {
            if (next === undefined)
                return [];
            const node = next[0];
            const atom = $.$mol_atom_current();
            new $.$mol_defer(() => {
                if (node)
                    return node.focus();
                const el = atom.cache()[0];
                if (el)
                    el.blur();
            });
            return undefined;
        }
        static position(next, force) {
            if (next !== undefined) {
                var start = next.start;
                var end = next.end;
                if (!(start <= end))
                    throw new Error(`Wrong offsets (${start},${end})`);
                var root = $.$mol_dom_context.document.getElementById(next.id);
                root.focus();
                var range = new Range;
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= start)
                            break;
                        start -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            start = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setStart(cur, start);
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= end)
                            break;
                        end -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            end = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setEnd(cur, end);
                var sel = $.$mol_dom_context.document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return next;
            }
            else {
                var sel = $.$mol_dom_context.document.getSelection();
                if (sel.rangeCount === 0)
                    return null;
                var range = sel.getRangeAt(0);
                var el = range.commonAncestorContainer;
                while (el && !el.id)
                    el = el.parentElement;
                if (!el)
                    return { id: null, start: 0, end: 0 };
                var meter = new Range;
                meter.selectNodeContents(el);
                meter.setEnd(range.startContainer, range.startOffset);
                var startOffset = meter.toString().length;
                meter.setEnd(range.endContainer, range.endOffset);
                var endOffset = meter.toString().length;
                return { id: el.id, start: startOffset, end: endOffset };
            }
        }
        static onFocus(event) {
            const parents = [];
            let element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentNode;
            }
            this.focused(parents, $.$mol_atom_force_cache);
        }
        static onBlur(event) {
            const focused = this.focused();
            setTimeout($.$mol_log_group('$mol_view_selection blur', () => {
                if (focused !== this.focused())
                    return;
                this.focused([], $.$mol_atom_force_cache);
            }));
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_view_selection, "focused", null);
    __decorate([
        $.$mol_mem
    ], $mol_view_selection, "position", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
"use strict";
var $;
(function ($) {
    if ($.$mol_dom_context.document) {
        $.$mol_dom_context.document.addEventListener('selectionchange', event => {
            $.$mol_view_selection.position(undefined, $.$mol_atom_force_cache);
        });
        $.$mol_dom_context.document.addEventListener('focus', $.$mol_log_group('$mol_view_selection focus', (event) => $.$mol_view_selection.onFocus(event)), true);
        $.$mol_dom_context.document.addEventListener('blur', (event) => $.$mol_view_selection.onBlur(event), true);
    }
})($ || ($ = {}));
//selection.web.js.map
;
"use strict";
//code.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_button extends $.$mol_view {
        enabled() {
            return true;
        }
        minimal_height() {
            return 40;
        }
        click(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        event() {
            return (Object.assign({}, super.event(), { "click": (event) => this.event_activate(event), "keypress": (event) => this.event_key_press(event) }));
        }
        event_activate(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_key_press(event, force) {
            return (event !== void 0) ? event : null;
        }
        attr() {
            return (Object.assign({}, super.attr(), { "disabled": this.disabled(), "role": "button", "tabindex": this.tab_index(), "title": this.hint() }));
        }
        disabled() {
            return false;
        }
        tab_index() {
            return 0;
        }
        hint() {
            return "";
        }
        sub() {
            return [].concat(this.title());
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_button.prototype, "click", null);
    __decorate([
        $.$mol_mem
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $.$mol_mem
    ], $mol_button.prototype, "event_activate", null);
    __decorate([
        $.$mol_mem
    ], $mol_button.prototype, "event_key_press", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//button.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_button extends $.$mol_button {
            disabled() {
                return !this.enabled();
            }
            event_activate(next) {
                if (!next)
                    return;
                if (!this.enabled())
                    return;
                this.event_click(next);
                this.click(next);
            }
            event_key_press(event) {
                if (event.keyCode === 13) {
                    return this.event_activate(event);
                }
            }
            tab_index() {
                return this.enabled() ? super.tab_index() : null;
            }
        }
        $$.$mol_button = $mol_button;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//button.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_button_typed extends $.$mol_button {
    }
    $.$mol_button_typed = $mol_button_typed;
})($ || ($ = {}));
(function ($) {
    class $mol_button_major extends $.$mol_button_typed {
        attr() {
            return (Object.assign({}, super.attr(), { "mol_theme": "$mol_theme_accent" }));
        }
    }
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
(function ($) {
    class $mol_button_minor extends $.$mol_button_typed {
    }
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
//button_types.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_check extends $.$mol_button_minor {
        attr() {
            return (Object.assign({}, super.attr(), { "mol_check_checked": this.checked(), "aria-checked": this.checked(), "role": "checkbox" }));
        }
        checked(val, force) {
            return (val !== void 0) ? val : false;
        }
        sub() {
            return [].concat(this.Icon(), this.label());
        }
        Icon() {
            return null;
        }
        label() {
            return [].concat(this.Title());
        }
        Title() {
            return ((obj) => {
                obj.sub = () => [].concat(this.title());
                return obj;
            })(new this.$.$mol_view);
        }
        title() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check.prototype, "Title", null);
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//check.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check extends $.$mol_check {
            event_click(next) {
                this.checked(!this.checked());
                if (next)
                    next.preventDefault();
            }
        }
        $$.$mol_check = $mol_check;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//check.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg extends $.$mol_view {
        dom_name() {
            return "svg";
        }
        dom_name_space() {
            return "http://www.w3.org/2000/svg";
        }
    }
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
//svg.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg_root extends $.$mol_svg {
        dom_name() {
            return "svg";
        }
        attr() {
            return (Object.assign({}, super.attr(), { "viewBox": this.view_box(), "preserveAspectRatio": this.aspect() }));
        }
        view_box() {
            return "0 0 100 100";
        }
        aspect() {
            return "xMidYMid";
        }
    }
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
//root.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_svg_path extends $.$mol_svg {
        dom_name() {
            return "path";
        }
        attr() {
            return (Object.assign({}, super.attr(), { "d": this.geometry() }));
        }
        geometry() {
            return "";
        }
    }
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
//path.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_icon extends $.$mol_svg_root {
        view_box() {
            return "0 0 24 24";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => this.path();
                return obj;
            })(new this.$.$mol_svg_path);
        }
        path() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_icon.prototype, "Path", null);
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//icon.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_tick extends $.$mol_icon {
        path() {
            return "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
        }
    }
    $.$mol_icon_tick = $mol_icon_tick;
})($ || ($ = {}));
//tick.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_check_box extends $.$mol_check {
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_tick);
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check_box.prototype, "Icon", null);
    $.$mol_check_box = $mol_check_box;
})($ || ($ = {}));
//box.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_state_session extends $.$mol_object {
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $.$mol_dom_context.sessionStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//session.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_state_local extends $.$mol_object {
        static native() {
            if (this['native()'])
                return this['native()'];
            check: try {
                const native = $.$mol_dom_context.localStorage;
                if (!native)
                    break check;
                native.setItem('', '');
                native.removeItem('');
                return this['native()'] = native;
            }
            catch (error) {
                console.warn(error);
            }
            return this['native()'] = {
                getItem(key) {
                    return this[':' + key];
                },
                setItem(key, value) {
                    this[':' + key] = value;
                },
                removeItem(key) {
                    this[':' + key] = void 0;
                }
            };
        }
        static value(key, next, force) {
            if (next === void 0)
                return JSON.parse(this.native().getItem(key) || 'null');
            if (next === null)
                this.native().removeItem(key);
            else
                this.native().setItem(key, JSON.stringify(next));
            return next;
        }
        prefix() { return ''; }
        value(key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
"use strict";
var $;
(function ($) {
    self.addEventListener('storage', event => {
        $.$mol_state_local.value(event.key, void 0, $.$mol_atom_force_cache);
    });
})($ || ($ = {}));
//local.web.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        var isArray = Array.isArray;
        var keyList = Object.keys;
        var hasProp = Object.prototype.hasOwnProperty;
        function $bw_equal(a, b) {
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
                        if (!$bw_equal(a[i], b[i])) {
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
                    const result = $bw_equal([...a], [...b]);
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
                    if (!$bw_equal(a[key], b[key]))
                        return false;
                }
                return true;
            }
            return a !== a && b !== b;
        }
        $$.$bw_equal = $bw_equal;
        function bw_easing_value(initial, target, t, fn = $$.BwEasing.linear) {
            const result = initial + (target - initial) * fn(t);
            return result;
        }
        $$.bw_easing_value = bw_easing_value;
        $$.BwEasing = {
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
        function bw_animate(config, val, force) {
            const master = config._master();
            let result = config._super(val, force);
            if (val === void 0) {
                const value = config._value(master);
                if (result == null || value == null) {
                    result = value;
                    config._super(result);
                }
                else {
                    let _equal = typeof config._equal == 'function' ? config._equal : $bw_equal;
                    if (!_equal(result, value)) {
                        const _data = typeof config._data == 'function' ? config._data : (() => {
                            const key = config.data_key;
                            if (!key) {
                                console.error('bw_animate expects config._data or at least config.data_key', config);
                            }
                            else {
                                return (val) => {
                                    if (val === void 0) {
                                        return this[key];
                                    }
                                    else if (val == null) {
                                        this[key] = null;
                                    }
                                    else {
                                        this[key] = val;
                                    }
                                };
                            }
                        })();
                        if (!_data)
                            return;
                        let data = _data();
                        const stopAnimation = () => {
                            const data = _data();
                            clearInterval(data.id);
                            cancelAnimationFrame(data.id);
                            _data(null);
                        };
                        if (data && !_equal(data.value, value)) {
                            stopAnimation();
                        }
                        data = _data();
                        if (!data) {
                            const defaults = {
                                steps: 16,
                                timeInterval: 16,
                            };
                            const timeInterval = !config.timeInterval ? defaults.timeInterval : Math.ceil(Math.abs(config.timeInterval));
                            const steps = typeof config._steps != 'function' && !Number.isFinite(config._steps) ? defaults.steps :
                                Math.max(1, Math.round(Math.abs(Number.isFinite(config._steps) ? config._steps : config._steps(result, value))));
                            const raf = timeInterval == defaults.timeInterval && window.requestAnimationFrame;
                            const data = { value };
                            const nextAnimation = () => {
                                if (raf) {
                                    data.id = raf(stepAnimation);
                                }
                            };
                            const finishAnimation = () => {
                                stopAnimation();
                                if (typeof config._finish == 'function') {
                                    config._finish();
                                }
                            };
                            const _easing = typeof config._easing == 'function' ?
                                config._easing : $$.BwEasing.linear;
                            const _step_value = typeof config._step_value == 'function' ?
                                config._step_value :
                                (step, steps, initial, target) => bw_easing_value(initial, target, step / steps, _easing);
                            let step = 0;
                            const stepAnimation = () => {
                                if (step >= steps) {
                                    finishAnimation();
                                }
                                else {
                                    const value_new = _step_value(++step, steps, result, value);
                                    config._super(value_new);
                                    nextAnimation();
                                }
                            };
                            data.id = raf ? raf(stepAnimation) : setInterval(stepAnimation, timeInterval);
                            _data(data);
                        }
                    }
                }
            }
            return result;
        }
        $$.bw_animate = bw_animate;
        function bw_animate_descr_value(obj, name, fn_initial, fn_store, fn_is, has_key = false) {
            const fn_equal = obj[name + '_equal'] || $bw_equal;
            const fn_trigger = obj[name + '_animation_trigger'];
            const fn_triggered_value = obj[name + '_animation_triggered_value'];
            const fn_steps = obj[name + '_animation_steps'];
            const fn_step_value = obj[name + '_animation_step_value'];
            const fn_easing = obj[name + '_animation_easing'];
            const fn_start = obj[name + '_animation_start'];
            const fn_after_step = obj[name + '_animation_after_step'];
            const fn_finish = obj[name + '_animation_finish'];
            return function $bw_animate_value(key) {
                const data_key = '_' + name + '_anim_data' + (has_key ? `_${key}` : '');
                const keyArg = has_key ? [key] : [];
                const host = this;
                const trigger = fn_trigger ? fn_trigger.apply(host, [...keyArg]) : fn_initial.apply(this, [...keyArg]);
                let result = fn_store.apply(host, [...keyArg]);
                if (result === null) {
                    result = !fn_trigger ? trigger : fn_initial.apply(this, [...keyArg]);
                    fn_store.apply(host, [...keyArg, result]);
                }
                const value = !fn_triggered_value ? trigger : fn_triggered_value.apply(host, [...keyArg, trigger]);
                if (result == null || value == null) {
                    result = value;
                    fn_store.apply(host, [...keyArg, result]);
                }
                else {
                    if (!fn_equal.call(host, result, value)) {
                        const stopAnimation = () => {
                            const data = this[data_key];
                            data.is_not_raf ? clearInterval(data.id) : cancelAnimationFrame(data.id);
                            this[data_key] = null;
                        };
                        let data = this[data_key];
                        if (data && !fn_equal.call(host, data.value, value)) {
                            stopAnimation();
                            data = null;
                        }
                        if (!data) {
                            const defaults = {
                                steps: 16,
                                timeInterval: 16,
                                easing: $$.BwEasing.linear,
                            };
                            const steps = !fn_steps ? defaults.steps :
                                Math.max(1, Math.round(Math.abs(fn_steps.apply(host, [...keyArg, { start: result, end: value, trigger }]))));
                            let step = 0;
                            const finishAnimation = () => {
                                stopAnimation();
                                fn_is.apply(host, [...keyArg, false]);
                                fn_finish && fn_finish.apply(host, [...keyArg, { start: result, end: value, trigger, steps, fn_store }]);
                            };
                            const nextAnimation = () => {
                                const data = this[data_key];
                                if (!data.is_not_raf)
                                    data.id = requestAnimationFrame(stepAnimation);
                            };
                            const stepAnimation = () => {
                                if (step++ >= steps) {
                                    finishAnimation();
                                }
                                else {
                                    const args = [...keyArg, { step, steps, start: result, end: value, trigger }];
                                    const value_new = fn_step_value ?
                                        fn_step_value.apply(host, args) :
                                        bw_easing_value(result, value, step / steps, fn_easing ? fn_easing.apply(host, args) :
                                            defaults.easing);
                                    fn_store.apply(host, [...keyArg, value_new]);
                                    if (typeof fn_after_step == 'function') {
                                        fn_after_step.apply(host, [...keyArg, { step, steps, start: result, end: value, trigger, step_value: value_new }]);
                                    }
                                    nextAnimation();
                                }
                            };
                            const timeInterval = defaults.timeInterval;
                            const raf = timeInterval == defaults.timeInterval && window.requestAnimationFrame;
                            this[data_key] = {
                                value,
                                is_not_raf: !raf,
                                id: raf ? raf(stepAnimation) : setInterval(stepAnimation, timeInterval),
                            };
                            fn_is.apply(host, [...keyArg, true]);
                            if (typeof fn_start == 'function') {
                                fn_start.apply(host, [...keyArg, { steps, start: result, end: value, trigger }]);
                            }
                        }
                    }
                }
                return result;
            };
        }
        function $bw_animate(obj, name, descr) {
            let fn_initial = descr.value;
            descr.value = function (val, force) {
                return (val !== void 0) ? val : null;
            };
            $.$mol_mem(obj, name, descr);
            const fn_store = descr.value;
            const animation_is_name = name + '_animation_is';
            obj[animation_is_name] = function (val, force) {
                return (val !== void 0) ? val : false;
            };
            const animation_is_descr = Object.getOwnPropertyDescriptor(obj, animation_is_name);
            $.$mol_mem(obj, animation_is_name, animation_is_descr);
            const fn_is = animation_is_descr.value;
            Object.defineProperty(obj, animation_is_name, animation_is_descr);
            descr.value = bw_animate_descr_value(obj, name, fn_initial, fn_store, fn_is);
            descr.value['mem_value'] = fn_store;
        }
        $$.$bw_animate = $bw_animate;
        function $bw_animate_key(obj, name, descr) {
            let fn_initial = descr.value;
            descr.value = function (key, val, force) {
                return (val !== void 0) ? val : null;
            };
            $.$mol_mem_key(obj, name, descr);
            const fn_store = descr.value;
            const animation_is_name = name + '_animation_is';
            obj[animation_is_name] = function (key, val, force) {
                return (val !== void 0) ? val : false;
            };
            const animation_is_descr = Object.getOwnPropertyDescriptor(obj, animation_is_name);
            $.$mol_mem_key(obj, animation_is_name, animation_is_descr);
            const fn_is = animation_is_descr.value;
            Object.defineProperty(obj, animation_is_name, animation_is_descr);
            descr.value = bw_animate_descr_value(obj, name, fn_initial, fn_store, fn_is, true);
            descr.value['mem_value'] = fn_store;
        }
        $$.$bw_animate_key = $bw_animate_key;
        function $bw_meter(obj, name, descr) {
            let fn_source = descr.value;
            descr.value = function (val, force) {
                return (val !== void 0) ? val : null;
            };
            $.$mol_mem(obj, name, descr);
            const fn_store = descr.value;
            descr.value = bw_meter_descr_value(obj, name, fn_source, fn_store);
            descr.value['mem_value'] = fn_store;
        }
        $$.$bw_meter = $bw_meter;
        function $bw_meter_key(obj, name, descr) {
            let fn_source = descr.value;
            descr.value = function (key, val, force) {
                return (val !== void 0) ? val : null;
            };
            $.$mol_mem_key(obj, name, descr);
            const fn_store = descr.value;
            descr.value = bw_meter_descr_value(obj, name, fn_source, fn_store, true);
            descr.value['mem_value'] = fn_store;
        }
        $$.$bw_meter_key = $bw_meter_key;
        function bw_meter_descr_value(obj, name, fn_source, fn_store, has_key = false) {
            return function $bw_meter_value(key, val, force) {
                const data_key = '_' + name + '_meter_data' + (has_key ? `_${key}` : '');
                const keyArg = has_key ? [key] : [];
                const host = this;
                const adjust_value = () => {
                    new $.$mol_defer(() => {
                        let result;
                        result = fn_source.apply(host, [...keyArg]);
                        if (result !== null) {
                            const { left, top, width, height, bottom, right } = result;
                            result = { left, top, width, height, bottom, right };
                        }
                        fn_store.apply(host, [...keyArg, result]);
                    });
                };
                if (!this[data_key]) {
                    window.addEventListener('resize', adjust_value);
                    window.addEventListener('bw_resize', adjust_value);
                    this[data_key] = true;
                }
                let result = fn_store.apply(host, [...keyArg]);
                if (result === null) {
                    adjust_value();
                }
                return result;
            };
        }
        function $bw_conditional(obj, name, descr) {
            descr.value = bw_conditional_descr_value(obj, name, descr);
        }
        $$.$bw_conditional = $bw_conditional;
        function $bw_conditional_key(obj, name, descr) {
            descr.value = bw_conditional_descr_value(obj, name, descr, true);
        }
        $$.$bw_conditional_key = $bw_conditional_key;
        function bw_conditional_descr_value(obj, name, descr, has_key = false) {
            const condition_name = name + '_condition';
            const fn_condition = obj[condition_name];
            if (typeof fn_condition != 'function') {
                const constructorName = obj.constructor.name;
                console.error(constructorName + ': @ $bw_conditional' + (has_key ? '_key' : '') + ' ' + name + '() REQUIRES ' + condition_name + '(): boolean {...}');
            }
            const else_name = name + '_else';
            const fn_else = obj[else_name];
            let fn_source = descr.value;
            const condition_descr = Object.getOwnPropertyDescriptor(obj, condition_name);
            if (has_key) {
                $.$mol_mem_key(obj, condition_name, condition_descr);
            }
            else {
                $.$mol_mem(obj, condition_name, condition_descr);
            }
            const fn_condition_atom = condition_descr.value;
            Object.defineProperty(obj, condition_name, condition_descr);
            const fn_store = descr.value;
            const fn_result = function $bw_conditional_value(key) {
                const keyArg = has_key ? [key] : [];
                const result = fn_condition_atom.apply(this, [...keyArg]) ?
                    fn_source.apply(this, [...keyArg]) :
                    (!fn_else ? null : fn_else.apply(this, [...keyArg]));
                return result;
            };
            let result;
            if (has_key) {
                result = function (key, val, force) {
                    return fn_result.call(this, key);
                };
                $.$mol_mem_key(obj, name, descr);
            }
            else {
                result = function (val, force) {
                    return fn_result.call(this);
                };
                $.$mol_mem(obj, name, descr);
            }
            return result;
        }
        var initials;
        function getInitials() {
            if (!initials) {
                initials = new Map();
            }
            return initials;
        }
        function $bw_session(obj, name, descr) {
            const result = $bw_store('session')(obj, name, descr);
            return result;
        }
        $$.$bw_session = $bw_session;
        function $bw_local(obj, name, descr) {
            return $bw_store('local')(obj, name, descr);
        }
        $$.$bw_local = $bw_local;
        function $bw_store(storage_name, need_transform = null) {
            const storage = storage_name == 'session' ? 0 : 1;
            return function bw_storable(obj, name, descr) {
                const value = descr.value;
                let fn_store;
                let fn_restore;
                let fn_equal = obj[name + '_equal'];
                if (typeof fn_equal != 'function')
                    fn_equal = $bw_equal;
                if (need_transform !== false) {
                    fn_store = obj[name + '_store'];
                    fn_restore = obj[name + '_restore'];
                    if (need_transform) {
                        if (typeof fn_store != 'function') {
                            console.error(`@ $bw_${storage_name} ${obj}.${name} REQUIRES ${obj}.${name}_store(val: Value): any `);
                        }
                        if (typeof fn_restore != 'function') {
                            console.error(`@ $bw_${storage_name} ${obj}.${name} REQUIRES ${obj}.${name}_restore(val_store: any): Value`);
                        }
                    }
                }
                let timer;
                descr.value = function $bw_storage_value(next, need_store) {
                    const host = this;
                    const id = `${host}.${name}()`;
                    const state = (val) => {
                        const val_store = val === void 0 ? void 0 : fn_store ? fn_store.call(obj, val) : val;
                        const result_store = storage === 0 ?
                            this.$.$mol_state_session.value(id, val_store) :
                            this.$.$mol_state_local.value(id, val_store);
                        let result;
                        if (val === void 0) {
                            result = fn_restore ? fn_restore.call(obj, result_store) : result_store;
                        }
                        return result;
                    };
                    let result;
                    let initial;
                    const initials = getInitials();
                    if (next !== void 0) {
                        if (!initials.has(id)) {
                            initial = value.call(host);
                            initials.set(id, initial);
                        }
                        else {
                            initial = initials.get(id);
                        }
                        result = value.apply(host, arguments);
                        if (result === void 0)
                            result = next;
                        const stored = initial !== void 0 && fn_equal.call(obj, result, initial) ? null : result;
                        if (stored === null) {
                            state(stored);
                        }
                        else {
                            if (timer !== void 0)
                                clearTimeout(timer);
                            timer = setTimeout(() => {
                                state(stored);
                                timer = void 0;
                            }, 100);
                        }
                    }
                    else {
                        result = value.apply(host, arguments);
                        let is_initial = false;
                        if (!initials.has(id)) {
                            initial = result;
                            initials.set(id, initial);
                            is_initial = true;
                        }
                        else {
                            initial = initials.get(id);
                            is_initial = fn_equal.call(obj, result, initial);
                        }
                        if (is_initial) {
                            const stored = state();
                            if (stored == null) {
                                result = initial;
                            }
                            else {
                                result = value.call(host, stored);
                                if (result === void 0)
                                    result = stored;
                            }
                        }
                    }
                    return result;
                };
                descr.value['value'] = value;
                return descr;
            };
        }
        $$.$bw_store = $bw_store;
        function $bw_false_on_outside_click(obj, name, descr) {
            const value = descr.value;
            descr.value = function $bw_false_on_outside_click_impl(next, force) {
                const host = this;
                if (next !== void 0) {
                    const outsideClickListener = (event) => {
                        const target = event.target;
                        const selector = '#' + host.dom_id().replace(/([^\w\d_-])/g, '\\$1');
                        const closest = target.closest(selector);
                        if (closest === null) {
                            document.removeEventListener('click', outsideClickListener);
                            value.call(host, false);
                        }
                    };
                    const methodName = next ? 'addEventListener' : 'removeEventListener';
                    document[methodName]('click', outsideClickListener);
                }
                return value.apply(host, arguments);
            };
            descr.value['value'] = value;
        }
        $$.$bw_false_on_outside_click = $bw_false_on_outside_click;
        function plural_word(count, word1, word2_4, word5more) {
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
        $$.plural_word = plural_word;
        function smoothScroll(dom_node, scrollTo, after) {
            scrollTo = Math.min(Math.max(0, scrollTo), dom_node.scrollHeight - dom_node.clientHeight);
            let lastScrollTop = dom_node.scrollTop;
            const delta = scrollTo - lastScrollTop;
            if (delta != 0) {
                let lastScrollDelta = 0;
                let isScrolling;
                const scrollListener = () => {
                    if (event.target === dom_node) {
                        const scrollTop = dom_node.scrollTop;
                        lastScrollDelta = scrollTop - lastScrollTop;
                        lastScrollTop = scrollTop;
                        clearTimeout(isScrolling);
                        if (scrollTop == scrollTo) {
                            if (dom_node.stopSmoothScroll) {
                                dom_node.stopSmoothScroll();
                                if (after !== void 0) {
                                    after();
                                }
                            }
                            else {
                                console.error('BUG: unreachable');
                                dom_node.removeEventListener('scroll', scrollListener);
                            }
                        }
                        else if (Math.sign(lastScrollDelta) != Math.sign(delta) ||
                            Math.sign(delta) > 0 && scrollTop > scrollTo ||
                            Math.sign(delta) < 0 && scrollTop < scrollTo) {
                            if (dom_node.stopSmoothScroll) {
                                dom_node.stopSmoothScroll();
                            }
                            else {
                                console.error('BUG: unreachable');
                                dom_node.removeEventListener('scroll', scrollListener);
                            }
                        }
                        else {
                            isScrolling = setTimeout(function () {
                                dom_node.scrollTo({
                                    top: scrollTo,
                                    behavior: 'smooth',
                                });
                            }, 30);
                        }
                    }
                };
                dom_node.addEventListener('scroll', scrollListener);
                if (dom_node.stopSmoothScroll) {
                    dom_node.stopSmoothScroll();
                }
                dom_node.stopSmoothScroll = () => {
                    dom_node.removeEventListener('scroll', scrollListener);
                    delete dom_node.stopSmoothScroll;
                };
                dom_node.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth',
                });
            }
            else if (after !== void 0) {
                after();
            }
        }
        $$.smoothScroll = smoothScroll;
        function adjustOffsetParentScrollTop(obj, opt) {
            const node = obj.dom_node();
            const offsetParent = node.offsetParent;
            const offsetParentClientHeight = node.offsetParent.clientHeight;
            const margin = opt == void 0 ? void 0 : opt.margin;
            const after = opt === void 0 ? void 0 : opt.after;
            const topMargin = margin == void 0 ? 0 : typeof margin === 'number' ? margin : (margin.top || 0);
            const bottomMargin = margin == void 0 ? 0 : typeof margin === 'number' ? margin : (margin.bottom || 0);
            const offsetTop = node.offsetTop - topMargin;
            const offsetBottom = offsetTop + node.offsetHeight + topMargin + bottomMargin;
            const scrollTop = offsetParent.scrollTop;
            const scrollBottom = scrollTop + offsetParent.clientHeight;
            if (offsetTop < scrollTop) {
                smoothScroll(offsetParent, offsetTop, after);
            }
            else if (offsetTop > scrollTop && offsetBottom > scrollBottom) {
                const deltaTop = offsetTop - scrollTop;
                const deltaBottom = offsetBottom - scrollBottom;
                const scrollTo = scrollTop + Math.min(deltaTop, deltaBottom);
                smoothScroll(offsetParent, scrollTo, after);
            }
        }
        $$.adjustOffsetParentScrollTop = adjustOffsetParentScrollTop;
        function actualOffset(fromEl, toEl, silent = false) {
            if (fromEl instanceof $.$mol_view)
                fromEl = fromEl.dom_node();
            if (toEl instanceof $.$mol_view)
                toEl = toEl.dom_node();
            let result = { x: 0, y: 0 };
            while (true) {
                result.x += fromEl.offsetLeft;
                result.y += fromEl.offsetTop;
                const offsetParent = fromEl.offsetParent;
                if (!offsetParent) {
                    if (!silent) {
                        console.error({ msg: 'fromEl is not descendant of toEl', fromEl, toEl });
                        console.trace();
                    }
                    return null;
                }
                else if (offsetParent === toEl) {
                    return result;
                }
                else {
                    fromEl = offsetParent;
                    result.x += fromEl.offsetWidth - fromEl.clientWidth;
                    result.y += fromEl.offsetHeight - fromEl.clientHeight;
                }
            }
        }
        $$.actualOffset = actualOffset;
        function do_autofocus(obj) {
            new $.$mol_defer(() => {
                let autofocusElement = obj.dom_node().querySelector('[autofocus]');
                if (autofocusElement) {
                    autofocusElement.focus();
                }
                else {
                    let autofocusElement = obj.dom_node().querySelector('[bw_autofocus]');
                    if (autofocusElement) {
                        autofocusElement.focus();
                    }
                }
            });
        }
        $$.do_autofocus = do_autofocus;
        function $bw_is_self_or_descendant(testNode, targetNode) {
            let result = false;
            while (testNode) {
                result = testNode == targetNode;
                if (result)
                    break;
                testNode = testNode.parentNode;
            }
            return result;
        }
        $$.$bw_is_self_or_descendant = $bw_is_self_or_descendant;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bw.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_bar extends $.$mol_view {
    }
    $.$mol_bar = $mol_bar;
})($ || ($ = {}));
//bar.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    function $mol_merge_dict(target, source) {
        let result = {};
        for (let key in target)
            result[key] = target[key];
        for (let key in source)
            result[key] = source[key];
        return result;
    }
    $.$mol_merge_dict = $mol_merge_dict;
})($ || ($ = {}));
//dict.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_state_arg extends $.$mol_object {
        constructor(prefix = '') {
            super();
            this.prefix = prefix;
        }
        static href(next, force) {
            if (next)
                history.replaceState(history.state, $.$mol_dom_context.document.title, next);
            return window.location.href;
        }
        static dict(next) {
            var href = this.href(next && this.make_link(next)).split(/#/)[1] || '';
            var chunks = href.split(/[\/\?#&;]/g);
            var params = {};
            chunks.forEach(chunk => {
                if (!chunk)
                    return;
                var vals = chunk.split('=').map(decodeURIComponent);
                params[vals.shift()] = vals.join('=');
            });
            return params;
        }
        static dict_cut(except) {
            const dict = this.dict();
            const cut = {};
            for (const key in dict) {
                if (except.indexOf(key) >= 0)
                    continue;
                cut[key] = dict[key];
            }
            return cut;
        }
        static value(key, next) {
            const nextDict = (next === void 0) ? void 0 : $.$mol_merge_dict(this.dict(), { [key]: next });
            const next2 = this.dict(nextDict)[key];
            return (next2 == null) ? null : next2;
        }
        static link(next) {
            return this.make_link($.$mol_merge_dict(this.dict_cut(Object.keys(next)), next));
        }
        static make_link(next) {
            const chunks = [];
            for (let key in next) {
                if (null == next[key])
                    continue;
                chunks.push([key].concat(next[key] ? next[key] : []).map(this.encode).join('='));
            }
            return new URL('#' + chunks.join('/'), window.location.href).toString();
        }
        static encode(str) {
            return encodeURIComponent(str).replace(/\(/g, '%28').replace(/\)/g, '%29');
        }
        value(key, next) {
            return this.constructor.value(this.prefix + key, next);
        }
        sub(postfix) {
            return new this.constructor(this.prefix + postfix + '.');
        }
        link(next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return this.constructor.link(dict);
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_state_arg, "href", null);
    __decorate([
        $.$mol_mem
    ], $mol_state_arg, "dict", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_state_arg, "dict_cut", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_state_arg, "value", null);
    $.$mol_state_arg = $mol_state_arg;
    self.addEventListener('hashchange', $.$mol_log_group('$mol_state_arg hashchange', (event) => {
        $mol_state_arg.href(undefined, $.$mol_atom_force_cache);
    }));
})($ || ($ = {}));
//arg.web.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_link extends $.$mol_view {
        minimal_height() {
            return 40;
        }
        dom_name() {
            return "a";
        }
        attr() {
            return (Object.assign({}, super.attr(), { "href": this.uri(), "title": this.hint(), "target": this.target(), "download": this.file_name(), "mol_link_current": this.current() }));
        }
        uri() {
            return "";
        }
        hint() {
            return "";
        }
        target() {
            return "_self";
        }
        file_name() {
            return "";
        }
        current() {
            return false;
        }
        sub() {
            return [].concat(this.title());
        }
        arg() {
            return ({});
        }
        event() {
            return (Object.assign({}, super.event(), { "click": (event) => this.click(event) }));
        }
        click(event, force) {
            return this.event_click(event);
        }
        event_click(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_link.prototype, "click", null);
    __decorate([
        $.$mol_mem
    ], $mol_link.prototype, "event_click", null);
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//link.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_link extends $.$mol_link {
            uri() {
                return new $.$mol_state_arg(this.state_key()).link(this.arg());
            }
            current() {
                if (this.uri() === this.$.$mol_state_arg.href())
                    return true;
                const args = this.arg();
                const keys = Object.keys(args).filter(key => args[key] != null);
                if (keys.length === 0)
                    return false;
                for (const key of keys) {
                    if (this.$.$mol_state_arg.value(key) !== args[key])
                        return false;
                }
                return true;
            }
            event_click(event) {
                setTimeout($.$mol_log_group(`${this}.event_click()`, () => this.focused(false)), 50);
            }
            file_name() {
                return null;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_link.prototype, "uri", null);
        __decorate([
            $.$mol_mem
        ], $mol_link.prototype, "current", null);
        $$.$mol_link = $mol_link;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//link.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_switch extends $.$mol_view {
        minimal_height() {
            return 40;
        }
        Option(id) {
            return ((obj) => {
                obj.checked = (val) => this.option_checked(id, val);
                obj.title = () => this.option_title(id);
                obj.enabled = () => this.option_enabled(id);
                return obj;
            })(new this.$.$mol_check);
        }
        option_checked(id, val, force) {
            return (val !== void 0) ? val : false;
        }
        option_title(id) {
            return "";
        }
        option_enabled(id) {
            return this.enabled();
        }
        enabled() {
            return true;
        }
        value(val, force) {
            return (val !== void 0) ? val : null;
        }
        options() {
            return ({});
        }
        sub() {
            return this.items();
        }
        items() {
            return [];
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_switch.prototype, "Option", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_switch.prototype, "option_checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_switch.prototype, "value", null);
    $.$mol_switch = $mol_switch;
})($ || ($ = {}));
//switch.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_switch extends $.$mol_switch {
            value(next) {
                return $.$mol_state_session.value(`${this}.value()`, next);
            }
            options() {
                return {};
            }
            items() {
                return Object.keys(this.options()).map(key => this.Option(key));
            }
            option_title(key) {
                return this.options()[key];
            }
            option_checked(key, next) {
                if (next === void 0)
                    return this.value() == key;
                this.value(next ? key : null);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_switch.prototype, "items", null);
        $$.$mol_switch = $mol_switch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//switch.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_string extends $.$mol_view {
        dom_name() {
            return "input";
        }
        enabled() {
            return true;
        }
        debounce() {
            return 200;
        }
        minimal_height() {
            return 40;
        }
        field() {
            return (Object.assign({}, super.field(), { "disabled": this.disabled(), "value": this.value_changed(), "placeholder": this.hint(), "type": this.type(), "spellcheck": this.spellcheck() }));
        }
        disabled() {
            return false;
        }
        value_changed(val, force) {
            return this.value(val);
        }
        value(val, force) {
            return (val !== void 0) ? val : "";
        }
        hint() {
            return "";
        }
        type(val, force) {
            return (val !== void 0) ? val : "text";
        }
        spellcheck() {
            return false;
        }
        attr() {
            return (Object.assign({}, super.attr(), { "maxlength": this.length_max() }));
        }
        length_max() {
            return Infinity;
        }
        event() {
            return (Object.assign({}, super.event(), { "input": (event) => this.event_change(event), "keypress": (event) => this.event_key_press(event) }));
        }
        event_change(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_key_press(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "value_changed", null);
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "type", null);
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "event_change", null);
    __decorate([
        $.$mol_mem
    ], $mol_string.prototype, "event_key_press", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//string.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_string extends $.$mol_string {
            constructor() {
                super(...arguments);
                this._timer = null;
            }
            event_change(next) {
                if (!next)
                    return;
                clearTimeout(this._timer);
                this._timer = setTimeout($.$mol_log_group(`${this}.event_change()`, () => {
                    this.value(next.target.value);
                }), this.debounce());
            }
            event_key_press(next) {
                if (!next)
                    return;
                if (next.keyCode === 13) {
                    this.value(next.target.value);
                }
            }
            disabled() {
                return !this.enabled();
            }
        }
        $$.$mol_string = $mol_string;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//string.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_list extends $.$mol_view {
        sub() {
            return this.rows();
        }
        rows() {
            return [];
        }
        Empty() {
            return null;
        }
    }
    $.$mol_list = $mol_list;
})($ || ($ = {}));
//list.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_list extends $.$mol_list {
            sub() {
                const rows = this.rows();
                return (rows.length === 0) ? [this.Empty()] : rows;
            }
            row_offsets() {
                var sub = this.sub();
                if (!sub)
                    return null;
                let heightLimit = this.$.$mol_view_visible_height();
                var offset = 0;
                var next = [];
                for (let child of sub) {
                    next.push(offset);
                    if (child instanceof $.$mol_view) {
                        offset += child.minimal_height();
                    }
                    if (offset > heightLimit)
                        break;
                }
                return next;
            }
            row_context(index) {
                return this.$.$mol_ambient({
                    $mol_view_visible_height: () => this.$.$mol_view_visible_height() - this.row_offsets()[index],
                });
            }
            sub_visible() {
                var sub = this.sub();
                if (!sub)
                    return sub;
                var limit = this.row_offsets().length;
                var next = [];
                for (let i = 0; i < limit; ++i) {
                    const child = sub[i];
                    if (child == null)
                        continue;
                    if (child instanceof $.$mol_view) {
                        child.$ = this.row_context(i);
                    }
                    next.push(child);
                }
                return next;
            }
            minimal_height() {
                var height = 0;
                var sub = this.sub();
                if (sub)
                    sub.forEach(child => {
                        if (child instanceof $.$mol_view) {
                            height += child.minimal_height();
                        }
                    });
                return height;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_list.prototype, "row_offsets", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_list.prototype, "row_context", null);
        __decorate([
            $.$mol_mem
        ], $mol_list.prototype, "sub_visible", null);
        __decorate([
            $.$mol_mem
        ], $mol_list.prototype, "minimal_height", null);
        $$.$mol_list = $mol_list;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//list.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_deck extends $.$mol_list {
        items() {
            return [].concat(({
                "title": "",
                "Content": ((obj) => {
                    return obj;
                })(new this.$.$mol_view),
            }));
        }
        rows() {
            return [].concat(this.Switch(), this.Content());
        }
        Switch() {
            return ((obj) => {
                obj.value = (val) => this.current(val);
                obj.options = () => this.switch_options();
                return obj;
            })(new this.$.$mol_switch);
        }
        current(val, force) {
            return (val !== void 0) ? val : "0";
        }
        switch_options() {
            return ({});
        }
        Content() {
            return null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_deck.prototype, "items", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck.prototype, "Switch", null);
    __decorate([
        $.$mol_mem
    ], $mol_deck.prototype, "current", null);
    $.$mol_deck = $mol_deck;
})($ || ($ = {}));
//deck.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_deck extends $.$mol_deck {
            current(next) {
                return $.$mol_state_session.value(`${this}.current()`, next) || '0';
            }
            switch_options() {
                let options = {};
                this.items().forEach((item, index) => {
                    options[String(index)] = item.title;
                });
                return options;
            }
            Content() {
                return this.items()[this.current()].Content;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_deck.prototype, "Content", null);
        $$.$mol_deck = $mol_deck;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//deck.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_login extends $.$mol_view {
        sub() {
            return [].concat(this.LeftSpace(), this.Content(), this.RightSpace());
        }
        LeftSpace() {
            return ((obj) => {
                obj.dom_name = () => "horspace";
                return obj;
            })(new this.$.$mol_view);
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [].concat(this.TopSpace(), this.OverLogoSpace(), this.LogoIcon(), this.LogoWinner(), this.UnderLogoSpace(), this.Form(), this.Warning(), this.BottomSpace());
                return obj;
            })(new this.$.$mol_view);
        }
        TopSpace() {
            return ((obj) => {
                obj.dom_name = () => "verspace";
                return obj;
            })(new this.$.$mol_view);
        }
        OverLogoSpace() {
            return ((obj) => {
                obj.dom_name = () => "verspace";
                return obj;
            })(new this.$.$mol_view);
        }
        LogoIcon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_logo_icon);
        }
        LogoWinner() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_logo_winner);
        }
        UnderLogoSpace() {
            return ((obj) => {
                obj.dom_name = () => "verspace";
                return obj;
            })(new this.$.$mol_view);
        }
        Form() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_login_form);
        }
        Warning() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_login_warning);
        }
        BottomSpace() {
            return ((obj) => {
                obj.dom_name = () => "verspace";
                return obj;
            })(new this.$.$mol_view);
        }
        RightSpace() {
            return ((obj) => {
                obj.dom_name = () => "horspace";
                return obj;
            })(new this.$.$mol_view);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "LeftSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "TopSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "OverLogoSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "LogoIcon", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "LogoWinner", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "UnderLogoSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "Form", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "Warning", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "BottomSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_login.prototype, "RightSpace", null);
    $.$bw_login = $bw_login;
})($ || ($ = {}));
(function ($) {
    class $bw_login_warning extends $.$mol_view {
        sub() {
            return [].concat("Минимальные требования к экрану: 320x320px");
        }
    }
    $.$bw_login_warning = $bw_login_warning;
})($ || ($ = {}));
(function ($) {
    class $bw_logo_icon extends $.$mol_svg_root {
        view_box() {
            return "0 0 487 442";
        }
        sub() {
            return [].concat(this.Letter_W(), this.Digit_7(), this.Letter_i_dot());
        }
        Letter_W() {
            return ((obj) => {
                obj.geometry = () => "M222.3 105.4c-3.3.9-7.5 2.5-9.4 3.5a48.6 48.6 0 0 0-15.2 14.7c-1.9 3.9-6.8 20-11.8 39.4a36240.2 36240.2 0 0 1-40.2 155c-7.4 29.5-14.4 49.5-17.3 49.5-1.9 0-4-2.8-6.3-8.5-2.5-5.8-6.7-22.8-34.8-140l-7.9-32.5-6-25-6-25.5c-2-8.3-4.6-17-5.7-19.2-4-8.3-11.9-10.4-38.7-10-16.9.2-17.4.3-19.3 2.6-1.3 1.6-1.9 3.9-1.9 7.5.1 5.9-.6 3 10.3 43.6A22792.6 22792.6 0 0 1 41 269l18 68c14.6 57.3 23 80.5 32.5 89.9 13.6 13.6 37.4 16.3 58 6.7a50.6 50.6 0 0 0 21.3-21.4c2.7-5.8 13.8-45.6 25.2-90.4C207 278 211.3 262 227.2 204c7.4-27 8-28.2 11.1-25.5 2 1.6 7 17.7 13.5 43l9 35 9 34.5 11 42 10.5 40c6.3 24.2 7.8 27.5 10.4 22.7 1.4-2.5 11-31.8 18.8-56.7 7.6-24.7 7.6-24.3 1.3-47-2.3-8.3-6.4-23.3-9-33.5l-21-80-3.6-14a305 305 0 0 0-11.5-39.2 44.5 44.5 0 0 0-14.7-15.5 55.8 55.8 0 0 0-39.7-4.4z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Digit_7() {
            return ((obj) => {
                obj.geometry = () => "M302 108.5c-1.2.5-2.5 1.6-2.8 2.4-.5 1.4 3 15.3 10.3 40l3.8 13 38.3.4c36 .2 38.3.3 37.8 2l-8.5 29.2c-4.4 15-10.3 35.8-13 46a7149.1 7149.1 0 0 1-37 132c-12.6 42.2-15.6 56.3-13.2 60.8.6 1 3.1 2.8 5.5 3.7 3.8 1.5 7.6 1.6 28.7 1.2 26.8-.5 31.3-1.2 36-6 4.5-4.5 6.8-9.7 10.6-24.6 1.8-7.5 7-26.4 11.3-42.1 12-43.5 14.8-53.8 16.8-62.5a25909 25909 0 0 0 46-171.5 38.2 38.2 0 0 0 1.7-12.6c-.7-4.1-7-10-12.2-11.3-4.8-1.4-156.7-1.4-160-.1z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Letter_i_dot() {
            return ((obj) => {
                obj.geometry = () => "M434.3 2.9a41.9 41.9 0 0 0-32 33 30.2 30.2 0 0 0-.6 13.9 44.1 44.1 0 0 0 23.8 31.9c6.4 3 7.4 3.3 17.3 3.3 13.6 0 19.5-2.2 28.6-10.7A41.7 41.7 0 0 0 451 2.6a31.6 31.6 0 0 0-16.7.3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_logo_icon.prototype, "Letter_W", null);
    __decorate([
        $.$mol_mem
    ], $bw_logo_icon.prototype, "Digit_7", null);
    __decorate([
        $.$mol_mem
    ], $bw_logo_icon.prototype, "Letter_i_dot", null);
    $.$bw_logo_icon = $bw_logo_icon;
})($ || ($ = {}));
(function ($) {
    class $bw_logo_winner extends $.$mol_svg_root {
        view_box() {
            return "0 0 495 90";
        }
        sub() {
            return [].concat(this.Letter_W(), this.Letter_i(), this.Letter_i_dot(), this.Letter_n(), this.Letter_N(), this.Letter_E(), this.Letter_R());
        }
        Letter_W() {
            return ((obj) => {
                obj.geometry = () => "M35.5 69.3c-.2.8-1.9 1-2.1 0-5.2-19.6-10.7-41.2-15.7-61.2-2-7.2-.3-6.3-14.3-6.3-5.5 0-1.3 9.7 0 14.3l9.2 33.4c2.1 7.8 3.8 14.7 6.1 22.4 3.4 11.4 5.4 15.5 12.2 16.4 1.5.2 3.3.1 5.4.2 2 0 3.7-1 5.1-1.8 6.3-3.5 7-13.7 8.6-19.2L55 49l2.7-9.5L62.6 21c1-1.7 2.5-2.9 4.8 7.5l12 47.6c1.6 5.4 3.5 9 6.2 10.7 2.3 1.4 4.9 1.8 9 1.8 2.7 0 4.6-.8 6.3-2 3.9-2.7 6-8.6 7.2-13.6 2-7.6 4.2-14.5 6.1-22.4l9.3-33.4c4.5-16.7 5.6-15.4-7.8-15.4-4 0-4.4.8-6 5.8l-7 26.5c-1 3.8-7 32.8-8.8 35.3-.6.8-1.5.8-2 0-.8-1.2-1.6-3.6-2.6-7.5l-7.7-28.6-5.2-19C73.6 4.5 72.6 1.7 62.6 1.7c-10.7 0-11.7 10.6-14.3 20.6l-7.5 28c-1.6 6.7-3.3 13-5.3 19";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Letter_i() {
            return ((obj) => {
                obj.geometry = () => "M138.7 82.8c0 3.4.7 5.2 2.7 5.5 2 .2 6.2.2 9.4.1 2.2 0 2.8-2.8 2.9-4.1V26.8c.4-1.8-4-2-7.4-2-3.2 0-7.9.2-7.7 2-.1 3 .1 49.9.1 56";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Letter_i_dot() {
            return ((obj) => {
                obj.geometry = () => "M146.1 1.8a7.4 7.4 0 1 1 0 14.8 7.4 7.4 0 0 1 0-14.8";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Letter_n() {
            return ((obj) => {
                obj.geometry = () => "M167.9 31.6v50.5c0 4.1.7 6.1 3 6.3h8.2c4 0 3.7-3 3.7-7V38.1c0-2 .8-2.7 2.5-2.9h13.2c9.4.4 13.5 3.2 13.5 19.9v29.5c0 2.4.7 3.6 3.3 3.8h7.7c3.4 0 4.2-1.2 4.1-3.9V54.8c-.2-9.7-1.3-18.8-4.4-23.2a13.4 13.4 0 0 0-6.7-5.4c-10.1-3.2-26.6-2.6-39.6-2.6-5 0-8.5 3-8.5 8";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Letter_N() {
            return ((obj) => {
                obj.geometry = () => "M239.8 20.2v65.3c.1 1.5 1.3 3 2.6 3h11.8c1 0 2.4-2 2.4-3V30.8c0-3-.2-8.4.6-7.7l33.4 51.6c6 9 7.4 13.3 15.7 13.8h4c6 0 10.6-5.3 10.6-11.4V4.2c0-2.1-4.3-2.5-8.4-2.4-4 0-8 .4-8 2.4v29.5c0 12.3.4 24.6.4 30 0 2.7 0 3-.6 2.8l-33.7-52.2c-.7-1.1-6-12.6-17.3-12.6-9.1 0-13.5 9.1-13.5 18.5";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Letter_E() {
            return ((obj) => {
                obj.geometry = () => "M337.3 18.9v56.6c0 8.5 3.7 13 12.2 13H401c4.2 0 4-1.3 4-7 0-5.8.2-8.1-4-8.1h-41.4c-6.8 0-6 .6-6-7.2v-9c0-6 1.9-5.2 5-5.3H394c9.3 0 10.3 0 10.3-7s-1.2-6.6-10.4-6.7h-34.5c-3.9 0-5.6.3-5.6-2.6V21.7c0-4.4.3-5 2.1-5h45c4.4 0 4.2-1.9 4.2-7.2 0-5.3.1-7.8-4-7.8h-51c-10 0-12.8 7.4-12.8 17.2";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Letter_R() {
            return ((obj) => {
                obj.geometry = () => "M418 16.2v68.5c0 2.2.6 3.4 2.7 3.7h5.1c2.4 0 4.1.1 5.4-.1 2-.4 2.7-1.8 2.7-3.6l.1-65.9c0-2.5 2-2.1 3.6-2.1h27.3c9 0 12.7 7.2 12.7 14.5.1 7.2-3.1 13.9-12.9 14H451c-4.6 0-7.8 2.7-7.6 7.8 0 1.8 1.4 4.5 3.8 7l12.4 12.3 15.5 15a5 5 0 0 0 3 1.2H492c1.2 0 2.8-.9.7-3l-5.1-5.3-23.2-21.8c-.8-1 1.3-.8 3.7-.8 3.5-.1 25.6-2.9 25.6-26.4 0-23.6-13-29.4-21.5-29.4h-41.2c-7.9 0-13 6.6-13 14.4";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_logo_winner.prototype, "Letter_W", null);
    __decorate([
        $.$mol_mem
    ], $bw_logo_winner.prototype, "Letter_i", null);
    __decorate([
        $.$mol_mem
    ], $bw_logo_winner.prototype, "Letter_i_dot", null);
    __decorate([
        $.$mol_mem
    ], $bw_logo_winner.prototype, "Letter_n", null);
    __decorate([
        $.$mol_mem
    ], $bw_logo_winner.prototype, "Letter_N", null);
    __decorate([
        $.$mol_mem
    ], $bw_logo_winner.prototype, "Letter_E", null);
    __decorate([
        $.$mol_mem
    ], $bw_logo_winner.prototype, "Letter_R", null);
    $.$bw_logo_winner = $bw_logo_winner;
})($ || ($ = {}));
(function ($) {
    class $bw_login_form extends $.$mol_view {
        sub() {
            return [].concat(this.Deck(), this.Close(), this.OverAnonSpace(), this.Bar_anon(), this.Bar_footer());
        }
        Deck() {
            return ((obj) => {
                obj.items = () => [].concat(this.signinItem(), this.signupItem());
                return obj;
            })(new this.$.$mol_deck);
        }
        signinItem() {
            return ({
                "title": "Вход",
                "Content": this.siginContent(),
            });
        }
        siginContent() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_signin_form);
        }
        signupItem() {
            return ({
                "title": "Регистрация",
                "Content": this.sigupContent(),
            });
        }
        sigupContent() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_signup_form);
        }
        Close() {
            return ((obj) => {
                obj.title = () => "";
                obj.sub = () => [].concat(this.CloseIcon());
                obj.current = () => false;
                obj.arg = () => this.as_anon();
                return obj;
            })(new this.$.$mol_link);
        }
        CloseIcon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_login_closed_icon);
        }
        OverAnonSpace() {
            return ((obj) => {
                obj.dom_name = () => "verspace";
                return obj;
            })(new this.$.$mol_view);
        }
        Bar_anon() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Anon());
                return obj;
            })(new this.$.$mol_bar);
        }
        Anon() {
            return ((obj) => {
                obj.title = () => "Войти без регистрации";
                obj.current = () => false;
                obj.arg = () => this.as_anon();
                return obj;
            })(new this.$.$mol_link);
        }
        Bar_footer() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_view);
        }
        as_anon() {
            return ({
                "page": "normal",
            });
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_login_form.prototype, "Deck", null);
    __decorate([
        $.$mol_mem
    ], $bw_login_form.prototype, "siginContent", null);
    __decorate([
        $.$mol_mem
    ], $bw_login_form.prototype, "sigupContent", null);
    __decorate([
        $.$mol_mem
    ], $bw_login_form.prototype, "Close", null);
    __decorate([
        $.$mol_mem
    ], $bw_login_form.prototype, "CloseIcon", null);
    __decorate([
        $.$mol_mem
    ], $bw_login_form.prototype, "OverAnonSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_login_form.prototype, "Bar_anon", null);
    __decorate([
        $.$mol_mem
    ], $bw_login_form.prototype, "Anon", null);
    __decorate([
        $.$mol_mem
    ], $bw_login_form.prototype, "Bar_footer", null);
    $.$bw_login_form = $bw_login_form;
})($ || ($ = {}));
(function ($) {
    class $bw_login_closed_icon extends $.$mol_svg_root {
        view_box() {
            return "0 0 51 51";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M.7.7C.3 1 0 2.5 0 3.9c0 2 2.4 5 9.5 12.1l9.5 9.5-9.6 9.6C1.1 43.4-.1 45.1.2 47.6c.2 2.4.8 2.9 3.3 3.2 2.6.2 4.2-1 12.5-9.3l9.5-9.5 9.6 9.6c8.3 8.3 10 9.5 12.5 9.2 2.4-.2 3-.8 3.2-3.2.3-2.5-.9-4.2-9.2-12.5L32 25.5l9.5-9.5c8.3-8.3 9.5-9.9 9.3-12.5C50.5 1 50 .4 47.6.2c-2.5-.3-4.2.9-12.5 9.2L25.5 19 16 9.5C8.9 2.4 5.9 0 3.9 0 2.5 0 1 .3.7.7z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_login_closed_icon.prototype, "Path", null);
    $.$bw_login_closed_icon = $bw_login_closed_icon;
})($ || ($ = {}));
(function ($) {
    class $bw_signin_form extends $.$mol_view {
        dom_name() {
            return "form";
        }
        sub() {
            return [].concat(this.OverLoginControlSpace(), this.loginControl(), this.OverPassControlSpace(), this.passControl(), this.OverAddonSpace(), this.Bar_addon(), this.OverSubmitSpace(), this.submit());
        }
        OverLoginControlSpace() {
            return ((obj) => {
                obj.dom_name = () => "verspace";
                return obj;
            })(new this.$.$mol_view);
        }
        loginControl() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_login_input);
        }
        OverPassControlSpace() {
            return ((obj) => {
                obj.dom_name = () => "verspace";
                return obj;
            })(new this.$.$mol_view);
        }
        passControl() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_pass_input);
        }
        OverAddonSpace() {
            return ((obj) => {
                obj.dom_name = () => "verspace";
                return obj;
            })(new this.$.$mol_view);
        }
        Bar_addon() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Stay(), this.PassForgottenContainer());
                return obj;
            })(new this.$.$mol_bar);
        }
        Stay() {
            return ((obj) => {
                obj.checked = (val) => this.stay_checked(val);
                obj.title = () => "Оставаться в системе";
                return obj;
            })(new this.$.$mol_check_box);
        }
        stay_checked(val, force) {
            return (val !== void 0) ? val : false;
        }
        PassForgottenContainer() {
            return ((obj) => {
                obj.sub = () => [].concat(this.PassForgotten());
                return obj;
            })(new this.$.$mol_view);
        }
        PassForgotten() {
            return ((obj) => {
                obj.title = () => "Забыли пароль?";
                obj.current = () => false;
                return obj;
            })(new this.$.$mol_link);
        }
        OverSubmitSpace() {
            return ((obj) => {
                obj.dom_name = () => "verspace";
                return obj;
            })(new this.$.$mol_view);
        }
        submit() {
            return ((obj) => {
                obj.sub = () => [].concat("Войти");
                obj.event_click = (val) => this.event_submit(val);
                obj.disabled = () => false;
                return obj;
            })(new this.$.$mol_button_major);
        }
        event_submit(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "OverLoginControlSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "loginControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "OverPassControlSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "passControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "OverAddonSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "Bar_addon", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "Stay", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "stay_checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "PassForgottenContainer", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "PassForgotten", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "OverSubmitSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "submit", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form.prototype, "event_submit", null);
    $.$bw_signin_form = $bw_signin_form;
})($ || ($ = {}));
(function ($) {
    class $bw_login_input extends $.$mol_view {
        sub() {
            return [].concat(this.LoginInput(), this.LoginInputIcon());
        }
        LoginInput() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_signin_form_login_input);
        }
        LoginInputIcon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_login_input_icon);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_login_input.prototype, "LoginInput", null);
    __decorate([
        $.$mol_mem
    ], $bw_login_input.prototype, "LoginInputIcon", null);
    $.$bw_login_input = $bw_login_input;
})($ || ($ = {}));
(function ($) {
    class $bw_pass_input extends $.$mol_view {
        sub() {
            return [].concat(this.Input(), this.Icon());
        }
        Input() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_signin_form_pass_input);
        }
        Icon() {
            return ((obj) => {
                obj.checked = (val) => this.pass_opened(val);
                obj.event_click = (val) => this.pass_input_icon_click(val);
                return obj;
            })(new this.$.$bw_pass_input_icon);
        }
        pass_opened(val, force) {
            return (val !== void 0) ? val : false;
        }
        pass_input_icon_click(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_pass_input.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $bw_pass_input.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $bw_pass_input.prototype, "pass_opened", null);
    __decorate([
        $.$mol_mem
    ], $bw_pass_input.prototype, "pass_input_icon_click", null);
    $.$bw_pass_input = $bw_pass_input;
})($ || ($ = {}));
(function ($) {
    class $bw_login_input_icon extends $.$mol_svg_root {
        view_box() {
            return "0 0 156 63";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M2.1 3.4c-.8.9-1.1 9.7-.9 30.2l.3 28.9 19.9.3c13.8.2 20.3-.1 21.2-.9 1.1-.9 1.4-6.5 1.4-29 0-23.9-.2-28-1.6-29.3-2.1-2.2-38.5-2.4-40.3-.2zM40 26v20H5V6h35v20zm0 28.5V59H5v-9h35v4.5zM74.7 24.7C57.8 51.5 56.1 54.5 57.1 55.5c.6.6 1.5.6 2.4 0 2.2-1.4 26.5-40.6 25.9-41.6-1.4-2.4-3.9.1-10.7 10.8zM98.6 16.2c-.8 3-.8 33.6 0 36.6l.6 2.2 27.7-.2 27.6-.3v-40l-27.6-.3-27.7-.2-.6 2.2zm42.8 7.5l-9.2 11A30.3 30.3 0 0 1 127 40c-.7 0-13.2-14.2-17.9-20.3-1.3-1.6-.3-1.7 17.9-1.7h19.2l-4.8 5.7zM113 31l3.8 4.6-7.4 7.6-7.4 7.5V34.6l.1-16.1 3.5 4L113 31zm38 3.7v15.7l-7-6.9a40.5 40.5 0 0 1-6.8-7.7c.3-.8 13.1-16.7 13.6-16.8.1 0 .2 7.1.2 15.7zM127 45c.4 0 2.3-1.2 4-2.7l3.2-2.6 5.6 5.6 5.7 5.7h-37.9l5.9-6 5.8-5.9 3.4 2.9c1.9 1.7 3.8 3 4.3 3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_login_input_icon.prototype, "Path", null);
    $.$bw_login_input_icon = $bw_login_input_icon;
})($ || ($ = {}));
(function ($) {
    class $bw_pass_input_icon extends $.$mol_check {
        sub() {
            return [].concat(this.Icon());
        }
        CloseIcon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_pass_input_closed_icon);
        }
        OpenIcon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_pass_input_opened_icon);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_pass_input_icon.prototype, "CloseIcon", null);
    __decorate([
        $.$mol_mem
    ], $bw_pass_input_icon.prototype, "OpenIcon", null);
    $.$bw_pass_input_icon = $bw_pass_input_icon;
})($ || ($ = {}));
(function ($) {
    class $bw_pass_input_closed_icon extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 33";
        }
        sub() {
            return [].concat(this.Eyelid(), this.Eyelashes());
        }
        Eyelid() {
            return ((obj) => {
                obj.geometry = () => "M2 0h2.9A53.3 53.3 0 0 0 26 17a35 35 0 0 0 28.7-1.3A57 57 0 0 0 73.1 0H76c-.5 1.2-.8 2.3-1.7 3.3a55.9 55.9 0 0 1-20 16 38 38 0 0 1-29.2.5A54.6 54.6 0 0 1 3.7 3.3C3 2.3 2.4 1.2 2 0z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Eyelashes() {
            return ((obj) => {
                obj.geometry = () => "M8.8 11.2l2.1 2L4.6 20l-2.2-2 6.3-6.8zM70.7 11.3l6.2 6.6-2.2 2-6.3-6.6 2.3-2zM56.9 20c1.5 2.5 2.8 5.3 4.2 8l-2.5 1.4c-1.6-2.7-3-5.4-4.4-8.2l2.7-1.3zM20 20.5l2.7 1.3-3.7 7.4-2.7-1.3 3.7-7.4zM37.5 24h3v9h-3v-9z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_pass_input_closed_icon.prototype, "Eyelid", null);
    __decorate([
        $.$mol_mem
    ], $bw_pass_input_closed_icon.prototype, "Eyelashes", null);
    $.$bw_pass_input_closed_icon = $bw_pass_input_closed_icon;
})($ || ($ = {}));
(function ($) {
    class $bw_pass_input_opened_icon extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 57";
        }
        sub() {
            return [].concat(this.Path0(), this.Path1(), this.Path2(), this.Path3(), this.Path4());
        }
        Path0() {
            return ((obj) => {
                obj.geometry = () => "M37.5 0h3v9h-3V0zM19 3.8l3.7 7.4-2.7 1.3-3.7-7.4L19 3.8zM58.6 3.6L61 5l-4.2 8-2.7-1.3C55.6 9 57 6.3 58.6 3.6zM54.3 13.7A59.7 59.7 0 0 1 76.8 33a61.1 61.1 0 0 1-21.3 18.6c-10 4.9-21.8 5.1-31.9.7A59.7 59.7 0 0 1 1.1 33c5.8-7.4 12-14 20.6-18.3 10-5.1 22.2-5.5 32.5-1zM4.7 13.1l6.2 6.6-2.2 2-6.3-6.6a70 70 0 0 1 2.3-2z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Path1() {
            return ((obj) => {
                obj.geometry = () => "M52 16a52.8 52.8 0 0 1 21 17c-5.5 7-12 13-20.2 16.6A35 35 0 0 1 26 50 52.7 52.7 0 0 1 5 33c5.5-7 12-13 20.2-16.6A35 35 0 0 1 52 16z";
                return obj;
            })(new this.$.$bw_pass_input_opened_icon_trasparent_path);
        }
        Path2() {
            return ((obj) => {
                obj.geometry = () => "M74.8 13l2.1 2.1-6.3 6.7-2.2-2 6.3-6.8zM35.1 17.1a13.5 13.5 0 0 1 17 9.9A13.5 13.5 0 0 1 26 33c-1.6-6.8 2.5-14 9.2-15.9z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        Path3() {
            return ((obj) => {
                obj.geometry = () => "M35.2 20.2a10.5 10.5 0 0 1 10.2 18.1c-5 3.9-12.5 2.3-15.5-3.2-3.1-5.5-.6-12.6 5.3-14.9z";
                return obj;
            })(new this.$.$bw_pass_input_opened_icon_trasparent_path);
        }
        Path4() {
            return ((obj) => {
                obj.geometry = () => "M39 22.4v3c-3.2 1-3.6 1.4-4.6 4.5l-3 .1c.7-4.7 2.9-6.9 7.6-7.6z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_pass_input_opened_icon.prototype, "Path0", null);
    __decorate([
        $.$mol_mem
    ], $bw_pass_input_opened_icon.prototype, "Path1", null);
    __decorate([
        $.$mol_mem
    ], $bw_pass_input_opened_icon.prototype, "Path2", null);
    __decorate([
        $.$mol_mem
    ], $bw_pass_input_opened_icon.prototype, "Path3", null);
    __decorate([
        $.$mol_mem
    ], $bw_pass_input_opened_icon.prototype, "Path4", null);
    $.$bw_pass_input_opened_icon = $bw_pass_input_opened_icon;
})($ || ($ = {}));
(function ($) {
    class $bw_pass_input_opened_icon_trasparent_path extends $.$mol_svg_path {
        attr() {
            return (Object.assign({}, super.attr(), { "class": "transparent" }));
        }
    }
    $.$bw_pass_input_opened_icon_trasparent_path = $bw_pass_input_opened_icon_trasparent_path;
})($ || ($ = {}));
(function ($) {
    class $bw_signin_form_login_input extends $.$mol_string {
        value(val, force) {
            return this.login(val);
        }
        login(val, force) {
            return (val !== void 0) ? val : "";
        }
        attr() {
            return (Object.assign({}, super.attr(), { "autocomplete": "username" }));
        }
        hint() {
            return "Введите телефон или E-mail";
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_signin_form_login_input.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form_login_input.prototype, "login", null);
    $.$bw_signin_form_login_input = $bw_signin_form_login_input;
})($ || ($ = {}));
(function ($) {
    class $bw_signin_form_pass_input extends $.$mol_string {
        value(val, force) {
            return this.password(val);
        }
        password(val, force) {
            return (val !== void 0) ? val : "";
        }
        type() {
            return this.pass_type();
        }
        pass_type() {
            return "password";
        }
        attr() {
            return (Object.assign({}, super.attr(), { "autocomplete": "current-password" }));
        }
        hint() {
            return "Введите пароль";
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_signin_form_pass_input.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $bw_signin_form_pass_input.prototype, "password", null);
    $.$bw_signin_form_pass_input = $bw_signin_form_pass_input;
})($ || ($ = {}));
(function ($) {
    class $bw_signup_form extends $.$mol_view {
        sub() {
            return [].concat(this.todo());
        }
        todo() {
            return "";
        }
    }
    $.$bw_signup_form = $bw_signup_form;
})($ || ($ = {}));
//login.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        let bw_login_data;
        class $bw_login_data extends $.$mol_object {
            pass_opened(val) {
                return this.$.$mol_state_session.value('$bw_signin_form_pass_opened', val) || false;
            }
            pass_type() {
                return this.pass_opened() ? "text" : "password";
            }
        }
        $$.$bw_login_data = $bw_login_data;
        class $bw_login extends $.$bw_login {
            constructor() {
                super();
                bw_login_data = new $bw_login_data();
            }
            title() {
                return this.Form().title();
            }
        }
        $$.$bw_login = $bw_login;
        class $bw_login_form extends $.$bw_login_form {
            title() {
                let value = this.Deck().Switch().value();
                return {
                    '0': { title: 'Вход в WinNER7' },
                    '1': { title: 'Регистрация в WinNER7' },
                }[value].title;
            }
        }
        $$.$bw_login_form = $bw_login_form;
        class $bw_pass_input_icon extends $.$bw_pass_input_icon {
            Icon() {
                return this.checked() ? this.OpenIcon() : this.CloseIcon();
            }
        }
        $$.$bw_pass_input_icon = $bw_pass_input_icon;
        class $bw_pass_input extends $.$bw_pass_input {
            pass_input_icon_click(val, force) {
                if (val) {
                    this.Icon().checked(!this.Icon().checked());
                    new $.$mol_defer(() => this.Input().focused(true));
                }
                return (val !== void 0) ? val : null;
            }
            pass_opened(val, force) {
                return bw_login_data.pass_opened(val);
            }
            attr() {
                return {
                    focused: this.Input().focused()
                };
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_pass_input.prototype, "pass_input_icon_click", null);
        $$.$bw_pass_input = $bw_pass_input;
        class $bw_signin_form_pass_input extends $.$bw_signin_form_pass_input {
            pass_type() {
                return bw_login_data.pass_type();
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_signin_form_pass_input.prototype, "pass_type", null);
        $$.$bw_signin_form_pass_input = $bw_signin_form_pass_input;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//login.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_scroll extends $.$mol_view {
        minimal_height() {
            return 0;
        }
        moving_hor(val, force) {
            return (val !== void 0) ? val : false;
        }
        moving_vert(val, force) {
            return (val !== void 0) ? val : false;
        }
        field() {
            return (Object.assign({}, super.field(), { "scrollTop": this.scroll_top(), "scrollLeft": this.scroll_left(), "scrollBottom": this.scroll_bottom(), "scrollRight": this.scroll_right() }));
        }
        scroll_top(val, force) {
            return (val !== void 0) ? val : 0;
        }
        scroll_left(val, force) {
            return (val !== void 0) ? val : 0;
        }
        scroll_bottom(val, force) {
            return (val !== void 0) ? val : 0;
        }
        scroll_right(val, force) {
            return (val !== void 0) ? val : 0;
        }
        event_async() {
            return (Object.assign({}, super.event_async(), { "scroll": (event) => this.event_scroll(event) }));
        }
        event_scroll(event, force) {
            return (event !== void 0) ? event : null;
        }
        Strut() {
            return ((obj) => {
                obj.style = () => ({
                    "transform": this.strut_transform(),
                });
                return obj;
            })(new this.$.$mol_view);
        }
        strut_transform() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "moving_hor", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "moving_vert", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "scroll_bottom", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "scroll_right", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "event_scroll", null);
    __decorate([
        $.$mol_mem
    ], $mol_scroll.prototype, "Strut", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//scroll.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        function $mol_scroll_top() {
            return 0;
        }
        $$.$mol_scroll_top = $mol_scroll_top;
        function $mol_scroll_left() {
            return 0;
        }
        $$.$mol_scroll_left = $mol_scroll_left;
        function $mol_scroll_moving() {
            return false;
        }
        $$.$mol_scroll_moving = $mol_scroll_moving;
        function $mol_scroll_moving_vert() {
            return false;
        }
        $$.$mol_scroll_moving_vert = $mol_scroll_moving_vert;
        function $mol_scroll_moving_hor() {
            return false;
        }
        $$.$mol_scroll_moving_hor = $mol_scroll_moving_hor;
        class $mol_scroll extends $.$mol_scroll {
            constructor() {
                super(...arguments);
                this._moving_task_timer = null;
            }
            scroll_bottom(next) {
                return next || 0;
            }
            scroll_right(next) {
                return next || 0;
            }
            event_scroll(next) {
                this.moving_vert(this.scroll_top() !== this.dom_node().scrollTop);
                this.moving_hor(this.scroll_left() !== this.dom_node().scrollLeft);
                this.moving_task_stop();
                new $.$mol_defer($.$mol_log_group(`${this}.event_scroll()`, () => {
                    const el = this.dom_node();
                    const top = Math.max(0, el.scrollTop);
                    const left = Math.max(0, el.scrollLeft);
                    this.scroll_top(top);
                    this.scroll_left(left);
                    this.scroll_bottom(Math.max(0, el.scrollHeight - top - el.offsetHeight));
                    this.scroll_right(Math.max(0, el.scrollWidth - left - el.offsetWidth));
                }));
            }
            event_repos(next) {
                new $.$mol_defer(() => {
                    const el = this.dom_node();
                    this.scroll_bottom(Math.max(0, el.scrollHeight - this.scroll_top() - el.offsetHeight));
                    this.scroll_right(Math.max(0, el.scrollWidth - this.scroll_left() - el.offsetWidth));
                });
            }
            moving_task_stop() {
                clearTimeout(this._moving_task_timer);
                this._moving_task_timer = setTimeout($.$mol_log_group(`${this}.moving_task_stop()`, () => {
                    this.moving_vert(false);
                    this.moving_hor(false);
                }), 50);
            }
            moving() {
                return this.moving_hor() || this.moving_vert();
            }
            context_sub() {
                return this.$.$mol_ambient({
                    $mol_view_visible_height: () => {
                        const sizeWin = $.$mol_window.size();
                        const limit = this.$.$mol_view_visible_height();
                        return this.scroll_top() + Math.min(sizeWin.height, limit);
                    },
                    $mol_view_visible_width: () => {
                        const sizeWin = $.$mol_window.size();
                        const limit = this.$.$mol_view_visible_width();
                        return this.scroll_left() + Math.min(sizeWin.width, limit);
                    },
                    $mol_scroll_top: () => this.scroll_top(),
                    $mol_scroll_left: () => this.scroll_left(),
                    $mol_scroll_moving: () => this.moving(),
                    $mol_scroll_moving_vert: () => this.moving_vert(),
                    $mol_scroll_moving_hor: () => this.moving_hor(),
                });
            }
            strut_transform() {
                try {
                    return `translate3d( 0 , ${this.content_height()}px , 0 )`;
                }
                catch (error) {
                    return '';
                }
            }
            sub_visible() {
                const sub = [
                    this.Strut(),
                    ...(this.sub() || []),
                ];
                const context = this.context_sub();
                sub.forEach(child => {
                    if (child instanceof $.$mol_view) {
                        child.$ = context;
                    }
                });
                return sub;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "scroll_bottom", null);
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "scroll_right", null);
        __decorate([
            $.$mol_mem
        ], $mol_scroll.prototype, "context_sub", null);
        $$.$mol_scroll = $mol_scroll;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//scroll.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_float extends $.$mol_view {
    }
    $.$mol_float = $mol_float;
})($ || ($ = {}));
//float.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_icon_chevron extends $.$mol_icon {
        path() {
            return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
        }
    }
    $.$mol_icon_chevron = $mol_icon_chevron;
})($ || ($ = {}));
//chevron.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_check_expand extends $.$mol_check {
        minimal_height() {
            return 32;
        }
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_icon_chevron);
        }
        level() {
            return 0;
        }
        style() {
            return (Object.assign({}, super.style(), { "paddingLeft": this.level_style() }));
        }
        level_style() {
            return "0px";
        }
        checked(val, force) {
            return this.expanded(val);
        }
        expanded(val, force) {
            return (val !== void 0) ? val : false;
        }
        enabled() {
            return this.expandable();
        }
        expandable() {
            return false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_check_expand.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $mol_check_expand.prototype, "expanded", null);
    $.$mol_check_expand = $mol_check_expand;
})($ || ($ = {}));
//expand.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_check_expand extends $.$mol_check_expand {
            level_style() {
                return `${this.level() * 1.25 - 1}rem`;
            }
            expandable() {
                return this.expanded() !== null;
            }
        }
        $$.$mol_check_expand = $mol_check_expand;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//expand.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_dimmer extends $.$mol_view {
        haystack() {
            return "";
        }
        needle() {
            return "";
        }
        sub() {
            return this.parts();
        }
        parts() {
            return [];
        }
        Low(id) {
            return ((obj) => {
                obj.sub = () => [].concat(this.string(id));
                return obj;
            })(new this.$.$mol_view);
        }
        string(id) {
            return "";
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_dimmer.prototype, "Low", null);
    $.$mol_dimmer = $mol_dimmer;
})($ || ($ = {}));
//dimmer.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_dimmer extends $.$mol_dimmer {
            parts() {
                const needle = this.needle();
                if (!needle)
                    return [this.haystack()];
                let chunks = [];
                let strings = this.strings();
                for (let index = 0; index < strings.length; index++) {
                    if (strings[index] === '')
                        continue;
                    chunks.push((index % 2) ? strings[index] : this.Low(index));
                }
                return chunks;
            }
            strings() {
                return this.haystack().split(new RegExp(`(${this.needle()})`, 'gi'));
            }
            string(index) {
                return this.strings()[index];
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_dimmer.prototype, "strings", null);
        $$.$mol_dimmer = $mol_dimmer;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//dimmer.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_grid extends $.$mol_scroll {
        row_ids() {
            return [];
        }
        row_id(index) {
            return null;
        }
        col_ids() {
            return [];
        }
        records() {
            return ({});
        }
        record(id) {
            return null;
        }
        hierarchy() {
            return null;
        }
        hierarchy_col() {
            return "";
        }
        sub() {
            return [].concat(this.Table());
        }
        Table() {
            return ((obj) => {
                obj.offset = () => this.gap_top();
                obj.sub = () => [].concat(this.rows_visible());
                return obj;
            })(new this.$.$mol_grid_table);
        }
        gap_top() {
            return 0;
        }
        rows_visible() {
            return [];
        }
        rows() {
            return [];
        }
        Head() {
            return ((obj) => {
                obj.height = () => this.row_height();
                obj.cells = () => this.head_cells();
                return obj;
            })(new this.$.$mol_grid_row);
        }
        row_height() {
            return 40;
        }
        head_cells() {
            return [];
        }
        Row(id) {
            return ((obj) => {
                obj.height = () => this.row_height();
                obj.cells = () => this.cells(id);
                return obj;
            })(new this.$.$mol_grid_row);
        }
        cells(id) {
            return [];
        }
        Cell(id) {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_view);
        }
        cell(id) {
            return null;
        }
        Cell_text(id) {
            return ((obj) => {
                obj.sub = () => [].concat(this.cell_content_text(id));
                return obj;
            })(new this.$.$mol_grid_cell);
        }
        cell_content_text(id) {
            return this.cell_content(id);
        }
        cell_content(id) {
            return [];
        }
        Cell_number(id) {
            return ((obj) => {
                obj.sub = () => [].concat(this.cell_content_number(id));
                return obj;
            })(new this.$.$mol_grid_number);
        }
        cell_content_number(id) {
            return this.cell_content(id);
        }
        Col_head(id) {
            return ((obj) => {
                obj.dom_name = () => "th";
                obj.sub = () => [].concat(this.col_head_content(id));
                return obj;
            })(new this.$.$mol_float);
        }
        col_head_content(id) {
            return [];
        }
        Cell_branch(id) {
            return ((obj) => {
                obj.level = () => this.cell_level(id);
                obj.label = () => this.cell_content(id);
                obj.expanded = (val) => this.cell_expanded(id, val);
                return obj;
            })(new this.$.$mol_check_expand);
        }
        cell_level(id) {
            return 0;
        }
        cell_expanded(id, val, force) {
            return (val !== void 0) ? val : false;
        }
        Cell_content(id) {
            return [].concat(this.Cell_dimmer(id));
        }
        Cell_dimmer(id) {
            return ((obj) => {
                obj.needle = () => this.needle();
                obj.haystack = () => this.cell_value(id);
                return obj;
            })(new this.$.$mol_dimmer);
        }
        needle() {
            return "";
        }
        cell_value(id) {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_grid.prototype, "Table", null);
    __decorate([
        $.$mol_mem
    ], $mol_grid.prototype, "Head", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell_text", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell_number", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Col_head", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell_branch", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "cell_expanded", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_grid.prototype, "Cell_dimmer", null);
    $.$mol_grid = $mol_grid;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_table extends $.$mol_view {
        dom_name() {
            return "table";
        }
        style() {
            return (Object.assign({}, super.style(), { "top": this.offset() }));
        }
        offset() {
            return 0;
        }
    }
    $.$mol_grid_table = $mol_grid_table;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_gap extends $.$mol_view {
        style() {
            return (Object.assign({}, super.style(), { "top": this.offset() }));
        }
        offset() {
            return 0;
        }
    }
    $.$mol_grid_gap = $mol_grid_gap;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_row extends $.$mol_view {
        dom_name() {
            return "tr";
        }
        style() {
            return (Object.assign({}, super.style(), { "height": this.height() }));
        }
        height() {
            return 40;
        }
        sub() {
            return this.cells();
        }
        cells() {
            return [];
        }
    }
    $.$mol_grid_row = $mol_grid_row;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_cell extends $.$mol_view {
        dom_name() {
            return "td";
        }
    }
    $.$mol_grid_cell = $mol_grid_cell;
})($ || ($ = {}));
(function ($) {
    class $mol_grid_number extends $.$mol_grid_cell {
    }
    $.$mol_grid_number = $mol_grid_number;
})($ || ($ = {}));
//grid.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_grid extends $.$mol_grid {
            rows_visible() {
                const rows = this.rows();
                if (!rows)
                    return null;
                const view_window = this.view_window();
                let result = rows.slice(view_window.top, view_window.bottom).valueOf();
                return [].concat(this.Head(), result);
            }
            rows_visible_max() {
                const result = Math.ceil(this.$.$mol_view_visible_height() / this.row_height());
                return result;
            }
            view_window() {
                const rows = this.rows();
                if (!rows)
                    return null;
                const count = rows.length;
                const context = this.context_sub();
                const scrollTop = context.$mol_scroll_top();
                const top = Math.max(0, Math.floor(scrollTop / this.row_height()) - 1);
                const bottom = Math.min(count, top + this.rows_visible_max());
                return { top, bottom, count };
            }
            gap_top() {
                const view_window = this.view_window();
                return view_window.top * this.row_height();
            }
            height() {
                const view_window = this.view_window();
                return view_window.count * this.row_height();
            }
            content_height() {
                return this.rows().length * this.row_height();
            }
            head_cells() {
                return this.col_ids().map(colId => this.Col_head(colId));
            }
            col_head_content(colId) {
                return [colId];
            }
            rows() {
                return this.row_ids().map(id => this.Row(id));
            }
            cells(row_id) {
                return this.col_ids().map(col_id => this.Cell({ row: row_id, col: col_id }));
            }
            col_type(col_id) {
                if (col_id === this.hierarchy_col())
                    return 'branch';
                const rowFirst = this.row_id(0);
                const val = this.record(rowFirst[rowFirst.length - 1])[col_id];
                if (typeof val === 'number')
                    return 'number';
                return 'text';
            }
            Cell(id) {
                switch (this.col_type(id.col).valueOf()) {
                    case 'branch': return this.Cell_branch(id);
                    case 'number': return this.Cell_number(id);
                }
                return this.Cell_text(id);
            }
            cell_content(id) {
                return [this.record(id.row[id.row.length - 1])[id.col]];
            }
            records() {
                return [];
            }
            record(id) {
                const result = this.records()[id];
                return result;
            }
            record_ids() {
                return Object.keys(this.records());
            }
            row_id(index) {
                return this.row_ids().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_id(0);
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            hierarchy() {
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                this.record_ids().map(id => {
                    root.sub.push(hierarchy[id] = {
                        id,
                        parent: root,
                        sub: [],
                    });
                });
                return hierarchy;
            }
            row_sub_ids(row) {
                return this.hierarchy()[row[row.length - 1]].sub.map(child => row.concat(child.id));
            }
            row_root_id() {
                return [''];
            }
            cell_level(id) {
                return id.row.length - 1;
            }
            row_ids() {
                const next = [];
                const add = (row) => {
                    next.push(row);
                    if (this.row_expanded(row)) {
                        this.row_sub_ids(row).forEach(child => add(child));
                    }
                };
                this.row_sub_ids(this.row_root_id()).forEach(child => add(child));
                return next;
            }
            row_expanded(row_id, next) {
                if (!this.row_sub_ids(row_id).length)
                    return null;
                const key = `row_expanded(${JSON.stringify(row_id)})`;
                const next2 = $.$mol_state_session.value(key, next);
                return (next2 == null) ? this.row_expanded_default(row_id) : next2;
            }
            row_expanded_default(row_id) {
                return row_id.length < 3;
            }
            cell_expanded(id, next) {
                return this.row_expanded(id.row, next);
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "rows_visible", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "rows_visible_max", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "view_window", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "head_cells", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "rows", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_grid.prototype, "col_type", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "record_ids", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "hierarchy", null);
        __decorate([
            $.$mol_mem
        ], $mol_grid.prototype, "row_ids", null);
        $$.$mol_grid = $mol_grid;
        class $mol_grid_table extends $.$mol_grid_table {
            context_sub() {
                const result = this.$.$mol_ambient({
                    $mol_scroll_top: () => {
                        const result = this.$.$mol_scroll_top() - this.offset();
                        return result;
                    },
                });
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_grid_table.prototype, "context_sub", null);
        $$.$mol_grid_table = $mol_grid_table;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//grid.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_plugin extends $.$mol_object {
        dom_node() {
            return null;
        }
        attr_static() {
            return ({});
        }
        event() {
            return ({});
        }
        event_async() {
            return ({});
        }
    }
    $.$mol_plugin = $mol_plugin;
})($ || ($ = {}));
//plugin.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_plugin extends $.$mol_plugin {
            dom_node() {
                const node = this.object_host().dom_node();
                $.$mol_dom_render_attributes(node, this.attr_static());
                $.$mol_dom_render_events(node, this.event());
                $.$mol_dom_render_events_async(node, this.event_async());
                return node;
            }
            render() {
                return this.dom_node();
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_plugin.prototype, "dom_node", null);
        $$.$mol_plugin = $mol_plugin;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//plugin.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_vim extends $.$mol_plugin {
        event() {
            return ({
                "keypress": (event) => this.event_keypress(event),
                "keydown": (event) => this.event_keydown(event),
            });
        }
        event_keypress(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_keydown(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_vim.prototype, "event_keypress", null);
    __decorate([
        $.$mol_mem
    ], $bw_vim.prototype, "event_keydown", null);
    $.$bw_vim = $bw_vim;
})($ || ($ = {}));
//vim.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        function isValidVimMode(some) {
            const result = Number.isInteger(some) &&
                0 <= some && some <= 3;
            return result;
        }
        $$.isValidVimMode = isValidVimMode;
        function getValidVimMode(some, modes) {
            if (some === void 0) {
                const defaultModes = [0, 1, 2, 3];
                const defaultMode = defaultModes[0];
                if (modes === void 0)
                    return defaultMode;
                if (Number.isInteger(modes))
                    return modes;
                const modeSet = modes;
                if (!modeSet.size)
                    return defaultMode;
                if (modeSet.size == 1)
                    return modeSet.entries().next().value[0];
                const len = defaultModes.length;
                for (let i = 0; i < len; i++) {
                    const defaultMode = defaultModes[i];
                    if (modeSet.has(defaultMode))
                        return defaultMode;
                }
                return null;
            }
            else if (isValidVimMode(some)) {
                const mode = some;
                if (modes === void 0) {
                    return mode;
                }
                if (Number.isInteger(modes)) {
                    if (mode !== modes)
                        return null;
                    return mode;
                }
                const modeSet = modes;
                if (!modeSet.size)
                    return mode;
                if (!modeSet.has(mode))
                    return null;
                return mode;
            }
            else {
                return null;
            }
        }
        $$.getValidVimMode = getValidVimMode;
        const nonInsertVimMode = new Set([0, 2, 3]);
        class $bw_vim extends $.$bw_vim {
            constructor() {
                super(...arguments);
                this._vim_mode = -1;
            }
            event_keydown(event) {
                if (!event)
                    return;
                const processed = this.process_keydown(event);
                if (processed) {
                    event.stopPropagation();
                    if (processed.prevent) {
                        event.preventDefault();
                    }
                }
            }
            event_keypress(event) {
                if (!event)
                    return;
                const processed = this.process_keypress(event);
                if (processed) {
                    event.stopPropagation();
                    if (processed.prevent) {
                        event.preventDefault();
                    }
                }
            }
            canVimMode(mode) {
                const vim_modes = this.vim_modes();
                const result = vim_modes === void 0 ||
                    vim_modes === mode ||
                    (vim_modes instanceof Set) && (!vim_modes.size || vim_modes.has(mode));
                return result;
            }
            process_keydown(event) {
                const { code, ctrlKey, shiftKey, metaKey, altKey } = event;
                if (this.vim_mode() == 1 && !ctrlKey && !metaKey && !altKey && (code != 'Escape')) {
                    return { prevent: false };
                }
                if (this.vim_mode() != 0 && !(ctrlKey || metaKey || altKey || shiftKey) && code == 'Escape' && this.canVimMode(0)) {
                    this.vim_mode(0);
                    return { prevent: true };
                }
                if (!this.vim_cmd())
                    return;
                if (!this.eventSequence)
                    this.eventSequence = [];
                this.eventSequence.push({ code, ctrlKey, shiftKey, metaKey, altKey });
                const result = this.processEventSequence(this.vim_def_keydown());
                if (!result) {
                    this.eventSequence.pop();
                }
                return result;
            }
            process_keypress(event) {
                if (this.vim_mode() == 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
                    const object_host = this['object_host()'];
                    if (typeof object_host.vim_process_keypress == 'function' && object_host.vim_process_keypress(event, 1)) {
                        return { prevent: false };
                    }
                }
                if (!this.vim_cmd())
                    return;
                if (!this.eventSequence)
                    this.eventSequence = [];
                const { code, ctrlKey, shiftKey, metaKey, altKey } = event;
                if (!(ctrlKey || shiftKey || metaKey || altKey) && ('Digit0' <= code && code <= 'Digit9')) {
                    const digit = +code.substr(5);
                    if (this.eventSequence.length) {
                        const item = this.eventSequence[this.eventSequence.length - 1];
                        if (item.value !== void 0) {
                            item.value = item.value * 10 + digit;
                            return;
                        }
                    }
                    this.eventSequence.push({ value: digit });
                    return { prevent: true };
                }
                this.eventSequence.push({ code, ctrlKey, shiftKey, metaKey, altKey });
                const result = this.processEventSequence(this.vim_def_keypress());
                return result;
            }
            processEventSequence(def) {
                let processed;
                const vim_cmd = this.vim_cmd();
                const vim_mode = this.vim_mode();
                for (let i = 0; i < def.length; i++) {
                    const mode = def[i].mode;
                    if (mode !== void 0) {
                        if (mode instanceof Set) {
                            if (!mode.has(vim_mode))
                                continue;
                        }
                        else if (mode !== vim_mode)
                            continue;
                    }
                    const cmd = def[i].cmd;
                    if (!(typeof cmd == 'function' || vim_cmd[cmd]))
                        continue;
                    const conformResult = this.isKeySequence(def[i].seq);
                    if (conformResult) {
                        const opt = {};
                        if (this.keySeqNumber !== void 0) {
                            opt.qt = this.keySeqNumber;
                        }
                        if (typeof conformResult === 'object') {
                            opt.conformResult = conformResult;
                        }
                        const cmdCallDef = typeof cmd == 'function' ? { cmd, lastArg: void 0 } : { cmd: vim_cmd[cmd], lastArg: cmd };
                        const ret = cmdCallDef.cmd.call(this['object_host()'], opt, cmdCallDef.lastArg);
                        processed = { prevent: true };
                        if (ret === void 0) {
                        }
                        else if (ret === null ||
                            typeof ret !== 'object' ||
                            ret.prevent !== void 0 && typeof ret.prevent != 'boolean' ||
                            ret.mode !== void 0 && !isValidVimMode(ret.mode) ||
                            false) {
                            console.error(`${cmdCallDef.cmd} must return void | { prevent?: boolean, mode?: VimMode }, not ${ret}`);
                        }
                        else {
                            let { prevent, mode } = ret;
                            if (mode !== void 0 && this.canVimMode(mode))
                                this.vim_mode(mode);
                            if (prevent === void 0)
                                prevent = true;
                            processed = { prevent };
                        }
                        break;
                    }
                }
                return processed;
            }
            vim_cmd() {
                const object_host = this['object_host()'];
                const result = typeof object_host.vim_cmd == 'function' ? object_host.vim_cmd() : void 0;
                if (!(result instanceof VimDefCmd)) {
                    console.error(`${this} has no .vim_cmd() method or it does not return VimDefCmd`);
                }
                return result.vim_cmd;
            }
            vim_modes() {
                const object_host = this['object_host()'];
                const result = typeof object_host.vim_modes != 'function' ? void 0 : object_host.vim_modes();
                if (!(result === void 0 || isValidVimMode(result) || result instanceof Set)) {
                    console.error(`${this}has no .vim_modes() method or it does not return VimMode || Set`);
                }
                return result;
            }
            vim_mode(val, skip_trigger = false) {
                if (val !== void 0) {
                    this._vim_mode = val;
                }
                let result = this._vim_mode;
                if (result < 0) {
                    const object_host = this['object_host()'];
                    const mode = typeof object_host.vim_mode == 'function' ? object_host.vim_mode() : void 0;
                    let modes = this.vim_modes();
                    result = getValidVimMode(mode, modes);
                    if (result === null) {
                        console.error(`${this}.vim_mode(): failed to getValidVimMode for combination of .initialMode (${mode}) and .modes (${modes})`);
                    }
                    this._vim_mode = result;
                }
                return result;
            }
            isKeySequence(seq) {
                let result = false;
                const eventSequence = this.eventSequence;
                let hasKeySeqNumber = false;
                this.keySeqNumber = void 0;
                for (let i = 0; i < seq.length; i++) {
                    const seqItem = seq[seq.length - 1 - i];
                    if (seqItem.code)
                        continue;
                    if (hasKeySeqNumber) {
                        console.error({ message: 'seq has more than one KeySeqNumber', seq });
                        return false;
                    }
                    hasKeySeqNumber = true;
                    if (!i) {
                        console.error({ message: 'KeySeqNumber must not be last item in seq', seq });
                        return false;
                    }
                }
                if (eventSequence.length >= seq.length - (hasKeySeqNumber ? 1 : 0)) {
                    result = true;
                    let j = 0;
                    for (let i = 0; i < seq.length; i++) {
                        const item = seq[seq.length - 1 - i];
                        if (item.code) {
                            const seqItem = seq[seq.length - 1 - i];
                            const item = eventSequence[eventSequence.length - 1 - j];
                            const eventItem = eventSequence[eventSequence.length - 1 - j];
                            const conformResult = $bw_vim_event_conform(eventItem, seqItem);
                            if (!conformResult) {
                                result = false;
                                break;
                            }
                            else if (typeof result === 'boolean') {
                                result = conformResult;
                            }
                            else if (result.constructor.name === 'Object') {
                                result = [result, conformResult];
                            }
                            else {
                                result.push(conformResult);
                            }
                            j++;
                            if (!result)
                                break;
                        }
                        else {
                            const seqItem = seq[seq.length - 1 - i];
                            if (eventSequence.length < 1 + j) {
                                this.keySeqNumber = seqItem.default;
                            }
                            else {
                                const item = eventSequence[eventSequence.length - 1 - j];
                                if (item.code) {
                                    this.keySeqNumber = seqItem.default;
                                }
                                else {
                                    const eventItem = eventSequence[eventSequence.length - 1 - j];
                                    this.keySeqNumber = eventItem.value;
                                    j++;
                                }
                            }
                        }
                    }
                }
                if (result) {
                    this.eventSequence = [];
                }
                return result;
            }
            vim_def_keydown() {
                return [
                    {
                        seq: [{ code: 'ArrowUp', shiftKey: null }],
                        cmd: 0,
                    },
                    {
                        seq: [{ code: 'ArrowDown', shiftKey: null }],
                        cmd: 1,
                    },
                    {
                        seq: [{ code: 'Escape' }],
                        cmd: 23,
                    },
                    {
                        seq: [{ code: 'Backspace' }],
                        cmd: 19,
                    },
                ];
            }
            vim_def_keypress() {
                let result = [
                    {
                        seq: [{ default: 1 }, { code: 'KeyK', shiftKey: null }],
                        cmd: 0,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyJ', shiftKey: null }],
                        cmd: 1,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyU', ctrlKey: true, shiftKey: null }],
                        cmd: 2,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyD', ctrlKey: true, shiftKey: null }],
                        cmd: 3,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyB', ctrlKey: true, shiftKey: null }],
                        cmd: 4,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyF', ctrlKey: true, shiftKey: null }],
                        cmd: 5,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{}, { code: 'KeyG' }, { code: 'KeyG' }],
                        cmd: 6,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{}, { code: 'KeyG', shiftKey: true }],
                        cmd: 7,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyH', shiftKey: true }],
                        cmd: 8,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyL', shiftKey: true }],
                        cmd: 9,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyM', shiftKey: true }],
                        cmd: 10,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyZ' }, { code: 'KeyT' }],
                        cmd: 13,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyZ' }, { code: 'KeyB' }],
                        cmd: 14,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyZ' }, { code: 'KeyZ' }],
                        cmd: 15,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyE', ctrlKey: true }],
                        cmd: 11,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyY', ctrlKey: true }],
                        cmd: 12,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyD' }, { code: 'KeyD' }],
                        cmd: 18,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyD' }, { default: 1 }, { code: 'KeyD' }],
                        cmd: 18,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyU' }],
                        cmd: 20,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ default: 1 }, { code: 'KeyR', ctrlKey: true }],
                        cmd: 21,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyO', shiftKey: true }],
                        cmd: 16,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyO' }],
                        cmd: 17,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'Enter' }],
                        cmd: 22,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'Space' }],
                        cmd: 24,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyV', shiftKey: true }],
                        cmd: 25,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyA', ctrlKey: true }],
                        cmd: 26,
                    },
                    {
                        seq: [{ code: 'KeyI', ctrlKey: true }],
                        cmd: 27,
                    },
                    {
                        seq: [{ code: 'KeyP' }],
                        cmd: 28,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyP', shiftKey: true }],
                        cmd: 29,
                        mode: nonInsertVimMode,
                    },
                    {
                        seq: [{ code: 'KeyR' }],
                        cmd: 30,
                        mode: nonInsertVimMode,
                    },
                ];
                const object_host = this['object_host()'];
                if (typeof object_host.vim_def_keypress == 'function') {
                    result = object_host.vim_def_keypress.call(object_host, result);
                }
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_vim.prototype, "vim_cmd", null);
        __decorate([
            $.$mol_mem
        ], $bw_vim.prototype, "vim_modes", null);
        $$.$bw_vim = $bw_vim;
        class VimDefCmd {
            constructor(...items) {
                this.vim_cmd = [];
                items.forEach(item => {
                    this.set(item.cmd, item.fn);
                });
            }
            set(cmd, fn) {
                let val = (typeof cmd == 'object' ? cmd : [cmd]);
                const count = val.length;
                for (let j = 0; j < count; j++) {
                    if (this.vim_cmd[val[j]]) {
                        console.error(`${fn} and ${this.vim_cmd[val[j]]} are assigned to the same cmd ${val[j]}`);
                        console.trace();
                        return;
                    }
                    this.vim_cmd[val[j]] = fn;
                }
            }
        }
        $$.VimDefCmd = VimDefCmd;
        class VimDefCmdItem {
            constructor(cmd, fn) {
                this.cmd = cmd;
                this.fn = fn;
            }
        }
        $$.VimDefCmdItem = VimDefCmdItem;
        function $bw_vim_event_conform(tstCode, etaCode) {
            if (tstCode.code !== etaCode.code)
                return false;
            let result = true;
            const keys = ['ctrlKey', 'shiftKey', 'altKey', 'metaKey'];
            const len = keys.length;
            for (let i = 0; i < len; i++) {
                const key = keys[i];
                if (etaCode[key] === null) {
                    if (typeof result === 'boolean') {
                        result = { code: etaCode.code };
                    }
                    result[key] = tstCode[key];
                }
                else if (!!etaCode[key] !== !!tstCode[key]) {
                    return false;
                }
            }
            return result;
        }
        $$.$bw_vim_event_conform = $bw_vim_event_conform;
        function $bw_vim_event_upper(obj) {
            let target;
            let host = obj;
            while (host = host['object_host()']) {
                if (typeof host.event_keypress != 'function') {
                    host = host['object_host()'];
                }
                else {
                    target = host;
                    break;
                }
            }
            if (target) {
                target.event_keypress(event);
            }
        }
        $$.$bw_vim_event_upper = $bw_vim_event_upper;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//vim.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_input extends $.$mol_string {
        autofocus() {
            return false;
        }
        bw_autofocus() {
            return false;
        }
        readonly() {
            return false;
        }
        autocomplete() {
            return "off";
        }
        bw_dropped_down() {
            return false;
        }
        minimal_height() {
            return 32;
        }
        attr() {
            return (Object.assign({}, super.attr(), { "autofocus": this.autofocus(), "readonly": this.readonly(), "autocomplete": this.autocomplete(), "bw_dropped_down": this.bw_dropped_down(), "bw_autofocus": this.bw_autofocus() }));
        }
        plugins() {
            return [].concat(this.Vim());
        }
        Vim() {
            return ((obj) => {
                return obj;
            })(new this.$.$$.$bw_vim);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_input.prototype, "Vim", null);
    $.$bw_input = $bw_input;
})($ || ($ = {}));
//input.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_input extends $.$bw_input {
            vim_cmd() {
                return new $$.VimDefCmd(new $$.VimDefCmdItem(19, (opt, cmd) => {
                    console.log(cmd);
                }));
            }
            vim_modes() {
                return 1;
            }
            vim_process_keypress(event) {
                const result = event.code != 'Enter';
                return result;
            }
        }
        $$.$bw_input = $bw_input;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//input.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_input_checkable extends $.$mol_view {
        value(val, force) {
            return (val !== void 0) ? val : "";
        }
        autofocus() {
            return false;
        }
        readonly() {
            return false;
        }
        autocomplete() {
            return "";
        }
        hint() {
            return "";
        }
        bw_dropped_down() {
            return false;
        }
        bw_grid_column_filterable() {
            return true;
        }
        input_enabled() {
            return true;
        }
        checked(val, force) {
            return (val !== void 0) ? val : false;
        }
        check_enabled() {
            return true;
        }
        debounce() {
            return 200;
        }
        minimal_height() {
            return 32;
        }
        sub() {
            return [].concat(this.Input(), this.Check());
        }
        Input() {
            return ((obj) => {
                obj.value = (val) => this.value(val);
                obj.autofocus = () => this.autofocus();
                obj.readonly = () => this.readonly();
                obj.autocomplete = () => this.autocomplete();
                obj.bw_dropped_down = () => this.bw_dropped_down();
                obj.enabled = () => this.input_enabled();
                obj.debounce = () => this.debounce();
                obj.minimal_height = () => this.minimal_height();
                obj.hint = () => this.hint();
                return obj;
            })(new this.$.$bw_input);
        }
        Check() {
            return ((obj) => {
                obj.checked = (val) => this.checked(val);
                obj.enabled = () => this.check_enabled();
                obj.sub = () => [].concat(this.Icon());
                return obj;
            })(new this.$.$mol_check);
        }
        Icon() {
            return null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_input_checkable.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_checkable.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_checkable.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_checkable.prototype, "Check", null);
    $.$bw_input_checkable = $bw_input_checkable;
})($ || ($ = {}));
//checkable.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_icon_logo extends $.$mol_svg_root {
        view_box() {
            return "0 0 487 442";
        }
        sub() {
            return [].concat(this.PathBlue(), this.PathCyan());
        }
        PathBlue() {
            return ((obj) => {
                obj.geometry = () => "M222.3 105.4c-3.3.9-7.5 2.5-9.4 3.5a48.6 48.6 0 0 0-15.2 14.7c-1.9 3.9-6.8 20-11.8 39.4a36240.2 36240.2 0 0 1-40.2 155c-7.4 29.5-14.4 49.5-17.3 49.5-1.9 0-4-2.8-6.3-8.5-2.5-5.8-6.7-22.8-34.8-140l-7.9-32.5-6-25-6-25.5c-2-8.3-4.6-17-5.7-19.2-4-8.3-11.9-10.4-38.7-10-16.9.2-17.4.3-19.3 2.6-1.3 1.6-1.9 3.9-1.9 7.5.1 5.9-.6 3 10.3 43.6A22792.6 22792.6 0 0 1 41 269l18 68c14.6 57.3 23 80.5 32.5 89.9 13.6 13.6 37.4 16.3 58 6.7a50.6 50.6 0 0 0 21.3-21.4c2.7-5.8 13.8-45.6 25.2-90.4C207 278 211.3 262 227.2 204c7.4-27 8-28.2 11.1-25.5 2 1.6 7 17.7 13.5 43l9 35 9 34.5 11 42 10.5 40c6.3 24.2 7.8 27.5 10.4 22.7 1.4-2.5 11-31.8 18.8-56.7 7.6-24.7 7.6-24.3 1.3-47-2.3-8.3-6.4-23.3-9-33.5l-21-80-3.6-14a305 305 0 0 0-11.5-39.2 44.5 44.5 0 0 0-14.7-15.5 55.8 55.8 0 0 0-39.7-4.4z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        PathCyan() {
            return ((obj) => {
                obj.geometry = () => "M444.8 1.7a31.6 31.6 0 0 0-10.5 1.2 41.9 41.9 0 0 0-32 33 30.2 30.2 0 0 0-.6 13.9 44.1 44.1 0 0 0 23.8 31.9c6.4 3 7.4 3.3 17.3 3.3 13.6 0 19.5-2.2 28.6-10.7A41.7 41.7 0 0 0 451 2.6a31.6 31.6 0 0 0-6.2-1zm-63.3 105.8c-39 0-77.8.3-79.4 1h-.1c-1.2.5-2.5 1.6-2.8 2.4-.5 1.4 3 15.3 10.3 40l3.8 13 38.3.4c36 .2 38.3.3 37.8 2l-8.5 29.2c-4.4 15-10.3 35.8-13 46a7149.1 7149.1 0 0 1-37 132c-12.6 42.2-15.6 56.3-13.2 60.8.6 1 3.1 2.8 5.5 3.7 3.8 1.5 7.6 1.6 28.7 1.2 26.8-.5 31.3-1.2 36-6 4.5-4.5 6.8-9.7 10.6-24.6 1.8-7.5 7-26.4 11.3-42.1a1843 1843 0 0 0 16.8-62.5 25909 25909 0 0 0 46-171.5 38.2 38.2 0 0 0 1.7-12.6c-.7-4.1-7-10-12.2-11.3-2.4-.7-41.6-1-80.6-1z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_logo.prototype, "PathBlue", null);
    __decorate([
        $.$mol_mem
    ], $bw_icon_logo.prototype, "PathCyan", null);
    $.$bw_icon_logo = $bw_icon_logo;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_logo_winner extends $.$mol_svg_root {
        view_box() {
            return "0 0 843 90";
        }
        sub() {
            return [].concat(this.PathBlue(), this.PathCyan());
        }
        PathBlue() {
            return ((obj) => {
                obj.geometry = () => "M62.6 1.7c-10.7 0-11.7 10.6-14.3 20.6l-7.5 28c-1.6 6.7-3.3 13-5.3 19-.2.8-1.9 1-2.1 0-5.2-19.6-10.7-41.2-15.7-61.2-2-7.2-.3-6.3-14.3-6.3-5.5 0-1.3 9.7 0 14.3l9.2 33.4c2.1 7.8 3.8 14.7 6.1 22.4 3.4 11.4 5.4 15.5 12.2 16.4 1.5.2 3.3.1 5.4.2 2 0 3.7-1 5.1-1.8 6.3-3.5 7-13.7 8.6-19.2L55 49l2.7-9.5L62.6 21c1-1.7 2.5-2.9 4.8 7.5l12 47.6c1.6 5.4 3.5 9 6.2 10.7 2.3 1.4 4.9 1.8 9 1.8 2.7 0 4.6-.8 6.3-2 3.9-2.7 6-8.6 7.2-13.6 2-7.6 4.2-14.5 6.1-22.4l9.3-33.4c4.5-16.7 5.6-15.4-7.8-15.4-4 0-4.4.8-6 5.8l-7 26.5c-1 3.8-7 32.8-8.8 35.3-.6.8-1.5.8-2 0-.8-1.2-1.6-3.6-2.6-7.5l-7.7-28.6-5.2-19C73.6 4.5 72.6 1.7 62.6 1.7zm190.7 0c-9.1 0-13.5 9.1-13.5 18.5v65.3c.1 1.5 1.3 3 2.6 3h11.8c1 0 2.4-2 2.4-3V30.8c0-3-.2-8.4.6-7.7l33.4 51.6c6 9 7.4 13.3 15.7 13.8h4c6 0 10.6-5.3 10.6-11.4V4.2c0-2.1-4.3-2.5-8.4-2.4-4 0-8 .4-8 2.4v29.5c0 12.3.4 24.6.4 30 0 2.7 0 3-.6 2.8l-33.7-52.2c-.7-1.1-6-12.6-17.3-12.6zm96.8 0c-10 0-12.8 7.4-12.8 17.2v56.6c0 8.5 3.7 13 12.2 13H401c4.2 0 4-1.3 4-7 0-5.8.2-8.1-4-8.1h-41.4c-6.8 0-6 .6-6-7.2v-9c0-6 1.9-5.2 5-5.3H394c9.3 0 10.3 0 10.3-7s-1.2-6.6-10.4-6.7h-34.5c-3.9 0-5.6.3-5.6-2.6V21.7c0-4.4.3-5 2.1-5h45c4.4 0 4.2-1.9 4.2-7.2 0-5.3.1-7.8-4-7.8h-51zm80.9.1c-7.9 0-13 6.6-13 14.4v68.5c0 2.2.6 3.4 2.7 3.7h5.1c2.4 0 4.1.1 5.4-.1 2-.4 2.7-1.8 2.7-3.6l.1-65.9c0-2.5 2-2.1 3.6-2.1h27.3c9 0 12.7 7.2 12.7 14.5.1 7.2-3.1 13.9-12.9 14H451c-4.6 0-7.8 2.7-7.6 7.8 0 1.8 1.4 4.5 3.8 7l12.4 12.3 15.5 15a5 5 0 0 0 3 1.2H492c1.2 0 2.8-.9.7-3l-5.1-5.3-23.2-21.8c-.8-1 1.3-.8 3.7-.8 3.5-.1 25.6-2.9 25.6-26.4 0-23.6-13-29.4-21.5-29.4H431zM186.7 23.6h-10.3c-5 0-8.5 3-8.5 8v50.5c0 4.1.7 6.1 3 6.3h8.2c4 0 3.7-3 3.7-7V38.1c0-2 .8-2.7 2.5-2.9h13.2c9.4.4 13.5 3.2 13.5 19.9v29.5c0 2.4.7 3.6 3.3 3.8h7.7c3.4 0 4.2-1.2 4.1-3.9V54.8c-.2-9.7-1.3-18.8-4.4-23.2a13.4 13.4 0 0 0-6.7-5.4 108 108 0 0 0-29.3-2.6zm-40.4 1.2c-3.2 0-7.9.2-7.7 2-.1 3 .1 49.9.1 56 0 3.4.7 5.2 2.7 5.5 2 .2 6.2.2 9.4.1 2.2 0 2.8-2.8 2.9-4.1V26.8c.4-1.8-4-2-7.4-2z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        PathCyan() {
            return ((obj) => {
                obj.geometry = () => "M146.1 1.8a7.4 7.4 0 1 1 0 14.8 7.4 7.4 0 0 1 0-14.8";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_logo_winner.prototype, "PathBlue", null);
    __decorate([
        $.$mol_mem
    ], $bw_icon_logo_winner.prototype, "PathCyan", null);
    $.$bw_icon_logo_winner = $bw_icon_logo_winner;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_logo_baza_winner extends $.$mol_svg_root {
        view_box() {
            return "0 0 843 90";
        }
        sub() {
            return [].concat(this.PathBlue(), this.PathCyan());
        }
        PathBlue() {
            return ((obj) => {
                obj.geometry = () => "M467.8 1.7h-4.3c-4.1 0-4.5.8-6.2 5.8L450.4 34c-.9 3.8-7 32.8-8.8 35.3-.5.8-1.5.8-2 0a26 26 0 0 1-2.5-7.5l-7.7-28.6-5.3-19c-2.7-9.7-3.8-12.5-13.8-12.5-10.6 0-11.7 10.6-14.2 20.6l-7.6 28c-1.6 6.7-3.3 13-5.2 19-.3.8-2 1-2.2 0-5.9-19.6-10.7-41.2-15.6-61.2-2-7.2-.4-6.3-14.3-6.3-5.6 0-1.3 9.7-.1 14.3l9.3 33.4c2 7.8 3.8 14.7 6 22.4 3.4 11.4 5.5 15.5 12.2 16.4 1.6.2 3.3.1 5.4.2 2 0 3.7-1 5.2-1.8 6.3-3.5 6.9-13.7 8.6-19.2l5-18.5c.9-3.3 1.6-6.3 2.6-9.5l4.9-18.6c1-1.7 2.6-2.9 4.8 7.5l12 47.6c1.6 5.4 3.6 9 6.2 10.7 2.3 1.4 4.9 1.8 9 1.8a10 10 0 0 0 6.3-2c4-2.7 6-8.6 7.2-13.6 2-7.6 4.2-14.5 6.2-22.4l9.2-33.4c4-14.6 5.3-15.4-3.4-15.4zm133.3 0c-9 0-13.5 9.1-13.5 18.5h-.1v60.5l.1 4.8c0 1.5 1.2 3 2.5 3H602c1 0 2.4-2 2.4-3V30.8c0-3-.1-8.4.7-7.7l33.3 51.6c6 9 7.4 13.3 15.7 13.8h4c6 0 10.6-5.3 10.6-11.4V4.2c0-2.1-4.3-2.5-8.4-2.4-4 0-8 .4-7.9 2.4v29.5c0 12.3.4 24.6.3 30 0 2.7 0 3-.6 2.8l-33.7-52.2c-.7-1.1-6-12.6-17.3-12.6zm96.7 0c-10 0-12.8 7.4-12.8 17.2v56.6c0 8.5 3.7 13 12.2 13h51.6c4.2 0 4-1.3 4-7 0-5.8.3-8.1-4-8.1h-41.4c-6.8 0-5.9.6-5.9-7.2v-9c0-6 1.8-5.2 5-5.3h35.2c9.3 0 10.3 0 10.3-7s-1.2-6.6-10.3-6.7h-34.5c-4 0-5.7.3-5.7-2.6V21.7c.1-4.4.3-5 2.2-5h45c4.4 0 4.1-1.9 4-7.2 0-5.3.2-7.8-3.9-7.8h-51zm80.8.1c-7.9 0-13 6.6-13 14.4h.1v68.5c0 2.2.6 3.4 2.8 3.7h5c2.4 0 4.2.1 5.4-.1 2-.4 2.8-1.8 2.8-3.6V18.8c0-2.5 2-2.1 3.6-2.1h27.4c8.9 0 12.6 7.2 12.7 14.5 0 7.2-3.2 13.9-13 14h-13.8c-4.6 0-7.8 2.7-7.6 7.8 0 1.8 1.4 4.5 3.8 7l12.4 12.3 15.5 15a5 5 0 0 0 3 1.2h13.9c1.3 0 2.8-.9.8-3l-5.2-5.3L812 58.4c-.7-1 1.4-.8 3.7-.8 3.6-.1 25.6-2.9 25.6-26.4 0-23.6-13-29.4-21.5-29.4h-41.2zM14.2 2C4.3 2 1.5 9.4 1.5 19v56.3c0 8.4 3.7 13.2 12.1 13.2 0 0 32.3 0 43-.2 7.5-.5 16.6-.6 22-7.1a33.9 33.9 0 0 0 6.8-21c0-5.3-2.1-13.4-6.4-18.2-6.6-6.8-12.5-6-21.9-6.3-9.8-.2-31.5 0-33 0-2.2.3-2.6 3.9-2.7 6.4 0 2.4.4 6.1 2.4 6.2h13.3c4.5 0 14.4 0 19 .3 8.4.7 13.5 3 13.7 11.9.2 9-3.9 12.7-12.5 12.9H24c-6.8 0-6 0-6-7.4V22c0-2.7.2-5 2-5h54c4 0 3.6-2 3.6-7.3s.7-7.5-3.3-7.7H14.2zm520.2 21.6h-10.2c-5.2 0-8.6 3-8.6 8v50.5c0 4.1.7 6.1 3 6.3h8.2c4 0 3.8-3 3.8-7V38.1c-.1-2 .7-2.7 2.4-2.9h13.2c9.4.4 13.5 3.2 13.5 19.9v29.5c0 2.4.8 3.6 3.3 3.8h7.7c3.4 0 4.2-1.2 4.2-3.9V54.8c-.3-9.7-1.4-18.8-4.5-23.2a13.4 13.4 0 0 0-6.7-5.4 107 107 0 0 0-29.3-2.6zM494 24.8c-3.1 0-7.9.2-7.6 2-.2 3 0 49.9 0 56 0 3.4.7 5.2 2.8 5.5 2 .2 6.1.2 9.3.1 2.3 0 2.9-2.8 2.9-4.1V26.8c.4-1.8-4-2-7.4-2zm-296 .3c-10.4 0-28.1 1-27.2 15.7.2.5 4.8.5 7 .5 2 0 5.7-.1 6-.6 0-6.1 9.3-5.3 15.8-5.3 3.3 0 8.7 1.5 10.2 2.5s1.5 2.6 1.6 4.9c0 2-.4 3.7-1.8 4.5-1.3.8-3.7.8-5.3.8h-14c-.9 0-1.4 3.6-1.4 5.3 0 1.7.4 4.8 1.5 4.9h7.8c3.4 0 6.7.4 9.5 1.7 2.8 1.3 3.7 3.3 3.7 7.8 0 4.6-1 6.6-4 8a29.4 29.4 0 0 1-11.3 1.9c-7.8 0-14.7-2.5-14.7-9.5V66c-.8-.7-4.1-.9-6.5-.9-2.4 0-6.1-.2-6.9.5 0 7.3 1.6 11 4.5 14.5 4.9 5.6 13.3 8.3 24.4 8.3a40 40 0 0 0 14.7-2.3 19 19 0 0 0 13.3-18.3c0-6.7-1.1-11-5-14.4a17 17 0 0 0 3.3-3.9c1-1.4 1.7-3.7 1.7-8.5 0-8.5-6.7-11.9-10.2-13.4a54.2 54.2 0 0 0-16.7-2.5zm-70.7.3c-13.5 0-25.1-.3-27.2 14.5l-.1.1h13.3c1-1.8 1-2.3 3.2-3.1 2-.9 4.7-1 10.3-1 3.4 0 10.4 0 12.7 1.5 1.8 1.1 3.6 3.3 3.6 5.6v5.4h-25.3c-7.2 0-13.8 1.6-17.5 8.1-.8 1.2-2.9 6-2.9 12.3.1 20.4 15.6 19.6 31.4 19.7a14 14 0 0 0 8.6-2c.8-.7 2.4-1.2 5.8-1.5 0 1.5-.3 3.4 1.8 3.4h8.2c2 0 3 0 3-1.8V52.7c0-10 .5-21.4-10.6-25.5-5.6-2-12.2-1.7-18.3-1.8zm139.2 0c-13.5 0-25.1-.3-27.2 14.5v.1h13.2c1-1.8 1-2.3 3.2-3.2 2-.8 4.7-.8 10.3-.8 3.4 0 10.4 0 12.7 1.4 1.8 1.1 3.6 3.3 3.6 5.6v5.4H257c-7.2 0-13.8 1.6-17.5 8.1-.8 1.2-2.9 6-2.9 12.3.1 20.4 15.6 19.6 31.4 19.7a14 14 0 0 0 8.6-2c.8-.7 2.4-1.2 5.8-1.5 0 1.5-.3 3.4 1.8 3.4h8.2c2 0 3 0 3-1.8V52.7c0-10 .5-21.4-10.6-25.5-5.6-2-12.2-1.7-18.3-1.8zM130.1 58.6c7.4 0 13 .7 13 9.5 0 10-7.2 10.6-16.3 10.6-9.1 0-15.6-.3-15.6-10.6 0-10.3 6.6-9.4 15.6-9.5h3.3zm139.2 0c7.4 0 13 .7 13 9.5 0 10-7.3 10.6-16.3 10.6-9.1 0-15.6-.3-15.6-10.6 0-10.3 6.6-9.4 15.6-9.5h3.3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
        PathCyan() {
            return ((obj) => {
                obj.geometry = () => "M493.8 1a7.4 7.4 0 1 1 0 14.9 7.4 7.4 0 0 1 0-14.9";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_logo_baza_winner.prototype, "PathBlue", null);
    __decorate([
        $.$mol_mem
    ], $bw_icon_logo_baza_winner.prototype, "PathCyan", null);
    $.$bw_icon_logo_baza_winner = $bw_icon_logo_baza_winner;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_triangle extends $.$mol_svg_root {
        view_box() {
            return "0 0 33 27";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M0 0h33v.3C27.3 9 22 18.1 16.5 27h-.1C11 18 5.4 9 0 0z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_triangle.prototype, "Path", null);
    $.$bw_icon_triangle = $bw_icon_triangle;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_close_btn extends $.$mol_svg_root {
        view_box() {
            return "0 0 51 51";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M.7.7C.3 1 0 2.5 0 3.9c0 2 2.4 5 9.5 12.1l9.5 9.5-9.6 9.6C1.1 43.4-.1 45.1.2 47.6c.2 2.4.8 2.9 3.3 3.2 2.6.2 4.2-1 12.5-9.3l9.5-9.5 9.6 9.6c8.3 8.3 10 9.5 12.5 9.2 2.4-.2 3-.8 3.2-3.2.3-2.5-.9-4.2-9.2-12.5L32 25.5l9.5-9.5c8.3-8.3 9.5-9.9 9.3-12.5C50.5 1 50 .4 47.6.2c-2.5-.3-4.2.9-12.5 9.2L25.5 19 16 9.5C8.9 2.4 5.9 0 3.9 0 2.5 0 1 .3.7.7z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_close_btn.prototype, "Path", null);
    $.$bw_icon_close_btn = $bw_icon_close_btn;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_eye_closed extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 33";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M2 0c.4 1.2 1 2.3 1.7 3.3a54.6 54.6 0 0 0 21.4 16.5 38 38 0 0 0 29.2-.5 55.9 55.9 0 0 0 20-16c.9-1 1.2-2.1 1.7-3.3h-2.9a57 57 0 0 1-18.4 15.7A35 35 0 0 1 26 17 53.3 53.3 0 0 1 4.9 0H2zm6.7 11.2L2.4 18l2.2 2 6.3-6.8-2.1-2h-.1zm62 .1l-2.3 2 6.3 6.6 2.2-2-6.2-6.6zm-13.8 8.6l-2.7 1.3c1.4 2.8 2.8 5.5 4.4 8.2l2.5-1.4c-1.4-2.7-2.7-5.5-4.2-8v-.1zm-36.9.6l-3.7 7.4 2.7 1.3 3.7-7.4-2.7-1.3zM37.5 24v9h3v-9h-3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_eye_closed.prototype, "Path", null);
    $.$bw_icon_eye_closed = $bw_icon_eye_closed;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_eye_opened extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 57";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M37.5 0v9h3V0h-3zm21.1 3.6l-4.5 8.1 2.7 1.3L61 5l-2.4-1.4zM19 3.8l-2.7 1.3 3.7 7.4 2.7-1.3L19 3.8zm21 6.8a38.4 38.4 0 0 0-18.3 4.1A61.4 61.4 0 0 0 1.1 33a59.7 59.7 0 0 0 22.5 19.3 38.2 38.2 0 0 0 31.9-.7A61.1 61.1 0 0 0 76.8 33a59.7 59.7 0 0 0-22.5-19.3h-.1c-4.5-2-9.4-3-14.3-3.1zM74.6 13l-6.3 6.8 2.2 2 6.3-6.7-2.1-2.1h-.1zm-70 .1a70 70 0 0 0-2.3 2l6.3 6.6 2.2-2-6.2-6.6zm34.1.4A35 35 0 0 1 52 16a52.8 52.8 0 0 1 21 17c-5.5 7-12 13-20.2 16.6A35 35 0 0 1 26 50 52.7 52.7 0 0 1 5 33c5.5-7 12-13 20.2-16.6a35 35 0 0 1 13.6-2.9zm.3 3a13.5 13.5 0 0 0-4 .6h.1A13.5 13.5 0 0 0 26 33a13.5 13.5 0 0 0 26.1-6 13.5 13.5 0 0 0-13-10.5zm.2 3a10.5 10.5 0 0 1 6.1 18.8 10.5 10.5 0 1 1-10.2-18.1 10.5 10.5 0 0 1 4.1-.7zm-.3 2.9c-4.7.7-6.9 2.9-7.6 7.6l3-.1c1-3.1 1.4-3.5 4.6-4.5v-3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_eye_opened.prototype, "Path", null);
    $.$bw_icon_eye_opened = $bw_icon_eye_opened;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_phone_email extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 57";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M2.1 3.4c-.8.9-1.1 9.7-.9 30.2l.3 28.9 19.9.3c13.8.2 20.3-.1 21.2-.9 1.1-.9 1.4-6.5 1.4-29 0-23.9-.2-28-1.6-29.3-2.1-2.2-38.5-2.4-40.3-.2zM40 26v20H5V6h35v20zm0 28.5V59H5v-9h35v4.5zM74.7 24.7C57.8 51.5 56.1 54.5 57.1 55.5c.6.6 1.5.6 2.4 0 2.2-1.4 26.5-40.6 25.9-41.6-1.4-2.4-3.9.1-10.7 10.8zM98.6 16.2c-.8 3-.8 33.6 0 36.6l.6 2.2 27.7-.2 27.6-.3v-40l-27.6-.3-27.7-.2-.6 2.2zm42.8 7.5l-9.2 11A30.3 30.3 0 0 1 127 40c-.7 0-13.2-14.2-17.9-20.3-1.3-1.6-.3-1.7 17.9-1.7h19.2l-4.8 5.7zM113 31l3.8 4.6-7.4 7.6-7.4 7.5V34.6l.1-16.1 3.5 4L113 31zm38 3.7v15.7l-7-6.9a40.5 40.5 0 0 1-6.8-7.7c.3-.8 13.1-16.7 13.6-16.8.1 0 .2 7.1.2 15.7zM127 45c.4 0 2.3-1.2 4-2.7l3.2-2.6 5.6 5.6 5.7 5.7h-37.9l5.9-6 5.8-5.9 3.4 2.9c1.9 1.7 3.8 3 4.3 3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_phone_email.prototype, "Path", null);
    $.$bw_icon_phone_email = $bw_icon_phone_email;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_home extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 69";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M39 1.4L56.3 17V8h7l.1 15.5c4.8 4 9.3 8.3 14 12.4L67 36v31.3c-6 0-11.8.3-17.7-.1.2-8 0-16.2 0-24.2H28.8v24.2c-5.9.4-11.8.1-17.7.1V36H.7L39 1.3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_home.prototype, "Path", null);
    $.$bw_icon_home = $bw_icon_home;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_user extends $.$mol_svg_root {
        view_box() {
            return "0 0 66 66";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M27.4 2.6c2.2-.9 4.4-1 6.6-1C41.2 1.7 47.4 9 47 16c-.1 6.8-6.2 13.1-13 13.6-7.5.7-14.9-6-15-13.6a14.3 14.3 0 0 1 8.4-13.4zM22 41.5c2.8 3.3 6.5 5.5 11 5.4 4.5 0 8.2-2.1 11-5.4 7 1.4 15 4 19.3 10 2 3.6.8 8.8 1 12.8H1.7c.3-4-.8-9.2 1.1-12.8 4.5-6 12.2-8.6 19.2-10z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_user.prototype, "Path", null);
    $.$bw_icon_user = $bw_icon_user;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_trash extends $.$mol_svg_root {
        view_box() {
            return "0 0 48 60";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M18 .2c4-.2 8 0 12 0l3 3h15V9c-16 0-32 .2-48-.2V3.2h15l3-3zM3 15l.1 39c0 3.1 2.7 5.8 5.8 5.8 9.7.2 19.4 0 29.1 0 3 .3 5.7-1.3 6.7-4.2.4-2.5.2-5.1.2-7.6V15H3.1zm9 6h6V54h-6V21.1zm24 0v33l-6-.1V21h6z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_trash.prototype, "Path", null);
    $.$bw_icon_trash = $bw_icon_trash;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_search extends $.$mol_svg_root {
        view_box() {
            return "0 0 60 57";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M23.1 2.6c-7 .1-13.8 4-16.9 10.5-2.4 4-2.1 9.3-1.5 13.7 1.6 5.3 5.4 10 10.4 12.3 4.3 2 9.5 2.3 14 1 2.6-1 5-2.6 7.4-3.9.2 2.2-.3 4.2 1.5 5.8l15 15h.7l5.2-5C53.5 46.4 48 41 42.5 35.6A82 82 0 0 1 38 35c1.7-3.8 4.1-6.7 4.5-11A19.3 19.3 0 0 0 23 2.6zm.5 5.5c5.9.2 11.3 4 12.9 10 .3 3.5.7 8-1.5 10.8-2.6 4-7 6.7-12 6.5-6.5 0-12.2-5-13.3-11.4A13.9 13.9 0 0 1 23.6 8.1z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_search.prototype, "Path", null);
    $.$bw_icon_search = $bw_icon_search;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_edit extends $.$mol_svg_root {
        view_box() {
            return "0 0 54 54";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M42.9 0h1.5l.4.2C48 3.1 51 6.2 54 9.4v1.8c-1.9 1.6-3.8 4.6-6 5.6A185 185 0 0 1 37.2 6c1-2.2 4-4.2 5.7-6zM32.4 10.2c4.2 3.1 7.5 7.5 11.5 10.9C33.4 32.3 22.1 43 11.3 54H0V42.2c1-.7 2-1.4 2.9-2.3 9.8-10 19.8-19.7 29.5-29.7z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_edit.prototype, "Path", null);
    $.$bw_icon_edit = $bw_icon_edit;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_buy extends $.$mol_svg_root {
        view_box() {
            return "0 0 72 72";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M6.6 1l-6 .1v7h7.1c4.1 9.1 7.7 18.4 11.7 27.6-2 3.4-5.7 7-5 11.2.1 3.5 3 6.4 6.5 6.4h42.5v-7H21c1.3-2.4 2.7-4.7 4.2-7l24.7.1c2.3 0 4.8 0 6.3-2.1 4-5.5 6.7-12 10.2-17.8 1.4-2.4 3-4.8 3.9-7.4.2-2.3-1-4-3.4-4-8.2-.2-16.4 0-24.6 0V1h-6.8v7L15.4 8A230 230 0 0 0 12.6 1h-6zm29 7h6.8v10.6h10.5c-4.7 4.7-9.4 9.2-13.9 14-4.4-4.8-9.2-9.3-13.8-14h10.4V8.1zM20.2 57.1c5.4-1 10.3 4.7 7.8 9.8-2.3 4.1-7.5 5.5-11.1 2.2a7 7 0 0 1 3.3-12zM53.5 57.6c3.6-1.6 7.7 0 9.4 3.5 1.2 3.4.3 7-3 9-4.4 2.6-10.6-1-10.5-6.1-.2-2.9 1.8-5 4.1-6.4z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_buy.prototype, "Path", null);
    $.$bw_icon_buy = $bw_icon_buy;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_meeting extends $.$mol_svg_root {
        view_box() {
            return "0 0 66 72";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M10.3 1.3c2.6-.6 5.4.1 7.1 2.3a7 7 0 0 1-1 9.8A7 7 0 0 1 5.3 9.8a7 7 0 0 1 5-8.5zM52.2 1.3c3-.7 6 .4 7.6 3 2 2.8 1.4 7-1.4 9.1a7 7 0 0 1-9.9-1c-3.1-3.8-1.1-10 3.7-11.1zM8 22.1c2.9-.2 5.9-.3 8.8.1 2.2.2 4 2.2 5.4 3.6L33 36.6c4.4-4.2 8.5-8.7 12.9-12.8 2.3-2.1 5.2-1.7 8.1-1.9 3 .2 5.8-.2 8.1 2 2 1.6 2.4 3.6 2.3 6v41h-7V50h-7v21h-7V36.8C39.7 40 36.4 43.7 33 47c-3.5-3.4-6.8-7-10.4-10.3V71h-7V50h-7v21h-7V29c-.2-3.5 3-6.6 6.4-6.8z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_meeting.prototype, "Path", null);
    $.$bw_icon_meeting = $bw_icon_meeting;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_resume_website extends $.$mol_svg_root {
        view_box() {
            return "0 0 66 66";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M55 1.6H9C5.7 1.7 3 3 2 6.2c-.6 3.2-.3 6.6-.4 9.9v40c0 2.5 0 4.6 2 6.4 1.8 1.9 4 2 6.4 2h46c2.5 0 4.6 0 6.4-2 2-1.8 2-4 2-6.4V10c0-2.5 0-4.6-2-6.4-2-2.2-4.6-1.9-7.4-2zm-29 7c1.8 0 3.7 1.3 3.6 3.4.1 2.2-2.4 4.3-4.6 3.5-2.7-.8-3.3-5-.9-6.4.6-.4 1.2-.5 1.9-.5zm-10.5 0c1.3 0 2.6.6 3.1 1.9 1.2 1.9-.5 5-2.6 5-3.4.5-5.4-4-2.6-6.2.6-.5 1.4-.7 2.1-.7zm20.9 0h21v7h-21v-7zm-27.8 14h48.8v34.7H8.6V22.6zm12 7c-.9 0-1.7.2-2.4.5-3.1 1.5-3.5 6.5-.9 8.6 2 1.7 5.3 1.7 7.2-.3 2-2 2-5.6-.3-7.6-1-1-2.3-1.3-3.7-1.2zm22.8 0h-7v6.8h14v-6.8h-7zm0 13.7c-2.3 0-4.6 0-7 .2-.2 2.3 0 4.6 0 6.9h14v-7h-7zm-22.7 0c-2.5 0-5 .8-7.2 2.2-1.6.9-1.3 3.3-1.8 4.8h18v-3.6a14 14 0 0 0-9-3.3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_resume_website.prototype, "Path", null);
    $.$bw_icon_resume_website = $bw_icon_resume_website;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_wipes extends $.$mol_svg_root {
        view_box() {
            return "0 0 72 72";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M29 1.4c-.1 3.1.4 7.3-1.8 9.8-2.1 2.8-6 4.3-9.1 5.9-5.7 2.5-11.4 5.2-17 8v5c12.6 4.4 25.3 8.6 37.8 13.1l23.7-10.6c3.5-1.6 6.2-4.9 7.3-8.6 1.2-4.6 1-9.9 1-14.6-13.9-3-27.9-5.2-41.8-8zm6.5 8.6c3 0 6.3 1.2 9.3 1.6 6.3 1 12.5 2.3 18.8 3.5-.2 2.7 0 6-1 8.5-.7 1.7-2.6 2.3-4 3.1-6.3 2.8-12.4 5.8-18.7 8.4-1.6.8-2.9 0-4.4-.5-7.3-2.5-14.8-4.8-21.8-7.8 5.5-2.6 11.6-5 16.5-8.6 3-2.1 3.7-5.1 5.3-8.2zM1.1 36v7l37.4 13.6c1.3.5 2.8-.5 4-1L71 43v-7c-10.2 4.3-20.2 9.1-30.4 13.5-2 .7-4.5-1-6.4-1.6l-33-12zm0 14v7l37.4 13.5c1.3.5 2.2-.1 3.4-.6l29-12.9v-7c-10.5 4.4-20.7 9.5-31.1 13.7-2.1 0-4.4-1.4-6.4-2C22.5 57.8 11.9 53.6 1 50z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_wipes.prototype, "Path", null);
    $.$bw_icon_wipes = $bw_icon_wipes;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_add_user_group extends $.$mol_svg_root {
        view_box() {
            return "0 0 81 72";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M56.4 2A10.5 10.5 0 0 0 47 16.9c2.5 6 10.2 7.9 15.4 4.5 5.2-3.3 6.2-11 2-15.6-2-2.4-4.9-3.6-7.9-3.6zM21.1 2l-2.7.5c-6 2-9 8.6-6.4 14.4 2.8 6.3 11.3 8 16.5 3.5a10.7 10.7 0 0 0 0-15.8C26.3 2.8 23.6 2 21 2zm.3 28c-4.7 0-9.4.8-13.6 2.5-2.9 1.1-6 3.5-6.9 6.5-.6 3.9-.2 8-.2 12h28c0-4-.3-8 0-12 .3-3 1.9-5.2 3.4-7.7A46 46 0 0 0 21.4 30zm35.2 0c-5.3 0-10.6.9-15.4 3.2a10.7 10.7 0 0 0-5.3 5.8c-.6 3.9-.2 8-.3 12h20.8c0-3-.3-6.3.3-9.3 1-2.4 3.5-4.5 6.3-4.6 4.4-.3 8.8 0 13.2-.3-3.7-4.3-8.9-5.6-14.3-6.4l-5.3-.3zm13.7 14h-7v10.3H53v7c3.4 0 7 0 10.4.2V72h7V61.4H81v-7c-3.6 0-7.1 0-10.7-.2V43.9z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_add_user_group.prototype, "Path", null);
    $.$bw_icon_add_user_group = $bw_icon_add_user_group;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_info_popup extends $.$mol_svg_root {
        view_box() {
            return "0 0 66 72";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M11 1.6c-2.6.1-5.6-.1-7.5 2-2 1.8-1.8 4.8-2 7.4.2 12 .1 24 .1 36 0 4-.2 8.1.2 12A5.9 5.9 0 0 0 7 64.2c5.3.7 10.8 0 16.1.2 4.3-.6 7.2 4.7 10 7.2 2.3-2.3 4.5-5.3 7.3-7 6.4-.8 13.3.6 19.6-.6 3.2-.9 4.5-3.7 4.4-6.9.2-15 0-30 .1-45-.1-2.7.3-6.4-2-8.5-1.9-2-4.8-1.8-7.4-2-14.7.2-29.3.2-44 0zm18.6 14h6.8v7c-2.2-.2-4.6-.1-6.9 0l.1-7zm0 14h6.8v20.7h-6.8V29.6z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_info_popup.prototype, "Path", null);
    $.$bw_icon_info_popup = $bw_icon_info_popup;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_wallet_copy_2 extends $.$mol_svg_root {
        view_box() {
            return "0 0 66 66";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M14 1.6c-2.5 0-5 0-7.1 1.3a10 10 0 0 0-5.2 9L1.6 55c.1 2.8-.2 5.4 2 7.5 1.8 1.8 4 1.8 6.4 1.9h46c2.4-.1 4.6 0 6.5-2 2-2 1.8-4.6 2-7.4-.2-10.7 0-21.4-.2-32 .1-3.2-1.2-6-4.4-7-3.8-.7-8-.3-11.9-.4-12 0-24 .2-36 0-2.9.1-4.1-3.1-3-5.4.6-1.5 2.6-1.4 4-1.6h48v-7H14zm39.6 34.8c1.3-.2 2.7.5 3.3 1.8 1.3 2.4 0 5.3-2.9 5.2-3.2 0-5-3.7-2.5-6 .5-.6 1.3-1 2.1-1z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_wallet_copy_2.prototype, "Path", null);
    $.$bw_icon_wallet_copy_2 = $bw_icon_wallet_copy_2;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_settings extends $.$mol_svg_root {
        view_box() {
            return "0 0 72 72";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M36.2 1l-3 .2c-1.3 2-1.4 5-1.9 7.2l-4.8 1.4C24.8 8 23.3 5.4 21 4.5c-2 .8-3.6 2-5.4 3l2.5 7-3.6 3.6-7-2.5c-1 1.8-2.2 3.5-3 5.4.9 2.3 3.5 3.8 5.3 5.5l-1.4 4.8L1 32.8v6.4l7.3 1.5 1.4 4.8C8 47.2 5.4 48.8 4.5 51c.8 2 2 3.6 3 5.4l7-2.5 3.6 3.6-2.5 7c1.8 1 3.4 2.2 5.4 3 2.3-.8 3.9-3.6 5.5-5.3l4.8 1.4 1.5 7.3c2 0 4.1.1 6.2-.1 1-2.3 1.2-4.8 1.7-7.2l4.8-1.4c1.7 1.8 3.3 4.4 5.5 5.3 2-.8 3.6-2 5.4-3l-2.5-7 3.6-3.6 7 2.5c1-1.8 2.2-3.5 3-5.4-.9-2.3-3.5-3.9-5.3-5.5l1.4-4.8 7.3-1.5v-6.4l-7.3-1.5-1.4-4.8c1.8-1.6 4.4-3.2 5.3-5.5-.8-2-2-3.6-3-5.4l-7 2.5-3.6-3.6 2.5-7c-1.8-1-3.5-2.2-5.4-3-2.2.9-3.9 3.5-5.5 5.3l-4.8-1.4L39.2 1h-3zm-3.6 14.1v10.6c-2 1.3-4 2.6-5.4 4.6-1.6 2.2-1.5 5.2-1.7 7.8L16 43.4c-1.5-6.3-1.6-12.6 2-18.2 3.1-5.7 8.5-8.4 14.5-10zm7 .2a21.2 21.2 0 0 1 15 11.1c3 5.5 2.6 11.1 1.3 17L46.5 38c-.2-2.4-.1-5.1-1.4-7.3-1.3-2.3-3.6-3.6-5.7-5 0-3.5-.2-7 .1-10.5zM43 44.2c3.2 1.7 6.3 3.4 9.3 5.3A22.5 22.5 0 0 1 35 56.9c-6.1-.2-11-3.3-15.3-7.4 3-1.8 6-3.7 9.2-5.2 2.4.9 4.5 2.2 7.1 2 2.7.2 4.7-1 7-2.1z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_settings.prototype, "Path", null);
    $.$bw_icon_settings = $bw_icon_settings;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_sell_property extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 69";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M39 1.5C26.1 12.8 13.4 24.5.6 35.9l10.4.2v31.2h56V36.1l10.4-.2C64.5 24.5 51.9 13 39 1.5zM38.2 15h3.4v4.7c1.9 1.2 4.2 2.4 5.5 4.2 1.3 2 1.6 4.6 2 6.9h-6.4l-1.4-4.3c-1.2-.6-2.3-1-3.6-1.4-.3 2-1.7 4.8-.4 6.6 2.6 3.3 8.3 4.8 10.5 8.5a13 13 0 0 1 .5 9c-1.2 3.4-4 4.2-7 5.7l-.4 4.5-3.4.1-.1-4.5c-2.2-1-5-2-6.4-4-1.5-2-1.7-4.9-2.1-7.3h6.5c.7 2 .8 5.9 3.6 5.7 3.6.4 4-4.8 2.4-7-2.4-3-7.4-4-9.7-7.1-1.9-2.9-2-7.1-.7-10.2 1.3-3 4.1-4 6.9-5.5 0-1.6.2-3 .3-4.6z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_sell_property.prototype, "Path", null);
    $.$bw_icon_sell_property = $bw_icon_sell_property;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_last_hour extends $.$mol_svg_root {
        view_box() {
            return "0 0 72 72";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M36.7 1c-2 0-3.8.2-5.7.4a37.6 37.6 0 0 0-19.8 9.8L4.7 4.6V22H22l-5.8-5.8a31.8 31.8 0 0 1 16.2-8l.4 3.5h6.4l.4-3.6a30 30 0 0 1 16.1 8.2c4.6 4.4 6.8 10 8.2 16.2l-3.6.2v6.6l3.6.2a30.1 30.1 0 0 1-8.2 16.2 30 30 0 0 1-16.1 8.1l-.4-3.5h-6.4l-.4 3.5a30 30 0 0 1-16.1-8C11.7 51.2 9.5 45.6 8 39.5l3.6-.3v-6.6H1.1c-.6 10 2.6 20.2 9.8 27.5A34.9 34.9 0 1 0 36.7 1zm2.5 24c-3 .8-5.9 1.8-8.7 3V32l4.1-1.7v17h4.5c.2-7.4 0-14.8 0-22.2z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_last_hour.prototype, "Path", null);
    $.$bw_icon_last_hour = $bw_icon_last_hour;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_star extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 75";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M39 .6c3.6 8.6 7.3 17 10.8 25.6 9.3.8 18.5 1.5 27.7 2.5L56.4 46.9c2.2 9 4.5 18 6.5 27-8-4.7-16-9.6-23.9-14.4-8 4.8-15.8 9.7-23.9 14.4 2-9 4.3-18 6.5-27L.6 28.7l27.6-2.5c3-7.6 6.5-15 9.4-22.6l1.4-3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_star.prototype, "Path", null);
    $.$bw_icon_star = $bw_icon_star;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_winrar extends $.$mol_svg_root {
        view_box() {
            return "0 0 72 66";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M12.5 1.5c-2.6 0-5.1 0-7.6.2-1.7.3-3.7.2-3.7 2.4.2 3 2 6 2.4 9-.3 2.3-1.6 4.6-2.1 7 .1 3.3 1.8 6.6 1.7 10-.4 1.7-1.3 3.5-2 5.2.7 2.9 1.8 5.8 2 8.7-.1 2.7-1.6 5.2-2 7.9 2.3 3.1 6.6 4.9 9.8 7 3.8 2.2 7.4 5.6 12 5.5 6.2.1 12.4-.1 18.6 0A45.5 45.5 0 0 0 43 48c-1.1-1.2-3.4-2.1-3.4-4-.4-4.5 0-9 0-13.6l5.8-1.1L48 27l2.9 2c1.8.5 3.7.8 5.5 1.4 1 5 .4 10.6.2 15.8l-3.4 1c.2 5.7.3 11.4-1 17.1 5.1-.2 10.5.4 15.6-.5 4.4-4 3-12.1 1.7-17.2 1.6-5.8 1.6-9.9 0-15.7 1.4-5.4 2.4-11.7-1-16.6-2.6-3-7-4.7-10.3-6.7-3.6-2-7.2-4.8-11.2-5.8-4.6-.7-9.5-.2-14.1-.2C39 6.1 46 9.4 52 14.1c2.4 3 1 9 1.4 12.8-1.7-.6-3.5-1.5-5.3-1.8-1.7.4-3.4 1.2-5 2 0-3.7.2-7.4-.4-11-.3-1.7-2-2.7-3.2-3.6-3.6-2.5-7.4-4.6-11-7-2.7-1.6-5.2-3.6-8.5-3.8l-7.5-.2zM11 11c3 2.2 6.6 4 9.1 6.9 1.2 2.2.6 5.7.7 8.2-3.8-2.2-7.6-4.4-11.2-6.8L11 11zM26.8 17c1 1.9 2.2 3.7 2.3 5.9 0 2.6-1.2 4.5-2.2 6.8-.8-4.4-.8-8.3 0-12.7zm-16.1 11c3.2 2 7 3.7 9.6 6.5.8 2.2.7 4.7 1 7-4.1-2.3-8-4.8-12-7.2l1.4-6.2zM53.4 33L43 33v10.4h3.4v-7H50v7h3.4V32.9zm-24.8 1.9c.3 4 1.2 7.5-1.8 10.8-.5-3.2-1-6.6-.4-9.8l2.2-1zm-17.8 8.6c3.3 2.2 7.2 4 9.8 7 .5 2 .3 4.2.3 6.3-4-2.3-7.7-4.7-11.5-7.1l.7-3.2.7-3zm17.8 7.4c.3 3 .3 6 .2 9l-2.7.5c.1-2.8 0-5.7.4-8.6l2-.9z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_winrar.prototype, "Path", null);
    $.$bw_icon_winrar = $bw_icon_winrar;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_today extends $.$mol_svg_root {
        view_box() {
            return "0 0 84 84";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M21.6 0l-2 1.8c-.3 4.1-.6 8.6 0 12.7 1.6 2.7 6.3 2.1 6.2-1.5 0-3.8.7-8.3-.6-11.9l-.6-.5-.7-.6h-2.3zM60 0c-.8 1-1.8 1.7-1.8 3-.2 3.6-.3 7.3 0 10.8.6 3.3 5.9 3 6.3 0 .3-4 .2-8 0-12l-2-1.8H60zM10.7 6.6a13 13 0 0 0-5.2 1C2.4 9 .9 11.6 0 14.8v60.6c1.3 4.8 3.7 7.2 8.5 8.5h66.9c4.8-1.1 7.3-3.8 8.6-8.5V15.3c-.7-3.5-2.7-6.9-6.2-8.1-3-1-6.7-.5-10-.5-.2 3.2.8 8-1.6 10.5-2.4 3-7.9 3-10-.4-2-2.7-1.2-7-1.3-10.1H29c-.1 3 .6 7.4-1.3 10-2.1 3.4-7.6 3.6-10 .5-2.4-2.5-1.4-7.3-1.6-10.5-1.7 0-3.6-.2-5.5-.1zM42 29h35.3l.1 43c-.2 2 .5 3.8-1.5 5-3 .5-6 .3-8.9.3H17c-3 0-6 .2-8.9-.2-2-1.3-1.3-3.1-1.5-5.1V29H42zm13.1 7h-1L37.8 60.4c-2.7-2.5-5.1-5.3-8-7.8-2.2-.5-3.2 1.4-4.6 2.8-1.1 1.1-1.5 2.5-.3 3.7 2.8 3.1 6 6 9 9 1.4 1.3 2.8 3.2 5 3 1-.2 1.9-1.7 2.6-2.5 4.8-6.9 9.4-14 14.2-20.8 1.8-2.5 3.4-5 4.9-7.7-1.5-1.6-3.1-3.8-5.5-4z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_today.prototype, "Path", null);
    $.$bw_icon_today = $bw_icon_today;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_switch_off extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 45";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M22.2 0A22.9 22.9 0 0 0 0 20.1v6.5c1.4 4 2.8 7.6 5.7 10.7A23 23 0 0 0 21.8 45h1c6.9-.3 13.4-3.3 17.5-9 9-.2 17.8.2 26.7-.1 5.8-.4 10.2-5 11-10.8v-2a12 12 0 0 0-11-11c-8.2-.3-16.5 0-24.7-.2A22.8 22.8 0 0 0 23.7 0h-1.5zm21.5 15H66a9 9 0 0 1 0 18H42.4c2.9-6 3.3-11.7 1.3-18z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_switch_off.prototype, "Path", null);
    $.$bw_icon_switch_off = $bw_icon_switch_off;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_switch_on extends $.$mol_svg_root {
        view_box() {
            return "0 0 78 45";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M55.2 0c-8.3.3-15.6 4.6-19.5 12-8.2.1-16.5-.2-24.7.1-5.8.4-10.2 5-11 10.7v2A12 12 0 0 0 11 36c8.9.3 17.8 0 26.7.2 4 5.5 10.4 8.5 17.1 8.9h1c6.6-.3 12.8-3 17-8.2 2.5-3 3.7-6.4 5.2-10v-6.4A23 23 0 0 0 56.7 0h-1.5zM34.3 15c-2 6.3-1.5 12 1.3 18H12a9 9 0 0 1 0-18h22.3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_switch_on.prototype, "Path", null);
    $.$bw_icon_switch_on = $bw_icon_switch_on;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_exit_sign extends $.$mol_svg_root {
        view_box() {
            return "0 0 60 72";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M2 1v45.4h7c.3-6.8-.4-13.7.5-20.4l2.3 5c3.4-1.6 6.7-3.5 10.1-5 1.6-.7 3.8.2 5.5.4-2.1 4.1-4.9 7.9-7 12-.6 2-.6 5.5 1.3 6.8 3.7 2.9 7.5 5.5 11.2 8.2-1 6-4.3 11.7-6.2 17.4l6.5.2c2-4.6 4-9.3 5.6-14.1 1.2-3.2-.2-6.9-2.6-9.1-1.9-1.9-4-3.6-5.9-5.4 2-3.3 3.5-6.6 5.5-9.7 1.8 2.5 3.4 5.4 6.6 6.3 2.8.6 5.8.4 8.6.4v31.5h7V1.1H2zm7 7h42v24.6h-7.1c-3-3.6-4.6-8-8.9-9.6-3-1.4-6-3-9.1-3.7-5.7-1-11.6 4.3-16.9 6.2V8.1zm30.6 1.7c-1 0-2.1.3-3.1 1-3.7 2-4.3 7-1 9.8 3.8 3.4 10.4.6 10.3-4.5.2-3.4-3-6.2-6.2-6.3zM19 47.7c-1.4 1-2.1 2.3-4 2.2-4.3.2-8.6 0-13 0v7c4.7 0 9.4.2 14 0 3.6-.3 5.6-2.6 8.1-5l-5-4.2zM2 60.4v10.5h7V60.4H2z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_exit_sign.prototype, "Path", null);
    $.$bw_icon_exit_sign = $bw_icon_exit_sign;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_triangle_right extends $.$mol_svg_root {
        view_box() {
            return "0 0 27 33";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M0 0h.1L27 16.5v.3h-.3C17.7 22 8.9 27.4 0 33H0V0z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_triangle_right.prototype, "Path", null);
    $.$bw_icon_triangle_right = $bw_icon_triangle_right;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_triangle_left extends $.$mol_svg_root {
        view_box() {
            return "0 0 27 33";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M27 0v33h-.1L0 16.5v-.2C9 11.1 18 5.5 27 0z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_triangle_left.prototype, "Path", null);
    $.$bw_icon_triangle_left = $bw_icon_triangle_left;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_slide_left extends $.$mol_svg_root {
        view_box() {
            return "15 12 11 58";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M17.5 13a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm-6 7a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm-6 7a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm-.8 6L17 41l5.7 8 1.3-.9-5-7.1 5-7.1-1.3-.9zm-5.2 19a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm-6 7a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm-6 7a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_slide_left.prototype, "Path", null);
    $.$bw_icon_slide_left = $bw_icon_slide_left;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_slide_right extends $.$mol_svg_root {
        view_box() {
            return "15 12 11 58";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M17.5 13a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.6 1.5 1.5 0 0 0 1.5-1.6 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.6 1.5 1.5 0 0 0 1.5-1.6 1.5 1.5 0 0 0-1.5-1.5zm-6 7a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm-6 7a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.6zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.6zm-5.2 6l-1.3.9 5 7.1-5 7.1 1.3.9 5.7-8-5.7-8zm-.8 19a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.6 1.5 1.5 0 0 0 1.5-1.6 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.6 1.5 1.5 0 0 0 1.5-1.6 1.5 1.5 0 0 0-1.5-1.5zm-6 7a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.5zm-6 7a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.6zm6 0a1.5 1.5 0 0 0-1.5 1.5 1.5 1.5 0 0 0 1.5 1.5 1.5 1.5 0 0 0 1.5-1.5 1.5 1.5 0 0 0-1.5-1.6z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_slide_right.prototype, "Path", null);
    $.$bw_icon_slide_right = $bw_icon_slide_right;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_print extends $.$mol_svg_root {
        view_box() {
            return "0 0 54 54";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M13.7 0c-2.3 1-4.3 2.2-5 4.7-.7 3.8 0 7.8-.3 11.6C4 17 1.8 17.5 0 21.9v14.3c1.8 4.3 3.8 5.2 8.4 5.4 0 2.6-.3 5.4.3 7.9.9 2.4 2.8 3.5 5 4.5h26.5c2.4-1 4.4-2.3 5.1-5 .3-2.4.2-5 .2-7.5 1.6-.1 3.7 0 5.1-1 1.8-1 2.5-2.6 3.4-4.4V22c-.8-1.5-1.4-3-2.9-4-1.6-1.3-3.6-1.1-5.6-1.3 0-3.9.2-7.8-.2-11.7-.7-2.6-2.7-3.8-5.1-4.9H13.7zM17 4.3c7.5.2 15.1 0 22.7.1 1.6 0 1.7 2.4 1.7 3.6l-.1 8.7H12.7c-.2-3.6-.3-7.2 0-10.9.4-2 2.8-1.3 4.3-1.5zm27.3 16.5c1.7 0 3.4 1.4 3.3 3.2 0 2.2-2.3 3.5-4.3 2.7-2.5-.9-2.6-4.5-.1-5.5.3-.3.7-.4 1.1-.4zM12.6 31.1h28.7c0 5.7.2 11.4 0 17-.8 2.1-2.5 1.3-4.3 1.6H16c-1.5-.2-2.8.3-3.4-1.5-.2-5.7 0-11.4 0-17zm4.1 4.1v4.1h20.6v-4H16.7zm.2 6.1l-.4 4c4.9.5 9.8.2 14.6.3v-4.2H17z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_print.prototype, "Path", null);
    $.$bw_icon_print = $bw_icon_print;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_sent extends $.$mol_svg_root {
        view_box() {
            return "0 0 54 54";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M0 1.3l2.7 1c16.7 7 33.3 14.3 50 21.1.3 1 0 1.4-.8 1.5-17 7-34 14.3-50.9 21.5H0V29c9.9-1.2 19.7-3.4 29.6-4.6v-.8C19.7 22.2 9.8 20.4 0 18.8V1.3z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_sent.prototype, "Path", null);
    $.$bw_icon_sent = $bw_icon_sent;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_share extends $.$mol_svg_root {
        view_box() {
            return "0 0 54 54";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M42.2 0H45l.8.3c4.7 1.9 6.6 4 8.2 9V12c-1.2 3.2-2.8 6.2-6.1 7.7-3.8 1.8-7.7 1-11-1.3-5.5 2.7-11.3 5.2-16.5 8.5 5.2 3.3 11 5.8 16.5 8.5 2.6-1.6 5-2.7 8.1-2.2 4.9.7 7.7 4.4 9 8.9V45c-1.8 5-4.1 7.4-9.2 9H42c-2.9-1.1-5.5-2.3-7.2-5-1.3-1.8-1.4-3.9-1.8-6-5.2-2.8-10.5-5.5-15.9-8-3.1 2-6.3 3.1-10 1.7-3.8-1.3-5.7-4.4-7.1-8V25c1.5-3.5 3.3-6.5 7.1-7.8 3.7-1.4 6.9-.2 10 1.7 5.4-2.5 10.7-5.2 16-8 .3-2.4.5-4.7 2.2-6.7C37 1.9 39.5 1 42.2 0z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_share.prototype, "Path", null);
    $.$bw_icon_share = $bw_icon_share;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_excel extends $.$mol_svg_root {
        view_box() {
            return "0 0 54 54";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M31 0C20.7 2.6 10.2 4 0 6.3v41.5c10.2 2.1 20.7 3.6 30.8 6.2h.4V0h-.3zm19.4 6.4H33.2v6.1h6.2v3.8c-1.3.9-4.5.3-6.3.4v4.1h6.2v4l-6.1.1v4.2h6.1v4l-6.1.1v4h6l.2 4.2h-6.2v6.2H50c1.8 0 2.6-.1 4-1.1v-39c-1.1-1-2.3-1.1-3.6-1.1zm-.9 6.1l.2 4.2h-8.3v-4.1h8.1zm-37.3 4c1.3 2.6 2.5 5 3.6 7.6 1.6-2.4 2.7-5 4.1-7.5h5.2L19 27l6.4 10.5h-5.5l-4-7.8c-1.4 2.6-2.7 5.4-4.4 7.9L6 37.4l6.7-10.3-6-10.5h5.5zm33.3 4.3h4.2v4h-8.3v-4h4.1zm0 8.3h4.2v4h-8.3v-4h4.2zm0 8.2h4.2l-.2 4.2h-8v-4.1l4-.1z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_excel.prototype, "Path", null);
    $.$bw_icon_excel = $bw_icon_excel;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_word extends $.$mol_svg_root {
        view_box() {
            return "0 0 54 54";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.geometry = () => "M31-2C21 1 10 2 0 4v42c10 2 21 3 31 6V-2zm17 8H33v7h15v4H33v4h15v4H33v4h15v4H33v4h15v4H33v7h17l4-1V8c-2-2-4-2-6-2zM23 17h4l-4 20h-4l-3-14-3 14H9L4 17h4l3 15 3-15h4l3 15 2-15z";
                return obj;
            })(new this.$.$mol_svg_path);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_word.prototype, "Path", null);
    $.$bw_icon_word = $bw_icon_word;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_svg extends $.$mol_svg {
        dom_name() {
            return "path";
        }
        attr() {
            return (Object.assign({}, super.attr(), { "d": this.d(), "stroke-width": this.stroke_width(), "stroke-linecap": this.stroke_linecap(), "stroke-linejoin": this.stroke_linejoin(), "transform": this.transform() }));
        }
        d() {
            return "";
        }
        stroke_width() {
            return null;
        }
        stroke_linecap() {
            return null;
        }
        stroke_linejoin() {
            return null;
        }
        transform() {
            return null;
        }
    }
    $.$bw_icon_svg = $bw_icon_svg;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_svg_plus extends $.$bw_icon_svg {
        d() {
            return "M2,12l20,0M12,2l0,20";
        }
        stroke_width() {
            return 3;
        }
        stroke_linecap() {
            return "round";
        }
    }
    $.$bw_icon_svg_plus = $bw_icon_svg_plus;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_plus extends $.$mol_svg_root {
        view_box() {
            return "0 0 24 24";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.transform = () => this.transform();
                return obj;
            })(new this.$.$bw_icon_svg_plus);
        }
        transform() {
            return null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_plus.prototype, "Path", null);
    $.$bw_icon_plus = $bw_icon_plus;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_cross extends $.$mol_svg_root {
        view_box() {
            return "0 0 24 24";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.transform = () => "rotate(45,12,12)";
                return obj;
            })(new this.$.$bw_icon_svg_plus);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_cross.prototype, "Path", null);
    $.$bw_icon_cross = $bw_icon_cross;
})($ || ($ = {}));
(function ($) {
    class $bw_icon_filter extends $.$mol_svg_root {
        view_box() {
            return "0 0 24 24";
        }
        sub() {
            return [].concat(this.Path());
        }
        Path() {
            return ((obj) => {
                obj.d = () => "M15,10l-6,0l-8,-9l22,0l-8,9l0,13l-6,-3l0,-10";
                obj.stroke_width = () => 2;
                obj.stroke_linejoin = () => "round";
                return obj;
            })(new this.$.$bw_icon_svg);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_icon_filter.prototype, "Path", null);
    $.$bw_icon_filter = $bw_icon_filter;
})($ || ($ = {}));
//icon.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_state_time extends $.$mol_object {
        static now(precision, next, force) {
            const atom = $.$mol_atom_current();
            const handler = () => {
                atom['value()'] = Date.now();
                atom.obsolete_slaves();
                if (precision > 0) {
                    setTimeout(handler, precision);
                }
                else {
                    requestAnimationFrame(handler);
                }
            };
            handler();
            return Date.now();
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $mol_state_time, "now", null);
    $.$mol_state_time = $mol_state_time;
})($ || ($ = {}));
//time.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_meter extends $.$mol_plugin {
        zoom() {
            return 1;
        }
        width(val, force) {
            return (val !== void 0) ? val : 0;
        }
        height(val, force) {
            return (val !== void 0) ? val : 0;
        }
        left(val, force) {
            return (val !== void 0) ? val : 0;
        }
        right(val, force) {
            return (val !== void 0) ? val : 0;
        }
        bottom(val, force) {
            return (val !== void 0) ? val : 0;
        }
        top(val, force) {
            return (val !== void 0) ? val : 0;
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "width", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "height", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "left", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "right", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "bottom", null);
    __decorate([
        $.$mol_mem
    ], $mol_meter.prototype, "top", null);
    $.$mol_meter = $mol_meter;
})($ || ($ = {}));
//meter.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $mol_meter extends $.$mol_meter {
            rect() {
                const node = this.dom_node();
                if (node !== $.$mol_dom_context.document.body) {
                    $.$mol_state_time.now();
                    try {
                        const { left, top, right, bottom, width, height } = node.getBoundingClientRect();
                        return { left, top, right, bottom, width, height, zoom: window.devicePixelRatio || 1 };
                    }
                    catch (error) {
                    }
                }
                const size = $.$mol_window.size();
                return {
                    zoom: window.devicePixelRatio || 1,
                    left: 0,
                    top: 0,
                    right: size.width,
                    bottom: size.height,
                    width: size.width,
                    height: size.height,
                };
            }
            top() {
                return this.rect().top;
            }
            bottom() {
                return this.rect().bottom;
            }
            left() {
                return this.rect().left;
            }
            right() {
                return this.rect().right;
            }
            width() {
                return this.rect().width;
            }
            height() {
                return this.rect().height;
            }
            zoom() {
                return this.rect().zoom;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "rect", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "top", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "bottom", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "left", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "right", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "width", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "height", null);
        __decorate([
            $.$mol_mem
        ], $mol_meter.prototype, "zoom", null);
        $$.$mol_meter = $mol_meter;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//meter.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_input_combo extends $.$bw_input_checkable {
        options() {
            return ({});
        }
        selected(val, force) {
            return (val !== void 0) ? val : "";
        }
        value(val, force) {
            return (val !== void 0) ? val : this.selected_title();
        }
        selected_title(val, force) {
            return (val !== void 0) ? val : "";
        }
        readonly() {
            return true;
        }
        bw_dropped_down() {
            return this.dropped_down();
        }
        checked(val, force) {
            return this.dropped_down(val);
        }
        dropped_down(val, force) {
            return this.shown(val);
        }
        shown(val, force) {
            return (val !== void 0) ? val : false;
        }
        check_enabled() {
            return this.has_options();
        }
        has_options() {
            return false;
        }
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_triangle);
        }
        sub() {
            return [].concat(this.Input(), this.Check(), this.List());
        }
        List() {
            return ((obj) => {
                obj.rows = () => [].concat(this.option_rows());
                obj.style = () => ({
                    "width": this.width_style(),
                });
                return obj;
            })(new this.$.$mol_list);
        }
        option_rows() {
            return [];
        }
        width_style() {
            return "";
        }
        pluguns() {
            return [].concat(this.Meter());
        }
        cur_width() {
            return this.Meter().width();
        }
        cur_bottom() {
            return this.Meter().bottom();
        }
        cur_left() {
            return this.Meter().left();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter);
        }
        Row(id) {
            return ((obj) => {
                obj.minimal_height = () => 32;
                obj.title = () => this.option_title(id);
                obj.checked = (val) => this.row_checked(id, val);
                obj.event_click = (val) => this.row_click(id, val);
                return obj;
            })(new this.$.$mol_check);
        }
        option_title(id) {
            return "";
        }
        row_checked(id, val, force) {
            return (val !== void 0) ? val : false;
        }
        row_click(id, val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_input_combo.prototype, "selected", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_combo.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_combo.prototype, "selected_title", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_combo.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_combo.prototype, "dropped_down", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_combo.prototype, "shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_combo.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_combo.prototype, "List", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_combo.prototype, "Meter", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_combo.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_combo.prototype, "row_checked", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_combo.prototype, "row_click", null);
    $.$bw_input_combo = $bw_input_combo;
})($ || ($ = {}));
//combo.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_input_combo extends $.$bw_input_combo {
            shown(val, force) {
                return super.shown(val, force);
            }
            List() {
                const result = !this.shown() ? null : super.List();
                return result;
            }
            option_rows() {
                return Object.keys(this.options()).map(id => this.Row(id));
            }
            row_title(id) {
                return this.options()[id];
            }
            row_checked(id, val, force) {
                if (val !== void 0) {
                    this.selected(id);
                    return true;
                }
                else {
                    return id === this.selected();
                }
            }
            row_click(id, val, force) {
                this.row_checked(id, true);
                this.shown(false);
                return (val !== void 0) ? val : null;
            }
            width_style() {
                return this.cur_width() + "px";
            }
            option(id) {
                const options = this.options();
                const result = options[id];
                return result;
            }
            option_title(id) {
                const option = this.option(id);
                const result = typeof option === 'string' ? option :
                    option ? option.title :
                        this.has_options() ? 'Undefined option ' + id :
                            'Options not specified';
                return result;
            }
            selected_title(val, force) {
                return this.option_title(this.selected());
            }
            has_options() {
                return !!Object.keys(this.options()).length;
            }
        }
        __decorate([
            $$.$bw_false_on_outside_click
        ], $bw_input_combo.prototype, "shown", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_combo.prototype, "row_checked", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_combo.prototype, "width_style", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_combo.prototype, "option", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_combo.prototype, "selected_title", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_combo.prototype, "has_options", null);
        $$.$bw_input_combo = $bw_input_combo;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//combo.view.js.map
;
"use strict";
var $;
(function ($) {
    class $bw_link extends $.$mol_link {
    }
    $.$bw_link = $bw_link;
})($ || ($ = {}));
//link.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_block extends $.$mol_view {
        selected_block(val, force) {
            return (val !== void 0) ? val : "";
        }
        block_title() {
            return "";
        }
        block_name() {
            return "";
        }
        content() {
            return [];
        }
        HeaderAddon() {
            return null;
        }
        button_bar_content() {
            return [];
        }
        attr() {
            return ({
                "bw_block_selected": this.is_selected(),
                "bw_focused": this.focused(),
                "bw_block_name": this.block_name(),
            });
        }
        is_selected() {
            return false;
        }
        event() {
            return (Object.assign({}, super.event(), { "click": (event) => this.event_click(event) }));
        }
        event_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        sub() {
            return [].concat(this.LeftSpace(), this.Inner(), this.RightSpace());
        }
        LeftSpace() {
            return ((obj) => {
                obj.dom_name = () => "horspace";
                return obj;
            })(new this.$.$mol_view);
        }
        Inner() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Header(), this.Content(), this.ButtonBar());
                return obj;
            })(new this.$.$mol_view);
        }
        Header() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Caption(), this.HeaderAddon());
                return obj;
            })(new this.$.$mol_view);
        }
        Caption() {
            return ((obj) => {
                obj.sub = () => [].concat(this.block_title());
                return obj;
            })(new this.$.$mol_view);
        }
        Content() {
            return ((obj) => {
                obj.sub = () => this.content();
                return obj;
            })(new this.$.$mol_view);
        }
        ButtonBar() {
            return ((obj) => {
                obj.sub = () => [].concat(this.button_bar_content());
                return obj;
            })(new this.$.$mol_bar);
        }
        RightSpace() {
            return ((obj) => {
                obj.dom_name = () => "horspace";
                return obj;
            })(new this.$.$mol_view);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_block.prototype, "selected_block", null);
    __decorate([
        $.$mol_mem
    ], $bw_block.prototype, "event_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_block.prototype, "LeftSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_block.prototype, "Inner", null);
    __decorate([
        $.$mol_mem
    ], $bw_block.prototype, "Header", null);
    __decorate([
        $.$mol_mem
    ], $bw_block.prototype, "Caption", null);
    __decorate([
        $.$mol_mem
    ], $bw_block.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_block.prototype, "ButtonBar", null);
    __decorate([
        $.$mol_mem
    ], $bw_block.prototype, "RightSpace", null);
    $.$bw_block = $bw_block;
})($ || ($ = {}));
//block.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_block extends $.$bw_block {
            focused(next) {
                const result = super.focused(next);
                if (result) {
                    new $.$mol_defer(() => this.selected_block(this.block_name()));
                }
                return result;
            }
            is_selected() {
                const result = this.selected_block() === this.block_name();
                return result;
            }
            event_click(event, force) {
                this.selected_block(this.block_name());
                return event;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_block.prototype, "focused", null);
        __decorate([
            $.$mol_mem
        ], $bw_block.prototype, "is_selected", null);
        $$.$bw_block = $bw_block;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//block.view.js.map
;
"use strict";
var $;
(function ($) {
    class $bw_label extends $.$mol_view {
        text() {
            return "";
        }
        sub() {
            return [].concat(this.text());
        }
    }
    $.$bw_label = $bw_label;
})($ || ($ = {}));
//label.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_field extends $.$mol_view {
        label() {
            return "";
        }
        Control() {
            return null;
        }
        sub() {
            return [].concat(this.Label(), this.Control());
        }
        Label() {
            return ((obj) => {
                obj.text = () => this.label();
                return obj;
            })(new this.$.$bw_label);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_field.prototype, "Label", null);
    $.$bw_field = $bw_field;
})($ || ($ = {}));
//field.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_grid extends $.$$.$mol_grid {
        records(val, force) {
            return (val !== void 0) ? val : null;
        }
        _records_modify() {
            return this.records_modify();
        }
        records_modify(val, force) {
            return (val !== void 0) ? val : null;
        }
        cursor_row_id(val, force) {
            return (val !== void 0) ? val : null;
        }
        cursor_idx(val, force) {
            return (val !== void 0) ? val : -1;
        }
        filter() {
            return null;
        }
        message() {
            return "here";
        }
        bw_autofocus() {
            return false;
        }
        row_spacing() {
            return 0;
        }
        style() {
            return (Object.assign({}, super.style(), { "height": this.fixed_height(), "max-height": this._max_height() }));
        }
        fixed_height(val, force) {
            return (val !== void 0) ? val : null;
        }
        _max_height() {
            return this.max_height();
        }
        max_height() {
            return null;
        }
        plugins() {
            return [].concat(this.Meter(), this.Vim());
        }
        grid_height() {
            return this.Meter().height();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter);
        }
        Vim() {
            return ((obj) => {
                return obj;
            })(new this.$.$$.$bw_vim);
        }
        Row(row_id) {
            return ((obj) => {
                obj.event_dblclick = (event) => this.row_dblclick(row_id, event);
                obj.event_click = (event) => this.row_click(row_id, event);
                obj.height = () => this.row_height();
                obj.cells = () => this.cells(row_id);
                obj.is_cursor = () => this.is_cursor(row_id);
                obj.is_selected = () => this.is_selected(row_id);
                return obj;
            })(new this.$.$bw_grid_row);
        }
        row_dblclick(row_id, event, force) {
            return (event !== void 0) ? event : null;
        }
        row_click(row_id, event, force) {
            return (event !== void 0) ? event : null;
        }
        is_cursor(row_id) {
            return false;
        }
        is_selected(row_id) {
            return false;
        }
        attr() {
            return (Object.assign({}, super.attr(), { "bw_autofocus": this.bw_autofocus(), "tabindex": this.tabindex(), "bw_grid_state": this.bw_grid_state() }));
        }
        tabindex() {
            return 0;
        }
        bw_grid_state() {
            return "";
        }
        event() {
            return (Object.assign({}, super.event(), { "wheel": (event) => this.event_wheel(event), "mouseenter": (event) => this.event_mouseenter(event) }));
        }
        event_wheel(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_mouseenter(event, force) {
            return (event !== void 0) ? event : null;
        }
        buffer_undo(val, force) {
            return (val !== void 0) ? val : [];
        }
        buffer_redo(val, force) {
            return (val !== void 0) ? val : [];
        }
        buffer_clip(val, force) {
            return (val !== void 0) ? val : [];
        }
        rec_ids_selected(val, force) {
            return (val !== void 0) ? val : null;
        }
        rec_ids_selection_invert(val, force) {
            return (val !== void 0) ? val : false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "records", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "records_modify", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "cursor_row_id", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "cursor_idx", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "fixed_height", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "Meter", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "Vim", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid.prototype, "row_dblclick", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid.prototype, "row_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "event_wheel", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "event_mouseenter", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "buffer_undo", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "buffer_redo", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "buffer_clip", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "rec_ids_selected", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid.prototype, "rec_ids_selection_invert", null);
    $.$bw_grid = $bw_grid;
})($ || ($ = {}));
(function ($) {
    class $bw_grid_table_col extends $.$mol_view {
        dom_name() {
            return "col";
        }
        width() {
            return null;
        }
        span() {
            return null;
        }
        style() {
            return (Object.assign({}, super.style(), { "width": this.width() }));
        }
        attr() {
            return (Object.assign({}, super.attr(), { "span": this.span() }));
        }
    }
    $.$bw_grid_table_col = $bw_grid_table_col;
})($ || ($ = {}));
(function ($) {
    class $bw_grid_table extends $.$$.$mol_grid_table {
    }
    $.$bw_grid_table = $bw_grid_table;
})($ || ($ = {}));
(function ($) {
    class $bw_grid_row extends $.$mol_grid_row {
        is_cursor() {
            return false;
        }
        is_selected() {
            return false;
        }
        event_dblclick(event, force) {
            return (event !== void 0) ? event : null;
        }
        event_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        event() {
            return (Object.assign({}, super.event(), { "dblclick": (event) => this.event_dblclick(event), "click": (event) => this.event_click(event) }));
        }
        attr() {
            return (Object.assign({}, super.attr(), { "bw_grid_row_cursor": this.is_cursor(), "bw_grid_row_selected": this.is_selected() }));
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_grid_row.prototype, "event_dblclick", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid_row.prototype, "event_click", null);
    $.$bw_grid_row = $bw_grid_row;
})($ || ($ = {}));
(function ($) {
    class $bw_grid_column_filterable extends $.$mol_view {
        title() {
            return "";
        }
        filter(val, force) {
            return (val !== void 0) ? val : "";
        }
        sub() {
            return [].concat(this.control());
        }
        control() {
            return null;
        }
        Normal() {
            return ((obj) => {
                obj.checked = (val) => this.checked(val);
                obj.title = () => this.title();
                return obj;
            })(new this.$.$bw_grid_column_filterable_check);
        }
        checked(val, force) {
            return (val !== void 0) ? val : false;
        }
        SearchInput() {
            return ((obj) => {
                obj.focused = (val) => this.input_focused(val);
                obj.checked = (val) => this.checked(val);
                obj.value = (val) => this.filter(val);
                obj.autocomplete = () => "new-password";
                return obj;
            })(new this.$.$bw_grid_filter_input);
        }
        input_focused(val, force) {
            return (val !== void 0) ? val : false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_grid_column_filterable.prototype, "filter", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid_column_filterable.prototype, "Normal", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid_column_filterable.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid_column_filterable.prototype, "SearchInput", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid_column_filterable.prototype, "input_focused", null);
    $.$bw_grid_column_filterable = $bw_grid_column_filterable;
})($ || ($ = {}));
(function ($) {
    class $bw_grid_filter_input extends $.$bw_input_checkable {
        plugins() {
            return [].concat(this.Vim());
        }
        Vim() {
            return ((obj) => {
                return obj;
            })(new this.$.$$.$bw_vim);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_grid_filter_input.prototype, "Vim", null);
    $.$bw_grid_filter_input = $bw_grid_filter_input;
})($ || ($ = {}));
(function ($) {
    class $bw_grid_column_filterable_check extends $.$mol_check {
        sub() {
            return [].concat(this.label(), this.Icon());
        }
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_search);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_grid_column_filterable_check.prototype, "Icon", null);
    $.$bw_grid_column_filterable_check = $bw_grid_column_filterable_check;
})($ || ($ = {}));
//grid.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        $$.bw_debug = false;
        $$.bw_debug2 = 0;
        function isValidOp(some) {
            const result = Number.isInteger(some) && 0 <= some && some <= 2;
            return result;
        }
        class $bw_grid extends $.$bw_grid {
            isRecId(some) {
                return typeof some == 'string' || Number.isInteger(some);
            }
            isRecordItem(some) {
                return Array.isArray(some) && some.length == 2 && this.isRecId(some[0]);
            }
            rec_ids_selected_actual() {
                let result;
                const rec_ids_selected = this.rec_ids_selected();
                const rec_ids_filtered = () => this.row_ids_filtered().map(row_id => this.rec_id_of_row(row_id));
                if (!this.rec_ids_selection_invert()) {
                    result = !rec_ids_selected.size ? [] : rec_ids_filtered().filter(rec_id => rec_ids_selected.has(rec_id));
                }
                else {
                    result = rec_ids_filtered();
                    if (rec_ids_selected.size) {
                        result = result.filter(rec_id => !rec_ids_selected.has(rec_id));
                    }
                }
                return result;
            }
            drop_selection() {
                this.rec_ids_selection_invert(false);
                this.rec_ids_selected(null);
            }
            rec_ids_selection_invert(val) {
                const result = super.rec_ids_selection_invert(val);
                return result;
            }
            rec_ids_selected(val) {
                if (val !== void 0) {
                    if (val && !val.size)
                        val = null;
                }
                return super.rec_ids_selected(val) || new Set();
            }
            rec_ids_selected_store(val) {
                const result = val && val.size ? [...val] : null;
                return result;
            }
            rec_ids_selected_restore(val_store) {
                const result = val_store && val_store.length ? new Set(val_store) : null;
                return result;
            }
            select_rows(row_ids, doSelect = true) {
                let op;
                if (doSelect === null) {
                    op = 'toggle';
                }
                else {
                    if (this.rec_ids_selection_invert())
                        doSelect = !doSelect;
                    op = !!doSelect ? 'add' : 'delete';
                }
                if (op) {
                    const rec_ids_selected = new Set(this.rec_ids_selected());
                    row_ids.forEach((row_id) => {
                        let rec_op = op;
                        if (rec_op == 'toggle') {
                            rec_op = !this.is_selected(row_id) ? 'add' : 'delete';
                        }
                        rec_ids_selected[rec_op](this.rec_id_of_row(row_id));
                    });
                    this.rec_ids_selected(rec_ids_selected);
                }
            }
            is_selected(row_id) {
                let result = this.rec_ids_selected().has(this.rec_id_of_row(row_id));
                if (this.rec_ids_selection_invert())
                    result = !result;
                return result;
            }
            record(rec_id) {
                const result = this.records().get(rec_id);
                return result;
            }
            event_mouseenter(event) {
                new $.$mol_defer(() => {
                    this.focused(true);
                });
            }
            event_wheel(event) {
                const deltaY = event.deltaY;
                const deltaX = event.deltaX;
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    const timer_callback = () => {
                        this._wheel_direction_down = void 0;
                        clearTimeout(this._wheel_timer);
                    };
                    const reset_timer = () => {
                        this._wheel_move += Math.abs(deltaY);
                        clearTimeout(this._wheel_timer);
                        this._wheel_timer = setTimeout(timer_callback, 20);
                    };
                    if (this._wheel_direction_down === void 0 || this._wheel_direction_down !== deltaY > 0) {
                        this._wheel_direction_down = deltaY > 0;
                        this._wheel_move = 0;
                    }
                    const threshold = 35;
                    if (this._wheel_move >= threshold / 2) {
                        const idx = this.cursor_idx();
                        const count = this.count();
                        const step_abs = Math.round(this._wheel_move / threshold);
                        const step = (this._wheel_direction_down ? 1 : -1) * step_abs;
                        const new_idx = Math.min(count - 1, Math.max(0, idx + step));
                        const noMargin = !(this.screen_top_idx() < idx && idx < this.screen_bottom_idx());
                        this.cursor_idx(new_idx);
                        this.adjust_scroll_to_cursor_idx(noMargin);
                        timer_callback();
                    }
                    else {
                        reset_timer();
                    }
                    event.preventDefault();
                }
            }
            scrollTop(val, dont_adjust_cursor = false) {
                if (val !== void 0 && val != super.scroll_top()) {
                    const dom_node = this.dom_node();
                    if (val < 0) {
                        val = 0;
                    }
                    else {
                        const val_max = this.content_height() + 1 - dom_node.clientHeight;
                        if (val > val_max)
                            val = val_max;
                    }
                    if (dom_node.scrollTop != val)
                        dom_node.scrollTop = val;
                    let need_save = !!val;
                    let dom_id;
                    if (!need_save && $bw_grid._gridsScrollTop) {
                        dom_id = this.dom_id();
                        if ($bw_grid._gridsScrollTop.has(dom_id)) {
                            need_save = !!$bw_grid._gridsScrollTop.has(dom_id);
                        }
                    }
                    if (need_save) {
                        dom_id = dom_id || this.dom_id();
                        if ($bw_grid._gridsScrollTop == void 0) {
                            $bw_grid._gridsScrollTop = new Map();
                            const observer = new MutationObserver((mutation, observer) => {
                                const restore = (el) => {
                                    const val = $bw_grid._gridsScrollTop.get(el.id);
                                    const bw_grid = el.bw_grid;
                                    if (typeof bw_grid !== 'function') {
                                        console.error(el.id + ' has no .bw_grid()');
                                    }
                                    else {
                                        bw_grid().scrollTop(val);
                                    }
                                };
                                for (let j = 0; j < mutation.length; j++) {
                                    const item = mutation[j];
                                    const target = item.target;
                                    if ($bw_grid._gridsScrollTop.has(target.id)) {
                                        restore(target);
                                    }
                                    else {
                                        const children = target.children;
                                        if (children) {
                                            const count = children.length;
                                            let found = false;
                                            for (let i = 0; i < count; i++) {
                                                const child = children.item(i);
                                                if (!$bw_grid._gridsScrollTop.has(child.id))
                                                    continue;
                                                if (found) {
                                                    console.error('found more then one child with the same id "' + child.id + '" at "' + target.id + '"');
                                                    continue;
                                                }
                                                restore(child);
                                                found = true;
                                            }
                                        }
                                    }
                                }
                            });
                            observer.observe(document, { childList: true, subtree: true, attributes: true, characterData: true });
                        }
                        $bw_grid._gridsScrollTop.set(dom_id, val);
                    }
                    if (!dont_adjust_cursor) {
                        new $.$mol_defer(() => this.adjust_cursor_idx_to_scroll());
                    }
                }
                const result = super.scroll_top(val);
                return result;
            }
            dom_node(next) {
                const result = super.dom_node();
                result.bw_grid = () => this;
                return result;
            }
            grid_height() {
                const result = super.grid_height();
                const changed = this.current_grid_height != result;
                this.current_grid_height = result;
                if (result && changed) {
                    new $.$mol_defer(() => this.adjust_cursor_idx_to_scroll());
                }
                return result;
            }
            row_outer_height() {
                const result = this.row_height() + this.row_spacing();
                return result;
            }
            head_outer_height() {
                const result = this.Head().dom_node().offsetHeight + this.row_spacing();
                return result;
            }
            rows_visible_max() {
                let max_height = null;
                if (max_height == null) {
                    max_height = this.$.$mol_view_visible_height();
                }
                const result = Math.ceil(max_height / this.row_outer_height() * 2);
                return result;
            }
            view_window() {
                const rows = this.rows();
                if (!rows)
                    return null;
                const count = this.count();
                const context = this.context_sub();
                const scrollTop = context.$mol_scroll_top();
                const top = Math.max(0, Math.floor(scrollTop / this.row_outer_height()) - 1);
                const bottom = Math.min(count, top + this.rows_visible_max());
                return { top, bottom, count };
            }
            gap_top() {
                const view_window = this.view_window();
                return view_window.top * this.row_outer_height();
            }
            height() {
                const view_window = this.view_window();
                return view_window.count * this.row_outer_height();
            }
            content_height() {
                const count = this.count();
                const result = count * this.row_outer_height() + this.head_outer_height() - 1;
                return result;
            }
            row_offset_top(idx) {
                const result = idx < 0 ? null : this.head_outer_height() + idx * this.row_outer_height();
                return result;
            }
            row_offset_bottom(idx) {
                const result = idx < 0 ? null : this.row_offset_top(idx) + this.row_outer_height();
                return result;
            }
            row_id(index) {
                return this.row_ids_filtered().slice(index, index + 1).valueOf()[0];
            }
            col_ids() {
                const rowFirst = this.row_ids().slice(0, 1).valueOf()[0];
                if (rowFirst === void 0)
                    return [];
                const record = this.record(rowFirst[rowFirst.length - 1]);
                if (!record)
                    return [];
                return Object.keys(record);
            }
            buffer_clip(val) {
                return super.buffer_clip(val);
            }
            buffer_clip_store(val) {
                const result = !val || !val.length ? null : val.map((item) => {
                    let item_store = {};
                    item_store.records_to_insert = [...item.records_to_insert.entries()];
                    return item_store;
                });
                return result;
            }
            buffer_clip_restore(val_store) {
                const result = !Array.isArray(val_store) ? null : val_store
                    .filter((item_store) => item_store && typeof item_store == 'object' && Array.isArray(item_store.records_to_insert))
                    .map((item_store) => {
                    const item = {};
                    item.records_to_insert = new Map(item_store.records_to_insert.filter((rec_item) => this.isRecordItem(rec_item)));
                    return item;
                })
                    .filter((item) => item.records_to_insert.size);
                return result;
            }
            buffer_undo(val) {
                return super.buffer_undo(val);
            }
            buffer_undo_store(val) {
                return this.buffer_store(val);
            }
            buffer_undo_restore(val_store) {
                return this.buffer_restore(val_store);
            }
            buffer_undo_equal(a, b) {
                return this.buffer_equal(a, b);
            }
            buffer_store(val) {
                const result = !(val && val.length) ? null : val.map((item) => {
                    const item_store = { op: item.op };
                    if (item.vim_mode != 0) {
                        item_store.vim_mode = item.vim_mode;
                    }
                    if (item.cursor_rec_id) {
                        item_store.cursor_rec_id = item.cursor_rec_id;
                    }
                    if (item.rec_ids_selected) {
                        item_store.rec_ids_selected = [...item.rec_ids_selected];
                    }
                    switch (item.op) {
                        case 0:
                            if (item.rec_ids_to_del && item.rec_ids_to_del.size) {
                                item_store.rec_ids_to_del = [...item.rec_ids_to_del];
                            }
                            break;
                        case 1:
                            if (item.bunches_to_insert) {
                                item_store.bunches_to_insert = [...item.bunches_to_insert.entries()].map((entry) => {
                                    const result = [entry[0], [...entry[1].entries()]];
                                    return result;
                                });
                            }
                            break;
                        case 2:
                            if (item.records_to_update) {
                                item_store.records_to_update = [...item.records_to_update.entries()];
                            }
                            break;
                        default:
                            console.error(`unsupported BwGridChangeOp ${item.op}`);
                            break;
                    }
                    return item_store;
                });
                return result;
            }
            buffer_restore(val_store) {
                const result = !Array.isArray(val_store) ? null : val_store.filter((item_store) => {
                    const result = item_store &&
                        typeof item_store == 'object' &&
                        isValidOp(item_store.op) &&
                        this.isRecId(item_store.cursor_rec_id) &&
                        (item_store.vim_mode === void 0 || $$.isValidVimMode(item_store.vim_mode));
                    true;
                    return result;
                }).map((item_store) => {
                    const item = { op: item_store.op };
                    item.vim_mode = item_store.vim_mode === void 0 ? 0 : item_store.vim_mode;
                    item.cursor_rec_id = item_store.cursor_rec_id;
                    if (Array.isArray(item_store.bunches_to_insert)) {
                        const bunches_to_insert = item_store.bunches_to_insert
                            .filter((bunch_store) => Array.isArray(bunch_store) &&
                            bunch_store.length == 2 &&
                            this.isRecId(bunch_store[0]) &&
                            Array.isArray(bunch_store[1]) &&
                            true)
                            .map((bunch_store) => {
                            const result = [
                                bunch_store[0],
                                new Map(bunch_store[1].filter((rec_item) => this.isRecordItem(rec_item)))
                            ];
                            return result;
                        })
                            .filter((bunch) => bunch[1].size);
                        item.bunches_to_insert = new Map(bunches_to_insert);
                    }
                    if (Array.isArray(item_store.records_to_update)) {
                        item.records_to_update = new Map(item_store.records_to_update.filter((rec_item) => this.isRecordItem(rec_item)));
                    }
                    if (Array.isArray(item_store.rec_ids_to_del)) {
                        item.rec_ids_to_del = new Set(item_store.rec_ids_to_del.filter((rec_id) => this.isRecId(rec_id)));
                    }
                    if (Array.isArray(item_store.rec_ids_selected)) {
                        item.rec_ids_selected = new Set(item_store.rec_ids_selected.filter((rec_id) => this.isRecId(rec_id)));
                    }
                    return item;
                }).filter((item) => {
                    switch (item.op) {
                        case 0:
                            return item.rec_ids_to_del && item.rec_ids_to_del.size;
                        case 1:
                            return item.bunches_to_insert && item.bunches_to_insert.size;
                        case 2:
                            return item.records_to_update && item.records_to_update.size;
                        default:
                            return false;
                    }
                });
                return result;
            }
            buffer_equal(a, b) {
                if ((a === null || !a.length) && (b === null || !b.length))
                    return true;
                return false;
            }
            buffer_redo(val) {
                return super.buffer_redo(val);
            }
            buffer_redo_store(val) {
                return this.buffer_store(val);
            }
            buffer_redo_restore(val_store) {
                return this.buffer_restore(val_store);
            }
            buffer_redo_equal(a, b) {
                return this.buffer_equal(a, b);
            }
            push_to_changes_buffer(changes, item) {
                const changes_buffer = (changes == 0 ? this.buffer_undo() : this.buffer_redo()).slice(0);
                changes_buffer.push(item);
                changes == 0 ? this.buffer_undo(changes_buffer) : this.buffer_redo(changes_buffer);
            }
            pop_from_changes_buffer(changes) {
                const changes_buffer = (changes == 0 ? this.buffer_undo() : this.buffer_redo()).slice(0);
                const result = changes_buffer.pop();
                if (changes == 0) {
                    this.buffer_undo(changes_buffer);
                }
                else {
                    this.buffer_redo(changes_buffer);
                }
                return result;
            }
            del_records(rec_ids_to_del, set_after_del, changes = 0, save_after_del) {
                if (!rec_ids_to_del.size)
                    return;
                const records_old = this.records();
                const records_new = new Map();
                const records_deleted = new Map();
                let records_to_insert;
                let before_rec_id;
                const bunches_to_insert = new Map();
                records_old.forEach((rec, rec_id) => {
                    if (rec_ids_to_del.has(rec_id)) {
                        if (!records_to_insert) {
                            records_to_insert = new Map();
                        }
                        records_to_insert.set(rec_id, records_old.get(rec_id));
                    }
                    else {
                        if (records_to_insert) {
                            before_rec_id = rec_id;
                            bunches_to_insert.set(before_rec_id, records_to_insert);
                            records_to_insert = void 0;
                        }
                        records_new.set(rec_id, records_old.get(rec_id));
                    }
                });
                if (records_to_insert) {
                    before_rec_id = '';
                    bunches_to_insert.set(before_rec_id, records_to_insert);
                }
                this.after_modify_records(Object.assign({}, set_after_del, { cursor_rec_id: set_after_del && this.isRecId(set_after_del.cursor_rec_id) ?
                        set_after_del.cursor_rec_id :
                        (() => {
                            const row_ids = this.row_ids_filtered();
                            const cursor_idx = this.cursor_idx();
                            const count = row_ids.length;
                            let result;
                            for (let i = cursor_idx; i < count; i++) {
                                const rec_id = this.rec_id_of_row(row_ids[i]);
                                if (rec_ids_to_del.has(rec_id))
                                    continue;
                                result = rec_id;
                                break;
                            }
                            return result;
                        })(), records_new }), changes, Object.assign({}, save_after_del, { op: 1, bunches_to_insert: bunches_to_insert }));
            }
            ins_records(bunches_to_insert, set_after_ins, changes = 0, save_after_ins) {
                if (!bunches_to_insert.size)
                    return;
                const records_old = this.records();
                let records_new = new Map();
                const rec_ids_to_del = new Set();
                const insert_before = (before_rec_id) => {
                    if (bunches_to_insert.has(before_rec_id)) {
                        bunches_to_insert.get(before_rec_id).forEach((rec, rec_id) => {
                            rec_ids_to_del.add(rec_id);
                            records_new.set(rec_id, rec);
                        });
                    }
                };
                records_old.forEach((rec, rec_id) => {
                    insert_before(rec_id);
                    records_new.set(rec_id, rec);
                });
                insert_before('');
                this.after_modify_records(Object.assign({}, set_after_ins, { cursor_rec_id: set_after_ins && this.isRecId(set_after_ins.cursor_rec_id) ?
                        set_after_ins.cursor_rec_id :
                        bunches_to_insert.values().next().value.keys().next().value, records_new }), changes, Object.assign({}, save_after_ins, { op: 0, rec_ids_to_del }));
            }
            upd_records(records_upd, set_after_upd, changes = 0, save_after_upd) {
                if (!records_upd.size)
                    return;
                const records_old = this.records();
                let records_new = new Map();
                let records_to_update = new Map();
                let found = false;
                records_old.forEach((record_old, rec_id) => {
                    const record_upd = records_upd.get(rec_id);
                    if (!record_upd || $$.$bw_equal(record_upd, record_old)) {
                        records_new.set(rec_id, record_old);
                    }
                    else {
                        records_to_update.set(rec_id, record_old);
                        records_new.set(rec_id, record_upd);
                        found = true;
                    }
                });
                if (!found)
                    return;
                this.after_modify_records(Object.assign({}, set_after_upd, { cursor_rec_id: set_after_upd && this.isRecId(set_after_upd.cursor_rec_id) ?
                        set_after_upd.cursor_rec_id :
                        records_upd.keys().next().value, records_new }), changes, Object.assign({}, save_after_upd, { op: 2, records_to_update }));
            }
            after_modify_records(set_after_modify, changes, changes_item) {
                if (changes_item.vim_mode === void 0) {
                    changes_item.vim_mode = this.Vim().vim_mode();
                }
                if (changes_item.cursor_rec_id === void 0) {
                    changes_item.cursor_rec_id = this.cursor_rec_id();
                }
                if (changes_item.rec_ids_selected === void 0) {
                    changes_item.rec_ids_selected = this.rec_ids_selected();
                }
                const buffer_item = Object.assign({}, changes_item);
                this.push_to_changes_buffer(changes, buffer_item);
                this.records(set_after_modify.records_new);
                this.rec_ids_selected(set_after_modify.rec_ids_selected || null);
                this.Vim().vim_mode(set_after_modify.vim_mode || 0, true);
                const idx = this.isRecId(set_after_modify.cursor_rec_id) ? this.row_idx_by_rec_id(set_after_modify.cursor_rec_id) : this.count() - 1;
                new $.$mol_defer(() => {
                    this.cursor_idx(idx);
                    if (idx < this.screen_top_idx() || this.screen_bottom_idx() < idx) {
                        this.screen_middle_idx(idx);
                    }
                });
            }
            apply_changes(qt, changes) {
                const revert = changes == 0 ? 1 : 0;
                while (qt-- > 0) {
                    const item = this.pop_from_changes_buffer(changes);
                    if (!item)
                        break;
                    switch (item.op) {
                        case 1:
                            this.ins_records(item.bunches_to_insert, item, revert, item);
                            break;
                        case 0:
                            this.del_records(item.rec_ids_to_del, item, revert, item);
                            break;
                        case 2:
                            this.upd_records(item.records_to_update, item, revert, item);
                            break;
                        default:
                            console.error(`Unsupported item.op ${item.op}`);
                            break;
                    }
                }
            }
            row_ids_filtered() {
                const result = this.row_ids().filter(id => this.filter_row(id));
                return result;
            }
            rows() {
                const result = this.row_ids_filtered().map(id => this.Row(id));
                return result;
            }
            record_ids() {
                const records = this.records();
                return [...records.keys()];
            }
            row_click(row_id, event, force) {
                if (!event)
                    return;
                if (event.target.closest('mol_check_box'))
                    return;
                const { shiftKey, metaKey, altKey, ctrlKey } = event;
                if (!(this.Vim().vim_mode() == 3 || !shiftKey && !metaKey && altKey && !ctrlKey)) {
                    this.cursor_row_id(row_id);
                    this.adjust_scroll_to_cursor_idx(true);
                }
                else if (!this.is_equal_row_id(row_id, this.cursor_row_id())) {
                    this.select_rows([row_id], null);
                }
            }
            filter_row(row_id) {
                if (!row_id)
                    return true;
                const result = bw_grid_filter_rec(this.record(this.rec_id_of_row(row_id)), this.filter());
                return result;
            }
            fixed_height(val) {
                return super.fixed_height(val);
            }
            _max_height() {
                let result = super._max_height();
                if (result != null) {
                    const fixed_height = this.fixed_height();
                    if (fixed_height != null) {
                        result = Math.max(fixed_height, result);
                    }
                }
                return result;
            }
            cursor_row_id(val, force) {
                let result = null;
                const row_ids = this.row_ids_filtered();
                if (row_ids.length) {
                    if (val !== void 0) {
                        result = val;
                    }
                    else {
                        result = super.cursor_row_id();
                        if (!result) {
                            result = row_ids[0];
                        }
                        else {
                            let cursor_idx = super.cursor_idx();
                            if (!(cursor_idx >= 0))
                                cursor_idx = 0;
                            if (!(cursor_idx < row_ids.length))
                                cursor_idx = row_ids.length - 1;
                            if (!this.is_equal_row_id(row_ids[cursor_idx], result)) {
                                const new_cursor_idx = row_ids.findIndex((id) => this.is_equal_row_id(id, result));
                                if (new_cursor_idx >= 0) {
                                    super.cursor_idx(new_cursor_idx);
                                }
                                else {
                                    result = row_ids[cursor_idx];
                                }
                            }
                        }
                    }
                }
                return super.cursor_row_id(result, force);
            }
            cursor_rec_id(val, force) {
                let result = null;
                if (val === void 0) {
                    result = this.rec_id_of_row(this.cursor_row_id());
                }
                else {
                    const row_ids = this.row_ids_filtered();
                    if (row_ids.length) {
                        const new_cursor_idx = row_ids.findIndex((row_id) => this.rec_id_of_row(row_id) == val);
                        if (new_cursor_idx >= 0) {
                            super.cursor_idx(new_cursor_idx);
                            result = val;
                        }
                        else {
                            super.cursor_row_id(null);
                            result = null;
                        }
                    }
                }
                return result;
            }
            cursor_idx(val, force) {
                let result = -1;
                const row_ids = this.row_ids_filtered();
                const cursor_row_id = this.cursor_row_id();
                if (cursor_row_id && row_ids.length) {
                    if (val === void 0) {
                        result = super.cursor_idx();
                        if (!(result >= 0) || !this.is_equal_row_id(row_ids[result], cursor_row_id)) {
                            result = this.row_idx_by_row_id(cursor_row_id);
                        }
                    }
                    else {
                        result = val;
                        if (result >= 0) {
                            const len = row_ids.length;
                            if (result >= len)
                                result = len - 1;
                            if (result >= 0) {
                                this.cursor_row_id(row_ids[result]);
                            }
                        }
                        if (!(result >= 0)) {
                            result = 0;
                            const cursor_row_id = row_ids[result];
                            if (!this.is_equal_row_id(cursor_row_id, this.cursor_row_id())) {
                                this.cursor_row_id(cursor_row_id);
                            }
                        }
                    }
                }
                if (!(result >= 0) && row_ids.length) {
                    result = 0;
                    this.cursor_row_id(row_ids[result]);
                }
                const ret = super.cursor_idx(result, force);
                return ret;
            }
            row_idx_by_row_id(row_id) {
                const row_ids = this.row_ids_filtered();
                const result = row_ids.findIndex((id) => this.is_equal_row_id(row_id, id));
                return result;
            }
            is_cursor(id) {
                const result = this.is_equal_row_id(id, this.cursor_row_id());
                return result;
            }
            is_equal_row_id(a, b) {
                if (a === b)
                    return true;
                if (a == null || b == null)
                    return false;
                if (a.length != b.length)
                    return false;
                for (var i = 0; i < a.length; ++i) {
                    if (a[i] !== b[i])
                        return false;
                }
                return true;
            }
            vim_modes() {
                return new Set([0, 3]);
            }
            vim_cmd() {
                const page = () => this.screen_bottom_idx(void 0, true) - this.screen_top_idx(void 0, true) + 1;
                const half_page = () => Math.round(page() / 2);
                const result = new $$.VimDefCmd(new $$.VimDefCmdItem([30, 22], (opt, cmd) => {
                    this.edit_record(this.cursor_rec_id());
                }), new $$.VimDefCmdItem(27, (opt, cmd) => {
                    this.rec_ids_selection_invert(!this.rec_ids_selection_invert());
                }), new $$.VimDefCmdItem(26, (opt, cmd) => {
                    this.rec_ids_selection_invert(!this.rec_ids_selection_invert());
                    this.rec_ids_selected(null);
                }), new $$.VimDefCmdItem(25, (opt, cmd) => {
                    if (this.Vim().vim_mode() == 3) {
                        this.Vim().vim_mode(0);
                    }
                    else {
                        const cursor_row_id = this.cursor_row_id();
                        this.select_rows([cursor_row_id], !this.is_selected(cursor_row_id));
                        this.Vim().vim_mode(3);
                    }
                }), new $$.VimDefCmdItem(24, (opt, cmd) => {
                    const cursor_row_id = this.cursor_row_id();
                    this.select_rows([cursor_row_id], !this.is_selected(cursor_row_id));
                }), new $$.VimDefCmdItem([
                    0, 1,
                    2, 3,
                    4, 5,
                ], (opt, cmd) => {
                    if (!opt.qt)
                        opt.qt = 1;
                    const idx = this.cursor_idx();
                    if (cmd == 2 || cmd == 3) {
                        opt.qt = opt.qt * half_page();
                    }
                    else if (cmd == 4 || cmd == 5) {
                        opt.qt = opt.qt * page();
                    }
                    const step = cmd == 0 || cmd == 2 || cmd == 4 ? -opt.qt : opt.qt;
                    const new_idx = Math.min(this.count() - 1, Math.max(0, idx + step));
                    if (new_idx == idx)
                        return;
                    if (opt.conformResult && opt.conformResult.shiftKey || this.Vim().vim_mode() == 3) {
                        const row_ids = this.row_ids_filtered();
                        const fromIdx = idx < new_idx ? idx + 1 : new_idx;
                        const toIdx = idx < new_idx ? new_idx : idx - 1;
                        let doSelect = false;
                        for (let i = fromIdx; i <= toIdx; i++) {
                            if (!this.is_selected(row_ids[i])) {
                                doSelect = true;
                                break;
                            }
                        }
                        const row_ids_to_select = row_ids.slice(Math.min(idx, new_idx), Math.max(idx, new_idx) + 1);
                        this.select_rows(row_ids_to_select, doSelect);
                    }
                    if (cmd == 2 || cmd == 3) {
                        this.cursor_idx(new_idx);
                        this.screen_middle_idx(new_idx);
                    }
                    else if (cmd == 4 || cmd == 5) {
                        this.cursor_idx(new_idx);
                        if (cmd == 4) {
                            this.screen_bottom_idx(new_idx);
                        }
                        else {
                            this.screen_top_idx(new_idx);
                        }
                    }
                    else {
                        const noMargin = !(this.screen_top_idx() < idx && idx < this.screen_bottom_idx());
                        this.cursor_idx(new_idx);
                        this.adjust_scroll_to_cursor_idx(noMargin);
                    }
                }), new $$.VimDefCmdItem(8, () => {
                    this.cursor_idx(this.screen_top_idx(void 0, true));
                    this.adjust_scroll_to_cursor_idx();
                }), new $$.VimDefCmdItem(9, () => {
                    this.cursor_idx(this.screen_bottom_idx(void 0, true));
                    this.adjust_scroll_to_cursor_idx();
                }), new $$.VimDefCmdItem(10, () => {
                    this.cursor_idx(this.screen_middle_idx(void 0, true));
                }), new $$.VimDefCmdItem(13, () => { this.screen_top_idx(this.cursor_idx()); }), new $$.VimDefCmdItem(14, () => { this.screen_bottom_idx(this.cursor_idx()); }), new $$.VimDefCmdItem(15, () => { this.screen_middle_idx(this.cursor_idx()); }), new $$.VimDefCmdItem([11, 12], (opt, cmd) => {
                    this.screen_top_idx(this.screen_top_idx() + (cmd == 11 ? -1 : 1) * opt.qt);
                }), new $$.VimDefCmdItem([6, 7], (opt, cmd) => {
                    if (opt.qt !== void 0) {
                        opt.qt -= 1;
                        this.cursor_idx(opt.qt);
                        this.screen_top_idx(opt.qt - half_page());
                    }
                    else {
                        this.cursor_idx(cmd == 6 ? 0 : this.count() - 1);
                        const scrollTop = cmd == 6 ? 0 : this.maxScrollTop();
                        this.scrollTop(scrollTop, true);
                    }
                }), new $$.VimDefCmdItem([18, 19], (opt, cmd) => {
                    this.cmd_del(opt.qt);
                    return { mode: 0 };
                }), new $$.VimDefCmdItem([28, 29], (opt, cmd) => {
                    const buffer_clip = this.buffer_clip();
                    if (buffer_clip && buffer_clip.length) {
                        const records_to_insert = buffer_clip[buffer_clip.length - 1].records_to_insert;
                        const bunches_to_insert = new Map();
                        let before_rec_id = '';
                        if (cmd == 29) {
                            before_rec_id = this.cursor_rec_id();
                            if (!this.isRecId(before_rec_id))
                                before_rec_id = '';
                        }
                        else {
                            const row_ids = this.row_ids_filtered();
                            const cursor_idx = this.cursor_idx();
                            if (cursor_idx < row_ids.length - 1) {
                                before_rec_id = this.rec_id_of_row(row_ids[cursor_idx + 1]);
                            }
                        }
                        bunches_to_insert.set(before_rec_id, records_to_insert);
                        this.ins_records(bunches_to_insert, {
                            vim_mode: 0,
                            rec_ids_selected: new Set(records_to_insert.keys()),
                        });
                        return { mode: 0 };
                    }
                }), new $$.VimDefCmdItem([20, 21], (opt, cmd) => {
                    this.apply_changes(opt.qt, cmd == 20 ? 0 : 1);
                }), new $$.VimDefCmdItem([16, 17], (opt, cmd) => {
                    const before_rec_id = cmd == 16 ? this.cursor_rec_id() :
                        this.cursor_idx() < this.count() - 1 ? this.rec_id_of_row(this.row_ids_filtered()[this.cursor_idx() + 1]) :
                            void 0;
                    this.new_record(before_rec_id);
                }), new $$.VimDefCmdItem(23, (opt, cmd) => {
                    this.rec_ids_selected(null);
                }));
                return result;
            }
            cmd_del(qt) {
                const max_idx = this.count() - 1;
                if (max_idx < 0)
                    return;
                const rec_ids_selected = this.rec_ids_selected_actual();
                const records = this.records();
                let records_to_del = rec_ids_selected.length ?
                    (() => {
                        const records_to_del = new Map();
                        rec_ids_selected.forEach(rec_id => {
                            records_to_del.set(rec_id, records.get(rec_id));
                        });
                        return records_to_del;
                    })() :
                    (() => {
                        const records_to_del = new Map();
                        const cursor_idx = this.cursor_idx();
                        const cursor_row_id = this.cursor_row_id();
                        const row_ids = this.row_ids_filtered();
                        const hierarchy = this.hierarchy();
                        const add_rec_id = (rec_id) => {
                            if (!records_to_del.has(rec_id)) {
                                records_to_del.set(rec_id, records.get(rec_id));
                                const item = hierarchy[rec_id];
                                if (item && item.sub && item.sub.length) {
                                    item.sub.forEach((child) => add_rec_id(child.id));
                                }
                            }
                        };
                        let i = cursor_idx;
                        if (!qt)
                            qt = 1;
                        while (qt > 0 && i <= max_idx) {
                            const row_id = row_ids[i];
                            if (row_id.length < cursor_row_id.length)
                                break;
                            if (row_id.length == cursor_row_id.length) {
                                add_rec_id(row_id[row_id.length - 1]);
                                qt--;
                            }
                            i++;
                        }
                        return records_to_del;
                    })();
                if (records_to_del.size) {
                    this.del_records(new Set(records_to_del.keys()));
                    const buffer_clip = [...this.buffer_clip().slice(-9)];
                    buffer_clip.push({ records_to_insert: records_to_del });
                    this.buffer_clip(buffer_clip);
                }
                this.drop_selection();
            }
            edit_record(rec_id) {
                const records = new Map();
                records.set(rec_id, this.records().get(rec_id));
                this.records_modify({
                    kind: 0,
                    state: 0,
                    records,
                });
            }
            new_record(before_rec_id) {
                this.records_modify({
                    kind: 1,
                    state: 0,
                    records: new Map(),
                    before_rec_id,
                });
            }
            bw_grid_state() {
                const _records_modify = this._records_modify();
                let result;
                if (_records_modify && _records_modify.state == 0) {
                    result = _records_modify.kind == 0 ? 'edit' : 'insert';
                }
                return result || null;
            }
            _records_modify() {
                const result = super._records_modify();
                if (result && result.state == 1) {
                    if (result.kind == 0) {
                        this.upd_records(result.records);
                    }
                    else {
                        const bunches_to_insert = new Map();
                        bunches_to_insert.set(result.before_rec_id, result.records);
                        this.ins_records(bunches_to_insert);
                    }
                    this.records_modify(null);
                }
                return result;
            }
            row_idx_by_rec_id(rec_id) {
                let result = null;
                const row_ids = this.row_ids_filtered();
                const count = row_ids.length;
                for (let i = 0; i < count; i++) {
                    const row_id = row_ids[i];
                    if (row_id[row_id.length - 1] == rec_id) {
                        result = i;
                        break;
                    }
                }
                return result;
            }
            rec_id_of_row(row_id) {
                return row_id === null ? null : row_id[row_id.length - 1];
            }
            maxScrollTop() {
                const dom_node = this.dom_node();
                const result = dom_node.scrollHeight - dom_node.clientHeight;
                return result;
            }
            scrollBottom(val) {
                const clientHeight = this.dom_node().clientHeight;
                const result = this.scrollTop(val === void 0 ? val : val - clientHeight) + clientHeight;
                return result;
            }
            clientHeight() {
                const dom_node = this.dom_node();
                return dom_node.clientHeight;
            }
            count() {
                const result = this.row_ids_filtered().length;
                return result;
            }
            row_top(idx) {
                return idx * this.row_outer_height() + this.head_outer_height();
            }
            screen_top_idx(val, doRound = false) {
                if (val !== void 0) {
                    const scrollTop = this.row_top(val) - this.head_outer_height();
                    this.scrollTop(scrollTop, true);
                }
                let result = this.scrollTop() / this.row_outer_height();
                result = doRound ? Math.round(result) : Math.ceil(result);
                return result;
            }
            screen_bottom_idx(val, doRound = false) {
                const row_outer_height = this.row_outer_height();
                const clientHeight = this.clientHeight();
                const topOffset = clientHeight - row_outer_height;
                if (val !== void 0) {
                    const scrollTop = this.row_top(val) - topOffset;
                    this.scrollTop(scrollTop, true);
                }
                let result = (this.scrollTop() + topOffset - this.head_outer_height()) / row_outer_height;
                result = doRound ? Math.round(result) : Math.floor(result);
                return result;
            }
            screen_middle_idx(val, doRound = false) {
                const row_outer_height = this.row_outer_height();
                const head_outer_height = this.head_outer_height();
                const clientHeight = this.clientHeight();
                const topOffset = head_outer_height + Math.floor((clientHeight - head_outer_height) / 2 / row_outer_height) * row_outer_height;
                if (val !== void 0) {
                    const scrollTop = this.row_top(val) - topOffset;
                    this.scrollTop(scrollTop, true);
                }
                let result = (this.scrollTop() + topOffset - head_outer_height) / row_outer_height;
                result = doRound ? Math.round(result) : Math.floor(result);
                return result;
            }
            adjust_scroll_to_cursor_idx(noMargin = true) {
                const idx = this.cursor_idx();
                if (idx < 0)
                    return;
                if (idx < this.screen_top_idx() + (noMargin ? 0 : 1)) {
                    this.screen_top_idx(idx - (noMargin ? 0 : 1));
                }
                else if (idx > this.screen_bottom_idx() - (noMargin ? 0 : 1)) {
                    this.screen_bottom_idx(idx + (noMargin ? 0 : 1));
                }
            }
            adjust_cursor_idx_to_scroll() {
                const row_ids = this.row_ids_filtered();
                const max_idx = row_ids.length - 1;
                if (max_idx >= 0) {
                    let top = this.screen_top_idx();
                    let bottom = this.screen_bottom_idx();
                    if (top > bottom) {
                        if (this.scrollBottom() + this.scrollTop() <= this.head_outer_height() + 2 * top * this.row_outer_height()) {
                            top = bottom;
                        }
                        else {
                            bottom = top;
                        }
                    }
                    const idx = this.cursor_idx();
                    let new_idx = Math.max(top, Math.min(bottom, idx));
                    if (idx != new_idx) {
                        this.cursor_idx(new_idx);
                    }
                }
            }
        }
        __decorate([
            $$.$bw_session
        ], $bw_grid.prototype, "rec_ids_selection_invert", null);
        __decorate([
            $$.$bw_session
        ], $bw_grid.prototype, "rec_ids_selected", null);
        __decorate([
            $$.$bw_local
        ], $bw_grid.prototype, "buffer_clip", null);
        __decorate([
            $$.$bw_session
        ], $bw_grid.prototype, "buffer_undo", null);
        __decorate([
            $$.$bw_session
        ], $bw_grid.prototype, "buffer_redo", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid.prototype, "cursor_row_id", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid.prototype, "cursor_rec_id", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid.prototype, "cursor_idx", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid.prototype, "row_idx_by_row_id", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid.prototype, "vim_cmd", null);
        $$.$bw_grid = $bw_grid;
        function bw_grid_filter_rec(rec, filter) {
            if (!filter)
                return true;
            const cols = Object.keys(rec);
            const cols_len = cols.length;
            let result = true;
            for (let i = 0; i < cols_len; i++) {
                const col = cols[i];
                const filter_col = filter[col];
                if (!filter_col)
                    continue;
                switch (filter_col.type) {
                    case 0:
                        if (filter_col.contains) {
                            result = rec[col].includes(filter_col.contains);
                        }
                        break;
                    default:
                        console.error('unsupported BwGridColFilterType ' + filter_col.type);
                        break;
                }
                if (!result)
                    break;
            }
            return result;
        }
        $$.bw_grid_filter_rec = bw_grid_filter_rec;
        class $bw_grid_column_filterable extends $.$bw_grid_column_filterable {
            control() {
                const result = this.checked() ? this.SearchInput() : this.Normal();
                return result;
            }
            checked(val, force) {
                if (val === void 0) {
                    val = !!(this.SearchInput().Input().focused() || this.filter());
                }
                else {
                    this.SearchInput().Input().focused(val);
                    if (val) {
                        new $.$mol_defer(() => this.SearchInput().Input().focused(val));
                    }
                }
                if (!val) {
                    this.filter('');
                }
                const result = super.checked(val, force);
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_grid_column_filterable.prototype, "checked", null);
        $$.$bw_grid_column_filterable = $bw_grid_column_filterable;
        class $bw_grid_filter_input extends $.$bw_grid_filter_input {
            vim_cmd() {
                const result = new $$.VimDefCmd(new $$.VimDefCmdItem(23, () => {
                    this.value('');
                    this['object_host()'].focused(false);
                    this['object_host()'].focused(true);
                }));
                return result;
            }
            vim_modes() {
                return 1;
            }
        }
        $$.$bw_grid_filter_input = $bw_grid_filter_input;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//grid.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_button_major extends $.$mol_button {
        title() {
            return "";
        }
        Icon() {
            return null;
        }
        tabindex() {
            return 1;
        }
        attr() {
            return (Object.assign({}, super.attr(), { "tabindex": this.tabindex() }));
        }
        sub() {
            return [].concat(this.Image());
        }
        Image() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Icon(), this.Caption());
                return obj;
            })(new this.$.$mol_view);
        }
        Caption() {
            return ((obj) => {
                obj.sub = () => [].concat(this.title());
                return obj;
            })(new this.$.$mol_view);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_button_major.prototype, "Image", null);
    __decorate([
        $.$mol_mem
    ], $bw_button_major.prototype, "Caption", null);
    $.$bw_button_major = $bw_button_major;
})($ || ($ = {}));
//major.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_button_major extends $.$bw_button_major {
            Caption() {
                return !this.title() ? null : super.Caption();
            }
        }
        $$.$bw_button_major = $bw_button_major;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//major.view.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_time_base {
        static formatter(pattern) {
            if (this.patterns[pattern])
                return this.patterns[pattern];
            var tokens = Object.keys(this.patterns)
                .sort()
                .reverse()
                .map((token) => token.replace(/([-+*.\[\]()\^])/g, '\\$1'));
            var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
            var funcs = [];
            pattern.replace(lexer, (str, text, token) => {
                if (text)
                    funcs.push(() => text);
                if (token)
                    funcs.push(this.patterns[token]);
                return str;
            });
            return this.patterns[pattern] = (arg) => {
                return funcs.reduce((res, func) => res + func(arg), '');
            };
        }
        toString(pattern) {
            var Base = this.constructor;
            var formatter = Base.formatter(pattern);
            return formatter.call(Base, this);
        }
    }
    $mol_time_base.patterns = {};
    $.$mol_time_base = $mol_time_base;
})($ || ($ = {}));
//base.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_time_duration extends $.$mol_time_base {
        constructor(config = 0) {
            super();
            this.year = 0;
            this.month = 0;
            this.day = 0;
            this.hour = 0;
            this.minute = 0;
            this.second = 0;
            if (typeof config === 'number') {
                this.second = config / 1000;
                return;
            }
            if (typeof config === 'string') {
                if (config === 'Z') {
                    this.hour = 0;
                    this.minute = 0;
                    return;
                }
                duration: {
                    const parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                    const found = parser.exec(config);
                    if (!found)
                        break duration;
                    if (found[1])
                        this.year = Number(found[1]);
                    if (found[2])
                        this.month = Number(found[2]);
                    if (found[3])
                        this.day = Number(found[3]);
                    if (found[4])
                        this.hour = Number(found[4]);
                    if (found[5])
                        this.minute = Number(found[5]);
                    if (found[6])
                        this.second = Number(found[6]);
                    return;
                }
                offset: {
                    var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                    var found = parser.exec(config);
                    if (!found)
                        break offset;
                    if (found[1])
                        this.hour = Number(found[1]);
                    if (found[2])
                        this.minute = Number(found[2]);
                    return;
                }
                throw new Error(`Can not parse time duration (${config})`);
            }
            this.year = config.year || 0;
            this.month = config.month || 0;
            this.day = config.day || 0;
            this.hour = config.hour || 0;
            this.minute = config.minute || 0;
            this.second = config.second || 0;
        }
        summ(config) {
            const duration = new $mol_time_duration(config);
            return new $mol_time_duration({
                year: this.year + duration.year,
                month: this.month + duration.month,
                day: this.day + duration.day,
                hour: this.hour + duration.hour,
                minute: this.minute + duration.minute,
                second: this.second + duration.second,
            });
        }
        mult(numb) {
            return new $mol_time_duration({
                year: this.year && this.year * numb,
                month: this.month && this.month * numb,
                day: this.day && this.day * numb,
                hour: this.hour && this.hour * numb,
                minute: this.minute && this.minute * numb,
                second: this.second && this.second * numb,
            });
        }
        count(config) {
            const duration = new $mol_time_duration(config);
            return this.valueOf() / duration.valueOf();
        }
        valueOf() {
            var day = this.year * 365 + this.month * 30.4 + this.day;
            var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
            return second * 1000;
        }
        toJSON() { return this.toString(); }
        toString(pattern = 'P#Y#M#DT#h#m#s') {
            return super.toString(pattern);
        }
    }
    $mol_time_duration.patterns = {
        '#Y': (duration) => {
            if (!duration.year)
                return '';
            return duration.year + 'Y';
        },
        '#M': (duration) => {
            if (!duration.month)
                return '';
            return duration.month + 'M';
        },
        '#D': (duration) => {
            if (!duration.day)
                return '';
            return duration.day + 'D';
        },
        '#h': (duration) => {
            if (!duration.hour)
                return '';
            return duration.hour + 'H';
        },
        '#m': (duration) => {
            if (!duration.minute)
                return '';
            return duration.minute + 'M';
        },
        '#s': (duration) => {
            if (!duration.second)
                return '';
            return duration.second + 'S';
        },
        '+hh': (duration) => {
            var hour = duration.hour;
            var sign = '+';
            if (hour < 0) {
                sign = '-';
                hour = -hour;
            }
            return (hour < 10)
                ? (sign + '0' + hour)
                : (sign + hour);
        },
        'mm': (duration) => {
            return (duration.minute < 10)
                ? ('0' + duration.minute)
                : String(duration.minute);
        },
    };
    $.$mol_time_duration = $mol_time_duration;
})($ || ($ = {}));
//duration.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_time_moment extends $.$mol_time_base {
        constructor(config = new Date) {
            super();
            if (typeof config === 'number')
                config = new Date(config);
            if (typeof config === 'string') {
                var parsed = /^(?:(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d))?)?)?(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d(?:\.\d\d\d)?))?)?(Z|[\+\-]\d\d(?::?(?:\d\d)?)?)?)?$/.exec(config);
                if (!parsed)
                    throw new Error(`Can not parse time moment (${config})`);
                if (parsed[1])
                    this.year = Number(parsed[1]);
                if (parsed[2])
                    this.month = Number(parsed[2]) - 1;
                if (parsed[3])
                    this.day = Number(parsed[3]) - 1;
                if (parsed[4])
                    this.hour = Number(parsed[4]);
                if (parsed[5])
                    this.minute = Number(parsed[5]);
                if (parsed[6])
                    this.second = Number(parsed[6]);
                if (parsed[7])
                    this.offset = new $.$mol_time_duration(parsed[7]);
                return;
            }
            if (config instanceof Date) {
                this.year = config.getFullYear();
                this.month = config.getMonth();
                this.day = config.getDate() - 1;
                this.hour = config.getHours();
                this.minute = config.getMinutes();
                this.second = config.getSeconds() + config.getMilliseconds() / 1000;
                var offset = -config.getTimezoneOffset();
                this.offset = new $.$mol_time_duration({
                    hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                    minute: offset % 60
                });
                return;
            }
            this.year = config.year;
            this.month = config.month;
            this.day = config.day;
            this.hour = config.hour;
            this.minute = config.minute;
            this.second = config.second;
            if (config.offset !== undefined)
                this.offset = config.offset && new $.$mol_time_duration(config.offset);
        }
        get weekday() {
            return (this.native.getDay() + 6) % 7;
        }
        get native() {
            if (this._native)
                return this._native;
            var utc = this.toOffset('Z');
            return this._native = new Date(Date.UTC((utc.year || 0), (utc.month || 0), (utc.day || 0) + 1, (utc.hour || 0), (utc.minute || 0), (utc.second && Math.floor(utc.second) || 0), (utc.second && Math.floor((utc.second - Math.floor(utc.second)) * 1000) || 0)));
        }
        get normal() {
            if (this._normal)
                return this._normal;
            const moment = new $mol_time_moment(this.native);
            return this._normal = new $mol_time_moment({
                year: (this.year === undefined) ? undefined : moment.year,
                month: (this.month === undefined) ? undefined : moment.month,
                day: (this.day === undefined) ? undefined : moment.day,
                hour: (this.hour === undefined) ? undefined : moment.hour,
                minute: (this.minute === undefined) ? undefined : moment.minute,
                second: (this.second === undefined) ? undefined : moment.second,
                offset: (this.offset === undefined) ? undefined : moment.offset,
            });
        }
        merge(config) {
            var moment = new $mol_time_moment(config);
            return new $mol_time_moment({
                year: (moment.year === undefined) ? this.year : moment.year,
                month: (moment.month === undefined) ? this.month : moment.month,
                day: (moment.day === undefined) ? this.day : moment.day,
                hour: (moment.hour === undefined) ? this.hour : moment.hour,
                minute: (moment.minute === undefined) ? this.minute : moment.minute,
                second: (moment.second === undefined) ? this.second : moment.second,
                offset: (moment.offset === undefined) ? this.offset : moment.offset,
            });
        }
        shift(config) {
            var duration = new $.$mol_time_duration(config);
            var moment = new $mol_time_moment().merge(this);
            var second = (moment.second + (duration.second || 0));
            var native = new Date(moment.year + (duration.year || 0), moment.month + (duration.month || 0), moment.day + 1 + (duration.day || 0), moment.hour + (duration.hour || 0), moment.minute + (duration.minute || 0), Math.floor(second), (second - Math.floor(second)) * 1000);
            if (isNaN(native.valueOf()))
                throw new Error('Wrong time');
            return new $mol_time_moment({
                year: (this.year === undefined) ? undefined : native.getFullYear(),
                month: (this.month === undefined) ? undefined : native.getMonth(),
                day: (this.day === undefined) ? undefined : native.getDate() - 1,
                hour: (this.hour === undefined) ? undefined : native.getHours(),
                minute: (this.minute === undefined) ? undefined : native.getMinutes(),
                second: (this.second === undefined) ? undefined : native.getSeconds() + native.getMilliseconds() / 1000,
                offset: this.offset,
            });
        }
        toOffset(config) {
            const duration = new $.$mol_time_duration(config);
            const offset = this.offset || new $mol_time_moment().offset;
            const moment = this.shift(duration.summ(offset.mult(-1)));
            return moment.merge({ offset: duration });
        }
        valueOf() { return this.native.getTime(); }
        toJSON() { return this.toString(); }
        toString(pattern = 'YYYY-MM-DDThh:mm:ss.sssZ') {
            return super.toString(pattern);
        }
    }
    $mol_time_moment.patterns = {
        'YYYY': (moment) => {
            if (moment.year == null)
                return '';
            return String(moment.year);
        },
        'AD': (moment) => {
            if (moment.year == null)
                return '';
            return String(Math.floor(moment.year / 100) + 1);
        },
        'YY': (moment) => {
            if (moment.year == null)
                return '';
            return String(moment.year % 100);
        },
        'Month': (moment) => {
            if (moment.month == null)
                return '';
            return moment.native.toLocaleString(undefined, { month: 'long' });
        },
        'DD Month': (moment) => {
            return moment.native.toLocaleString(undefined, { day: '2-digit', month: 'long' });
        },
        'D Month': (moment) => {
            return moment.native.toLocaleString(undefined, { day: 'numeric', month: 'long' });
        },
        'Mon': (moment) => {
            if (moment.month == null)
                return '';
            return moment.native.toLocaleString(undefined, { month: 'short' });
        },
        'DD Mon': (moment) => {
            return moment.native.toLocaleString(undefined, { day: '2-digit', month: 'short' });
        },
        'D Mon': (moment) => {
            return moment.native.toLocaleString(undefined, { day: 'numeric', month: 'short' });
        },
        '-MM': (moment) => {
            if (moment.month == null)
                return '';
            return '-' + $mol_time_moment.patterns['MM'](moment);
        },
        'MM': (moment) => {
            if (moment.month == null)
                return '';
            var month = moment.month + 1;
            return (month < 10)
                ? ('0' + month)
                : ('' + month);
        },
        'M': (moment) => {
            if (moment.month == null)
                return '';
            return String(moment.month + 1);
        },
        'WeekDay': (moment) => {
            if (moment.weekday == null)
                return '';
            return moment.native.toLocaleString(undefined, { weekday: 'long' });
        },
        'WD': (moment) => {
            if (moment.weekday == null)
                return '';
            return moment.native.toLocaleString(undefined, { weekday: 'short' });
        },
        '-DD': (moment) => {
            if (moment.day == null)
                return '';
            return '-' + $mol_time_moment.patterns['DD'](moment);
        },
        'DD': (moment) => {
            if (moment.day == null)
                return '';
            var day = moment.day + 1;
            return (day < 10)
                ? ('0' + day)
                : String(day);
        },
        'D': (moment) => {
            if (moment.day == null)
                return '';
            return String(moment.day + 1);
        },
        'Thh': (moment) => {
            if (moment.hour == null)
                return '';
            return 'T' + $mol_time_moment.patterns['hh'](moment);
        },
        'hh': (moment) => {
            if (moment.hour == null)
                return '';
            return (moment.hour < 10)
                ? ('0' + moment.hour)
                : String(moment.hour);
        },
        'h': (moment) => {
            if (moment.hour == null)
                return '';
            return String(moment.hour);
        },
        ':mm': (moment) => {
            if (moment.minute == null)
                return '';
            return ':' + $mol_time_moment.patterns['mm'](moment);
        },
        'mm': (moment) => {
            if (moment.minute == null)
                return '';
            return (moment.minute < 10)
                ? ('0' + moment.minute)
                : String(moment.minute);
        },
        'm': (moment) => {
            if (moment.minute == null)
                return '';
            return String(moment.minute);
        },
        ':ss': (moment) => {
            if (moment.second == null)
                return '';
            return ':' + $mol_time_moment.patterns['ss'](moment);
        },
        'ss': (moment) => {
            if (moment.second == null)
                return '';
            var second = Math.floor(moment.second);
            return (second < 10)
                ? ('0' + second)
                : String(second);
        },
        's': (moment) => {
            if (moment.second == null)
                return '';
            return String(Math.floor(moment.second));
        },
        '.sss': (moment) => {
            if (moment.second == null)
                return '';
            if (moment.second - Math.floor(moment.second) === 0)
                return '';
            return '.' + $mol_time_moment.patterns['sss'](moment);
        },
        'sss': (moment) => {
            if (moment.second == null)
                return '';
            var millisecond = Math.floor((moment.second - Math.floor(moment.second)) * 1000);
            return (millisecond < 10)
                ? ('00' + millisecond)
                : (millisecond < 100)
                    ? ('0' + millisecond)
                    : String(millisecond);
        },
        'Z': (moment) => {
            var offset = moment.offset;
            if (!offset)
                return '';
            return offset.toString('+hh:mm');
        }
    };
    $.$mol_time_moment = $mol_time_moment;
})($ || ($ = {}));
//moment.js.map
;
"use strict";
var $;
(function ($) {
    class $mol_time_interval extends $.$mol_time_base {
        constructor(config) {
            super();
            if (typeof config === 'string') {
                var chunks = config.split('/');
                if (chunks[0]) {
                    if (chunks[0][0].toUpperCase() === 'P') {
                        this._duration = new $.$mol_time_duration(chunks[0]);
                    }
                    else {
                        this._start = new $.$mol_time_moment(chunks[0]);
                    }
                }
                else {
                    this._start = new $.$mol_time_moment();
                }
                if (chunks[1]) {
                    if (chunks[1][0].toUpperCase() === 'P') {
                        this._duration = new $.$mol_time_duration(chunks[1]);
                    }
                    else {
                        this._end = new $.$mol_time_moment(chunks[1]);
                    }
                }
                else {
                    this._end = new $.$mol_time_moment();
                }
                return;
            }
            if (config.start !== undefined)
                this._start = new $.$mol_time_moment(config.start);
            if (config.end !== undefined)
                this._end = new $.$mol_time_moment(config.end);
            if (config.duration !== undefined)
                this._duration = new $.$mol_time_duration(config.duration);
        }
        get start() {
            if (this._start)
                return this._start;
            return this._start = this._end.shift(this._duration.mult(-1));
        }
        get end() {
            if (this._end)
                return this._end;
            return this._end = this._start.shift(this._duration);
        }
        get duration() {
            if (this._duration)
                return this._duration;
            return this._duration = new $.$mol_time_duration(this._end.valueOf() - this._start.valueOf());
        }
        toJSON() { return this.toString(); }
        toString() {
            return (this._start || this._duration || '').toString() + '/' + (this._end || this._duration || '').toString();
        }
    }
    $.$mol_time_interval = $mol_time_interval;
})($ || ($ = {}));
//interval.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $mol_calendar extends $.$mol_list {
        sub() {
            return [].concat(this.Title(), this.Weekdays(), this.Weeks());
        }
        Title() {
            return ((obj) => {
                obj.minimal_height = () => 24;
                obj.sub = () => [].concat(this.title());
                return obj;
            })(new this.$.$mol_view);
        }
        title() {
            return "";
        }
        Weekdays() {
            return ((obj) => {
                obj.sub = () => [].concat(this.weekdays());
                return obj;
            })(new this.$.$mol_view);
        }
        weekdays() {
            return [];
        }
        Weeks() {
            return ((obj) => {
                obj.rows = () => [].concat(this.weeks());
                return obj;
            })(new this.$.$mol_list);
        }
        weeks() {
            return [];
        }
        Weekday(index) {
            return ((obj) => {
                obj.holiday = () => this.weekend(index);
                obj.sub = () => [].concat(this.weekday(index));
                return obj;
            })(new this.$.$mol_calendar_day);
        }
        weekend(index) {
            return false;
        }
        weekday(index) {
            return "";
        }
        Week(row) {
            return ((obj) => {
                obj.sub = () => [].concat(this.week_days(row));
                return obj;
            })(new this.$.$mol_view);
        }
        week_days(row) {
            return [];
        }
        Day(day) {
            return ((obj) => {
                obj.ghost = () => this.day_ghost(day);
                obj.holiday = () => this.day_holiday(day);
                obj.selected = () => this.day_selected(day);
                obj.sub = () => this.day_content(day);
                return obj;
            })(new this.$.$mol_calendar_day);
        }
        day_ghost(day) {
            return false;
        }
        day_holiday(day) {
            return false;
        }
        day_selected(day) {
            return false;
        }
        day_content(day) {
            return [].concat(this.day_text(day));
        }
        day_text(day) {
            return "";
        }
        month_string() {
            return "";
        }
        month_moment() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_time_moment);
        }
    }
    __decorate([
        $.$mol_mem
    ], $mol_calendar.prototype, "Title", null);
    __decorate([
        $.$mol_mem
    ], $mol_calendar.prototype, "Weekdays", null);
    __decorate([
        $.$mol_mem
    ], $mol_calendar.prototype, "Weeks", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_calendar.prototype, "Weekday", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_calendar.prototype, "Week", null);
    __decorate([
        $.$mol_mem_key
    ], $mol_calendar.prototype, "Day", null);
    __decorate([
        $.$mol_mem
    ], $mol_calendar.prototype, "month_moment", null);
    $.$mol_calendar = $mol_calendar;
})($ || ($ = {}));
(function ($) {
    class $mol_calendar_day extends $.$mol_view {
        minimal_height() {
            return 32;
        }
        minimal_width() {
            return 36;
        }
        attr() {
            return ({
                "mol_calendar_holiday": this.holiday(),
                "mol_calendar_ghost": this.ghost(),
                "mol_calendar_selected": this.selected(),
            });
        }
        holiday() {
            return false;
        }
        ghost() {
            return false;
        }
        selected() {
            return false;
        }
    }
    $.$mol_calendar_day = $mol_calendar_day;
})($ || ($ = {}));
//calendar.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        class $mol_calendar extends $.$mol_calendar {
            month_moment() {
                const moment = new $.$mol_time_moment(this.month_string() || undefined);
                return new $.$mol_time_moment({ year: moment.year, month: moment.month });
            }
            title() {
                return this.month_moment().toString('Month YYYY');
            }
            day_first() {
                return this.month_moment().merge({ day: 0 });
            }
            day_last() {
                return this.day_first().shift('P1M');
            }
            day_draw_from() {
                let weekday = this.day_first().weekday;
                return this.day_first().shift({ day: -weekday });
            }
            weekdays() {
                const next = [];
                for (let index = 0; index < 7; ++index) {
                    next.push(this.Weekday(index));
                }
                return next;
            }
            weekday(index) {
                return this.day_draw_from().shift({ day: index }).toString('WD');
            }
            weekend(index) {
                return [5, 6].indexOf(index) >= 0;
            }
            weeks_count() {
                const interval = new $.$mol_time_interval({
                    start: this.day_draw_from(),
                    end: this.day_last(),
                });
                return Math.ceil(interval.duration.count({ day: 7 }));
            }
            weeks() {
                const weeks = [];
                let count = this.weeks_count();
                for (let i = 0; i < count; ++i) {
                    weeks.push(this.Week(i));
                }
                return weeks;
            }
            week_days(index) {
                const days = [];
                let start = this.day_draw_from().shift({ day: index * 7 });
                for (let i = 0; i < 7; ++i) {
                    days.push(this.Day(start.shift({ day: i }).toString('YYYY-MM-DD')));
                }
                return days;
            }
            day_text(day) {
                return new $.$mol_time_moment(day).toString("D");
            }
            day_holiday(day) {
                return this.weekend(new $.$mol_time_moment(day).weekday);
            }
            day_ghost(day) {
                return new $.$mol_time_moment(day).toString('YYYY-MM') !== this.day_first().toString('YYYY-MM');
            }
            day_selected(day) {
                return new $.$mol_time_moment().toString('YYYY-MM-DD') === day;
            }
        }
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "month_moment", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "day_first", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "day_last", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "day_draw_from", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "weekdays", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "weekday", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "weeks_count", null);
        __decorate([
            $.$mol_mem
        ], $mol_calendar.prototype, "weeks", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "week_days", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "day_text", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "day_holiday", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "day_ghost", null);
        __decorate([
            $.$mol_mem_key
        ], $mol_calendar.prototype, "day_selected", null);
        $mol.$mol_calendar = $mol_calendar;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//calendar.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_input_deep extends $.$mol_view {
        autofocus() {
            return false;
        }
        bw_autofocus() {
            return false;
        }
        deep_value(val, force) {
            return (val !== void 0) ? val : 7;
        }
        deep_date() {
            return "";
        }
        sub() {
            return [].concat(this.Input(), this.Output(), this.Space(), this.Button(), this.Calendar());
        }
        input_focused() {
            return this.Input().focused();
        }
        Input() {
            return ((obj) => {
                obj.value = (val) => this.input_text(val);
                obj.autofocus = () => this.autofocus();
                obj.bw_autofocus = () => this.bw_autofocus();
                return obj;
            })(new this.$.$bw_input);
        }
        input_text(val, force) {
            return (val !== void 0) ? val : "";
        }
        Output() {
            return ((obj) => {
                obj.text = () => this.deep_date_text();
                return obj;
            })(new this.$.$bw_label);
        }
        deep_date_text() {
            return "";
        }
        Space() {
            return ((obj) => {
                obj.dom_name = () => "horspace";
                return obj;
            })(new this.$.$mol_view);
        }
        Button() {
            return ((obj) => {
                obj.checked = (val) => this.dropped_down(val);
                obj.sub = () => [].concat(this.Icon());
                return obj;
            })(new this.$.$mol_check);
        }
        dropped_down(val, force) {
            return (val !== void 0) ? val : false;
        }
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_today);
        }
        Calendar() {
            return ((obj) => {
                obj.day_shift = (val) => this.day_shift(val);
                obj.parent_width = () => this.cur_width();
                return obj;
            })(new this.$.$bw_input_deep_calendar);
        }
        day_shift(val, force) {
            return (val !== void 0) ? val : 0;
        }
        pluguns() {
            return [].concat(this.Meter());
        }
        cur_width() {
            return this.Meter().width();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "deep_value", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "input_text", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "Output", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "Space", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "Button", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "dropped_down", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "Calendar", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "day_shift", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep.prototype, "Meter", null);
    $.$bw_input_deep = $bw_input_deep;
})($ || ($ = {}));
(function ($) {
    class $bw_input_deep_calendar extends $.$mol_calendar {
        calendar_day_size() {
            return 31;
        }
        calendar_width() {
            return 0;
        }
        parent_width() {
            return 0;
        }
        day_shift(val, force) {
            return (val !== void 0) ? val : 0;
        }
        shown(val, force) {
            return (val !== void 0) ? val : false;
        }
        deep_moment(val, force) {
            return (val !== void 0) ? val : null;
        }
        current_moment_string(val, force) {
            return (val !== void 0) ? val : "";
        }
        month_shift(val, force) {
            return (val !== void 0) ? val : 0;
        }
        year_shift(val, force) {
            return (val !== void 0) ? val : 0;
        }
        attr() {
            return ({
                "bw_input_deep_calendar_mode": this.mode_attr_value(),
            });
        }
        mode_attr_value() {
            return "";
        }
        pluguns() {
            return [].concat(this.Meter());
        }
        cur_width() {
            return this.Meter().width();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter);
        }
        style() {
            return ({
                "left": this.left_style(),
            });
        }
        left_style() {
            return "";
        }
        sub() {
            return [].concat(this.TitleRow(), this.calendar_content(), this.DropFilterRow());
        }
        TitleRow() {
            return ((obj) => {
                obj.minimal_height = () => 33;
                obj.dom_name = () => "tr";
                obj.sub = () => [].concat(this.TitleCell());
                return obj;
            })(new this.$.$mol_view);
        }
        TitleCell() {
            return ((obj) => {
                obj.sub = () => [].concat(this.TitleContent());
                return obj;
            })(new this.$.$bw_input_deep_calendar_row_cell);
        }
        TitleContent() {
            return ((obj) => {
                obj.sub = () => [].concat(this.PrevMonth(), this.TitleText(), this.NextMonth());
                return obj;
            })(new this.$.$mol_view);
        }
        PrevMonth() {
            return ((obj) => {
                obj.event_click = (val) => this.prev_click(val);
                obj.sub = () => [].concat(this.IconTriangleLeft());
                return obj;
            })(new this.$.$mol_button_minor);
        }
        prev_click(val, force) {
            return (val !== void 0) ? val : null;
        }
        IconTriangleLeft() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_triangle_left);
        }
        TitleText() {
            return ((obj) => {
                obj.title = () => this.title();
                obj.checked = (val) => this.mode(val);
                return obj;
            })(new this.$.$mol_check);
        }
        title() {
            return "";
        }
        mode(val, force) {
            return (val !== void 0) ? val : false;
        }
        NextMonth() {
            return ((obj) => {
                obj.event_click = (val) => this.next_click(val);
                obj.sub = () => [].concat(this.IconTriangleRight());
                return obj;
            })(new this.$.$mol_button_minor);
        }
        next_click(val, force) {
            return (val !== void 0) ? val : null;
        }
        IconTriangleRight() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_triangle_right);
        }
        calendar_content() {
            return [];
        }
        DropFilterRow() {
            return ((obj) => {
                obj.minimal_height = () => 33;
                obj.dom_name = () => "tr";
                obj.sub = () => [].concat(this.DropFilterCell());
                return obj;
            })(new this.$.$mol_view);
        }
        DropFilterCell() {
            return ((obj) => {
                obj.sub = () => [].concat(this.DropFilterButton());
                return obj;
            })(new this.$.$bw_input_deep_calendar_row_cell);
        }
        DropFilterButton() {
            return ((obj) => {
                obj.title = () => "Сбросить фильтр";
                obj.event_click = (val) => this.drop_filter_click(val);
                return obj;
            })(new this.$.$mol_button_minor);
        }
        drop_filter_click(val, force) {
            return (val !== void 0) ? val : null;
        }
        Day(day) {
            return ((obj) => {
                obj.calendar_day_size = () => this.calendar_day_size();
                obj.ghost = () => this.day_ghost(day);
                obj.selected = () => this.day_selected(day);
                obj.checkable = () => this.day_checkable(day);
                obj.sub = () => this.day_content(day);
                return obj;
            })(new this.$.$bw_input_deep_calendar_day);
        }
        day_selected(day) {
            return false;
        }
        day_checkable(day) {
            return true;
        }
        day_content(day) {
            return [].concat(this.DayCheck(day));
        }
        DayCheck(day) {
            return ((obj) => {
                obj.title = () => this.day_text(day);
                obj.event_click = (val) => this.day_click(day, val);
                return obj;
            })(new this.$.$mol_check);
        }
        day_click(day, val, force) {
            return (val !== void 0) ? val : null;
        }
        Months() {
            return ((obj) => {
                obj.rows = () => [].concat(this.months_rows());
                return obj;
            })(new this.$.$mol_list);
        }
        months_rows() {
            return [];
        }
        MonthRow(row) {
            return ((obj) => {
                obj.sub = () => [].concat(this.month_cells(row));
                return obj;
            })(new this.$.$mol_view);
        }
        month_cells(row) {
            return [];
        }
        Month(month) {
            return ((obj) => {
                obj.selected = () => this.month_selected(month);
                obj.checkable = () => this.month_checkable(month);
                obj.sub = () => this.month_content(month);
                return obj;
            })(new this.$.$bw_input_deep_calendar_month);
        }
        month_selected(month) {
            return false;
        }
        month_checkable(month) {
            return true;
        }
        month_content(month) {
            return [].concat(this.MonthCheck(month));
        }
        MonthCheck(month) {
            return ((obj) => {
                obj.title = () => this.month_text(month);
                obj.event_click = (val) => this.month_click(month, val);
                return obj;
            })(new this.$.$mol_check);
        }
        month_text(month) {
            return "";
        }
        month_click(month, val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "day_shift", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "deep_moment", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "current_moment_string", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "month_shift", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "year_shift", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "Meter", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "TitleRow", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "TitleCell", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "TitleContent", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "PrevMonth", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "prev_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "IconTriangleLeft", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "TitleText", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "mode", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "NextMonth", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "next_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "IconTriangleRight", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "DropFilterRow", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "DropFilterCell", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "DropFilterButton", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "drop_filter_click", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_deep_calendar.prototype, "Day", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_deep_calendar.prototype, "DayCheck", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_deep_calendar.prototype, "day_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_input_deep_calendar.prototype, "Months", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_deep_calendar.prototype, "MonthRow", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_deep_calendar.prototype, "Month", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_deep_calendar.prototype, "MonthCheck", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_input_deep_calendar.prototype, "month_click", null);
    $.$bw_input_deep_calendar = $bw_input_deep_calendar;
})($ || ($ = {}));
(function ($) {
    class $bw_input_deep_calendar_day extends $.$mol_calendar_day {
        calendar_day_size() {
            return 0;
        }
        checkable() {
            return true;
        }
        minimal_height() {
            return this.calendar_day_size();
        }
        minimal_width() {
            return this.calendar_day_size();
        }
        attr() {
            return (Object.assign({}, super.attr(), { "bw_input_deep_calendar_checkable": this.checkable() }));
        }
    }
    $.$bw_input_deep_calendar_day = $bw_input_deep_calendar_day;
})($ || ($ = {}));
(function ($) {
    class $bw_input_deep_calendar_month extends $.$mol_view {
        checkable() {
            return true;
        }
        attr() {
            return ({
                "mol_calendar_selected": this.selected(),
                "bw_input_deep_calendar_checkable": this.checkable(),
            });
        }
        selected() {
            return false;
        }
    }
    $.$bw_input_deep_calendar_month = $bw_input_deep_calendar_month;
})($ || ($ = {}));
(function ($) {
    class $bw_input_deep_calendar_row_cell extends $.$mol_view {
        dom_name() {
            return "td";
        }
        attr() {
            return ({
                "colspan": 7,
            });
        }
    }
    $.$bw_input_deep_calendar_row_cell = $bw_input_deep_calendar_row_cell;
})($ || ($ = {}));
//deep.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_input_deep extends $.$bw_input_deep {
            Calendar() {
                const result = !this.dropped_down() ? null : super.Calendar();
                if (result) {
                    result.shown(true);
                }
                return result;
            }
            dropped_down(val, force) {
                if (val !== void 0) {
                }
                return super.dropped_down(val, force);
            }
            deep_date() {
                const result = this.deep_moment().toString('YYYY-MM-DD');
                return result;
            }
            day_shift(val) {
                if (val !== void 0) {
                    new $.$mol_defer(() => this.deep_value(-(val - 1)));
                }
                const result = -(this.deep_value() - 1);
                return result;
            }
            deep_moment() {
                const result = this.current_moment().shift('P' + this.day_shift() + 'D');
                return result;
            }
            current_moment_string(fmt = 'YYYY-MM-DD') {
                const result = new $.$mol_time_moment().toString(fmt);
                return result;
            }
            current_moment() {
                const result = new $.$mol_time_moment(this.current_moment_string());
                return result;
            }
            deep_date_text() {
                const result = 'с ' + this.deep_moment().toString('D Month YYYY');
                return result;
            }
            input_text(val, force) {
                if (val !== void 0) {
                    let deep_value = parseInt(val);
                    if (!isNaN(deep_value)) {
                        this.deep_value(deep_value);
                    }
                }
                let result = this.deep_value();
                if (!this.input_focused()) {
                    result = result + ' ' + $$.plural_word(result, 'день', 'дня', 'дней');
                }
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_input_deep.prototype, "Calendar", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep.prototype, "dropped_down", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep.prototype, "deep_date", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep.prototype, "day_shift", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep.prototype, "deep_moment", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep.prototype, "current_moment_string", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep.prototype, "current_moment", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep.prototype, "deep_date_text", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep.prototype, "input_text", null);
        $$.$bw_input_deep = $bw_input_deep;
        class $bw_input_deep_calendar extends $.$bw_input_deep_calendar {
            shown(val, force) {
                return this['object_host()'].dropped_down(val, force);
            }
            deep_moment() {
                return this['object_host()'].deep_moment();
            }
            current_moment_string(fmt) {
                return this['object_host()'].current_moment_string(fmt);
            }
            left_style() {
                let result;
                const parent_width = this.parent_width();
                if (parent_width == 0) {
                    result = null;
                }
                else {
                    const cur_width = this.cur_width() || this.calendar_width();
                    result = (parent_width - cur_width) + "px";
                }
                return result;
            }
            month_content(month) {
                const result = this.month_checkable(month) ?
                    super.month_content(month) :
                    [this.month_text(month)];
                return result;
            }
            day_content(day) {
                const result = this.day_checkable(day) ?
                    super.day_content(day) :
                    [this.day_text(day)];
                return result;
            }
            month_checkable(month) {
                const result = month <= this.current_moment_string('YYYY-MM');
                return result;
            }
            day_checkable(day) {
                const result = day <= this.current_moment_string() && !this.day_ghost(day);
                return result;
            }
            day_shift_of_day(day) {
                const new_moment = new $.$mol_time_moment(day);
                const new_moment_string = new_moment.toString('YYYY-MM-DD');
                const interval_string = this.current_moment_string() + '/' + new_moment_string;
                const time_interval = new $.$mol_time_interval(interval_string);
                const result = time_interval.duration.count('P1D');
                return result;
            }
            day_click(day, val, force) {
                if (val !== void 0) {
                    this.shown(false);
                    this.day_shift(this.day_shift_of_day(day));
                }
                return (val !== void 0) ? val : null;
            }
            title() {
                const result = this.mode() ? this.year_moment().toString('YYYY') : this.month_moment().toString('Month YYYY');
                return result;
            }
            mode_attr_value() {
                const result = this.mode() ? 'month' : 'day';
                return result;
            }
            month_shift(val, force) {
                if (val !== undefined) {
                    this.year_shift(0);
                }
                return super.month_shift(val);
            }
            month_moment() {
                const moment = new $.$mol_time_moment(this.deep_moment().toString('YYYY-MM'));
                let result = moment.shift('P' + this.month_shift() + 'M');
                return result;
            }
            year_moment() {
                const moment = new $.$mol_time_moment(this.month_moment().toString('YYYY'));
                let result = moment.shift('P' + this.year_shift() + 'Y');
                return result;
            }
            prev_next_click(val) {
                new $.$mol_defer(() => this.mode() ?
                    this.year_shift(this.year_shift() + val) :
                    this.month_shift(this.month_shift() + val));
            }
            prev_click(val, force) {
                if (val !== void 0) {
                    this.prev_next_click(-1);
                }
                return (val !== void 0) ? val : null;
            }
            next_click(val, force) {
                if (val !== void 0) {
                    this.prev_next_click(+1);
                }
                return (val !== void 0) ? val : null;
            }
            calendar_content() {
                const result = this.mode() ?
                    [this.Months()] :
                    [].concat(this.Weekdays(), this.Weeks());
                return result;
            }
            months_rows() {
                const result = [];
                for (let i = 0; i < 6; ++i) {
                    result.push(this.MonthRow(i));
                }
                return result;
            }
            month_cells(row) {
                const result = [];
                let start = new $.$mol_time_moment({ year: this.year_moment().year, month: 0 + row * 2 });
                for (let i = 0; i < 2; ++i) {
                    result.push(this.Month(start.shift({ month: i }).toString('YYYY-MM')));
                }
                return result;
            }
            month_text(month) {
                const result = new $.$mol_time_moment(month).toString("Month");
                return result;
            }
            month_click(month, val, force) {
                if (val !== void 0) {
                    const new_moment = new $.$mol_time_moment(month);
                    const interval_string = this.month_moment().toString('YYYY-MM') + '/' + new_moment.toString('YYYY-MM');
                    const time_interval = new $.$mol_time_interval(interval_string);
                    const month_shift_delta = Math.round(time_interval.duration.count('P1M'));
                    this.month_shift(this.month_shift() + month_shift_delta);
                    this.mode(false);
                }
                return (val !== void 0) ? val : null;
            }
            day_selected(day) {
                const result = day == this.deep_moment().toString('YYYY-MM-DD');
                return result;
            }
            month_selected(month) {
                const result = month == this.month_moment().toString('YYYY-MM');
                return result;
            }
            drop_filter_click(val, force) {
                if (val !== void 0) {
                    this.day_shift(0);
                    this.shown(false);
                }
                return (val !== void 0) ? val : null;
            }
            calendar_width() {
                return this.calendar_day_size() * 7;
            }
        }
        __decorate([
            $$.$bw_false_on_outside_click
        ], $bw_input_deep_calendar.prototype, "shown", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep_calendar.prototype, "left_style", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "month_content", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "day_content", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "month_checkable", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "day_checkable", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "day_click", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep_calendar.prototype, "mode_attr_value", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep_calendar.prototype, "month_shift", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep_calendar.prototype, "month_moment", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep_calendar.prototype, "year_moment", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep_calendar.prototype, "prev_click", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep_calendar.prototype, "next_click", null);
        __decorate([
            $.$mol_mem
        ], $bw_input_deep_calendar.prototype, "months_rows", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "month_cells", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "month_text", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "month_click", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "day_selected", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_input_deep_calendar.prototype, "month_selected", null);
        $$.$bw_input_deep_calendar = $bw_input_deep_calendar;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//deep.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_modal extends $.$mol_view {
        content() {
            return [];
        }
        shown(val, force) {
            return (val !== void 0) ? val : false;
        }
        sub() {
            return [].concat(this.Inner());
        }
        Inner() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Overlay(), this.Form());
                return obj;
            })(new this.$.$mol_view);
        }
        Overlay() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_view);
        }
        Form() {
            return ((obj) => {
                obj.dom_name = () => "form";
                obj.attr = () => ({
                    "bw_form_shown": this.bw_form_shown(),
                });
                obj.sub = () => this.content();
                return obj;
            })(new this.$.$mol_view);
        }
        bw_form_shown() {
            return this.shown();
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_modal.prototype, "shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_modal.prototype, "Inner", null);
    __decorate([
        $.$mol_mem
    ], $bw_modal.prototype, "Overlay", null);
    __decorate([
        $.$mol_mem
    ], $bw_modal.prototype, "Form", null);
    $.$bw_modal = $bw_modal;
})($ || ($ = {}));
//modal.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_modal extends $.$bw_modal {
            bw_form_shown() {
                const result = super.bw_form_shown();
                if (result) {
                    $$.do_autofocus(this);
                }
                return result;
            }
            Inner() {
                let ancesctors = [];
                let ancestor = this['object_host()'].dom_node();
                while (ancestor) {
                    const overflow = ancestor.style.overflow;
                    ancesctors.push({ ancestor, overflow });
                    ancestor.style.overflow = 'hidden';
                    ancestor = ancestor.parentElement;
                }
                const dom_node = this.dom_node();
                const observer = new MutationObserver((mutation, observer) => {
                    let result = false;
                    for (let j = 0; !result && j < mutation.length; j++) {
                        const removedNodes = mutation[j].removedNodes;
                        const len = removedNodes.length;
                        for (let i = 0; !result && i < len; i++) {
                            result = $$.$bw_is_self_or_descendant(dom_node, removedNodes.item(i));
                        }
                    }
                    if (result) {
                        ancesctors.forEach(({ ancestor, overflow }) => {
                            ancestor.style.overflow = overflow;
                        });
                        observer.disconnect();
                    }
                });
                observer.observe(document, { childList: true, subtree: true });
                return super.Inner();
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_modal.prototype, "bw_form_shown", null);
        __decorate([
            $.$mol_mem
        ], $bw_modal.prototype, "Inner", null);
        $$.$bw_modal = $bw_modal;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//modal.view.js.map
;
"use strict";
var $;
(function ($) {
    class $bw_header extends $.$mol_view {
        text() {
            return "";
        }
        sub() {
            return [].concat(this.text());
        }
    }
    $.$bw_header = $bw_header;
})($ || ($ = {}));
//header.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_button_close extends $.$mol_button_minor {
        sub() {
            return [].concat(this.Icon());
        }
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_close_btn);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_button_close.prototype, "Icon", null);
    $.$bw_button_close = $bw_button_close;
})($ || ($ = {}));
//close.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_button_close extends $.$bw_button_close {
        }
        $$.$bw_button_close = $bw_button_close;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//close.view.js.map
;
"use strict";
var $;
(function ($) {
    class $bw_input_textarea extends $.$bw_input {
        dom_name() {
            return "textarea";
        }
    }
    $.$bw_input_textarea = $bw_input_textarea;
})($ || ($ = {}));
//textarea.view.tree.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_input_textarea extends $.$bw_input_textarea {
            ctrlKeyForEnter() {
                return true;
            }
        }
        $$.$bw_input_textarea = $bw_input_textarea;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//textarea.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_settings extends $.$mol_view {
        blocks() {
            return ({
                "search": ({
                    "switch_title": "Настройка поиска",
                    "block": this.Search(),
                }),
                "personal": ({
                    "switch_title": "Личные данные",
                    "block": this.Personal(),
                }),
                "profile": ({
                    "switch_title": "Настройка профиля",
                    "block": this.Profile(),
                }),
                "blacklist": ({
                    "switch_title": "Черный список",
                    "block": this.Blacklist(),
                }),
            });
        }
        Search() {
            return ((obj) => {
                obj.selected_block = (val) => this.selected_block(val);
                obj.block_name = () => "search";
                obj.block_title = () => "Настройка поиска";
                return obj;
            })(new this.$.$bw_settings_search_block);
        }
        Personal() {
            return ((obj) => {
                obj.selected_block = (val) => this.selected_block(val);
                obj.block_name = () => "personal";
                obj.block_title = () => "Личные данные";
                return obj;
            })(new this.$.$bw_settings_personal_block);
        }
        Profile() {
            return ((obj) => {
                obj.selected_block = (val) => this.selected_block(val);
                obj.block_name = () => "profile";
                obj.block_title = () => "Настройка профиля";
                return obj;
            })(new this.$.$bw_settings_profile_block);
        }
        Blacklist() {
            return ((obj) => {
                obj.selected_block = (val) => this.selected_block(val);
                obj.block_name = () => "blacklist";
                obj.block_title = () => "Черный список телефонов";
                obj.workspace_content_height = () => this.workspace_content_height();
                return obj;
            })(new this.$.$bw_settings_blacklist_block);
        }
        sub() {
            return [].concat(this.Menu(), this.Content());
        }
        Menu() {
            return ((obj) => {
                obj.value = (val) => this.selected_block(val);
                obj.options = () => this.menu_options();
                obj.option_enabled = (id) => this.menu_option_enabled(id);
                return obj;
            })(new this.$.$mol_switch);
        }
        selected_block(val, force) {
            return (val !== void 0) ? val : "search";
        }
        menu_options() {
            return ({});
        }
        menu_option_enabled(id) {
            return true;
        }
        workspace_content_height() {
            return this.Content().content_height();
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Narrow(), this.Wide());
                obj.event = () => ({
                    "scroll": (event) => this.content_scroll(event),
                });
                return obj;
            })(new this.$.$bw_settings_content);
        }
        Narrow() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Search(), this.Personal(), this.Profile());
                return obj;
            })(new this.$.$mol_view);
        }
        Wide() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Blacklist());
                return obj;
            })(new this.$.$mol_view);
        }
        content_scroll(event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "Search", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "Personal", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "Profile", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "Blacklist", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "selected_block", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "Narrow", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "Wide", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings.prototype, "content_scroll", null);
    $.$bw_settings = $bw_settings;
})($ || ($ = {}));
(function ($) {
    class $bw_settings_content extends $.$mol_view {
        plugins() {
            return [].concat(this.Meter());
        }
        content_height() {
            return this.Meter().height();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_settings_content.prototype, "Meter", null);
    $.$bw_settings_content = $bw_settings_content;
})($ || ($ = {}));
(function ($) {
    class $bw_settings_search_block extends $.$bw_block {
        content() {
            return [].concat(this.SearchDeep(), this.Nova(), this.Apartments(), this.Sold());
        }
        SearchDeep() {
            return ((obj) => {
                obj.label = () => "Глубина поиска";
                obj.Control = () => this.SearchDeepControl();
                return obj;
            })(new this.$.$bw_field);
        }
        SearchDeepControl() {
            return ((obj) => {
                obj.bw_autofocus = () => true;
                obj.deep_value = (val) => this.deep_value(val);
                return obj;
            })(new this.$.$bw_input_deep);
        }
        deep_value(val, force) {
            return (val !== void 0) ? val : 7;
        }
        Nova() {
            return ((obj) => {
                obj.label = () => "Новостройки";
                obj.Control = () => this.NovaControl();
                return obj;
            })(new this.$.$bw_field);
        }
        NovaControl() {
            return ((obj) => {
                obj.selected = (val) => this.selected_nova(val);
                obj.options = () => this.options_nova();
                return obj;
            })(new this.$.$bw_input_combo);
        }
        selected_nova(val, force) {
            return (val !== void 0) ? val : "";
        }
        options_nova() {
            return ({});
        }
        Apartments() {
            return ((obj) => {
                obj.label = () => "Апартаменты";
                obj.Control = () => this.ApartmentsControl();
                return obj;
            })(new this.$.$bw_field);
        }
        ApartmentsControl() {
            return ((obj) => {
                obj.selected = (val) => this.selected_apartments(val);
                obj.options = () => this.options_apartments();
                return obj;
            })(new this.$.$bw_input_combo);
        }
        selected_apartments(val, force) {
            return (val !== void 0) ? val : "";
        }
        options_apartments() {
            return ({});
        }
        Sold() {
            return ((obj) => {
                obj.label = () => "Снятые с продажи";
                obj.Control = () => this.SoldControl();
                return obj;
            })(new this.$.$bw_field);
        }
        SoldControl() {
            return ((obj) => {
                obj.selected = (val) => this.selected_sold(val);
                obj.options = () => this.options_sold();
                return obj;
            })(new this.$.$bw_input_combo);
        }
        selected_sold(val, force) {
            return (val !== void 0) ? val : "";
        }
        options_sold() {
            return ({});
        }
        button_bar_content() {
            return [].concat(this.Button());
        }
        Button() {
            return ((obj) => {
                obj.title = () => "Сохранить";
                return obj;
            })(new this.$.$bw_button_major);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "SearchDeep", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "SearchDeepControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "deep_value", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "Nova", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "NovaControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "selected_nova", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "Apartments", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "ApartmentsControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "selected_apartments", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "Sold", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "SoldControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "selected_sold", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_search_block.prototype, "Button", null);
    $.$bw_settings_search_block = $bw_settings_search_block;
})($ || ($ = {}));
(function ($) {
    class $bw_settings_personal_block extends $.$bw_block {
        dom_name() {
            return "form";
        }
        content() {
            return [].concat(this.Name(), this.Phone(), this.Email(), this.Pass());
        }
        Name() {
            return ((obj) => {
                obj.label = () => "ФИО";
                obj.Control = () => this.NameControl();
                return obj;
            })(new this.$.$bw_field);
        }
        NameControl() {
            return ((obj) => {
                obj.disabled = () => true;
                obj.value = (val) => this.name();
                return obj;
            })(new this.$.$bw_input);
        }
        name() {
            return "Новосельцев Станислав Игоревич";
        }
        Phone() {
            return ((obj) => {
                obj.label = () => "Телефон";
                obj.Control = () => this.PhoneControl();
                return obj;
            })(new this.$.$bw_field);
        }
        PhoneControl() {
            return ((obj) => {
                obj.value = (val) => this.phone();
                obj.disabled = () => true;
                return obj;
            })(new this.$.$bw_input);
        }
        phone() {
            return "+7 (978) 072-23-90";
        }
        Email() {
            return ((obj) => {
                obj.label = () => "E-mail";
                obj.Control = () => this.EmailControl();
                return obj;
            })(new this.$.$bw_field);
        }
        EmailControl() {
            return ((obj) => {
                obj.disabled = () => true;
                obj.autocomplete = () => "username";
                obj.value = (val) => this.email();
                return obj;
            })(new this.$.$bw_input);
        }
        email() {
            return "novoseltsev.st@gmail.com";
        }
        Pass() {
            return ((obj) => {
                obj.label = () => "Пароль";
                obj.Control = () => this.PassControl();
                return obj;
            })(new this.$.$bw_field);
        }
        PassControl() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Input(), this.Link());
                return obj;
            })(new this.$.$mol_view);
        }
        Input() {
            return ((obj) => {
                obj.value = (val) => this.pass();
                obj.type = (val) => "password";
                obj.autocomplete = () => "current-password";
                return obj;
            })(new this.$.$bw_input);
        }
        pass() {
            return "************";
        }
        Link() {
            return ((obj) => {
                obj.title = () => "редактировать";
                obj.current = () => false;
                return obj;
            })(new this.$.$bw_link);
        }
        button_bar_content() {
            return [].concat(this.Button());
        }
        Button() {
            return ((obj) => {
                obj.title = () => "Сохранить";
                return obj;
            })(new this.$.$bw_button_major);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "Name", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "NameControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "Phone", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "PhoneControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "Email", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "EmailControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "Pass", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "PassControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "Link", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_personal_block.prototype, "Button", null);
    $.$bw_settings_personal_block = $bw_settings_personal_block;
})($ || ($ = {}));
(function ($) {
    class $bw_settings_profile_block extends $.$bw_block {
        sub() {
            return [].concat(this.LeftSpace(), this.Inner(), this.RightSpace());
        }
        Inner() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Header(), this.GreenText(), this.Content(), this.ButtonBar());
                return obj;
            })(new this.$.$mol_view);
        }
        GreenText() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Para0(), this.Para1());
                return obj;
            })(new this.$.$mol_view);
        }
        Para0() {
            return ((obj) => {
                obj.sub = () => [].concat("Вы не раскрыли свое лицо! Ваши объявления публикуются в белой зоне Базы WinNER (в подвале выборки).");
                return obj;
            })(new this.$.$mol_view);
        }
        Para1() {
            return ((obj) => {
                obj.sub = () => [].concat("Для публикации в \"зеленой зоне\" Вам необходимо раскрыть свое лицо. Публикация в \"зеленой зоне\" бесплатна для действующих клиентов.");
                return obj;
            })(new this.$.$mol_view);
        }
        content() {
            return [].concat(this.GreenName(), this.GreenLink());
        }
        GreenName() {
            return ((obj) => {
                obj.label = () => "Наименование";
                obj.Control = () => this.GreenNameControl();
                return obj;
            })(new this.$.$bw_field);
        }
        GreenNameControl() {
            return ((obj) => {
                obj.value = (val) => this.green_name(val);
                obj.bw_autofocus = () => this.green_name_autofocus();
                return obj;
            })(new this.$.$bw_input);
        }
        green_name(val, force) {
            return (val !== void 0) ? val : "";
        }
        green_name_autofocus() {
            return true;
        }
        GreenLink() {
            return ((obj) => {
                obj.label = () => "Ссылка на сайт";
                obj.Control = () => this.GreenLinkControl();
                return obj;
            })(new this.$.$bw_field);
        }
        GreenLinkControl() {
            return ((obj) => {
                obj.value = (val) => this.green_link(val);
                obj.bw_autofocus = () => this.green_link_autofocus();
                return obj;
            })(new this.$.$bw_input);
        }
        green_link(val, force) {
            return (val !== void 0) ? val : "";
        }
        green_link_autofocus() {
            return false;
        }
        button_bar_content() {
            return [].concat(this.Button());
        }
        Button() {
            return ((obj) => {
                obj.title = () => "Отправить";
                return obj;
            })(new this.$.$bw_button_major);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "Inner", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "GreenText", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "Para0", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "Para1", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "GreenName", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "GreenNameControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "green_name", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "GreenLink", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "GreenLinkControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "green_link", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_profile_block.prototype, "Button", null);
    $.$bw_settings_profile_block = $bw_settings_profile_block;
})($ || ($ = {}));
(function ($) {
    class $bw_settings_blacklist_block extends $.$bw_block {
        workspace_content_height() {
            return 0;
        }
        ButtonBarAddon() {
            return ((obj) => {
                obj.Icon = () => ((obj) => {
                    return obj;
                })(new this.$.$bw_icon_trash);
                return obj;
            })(new this.$.$bw_button_major);
        }
        data(val, force) {
            return (val !== void 0) ? val : null;
        }
        content() {
            return [].concat(this.Grid(), this.AddModal());
        }
        grid_height() {
            return this.Grid().grid_height();
        }
        Grid() {
            return ((obj) => {
                obj.bw_autofocus = () => true;
                obj.records_modify = (val) => this.records_modify(val);
                obj.records = (val) => this.records(val);
                obj.rec_id_to_del = (val) => this.rec_id_to_del(val);
                obj.rec_id_to_edit = (val) => this.rec_id_to_edit(val);
                obj.filter = () => this.filter();
                obj.filter_phone = (val) => this.filter_phone(val);
                obj.filter_description = (val) => this.filter_description(val);
                obj.workspace_content_height = () => this.workspace_content_height();
                return obj;
            })(new this.$.$bw_settings_blacklist_block_grid);
        }
        records_modify(val, force) {
            return (val !== void 0) ? val : null;
        }
        records(val, force) {
            return (val !== void 0) ? val : null;
        }
        rec_id_to_del(val, force) {
            return (val !== void 0) ? val : 0;
        }
        rec_id_to_edit(val, force) {
            return (val !== void 0) ? val : null;
        }
        filter() {
            return null;
        }
        filter_phone(val, force) {
            return (val !== void 0) ? val : "";
        }
        filter_description(val, force) {
            return (val !== void 0) ? val : "";
        }
        AddModal() {
            return ((obj) => {
                obj.shown = (val) => this.add_form_shown(val);
                obj.phone_number = (val) => this.phone_number(val);
                obj.phone_desc = (val) => this.phone_desc(val);
                obj.title = () => this.add_modal_title();
                return obj;
            })(new this.$.$bw_settings_blacklist_block_add_modal);
        }
        add_form_shown(val, force) {
            return (val !== void 0) ? val : false;
        }
        phone_number(val, force) {
            return (val !== void 0) ? val : "";
        }
        phone_desc(val, force) {
            return (val !== void 0) ? val : "";
        }
        add_modal_title() {
            return "";
        }
        button_bar_content() {
            return [].concat(this.Button(), this.TrashButton());
        }
        Button() {
            return ((obj) => {
                obj.title = () => "Добавить";
                obj.event_click = (event) => this.add_click(event);
                return obj;
            })(new this.$.$bw_button_major);
        }
        add_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        TrashButton() {
            return ((obj) => {
                obj.Icon = () => ((obj) => {
                    return obj;
                })(new this.$.$bw_icon_trash);
                obj.event_click = (event) => this.del_click(event);
                return obj;
            })(new this.$.$bw_button_major);
        }
        del_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        attr() {
            return (Object.assign({}, super.attr(), { "bw_grid_height": this.grid_height() }));
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "ButtonBarAddon", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "data", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "Grid", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "records_modify", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "records", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "rec_id_to_del", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "rec_id_to_edit", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "filter_phone", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "filter_description", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "AddModal", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "add_form_shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "phone_number", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "phone_desc", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "Button", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "add_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "TrashButton", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block.prototype, "del_click", null);
    $.$bw_settings_blacklist_block = $bw_settings_blacklist_block;
})($ || ($ = {}));
(function ($) {
    class $bw_settings_blacklist_block_add_modal extends $.$bw_modal {
        phone_number(val, force) {
            return (val !== void 0) ? val : "";
        }
        phone_desc(val, force) {
            return (val !== void 0) ? val : "";
        }
        is_new_record_to_edit() {
            return true;
        }
        title() {
            return "Добавление телефона";
        }
        content() {
            return [].concat(this.HeaderBar(), this.Content(), this.ButtonBar());
        }
        HeaderBar() {
            return ((obj) => {
                obj.sub = () => [].concat(this.HeaderContent());
                return obj;
            })(new this.$.$mol_view);
        }
        HeaderContent() {
            return ((obj) => {
                obj.sub = () => [].concat(this.HeaderTitle(), this.CloseButton());
                return obj;
            })(new this.$.$mol_view);
        }
        HeaderTitle() {
            return ((obj) => {
                obj.text = () => this.title();
                return obj;
            })(new this.$.$bw_header);
        }
        CloseButton() {
            return ((obj) => {
                obj.event_click = (event) => this.close_button_click(event);
                return obj;
            })(new this.$.$bw_button_close);
        }
        close_button_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [].concat(this.PhoneNumber(), this.PhoneDescription());
                return obj;
            })(new this.$.$mol_view);
        }
        PhoneNumber() {
            return ((obj) => {
                obj.hint = () => "Введите телефон";
                obj.bw_autofocus = () => this.phone_autofocus();
                obj.value = (val) => this.phone_number(val);
                return obj;
            })(new this.$.$bw_input);
        }
        phone_autofocus() {
            return true;
        }
        PhoneDescription() {
            return ((obj) => {
                obj.hint = () => "Введите описание";
                obj.bw_autofocus = () => this.description_autofocus();
                obj.value = (val) => this.phone_desc(val);
                return obj;
            })(new this.$.$bw_input_textarea);
        }
        description_autofocus() {
            return false;
        }
        ButtonBar() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Button());
                return obj;
            })(new this.$.$mol_view);
        }
        Button() {
            return ((obj) => {
                obj.title = () => "Сохранить";
                obj.event_click = (event) => this.event_click(event);
                return obj;
            })(new this.$.$bw_button_major);
        }
        event_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        plugins() {
            return [].concat(this.Vim());
        }
        Vim() {
            return ((obj) => {
                return obj;
            })(new this.$.$$.$bw_vim);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "phone_number", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "phone_desc", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "HeaderBar", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "HeaderContent", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "HeaderTitle", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "CloseButton", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "close_button_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "PhoneNumber", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "PhoneDescription", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "ButtonBar", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "Button", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "event_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_add_modal.prototype, "Vim", null);
    $.$bw_settings_blacklist_block_add_modal = $bw_settings_blacklist_block_add_modal;
})($ || ($ = {}));
(function ($) {
    class $bw_settings_blacklist_block_grid extends $.$$.$bw_grid {
        dom_name() {
            return "div";
        }
        checked_all(val, force) {
            return (val !== void 0) ? val : false;
        }
        rec_id_to_del(val, force) {
            return (val !== void 0) ? val : 0;
        }
        rec_id_to_edit(val, force) {
            return (val !== void 0) ? val : 0;
        }
        filter_phone(val, force) {
            return (val !== void 0) ? val : "";
        }
        filter_description(val, force) {
            return (val !== void 0) ? val : "";
        }
        workspace_content_height() {
            return 0;
        }
        Col_head(id) {
            return ((obj) => {
                obj.dom_name = () => "th";
                obj.sub = () => [].concat(this.col_head_content(id));
                return obj;
            })(new this.$.$mol_float);
        }
        col_head_content(id) {
            return [];
        }
        row_height() {
            return 44;
        }
        row_spacing() {
            return 1;
        }
        col_ids() {
            return [].concat("check-box", "phone", "description", "author", "buttons");
        }
        PhoneColumn(colId) {
            return ((obj) => {
                obj.title = () => "Телефон";
                obj.filter = (val) => this.filter_phone(val);
                return obj;
            })(new this.$.$bw_grid_column_filterable);
        }
        DescriptionColumn(colId) {
            return ((obj) => {
                obj.title = () => "Описание";
                obj.filter = (val) => this.filter_description(val);
                return obj;
            })(new this.$.$bw_grid_column_filterable);
        }
        SearchIcon(colId) {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_search);
        }
        CheckBoxCell(id) {
            return ((obj) => {
                obj.dom_name = () => "td";
                obj.sub = () => [].concat(this.CheckBox(id));
                return obj;
            })(new this.$.$mol_view);
        }
        CheckBox(id) {
            return ((obj) => {
                obj.checked = (val) => this.checked(id, val);
                obj.event_click = (event) => this.check_box_cell_click(id, event);
                return obj;
            })(new this.$.$mol_check_box);
        }
        checked(id, val, force) {
            return (val !== void 0) ? val : false;
        }
        check_box_cell_click(id, event, force) {
            return (event !== void 0) ? event : null;
        }
        ButtonsCell(row_id) {
            return ((obj) => {
                obj.dom_name = () => "td";
                obj.sub = () => [].concat(this.EditButton(row_id), this.DeleteButton(row_id));
                return obj;
            })(new this.$.$mol_view);
        }
        EditButton(row_id) {
            return ((obj) => {
                obj.Icon = () => ((obj) => {
                    return obj;
                })(new this.$.$bw_icon_edit);
                obj.event_click = (event) => this.edit_click(row_id, event);
                return obj;
            })(new this.$.$bw_button_major);
        }
        edit_click(row_id, event, force) {
            return (event !== void 0) ? event : null;
        }
        DeleteButton(row_id) {
            return ((obj) => {
                obj.Icon = () => ((obj) => {
                    return obj;
                })(new this.$.$bw_icon_trash);
                obj.event_click = (event) => this.del_click(row_id, event);
                return obj;
            })(new this.$.$bw_button_major);
        }
        del_click(row_id, event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_grid.prototype, "checked_all", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_grid.prototype, "rec_id_to_del", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_grid.prototype, "rec_id_to_edit", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_grid.prototype, "filter_phone", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_blacklist_block_grid.prototype, "filter_description", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "Col_head", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "PhoneColumn", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "DescriptionColumn", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "SearchIcon", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "CheckBoxCell", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "CheckBox", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "checked", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "check_box_cell_click", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "ButtonsCell", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "EditButton", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "edit_click", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "DeleteButton", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_settings_blacklist_block_grid.prototype, "del_click", null);
    $.$bw_settings_blacklist_block_grid = $bw_settings_blacklist_block_grid;
})($ || ($ = {}));
//settings.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_settings extends $.$bw_settings {
            constructor() {
                super(...arguments);
                this._lastScrollTop = 0;
            }
            _content_scroll(dom_node) {
                const scrollTop = dom_node.scrollTop;
                const scrollDelta = scrollTop - this._lastScrollTop;
                this._lastScrollTop = scrollTop;
                if (!dom_node.stopSmoothScroll) {
                    clearTimeout(this._scrollingTimer);
                    this._scrollingTimer = setTimeout(() => {
                        const clientHeight = dom_node.clientHeight;
                        const scrollBottom = scrollTop + clientHeight;
                        let block;
                        if (scrollDelta > 0) {
                            const items = [...dom_node.querySelectorAll('[bw_block]')]
                                .map((node) => node)
                                .map((node) => {
                                const caption = node.querySelector('[bw_block_caption]');
                                return {
                                    node,
                                    offsetTop: $$.actualOffset(node, dom_node).y,
                                    offsetBottom: $$.actualOffset(caption, dom_node).y + caption.offsetHeight,
                                };
                            })
                                .filter((value) => value.offsetBottom > scrollTop && value.offsetTop < scrollBottom)
                                .sort((a, b) => (a.offsetTop - b.offsetTop) || (a.node.offsetLeft - b.node.offsetLeft));
                            if (items.length && items[0].offsetTop >= scrollTop) {
                                block = items[0].node;
                            }
                        }
                        else if (scrollDelta < 0) {
                            const items = [...dom_node.querySelectorAll('[bw_block]')]
                                .map((node) => node)
                                .map((node) => {
                                const offsetTop = $$.actualOffset(node, dom_node).y;
                                return {
                                    node,
                                    offsetTop: offsetTop,
                                    offsetBottom: offsetTop + node.offsetHeight,
                                };
                            })
                                .filter((value) => value.offsetBottom > scrollTop && value.offsetBottom < scrollBottom)
                                .sort((a, b) => (b.offsetTop - a.offsetTop) || (a.node.offsetLeft - b.node.offsetLeft));
                            if (items.length && items[0].offsetTop <= scrollTop) {
                                block = items[0].node;
                            }
                        }
                        if (block) {
                            new $.$mol_defer(() => {
                                const block_name = block.getAttribute('bw_block_name');
                                this.selected_block(block_name);
                            });
                        }
                    }, 30);
                }
            }
            content_scroll(event) {
                const dom_node = event.target;
                if (dom_node == this.Content().dom_node()) {
                    new $.$mol_defer(() => this._content_scroll(dom_node));
                }
            }
            menu_option_enabled(id) {
                return id != this.selected_block();
            }
            menu_options() {
                const blocks = this.blocks();
                const result = Object.keys(blocks)
                    .reduce((accu, key) => (Object.assign({}, accu, { [key]: blocks[key].switch_title })), {});
                return result;
            }
            selected_block(val, force) {
                const result = super.selected_block();
                if (val === void 0) {
                    return result;
                }
                else {
                    if (result !== val) {
                        super.selected_block(val, force);
                        new $.$mol_defer(() => {
                            const blocks = this.blocks();
                            const block = blocks[val].block;
                            const activeElement = document.activeElement;
                            if (activeElement)
                                activeElement.blur();
                            $$.adjustOffsetParentScrollTop(block, {
                                margin: 16,
                                after: () => $$.do_autofocus(block),
                            });
                        });
                    }
                    return val;
                }
            }
        }
        __decorate([
            $$.$bw_session
        ], $bw_settings.prototype, "selected_block", null);
        $$.$bw_settings = $bw_settings;
        class $bw_settings_search_block extends $.$bw_settings_search_block {
            selected_nova(val, force) {
                return super.selected_nova(val, force) || Object.keys(this.options_nova())[0];
            }
            options_nova() {
                return {
                    'include': { title: 'Включая новостройки' },
                    'only': { title: 'Только новостройки' },
                    'except': { title: 'Кроме новостроек' },
                };
            }
            selected_apartments(val, force) {
                return super.selected_apartments(val, force) || Object.keys(this.options_apartments())[0];
            }
            options_apartments() {
                return {
                    'include': { title: 'Включая апартаменты' },
                    'only': { title: 'Только апартаменты' },
                    'except': { title: 'Кроме апартаментов' },
                };
            }
            selected_sold(val, force) {
                return super.selected_sold(val, force) || Object.keys(this.options_sold())[0];
            }
            options_sold() {
                return {
                    'except': { title: 'Кроме снятых с продажи/аренды' },
                    'include': { title: 'Включая снятые с продажи/аренды' },
                    'only': { title: 'Только снятые с продажи/аренды' },
                };
            }
            deep_value(val, force) {
                return super.deep_value(val, force);
            }
        }
        __decorate([
            $$.$bw_local
        ], $bw_settings_search_block.prototype, "selected_nova", null);
        __decorate([
            $$.$bw_local
        ], $bw_settings_search_block.prototype, "selected_apartments", null);
        __decorate([
            $$.$bw_local
        ], $bw_settings_search_block.prototype, "selected_sold", null);
        __decorate([
            $$.$bw_local
        ], $bw_settings_search_block.prototype, "deep_value", null);
        $$.$bw_settings_search_block = $bw_settings_search_block;
        class $bw_settings_profile_block extends $.$bw_settings_profile_block {
            green_name_autofocus() {
                const result = !this.green_name() || !!this.green_link();
                return result;
            }
            green_link_autofocus() {
                const result = !!this.green_name() && !this.green_link();
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_settings_profile_block.prototype, "green_name_autofocus", null);
        __decorate([
            $.$mol_mem
        ], $bw_settings_profile_block.prototype, "green_link_autofocus", null);
        $$.$bw_settings_profile_block = $bw_settings_profile_block;
        class $bw_settings_blacklist_block extends $.$bw_settings_blacklist_block {
            records_modify(val) {
                if (val !== void 0) {
                    if (val && val.state === 0) {
                        if (val.kind == 1) {
                            this.phone_number('');
                            this.phone_desc('');
                        }
                        else {
                            let phone = '';
                            let description = '';
                            const records = val.records;
                            if (records) {
                                const rec_id = records.keys().next().value;
                                if (rec_id) {
                                    const record = records.get(rec_id);
                                    phone = record.phone;
                                    description = record.description;
                                }
                            }
                            this.phone_number(phone);
                            this.phone_desc(description);
                        }
                    }
                }
                return super.records_modify(val);
            }
            grid_height() {
                const result = super.grid_height();
                if (result) {
                    new $.$mol_defer(() => $$.adjustOffsetParentScrollTop(this, { margin: 16 }));
                }
                return result;
            }
            AddModal() {
                const result = !this.add_form_shown() ? null : super.AddModal();
                return result;
            }
            add_click(event, force) {
                if (event !== void 0) {
                    this.Grid().new_record();
                }
                return super.add_click(event, force);
            }
            add_form_shown(val) {
                const records_modify = this.records_modify();
                return records_modify && records_modify.state == 0;
            }
            del_click(val, force) {
                this.Grid().cmd_del();
            }
            cancel_records() {
                this.records_modify(null);
            }
            commit_records() {
                const records_modify = this.records_modify();
                if (records_modify) {
                    const data = this.data();
                    let records = new Map();
                    if (records_modify.kind == 0) {
                        if (records_modify.records) {
                            const rec_id = records_modify.records.keys().next().value;
                            if (rec_id) {
                                records.set(rec_id, {
                                    phone: this.phone_number(),
                                    description: this.phone_desc(),
                                    author: 'Новосельцев Станислав Игоревич',
                                });
                            }
                        }
                    }
                    else {
                        records.set(data.nextId, {
                            phone: this.phone_number(),
                            description: this.phone_desc(),
                            author: 'Новосельцев Станислав Игоревич',
                        });
                    }
                    const records_new = Object.assign({}, records_modify, { state: 1, records });
                    this.records_modify(records_new);
                }
            }
            data(val, force) {
                let result = super.data(val, force) || { nextId: 0, records: new Map() };
                return result;
            }
            data_store(val) {
                const result = { nextId: val.nextId, records: [...val.records.entries()] };
                return result;
            }
            data_restore(val_store) {
                let result = null;
                if (val_store && typeof val_store == 'object') {
                    result = { nextId: val_store.nextId, records: new Map(val_store.records) };
                }
                return result;
            }
            data_equal(a, b) {
                if (a === b)
                    return true;
                if (a.nextId !== b.nextId)
                    return false;
                return $$.$bw_equal([...a.records.entries()], [...b.records.entries()]);
            }
            records(records) {
                if (records !== void 0) {
                    const old_data = this.data();
                    let nextId = old_data.nextId;
                    records.forEach((rec, rec_id) => {
                        if (nextId <= +rec_id)
                            nextId = +rec_id + 1;
                    });
                    const new_data = { nextId, records };
                    this.data(new_data);
                }
                const result = this.data().records || new Map();
                return result;
            }
            filter() {
                let result = {};
                if (this.filter_phone()) {
                    result['phone'] = {
                        type: 0,
                        contains: this.filter_phone(),
                    };
                }
                if (this.filter_description()) {
                    result['description'] = {
                        type: 0,
                        contains: this.filter_description(),
                    };
                }
                result = Object.keys(result).length ? result : null;
                const fixed_height = !result ? null : this.Grid().current_grid_height;
                this.Grid().fixed_height(fixed_height);
                return result;
            }
            add_modal_title() {
                const records_modify = this.records_modify();
                const result = records_modify && records_modify.state == 1 ? 'Добавление телефона' : 'Редактирование телефона';
                return result;
            }
        }
        __decorate([
            $$.$bw_store('local', true)
        ], $bw_settings_blacklist_block.prototype, "data", null);
        $$.$bw_settings_blacklist_block = $bw_settings_blacklist_block;
        class $bw_settings_blacklist_block_add_modal extends $.$bw_settings_blacklist_block_add_modal {
            event_click(event) {
                this['object_host()'].commit_records();
            }
            phone_autofocus() {
                return this.is_new_record_to_edit();
            }
            description_autofocus() {
                return !this.is_new_record_to_edit();
            }
            vim_cmd() {
                const result = new $$.VimDefCmd(new $$.VimDefCmdItem(23, (opt, cmd) => {
                    this['object_host()'].cancel_records();
                }), new $$.VimDefCmdItem(22, (opt, cmd) => {
                    this['object_host()'].commit_records();
                }));
                return result;
            }
            close_button_click(event, force) {
                if (!event)
                    return;
                this['object_host()'].cancel_records();
            }
        }
        $$.$bw_settings_blacklist_block_add_modal = $bw_settings_blacklist_block_add_modal;
        class $bw_settings_blacklist_block_grid extends $.$bw_settings_blacklist_block_grid {
            checked(id, val, force) {
                if (val !== void 0) {
                    if (this.rec_id_of_row(id.row) === '') {
                        this.rec_ids_selection_invert(!this.rec_ids_selection_invert());
                        this.rec_ids_selected(null);
                    }
                    else {
                        this.select_rows([id.row], val);
                    }
                }
                const result = this.is_selected(id.row);
                return result;
            }
            check_box_cell_click(id, event, force) {
                if (!event)
                    return;
                const row_ids = this.row_ids_filtered();
                if (!this._last_check_box_cell_click_id || !event.shiftKey) {
                    this.checked(id, !this.checked(id));
                }
                else {
                    const is_selected = this.is_selected(id.row);
                    const last_check_box_cell_click_idx = this.row_idx_by_row_id(this._last_check_box_cell_click_id.row);
                    const idx = this.row_idx_by_row_id(id.row);
                    const from_idx = Math.min(last_check_box_cell_click_idx, idx);
                    const to_idx = Math.max(last_check_box_cell_click_idx, idx);
                    this.select_rows(row_ids.slice(from_idx, to_idx + 1), !is_selected);
                }
                this._last_check_box_cell_click_id = id;
            }
            vim_def_keypress(result) {
                result.push({
                    seq: [{}, { code: 'KeyF' }],
                    cmd: function (opt) {
                        switch (opt.qt) {
                            case 1:
                                this.PhoneColumn("phone").checked(true);
                                new $.$mol_defer(() => this.PhoneColumn().SearchInput().Input().focused(true));
                                break;
                            case 2:
                                this.DescriptionColumn("description").checked(true);
                                new $.$mol_defer(() => this.DescriptionColumn().SearchInput().Input().focused(true));
                                break;
                        }
                    },
                });
                return result;
            }
            col_head_content(colId) {
                switch (colId) {
                    case 'buttons':
                        return [];
                    case 'phone':
                        return [this.PhoneColumn(colId)];
                    case 'description':
                        return [this.DescriptionColumn(colId)];
                    case 'author':
                        return ['Кто добавил'];
                    case 'check-box':
                        return [this.CheckBox({ col: colId, row: ['', ''] })];
                    default: return [colId];
                }
            }
            Cell(id) {
                let result;
                switch (id.col) {
                    case 'check-box':
                        result = this.CheckBoxCell(id);
                        break;
                    case 'buttons':
                        result = this.ButtonsCell(id);
                        break;
                    default: result = super.Cell(id);
                }
                return result;
            }
            del_click(id, event, force) {
                if (!event)
                    return;
                this.del_records(new Set(this.rec_id_of_row(id.row)));
            }
            edit_click(row_id, event, force) {
                if (!event)
                    return;
                this.edit_record(this.rec_id_of_row(row_id));
            }
            row_dblclick(row_id, event, force) {
                if (!event)
                    return;
                this.edit_record(this.rec_id_of_row(row_id));
            }
            max_height() {
                const result = Math.max(44 * 2, this.workspace_content_height() - 185 - 32);
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_settings_blacklist_block_grid.prototype, "max_height", null);
        $$.$bw_settings_blacklist_block_grid = $bw_settings_blacklist_block_grid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//settings.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_workspace extends $.$mol_view {
        sub() {
            return [].concat(this.Content());
        }
        Content() {
            return null;
        }
        Settings() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_settings);
        }
        Search() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_search);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_workspace.prototype, "Settings", null);
    __decorate([
        $.$mol_mem
    ], $bw_workspace.prototype, "Search", null);
    $.$bw_workspace = $bw_workspace;
})($ || ($ = {}));
//workspace.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_workspace extends $.$bw_workspace {
            Content() {
                switch ($$.$bw_mainmenu.instance().selected_item()) {
                    case 'settings': return this.Settings();
                    case 'search': return this.Search();
                }
                return null;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_workspace.prototype, "Content", null);
        $$.$bw_workspace = $bw_workspace;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//workspace.view.js.map
;
"use strict";
//grid2.row_animate.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_grid2 extends $.$mol_view {
        height() {
            return 0;
        }
        animated_height() {
            return 0;
        }
        top() {
            return 0;
        }
        body_padding_left() {
            return 2;
        }
        row_min_height() {
            return 28;
        }
        style() {
            return ({
                "top": this.top(),
                "height": this.animated_height(),
                "cursor": this.cursor(),
            });
        }
        cursor() {
            return null;
        }
        sub() {
            return [].concat(this.Header(), this.Body());
        }
        Header() {
            return ((obj) => {
                obj.style = () => ({
                    "height": this.header_height(),
                });
                obj.event = () => ({
                    "mouseleave": (event) => this.header_mouseleave(event),
                    "mousedown": (event) => this.header_mousedown(event),
                });
                obj.sub = () => [].concat(this.cols());
                return obj;
            })(new this.$.$mol_view);
        }
        header_height(val, force) {
            return (val !== void 0) ? val : null;
        }
        header_mouseleave(event, force) {
            return (event !== void 0) ? event : null;
        }
        header_mousedown(event, force) {
            return (event !== void 0) ? event : null;
        }
        cols() {
            return [];
        }
        Body() {
            return ((obj) => {
                obj.style = () => ({
                    "height": this.body_height(),
                    "padding-left": this.body_padding_left(),
                });
                obj.sub = () => [].concat(this.rows());
                return obj;
            })(new this.$.$mol_view);
        }
        body_height(val, force) {
            return (val !== void 0) ? val : null;
        }
        rows() {
            return [];
        }
        col_defs(val, force) {
            return (val !== void 0) ? val : null;
        }
        col_ids_visible(val, force) {
            return (val !== void 0) ? val : null;
        }
        col_ids_visible_set(val, force) {
            return (val !== void 0) ? val : null;
        }
        col_release_pos() {
            return null;
        }
        col_release_pos_animation_trigger(val, force) {
            return (val !== void 0) ? val : null;
        }
        col_moving_pos(val, force) {
            return (val !== void 0) ? val : null;
        }
        col_to_move(val, force) {
            return (val !== void 0) ? val : null;
        }
        col_to_resize(val, force) {
            return (val !== void 0) ? val : null;
        }
        col_resizing(val, force) {
            return (val !== void 0) ? val : null;
        }
        col_left_source(id, val, force) {
            return (val !== void 0) ? val : null;
        }
        col_top_source(id) {
            return 0;
        }
        col_client_left(id) {
            return null;
        }
        col_client_right(id) {
            return null;
        }
        search_result_id(val, force) {
            return (val !== void 0) ? val : 0;
        }
        recs_count(val, force) {
            return (val !== void 0) ? val : null;
        }
        recs(val, force) {
            return (val !== void 0) ? val : null;
        }
        row_i_max(val, force) {
            return (val !== void 0) ? val : 0;
        }
        row_i_diap(val, force) {
            return (val !== void 0) ? val : null;
        }
        row_defs(val, force) {
            return (val !== void 0) ? val : null;
        }
        row_footer_height_of_idx(idx, val, force) {
            return (val !== void 0) ? val : null;
        }
        row_footer_heights(val, force) {
            return (val !== void 0) ? val : null;
        }
        row_footer_visible_offer_ids(val, force) {
            return (val !== void 0) ? val : null;
        }
        row_def_idx(i, val, force) {
            return (val !== void 0) ? val : null;
        }
        row_def_height(i, val, force) {
            return (val !== void 0) ? val : null;
        }
        row_def_top(i, val, force) {
            return (val !== void 0) ? val : null;
        }
        scroll_y_delta(val, force) {
            return (val !== void 0) ? val : 0;
        }
        is_eog(val, force) {
            return (val !== void 0) ? val : false;
        }
        is_bog(val, force) {
            return (val !== void 0) ? val : false;
        }
        row_footers(val, force) {
            return (val !== void 0) ? val : null;
        }
        Row(i) {
            return ((obj) => {
                obj.style = () => ({
                    "display": this.row_display(i),
                    "top": this.row_top(i),
                    "height": this.row_height(i),
                });
                obj.event = () => ({
                    "dblclick": (event) => this.row_dblclick(i, event),
                });
                obj.sub = () => [].concat(this.cells(i), this.Footer(i));
                return obj;
            })(new this.$.$mol_view);
        }
        row_display(i) {
            return "";
        }
        row_top(i) {
            return 0;
        }
        row_height(i) {
            return 0;
        }
        row_dblclick(i, event, force) {
            return (event !== void 0) ? event : null;
        }
        cells(i) {
            return [];
        }
        Footer(i) {
            return ((obj) => {
                obj.style = () => ({
                    "height": this.row_footer_height(i),
                    "opacity": this.footer_opacity(i),
                });
                obj.sub = () => [].concat(this.Note(i), this.UserNote(i));
                return obj;
            })(new this.$.$mol_view);
        }
        row_footer_height(i) {
            return 0;
        }
        footer_opacity(i) {
            return 0;
        }
        Note(i) {
            return ((obj) => {
                obj.style = () => ({
                    "height": this.row_note_height(i),
                });
                obj.sub = () => [].concat(this.row_note(i));
                return obj;
            })(new this.$.$mol_view);
        }
        row_note_height(i) {
            return 0;
        }
        row_note(i) {
            return "";
        }
        UserNote(i) {
            return ((obj) => {
                obj.hint = () => "Вы можете оставить собственный комментарий";
                obj.style = () => ({
                    "top": this.row_note_height(i),
                    "height": this.row_user_note_height(i),
                });
                obj.value = (val) => this.row_user_note(i, val);
                return obj;
            })(new this.$.$bw_input_textarea);
        }
        row_user_note_height(i) {
            return 0;
        }
        row_user_note(i, val, force) {
            return (val !== void 0) ? val : "";
        }
        animating_footer(val, force) {
            return (val !== void 0) ? val : null;
        }
        Cell(ij) {
            return ((obj) => {
                obj.attr = () => ({
                    "bw_grid2_moving": this.is_moving_col(ij),
                    "bw_grid2_col_id": this.col_id(ij),
                });
                obj.style = () => ({
                    "left": this.cell_left(ij),
                    "width": this.cell_width(ij),
                    "text-align": this.cell_align(ij),
                });
                obj.sub = () => [].concat(this.cell_content(ij));
                return obj;
            })(new this.$.$mol_view);
        }
        is_moving_col(id) {
            return false;
        }
        col_id(id) {
            return "";
        }
        cell_left(ij, val, force) {
            return (val !== void 0) ? val : null;
        }
        cell_width(ij, val, force) {
            return (val !== void 0) ? val : null;
        }
        cell_align(ij) {
            return "";
        }
        cell_content(ij) {
            return "";
        }
        col_left(id, val, force) {
            return (val !== void 0) ? val : null;
        }
        col_left_animated() {
            return null;
        }
        col_left_animated_animation_trigger(val, force) {
            return (val !== void 0) ? val : null;
        }
        col_top(id, val, force) {
            return (val !== void 0) ? val : null;
        }
        Col(id) {
            return ((obj) => {
                obj.event = () => ({
                    "mousemove": (event) => this.col_mousemove(id, event),
                });
                obj.attr = () => ({
                    "bw_grid2_moving": this.is_moving_col(id),
                    "bw_grid2_releasing": this.is_releasing_col(id),
                    "bw_grid2_col_id": this.col_id(id),
                });
                obj.style = () => ({
                    "left": this.col_left(id),
                    "top": this.col_top(id),
                    "width": this.col_width(id),
                });
                obj.sub = () => [].concat(this.col_caption(id));
                return obj;
            })(new this.$.$mol_view);
        }
        col_mousemove(id, event, force) {
            return (event !== void 0) ? event : null;
        }
        is_releasing_col(id) {
            return false;
        }
        col_width(id, val, force) {
            return (val !== void 0) ? val : null;
        }
        col_caption(id) {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "Header", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "header_height", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "header_mouseleave", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "header_mousedown", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "Body", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "body_height", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "col_defs", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "col_ids_visible", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "col_ids_visible_set", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "col_release_pos_animation_trigger", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "col_moving_pos", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "col_to_move", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "col_to_resize", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "col_resizing", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "col_left_source", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "search_result_id", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "recs_count", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "recs", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "row_i_max", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "row_i_diap", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "row_defs", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "row_footer_height_of_idx", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "row_footer_heights", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "row_footer_visible_offer_ids", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "row_def_idx", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "row_def_height", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "row_def_top", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "scroll_y_delta", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "is_eog", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "is_bog", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "row_footers", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "row_dblclick", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "Footer", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "Note", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "UserNote", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "row_user_note", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "animating_footer", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "Cell", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "cell_left", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "cell_width", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "col_left", null);
    __decorate([
        $.$mol_mem
    ], $bw_grid2.prototype, "col_left_animated_animation_trigger", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "col_top", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "Col", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "col_mousemove", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_grid2.prototype, "col_width", null);
    $.$bw_grid2 = $bw_grid2;
})($ || ($ = {}));
//grid2.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        function intersects(a, b, c, d) {
            const result = a <= c && c <= b ||
                a <= d && d <= b ||
                c <= a && a <= d ||
                c <= b && b <= d ||
                false;
            return result;
        }
        function meter(config, val) {
            let result = config._super();
            if (result === null) {
                const adjust_value = () => {
                    new $.$mol_defer(() => {
                        const value = config._value();
                        config._super(value);
                    });
                };
                window.addEventListener('resize', (event) => {
                    adjust_value();
                });
                adjust_value();
            }
            return result;
        }
        $$.meter = meter;
        const DICTIONARIES = {
            apartment_condition_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "треб.кап/р", "name": "требуется капитальный ремонт" }, { "id": 3, "code": "без отд.", "name": "без отделки" }, { "id": 4, "code": "треб.рем.", "name": "требуется ремонт" }, { "id": 5, "code": "ср.сост.", "name": "среднее состояние" }, { "id": 6, "code": "хор.сост.", "name": "хорошее состояние" }, { "id": 8, "code": "отл.сост.", "name": "отличное состояние" }, { "id": 9, "code": "евр.рем.", "name": "евроремонт" }, { "id": 10, "code": "дизайн.рем.", "name": "дизайнерский ремонт" }, { "id": 11, "code": "перв.отд.", "name": "первичная отделка" }],
            building_batch: [{ "id": 0, "name": "" }, { "id": 1, "name": "02/98-НМ" }, { "id": 2, "name": "1385 АР-3" }, { "id": 3, "name": "1605/12" }, { "id": 4, "name": "1605/9" }, { "id": 5, "name": "1605/Б" }, { "id": 6, "name": "17/2004-АС" }, { "id": 7, "name": "1МГ-600" }, { "id": 8, "name": "1МГ-601" }, { "id": 9, "name": "2-71/358" }, { "id": 10, "name": "2548-01-АР" }, { "id": 11, "name": "2548-02-АР" }, { "id": 12, "name": "32/2005-АС" }, { "id": 13, "name": "349/01" }, { "id": 14, "name": "355/24" }, { "id": 15, "name": "7040-01" }, { "id": 16, "name": "I-303" }, { "id": 17, "name": "I-335" }, { "id": 18, "name": "I-447" }, { "id": 19, "name": "I-510" }, { "id": 20, "name": "I-511" }, { "id": 21, "name": "I-513" }, { "id": 22, "name": "I-515" }, { "id": 23, "name": "I605-АМ" }, { "id": 24, "name": "II-04" }, { "id": 25, "name": "II-05" }, { "id": 26, "name": "II-08" }, { "id": 27, "name": "II-18" }, { "id": 28, "name": "II-18-01-МН" }, { "id": 29, "name": "II-18-31/12" }, { "id": 30, "name": "II-29" }, { "id": 31, "name": "II-32" }, { "id": 32, "name": "II-49" }, { "id": 33, "name": "II-57" }, { "id": 34, "name": "II-68-02" }, { "id": 35, "name": "II-68-03" }, { "id": 36, "name": "II-89-01-МН" }, { "id": 37, "name": "III/17" }, { "id": 38, "name": "VI-23" }, { "id": 39, "name": "VII-51" }, { "id": 40, "name": "VII-58" }, { "id": 41, "name": "А-41K" }, { "id": 42, "name": "башня Вулыха" }, { "id": 43, "name": "Бекерон" }, { "id": 44, "name": "БОД-1" }, { "id": 45, "name": "В-2000" }, { "id": 46, "name": "В-2002" }, { "id": 47, "name": "В-2005" }, { "id": 48, "name": "ГМС-1" }, { "id": 49, "name": "ГМС-3" }, { "id": 50, "name": "И-1168 А3" }, { "id": 51, "name": "И-1168 А4" }, { "id": 52, "name": "И-1233" }, { "id": 53, "name": "И-1254" }, { "id": 54, "name": "И-1262А" }, { "id": 55, "name": "И-1429" }, { "id": 56, "name": "И-1430" }, { "id": 57, "name": "И-1459-132" }, { "id": 58, "name": "И-1491-17" }, { "id": 59, "name": "И-1501" }, { "id": 60, "name": "И-155" }, { "id": 61, "name": "И-155МК" }, { "id": 62, "name": "И-155Н" }, { "id": 63, "name": "И-1602" }, { "id": 64, "name": "И-1677" }, { "id": 65, "name": "И-1723" }, { "id": 66, "name": "И-1724" }, { "id": 67, "name": "И-1731" }, { "id": 68, "name": "И-1782/1" }, { "id": 69, "name": "И-1812/1" }, { "id": 70, "name": "И-1834" }, { "id": 71, "name": "И-1836" }, { "id": 72, "name": "И-1838" }, { "id": 73, "name": "И-1839" }, { "id": 74, "name": "И-1849" }, { "id": 75, "name": "И-1932" }, { "id": 76, "name": "И-208" }, { "id": 77, "name": "И-209А" }, { "id": 78, "name": "И-2342" }, { "id": 79, "name": "И-241" }, { "id": 80, "name": "И-491А" }, { "id": 81, "name": "И-515-5М" }, { "id": 82, "name": "И-515/9ш" }, { "id": 83, "name": "И-522" }, { "id": 84, "name": "И-522А" }, { "id": 85, "name": "И-679" }, { "id": 86, "name": "И-700" }, { "id": 87, "name": "И-700А" }, { "id": 88, "name": "И-760А" }, { "id": 89, "name": "И-79-99" }, { "id": 90, "name": "И-99-47/405" }, { "id": 91, "name": "И-99-47/406" }, { "id": 92, "name": "индивидуальный проект" }, { "id": 93, "name": "ИП-46С" }, { "id": 94, "name": "ИШ3/12" }, { "id": 95, "name": "К-7" }, { "id": 96, "name": "КМС-101" }, { "id": 97, "name": "Колос" }, { "id": 98, "name": "КОПЭ" }, { "id": 99, "name": "КОПЭ-М-ПАРУС" }, { "id": 100, "name": "КТЖС" }, { "id": 101, "name": "КТЖС-11/22" }, { "id": 102, "name": "1МГ-300" }, { "id": 103, "name": "МОНОЛИТ" }, { "id": 105, "name": "МЭС-84" }, { "id": 107, "name": "НП-46с" }, { "id": 108, "name": "П-06" }, { "id": 109, "name": "П-111" }, { "id": 110, "name": "П-111М" }, { "id": 111, "name": "П-111МО" }, { "id": 112, "name": "П-12-31/12" }, { "id": 113, "name": "II-14" }, { "id": 114, "name": "П-14/35" }, { "id": 115, "name": "П-18/22" }, { "id": 116, "name": "П-20" }, { "id": 117, "name": "П-21" }, { "id": 118, "name": "П-22" }, { "id": 119, "name": "П-23" }, { "id": 120, "name": "П-28" }, { "id": 121, "name": "П-29" }, { "id": 122, "name": "П-3" }, { "id": 123, "name": "П-3/16" }, { "id": 124, "name": "П-3/17" }, { "id": 125, "name": "П-3/22" }, { "id": 126, "name": "П-30" }, { "id": 127, "name": "П-31" }, { "id": 128, "name": "П-32" }, { "id": 129, "name": "П-321-60" }, { "id": 130, "name": "II-34" }, { "id": 131, "name": "II-35" }, { "id": 132, "name": "П-37" }, { "id": 133, "name": "II-38" }, { "id": 134, "name": "П-39" }, { "id": 135, "name": "П-3М" }, { "id": 136, "name": "П-4" }, { "id": 137, "name": "П-40" }, { "id": 138, "name": "П-41" }, { "id": 139, "name": "П-42" }, { "id": 140, "name": "П-43" }, { "id": 141, "name": "П-44" }, { "id": 142, "name": "П-44К" }, { "id": 143, "name": "П-44М" }, { "id": 144, "name": "П-44Т" }, { "id": 145, "name": "П-44ТМ" }, { "id": 146, "name": "П-45" }, { "id": 147, "name": "П-46" }, { "id": 148, "name": "П-46М" }, { "id": 149, "name": "П-47" }, { "id": 150, "name": "П-49 Д" }, { "id": 151, "name": "П-50" }, { "id": 152, "name": "П-53" }, { "id": 153, "name": "П-55" }, { "id": 154, "name": "П-55М" }, { "id": 155, "name": "II-29-41/37" }, { "id": 156, "name": "II-66" }, { "id": 157, "name": "II-67" }, { "id": 158, "name": "II-68" }, { "id": 159, "name": "ПД-4" }, { "id": 160, "name": "ПД-4/12" }, { "id": 161, "name": "Пд4-1/12Н1" }, { "id": 162, "name": "ПД4-1/8Н1" }, { "id": 163, "name": "ПЗМ-1/14" }, { "id": 164, "name": "ПЗМ-1/16" }, { "id": 165, "name": "ПЗМ-2/16" }, { "id": 166, "name": "ПЗМ-3/16" }, { "id": 167, "name": "ПП-70" }, { "id": 168, "name": "Призма" }, { "id": 169, "name": "РД-90" }, { "id": 170, "name": "С-111М" }, { "id": 171, "name": "С-220" }, { "id": 172, "name": "С-222" }, { "id": 173, "name": "ТИП-441" }, { "id": 174, "name": "ЦВП-4570-II-63" }, { "id": 175, "name": "Юбилейный" }, { "id": 176, "name": "II-02" }, { "id": 177, "name": "II-01" }, { "id": 178, "name": "II-18-01/08" }, { "id": 179, "name": "II-18-01/09" }, { "id": 180, "name": "1605-АМ/9" }, { "id": 181, "name": "1605-АМ/12" }, { "id": 182, "name": "II-49П" }, { "id": 183, "name": "II-49Д" }, { "id": 184, "name": "II-03" }, { "id": 185, "name": "II-18-01/12" }, { "id": 186, "name": "II-18-02/12" }, { "id": 187, "name": "II-18/12" }, { "id": 188, "name": "II-20" }, { "id": 189, "name": "1605-АМ/5" }, { "id": 190, "name": "И-III-3" }, { "id": 191, "name": "II-28" }, { "id": 192, "name": "II-68-02/16М" }, { "id": 193, "name": "КПД-4570" }, { "id": 194, "name": "II-68-01" }, { "id": 195, "name": "1-515/9" }, { "id": 196, "name": "К4/16" }, { "id": 197, "name": "И-155Б" }, { "id": 198, "name": "1-515/5" }, { "id": 199, "name": "II-18-01/12А" }, { "id": 200, "name": "СМ-1 " }, { "id": 201, "name": "П-44ТМ/25" }, { "id": 202, "name": "И-701" }, { "id": 203, "name": "И-155-с" }, { "id": 204, "name": "Айсберг" }, { "id": 205, "name": "II-14/35" }, { "id": 206, "name": "И-99-47/407" }, { "id": 207, "name": "П-101" }, { "id": 208, "name": "1-300" }, { "id": 209, "name": "II-18-01/09К" }, { "id": 210, "name": "И-1900" }, { "id": 211, "name": "М-10" }, { "id": 212, "name": "МПСМ" }, { "id": 213, "name": "ИП-46М" }, { "id": 214, "name": "П-30М" }, { "id": 215, "name": "II-07" }, { "id": 216, "name": "ПБ-01" }, { "id": 217, "name": "И-1414" }, { "id": 218, "name": "И-2111" }, { "id": 219, "name": "1605-АМЛ/5" }, { "id": 220, "name": "1-447С-26" }, { "id": 221, "name": "1-447С-1" }, { "id": 222, "name": "1-447С-36" }, { "id": 223, "name": "1-447С-2" }, { "id": 224, "name": "1-447С-5" }, { "id": 225, "name": "1-446" }, { "id": 226, "name": "ПБ-02" }, { "id": 227, "name": "КПД-4572А" }, { "id": 228, "name": "II-68-04" }, { "id": 229, "name": "124-124-1" }, { "id": 231, "name": "1605-А" }, { "id": 232, "name": "1-439" }, { "id": 233, "name": "Мм1-3" }, { "id": 234, "name": "И-1168" }, { "id": 235, "name": "СМ-06" }, { "id": 236, "name": "СМ-03" }, { "id": 237, "name": "1-419" }, { "id": 238, "name": "1-203" }, { "id": 239, "name": "ЭС-24" }, { "id": 240, "name": "8966" }, { "id": 242, "name": "1-126" }, { "id": 243, "name": "1-225" }, { "id": 244, "name": "1-402" }, { "id": 245, "name": "16/2188" }, { "id": 246, "name": "Т-1" }, { "id": 247, "name": "Т-3" }, { "id": 248, "name": "1-233" }, { "id": 249, "name": "1-260" }, { "id": 250, "name": "К-8-49" }, { "id": 251, "name": "1-255" }, { "id": 252, "name": "КС-8-50" }, { "id": 253, "name": "Д-23" }, { "id": 254, "name": "Д-25Н1" }, { "id": 256, "name": "ПП-83" }, { "id": 258, "name": "К2/16" }, { "id": 259, "name": "К7/16" }, { "id": 260, "name": "К8/16" }, { "id": 262, "name": "1-464А" }, { "id": 263, "name": "КОПЭ-87" }, { "id": 264, "name": "П-121М" }, { "id": 265, "name": "121-041" }, { "id": 266, "name": "121-042" }, { "id": 267, "name": "121-043" }, { "id": 268, "name": "II-29-208" }, { "id": 269, "name": "II-29-3" }, { "id": 270, "name": "II-29-9" }, { "id": 271, "name": "II-29-160" }, { "id": 272, "name": "ПД-1" }, { "id": 273, "name": "И-02/98-НМ" }, { "id": 274, "name": "1-467" }, { "id": 275, "name": "ЭЖРЧС" }, { "id": 276, "name": "П-3МК" }, { "id": 277, "name": "II-18-02/09" }, { "id": 278, "name": "ПД-3" }, { "id": 279, "name": "И-580" }, { "id": 280, "name": "II-18-03/12" }, { "id": 281, "name": "К-14" }, { "id": 282, "name": "И-700Н" }, { "id": 283, "name": "Юникон" }, { "id": 284, "name": "111-121" }, { "id": 285, "name": "1-211" }, { "id": 286, "name": "II-68-01/22" }, { "id": 287, "name": "Лебедь" }, { "id": 288, "name": "И-99-47" }],
            balcony_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "нет" }, { "id": 2, "code": "Б", "name": "балкон" }, { "id": 3, "code": "Л", "name": "лоджия" }, { "id": 4, "code": "БЛ", "name": "балкон + лоджия" }, { "id": 5, "code": "2Б", "name": "два балкона" }, { "id": 6, "code": "2Л", "name": "две лоджии" }, { "id": 7, "code": "3Л", "name": "три лоджии" }, { "id": 8, "code": "4Л", "name": "четыре лоджии" }, { "id": 9, "code": "3Б", "name": "три балкона" }, { "id": 10, "code": "Б2Л", "name": "балкон + две лоджии" }, { "id": 11, "code": "2Б2Л", "name": "два балкона + две лоджии" }, { "id": 12, "code": "Эрк", "name": "эркер" }, { "id": 13, "code": "ЭркЛ", "name": "эркер + лоджия" }, { "id": 14, "code": "*Б", "name": "несколько балконов" }, { "id": 15, "code": "*Л", "name": "несколько лоджий" }],
            currency_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "руб", "name": "RUB" }, { "id": 2, "code": "$", "name": "USD" }, { "id": 3, "code": "€", "name": "EUR" }, { "id": 4, "code": "TL", "name": "TL" }, { "id": 5, "code": "BYR", "name": "BYR" }],
            deal_status: [{ "id": 1, "code": "продается/арендуется", "name": "продается/арендуется" }, { "id": 2, "code": "аванс/задаток", "name": "аванс/задаток" }, { "id": 3, "code": "продана/арендована", "name": "продана/арендована" }],
            deal_type: [{ "id": 1, "code": "продажа", "name": "продажа" }, { "id": 2, "code": "аренда", "name": "аренда" }],
            location_type: [{ "id": 13, "code": "ГСК", "name": "ГСК" }, { "id": 14, "code": "ГК", "name": "ГК" }, { "id": 15, "code": "ЖК", "name": "ЖК" }, { "id": 16, "code": "двор", "name": "двор" }, { "id": 17, "code": "паркинг", "name": "паркинг" }],
            electricity_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "нет" }, { "id": 2, "code": "+", "name": "есть" }, { "id": 3, "code": "220В", "name": "220В" }, { "id": 4, "code": "380В", "name": "380В" }, { "id": 5, "code": "П", "name": "в перспективе" }, { "id": 6, "code": "ГУ", "name": "по границе" }, { "id": 7, "code": "10кВ", "name": "10кВ" }, { "id": 8, "code": "И", "name": "иное" }],
            elevator_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "пасс.", "name": "лифт пассажирский" }, { "id": 2, "code": "груз.", "name": "лифт грузовой" }, { "id": 3, "code": "пасс.+ груз.", "name": "лифт пассажирский и лифт грузовой" }, { "id": 4, "code": "нет", "name": "нет лифта" }, { "id": 5, "code": "есть", "name": "есть лифт" }],
            floor_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "полы не настелены", "master_realty_type_id": 1 }, { "id": 2, "code": "Д", "name": "дерево", "master_realty_type_id": 1 }, { "id": 3, "code": "п/д", "name": "паркетная доска", "master_realty_type_id": 1 }, { "id": 4, "code": "ЛМ", "name": "ламинат", "master_realty_type_id": 1 }, { "id": 5, "code": "К", "name": "ковролин", "master_realty_type_id": 1 }, { "id": 6, "code": "П", "name": "паркет", "master_realty_type_id": 1 }, { "id": 7, "code": "ЛН", "name": "линолеум", "master_realty_type_id": 1 }, { "id": 8, "code": "Стяж", "name": "стяжка", "master_realty_type_id": 1 }, { "id": 9, "code": "асфальт", "name": "асфальт", "master_realty_type_id": 4 }, { "id": 10, "code": "бетон", "name": "бетон", "master_realty_type_id": 4 }, { "id": 11, "code": "грунт", "name": "грунт", "master_realty_type_id": 4 }, { "id": 12, "code": "дерево", "name": "дерево", "master_realty_type_id": 4 }, { "id": 13, "code": "металл", "name": "металл", "master_realty_type_id": 4 }, { "id": 14, "code": "полимерное покрытие", "name": "полимерное покрытие", "master_realty_type_id": 4 }],
            gas_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "нет" }, { "id": 2, "code": "+", "name": "есть" }, { "id": 3, "code": "ГУ", "name": "по границе" }, { "id": 4, "code": "П", "name": "перспектива" }, { "id": 5, "code": "Р", "name": "рядом" }, { "id": 6, "code": "Б", "name": "баллоны" }, { "id": 7, "code": "М", "name": "магистральный" }, { "id": 8, "code": "И", "name": "иное" }, { "id": 9, "code": "Ц", "name": "центральный" }],
            habit_class: [{ "id": 1, "name": "эконом" }, { "id": 2, "name": "комфорт" }, { "id": 3, "name": "бизнес" }, { "id": 4, "name": "элитный" }],
            heating_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "нет" }, { "id": 2, "code": "+", "name": "есть" }, { "id": 3, "code": "ЭК", "name": "электрокотел" }, { "id": 4, "code": "ГК", "name": "газовый котел" }, { "id": 5, "code": "ЖТК", "name": "жидкотопливный котел" }, { "id": 6, "code": "АГВ", "name": "автоматический газовый водонагреватель" }, { "id": 7, "code": "П", "name": "печь" }, { "id": 8, "code": "Ц", "name": "центральное" }, { "id": 9, "code": "И", "name": "иное" }],
            media: [{ "id": 0, "name": "Прочие", "is_active": 1, "order_number": 1000 }, { "id": 1, "name": "Руки", "is_active": 1, "order_number": 50 }, { "id": 3, "name": "WinNER (зелёная зона)", "is_active": 1, "order_number": 10 }, { "id": 4, "name": "Крис", "is_active": 0, "order_number": 140 }, { "id": 5, "name": "Realty.dmir.ru", "is_active": 0, "order_number": 60 }, { "id": 6, "name": "БН", "is_active": 1, "order_number": 130 }, { "id": 7, "name": "Навигатор", "is_active": 0, "order_number": 1000 }, { "id": 8, "name": "БКН", "is_active": 1, "order_number": 120 }, { "id": 9, "name": "Собственники", "is_active": 0, "order_number": 900 }, { "id": 11, "name": "Приан", "is_active": 0, "order_number": 150 }, { "id": 12, "name": "eip.ru", "is_active": 0, "order_number": 110 }, { "id": 15, "name": "Sob.ru", "is_active": 1, "order_number": 20 }, { "id": 17, "name": "cian.ru", "is_active": 1, "order_number": 40 }, { "id": 20, "name": "A.baza-winner", "is_active": 0, "order_number": 15 }, { "id": 21, "name": "AVITO.ru", "is_active": 1, "order_number": 30 }, { "id": 22, "name": "WinNER Lite", "is_active": 1, "order_number": 16 }, { "id": 23, "name": "Яндекс", "is_active": 1, "order_number": 70 }, { "id": 24, "name": "WinNER (белая зона)", "is_active": 1, "order_number": 15 }],
            office_class: [{ "id": 2, "name": "A+" }, { "id": 3, "name": "A" }, { "id": 4, "name": "B+" }, { "id": 5, "name": "B" }, { "id": 6, "name": "C+" }, { "id": 7, "name": "C" }, { "id": 8, "name": "D+" }, { "id": 9, "name": "D" }],
            fire_alarm_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "name": "пожарная сигнализация", "code": "пожарная сигнализация" }, { "id": 2, "name": "система пожаротушения", "code": "система пожаротушения" }],
            ownership_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "купля/продажа", "name": "купля/продажа" }, { "id": 2, "code": "ЖСК", "name": "ЖСК" }, { "id": 3, "code": "приватиз.", "name": "приватизация" }, { "id": 4, "code": "дар.", "name": "дарение" }, { "id": 5, "code": "наслед.", "name": "наследство" }, { "id": 6, "code": "мена", "name": "мена" }, { "id": 7, "code": "инвест.", "name": "инвестирование" }, { "id": 8, "code": "рента", "name": "рента" }, { "id": 9, "code": "реш.суда", "name": "решение суда" }, { "id": 10, "code": "залог(ипотека)", "name": "залог (ипотека)" }, { "id": 11, "code": "иное", "name": "иное" }, { "id": 12, "code": "кооператив", "name": "кооператив" }, { "id": 13, "code": "собственность", "name": "собственность" }, { "id": 14, "code": "по доверенности", "name": "по доверенности" }, { "id": 15, "code": "ДДУ", "name": "договор долевого участия" }, { "id": 16, "code": "ДУ", "name": "договор уступки прав требования" }, { "id": 17, "code": "ПДДК", "name": "предварительный договор купли-продажи" }],
            parking_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "нет" }, { "id": 2, "code": "+", "name": "есть" }, { "id": 3, "code": "о", "name": "охраняемая" }, { "id": 4, "code": "п", "name": "подземная" }, { "id": 5, "code": "с", "name": "стихийная" }, { "id": 6, "code": "з", "name": "закрепленное место" }],
            pay_period_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "в год", "name": "в год" }, { "id": 2, "code": "в мес.", "name": "в месяц" }, { "id": 3, "code": "в кв.", "name": "в квартал" }, { "id": 4, "code": "в сут.", "name": "в сутки" }],
            plumbing_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "нет" }, { "id": 2, "code": "+", "name": "есть" }, { "id": 3, "code": "С", "name": "скважина" }, { "id": 4, "code": "К", "name": "колодец" }, { "id": 5, "code": "М", "name": "магистральный" }, { "id": 6, "code": "И", "name": "иное" }, { "id": 7, "code": "Ц", "name": "центральный" }, { "id": 8, "code": "Л", "name": "летний" }],
            price_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "вся площадь", "name": "за всю площадь" }, { "id": 2, "code": "сотка", "name": "за сотку" }, { "id": 3, "code": "кв.м.", "name": "за кв.м." }],
            realty_type: [{ "id": 1, "code": "кв.", "name": "квартира", "master_realty_type_id": 1 }, { "id": 2, "code": "комн.", "name": "комната", "master_realty_type_id": 1 }, { "id": 3, "code": "дом", "name": "дом", "master_realty_type_id": 2 }, { "id": 4, "code": "ЗУ", "name": "земельный участок", "master_realty_type_id": 2 }, { "id": 5, "code": "дача", "name": "дача", "master_realty_type_id": 2 }, { "id": 6, "code": "дуплекс", "name": "дуплекс", "master_realty_type_id": 2 }, { "id": 7, "code": "квадрохаус", "name": "квадрохаус", "master_realty_type_id": 2 }, { "id": 8, "code": "коттедж", "name": "коттедж", "master_realty_type_id": 2 }, { "id": 9, "code": "коттедж в КП", "name": "коттедж в КП", "master_realty_type_id": 2 }, { "id": 10, "code": "таунхаус", "name": "таунхаус", "master_realty_type_id": 2 }, { "id": 11, "code": "усадьба", "name": "усадьба", "master_realty_type_id": 2 }, { "id": 12, "code": "часть дома", "name": "часть дома", "master_realty_type_id": 2 }, { "id": 15, "code": "офис", "name": "офис", "master_realty_type_id": 3 }, { "id": 16, "code": "маг", "name": "магазин", "master_realty_type_id": 3 }, { "id": 17, "code": "склад", "name": "склад", "master_realty_type_id": 3 }, { "id": 18, "code": "другое", "name": "другое", "master_realty_type_id": 3 }, { "id": 19, "code": "БЦ", "name": "бизнес-центр", "master_realty_type_id": 3 }, { "id": 20, "code": "ТЦ", "name": "торговый центр", "master_realty_type_id": 3 }, { "id": 21, "code": "ППП", "name": "произв.-пром помещение", "master_realty_type_id": 3 }, { "id": 22, "code": "ПП", "name": "предприятие питания", "master_realty_type_id": 3 }, { "id": 23, "code": "ПСН", "name": "помещ.свободного назначения", "master_realty_type_id": 3 }, { "id": 24, "code": "ОСЗ", "name": "отдельно стоящее здание", "master_realty_type_id": 3 }, { "id": 25, "code": "гостиница/отель", "name": "гостиница/отель", "master_realty_type_id": 3 }, { "id": 26, "code": "КЗУ", "name": "ком.земельный участок", "master_realty_type_id": 3 }, { "id": 27, "code": "гар", "name": "гараж", "master_realty_type_id": 3 }, { "id": 28, "code": "автомойка", "name": "автомойка", "master_realty_type_id": 3 }, { "id": 29, "code": "автосервис", "name": "автосервис", "master_realty_type_id": 3 }, { "id": 30, "code": "ателье", "name": "ателье", "master_realty_type_id": 3 }, { "id": 31, "code": "гараж.комплекс", "name": "гараж.комплекс", "master_realty_type_id": 3 }, { "id": 32, "code": "медцентр", "name": "медцентр", "master_realty_type_id": 3 }, { "id": 33, "code": "парикмахерская", "name": "парикмахерская", "master_realty_type_id": 3 }, { "id": 34, "code": "стоматология", "name": "стоматология", "master_realty_type_id": 3 }, { "id": 35, "code": "турфирма", "name": "турфирма", "master_realty_type_id": 3 }, { "id": 36, "code": "учеб.цели", "name": "учеб.цели", "master_realty_type_id": 3 }, { "id": 37, "code": "фотоателье", "name": "фотоателье", "master_realty_type_id": 3 }, { "id": 38, "code": "химчистка", "name": "химчистка", "master_realty_type_id": 3 }, { "id": 39, "code": "офисное здание", "name": "офисное здание", "master_realty_type_id": 3 }, { "id": 40, "code": "торг.площадь", "name": "торговая площадь", "master_realty_type_id": 3 }, { "id": 41, "code": "пром.земли", "name": "промышленные земли", "master_realty_type_id": 3 }, { "id": 42, "code": "сельхоз.земли", "name": "сельхоз.земли", "master_realty_type_id": 3 }, { "id": 43, "code": "банк", "name": "банк", "master_realty_type_id": 3 }, { "id": 44, "code": "кафе/ресторан", "name": "кафе/ресторан", "master_realty_type_id": 3 }, { "id": 45, "code": "машиноместо", "name": "машиноместо", "master_realty_type_id": 3 }, { "id": 46, "code": "инвест.проект", "name": "инвестиционный проект", "master_realty_type_id": 3 }, { "id": 47, "code": "готовый бизнес", "name": "готовый бизнес", "master_realty_type_id": 3 }, { "id": 48, "code": "база отдыха/лагерь", "name": "база отдыха/лагерь", "master_realty_type_id": 3 }, { "id": 49, "code": "ферма", "name": "ферма", "master_realty_type_id": 3 }, { "id": 50, "code": "бизнес-проект", "name": "бизнес-проект", "master_realty_type_id": 3 }, { "id": 51, "code": "доходный дом", "name": "доходный дом", "master_realty_type_id": 3 }, { "id": 52, "code": "фабрика/завод", "name": "фабрика/завод", "master_realty_type_id": 3 }, { "id": 53, "code": "курортный комплекс", "name": "курортный комплекс", "master_realty_type_id": 3 }, { "id": 54, "code": "апартаменты", "name": "апартаменты", "master_realty_type_id": 1 }, { "id": 55, "code": "пентхаус", "name": "пентхаус", "master_realty_type_id": 1 }, { "id": 56, "code": "дом", "name": "дом", "master_realty_type_id": 1 }, { "id": 57, "code": "элит.недвижимость(поместье, замок, особняк)", "name": "элитная недвижимость(поместье, замок, особняк)", "master_realty_type_id": 1 }, { "id": 59, "code": "гараж", "name": "гараж", "master_realty_type_id": 4 }, { "id": 60, "code": "бокс", "name": "бокс", "master_realty_type_id": 4 }, { "id": 61, "code": "машиноместо", "name": "машиноместо", "master_realty_type_id": 4 }, { "id": 62, "code": "доля", "name": "доля", "master_realty_type_id": 1 }, { "id": 63, "code": "коттедж", "name": "коттедж", "master_realty_type_id": 1 }, { "id": 64, "code": "вилла", "name": "вилла", "master_realty_type_id": 1 }, { "id": 65, "code": "бунгало", "name": "бунгало", "master_realty_type_id": 1 }, { "id": 66, "code": "таунхаус", "name": "таунхаус", "master_realty_type_id": 1 }, { "id": 67, "code": "квартира", "name": "квартира", "master_realty_type_id": 5 }],
            rent_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "любой срок", "name": "любой срок" }, { "id": 2, "code": "длительный срок", "name": "длительный срок" }, { "id": 3, "code": "посуточно", "name": "посуточно" }, { "id": 4, "code": "от месяца и более", "name": "от месяца и более" }, { "id": 5, "code": "сезонная сдача", "name": "сезонная сдача" }],
            security_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "нет" }, { "id": 2, "code": "+", "name": "есть" }],
            sewerage_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "нет" }, { "id": 2, "code": "+", "name": "есть" }, { "id": 3, "code": "ВД", "name": "вне дома" }, { "id": 4, "code": "С", "name": "септик" }, { "id": 5, "code": "Ц", "name": "центральная" }, { "id": 6, "code": "И", "name": "иное" }],
            territory_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "огорож.", "name": "огороженная" }, { "id": 2, "code": "огорож.+охран.", "name": "огороженная и охраняемая" }, { "id": 3, "code": "не огорож.", "name": "не огорожена" }],
            walls_material_type: [{ "id": 0, "code": "", "name": "", "master_realty_type_id": null }, { "id": 1, "code": "П", "name": "панельный", "master_realty_type_id": 1 }, { "id": 2, "code": "Б", "name": "блочный", "master_realty_type_id": 1 }, { "id": 3, "code": "М", "name": "монолитный", "master_realty_type_id": 1 }, { "id": 4, "code": "М-К", "name": "монолитно-кирпичный", "master_realty_type_id": 1 }, { "id": 5, "code": "К", "name": "кирпичный", "master_realty_type_id": 1 }, { "id": 6, "code": "Дер.", "name": "деревянный", "master_realty_type_id": 1 }, { "id": 9, "code": "Шлакоблок", "name": "шлакоблоки/шлакобетон", "master_realty_type_id": 1 }, { "id": 11, "code": "Ж-б", "name": "железобетон", "master_realty_type_id": 1 }, { "id": 18, "code": "Стал.", "name": "сталинский", "master_realty_type_id": 1 }, { "id": 19, "code": "бетон", "name": "бетон", "master_realty_type_id": 4 }, { "id": 20, "code": "дерево", "name": "дерево", "master_realty_type_id": 4 }, { "id": 21, "code": "кирпич", "name": "кирпич", "master_realty_type_id": 4 }, { "id": 22, "code": "металл", "name": "металл", "master_realty_type_id": 4 }, { "id": 23, "code": "пластик", "name": "пластик", "master_realty_type_id": 4 }, { "id": 24, "code": "Дер.", "name": "деревянный", "master_realty_type_id": 2 }, { "id": 25, "code": "Газоблок.", "name": "газоблочный", "master_realty_type_id": 2 }, { "id": 26, "code": "Кам.", "name": "каменный", "master_realty_type_id": 2 }, { "id": 27, "code": "Каркас.", "name": "каркасный", "master_realty_type_id": 2 }, { "id": 28, "code": "Кирп.", "name": "кирпичный", "master_realty_type_id": 2 }, { "id": 29, "code": "Легкобетон.", "name": "легкобетонный", "master_realty_type_id": 2 }, { "id": 30, "code": "Многослой.", "name": "многослойный", "master_realty_type_id": 2 }, { "id": 31, "code": "Монолит.", "name": "монолитный", "master_realty_type_id": 2 }, { "id": 32, "code": "Щит.", "name": "щитовой", "master_realty_type_id": 2 }],
            water_closet_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "-", "name": "отсутствует" }, { "id": 2, "code": "С", "name": "совмещенный" }, { "id": 3, "code": "Р", "name": "раздельный" }, { "id": 4, "code": "2", "name": "два санузла" }, { "id": 5, "code": "3", "name": "три санузла" }, { "id": 6, "code": "4", "name": "четыре санузла" }, { "id": 7, "code": "2С", "name": "два совмещенных санузла" }, { "id": 8, "code": "2Р", "name": "два раздельных санузла" }, { "id": 9, "code": "3С", "name": "три совмещенных санузла" }, { "id": 10, "code": "3Р", "name": "три раздельных санузла" }, { "id": 11, "code": "4С", "name": "четыре совмещенных санузла" }, { "id": 12, "code": "4Р", "name": "четыре раздельных санузла" }, { "id": 13, "code": "+", "name": "есть санузел" }],
            window_overlook_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "на улицу", "name": "окна на улицу" }, { "id": 2, "code": "во двор", "name": "окна во двор" }, { "id": 3, "code": "во двор и на улицу", "name": "окна во двор и на улицу" }],
            rooms_adjacency_type: [{ "id": 0, "code": "", "name": "" }, { "id": 1, "code": "С", "name": "смежные" }, { "id": 2, "code": "Р", "name": "раздельные" }, { "id": 3, "code": "С+Р", "name": "смежные+раздельные" }],
            sale_type: [{ "id": 0, "name": "" }, { "id": 9, "name": "прямая продажа" }, { "id": 10, "name": "альтернатива" }],
        };
        const _dics = new Map();
        function dic_fld_value(dic_name, id, fld, default_value) {
            let result;
            let dic = _dics.get(dic_name);
            if (!dic) {
                const dic_def = DICTIONARIES[dic_name];
                if (dic_def) {
                    dic = new Map(dic_def.map((item) => [item.id, item]));
                    _dics.set(dic_name, dic);
                }
            }
            if (dic && dic.has(id)) {
                const value = dic.get(id);
                if (value)
                    result = value[fld];
            }
            if (result === void 0 && default_value !== void 0)
                result = default_value;
            return result;
        }
        let BwGrid2ColAlign;
        (function (BwGrid2ColAlign) {
            BwGrid2ColAlign[BwGrid2ColAlign["center"] = 0] = "center";
            BwGrid2ColAlign[BwGrid2ColAlign["justify"] = 1] = "justify";
            BwGrid2ColAlign[BwGrid2ColAlign["left"] = 2] = "left";
            BwGrid2ColAlign[BwGrid2ColAlign["right"] = 3] = "right";
        })(BwGrid2ColAlign = $$.BwGrid2ColAlign || ($$.BwGrid2ColAlign = {}));
        class $bw_grid2 extends $.$bw_grid2 {
            cols() {
                const result = this.col_ids_visible().map((id) => this.Col(id));
                return result;
            }
            cells(i) {
                let result = null;
                if (this.is_visible_row(i) ||
                    this.col_resizing() === null && this.col_moving_pos() === null && !this.col_release_pos_animation_trigger()) {
                    const col_ids_visible_set = this.col_ids_visible_set();
                    const iter = col_ids_visible_set.values();
                    let next = iter.next();
                    result = [];
                    while (!next.done) {
                        const id = next.value;
                        result.push(this.Cell({ i, id }));
                        next = iter.next();
                    }
                }
                return result;
            }
            col_caption(id) {
                const col_def = this.col_defs().get(id);
                const result = !col_def ? '' : col_def.caption;
                return result;
            }
            check_search_result_id() {
                if (this.search_result_id() !== this._search_result_id) {
                    this.recs_count(null);
                    this._recs = void 0;
                    this._search_result_id = this.search_result_id();
                }
            }
            request_data_worker(request, response) {
                if (!this._data_worker_requests)
                    this._data_worker_requests = [];
                if (!this._data_worker_requests.find((item) => $$.$bw_equal(item.request, request)))
                    this._data_worker_requests.push({ request, response });
                if (!this._data_worker_requesting) {
                    const dataWorker = window.dataWorker;
                    const processRequest = () => {
                        if (this._data_worker_requests && this._data_worker_requests.length) {
                            const item = this._data_worker_requests[0];
                            request = item.request;
                            response = item.response;
                            this._data_worker_requesting = true;
                            dataWorker.postMessage(request);
                        }
                    };
                    dataWorker.onmessage = (event) => {
                        this._data_worker_requests.shift();
                        this._data_worker_requesting = false;
                        if (event.data.status != 'ok') {
                            console[event.data.status](event.data.message);
                        }
                        response(event);
                        processRequest();
                    };
                    processRequest();
                }
            }
            recs_count(val, force) {
                let result;
                if (val !== void 0) {
                    result = super.recs_count(val, force);
                }
                else {
                    this.check_search_result_id();
                    result = super.recs_count();
                    if (result === null) {
                        this.request_data_worker({ cmd: 'count' }, (event) => {
                            this.recs_count(event.data.count);
                            this.row_defs(null);
                        });
                    }
                }
                return result || 0;
            }
            rec_fld(idx_fld, val, force) {
                if (val !== void 0) {
                    if (!this._recs)
                        this._recs = new Map();
                    let rec = this._recs.get(idx_fld.idx);
                    if (!rec) {
                        rec = new Map();
                        this._recs.set(idx_fld.idx, rec);
                    }
                    rec.set(idx_fld.fld, val);
                    return val;
                }
                if (this.search_result_id() !== this._search_result_id && this._recs) {
                    this._recs = void 0;
                    this._search_result_id = this.search_result_id();
                }
                let result;
                if (!this._recs)
                    this._recs = new Map();
                const rec = this._recs.get(idx_fld.idx);
                if (rec && rec.has(idx_fld.fld)) {
                    result = rec.get(idx_fld.fld);
                }
                else {
                    if (!rec || !rec.has('guid')) {
                        if (!this._rec_fld_request_by_idx)
                            this._rec_fld_request_by_idx = new Map();
                        let request = this._rec_fld_request_by_idx.get(idx_fld.idx);
                        if (!request) {
                            request = new Set(['guid', 'w6_offer_id', 'object_guid']);
                            this._rec_fld_request_by_idx.set(idx_fld.idx, request);
                        }
                        request.add(idx_fld.fld);
                    }
                    else {
                        if (!this._rec_fld_request_by_guid) {
                            this._rec_fld_request_by_guid = new Map();
                        }
                        const guid = rec.get('guid');
                        let request = this._rec_fld_request_by_guid.get(guid);
                        if (!request) {
                            request = new Set();
                            this._rec_fld_request_by_guid.set(guid, request);
                            if (!this._idx_by_guid)
                                this._idx_by_guid = new Map();
                            this._idx_by_guid.set(guid, idx_fld.idx);
                        }
                        request.add(idx_fld.fld);
                    }
                    if (!this._rec_fld_waiting) {
                        const doRequest = () => {
                            if (!this._rec_fld_request_by_guid)
                                this._idx_by_guid = void 0;
                            if (!this._rec_fld_request_by_guid && !this._rec_fld_request_by_idx)
                                return;
                            const start = Date.now();
                            this._rec_fld_waiting = true;
                            setTimeout(() => {
                                if (this._rec_fld_request_by_guid) {
                                    this.request_data_worker({ cmd: 'recs', by_guid: this._rec_fld_request_by_guid }, (event) => {
                                        this._rec_fld_waiting = false;
                                        if (event.data.status == 'ok') {
                                            event.data.by_guid.forEach((fld_values, guid) => {
                                                const idx = this._idx_by_guid.get(guid);
                                                if (idx !== void 0) {
                                                    fld_values.forEach((fld_value, fld) => {
                                                        this.rec_fld({ idx, fld }, fld_value);
                                                    });
                                                }
                                            });
                                        }
                                        doRequest();
                                    });
                                    this._rec_fld_request_by_guid = void 0;
                                }
                                else if (this._rec_fld_request_by_idx) {
                                    this.request_data_worker({ cmd: 'recs', by_idx: this._rec_fld_request_by_idx }, (event) => {
                                        this._rec_fld_waiting = false;
                                        if (event.data.status == 'ok') {
                                            event.data.by_idx.forEach((fld_values, idx) => {
                                                fld_values.forEach((fld_value, fld) => {
                                                    this.rec_fld({ idx, fld }, fld_value);
                                                });
                                            });
                                        }
                                        doRequest();
                                    });
                                    this._rec_fld_request_by_idx = void 0;
                                }
                                else {
                                    this._rec_fld_waiting = false;
                                }
                            }, 16);
                        };
                        doRequest();
                    }
                    result = void 0;
                }
                return result;
            }
            cell_content(ij) {
                let result = '';
                const idx = this.row_def_idx(ij.i);
                if (ij.id == 'blank') {
                    result = '';
                }
                else {
                    if (idx !== void 0) {
                        const col_def = this.col_defs_default()[ij.id];
                        const fld = col_def.fld || ij.id;
                        const fld_list = Array.isArray(fld) ? fld : [fld];
                        const value_list = [];
                        const count = fld_list.length;
                        let has_undef = false;
                        for (let i = 0; i < count; i++) {
                            const value = this.rec_fld({ idx, fld: fld_list[i] });
                            if (value === void 0)
                                has_undef = true;
                            value_list.push(value);
                        }
                        if (!has_undef)
                            result = typeof col_def.formatter != 'function' ?
                                `${value_list}` :
                                col_def.formatter.apply(this, value_list);
                    }
                }
                return result;
            }
            row_note(i) {
                const idx = this.row_def_idx(i);
                const result = this.rec_fld({ idx, fld: 'note' });
                if (result) {
                    new $.$mol_defer(() => {
                        const dom_node = this.Note(i).dom_node();
                        const height = dom_node.scrollHeight;
                        const delta = height - dom_node.offsetHeight;
                        if (delta > 0) {
                            let { note, footer } = this.row_footer_height_of_idx(idx);
                            note += delta;
                            footer += delta;
                            this.row_footer_height_of_idx(idx, { note, footer });
                        }
                    });
                }
                return result;
            }
            col_ids_visible_set(val, force) {
                let result = super.col_ids_visible_set(val, force);
                if (result === null) {
                    result = new Set(this.col_ids_visible());
                    super.col_ids_visible_set(result);
                }
                else {
                    val = new Set(this.col_ids_visible());
                    if (!$$.$bw_equal(result, val)) {
                        console.warn(result, val);
                        result = val;
                        super.col_ids_visible_set(result);
                    }
                }
                return result;
            }
            col_ids_visible(val, force) {
                const col_defs = this.col_defs();
                if (val !== void 0) {
                    const col_defs_new = new Map();
                    const count = val.length;
                    const cols_visible = new Set();
                    for (let i = 0; i < count; i++) {
                        const col_id = val[i];
                        if (!col_defs.has(col_id))
                            continue;
                        const col_def = col_defs.get(col_id);
                        if (col_def.hidden)
                            col_def.hidden = false;
                        col_defs_new.set(col_id, col_def);
                        cols_visible.add(col_id);
                    }
                    [...col_defs.keys()].filter(col_id => !cols_visible.has(col_id)).forEach(col_id => {
                        const col_def = col_defs.get(col_id);
                        if (!col_def.hidden)
                            col_def.hidden = true;
                        col_defs_new.set(col_id, col_def);
                    });
                    this.col_defs(col_defs_new);
                }
                const result = [...this.col_defs().entries()]
                    .filter((entry) => !entry[1].hidden)
                    .map((entry) => entry[0]);
                return result;
            }
            col_id_idx_visible(id) {
                return this.col_ids_visible().findIndex((col_id) => col_id == id);
            }
            col_defs(val) {
                let result = super.col_defs(val);
                if (result === null) {
                    result = new Map();
                    const col_defs_default = this.col_defs_default();
                    Object.keys(col_defs_default).forEach((id) => {
                        result.set(id, col_defs_default[id]);
                    });
                }
                return result;
            }
            col_defs_store(val) {
                const result = !val || !val.size ? null : [...val.entries()].map((entry) => {
                    const { width, hidden } = entry[1];
                    entry[1] = { width, hidden };
                    return entry;
                });
                return result;
            }
            col_defs_restore(val_store) {
                const col_defs_default = this.col_defs_default();
                const restored_ids = new Set();
                const entries = !Array.isArray(val_store) ? null : val_store
                    .filter((item) => Array.isArray(item) &&
                    item.length == 2 &&
                    typeof item[0] == 'string' &&
                    col_defs_default[item[0]] &&
                    item[1] && typeof item[1] == 'object' &&
                    Number.isInteger(item[1].width) &&
                    (item[1].hidden === void 0 || typeof item[1].hidden == 'boolean') &&
                    true)
                    .map((item) => {
                    const id = item[0];
                    item[1] = Object.assign({}, col_defs_default[id], item[1]);
                    restored_ids.add(id);
                    return item;
                })
                    .concat(Object.keys(col_defs_default)
                    .filter(id => !restored_ids.has(id))
                    .map(id => {
                    return [id, col_defs_default[id]];
                }));
                const result = !entries || !entries.length ? null : new Map(entries);
                return result;
            }
            col_defs_default() {
                const num_formatter = (num) => num == null ? '?' : '' + num;
                const price_formatter = (price) => {
                    if (Number.isFinite(price))
                        price = Math.floor(Math.abs(price));
                    if (!price)
                        return '?';
                    let result = price.toString();
                    const pattern = /(-?\d+)(\d{3})/;
                    while (pattern.test(result))
                        result = result.replace(pattern, "$1 $2");
                    return result;
                };
                const dic_col_def = (fld, caption, opt) => {
                    const dic_name = fld + '_type';
                    return {
                        [dic_name]: Object.assign({ caption, width: this.col_width_min() * 1.2 }, opt, { fld: dic_name + '_id', formatter: (id) => dic_fld_value(dic_name, id, 'code', '') })
                    };
                };
                const result = Object.assign({ 'blank': { width: 1.5 * this.col_width_min(), caption: '' }, 'photo': { width: this.col_width_min(), caption: 'Фото' }, 'room_qt': { width: this.col_width_min() * 2, caption: 'Комнат',
                        fld: 'total_room_count',
                        formatter: num_formatter,
                    }, 'subway': { width: this.col_width_min() * 6, caption: 'Метро/ЖД',
                        align: BwGrid2ColAlign.left,
                        fld: 'geo_cache_subway_station_name_1',
                        formatter: (value) => '' + value,
                    }, 'far': { width: this.col_width_min() * 3, caption: 'От станции',
                        fld: ['walking_access_1', 'transport_access_1'],
                        formatter: (walking_access_1, transport_access_1) => walking_access_1 ? walking_access_1 + 'п' :
                            transport_access_1 ? transport_access_1 + 'т' :
                                '',
                    }, 'address': { width: this.col_width_min() * 6, caption: 'Адрес',
                        align: BwGrid2ColAlign.left,
                        fld: ['geo_cache_street_name', 'geo_cache_building_name'],
                        formatter: (geo_cache_street_name, geo_cache_building_name) => !geo_cache_building_name ? geo_cache_street_name : geo_cache_street_name + ', ' + geo_cache_building_name,
                    }, 'bld': { width: this.col_width_min() * 3, caption: 'Дом',
                        fld: ['storey', 'storeys_count', 'walls_material_type_id'],
                        formatter: (storey, storeys_count, walls_material_type_id) => num_formatter(storey) + '/' + num_formatter(storeys_count) + ' ' + dic_fld_value('walls_material_type', walls_material_type_id, 'code', '?'),
                    } }, dic_col_def('balcony', 'Балкон'), dic_col_def('water_closet', 'Санузел'), dic_col_def('parking', 'Парковка'), dic_col_def('territory', 'Территория', { width: this.col_width_min() * 4 }), dic_col_def('window_overlook', 'Окна', { width: this.col_width_min() * 2 }), dic_col_def('apartment_condition', 'Ремонт', { width: this.col_width_min() * 4 }), dic_col_def('elevator', 'Лифт', { width: this.col_width_min() * 2 }), { 'square': { width: this.col_width_min() * 4, caption: 'Площадь',
                        fld: ['total_square', 'life_square', 'kitchen_square'],
                        formatter: (total_square, life_square, kitchen_square) => num_formatter(total_square) + '/' + num_formatter(life_square) + '/' + num_formatter(kitchen_square),
                    }, 'square_explication': { width: this.col_width_min() * 5, caption: 'По комнатам',
                    }, 'is_mortgage_available': { width: this.col_width_min() * 1.5, caption: 'Ипотека',
                        formatter: (value) => value === true ? '+' : value === false ? '-' : ''
                    }, 'price_rub': { width: this.col_width_min() * 4, caption: 'Цена ₽',
                        formatter: price_formatter,
                    }, 'meter_price_rub': { width: this.col_width_min() * 3, caption: '₽/м²',
                        formatter: price_formatter,
                    }, 'pub_datetime': { width: this.col_width_min() * 3, caption: 'Дата',
                        formatter: (value) => new $.$mol_time_moment(value).toString('DD.MM.YYYY')
                    }, 'media_name': { width: this.col_width_min() * 3, caption: 'Источник' }, 'phone_list': { width: this.col_width_min() * 6, caption: 'Телефон',
                        align: BwGrid2ColAlign.left,
                        formatter: (value) => !value ? '' : value
                            .split(/\D+/)
                            .map(phone => '8-' + phone.slice(1, 4) + '-' + phone.slice(4, 7) + '-' + phone.slice(7, 9) + '-' + phone.slice(9, 11)).join(', '),
                    } });
                return result;
            }
            col_width(id, val, force) {
                if (val !== void 0) {
                    val = Math.max(val, this.col_width_min());
                    if (this._col_width_defer !== void 0) {
                        $.$mol_defer.drop(this._col_width_defer);
                    }
                    this._col_width_defer = new $.$mol_defer(() => {
                        this._col_width_defer = void 0;
                        const col_defs = this.col_defs();
                        const col_def = col_defs.get(id);
                        if (col_def) {
                            const col_defs_new = new Map(col_defs.entries());
                            col_defs_new.set(id, Object.assign({}, col_def, { width: val }));
                            this.col_defs(col_defs_new);
                        }
                    });
                    super.col_width(id, val, force);
                }
                let result = super.col_width(id);
                if (result === null) {
                    const col_defs = this.col_defs();
                    const col_def = col_defs.get(id);
                    if (col_def) {
                        result = col_def.width;
                        super.col_width(id, result);
                    }
                }
                return result;
            }
            col_left_source(id, val, force) {
                let result = super.col_left_source(id, val, force);
                if (result === null || this.col_resizing() === null) {
                    const col_ids = this.col_ids_visible();
                    const count = col_ids.length;
                    const i = col_ids.findIndex(col_id => col_id == id);
                    result = i <= 0 ? this.body_padding_left() :
                        this.col_left_source(col_ids[i - 1]) + this.col_width(col_ids[i - 1]);
                    super.col_left_source(result);
                }
                return result;
            }
            cell_left(ij) {
                const result = this.col_left(ij.id) - this.body_padding_left();
                return result;
            }
            cell_width(ij) {
                const result = this.col_width(ij.id);
                return result;
            }
            cell_align(ij) {
                const col_defs = this.col_defs_default();
                const col_def = col_defs[ij.id];
                const align = col_def.align || BwGrid2ColAlign.center;
                const result = BwGrid2ColAlign[align];
                return result;
            }
            col_left(id, val, force) {
                let result;
                const col_moving_pos = this.col_moving_pos();
                if (col_moving_pos === null) {
                    if (this.col_resizing() !== null) {
                        result = super.col_left(id, val);
                        if (result === null)
                            result = this.col_left_source(id);
                    }
                    else {
                        const col_release_pos = this.col_release_pos();
                        if (col_release_pos === null || col_release_pos.id != id) {
                            result = this.col_left_source(id);
                        }
                        else {
                            result = col_release_pos.x;
                        }
                        result = super.col_left(id, result);
                    }
                }
                else {
                    let _initial;
                    result = id == this.col_to_move() ? col_moving_pos.x : $$.bw_animate({
                        _super: (val) => {
                            const result = super.col_left(id, val);
                            _initial = result;
                            return result;
                        },
                        _master: () => {
                            const result = this.col_left_source(id);
                            return result;
                        },
                        _value: (master) => master,
                        _steps: (initial, target) => (target - initial) / 16,
                        _easing: $$.BwEasing.easeInOutQuad,
                        data_key: '_' + 'col_left' + '_anim_data' + `_${id}`,
                    }, val, force);
                }
                return result;
            }
            col_top(id, val, force) {
                let result;
                const col_moving_pos = this.col_moving_pos();
                if (col_moving_pos !== null) {
                    result = id == this.col_to_move() ?
                        col_moving_pos.y :
                        this.col_top_source(id);
                }
                else {
                    const col_release_pos = this.col_release_pos();
                    result = !col_release_pos || col_release_pos.id != id ?
                        this.col_top_source(id) :
                        col_release_pos.y;
                }
                return result;
            }
            col_release_pos() {
                return this.col_release_pos_animation_trigger();
            }
            col_release_pos_animation_triggered_value(trigger) {
                let result;
                if (!trigger) {
                    result = null;
                }
                else {
                    const id = trigger.id;
                    result = { id, x: this.col_left_source(id), y: this.col_top_source(id) };
                }
                return result;
            }
            col_release_pos_animation_steps(p) {
                const result = p.start.id != p.end.id ? 1 :
                    Math.max(4, Math.abs(p.end.y - p.start.y) / 16, Math.abs(p.end.x - p.start.x) / 16);
                return result;
            }
            col_release_pos_animation_step_value(p) {
                const t = p.step / p.steps;
                const _easing = $$.BwEasing.easeInOutQuad;
                const result = {
                    x: $$.bw_easing_value(p.start.x, p.end.x, t, _easing),
                    y: $$.bw_easing_value(p.start.y, p.end.y, t, _easing),
                    id: p.start.id,
                };
                return result;
            }
            col_release_pos_animation_finish() {
                super.col_release_pos_animation_trigger(null);
            }
            header_height(val, force) {
                const result = this.row_min_height();
                return result;
            }
            col_width_min() {
                return this.col_resize_padding() * 3;
            }
            cursor() {
                const result = this.col_to_resize() !== null || this.col_resizing() !== null ? 'col-resize' :
                    this.col_moving_pos() !== null ? 'grabbing' :
                        null;
                return result;
            }
            col_resize_padding() {
                return 8;
            }
            col_id(id) {
                if (id && typeof id === 'object')
                    id = id.id;
                return id;
            }
            is_moving_col(id) {
                if (id && typeof id === 'object')
                    id = id.id;
                const result = this.col_moving_pos() !== null && this.col_to_move() == id ||
                    false;
                return result;
            }
            is_releasing_col(id) {
                if (id && typeof id === 'object')
                    id = id.id;
                const result = this.col_release_pos() !== null && this.col_release_pos().id == id ||
                    false;
                return result;
            }
            header_client_rect_left() {
                const result = this.Header().dom_node().getBoundingClientRect().left;
                return result;
            }
            body_height() {
                const result = this.height() - this.header_height();
                return result;
            }
            row_i_max() {
                let result = null;
                const body_height = this.body_height();
                if (Number.isFinite(body_height)) {
                    const row_min_height = this.row_min_height();
                    result = Math.max(0, Math.ceil(body_height / row_min_height) * 2);
                }
                return result;
            }
            viewport_min() {
                return -Math.floor(this.body_height() / 2);
            }
            viewport_max() {
                return 3 * Math.floor(this.body_height() / 2);
            }
            rows() {
                let result = [];
                const row_i_max = this.row_i_max();
                if (Number.isFinite(row_i_max)) {
                    result.length = row_i_max + 1;
                    for (let i = 0; i <= row_i_max; i++) {
                        result[i] = this.Row(i);
                    }
                }
                return result;
            }
            row_defs(val, force) {
                let result;
                if (val) {
                    this.update_row_defs(val, force);
                }
                result = super.row_defs();
                if (!result && this.row_i_max()) {
                    const row_i_max = this.row_i_max();
                    result = [];
                    result.length = row_i_max + 1;
                    let top = 0;
                    let idx = 0;
                    const body_height = this.body_height();
                    let row_i_last = 0;
                    const rows_count = this.rows_count();
                    const viewport_max = this.viewport_max();
                    for (; idx < rows_count && top < viewport_max && idx <= row_i_max; idx++) {
                        const height = this.row_height_of_idx(idx);
                        result[idx] = { idx, top, height };
                        top += height;
                        row_i_last = this.row_i(idx + 1);
                    }
                    this.row_i_diap({ first: 0, last: row_i_last });
                    this.update_row_defs(result);
                }
                let delta = this.scroll_y_delta();
                this.scroll_y_delta(0);
                this.scroll_y(delta);
                result = super.row_defs();
                return result;
            }
            row_i_diap(val, force) {
                let result = super.row_i_diap(val, force);
                if (result === null) {
                    result = { first: 0, last: 0 };
                }
                return result;
            }
            update_row_defs(row_defs_new, force) {
                const body_height = this.body_height();
                const count = row_defs_new.length;
                for (let i = 0; i < count; i++) {
                    const row_def = row_defs_new[i];
                    if (row_def) {
                        this.row_def_idx(i, row_def.idx);
                        const height_old = this.row_def_height(i);
                        this.row_def_height(i, row_def.height);
                        const top_old = this.row_def_top(i);
                        if (intersects(top_old, top_old + height_old, 0, body_height) ||
                            intersects(row_def.top, row_def.top + row_def.height, 0, body_height) ||
                            false) {
                            this.row_def_top(i, row_def.top);
                        }
                    }
                }
                super.row_defs(row_defs_new, force);
            }
            scroll_y(delta) {
                const rows_count = this.rows_count();
                let is_bog = true;
                let is_eog = true;
                const row_i_diap = this.row_i_diap();
                const row_i_first = row_i_diap.first;
                const row_i_last = row_i_diap.last;
                const row_defs = super.row_defs();
                if (rows_count >= 2 && row_defs) {
                    let row_i = row_i_first;
                    const row_def = row_defs[row_i];
                    let top = row_def.top - delta;
                    let idx = row_def.idx;
                    const body_height = this.body_height();
                    if (delta < 0) {
                        while (0 < top && idx) {
                            row_i = this.row_i(row_i - 1);
                            top -= this.row_height_of_idx(--idx);
                        }
                        if (!idx && 0 < top)
                            top = Math.max(0, top + delta);
                    }
                    else {
                        for (; row_i != row_i_last && top < body_height && idx < rows_count; row_i = this.row_i(row_i + 1), idx++) {
                            top += this.row_height_of_idx(idx);
                        }
                        for (; top < body_height && idx < rows_count; row_i = this.row_i(row_i + 1), idx++) {
                            top += this.row_height_of_idx(idx);
                        }
                        if (idx == rows_count && top < body_height) {
                            const row_space_bottom_max = this.row_space_bottom_max();
                            delta = Math.min(delta, row_space_bottom_max - Math.min(row_space_bottom_max, body_height - top - delta));
                        }
                        top = row_def.top - delta;
                        idx = row_def.idx;
                        row_i = row_i_first;
                    }
                    const viewport_min = this.viewport_min();
                    const viewport_max = this.viewport_max();
                    let row_i_first_new;
                    let row_i_last_new;
                    const row_defs_new = [];
                    row_defs_new.length = this.row_i_max() + 1;
                    is_bog = false;
                    is_eog = false;
                    for (; top < viewport_max && idx < rows_count; row_i = this.row_i(row_i + 1), idx++) {
                        const height = this.row_height_of_idx(idx);
                        if (top + height >= viewport_min) {
                            if (row_i_first_new === void 0) {
                                row_i_first_new = row_i;
                                is_bog = !idx && !top;
                            }
                            row_defs_new[row_i] = { idx, top, height };
                            row_i_last_new = this.row_i(row_i + 1);
                        }
                        top += height;
                    }
                    {
                        const row_def = row_defs_new[this.row_i(row_i_last_new - 1)];
                        is_eog = row_def.idx == rows_count - 1 && (body_height - row_def.top - row_def.height) >= this.row_space_bottom_max();
                    }
                    this.row_i_diap({ first: row_i_first_new, last: row_i_last_new });
                    this.update_row_defs(row_defs_new);
                }
                this.is_bog(is_bog);
                this.is_eog(is_eog);
            }
            row_height_of_idx(idx) {
                let result = this.row_min_height();
                const animating_footer = this.animating_footer();
                let i;
                if (animating_footer && (i = animating_footer[idx]) !== void 0) {
                    result += this.row_footer_height(i);
                }
                else {
                    result += this.row_footer_height_of_idx(idx).footer;
                }
                return result;
            }
            is_visible_row(i) {
                const row_i_diap = this.row_i_diap();
                const row_i_first = row_i_diap.first;
                const row_i_last = row_i_diap.last;
                const result = (row_i_first < row_i_last ? row_i_first <= i && i < row_i_last : row_i_first <= i || i < row_i_last);
                return result;
            }
            row_display(i) {
                const result = this.is_visible_row(i) ? 'block' : 'none';
                return result;
            }
            row_def_idx(i, val, force) {
                let result = super.row_def_idx(i, val, force);
                return result;
            }
            row_def_height(i, val, force) {
                let result = super.row_def_height(i, val, force) || 0;
                return result;
            }
            row_def_top(i, val, force) {
                let result = super.row_def_top(i, val, force) || 0;
                return result;
            }
            row_top(i) {
                const result = this.row_def_top(i) || 0;
                return result;
            }
            row_height(i) {
                const result = this.row_def_height(i) || 0;
                return result;
            }
            row_i(i) {
                const count = this.row_i_max() + 1;
                return (i + count) % count;
            }
            rows_count() {
                return this.recs_count();
            }
            row_dblclick(i, event) {
                const idx = this.row_def_idx(i);
                const offer_id = this.rec_fld({ idx, fld: 'w6_offer_id' });
                if (offer_id == void 0)
                    return;
                const row_footer_visible_offer_ids = this.row_footer_visible_offer_ids();
                const row_footer_visible_offer_ids_new = new Set(row_footer_visible_offer_ids.keys());
                if (row_footer_visible_offer_ids_new.has(offer_id)) {
                    row_footer_visible_offer_ids_new.delete(offer_id);
                }
                else {
                    row_footer_visible_offer_ids_new.add(offer_id);
                }
                this.animating_footer({ [idx]: i });
                this.row_footer_visible_offer_ids(row_footer_visible_offer_ids_new);
            }
            row_footer_visible_offer_ids(val, force) {
                let result = super.row_footer_visible_offer_ids(val, force);
                if (result === null) {
                    result = new Set();
                }
                return result;
            }
            row_footer_visible_offer_ids_store(val) {
                return !val ? null : [...val.keys()];
            }
            row_footer_visible_offer_ids_restore(val_store) {
                const result = !Array.isArray(val_store) ? null :
                    new Set(val_store.filter(item => Number.isInteger(item) && item > 0));
                return result;
            }
            row_footer_height_default() {
                return 72;
            }
            row_footer_item_height_min() {
                return 36;
            }
            row_footer_height_of_idx(idx, val, force) {
                const offer_id = this.rec_fld({ idx, fld: 'w6_offer_id' });
                let result = { footer: 0, note: 0 };
                if (offer_id && this.row_footer_visible_offer_ids().has(offer_id)) {
                    result = super.row_footer_height_of_idx(idx, val);
                    if (!result) {
                        const row_footer_height_default = this.row_footer_height_default();
                        const row_footer_item_height_min = this.row_footer_item_height_min();
                        const note = row_footer_item_height_min;
                        const footer = note + row_footer_item_height_min;
                        result = { note, footer };
                    }
                }
                return result;
            }
            Footer(i) {
                const result = !this.row_footer_height(i) ? null : super.Footer(i);
                return result;
            }
            footer_opacity(i) {
                return super.footer_opacity(i);
            }
            footer_opacity_animation_trigger(i) {
                const idx = this.row_def_idx(i);
                return this.row_footer_height_of_idx(idx).footer;
            }
            footer_opacity_animation_steps(i) {
                return this.row_footer_height_animation_steps(i) * 2;
            }
            footer_opacity_animation_triggered_value(i, trigger) {
                return trigger ? 1 : 0;
            }
            footer_opacity_animation_easing(i, p) {
                return p.trigger ? $$.BwEasing.easeInQuint : $$.BwEasing.easeOutQuint;
            }
            row_footer_height(i) {
                const idx = this.row_def_idx(i);
                return this.row_footer_height_of_idx(idx).footer;
            }
            row_footer_height_animation_easing(i) {
                return $$.BwEasing.easeOutQuad;
            }
            row_footer_height_animation_steps(i) {
                return 4;
            }
            row_footer_height_animation_finish(i) {
                this.animating_footer(null);
            }
            row_note_height(i) {
                const idx = this.row_def_idx(i);
                return this.row_footer_height_of_idx(idx).note;
            }
            row_note_height_animation_steps(i) {
                return this.row_footer_height_animation_steps(i);
            }
            row_note_height_animation_easing(i) {
                return $$.BwEasing.easeOutQuad;
            }
            row_user_note_height(i) {
                const idx = this.row_def_idx(i);
                const row_footer_height_of_idx = this.row_footer_height_of_idx(idx);
                return row_footer_height_of_idx.footer - row_footer_height_of_idx.note;
            }
            row_user_note_height_animation_easing(i) {
                return $$.BwEasing.easeOutQuad;
            }
            row_user_note_height_animation_steps(i) {
                return this.row_footer_height_animation_steps(i);
            }
            row_footer_heights(val, force) {
                let result = super.row_footer_heights(val, force);
                if (!result) {
                    result = new Map();
                }
                return result;
            }
            row_footer_heights_store(val) {
                return !val ? null : [...val.entries()];
            }
            row_footer_heights_restore(val_store) {
                const result = !Array.isArray(val_store) ? null : new Map(val_store
                    .filter((item) => Array.isArray(item) &&
                    typeof item[0] == 'number' &&
                    (item[1] !== null && typeof item[1] == 'object') &&
                    Number.isInteger(item[1].footer) && Number.isInteger(item[1].note) &&
                    true).map((item) => {
                    const note = Math.max(this.row_footer_item_height_min(), item[1].note);
                    const footer = Math.max(this.row_footer_item_height_min() + note, item[1].footer);
                    return [item[0], { note, footer }];
                }));
                return result;
            }
            is_bog(val, force) {
                const result = this.rows_count() < 2 || super.is_bog(val, force);
                return result;
            }
            is_eog(val, force) {
                const result = this.rows_count() < 2 || super.is_eog(val, force);
                return result;
            }
            row_space_bottom_max() {
                let result = this.body_height();
                for (let idx = this.rows_count() - 1; idx >= 0; idx--) {
                    const height = this.row_height_of_idx(idx);
                    if (result - height <= 0)
                        break;
                    result -= height;
                }
                return result;
            }
            Body() {
                const result = super.Body();
                const raf = window.requestAnimationFrame;
                let raf_id;
                let scrollAccu = 0;
                let lastDelta;
                const isPassive = false;
                const stepAnimation = () => {
                    this.scroll_y(scrollAccu);
                    raf_id = void 0;
                    scrollAccu = 0;
                };
                const mousewheelListener = (event) => {
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
                    if (scrollAccu < 0 && !this.is_bog() || scrollAccu > 0 && !this.is_eog()) {
                        if (!isPassive)
                            event.preventDefault();
                        if (raf_id == void 0) {
                            raf_id = raf ? raf(stepAnimation) : setTimeout(stepAnimation, 16);
                        }
                    }
                };
                result.dom_node().addEventListener('mousewheel', mousewheelListener, { passive: isPassive });
                new $.$mol_defer(() => {
                    this.rows_count();
                });
                return result;
            }
            col_client_left(id) {
                const result = this.header_client_rect_left() + this.col_left_source(id);
                return result;
            }
            col_mousemove(id, event) {
                if (!event)
                    return;
                if (this.col_moving_pos() === null && this.col_resizing() === null) {
                    const resize_padding = this.col_resize_padding();
                    const idx = this.col_id_idx_visible(id);
                    const client_rect = this.Col(id).dom_node().getBoundingClientRect();
                    if (event.clientX <= client_rect.left + resize_padding && idx) {
                        this.col_to_resize(this.col_ids_visible()[idx - 1]);
                        this.col_to_move(null);
                    }
                    else if (event.clientX >= client_rect.left + client_rect.width - resize_padding) {
                        this.col_to_resize(id);
                        this.col_to_move(null);
                    }
                    else if (idx) {
                        this.col_to_resize(null);
                        this.col_to_move(id);
                    }
                    else {
                        this.col_to_resize(null);
                        this.col_to_move(null);
                    }
                }
            }
            header_mouseleave(event) {
                if (!event)
                    return;
                this.col_to_resize(null);
                if (this.col_moving_pos() === null) {
                    this.col_to_move(null);
                }
            }
            header_mousedown(event) {
                if (!event)
                    return;
                const col_to_resize = this.col_to_resize();
                if (col_to_resize !== null) {
                    const id = col_to_resize;
                    this.col_resizing(id);
                    const col_width = this.col_width(id);
                    const target = this.Header().dom_node();
                    let raf_id;
                    let delta = 0;
                    let col_width_new = col_width;
                    let col_width_prev = col_width;
                    let start = Date.now();
                    const col_ids = this.col_ids_visible();
                    const col_count = col_ids.length;
                    const col_i = col_ids.findIndex(col_id => col_id == id);
                    let col_left;
                    let col_widths;
                    if (0 <= col_i && col_i < col_count - 1) {
                        col_left = this.col_left_source(id);
                        col_widths = [];
                        for (let i = col_i + 1; i < col_count - 1; i++) {
                            col_widths[i] = this.col_width(col_ids[i]);
                        }
                    }
                    const stepAnimation = () => {
                        raf_id = void 0;
                        if (col_width_new == col_width_prev)
                            return;
                        col_width_prev = col_width_new;
                        this.col_width(id, col_width_new);
                        if (col_left !== void 0) {
                            let left = col_left + col_width_new;
                            for (let i = col_i + 1; i < col_count; i++) {
                                this.col_left(col_ids[i], left);
                                left += col_widths[i];
                            }
                        }
                    };
                    const raf = window.requestAnimationFrame;
                    const stopAnimation = () => {
                        if (raf_id === void 0)
                            return;
                        raf ? cancelAnimationFrame(raf_id) : clearTimeout(raf_id);
                        raf_id = void 0;
                    };
                    const doMove = (e) => {
                        col_width_new = Math.max(this.col_width_min(), col_width + (e.clientX - event.clientX));
                        stopAnimation();
                        if (col_width_new == col_width_prev)
                            return;
                        start = Date.now();
                        raf_id = raf ? raf(stepAnimation) : setTimeout(stepAnimation, 6);
                    };
                    const finishMove = (e) => {
                        this.col_resizing(null);
                        target.removeEventListener('mousemove', doMove);
                        target.removeEventListener('mouseup', finishMove);
                        target.removeEventListener('mouseleave', finishMove);
                    };
                    target.addEventListener('mousemove', doMove);
                    target.addEventListener('mouseup', finishMove);
                    target.addEventListener('mouseleave', finishMove);
                }
                else {
                    const id = this.col_to_move();
                    const target = document.body;
                    const col_left = this.col_left_source(id);
                    const header_height = this.header_height();
                    const clientX = event.clientX;
                    const clientY = event.clientY;
                    let clientXlast = clientX;
                    let is_to_left;
                    let offset = this.col_client_left(id) - event.clientX;
                    const width = this.col_width(id);
                    new $.$mol_defer(() => {
                        offset = this.col_client_left(id) - event.clientX;
                    });
                    const col_resize_padding = this.col_resize_padding();
                    const doMove = (e) => {
                        const deltaX = e.clientX - clientX;
                        const deltaY = e.clientY - clientY;
                        if (Math.abs(e.clientX - clientXlast) > col_resize_padding) {
                            is_to_left = e.clientX < clientXlast;
                            clientXlast = e.clientX;
                        }
                        if (deltaY < header_height && is_to_left !== void 0) {
                            let col_ids = this.col_ids_visible();
                            let left = e.clientX + offset;
                            const idx = col_ids.findIndex((col_id) => col_id == id);
                            const count = col_ids.length;
                            const idx_list = [];
                            for (let i = 1; i < count; i++) {
                                const col_id = col_ids[i];
                                const col_left = this.col_client_left(col_id);
                                const col_width = this.col_width(col_id);
                                if (intersects(left + col_resize_padding, left + width - col_resize_padding, col_left + col_resize_padding, col_left + col_width - col_resize_padding)) {
                                    idx_list.push(i);
                                }
                            }
                            let idx_new;
                            if (idx_list.length) {
                                if (idx_list.length == 1) {
                                    idx_new = idx_list[0] + (is_to_left ? 0 : 1);
                                }
                                else if (idx_list.length > 1) {
                                    if (col_ids[idx_list[0]] == id) {
                                        if (!is_to_left)
                                            idx_new = idx_list[1] + 1;
                                    }
                                    else if (col_ids[idx_list[idx_list.length - 1]] == id) {
                                        if (is_to_left)
                                            idx_new = idx_list[0];
                                    }
                                    else {
                                        idx_new = idx_list[1];
                                    }
                                }
                            }
                            if (idx_new !== void 0) {
                                is_to_left = void 0;
                                col_ids = col_ids.slice(0);
                                if (idx_new > idx) {
                                    col_ids.splice(idx_new, 0, id);
                                    col_ids.splice(idx, 1);
                                }
                                else {
                                    col_ids.splice(idx, 1);
                                    col_ids.splice(idx_new, 0, id);
                                }
                                this.col_ids_visible(col_ids);
                            }
                        }
                        this.col_moving_pos({ x: col_left + deltaX, y: deltaY });
                    };
                    const finishMove = (e) => {
                        this.col_release_pos_animation_trigger(Object.assign({}, this.col_moving_pos(), { id }));
                        this.col_moving_pos(null);
                        target.removeEventListener('mousemove', doMove);
                        target.removeEventListener('mouseup', finishMove);
                        target.removeEventListener('mouseleave', finishMove);
                    };
                    target.addEventListener('mousemove', doMove);
                    target.addEventListener('mouseup', finishMove);
                    target.addEventListener('mouseleave', finishMove);
                }
            }
        }
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "col_caption", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "rec_fld", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "cell_content", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "row_note", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "col_ids_visible_set", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "col_ids_visible", null);
        __decorate([
            $$.$bw_session
        ], $bw_grid2.prototype, "col_defs", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "col_width", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "col_left_source", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "col_left", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "col_top", null);
        __decorate([
            $$.$bw_animate
        ], $bw_grid2.prototype, "col_release_pos", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "header_height", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "rows", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "row_defs", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "is_visible_row", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "row_def_idx", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "row_def_height", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "row_def_top", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "row_top", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "row_height", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "row_footer_visible_offer_ids", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "row_footer_height_of_idx", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "Footer", null);
        __decorate([
            $$.$bw_animate_key
        ], $bw_grid2.prototype, "footer_opacity", null);
        __decorate([
            $$.$bw_animate_key
        ], $bw_grid2.prototype, "row_footer_height", null);
        __decorate([
            $$.$bw_animate_key
        ], $bw_grid2.prototype, "row_note_height", null);
        __decorate([
            $$.$bw_animate_key
        ], $bw_grid2.prototype, "row_user_note_height", null);
        __decorate([
            $$.$bw_session
        ], $bw_grid2.prototype, "row_footer_heights", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "is_bog", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "is_eog", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "row_space_bottom_max", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid2.prototype, "Body", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_grid2.prototype, "col_client_left", null);
        $$.$bw_grid2 = $bw_grid2;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//grid2.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_app extends $.$mol_view {
        title() {
            return this.app_title();
        }
        app_title() {
            return "";
        }
        sub() {
            return this.app_content();
        }
        app_content() {
            return [];
        }
        WaySelector() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_app_way_selector);
        }
        NewLook() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_app_new_look);
        }
        OldLook() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_app_old_look);
        }
        Login() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_login);
        }
        EasterPanel() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_easter_panel);
        }
        attr() {
            return (Object.assign({}, super.attr(), { "bw_look": this.bw_look(), "mol_theme": this.mol_theme() }));
        }
        bw_look() {
            return this.is_new_look();
        }
        is_new_look(val, force) {
            return (val !== void 0) ? val : false;
        }
        mol_theme() {
            return this.is_light_theme();
        }
        is_light_theme(val, force) {
            return (val !== void 0) ? val : false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_app.prototype, "WaySelector", null);
    __decorate([
        $.$mol_mem
    ], $bw_app.prototype, "NewLook", null);
    __decorate([
        $.$mol_mem
    ], $bw_app.prototype, "OldLook", null);
    __decorate([
        $.$mol_mem
    ], $bw_app.prototype, "Login", null);
    __decorate([
        $.$mol_mem
    ], $bw_app.prototype, "EasterPanel", null);
    __decorate([
        $.$mol_mem
    ], $bw_app.prototype, "is_new_look", null);
    __decorate([
        $.$mol_mem
    ], $bw_app.prototype, "is_light_theme", null);
    $.$bw_app = $bw_app;
})($ || ($ = {}));
(function ($) {
    class $bw_app_way_selector extends $.$mol_view {
        sub() {
            return [].concat(this.Bar());
        }
        Bar() {
            return ((obj) => {
                obj.sub = () => this.ways();
                return obj;
            })(new this.$.$mol_bar);
        }
        ways() {
            return [];
        }
        Link(way) {
            return ((obj) => {
                obj.title = () => this.link_title(way);
                obj.arg = () => this.link_arg(way);
                obj.event_click = (event) => this.link_click(way, event);
                return obj;
            })(new this.$.$bw_link);
        }
        link_title(way) {
            return "";
        }
        link_arg(way) {
            return ({});
        }
        link_click(way, event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_app_way_selector.prototype, "Bar", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_app_way_selector.prototype, "Link", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_app_way_selector.prototype, "link_click", null);
    $.$bw_app_way_selector = $bw_app_way_selector;
})($ || ($ = {}));
(function ($) {
    class $bw_app_old_look extends $.$mol_view {
        sub() {
            return [].concat(this.LookSelector(), this.Label());
        }
        LookSelector() {
            return ((obj) => {
                obj.event_click = (event) => this.link_click(event);
                obj.current = () => false;
                obj.title = () => "Новый дизайн";
                return obj;
            })(new this.$.$mol_link);
        }
        link_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        Label() {
            return ((obj) => {
                obj.sub = () => [].concat("Старый дизайн");
                return obj;
            })(new this.$.$mol_view);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_app_old_look.prototype, "LookSelector", null);
    __decorate([
        $.$mol_mem
    ], $bw_app_old_look.prototype, "link_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_app_old_look.prototype, "Label", null);
    $.$bw_app_old_look = $bw_app_old_look;
})($ || ($ = {}));
(function ($) {
    class $bw_app_new_look extends $.$mol_view {
        sub() {
            return [].concat(this.Menu(), this.Workspace());
        }
        Menu() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_mainmenu);
        }
        Workspace() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_workspace);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_app_new_look.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $bw_app_new_look.prototype, "Workspace", null);
    $.$bw_app_new_look = $bw_app_new_look;
})($ || ($ = {}));
//app.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_app extends $.$bw_app {
            static instance() {
                return $bw_app.Root(0);
            }
            app_title() {
                return this.app_content()[0].title();
            }
            app_content() {
                let result;
                if (this.selected_page() == 'selector') {
                    result = this.WaySelector();
                }
                else if (this.selected_page() == 'login') {
                    result = this.Login();
                }
                else if (this.is_new_look()) {
                    result = this.NewLook();
                }
                else {
                    result = this.OldLook();
                }
                const observer = new MutationObserver((mutation, observer) => {
                });
                observer.observe(document, { childList: true, subtree: true, });
                return [result, this.EasterPanel()];
            }
            attr() {
                const result = super.attr();
                let hierarchy = this.EasterPanel().hierarchy();
                Object.keys(hierarchy).forEach((id) => {
                    if (!hierarchy[id].sub.length) {
                        if (id == 'viewport-width') {
                            const switch_atom_value = this.EasterPanel().switch_atom_value(id);
                            if (this.EasterPanel().switch_atom_value(id) == 'auto') {
                                new $.$mol_defer(() => window.dispatchEvent(new Event('obtainActualMediaQueryTrue')));
                            }
                            else {
                                new $.$mol_defer(() => window.dispatchEvent(new Event('obtainActualMediaQueryFalse')));
                                result['_' + id] = this.EasterPanel().switch_atom_value(id);
                            }
                        }
                        else {
                            result['_' + id] = this.EasterPanel().switch_atom_value(id) === 'on' ?
                                this.EasterPanel().on_title(id) :
                                this.EasterPanel().off_title(id);
                        }
                    }
                });
                return result;
            }
            mol_theme() {
                return '$mol_theme_' + (this.is_light_theme() ? 'light' : 'dark');
            }
            selected_page() {
                let result = this.$.$mol_state_arg.value('page') || 'selector';
                return result;
            }
            bw_look() {
                return this.is_new_look() ? 'new' : 'old';
            }
            is_new_look(val) {
                return super.is_new_look(val);
            }
            is_light_theme(val) {
                return super.is_light_theme(val);
            }
        }
        __decorate([
            $$.$bw_local
        ], $bw_app.prototype, "is_new_look", null);
        __decorate([
            $$.$bw_local
        ], $bw_app.prototype, "is_light_theme", null);
        $$.$bw_app = $bw_app;
        class $bw_app_way_selector extends $.$bw_app_way_selector {
            way_def() {
                return {
                    'brand-new': {
                        title: 'Новый пользователь',
                        description: 'никогда не было работы с W7',
                        arg: {
                            page: 'normal',
                        },
                        local: {
                            look: 'new',
                        },
                    },
                    'no-reg': {
                        title: 'Без регистрации',
                        description: 'работа с W7 была, но всегда без регистрации',
                        arg: {
                            page: 'normal',
                        },
                    },
                    'reg-save': {
                        title: 'Регистрация с сохраненением',
                        description: 'была работа с W7 в режиме "зарегистрированный пользователь" c включенной "галочкой" "Оставаться в системе"',
                        arg: {
                            page: 'normal',
                        },
                    },
                    'reg-no-save': {
                        title: 'Регистрация без сохранения',
                        description: 'была работа с W7 в режиме "зарегистрированный пользователь", но "галочка" "Оставаться в системе" отключалась',
                        arg: {
                            page: 'login',
                        },
                    },
                };
            }
            ways() {
                return Object.keys(this.way_def()).map((id) => this.Link(id));
            }
            link_title(way) {
                return this.way_def()[way].title;
            }
            link_arg(way) {
                return this.way_def()[way].arg;
            }
            link_click(way, event, force) {
                if (!event)
                    return;
                if (way == 'brand-new') {
                    $bw_app.instance().is_new_look(true);
                }
            }
        }
        $$.$bw_app_way_selector = $bw_app_way_selector;
        class $bw_app_old_look extends $.$bw_app_old_look {
            link_click(event, force) {
                if (!event)
                    return;
                $bw_app.instance().is_new_look(true);
            }
        }
        $$.$bw_app_old_look = $bw_app_old_look;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//app.view.js.map
;
// const STORE = 'adv'
// const KEY_NAME = 'guid'

// function idb() {
//   return new Promise((resolve, reject) => {
//     const open = indexedDB.open('bw', DB_VERSION )
//     open.onupgradeneeded = event => {
//       idb = event.target.result
//       idb.createObjectStore(STORE, {
//         keyPath: KEY_NAME
//       })
//     }
//     open.onversionchange = event => {
//       console.warn(event)
//     }
//     open.onerror = event => {
//       console.log(event)
//       reject(event.target.error)
//     }
//     open.onsuccess = event => {
//       resolve(event.target.result)
//     }
//     // console.log(open)
//   })
//   .catch(error => console.log(error))
// }

const DB_NAME = 'bw'
const DB_VERSION = 1

function open_idb(onsuccess) {
  const open = indexedDB.open(DB_NAME, DB_VERSION )
  open.onupgradeneeded = event => {
    idb = event.target.result
    const advStore = idb.createObjectStore('adv', {
      keyPath: 'guid',
    })
    advStore.createIndex('w6_offer_id', 'w6_offer_id', {unique: true})
    advStore.createIndex('object_guid', 'object_guid', {unique: false})
    idb.createObjectStore('user', {
      keyPath: ['user_id', 'offer_id'],
    })
    // idb.createObjectStore('offerIdSpecific', {
    //   keyPath: 'offer_id',
    // })
    // idb.createObjectStore('snippet', {
    //   keyPath: 'object_guid',
    // })
  }
  open.onversionchange = event => {
    postMessage({status: 'warn', message: `${event}`})
  }
  open.onerror = event => {
    postMessage({status: 'error', message: `${event}`})
  }
  open.onsuccess = event => {
    onsuccess(event.target.result)
  }
}

// https://www.w3.org/TR/IndexedDB/
onmessage = function(event) {
  if (event.data.cmd == 'recs') {
    const request = event.data
    // console.log(request)
    open_idb(idb => {
      const response = {}

      const transaction = idb.transaction('adv', 'readonly')
      const start = Date.now()
      const objectStore = transaction.objectStore('adv');
      let idx = 0
      if (request.by_guid) {
        response.by_guid = new Map()
        const guidIter = request.by_guid.keys()
        const nextGuid = () => {
          const next = guidIter.next()
          // console.log(next)
          if (next.done) {
            // console.log(response)
            postMessage({status: 'ok', ...response, timing: Date.now() - start})
          } else {
            let guidRequest = objectStore.get(next.value) // https://www.oreilly.com/library/view/client-side-data-storage/9781491935101/ch04.html
            guidRequest.onsuccess = (event) => {
              // console.log(event)
              const fld_values = event.target.result
              const guid = next.value
              const guid_request = request.by_guid.get(guid)
              const guid_response = new Map()
              // console.log(guid_request)
              guid_request.forEach(fld => {
                const fld_value = fld_values[fld]
                if (fld_value !== void 0) {
                  guid_response.set(fld, fld_value)
                }
              })
              if (guid_response.size) {
                response.by_guid.set(guid, guid_response)
              }
              // console.log(guid_response, response.by_guid)
              nextGuid()
            }
            guidRequest.onerror = (event) => {
              console.error(event)
              nextGuid()
            }
          }
        }
        nextGuid()
      } else if (request.by_idx) {
        response.by_idx = new Map()
        const openCursor = objectStore.openCursor()
        openCursor.onsuccess = function(event) {
          var cursor = event.target.result;
          // const size = 500
          if (cursor) {
            if (request.by_idx.has(idx)) {
              const idx_request = request.by_idx.get(idx)
              const idx_response = new Map()
              idx_request.forEach(fld => {
                const fld_value = cursor.value[fld]
                if (fld_value !== void 0) {
                  idx_response.set(fld, fld_value)
                }
              })
              response.by_idx.set(idx, idx_response)
              if (response.by_idx.size >= request.by_idx.size) {
                postMessage({status: 'ok', ...response, timing: Date.now() - start})
                return
              }
            }
            idx++
            cursor.continue();
          } else {
            postMessage({status: 'ok', ...response, timing: Date.now() - start})
          }
        }
      } else {
        postMessage({status: 'warn', message: 'no .by_guid, neither .by_idx'})
      }
    })
  } else if (event.data.cmd == 'count') {
    open_idb(idb => {
      const transaction = idb.transaction(['adv'], 'readonly')
      const start = Date.now()
      const objectStore = transaction.objectStore('adv');
      let count = 0
      const openCursor = objectStore.openCursor()
      openCursor.onsuccess = function(event) {
        var cursor = event.target.result;
        // postMessage({status: 'ok', count, timing: Date.now() - start})
        // const size = 1
        const size = 10000
        if (cursor) {
          count++
          cursor.continue();
        } else if (count >= size) {
          postMessage({status: 'ok', count, timing: Date.now() - start})
        } else {
          const headers = new Headers([
            ['Accept', 'application/json'],
            ['Content-Type', 'application/json'],
          ])
          // {"filters":{"guid":"00B3EA1A-9961-0000-002C-00638D7C0000"},"conditions":{"realty_section":{"code":["flat"]},"area":{"code":["msk"]},"deal_type":{"code":["sale"]}},"from":0,"size":1,"dsl_version":2,"fields":["user_note","note","owners_count","ownership_type_id","ownership_year"]}
          const bodyJson = {
            aggregations: {
              avg_price_rub: true,
              avg_meter_price_rub: true,
            },
            fields: [
              // key
              "guid",

              // adv hash like
              'search_update_datetime',

              "w6_offer_id",
              'object_guid',

              // user specific (linked to offer id)
              "is_selected",
              "is_favorite",
              "is_hidden",
              "is_sended_to_viewboard",
              "is_liked_on_viewboard",
              "is_disliked_on_viewboard",
              "is_monitored",
              "user_note",

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
            sort: [
              { winner_relevance: { order:"desc" } },
              { w6_offer_id: { order:"desc" } },
            ],
            from: 0,
            size,
            conditions: {
              published_days_ago: { days: 7 },
              realty_section: { code: ["flat"] },
              deal_type: { code: ["sale"] },
              area: { code:["msk"] },
              is_deal_actual: true,
              use_strict_conditions: true,
            },
            mixins: { is_selected: true },
            dsl_version:2,
          }
          const body = JSON.stringify(bodyJson)
          const start = Date.now()
          fetch('https://mls.baza-winner.ru/v2/users/unauthenticated/items/_search.json?project_code=w7', {
            method: 'POST',
            headers,
            body,
            // body: `{"aggregations":{"avg_price_rub":true,"avg_meter_price_rub":true},"fields":["guid","deal_status_id","user_deal_status_id","winner_relevance","w6_offer_id","w6_offer_pub_list","object_guid","free_mode_relevance","is_selected","is_favorite","is_hidden","is_sended_to_viewboard","is_liked_on_viewboard","is_disliked_on_viewboard","is_monitored","photo_count","video_count","geo_cache_street_name","price_rub","pub_datetime","media_id","media_name","broker.short_name","broker.url","external_url","phone_list.is_black","phone_list.black_note","creation_datetime","deal_type_id","geo_cache_building_name","storey","storeys_count","walls_material_type_id","total_square","life_square","kitchen_square","security_type_id","user_note","note","owners_count","ownership_type_id","ownership_year","balcony_type_id","price_change_date","price_change_type_id","video_list","built_year","sale_type_name","agency_bonus","agency_bonus_type_id","agency_bonus_currency_type_id","total_room_count","offer_room_count","is_studio","is_free_planning","realty_type_id","rooms_adjacency_type_id","geo_cache_subway_station_name_1","geo_subway_station_guid_1","transport_access_1","walking_access_1","geo_cache_subway_station_name_2","geo_subway_station_guid_2","transport_access_2","walking_access_2","geo_cache_subway_station_name_3","geo_subway_station_guid_3","transport_access_3","walking_access_3","geo_cache_subway_station_name_4","geo_subway_station_guid_4","transport_access_4","walking_access_4"],"sort":[{"winner_relevance":{"order":"desc"}},{"w6_offer_id":{"order":"desc"}}],"from":0,"size":${size},"conditions":{"published_days_ago":{"days":7},"realty_section":{"code":["flat"]},"deal_type":{"code":["sale"]},"area":{"code":["msk"]},"is_deal_actual":true,"use_strict_conditions":true},"mixins":{"is_selected":true},"dsl_version":2}`,
            mode: 'cors',
            cache: 'no-store',
          })
          .catch(error => postMessage({status: 'error', message: `${error}`}))
          .then(response => {
            console.log({fetch: Date.now() - start})
            if (response.status != 200) {
              postMessage({status: 'error', message: response.statusText})
            } else {
              const start = Date.now()
              response.json()
              .catch(error => postMessage({status: 'error', message: `${error}`}))
              .then(data => {
                // console.log(data)
                const count = data.advs.length
                const transaction = idb.transaction(['adv', 'user'], 'readwrite')
                transaction.oncomplete = (event) => {
                  postMessage({status: 'ok', count, timing: Date.now() - start})
                  console.log(event)
                }
                transaction.onabort = (event) => {
                  postMessage({status: 'error', message: `${event}`})
                  console.error(event)
                }
                const advStore = transaction.objectStore('adv')
                const userStore = transaction.objectStore('user')
                let success_qt = count
                const object_guid = {}
                for (let i = 0; i < count; i++) {
                  const adv = data.advs[i]
                  const user = { user_id: 'anon', offer_id: adv.w6_offer_id }
                  const flds = ['is_selected', 'is_favorite', 'is_hidden', 'is_sended_to_viewboard', 'is_liked_on_viewboard', 'is_disliked_on_viewboard', 'is_monitored', 'user_note']
                  for (let j = 0; j < flds.length; j++) {
                    const fld = flds[i]
                    user[fld] = adv[fld]
                    delete adv[fld]
                  }
                  advStore.put(adv)
                  userStore.put(user)
                  object_guid[adv.object_guid] = (object_guid[adv.object_guid] || 0) + 1
                }
                {
                  const qt = Object.keys(object_guid).length
                  const max = Math.max(...Object.keys(object_guid).map(key => object_guid[key]))
                  const avg = count / qt
                  console.log({qt, max, avg})
                  for (let i = max; i > 1; i--) {
                    console.log(i + ': ' + Object.keys(object_guid).map(key => object_guid[key]).filter(qt => qt == i).length)
                  }
                }
              })
            }
          })
        }
      }
    })
  }
}


;
// const DB_NAME = 'bw'
// const DB_VERSION = 2
// const STORE = 'advs'
// const KEY_NAME = 'guid'
// function createDB() {
//   if (!indexedDB) {
//     console.error('!window.indexedDB')
//     return
//   }
//   console.log('createDB')
//   const open = indexedDB.open('bw', DB_VERSION, function(upgradeDB) {
//     console.log('upgradeDB')
//     var store = upgradeDB.createObjectStore(STORE, {
//       keyPath: KEY_NAME
//     });
//     // store.put({id: 123, name: 'coke', price: 10.99, quantity: 200});
//     // store.put({id: 321, name: 'pepsi', price: 8.99, quantity: 100});
//     // store.put({id: 222, name: 'water', price: 11.99, quantity: 300});
//   })

//   open.onerror = function(event) {
//     console.error(event)
//   }
//   open.onsuccess = function(event) {
//     console.log(event)
//   }
// }
// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     createDB()
//   );
//   console.log('Brand new Finally active. Ready to start serving content!')
// })
// self.addEventListener('message', function(event){
//   // console.log(event.data)
//     // console.log("SW Received Message: ", event.data);
//     // event.ports[0].postMessage("SW Says 'Hello back!'");
//     // console.log(event)
//     const headers = new Headers([
//       ['Accept', 'application/json'],
//       ['Content-Type', 'application/json'],
//     ])
//     const size = event.data.size
//     fetch('https://mls.baza-winner.ru/v2/users/unauthenticated/items/_search.json?project_code=w7', {
//       method: 'POST',
//       headers,
//       body: `{"aggregations":{"avg_price_rub":true,"avg_meter_price_rub":true},"fields":["guid","deal_status_id","user_deal_status_id","winner_relevance","w6_offer_id","object_guid","free_mode_relevance","is_selected","is_favorite","is_hidden","is_sended_to_viewboard","is_liked_on_viewboard","is_disliked_on_viewboard","is_monitored","photo_count","video_count","geo_cache_street_name","price_rub","pub_datetime","media_id","media_name","broker.short_name","broker.url","external_url","phone_list.is_black","phone_list.black_note","creation_datetime","deal_type_id","geo_cache_building_name","storey","storeys_count","walls_material_type_id","total_square","life_square","kitchen_square","security_type_id","user_note","balcony_type_id","price_change_date","price_change_type_id","video_list","built_year","sale_type_name","agency_bonus","agency_bonus_type_id","agency_bonus_currency_type_id","total_room_count","offer_room_count","is_studio","is_free_planning","realty_type_id","rooms_adjacency_type_id","geo_cache_subway_station_name_1","geo_subway_station_guid_1","transport_access_1","walking_access_1","geo_cache_subway_station_name_2","geo_subway_station_guid_2","transport_access_2","walking_access_2","geo_cache_subway_station_name_3","geo_subway_station_guid_3","transport_access_3","walking_access_3","geo_cache_subway_station_name_4","geo_subway_station_guid_4","transport_access_4","walking_access_4"],"sort":[{"winner_relevance":{"order":"desc"}},{"w6_offer_id":{"order":"desc"}}],"from":0,"size":${size},"conditions":{"published_days_ago":{"days":7},"realty_section":{"code":["flat"]},"deal_type":{"code":["sale"]},"area":{"code":["msk"]},"is_deal_actual":true,"use_strict_conditions":true},"mixins":{"is_selected":true},"dsl_version":2}`,
//       mode: 'cors',
//       cache: 'no-store',
//     }).then(response => {
//       if (response.status != 200) {
//         event.ports[0].postMessage({error: response.statusText});
//       } else {
//         response.json()
//         .catch(error =>
//           event.ports[0].postMessage({error})
//         )
//         .then(data => {
//           event.ports[0].postMessage(data.advs)

//           const open = indexedDB.open(DB_NAME, DB_VERSION);
//           console.log(open)

//           open.onerror = function(event) {
//             console.error(event)
//           }
//           open.onsuccess = function(event) {
//             console.log(event)
//             let db = event.target.result
//             const advs = [...data.advs]
//             const putAdv = () => {
//               const transaction = db.transaction(STORE, 'readwrite')
//               const store = transaction.objectStore(STORE)
//               const request = store.put(advs[0])
//               request.onsuccess = function(e) {
//                 // todoDB.indexedDB.getAllTodoItems();
//                 console.log('request.onsuccess')
//               }
//               request.onerror = function(e) {
//                 console.error("Error Adding an item: ", e);
//               }

//               transaction.onerror = function(event) {
//                 console.error(event)
//               }
//               transaction.oncomplete(result => {
//                 console.log(result)
//               })
//             }
//             putAdv()

//             // result.onsuccess = function(event) {
//             //   if (!event.target.result) {
//             //     console.error(event)
//             //     reject('filesDir not set');
//             //   } else {
//             //     resolve(JSON.parse(event.target.result.value));
//             //   }
//             // }
//           }

//         })
//       }
//       return response
//     })
// });

const CACHE_NAME = 'bw-app-cache-v1'
self.addEventListener('install', (event) => {
  self.skipWaiting()
})
self.addEventListener('activate', function(event) {
  // event.waitUntil(
  //   createDB()
  // );
  console.log('Brand new Finally active. Ready to start serving content!')
})
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).then(response => {
      // console.log(event.request.url, response.status)
      if (response.status == 200) {
        if (event.request.referrer.endsWith('/dw.js')) {
          // console.log(event.request)
          return response
        } else {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          })
        }
      } else {
        caches.match(event.request).then(cachedResponse => {
          console.log('used cache')
          if (cachedResponse) {
            return cachedResponse
          } else {
            return response
          }
        })
      }
    })
  )
})
// self.addEventListener('push', function(event) {
//   var title = 'Yay a message.';
//   var body = 'We have received a push message.';
//   var icon = '/bw/app/logo_icon_192.png';
//   var tag = 'simple-push-example-tag';
//   event.waitUntil(
//     self.registration.showNotification(title, {
//       body: body,
//       icon: icon,
//       tag: tag
//     })
//   )
// })
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_search extends $.$mol_view {
        orders(val, force) {
            return (val !== void 0) ? val : null;
        }
        sub() {
            return [].concat(this.Menu(), this.Content());
        }
        Menu() {
            return ((obj) => {
                obj.value = (val) => this.selected_order_id(val);
                obj.options = () => this.menu_options();
                obj.menu_item_close_click = (id, event) => this.menu_item_close_click(id, event);
                return obj;
            })(new this.$.$bw_search_menu);
        }
        selected_order_id(val, force) {
            return (val !== void 0) ? val : "";
        }
        menu_options() {
            return ({});
        }
        menu_item_close_click(id, event, force) {
            return (event !== void 0) ? event : null;
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [].concat(this.content());
                return obj;
            })(new this.$.$mol_view);
        }
        content() {
            return null;
        }
        New() {
            return ((obj) => {
                obj.sub = () => [].concat(this.ForSale(), this.ForRent());
                return obj;
            })(new this.$.$mol_view);
        }
        ForSale() {
            return ((obj) => {
                obj.orders = () => this.orders();
                obj.block_name = () => "for_sale";
                obj.block_title = () => "Продажа";
                return obj;
            })(new this.$.$bw_search_block_for_sale);
        }
        ForRent() {
            return ((obj) => {
                obj.orders = () => this.orders();
                obj.block_name = () => "for_rent";
                obj.block_title = () => "Аренда";
                return obj;
            })(new this.$.$bw_search_block_for_rent);
        }
        Workspace() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Params(), this.Result());
                return obj;
            })(new this.$.$mol_view);
        }
        Params() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_search_params);
        }
        Result() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_search_result);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "orders", null);
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "selected_order_id", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search.prototype, "menu_item_close_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "New", null);
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "ForSale", null);
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "ForRent", null);
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "Workspace", null);
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "Params", null);
    __decorate([
        $.$mol_mem
    ], $bw_search.prototype, "Result", null);
    $.$bw_search = $bw_search;
})($ || ($ = {}));
(function ($) {
    class $bw_search_menu extends $.$mol_switch {
        menu_item_close_click(id, event, force) {
            return (event !== void 0) ? event : null;
        }
        Option(id) {
            return ((obj) => {
                obj.id = () => this.option_id(id);
                obj.icon_close_click = (event) => this.menu_item_close_click(id, event);
                obj.checked = (val) => this.option_checked(id, val);
                obj.title = () => this.option_title(id);
                return obj;
            })(new this.$.$bw_search_menu_option);
        }
        option_id(id) {
            return "";
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $bw_search_menu.prototype, "menu_item_close_click", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_menu.prototype, "Option", null);
    $.$bw_search_menu = $bw_search_menu;
})($ || ($ = {}));
(function ($) {
    class $bw_search_menu_option extends $.$mol_check {
        id() {
            return "";
        }
        icon_close_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        attr() {
            return (Object.assign({}, super.attr(), { "bw_search_menu_option_new": this.is_new() }));
        }
        is_new() {
            return false;
        }
        IconPlus() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_plus);
        }
        IconClose() {
            return ((obj) => {
                obj.event = () => ({
                    "click": (event) => this.icon_close_click(event),
                });
                return obj;
            })(new this.$.$bw_icon_cross);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_menu_option.prototype, "icon_close_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_menu_option.prototype, "IconPlus", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_menu_option.prototype, "IconClose", null);
    $.$bw_search_menu_option = $bw_search_menu_option;
})($ || ($ = {}));
(function ($) {
    class $bw_search_params extends $.$mol_view {
        style() {
            return ({
                "min-height": this.min_height(),
            });
        }
        min_height() {
            return 0;
        }
        attr() {
            return ({
                "bw_search_params_mode": this.mode(),
            });
        }
        sub() {
            return [].concat(this.Mode(), this.Input(), this.bread_crumbs(), this.Content(), this.Footer());
        }
        Mode() {
            return ((obj) => {
                obj.options = () => ({
                    "full": "Полный",
                    "main": "Основной",
                    "short": "Сжатый",
                });
                obj.value = (val) => this.mode(val);
                obj.option_enabled = (id) => this.mode_enabled(id);
                return obj;
            })(new this.$.$mol_switch);
        }
        mode(val, force) {
            return (val !== void 0) ? val : "short";
        }
        mode_enabled(id) {
            return true;
        }
        Input() {
            return ((obj) => {
                obj.hint = () => "Параметры";
                return obj;
            })(new this.$.$bw_search_params_input_commitable);
        }
        bread_crumbs() {
            return [];
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Main(), this.Full());
                return obj;
            })(new this.$.$mol_view);
        }
        Main() {
            return ((obj) => {
                obj.style = () => ({
                    "opacity": this.main_params_opacity(),
                });
                return obj;
            })(new this.$.$bw_search_params_block_main);
        }
        main_params_opacity() {
            return 0;
        }
        Full() {
            return ((obj) => {
                obj.style = () => ({
                    "opacity": this.full_params_opacity(),
                });
                return obj;
            })(new this.$.$bw_search_params_block_full);
        }
        full_params_opacity() {
            return 0;
        }
        Footer() {
            return ((obj) => {
                obj.sub = () => [].concat("Найдено предложений: 10 000 / Объектов: 7084");
                return obj;
            })(new this.$.$mol_view);
        }
        input_client_rect(val, force) {
            return (val !== void 0) ? val : null;
        }
        mode_client_rect(val, force) {
            return (val !== void 0) ? val : null;
        }
        BreadCrumb(i) {
            return ((obj) => {
                obj.style = () => ({
                    "top": this.bread_crumb_top(i),
                    "left": this.bread_crumb_left(i),
                    "display": this.bread_crumb_display(i),
                });
                obj.sub = () => [].concat(this.bread_crumb_text(i), this.IconClose(i));
                return obj;
            })(new this.$.$mol_view);
        }
        bread_crumb_top(i) {
            return null;
        }
        bread_crumb_left(i) {
            return null;
        }
        bread_crumb_display(i, val, force) {
            return (val !== void 0) ? val : "none";
        }
        bread_crumb_text(i) {
            return "";
        }
        IconClose(i) {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_cross);
        }
        break_crumb_client_rect(i) {
            return null;
        }
        client_rect(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "Mode", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "mode", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "Main", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "Full", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "Footer", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "input_client_rect", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "mode_client_rect", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_params.prototype, "BreadCrumb", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_params.prototype, "bread_crumb_display", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_params.prototype, "IconClose", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params.prototype, "client_rect", null);
    $.$bw_search_params = $bw_search_params;
})($ || ($ = {}));
(function ($) {
    class $bw_search_params_block extends $.$mol_view {
        sub() {
            return [].concat(this.Upper(), this.Downer());
        }
        Upper() {
            return ((obj) => {
                obj.sub = () => [].concat(this.UpperFirstRow(), this.UpperSecondRow());
                return obj;
            })(new this.$.$mol_view);
        }
        UpperFirstRow() {
            return ((obj) => {
                obj.sub = () => [].concat(this.ApartmentType(), this.GeoSpot());
                return obj;
            })(new this.$.$mol_view);
        }
        ApartmentType() {
            return ((obj) => {
                obj.label = () => "Квартира";
                obj.control = () => [].concat(this.Studio(), this.FreePlan());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        Studio() {
            return ((obj) => {
                obj.title = () => "Студия";
                return obj;
            })(new this.$.$mol_check_box);
        }
        FreePlan() {
            return ((obj) => {
                obj.title = () => "Св.планировка";
                return obj;
            })(new this.$.$mol_check_box);
        }
        GeoSpot() {
            return ((obj) => {
                obj.label = () => "Адрес";
                obj.control = () => [].concat(this.GeoSpotControl());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        GeoSpotControl() {
            return ((obj) => {
                obj.hint = () => "Город, район, адрес, метро, название ЖКХ";
                return obj;
            })(new this.$.$bw_search_params_input_commitable);
        }
        UpperSecondRow() {
            return ((obj) => {
                obj.sub = () => [].concat(this.OnlyWith());
                return obj;
            })(new this.$.$mol_view);
        }
        OnlyWith() {
            return ((obj) => {
                obj.label = () => "Только с";
                obj.control = () => [].concat(this.Photo(), this.Video());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        Photo() {
            return ((obj) => {
                obj.title = () => "Фото";
                return obj;
            })(new this.$.$mol_check_box);
        }
        Video() {
            return ((obj) => {
                obj.title = () => "Видео";
                return obj;
            })(new this.$.$mol_check_box);
        }
        Downer() {
            return ((obj) => {
                obj.sub = () => [].concat(this.DownerFirstCol(), this.DownerSecondCol(), this.DownerThirdCol());
                return obj;
            })(new this.$.$mol_view);
        }
        DownerFirstCol() {
            return ((obj) => {
                obj.sub = () => [].concat(this.RoomQt(), this.SqTotal(), this.Storey());
                return obj;
            })(new this.$.$mol_view);
        }
        RoomQt() {
            return ((obj) => {
                obj.label = () => "Комнаты";
                obj.control = () => [].concat(this.RoomQtSwitch());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        RoomQtSwitch() {
            return ((obj) => {
                obj.options = () => ({
                    "one": 1,
                    "two": 2,
                    "three": 3,
                    "four": 4,
                    "five": 5,
                    "sixplus": "6+",
                });
                return obj;
            })(new this.$.$mol_switch);
        }
        SqTotal() {
            return ((obj) => {
                obj.label = () => "Площадь";
                obj.control = () => [].concat(this.SqTotalControl());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        SqTotalControl() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_search_param_diap);
        }
        Storey() {
            return ((obj) => {
                obj.label = () => "Этаж";
                obj.control = () => [].concat(this.StoreyControl());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        StoreyControl() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_search_param_diap);
        }
        DownerSecondCol() {
            return ((obj) => {
                obj.sub = () => [].concat(this.DealType(), this.Price(), this.PricePerSq());
                return obj;
            })(new this.$.$mol_view);
        }
        DealType() {
            return ((obj) => {
                obj.label = () => "Тип сделки";
                obj.control = () => [].concat(this.DealTypeCombo());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        DealTypeCombo() {
            return ((obj) => {
                obj.options = () => ({
                    "direct_sale": "Прямая продажа",
                    "alternative": "Альтернатива",
                });
                obj.value = () => "Прямая продажа";
                return obj;
            })(new this.$.$bw_input_combo);
        }
        Price() {
            return ((obj) => {
                obj.label = () => "Цена";
                obj.control = () => [].concat(this.PriceControl());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        PriceControl() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_search_param_diap);
        }
        PricePerSq() {
            return ((obj) => {
                obj.label = () => "Цена за м²";
                obj.control = () => [].concat(this.PricePerSqControl());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        PricePerSqControl() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_search_param_diap);
        }
        DownerThirdCol() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Area(), this.Far(), this.Location());
                return obj;
            })(new this.$.$mol_view);
        }
        Area() {
            return ((obj) => {
                obj.label = () => "Область";
                obj.control = () => [].concat(this.AreaTypeCombo());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        AreaTypeCombo() {
            return ((obj) => {
                obj.options = () => ({
                    "both": "Москва и область",
                    "msk": "Москва",
                });
                obj.value = () => "Москва и область";
                return obj;
            })(new this.$.$bw_input_combo);
        }
        Far() {
            return ((obj) => {
                obj.label = () => "От станции";
                obj.control = () => [].concat(this.FarCombo());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        FarCombo() {
            return ((obj) => {
                obj.options = () => ({
                    "walk_2": "До 2 минут пешком",
                    "walk_5": "До 5 минут пешком",
                    "walk_10": "До 10 минут пешком",
                    "bus_5": "До 5 минут транспортом",
                    "bus_10": "До 10 минут транспортом",
                    "bus_15": "До 15 минут транспортом",
                });
                obj.value = () => "До 2 минут пешком";
                return obj;
            })(new this.$.$bw_input_combo);
        }
        Location() {
            return ((obj) => {
                obj.label = () => "Цена за м²";
                obj.control = () => [].concat(this.LocationControl());
                return obj;
            })(new this.$.$bw_search_params_field);
        }
        LocationControl() {
            return ((obj) => {
                obj.options = () => ({
                    "subway": "Метро",
                    "railway": "Ж/Д",
                    "districts": "Районы",
                    "map": "Карта",
                });
                return obj;
            })(new this.$.$mol_switch);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Upper", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "UpperFirstRow", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "ApartmentType", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Studio", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "FreePlan", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "GeoSpot", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "GeoSpotControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "UpperSecondRow", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "OnlyWith", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Photo", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Video", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Downer", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "DownerFirstCol", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "RoomQt", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "RoomQtSwitch", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "SqTotal", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "SqTotalControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Storey", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "StoreyControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "DownerSecondCol", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "DealType", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "DealTypeCombo", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Price", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "PriceControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "PricePerSq", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "PricePerSqControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "DownerThirdCol", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Area", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "AreaTypeCombo", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Far", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "FarCombo", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "Location", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block.prototype, "LocationControl", null);
    $.$bw_search_params_block = $bw_search_params_block;
})($ || ($ = {}));
(function ($) {
    class $bw_search_params_block_main extends $.$bw_search_params_block {
    }
    $.$bw_search_params_block_main = $bw_search_params_block_main;
})($ || ($ = {}));
(function ($) {
    class $bw_search_params_block_full extends $.$bw_search_params_block {
        sub() {
            return [].concat(this.Upper(), this.Downer());
        }
        Upper() {
            return ((obj) => {
                obj.sub = () => [].concat(this.UpperFirstRow(), this.UpperSecondRow());
                return obj;
            })(new this.$.$mol_view);
        }
        UpperFirstRow() {
            return ((obj) => {
                obj.sub = () => [].concat(this.ApartmentType(), this.GeoSpot(), this.GeoTuning());
                return obj;
            })(new this.$.$mol_view);
        }
        GeoTuning() {
            return ((obj) => {
                obj.sub = () => [].concat(this.WithoutNewMsk(), this.OnlyNewMsk());
                return obj;
            })(new this.$.$mol_view);
        }
        WithoutNewMsk() {
            return ((obj) => {
                obj.title = () => "Без Новой Москвы";
                return obj;
            })(new this.$.$mol_check_box);
        }
        OnlyNewMsk() {
            return ((obj) => {
                obj.title = () => "Только Новая Москва";
                return obj;
            })(new this.$.$mol_check_box);
        }
        Downer() {
            return ((obj) => {
                obj.sub = () => [].concat(this.DownerFirstCol(), this.DownerSecondCol(), this.DownerThirdCol(), this.DownerForthCol());
                return obj;
            })(new this.$.$mol_view);
        }
        DownerFirstCol() {
            return ((obj) => {
                obj.sub = () => [].concat(this.RoomQt(), this.SqTotal(), this.Storey());
                return obj;
            })(new this.$.$mol_view);
        }
        DownerSecondCol() {
            return ((obj) => {
                obj.sub = () => [].concat(this.DealType(), this.Price(), this.PricePerSq());
                return obj;
            })(new this.$.$mol_view);
        }
        DownerThirdCol() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Area(), this.Far(), this.Location());
                return obj;
            })(new this.$.$mol_view);
        }
        DownerForthCol() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_view);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "Upper", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "UpperFirstRow", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "GeoTuning", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "WithoutNewMsk", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "OnlyNewMsk", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "Downer", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "DownerFirstCol", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "DownerSecondCol", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "DownerThirdCol", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_block_full.prototype, "DownerForthCol", null);
    $.$bw_search_params_block_full = $bw_search_params_block_full;
})($ || ($ = {}));
(function ($) {
    class $bw_search_params_input_commitable extends $.$bw_input_checkable {
        Icon() {
            return ((obj) => {
                obj.transform = () => "scale(0.6) translate(8 8)";
                return obj;
            })(new this.$.$bw_icon_plus);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_params_input_commitable.prototype, "Icon", null);
    $.$bw_search_params_input_commitable = $bw_search_params_input_commitable;
})($ || ($ = {}));
(function ($) {
    class $bw_search_param_diap extends $.$mol_view {
        sub() {
            return [].concat(this.Min(), this.Max());
        }
        Min() {
            return ((obj) => {
                obj.hint = () => "от";
                return obj;
            })(new this.$.$bw_input);
        }
        Max() {
            return ((obj) => {
                obj.hint = () => "до";
                return obj;
            })(new this.$.$bw_input);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_param_diap.prototype, "Min", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_param_diap.prototype, "Max", null);
    $.$bw_search_param_diap = $bw_search_param_diap;
})($ || ($ = {}));
(function ($) {
    class $bw_search_params_field extends $.$mol_view {
        label() {
            return "";
        }
        control() {
            return [];
        }
        sub() {
            return [].concat(this.Label(), this.Control());
        }
        Label() {
            return ((obj) => {
                obj.sub = () => [].concat(this.label());
                return obj;
            })(new this.$.$mol_view);
        }
        Control() {
            return ((obj) => {
                obj.sub = () => this.control();
                return obj;
            })(new this.$.$mol_view);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_params_field.prototype, "Label", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_params_field.prototype, "Control", null);
    $.$bw_search_params_field = $bw_search_params_field;
})($ || ($ = {}));
(function ($) {
    class $bw_search_result extends $.$mol_view {
        sub() {
            return [].concat(this.Header(), this.Content());
        }
        Header() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Title(), this.Filter(), this.Avg(), this.Toolbar(), this.Space(), this.View(), this.Mode(), this.MapOn());
                return obj;
            })(new this.$.$mol_view);
        }
        Title() {
            return ((obj) => {
                obj.sub = () => [].concat("Показано вариантов: 10 000");
                return obj;
            })(new this.$.$mol_view);
        }
        Filter() {
            return ((obj) => {
                obj.sub = () => [].concat(this.IconFilter());
                return obj;
            })(new this.$.$mol_view);
        }
        IconFilter() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_filter);
        }
        Avg() {
            return ((obj) => {
                obj.sub = () => [].concat(this.AvgTotal(), this.AvgUnit());
                return obj;
            })(new this.$.$mol_view);
        }
        AvgTotal() {
            return ((obj) => {
                obj.sub = () => [].concat("ср. цена: 40 500 000 ₽");
                return obj;
            })(new this.$.$mol_view);
        }
        AvgUnit() {
            return ((obj) => {
                obj.sub = () => [].concat("ср. м²: 400 500 ₽");
                return obj;
            })(new this.$.$mol_view);
        }
        Toolbar() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Excel(), this.Word(), this.Print(), this.Share(), this.Sent());
                return obj;
            })(new this.$.$mol_view);
        }
        Excel() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_excel);
        }
        Word() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_word);
        }
        Print() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_print);
        }
        Share() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_share);
        }
        Sent() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_sent);
        }
        Space() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_view);
        }
        View() {
            return ((obj) => {
                obj.sub = () => [].concat(this.ViewLabel(), this.ViewInput());
                return obj;
            })(new this.$.$mol_view);
        }
        ViewLabel() {
            return ((obj) => {
                obj.sub = () => [].concat("Вид:");
                return obj;
            })(new this.$.$mol_view);
        }
        ViewInput() {
            return ((obj) => {
                obj.options = () => ({
                    "full": "Полный",
                    "short": "Краткий",
                });
                obj.value = () => "Полный";
                return obj;
            })(new this.$.$bw_input_combo);
        }
        Mode() {
            return ((obj) => {
                obj.options = () => ({
                    "grid": "Таблица",
                    "tile": "Плитка",
                });
                obj.value = (val) => this.mode(val);
                obj.option_enabled = (id) => this.mode_enabled(id);
                return obj;
            })(new this.$.$mol_switch);
        }
        mode(val, force) {
            return (val !== void 0) ? val : "grid";
        }
        mode_enabled(id) {
            return true;
        }
        MapOn() {
            return ((obj) => {
                obj.checked = (val) => this.map_on(val);
                obj.title = () => "Карта";
                return obj;
            })(new this.$.$bw_search_result_mapon);
        }
        map_on(val, force) {
            return (val !== void 0) ? val : false;
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Map(), this.Grid());
                return obj;
            })(new this.$.$mol_view);
        }
        Map() {
            return ((obj) => {
                obj.dom_name = () => "img";
                obj.attr = () => ({
                    "src": this.map_image_src(),
                });
                obj.style = () => ({
                    "height": this.map_height_max(),
                    "opacity": this.map_opacity(),
                });
                return obj;
            })(new this.$.$mol_view);
        }
        map_image_src() {
            return "map.png";
        }
        map_opacity() {
            return 0;
        }
        Grid() {
            return ((obj) => {
                obj.height = () => this.grid_height_to_use();
                obj.animated_height = () => this.grid_height_animated();
                obj.top = () => this.grid_top();
                return obj;
            })(new this.$.$bw_search_result_grid);
        }
        grid_height_to_use(val, force) {
            return (val !== void 0) ? val : null;
        }
        grid_height_animated() {
            return null;
        }
        grid_top() {
            return 0;
        }
        map_height_max() {
            return 424;
        }
        grid_height() {
            return null;
        }
        content_client_rect(val, force) {
            return (val !== void 0) ? val : null;
        }
        content_client_rect_height(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Header", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Title", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Filter", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "IconFilter", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Avg", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "AvgTotal", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "AvgUnit", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Toolbar", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Excel", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Word", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Print", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Share", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Sent", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Space", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "View", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "ViewLabel", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "ViewInput", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Mode", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "mode", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "MapOn", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "map_on", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Map", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "Grid", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "grid_height_to_use", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "content_client_rect", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result.prototype, "content_client_rect_height", null);
    $.$bw_search_result = $bw_search_result;
})($ || ($ = {}));
(function ($) {
    class $bw_search_result_mapon extends $.$mol_check {
        SwitchOn() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_switch_on);
        }
        SwitchOff() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_switch_off);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_result_mapon.prototype, "SwitchOn", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_result_mapon.prototype, "SwitchOff", null);
    $.$bw_search_result_mapon = $bw_search_result_mapon;
})($ || ($ = {}));
(function ($) {
    class $bw_search_result_grid extends $.$$.$bw_grid2 {
    }
    $.$bw_search_result_grid = $bw_search_result_grid;
})($ || ($ = {}));
(function ($) {
    class $bw_search_block_for_sale extends $.$bw_block {
        orders() {
            return null;
        }
        content() {
            return [].concat(this.City(), this.Region(), this.Country());
        }
        City() {
            return ((obj) => {
                obj.table_title = () => "Москва24";
                obj.table_data = () => this.data_city();
                obj.table_row_click = (row_data, event) => this.city_row_click(row_data, event);
                return obj;
            })(new this.$.$bw_search_block_table);
        }
        data_city() {
            return null;
        }
        city_row_click(row_data, event, force) {
            return (event !== void 0) ? event : null;
        }
        Region() {
            return ((obj) => {
                obj.table_title = () => "Московская область";
                obj.table_data = () => this.data_region();
                obj.table_row_click = (row_data, event) => this.region_row_click(row_data, event);
                return obj;
            })(new this.$.$bw_search_block_table);
        }
        data_region() {
            return null;
        }
        region_row_click(row_data, event, force) {
            return (event !== void 0) ? event : null;
        }
        Country() {
            return ((obj) => {
                obj.table_title = () => "Россия";
                obj.table_data = () => this.data_coutry();
                obj.table_row_click = (row_data, event) => this.country_row_click(row_data, event);
                return obj;
            })(new this.$.$bw_search_block_table);
        }
        data_coutry() {
            return null;
        }
        country_row_click(row_data, event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_block_for_sale.prototype, "City", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_for_sale.prototype, "city_row_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_for_sale.prototype, "Region", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_for_sale.prototype, "region_row_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_for_sale.prototype, "Country", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_for_sale.prototype, "country_row_click", null);
    $.$bw_search_block_for_sale = $bw_search_block_for_sale;
})($ || ($ = {}));
(function ($) {
    class $bw_search_block_for_rent extends $.$bw_block {
        orders() {
            return null;
        }
        content() {
            return [].concat(this.City(), this.Region());
        }
        City() {
            return ((obj) => {
                obj.table_title = () => "Москва";
                obj.table_data = () => this.data_city();
                obj.table_row_click = (row_data, event) => this.city_row_click(row_data, event);
                return obj;
            })(new this.$.$bw_search_block_table);
        }
        data_city() {
            return null;
        }
        city_row_click(row_data, event, force) {
            return (event !== void 0) ? event : null;
        }
        Region() {
            return ((obj) => {
                obj.table_title = () => "Московская область";
                obj.table_data = () => this.data_region();
                obj.table_row_click = (row_data, event) => this.region_row_click(row_data, event);
                return obj;
            })(new this.$.$bw_search_block_table);
        }
        data_region() {
            return null;
        }
        region_row_click(row_data, event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_block_for_rent.prototype, "City", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_for_rent.prototype, "city_row_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_for_rent.prototype, "Region", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_for_rent.prototype, "region_row_click", null);
    $.$bw_search_block_for_rent = $bw_search_block_for_rent;
})($ || ($ = {}));
(function ($) {
    class $bw_search_block_table extends $.$mol_view {
        table_title() {
            return "";
        }
        table_data() {
            return null;
        }
        table_row_click(row_data, event, force) {
            return (event !== void 0) ? event : null;
        }
        dom_name() {
            return "table";
        }
        sub() {
            return [].concat(this.Head(), this.Body());
        }
        Head() {
            return ((obj) => {
                obj.dom_name = () => "thead";
                obj.sub = () => [].concat(this.TrHead());
                return obj;
            })(new this.$.$mol_view);
        }
        TrHead() {
            return ((obj) => {
                obj.dom_name = () => "tr";
                obj.sub = () => [].concat(this.ThTitle(), this.ThAll(), this.ThToday(), this.ThNew());
                return obj;
            })(new this.$.$mol_view);
        }
        ThTitle() {
            return ((obj) => {
                obj.dom_name = () => "th";
                obj.sub = () => [].concat(this.table_title());
                return obj;
            })(new this.$.$mol_view);
        }
        ThAll() {
            return ((obj) => {
                obj.dom_name = () => "th";
                obj.sub = () => [].concat("Вся база");
                return obj;
            })(new this.$.$mol_view);
        }
        ThToday() {
            return ((obj) => {
                obj.dom_name = () => "th";
                obj.sub = () => [].concat("За сегодня");
                return obj;
            })(new this.$.$mol_view);
        }
        ThNew() {
            return ((obj) => {
                obj.dom_name = () => "th";
                obj.sub = () => [].concat("Новые");
                return obj;
            })(new this.$.$mol_view);
        }
        Body() {
            return ((obj) => {
                obj.dom_name = () => "tbody";
                obj.sub = () => this.rows();
                return obj;
            })(new this.$.$mol_view);
        }
        rows() {
            return [];
        }
        Row(row_data) {
            return ((obj) => {
                obj.dom_name = () => "tr";
                obj.sub = () => [].concat(this.TdRealtyKind(row_data), this.TdAll(row_data), this.TdToday(row_data), this.TdNew(row_data));
                obj.event = () => ({
                    "click": (event) => this.table_row_click(row_data, event),
                });
                return obj;
            })(new this.$.$mol_view);
        }
        TdRealtyKind(row_data) {
            return ((obj) => {
                obj.dom_name = () => "td";
                obj.sub = () => [].concat(this.realty(row_data));
                return obj;
            })(new this.$.$mol_view);
        }
        realty(row_data) {
            return "";
        }
        TdAll(row_data) {
            return ((obj) => {
                obj.dom_name = () => "td";
                obj.sub = () => [].concat(this.count_all(row_data));
                return obj;
            })(new this.$.$mol_view);
        }
        count_all(row_data) {
            return "";
        }
        TdToday(row_data) {
            return ((obj) => {
                obj.dom_name = () => "td";
                obj.sub = () => [].concat(this.count_today(row_data));
                return obj;
            })(new this.$.$mol_view);
        }
        count_today(row_data) {
            return "";
        }
        TdNew(row_data) {
            return ((obj) => {
                obj.dom_name = () => "td";
                obj.sub = () => [].concat(this.count_new(row_data));
                return obj;
            })(new this.$.$mol_view);
        }
        count_new(row_data) {
            return "";
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_table.prototype, "table_row_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_table.prototype, "Head", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_table.prototype, "TrHead", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_table.prototype, "ThTitle", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_table.prototype, "ThAll", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_table.prototype, "ThToday", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_table.prototype, "ThNew", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_block_table.prototype, "Body", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_table.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_table.prototype, "TdRealtyKind", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_table.prototype, "TdAll", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_table.prototype, "TdToday", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_search_block_table.prototype, "TdNew", null);
    $.$bw_search_block_table = $bw_search_block_table;
})($ || ($ = {}));
//search.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        let BwSearchRealty;
        (function (BwSearchRealty) {
            BwSearchRealty[BwSearchRealty["\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u044B"] = 0] = "\u041A\u0432\u0430\u0440\u0442\u0438\u0440\u044B";
            BwSearchRealty[BwSearchRealty["\u041A\u043E\u043C\u043D\u0430\u0442\u044B"] = 1] = "\u041A\u043E\u043C\u043D\u0430\u0442\u044B";
            BwSearchRealty[BwSearchRealty["\u0417\u0430\u0433\u043E\u0440\u043E\u0434\u043D\u0430\u044F"] = 2] = "\u0417\u0430\u0433\u043E\u0440\u043E\u0434\u043D\u0430\u044F";
            BwSearchRealty[BwSearchRealty["\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0430\u044F"] = 3] = "\u041A\u043E\u043C\u043C\u0435\u0440\u0447\u0435\u0441\u043A\u0430\u044F";
            BwSearchRealty[BwSearchRealty["\u0413\u0430\u0440\u0430\u0436\u0438"] = 4] = "\u0413\u0430\u0440\u0430\u0436\u0438";
            BwSearchRealty[BwSearchRealty["\u0414\u043E\u043B\u0438"] = 5] = "\u0414\u043E\u043B\u0438";
        })(BwSearchRealty = $$.BwSearchRealty || ($$.BwSearchRealty = {}));
        class $bw_search extends $.$bw_search {
            static instance() {
                const result = $$.$bw_app.Root(0).NewLook().Workspace().Search();
                return result;
            }
            static newGuid() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            }
            new_order(area, realty) {
                const orders_old = this.orders();
                const orders_new = [...orders_old];
                const id = $bw_search.newGuid();
                const title = this.new_order_title_default();
                orders_new.unshift({ id, title, area, realty });
                this.orders(orders_new);
                this.selected_order_id(id);
            }
            new_order_title_default() {
                const orders = this.orders();
                const titles = new Set(orders.map((order) => order.title.toLowerCase()));
                const title_default = (n) => `Заказ ${n}`;
                let n = 1;
                let result = title_default(n);
                while (titles.has(result.toLowerCase())) {
                    result = title_default(++n);
                }
                return result;
            }
            orders(val) {
                const result = super.orders(val);
                return result;
            }
            orders_equal(a, b) {
                return (!a || !a.length) && (!b || !b.length);
            }
            orders_restore(val_store) {
                let result = (!Array.isArray(val_store) ? [] :
                    val_store
                        .filter((item) => item &&
                        typeof item == 'object' &&
                        typeof item.id == 'string' &&
                        item.id &&
                        typeof item.title == 'string' &&
                        typeof item.area == 'number' &&
                        0 <= item.area && item.area <= 2 &&
                        typeof item.realty == 'number' &&
                        BwSearchRealty.Квартиры <= item.realty && item.realty <= BwSearchRealty.Доли &&
                        true));
                return result;
            }
            menu_options() {
                const result = this.orders().reduce((accu, order) => (Object.assign({}, accu, { [order.id]: order.title })), { '': 'Новый заказ' });
                return result;
            }
            selected_order_id(val, force) {
                return super.selected_order_id(val, force);
            }
            content() {
                const result = this.selected_order_id() === '' ? this.New() : this.Workspace();
                return result;
            }
            menu_item_close_click(id, event) {
                const orders = this.orders();
                let idx = orders.findIndex(order => order.id == id);
                if (idx >= 0) {
                    const orders_new = [...orders];
                    orders_new.splice(idx, 1);
                    this.orders(orders_new);
                    let id_new = this.selected_order_id();
                    if (id == id_new) {
                        if (idx > 0)
                            idx -= 1;
                        id_new = idx >= orders_new.length ? '' : orders_new[idx].id;
                    }
                    new $.$mol_defer(() => this.selected_order_id(id_new));
                }
            }
        }
        __decorate([
            $$.$bw_local
        ], $bw_search.prototype, "orders", null);
        __decorate([
            $.$mol_mem
        ], $bw_search.prototype, "menu_options", null);
        __decorate([
            $$.$bw_session
        ], $bw_search.prototype, "selected_order_id", null);
        $$.$bw_search = $bw_search;
        class $bw_search_block_for_sale extends $.$bw_search_block_for_sale {
            city_row_click(row_data, event, force) {
                if (!event)
                    return;
                $bw_search.instance().new_order(0, row_data.realty);
            }
            region_row_click(row_data, event, force) {
                if (!event)
                    return;
                console.log(row_data);
            }
            country_row_click(row_data, event, force) {
                if (!event)
                    return;
                console.log(row_data);
            }
            data_city() {
                const result = [
                    {
                        realty: BwSearchRealty.Квартиры,
                        count_all: 1000000,
                        count_today: 1000,
                        count_new: 1000,
                    },
                    {
                        realty: BwSearchRealty.Комнаты,
                        count_all: 150000,
                        count_today: 150,
                        count_new: 150,
                    },
                    {
                        realty: BwSearchRealty.Загородная,
                        count_all: 500000,
                        count_today: 500,
                        count_new: 500,
                    },
                    {
                        realty: BwSearchRealty.Коммерческая,
                        count_all: 1000,
                        count_today: 150,
                        count_new: 150,
                    },
                    {
                        realty: BwSearchRealty.Гаражи,
                        count_all: 15000,
                        count_today: 15,
                        count_new: 15,
                    },
                    {
                        realty: BwSearchRealty.Доли,
                        count_all: 7000,
                        count_today: 70,
                        count_new: 70,
                    },
                ];
                return result;
            }
            data_region() {
                return this.data_city();
            }
            data_coutry() {
                const result = [
                    {
                        realty: BwSearchRealty.Квартиры,
                        count_all: 1000000,
                        count_today: 1000,
                        count_new: 1000,
                    },
                    {
                        realty: BwSearchRealty.Комнаты,
                        count_all: 150000,
                        count_today: 150,
                        count_new: 150,
                    },
                ];
                return result;
            }
        }
        $$.$bw_search_block_for_sale = $bw_search_block_for_sale;
        class $bw_search_block_for_rent extends $.$bw_search_block_for_rent {
            city_row_click(row_data, event, force) {
                if (!event)
                    return;
                console.log(row_data);
            }
            region_row_click(row_data, event, force) {
                if (!event)
                    return;
                console.log(row_data);
            }
            data_city() {
                const result = [
                    {
                        realty: BwSearchRealty.Квартиры,
                        count_all: 1000000,
                        count_today: 1000,
                        count_new: 1000,
                    },
                    {
                        realty: BwSearchRealty.Комнаты,
                        count_all: 150000,
                        count_today: 150,
                        count_new: 150,
                    },
                    {
                        realty: BwSearchRealty.Загородная,
                        count_all: 500000,
                        count_today: 500,
                        count_new: 500,
                    },
                    {
                        realty: BwSearchRealty.Коммерческая,
                        count_all: 1000,
                        count_today: 150,
                        count_new: 150,
                    },
                    {
                        realty: BwSearchRealty.Гаражи,
                        count_all: 15000,
                        count_today: 15,
                        count_new: 15,
                    },
                    null,
                ];
                return result;
            }
            data_region() {
                return this.data_city();
            }
        }
        $$.$bw_search_block_for_rent = $bw_search_block_for_rent;
        class $bw_search_block_table extends $.$bw_search_block_table {
            rows() {
                const table_data = this.table_data();
                const result = !Array.isArray(table_data) ? null : table_data.map((row_data) => this.Row(row_data));
                return result;
            }
            realty(row_data) {
                const result = !row_data ? '' : BwSearchRealty[row_data.realty];
                return result;
            }
            count_all(row_data) {
                return !row_data ? '' : this.format_number(row_data.count_all);
            }
            count_today(row_data) {
                return !row_data ? '' : this.format_number(row_data.count_today);
            }
            count_new(row_data) {
                return !row_data ? '' : this.format_number(row_data.count_new);
            }
            format_number(n) {
                const result = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                return result;
            }
        }
        $$.$bw_search_block_table = $bw_search_block_table;
        class $bw_search_params extends $.$bw_search_params {
            main_params_opacity() {
                const result = this.mode() === 'main' ? 1 : 0;
                return result;
            }
            Main() {
                const result = super.Main();
                return result;
            }
            Main_condition() {
                let mode;
                let main_params_opacity_animation_is;
                let main_params_opacity;
                const result = (() => (mode = this.mode()) == 'main')() ||
                    (() => main_params_opacity_animation_is = this.main_params_opacity_animation_is())() ||
                    (() => (main_params_opacity = this.main_params_opacity()) == 1)();
                return result;
            }
            full_params_opacity() {
                const result = this.mode() === 'full' ? 1 : 0;
                return result;
            }
            Full() {
                const result = super.Full();
                return result;
            }
            Full_condition() {
                const result = this.mode() == 'full' ||
                    this.full_params_opacity_animation_is() ||
                    this.full_params_opacity() == 1;
                return result;
            }
            min_height() {
                const result = this.min_height_config()[this.mode()] || 0;
                return result;
            }
            min_height_animation_start(p) {
                const delta = p.end - p.start;
                if (delta < 0) {
                    let content_client_rect_height = $bw_search.instance().Result().content_client_rect_height();
                    if (content_client_rect_height) {
                        content_client_rect_height -= delta;
                        $bw_search.instance().Result().content_client_rect_height(content_client_rect_height);
                    }
                }
            }
            min_height_animation_finish(p) {
                $bw_search.instance().Result().content_client_rect_height(null);
            }
            min_height_config() {
                return { full: 627, main: 295, short: 100 };
            }
            min_height_animation_steps(p) {
                const config = this.min_height_config();
                const result = Math.sqrt(Math.abs(p.start - p.end)) / Math.sqrt(config['full'] - config['short']) * 16;
                return result;
            }
            mode_enabled(id) {
                return id != this.mode();
            }
            mode(val, force) {
                return super.mode(val, force);
            }
            bread_crumb_defs() {
                return ['1-комн.кв', 'общая: 35-45м²', 'кухня: от 9м²', 'до 4.8 млн.₽'];
            }
            bread_crumbs() {
                const result = this.bread_crumb_defs().map((def, i) => this.BreadCrumb(i));
                return result;
            }
            break_crumb_client_rect(i) {
                const elem = this.BreadCrumb(i).dom_node();
                const display = elem.currentStyle ?
                    elem.currentStyle.display :
                    getComputedStyle(elem, null).display;
                const result = display == 'none' ? null :
                    this.BreadCrumb(i).dom_node().getBoundingClientRect();
                return result;
            }
            client_rect() {
                return $$.meter({
                    _super: (val) => super.client_rect(val),
                    _value: () => {
                        const result = this.dom_node().getBoundingClientRect();
                        return result;
                    }
                });
            }
            input_client_rect() {
                return $$.meter({
                    _super: (val) => super.input_client_rect(val),
                    _value: () => {
                        const result = this.Input().dom_node().getBoundingClientRect();
                        return result;
                    }
                });
            }
            bread_crumb_display(i) {
                const result = i < this.bread_crumb_defs().length && (i == 0 || this.bread_crumb_pos(i - 1) !== null) ?
                    'block' : 'none';
                return result;
            }
            mode_client_rect() {
                return $$.meter({
                    _super: (val) => super.mode_client_rect(val),
                    _value: () => {
                        const result = this.Mode().dom_node().getBoundingClientRect();
                        return result;
                    }
                });
            }
            bread_crumb_pos(i) {
                let result = null;
                if (i == 0) {
                    const client_rect = this.client_rect();
                    const input_client_rect = this.input_client_rect();
                    if (client_rect && input_client_rect) {
                        result = {
                            top: input_client_rect.top - client_rect.top,
                            left: input_client_rect.right - client_rect.left + 16,
                        };
                        window.dispatchEvent(new CustomEvent('bw_resize'));
                    }
                }
                else if (i < this.bread_crumb_defs().length) {
                    const client_rect = this.client_rect();
                    const prev_client_rect = this.break_crumb_client_rect(i - 1);
                    if (client_rect && prev_client_rect) {
                        result = {
                            top: prev_client_rect.top - client_rect.top,
                            left: prev_client_rect.right - client_rect.left + 8,
                        };
                        window.dispatchEvent(new CustomEvent('bw_resize'));
                    }
                }
                return result;
            }
            bread_crumb_top(i) {
                const pos = this.bread_crumb_pos(i);
                return pos === null ? null : pos.top;
            }
            bread_crumb_left(i) {
                const pos = this.bread_crumb_pos(i);
                return pos === null ? null : pos.left;
            }
            bread_crumb_text(i) {
                return this.bread_crumb_defs()[i];
            }
        }
        __decorate([
            $$.$bw_animate
        ], $bw_search_params.prototype, "main_params_opacity", null);
        __decorate([
            $$.$bw_conditional
        ], $bw_search_params.prototype, "Main", null);
        __decorate([
            $$.$bw_animate
        ], $bw_search_params.prototype, "full_params_opacity", null);
        __decorate([
            $$.$bw_conditional
        ], $bw_search_params.prototype, "Full", null);
        __decorate([
            $$.$bw_animate
        ], $bw_search_params.prototype, "min_height", null);
        __decorate([
            $$.$bw_session
        ], $bw_search_params.prototype, "mode", null);
        __decorate([
            $$.$bw_meter_key
        ], $bw_search_params.prototype, "break_crumb_client_rect", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_search_params.prototype, "bread_crumb_display", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_search_params.prototype, "bread_crumb_pos", null);
        $$.$bw_search_params = $bw_search_params;
        class $bw_search_result_mapon extends $.$bw_search_result_mapon {
            Icon() {
                const result = this.checked() ? this.SwitchOn() : this.SwitchOff();
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_search_result_mapon.prototype, "Icon", null);
        $$.$bw_search_result_mapon = $bw_search_result_mapon;
        class $bw_search_menu extends $.$bw_search_menu {
            option_enabled(id) {
                return this.value() != id;
            }
            option_id(id) {
                return id;
            }
        }
        $$.$bw_search_menu = $bw_search_menu;
        class $bw_search_menu_option extends $.$bw_search_menu_option {
            event_activate(next) {
                if (this.checked())
                    return;
                super.event_activate(next);
            }
            Icon() {
                const result = this.is_new() ? this.IconPlus() : this.IconClose();
                return result;
            }
            is_new() {
                return this.id() == '';
            }
        }
        $$.$bw_search_menu_option = $bw_search_menu_option;
        class $bw_search_result extends $.$bw_search_result {
            content_client_rect() {
                const result = this.Content().dom_node().getBoundingClientRect();
                return result;
            }
            map_height() {
                return !this.map_on() ? 0 : this.map_height_max();
            }
            map_opacity() {
                const result = this.map_on() ? 1 : 0;
                return result;
            }
            map_opacity_animation_steps() {
                return this.grid_height_animated_animation_steps();
            }
            grid_top() {
                return this.map_height();
            }
            grid_top_animation_easing() {
                return this.grid_height_animated_animation_easing();
            }
            grid_top_animation_steps() {
                return this.grid_height_animated_animation_steps();
            }
            content_client_rect_height(val) {
                let result = super.content_client_rect_height(val);
                if (result === null) {
                    const client_rect = this.content_client_rect();
                    if (client_rect)
                        result = client_rect.height;
                }
                return result;
            }
            grid_height() {
                const client_rect_height = this.content_client_rect_height();
                const result = !client_rect_height ? { min: 0, max: 0 } :
                    {
                        min: client_rect_height - this.map_height(),
                        max: client_rect_height,
                    };
                return result;
            }
            grid_height_animated() {
                const grid_height = this.grid_height();
                return this.map_on() ? grid_height.min : grid_height.max;
            }
            grid_height_animated_animation_steps() {
                return 16;
            }
            grid_height_animated_animation_easing() {
                return $$.BwEasing.easeInOutQuad;
            }
            grid_height_animated_animation_finish(p) {
                p.fn_store(null);
            }
            grid_height_to_use() {
                let result = super.grid_height_to_use();
                if (result === null) {
                    window.addEventListener('resize', () => {
                        if (window.innerHeight > super.grid_height_to_use()) {
                            super.grid_height_to_use(window.innerHeight);
                        }
                    });
                    result = window.innerHeight;
                    super.grid_height_to_use(result);
                }
                return result;
            }
        }
        __decorate([
            $$.$bw_meter
        ], $bw_search_result.prototype, "content_client_rect", null);
        __decorate([
            $$.$bw_animate
        ], $bw_search_result.prototype, "map_opacity", null);
        __decorate([
            $$.$bw_animate
        ], $bw_search_result.prototype, "grid_top", null);
        __decorate([
            $$.$bw_animate
        ], $bw_search_result.prototype, "grid_height_animated", null);
        __decorate([
            $.$mol_mem
        ], $bw_search_result.prototype, "grid_height_to_use", null);
        $$.$bw_search_result = $bw_search_result;
        class $bw_search_result_grid extends $.$bw_search_result_grid {
        }
        $$.$bw_search_result_grid = $bw_search_result_grid;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//search.view.js.map
;
"use strict";
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_bowser extends $.$mol_object {
            static getParser(UA, skipParsing = false) {
                if (typeof UA !== 'string') {
                    throw new Error('UserAgent should be a string');
                }
                return new Parser(UA, skipParsing);
            }
            static parse(UA) {
                return (new Parser(UA)).getResult();
            }
        }
        $$.$bw_bowser = $bw_bowser;
        class Parser {
            constructor(UA, skipParsing = false) {
                if (UA === void (0) || UA === null || UA === '') {
                    throw new Error("UserAgent parameter can't be empty");
                }
                this._ua = UA;
                this.parsedResult = {};
                if (skipParsing !== true) {
                    this.parse();
                }
            }
            getUA() {
                return this._ua;
            }
            test(regex) {
                return regex.test(this._ua);
            }
            parseBrowser() {
                this.parsedResult.browser = {};
                const browserDescriptor = browserParsersList.find((_browser) => {
                    if (typeof _browser.test === 'function') {
                        return _browser.test(this);
                    }
                    if (_browser.test instanceof Array) {
                        return _browser.test.some(condition => this.test(condition));
                    }
                    throw new Error("Browser's test function is not valid");
                });
                if (browserDescriptor) {
                    this.parsedResult.browser = browserDescriptor.describe(this.getUA());
                }
                return this.parsedResult.browser;
            }
            getBrowser() {
                if (this.parsedResult.browser) {
                    return this.parsedResult.browser;
                }
                return this.parseBrowser();
            }
            getBrowserName(toLowerCase = false) {
                if (toLowerCase) {
                    return String(this.getBrowser().name).toLowerCase() || '';
                }
                return this.getBrowser().name || '';
            }
            getBrowserVersion() {
                return this.getBrowser().version;
            }
            getOS() {
                if (this.parsedResult.os) {
                    return this.parsedResult.os;
                }
                return this.parseOS();
            }
            parseOS() {
                this.parsedResult.os = {};
                const os = osParsersList.find((_os) => {
                    if (typeof _os.test === 'function') {
                        return _os.test(this);
                    }
                    if (_os.test instanceof Array) {
                        return _os.test.some(condition => this.test(condition));
                    }
                    throw new Error("Browser's test function is not valid");
                });
                if (os) {
                    this.parsedResult.os = os.describe(this.getUA());
                }
                return this.parsedResult.os;
            }
            getOSName(toLowerCase) {
                const { name } = this.getOS();
                if (toLowerCase) {
                    return String(name).toLowerCase() || '';
                }
                return name || '';
            }
            getOSVersion() {
                return this.getOS().version;
            }
            getPlatform() {
                if (this.parsedResult.platform) {
                    return this.parsedResult.platform;
                }
                return this.parsePlatform();
            }
            getPlatformType(toLowerCase = false) {
                const { type } = this.getPlatform();
                if (toLowerCase) {
                    return String(type).toLowerCase() || '';
                }
                return type || '';
            }
            parsePlatform() {
                this.parsedResult.platform = {};
                const platform = platformParsersList.find((_platform) => {
                    if (typeof _platform.test === 'function') {
                        return _platform.test(this);
                    }
                    if (_platform.test instanceof Array) {
                        return _platform.test.some(condition => this.test(condition));
                    }
                    throw new Error("Browser's test function is not valid");
                });
                if (platform) {
                    this.parsedResult.platform = platform.describe(this.getUA());
                }
                return this.parsedResult.platform;
            }
            getEngine() {
                if (this.parsedResult.engine) {
                    return this.parsedResult.engine;
                }
                return this.parseEngine();
            }
            getEngineName(toLowerCase) {
                if (toLowerCase) {
                    return String(this.getEngine().name).toLowerCase() || '';
                }
                return this.getEngine().name || '';
            }
            parseEngine() {
                this.parsedResult.engine = {};
                const engine = enginesParsersList.find((_engine) => {
                    if (typeof _engine.test === 'function') {
                        return _engine.test(this);
                    }
                    if (_engine.test instanceof Array) {
                        return _engine.test.some(condition => this.test(condition));
                    }
                    throw new Error("Browser's test function is not valid");
                });
                if (engine) {
                    this.parsedResult.engine = engine.describe(this.getUA());
                }
                return this.parsedResult.engine;
            }
            parse() {
                this.parseBrowser();
                this.parseOS();
                this.parsePlatform();
                this.parseEngine();
                return this;
            }
            getResult() {
                return Object.assign({}, this.parsedResult);
            }
            satisfies(checkTree) {
                const platformsAndOSes = {};
                let platformsAndOSCounter = 0;
                const browsers = {};
                let browsersCounter = 0;
                const allDefinitions = Object.keys(checkTree);
                allDefinitions.forEach((key) => {
                    const currentDefinition = checkTree[key];
                    if (typeof currentDefinition === 'string') {
                        browsers[key] = currentDefinition;
                        browsersCounter += 1;
                    }
                    else if (typeof currentDefinition === 'object') {
                        platformsAndOSes[key] = currentDefinition;
                        platformsAndOSCounter += 1;
                    }
                });
                if (platformsAndOSCounter > 0) {
                    const platformsAndOSNames = Object.keys(platformsAndOSes);
                    const OSMatchingDefinition = platformsAndOSNames.find(name => (this.isOS(name)));
                    if (OSMatchingDefinition) {
                        const osResult = this.satisfies(platformsAndOSes[OSMatchingDefinition]);
                        if (osResult !== void 0) {
                            return osResult;
                        }
                    }
                    const platformMatchingDefinition = platformsAndOSNames.find(name => (this.isPlatform(name)));
                    if (platformMatchingDefinition) {
                        const platformResult = this.satisfies(platformsAndOSes[platformMatchingDefinition]);
                        if (platformResult !== void 0) {
                            return platformResult;
                        }
                    }
                }
                if (browsersCounter > 0) {
                    const browserNames = Object.keys(browsers);
                    const matchingDefinition = browserNames.find(name => (this.isBrowser(name)));
                    if (matchingDefinition !== void 0) {
                        return this.compareVersion(browsers[matchingDefinition]);
                    }
                }
                return undefined;
            }
            isBrowser(browserName) {
                return this.getBrowserName(true) === String(browserName).toLowerCase();
            }
            compareVersion(version) {
                let expectedResults = [0];
                let comparableVersion = version;
                let isLoose = false;
                const currentBrowserVersion = this.getBrowserVersion();
                if (typeof currentBrowserVersion !== 'string') {
                    return void 0;
                }
                if (version[0] === '>' || version[0] === '<') {
                    comparableVersion = version.substr(1);
                    if (version[1] === '=') {
                        isLoose = true;
                        comparableVersion = version.substr(2);
                    }
                    else {
                        expectedResults = [];
                    }
                    if (version[0] === '>') {
                        expectedResults.push(1);
                    }
                    else {
                        expectedResults.push(-1);
                    }
                }
                else if (version[0] === '=') {
                    comparableVersion = version.substr(1);
                }
                else if (version[0] === '~') {
                    isLoose = true;
                    comparableVersion = version.substr(1);
                }
                return expectedResults.indexOf(compareVersions(currentBrowserVersion, comparableVersion, isLoose)) > -1;
            }
            isOS(osName) {
                return this.getOSName(true) === String(osName).toLowerCase();
            }
            isPlatform(platformType) {
                return this.getPlatformType(true) === String(platformType).toLowerCase();
            }
            isEngine(engineName) {
                return this.getEngineName(true) === String(engineName).toLowerCase();
            }
            is(anything) {
                return this.isBrowser(anything) || this.isOS(anything) || this.isPlatform(anything);
            }
            some(anythings = []) {
                return anythings.some(anything => this.is(anything));
            }
        }
        const commonVersionIdentifier = /version\/(\d+(\.?_?\d+)+)/i;
        const browserParsersList = [
            {
                test: [/googlebot/i],
                describe(ua) {
                    const browser = {
                        name: 'Googlebot',
                    };
                    const version = getFirstMatch(/googlebot\/(\d+(\.\d+))/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/opera/i],
                describe(ua) {
                    const browser = {
                        name: 'Opera',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:opera)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/opr\/|opios/i],
                describe(ua) {
                    const browser = {
                        name: 'Opera',
                    };
                    const version = getFirstMatch(/(?:opr|opios)[\s/](\S+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/SamsungBrowser/i],
                describe(ua) {
                    const browser = {
                        name: 'Samsung Internet for Android',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:SamsungBrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/Whale/i],
                describe(ua) {
                    const browser = {
                        name: 'NAVER Whale Browser',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:whale)[\s/](\d+(?:\.\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/MZBrowser/i],
                describe(ua) {
                    const browser = {
                        name: 'MZ Browser',
                    };
                    const version = getFirstMatch(/(?:MZBrowser)[\s/](\d+(?:\.\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/focus/i],
                describe(ua) {
                    const browser = {
                        name: 'Focus',
                    };
                    const version = getFirstMatch(/(?:focus)[\s/](\d+(?:\.\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/swing/i],
                describe(ua) {
                    const browser = {
                        name: 'Swing',
                    };
                    const version = getFirstMatch(/(?:swing)[\s/](\d+(?:\.\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/coast/i],
                describe(ua) {
                    const browser = {
                        name: 'Opera Coast',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:coast)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/yabrowser/i],
                describe(ua) {
                    const browser = {
                        name: 'Yandex Browser',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:yabrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/ucbrowser/i],
                describe(ua) {
                    const browser = {
                        name: 'UC Browser',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:ucbrowser)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/Maxthon|mxios/i],
                describe(ua) {
                    const browser = {
                        name: 'Maxthon',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:Maxthon|mxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/epiphany/i],
                describe(ua) {
                    const browser = {
                        name: 'Epiphany',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:epiphany)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/puffin/i],
                describe(ua) {
                    const browser = {
                        name: 'Puffin',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:puffin)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/sleipnir/i],
                describe(ua) {
                    const browser = {
                        name: 'Sleipnir',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:sleipnir)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/k-meleon/i],
                describe(ua) {
                    const browser = {
                        name: 'K-Meleon',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/(?:k-meleon)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/micromessenger/i],
                describe(ua) {
                    const browser = {
                        name: 'WeChat',
                    };
                    const version = getFirstMatch(/(?:micromessenger)[\s/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/msie|trident/i],
                describe(ua) {
                    const browser = {
                        name: 'Internet Explorer',
                    };
                    const version = getFirstMatch(/(?:msie |rv:)(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/edg([ea]|ios)/i],
                describe(ua) {
                    const browser = {
                        name: 'Microsoft Edge',
                    };
                    const version = getSecondMatch(/edg([ea]|ios)\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/vivaldi/i],
                describe(ua) {
                    const browser = {
                        name: 'Vivaldi',
                    };
                    const version = getFirstMatch(/vivaldi\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/seamonkey/i],
                describe(ua) {
                    const browser = {
                        name: 'SeaMonkey',
                    };
                    const version = getFirstMatch(/seamonkey\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/sailfish/i],
                describe(ua) {
                    const browser = {
                        name: 'Sailfish',
                    };
                    const version = getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/silk/i],
                describe(ua) {
                    const browser = {
                        name: 'Amazon Silk',
                    };
                    const version = getFirstMatch(/silk\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/phantom/i],
                describe(ua) {
                    const browser = {
                        name: 'PhantomJS',
                    };
                    const version = getFirstMatch(/phantomjs\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/slimerjs/i],
                describe(ua) {
                    const browser = {
                        name: 'SlimerJS',
                    };
                    const version = getFirstMatch(/slimerjs\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                describe(ua) {
                    const browser = {
                        name: 'BlackBerry',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/blackberry[\d]+\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/(web|hpw)[o0]s/i],
                describe(ua) {
                    const browser = {
                        name: 'WebOS Browser',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua) || getFirstMatch(/w(?:eb)?[o0]sbrowser\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/bada/i],
                describe(ua) {
                    const browser = {
                        name: 'Bada',
                    };
                    const version = getFirstMatch(/dolfin\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/tizen/i],
                describe(ua) {
                    const browser = {
                        name: 'Tizen',
                    };
                    const version = getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/qupzilla/i],
                describe(ua) {
                    const browser = {
                        name: 'QupZilla',
                    };
                    const version = getFirstMatch(/(?:qupzilla)[\s/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/firefox|iceweasel|fxios/i],
                describe(ua) {
                    const browser = {
                        name: 'Firefox',
                    };
                    const version = getFirstMatch(/(?:firefox|iceweasel|fxios)[\s/](\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/chromium/i],
                describe(ua) {
                    const browser = {
                        name: 'Chromium',
                    };
                    const version = getFirstMatch(/(?:chromium)[\s/](\d+(\.?_?\d+)+)/i, ua) || getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/chrome|crios|crmo/i],
                describe(ua) {
                    const browser = {
                        name: 'Chrome',
                    };
                    const version = getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test(parser) {
                    const notLikeAndroid = !parser.test(/like android/i);
                    const butAndroid = parser.test(/android/i);
                    return notLikeAndroid && butAndroid;
                },
                describe(ua) {
                    const browser = {
                        name: 'Android Browser',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/safari|applewebkit/i],
                describe(ua) {
                    const browser = {
                        name: 'Safari',
                    };
                    const version = getFirstMatch(commonVersionIdentifier, ua);
                    if (version) {
                        browser.version = version;
                    }
                    return browser;
                },
            },
            {
                test: [/.*/i],
                describe(ua) {
                    return {
                        name: getFirstMatch(/^(.*)\/(.*) /, ua),
                        version: getSecondMatch(/^(.*)\/(.*) /, ua),
                    };
                },
            },
        ];
        const osParsersList = [
            {
                test: [/windows phone/i],
                describe(ua) {
                    const version = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i, ua);
                    return {
                        name: 'Windows Phone',
                        version,
                    };
                },
            },
            {
                test: [/windows/i],
                describe(ua) {
                    const version = getFirstMatch(/Windows ((NT|XP)( \d\d?.\d)?)/i, ua);
                    const versionName = getWindowsVersionName(version);
                    return {
                        name: 'Windows',
                        version,
                        versionName,
                    };
                },
            },
            {
                test: [/macintosh/i],
                describe(ua) {
                    const version = getFirstMatch(/mac os x (\d+(\.?_?\d+)+)/i, ua).replace(/[_\s]/g, '.');
                    return {
                        name: 'macOS',
                        version,
                    };
                },
            },
            {
                test: [/(ipod|iphone|ipad)/i],
                describe(ua) {
                    const version = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i, ua).replace(/[_\s]/g, '.');
                    return {
                        name: 'iOS',
                        version,
                    };
                },
            },
            {
                test(parser) {
                    const notLikeAndroid = !parser.test(/like android/i);
                    const butAndroid = parser.test(/android/i);
                    return notLikeAndroid && butAndroid;
                },
                describe(ua) {
                    const version = getFirstMatch(/android[\s/-](\d+(\.\d+)*)/i, ua);
                    const versionName = getAndroidVersionName(version);
                    const os = {
                        name: 'Android',
                        version,
                    };
                    if (versionName) {
                        os.versionName = versionName;
                    }
                    return os;
                },
            },
            {
                test: [/(web|hpw)[o0]s/i],
                describe(ua) {
                    const version = getFirstMatch(/(?:web|hpw)[o0]s\/(\d+(\.\d+)*)/i, ua);
                    const os = {
                        name: 'WebOS',
                    };
                    if (version && version.length) {
                        os.version = version;
                    }
                    return os;
                },
            },
            {
                test: [/blackberry|\bbb\d+/i, /rim\stablet/i],
                describe(ua) {
                    const version = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i, ua)
                        || getFirstMatch(/blackberry\d+\/(\d+([_\s]\d+)*)/i, ua)
                        || getFirstMatch(/\bbb(\d+)/i, ua);
                    return {
                        name: 'BlackBerry',
                        version,
                    };
                },
            },
            {
                test: [/bada/i],
                describe(ua) {
                    const version = getFirstMatch(/bada\/(\d+(\.\d+)*)/i, ua);
                    return {
                        name: 'Bada',
                        version,
                    };
                },
            },
            {
                test: [/tizen/i],
                describe(ua) {
                    const version = getFirstMatch(/tizen[/\s](\d+(\.\d+)*)/i, ua);
                    return {
                        name: 'Tizen',
                        version,
                    };
                },
            },
            {
                test: [/linux/i],
                describe() {
                    return {
                        name: 'Linux',
                    };
                },
            },
            {
                test: [/CrOS/],
                describe() {
                    return {
                        name: 'Chrome OS',
                    };
                },
            },
        ];
        const TYPES_LABELS = {
            tablet: 'tablet',
            mobile: 'mobile',
            desktop: 'desktop',
        };
        const platformParsersList = [
            {
                test: [/googlebot/i],
                describe() {
                    return {
                        type: 'bot',
                        vendor: 'Google',
                    };
                },
            },
            {
                test: [/huawei/i],
                describe(ua) {
                    const model = getFirstMatch(/(can-l01)/i, ua) && 'Nova';
                    const platform = {
                        type: TYPES_LABELS.mobile,
                        vendor: 'Huawei',
                    };
                    if (model) {
                        platform.model = model;
                    }
                    return platform;
                },
            },
            {
                test: [/nexus\s*(?:7|8|9|10).*/i],
                describe() {
                    return {
                        type: TYPES_LABELS.tablet,
                        vendor: 'Nexus',
                    };
                },
            },
            {
                test: [/ipad/i],
                describe() {
                    return {
                        type: TYPES_LABELS.tablet,
                        vendor: 'Apple',
                        model: 'iPad',
                    };
                },
            },
            {
                test: [/kftt build/i],
                describe() {
                    return {
                        type: TYPES_LABELS.tablet,
                        vendor: 'Amazon',
                        model: 'Kindle Fire HD 7',
                    };
                },
            },
            {
                test: [/silk/i],
                describe() {
                    return {
                        type: TYPES_LABELS.tablet,
                        vendor: 'Amazon',
                    };
                },
            },
            {
                test: [/tablet/i],
                describe() {
                    return {
                        type: TYPES_LABELS.tablet,
                    };
                },
            },
            {
                test(parser) {
                    const iDevice = parser.test(/ipod|iphone/i);
                    const likeIDevice = parser.test(/like (ipod|iphone)/i);
                    return iDevice && !likeIDevice;
                },
                describe(ua) {
                    const model = getFirstMatch(/(ipod|iphone)/i, ua);
                    return {
                        type: TYPES_LABELS.mobile,
                        vendor: 'Apple',
                        model,
                    };
                },
            },
            {
                test: [/nexus\s*[0-6].*/i, /galaxy nexus/i],
                describe() {
                    return {
                        type: TYPES_LABELS.mobile,
                        vendor: 'Nexus',
                    };
                },
            },
            {
                test: [/[^-]mobi/i],
                describe() {
                    return {
                        type: TYPES_LABELS.mobile,
                    };
                },
            },
            {
                test(parser) {
                    return parser.getBrowserName(true) === 'blackberry';
                },
                describe() {
                    return {
                        type: TYPES_LABELS.mobile,
                        vendor: 'BlackBerry',
                    };
                },
            },
            {
                test(parser) {
                    return parser.getBrowserName(true) === 'bada';
                },
                describe() {
                    return {
                        type: TYPES_LABELS.mobile,
                    };
                },
            },
            {
                test(parser) {
                    return parser.getBrowserName() === 'windows phone';
                },
                describe() {
                    return {
                        type: TYPES_LABELS.mobile,
                        vendor: 'Microsoft',
                    };
                },
            },
            {
                test(parser) {
                    const osMajorVersion = Number(String(parser.getOSVersion()).split('.')[0]);
                    return parser.getOSName(true) === 'android' && (osMajorVersion >= 3);
                },
                describe() {
                    return {
                        type: TYPES_LABELS.tablet,
                    };
                },
            },
            {
                test(parser) {
                    return parser.getOSName(true) === 'android';
                },
                describe() {
                    return {
                        type: TYPES_LABELS.mobile,
                    };
                },
            },
            {
                test(parser) {
                    return parser.getOSName(true) === 'macos';
                },
                describe() {
                    return {
                        type: TYPES_LABELS.desktop,
                        vendor: 'Apple',
                    };
                },
            },
            {
                test(parser) {
                    return parser.getOSName(true) === 'windows';
                },
                describe() {
                    return {
                        type: TYPES_LABELS.desktop,
                    };
                },
            },
            {
                test(parser) {
                    return parser.getOSName(true) === 'linux';
                },
                describe() {
                    return {
                        type: TYPES_LABELS.desktop,
                    };
                },
            },
        ];
        const enginesParsersList = [
            {
                test(parser) {
                    return parser.getBrowserName(true) === 'microsoft edge';
                },
                describe(ua) {
                    const version = getFirstMatch(/edge\/(\d+(\.?_?\d+)+)/i, ua);
                    return {
                        name: 'EdgeHTML',
                        version,
                    };
                },
            },
            {
                test: [/trident/i],
                describe(ua) {
                    const engine = {
                        name: 'Trident',
                    };
                    const version = getFirstMatch(/trident\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        engine.version = version;
                    }
                    return engine;
                },
            },
            {
                test(parser) {
                    return parser.test(/presto/i);
                },
                describe(ua) {
                    const engine = {
                        name: 'Presto',
                    };
                    const version = getFirstMatch(/presto\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        engine.version = version;
                    }
                    return engine;
                },
            },
            {
                test(parser) {
                    const isGecko = parser.test(/gecko/i);
                    const likeGecko = parser.test(/like gecko/i);
                    return isGecko && !likeGecko;
                },
                describe(ua) {
                    const engine = {
                        name: 'Gecko',
                    };
                    const version = getFirstMatch(/gecko\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        engine.version = version;
                    }
                    return engine;
                },
            },
            {
                test: [/(apple)?webkit\/537\.36/i],
                describe() {
                    return {
                        name: 'Blink',
                    };
                },
            },
            {
                test: [/(apple)?webkit/i],
                describe(ua) {
                    const engine = {
                        name: 'WebKit',
                    };
                    const version = getFirstMatch(/webkit\/(\d+(\.?_?\d+)+)/i, ua);
                    if (version) {
                        engine.version = version;
                    }
                    return engine;
                },
            },
        ];
        function getFirstMatch(regexp, ua) {
            const match = ua.match(regexp);
            return (match && match.length > 0 && match[1]) || '';
        }
        function getSecondMatch(regexp, ua) {
            const match = ua.match(regexp);
            return (match && match.length > 1 && match[2]) || '';
        }
        function matchAndReturnConst(regexp, ua, _const) {
            if (regexp.test(ua)) {
                return _const;
            }
            return void (0);
        }
        function getWindowsVersionName(version) {
            switch (version) {
                case 'NT': return 'NT';
                case 'XP': return 'XP';
                case 'NT 5.0': return '2000';
                case 'NT 5.1': return 'XP';
                case 'NT 5.2': return '2003';
                case 'NT 6.0': return 'Vista';
                case 'NT 6.1': return '7';
                case 'NT 6.2': return '8';
                case 'NT 6.3': return '8.1';
                case 'NT 10.0': return '10';
                default: return undefined;
            }
        }
        function getAndroidVersionName(version) {
            const v = version.split('.').splice(0, 2).map(s => parseInt(s, 10) || 0);
            v.push(0);
            if (v[0] === 1 && v[1] < 5)
                return undefined;
            if (v[0] === 1 && v[1] < 6)
                return 'Cupcake';
            if (v[0] === 1 && v[1] >= 6)
                return 'Donut';
            if (v[0] === 2 && v[1] < 2)
                return 'Eclair';
            if (v[0] === 2 && v[1] === 2)
                return 'Froyo';
            if (v[0] === 2 && v[1] > 2)
                return 'Gingerbread';
            if (v[0] === 3)
                return 'Honeycomb';
            if (v[0] === 4 && v[1] < 1)
                return 'Ice Cream Sandwich';
            if (v[0] === 4 && v[1] < 4)
                return 'Jelly Bean';
            if (v[0] === 4 && v[1] >= 4)
                return 'KitKat';
            if (v[0] === 5)
                return 'Lollipop';
            if (v[0] === 6)
                return 'Marshmallow';
            if (v[0] === 7)
                return 'Nougat';
            if (v[0] === 8)
                return 'Oreo';
            return undefined;
        }
        function getVersionPrecision(version) {
            return version.split('.').length;
        }
        function compareVersions(versionA, versionB, isLoose = false) {
            const versionAPrecision = getVersionPrecision(versionA);
            const versionBPrecision = getVersionPrecision(versionB);
            let precision = Math.max(versionAPrecision, versionBPrecision);
            let lastPrecision = 0;
            const chunks = map([versionA, versionB], (version) => {
                const delta = precision - getVersionPrecision(version);
                const _version = version + new Array(delta + 1).join('.0');
                return map(_version.split('.'), (chunk) => new Array(20 - chunk.length).join('0') + chunk).reverse();
            });
            if (isLoose) {
                lastPrecision = precision - Math.min(versionAPrecision, versionBPrecision);
            }
            precision -= 1;
            while (precision >= lastPrecision) {
                if (chunks[0][precision] > chunks[1][precision]) {
                    return 1;
                }
                if (chunks[0][precision] === chunks[1][precision]) {
                    if (precision === lastPrecision) {
                        return 0;
                    }
                    precision -= 1;
                }
                else if (chunks[0][precision] < chunks[1][precision]) {
                    return -1;
                }
            }
        }
        function map(arr, iterator) {
            const result = [];
            let i;
            if (Array.prototype.map) {
                return Array.prototype.map.call(arr, iterator);
            }
            for (i = 0; i < arr.length; i += 1) {
                result.push(iterator(arr[i]));
            }
            return result;
        }
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bowser.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_mainmenu extends $.$mol_view {
        selected_item(val, force) {
            return (val !== void 0) ? val : "";
        }
        sub() {
            return [].concat(this.Login(), this.Ear(), this.ListWrapper());
        }
        Login() {
            return ((obj) => {
                obj.style = () => ({
                    "width": this.flex_basis(),
                });
                return obj;
            })(new this.$.$bw_mainmenu_login);
        }
        Ear() {
            return ((obj) => {
                obj.checked = (val) => this.is_narrow(val);
                obj.style = () => ({
                    "left": this.flex_basis(),
                });
                return obj;
            })(new this.$.$bw_mainmenu_login_ear);
        }
        is_narrow(val, force) {
            return (val !== void 0) ? val : false;
        }
        ListWrapper() {
            return ((obj) => {
                obj.sub = () => [].concat(this.List());
                return obj;
            })(new this.$.$mol_view);
        }
        List() {
            return ((obj) => {
                obj.is_narrow = () => this.is_narrow();
                obj.items_def = () => this.items_def();
                obj.selected_item = (val) => this.selected_item(val);
                return obj;
            })(new this.$.$bw_mainmenu_list);
        }
        items_def() {
            return ({});
        }
        attr() {
            return (Object.assign({}, super.attr(), { "bw_mainmenu_width": this.bw_mainmenu_width() }));
        }
        bw_mainmenu_width(val, force) {
            return (val !== void 0) ? val : "";
        }
        style() {
            return ({
                "flex-basis": this.flex_basis(),
            });
        }
        flex_basis() {
            return null;
        }
        opacity() {
            return 0;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu.prototype, "selected_item", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu.prototype, "Login", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu.prototype, "Ear", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu.prototype, "is_narrow", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu.prototype, "ListWrapper", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu.prototype, "List", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu.prototype, "bw_mainmenu_width", null);
    $.$bw_mainmenu = $bw_mainmenu;
})($ || ($ = {}));
(function ($) {
    class $bw_mainmenu_list extends $.$mol_view {
        is_narrow() {
            return false;
        }
        items_def() {
            return ({});
        }
        selected_item(val, force) {
            return (val !== void 0) ? val : "";
        }
        MenuItem(name) {
            return ((obj) => {
                obj.id = () => this.menu_item_id(name);
                obj.title = () => this.menu_item_title(name);
                obj.Icon = () => this.MenuItemIcon(name);
                obj.checked = (val) => this.is_selected_item(name, val);
                return obj;
            })(new this.$.$bw_mainmenu_list_item);
        }
        menu_item_id(name) {
            return "";
        }
        menu_item_title(name) {
            return "";
        }
        MenuItemIcon(name) {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_svg_root);
        }
        is_selected_item(name, val, force) {
            return (val !== void 0) ? val : false;
        }
        Footer() {
            return ((obj) => {
                obj.style = () => ({
                    "opacity": this.opacity(),
                });
                obj.sub = () => [].concat(this.App(), this.Browser());
                return obj;
            })(new this.$.$mol_view);
        }
        opacity() {
            return null;
        }
        App() {
            return ((obj) => {
                obj.label = () => "Версия программы";
                obj.value = () => "0.0.0";
                return obj;
            })(new this.$.$bw_mainmenu_list_footer_item);
        }
        Browser() {
            return ((obj) => {
                obj.label = () => "Версия браузера";
                obj.value = () => this.browser_version();
                return obj;
            })(new this.$.$bw_mainmenu_list_footer_item);
        }
        browser_version() {
            return "";
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_list.prototype, "selected_item", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_mainmenu_list.prototype, "MenuItem", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_mainmenu_list.prototype, "MenuItemIcon", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_mainmenu_list.prototype, "is_selected_item", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_list.prototype, "Footer", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_list.prototype, "App", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_list.prototype, "Browser", null);
    $.$bw_mainmenu_list = $bw_mainmenu_list;
})($ || ($ = {}));
(function ($) {
    class $bw_mainmenu_login_ear extends $.$mol_check {
        sub() {
            return [].concat(this.Inner());
        }
        Inner() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Icon());
                return obj;
            })(new this.$.$mol_view);
        }
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_slide_left);
        }
        SlideRight() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_slide_right);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_ear.prototype, "Inner", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_ear.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_ear.prototype, "SlideRight", null);
    $.$bw_mainmenu_login_ear = $bw_mainmenu_login_ear;
})($ || ($ = {}));
(function ($) {
    class $bw_mainmenu_login extends $.$mol_check {
        Icon() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_user);
        }
        title() {
            return this.user_name();
        }
        user_name() {
            return "novoseltsev.st@gmail.com";
        }
        sub() {
            return [].concat(this.Icon(), this.label(), this.Menu());
        }
        label() {
            return [].concat(this.Title());
        }
        Title() {
            return ((obj) => {
                obj.style = () => ({
                    "opacity": this.opacity(),
                });
                obj.sub = () => [].concat(this.title());
                return obj;
            })(new this.$.$mol_view);
        }
        opacity() {
            return null;
        }
        Menu() {
            return ((obj) => {
                obj.style = () => ({
                    "width": this.menu_width(),
                    "opacity": this.menu_opacity(),
                });
                return obj;
            })(new this.$.$bw_mainmenu_login_menu);
        }
        menu_width() {
            return null;
        }
        menu_opacity() {
            return 0;
        }
        checked(val, force) {
            return this.shown(val);
        }
        shown(val, force) {
            return (val !== void 0) ? val : false;
        }
        is_hiding(val, force) {
            return (val !== void 0) ? val : false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login.prototype, "Title", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login.prototype, "shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login.prototype, "is_hiding", null);
    $.$bw_mainmenu_login = $bw_mainmenu_login;
})($ || ($ = {}));
(function ($) {
    class $bw_mainmenu_login_menu extends $.$mol_view {
        sub() {
            return [].concat(this.NewDesign(), this.Theme(), this.Settings(), this.Exit());
        }
        NewDesign() {
            return ((obj) => {
                obj.id = () => "new-design";
                obj.title = () => "Новый дизайн";
                obj.Icon = () => this.IconNewDesign();
                obj.event_click = (event) => this.new_design_click(event);
                return obj;
            })(new this.$.$bw_mainmenu_login_menu_list_item);
        }
        IconNewDesign() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_switch_on);
        }
        new_design_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        Theme() {
            return ((obj) => {
                obj.id = () => "theme";
                obj.title = () => "Светлая тема";
                obj.Icon = () => this.theme_icon();
                obj.event_click = (event) => this.theme_click(event);
                return obj;
            })(new this.$.$bw_mainmenu_login_menu_list_item);
        }
        theme_icon() {
            return null;
        }
        theme_click(event, force) {
            return (event !== void 0) ? event : null;
        }
        Settings() {
            return ((obj) => {
                obj.id = () => "settings";
                obj.title = () => "Настройки";
                obj.Icon = () => this.IconSettings();
                return obj;
            })(new this.$.$bw_mainmenu_login_menu_list_item);
        }
        IconSettings() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_settings);
        }
        Exit() {
            return ((obj) => {
                obj.id = () => "exit";
                obj.title = () => "Выйти";
                obj.Icon = () => this.IconExit();
                return obj;
            })(new this.$.$bw_mainmenu_login_menu_list_item);
        }
        IconExit() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_exit_sign);
        }
        IconSwitchOn() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_switch_on);
        }
        IconSwitchOff() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_switch_off);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "NewDesign", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "IconNewDesign", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "new_design_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "Theme", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "theme_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "Settings", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "IconSettings", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "Exit", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "IconExit", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "IconSwitchOn", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_login_menu.prototype, "IconSwitchOff", null);
    $.$bw_mainmenu_login_menu = $bw_mainmenu_login_menu;
})($ || ($ = {}));
(function ($) {
    class $bw_mainmenu_list_item extends $.$mol_check {
        id() {
            return "";
        }
        title() {
            return "";
        }
        Icon() {
            return null;
        }
        minimal_height() {
            return 53;
        }
        sub() {
            return [].concat(this.Inner());
        }
        Inner() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Content());
                return obj;
            })(new this.$.$mol_view);
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Icon(), this.Title());
                return obj;
            })(new this.$.$mol_view);
        }
        Title() {
            return ((obj) => {
                obj.style = () => ({
                    "opacity": this.opacity(),
                });
                obj.sub = () => [].concat(this.title());
                return obj;
            })(new this.$.$mol_view);
        }
        opacity() {
            return null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_list_item.prototype, "Inner", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_list_item.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_list_item.prototype, "Title", null);
    $.$bw_mainmenu_list_item = $bw_mainmenu_list_item;
})($ || ($ = {}));
(function ($) {
    class $bw_mainmenu_login_menu_list_item extends $.$bw_mainmenu_list_item {
    }
    $.$bw_mainmenu_login_menu_list_item = $bw_mainmenu_login_menu_list_item;
})($ || ($ = {}));
(function ($) {
    class $bw_mainmenu_list_footer_item extends $.$mol_view {
        label() {
            return "";
        }
        value() {
            return "";
        }
        sub() {
            return [].concat(this.Label(), this.Value());
        }
        Label() {
            return ((obj) => {
                obj.sub = () => [].concat(this.label());
                return obj;
            })(new this.$.$mol_view);
        }
        Value() {
            return ((obj) => {
                obj.sub = () => [].concat(this.value());
                return obj;
            })(new this.$.$mol_view);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_list_footer_item.prototype, "Label", null);
    __decorate([
        $.$mol_mem
    ], $bw_mainmenu_list_footer_item.prototype, "Value", null);
    $.$bw_mainmenu_list_footer_item = $bw_mainmenu_list_footer_item;
})($ || ($ = {}));
//mainmenu.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_mainmenu extends $.$bw_mainmenu {
            static instance() {
                return $$.$bw_app.Root(0).NewLook().Menu();
            }
            flex_basis_narrow() {
                return 64;
            }
            flex_basis_wide() {
                return 290;
            }
            opacity() {
                return this.is_narrow() ? 0 : 1;
            }
            opacity_animation_trigger() {
                return this.is_narrow();
            }
            opacity_animation_triggered_value(trigger) {
                return trigger ? 0 : 1;
            }
            ListWrapper() {
                return super.ListWrapper();
            }
            flex_basis() {
                return super.flex_basis();
            }
            flex_basis_animation_trigger() {
                return this.is_narrow();
            }
            flex_basis_animation_triggered_value(trigger) {
                if (!trigger)
                    this.bw_mainmenu_width('wide');
                const result = trigger ? this.flex_basis_narrow() : this.flex_basis_wide();
                return result;
            }
            flex_basis_animation_easing() {
                return $$.BwEasing.easeInOutCubic;
            }
            flex_basis_animation_finish(p) {
                if (p.start) {
                    if (p.trigger)
                        this.bw_mainmenu_width('narrow');
                }
            }
            selected_item(val, force) {
                return super.selected_item(val, force);
            }
            is_narrow(val, force) {
                return super.is_narrow(val, force);
            }
            bw_mainmenu_width(val, force) {
                let result = super.bw_mainmenu_width(val, force);
                if (!result) {
                    result = this.is_narrow() ? 'narrow' : 'wide';
                    super.bw_mainmenu_width(result);
                }
                return result;
            }
            items_def() {
                const result = {
                    'main': {
                        title: 'Главная',
                        icon: 'home',
                    },
                    'search': {
                        title: 'Поиск',
                        icon: 'search',
                    },
                    'orders': {
                        title: 'Заказы',
                        icon: 'buy',
                    },
                    'clients': {
                        title: 'Клиенты',
                        icon: 'meeting',
                    },
                    'adv': {
                        title: 'Мои объявления',
                        icon: 'resume_website',
                    },
                    'docs': {
                        title: 'Документы',
                        icon: 'wipes',
                    },
                    'users': {
                        title: 'Пользователи',
                        icon: 'add_user_group',
                    },
                    'feedback': {
                        title: 'Обратная связь',
                        icon: 'info_popup',
                    },
                    'subscription': {
                        title: 'Подписка',
                        icon: 'wallet_copy_2',
                    },
                    'settings': {
                        title: 'Настройки',
                        icon: 'settings',
                    },
                    'cma': {
                        title: 'СМА',
                        icon: 'sell_property',
                    },
                    'history': {
                        title: 'История поиска',
                        icon: 'last_hour',
                    },
                    'favorites': {
                        title: 'Избранное',
                        icon: 'star',
                    },
                    'archive': {
                        title: 'Архивные данные',
                        icon: 'winrar',
                    },
                };
                return result;
            }
        }
        __decorate([
            $$.$bw_animate
        ], $bw_mainmenu.prototype, "opacity", null);
        __decorate([
            $.$mol_mem
        ], $bw_mainmenu.prototype, "ListWrapper", null);
        __decorate([
            $$.$bw_animate
        ], $bw_mainmenu.prototype, "flex_basis", null);
        __decorate([
            $$.$bw_session
        ], $bw_mainmenu.prototype, "selected_item", null);
        __decorate([
            $$.$bw_session
        ], $bw_mainmenu.prototype, "is_narrow", null);
        __decorate([
            $.$mol_mem
        ], $bw_mainmenu.prototype, "bw_mainmenu_width", null);
        $$.$bw_mainmenu = $bw_mainmenu;
        class $bw_mainmenu_login extends $.$bw_mainmenu_login {
            Menu() {
                const result = !(this.shown() || this.is_hiding()) ? null : super.Menu();
                return result;
            }
            opacity() {
                const result = $bw_mainmenu.instance().opacity();
                return result;
            }
            menu_width() {
                return $bw_mainmenu.instance().flex_basis();
            }
            menu_opacity() {
                return super.menu_opacity();
            }
            menu_opacity_animation_trigger() {
                return this.shown() === false && this.is_hiding() === true;
            }
            menu_opacity_animation_triggered_value(trigger) {
                return trigger ? 0 : 1;
            }
            menu_opacity_animation_finish() {
                this.is_hiding(false);
            }
            shown(val) {
                if (super.shown() && val === false) {
                    this.is_hiding(true);
                }
                else if (val === true) {
                    this.is_hiding(false);
                }
                return super.shown(val);
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_mainmenu_login.prototype, "Menu", null);
        __decorate([
            $$.$bw_animate
        ], $bw_mainmenu_login.prototype, "menu_opacity", null);
        $$.$bw_mainmenu_login = $bw_mainmenu_login;
        class $bw_mainmenu_login_menu extends $.$bw_mainmenu_login_menu {
            NewDesign() {
                let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
                const result = isChrome ? super.NewDesign() : null;
                return result;
            }
            theme_icon() {
                return $$.$bw_app.instance().is_light_theme() ? this.IconSwitchOn() : this.IconSwitchOff();
            }
            new_design_click(event, force) {
                if (event !== void 0) {
                    $$.$bw_app.instance().is_new_look(false);
                }
                return super.new_design_click(event, force);
            }
            theme_click(event, force) {
                if (event !== void 0) {
                    $$.$bw_app.instance().is_light_theme(!$$.$bw_app.instance().is_light_theme());
                }
                return super.theme_click(event, force);
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_mainmenu_login_menu.prototype, "NewDesign", null);
        __decorate([
            $.$mol_mem
        ], $bw_mainmenu_login_menu.prototype, "theme_icon", null);
        __decorate([
            $.$mol_mem
        ], $bw_mainmenu_login_menu.prototype, "new_design_click", null);
        __decorate([
            $.$mol_mem
        ], $bw_mainmenu_login_menu.prototype, "theme_click", null);
        $$.$bw_mainmenu_login_menu = $bw_mainmenu_login_menu;
        class $bw_mainmenu_login_ear extends $.$bw_mainmenu_login_ear {
            Icon() {
                const result = this.checked() ? this.SlideRight() : super.Icon();
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_mainmenu_login_ear.prototype, "Icon", null);
        $$.$bw_mainmenu_login_ear = $bw_mainmenu_login_ear;
        class $bw_mainmenu_list extends $.$bw_mainmenu_list {
            opacity() {
                const result = $bw_mainmenu.instance().opacity();
                return result;
            }
            sub() {
                const result = Object.keys(this.items_def())
                    .map((value) => this.MenuItem(value));
                if ($bw_mainmenu.instance().bw_mainmenu_width() == 'wide') {
                    result.push(this.Footer());
                }
                return result;
            }
            menu_item_id(name) {
                return name;
            }
            menu_item_title(name) {
                return this.items_def()[name].title;
            }
            is_selected_item(name, val, force) {
                return name == this.selected_item(val === true ? name : void 0);
            }
            MenuItemIcon(name) {
                return ((obj) => {
                    return obj;
                })(new this.$['$bw_icon_' + this.items_def()[name].icon]);
            }
            browser_version() {
                const bowser = this.$.$bw_bowser;
                const browser = bowser.getParser(window.navigator.userAgent);
                const browserInfo = browser.getBrowser();
                return browserInfo.name + ' ' + browserInfo.version;
            }
        }
        __decorate([
            $.$mol_mem_key
        ], $bw_mainmenu_list.prototype, "is_selected_item", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_mainmenu_list.prototype, "MenuItemIcon", null);
        __decorate([
            $.$mol_mem
        ], $bw_mainmenu_list.prototype, "browser_version", null);
        $$.$bw_mainmenu_list = $bw_mainmenu_list;
        class $bw_mainmenu_list_item extends $.$bw_mainmenu_list_item {
            opacity() {
                const result = $bw_mainmenu.instance().opacity();
                return result;
            }
            checked(val, force) {
                return this.id() === $bw_mainmenu.instance().selected_item(val === true ? this.id() : void 0);
            }
            enabled() {
                return !this.checked();
            }
        }
        $$.$bw_mainmenu_list_item = $bw_mainmenu_list_item;
        class $bw_mainmenu_login_menu_list_item extends $.$bw_mainmenu_login_menu_list_item {
            opacity() {
                const result = $bw_mainmenu.instance().opacity();
                return result;
            }
            checked(val, force) {
                if (val !== void 0) {
                    switch (this.id()) {
                        case 'theme':
                            $$.$bw_app.instance().is_light_theme(!$$.$bw_app.instance().is_light_theme());
                            break;
                        case 'settings':
                            $bw_mainmenu.instance().selected_item(this.id());
                            break;
                    }
                }
                return false;
            }
        }
        $$.$bw_mainmenu_login_menu_list_item = $bw_mainmenu_login_menu_list_item;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//mainmenu.view.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    class $bw_easter_panel extends $.$mol_view {
        attr() {
            return ({
                "shown": this.easter_panel_shown(),
            });
        }
        easter_panel_shown(val, force) {
            return (val !== void 0) ? val : false;
        }
        event_async() {
            return ({
                "mouseenter": (val) => this.enter(val),
                "mouseleave": (val) => this.leave(val),
            });
        }
        enter(val, force) {
            return (val !== void 0) ? val : null;
        }
        leave(val, force) {
            return (val !== void 0) ? val : null;
        }
        sub() {
            return [].concat(this.Nav());
        }
        Nav() {
            return ((obj) => {
                obj.hierarchy = () => this.hierarchy();
                obj.record = (id) => this.option(id);
                return obj;
            })(new this.$.$bw_easter_panel_nav);
        }
        hierarchy() {
            return null;
        }
        option(id) {
            return null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_easter_panel.prototype, "easter_panel_shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_easter_panel.prototype, "enter", null);
    __decorate([
        $.$mol_mem
    ], $bw_easter_panel.prototype, "leave", null);
    __decorate([
        $.$mol_mem
    ], $bw_easter_panel.prototype, "Nav", null);
    $.$bw_easter_panel = $bw_easter_panel;
})($ || ($ = {}));
(function ($) {
    class $bw_easter_panel_nav extends $.$mol_grid {
        row_height() {
            return 40;
        }
        hierarchy_col() {
            return "title";
        }
        Head() {
            return null;
        }
        col_ids() {
            return [].concat("title", "switch");
        }
        row_expanded_default() {
            return false;
        }
        InputComboCell(id) {
            return ((obj) => {
                obj.sub = () => [].concat(this.ComboBox(id));
                return obj;
            })(new this.$.$mol_view);
        }
        ComboBox(id) {
            return ((obj) => {
                obj.options = () => this.input_combo_options(id);
                obj.selected = (val) => this.selected(id, val);
                return obj;
            })(new this.$.$bw_input_combo);
        }
        input_combo_options(id) {
            return ({});
        }
        selected(id, val, force) {
            return (val !== void 0) ? val : "";
        }
        SwitchCell(id) {
            return ((obj) => {
                obj.sub = () => [].concat(this.Switch(id));
                return obj;
            })(new this.$.$mol_view);
        }
        Switch(id) {
            return ((obj) => {
                obj.value = (val) => this.switch_value(id, val);
                obj.options = () => ({
                    "off": this.option_off(id),
                    "on": this.option_on(id),
                });
                return obj;
            })(new this.$.$bw_easter_panel_nav_switch);
        }
        switch_value(id, val, force) {
            return (val !== void 0) ? val : "off";
        }
        option_off(id) {
            return "off";
        }
        option_on(id) {
            return "on";
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $bw_easter_panel_nav.prototype, "InputComboCell", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_easter_panel_nav.prototype, "ComboBox", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_easter_panel_nav.prototype, "selected", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_easter_panel_nav.prototype, "SwitchCell", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_easter_panel_nav.prototype, "Switch", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_easter_panel_nav.prototype, "switch_value", null);
    $.$bw_easter_panel_nav = $bw_easter_panel_nav;
})($ || ($ = {}));
(function ($) {
    class $bw_easter_panel_nav_switch extends $.$mol_switch {
        option_enabled(id) {
            return true;
        }
    }
    $.$bw_easter_panel_nav_switch = $bw_easter_panel_nav_switch;
})($ || ($ = {}));
//easter.view.tree.js.map
;
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $$;
    (function ($$) {
        class $bw_easter_panel extends $.$bw_easter_panel {
            constructor() {
                super();
                const hierarchy = this.hierarchy();
                this._switch_state_atoms = {};
                this._switch_states = {};
                Object.keys(hierarchy).map((id) => {
                    if (!hierarchy[id].sub.length) {
                        if (id == 'viewport-width') {
                            this._switch_state_atoms[id] = new $.$mol_atom(this.switch_state_atom_name(id), (next) => {
                                if (next !== void 0) {
                                    this._viewportWidth = next;
                                }
                                return this._viewportWidth;
                            });
                        }
                        else if (id != 'theme') {
                            this._switch_state_atoms[id] = new $.$mol_atom(this.switch_state_atom_name(id), (next) => {
                                if (next !== void 0) {
                                    this._switch_states[id] = next;
                                }
                                return this._switch_states[id];
                            });
                        }
                    }
                });
            }
            easter_panel_shown(val) {
                return super.easter_panel_shown(val);
            }
            enter(next) {
                this.easter_panel_shown(true);
            }
            leave(next) {
                this.easter_panel_shown(false);
            }
            option(id) {
                const title = id;
                return { title };
            }
            switch_atom_value(id, next) {
                if (id == 'viewport-width') {
                    if (next != void 0) {
                        this.$.$mol_state_local.value('viewport-width', next);
                        this._switch_state_atoms[id].set(next);
                    }
                    let result = this._switch_state_atoms[id].get();
                    if (result === undefined) {
                        result = this.$.$mol_state_local.value('viewport-width');
                    }
                    if (!result)
                        result = 'auto';
                    return result;
                }
                else if (id == 'theme') {
                    return $$.$bw_app.instance().is_light_theme(next === void 0 ? next : next === 'on') ? 'on' : 'off';
                }
                else {
                    if (next != void 0) {
                        this._switch_state_atoms[id].set(next === 'on');
                    }
                    let result = this._switch_state_atoms[id].get();
                    return result ? 'on' : 'off';
                }
            }
            switch_state_atom_name(id) {
                return 'bw_easter_data.hierarchy()["' + id + '"]';
            }
            on_title(id) {
                let onoff = this.onoff_defs[id];
                return onoff && onoff.on ? onoff.on : 'on';
            }
            off_title(id) {
                let onoff = this.onoff_defs[id];
                return onoff && onoff.off ? onoff.off : 'off';
            }
            hierarchy() {
                this.onoff_defs = {};
                const hierarchy = {};
                const root = hierarchy[''] = {
                    id: '',
                    parent: null,
                    sub: [],
                };
                let add_node_to_branch = (branch, id, onoff) => {
                    branch.sub.push(hierarchy[id] = {
                        id,
                        parent: branch,
                        sub: [],
                    });
                    if (onoff !== void 0) {
                        this.onoff_defs[id] = onoff;
                    }
                    return hierarchy[id];
                };
                add_node_to_branch(root, 'viewport-width', { off: 'auto', on: 'on' });
                add_node_to_branch(root, 'theme', { off: 'dark', on: 'light' });
                let branch = add_node_to_branch(root, 'Рекомендации для light-темы');
                add_node_to_branch(branch, 'non-white-background');
                add_node_to_branch(branch, 'more-soft-swith-option-border-bottom');
                branch = add_node_to_branch(root, 'Прочие рекомендации');
                add_node_to_branch(branch, 'check-box-icon-transform-scale', { off: '1.2', on: '1.15' });
                return hierarchy;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_easter_panel.prototype, "easter_panel_shown", null);
        $$.$bw_easter_panel = $bw_easter_panel;
        class $bw_easter_panel_nav extends $.$bw_easter_panel_nav {
            Cell(id) {
                if (id.col === 'title') {
                    return super.Cell(id);
                }
                else if (id.row[id.row.length - 1] == 'viewport-width') {
                    return this.InputComboCell(id);
                }
                else {
                    return this.SwitchCell(id);
                }
            }
            get_node(id) {
                return this['object_host()'].hierarchy()[id.row[id.row.length - 1]];
            }
            selected(id, val, force) {
                const name = id.row[id.row.length - 1];
                if (val !== void 0) {
                    this['object_host()'].switch_atom_value(name, val);
                }
                const result = this['object_host()'].switch_atom_value(name);
                return result;
            }
            switch_value(id, val, force) {
                let node = this.get_node(id);
                if (val !== void 0) {
                    if (!node.sub.length) {
                        this['object_host()'].switch_atom_value(node.id, val);
                    }
                    else {
                        for (let i = 0; i < node.sub.length; i++) {
                            let sub_node_state = this.switch_value({
                                row: id.row.slice(0).concat(node.sub[i].id)
                            }, val);
                        }
                    }
                    return val;
                }
                else {
                    let result;
                    if (!node.sub.length) {
                        result = this['object_host()'].switch_atom_value(node.id);
                    }
                    else {
                        for (let i = 0; i < node.sub.length; i++) {
                            let sub_node_state = this.switch_value({
                                row: id.row.slice(0).concat(node.sub[i].id)
                            });
                            if (sub_node_state === null) {
                                result = null;
                                break;
                            }
                            else if (result === undefined) {
                                result = sub_node_state;
                            }
                            else if (sub_node_state !== result) {
                                result = null;
                                break;
                            }
                        }
                    }
                    return result;
                }
            }
            option_on(id) {
                let node = this.get_node(id);
                return this['object_host()'].on_title(node.id);
            }
            option_off(id) {
                let node = this.get_node(id);
                return this['object_host()'].off_title(node.id);
            }
            input_combo_options(id) {
                const name = id.row[id.row.length - 1];
                const result = this.options(name);
                return result;
            }
            options(name) {
                let result = {};
                switch (name) {
                    case "viewport-width":
                        const def = window.thresholdsDef;
                        ['auto'].concat(Object.keys(def).map(key => def[key]).reverse()).forEach(name => {
                            result[name] = { title: name };
                        });
                        break;
                    default:
                        break;
                }
                return result;
            }
        }
        __decorate([
            $.$mol_mem_key
        ], $bw_easter_panel_nav.prototype, "selected", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_easter_panel_nav.prototype, "switch_value", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_easter_panel_nav.prototype, "input_combo_options", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_easter_panel_nav.prototype, "options", null);
        $$.$bw_easter_panel_nav = $bw_easter_panel_nav;
        class $bw_easter_panel_nav_switch extends $.$bw_easter_panel_nav_switch {
            option_enabled(id) {
                return !this.option_checked(id);
            }
        }
        $$.$bw_easter_panel_nav_switch = $bw_easter_panel_nav_switch;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//easter.view.js.map
//# sourceMappingURL=web.js.map