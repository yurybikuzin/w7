
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
        if ($.$mol_compare_any(target, source))
            return source;
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
        console.debug(path, ...values);
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
            if (!force && this.status === $mol_atom_status.actual)
                return;
            const slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(master => {
                    if (this.status !== $mol_atom_status.checking)
                        return;
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
                return this.handler(this._next, force);
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
            if (force === $mol_atom_force_cache)
                return this.push(next);
            if (next !== undefined) {
                if (force === $mol_atom_force)
                    return this.push(next);
                let next_normal = $.$mol_conform(next, this._ignore);
                if (next_normal === this._ignore)
                    return this.get(force);
                if (!(this['value()'] instanceof Error)) {
                    next_normal = $.$mol_conform(next, this['value()']);
                    if (next_normal === this['value()'])
                        return this.get(force);
                }
                this._next = next_normal;
                this._ignore = next_normal;
                force = $mol_atom_force_update;
            }
            return this.get(force);
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
            return atom.value(next, force);
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
        let nextNode = el.firstChild;
        for (let view_ of node_list) {
            const view = view_.valueOf();
            if (view instanceof $.$mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (node_set.has(nextNode)) {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                        else {
                            const nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
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
                }
            }
        }
        while (nextNode) {
            const currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
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
        for (let name in events) {
            el.addEventListener(name, $.$mol_log_group(el.id + ' ' + name, events[name]), { passive: true });
        }
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
                return [].concat(this.Head(), rows.slice(view_window.top, view_window.bottom).valueOf());
            }
            rows_visible_max() {
                return Math.ceil(this.$.$mol_view_visible_height() / this.row_height());
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
                return this.records()[id];
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
                return this.$.$mol_ambient({
                    $mol_scroll_top: () => this.$.$mol_scroll_top() - this.offset(),
                });
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
    class $bw extends $.$mol_view {
        title() {
            return this.bw_title();
        }
        bw_title() {
            return "";
        }
        sub() {
            return this.bw_content();
        }
        bw_content() {
            return [];
        }
        WaySelector() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_way_selector);
        }
        NewLook() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_new_look);
        }
        OldLook() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_old_look);
        }
        Login() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_login);
        }
        EasterPanel() {
            return ((obj) => {
                obj.attr = () => ({
                    "shown": this.easter_panel_shown(),
                });
                obj.event_async = () => ({
                    "mouseenter": (val) => this.enter(val),
                    "mouseleave": (val) => this.leave(val),
                });
                obj.sub = () => [].concat(this.Nav());
                return obj;
            })(new this.$.$mol_view);
        }
        easter_panel_shown() {
            return false;
        }
        enter(val, force) {
            return (val !== void 0) ? val : null;
        }
        leave(val, force) {
            return (val !== void 0) ? val : null;
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
    ], $bw.prototype, "WaySelector", null);
    __decorate([
        $.$mol_mem
    ], $bw.prototype, "NewLook", null);
    __decorate([
        $.$mol_mem
    ], $bw.prototype, "OldLook", null);
    __decorate([
        $.$mol_mem
    ], $bw.prototype, "Login", null);
    __decorate([
        $.$mol_mem
    ], $bw.prototype, "EasterPanel", null);
    __decorate([
        $.$mol_mem
    ], $bw.prototype, "enter", null);
    __decorate([
        $.$mol_mem
    ], $bw.prototype, "leave", null);
    __decorate([
        $.$mol_mem
    ], $bw.prototype, "Nav", null);
    $.$bw = $bw;
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
        ComboBoxCell(id) {
            return ((obj) => {
                obj.sub = () => [].concat(this.ComboBox(id));
                return obj;
            })(new this.$.$mol_view);
        }
        ComboBox(id) {
            return ((obj) => {
                obj.options = () => this.combo_box_options(id);
                obj.selected = (val) => this.selected(id, val);
                return obj;
            })(new this.$.$bw_combo_box);
        }
        combo_box_options(id) {
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
    ], $bw_easter_panel_nav.prototype, "ComboBoxCell", null);
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
(function ($) {
    class $bw_way_selector extends $.$mol_view {
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
                obj.event_click = (val) => this.link_click(val);
                return obj;
            })(new this.$.$bw_link);
        }
        link_title(way) {
            return "";
        }
        link_arg(way) {
            return ({});
        }
        link_click(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_way_selector.prototype, "Bar", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_way_selector.prototype, "Link", null);
    __decorate([
        $.$mol_mem
    ], $bw_way_selector.prototype, "link_click", null);
    $.$bw_way_selector = $bw_way_selector;
})($ || ($ = {}));
(function ($) {
    class $bw_old_look extends $.$mol_view {
        sub() {
            return [].concat(this.LookSelector(), this.Bar());
        }
        LookSelector() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_look_selector);
        }
        Bar() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Label());
                return obj;
            })(new this.$.$mol_bar);
        }
        Label() {
            return ((obj) => {
                obj.disabled = () => true;
                obj.value = (val) => this.label_title(val);
                return obj;
            })(new this.$.$mol_string);
        }
        label_title(val, force) {
            return (val !== void 0) ? val : "Старый интерфейс";
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_old_look.prototype, "LookSelector", null);
    __decorate([
        $.$mol_mem
    ], $bw_old_look.prototype, "Bar", null);
    __decorate([
        $.$mol_mem
    ], $bw_old_look.prototype, "Label", null);
    __decorate([
        $.$mol_mem
    ], $bw_old_look.prototype, "label_title", null);
    $.$bw_old_look = $bw_old_look;
})($ || ($ = {}));
(function ($) {
    class $bw_new_look extends $.$mol_view {
        sub() {
            return [].concat(this.Menu(), this.Workspace());
        }
        Menu() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_main_menu);
        }
        Workspace() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_workspace);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_new_look.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $bw_new_look.prototype, "Workspace", null);
    $.$bw_new_look = $bw_new_look;
})($ || ($ = {}));
(function ($) {
    class $bw_main_menu extends $.$mol_view {
        sub() {
            return [].concat(this.Login(), this.List());
        }
        Login() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_main_menu_login);
        }
        List() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_main_menu_list);
        }
        attr() {
            return (Object.assign({}, super.attr(), { "_width": this.width_attr() }));
        }
        width_attr() {
            return "wide";
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_main_menu.prototype, "Login", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu.prototype, "List", null);
    $.$bw_main_menu = $bw_main_menu;
})($ || ($ = {}));
(function ($) {
    class $bw_main_menu_login extends $.$mol_check {
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
            return [].concat(this.Icon(), this.label(), this.Ear(), this.Menu());
        }
        Ear() {
            return ((obj) => {
                obj.height = () => this.cur_height();
                obj.left = () => this.cur_right();
                obj.top = () => this.cur_top();
                return obj;
            })(new this.$.$bw_main_menu_login_ear);
        }
        Menu() {
            return ((obj) => {
                obj.width = () => this.cur_width();
                obj.top = () => this.cur_bottom();
                obj.left = () => this.cur_left();
                return obj;
            })(new this.$.$bw_main_menu_login_menu);
        }
        checked(val, force) {
            return this.shown(val);
        }
        shown(val, force) {
            return (val !== void 0) ? val : false;
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
        cur_height() {
            return this.Meter().height();
        }
        cur_right() {
            return this.Meter().right();
        }
        cur_top() {
            return this.Meter().top();
        }
        Meter() {
            return ((obj) => {
                return obj;
            })(new this.$.$mol_meter);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login.prototype, "Ear", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login.prototype, "shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login.prototype, "Meter", null);
    $.$bw_main_menu_login = $bw_main_menu_login;
})($ || ($ = {}));
(function ($) {
    class $bw_main_menu_login_ear extends $.$mol_check {
        height() {
            return 0;
        }
        top() {
            return 0;
        }
        left() {
            return 0;
        }
        style() {
            return ({
                "height": this.height_style(),
                "top": this.top_style(),
                "left": this.left_style(),
            });
        }
        height_style() {
            return "";
        }
        top_style() {
            return "";
        }
        left_style() {
            return "";
        }
    }
    $.$bw_main_menu_login_ear = $bw_main_menu_login_ear;
})($ || ($ = {}));
(function ($) {
    class $bw_main_menu_list_item extends $.$mol_check {
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
            return 52;
        }
        sub() {
            return [].concat(this.Content());
        }
        Content() {
            return ((obj) => {
                obj.sub = () => [].concat(this.Icon(), this.Title());
                return obj;
            })(new this.$.$mol_view);
        }
        Title() {
            return ((obj) => {
                obj.sub = () => [].concat(this.title());
                return obj;
            })(new this.$.$mol_view);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_list_item.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_list_item.prototype, "Title", null);
    $.$bw_main_menu_list_item = $bw_main_menu_list_item;
})($ || ($ = {}));
(function ($) {
    class $bw_main_menu_login_menu_list_item extends $.$bw_main_menu_list_item {
    }
    $.$bw_main_menu_login_menu_list_item = $bw_main_menu_login_menu_list_item;
})($ || ($ = {}));
(function ($) {
    class $bw_main_menu_login_menu extends $.$mol_view {
        width() {
            return 0;
        }
        top() {
            return 0;
        }
        left() {
            return 0;
        }
        style() {
            return ({
                "width": this.width_style(),
                "top": this.top_style(),
                "left": this.left_style(),
            });
        }
        width_style() {
            return "";
        }
        top_style() {
            return "";
        }
        left_style() {
            return "";
        }
        sub() {
            return [].concat(this.NewDesign(), this.Theme(), this.Settings(), this.Exit());
        }
        NewDesign() {
            return ((obj) => {
                obj.id = () => "new-design";
                obj.title = () => "Новый дизайн";
                obj.Icon = () => this.IconNewDesign();
                return obj;
            })(new this.$.$bw_main_menu_login_menu_list_item);
        }
        IconNewDesign() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_switch_on);
        }
        Theme() {
            return ((obj) => {
                obj.id = () => "theme";
                obj.title = () => "Светлая тема";
                obj.Icon = () => this.theme_icon();
                return obj;
            })(new this.$.$bw_main_menu_login_menu_list_item);
        }
        theme_icon() {
            return null;
        }
        Settings() {
            return ((obj) => {
                obj.id = () => "settings";
                obj.title = () => "Настройки";
                obj.Icon = () => this.IconSettings();
                return obj;
            })(new this.$.$bw_main_menu_login_menu_list_item);
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
            })(new this.$.$bw_main_menu_login_menu_list_item);
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
    ], $bw_main_menu_login_menu.prototype, "NewDesign", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login_menu.prototype, "IconNewDesign", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login_menu.prototype, "Theme", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login_menu.prototype, "Settings", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login_menu.prototype, "IconSettings", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login_menu.prototype, "Exit", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login_menu.prototype, "IconExit", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login_menu.prototype, "IconSwitchOn", null);
    __decorate([
        $.$mol_mem
    ], $bw_main_menu_login_menu.prototype, "IconSwitchOff", null);
    $.$bw_main_menu_login_menu = $bw_main_menu_login_menu;
})($ || ($ = {}));
(function ($) {
    class $bw_main_menu_list extends $.$mol_view {
    }
    $.$bw_main_menu_list = $bw_main_menu_list;
})($ || ($ = {}));
(function ($) {
    class $bw_workspace extends $.$mol_view {
        sub() {
            return [].concat(this.Content());
        }
        Content() {
            return null;
        }
        SettingsWorkspace() {
            return ((obj) => {
                return obj;
            })(new this.$.$bw_settings_workspace);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_workspace.prototype, "SettingsWorkspace", null);
    $.$bw_workspace = $bw_workspace;
})($ || ($ = {}));
(function ($) {
    class $bw_workspace_block extends $.$mol_view {
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
                "bw_workspace_block_selected": this.is_selected(),
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
    ], $bw_workspace_block.prototype, "event_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_workspace_block.prototype, "LeftSpace", null);
    __decorate([
        $.$mol_mem
    ], $bw_workspace_block.prototype, "Inner", null);
    __decorate([
        $.$mol_mem
    ], $bw_workspace_block.prototype, "Header", null);
    __decorate([
        $.$mol_mem
    ], $bw_workspace_block.prototype, "Caption", null);
    __decorate([
        $.$mol_mem
    ], $bw_workspace_block.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_workspace_block.prototype, "ButtonBar", null);
    __decorate([
        $.$mol_mem
    ], $bw_workspace_block.prototype, "RightSpace", null);
    $.$bw_workspace_block = $bw_workspace_block;
})($ || ($ = {}));
(function ($) {
    class $bw_look_selector extends $.$mol_link {
        event_click(val, force) {
            return this.link_click(val);
        }
        link_click(val, force) {
            return (val !== void 0) ? val : null;
        }
        current() {
            return false;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_look_selector.prototype, "event_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_look_selector.prototype, "link_click", null);
    $.$bw_look_selector = $bw_look_selector;
})($ || ($ = {}));
//bw.view.tree.js.map
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
        let bw_easter_data;
        class $bw_easter_data extends $.$mol_object {
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
                    if (next != void 0) {
                        $$.bw_data.selected('theme', next === 'on' ? 'light' : 'dark');
                    }
                    return $$.bw_data.selected('theme') == 'light' ? 'on' : 'off';
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
        ], $bw_easter_data.prototype, "hierarchy", null);
        $$.$bw_easter_data = $bw_easter_data;
        class $bw_data extends $.$mol_object {
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
            main_nav_item_def() {
                return {
                    'main': {
                        title: 'Главная',
                    },
                    'search': {
                        title: 'Поиск',
                    },
                    'orders': {
                        title: 'Заказы',
                    },
                };
            }
            main_nav_item_enum() {
                return Object.keys(this.main_nav_item_def());
            }
            way_enum() {
                return Object.keys(this.way_def());
            }
            selected_main_nav() {
                return this.$.$mol_state_arg.value('main_nav') || 'main';
            }
            selected_page() {
                let result = this.$.$mol_state_arg.value('page') || 'selector';
                return result;
            }
            selected(name, next) {
                const def = this.selected_def(name);
                if (def) {
                    const values = def.enum;
                    if (next !== void 0) {
                        if (0 > values.indexOf(next)) {
                            console.error('unknown value ' + next + ' for name ' + name);
                            console.trace();
                        }
                        else {
                            def.atom.set(next);
                        }
                    }
                    let result = def.atom.get();
                    if (0 > values.indexOf(result))
                        result = values[0];
                    return result;
                }
            }
            toggle(name) {
                const next = this.next(name);
                if (next != '')
                    this.selected(name, next);
            }
            next(name) {
                const def = this.selected_def(name);
                if (def) {
                    const values = def.enum;
                    if (values.length != 2) {
                        console.error('can not toggle value of name ' + name + ' for it has ' + values.length + ' avail values');
                    }
                    else {
                        return values[(values.indexOf(this.selected(name)) + 1) % 2];
                    }
                }
            }
            selected_def(name) {
                const def = this.selected_defs()[name];
                if (!def) {
                    console.error('unknown name ' + name);
                    console.trace();
                }
                else {
                    def.enum = Object.keys(def.values);
                    def.atom = new $.$mol_atom('bw_data_' + name, (next) => {
                        if (next !== void 0) {
                            if (def.storage === 1) {
                                this.$.$mol_state_local.value(name, next);
                            }
                            else {
                                this.$.$mol_state_session.value(name, next);
                            }
                        }
                        let result = def.storage === 1 ?
                            this.$.$mol_state_local.value(name) :
                            this.$.$mol_state_session.value(name);
                        return result;
                    });
                }
                return def;
            }
            selected_defs() {
                let result = {
                    look: {
                        storage: 1,
                        values: ['old', 'new'].reduce((result, value) => {
                            result[value] = { title: value };
                            return result;
                        }, {}),
                    },
                    theme: {
                        storage: 1,
                        values: ['dark', 'light'].reduce((result, value) => {
                            result[value] = { title: value };
                            return result;
                        }, {}),
                    },
                    main_menu_width: {
                        storage: 1,
                        values: ['wide', 'narrow'].reduce((result, value) => {
                            result[value] = { title: value };
                            return result;
                        }, {}),
                    },
                    main_menu_item: {
                        storage: 0,
                        values: {
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
                        }
                    },
                    nova: {
                        storage: 0,
                        values: {
                            'include': { title: 'Включая новостройки' },
                            'only': { title: 'Только новостройки' },
                            'except': { title: 'Кроме новостроек' },
                        },
                    },
                    apartments: {
                        storage: 0,
                        values: {
                            'include': { title: 'Включая апартаменты' },
                            'only': { title: 'Только апартаменты' },
                            'except': { title: 'Кроме апартаментов' },
                        },
                    },
                    sold: {
                        storage: 0,
                        values: {
                            'except': { title: 'Кроме снятых с продажи/аренды' },
                            'include': { title: 'Включая снятые с продажи/аренды' },
                            'only': { title: 'Только снятые с продажи/аренды' },
                        },
                    },
                };
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_data.prototype, "way_def", null);
        __decorate([
            $.$mol_mem
        ], $bw_data.prototype, "main_nav_item_def", null);
        __decorate([
            $.$mol_mem
        ], $bw_data.prototype, "main_nav_item_enum", null);
        __decorate([
            $.$mol_mem
        ], $bw_data.prototype, "way_enum", null);
        __decorate([
            $.$mol_mem
        ], $bw_data.prototype, "selected_main_nav", null);
        __decorate([
            $.$mol_mem
        ], $bw_data.prototype, "selected_page", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_data.prototype, "selected", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_data.prototype, "selected_def", null);
        __decorate([
            $.$mol_mem
        ], $bw_data.prototype, "selected_defs", null);
        class $bw extends $.$bw {
            constructor() {
                super();
                this._easter_panel_shown = false;
                this._easter_panel_shown_atom = new $.$mol_atom('$bw_easter_panel_shown', (next) => {
                    if (next !== void 0) {
                        this._easter_panel_shown = next;
                    }
                    return this._easter_panel_shown;
                });
                bw_easter_data = new $bw_easter_data();
                $$.bw_data = new $bw_data();
            }
            bw_title() {
                return this.bw_content()[0].title();
            }
            bw_content() {
                let result;
                if ($$.bw_data.selected_page() == 'selector') {
                    result = this.WaySelector();
                }
                else if ($$.bw_data.selected_page() == 'login') {
                    result = this.Login();
                }
                else if ($$.bw_data.selected('look') == 'new') {
                    result = this.NewLook();
                }
                else {
                    result = this.OldLook();
                }
                return [result, this.EasterPanel()];
            }
            attr() {
                let result = {
                    _look: $$.bw_data.selected('look'),
                };
                let hierarchy = bw_easter_data.hierarchy();
                Object.keys(hierarchy).forEach((id) => {
                    if (!hierarchy[id].sub.length) {
                        if (id == 'viewport-width') {
                            const switch_atom_value = bw_easter_data.switch_atom_value(id);
                            if (bw_easter_data.switch_atom_value(id) == 'auto') {
                                new $.$mol_defer(() => window.dispatchEvent(new Event('obtainActualMediaQueryTrue')));
                            }
                            else {
                                new $.$mol_defer(() => window.dispatchEvent(new Event('obtainActualMediaQueryFalse')));
                                result['_' + id] = bw_easter_data.switch_atom_value(id);
                            }
                        }
                        else {
                            if (id == 'theme') {
                                result['mol_theme'] = '$mol_theme_' + $$.bw_data.selected('theme');
                            }
                            result['_' + id] = bw_easter_data.switch_atom_value(id) === 'on' ?
                                bw_easter_data.on_title(id) :
                                bw_easter_data.off_title(id);
                        }
                    }
                });
                return result;
            }
            easter_panel_shown() {
                return this._easter_panel_shown_atom.get();
            }
            enter(next) {
                this._easter_panel_shown_atom.set(true);
            }
            leave(next) {
                this._easter_panel_shown_atom.set(false);
            }
            hierarchy() {
                return bw_easter_data.hierarchy();
            }
            option(id) {
                const title = id;
                return { title };
            }
        }
        $$.$bw = $bw;
        class $bw_easter_panel_nav extends $.$bw_easter_panel_nav {
            Cell(id) {
                if (id.col === 'title') {
                    return super.Cell(id);
                }
                else if (id.row[id.row.length - 1] == 'viewport-width') {
                    return this.ComboBoxCell(id);
                }
                else {
                    return this.SwitchCell(id);
                }
            }
            get_node(id) {
                return bw_easter_data.hierarchy()[id.row[id.row.length - 1]];
            }
            selected(id, val, force) {
                const name = id.row[id.row.length - 1];
                if (val !== void 0) {
                    bw_easter_data.switch_atom_value(name, val);
                }
                const result = bw_easter_data.switch_atom_value(name);
                return result;
            }
            switch_value(id, val, force) {
                let node = this.get_node(id);
                if (val !== void 0) {
                    if (!node.sub.length) {
                        bw_easter_data.switch_atom_value(node.id, val);
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
                        result = bw_easter_data.switch_atom_value(node.id);
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
                return bw_easter_data.on_title(node.id);
            }
            option_off(id) {
                let node = this.get_node(id);
                return bw_easter_data.off_title(node.id);
            }
            combo_box_options(id) {
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
        ], $bw_easter_panel_nav.prototype, "combo_box_options", null);
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
        class $bw_way_selector extends $.$bw_way_selector {
            ways() {
                return $$.bw_data.way_enum().map((id) => this.Link(id));
            }
            link_title(way) {
                return $$.bw_data.way_def()[way].title;
            }
            link_arg(way) {
                return $$.bw_data.way_def()[way].arg;
            }
            link_click(val, force) {
                if (val) {
                    if (val.srcElement.id === '$bw.Root(0).WaySelector().Link("brand-new")') {
                        this.$.$mol_state_local.value('look', 'new');
                    }
                }
                return (val !== void 0) ? val : null;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_way_selector.prototype, "ways", null);
        $$.$bw_way_selector = $bw_way_selector;
        class $bw_new_look extends $.$bw_new_look {
        }
        $$.$bw_new_look = $bw_new_look;
        class $bw_look_selector extends $.$bw_look_selector {
            title() {
                return $$.bw_data.next('look') + ' look';
            }
            link_click(val, force) {
                $$.bw_data.toggle('look');
                return (val !== void 0) ? val : null;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_look_selector.prototype, "title", null);
        $$.$bw_look_selector = $bw_look_selector;
        class $bw_main_menu extends $.$bw_main_menu {
            width_attr() {
                return $$.bw_data.selected('main_menu_width');
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_main_menu.prototype, "width_attr", null);
        $$.$bw_main_menu = $bw_main_menu;
        class $bw_main_menu_login extends $.$bw_main_menu_login {
            Ear() {
                const result = !this.shown() ? null : super.Ear();
                if (result) {
                    $$.shown_prop(this);
                }
                return result;
            }
            Menu() {
                const result = !this.shown() ? null : super.Menu();
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_main_menu_login.prototype, "Ear", null);
        __decorate([
            $.$mol_mem
        ], $bw_main_menu_login.prototype, "Menu", null);
        $$.$bw_main_menu_login = $bw_main_menu_login;
        class $bw_main_menu_login_menu extends $.$bw_main_menu_login_menu {
            width_style() {
                return this.width() + "px";
            }
            top_style() {
                return this.top() + "px";
            }
            left_style() {
                return this.left() + "px";
            }
            theme_icon() {
                return $$.bw_data.selected('theme') == 'light' ? this.IconSwitchOn() : this.IconSwitchOff();
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_main_menu_login_menu.prototype, "width_style", null);
        __decorate([
            $.$mol_mem
        ], $bw_main_menu_login_menu.prototype, "top_style", null);
        __decorate([
            $.$mol_mem
        ], $bw_main_menu_login_menu.prototype, "left_style", null);
        __decorate([
            $.$mol_mem
        ], $bw_main_menu_login_menu.prototype, "theme_icon", null);
        $$.$bw_main_menu_login_menu = $bw_main_menu_login_menu;
        class $bw_main_menu_login_ear extends $.$bw_main_menu_login_ear {
            height_style() {
                return this.height() + "px";
            }
            top_style() {
                return this.top() + "px";
            }
            left_style() {
                return this.left() + "px";
            }
            checked(val, force) {
                if (val !== void 0) {
                    $$.bw_data.toggle('main_menu_width');
                }
                return $$.bw_data.selected('main_menu_width');
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_main_menu_login_ear.prototype, "height_style", null);
        __decorate([
            $.$mol_mem
        ], $bw_main_menu_login_ear.prototype, "top_style", null);
        __decorate([
            $.$mol_mem
        ], $bw_main_menu_login_ear.prototype, "left_style", null);
        $$.$bw_main_menu_login_ear = $bw_main_menu_login_ear;
        class $bw_main_menu_list extends $.$bw_main_menu_list {
            sub() {
                return $$.bw_data
                    .selected_def('main_menu_item')
                    .enum
                    .map((value) => this.MenuItem(value));
            }
            MenuItem(name) {
                const def = $$.bw_data.selected_def('main_menu_item');
                const { title, icon } = def.values[name];
                return ((obj) => {
                    obj.id = () => name;
                    obj.title = () => title;
                    obj.Icon = () => this.MenuItemIcon(icon);
                    return obj;
                })(new this.$.$bw_main_menu_list_item);
            }
            MenuItemIcon(name) {
                return ((obj) => {
                    return obj;
                })(new this.$['$bw_icon_' + name]);
            }
        }
        __decorate([
            $.$mol_mem_key
        ], $bw_main_menu_list.prototype, "MenuItem", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_main_menu_list.prototype, "MenuItemIcon", null);
        $$.$bw_main_menu_list = $bw_main_menu_list;
        class $bw_main_menu_list_item extends $.$bw_main_menu_list_item {
            checked(val, force) {
                if (val === true) {
                    $$.bw_data.selected('main_menu_item', this.id());
                }
                return this.id() === $$.bw_data.selected('main_menu_item');
            }
            enabled() {
                return !this.checked();
            }
        }
        $$.$bw_main_menu_list_item = $bw_main_menu_list_item;
        class $bw_main_menu_login_menu_list_item extends $.$bw_main_menu_login_menu_list_item {
            checked(val, force) {
                if (val !== void 0) {
                    switch (this.id()) {
                        case 'theme':
                            $$.bw_data.toggle('theme');
                            break;
                        case 'settings':
                            $$.bw_data.selected('main_menu_item', this.id());
                            break;
                    }
                }
                return false;
            }
        }
        $$.$bw_main_menu_login_menu_list_item = $bw_main_menu_login_menu_list_item;
        class $bw_workspace extends $.$bw_workspace {
            Content() {
                switch ($$.bw_data.selected('main_menu_item')) {
                    case 'settings': return this.SettingsWorkspace();
                }
                return null;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_workspace.prototype, "Content", null);
        $$.$bw_workspace = $bw_workspace;
        class $bw_workspace_block extends $.$bw_workspace_block {
            focused(next) {
                const result = super.focused(next);
                if (result) {
                    new $.$mol_defer(() => this['object_host()'].selected_block(this.block_name()));
                }
                return result;
            }
            is_selected() {
                const result = this['object_host()'].selected_block() === this.block_name();
                return result;
            }
            event_click(event, force) {
                this['object_host()'].selected_block(this.block_name());
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_workspace_block.prototype, "focused", null);
        __decorate([
            $.$mol_mem
        ], $bw_workspace_block.prototype, "is_selected", null);
        $$.$bw_workspace_block = $bw_workspace_block;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bw.view.js.map
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
    class $bw_link extends $.$mol_link {
    }
    $.$bw_link = $bw_link;
})($ || ($ = {}));
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
(function ($) {
    class $bw_input extends $.$mol_string {
        autofocus() {
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
            return (Object.assign({}, super.attr(), { "autofocus": this.autofocus(), "readonly": this.readonly(), "autocomplete": this.autocomplete(), "bw_dropped_down": this.bw_dropped_down() }));
        }
    }
    $.$bw_input = $bw_input;
})($ || ($ = {}));
(function ($) {
    class $bw_input2 extends $.$mol_view {
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
        bw_dropped_down() {
            return false;
        }
        enabled() {
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
                obj.enabled = () => this.enabled();
                obj.debounce = () => this.debounce();
                obj.minimal_height = () => this.minimal_height();
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
            return ((obj) => {
                return obj;
            })(new this.$.$bw_icon_close_btn);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_input2.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $bw_input2.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_input2.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $bw_input2.prototype, "Check", null);
    __decorate([
        $.$mol_mem
    ], $bw_input2.prototype, "Icon", null);
    $.$bw_input2 = $bw_input2;
})($ || ($ = {}));
(function ($) {
    class $bw_combo_box extends $.$bw_input2 {
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
    ], $bw_combo_box.prototype, "selected", null);
    __decorate([
        $.$mol_mem
    ], $bw_combo_box.prototype, "value", null);
    __decorate([
        $.$mol_mem
    ], $bw_combo_box.prototype, "selected_title", null);
    __decorate([
        $.$mol_mem
    ], $bw_combo_box.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_combo_box.prototype, "dropped_down", null);
    __decorate([
        $.$mol_mem
    ], $bw_combo_box.prototype, "shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_combo_box.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $bw_combo_box.prototype, "List", null);
    __decorate([
        $.$mol_mem
    ], $bw_combo_box.prototype, "Meter", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_combo_box.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_combo_box.prototype, "row_checked", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_combo_box.prototype, "row_click", null);
    $.$bw_combo_box = $bw_combo_box;
})($ || ($ = {}));
(function ($) {
    class $bw_search_deep extends $.$mol_view {
        autofocus() {
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
                obj.shown = (val) => this.dropped_down(val);
                return obj;
            })(new this.$.$bw_calendar);
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
    ], $bw_search_deep.prototype, "deep_value", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "input_text", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "Output", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "Space", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "Button", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "dropped_down", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "Icon", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "Calendar", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "day_shift", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_deep.prototype, "Meter", null);
    $.$bw_search_deep = $bw_search_deep;
})($ || ($ = {}));
(function ($) {
    class $bw_calendar extends $.$mol_calendar {
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
        month_shift() {
            return 0;
        }
        attr() {
            return ({
                "bw_calendar_mode": this.mode_attr_value(),
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
            })(new this.$.$bw_calendar_row_cell);
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
            })(new this.$.$bw_calendar_row_cell);
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
            })(new this.$.$bw_calendar_day);
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
            })(new this.$.$bw_calendar_month);
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
    ], $bw_calendar.prototype, "day_shift", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "deep_moment", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "current_moment_string", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "Meter", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "TitleRow", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "TitleCell", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "TitleContent", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "PrevMonth", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "prev_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "IconTriangleLeft", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "TitleText", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "mode", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "NextMonth", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "next_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "IconTriangleRight", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "DropFilterRow", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "DropFilterCell", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "DropFilterButton", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "drop_filter_click", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_calendar.prototype, "Day", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_calendar.prototype, "DayCheck", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_calendar.prototype, "day_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_calendar.prototype, "Months", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_calendar.prototype, "MonthRow", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_calendar.prototype, "Month", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_calendar.prototype, "MonthCheck", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_calendar.prototype, "month_click", null);
    $.$bw_calendar = $bw_calendar;
})($ || ($ = {}));
(function ($) {
    class $bw_calendar_day extends $.$mol_calendar_day {
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
            return (Object.assign({}, super.attr(), { "bw_calendar_checkable": this.checkable() }));
        }
    }
    $.$bw_calendar_day = $bw_calendar_day;
})($ || ($ = {}));
(function ($) {
    class $bw_calendar_month extends $.$mol_view {
        checkable() {
            return true;
        }
        attr() {
            return ({
                "mol_calendar_selected": this.selected(),
                "bw_calendar_checkable": this.checkable(),
            });
        }
        selected() {
            return false;
        }
    }
    $.$bw_calendar_month = $bw_calendar_month;
})($ || ($ = {}));
(function ($) {
    class $bw_calendar_row_cell extends $.$mol_view {
        dom_name() {
            return "td";
        }
        attr() {
            return ({
                "colspan": 7,
            });
        }
    }
    $.$bw_calendar_row_cell = $bw_calendar_row_cell;
})($ || ($ = {}));
(function ($) {
    class $bw_button extends $.$mol_button {
        title() {
            return "";
        }
        Icon() {
            return null;
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
    ], $bw_button.prototype, "Image", null);
    __decorate([
        $.$mol_mem
    ], $bw_button.prototype, "Caption", null);
    $.$bw_button = $bw_button;
})($ || ($ = {}));
(function ($) {
    class $bw_close_button extends $.$mol_button_minor {
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
    ], $bw_close_button.prototype, "Icon", null);
    $.$bw_close_button = $bw_close_button;
})($ || ($ = {}));
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
(function ($) {
    class $bw_textarea extends $.$bw_input {
        dom_name() {
            return "textarea";
        }
    }
    $.$bw_textarea = $bw_textarea;
})($ || ($ = {}));
(function ($) {
    class $bw_grid extends $.$mol_grid {
        filter() {
            return null;
        }
    }
    $.$bw_grid = $bw_grid;
})($ || ($ = {}));
//bw_controls.view.tree.js.map
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
        function atom_prop(def, val) {
            const atom_name = def.obj.dom_id() + '::' + def.name;
            if (!def.obj.atoms) {
                def.obj.atoms = {};
            }
            if (!def.obj.atoms[atom_name]) {
                const container = {
                    atom: new $.$mol_atom(atom_name, (next) => {
                        if (def.name === 'data')
                            console.log(Object.assign({ next }, def), def.obj.atoms[atom_name]);
                        if (next !== void 0) {
                            def.obj.atoms[atom_name].value = next;
                            if (def.storage !== void 0) {
                                if (def.name === 'data')
                                    console.log(Object.assign({ next }, def), def.obj.atoms[atom_name]);
                                if (def.storage === 1) {
                                    this.$.$mol_state_local.value(atom_name, next);
                                }
                                else {
                                    this.$.$mol_state_session.value(atom_name, next);
                                }
                            }
                        }
                        const result = def.obj.atoms[atom_name].value;
                        return result;
                    }),
                };
                if (def.storage !== void 0) {
                    if (def.storage === 1) {
                        container.value = this.$.$mol_state_local.value(atom_name);
                    }
                    else {
                        container.value = this.$.$mol_state_session.value(atom_name);
                    }
                }
                if (container.value == undefined) {
                    container.value = def.initial;
                }
                def.obj.atoms[atom_name] = container;
            }
            let result;
            if (val === void 0) {
                if (def.name === 'data')
                    console.log(Object.assign({ val }, def), def.obj.atoms[atom_name]);
                result = def.obj.atoms[atom_name].atom.get();
                if (result === undefined) {
                    result = def.obj.atoms[atom_name].value;
                    console.warn({ atom_name, result });
                }
            }
            else {
                result = val;
                if (def.name === 'data')
                    console.log(Object.assign({ val }, def), def.obj.atoms[atom_name]);
                def.obj.atoms[atom_name].atom.set(val);
            }
            return result;
        }
        $$.atom_prop = atom_prop;
        function shown_prop(obj, val) {
            if (val !== void 0) {
                const outsideClickListener = (event) => {
                    const target = event.target;
                    const selector = '#' + obj.dom_id().replace(/([\$\.\(\)])/g, '\\$1');
                    const closest = target.closest(selector);
                    if (closest === null) {
                        obj.shown(false);
                    }
                };
                const methodName = val ? 'addEventListener' : 'removeEventListener';
                document[methodName]('click', outsideClickListener);
            }
        }
        $$.shown_prop = shown_prop;
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
        class $bw_combo_box extends $.$bw_combo_box {
            shown(val) {
                shown_prop(this, val);
                const result = atom_prop({ obj: this, name: 'shown', initial: false }, val);
                return result;
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
            $.$mol_mem
        ], $bw_combo_box.prototype, "shown", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_combo_box.prototype, "row_checked", null);
        __decorate([
            $.$mol_mem
        ], $bw_combo_box.prototype, "width_style", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_combo_box.prototype, "option", null);
        __decorate([
            $.$mol_mem
        ], $bw_combo_box.prototype, "selected_title", null);
        __decorate([
            $.$mol_mem
        ], $bw_combo_box.prototype, "has_options", null);
        $$.$bw_combo_box = $bw_combo_box;
        class $bw_search_deep extends $.$bw_search_deep {
            Calendar() {
                const result = !this.dropped_down() ? null : super.Calendar();
                if (result) {
                    shown_prop(result, true);
                }
                return result;
            }
            dropped_down(val, force) {
                return atom_prop({ obj: this, name: 'dropped_down', initial: false }, val);
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
                    result = result + ' ' + plural_word(result, 'день', 'дня', 'дней');
                }
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_search_deep.prototype, "Calendar", null);
        __decorate([
            $.$mol_mem
        ], $bw_search_deep.prototype, "dropped_down", null);
        __decorate([
            $.$mol_mem
        ], $bw_search_deep.prototype, "deep_date", null);
        __decorate([
            $.$mol_mem
        ], $bw_search_deep.prototype, "day_shift", null);
        __decorate([
            $.$mol_mem
        ], $bw_search_deep.prototype, "deep_moment", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_search_deep.prototype, "current_moment_string", null);
        __decorate([
            $.$mol_mem
        ], $bw_search_deep.prototype, "current_moment", null);
        __decorate([
            $.$mol_mem
        ], $bw_search_deep.prototype, "deep_date_text", null);
        __decorate([
            $.$mol_mem
        ], $bw_search_deep.prototype, "input_text", null);
        $$.$bw_search_deep = $bw_search_deep;
        class $bw_calendar extends $.$bw_calendar {
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
            mode(val, force) {
                const result = atom_prop({ obj: this, name: 'mode', initial: false }, val);
                return result;
            }
            mode_attr_value() {
                const result = this.mode() ? 'month' : 'day';
                return result;
            }
            month_shift(val) {
                if (val !== undefined) {
                    this.year_shift(0);
                }
                const result = atom_prop({ obj: this, name: 'month_shift', initial: 0 }, val);
                return result;
            }
            year_shift(val) {
                const result = atom_prop({ obj: this, name: 'year_shift', initial: 0 }, val);
                console.log({ year_shift: result, val });
                return result;
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
            $.$mol_mem
        ], $bw_calendar.prototype, "left_style", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "month_content", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "day_content", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "month_checkable", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "day_checkable", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "day_click", null);
        __decorate([
            $.$mol_mem
        ], $bw_calendar.prototype, "mode", null);
        __decorate([
            $.$mol_mem
        ], $bw_calendar.prototype, "mode_attr_value", null);
        __decorate([
            $.$mol_mem
        ], $bw_calendar.prototype, "month_moment", null);
        __decorate([
            $.$mol_mem
        ], $bw_calendar.prototype, "year_moment", null);
        __decorate([
            $.$mol_mem
        ], $bw_calendar.prototype, "prev_click", null);
        __decorate([
            $.$mol_mem
        ], $bw_calendar.prototype, "next_click", null);
        __decorate([
            $.$mol_mem
        ], $bw_calendar.prototype, "months_rows", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "month_cells", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "month_text", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "month_click", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "day_selected", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_calendar.prototype, "month_selected", null);
        $$.$bw_calendar = $bw_calendar;
        class $bw_button extends $.$bw_button {
            Caption() {
                return !this.title() ? null : super.Caption();
            }
        }
        $$.$bw_button = $bw_button;
        class $bw_close_button extends $.$bw_close_button {
            event_click(val, force) {
                if (val !== void 0) {
                    this['object_host()'].shown(false);
                }
                return super.event_click(val);
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_close_button.prototype, "event_click", null);
        $$.$bw_close_button = $bw_close_button;
        class $bw_modal extends $.$bw_modal {
            bw_form_shown() {
                const result = super.bw_form_shown();
                if (result) {
                    do_autofocus(this);
                }
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_modal.prototype, "bw_form_shown", null);
        $$.$bw_modal = $bw_modal;
        function do_autofocus(obj) {
            new $.$mol_defer(() => {
                const autofocusElement = obj.dom_node().querySelector('[autofocus]');
                if (autofocusElement) {
                    autofocusElement.focus();
                }
            });
        }
        $$.do_autofocus = do_autofocus;
        class $bw_grid extends $$.$mol_grid {
            rows() {
                return this.row_ids().filter(id => this.filter_row(id)).map(id => this.Row(id));
            }
            filter_row(id) {
                if (!id)
                    return true;
                const rec_id = id[id.length - 1];
                const result = bw_grid_filter_rec(this.record(rec_id), this.filter());
                return result;
            }
            filter() {
                return null;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_grid.prototype, "rows", null);
        __decorate([
            $.$mol_mem
        ], $bw_grid.prototype, "filter", null);
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
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//bw_controls.view.js.map
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
    class $bw_settings_workspace extends $.$mol_view {
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
                obj.block_name = () => "search";
                obj.block_title = () => "Настройка поиска";
                return obj;
            })(new this.$.$bw_search_settings_block);
        }
        Personal() {
            return ((obj) => {
                obj.block_name = () => "personal";
                obj.block_title = () => "Личные данные";
                return obj;
            })(new this.$.$bw_personal_settings_block);
        }
        Profile() {
            return ((obj) => {
                obj.block_name = () => "profile";
                obj.block_title = () => "Настройка профиля";
                return obj;
            })(new this.$.$bw_profile_settings_block);
        }
        Blacklist() {
            return ((obj) => {
                obj.block_name = () => "blacklist";
                obj.block_title = () => "Черный список телефонов";
                obj.workspace_content_height = () => this.workspace_content_height();
                return obj;
            })(new this.$.$bw_blacklist_settings_block);
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
            return (val !== void 0) ? val : "";
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
                obj.content = () => [].concat(this.Narrow(), this.Wide());
                return obj;
            })(new this.$.$bw_settings_workspace_content);
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
    }
    __decorate([
        $.$mol_mem
    ], $bw_settings_workspace.prototype, "Search", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_workspace.prototype, "Personal", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_workspace.prototype, "Profile", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_workspace.prototype, "Blacklist", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_workspace.prototype, "Menu", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_workspace.prototype, "selected_block", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_workspace.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_workspace.prototype, "Narrow", null);
    __decorate([
        $.$mol_mem
    ], $bw_settings_workspace.prototype, "Wide", null);
    $.$bw_settings_workspace = $bw_settings_workspace;
})($ || ($ = {}));
(function ($) {
    class $bw_settings_workspace_content extends $.$mol_view {
        content() {
            return [];
        }
        sub() {
            return this.content();
        }
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
    ], $bw_settings_workspace_content.prototype, "Meter", null);
    $.$bw_settings_workspace_content = $bw_settings_workspace_content;
})($ || ($ = {}));
(function ($) {
    class $bw_search_settings_block extends $.$bw_workspace_block {
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
                obj.autofocus = () => true;
                return obj;
            })(new this.$.$bw_search_deep);
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
            })(new this.$.$bw_combo_box);
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
            })(new this.$.$bw_combo_box);
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
            })(new this.$.$bw_combo_box);
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
            })(new this.$.$bw_button);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "SearchDeep", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "SearchDeepControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "Nova", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "NovaControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "selected_nova", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "Apartments", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "ApartmentsControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "selected_apartments", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "Sold", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "SoldControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "selected_sold", null);
    __decorate([
        $.$mol_mem
    ], $bw_search_settings_block.prototype, "Button", null);
    $.$bw_search_settings_block = $bw_search_settings_block;
})($ || ($ = {}));
(function ($) {
    class $bw_personal_settings_block extends $.$bw_workspace_block {
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
            })(new this.$.$bw_button);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "Name", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "NameControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "Phone", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "PhoneControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "Email", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "EmailControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "Pass", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "PassControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "Input", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "Link", null);
    __decorate([
        $.$mol_mem
    ], $bw_personal_settings_block.prototype, "Button", null);
    $.$bw_personal_settings_block = $bw_personal_settings_block;
})($ || ($ = {}));
(function ($) {
    class $bw_profile_settings_block extends $.$bw_workspace_block {
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
                obj.autofocus = () => this.green_name_autofocus();
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
                obj.autofocus = () => this.green_link_autofocus();
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
            })(new this.$.$bw_button);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "Inner", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "GreenText", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "Para0", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "Para1", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "GreenName", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "GreenNameControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "green_name", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "GreenLink", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "GreenLinkControl", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "green_link", null);
    __decorate([
        $.$mol_mem
    ], $bw_profile_settings_block.prototype, "Button", null);
    $.$bw_profile_settings_block = $bw_profile_settings_block;
})($ || ($ = {}));
(function ($) {
    class $bw_blacklist_settings_block extends $.$bw_workspace_block {
        data(val, force) {
            return (val !== void 0) ? val : ({});
        }
        workspace_content_height() {
            return 0;
        }
        ButtonBarAddon() {
            return ((obj) => {
                obj.Icon = () => ((obj) => {
                    return obj;
                })(new this.$.$bw_icon_trash);
                return obj;
            })(new this.$.$bw_button);
        }
        content() {
            return [].concat(this.Grid(), this.AddModal());
        }
        Grid() {
            return ((obj) => {
                obj.records = () => this.records();
                obj.checked_all = (val) => this.checked_all(val);
                obj.checked = (id, val) => this.checked(id, val);
                obj.rec_id_to_del = (val) => this.rec_id_to_del(val);
                obj.rec_id_to_edit = (val) => this.rec_id_to_edit(val);
                obj.filter = () => this.filter();
                obj.filter_phone = (val) => this.filter_phone(val);
                obj.filter_description = (val) => this.filter_description(val);
                obj.workspace_content_height = () => this.workspace_content_height();
                return obj;
            })(new this.$.$bw_blacklist_settings_block_grid);
        }
        records() {
            return ({});
        }
        checked_all(val, force) {
            return (val !== void 0) ? val : false;
        }
        checked(id, val, force) {
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
                obj.is_new_record_to_edit = () => this.is_new_record_to_edit();
                return obj;
            })(new this.$.$bw_blacklist_settings_block_add_modal);
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
        is_new_record_to_edit() {
            return true;
        }
        button_bar_content() {
            return [].concat(this.Button(), this.TrashButton());
        }
        Button() {
            return ((obj) => {
                obj.title = () => "Добавить";
                obj.event_click = (val) => this.add_click(val);
                return obj;
            })(new this.$.$bw_button);
        }
        add_click(val, force) {
            return (val !== void 0) ? val : null;
        }
        TrashButton() {
            return ((obj) => {
                obj.Icon = () => ((obj) => {
                    return obj;
                })(new this.$.$bw_icon_trash);
                obj.event_click = (val) => this.del_click(val);
                return obj;
            })(new this.$.$bw_button);
        }
        del_click(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "data", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "ButtonBarAddon", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "Grid", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "checked_all", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "rec_id_to_del", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "rec_id_to_edit", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "filter_phone", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "filter_description", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "AddModal", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "add_form_shown", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "phone_number", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "phone_desc", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "Button", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "add_click", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "TrashButton", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block.prototype, "del_click", null);
    $.$bw_blacklist_settings_block = $bw_blacklist_settings_block;
})($ || ($ = {}));
(function ($) {
    class $bw_blacklist_settings_block_add_modal extends $.$bw_modal {
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
                return obj;
            })(new this.$.$bw_close_button);
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
                obj.autofocus = () => this.phone_autofocus();
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
                obj.autofocus = () => this.description_autofocus();
                obj.value = (val) => this.phone_desc(val);
                return obj;
            })(new this.$.$bw_textarea);
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
                obj.event_click = (val) => this.button_click(val);
                return obj;
            })(new this.$.$bw_button);
        }
        button_click(val, force) {
            return (val !== void 0) ? val : null;
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "phone_number", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "phone_desc", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "HeaderBar", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "HeaderContent", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "HeaderTitle", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "CloseButton", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "Content", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "PhoneNumber", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "PhoneDescription", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "ButtonBar", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "Button", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_add_modal.prototype, "button_click", null);
    $.$bw_blacklist_settings_block_add_modal = $bw_blacklist_settings_block_add_modal;
})($ || ($ = {}));
(function ($) {
    class $bw_blacklist_settings_block_grid extends $.$bw_grid {
        records() {
            return ({});
        }
        checked(id, val, force) {
            return (val !== void 0) ? val : false;
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
        style() {
            return (Object.assign({}, super.style(), { "max-height": this.max_height() }));
        }
        max_height() {
            return 0;
        }
        row_height() {
            return 44;
        }
        col_ids() {
            return [].concat("check-box", "phone", "description", "author", "buttons");
        }
        Row(id) {
            return ((obj) => {
                obj.dblclick = (event) => this.row_dblclick(id, event);
                obj.height = () => this.row_height();
                obj.cells = () => this.cells(id);
                return obj;
            })(new this.$.$bw_grid_row);
        }
        row_dblclick(id, event, force) {
            return (event !== void 0) ? event : null;
        }
        PhoneColumn(colId) {
            return ((obj) => {
                obj.title = () => "Телефон";
                obj.filter = (val) => this.filter_phone(val);
                return obj;
            })(new this.$.$bw_filterable_column);
        }
        DescriptionColumn(colId) {
            return ((obj) => {
                obj.title = () => "Описание";
                obj.filter = (val) => this.filter_description(val);
                return obj;
            })(new this.$.$bw_filterable_column);
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
                return obj;
            })(new this.$.$mol_check_box);
        }
        ButtonsCell(id) {
            return ((obj) => {
                obj.dom_name = () => "td";
                obj.sub = () => [].concat(this.EditButton(id), this.DeleteButton(id));
                return obj;
            })(new this.$.$mol_view);
        }
        EditButton(id) {
            return ((obj) => {
                obj.Icon = () => ((obj) => {
                    return obj;
                })(new this.$.$bw_icon_edit);
                obj.event_click = (event) => this.edit_click(id, event);
                return obj;
            })(new this.$.$bw_button);
        }
        edit_click(id, event, force) {
            return (event !== void 0) ? event : null;
        }
        DeleteButton(id) {
            return ((obj) => {
                obj.Icon = () => ((obj) => {
                    return obj;
                })(new this.$.$bw_icon_trash);
                obj.event_click = (event) => this.del_click(id, event);
                return obj;
            })(new this.$.$bw_button);
        }
        del_click(id, event, force) {
            return (event !== void 0) ? event : null;
        }
    }
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_grid.prototype, "checked_all", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_grid.prototype, "rec_id_to_del", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_grid.prototype, "rec_id_to_edit", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_grid.prototype, "filter_phone", null);
    __decorate([
        $.$mol_mem
    ], $bw_blacklist_settings_block_grid.prototype, "filter_description", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "Row", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "row_dblclick", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "PhoneColumn", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "DescriptionColumn", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "SearchIcon", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "CheckBoxCell", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "CheckBox", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "ButtonsCell", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "EditButton", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "edit_click", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "DeleteButton", null);
    __decorate([
        $.$mol_mem_key
    ], $bw_blacklist_settings_block_grid.prototype, "del_click", null);
    $.$bw_blacklist_settings_block_grid = $bw_blacklist_settings_block_grid;
})($ || ($ = {}));
(function ($) {
    class $bw_grid_row extends $.$mol_grid_row {
        dblclick(event, force) {
            return (event !== void 0) ? event : null;
        }
        event() {
            return (Object.assign({}, super.event(), { "dblclick": (event) => this.dblclick(event) }));
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_grid_row.prototype, "dblclick", null);
    $.$bw_grid_row = $bw_grid_row;
})($ || ($ = {}));
(function ($) {
    class $bw_filterable_column extends $.$mol_view {
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
            })(new this.$.$bw_filterable_column_check);
        }
        checked(val, force) {
            return (val !== void 0) ? val : false;
        }
        SearchInput() {
            return ((obj) => {
                obj.checked = (val) => this.checked(val);
                obj.value = (val) => this.filter(val);
                obj.autocomplete = () => "new-password";
                return obj;
            })(new this.$.$bw_input2);
        }
    }
    __decorate([
        $.$mol_mem
    ], $bw_filterable_column.prototype, "filter", null);
    __decorate([
        $.$mol_mem
    ], $bw_filterable_column.prototype, "Normal", null);
    __decorate([
        $.$mol_mem
    ], $bw_filterable_column.prototype, "checked", null);
    __decorate([
        $.$mol_mem
    ], $bw_filterable_column.prototype, "SearchInput", null);
    $.$bw_filterable_column = $bw_filterable_column;
})($ || ($ = {}));
(function ($) {
    class $bw_filterable_column_check extends $.$mol_check {
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
    ], $bw_filterable_column_check.prototype, "Icon", null);
    $.$bw_filterable_column_check = $bw_filterable_column_check;
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
        class $bw_settings_workspace extends $.$bw_settings_workspace {
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
                const result = super.selected_block() || Object.keys(this.blocks())[0];
                if (val === void 0) {
                    return result;
                }
                else {
                    if (result !== val) {
                        super.selected_block(val, force);
                        new $.$mol_defer(() => {
                            const blocks = this.blocks();
                            const block = blocks[val].block;
                            if (!block.focused()) {
                                const activeElement = document.activeElement;
                                if (activeElement)
                                    activeElement.blur();
                                adjustOffsetParentScrollTop(block, {
                                    margin: 16,
                                    after: () => $$.do_autofocus(block),
                                });
                            }
                        });
                    }
                    return val;
                }
            }
            Content() {
                const result = super.Content();
                const dom_node = result.dom_node();
                let lastScrollTop = 0;
                let lastScrollDelta = 0;
                let isScrolling;
                dom_node.addEventListener('scroll', event => {
                    if (event.target === dom_node) {
                        const scrollTop = dom_node.scrollTop;
                        lastScrollDelta = scrollTop - lastScrollTop;
                        lastScrollTop = scrollTop;
                        if (!event.target.stopSmoothScroll) {
                            clearTimeout(isScrolling);
                            isScrolling = setTimeout(() => {
                                const clientHeight = dom_node.clientHeight;
                                const scrollBottom = scrollTop + clientHeight;
                                let block;
                                if (lastScrollDelta > 0) {
                                    const items = [...dom_node.querySelectorAll('[bw_workspace_block]')]
                                        .map((node) => node)
                                        .map((node) => {
                                        const caption = node.querySelector('[bw_workspace_block_caption]');
                                        return {
                                            node,
                                            offsetTop: actualOffsetTop(node, dom_node),
                                            offsetBottom: actualOffsetTop(caption, dom_node) + caption.offsetHeight,
                                        };
                                    })
                                        .filter((value) => value.offsetBottom > scrollTop && value.offsetTop < scrollBottom)
                                        .sort((a, b) => (a.offsetTop - b.offsetTop) || (a.node.offsetLeft - b.node.offsetLeft));
                                    if (items.length && items[0].offsetTop >= scrollTop) {
                                        block = items[0].node;
                                    }
                                }
                                else if (lastScrollDelta < 0) {
                                    const items = [...dom_node.querySelectorAll('[bw_workspace_block]')]
                                        .map((node) => node)
                                        .map((node) => {
                                        const offsetTop = actualOffsetTop(node, dom_node);
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
                });
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_settings_workspace.prototype, "menu_options", null);
        __decorate([
            $.$mol_mem
        ], $bw_settings_workspace.prototype, "selected_block", null);
        __decorate([
            $.$mol_mem
        ], $bw_settings_workspace.prototype, "Content", null);
        $$.$bw_settings_workspace = $bw_settings_workspace;
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
                smoothScroll(offsetParent, offsetParent.scrollTop + Math.min(deltaTop, deltaBottom), after);
            }
        }
        $$.adjustOffsetParentScrollTop = adjustOffsetParentScrollTop;
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
        function actualOffsetTop(fromEl, toEl) {
            let result = 0;
            while (true) {
                result += fromEl.offsetTop;
                const offsetParent = fromEl.offsetParent;
                if (!offsetParent) {
                    console.error({ msg: 'fromEl is not descendant of toEl', fromEl, toEl });
                    return null;
                }
                else if (offsetParent === toEl) {
                    return result;
                }
                else {
                    fromEl = offsetParent;
                    const delta = fromEl.offsetHeight - fromEl.clientHeight;
                    result += delta;
                }
            }
        }
        $$.actualOffsetTop = actualOffsetTop;
        class $bw_search_settings_block extends $.$bw_search_settings_block {
            selected_nova(val, force) {
                return $$.bw_data.selected('nova', val);
            }
            options_nova() {
                return $$.bw_data.selected_def('nova').values;
            }
            selected_apartments(val, force) {
                return $$.bw_data.selected('apartments', val);
            }
            options_apartments() {
                return $$.bw_data.selected_def('apartments').values;
            }
            selected_sold(val, force) {
                return $$.bw_data.selected('sold', val);
            }
            options_sold() {
                return $$.bw_data.selected_def('sold').values;
            }
        }
        $$.$bw_search_settings_block = $bw_search_settings_block;
        class $bw_profile_settings_block extends $.$bw_profile_settings_block {
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
        ], $bw_profile_settings_block.prototype, "green_name_autofocus", null);
        __decorate([
            $.$mol_mem
        ], $bw_profile_settings_block.prototype, "green_link_autofocus", null);
        $$.$bw_profile_settings_block = $bw_profile_settings_block;
        class $bw_blacklist_settings_block extends $.$bw_blacklist_settings_block {
            AddModal() {
                const result = !this.add_form_shown() ? null : super.AddModal();
                return result;
            }
            add_click(val, force) {
                this.rec_id_to_edit(this.data().nextId);
                console.log(this.data());
                return (val !== void 0) ? val : null;
            }
            rec_id_to_edit(val, force) {
                if (val !== void 0) {
                    const rec = this.data().records[val];
                    if (rec) {
                        this.phone_number(rec.phone);
                        this.phone_desc(rec.description);
                    }
                    else {
                        this.phone_number('');
                        this.phone_desc('');
                    }
                }
                const result = super.rec_id_to_edit(val, force);
                return result;
            }
            add_form_shown(val, force) {
                if (val === false) {
                    this.rec_id_to_edit(null);
                }
                return this.rec_id_to_edit() != void 0;
            }
            del_click(val, force) {
                if (val !== void 0) {
                    const old_data = this.data();
                    const records = old_data.records;
                    const new_data = { nextId: 0, records: {} };
                    const filter = this.filter();
                    const checked = this._checked;
                    const forEachProc = (rec_id) => {
                        if (rec_id >= new_data.nextId)
                            new_data.nextId = rec_id + 1;
                        new_data.records[rec_id] = records[rec_id];
                    };
                    if (!filter && this.checked_all()) {
                        Array.from(checked).forEach(forEachProc);
                    }
                    else {
                        const filter_predicate = !filter ?
                            (rec_id) => !checked.has(rec_id) :
                            this.checked_all() ?
                                (rec_id) => checked.has(rec_id) || !$$.bw_grid_filter_rec(records[rec_id], filter) :
                                (rec_id) => !checked.has(rec_id) || !$$.bw_grid_filter_rec(records[rec_id], filter);
                        Object.keys(records)
                            .map((key) => +key)
                            .filter(filter_predicate)
                            .forEach(forEachProc);
                    }
                    this.data(new_data);
                    if (!filter)
                        this.checked_all(false);
                }
                return (val !== void 0) ? val : null;
            }
            rec_id_to_del(val, force) {
                console.log({ val });
                if (val !== void 0) {
                    const old_data = this.data();
                    const new_data = { nextId: 0, records: {} };
                    Object.keys(old_data.records).forEach(key => {
                        if (val != key) {
                            const rec_id = +key;
                            if (rec_id >= new_data.nextId)
                                new_data.nextId = rec_id + 1;
                            new_data.records[key] = old_data.records[key];
                        }
                    });
                    this.data(new_data);
                }
                return (val !== void 0) ? val : 0;
            }
            is_new_record_to_edit() {
                return !this.records()[this.rec_id_to_edit()];
            }
            commit_record() {
                const rec_id = this.rec_id_to_edit();
                if (rec_id != void 0) {
                    const data = this.data();
                    const new_data = { nextId: data.nextId, records: Object.assign({}, data.records) };
                    console.log({ rec_id }, data.records);
                    if (this.is_new_record_to_edit()) {
                        new_data.nextId = rec_id + 1;
                    }
                    new_data.records[rec_id] = {
                        phone: this.phone_number(),
                        description: this.phone_desc(),
                        author: 'Новосельцев Станислав Игоревич',
                    };
                    this.data(new_data);
                    this.rec_id_to_edit(null);
                    new $.$mol_defer(() => adjustOffsetParentScrollTop(this, { margin: 16 }));
                }
            }
            data(val) {
                if (val !== void 0) {
                    this._data = val;
                    this.$.$mol_state_session.value('blacklist', val);
                }
                let result = this._data ||
                    this.$.$mol_state_session.value('blacklist', val) ||
                    { nextId: 0, records: {} };
                return result;
            }
            records() {
                return this.data().records;
            }
            checked_all(val, force) {
                if (val !== void 0) {
                    this._checked_all = val;
                    this._checked.clear();
                    this.$.$mol_state_session.value('blacklist-checked', null);
                    this.$.$mol_state_session.value('blacklist-checked-all', val == true ? val : null);
                }
                if (this._checked_all == void 0) {
                    this._checked_all = !!this.$.$mol_state_session.value('blacklist-checked-all');
                }
                return !!this._checked_all;
            }
            checked_impl(id, val, force) {
                if (id === '') {
                    if (val !== void 0) {
                        this.checked_all(val);
                    }
                    return this.checked_all();
                }
                else {
                    const rec_id = +id;
                    if (this._checked === void 0) {
                        this._checked = new Set(this.$.$mol_state_session.value('blacklist-checked'));
                    }
                    if (val !== void 0) {
                        if (this.checked_all()) {
                            val = !val;
                        }
                        if (val) {
                            this._checked.add(rec_id);
                        }
                        else {
                            this._checked.delete(rec_id);
                        }
                        this.$.$mol_state_session.value('blacklist-checked', Array.from(this._checked));
                    }
                    let result = this._checked.has(rec_id);
                    if (this.checked_all()) {
                        result = !result;
                    }
                    return result;
                }
            }
            checked(id, val, force) {
                return this.checked_impl(id.row[id.row.length - 1], val, force);
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
                return result;
            }
            filter_phone(val, force) {
                return (val !== void 0) ? val : "";
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_blacklist_settings_block.prototype, "add_form_shown", null);
        __decorate([
            $.$mol_mem
        ], $bw_blacklist_settings_block.prototype, "is_new_record_to_edit", null);
        __decorate([
            $.$mol_mem
        ], $bw_blacklist_settings_block.prototype, "data", null);
        __decorate([
            $.$mol_mem
        ], $bw_blacklist_settings_block.prototype, "records", null);
        __decorate([
            $.$mol_mem
        ], $bw_blacklist_settings_block.prototype, "checked_all", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_blacklist_settings_block.prototype, "checked_impl", null);
        __decorate([
            $.$mol_mem_key
        ], $bw_blacklist_settings_block.prototype, "checked", null);
        __decorate([
            $.$mol_mem
        ], $bw_blacklist_settings_block.prototype, "filter", null);
        __decorate([
            $.$mol_mem
        ], $bw_blacklist_settings_block.prototype, "filter_phone", null);
        $$.$bw_blacklist_settings_block = $bw_blacklist_settings_block;
        class $bw_blacklist_settings_block_add_modal extends $.$bw_blacklist_settings_block_add_modal {
            title() {
                return this.is_new_record_to_edit() ? 'Добавление телефона' : 'Редактирование телефона';
            }
            button_click(val, force) {
                new $.$mol_defer(() => {
                    this['object_host()'].commit_record();
                });
                return (val !== void 0) ? val : null;
            }
            phone_autofocus() {
                return this.is_new_record_to_edit();
            }
            description_autofocus() {
                return !this.is_new_record_to_edit();
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_blacklist_settings_block_add_modal.prototype, "title", null);
        $$.$bw_blacklist_settings_block_add_modal = $bw_blacklist_settings_block_add_modal;
        class $bw_blacklist_settings_block_grid extends $.$bw_blacklist_settings_block_grid {
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
            del_click(id, val, force) {
                this.rec_id_to_del(+id.row[id.row.length - 1]);
                return (event !== void 0) ? event : null;
            }
            edit_click(id, val, force) {
                this.rec_id_to_edit(+id.row[id.row.length - 1]);
                return (event !== void 0) ? event : null;
            }
            row_dblclick(id, event, force) {
                this.rec_id_to_edit(+id[id.length - 1]);
                return (event !== void 0) ? event : null;
            }
            max_height() {
                const result = Math.max(44 * 2, this.workspace_content_height() - 185 - 32);
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_blacklist_settings_block_grid.prototype, "max_height", null);
        $$.$bw_blacklist_settings_block_grid = $bw_blacklist_settings_block_grid;
        class $bw_filterable_column extends $.$bw_filterable_column {
            control() {
                const checked = this.checked();
                const result = checked ? this.SearchInput() : this.Normal();
                if (checked) {
                    new $.$mol_defer(() => this.SearchInput().Input().focused(true));
                }
                else {
                    this.filter('');
                }
                return result;
            }
        }
        __decorate([
            $.$mol_mem
        ], $bw_filterable_column.prototype, "control", null);
        $$.$bw_filterable_column = $bw_filterable_column;
    })($$ = $.$$ || ($.$$ = {}));
})($ || ($ = {}));
//settings.view.js.map
//# sourceMappingURL=web.js.map