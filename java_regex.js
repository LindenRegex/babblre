"use strict";
let $rt_seed = 2463534242,
$rt_nextId = () => {
    let x = $rt_seed;
    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
},
$rt_wrapFunction0 = f => function() {
    return f(this);
},
$rt_wrapFunction1 = f => function(p1) {
    return f(this, p1);
},
$rt_wrapFunction2 = f => function(p1, p2) {
    return f(this, p1, p2);
},
$rt_wrapFunction3 = f => function(p1, p2, p3) {
    return f(this, p1, p2, p3, p3);
},
$rt_wrapFunction4 = f => function(p1, p2, p3, p4) {
    return f(this, p1, p2, p3, p4);
},
$rt_mainStarter = f => (args, callback) => {
    if (!args) {
        args = [];
    }
    let javaArgs = $rt_createArray($rt_objcls(), args.length);
    for (let i = 0;i < args.length;++i) {
        javaArgs.data[i] = $rt_str(args[i]);
    }
    $rt_startThread(() => {
        f.call(null, javaArgs);
    }, callback);
},
$rt_eraseClinit = target => target.$clinit = () => {
},
$dbg_class = obj => {
    let cls = obj.constructor;
    let arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    let clsName = "";
    if (cls.$meta.primitive) {
        clsName = cls.$meta.name;
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
},
$rt_classWithoutFields = superclass => {
    if (superclass === 0) {
        return function() {
        };
    }
    if (superclass === void 0) {
        superclass = $rt_objcls();
    }
    return function() {
        superclass.call(this);
    };
},
$rt_cls = cls => jl_Class_getClass(cls),
$rt_objcls = () => jl_Object,
$rt_getThread = () => {
    {
        return jl_Thread_currentThread0();
    }
},
$rt_setThread = t => {
    {
        return jl_Thread_setCurrentThread(t);
    }
},
$rt_callWithReceiver = f => function() {
    return f.apply(null, [this].concat(Array.prototype.slice.call(arguments)));
},
$rt_createcls = () => {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
},
$rt_createPrimitiveCls = (name, binaryName) => {
    let cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    cls.$meta.simpleName = null;
    cls.$meta.declaringClass = null;
    cls.$meta.enclosingClass = null;
    return cls;
},
$rt_booleancls = $rt_createPrimitiveCls("boolean", "Z"),
$rt_charcls = $rt_createPrimitiveCls("char", "C"),
$rt_bytecls = $rt_createPrimitiveCls("byte", "B"),
$rt_intcls = $rt_createPrimitiveCls("int", "I"),
$rt_voidcls = $rt_createPrimitiveCls("void", "V"),
$rt_compare = (a, b) => a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1,
$rt_imul = Math.imul || function(a, b) {
    let ah = a >>> 16 & 0xFFFF;
    let al = a & 0xFFFF;
    let bh = b >>> 16 & 0xFFFF;
    let bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
},
$rt_udiv = (a, b) => (a >>> 0) / (b >>> 0) >>> 0,
$rt_umod = (a, b) => (a >>> 0) % (b >>> 0) >>> 0,
$rt_ucmp = (a, b) => {
    a >>>= 0;
    b >>>= 0;
    return a < b ?  -1 : a > b ? 1 : 0;
},
Long_ZERO = BigInt(0),
Long_fromInt = val => BigInt.asIntN(64, BigInt(val | 0)),
Long_fromNumber = val => BigInt.asIntN(64, BigInt(val >= 0 ? Math.floor(val) : Math.ceil(val))),
$rt_createArray = (cls, sz) => {
    let data = new Array(sz);
    data.fill(null);
    return new ($rt_arraycls(cls))(data);
},
$rt_createUnfilledArray = (cls, sz) => new ($rt_arraycls(cls))(new Array(sz)),
$rt_createCharArray = sz => new $rt_charArrayCls(new Uint16Array(sz)),
$rt_createByteArray = sz => new $rt_byteArrayCls(new Int8Array(sz)),
$rt_createIntArray = sz => new $rt_intArrayCls(new Int32Array(sz)),
$rt_createIntArrayFromData = data => {
    let buffer = new Int32Array(data.length);
    buffer.set(data);
    return new $rt_intArrayCls(buffer);
},
$rt_createBooleanArray = sz => new $rt_booleanArrayCls(new Int8Array(sz)),
$rt_arraycls = cls => {
    let result = cls.$array;
    if (result === null) {
        function JavaArray(data) {
            ($rt_objcls()).call(this);
            this.data = data;
        }
        JavaArray.prototype = Object.create(($rt_objcls()).prototype);
        JavaArray.prototype.type = cls;
        JavaArray.prototype.constructor = JavaArray;
        JavaArray.prototype.toString = function() {
            let str = "[";
            for (let i = 0;i < this.data.length;++i) {
                if (i > 0) {
                    str += ", ";
                }
                str += this.data[i].toString();
            }
            str += "]";
            return str;
        };
        JavaArray.prototype.$clone1 = function() {
            let dataCopy;
            if ('slice' in this.data) {
                dataCopy = this.data.slice();
            } else {
                dataCopy = new this.data.constructor(this.data.length);
                for (let i = 0;i < dataCopy.length;++i) {
                    dataCopy[i] = this.data[i];
                }
            }
            return new ($rt_arraycls(this.type))(dataCopy);
        };
        let name = "[" + cls.$meta.binaryName;
        JavaArray.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false, simpleName : null, declaringClass : null, enclosingClass : null };
        JavaArray.classObject = null;
        JavaArray.$array = null;
        result = JavaArray;
        cls.$array = JavaArray;
    }
    return result;
},
$rt_createMultiArray = (cls, dimensions) => {
    let first = 0;
    for (let i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (let i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    let arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    let firstDim = dimensions[first] | 0;
    for (let i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
},
$rt_createBooleanMultiArray = dimensions => {
    let arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls, dimensions);
    }
    let firstDim = dimensions[0] | 0;
    for (let i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls, arrays, dimensions, 0);
},
$rt_primitiveArrayCount = (dimensions, start) => {
    let val = dimensions[start + 1] | 0;
    for (let i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
},
$rt_createMultiArrayImpl = (cls, arrays, dimensions, start) => {
    let limit = arrays.length;
    for (let i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        let dim = dimensions[i];
        let index = 0;
        let packedIndex = 0;
        while (index < limit) {
            let arr = $rt_createUnfilledArray(cls, dim);
            for (let j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
},
$rt_stringPool_instance,
$rt_stringPool = strings => {
    $rt_stringClassInit();
    $rt_stringPool_instance = new Array(strings.length);
    for (let i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
},
$rt_s = index => $rt_stringPool_instance[index],
$rt_charArrayToString = (array, offset, count) => {
    let result = "";
    let limit = offset + count;
    for (let i = offset;i < limit;i = i + 1024 | 0) {
        let next = Math.min(limit, i + 1024 | 0);
        result += String.fromCharCode.apply(null, array.subarray(i, next));
    }
    return result;
},
$rt_str = str => str === null ? null : jl_String__init_2(str),
$rt_ustr = str => str === null ? null : str.$nativeString,
$rt_stringClassInit = () => (() => {})();
let $rt_intern;
{
    $rt_intern = str => str;
}
let $rt_isInstance = (obj, cls) => obj instanceof $rt_objcls() && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls),
$rt_isAssignable = (from, to) => {
    if (from === to) {
        return true;
    }
    let map = from.$meta.assignableCache;
    if (typeof map === 'undefined') {
        map = new Map();
        from.$meta.assignableCache = map;
    }
    let cachedResult = map.get(to);
    if (typeof cachedResult !== 'undefined') {
        return cachedResult;
    }
    if (to.$meta.item !== null) {
        let result = from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
        map.set(to, result);
        return result;
    }
    let supertypes = from.$meta.supertypes;
    for (let i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            map.set(to, true);
            return true;
        }
    }
    map.set(to, false);
    return false;
},
$rt_throw = ex => {
    throw $rt_exception(ex);
},
$rt_javaExceptionProp = Symbol("javaException"),
$rt_exception = ex => {
    if (!ex.$jsException) {
        $rt_fillNativeException(ex);
    }
    return ex.$jsException;
},
$rt_fillNativeException = ex => {
    let javaCause = $rt_throwableCause(ex);
    let jsCause = javaCause !== null ? javaCause.$jsException : void 0;
    let cause = typeof jsCause === "object" ? { cause : jsCause } : void 0;
    let err = new JavaError("Java exception thrown", cause);
    if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(err);
    }
    err[$rt_javaExceptionProp] = ex;
    ex.$jsException = err;
    $rt_fillStack(err, ex);
},
$rt_fillStack = (err, ex) => {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        let stack = $rt_decodeStack(err.stack);
        let javaStack = $rt_createArray($rt_stecls(), stack.length);
        let elem;
        let noStack = false;
        for (let i = 0;i < stack.length;++i) {
            let element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
},
JavaError;
if (typeof Reflect === 'object') {
    let defaultMessage = Symbol("defaultMessage");
    JavaError = function JavaError(message, cause) {
        let self = Reflect.construct(Error, [void 0, cause], JavaError);
        Object.setPrototypeOf(self, JavaError.prototype);
        self[defaultMessage] = message;
        return self;
    }
    ;
    JavaError.prototype = Object.create(Error.prototype, { constructor : { configurable : true, writable : true, value : JavaError }, message : { get() {
        try {
            let javaException = this[$rt_javaExceptionProp];
            if (typeof javaException === 'object') {
                let javaMessage = $rt_throwableMessage(javaException);
                if (typeof javaMessage === "object") {
                    return javaMessage !== null ? javaMessage.toString() : null;
                }
            }
            return this[defaultMessage];
        } catch (e){
            return "Exception occurred trying to extract Java exception message: " + e;
        }
    } } });
} else {
    JavaError = Error;
}
let $rt_javaException = e => e instanceof Error && typeof e[$rt_javaExceptionProp] === 'object' ? e[$rt_javaExceptionProp] : null,
$rt_wrapException = err => {
    let ex = err[$rt_javaExceptionProp];
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err[$rt_javaExceptionProp] = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
},
$rt_createException = message => jl_RuntimeException__init_2(message),
$rt_throwableMessage = t => jl_Throwable_getMessage(t),
$rt_throwableCause = t => jl_Throwable_getCause(t),
$rt_stecls = () => $rt_objcls(),
$rt_createStackElement = (className, methodName, fileName, lineNumber) => {
    {
        return null;
    }
},
$rt_setStack = (e, stack) => {
},
$rt_packageData = null,
$rt_packages = data => {
    let i = 0;
    let packages = new Array(data.length);
    for (let j = 0;j < data.length;++j) {
        let prefixIndex = data[i++];
        let prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
},
$rt_metadata = data => {
    let packages = $rt_packageData;
    let i = 0;
    while (i < data.length) {
        let cls = data[i++];
        cls.$meta = {  };
        let m = cls.$meta;
        let className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            let packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        let superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        let flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        let innerClassInfo = data[i++];
        if (innerClassInfo === 0) {
            m.simpleName = null;
            m.declaringClass = null;
            m.enclosingClass = null;
        } else {
            let enclosingClass = innerClassInfo[0];
            m.enclosingClass = enclosingClass !== 0 ? enclosingClass : null;
            let declaringClass = innerClassInfo[1];
            m.declaringClass = declaringClass !== 0 ? declaringClass : null;
            let simpleName = innerClassInfo[2];
            m.simpleName = simpleName !== 0 ? simpleName : null;
        }
        let clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        let virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (let j = 0;j < virtualMethods.length;j += 2) {
                let name = virtualMethods[j];
                let func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (let k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
};
function TeaVMThread(runner) {
    this.status = 3;
    this.stack = [];
    this.suspendCallback = null;
    this.runner = runner;
    this.attribute = null;
    this.completeCallback = null;
}
TeaVMThread.prototype.push = function() {
    for (let i = 0;i < arguments.length;++i) {
        this.stack.push(arguments[i]);
    }
    return this;
};
TeaVMThread.prototype.s = TeaVMThread.prototype.push;
TeaVMThread.prototype.pop = function() {
    return this.stack.pop();
};
TeaVMThread.prototype.l = TeaVMThread.prototype.pop;
TeaVMThread.prototype.isResuming = function() {
    return this.status === 2;
};
TeaVMThread.prototype.isSuspending = function() {
    return this.status === 1;
};
TeaVMThread.prototype.suspend = function(callback) {
    this.suspendCallback = callback;
    this.status = 1;
};
TeaVMThread.prototype.start = function(callback) {
    if (this.status !== 3) {
        throw new Error("Thread already started");
    }
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 0;
    this.completeCallback = callback ? callback : result => {
        if (result instanceof Error) {
            throw result;
        }
    };
    this.run();
};
TeaVMThread.prototype.resume = function() {
    if ($rt_currentNativeThread !== null) {
        throw new Error("Another thread is running");
    }
    this.status = 2;
    this.run();
};
TeaVMThread.prototype.run = function() {
    $rt_currentNativeThread = this;
    let result;
    try {
        result = this.runner();
    } catch (e){
        result = e;
    } finally {
        $rt_currentNativeThread = null;
    }
    if (this.suspendCallback !== null) {
        let self = this;
        let callback = this.suspendCallback;
        this.suspendCallback = null;
        callback(() => self.resume());
    } else if (this.status === 0) {
        this.completeCallback(result);
    }
};
let $rt_suspending = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isSuspending();
},
$rt_resuming = () => {
    let thread = $rt_nativeThread();
    return thread != null && thread.isResuming();
},
$rt_requireNativeThread = () => {
    let nativeThread = $rt_nativeThread();
    if (nativeThread === null) {
        throw new Error("Suspension point reached from non-threading context " + "(perhaps, from native JS method). See https://teavm.org/docs/runtime/coroutines.html " + "('Interaction with JavaScript' section)");
    }
    return nativeThread;
},
$rt_startThread = (runner, callback) => (new TeaVMThread(runner)).start(callback),
$rt_currentNativeThread = null,
$rt_nativeThread = () => $rt_currentNativeThread,
$rt_invalidPointer = () => {
    throw new Error("Invalid recorded state");
};
function jl_Object() {
    this.$monitor = null;
    this.$id$ = 0;
}
let jl_Object_monitorEnterSync = $o => {
    let var$2;
    if (jl_Thread_currentThread === null)
        return;
    if ($o.$monitor === null)
        jl_Object_createMonitor($o);
    $o = $o.$monitor;
    var$2 = $o.$owner;
    if (var$2 === null)
        $o.$owner = jl_Thread_currentThread;
    else if (var$2 !== jl_Thread_currentThread) {
        var$2 = new jl_IllegalStateException;
        jl_RuntimeException__init_(var$2, $rt_s(0));
        $rt_throw(var$2);
    }
    $o.$count = $o.$count + 1 | 0;
},
jl_Object_monitorExitSync = $o => {
    let var$2, var$3;
    if (jl_Thread_currentThread === null)
        return;
    if (!jl_Object_isEmptyMonitor($o)) {
        var$2 = $o.$monitor;
        if (var$2.$owner === jl_Thread_currentThread) {
            var$3 = var$2.$count - 1 | 0;
            var$2.$count = var$3;
            if (!var$3)
                var$2.$owner = null;
            jl_Object_isEmptyMonitor($o);
            return;
        }
    }
    $o = new jl_IllegalMonitorStateException;
    jl_Exception__init_($o);
    $rt_throw($o);
},
jl_Object_monitorEnter = $o => {
    let var$2, var$3, $ptr, $tmp;
    $ptr = 0;
    if ($rt_resuming()) {
        let $thread = $rt_nativeThread();
        $ptr = $thread.pop();var$3 = $thread.pop();var$2 = $thread.pop();$o = $thread.pop();
    }
    main: while (true) { switch ($ptr) {
    case 0:
        var$2 = 1;
        if ($o.$monitor === null)
            jl_Object_createMonitor($o);
        var$3 = $o.$monitor;
        if (var$3.$owner === null)
            var$3.$owner = jl_Thread_currentThread;
        if (var$3.$owner === jl_Thread_currentThread) {
            var$3.$count = var$3.$count + var$2 | 0;
            return;
        }
        $ptr = 1;
    case 1:
        jl_Object_monitorEnterWait$_asyncCall_$($o, var$2);
        if ($rt_suspending()) {
            break main;
        }
        return;
    default: $rt_invalidPointer();
    }}
    $rt_nativeThread().push($o, var$2, var$3, $ptr);
},
jl_Object_createMonitor = $o => {
    let var$2;
    var$2 = new jl_Object$Monitor;
    var$2.$owner = jl_Thread_currentThread;
    $o.$monitor = var$2;
},
jl_Object_monitorEnterWait = ($o, $count, $callback) => {
    let $thread_0, $monitor, var$6;
    $thread_0 = jl_Thread_currentThread;
    $monitor = $o.$monitor;
    if ($monitor === null) {
        jl_Object_createMonitor($o);
        jl_Thread_setCurrentThread($thread_0);
        $o = $o.$monitor;
        $o.$count = $o.$count + $count | 0;
        $o = null;
        otpp_AsyncCallbackWrapper_complete($callback, $o);
        return;
    }
    if ($monitor.$owner === null) {
        $monitor.$owner = $thread_0;
        jl_Thread_setCurrentThread($thread_0);
        $o = $o.$monitor;
        $o.$count = $o.$count + $count | 0;
        $o = null;
        otpp_AsyncCallbackWrapper_complete($callback, $o);
        return;
    }
    if ($monitor.$enteringThreads === null)
        $monitor.$enteringThreads = otp_Platform_createQueueJs$js_body$_30();
    $monitor = $monitor.$enteringThreads;
    var$6 = new jl_Object$monitorEnterWait$lambda$_6_0;
    var$6.$_00 = $thread_0;
    var$6.$_1 = $o;
    var$6.$_2 = $count;
    var$6.$_3 = $callback;
    $callback = var$6;
    $monitor.push($callback);
},
jl_Object_monitorExit = $o => {
    let var$2, var$3;
    if (!jl_Object_isEmptyMonitor($o)) {
        var$2 = $o.$monitor;
        if (var$2.$owner === jl_Thread_currentThread) {
            var$3 = var$2.$count - 1 | 0;
            var$2.$count = var$3;
            if (var$3 <= 0) {
                var$2.$owner = null;
                var$2 = var$2.$enteringThreads;
                if (var$2 !== null && !otp_PlatformQueue_isEmpty$static(var$2)) {
                    var$2 = new jl_Object$monitorExit$lambda$_8_0;
                    var$2.$_01 = $o;
                    otp_Platform_schedule(var$2, 0);
                } else
                    jl_Object_isEmptyMonitor($o);
            }
            return;
        }
    }
    $o = new jl_IllegalMonitorStateException;
    jl_Exception__init_($o);
    $rt_throw($o);
},
jl_Object_isEmptyMonitor = $this => {
    let $monitor, var$2;
    $monitor = $this.$monitor;
    if ($monitor === null)
        return 1;
    a: {
        if ($monitor.$owner === null) {
            var$2 = $monitor.$enteringThreads;
            if (!(var$2 !== null && !otp_PlatformQueue_isEmpty$static(var$2))) {
                $monitor = $monitor.$notifyListeners;
                if ($monitor === null)
                    break a;
                if (otp_PlatformQueue_isEmpty$static($monitor))
                    break a;
            }
        }
        return 0;
    }
    $this.$monitor = null;
    return 1;
},
jl_Object_getClass = $this => {
    return jl_Class_getClass($this.constructor);
},
jl_Object_hashCode = $this => {
    return jl_Object_identity($this);
},
jl_Object_equals = ($this, $other) => {
    return $this !== $other ? 0 : 1;
},
jl_Object_toString = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    var$1 = jl_Class_getName(jl_Object_getClass($this));
    var$2 = jl_Object_identity($this);
    if (!var$2)
        var$3 = $rt_s(1);
    else {
        var$4 = (((32 - jl_Integer_numberOfLeadingZeros(var$2) | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$5 = $rt_createCharArray(var$4);
        var$6 = var$5.data;
        var$7 = (var$4 - 1 | 0) * 4 | 0;
        var$8 = 0;
        while (var$7 >= 0) {
            var$4 = var$8 + 1 | 0;
            var$6[var$8] = jl_Character_forDigit((var$2 >>> var$7 | 0) & 15, 16);
            var$7 = var$7 - 4 | 0;
            var$8 = var$4;
        }
        var$3 = jl_String__init_0(var$5);
    }
    var$9 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$9);
    var$1 = jl_StringBuilder_append(var$9, var$1);
    jl_AbstractStringBuilder_append(var$1, 64);
    jl_StringBuilder_append(var$1, var$3);
    return jl_AbstractStringBuilder_toString(var$9);
},
jl_Object_identity = $this => {
    let $platformThis;
    $platformThis = $this;
    if (!$platformThis.$id$)
        $platformThis.$id$ = $rt_nextId();
    return $this.$id$;
},
jl_Object_clone = $this => {
    let $result, var$2, var$3;
    if (!$rt_isInstance($this, jl_Cloneable) && $this.constructor.$meta.item === null) {
        $result = new jl_CloneNotSupportedException;
        jl_Exception__init_($result);
        $rt_throw($result);
    }
    $result = otp_Platform_clone($this);
    var$2 = $result;
    var$3 = $rt_nextId();
    var$2.$id$ = var$3;
    return $result;
},
jl_Object_monitorEnterWait$_asyncCall_$ = (var$1, var$2) => {
    let thread = $rt_requireNativeThread();
    let javaThread = $rt_getThread();
    if (thread.isResuming()) {
        thread.status = 0;
        let result = thread.attribute;
        if (result instanceof Error) {
            throw result;
        }
        return result;
    }
    let callback = function() {
    };
    callback.$complete = val => {
        thread.attribute = val;
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback.$error = e => {
        thread.attribute = $rt_exception(e);
        $rt_setThread(javaThread);
        thread.resume();
    };
    callback = otpp_AsyncCallbackWrapper_create(callback);
    thread.suspend(() => {
        try {
            jl_Object_monitorEnterWait(var$1, var$2, callback);
            ;
        } catch ($e){
            callback.$error($e);
        }
    });
    return null;
},
jlr_AnnotatedElement = $rt_classWithoutFields(0),
jlr_Type = $rt_classWithoutFields(0);
function jl_Class() {
    let a = this; jl_Object.call(a);
    a.$name = null;
    a.$platformClass = null;
}
let jl_Class_getClass = var$1 => {
    let var$2;
    if (var$1 === null)
        return null;
    var$2 = var$1.classObject;
    if (var$2 === null) {
        var$2 = new jl_Class;
        var$2.$platformClass = var$1;
        var$1.classObject = var$2;
    }
    return var$2;
},
jl_Class_getName = $this => {
    if ($this.$name === null)
        $this.$name = $rt_str($this.$platformClass.$meta.name);
    return $this.$name;
},
jl_Class_isPrimitive = $this => {
    return $this.$platformClass.$meta.primitive ? 1 : 0;
},
jl_Class_getComponentType = $this => {
    return jl_Class_getClass($this.$platformClass.$meta.item);
},
otji_JS = $rt_classWithoutFields(),
otji_JS_function = (var$1, var$2) => {
    let name = 'jso$functor$' + var$2;
    let result = var$1[name];
    if (typeof result !== 'function') {
        let fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        result = () => fn;
        var$1[name] = result;
    }
    return result();
},
otp_Platform = $rt_classWithoutFields(),
otp_Platform_clone = var$1 => {
    let copy = new var$1.constructor();
    for (let field in var$1) {
        if (var$1.hasOwnProperty(field)) {
            copy[field] = var$1[field];
        }
    }
    return copy;
},
otp_Platform_isAssignable = (var$1, var$2) => {
    let $supertypes, $i;
    if (var$1 === var$2)
        return 1;
    $supertypes = var$1.$meta.supertypes;
    $i = 0;
    while ($i < $supertypes.length) {
        if (otp_Platform_isAssignable($supertypes[$i], var$2))
            return 1;
        $i = $i + 1 | 0;
    }
    return 0;
},
otp_Platform_launchThread = $runnable => {
    let var$2, var$3, var$4;
    $runnable = $runnable.$_01;
    if (!jl_Object_isEmptyMonitor($runnable)) {
        var$2 = $runnable.$monitor;
        if (var$2.$owner === null) {
            $runnable = var$2.$enteringThreads;
            if ($runnable !== null && !otp_PlatformQueue_isEmpty$static($runnable)) {
                $runnable = var$2.$enteringThreads.shift();
                if ($runnable !== null && !($runnable instanceof $rt_objcls()))
                    $runnable = otji_JSWrapper_wrap($runnable);
                var$3 = $runnable;
                var$2.$enteringThreads = null;
                $runnable = var$3;
                var$2 = $runnable.$_00;
                var$3 = $runnable.$_1;
                var$4 = $runnable.$_2;
                $runnable = $runnable.$_3;
                jl_Thread_setCurrentThread(var$2);
                var$3 = var$3.$monitor;
                var$3.$owner = var$2;
                var$3.$count = var$3.$count + var$4 | 0;
                var$2 = null;
                otpp_AsyncCallbackWrapper_complete($runnable, var$2);
            }
        }
    }
},
otp_Platform_schedule = (var$1, var$2) => {
    setTimeout(() => {
        otp_Platform_launchThread(var$1);
    }, var$2);
},
otp_Platform_createQueueJs$js_body$_30 = () => {
    return [];
};
function jl_Throwable() {
    let a = this; jl_Object.call(a);
    a.$message = null;
    a.$cause = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
let jl_Throwable_fillInStackTrace = $this => {
    return $this;
},
jl_Throwable_initNativeException = $this => {
    $rt_fillNativeException($this);
},
jl_Throwable_getMessage = $this => {
    return $this.$message;
},
jl_Throwable_getLocalizedMessage = $this => {
    return $this.$message;
},
jl_Throwable_getCause = $this => {
    let var$1;
    var$1 = $this.$cause;
    if (var$1 === $this)
        var$1 = null;
    return var$1;
},
jl_Throwable_toString = $this => {
    let var$1, var$2, var$3, var$4;
    var$1 = $this.$message;
    var$2 = jl_Class_getName(jl_Object_getClass($this));
    if (var$1 === null)
        var$3 = $rt_s(2);
    else {
        var$3 = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_(var$3);
        jl_StringBuilder_append(jl_StringBuilder_append(var$3, $rt_s(3)), var$1);
        var$3 = jl_AbstractStringBuilder_toString(var$3);
    }
    var$4 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$4);
    jl_StringBuilder_append(jl_StringBuilder_append(var$4, var$2), var$3);
    return jl_AbstractStringBuilder_toString(var$4);
},
jl_Exception = $rt_classWithoutFields(jl_Throwable),
jl_Exception__init_ = $this => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
},
jl_Exception__init_0 = () => {
    let var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
},
jl_RuntimeException = $rt_classWithoutFields(jl_Exception),
jl_RuntimeException__init_ = ($this, $message) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
},
jl_RuntimeException__init_2 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_(var_1, var_0);
    return var_1;
},
jl_RuntimeException__init_0 = ($this, $cause) => {
    jl_Throwable_initNativeException($this);
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$cause = $cause;
},
jl_RuntimeException__init_1 = var_0 => {
    let var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
},
jl_ClassCastException = $rt_classWithoutFields(jl_RuntimeException),
ji_Serializable = $rt_classWithoutFields(0),
jl_Comparable = $rt_classWithoutFields(0),
jl_CharSequence = $rt_classWithoutFields(0);
function jl_String() {
    jl_Object.call(this);
    this.$hashCode1 = 0;
}
let jl_String_EMPTY_CHARS = null,
jl_String_EMPTY = null,
jl_String_CASE_INSENSITIVE_ORDER = null,
jl_String__init_1 = ($this, $characters) => {
    $this.$nativeString = $rt_charArrayToString($characters.data, 0, $characters.data.length);
},
jl_String__init_0 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_1(var_1, var_0);
    return var_1;
},
jl_String__init_3 = (var$0, var$1) => {
    var$0.$nativeString = var$1;
},
jl_String__init_2 = var_0 => {
    let var_1 = new jl_String();
    jl_String__init_3(var_1, var_0);
    return var_1;
},
jl_String__init_4 = (var$0, var$1, $offset, $count) => {
    let var$4, var$5;
    var$4 = var$1.data.length;
    if ($offset >= 0 && $count >= 0 && $count <= (var$4 - $offset | 0)) {
        var$0.$nativeString = $rt_charArrayToString(var$1.data, $offset, $count);
        return;
    }
    var$5 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$5);
    $rt_throw(var$5);
},
jl_String__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jl_String();
    jl_String__init_4(var_3, var_0, var_1, var_2);
    return var_3;
},
jl_String_charAt = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$nativeString.length)
        return $this.$nativeString.charCodeAt($index);
    var$2 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
jl_String_length = $this => {
    return $this.$nativeString.length;
},
jl_String_startsWith = ($this, $prefix, $toffset) => {
    let $i, var$4, var$5;
    if (($toffset + $prefix.$nativeString.length | 0) > $this.$nativeString.length)
        return 0;
    $i = 0;
    while ($i < $prefix.$nativeString.length) {
        var$4 = jl_String_charAt($prefix, $i);
        var$5 = $toffset + 1 | 0;
        if (var$4 != jl_String_charAt($this, $toffset))
            return 0;
        $i = $i + 1 | 0;
        $toffset = var$5;
    }
    return 1;
},
jl_String_startsWith0 = ($this, $prefix) => {
    if ($this === $prefix)
        return 1;
    return jl_String_startsWith($this, $prefix, 0);
},
jl_String_indexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo;
    $i = jl_Math_max(0, $fromIndex);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i >= $this.$nativeString.length)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + 1 | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i >= ($this.$nativeString.length - 1 | 0))
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $hi && $this.$nativeString.charCodeAt(($i + 1 | 0)) == $lo)
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_indexOf0 = ($this, $ch) => {
    return jl_String_indexOf($this, $ch, 0);
},
jl_String_lastIndexOf = ($this, $ch, $fromIndex) => {
    let $i, $bmpChar, $hi, $lo;
    $i = jl_Math_min($fromIndex, $this.$nativeString.length - 1 | 0);
    if ($ch < 65536) {
        $bmpChar = $ch & 65535;
        while (true) {
            if ($i < 0)
                return (-1);
            if ($this.$nativeString.charCodeAt($i) == $bmpChar)
                break;
            $i = $i + (-1) | 0;
        }
        return $i;
    }
    $hi = jl_Character_highSurrogate($ch);
    $lo = jl_Character_lowSurrogate($ch);
    while (true) {
        if ($i < 1)
            return (-1);
        if ($this.$nativeString.charCodeAt($i) == $lo) {
            $fromIndex = $i - 1 | 0;
            if ($this.$nativeString.charCodeAt($fromIndex) == $hi)
                break;
        }
        $i = $i + (-1) | 0;
    }
    return $fromIndex;
},
jl_String_lastIndexOf0 = ($this, $ch) => {
    return jl_String_lastIndexOf($this, $ch, $this.$nativeString.length - 1 | 0);
},
jl_String_indexOf1 = ($this, $str, $fromIndex) => {
    let $i, $toIndex, $j;
    $i = jl_Math_max(0, $fromIndex);
    $toIndex = $this.$nativeString.length - $str.$nativeString.length | 0;
    a: while (true) {
        if ($i > $toIndex)
            return (-1);
        $j = 0;
        while (true) {
            if ($j >= $str.$nativeString.length)
                break a;
            if (jl_String_charAt($this, $i + $j | 0) != jl_String_charAt($str, $j))
                break;
            $j = $j + 1 | 0;
        }
        $i = $i + 1 | 0;
    }
    return $i;
},
jl_String_substring = ($this, $beginIndex, $endIndex) => {
    let $length, var$4, var$5;
    $length = $this.$nativeString.length;
    var$4 = $rt_compare($beginIndex, $endIndex);
    if (!var$4)
        return jl_String_EMPTY;
    if (!$beginIndex && $endIndex == $length)
        return $this;
    if ($beginIndex >= 0 && var$4 <= 0 && $endIndex <= $length)
        return jl_String__init_2($this.$nativeString.substring($beginIndex, $endIndex));
    var$5 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$5);
    $rt_throw(var$5);
},
jl_String_substring0 = ($this, $beginIndex) => {
    return jl_String_substring($this, $beginIndex, $this.$nativeString.length);
},
jl_String_toString = $this => {
    return $this;
},
jl_String_toCharArray = $this => {
    let $array, var$2, $i, var$4;
    $array = $rt_createCharArray($this.$nativeString.length);
    var$2 = $array.data;
    $i = 0;
    var$4 = var$2.length;
    while ($i < var$4) {
        var$2[$i] = jl_String_charAt($this, $i);
        $i = $i + 1 | 0;
    }
    return $array;
},
jl_String_valueOf = $obj => {
    return $obj === null ? $rt_s(4) : $obj.$toString();
},
jl_String_valueOf0 = $i => {
    let var$2;
    var$2 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$2);
    return jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(var$2, $i));
},
jl_String_equals = ($this, $other) => {
    let $str;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    return $this.$nativeString !== $str.$nativeString ? 0 : 1;
},
jl_String_hashCode = $this => {
    let $i;
    a: {
        if (!$this.$hashCode1) {
            $i = 0;
            while (true) {
                if ($i >= $this.$nativeString.length)
                    break a;
                $this.$hashCode1 = (31 * $this.$hashCode1 | 0) + $this.$nativeString.charCodeAt($i) | 0;
                $i = $i + 1 | 0;
            }
        }
    }
    return $this.$hashCode1;
},
jl_String_compareTo = ($this, var$1) => {
    let var$2, var$3, var$4;
    a: {
        var$1 = var$1;
        if ($this === var$1)
            var$2 = 0;
        else {
            var$3 = jl_Math_min($this.$nativeString.length, var$1.$nativeString.length);
            var$4 = 0;
            while (true) {
                if (var$4 >= var$3) {
                    var$2 = $this.$nativeString.length - var$1.$nativeString.length | 0;
                    break a;
                }
                var$2 = jl_String_charAt($this, var$4) - jl_String_charAt(var$1, var$4) | 0;
                if (var$2)
                    break;
                var$4 = var$4 + 1 | 0;
            }
        }
    }
    return var$2;
},
jl_String__clinit_ = () => {
    let var$1;
    jl_String_EMPTY_CHARS = $rt_createCharArray(0);
    var$1 = new jl_String;
    var$1.$nativeString = "";
    jl_String_EMPTY = var$1;
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_115_0;
},
jl_Number = $rt_classWithoutFields();
function jl_Integer() {
    jl_Number.call(this);
    this.$value = 0;
}
let jl_Integer_TYPE = null,
jl_Integer_integerCache = null,
jl_Integer__init_0 = ($this, $value) => {
    $this.$value = $value;
},
jl_Integer__init_ = var_0 => {
    let var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
},
jl_Integer_toString = $i => {
    return (jl_AbstractStringBuilder_append1(jl_AbstractStringBuilder__init_1(20), $i, 10)).$toString();
},
jl_Integer_parseInt = ($s, $radix) => {
    if ($s !== null)
        return jl_Integer_parseIntImpl($s, 0, $s.$nativeString.length, $radix);
    $s = new jl_NumberFormatException;
    jl_RuntimeException__init_($s, $rt_s(5));
    $rt_throw($s);
},
jl_Integer_parseIntImpl = ($s, $beginIndex, $endIndex, $radix) => {
    let $negative, var$6, $value, $maxValue, var$9, $digit, var$11, var$12;
    if ($beginIndex == $endIndex) {
        $s = new jl_NumberFormatException;
        jl_RuntimeException__init_($s, $rt_s(6));
        $rt_throw($s);
    }
    if ($radix >= 2 && $radix <= 36) {
        a: {
            $negative = 0;
            $s = $s;
            switch (jl_String_charAt($s, $beginIndex)) {
                case 43:
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                case 45:
                    $negative = 1;
                    var$6 = $beginIndex + 1 | 0;
                    break a;
                default:
            }
            var$6 = $beginIndex;
        }
        $value = 0;
        $maxValue = 1 + (2147483647 / $radix | 0) | 0;
        if (var$6 == $endIndex) {
            $s = new jl_NumberFormatException;
            jl_Exception__init_($s);
            $rt_throw($s);
        }
        while (var$6 < $endIndex) {
            var$9 = var$6 + 1 | 0;
            $digit = jl_String_charAt($s, var$6);
            $digit = $digit >= 48 && $digit <= 57 ? $digit - 48 | 0 : $digit >= 97 && $digit <= 122 ? ($digit - 97 | 0) + 10 | 0 : $digit >= 65 && $digit <= 90 ? ($digit - 65 | 0) + 10 | 0 : (-1);
            if ($digit < 0) {
                var$11 = new jl_NumberFormatException;
                $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                var$12 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$12);
                jl_StringBuilder_append(jl_StringBuilder_append(var$12, $rt_s(7)), $s);
                jl_RuntimeException__init_(var$11, jl_AbstractStringBuilder_toString(var$12));
                $rt_throw(var$11);
            }
            if ($digit >= $radix) {
                var$11 = new jl_NumberFormatException;
                $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                var$12 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$12);
                jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append(var$12, $rt_s(8)), $radix), $rt_s(3)), $s);
                jl_RuntimeException__init_(var$11, jl_AbstractStringBuilder_toString(var$12));
                $rt_throw(var$11);
            }
            if ($value > $maxValue) {
                $s = new jl_NumberFormatException;
                jl_RuntimeException__init_($s, $rt_s(9));
                $rt_throw($s);
            }
            $value = $rt_imul($radix, $value) + $digit | 0;
            if ($value < 0) {
                if (var$9 == $endIndex && $value == (-2147483648) && $negative)
                    return (-2147483648);
                var$11 = new jl_NumberFormatException;
                $s = jl_String_valueOf(jl_String_substring($s, $beginIndex, $endIndex));
                var$12 = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_(var$12);
                jl_StringBuilder_append(jl_StringBuilder_append(var$12, $rt_s(10)), $s);
                jl_RuntimeException__init_(var$11, jl_AbstractStringBuilder_toString(var$12));
                $rt_throw(var$11);
            }
            var$6 = var$9;
        }
        if ($negative)
            $value =  -$value | 0;
        return $value;
    }
    $s = new jl_NumberFormatException;
    var$11 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$11);
    jl_StringBuilder_append1(jl_StringBuilder_append(var$11, $rt_s(11)), $radix);
    jl_RuntimeException__init_($s, jl_AbstractStringBuilder_toString(var$11));
    $rt_throw($s);
},
jl_Integer_parseInt0 = $s => {
    return jl_Integer_parseInt($s, 10);
},
jl_Integer_valueOf = $i => {
    let var$2, var$3;
    if ($i >= (-128) && $i <= 127) {
        a: {
            if (jl_Integer_integerCache === null) {
                jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
                var$2 = 0;
                while (true) {
                    var$3 = jl_Integer_integerCache.data;
                    if (var$2 >= var$3.length)
                        break a;
                    var$3[var$2] = jl_Integer__init_(var$2 - 128 | 0);
                    var$2 = var$2 + 1 | 0;
                }
            }
        }
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_($i);
},
jl_Integer_intValue = $this => {
    return $this.$value;
},
jl_Integer_hashCode = $this => {
    return $this.$value;
},
jl_Integer_equals = ($this, $other) => {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Integer && $other.$value == $this.$value ? 1 : 0;
},
jl_Integer_numberOfLeadingZeros = $i => {
    let $n, var$3;
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i >>> 16 | 0;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    $i = var$3 >>> 8 | 0;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 8;
    var$3 = $i >>> 4 | 0;
    if (!var$3)
        var$3 = $i;
    else
        $n = $n | 4;
    $i = var$3 >>> 2 | 0;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 2;
    if ($i >>> 1 | 0)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer_numberOfTrailingZeros = $i => {
    let $n, var$3;
    if (!$i)
        return 32;
    $n = 0;
    var$3 = $i << 16;
    if (var$3)
        $n = 16;
    else
        var$3 = $i;
    $i = var$3 << 8;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 8;
    var$3 = $i << 4;
    if (!var$3)
        var$3 = $i;
    else
        $n = $n | 4;
    $i = var$3 << 2;
    if (!$i)
        $i = var$3;
    else
        $n = $n | 2;
    if ($i << 1)
        $n = $n | 1;
    return (32 - $n | 0) - 1 | 0;
},
jl_Integer_compareTo = ($this, var$1) => {
    var$1 = var$1;
    return $rt_compare($this.$value, var$1.$value);
},
jl_Integer__clinit_ = () => {
    jl_Integer_TYPE = $rt_cls($rt_intcls);
};
function jl_AbstractStringBuilder() {
    let a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
let jl_AbstractStringBuilder__init_ = $this => {
    jl_AbstractStringBuilder__init_0($this, 16);
},
jl_AbstractStringBuilder__init_2 = () => {
    let var_0 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_(var_0);
    return var_0;
},
jl_AbstractStringBuilder__init_0 = ($this, $capacity) => {
    $this.$buffer = $rt_createCharArray($capacity);
},
jl_AbstractStringBuilder__init_1 = var_0 => {
    let var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_1, var_0);
    return var_1;
},
jl_AbstractStringBuilder_append1 = ($this, $value, $radix) => {
    return jl_AbstractStringBuilder_insert1($this, $this.$length0, $value, $radix);
},
jl_AbstractStringBuilder_insert1 = ($this, $target, $value, $radix) => {
    let $positive, var$5, var$6, $pos, $sz, $posLimit, var$10;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value | 0;
    }
    a: {
        if ($rt_ucmp($value, $radix) < 0) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = $rt_udiv((-1), $radix);
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if ($rt_ucmp(var$10, $value) > 0) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if ($rt_ucmp(var$10, $posLimit) > 0)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $positive = $target;
            else {
                var$5 = $this.$buffer.data;
                $positive = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (!var$10)
                    break a;
                var$5 = $this.$buffer.data;
                $target = $positive + 1 | 0;
                var$5[$positive] = jl_Character_forDigit($rt_udiv($value, var$10), $radix);
                $value = $rt_umod($value, var$10);
                var$10 = $rt_udiv(var$10, $radix);
                $positive = $target;
            }
        }
    }
    return $this;
},
jl_AbstractStringBuilder_append = ($this, $c) => {
    return $this.$insert0($this.$length0, $c);
},
jl_AbstractStringBuilder_insert0 = ($this, $index, $c) => {
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + 1 | 0);
    $this.$buffer.data[$index] = $c;
    return $this;
},
jl_AbstractStringBuilder_ensureCapacity = ($this, $capacity) => {
    let var$2, $newLength, var$4, var$5, var$6;
    var$2 = $this.$buffer.data.length;
    if (var$2 >= $capacity)
        return;
    $newLength = var$2 >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max(var$2 * 2 | 0, 5));
    var$4 = $this.$buffer.data;
    var$5 = $rt_createCharArray($newLength);
    var$6 = var$5.data;
    $capacity = jl_Math_min($newLength, var$4.length);
    var$2 = 0;
    while (var$2 < $capacity) {
        var$6[var$2] = var$4[var$2];
        var$2 = var$2 + 1 | 0;
    }
    $this.$buffer = var$5;
},
jl_AbstractStringBuilder_toString = $this => {
    return jl_String__init_($this.$buffer, 0, $this.$length0);
},
jl_AbstractStringBuilder_append2 = ($this, $chars, $offset, $len) => {
    return $this.$insert1($this.$length0, $chars, $offset, $len);
},
jl_AbstractStringBuilder_insert = ($this, $index, $chars, $offset, $len) => {
    let var$5, var$6, var$7, var$8;
    jl_AbstractStringBuilder_insertSpace($this, $index, $index + $len | 0);
    var$5 = $len + $offset | 0;
    while ($offset < var$5) {
        var$6 = $chars.data;
        var$7 = $this.$buffer.data;
        $len = $index + 1 | 0;
        var$8 = $offset + 1 | 0;
        var$7[$index] = var$6[$offset];
        $index = $len;
        $offset = var$8;
    }
    return $this;
},
jl_AbstractStringBuilder_append0 = ($this, $chars) => {
    return $this.$append3($chars, 0, $chars.data.length);
},
jl_AbstractStringBuilder_insertSpace = ($this, $start, $end) => {
    let var$3, $sz, $i, var$6;
    var$3 = $this.$length0;
    $sz = var$3 - $start | 0;
    $this.$ensureCapacity((var$3 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        var$6 = $this.$buffer.data;
        var$6[$end + $i | 0] = var$6[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
},
jl_Appendable = $rt_classWithoutFields(0),
jl_StringBuilder = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuilder__init_1 = $this => {
    jl_AbstractStringBuilder__init_($this);
},
jl_StringBuilder__init_0 = () => {
    let var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_1(var_0);
    return var_0;
},
jl_StringBuilder__init_ = ($this, $value) => {
    let var$2, var$3;
    $value = $value;
    $this.$buffer = $rt_createCharArray($value.$nativeString.length);
    var$2 = 0;
    while (true) {
        var$3 = $this.$buffer.data;
        if (var$2 >= var$3.length)
            break;
        var$3[var$2] = jl_String_charAt($value, var$2);
        var$2 = var$2 + 1 | 0;
    }
    $this.$length0 = $value.$nativeString.length;
},
jl_StringBuilder__init_2 = var_0 => {
    let var_1 = new jl_StringBuilder();
    jl_StringBuilder__init_(var_1, var_0);
    return var_1;
},
jl_StringBuilder_append = ($this, $obj) => {
    let var$2, var$3;
    var$2 = $this.$length0;
    var$3 = $this;
    $obj = $obj === null ? $rt_s(4) : $obj;
    jl_StringBuilder_insert(var$3, var$2, $obj);
    return $this;
},
jl_StringBuilder_append0 = ($this, $string) => {
    let var$2;
    var$2 = $this.$length0;
    jl_StringBuilder_insert($this, var$2, $string);
    return $this;
},
jl_StringBuilder_append1 = ($this, $value) => {
    jl_AbstractStringBuilder_append1($this, $value, 10);
    return $this;
},
jl_StringBuilder_append2 = ($this, $c) => {
    jl_AbstractStringBuilder_append($this, $c);
    return $this;
},
jl_StringBuilder_delete = ($this, $start, $end) => {
    let var$3, var$4, var$5, var$6, var$7, var$8;
    if ($start >= 0) {
        var$3 = $rt_compare($start, $end);
        if (var$3 <= 0) {
            var$4 = $this.$length0;
            if ($start <= var$4) {
                if (var$3) {
                    if ($end > var$4)
                        $end = var$4;
                    var$5 = var$4 - $end | 0;
                    $this.$length0 = var$4 - ($end - $start | 0) | 0;
                    var$4 = 0;
                    while (var$4 < var$5) {
                        var$6 = $this.$buffer.data;
                        var$3 = $start + 1 | 0;
                        var$7 = $end + 1 | 0;
                        var$6[$start] = var$6[$end];
                        var$4 = var$4 + 1 | 0;
                        $start = var$3;
                        $end = var$7;
                    }
                }
                return $this;
            }
        }
    }
    var$8 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$8);
    $rt_throw(var$8);
},
jl_StringBuilder_deleteCharAt = ($this, $index) => {
    let var$2, var$3, var$4, var$5;
    if ($index >= 0) {
        var$2 = $this.$length0;
        if ($index < var$2) {
            var$2 = var$2 - 1 | 0;
            $this.$length0 = var$2;
            while ($index < var$2) {
                var$3 = $this.$buffer.data;
                var$4 = $index + 1 | 0;
                var$3[$index] = var$3[var$4];
                $index = var$4;
            }
            return $this;
        }
    }
    var$5 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$5);
    $rt_throw(var$5);
},
jl_StringBuilder_insert1 = ($this, var$1, var$2, var$3, var$4) => {
    jl_AbstractStringBuilder_insert($this, var$1, var$2, var$3, var$4);
    return $this;
},
jl_StringBuilder_append3 = ($this, var$1, var$2, var$3) => {
    jl_AbstractStringBuilder_append2($this, var$1, var$2, var$3);
    return $this;
},
jl_StringBuilder_length = $this => {
    return $this.$length0;
},
jl_StringBuilder_toString = $this => {
    return jl_AbstractStringBuilder_toString($this);
},
jl_StringBuilder_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuilder_insert0 = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert0($this, var$1, var$2);
    return $this;
},
jl_StringBuilder_insert = ($this, var$1, var$2) => {
    let var$3, var$4, var$5, var$6;
    if (var$1 >= 0 && var$1 <= $this.$length0) {
        a: {
            if (var$2 === null)
                var$2 = $rt_s(4);
            else if (var$2.$nativeString.length ? 0 : 1)
                break a;
            var$3 = $this.$length0 + var$2.$nativeString.length | 0;
            jl_AbstractStringBuilder_ensureCapacity($this, var$3);
            var$4 = $this.$length0 - 1 | 0;
            while (var$4 >= var$1) {
                $this.$buffer.data[var$4 + var$2.$nativeString.length | 0] = $this.$buffer.data[var$4];
                var$4 = var$4 + (-1) | 0;
            }
            $this.$length0 = $this.$length0 + var$2.$nativeString.length | 0;
            var$3 = 0;
            while (var$3 < var$2.$nativeString.length) {
                var$5 = $this.$buffer.data;
                var$6 = var$1 + 1 | 0;
                var$5[var$1] = jl_String_charAt(var$2, var$3);
                var$3 = var$3 + 1 | 0;
                var$1 = var$6;
            }
        }
        return $this;
    }
    var$2 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
otcir_FieldInfo = $rt_classWithoutFields(),
otcir_MethodInfo = $rt_classWithoutFields(),
otcir_ClassList = $rt_classWithoutFields(),
r_Main = $rt_classWithoutFields(),
r_Main_$callClinit = () => {
    r_Main_$callClinit = $rt_eraseClinit(r_Main);
    r_Main__clinit_();
},
r_Main_main = $args => {
    r_Main_$callClinit();
},
r_Main_engineCount$exported$0 = () => {
    r_Main_$callClinit();
    return "3";
},
r_Main_engineInfo$exported$1 = var$1 => {
    let var$2;
    r_Main_$callClinit();
    var$2 = var$1;
    return $rt_ustr(!var$2 ? $rt_s(12) : var$2 != 1 ? $rt_s(13) : $rt_s(14));
},
r_Main_engineMatch$exported$2 = (var$1, var$2, var$3) => {
    let var$4, var$5, $$je;
    r_Main_$callClinit();
    var$4 = var$1;
    var$1 = $rt_str(var$2);
    var$2 = $rt_str(var$3);
    if (var$4) {
        var$4 = var$4 != 1 ? 0 : 65535;
        a: {
            try {
                var$1 = dba_RunAutomaton_newMatcher(dba_RunAutomaton__init_(dba_RegExp_toAutomaton0(dba_RegExp__init_0(var$1, var$4))), var$2);
                if (!dba_AutomatonMatcher_find(var$1)) {
                    var$1 = $rt_s(15);
                    break a;
                }
                var$4 = dba_AutomatonMatcher_start(var$1);
                var$5 = dba_AutomatonMatcher_end(var$1);
                var$1 = jl_StringBuilder__init_0();
                jl_StringBuilder_append(jl_StringBuilder_append1(jl_StringBuilder_append2(jl_StringBuilder_append1(jl_StringBuilder_append(var$1, $rt_s(16)), var$4), 44), var$5), $rt_s(17));
                var$1 = jl_StringBuilder_toString(var$1);
                break a;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_Throwable) {
                } else {
                    throw $$e;
                }
            }
            var$1 = $rt_s(18);
        }
    } else
        b: {
            c: {
                try {
                    var$2 = jur_Pattern_matcher(jur_Pattern_compile(var$1), var$2);
                    if (!jur_Matcher_find0(var$2)) {
                        var$1 = $rt_s(15);
                        break b;
                    }
                    var$3 = jl_StringBuilder__init_2($rt_s(19));
                    var$4 = 0;
                    while (var$4 <= jur_Matcher_groupCount(var$2)) {
                        if (var$4 > 0)
                            jl_StringBuilder_append2(var$3, 44);
                        var$5 = jur_Matcher_start(var$2, var$4);
                        if (var$5 < 0)
                            jl_StringBuilder_append0(var$3, $rt_s(4));
                        else
                            jl_StringBuilder_append2(jl_StringBuilder_append1(jl_StringBuilder_append2(jl_StringBuilder_append1(jl_StringBuilder_append2(var$3, 91), var$5), 44), jur_Matcher_end(var$2, var$4)), 93);
                        var$4 = var$4 + 1 | 0;
                    }
                    var$1 = jl_StringBuilder_toString(jl_StringBuilder_append0(var$3, $rt_s(20)));
                    break b;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jur_PatternSyntaxException) {
                    } else if ($$je instanceof jl_Throwable) {
                        var$1 = $$je;
                        break c;
                    } else {
                        throw $$e;
                    }
                }
                var$1 = $rt_s(18);
                break b;
            }
            var$2 = var$1.$message;
            if (var$2 !== null)
                var$1 = var$2;
            var$3 = $rt_str(JSON.stringify($rt_ustr(jl_String_valueOf(var$1))));
            var$1 = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_(var$1);
            jl_AbstractStringBuilder_append(jl_StringBuilder_append(jl_StringBuilder_append(var$1, $rt_s(21)), var$3), 125);
            var$1 = jl_AbstractStringBuilder_toString(var$1);
        }
    return $rt_ustr(var$1);
},
r_Main__clinit_ = () => {
    jl_String__clinit_();
    jl_Integer__clinit_();
    jl_Character__clinit_();
    dba_RegExp__clinit_();
    jur_AbstractSet__clinit_();
    dba_RegExp$Kind__clinit_();
    dba_Automaton__clinit_();
    jur_AbstractCharClass$PredefinedCharacterClasses__clinit_();
    jur_AbstractCharClass__clinit_();
    ju_TreeSet__clinit_();
    ju_Comparator$NaturalOrder__clinit_();
    jl_Boolean__clinit_();
    ju_Hashtable__clinit_();
    jl_Thread__clinit_();
},
otci_IntegerUtil = $rt_classWithoutFields(),
ju_Comparator = $rt_classWithoutFields(0),
jl_String$_clinit_$lambda$_115_0 = $rt_classWithoutFields();
function jl_Character() {
    jl_Object.call(this);
    this.$value1 = 0;
}
let jl_Character_TYPE = null,
jl_Character_digitMapping = null,
jl_Character_upperCaseMapping = null,
jl_Character_lowerCaseMapping = null,
jl_Character_classMapping = null,
jl_Character_characterCache = null,
jl_Character_$$metadata$$0 = null,
jl_Character_$$metadata$$1 = null,
jl_Character_$$metadata$$3 = null,
jl_Character_$$metadata$$4 = null,
jl_Character__init_0 = ($this, $value) => {
    $this.$value1 = $value;
},
jl_Character__init_ = var_0 => {
    let var_1 = new jl_Character();
    jl_Character__init_0(var_1, var_0);
    return var_1;
},
jl_Character_valueOf = $value => {
    let var$2, $result;
    var$2 = jl_Character_characterCache.data;
    if ($value >= var$2.length)
        return jl_Character__init_($value);
    $result = var$2[$value];
    if ($result === null) {
        $result = jl_Character__init_($value);
        jl_Character_characterCache.data[$value] = $result;
    }
    return $result;
},
jl_Character_equals = ($this, $other) => {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Character && $other.$value1 == $this.$value1 ? 1 : 0;
},
jl_Character_hashCode = $this => {
    return $this.$value1;
},
jl_Character_toString = $c => {
    let var$2, var$3;
    var$2 = new jl_String;
    var$3 = $rt_createCharArray(1);
    var$3.data[0] = $c;
    jl_String__init_1(var$2, var$3);
    return var$2;
},
jl_Character_isSupplementaryCodePoint = $codePoint => {
    return $codePoint >= 65536 && $codePoint <= 1114111 ? 1 : 0;
},
jl_Character_isHighSurrogate = $ch => {
    return ($ch & 64512) != 55296 ? 0 : 1;
},
jl_Character_isLowSurrogate = $ch => {
    return ($ch & 64512) != 56320 ? 0 : 1;
},
jl_Character_isSurrogatePair = ($high, $low) => {
    return jl_Character_isHighSurrogate($high) && jl_Character_isLowSurrogate($low) ? 1 : 0;
},
jl_Character_toCodePoint = ($high, $low) => {
    return (($high & 1023) << 10 | $low & 1023) + 65536 | 0;
},
jl_Character_highSurrogate = $codePoint => {
    return (55296 | ($codePoint - 65536 | 0) >> 10 & 1023) & 65535;
},
jl_Character_lowSurrogate = $codePoint => {
    return (56320 | $codePoint & 1023) & 65535;
},
jl_Character_toLowerCase = $ch => {
    return jl_Character_toLowerCase0($ch) & 65535;
},
jl_Character_toLowerCase0 = $ch => {
    if (jl_Character_lowerCaseMapping === null) {
        if (jl_Character_$$metadata$$0 === null)
            jl_Character_$$metadata$$0 = jl_Character_acquireLowerCaseMapping$$create();
        jl_Character_lowerCaseMapping = otciu_UnicodeHelper_createCharMapping(otciu_UnicodeHelper_decodeCaseMapping((jl_Character_$$metadata$$0.value !== null ? $rt_str(jl_Character_$$metadata$$0.value) : null)));
    }
    return jl_Character_mapChar(jl_Character_lowerCaseMapping, $ch);
},
jl_Character_toUpperCase = $ch => {
    return jl_Character_toUpperCase0($ch) & 65535;
},
jl_Character_toUpperCase0 = $codePoint => {
    if (jl_Character_upperCaseMapping === null) {
        if (jl_Character_$$metadata$$1 === null)
            jl_Character_$$metadata$$1 = jl_Character_acquireUpperCaseMapping$$create();
        jl_Character_upperCaseMapping = otciu_UnicodeHelper_createCharMapping(otciu_UnicodeHelper_decodeCaseMapping((jl_Character_$$metadata$$1.value !== null ? $rt_str(jl_Character_$$metadata$$1.value) : null)));
    }
    return jl_Character_mapChar(jl_Character_upperCaseMapping, $codePoint);
},
jl_Character_mapChar = ($table, $codePoint) => {
    let $binSearchTable, var$4, var$5, var$6, $index, var$8;
    $binSearchTable = $table.$fastTable.data;
    if ($codePoint < $binSearchTable.length)
        return $codePoint + $binSearchTable[$codePoint] | 0;
    $binSearchTable = $table.$binarySearchTable.data;
    var$4 = 0;
    var$5 = $binSearchTable.length;
    var$6 = (var$5 / 2 | 0) - 1 | 0;
    a: {
        while (true) {
            $index = (var$4 + var$6 | 0) / 2 | 0;
            var$8 = $rt_compare($binSearchTable[$index * 2 | 0], $codePoint);
            if (!var$8)
                break;
            if (var$8 <= 0) {
                var$4 = $index + 1 | 0;
                if (var$4 > var$6)
                    break a;
            } else {
                $index = $index - 1 | 0;
                if ($index < var$4)
                    break a;
                var$6 = $index;
            }
        }
    }
    if ($index >= 0) {
        $index = $index * 2 | 0;
        if ($index < var$5)
            return $codePoint + $binSearchTable[$index + 1 | 0] | 0;
    }
    return 0;
},
jl_Character_digit = ($ch, $radix) => {
    let var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12;
    if ($radix >= 2 && $radix <= 36) {
        if (jl_Character_digitMapping === null) {
            if (jl_Character_$$metadata$$3 === null)
                jl_Character_$$metadata$$3 = jl_Character_obtainDigitMapping$$create();
            var$3 = (jl_Character_$$metadata$$3.value !== null ? $rt_str(jl_Character_$$metadata$$3.value) : null);
            var$4 = otci_CharFlow__init_(jl_String_toCharArray(var$3));
            var$5 = otci_Base46_decodeUnsigned(var$4);
            var$6 = $rt_createIntArray(var$5 * 2 | 0);
            var$7 = var$6.data;
            var$8 = 0;
            var$9 = 0;
            var$10 = 0;
            var$11 = 0;
            while (var$11 < var$5) {
                var$9 = var$9 + otci_Base46_decode(var$4) | 0;
                var$10 = var$10 + otci_Base46_decode(var$4) | 0;
                var$12 = var$8 + 1 | 0;
                var$7[var$8] = var$9;
                var$8 = var$12 + 1 | 0;
                var$7[var$12] = var$10;
                var$11 = var$11 + 1 | 0;
            }
            jl_Character_digitMapping = var$6;
        }
        var$6 = jl_Character_digitMapping.data;
        var$8 = 0;
        var$9 = (var$6.length / 2 | 0) - 1 | 0;
        a: {
            while (var$9 >= var$8) {
                var$10 = (var$8 + var$9 | 0) / 2 | 0;
                var$11 = var$10 * 2 | 0;
                var$5 = $rt_compare($ch, var$6[var$11]);
                if (var$5 > 0)
                    var$8 = var$10 + 1 | 0;
                else {
                    if (var$5 >= 0) {
                        $ch = var$6[var$11 + 1 | 0];
                        break a;
                    }
                    var$9 = var$10 - 1 | 0;
                }
            }
            $ch = (-1);
        }
        if ($ch >= $radix)
            $ch = (-1);
    } else
        $ch = (-1);
    return $ch;
},
jl_Character_forDigit = ($digit, $radix) => {
    if ($radix >= 2 && $radix <= 36 && $digit >= 0 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
},
jl_Character_toChars = $codePoint => {
    let var$2, var$3, var$4;
    if (!($codePoint >= 0 && $codePoint <= 1114111 ? 1 : 0)) {
        var$2 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    if ($codePoint < 65536) {
        var$3 = $rt_createCharArray(1);
        var$3.data[0] = $codePoint & 65535;
        return var$3;
    }
    var$3 = $rt_createCharArray(2);
    var$4 = var$3.data;
    var$4[0] = jl_Character_highSurrogate($codePoint);
    var$4[1] = jl_Character_lowSurrogate($codePoint);
    return var$3;
},
jl_Character_getType = $codePoint => {
    let $u, $range, $classes, var$5, var$6, var$7, var$8, $i, var$10, var$11, var$12, var$13, $l, var$15;
    if ($codePoint > 0 && $codePoint <= 65535 ? 1 : 0) {
        $u = $codePoint & 65535;
        if (!jl_Character_isHighSurrogate($u) && !jl_Character_isLowSurrogate($u) ? 0 : 1)
            return 19;
    }
    if (jl_Character_classMapping === null) {
        if (jl_Character_$$metadata$$4 === null)
            jl_Character_$$metadata$$4 = jl_Character_obtainClasses$$create();
        $range = (jl_Character_$$metadata$$4.value !== null ? $rt_str(jl_Character_$$metadata$$4.value) : null);
        $classes = $rt_createArray(otciu_UnicodeHelper$Range, 16384);
        var$5 = $classes.data;
        var$6 = $rt_createByteArray(16384);
        var$7 = var$6.data;
        var$8 = 0;
        $i = 0;
        var$10 = 0;
        var$11 = 0;
        while (var$11 < $range.$nativeString.length) {
            var$12 = otciu_UnicodeHelper_decodeByte(jl_String_charAt($range, var$11));
            if (var$12 == 64) {
                var$11 = var$11 + 1 | 0;
                var$12 = otciu_UnicodeHelper_decodeByte(jl_String_charAt($range, var$11));
                var$13 = 0;
                $l = 1;
                var$15 = 0;
                while (var$15 < 3) {
                    var$11 = var$11 + 1 | 0;
                    var$13 = var$13 | $rt_imul($l, otciu_UnicodeHelper_decodeByte(jl_String_charAt($range, var$11)));
                    $l = $l * 64 | 0;
                    var$15 = var$15 + 1 | 0;
                }
            } else if (var$12 < 32)
                var$13 = 1;
            else {
                var$12 = (var$12 - 32 | 0) << 24 >> 24;
                var$11 = var$11 + 1 | 0;
                var$13 = otciu_UnicodeHelper_decodeByte(jl_String_charAt($range, var$11));
            }
            if (!var$12 && var$13 >= 128) {
                if (var$8 > 0) {
                    $u = $i + 1 | 0;
                    var$5[$i] = otciu_UnicodeHelper$Range__init_(var$10, var$10 + var$8 | 0, ju_Arrays_copyOf0(var$6, var$8));
                    $i = $u;
                }
                var$10 = var$10 + (var$8 + var$13 | 0) | 0;
                var$8 = 0;
            } else {
                $u = var$8 + var$13 | 0;
                if ($u < var$7.length)
                    $l = $i;
                else {
                    $l = $i + 1 | 0;
                    var$5[$i] = otciu_UnicodeHelper$Range__init_(var$10, var$10 + var$8 | 0, ju_Arrays_copyOf0(var$6, var$8));
                    var$10 = var$10 + $u | 0;
                    var$8 = 0;
                }
                while (true) {
                    $u = var$13 + (-1) | 0;
                    if (var$13 <= 0)
                        break;
                    $i = var$8 + 1 | 0;
                    var$7[var$8] = var$12;
                    var$8 = $i;
                    var$13 = $u;
                }
                $i = $l;
            }
            var$11 = var$11 + 1 | 0;
        }
        jl_Character_classMapping = ju_Arrays_copyOf($classes, $i);
    }
    $classes = jl_Character_classMapping.data;
    $l = 0;
    $u = $classes.length - 1 | 0;
    while ($l <= $u) {
        $i = ($l + $u | 0) / 2 | 0;
        $range = $classes[$i];
        if ($codePoint >= $range.$end1)
            $l = $i + 1 | 0;
        else {
            $u = $range.$start3;
            if ($codePoint >= $u)
                return $range.$data0.data[$codePoint - $u | 0];
            $u = $i - 1 | 0;
        }
    }
    return 0;
},
jl_Character_isLetterOrDigit = $codePoint => {
    a: {
        switch (jl_Character_getType($codePoint)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 9:
                break;
            case 6:
            case 7:
            case 8:
                break a;
            default:
                break a;
        }
        return 1;
    }
    return 0;
},
jl_Character_isIdentifierIgnorable = $codePoint => {
    a: {
        if (!($codePoint >= 0 && $codePoint <= 8) && !($codePoint >= 14 && $codePoint <= 27)) {
            if ($codePoint < 127)
                break a;
            if ($codePoint > 159)
                break a;
        }
        return 1;
    }
    return jl_Character_getType($codePoint) != 16 ? 0 : 1;
},
jl_Character_isSpaceChar = $codePoint => {
    switch (jl_Character_getType($codePoint)) {
        case 12:
        case 13:
        case 14:
            break;
        default:
            return 0;
    }
    return 1;
},
jl_Character_isWhitespace = $codePoint => {
    switch ($codePoint) {
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 28:
        case 29:
        case 30:
        case 31:
            break;
        case 160:
        case 8199:
        case 8239:
            return 0;
        default:
            return jl_Character_isSpaceChar($codePoint);
    }
    return 1;
},
jl_Character_compareTo = ($this, var$1) => {
    var$1 = var$1;
    return $this.$value1 - var$1.$value1 | 0;
},
jl_Character__clinit_ = () => {
    jl_Character_TYPE = $rt_cls($rt_charcls);
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
},
jl_Character_acquireLowerCaseMapping$$create = () => {
    return {"value" : "TW  H#F#U 4%F#O #F#/ d%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a1# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #<+#%# #%# #%# \'.3#%# #%# #{1#%# #w1%%# %J\'#k1#o1#%# #w1#!3# #23#*3#%# \'23#:3# #>3#%# #%# #%# #N3#%# #N3# %%# #N3#%# #J3%%# #%# #R3#%# \'%# /)#%# #)#%# #)#%# #%# #%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%# #%# %)#%# #%# #8)#L%#%# #%# #%# #"
    + "%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #a+# #%# #%# #%# #%# #%# #%# #%# #%# #%# /B45#%# #,/#645# %%# #P1#!\'#*\'#%# #%# #%# #%# #%# <-%# #%# \'%# 1&++ %_## #Z#)k%%g%% #F#W hA# 1%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# +]%# %%# #?#%# %a+\'N\'AF#b &#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #^#%# #%# #%# #%# #%# #%# #%# %%# #%# #%# #%# #%# #%# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# %*%r iB#oq-&# _?gejg#A1 a$#%# -mo%&# {-%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3,4/# #%# #%"
    + "# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 3C1 1C1 1C1 1C1 1C1 3C/ 1C1 QC1 1C1 1C1 1C%8\'%G# 7i\')G# 7C%D)\' 7C%u)%?# 7X+%P+%G# L-q*/# \'Pw/#8m/# -6## |bA G%# kC.#U !r*%&# &#%# #,05#qX\'#H.5# %%# #%# #%# #e25#D05#q25#m25# #%# %%# 1865%%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# "
    + "#%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 1%# #%# )%# (a=%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# G%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# y%%# #%# #%# #%# #%# #%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #%# 5%# #%# #4Fd#%# #%# #%# #%# #%# )%# #<{p# %%# #%# \'%# #%# #%# #%# #%# #%# #%# #%# #%# #%# #P}p#}}p#m}p#D}p#P}p# #@yp#D{p#Lyp#Br#%# #%# #%"
    + "# #%# #%# #%# #%# #%# #,%#L}p#LJd#%# #%# #$$r#%# \'%# +%# #%# #%# #P6rM \'%# ,T5F#U TUg#r {%g#r >\'c#p Lnk%F# .\'F#S HB#F#b o@5F#b Jo=N#f "};
},
jl_Character_acquireUpperCaseMapping$$create = () => {
    return {"value" : "NY  ,%H#U :#>b# vH#O #H#/:+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #,5# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'#(;#N1# %\'# #\'# %\'# \'\'# +\'# %6)# \'\'#*/#N6r# %_+# %\'# #\'# #\'# %\'# )\'# %\'# \'\'# #\'# %\'# \'\'# #J%# +\'#+# #\'#+# #\'#+# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#L\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'#+# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# %665% #\'# )\'# #\'# #\'# #\'# #\'#o25#c25#k25#03#}1# #y1% #m1# #q1#{}p# \'y1#k}p# #$3#!$r#:{p#N}p# #,3#43#N}p#*05#B}p# %43# #B05#<3# %@3# /F.5# %P3# #J}p#P3# \'B{p#P3#$\'#L3%,\'# +T3# 5Jyp#>yp# Z\'_\'# x\'# #\'# \'\'\' #_+\' !#a##]#\' #H#CD##H#3m%#i%% #e%#P%# \'(%#D%#C# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#i\'#P\'#=#(+# #4)# %\'# %\'# .#H#bP\'A #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 3\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'"
    + "# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# %\'# #\'# #\'# #\'# #\'# #\'# #\'#`# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'% &#,%n mB#ko%x %ko%\' RAC1 >$#yu+#uu+#Pu+#Hu+%Lu+#0u+#io+#>@d# #\'- (+2Fd# \'oX\'# AJJd# N%\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#"
    + " #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# +X%# +\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'#A1 1A1 1A1 1A1 1A1 3A# #A# #A# #A% /A1 16\'%g\')B)%V+%s)%N+)A1 1A1 1A1 1A% #E# 5<m-# )E# 9A% =A% \'=# ;E# R/8## ddA )\'# @E0#U Nr,%&# #\'# \'D45#845# #\'#"
    + " #\'# #\'# -\'# %\'# 5\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 1\'# #\'# )\'- /qq-&# i]=\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# G\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# y%\'# #\'# #\'# #\'# #\'# #\'# #\'# \'\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #"
    + "\'# #\'# #\'# #\'# #\'# #\'# #\'# 5\'# #\'# %\'# #\'# #\'# #\'# #\'# )\'# )\'# #\'#*%# %\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# 7\'# #\'# #\'# #\'# #\'# #\'# #\'# #\'# )\'# #\'# %\'\' #\'% )\'# #\'# #\'# U\'# cEDr# Yiejg# e*5H#U eUi#r {%i#r <\'e#t {nm%:# V%H#^ >B#H#b o@5H#b No=P#f "};
},
jl_Character_obtainDigitMapping$$create = () => {
    return {"value" : "kE*% %%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%_H#T#%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%{CG%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%6)G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%!i#G"
    + "%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%*;G%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%:/G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%{/G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%R@dG%%%%%%%%%%%%%%%%%%R[G%%%%%%%%%%%%%%%%%%c#G%%%%%%%%%%%%%%%%%%_1G%%%%%%%%%%%%%%%%%%!#G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%cCG%%%%%%%%%%%%%%%%%%o*IG%%%%%%%%%%%%%%%%%%A%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%=,#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%c:#T#%%%%%%%%%%%%%%%%%%w&%G%%%%%"
    + "%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%_fG%%%%%%%%%%%%%%%%%%Z+G%%%%%%%%%%%%%%%%%%_%G%%%%%%%%%%%%%%%%%%>-G%%%%%%%%%%%%%%%%%%.9G%%%%%%%%%%%%%%%%%%w=G%%%%%%%%%%%%%%%%%%2+G%%%%%%%%%%%%%%%%%%>AG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%=G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%B\'G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%N)G%%%%%%%%%%%%%%%%%%oYG%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%g5G%%%%%%%%%%%%%%%%%%*\'G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%ow?G%%%%%%%%%%%%%%%%%%s4%G%%%%%%%%%%%%%%%%%%k\'G%%%%%%%%%%%%%%%%%%s+G%%%%%%%%%%%%%%"
    + "%%%%:OG%%%%%%%%%%%%%%%%%%V*OG%%%%%%%%%%%%%%%%%%VZ%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%%G%%%%%%%%%%%%%%%%%%!8%G%%%%%%%%%%%%%%%%%%FEG%%%%%%%%%%%%%%%%%%sKG%%%%%%%%%%%%%%%%%%k5G%%%%%%%%%%%%%%%%%%.lG%%%%%%%%%%%%%%%%%%wN)G%%%%%%%%%%%%%%%%%%"};
},
jl_Character_obtainClasses$$create = () => {
    return {"value" : "PA-Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:PB-9[%=9<=&>:1=<=:L#<#Y#<,&?L$9B8:B(C9:C)!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!C$B##!#B##B$C#B%#B##B$C$B##B##!#!#B##!C#!#B##B$#!#B#C#&!C$F%!$#!$#!$#!#!#!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!C#!$#!#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C(B##B#C#!#B%#!#!#!#!Cg&C<E3]%E-]/E&](%<%]2b\'Q! !#!#%<!#A#%C$9!A%]#!9B$ ! B##B2 B*CD!C#B$C$!#!#!#!#!#!#!#!#!#!#!#!C&!#:!#B#C#BTCQ!#!#!#!#"
    + "!#!#!#!#!#!#!#!#!#!#!#!#!#=G&H#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#B##!#!#!#!#!#!C#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!# BGA#%Y\'CJ95A#^#; GN5\'9G#9G#9\'A)F<A%F%Y#A,Q\'Z$Y#;Y#^#G,91Y$FA%F+G6J+Y%F#\'b&D! 9&G(1=G\'E#G#=G%F#J+F$^#&Y/ 1&\'F?G<A#b&:! G,&A/J+FBG*E#=Y$%A#\'[#F7G%%G*%G$%G&A#Y0 F:G$A#9 F,A&F9<F\' Q#A&G*FJ%G91GA)FW\')\'&I$G)I%\'I#&G(F+G#Y#J+9%F0\'I# F)A#F#A#F7 F( &A$F%A#\'&I$G%A#I#A#I#\'&A))A%F# F$G#A#J+F#[#L\'=;&9\'A#G#) F\'A%F#A#F7 F( F# F#"
    + " F#A#\' I$G#A%G#A#G$A$\'A(F% &A(J+G#F$\'9A+G#) F* F$ F7 F( F# F&A#\'&I$G& G#) I#\'A#&A0F#G#A#J+9;A(&G\' \'I# F)A#F#A#F7 F( F# F&A#\'&)\')G%A#I#A#I#\'A(G#)A%F# F$G#A#J+=&L\'A+\'& F\'A$F$ F%A$F# & F#A$F#A$F$A$F-A%I#\'I#A$I$ I$\'A#&A\')A/J+L$^\';=A&\'I$\'F) F$ F8 F1A#\'&G$I% G$ G%A(G# F$A#&A#F#G#A#J+A(9L(=&\'I#9F) F$ F8 F+ F&A#\'&)\'I& \'I# I#G#A(I#A\'F# F#G#A#J+ F#)A-G#I#F* F$ FJG#&I$G% I$ I$\'&=A%F$)L(F$G#A#J+L*=F\' \'I# F3A$F9 F* &A#F(A$\'A%I$G$ \' I)A\'J+A#I#9A-FQ\'F#G(A%;F\'%G)9J+Y#AFF# & F& F9 & F+\'F#G*&A#F& % G( J+A#F%AA&^$Y0=9^$G#^\'J+"
    + "L+=\'=\'=\'6767I#F) FEA%G/)G&9G#F&G, GE ^)\'^\' ^#Y&^%Y#AFFLI#G%)G\')G#I#G#&J+Y\'F\'I#G#F%G$&I$F#I(F$G%F.\'I#G#I\'\'&)J+I$\'^#BG !A&!A#CL9%C$b&*&  F%A#F( & F%A#FJ F%A#FB F%A#F( & F%A#F0 FZ F%A#FeA#G$Y*L5A$F1^+A\'b!7! A#C\'A#5b&M* =9F2-F;67A$FmY$K$F)A(F3G$)A*F4G#)Y#A*F3G#A-F. F$ G#A-FUG#)G(I)\'I#G,Y$%Y$;&\'A#J+A\'L+A\'Y\'5Y%G$1\'J+A\'FD%FVA(F&G#FC\'&A&FhA+F@ G$I%G#I$A%I#\'I\'G$A%=A$Y#J+F?A#F&A,FMA%F;A\'J+,A$^CF8G#I#\'A#Y#FV)\')G( \')\'I#G)I\'G+A#\'J+A\'J+A\'Y(%Y\'A#G/(G1ARG%)FP\')G&)\'I&\'I#F) Y#J+Y(^+G*^*Y$G#)F?)G%I#G#)G$F#J+FM\')G#I$\')G$I#A)Y%"
    + "FEI)G)I#G#A$Y&J+A$F$J+F?E\'Y#C*!#A&BLA#B$Y)A)G$9G.)G(F%\'F\'\'F#)G#&A&CMEaC.%CCEFGb!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C*B)C\'A#B\'A#C)B)C)B)C\'A#B\'A#C) ! ! ! !C)B)C/A#C)D)C)D)C)D)C& C#B%$<#]$C$ C#B%$]$C%A#C#B% ]$C)B&]$A#C$ C#B%$]# M,Q&U\'Y#>?6_#?6>Y)./Q&-Y*>?Y%X#Y$:67Y,:98Y+-Q& Q+,%A#L\'Z$67%L+Z$67 E.A$[BA0"
    + "G.H%\'H$G-A0^#!^%!^##B$C#B$#=!^#:B&^\'!=!=!=B%=#B%#F%#^#C#B#Z&!C%=:^##=L1KD!#K%,^#A%Z&^&Z#^%:^#:^#:^(:^@Z#^#:=:^@b:-% ^)6767^5Z#^(67b=2! :^?Z:^IZ\'^jA7^,A6L^^pL7b=X# :^*:^WZ)b=P! :b=Y$ 67676767676767L?^MZ&67Z@6767676767Z1b= % b:$# 6767676767676767676767Za6767ZA67b:#% ^QZ6^#Z\'^HA#^A b=J! BQCQ!#B$C#!#!#!#B%#!C#!C\'E#B$#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!C#^\'!#!#G$!#A&Y%,Y#CG #A&#A#FYA(%9A/\'F8A*F( F( F( F( F( F( F( F( GAY#>?>?Y$>?9>?Y*5Y#59>?Y#>?6767676"
    + "7Y&%Y+U#Y%596Y.^#Y$676767675AC^; b=:! A-b=7$ A;^1-Y$=%&+6767676767^#6767676756W#=K*G%I#5E&^#K$%&9^# b&7! A#G#]#E#&5b&;! 9E$&A&FL b&?!  ^#L%^+FA^GA*=F1^@ L+^?L)=L0^AL+^HL0b= & &b `G!&^b&b   %b `(!F7%b&X2 A$^XA*FIE\'Y#b&-% %Y$F1J+F#A5!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#&\'H$9G+9%!#!#!#!#!#!#!#!#!#!#!#!#!#!#E#G#FhK+G#Y\'A)]8E*]#!#!#!#!#!#!#!C$!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#!#%C)!#!#B##!#!#!#!#%]#!#!#&!#!C$!#!#!#!#!#!#!#!#!#!#B&#B&#!#!#!#!#!#!#!#B%#!#B##A#!# # #!#!#!#!A6E$!#&"
    + "E##F(\'F$\'F%\'F8I#G#)^%\'A$L\'^#;=A\'FUY%A)I#FSI1G#A)Y#J+A\'G3F\'Y$&9F#\'J+F=G)Y#F8G,I#A,9F>A$G$)FP\'I#G%I#G#I$Y. %J+A%Y#F&\'%F*J+F& FJG\'I#G#I#G#A*F$\'F)\')A#J+A#Y%F1%F\'^$&)\')FS\'&G$F#G#F&G#&\'&A9F#%Y#F,)G#I#Y#&E#)\'A+F\'A#F\'A#F\'A*F( F( CL<E%C*%]#A%b#1! FDI#\'I#\'I#9)\'A#J+A\'&b CO#&A-F8A%FRA%4b `. T#b `! T#b `0 43b `D!3b&O& A#b&K! AGC(A-C&A&&\'F+:F. F& & F# F# b&M! ]2A1b&L& 76^1FbA#FWA(=AAF-;^$G1Y(679A\'G19U#X#6767676767676767Y#67Y%X$Y$ Y%5676767Y$:5Z$ 9;Y#A%F& b&(# A#1 Y$;Y$679:95Y#J+Y#Z$Y#B;697<8<C;6:7:67967Y#F+%FNE#F@A$F\'A#F"
    + "\'A#F\'A#F$A$[#:<=[# =Z%^#A+Q$^#A#F- F; F4 F# F0A#F/ACb&]! A&Y$A%LNA$^*KVL%^2L#^$ ^.A$=AP^N\'b ## F>A$FRA0\'L<A%FAL%A*F5+F)+A&FGG&A&F? 9FEA%F)9K&AKBICIFpA#J+A\'BEA%CEA%FIA)FUA,9B, B0 B( B# C, C0 C( C#A$FUA-b&X% A*F7A+F)A9E\' EK E*AgF\'A#& FM F#A$&A#F8 9L)F8^#L(F@A)L*AQF4 F#A&L&F7L\'A$9F;A&9AbFYA%L#F#L1A#LO&G$ G#A&G%F% F$ F>A#G$A%\'L*A(Y*A(F>L#9F>L$AAF)=F=G#A%L&Y(A*FWA$Y(F7A#L)F4A&L)F3A(Y%A-L(b 1! FkAXBTA.CTA(L\'FEG%A)J+A\'J+F%%&B7A$G&5%C7A)Z#b 1$ L@ FK G#5A#F#A1F$AXG%F>L+&A)F7G,L%Y&A7F3G%Y%AGF6L(A5F8A*)\')FVG0Y(A%L5J+\'"
    + "F#G#&A*G$)FNI$G%I#G#Y#1Y%\'A+1A#F:A(J+A\'G$FEG&)G) J+Y%&I#&A)FD\'Y#&A*G#)FQI$G*I#F%Y%G%9)\'J+&9&Y$ L5A,F3 F:I$G$I#\')G#Y\'\'F#\'A`F( & F% F0 F+9A\'FP\'I$G)A&J+A\'G#I# F)A#F#A#F7 F( F# F& G#&I#\'I%A#I#A#I$A#&A\')A&F&I#A#G(A$G&A,F+ &A#& FG &I$G\' )A#) I% I#\')\'&\'&Y# Y#A)G#A>FVI$G)I#G$)\'F%Y&J+Y# 9\'F$A?FQI$G\')\'I%G#)G#F#9&A)J+b G# FPI$G%A#I%G#)G#Y8F%G#ACFQI$G)I#\')G#Y$&A,J+A\'Y.A4FL\')\'I#G\')\'&9A\'J+A\'J5A=F<A#\')\'I#G%)G&A%J+L#Y$=F(b Z# FMI$G*)G#9b E! BACAJ+L*A-F)A#&A#F) F# F9I\' I#A#G#)\'&)&)\'Y$A*J+AhF)A#FHI$G%A#G#I%\'&9&)A<&G+FIG\')&G%"
    + "Y)\'A)&G\'I#G$FOG.)G#Y$&Y&A.FkA(Y+b W# FB9A/J+A\'F* FF)G( G\')\'&Y&A+J+L4A$Y#F?A#G7 )G()G#)G#AkF( F# FGG\'A$\' G# G(&\'A)J+A\'F\' F# FAI& G# I#\')\'&A(J+b W% F4G#I#Y#A(G#&)F. FCI#G&A$I#\')\'Y.J+\'b 6! &A0L6^)[%^2A.9b&;/ b G! b+P!  Y&A,b&%$ b -J b&B! Y#A.b&Q1 Q1\'F\'G0A+b&<` A&b&(* b ZK!F?G-I$G$J+b \'< b&Z) A(F@ J+A%Y#Fq J+A\'F?A#G&9A+FQG(Y&^%E%9=A+J+ L( F6A&F4b Q\' E$FIE#Y$J+b \'$ BACAL8Y%b F! FmA%\'&IXA(G%E.AbE#9%\'A,I#A/&b W@!&A)b&74 AJF#A(&b H,#E% E( E# b&D% A0&A>F$A#&A/F%A)b&-\' b %E b&L! A&F.A$F*A(F+A#=G#9Q%b =_ b=Q$ J+A\'b=U\'"
    + " AnGOA#G8A*b=U! A^b=W$ A+^HA#^^I#G$^$I\'Q)G)^#G(^?G%^_A6^dG$=b [! L5A-L5A-b=8! A*L:b (# B;C;B;C( C3B;C;! B#A#!A#B#A#B% B)C% # C( C,B;C;B# B%A#B) B( C;B# B% B& !A$B( C;B;C;B;C;B;C;B;C;B;C;B;C=A#B::C::C\'B::C::C\'B::C::C\'B::C::C\'B::C::C\'!#A#JSb= ) GX^%GS^)\'^/\'^#Y&A0G& G0b 12 C+&C5A\'C\'b 6$ G( G2A#G( G# G&A&E`AB\'b Q! FNA$G(E(A#J+A%&=b  & F?\'A2FMG%J+A&;b 1( F<%G%J+b 7$ F?G#&J+A%9b A( F( F% F# F0 b&&$ A#L*G(AJBCCCG(%A%J+A%Y#b 2- L]=L$;L%AnLN=L0b #$ F% F< F# &A#& F+ F% & &A\'&A%& & & F$ F# &A#& & & & & F# &A#F% F( F% "
    + "F% & F+ F2A&F$ F& F2AUZ#b /% ^MA%b=E! A-^0A#^0 ^0 ^FA+L.b=B# AY^>A.^MA%^*A(^#A/^\'b ;# b=]$ ]&b=9, A%^2A$^.A$b=X! A%b=@! A\'^-A%=A0^-A%^YA)^+A\'^IA)^?A#^-A%^#A`b=5& A-^/A#^.A$^+A&^YA(^0A#^,A\'^*A(b=4#  b==! J+b \'1 &b   %b   %b ?<#&AA&b Y !&A\'&b =$ &A#&b  ;!&A/&b PU!&A0&b M* &b CG b&?) b C8 &b *.!&A&&b ?!!&b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   %b   "
    + "%b   %b 2R!1A?b1A! b  # b\'Q$ b   %b   %b   %b 1Y$3b   %b   %b   %b ^a$3A#3b   %b   %b   %b ^a$3"};
},
ju_Objects = $rt_classWithoutFields(),
ju_Objects_equals = ($a, $b) => {
    if ($a === $b)
        return 1;
    return $a !== null ? $a.$equals($b) : $b !== null ? 0 : 1;
},
ju_Objects_hashCode = $o => {
    return $o !== null ? $o.$hashCode() : 0;
},
ju_Objects_requireNonNull = $obj => {
    if ($obj !== null)
        return $obj;
    $obj = new jl_NullPointerException;
    jl_RuntimeException__init_($obj, $rt_s(2));
    $rt_throw($obj);
};
function otji_JSWrapper() {
    jl_Object.call(this);
    this.$js = null;
}
let otji_JSWrapper__init_0 = ($this, $js) => {
    $this.$js = $js;
},
otji_JSWrapper__init_ = var_0 => {
    let var_1 = new otji_JSWrapper();
    otji_JSWrapper__init_0(var_1, var_0);
    return var_1;
},
otji_JSWrapper_wrap = $jsNumber => {
    let $type, $isObject, $wrappers, $existingRef, $existing, $wrapper, $stringWrappers, $stringFinalizationRegistry, $wrapperAsJs, $numberWrappers, $numberFinalizationRegistry;
    if ($jsNumber === null)
        return null;
    $type = $rt_str(typeof $jsNumber);
    $isObject = !jl_String_equals($type, $rt_s(22)) && !jl_String_equals($type, $rt_s(23)) ? 0 : 1;
    otji_JSWrapper$Helper_$callClinit();
    $wrappers = otji_JSWrapper$Helper_wrappers;
    if ($wrappers !== null) {
        if ($isObject) {
            $existingRef = $wrappers.get($jsNumber);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($jsNumber);
            $wrappers.set($jsNumber, new WeakRef($wrapper));
            return $wrapper;
        }
        if (jl_String_equals($type, $rt_s(24))) {
            $stringWrappers = otji_JSWrapper$Helper_stringWrappers;
            $stringFinalizationRegistry = otji_JSWrapper$Helper_stringFinalizationRegistry;
            $existingRef = $stringWrappers.get($jsNumber);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($jsNumber);
            $wrapperAsJs = $wrapper;
            $stringWrappers.set($jsNumber, new WeakRef($wrapperAsJs));
            otji_JSWrapper_register$js_body$_4($stringFinalizationRegistry, $wrapperAsJs, $jsNumber);
            return $wrapper;
        }
        if (jl_String_equals($type, $rt_s(25))) {
            $numberWrappers = otji_JSWrapper$Helper_numberWrappers;
            $numberFinalizationRegistry = otji_JSWrapper$Helper_numberFinalizationRegistry;
            $existingRef = $numberWrappers.get($jsNumber);
            $existing = (typeof $existingRef == 'undefined' ? 1 : 0) ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($jsNumber);
            $wrapperAsJs = $wrapper;
            $numberWrappers.set($jsNumber, new WeakRef($wrapperAsJs));
            otji_JSWrapper_register$js_body$_4($numberFinalizationRegistry, $wrapperAsJs, $jsNumber);
            return $wrapper;
        }
        if (jl_String_equals($type, $rt_s(26))) {
            $existingRef = otji_JSWrapper$Helper_undefinedWrapper;
            $existing = $existingRef === null ? void 0 : $existingRef.deref();
            if (!(typeof $existing == 'undefined' ? 1 : 0))
                return $existing;
            $wrapper = otji_JSWrapper__init_($jsNumber);
            otji_JSWrapper$Helper_undefinedWrapper = new WeakRef($wrapper);
            return $wrapper;
        }
    }
    return otji_JSWrapper__init_($jsNumber);
},
otji_JSWrapper_unwrap = $o => {
    if ($o === null)
        return null;
    return !($o instanceof otji_JSWrapper) ? $o : $o.$js;
},
otji_JSWrapper_jsToJava = $o => {
    if ($o === null)
        return null;
    return $o instanceof $rt_objcls() ? $o : otji_JSWrapper_wrap($o);
},
otji_JSWrapper_register$js_body$_4 = (var$1, var$2, var$3) => {
    return var$1.register(var$2, var$3);
},
jl_IndexOutOfBoundsException = $rt_classWithoutFields(jl_RuntimeException);
function jur_Pattern() {
    let a = this; jl_Object.call(a);
    a.$lexemes = null;
    a.$flags = 0;
    a.$backRefs = null;
    a.$needsBackRefReplacement = 0;
    a.$globalGroupIndex = 0;
    a.$compCount = 0;
    a.$consCount = 0;
    a.$start1 = null;
}
let jur_Pattern_matcher = ($this, var$1) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    var$2 = new jur_Matcher;
    var$2.$leftBound0 = (-1);
    var$2.$rightBound0 = (-1);
    var$2.$pat = $this;
    var$2.$start2 = $this.$start1;
    var$2.$string2 = var$1;
    var$2.$leftBound0 = 0;
    var$3 = var$1.$nativeString.length;
    var$2.$rightBound0 = var$3;
    var$4 = new jur_MatchResultImpl;
    var$5 = var$2.$leftBound0;
    var$6 = $this.$globalGroupIndex;
    var$7 = $this.$compCount + 1 | 0;
    var$8 = $this.$consCount + 1 | 0;
    var$4.$previousMatch = (-1);
    var$6 = var$6 + 1 | 0;
    var$4.$groupCount0 = var$6;
    var$4.$groupBounds = $rt_createIntArray(var$6 * 2 | 0);
    var$9 = $rt_createIntArray(var$8);
    var$4.$consumers = var$9;
    ju_Arrays_fill(var$9, (-1));
    if (var$7 > 0)
        var$4.$compQuantCounters = $rt_createIntArray(var$7);
    ju_Arrays_fill(var$4.$groupBounds, (-1));
    jur_MatchResultImpl_reset(var$4, var$1, var$5, var$3);
    var$2.$matchResult = var$4;
    var$4.$anchoringBounds = 1;
    return var$2;
},
jur_Pattern_pattern = $this => {
    return $this.$lexemes.$orig;
},
jur_Pattern_processExpression = ($this, $ch, $newFlags, $last) => {
    let $children, $saveFlags, $saveChangedFlags, $fSet, $child, var$9;
    $children = ju_ArrayList__init_();
    $saveFlags = $this.$flags;
    $saveChangedFlags = 0;
    if ($newFlags != $saveFlags)
        $this.$flags = $newFlags;
    a: {
        switch ($ch) {
            case -1073741784:
                $fSet = new jur_NonCapFSet;
                $newFlags = $this.$consCount + 1 | 0;
                $this.$consCount = $newFlags;
                jur_FSet__init_($fSet, $newFlags);
                break a;
            case -536870872:
            case -268435416:
                break;
            case -134217688:
            case -67108824:
                $fSet = new jur_BehindFSet;
                $newFlags = $this.$consCount + 1 | 0;
                $this.$consCount = $newFlags;
                jur_FSet__init_($fSet, $newFlags);
                break a;
            case -33554392:
                $fSet = new jur_AtomicFSet;
                $newFlags = $this.$consCount + 1 | 0;
                $this.$consCount = $newFlags;
                jur_FSet__init_($fSet, $newFlags);
                break a;
            default:
                $newFlags = $this.$globalGroupIndex + 1 | 0;
                $this.$globalGroupIndex = $newFlags;
                if ($last !== null)
                    $fSet = jur_FSet__init_0($newFlags);
                else {
                    $fSet = new jur_FinalSet;
                    jur_FSet__init_($fSet, 0);
                    $saveChangedFlags = 1;
                }
                $newFlags = $this.$globalGroupIndex;
                if ($newFlags <= (-1))
                    break a;
                if ($newFlags >= 10)
                    break a;
                $this.$backRefs.data[$newFlags] = $fSet;
                break a;
        }
        $fSet = new jur_AheadFSet;
        jur_FSet__init_($fSet, (-1));
    }
    while (true) {
        if (jur_Lexer_isLetter($this.$lexemes) && $this.$lexemes.$lookAhead == (-536870788)) {
            $last = jur_CharClass__init_0(jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
            while (!jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
                $child = $this.$lexemes;
                var$9 = $child.$lookAhead;
                if (var$9 && var$9 != (-536870788) && var$9 != (-536870871))
                    break;
                jur_CharClass_add0($last, jur_Lexer_next($child));
                $child = $this.$lexemes;
                if ($child.$ch != (-536870788))
                    continue;
                jur_Lexer_next($child);
            }
            $child = jur_Pattern_processRangeSet($this, $last);
            $child.$setNext($fSet);
        } else if ($this.$lexemes.$ch == (-536870788)) {
            $child = jur_EmptySet__init_($fSet);
            jur_Lexer_next($this.$lexemes);
        } else {
            $child = jur_Pattern_processSubExpression($this, $fSet);
            $last = $this.$lexemes;
            if ($last.$ch == (-536870788))
                jur_Lexer_next($last);
        }
        if ($child !== null)
            ju_ArrayList_add($children, $child);
        if (jur_Lexer_isEmpty($this.$lexemes))
            break;
        if ($this.$lexemes.$ch == (-536870871))
            break;
    }
    if ($this.$lexemes.$lookBack == (-536870788))
        ju_ArrayList_add($children, jur_EmptySet__init_($fSet));
    if ($this.$flags != $saveFlags && !$saveChangedFlags) {
        $this.$flags = $saveFlags;
        $last = $this.$lexemes;
        $last.$flags0 = $saveFlags;
        $last.$lookAhead = $last.$ch;
        $last.$lookAheadST = $last.$curST;
        var$9 = $last.$curToc;
        $last.$index = var$9 + 1 | 0;
        $last.$lookAheadToc = var$9;
        jur_Lexer_movePointer($last);
    }
    switch ($ch) {
        case -1073741784:
            break;
        case -536870872:
            $last = new jur_PositiveLookAhead;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -268435416:
            $last = new jur_NegativeLookAhead;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -134217688:
            $last = new jur_PositiveLookBehind;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -67108824:
            $last = new jur_NegativeLookBehind;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        case -33554392:
            $last = new jur_AtomicJointSet;
            jur_JointSet__init_($last, $children, $fSet);
            return $last;
        default:
            switch ($children.$size0) {
                case 0:
                    break;
                case 1:
                    return jur_SingleSet__init_0(ju_ArrayList_get($children, 0), $fSet);
                default:
                    return jur_JointSet__init_0($children, $fSet);
            }
            return jur_EmptySet__init_($fSet);
    }
    $last = new jur_NonCapJointSet;
    jur_JointSet__init_($last, $children, $fSet);
    return $last;
},
jur_Pattern_processDecomposedChar = $this => {
    let $codePoints, $curSymb, $curSymbIndex, $codePointsHangul, var$5, var$6, $readCodePoints;
    $codePoints = $rt_createIntArray(4);
    $curSymb = (-1);
    $curSymbIndex = (-1);
    if (!jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
        $codePointsHangul = $codePoints.data;
        $curSymb = jur_Lexer_next($this.$lexemes);
        $codePointsHangul[0] = $curSymb;
        $curSymbIndex = $curSymb - 4352 | 0;
    }
    if ($curSymbIndex >= 0 && $curSymbIndex < 19) {
        $codePointsHangul = $rt_createCharArray(3);
        $codePoints = $codePointsHangul.data;
        $codePoints[0] = $curSymb & 65535;
        var$5 = $this.$lexemes;
        var$6 = var$5.$ch;
        $readCodePoints = var$6 - 4449 | 0;
        if ($readCodePoints >= 0 && $readCodePoints < 21) {
            $codePoints[1] = var$6 & 65535;
            jur_Lexer_next(var$5);
            var$5 = $this.$lexemes;
            var$6 = var$5.$ch;
            $curSymb = var$6 - 4519 | 0;
            if ($curSymb >= 0 && $curSymb < 28) {
                $codePoints[2] = var$6 & 65535;
                jur_Lexer_next(var$5);
                return jur_HangulDecomposedCharSet__init_($codePointsHangul, 3);
            }
            return jur_HangulDecomposedCharSet__init_($codePointsHangul, 2);
        }
        if (!jur_Pattern_hasFlag($this, 2))
            return jur_CharSet__init_($codePoints[0]);
        if (jur_Pattern_hasFlag($this, 64))
            return jur_UCICharSet__init_($codePoints[0]);
        return jur_CICharSet__init_($codePoints[0]);
    }
    $codePointsHangul = $codePoints.data;
    $curSymb = 1;
    while ($curSymb < 4 && !jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes)) {
        $readCodePoints = $curSymb + 1 | 0;
        $codePointsHangul[$curSymb] = jur_Lexer_next($this.$lexemes);
        $curSymb = $readCodePoints;
    }
    if ($curSymb == 1) {
        $readCodePoints = $codePointsHangul[0];
        if (!(jur_Lexer_singleDecompTable.$get0($readCodePoints) == jur_Lexer_singleDecompTableSize ? 0 : 1))
            return jur_Pattern_processCharSet($this, $codePointsHangul[0]);
    }
    if (!jur_Pattern_hasFlag($this, 2))
        return jur_DecomposedCharSet__init_0($codePoints, $curSymb);
    if (jur_Pattern_hasFlag($this, 64)) {
        var$5 = new jur_UCIDecomposedCharSet;
        jur_DecomposedCharSet__init_(var$5, $codePoints, $curSymb);
        return var$5;
    }
    var$5 = new jur_CIDecomposedCharSet;
    jur_DecomposedCharSet__init_(var$5, $codePoints, $curSymb);
    return var$5;
},
jur_Pattern_processSubExpression = ($this, $last) => {
    let $cur, $term, var$4, var$5, var$6, $next, var$8;
    if (jur_Lexer_isLetter($this.$lexemes) && !jur_Lexer_isNextSpecial($this.$lexemes) && jur_Lexer_isLetter0($this.$lexemes.$lookAhead)) {
        if (jur_Pattern_hasFlag($this, 128)) {
            $cur = jur_Pattern_processDecomposedChar($this);
            if (!jur_Lexer_isEmpty($this.$lexemes)) {
                $term = $this.$lexemes;
                var$4 = $term.$ch;
                if (!(var$4 == (-536870871) && !($last instanceof jur_FinalSet)) && var$4 != (-536870788) && !jur_Lexer_isLetter($term))
                    $cur = jur_Pattern_processQuantifier($this, $last, $cur);
            }
        } else if (!jur_Lexer_isHighSurrogate0($this.$lexemes) && !jur_Lexer_isLowSurrogate0($this.$lexemes)) {
            $term = new jl_StringBuffer;
            jl_AbstractStringBuilder__init_($term);
            while (!jur_Lexer_isEmpty($this.$lexemes) && jur_Lexer_isLetter($this.$lexemes) && !jur_Lexer_isHighSurrogate0($this.$lexemes) && !jur_Lexer_isLowSurrogate0($this.$lexemes)) {
                if (!(!jur_Lexer_isNextSpecial($this.$lexemes) && !$this.$lexemes.$lookAhead) && !(!jur_Lexer_isNextSpecial($this.$lexemes) && jur_Lexer_isLetter0($this.$lexemes.$lookAhead))) {
                    var$5 = $this.$lexemes.$lookAhead;
                    if (var$5 != (-536870871) && (var$5 & (-2147418113)) != (-2147483608) && var$5 != (-536870788) && var$5 != (-536870876))
                        break;
                }
                var$4 = jur_Lexer_next($this.$lexemes);
                if (!jl_Character_isSupplementaryCodePoint(var$4))
                    jl_AbstractStringBuilder_append($term, var$4 & 65535);
                else
                    jl_AbstractStringBuilder_append0($term, jl_Character_toChars(var$4));
            }
            if (!jur_Pattern_hasFlag($this, 2)) {
                $cur = new jur_SequenceSet;
                jur_LeafSet__init_($cur);
                $cur.$string = jl_AbstractStringBuilder_toString($term);
                var$4 = $term.$length0;
                $cur.$charCount0 = var$4;
                $cur.$leftToRight = jur_SequenceSet$IntHash__init_(var$4);
                $cur.$rightToLeft = jur_SequenceSet$IntHash__init_($cur.$charCount0);
                var$6 = 0;
                while (var$6 < ($cur.$charCount0 - 1 | 0)) {
                    jur_SequenceSet$IntHash_put($cur.$leftToRight, jl_String_charAt($cur.$string, var$6), ($cur.$charCount0 - var$6 | 0) - 1 | 0);
                    jur_SequenceSet$IntHash_put($cur.$rightToLeft, jl_String_charAt($cur.$string, ($cur.$charCount0 - var$6 | 0) - 1 | 0), ($cur.$charCount0 - var$6 | 0) - 1 | 0);
                    var$6 = var$6 + 1 | 0;
                }
            } else
                $cur = jur_Pattern_hasFlag($this, 64) ? jur_UCISequenceSet__init_0($term) : jur_CISequenceSet__init_0($term);
        } else
            $cur = jur_Pattern_processQuantifier($this, $last, jur_Pattern_processTerminal($this, $last));
    } else {
        $term = $this.$lexemes;
        if ($term.$ch != (-536870871))
            $cur = jur_Pattern_processQuantifier($this, $last, jur_Pattern_processTerminal($this, $last));
        else {
            if ($last instanceof jur_FinalSet)
                $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $term.$orig, $term.$curToc));
            $cur = jur_EmptySet__init_($last);
        }
    }
    a: {
        if (!jur_Lexer_isEmpty($this.$lexemes)) {
            var$4 = $this.$lexemes.$ch;
            if (!(var$4 == (-536870871) && !($last instanceof jur_FinalSet)) && var$4 != (-536870788)) {
                $next = jur_Pattern_processSubExpression($this, $last);
                if ($cur instanceof jur_LeafQuantifierSet && !($cur instanceof jur_CompositeQuantifierSet) && !($cur instanceof jur_GroupQuantifierSet) && !($cur instanceof jur_AltQuantifierSet)) {
                    var$8 = $cur;
                    $term = var$8;
                    if (!$next.$first($term.$innerSet)) {
                        $cur = new jur_UnifiedQuantifierSet;
                        $term = $term.$innerSet;
                        var$8 = var$8;
                        jur_LeafQuantifierSet__init_($cur, $term, var$8.$next2, var$8.$type);
                        $cur.$innerSet.$setNext($cur);
                    }
                }
                if (($next.$getType0() & 65535) != 43)
                    $cur.$setNext($next);
                else
                    $cur.$setNext($next.$innerSet);
                break a;
            }
        }
        if ($cur === null)
            return null;
        $cur.$setNext($last);
    }
    if (($cur.$getType0() & 65535) != 43)
        return $cur;
    return $cur.$innerSet;
},
jur_Pattern_processQuantifier = ($this, $last, $term) => {
    let $q, $quant, $q_0, var$6, $leaf;
    $q = $this.$lexemes;
    $quant = $q.$ch;
    if ($term !== null && !($term instanceof jur_LeafSet)) {
        switch ($quant) {
            case -2147483606:
                jur_Lexer_next($q);
                $q = new jur_PossessiveGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, $quant);
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483605:
                jur_Lexer_next($q);
                $q = new jur_PosPlusGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-2147483606));
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483585:
                jur_Lexer_next($q);
                $q = new jur_PosAltGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-536870849));
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q;
            case -2147483525:
                $q_0 = new jur_PosCompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                var$6 = $this.$compCount + 1 | 0;
                $this.$compCount = var$6;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), var$6);
                jur_FSet_$callClinit();
                $term.$setNext(jur_FSet_posFSet);
                return $q_0;
            case -1073741782:
            case -1073741781:
                jur_Lexer_next($q);
                $q = new jur_ReluctantGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, $quant);
                $term.$setNext($q);
                return $q;
            case -1073741761:
                jur_Lexer_next($q);
                $q = new jur_RelAltGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -1073741701:
                $q_0 = new jur_RelCompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                $quant = $this.$compCount + 1 | 0;
                $this.$compCount = $quant;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), $quant);
                $term.$setNext($q_0);
                return $q_0;
            case -536870870:
            case -536870869:
                jur_Lexer_next($q);
                if ($term.$getType0() != (-2147483602)) {
                    $q = new jur_GroupQuantifierSet;
                    jur_QuantifierSet__init_($q, $term, $last, $quant);
                } else if (jur_Pattern_hasFlag($this, 32)) {
                    $q = new jur_DotAllQuantifierSet;
                    jur_QuantifierSet__init_($q, $term, $last, $quant);
                } else {
                    $q = new jur_DotQuantifierSet;
                    $q_0 = jur_AbstractLineTerminator_getInstance($this.$flags);
                    jur_QuantifierSet__init_($q, $term, $last, $quant);
                    $q.$lt = $q_0;
                }
                $term.$setNext($q);
                return $q;
            case -536870849:
                jur_Lexer_next($q);
                $q = new jur_AltGroupQuantifierSet;
                jur_QuantifierSet__init_($q, $term, $last, (-536870849));
                $term.$setNext($last);
                return $q;
            case -536870789:
                $q_0 = new jur_CompositeGroupQuantifierSet;
                $q = jur_Lexer_nextSpecial($q);
                $quant = $this.$compCount + 1 | 0;
                $this.$compCount = $quant;
                jur_CompositeGroupQuantifierSet__init_($q_0, $q, $term, $last, (-536870849), $quant);
                $term.$setNext($q_0);
                return $q_0;
            default:
        }
        return $term;
    }
    $leaf = null;
    if ($term !== null)
        $leaf = $term;
    switch ($quant) {
        case -2147483606:
        case -2147483605:
            jur_Lexer_next($q);
            $q = new jur_PossessiveQuantifierSet;
            jur_LeafQuantifierSet__init_($q, $leaf, $last, $quant);
            $leaf.$next2 = $q;
            return $q;
        case -2147483585:
            jur_Lexer_next($q);
            $term = new jur_PossessiveAltQuantifierSet;
            jur_LeafQuantifierSet__init_($term, $leaf, $last, (-2147483585));
            return $term;
        case -2147483525:
            $term = new jur_PossessiveCompositeQuantifierSet;
            jur_CompositeQuantifierSet__init_($term, jur_Lexer_nextSpecial($q), $leaf, $last, (-2147483525));
            return $term;
        case -1073741782:
        case -1073741781:
            jur_Lexer_next($q);
            $q = new jur_ReluctantQuantifierSet;
            jur_LeafQuantifierSet__init_($q, $leaf, $last, $quant);
            $leaf.$next2 = $q;
            return $q;
        case -1073741761:
            jur_Lexer_next($q);
            $term = new jur_ReluctantAltQuantifierSet;
            jur_LeafQuantifierSet__init_($term, $leaf, $last, (-1073741761));
            return $term;
        case -1073741701:
            $term = new jur_ReluctantCompositeQuantifierSet;
            jur_CompositeQuantifierSet__init_($term, jur_Lexer_nextSpecial($q), $leaf, $last, (-1073741701));
            return $term;
        case -536870870:
        case -536870869:
            jur_Lexer_next($q);
            $q = jur_LeafQuantifierSet__init_0($leaf, $last, $quant);
            $leaf.$next2 = $q;
            return $q;
        case -536870849:
            jur_Lexer_next($q);
            $term = new jur_AltQuantifierSet;
            jur_LeafQuantifierSet__init_($term, $leaf, $last, (-536870849));
            return $term;
        case -536870789:
            return jur_CompositeQuantifierSet__init_0(jur_Lexer_nextSpecial($q), $leaf, $last, (-536870789));
        default:
    }
    return $term;
},
jur_Pattern_processTerminal = ($this, $last) => {
    let $term, var$3, var$4, $ch, $newFlags, $number, $negative, $cc;
    $term = null;
    var$3 = $last instanceof jur_FinalSet;
    while (true) {
        a: {
            var$4 = $this.$lexemes;
            $ch = var$4.$ch;
            if (($ch & (-2147418113)) == (-2147483608)) {
                jur_Lexer_next(var$4);
                $newFlags = ($ch & 16711680) >> 16;
                $ch = $ch & (-16711681);
                if ($ch == (-16777176))
                    $this.$flags = $newFlags;
                else {
                    if ($ch != (-1073741784))
                        $newFlags = $this.$flags;
                    $term = jur_Pattern_processExpression($this, $ch, $newFlags, $last);
                    var$4 = $this.$lexemes;
                    if (var$4.$ch != (-536870871))
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), var$4.$orig, var$4.$curToc));
                    jur_Lexer_next(var$4);
                }
            } else {
                b: {
                    c: {
                        switch ($ch) {
                            case -2147483599:
                            case -2147483598:
                            case -2147483597:
                            case -2147483596:
                            case -2147483595:
                            case -2147483594:
                            case -2147483593:
                            case -2147483592:
                            case -2147483591:
                                break c;
                            case -2147483583:
                                break;
                            case -2147483582:
                                jur_Lexer_next(var$4);
                                $term = jur_WordBoundary__init_(0);
                                break a;
                            case -2147483577:
                                jur_Lexer_next(var$4);
                                $term = new jur_PreviousMatch;
                                jur_AbstractSet__init_($term);
                                break a;
                            case -2147483558:
                                jur_Lexer_next(var$4);
                                $term = new jur_EOLSet;
                                $number = $this.$consCount + 1 | 0;
                                $this.$consCount = $number;
                                jur_EOLSet__init_($term, $number);
                                break a;
                            case -2147483550:
                                jur_Lexer_next(var$4);
                                $term = jur_WordBoundary__init_(1);
                                break a;
                            case -2147483526:
                                jur_Lexer_next(var$4);
                                $term = new jur_EOISet;
                                jur_AbstractSet__init_($term);
                                break a;
                            case -536870876:
                                jur_Lexer_next(var$4);
                                $this.$consCount = $this.$consCount + 1 | 0;
                                if (jur_Pattern_hasFlag($this, 8)) {
                                    if (jur_Pattern_hasFlag($this, 1)) {
                                        $term = jur_UMultiLineEOLSet__init_0($this.$consCount);
                                        break a;
                                    }
                                    $term = jur_MultiLineEOLSet__init_($this.$consCount);
                                    break a;
                                }
                                if (jur_Pattern_hasFlag($this, 1)) {
                                    $term = jur_UEOLSet__init_($this.$consCount);
                                    break a;
                                }
                                $term = jur_EOLSet__init_0($this.$consCount);
                                break a;
                            case -536870866:
                                jur_Lexer_next(var$4);
                                if (jur_Pattern_hasFlag($this, 32)) {
                                    $term = jur_DotAllSet__init_0();
                                    break a;
                                }
                                $term = jur_DotSet__init_0(jur_AbstractLineTerminator_getInstance($this.$flags));
                                break a;
                            case -536870821:
                                jur_Lexer_next(var$4);
                                $negative = 0;
                                $term = $this.$lexemes;
                                if ($term.$ch == (-536870818)) {
                                    $negative = 1;
                                    jur_Lexer_next($term);
                                }
                                $term = jur_Pattern_processRangeSet($this, jur_Pattern_processRangeExpression($this, $negative));
                                $term.$setNext($last);
                                var$4 = $this.$lexemes;
                                if (var$4.$ch != (-536870819))
                                    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), var$4.$orig, var$4.$curToc));
                                jur_Lexer_setMode(var$4, 1);
                                jur_Lexer_next($this.$lexemes);
                                break a;
                            case -536870818:
                                jur_Lexer_next(var$4);
                                $this.$consCount = $this.$consCount + 1 | 0;
                                if (!jur_Pattern_hasFlag($this, 8)) {
                                    $term = new jur_SOLSet;
                                    jur_AbstractSet__init_($term);
                                    break a;
                                }
                                $term = new jur_MultiLineSOLSet;
                                var$4 = jur_AbstractLineTerminator_getInstance($this.$flags);
                                jur_AbstractSet__init_($term);
                                $term.$lt1 = var$4;
                                break a;
                            case 0:
                                $cc = var$4.$curST;
                                if ($cc !== null)
                                    $term = jur_Pattern_processRangeSet($this, $cc);
                                else {
                                    if (jur_Lexer_isEmpty(var$4)) {
                                        $term = jur_EmptySet__init_($last);
                                        break a;
                                    }
                                    $term = jur_CharSet__init_($ch & 65535);
                                }
                                jur_Lexer_next($this.$lexemes);
                                break a;
                            default:
                                break b;
                        }
                        jur_Lexer_next(var$4);
                        $term = new jur_SOLSet;
                        jur_AbstractSet__init_($term);
                        break a;
                    }
                    $number = ($ch & 2147483647) - 48 | 0;
                    if ($this.$globalGroupIndex < $number)
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString(var$4), jur_Lexer_getIndex($this.$lexemes)));
                    jur_Lexer_next(var$4);
                    $this.$consCount = $this.$consCount + 1 | 0;
                    $term = !jur_Pattern_hasFlag($this, 2) ? jur_BackReferenceSet__init_($number, $this.$consCount) : jur_Pattern_hasFlag($this, 64) ? jur_UCIBackReferenceSet__init_0($number, $this.$consCount) : jur_CIBackReferenceSet__init_0($number, $this.$consCount);
                    $this.$backRefs.data[$number].$isBackReferenced = 1;
                    $this.$needsBackRefReplacement = 1;
                    break a;
                }
                if ($ch >= 0 && !jur_Lexer_isSpecial(var$4)) {
                    $term = jur_Pattern_processCharSet($this, $ch);
                    jur_Lexer_next($this.$lexemes);
                } else if ($ch == (-536870788))
                    $term = jur_EmptySet__init_($last);
                else {
                    if ($ch != (-536870871)) {
                        $last = new jur_PatternSyntaxException;
                        $term = !jur_Lexer_isSpecial($this.$lexemes) ? jl_Character_toString($ch & 65535) : $this.$lexemes.$curST.$toString();
                        var$4 = $this.$lexemes;
                        jur_PatternSyntaxException__init_0($last, $term, var$4.$orig, var$4.$curToc);
                        $rt_throw($last);
                    }
                    if (var$3) {
                        $last = new jur_PatternSyntaxException;
                        var$4 = $this.$lexemes;
                        jur_PatternSyntaxException__init_0($last, $rt_s(2), var$4.$orig, var$4.$curToc);
                        $rt_throw($last);
                    }
                    $term = jur_EmptySet__init_($last);
                }
            }
        }
        if ($ch != (-16777176))
            break;
    }
    return $term;
},
jur_Pattern_processRangeExpression = ($this, $alt) => {
    let $res, $buffer, $intersection, $notClosed, $firstInClass, $cs, $cur, $negative, $$je;
    $res = jur_CharClass__init_0(jur_Pattern_hasFlag($this, 2), jur_Pattern_hasFlag($this, 64));
    jur_AbstractCharClass_setNegative($res, $alt);
    $buffer = (-1);
    $intersection = 0;
    $notClosed = 0;
    $firstInClass = 1;
    a: {
        b: {
            c: while (true) {
                if (jur_Lexer_isEmpty($this.$lexemes))
                    break a;
                $cs = $this.$lexemes;
                $alt = $cs.$ch;
                $notClosed = $alt == (-536870819) && !$firstInClass ? 0 : 1;
                if (!$notClosed)
                    break a;
                d: {
                    switch ($alt) {
                        case -536870874:
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $buffer = jur_Lexer_next($this.$lexemes);
                            $cs = $this.$lexemes;
                            if ($cs.$ch != (-536870874)) {
                                $buffer = 38;
                                break d;
                            }
                            if ($cs.$lookAhead == (-536870821)) {
                                jur_Lexer_next($cs);
                                $intersection = 1;
                                $buffer = (-1);
                                break d;
                            }
                            jur_Lexer_next($cs);
                            if ($firstInClass) {
                                $res = jur_Pattern_processRangeExpression($this, 0);
                                break d;
                            }
                            if ($this.$lexemes.$ch == (-536870819))
                                break d;
                            jur_CharClass_intersection($res, jur_Pattern_processRangeExpression($this, 0));
                            break d;
                        case -536870867:
                            if (!$firstInClass) {
                                $alt = $cs.$lookAhead;
                                if ($alt != (-536870819) && $alt != (-536870821) && $buffer >= 0) {
                                    jur_Lexer_next($cs);
                                    $cs = $this.$lexemes;
                                    $cur = $cs.$ch;
                                    if (jur_Lexer_isSpecial($cs))
                                        break c;
                                    if ($cur < 0) {
                                        $negative = $this.$lexemes.$lookAhead;
                                        if ($negative != (-536870819) && $negative != (-536870821) && $buffer >= 0)
                                            break c;
                                    }
                                    e: {
                                        try {
                                            if (jur_Lexer_isLetter0($cur))
                                                break e;
                                            $cur = $cur & 65535;
                                            break e;
                                        } catch ($$e) {
                                            $$je = $rt_wrapException($$e);
                                            if ($$je instanceof jl_Exception) {
                                                break b;
                                            } else {
                                                throw $$e;
                                            }
                                        }
                                    }
                                    try {
                                        jur_CharClass_add($res, $buffer, $cur);
                                    } catch ($$e) {
                                        $$je = $rt_wrapException($$e);
                                        if ($$je instanceof jl_Exception) {
                                            break b;
                                        } else {
                                            throw $$e;
                                        }
                                    }
                                    jur_Lexer_next($this.$lexemes);
                                    $buffer = (-1);
                                    break d;
                                }
                            }
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $buffer = 45;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case -536870821:
                            if ($buffer >= 0) {
                                jur_CharClass_add0($res, $buffer);
                                $buffer = (-1);
                            }
                            jur_Lexer_next($this.$lexemes);
                            $negative = 0;
                            $cs = $this.$lexemes;
                            if ($cs.$ch == (-536870818)) {
                                jur_Lexer_next($cs);
                                $negative = 1;
                            }
                            if (!$intersection)
                                jur_CharClass_union($res, jur_Pattern_processRangeExpression($this, $negative));
                            else
                                jur_CharClass_intersection($res, jur_Pattern_processRangeExpression($this, $negative));
                            $intersection = 0;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case -536870819:
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $buffer = 93;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case -536870818:
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $buffer = 94;
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        case 0:
                            if ($buffer >= 0)
                                jur_CharClass_add0($res, $buffer);
                            $cs = $this.$lexemes.$curST;
                            if ($cs === null)
                                $buffer = 0;
                            else {
                                jur_CharClass_add1($res, $cs);
                                $buffer = (-1);
                            }
                            jur_Lexer_next($this.$lexemes);
                            break d;
                        default:
                    }
                    if ($buffer >= 0)
                        jur_CharClass_add0($res, $buffer);
                    $buffer = jur_Lexer_next($this.$lexemes);
                }
                $firstInClass = 0;
            }
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Pattern_pattern($this), $this.$lexemes.$curToc));
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Pattern_pattern($this), $this.$lexemes.$curToc));
    }
    if (!$notClosed) {
        if ($buffer >= 0)
            jur_CharClass_add0($res, $buffer);
        return $res;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Pattern_pattern($this), $this.$lexemes.$curToc - 1 | 0));
},
jur_Pattern_processCharSet = ($this, $ch) => {
    let $isSupplCodePoint, var$3, var$4;
    $isSupplCodePoint = jl_Character_isSupplementaryCodePoint($ch);
    if (jur_Pattern_hasFlag($this, 2)) {
        a: {
            if (!($ch >= 97 && $ch <= 122)) {
                if ($ch < 65)
                    break a;
                if ($ch > 90)
                    break a;
            }
            return jur_CICharSet__init_($ch & 65535);
        }
        if (jur_Pattern_hasFlag($this, 64) && $ch > 128) {
            if ($isSupplCodePoint) {
                var$3 = new jur_UCISupplCharSet;
                jur_LeafSet__init_(var$3);
                var$3.$charCount0 = 2;
                var$3.$ch4 = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
                return var$3;
            }
            if (jur_Lexer_isLowSurrogate($ch))
                return jur_LowSurrogateCharSet__init_($ch & 65535);
            if (!jur_Lexer_isHighSurrogate($ch))
                return jur_UCICharSet__init_($ch & 65535);
            return jur_HighSurrogateCharSet__init_($ch & 65535);
        }
    }
    if (!$isSupplCodePoint) {
        if (jur_Lexer_isLowSurrogate($ch))
            return jur_LowSurrogateCharSet__init_($ch & 65535);
        if (!jur_Lexer_isHighSurrogate($ch))
            return jur_CharSet__init_($ch & 65535);
        return jur_HighSurrogateCharSet__init_($ch & 65535);
    }
    var$3 = new jur_SupplCharSet;
    jur_LeafSet__init_(var$3);
    var$3.$charCount0 = 2;
    var$3.$ch1 = $ch;
    var$4 = (jl_Character_toChars($ch)).data;
    var$3.$high0 = var$4[0];
    var$3.$low0 = var$4[1];
    return var$3;
},
jur_Pattern_processRangeSet = ($this, $charClass) => {
    let $surrogates, $lowHighSurrRangeSet, var$4;
    if (!jur_AbstractCharClass_hasLowHighSurrogates($charClass)) {
        if (!$charClass.$mayContainSupplCodepoints) {
            if ($charClass.$hasUCI())
                return jur_UCIRangeSet__init_($charClass);
            return jur_RangeSet__init_($charClass);
        }
        if (!$charClass.$hasUCI())
            return jur_SupplRangeSet__init_0($charClass);
        $surrogates = new jur_UCISupplRangeSet;
        jur_SupplRangeSet__init_($surrogates, $charClass);
        return $surrogates;
    }
    $surrogates = jur_AbstractCharClass_getSurrogates($charClass);
    $lowHighSurrRangeSet = new jur_LowHighSurrogateRangeSet;
    jur_AbstractSet__init_($lowHighSurrRangeSet);
    $lowHighSurrRangeSet.$surrChars = $surrogates;
    $lowHighSurrRangeSet.$alt0 = $surrogates.$alt;
    if (!$charClass.$mayContainSupplCodepoints) {
        if ($charClass.$hasUCI())
            return jur_CompositeRangeSet__init_(jur_UCIRangeSet__init_(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
        return jur_CompositeRangeSet__init_(jur_RangeSet__init_(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
    }
    if (!$charClass.$hasUCI())
        return jur_CompositeRangeSet__init_(jur_SupplRangeSet__init_0(jur_AbstractCharClass_getWithoutSurrogates($charClass)), $lowHighSurrRangeSet);
    $surrogates = new jur_CompositeRangeSet;
    var$4 = new jur_UCISupplRangeSet;
    jur_SupplRangeSet__init_(var$4, jur_AbstractCharClass_getWithoutSurrogates($charClass));
    jur_CompositeRangeSet__init_0($surrogates, var$4, $lowHighSurrRangeSet);
    return $surrogates;
},
jur_Pattern_compile = $pattern => {
    let var$2, var$3, var$4, var$5;
    if ($pattern === null) {
        $pattern = new jl_NullPointerException;
        jl_RuntimeException__init_($pattern, $rt_s(27));
        $rt_throw($pattern);
    }
    jur_AbstractSet_counter = 1;
    var$2 = new jur_Pattern;
    var$2.$backRefs = $rt_createArray(jur_FSet, 10);
    var$2.$globalGroupIndex = (-1);
    var$2.$compCount = (-1);
    var$2.$consCount = (-1);
    var$3 = new jur_Lexer;
    var$3.$mode = 1;
    var$3.$orig = $pattern;
    var$3.$pattern0 = $rt_createCharArray($pattern.$nativeString.length + 2 | 0);
    jl_System_fastArraycopy(jl_String_toCharArray($pattern), 0, var$3.$pattern0, 0, $pattern.$nativeString.length);
    var$4 = var$3.$pattern0.data;
    var$5 = var$4.length;
    var$4[var$5 - 1 | 0] = 0;
    var$4[var$5 - 2 | 0] = 0;
    var$3.$patternFullLength = var$5;
    var$3.$flags0 = 0;
    jur_Lexer_movePointer(var$3);
    jur_Lexer_movePointer(var$3);
    var$2.$lexemes = var$3;
    var$2.$flags = 0;
    var$2.$start1 = jur_Pattern_processExpression(var$2, (-1), 0, null);
    if (jur_Lexer_isEmpty(var$2.$lexemes)) {
        if (var$2.$needsBackRefReplacement)
            var$2.$start1.$processSecondPass();
        return var$2;
    }
    $pattern = new jur_PatternSyntaxException;
    var$2 = var$2.$lexemes;
    jur_PatternSyntaxException__init_0($pattern, $rt_s(2), var$2.$orig, var$2.$curToc);
    $rt_throw($pattern);
},
jur_Pattern_getSupplement = $ch => {
    if ($ch >= 97 && $ch <= 122)
        $ch = ($ch - 32 | 0) & 65535;
    else if ($ch >= 65 && $ch <= 90)
        $ch = ($ch + 32 | 0) & 65535;
    return $ch;
},
jur_Pattern_hasFlag = ($this, $flag) => {
    return ($this.$flags & $flag) != $flag ? 0 : 1;
},
jur_MatchResult = $rt_classWithoutFields(0);
function jur_Matcher() {
    let a = this; jl_Object.call(a);
    a.$pat = null;
    a.$start2 = null;
    a.$string2 = null;
    a.$matchResult = null;
    a.$leftBound0 = 0;
    a.$rightBound0 = 0;
}
let jur_Matcher_find = ($this, $start) => {
    let $stringLength, var$3, var$4;
    $stringLength = $this.$string2.$nativeString.length;
    if ($start >= 0 && $start <= $stringLength) {
        jur_MatchResultImpl_reset($this.$matchResult, null, (-1), (-1));
        var$3 = $this.$matchResult;
        var$3.$mode0 = 1;
        var$3.$startIndex = $start;
        $stringLength = var$3.$previousMatch;
        if ($stringLength < 0)
            $stringLength = $start;
        var$3.$previousMatch = $stringLength;
        $start = $this.$start2.$find0($start, $this.$string2, var$3);
        if ($start == (-1))
            $this.$matchResult.$hitEnd = 1;
        if ($start >= 0) {
            var$3 = $this.$matchResult;
            if (var$3.$valid) {
                var$4 = var$3.$groupBounds.data;
                if (var$4[0] == (-1)) {
                    $stringLength = var$3.$startIndex;
                    var$4[0] = $stringLength;
                    var$4[1] = $stringLength;
                }
                var$3.$previousMatch = jur_MatchResultImpl_end(var$3);
                return 1;
            }
        }
        $this.$matchResult.$startIndex = (-1);
        return 0;
    }
    var$3 = new jl_IndexOutOfBoundsException;
    jl_RuntimeException__init_(var$3, jl_String_valueOf0($start));
    $rt_throw(var$3);
},
jur_Matcher_find0 = $this => {
    let $length, var$2, var$3;
    $length = $this.$string2.$nativeString.length;
    var$2 = $this.$matchResult;
    if (!var$2.$transparentBounds)
        $length = $this.$rightBound0;
    if (var$2.$startIndex >= 0 && var$2.$mode0 == 1) {
        var$2.$startIndex = jur_MatchResultImpl_end(var$2);
        if (jur_MatchResultImpl_end($this.$matchResult) == jur_MatchResultImpl_start($this.$matchResult, 0)) {
            var$2 = $this.$matchResult;
            var$2.$startIndex = var$2.$startIndex + 1 | 0;
        }
        var$3 = $this.$matchResult.$startIndex;
        return var$3 <= $length && jur_Matcher_find($this, var$3) ? 1 : 0;
    }
    return jur_Matcher_find($this, $this.$leftBound0);
},
jur_Matcher_start = ($this, $group) => {
    return jur_MatchResultImpl_start($this.$matchResult, $group);
},
jur_Matcher_end = ($this, $group) => {
    return jur_MatchResultImpl_end0($this.$matchResult, $group);
},
jur_Matcher_groupCount = $this => {
    return $this.$matchResult.$groupCount0 - 1 | 0;
},
jl_IllegalArgumentException = $rt_classWithoutFields(jl_RuntimeException);
function jur_PatternSyntaxException() {
    let a = this; jl_IllegalArgumentException.call(a);
    a.$desc = null;
    a.$pattern1 = null;
    a.$index4 = 0;
}
let jur_PatternSyntaxException__init_0 = ($this, $description, $pattern, $index) => {
    jl_Exception__init_($this);
    $this.$index4 = (-1);
    $this.$desc = $description;
    $this.$pattern1 = $pattern;
    $this.$index4 = $index;
},
jur_PatternSyntaxException__init_ = (var_0, var_1, var_2) => {
    let var_3 = new jur_PatternSyntaxException();
    jur_PatternSyntaxException__init_0(var_3, var_0, var_1, var_2);
    return var_3;
};
function dba_RunAutomaton() {
    let a = this; jl_Object.call(a);
    a.$size6 = 0;
    a.$accept0 = null;
    a.$initial0 = 0;
    a.$transitions0 = null;
    a.$points = null;
    a.$classmap = null;
}
let dba_RunAutomaton_isAccept = ($this, $state) => {
    return $this.$accept0.data[$state];
},
dba_RunAutomaton__init_0 = ($this, $a) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9;
    dba_Automaton_determinize($a);
    $this.$points = dba_Automaton_getStartPoints($a);
    var$2 = dba_Automaton_getStates($a);
    dba_Automaton_setStateNumbers(var$2);
    $this.$initial0 = $a.$initial.$number;
    $a = var$2;
    var$3 = ju_HashSet_size($a);
    $this.$size6 = var$3;
    $this.$accept0 = $rt_createBooleanArray(var$3);
    var$3 = $rt_imul(var$3, $this.$points.data.length);
    var$4 = $rt_createIntArray(var$3);
    var$5 = var$4.data;
    $this.$transitions0 = var$4;
    var$6 = 0;
    while (var$6 < var$3) {
        var$5[var$6] = (-1);
        var$6 = var$6 + 1 | 0;
    }
    $a = ju_HashSet_iterator($a);
    while ($a.$hasNext()) {
        var$2 = $a.$next0();
        var$3 = var$2.$number;
        $this.$accept0.data[var$3] = var$2.$accept;
        var$7 = 0;
        while (true) {
            var$4 = $this.$points.data;
            if (var$7 >= var$4.length)
                break;
            var$8 = dba_State_step(var$2, var$4[var$7]);
            if (var$8 !== null)
                $this.$transitions0.data[$rt_imul(var$3, $this.$points.data.length) + var$7 | 0] = var$8.$number;
            var$7 = var$7 + 1 | 0;
        }
    }
    var$4 = $rt_createIntArray(65536);
    var$5 = var$4.data;
    $this.$classmap = var$4;
    var$3 = 0;
    var$6 = 0;
    while (var$6 <= 65535) {
        var$9 = var$3 + 1 | 0;
        var$4 = $this.$points.data;
        if (var$9 < var$4.length && var$6 == var$4[var$9])
            var$3 = var$9;
        var$5[var$6] = var$3;
        var$6 = var$6 + 1 | 0;
    }
},
dba_RunAutomaton__init_ = var_0 => {
    let var_1 = new dba_RunAutomaton();
    dba_RunAutomaton__init_0(var_1, var_0);
    return var_1;
},
dba_RunAutomaton_newMatcher = ($this, $s) => {
    let var$2;
    var$2 = new dba_AutomatonMatcher;
    var$2.$matchStart = (-1);
    var$2.$matchEnd = (-1);
    var$2.$chars1 = $s;
    var$2.$automaton = $this;
    return var$2;
};
function dba_RegExp() {
    let a = this; jl_Object.call(a);
    a.$kind = null;
    a.$exp1 = null;
    a.$exp2 = null;
    a.$s = null;
    a.$c = 0;
    a.$min1 = 0;
    a.$max2 = 0;
    a.$digits = 0;
    a.$from = 0;
    a.$to1 = 0;
    a.$b = null;
    a.$flags1 = 0;
    a.$pos = 0;
}
let dba_RegExp_allow_mutation = 0,
dba_RegExp__init_ = ($this, $s, $syntax_flags) => {
    let $e;
    $this.$b = $s;
    $this.$flags1 = $syntax_flags;
    if (!$s.$nativeString.length)
        $e = dba_RegExp_makeString($rt_s(2));
    else {
        $e = dba_RegExp_parseUnionExp($this);
        if ($this.$pos < $this.$b.$nativeString.length) {
            $e = new jl_IllegalArgumentException;
            $s = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($s);
            jl_RuntimeException__init_($e, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0($s, $rt_s(28)), $this.$pos)));
            $rt_throw($e);
        }
    }
    $this.$kind = $e.$kind;
    $this.$exp1 = $e.$exp1;
    $this.$exp2 = $e.$exp2;
    $this.$s = $e.$s;
    $this.$c = $e.$c;
    $this.$min1 = $e.$min1;
    $this.$max2 = $e.$max2;
    $this.$digits = $e.$digits;
    $this.$from = $e.$from;
    $this.$to1 = $e.$to1;
    $this.$b = null;
},
dba_RegExp__init_0 = (var_0, var_1) => {
    let var_2 = new dba_RegExp();
    dba_RegExp__init_(var_2, var_0, var_1);
    return var_2;
},
dba_RegExp_toAutomaton0 = $this => {
    let var$1, var$2, var$3;
    var$1 = null;
    var$2 = null;
    var$3 = 0;
    if (dba_RegExp_allow_mutation)
        var$3 = dba_Automaton_setAllowMutate(1);
    var$1 = dba_RegExp_toAutomaton($this, var$1, var$2, 1);
    if (dba_RegExp_allow_mutation)
        dba_Automaton_setAllowMutate(var$3);
    return var$1;
},
dba_RegExp_toAutomaton = ($this, $automata, $automaton_provider, $minimize) => {
    let $a, $list, $aa, var$7, var$8, var$9, $e, $$je;
    a: {
        $a = null;
        dba_RegExp$1_$callClinit();
        switch (dba_RegExp$1_$SwitchMap$dk$brics$automaton$RegExp$Kind.data[$this.$kind.$ordinal]) {
            case 1:
                $list = ju_ArrayList__init_();
                dba_RegExp_findLeaves($this, $this.$exp1, dba_RegExp$Kind_REGEXP_UNION, $list, $automata, $automaton_provider, $minimize);
                dba_RegExp_findLeaves($this, $this.$exp2, dba_RegExp$Kind_REGEXP_UNION, $list, $automata, $automaton_provider, $minimize);
                $automata = ju_HashSet__init_();
                $a = $list;
                $automaton_provider = ju_AbstractList_iterator($a);
                $aa = $automata;
                while (ju_AbstractList$1_hasNext($automaton_provider)) {
                    ju_HashSet_add($aa, jl_Integer_valueOf(jl_System_identityHashCode(ju_AbstractList$1_next($automaton_provider))));
                }
                var$7 = ju_HashSet_size($aa) == $list.$size0 ? 0 : 1;
                $automata = dba_State__init_();
                $a = ju_AbstractList_iterator($a);
                while (ju_AbstractList$1_hasNext($a)) {
                    $automaton_provider = ju_AbstractList$1_next($a);
                    if (dba_Automaton_isEmpty($automaton_provider))
                        continue;
                    dba_State_addEpsilon($automata, (!var$7 ? dba_Automaton_cloneExpandedIfRequired($automaton_provider) : dba_Automaton_cloneExpanded($automaton_provider)).$initial);
                }
                $a = dba_Automaton__init_();
                $a.$initial = $automata;
                $a.$deterministic = 0;
                dba_Automaton_clearHashCode($a);
                dba_Automaton_checkMinimizeAlways($a);
                if (!$minimize)
                    break a;
                dba_Automaton_minimize($a);
                break a;
            case 2:
                $list = ju_ArrayList__init_();
                dba_RegExp_findLeaves($this, $this.$exp1, dba_RegExp$Kind_REGEXP_CONCATENATION, $list, $automata, $automaton_provider, $minimize);
                dba_RegExp_findLeaves($this, $this.$exp2, dba_RegExp$Kind_REGEXP_CONCATENATION, $list, $automata, $automaton_provider, $minimize);
                $a = dba_BasicOperations_concatenate($list);
                if (!$minimize)
                    break a;
                dba_Automaton_minimize($a);
                break a;
            case 3:
                $a = dba_BasicOperations_intersection(dba_RegExp_toAutomaton($this.$exp1, $automata, $automaton_provider, $minimize), dba_RegExp_toAutomaton($this.$exp2, $automata, $automaton_provider, $minimize));
                if (!$minimize)
                    break a;
                dba_Automaton_minimize($a);
                break a;
            case 4:
                $a = dba_Automaton_cloneExpandedIfRequired(dba_RegExp_toAutomaton($this.$exp1, $automata, $automaton_provider, $minimize));
                $automata = dba_State__init_();
                dba_State_addEpsilon($automata, $a.$initial);
                $automata.$accept = 1;
                $a.$initial = $automata;
                $a.$deterministic = 0;
                dba_Automaton_clearHashCode($a);
                dba_Automaton_checkMinimizeAlways($a);
                if (!$minimize)
                    break a;
                dba_Automaton_minimize($a);
                break a;
            case 5:
                $a = dba_BasicOperations_repeat(dba_RegExp_toAutomaton($this.$exp1, $automata, $automaton_provider, $minimize));
                if (!$minimize)
                    break a;
                dba_Automaton_minimize($a);
                break a;
            case 6:
                $automata = dba_RegExp_toAutomaton($this.$exp1, $automata, $automaton_provider, $minimize);
                var$7 = $this.$min1;
                if (!var$7)
                    $a = dba_BasicOperations_repeat($automata);
                else {
                    $a = ju_ArrayList__init_();
                    $automaton_provider = $a;
                    while (true) {
                        var$8 = var$7 + (-1) | 0;
                        if (var$7 <= 0)
                            break;
                        ju_ArrayList_add($automaton_provider, $automata);
                        var$7 = var$8;
                    }
                    ju_ArrayList_add($automaton_provider, dba_BasicOperations_repeat($automata));
                    $a = dba_BasicOperations_concatenate($a);
                }
                if (!$minimize)
                    break a;
                dba_Automaton_minimize($a);
                break a;
            case 7:
                $automata = dba_RegExp_toAutomaton($this.$exp1, $automata, $automaton_provider, $minimize);
                var$7 = $this.$min1;
                var$8 = $this.$max2;
                if (var$7 > var$8)
                    $a = dba_BasicAutomata_makeEmpty();
                else {
                    var$9 = var$8 - var$7 | 0;
                    dba_Automaton_expandSingleton($automata);
                    if (!var$7)
                        $a = dba_BasicAutomata_makeEmptyString();
                    else if (var$7 == 1)
                        $a = dba_Automaton_clone($automata);
                    else {
                        $automaton_provider = ju_ArrayList__init_();
                        $a = $automaton_provider;
                        while (true) {
                            var$8 = var$7 + (-1) | 0;
                            if (var$7 <= 0)
                                break;
                            ju_ArrayList_add($a, $automata);
                            var$7 = var$8;
                        }
                        $a = dba_BasicOperations_concatenate($automaton_provider);
                    }
                    if (var$9 > 0) {
                        $automaton_provider = dba_Automaton_clone($automata);
                        while (true) {
                            var$9 = var$9 + (-1) | 0;
                            if (var$9 <= 0)
                                break;
                            $list = dba_Automaton_clone($automata);
                            $aa = ju_HashSet_iterator(dba_Automaton_getAcceptStates($list));
                            while ($aa.$hasNext()) {
                                dba_State_addEpsilon($aa.$next0(), $automaton_provider.$initial);
                            }
                            $automaton_provider = $list;
                        }
                        $automata = ju_HashSet_iterator(dba_Automaton_getAcceptStates($a));
                        while ($automata.$hasNext()) {
                            dba_State_addEpsilon($automata.$next0(), $automaton_provider.$initial);
                        }
                        $a.$deterministic = 0;
                        dba_Automaton_clearHashCode($a);
                        dba_Automaton_checkMinimizeAlways($a);
                    }
                }
                if (!$minimize)
                    break a;
                dba_Automaton_minimize($a);
                break a;
            case 8:
                $a = dba_Automaton_cloneExpandedIfRequired(dba_RegExp_toAutomaton($this.$exp1, $automata, $automaton_provider, $minimize));
                dba_Automaton_determinize($a);
                dba_Automaton_totalize($a);
                $automata = ju_HashSet_iterator(dba_Automaton_getStates($a));
                while ($automata.$hasNext()) {
                    $automaton_provider = $automata.$next0();
                    $automaton_provider.$accept = $automaton_provider.$accept ? 0 : 1;
                }
                dba_Automaton_removeDeadTransitions($a);
                if (!$minimize)
                    break a;
                dba_Automaton_minimize($a);
                break a;
            case 9:
                $a = dba_BasicAutomata_makeChar($this.$c);
                break a;
            case 10:
                $a = dba_BasicAutomata_makeCharRange($this.$from, $this.$to1);
                break a;
            case 11:
                $a = dba_BasicAutomata_makeCharRange(0, 65535);
                break a;
            case 12:
                $a = dba_BasicAutomata_makeEmpty();
                break a;
            case 13:
                $a = dba_BasicAutomata_makeString($this.$s);
                break a;
            case 14:
                $a = dba_Automaton__init_();
                $automata = dba_State__init_();
                $a.$initial = $automata;
                $automata.$accept = 1;
                $automaton_provider = $automata.$transitions;
                $list = dba_Transition__init_(0, 65535, $automata);
                ju_HashSet_add($automaton_provider, $list);
                $a.$deterministic = 1;
                break a;
            case 15:
                $aa = null;
                if ($automata !== null)
                    $aa = $automata.$get1($this.$s);
                if ($aa === null && $automaton_provider !== null)
                    b: {
                        try {
                            $aa = $automaton_provider.$getAutomaton($this.$s);
                            break b;
                        } catch ($$e) {
                            $$je = $rt_wrapException($$e);
                            if ($$je instanceof ji_IOException) {
                                $e = $$je;
                            } else {
                                throw $$e;
                            }
                        }
                        $automata = new jl_IllegalArgumentException;
                        jl_RuntimeException__init_0($automata, $e);
                        $rt_throw($automata);
                    }
                if ($aa !== null) {
                    $a = $aa.$clone0();
                    break a;
                }
                $automata = new jl_IllegalArgumentException;
                $automaton_provider = new jl_StringBuilder;
                jl_AbstractStringBuilder__init_($automaton_provider);
                jl_RuntimeException__init_($automata, jl_AbstractStringBuilder_toString(jl_StringBuilder_append0(jl_StringBuilder_append0(jl_StringBuilder_append0($automaton_provider, $rt_s(29)), $this.$s), $rt_s(30))));
                $rt_throw($automata);
            case 16:
                $a = dba_BasicAutomata_makeInterval($this.$min1, $this.$max2, $this.$digits);
                break a;
            default:
        }
    }
    return $a;
},
dba_RegExp_findLeaves = ($this, $exp, $kind, $list, $automata, $automaton_provider, $minimize) => {
    if ($exp.$kind !== $kind) {
        $exp = dba_RegExp_toAutomaton($exp, $automata, $automaton_provider, $minimize);
        ju_ArrayList_add($list, $exp);
    } else {
        dba_RegExp_findLeaves($this, $exp.$exp1, $kind, $list, $automata, $automaton_provider, $minimize);
        dba_RegExp_findLeaves($this, $exp.$exp2, $kind, $list, $automata, $automaton_provider, $minimize);
    }
},
dba_RegExp_makeUnion = ($exp1, $exp2) => {
    let $r;
    $r = new dba_RegExp;
    $r.$kind = dba_RegExp$Kind_REGEXP_UNION;
    $r.$exp1 = $exp1;
    $r.$exp2 = $exp2;
    return $r;
},
dba_RegExp_makeString0 = ($exp1, $exp2) => {
    let $b;
    $b = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($b);
    if ($exp1.$kind === dba_RegExp$Kind_REGEXP_STRING)
        jl_StringBuilder_append0($b, $exp1.$s);
    else
        jl_AbstractStringBuilder_append($b, $exp1.$c);
    if ($exp2.$kind === dba_RegExp$Kind_REGEXP_STRING)
        jl_StringBuilder_append0($b, $exp2.$s);
    else
        jl_AbstractStringBuilder_append($b, $exp2.$c);
    return dba_RegExp_makeString(jl_AbstractStringBuilder_toString($b));
},
dba_RegExp_makeIntersection = ($exp1, $exp2) => {
    let $r;
    $r = new dba_RegExp;
    $r.$kind = dba_RegExp$Kind_REGEXP_INTERSECTION;
    $r.$exp1 = $exp1;
    $r.$exp2 = $exp2;
    return $r;
},
dba_RegExp_makeRepeat = ($exp, $min) => {
    let $r;
    $r = new dba_RegExp;
    $r.$kind = dba_RegExp$Kind_REGEXP_REPEAT_MIN;
    $r.$exp1 = $exp;
    $r.$min1 = $min;
    return $r;
},
dba_RegExp_makeComplement = $exp => {
    let $r;
    $r = new dba_RegExp;
    $r.$kind = dba_RegExp$Kind_REGEXP_COMPLEMENT;
    $r.$exp1 = $exp;
    return $r;
},
dba_RegExp_makeChar = $c => {
    let $r;
    $r = new dba_RegExp;
    $r.$kind = dba_RegExp$Kind_REGEXP_CHAR;
    $r.$c = $c;
    return $r;
},
dba_RegExp_makeAnyChar = () => {
    let $r;
    $r = new dba_RegExp;
    $r.$kind = dba_RegExp$Kind_REGEXP_ANYCHAR;
    return $r;
},
dba_RegExp_makeString = $s => {
    let $r;
    $r = new dba_RegExp;
    $r.$kind = dba_RegExp$Kind_REGEXP_STRING;
    $r.$s = $s;
    return $r;
},
dba_RegExp_makeInterval = ($min, $max, $digits) => {
    let $r;
    $r = new dba_RegExp;
    $r.$kind = dba_RegExp$Kind_REGEXP_INTERVAL;
    $r.$min1 = $min;
    $r.$max2 = $max;
    $r.$digits = $digits;
    return $r;
},
dba_RegExp_peek = ($this, $s) => {
    return dba_RegExp_more($this) && jl_String_indexOf0($s, jl_String_charAt($this.$b, $this.$pos)) != (-1) ? 1 : 0;
},
dba_RegExp_match = ($this, $c) => {
    if ($this.$pos >= $this.$b.$nativeString.length)
        return 0;
    if (jl_String_charAt($this.$b, $this.$pos) != $c)
        return 0;
    $this.$pos = $this.$pos + 1 | 0;
    return 1;
},
dba_RegExp_more = $this => {
    return $this.$pos >= $this.$b.$nativeString.length ? 0 : 1;
},
dba_RegExp_next = $this => {
    let var$1, var$2;
    if (!dba_RegExp_more($this)) {
        var$1 = new jl_IllegalArgumentException;
        jl_RuntimeException__init_(var$1, $rt_s(31));
        $rt_throw(var$1);
    }
    var$1 = $this.$b;
    var$2 = $this.$pos;
    $this.$pos = var$2 + 1 | 0;
    return jl_String_charAt(var$1, var$2);
},
dba_RegExp_check = ($this, $flag) => {
    return !($this.$flags1 & $flag) ? 0 : 1;
},
dba_RegExp_parseUnionExp = $this => {
    let $e;
    $e = dba_RegExp_parseInterExp($this);
    if (dba_RegExp_match($this, 124))
        $e = dba_RegExp_makeUnion($e, dba_RegExp_parseUnionExp($this));
    return $e;
},
dba_RegExp_parseInterExp = $this => {
    let $e;
    $e = dba_RegExp_parseConcatExp($this);
    if (dba_RegExp_check($this, 1) && dba_RegExp_match($this, 38))
        $e = dba_RegExp_makeIntersection($e, dba_RegExp_parseInterExp($this));
    return $e;
},
dba_RegExp_parseConcatExp = $this => {
    let $e, $e_0, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13;
    $e = dba_RegExp_parseComplExp($this);
    while (true) {
        if (!dba_RegExp_peek($this, $rt_s(32))) {
            if (!dba_RegExp_more($this))
                $e_0 = $e;
            else if (dba_RegExp_peek($this, $rt_s(33)))
                $e_0 = $e;
            else if (dba_RegExp_check($this, 1) && dba_RegExp_peek($this, $rt_s(34)))
                $e_0 = $e;
            else
                a: {
                    var$3 = dba_RegExp_parseConcatExp($this);
                    $e_0 = $e.$kind;
                    var$4 = dba_RegExp$Kind_REGEXP_CHAR;
                    if (!($e_0 !== var$4 && $e_0 !== dba_RegExp$Kind_REGEXP_STRING)) {
                        $e_0 = var$3.$kind;
                        if (!($e_0 !== var$4 && $e_0 !== dba_RegExp$Kind_REGEXP_STRING)) {
                            $e_0 = dba_RegExp_makeString0($e, var$3);
                            break a;
                        }
                    }
                    b: {
                        $e_0 = new dba_RegExp;
                        var$5 = dba_RegExp$Kind_REGEXP_CONCATENATION;
                        $e_0.$kind = var$5;
                        var$6 = $e.$kind;
                        if (var$6 === var$5) {
                            var$7 = $e.$exp2;
                            var$8 = var$7.$kind;
                            if (!(var$8 !== var$4 && var$8 !== dba_RegExp$Kind_REGEXP_STRING)) {
                                var$9 = var$3.$kind;
                                if (!(var$9 !== var$4 && var$9 !== dba_RegExp$Kind_REGEXP_STRING)) {
                                    $e_0.$exp1 = $e.$exp1;
                                    $e_0.$exp2 = dba_RegExp_makeString0(var$7, var$3);
                                    break b;
                                }
                            }
                        }
                        c: {
                            if (!(var$6 !== var$4 && var$6 !== dba_RegExp$Kind_REGEXP_STRING) && var$3.$kind === var$5) {
                                var$5 = var$3.$exp1;
                                var$9 = var$5.$kind;
                                if (var$9 === var$4)
                                    break c;
                                if (var$9 === dba_RegExp$Kind_REGEXP_STRING)
                                    break c;
                            }
                            $e_0.$exp1 = $e;
                            $e_0.$exp2 = var$3;
                            break b;
                        }
                        $e_0.$exp1 = dba_RegExp_makeString0($e, var$5);
                        $e_0.$exp2 = var$3.$exp2;
                    }
                }
            return $e_0;
        }
        if (dba_RegExp_match($this, 63)) {
            $e_0 = new dba_RegExp;
            $e_0.$kind = dba_RegExp$Kind_REGEXP_OPTIONAL;
            $e_0.$exp1 = $e;
            $e = $e_0;
            continue;
        }
        if (dba_RegExp_match($this, 42)) {
            $e_0 = new dba_RegExp;
            $e_0.$kind = dba_RegExp$Kind_REGEXP_REPEAT;
            $e_0.$exp1 = $e;
            $e = $e_0;
            continue;
        }
        if (dba_RegExp_match($this, 43)) {
            $e = dba_RegExp_makeRepeat($e, 1);
            continue;
        }
        if (!dba_RegExp_match($this, 123))
            continue;
        var$10 = $this.$pos;
        while (dba_RegExp_peek($this, $rt_s(35))) {
            dba_RegExp_next($this);
        }
        var$11 = $this.$pos;
        if (var$10 == var$11) {
            $e_0 = new jl_IllegalArgumentException;
            $e = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($e);
            jl_RuntimeException__init_($e_0, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0($e, $rt_s(36)), $this.$pos)));
            $rt_throw($e_0);
        }
        var$10 = jl_Integer_parseInt0(jl_String_substring($this.$b, var$10, var$11));
        var$11 = (-1);
        if (!dba_RegExp_match($this, 44))
            var$11 = var$10;
        else {
            var$12 = $this.$pos;
            while (dba_RegExp_peek($this, $rt_s(35))) {
                dba_RegExp_next($this);
            }
            var$13 = $this.$pos;
            if (var$12 != var$13)
                var$11 = jl_Integer_parseInt0(jl_String_substring($this.$b, var$12, var$13));
        }
        if (!dba_RegExp_match($this, 125))
            break;
        if (var$11 == (-1))
            $e_0 = dba_RegExp_makeRepeat($e, var$10);
        else {
            $e_0 = new dba_RegExp;
            $e_0.$kind = dba_RegExp$Kind_REGEXP_REPEAT_MINMAX;
            $e_0.$exp1 = $e;
            $e_0.$min1 = var$10;
            $e_0.$max2 = var$11;
        }
        $e = $e_0;
    }
    $e_0 = new jl_IllegalArgumentException;
    $e = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($e);
    jl_RuntimeException__init_($e_0, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0($e, $rt_s(37)), $this.$pos)));
    $rt_throw($e_0);
},
dba_RegExp_parseComplExp = $this => {
    let var$1, var$2, var$3;
    if (dba_RegExp_check($this, 2) && dba_RegExp_match($this, 126))
        return dba_RegExp_makeComplement(dba_RegExp_parseComplExp($this));
    if (!dba_RegExp_match($this, 91))
        var$1 = dba_RegExp_parseSimpleExp($this);
    else {
        var$2 = 0;
        if (dba_RegExp_match($this, 94))
            var$2 = 1;
        var$1 = dba_RegExp_parseCharClass($this);
        while (dba_RegExp_more($this) && !dba_RegExp_peek($this, $rt_s(38))) {
            var$1 = dba_RegExp_makeUnion(var$1, dba_RegExp_parseCharClass($this));
        }
        if (var$2)
            var$1 = dba_RegExp_makeIntersection(dba_RegExp_makeAnyChar(), dba_RegExp_makeComplement(var$1));
        if (!dba_RegExp_match($this, 93)) {
            var$3 = new jl_IllegalArgumentException;
            var$1 = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_(var$1);
            jl_RuntimeException__init_(var$3, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0(var$1, $rt_s(39)), $this.$pos)));
            $rt_throw(var$3);
        }
    }
    return var$1;
},
dba_RegExp_parseCharClass = $this => {
    let $c, var$2, var$3;
    $c = dba_RegExp_parseCharExp($this);
    if (!dba_RegExp_match($this, 45))
        return dba_RegExp_makeChar($c);
    if (dba_RegExp_peek($this, $rt_s(38)))
        return dba_RegExp_makeUnion(dba_RegExp_makeChar($c), dba_RegExp_makeChar(45));
    var$2 = dba_RegExp_parseCharExp($this);
    var$3 = new dba_RegExp;
    var$3.$kind = dba_RegExp$Kind_REGEXP_CHAR_RANGE;
    var$3.$from = $c;
    var$3.$to1 = var$2;
    return var$3;
},
dba_RegExp_parseSimpleExp = $this => {
    let $s, $start, $smin, $e, $i, $smax, $imin, $imax, $digits, $$je;
    if (dba_RegExp_match($this, 46))
        return dba_RegExp_makeAnyChar();
    if (dba_RegExp_check($this, 4) && dba_RegExp_match($this, 35)) {
        $s = new dba_RegExp;
        $s.$kind = dba_RegExp$Kind_REGEXP_EMPTY;
        return $s;
    }
    if (dba_RegExp_check($this, 8) && dba_RegExp_match($this, 64)) {
        $s = new dba_RegExp;
        $s.$kind = dba_RegExp$Kind_REGEXP_ANYSTRING;
        return $s;
    }
    if (dba_RegExp_match($this, 34)) {
        $start = $this.$pos;
        while (dba_RegExp_more($this) && !dba_RegExp_peek($this, $rt_s(40))) {
            dba_RegExp_next($this);
        }
        if (dba_RegExp_match($this, 34))
            return dba_RegExp_makeString(jl_String_substring($this.$b, $start, $this.$pos - 1 | 0));
        $s = new jl_IllegalArgumentException;
        $smin = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($smin);
        jl_RuntimeException__init_($s, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0($smin, $rt_s(41)), $this.$pos)));
        $rt_throw($s);
    }
    if (dba_RegExp_match($this, 40)) {
        if (dba_RegExp_match($this, 41))
            return dba_RegExp_makeString($rt_s(2));
        $e = dba_RegExp_parseUnionExp($this);
        if (dba_RegExp_match($this, 41))
            return $e;
        $s = new jl_IllegalArgumentException;
        $smin = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($smin);
        jl_RuntimeException__init_($s, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0($smin, $rt_s(42)), $this.$pos)));
        $rt_throw($s);
    }
    if (!(!dba_RegExp_check($this, 16) && !dba_RegExp_check($this, 32)) && dba_RegExp_match($this, 60)) {
        $start = $this.$pos;
        while (dba_RegExp_more($this) && !dba_RegExp_peek($this, $rt_s(43))) {
            dba_RegExp_next($this);
        }
        if (!dba_RegExp_match($this, 62)) {
            $s = new jl_IllegalArgumentException;
            $smin = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($smin);
            jl_RuntimeException__init_($s, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0($smin, $rt_s(44)), $this.$pos)));
            $rt_throw($s);
        }
        $s = jl_String_substring($this.$b, $start, $this.$pos - 1 | 0);
        $i = jl_String_indexOf0($s, 45);
        if ($i == (-1)) {
            if (dba_RegExp_check($this, 16)) {
                $smin = new dba_RegExp;
                $smin.$kind = dba_RegExp$Kind_REGEXP_AUTOMATON;
                $smin.$s = $s;
                return $smin;
            }
            $s = new jl_IllegalArgumentException;
            $smin = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($smin);
            jl_RuntimeException__init_($s, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0($smin, $rt_s(45)), $this.$pos - 1 | 0)));
            $rt_throw($s);
        }
        if (!dba_RegExp_check($this, 32)) {
            $s = new jl_IllegalArgumentException;
            $smin = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($smin);
            jl_RuntimeException__init_($s, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0($smin, $rt_s(46)), $this.$pos - 1 | 0)));
            $rt_throw($s);
        }
        a: {
            try {
                if (!($i && $i != (jl_String_length($s) - 1 | 0) && $i == jl_String_lastIndexOf0($s, 45)))
                    $rt_throw(jl_NumberFormatException__init_0());
                $smin = jl_String_substring($s, 0, $i);
                $smax = jl_String_substring($s, $i + 1 | 0, jl_String_length($s));
                $imin = jl_Integer_parseInt0($smin);
                $imax = jl_Integer_parseInt0($smax);
                $digits = jl_String_length($smin) != jl_String_length($smax) ? 0 : jl_String_length($smin);
                if ($imin <= $imax) {
                    $i = $imax;
                    $imax = $imin;
                    $imin = $i;
                }
                $s = dba_RegExp_makeInterval($imax, $imin, $digits);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return $s;
        }
        $s = new jl_IllegalArgumentException;
        $smin = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($smin);
        jl_RuntimeException__init_($s, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0($smin, $rt_s(45)), $this.$pos - 1 | 0)));
        $rt_throw($s);
    }
    return dba_RegExp_makeChar(dba_RegExp_parseCharExp($this));
},
dba_RegExp_parseCharExp = $this => {
    dba_RegExp_match($this, 92);
    return dba_RegExp_next($this);
},
dba_RegExp__clinit_ = () => {
    dba_RegExp_allow_mutation = 0;
};
function jur_MatchResultImpl() {
    let a = this; jl_Object.call(a);
    a.$groupBounds = null;
    a.$consumers = null;
    a.$compQuantCounters = null;
    a.$string3 = null;
    a.$groupCount0 = 0;
    a.$valid = 0;
    a.$leftBound = 0;
    a.$rightBound = 0;
    a.$startIndex = 0;
    a.$transparentBounds = 0;
    a.$anchoringBounds = 0;
    a.$hitEnd = 0;
    a.$requireEnd = 0;
    a.$previousMatch = 0;
    a.$mode0 = 0;
}
let jur_MatchResultImpl_setConsumed = ($this, $counter, $value) => {
    $this.$consumers.data[$counter] = $value;
},
jur_MatchResultImpl_getConsumed = ($this, $counter) => {
    return $this.$consumers.data[$counter];
},
jur_MatchResultImpl_end = $this => {
    return jur_MatchResultImpl_end0($this, 0);
},
jur_MatchResultImpl_end0 = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_setStart = ($this, $group, $offset) => {
    $this.$groupBounds.data[$group * 2 | 0] = $offset;
},
jur_MatchResultImpl_setEnd = ($this, $group, $offset) => {
    $this.$groupBounds.data[($group * 2 | 0) + 1 | 0] = $offset;
},
jur_MatchResultImpl_getStart = ($this, $group) => {
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_getEnd = ($this, $group) => {
    return $this.$groupBounds.data[($group * 2 | 0) + 1 | 0];
},
jur_MatchResultImpl_start = ($this, $group) => {
    jur_MatchResultImpl_checkGroup($this, $group);
    return $this.$groupBounds.data[$group * 2 | 0];
},
jur_MatchResultImpl_getEnterCounter = ($this, $setCounter) => {
    return $this.$compQuantCounters.data[$setCounter];
},
jur_MatchResultImpl_setEnterCounter = ($this, $setCounter, $value) => {
    $this.$compQuantCounters.data[$setCounter] = $value;
},
jur_MatchResultImpl_checkGroup = ($this, $group) => {
    let var$2;
    if (!$this.$valid) {
        var$2 = new jl_IllegalStateException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    if ($group >= 0 && $group < $this.$groupCount0)
        return;
    var$2 = new jl_IndexOutOfBoundsException;
    jl_RuntimeException__init_(var$2, jl_String_valueOf0($group));
    $rt_throw(var$2);
},
jur_MatchResultImpl_reset = ($this, $newSequence, $leftBound, $rightBound) => {
    $this.$valid = 0;
    $this.$mode0 = 2;
    ju_Arrays_fill($this.$groupBounds, (-1));
    ju_Arrays_fill($this.$consumers, (-1));
    if ($newSequence !== null)
        $this.$string3 = $newSequence;
    if ($leftBound >= 0) {
        $this.$leftBound = $leftBound;
        $this.$rightBound = $rightBound;
    }
    $this.$startIndex = $this.$leftBound;
},
otj_JSObject = $rt_classWithoutFields(0),
otjc_JSString = $rt_classWithoutFields();
function dba_AutomatonMatcher() {
    let a = this; jl_Object.call(a);
    a.$automaton = null;
    a.$chars1 = null;
    a.$matchStart = 0;
    a.$matchEnd = 0;
}
let dba_AutomatonMatcher_find = $this => {
    let $match_start, $begin, var$3, $match_end, $l, $new_state, $i, var$8, var$9, var$10, var$11, var$12, var$13;
    a: {
        $match_start = $this.$matchStart;
        switch ($match_start) {
            case -2:
                break;
            case -1:
                $begin = 0;
                break a;
            default:
                $begin = $this.$matchEnd;
                if ($begin != $match_start)
                    break a;
                $begin = $begin + 1 | 0;
                if ($begin > $this.$chars1.$nativeString.length) {
                    dba_AutomatonMatcher_setMatch($this, (-2), (-2));
                    return 0;
                }
                break a;
        }
        return 0;
    }
    var$3 = $this.$automaton;
    if (!dba_RunAutomaton_isAccept(var$3, var$3.$initial0)) {
        $match_start = (-1);
        $match_end = (-1);
    } else {
        $match_start = $begin;
        $match_end = $begin;
    }
    $l = $this.$chars1.$nativeString.length;
    while (true) {
        if ($begin >= $l) {
            if ($match_start != (-1)) {
                dba_AutomatonMatcher_setMatch($this, $match_start, $match_end);
                return 1;
            }
            dba_AutomatonMatcher_setMatch($this, (-2), (-2));
            return 0;
        }
        $new_state = $this.$automaton.$initial0;
        $i = $begin;
        b: {
            while (true) {
                if ($i >= $l)
                    break b;
                var$3 = $this.$automaton;
                var$8 = jl_String_charAt($this.$chars1, $i);
                var$9 = var$3.$classmap;
                if (var$9 !== null) {
                    var$9 = var$9.data;
                    $new_state = var$3.$transitions0.data[$rt_imul($new_state, var$3.$points.data.length) + var$9[var$8 - 0 | 0] | 0];
                } else {
                    var$9 = var$3.$transitions0;
                    var$10 = var$3.$points.data;
                    var$11 = var$10.length;
                    $new_state = $rt_imul($new_state, var$11);
                    var$12 = 0;
                    c: {
                        while ((var$11 - var$12 | 0) > 1) {
                            var$13 = (var$12 + var$11 | 0) >>> 1 | 0;
                            if (var$10[var$13] <= var$8) {
                                if (var$10[var$13] >= var$8) {
                                    var$12 = var$13;
                                    break c;
                                }
                                var$12 = var$13;
                                var$13 = var$11;
                            }
                            var$11 = var$13;
                        }
                    }
                    $new_state = var$9.data[$new_state + var$12 | 0];
                }
                if ($new_state == (-1))
                    break;
                if (dba_RunAutomaton_isAccept($this.$automaton, $new_state)) {
                    $match_end = $i + 1 | 0;
                    $match_start = $begin;
                }
                $i = $i + 1 | 0;
            }
        }
        if ($match_start != (-1))
            break;
        $begin = $begin + 1 | 0;
    }
    dba_AutomatonMatcher_setMatch($this, $match_start, $match_end);
    return 1;
},
dba_AutomatonMatcher_setMatch = ($this, $matchStart, $matchEnd) => {
    let var$3, var$4;
    if ($matchStart <= $matchEnd) {
        $this.$matchStart = $matchStart;
        $this.$matchEnd = $matchEnd;
        return;
    }
    var$3 = new jl_IllegalArgumentException;
    var$4 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$4);
    jl_RuntimeException__init_(var$3, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append0(jl_StringBuilder_append1(jl_StringBuilder_append0(var$4, $rt_s(47)), $matchStart), $rt_s(48)), $matchEnd)));
    $rt_throw(var$3);
},
dba_AutomatonMatcher_end = $this => {
    dba_AutomatonMatcher_matchGood($this);
    return $this.$matchEnd;
},
dba_AutomatonMatcher_start = $this => {
    dba_AutomatonMatcher_matchGood($this);
    return $this.$matchStart;
},
dba_AutomatonMatcher_matchGood = $this => {
    let var$1;
    if ($this.$matchStart >= 0 && $this.$matchEnd >= 0)
        return;
    var$1 = new jl_IllegalStateException;
    jl_RuntimeException__init_(var$1, $rt_s(49));
    $rt_throw(var$1);
},
jl_NullPointerException = $rt_classWithoutFields(jl_RuntimeException);
function jur_AbstractSet() {
    let a = this; jl_Object.call(a);
    a.$next2 = null;
    a.$isSecondPassVisited = 0;
    a.$index3 = null;
    a.$type = 0;
}
let jur_AbstractSet_counter = 0,
jur_AbstractSet__init_ = $this => {
    let var$1;
    var$1 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$1 + 1 | 0;
    $this.$index3 = jl_Integer_toString(var$1);
},
jur_AbstractSet__init_0 = ($this, $n) => {
    let var$2;
    var$2 = jur_AbstractSet_counter;
    jur_AbstractSet_counter = var$2 + 1 | 0;
    $this.$index3 = jl_Integer_toString(var$2);
    $this.$next2 = $n;
},
jur_AbstractSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $length;
    $length = $matchResult.$rightBound;
    while (true) {
        if ($stringIndex > $length)
            return (-1);
        if ($this.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_AbstractSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($this.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
},
jur_AbstractSet_setType = ($this, $type) => {
    $this.$type = $type;
},
jur_AbstractSet_getType = $this => {
    return $this.$type;
},
jur_AbstractSet_getNext = $this => {
    return $this.$next2;
},
jur_AbstractSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_AbstractSet_first = ($this, $set) => {
    return 1;
},
jur_AbstractSet_processBackRefReplacement = $this => {
    return null;
},
jur_AbstractSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$next2;
    if ($set !== null) {
        if (!$set.$isSecondPassVisited) {
            $set = $set.$processBackRefReplacement();
            if ($set !== null) {
                $this.$next2.$isSecondPassVisited = 1;
                $this.$next2 = $set;
            }
            $this.$next2.$processSecondPass();
        } else if ($set instanceof jur_SingleSet && $set.$fSet.$isBackReferenced)
            $this.$next2 = $set.$next2;
    }
},
jur_AbstractSet__clinit_ = () => {
    jur_AbstractSet_counter = 1;
};
function jl_Enum() {
    let a = this; jl_Object.call(a);
    a.$name0 = null;
    a.$ordinal = 0;
}
let dba_RegExp$Kind = $rt_classWithoutFields(jl_Enum),
dba_RegExp$Kind_REGEXP_UNION = null,
dba_RegExp$Kind_REGEXP_CONCATENATION = null,
dba_RegExp$Kind_REGEXP_INTERSECTION = null,
dba_RegExp$Kind_REGEXP_OPTIONAL = null,
dba_RegExp$Kind_REGEXP_REPEAT = null,
dba_RegExp$Kind_REGEXP_REPEAT_MIN = null,
dba_RegExp$Kind_REGEXP_REPEAT_MINMAX = null,
dba_RegExp$Kind_REGEXP_COMPLEMENT = null,
dba_RegExp$Kind_REGEXP_CHAR = null,
dba_RegExp$Kind_REGEXP_CHAR_RANGE = null,
dba_RegExp$Kind_REGEXP_ANYCHAR = null,
dba_RegExp$Kind_REGEXP_EMPTY = null,
dba_RegExp$Kind_REGEXP_STRING = null,
dba_RegExp$Kind_REGEXP_ANYSTRING = null,
dba_RegExp$Kind_REGEXP_AUTOMATON = null,
dba_RegExp$Kind_REGEXP_INTERVAL = null,
dba_RegExp$Kind_$VALUES = null,
dba_RegExp$Kind__init_0 = ($this, var$1, var$2) => {
    $this.$name0 = var$1;
    $this.$ordinal = var$2;
},
dba_RegExp$Kind__init_ = (var_0, var_1) => {
    let var_2 = new dba_RegExp$Kind();
    dba_RegExp$Kind__init_0(var_2, var_0, var_1);
    return var_2;
},
dba_RegExp$Kind__clinit_ = () => {
    let var$1, var$2, var$3;
    dba_RegExp$Kind_REGEXP_UNION = dba_RegExp$Kind__init_($rt_s(50), 0);
    dba_RegExp$Kind_REGEXP_CONCATENATION = dba_RegExp$Kind__init_($rt_s(51), 1);
    dba_RegExp$Kind_REGEXP_INTERSECTION = dba_RegExp$Kind__init_($rt_s(52), 2);
    dba_RegExp$Kind_REGEXP_OPTIONAL = dba_RegExp$Kind__init_($rt_s(53), 3);
    dba_RegExp$Kind_REGEXP_REPEAT = dba_RegExp$Kind__init_($rt_s(54), 4);
    dba_RegExp$Kind_REGEXP_REPEAT_MIN = dba_RegExp$Kind__init_($rt_s(55), 5);
    dba_RegExp$Kind_REGEXP_REPEAT_MINMAX = dba_RegExp$Kind__init_($rt_s(56), 6);
    dba_RegExp$Kind_REGEXP_COMPLEMENT = dba_RegExp$Kind__init_($rt_s(57), 7);
    dba_RegExp$Kind_REGEXP_CHAR = dba_RegExp$Kind__init_($rt_s(58), 8);
    dba_RegExp$Kind_REGEXP_CHAR_RANGE = dba_RegExp$Kind__init_($rt_s(59), 9);
    dba_RegExp$Kind_REGEXP_ANYCHAR = dba_RegExp$Kind__init_($rt_s(60), 10);
    dba_RegExp$Kind_REGEXP_EMPTY = dba_RegExp$Kind__init_($rt_s(61), 11);
    dba_RegExp$Kind_REGEXP_STRING = dba_RegExp$Kind__init_($rt_s(62), 12);
    dba_RegExp$Kind_REGEXP_ANYSTRING = dba_RegExp$Kind__init_($rt_s(63), 13);
    dba_RegExp$Kind_REGEXP_AUTOMATON = dba_RegExp$Kind__init_($rt_s(64), 14);
    var$1 = dba_RegExp$Kind__init_($rt_s(65), 15);
    dba_RegExp$Kind_REGEXP_INTERVAL = var$1;
    var$2 = $rt_createArray(dba_RegExp$Kind, 16);
    var$3 = var$2.data;
    var$3[0] = dba_RegExp$Kind_REGEXP_UNION;
    var$3[1] = dba_RegExp$Kind_REGEXP_CONCATENATION;
    var$3[2] = dba_RegExp$Kind_REGEXP_INTERSECTION;
    var$3[3] = dba_RegExp$Kind_REGEXP_OPTIONAL;
    var$3[4] = dba_RegExp$Kind_REGEXP_REPEAT;
    var$3[5] = dba_RegExp$Kind_REGEXP_REPEAT_MIN;
    var$3[6] = dba_RegExp$Kind_REGEXP_REPEAT_MINMAX;
    var$3[7] = dba_RegExp$Kind_REGEXP_COMPLEMENT;
    var$3[8] = dba_RegExp$Kind_REGEXP_CHAR;
    var$3[9] = dba_RegExp$Kind_REGEXP_CHAR_RANGE;
    var$3[10] = dba_RegExp$Kind_REGEXP_ANYCHAR;
    var$3[11] = dba_RegExp$Kind_REGEXP_EMPTY;
    var$3[12] = dba_RegExp$Kind_REGEXP_STRING;
    var$3[13] = dba_RegExp$Kind_REGEXP_ANYSTRING;
    var$3[14] = dba_RegExp$Kind_REGEXP_AUTOMATON;
    var$3[15] = var$1;
    dba_RegExp$Kind_$VALUES = var$2;
},
jl_Cloneable = $rt_classWithoutFields(0);
function dba_Automaton() {
    let a = this; jl_Object.call(a);
    a.$initial = null;
    a.$deterministic = 0;
    a.$hash_code = 0;
    a.$singleton = null;
}
let dba_Automaton_minimization = 0,
dba_Automaton_minimize_always = 0,
dba_Automaton_allow_mutation = 0,
dba_Automaton_is_debug = null,
dba_Automaton__init_0 = $this => {
    $this.$initial = dba_State__init_();
    $this.$deterministic = 1;
    $this.$singleton = null;
},
dba_Automaton__init_ = () => {
    let var_0 = new dba_Automaton();
    dba_Automaton__init_0(var_0);
    return var_0;
},
dba_Automaton_isDebug = $this => {
    let var$1, var$2, var$3;
    if (dba_Automaton_is_debug === null) {
        if (jl_System_properties === null) {
            var$1 = new ju_Properties;
            ju_Hashtable__init_(var$1);
            var$2 = var$1;
            ju_Hashtable_put(var$2, $rt_s(66), $rt_s(67));
            ju_Hashtable_put(var$2, $rt_s(68), $rt_s(69));
            ju_Hashtable_put(var$2, $rt_s(70), $rt_s(71));
            ju_Hashtable_put(var$2, $rt_s(72), $rt_s(73));
            ju_Hashtable_put(var$2, $rt_s(74), $rt_s(75));
            ju_Hashtable_put(var$2, $rt_s(76), $rt_s(77));
            ju_Hashtable_put(var$2, $rt_s(78), $rt_s(67));
            ju_Hashtable_put(var$2, $rt_s(79), $rt_s(71));
            var$3 = new ju_Properties;
            ju_Hashtable__init_(var$3);
            var$3.$defaults = var$1;
            jl_System_properties = var$3;
        }
        dba_Automaton_is_debug = !(ju_Properties_getProperty(jl_System_properties, $rt_s(80)) === null ? 0 : 1) ? jl_Boolean_FALSE : jl_Boolean_TRUE;
    }
    return dba_Automaton_is_debug.$value3;
},
dba_Automaton_setAllowMutate = $flag => {
    let $b;
    $b = dba_Automaton_allow_mutation;
    dba_Automaton_allow_mutation = $flag;
    return $b;
},
dba_Automaton_checkMinimizeAlways = $this => {
    if (dba_Automaton_minimize_always)
        dba_Automaton_minimize($this);
},
dba_Automaton_isSingleton = $this => {
    return $this.$singleton === null ? 0 : 1;
},
dba_Automaton_getStates = $this => {
    let $visited, $worklist, $s, var$4, var$5, $t;
    dba_Automaton_expandSingleton($this);
    if (!dba_Automaton_isDebug($this))
        $visited = ju_HashSet__init_();
    else {
        $visited = new ju_LinkedHashSet;
        $worklist = new ju_LinkedHashMap;
        ju_HashMap__init_1($worklist);
        $worklist.$accessOrder = 0;
        $worklist.$head = null;
        ju_HashSet__init_0($visited, $worklist);
    }
    $worklist = new ju_LinkedList;
    $s = $this.$initial;
    var$4 = $worklist;
    ju_AbstractList_add(var$4, $s);
    $s = $this.$initial;
    var$5 = $visited;
    ju_HashSet_add(var$5, $s);
    while ($worklist.$size1 > 0) {
        $s = ju_LinkedList_removeFirst($worklist);
        $s = (!dba_Automaton_isDebug($this) ? $s.$transitions : dba_State_getSortedTransitions($s, 0)).$iterator();
        while ($s.$hasNext()) {
            $t = $s.$next0();
            if (!ju_HashSet_contains(var$5, $t.$to)) {
                ju_HashSet_add(var$5, $t.$to);
                ju_AbstractList_add(var$4, $t.$to);
            }
        }
    }
    return $visited;
},
dba_Automaton_getAcceptStates = $this => {
    let $accepts, $visited, $worklist, $s, var$5, $t;
    dba_Automaton_expandSingleton($this);
    $accepts = ju_HashSet__init_();
    $visited = ju_HashSet__init_();
    $worklist = new ju_LinkedList;
    $s = $this.$initial;
    var$5 = $worklist;
    ju_AbstractList_add(var$5, $s);
    ju_HashSet_add($visited, $this.$initial);
    while ($worklist.$size1 > 0) {
        $s = ju_LinkedList_removeFirst($worklist);
        if ($s.$accept)
            ju_HashSet_add($accepts, $s);
        $s = ju_HashSet_iterator($s.$transitions);
        while ($s.$hasNext()) {
            $t = $s.$next0();
            if (!ju_HashSet_contains($visited, $t.$to)) {
                ju_HashSet_add($visited, $t.$to);
                ju_AbstractList_add(var$5, $t.$to);
            }
        }
    }
    return $accepts;
},
dba_Automaton_setStateNumbers = $states => {
    let $number, $s, var$4;
    $states = $states;
    if (ju_HashSet_size($states) == 2147483647) {
        $states = new jl_IllegalArgumentException;
        jl_RuntimeException__init_($states, $rt_s(81));
        $rt_throw($states);
    }
    $number = 0;
    $states = ju_HashSet_iterator($states);
    while ($states.$hasNext()) {
        $s = $states.$next0();
        var$4 = $number + 1 | 0;
        $s.$number = $number;
        $number = var$4;
    }
},
dba_Automaton_totalize = $this => {
    let $s, var$2, $p, $maxi, var$5, $t, var$7, var$8, var$9, var$10;
    $s = dba_State__init_();
    var$2 = $s.$transitions;
    $p = dba_Transition__init_(0, 65535, $s);
    ju_HashSet_add(var$2, $p);
    var$2 = ju_HashSet_iterator(dba_Automaton_getStates($this));
    while (var$2.$hasNext()) {
        $p = var$2.$next0();
        $maxi = 0;
        var$5 = ju_AbstractList_iterator(dba_State_getSortedTransitions($p, 0));
        while (ju_AbstractList$1_hasNext(var$5)) {
            $t = ju_AbstractList$1_next(var$5);
            var$7 = $t.$min0;
            if (var$7 > $maxi) {
                var$8 = $p.$transitions;
                var$9 = dba_Transition__init_($maxi & 65535, (var$7 - 1 | 0) & 65535, $s);
                ju_HashSet_add(var$8, var$9);
            }
            var$10 = $t.$max0 + 1 | 0;
            if (var$10 > $maxi)
                $maxi = var$10;
        }
        if ($maxi <= 65535) {
            $p = $p.$transitions;
            var$8 = dba_Transition__init_($maxi & 65535, 65535, $s);
            ju_HashSet_add($p, var$8);
        }
    }
},
dba_Automaton_reduce = $this => {
    let $states, $s, $st, $p, $min, $max, var$7, $t, var$9, var$10;
    if (dba_Automaton_isSingleton($this))
        return;
    $states = dba_Automaton_getStates($this);
    dba_Automaton_setStateNumbers($states);
    $states = ju_HashSet_iterator($states);
    while ($states.$hasNext()) {
        $s = $states.$next0();
        $st = dba_State_getSortedTransitions($s, 1);
        dba_State_resetTransitions($s);
        $p = null;
        $min = (-1);
        $max = (-1);
        var$7 = ju_AbstractList_iterator($st);
        while (ju_AbstractList$1_hasNext(var$7)) {
            $t = ju_AbstractList$1_next(var$7);
            if ($p !== $t.$to) {
                if ($p !== null) {
                    $st = $s.$transitions;
                    var$9 = dba_Transition__init_($min & 65535, $max & 65535, $p);
                    ju_HashSet_add($st, var$9);
                }
                $p = $t.$to;
                $min = $t.$min0;
                $max = $t.$max0;
            } else if ($t.$min0 <= ($max + 1 | 0)) {
                var$10 = $t.$max0;
                if (var$10 > $max)
                    $max = var$10;
            } else {
                if ($p !== null) {
                    $st = $s.$transitions;
                    var$9 = dba_Transition__init_($min & 65535, $max & 65535, $p);
                    ju_HashSet_add($st, var$9);
                }
                $min = $t.$min0;
                $max = $t.$max0;
            }
        }
        if ($p !== null) {
            $s = $s.$transitions;
            $st = dba_Transition__init_($min & 65535, $max & 65535, $p);
            ju_HashSet_add($s, $st);
        }
    }
    dba_Automaton_clearHashCode($this);
},
dba_Automaton_getStartPoints = $this => {
    let $pointset, $m, $s, $t, $n, $points, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15, var$16, var$17, var$18, var$19, var$20;
    $pointset = ju_HashSet__init_();
    $m = jl_Character_valueOf(0);
    $pointset = $pointset;
    ju_HashSet_add($pointset, $m);
    $m = ju_HashSet_iterator(dba_Automaton_getStates($this));
    while ($m.$hasNext()) {
        $s = ju_HashSet_iterator(($m.$next0()).$transitions);
        while ($s.$hasNext()) {
            $t = $s.$next0();
            ju_HashSet_add($pointset, jl_Character_valueOf($t.$min0));
            $n = $t.$max0;
            if ($n < 65535)
                ju_HashSet_add($pointset, jl_Character_valueOf(($n + 1 | 0) & 65535));
        }
    }
    $points = $rt_createCharArray(ju_HashSet_size($pointset));
    var$7 = $points.data;
    $n = 0;
    $pointset = ju_HashSet_iterator($pointset);
    while ($pointset.$hasNext()) {
        $m = $pointset.$next0();
        var$8 = $n + 1 | 0;
        var$7[$n] = $m.$value1;
        $n = var$8;
    }
    var$8 = var$7.length;
    if (var$8) {
        var$7 = $rt_createCharArray(var$8);
        var$9 = 1;
        var$10 = $points;
        while (var$9 < var$8) {
            var$11 = 0;
            while (true) {
                var$12 = var$10.data;
                var$13 = var$12.length;
                if (var$11 >= var$13)
                    break;
                var$14 = jl_Math_min(var$13, var$11 + var$9 | 0);
                var$15 = var$11 + (2 * var$9 | 0) | 0;
                var$16 = jl_Math_min(var$13, var$15);
                var$17 = var$11;
                var$18 = var$14;
                a: {
                    b: {
                        while (var$11 != var$14) {
                            if (var$18 == var$16)
                                break b;
                            $n = var$12[var$11];
                            var$19 = var$12[var$18];
                            if ($n > var$19) {
                                var$20 = var$7.data;
                                var$13 = var$17 + 1 | 0;
                                var$20[var$17] = var$19;
                                var$18 = var$18 + 1 | 0;
                            } else {
                                var$20 = var$7.data;
                                var$13 = var$17 + 1 | 0;
                                var$20[var$17] = $n;
                                var$11 = var$11 + 1 | 0;
                            }
                            var$17 = var$13;
                        }
                        while (true) {
                            if (var$18 >= var$16)
                                break a;
                            var$20 = var$7.data;
                            $n = var$17 + 1 | 0;
                            var$13 = var$18 + 1 | 0;
                            var$20[var$17] = var$12[var$18];
                            var$17 = $n;
                            var$18 = var$13;
                        }
                    }
                    while (true) {
                        if (var$11 >= var$14)
                            break a;
                        var$20 = var$7.data;
                        $n = var$17 + 1 | 0;
                        var$13 = var$11 + 1 | 0;
                        var$20[var$17] = var$12[var$11];
                        var$17 = $n;
                        var$11 = var$13;
                    }
                }
                var$11 = var$15;
            }
            var$9 = var$9 * 2 | 0;
            var$20 = var$10;
            var$10 = var$7;
            var$7 = var$20;
        }
        c: {
            if (var$10 !== $points) {
                $n = 0;
                while (true) {
                    var$20 = var$10.data;
                    if ($n >= var$20.length)
                        break c;
                    var$7.data[$n] = var$20[$n];
                    $n = $n + 1 | 0;
                }
            }
        }
    }
    return $points;
},
dba_Automaton_removeDeadTransitions = $this => {
    let $states, $s, $t, $live, $st, var$6, var$7;
    dba_Automaton_clearHashCode($this);
    if (dba_Automaton_isSingleton($this))
        return;
    $states = dba_Automaton_getStates($this);
    $s = ju_HashMap__init_();
    $t = $states;
    $live = ju_HashSet_iterator($t);
    while ($live.$hasNext()) {
        ju_HashMap_put($s, $live.$next0(), ju_HashSet__init_());
    }
    $st = ju_HashSet_iterator($t);
    while ($st.$hasNext()) {
        $live = $st.$next0();
        var$6 = ju_HashSet_iterator($live.$transitions);
        while (var$6.$hasNext()) {
            ju_HashSet_add(ju_HashMap_get($s, (var$6.$next0()).$to), $live);
        }
    }
    $live = ju_HashSet__init_1(dba_Automaton_getAcceptStates($this));
    var$7 = ju_LinkedList__init_0($live);
    var$6 = $live;
    $st = var$7;
    while (var$7.$size1 > 0) {
        $states = ju_HashSet_iterator(ju_HashMap_get($s, ju_LinkedList_removeFirst(var$7)));
        while ($states.$hasNext()) {
            $live = $states.$next0();
            if (!ju_HashSet_contains(var$6, $live)) {
                ju_HashSet_add(var$6, $live);
                ju_AbstractList_add($st, $live);
            }
        }
    }
    $states = ju_HashSet_iterator($t);
    while ($states.$hasNext()) {
        $s = $states.$next0();
        $st = $s.$transitions;
        dba_State_resetTransitions($s);
        $st = ju_HashSet_iterator($st);
        while ($st.$hasNext()) {
            $t = $st.$next0();
            if (ju_HashSet_contains(var$6, $t.$to))
                ju_HashSet_add($s.$transitions, $t);
        }
    }
    dba_Automaton_reduce($this);
},
dba_Automaton_getSortedTransitions = $states => {
    let $transitions, var$3, $s;
    dba_Automaton_setStateNumbers($states);
    $states = $states;
    $transitions = $rt_createArray($rt_arraycls(dba_Transition), ju_HashSet_size($states));
    var$3 = $transitions.data;
    $states = ju_HashSet_iterator($states);
    while ($states.$hasNext()) {
        $s = $states.$next0();
        var$3[$s.$number] = dba_State_getSortedTransitionArray($s, 0);
    }
    return $transitions;
},
dba_Automaton_expandSingleton = $this => {
    let $p, $i, $q, var$4;
    if (dba_Automaton_isSingleton($this)) {
        $p = dba_State__init_();
        $this.$initial = $p;
        $i = 0;
        while ($i < $this.$singleton.$nativeString.length) {
            $q = dba_State__init_();
            $q.$number = $i;
            $p = $p.$transitions;
            var$4 = dba_Transition__init_0(jl_String_charAt($this.$singleton, $i), $q);
            ju_HashSet_add($p, var$4);
            $i = $i + 1 | 0;
            $p = $q;
        }
        $p.$accept = 1;
        $this.$deterministic = 1;
        $this.$singleton = null;
    }
},
dba_Automaton_getNumberOfTransitions = $this => {
    let $c, var$2;
    if (dba_Automaton_isSingleton($this))
        return $this.$singleton.$nativeString.length;
    $c = 0;
    var$2 = ju_HashSet_iterator(dba_Automaton_getStates($this));
    while (var$2.$hasNext()) {
        $c = $c + ju_HashSet_size((var$2.$next0()).$transitions) | 0;
    }
    return $c;
},
dba_Automaton_equals = ($this, $obj) => {
    let $a;
    if ($obj === $this)
        return 1;
    if (!($obj instanceof dba_Automaton))
        return 0;
    $a = $obj;
    if (dba_Automaton_isSingleton($this) && dba_Automaton_isSingleton($a))
        return jl_String_equals($this.$singleton, $a.$singleton);
    return dba_Automaton_hashCode($this) == dba_Automaton_hashCode($a) && dba_Automaton_subsetOf($this, $a) && dba_Automaton_subsetOf($a, $this) ? 1 : 0;
},
dba_Automaton_hashCode = $this => {
    if (!$this.$hash_code)
        dba_Automaton_minimize($this);
    return $this.$hash_code;
},
dba_Automaton_clearHashCode = $this => {
    $this.$hash_code = 0;
},
dba_Automaton_cloneExpanded = $this => {
    let $a;
    $a = dba_Automaton_clone($this);
    dba_Automaton_expandSingleton($a);
    return $a;
},
dba_Automaton_cloneExpandedIfRequired = $this => {
    if (!dba_Automaton_allow_mutation)
        return dba_Automaton_cloneExpanded($this);
    dba_Automaton_expandSingleton($this);
    return $this;
},
dba_Automaton_clone = $this => {
    let $a, $m, $s, $states, $e, $p, $s_0, $t, $$je;
    a: {
        try {
            b: {
                $a = jl_Object_clone($this);
                if (!dba_Automaton_isSingleton($this)) {
                    $m = ju_HashMap__init_();
                    $s = dba_Automaton_getStates($this);
                    $states = ju_HashSet_iterator($s);
                    while ($states.$hasNext()) {
                        ju_HashMap_put($m, $states.$next0(), dba_State__init_());
                    }
                    $e = ju_HashSet_iterator($s);
                    while (true) {
                        if (!$e.$hasNext())
                            break b;
                        $s = $e.$next0();
                        $p = ju_HashMap_get($m, $s);
                        $p.$accept = $s.$accept;
                        if ($s === $this.$initial)
                            $a.$initial = $p;
                        $s_0 = ju_HashSet_iterator($s.$transitions);
                        while ($s_0.$hasNext()) {
                            $t = $s_0.$next0();
                            $s = $p.$transitions;
                            $states = dba_Transition__init_($t.$min0, $t.$max0, ju_HashMap_get($m, $t.$to));
                            ju_HashSet_add($s, $states);
                        }
                    }
                }
            }
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            if ($$je instanceof jl_CloneNotSupportedException) {
                $e = $$je;
                break a;
            } else {
                throw $$e;
            }
        }
        return $a;
    }
    $rt_throw(jl_RuntimeException__init_1($e));
},
dba_Automaton_cloneIfRequired = $this => {
    if (dba_Automaton_allow_mutation)
        return $this;
    return dba_Automaton_clone($this);
},
dba_Automaton_subsetOf = ($this, $a) => {
    return dba_BasicOperations_subsetOf($this, $a);
},
dba_Automaton_determinize = $this => {
    let var$1, var$2;
    if (!$this.$deterministic && !dba_Automaton_isSingleton($this)) {
        var$1 = ju_HashSet__init_();
        var$2 = $this.$initial;
        ju_HashSet_add(var$1, var$2);
        dba_BasicOperations_determinize($this, var$1);
    }
},
dba_Automaton_isEmpty = $this => {
    let var$1, var$2;
    if (dba_Automaton_isSingleton($this))
        var$1 = 0;
    else {
        var$2 = $this.$initial;
        var$1 = !var$2.$accept && ju_HashSet_isEmpty(var$2.$transitions) ? 1 : 0;
    }
    return var$1;
},
dba_Automaton_run = ($this, $s) => {
    let var$2, var$3, var$4, var$5, var$6, var$7, var$8, var$9, var$10, var$11, var$12, var$13, var$14, var$15;
    a: {
        if (dba_Automaton_isSingleton($this))
            var$2 = jl_String_equals($s, $this.$singleton);
        else if ($this.$deterministic) {
            var$3 = $this.$initial;
            var$4 = 0;
            while (var$4 < $s.$nativeString.length) {
                var$3 = dba_State_step(var$3, jl_String_charAt($s, var$4));
                if (var$3 === null) {
                    var$2 = 0;
                    break a;
                }
                var$4 = var$4 + 1 | 0;
            }
            var$2 = var$3.$accept;
        } else {
            var$3 = dba_Automaton_getStates($this);
            dba_Automaton_setStateNumbers(var$3);
            var$5 = new ju_LinkedList;
            var$6 = new ju_LinkedList;
            var$7 = new ju_BitSet;
            var$3 = var$3;
            ju_BitSet__init_(var$7, ju_HashSet_size(var$3));
            var$8 = ju_BitSet__init_0(ju_HashSet_size(var$3));
            var$3 = $this.$initial;
            ju_AbstractList_add(var$5, var$3);
            var$3 = ju_ArrayList__init_();
            var$2 = $this.$initial.$accept;
            var$4 = 0;
            var$9 = var$3;
            var$10 = var$3;
            while (var$4 < $s.$nativeString.length) {
                var$11 = jl_String_charAt($s, var$4);
                var$2 = 0;
                var$6.$firstEntry = null;
                var$6.$lastEntry = null;
                var$6.$size1 = 0;
                var$6.$modCount = var$6.$modCount + 1 | 0;
                var$8.$length1 = 0;
                ju_Arrays_fill(var$8.$data, 0);
                var$12 = ju_AbstractSequentialList_iterator(var$5);
                var$13 = var$6;
                while (ju_LinkedList$SequentialListIterator_hasNext(var$12)) {
                    var$14 = ju_LinkedList$SequentialListIterator_next(var$12);
                    ju_ArrayList_clear(var$3);
                    var$14 = ju_HashSet_iterator(var$14.$transitions);
                    while (var$14.$hasNext()) {
                        var$15 = var$14.$next0();
                        if (var$15.$min0 <= var$11 && var$11 <= var$15.$max0)
                            ju_ArrayList_add(var$9, var$15.$to);
                    }
                    var$15 = ju_AbstractList_iterator(var$10);
                    while (ju_AbstractList$1_hasNext(var$15)) {
                        var$14 = ju_AbstractList$1_next(var$15);
                        if (var$14.$accept)
                            var$2 = 1;
                        if (!ju_BitSet_get(var$8, var$14.$number)) {
                            ju_BitSet_set(var$8, var$14.$number);
                            ju_AbstractList_add(var$13, var$14);
                        }
                    }
                }
                var$4 = var$4 + 1 | 0;
                var$14 = var$5;
                var$13 = var$7;
                var$5 = var$6;
                var$6 = var$14;
                var$7 = var$8;
                var$8 = var$13;
            }
        }
    }
    return var$2;
},
dba_Automaton_minimize = $this => {
    let var$1;
    a: {
        if (!dba_Automaton_isSingleton($this)) {
            b: {
                switch (dba_Automaton_minimization) {
                    case 0:
                        break;
                    case 1:
                        if (!dba_Automaton_isSingleton($this)) {
                            dba_BasicOperations_determinize($this, dba_SpecialOperations_reverse($this));
                            dba_BasicOperations_determinize($this, dba_SpecialOperations_reverse($this));
                        }
                        break a;
                    case 2:
                        break b;
                    case 3:
                        dba_MinimizationOperations_minimizeValmari($this);
                        break a;
                    default:
                        break b;
                }
                dba_MinimizationOperations_minimizeHuffman($this);
                break a;
            }
            dba_MinimizationOperations_minimizeHopcroft($this);
        }
    }
    var$1 = ((!dba_Automaton_isSingleton($this) ? ju_HashSet_size(dba_Automaton_getStates($this)) : $this.$singleton.$nativeString.length + 1 | 0) * 3 | 0) + (dba_Automaton_getNumberOfTransitions($this) * 2 | 0) | 0;
    $this.$hash_code = var$1;
    if (!var$1)
        $this.$hash_code = 1;
},
dba_Automaton__clinit_ = () => {
    dba_Automaton_minimization = 2;
    dba_Automaton_minimize_always = 0;
    dba_Automaton_allow_mutation = 0;
    dba_Automaton_is_debug = null;
};
function dba_State() {
    let a = this; jl_Object.call(a);
    a.$accept = 0;
    a.$transitions = null;
    a.$number = 0;
    a.$id = 0;
}
let dba_State_next_id = 0,
dba_State__init_0 = $this => {
    let var$1;
    dba_State_resetTransitions($this);
    var$1 = dba_State_next_id;
    dba_State_next_id = var$1 + 1 | 0;
    $this.$id = var$1;
},
dba_State__init_ = () => {
    let var_0 = new dba_State();
    dba_State__init_0(var_0);
    return var_0;
},
dba_State_resetTransitions = $this => {
    $this.$transitions = ju_HashSet__init_();
},
dba_State_getTransitions = $this => {
    return $this.$transitions;
},
dba_State_addTransition = ($this, $t) => {
    ju_HashSet_add($this.$transitions, $t);
},
dba_State_step = ($this, $c) => {
    let var$2, $t;
    var$2 = ju_HashSet_iterator($this.$transitions);
    while (var$2.$hasNext()) {
        $t = var$2.$next0();
        if ($t.$min0 <= $c && $c <= $t.$max0)
            return $t.$to;
    }
    return null;
},
dba_State_addEpsilon = ($this, $to) => {
    let var$2;
    if ($to.$accept)
        $this.$accept = 1;
    var$2 = $this.$transitions;
    $to = $to.$transitions;
    ju_AbstractCollection_addAll(var$2, $to);
},
dba_State_getSortedTransitionArray = ($this, $to_first) => {
    let var$2, $e;
    var$2 = $this.$transitions;
    $e = $rt_createArray(dba_Transition, ju_HashSet_size(var$2));
    $e = ju_AbstractCollection_toArray(var$2, $e);
    var$2 = new dba_TransitionComparator;
    var$2.$to_first = $to_first;
    ju_Arrays_sort($e, var$2);
    return $e;
},
dba_State_getSortedTransitions = ($this, $to_first) => {
    let var$2, var$3;
    var$2 = dba_State_getSortedTransitionArray($this, $to_first);
    ju_Objects_requireNonNull(var$2);
    var$3 = new ju_Arrays$ArrayAsList;
    var$3.$array0 = var$2;
    return var$3;
},
dba_State_equals = ($this, $obj) => {
    return jl_Object_equals($this, $obj);
},
dba_State_hashCode = $this => {
    return jl_Object_identity($this);
},
dba_State_compareTo = ($this, var$1) => {
    return var$1.$id - $this.$id | 0;
};
function jur_FSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$isBackReferenced = 0;
    a.$groupIndex0 = 0;
}
let jur_FSet_posFSet = null,
jur_FSet_$callClinit = () => {
    jur_FSet_$callClinit = $rt_eraseClinit(jur_FSet);
    jur_FSet__clinit_();
},
jur_FSet__init_ = ($this, $groupIndex) => {
    jur_FSet_$callClinit();
    jur_AbstractSet__init_($this);
    $this.$groupIndex0 = $groupIndex;
},
jur_FSet__init_0 = var_0 => {
    let var_1 = new jur_FSet();
    jur_FSet__init_(var_1, var_0);
    return var_1;
},
jur_FSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $end, $shift;
    $end = jur_MatchResultImpl_getEnd($matchResult, $this.$groupIndex0);
    jur_MatchResultImpl_setEnd($matchResult, $this.$groupIndex0, $stringIndex);
    $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        jur_MatchResultImpl_setEnd($matchResult, $this.$groupIndex0, $end);
    return $shift;
},
jur_FSet_getGroupIndex = $this => {
    return $this.$groupIndex0;
},
jur_FSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_FSet__clinit_ = () => {
    let var$1;
    var$1 = new jur_FSet$PossessiveFSet;
    jur_AbstractSet__init_(var$1);
    jur_FSet_posFSet = var$1;
};
function jur_Lexer() {
    let a = this; jl_Object.call(a);
    a.$pattern0 = null;
    a.$flags0 = 0;
    a.$mode = 0;
    a.$savedMode = 0;
    a.$lookBack = 0;
    a.$ch = 0;
    a.$lookAhead = 0;
    a.$patternFullLength = 0;
    a.$curST = null;
    a.$lookAheadST = null;
    a.$index = 0;
    a.$prevNW = 0;
    a.$curToc = 0;
    a.$lookAheadToc = 0;
    a.$orig = null;
}
let jur_Lexer_decompTable = null,
jur_Lexer_singleDecompTable = null,
jur_Lexer_singleDecompTableSize = 0,
jur_Lexer_setMode = ($this, $mode) => {
    if ($mode > 0 && $mode < 3)
        $this.$mode = $mode;
    if ($mode == 1) {
        $this.$lookAhead = $this.$ch;
        $this.$lookAheadST = $this.$curST;
        $this.$index = $this.$lookAheadToc;
        $this.$lookAheadToc = $this.$curToc;
        jur_Lexer_movePointer($this);
    }
},
jur_Lexer_isSpecial = $this => {
    return $this.$curST === null ? 0 : 1;
},
jur_Lexer_isNextSpecial = $this => {
    return $this.$lookAheadST === null ? 0 : 1;
},
jur_Lexer_next = $this => {
    jur_Lexer_movePointer($this);
    return $this.$lookBack;
},
jur_Lexer_nextSpecial = $this => {
    let $res;
    $res = $this.$curST;
    jur_Lexer_movePointer($this);
    return $res;
},
jur_Lexer_movePointer = $this => {
    let $reread, $nonCap, var$3, $behind, $mod, $cs, $negative, $$je;
    $this.$lookBack = $this.$ch;
    $this.$ch = $this.$lookAhead;
    $this.$curST = $this.$lookAheadST;
    $this.$curToc = $this.$lookAheadToc;
    $this.$lookAheadToc = $this.$index;
    while (true) {
        $reread = 0;
        $nonCap = $this.$index >= $this.$pattern0.data.length ? 0 : jur_Lexer_nextCodePoint($this);
        $this.$lookAhead = $nonCap;
        $this.$lookAheadST = null;
        if ($this.$mode == 4) {
            if ($nonCap != 92)
                return;
            $nonCap = $this.$index;
            var$3 = $this.$pattern0.data;
            $nonCap = $nonCap >= var$3.length ? 0 : var$3[jur_Lexer_nextIndex($this)];
            $this.$lookAhead = $nonCap;
            switch ($nonCap) {
                case 69:
                    break;
                default:
                    $this.$lookAhead = 92;
                    $this.$index = $this.$prevNW;
                    return;
            }
            $this.$mode = $this.$savedMode;
            $this.$lookAhead = $this.$index > ($this.$pattern0.data.length - 2 | 0) ? 0 : jur_Lexer_nextCodePoint($this);
        }
        a: {
            $nonCap = $this.$lookAhead;
            if ($nonCap != 92) {
                $behind = $this.$mode;
                if ($behind == 1)
                    switch ($nonCap) {
                        case 36:
                            $this.$lookAhead = (-536870876);
                            break a;
                        case 40:
                            if ($this.$pattern0.data[$this.$index] != 63) {
                                $this.$lookAhead = (-2147483608);
                                break a;
                            }
                            jur_Lexer_nextIndex($this);
                            $nonCap = $this.$pattern0.data[$this.$index];
                            $behind = 0;
                            while (true) {
                                b: {
                                    if ($behind) {
                                        $behind = 0;
                                        switch ($nonCap) {
                                            case 33:
                                                break;
                                            case 61:
                                                $this.$lookAhead = (-134217688);
                                                jur_Lexer_nextIndex($this);
                                                break b;
                                            default:
                                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                                        }
                                        $this.$lookAhead = (-67108824);
                                        jur_Lexer_nextIndex($this);
                                    } else {
                                        switch ($nonCap) {
                                            case 33:
                                                break;
                                            case 60:
                                                jur_Lexer_nextIndex($this);
                                                $nonCap = $this.$pattern0.data[$this.$index];
                                                $behind = 1;
                                                break b;
                                            case 61:
                                                $this.$lookAhead = (-536870872);
                                                jur_Lexer_nextIndex($this);
                                                break b;
                                            case 62:
                                                $this.$lookAhead = (-33554392);
                                                jur_Lexer_nextIndex($this);
                                                break b;
                                            default:
                                                $mod = jur_Lexer_readFlags($this);
                                                $this.$lookAhead = $mod;
                                                if ($mod < 256) {
                                                    $this.$flags0 = $mod;
                                                    $mod = $mod << 16;
                                                    $this.$lookAhead = $mod;
                                                    $this.$lookAhead = (-1073741784) | $mod;
                                                    break b;
                                                }
                                                $mod = $mod & 255;
                                                $this.$lookAhead = $mod;
                                                $this.$flags0 = $mod;
                                                $mod = $mod << 16;
                                                $this.$lookAhead = $mod;
                                                $this.$lookAhead = (-16777176) | $mod;
                                                break b;
                                        }
                                        $this.$lookAhead = (-268435416);
                                        jur_Lexer_nextIndex($this);
                                    }
                                }
                                if (!$behind)
                                    break;
                            }
                            break a;
                        case 41:
                            $this.$lookAhead = (-536870871);
                            break a;
                        case 42:
                        case 43:
                        case 63:
                            $behind = $this.$index;
                            var$3 = $this.$pattern0.data;
                            switch ($behind >= var$3.length ? 42 : var$3[$behind]) {
                                case 43:
                                    $this.$lookAhead = $nonCap | (-2147483648);
                                    jur_Lexer_nextIndex($this);
                                    break a;
                                case 63:
                                    $this.$lookAhead = $nonCap | (-1073741824);
                                    jur_Lexer_nextIndex($this);
                                    break a;
                                default:
                            }
                            $this.$lookAhead = $nonCap | (-536870912);
                            break a;
                        case 46:
                            $this.$lookAhead = (-536870866);
                            break a;
                        case 91:
                            $this.$lookAhead = (-536870821);
                            jur_Lexer_setMode($this, 2);
                            break a;
                        case 93:
                            if ($behind != 2)
                                break a;
                            $this.$lookAhead = (-536870819);
                            break a;
                        case 94:
                            $this.$lookAhead = (-536870818);
                            break a;
                        case 123:
                            $this.$lookAheadST = jur_Lexer_processQuantifier($this, $nonCap);
                            break a;
                        case 124:
                            $this.$lookAhead = (-536870788);
                            break a;
                        default:
                    }
                else if ($behind == 2)
                    switch ($nonCap) {
                        case 38:
                            $this.$lookAhead = (-536870874);
                            break a;
                        case 45:
                            $this.$lookAhead = (-536870867);
                            break a;
                        case 91:
                            $this.$lookAhead = (-536870821);
                            break a;
                        case 93:
                            $this.$lookAhead = (-536870819);
                            break a;
                        case 94:
                            $this.$lookAhead = (-536870818);
                            break a;
                        default:
                    }
            } else {
                $nonCap = $this.$index >= ($this.$pattern0.data.length - 2 | 0) ? (-1) : jur_Lexer_nextCodePoint($this);
                c: {
                    $this.$lookAhead = $nonCap;
                    switch ($nonCap) {
                        case -1:
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 15:
                        case 16:
                        case 17:
                        case 18:
                        case 19:
                        case 20:
                        case 21:
                        case 22:
                        case 23:
                        case 24:
                        case 25:
                        case 26:
                        case 27:
                        case 28:
                        case 29:
                        case 30:
                        case 31:
                        case 32:
                        case 33:
                        case 34:
                        case 35:
                        case 36:
                        case 37:
                        case 38:
                        case 39:
                        case 40:
                        case 41:
                        case 42:
                        case 43:
                        case 44:
                        case 45:
                        case 46:
                        case 47:
                        case 58:
                        case 59:
                        case 60:
                        case 61:
                        case 62:
                        case 63:
                        case 64:
                        case 91:
                        case 92:
                        case 93:
                        case 94:
                        case 95:
                        case 96:
                        case 118:
                            break;
                        case 48:
                            $this.$lookAhead = jur_Lexer_readOctals($this);
                            break a;
                        case 49:
                        case 50:
                        case 51:
                        case 52:
                        case 53:
                        case 54:
                        case 55:
                        case 56:
                        case 57:
                            if ($this.$mode != 1)
                                break a;
                            $this.$lookAhead = (-2147483648) | $nonCap;
                            break a;
                        case 65:
                            $this.$lookAhead = (-2147483583);
                            break a;
                        case 66:
                            $this.$lookAhead = (-2147483582);
                            break a;
                        case 67:
                        case 69:
                        case 70:
                        case 72:
                        case 73:
                        case 74:
                        case 75:
                        case 76:
                        case 77:
                        case 78:
                        case 79:
                        case 82:
                        case 84:
                        case 85:
                        case 86:
                        case 88:
                        case 89:
                        case 103:
                        case 104:
                        case 105:
                        case 106:
                        case 107:
                        case 108:
                        case 109:
                        case 111:
                        case 113:
                        case 121:
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                        case 68:
                        case 83:
                        case 87:
                        case 100:
                        case 115:
                        case 119:
                            $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass(jl_String__init_($this.$pattern0, $this.$prevNW, 1), 0);
                            $this.$lookAhead = 0;
                            break a;
                        case 71:
                            $this.$lookAhead = (-2147483577);
                            break a;
                        case 80:
                        case 112:
                            break c;
                        case 81:
                            $this.$savedMode = $this.$mode;
                            $this.$mode = 4;
                            $reread = 1;
                            break a;
                        case 90:
                            $this.$lookAhead = (-2147483558);
                            break a;
                        case 97:
                            $this.$lookAhead = 7;
                            break a;
                        case 98:
                            $this.$lookAhead = (-2147483550);
                            break a;
                        case 99:
                            $nonCap = $this.$index;
                            var$3 = $this.$pattern0.data;
                            if ($nonCap >= (var$3.length - 2 | 0))
                                $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                            $this.$lookAhead = var$3[jur_Lexer_nextIndex($this)] & 31;
                            break a;
                        case 101:
                            $this.$lookAhead = 27;
                            break a;
                        case 102:
                            $this.$lookAhead = 12;
                            break a;
                        case 110:
                            $this.$lookAhead = 10;
                            break a;
                        case 114:
                            $this.$lookAhead = 13;
                            break a;
                        case 116:
                            $this.$lookAhead = 9;
                            break a;
                        case 117:
                            $this.$lookAhead = jur_Lexer_readHex($this, 4);
                            break a;
                        case 120:
                            $this.$lookAhead = jur_Lexer_readHex($this, 2);
                            break a;
                        case 122:
                            $this.$lookAhead = (-2147483526);
                            break a;
                        default:
                    }
                    break a;
                }
                $cs = jur_Lexer_parseCharClassName($this);
                $negative = 0;
                if ($this.$lookAhead == 80)
                    $negative = 1;
                try {
                    $this.$lookAheadST = jur_AbstractCharClass_getPredefinedClass($cs, $negative);
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof ju_MissingResourceException) {
                        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), jur_Lexer_toString($this), $this.$index));
                    } else {
                        throw $$e;
                    }
                }
                $this.$lookAhead = 0;
            }
        }
        if ($reread)
            continue;
        else
            break;
    }
},
jur_Lexer_parseCharClassName = $this => {
    let $sb, $ch, var$3, var$4, $res, var$6;
    $sb = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0($sb, 10);
    $ch = $this.$index;
    var$3 = $this.$pattern0;
    var$4 = var$3.data;
    if ($ch < (var$4.length - 2 | 0)) {
        if (var$4[$ch] != 123) {
            $sb = jl_String__init_(var$3, jur_Lexer_nextIndex($this), 1);
            $res = new jl_StringBuilder;
            jl_AbstractStringBuilder__init_($res);
            jl_StringBuilder_append(jl_StringBuilder_append($res, $rt_s(82)), $sb);
            return jl_AbstractStringBuilder_toString($res);
        }
        jur_Lexer_nextIndex($this);
        $ch = 0;
        a: {
            while (true) {
                var$6 = $this.$index;
                var$3 = $this.$pattern0.data;
                if (var$6 >= (var$3.length - 2 | 0))
                    break;
                $ch = var$3[jur_Lexer_nextIndex($this)];
                if ($ch == 125)
                    break a;
                jl_AbstractStringBuilder_append($sb, $ch);
            }
        }
        if ($ch != 125)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    }
    if (!$sb.$length0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    $res = jl_AbstractStringBuilder_toString($sb);
    if ($res.$nativeString.length == 1) {
        $sb = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($sb);
        jl_StringBuilder_append(jl_StringBuilder_append($sb, $rt_s(82)), $res);
        return jl_AbstractStringBuilder_toString($sb);
    }
    b: {
        c: {
            if ($res.$nativeString.length > 3) {
                if (jl_String_startsWith0($res, $rt_s(82)))
                    break c;
                if (jl_String_startsWith0($res, $rt_s(83)))
                    break c;
            }
            break b;
        }
        $res = jl_String_substring0($res, 2);
    }
    return $res;
},
jur_Lexer_processQuantifier = ($this, $ch) => {
    let $sb, $min, $max, $mod, var$6, $$je;
    $sb = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0($sb, 4);
    $min = (-1);
    $max = 2147483647;
    a: {
        while (true) {
            $mod = $this.$index;
            var$6 = $this.$pattern0.data;
            if ($mod >= var$6.length)
                break a;
            $ch = var$6[jur_Lexer_nextIndex($this)];
            if ($ch == 125)
                break a;
            if ($ch == 44 && $min < 0)
                try {
                    $min = jl_Integer_parseInt(jl_StringBuilder_toString($sb), 10);
                    jl_StringBuilder_delete($sb, 0, jl_StringBuilder_length($sb));
                    continue;
                } catch ($$e) {
                    $$je = $rt_wrapException($$e);
                    if ($$je instanceof jl_NumberFormatException) {
                        break;
                    } else {
                        throw $$e;
                    }
                }
            jl_AbstractStringBuilder_append($sb, $ch & 65535);
        }
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    }
    if ($ch != 125)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    if ($sb.$length0 > 0)
        b: {
            try {
                $max = jl_Integer_parseInt(jl_StringBuilder_toString($sb), 10);
                if ($min >= 0)
                    break b;
                $min = $max;
                break b;
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                } else {
                    throw $$e;
                }
            }
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
        }
    else if ($min < 0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    if (($min | $max | ($max - $min | 0)) < 0)
        $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
    $ch = $this.$index;
    var$6 = $this.$pattern0.data;
    $mod = $ch >= var$6.length ? 42 : var$6[$ch];
    c: {
        switch ($mod) {
            case 43:
                $this.$lookAhead = (-2147483525);
                jur_Lexer_nextIndex($this);
                break c;
            case 63:
                $this.$lookAhead = (-1073741701);
                jur_Lexer_nextIndex($this);
                break c;
            default:
        }
        $this.$lookAhead = (-536870789);
    }
    $sb = new jur_Quantifier;
    $sb.$min2 = $min;
    $sb.$max1 = $max;
    return $sb;
},
jur_Lexer_toString = $this => {
    return $this.$orig;
},
jur_Lexer_isEmpty = $this => {
    return !$this.$ch && !$this.$lookAhead && $this.$index == $this.$patternFullLength && !jur_Lexer_isSpecial($this) ? 1 : 0;
},
jur_Lexer_isLetter0 = $ch => {
    return $ch < 0 ? 0 : 1;
},
jur_Lexer_isLetter = $this => {
    return !jur_Lexer_isEmpty($this) && !jur_Lexer_isSpecial($this) && jur_Lexer_isLetter0($this.$ch) ? 1 : 0;
},
jur_Lexer_isHighSurrogate0 = $this => {
    let var$1;
    var$1 = $this.$ch;
    return var$1 <= 56319 && var$1 >= 55296 ? 1 : 0;
},
jur_Lexer_isLowSurrogate0 = $this => {
    let var$1;
    var$1 = $this.$ch;
    return var$1 <= 57343 && var$1 >= 56320 ? 1 : 0;
},
jur_Lexer_isHighSurrogate = $ch => {
    return $ch <= 56319 && $ch >= 55296 ? 1 : 0;
},
jur_Lexer_isLowSurrogate = $ch => {
    return $ch <= 57343 && $ch >= 56320 ? 1 : 0;
},
jur_Lexer_readHex = ($this, $max) => {
    let $st, $length, $i, var$5, $$je;
    $st = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_0($st, $max);
    $length = $this.$pattern0.data.length - 2 | 0;
    $i = 0;
    while (true) {
        var$5 = $rt_compare($i, $max);
        if (var$5 >= 0)
            break;
        if ($this.$index >= $length)
            break;
        jl_AbstractStringBuilder_append($st, $this.$pattern0.data[jur_Lexer_nextIndex($this)]);
        $i = $i + 1 | 0;
    }
    if (!var$5)
        a: {
            try {
                $max = jl_Integer_parseInt(jl_StringBuilder_toString($st), 16);
            } catch ($$e) {
                $$je = $rt_wrapException($$e);
                if ($$je instanceof jl_NumberFormatException) {
                    break a;
                } else {
                    throw $$e;
                }
            }
            return $max;
        }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
},
jur_Lexer_readOctals = $this => {
    let $max, $i, var$3, $length, $res, var$6;
    $max = 3;
    $i = 1;
    var$3 = $this.$pattern0.data;
    $length = var$3.length - 2 | 0;
    $res = jl_Character_digit(var$3[$this.$index], 8);
    switch ($res) {
        case -1:
            break;
        default:
            if ($res > 3)
                $max = 2;
            jur_Lexer_nextIndex($this);
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    var$6 = $this.$index;
                    if (var$6 >= $length)
                        break a;
                    var$6 = jl_Character_digit($this.$pattern0.data[var$6], 8);
                    if (var$6 < 0)
                        break;
                    $res = ($res * 8 | 0) + var$6 | 0;
                    jur_Lexer_nextIndex($this);
                    $i = $i + 1 | 0;
                }
            }
            return $res;
    }
    $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, $this.$index));
},
jur_Lexer_readFlags = $this => {
    let $pos, $res, var$3, var$4;
    $pos = 1;
    $res = $this.$flags0;
    a: while (true) {
        var$3 = $this.$index;
        var$4 = $this.$pattern0.data;
        if (var$3 >= var$4.length)
            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, var$3));
        b: {
            c: {
                switch (var$4[var$3]) {
                    case 41:
                        jur_Lexer_nextIndex($this);
                        return $res | 256;
                    case 45:
                        if (!$pos)
                            $rt_throw(jur_PatternSyntaxException__init_($rt_s(2), $this.$orig, var$3));
                        $pos = 0;
                        break b;
                    case 58:
                        break a;
                    case 100:
                        break c;
                    case 105:
                        $res = $pos ? $res | 2 : ($res ^ 2) & $res;
                        break b;
                    case 109:
                        $res = $pos ? $res | 8 : ($res ^ 8) & $res;
                        break b;
                    case 115:
                        $res = $pos ? $res | 32 : ($res ^ 32) & $res;
                        break b;
                    case 117:
                        $res = $pos ? $res | 64 : ($res ^ 64) & $res;
                        break b;
                    case 120:
                        $res = $pos ? $res | 4 : ($res ^ 4) & $res;
                        break b;
                    default:
                }
                break b;
            }
            $res = $pos ? $res | 1 : ($res ^ 1) & $res;
        }
        jur_Lexer_nextIndex($this);
    }
    jur_Lexer_nextIndex($this);
    return $res;
},
jur_Lexer_nextIndex = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = $this.$index;
    $this.$prevNW = var$1;
    if (!($this.$flags0 & 4))
        $this.$index = var$1 + 1 | 0;
    else {
        var$2 = $this.$pattern0.data.length - 2 | 0;
        $this.$index = var$1 + 1 | 0;
        a: while (true) {
            var$3 = $this.$index;
            if (var$3 < var$2 && jl_Character_isWhitespace($this.$pattern0.data[var$3])) {
                $this.$index = $this.$index + 1 | 0;
                continue;
            }
            var$3 = $this.$index;
            if (var$3 >= var$2)
                break;
            var$4 = $this.$pattern0.data;
            if (var$4[var$3] != 35)
                break;
            $this.$index = var$3 + 1 | 0;
            while (true) {
                var$5 = $this.$index;
                if (var$5 >= var$2)
                    continue a;
                var$1 = var$4[var$5];
                if (var$1 != 10 && var$1 != 13 && var$1 != 133 && (var$1 | 1) != 8233 ? 0 : 1)
                    continue a;
                $this.$index = var$5 + 1 | 0;
            }
        }
    }
    return $this.$prevNW;
},
jur_Lexer_getDecomposition = $ch => {
    return jur_Lexer_decompTable.$get3($ch);
},
jur_Lexer_nextCodePoint = $this => {
    let $high, $lowExpectedIndex, var$3, $low;
    $high = $this.$pattern0.data[jur_Lexer_nextIndex($this)];
    if (jl_Character_isHighSurrogate($high)) {
        $lowExpectedIndex = $this.$prevNW + 1 | 0;
        var$3 = $this.$pattern0.data;
        if ($lowExpectedIndex < var$3.length) {
            $low = var$3[$lowExpectedIndex];
            if (jl_Character_isLowSurrogate($low)) {
                jur_Lexer_nextIndex($this);
                return jl_Character_toCodePoint($high, $low);
            }
        }
    }
    return $high;
},
jur_Lexer_getIndex = $this => {
    return $this.$curToc;
},
ju_Arrays = $rt_classWithoutFields(),
ju_Arrays_copyOf0 = ($array, $length) => {
    let $result, var$4, $sz, $i;
    $array = $array.data;
    $result = $rt_createByteArray($length);
    var$4 = $result.data;
    $sz = jl_Math_min($length, $array.length);
    $i = 0;
    while ($i < $sz) {
        var$4[$i] = $array[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_copyOf = ($original, $newLength) => {
    let var$3, $result, $sz, $i;
    var$3 = $original.data;
    $result = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($original)), $newLength);
    $sz = jl_Math_min($newLength, var$3.length);
    $i = 0;
    while ($i < $sz) {
        $result.data[$i] = var$3[$i];
        $i = $i + 1 | 0;
    }
    return $result;
},
ju_Arrays_fill0 = ($a, $fromIndex, $toIndex, $val) => {
    let var$5, var$6, var$7;
    if ($fromIndex > $toIndex) {
        var$5 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$5);
        $rt_throw(var$5);
    }
    while ($fromIndex < $toIndex) {
        var$6 = $a.data;
        var$7 = $fromIndex + 1 | 0;
        var$6[$fromIndex] = $val;
        $fromIndex = var$7;
    }
},
ju_Arrays_fill = ($a, $val) => {
    ju_Arrays_fill0($a, 0, $a.data.length, $val);
},
ju_Arrays_sort = ($a, $c) => {
    let var$3, $second, $chunkSize, var$6, $i, var$8, var$9, var$10, $i_0, var$12, $i_1, var$14, var$15, var$16, var$17;
    var$3 = $a.data.length;
    if (!var$3)
        return;
    if ($c === null)
        $c = ju_Comparator$NaturalOrder_INSTANCE;
    $second = $rt_createArray(jl_Object, var$3);
    $chunkSize = 1;
    var$6 = $a;
    while ($chunkSize < var$3) {
        $i = 0;
        while (true) {
            var$8 = var$6.data;
            var$9 = var$8.length;
            if ($i >= var$9)
                break;
            var$10 = jl_Math_min(var$9, $i + $chunkSize | 0);
            $i_0 = $i + (2 * $chunkSize | 0) | 0;
            var$12 = jl_Math_min(var$9, $i_0);
            $i_1 = $i;
            var$9 = var$10;
            a: {
                b: {
                    while ($i != var$10) {
                        if (var$9 == var$12)
                            break b;
                        var$14 = var$8[$i];
                        var$15 = var$8[var$9];
                        if ($c.$compare(var$14, var$15) > 0) {
                            var$16 = $second.data;
                            var$17 = $i_1 + 1 | 0;
                            var$16[$i_1] = var$15;
                            var$9 = var$9 + 1 | 0;
                        } else {
                            var$16 = $second.data;
                            var$17 = $i_1 + 1 | 0;
                            var$16[$i_1] = var$14;
                            $i = $i + 1 | 0;
                        }
                        $i_1 = var$17;
                    }
                    while (true) {
                        if (var$9 >= var$12)
                            break a;
                        var$16 = $second.data;
                        $i = $i_1 + 1 | 0;
                        var$17 = var$9 + 1 | 0;
                        var$16[$i_1] = var$8[var$9];
                        $i_1 = $i;
                        var$9 = var$17;
                    }
                }
                while (true) {
                    if ($i >= var$10)
                        break a;
                    var$16 = $second.data;
                    var$9 = $i_1 + 1 | 0;
                    var$17 = $i + 1 | 0;
                    var$16[$i_1] = var$8[$i];
                    $i_1 = var$9;
                    $i = var$17;
                }
            }
            $i = $i_0;
        }
        $chunkSize = $chunkSize * 2 | 0;
        var$8 = var$6;
        var$6 = $second;
        $second = var$8;
    }
    c: {
        if (var$6 !== $a) {
            $i_1 = 0;
            while (true) {
                $a = var$6.data;
                if ($i_1 >= $a.length)
                    break c;
                $second.data[$i_1] = $a[$i_1];
                $i_1 = $i_1 + 1 | 0;
            }
        }
    }
},
jl_System = $rt_classWithoutFields(),
jl_System_properties = null,
jl_System_arraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    let $srcType, $targetType, $srcArray, $i, var$10, var$11, var$12, $elem, var$14;
    if ($src !== null && $dest !== null) {
        if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
            a: {
                b: {
                    if ($src !== $dest) {
                        $srcType = jl_Class_getComponentType(jl_Object_getClass($src));
                        $targetType = jl_Class_getComponentType(jl_Object_getClass($dest));
                        if ($srcType !== null && $targetType !== null) {
                            if ($srcType === $targetType)
                                break b;
                            if (!jl_Class_isPrimitive($srcType) && !jl_Class_isPrimitive($targetType)) {
                                $srcArray = $src;
                                $i = 0;
                                var$10 = $srcPos;
                                while ($i < $length) {
                                    var$11 = $srcArray.data;
                                    var$12 = var$10 + 1 | 0;
                                    $elem = var$11[var$10];
                                    var$14 = $targetType.$platformClass;
                                    if (!($elem !== null && !(typeof $elem.constructor.$meta === 'undefined' ? 1 : 0) && otp_Platform_isAssignable($elem.constructor, var$14) ? 1 : 0)) {
                                        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $i);
                                        $src = new jl_ArrayStoreException;
                                        jl_Exception__init_($src);
                                        $rt_throw($src);
                                    }
                                    $i = $i + 1 | 0;
                                    var$10 = var$12;
                                }
                                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                                return;
                            }
                            if (!jl_Class_isPrimitive($srcType))
                                break a;
                            if (jl_Class_isPrimitive($targetType))
                                break b;
                            else
                                break a;
                        }
                        $src = new jl_ArrayStoreException;
                        jl_Exception__init_($src);
                        $rt_throw($src);
                    }
                }
                jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
                return;
            }
            $src = new jl_ArrayStoreException;
            jl_Exception__init_($src);
            $rt_throw($src);
        }
        $src = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($src);
        $rt_throw($src);
    }
    $dest = new jl_NullPointerException;
    jl_RuntimeException__init_($dest, $rt_s(84));
    $rt_throw($dest);
},
jl_System_fastArraycopy = ($src, $srcPos, $dest, $destPos, $length) => {
    if ($srcPos >= 0 && $destPos >= 0 && $length >= 0 && ($srcPos + $length | 0) <= jlr_Array_getLength($src) && ($destPos + $length | 0) <= jlr_Array_getLength($dest)) {
        jl_System_doArrayCopy($src, $srcPos, $dest, $destPos, $length);
        return;
    }
    $src = new jl_IndexOutOfBoundsException;
    jl_Exception__init_($src);
    $rt_throw($src);
},
jl_System_doArrayCopy = (var$1, var$2, var$3, var$4, var$5) => {
    if (var$5 !== 0) {
        if (typeof var$1.data.buffer !== 'undefined') {
            var$3.data.set(var$1.data.subarray(var$2, var$2 + var$5), var$4);
        } else if (var$1 !== var$3 || var$4 < var$2) {
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[var$4++] = var$1.data[var$2++];
            }
        } else {
            var$2 = var$2 + var$5 | 0;
            var$4 = var$4 + var$5 | 0;
            for (let i = 0;i < var$5;i = i + 1 | 0) {
                var$3.data[ --var$4] = var$1.data[ --var$2];
            }
        }
    }
},
jl_System_currentTimeMillis = () => {
    return Long_fromNumber((new Date()).getTime());
},
jl_System_identityHashCode = var$1 => {
    return var$1 === null ? 0 : jl_Object_identity(var$1);
},
jl_Iterable = $rt_classWithoutFields(0),
ju_Collection = $rt_classWithoutFields(0),
ju_AbstractCollection = $rt_classWithoutFields(),
ju_AbstractCollection_isEmpty = $this => {
    return $this.$size() ? 0 : 1;
},
ju_AbstractCollection_toArray = ($this, $a) => {
    let var$2, var$3, $i, var$5, $iter;
    var$2 = $a.data;
    var$3 = $this;
    $i = ju_HashSet_size(var$3);
    var$5 = var$2.length;
    if (var$5 < $i)
        $a = jlr_Array_newInstance(jl_Class_getComponentType(jl_Object_getClass($a)), $i);
    else
        while ($i < var$5) {
            var$2[$i] = null;
            $i = $i + 1 | 0;
        }
    $i = 0;
    $iter = ju_HashSet_iterator(var$3);
    while ($iter.$hasNext()) {
        var$2 = $a.data;
        var$5 = $i + 1 | 0;
        var$2[$i] = $iter.$next0();
        $i = var$5;
    }
    return $a;
},
ju_AbstractCollection_remove = ($this, $o) => {
    let $iter, $e, var$4, var$5;
    $iter = ju_AbstractSequentialList_iterator($this);
    while (ju_LinkedList$SequentialListIterator_hasNext($iter)) {
        if (ju_Objects_equals(ju_LinkedList$SequentialListIterator_next($iter), $o)) {
            $o = $iter.$currentEntry1;
            if ($o === null) {
                $o = new jl_IllegalStateException;
                jl_Exception__init_($o);
                $rt_throw($o);
            }
            $e = $iter.$this$0;
            var$4 = $o.$previous;
            if (var$4 === null)
                $e.$firstEntry = $o.$next4;
            else
                var$4.$next4 = $o.$next4;
            var$5 = $o.$next4;
            if (var$5 === null)
                $e.$lastEntry = var$4;
            else
                var$5.$previous = var$4;
            $e.$size1 = $e.$size1 - 1 | 0;
            $e.$modCount = $e.$modCount + 1 | 0;
            $e = $iter.$prevEntry;
            if ($o === $e) {
                $iter.$prevEntry = !ju_LinkedList$SequentialListIterator_hasNext($iter) ? null : $iter.$nextEntry.$previous;
                $iter.$index0 = $iter.$index0 - 1 | 0;
            } else if ($o === $iter.$nextEntry)
                $iter.$nextEntry = !($e === null ? 0 : 1) ? null : $e.$next4;
            $iter.$version = $iter.$this$0.$modCount;
            $iter.$currentEntry1 = null;
            return 1;
        }
    }
    return 0;
},
ju_AbstractCollection_addAll = ($this, $c) => {
    let $changed, $iter, var$4;
    $changed = 0;
    $iter = ju_HashSet_iterator($c);
    var$4 = $this;
    while ($iter.$hasNext()) {
        if (!ju_HashSet_add(var$4, $iter.$next0()))
            continue;
        $changed = 1;
    }
    return $changed;
},
ju_SequencedCollection = $rt_classWithoutFields(0),
ju_List = $rt_classWithoutFields(0);
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
let ju_AbstractList_add = ($this, $e) => {
    let var$2, var$3, var$4, var$5;
    var$2 = $this.$size1;
    var$3 = $this;
    if (var$2 < 0) {
        $e = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($e);
        $rt_throw($e);
    }
    var$3 = ju_LinkedList_listIterator(var$3, var$2);
    ju_LinkedList$SequentialListIterator_checkConcurrentModification(var$3);
    var$4 = new ju_LinkedList$Entry;
    var$4.$item = $e;
    $e = var$3.$prevEntry;
    var$4.$previous = $e;
    var$5 = var$3.$nextEntry;
    var$4.$next4 = var$5;
    if ($e !== null)
        $e.$next4 = var$4;
    else
        var$3.$this$0.$firstEntry = var$4;
    if (var$5 !== null)
        var$5.$previous = var$4;
    else
        var$3.$this$0.$lastEntry = var$4;
    var$3.$prevEntry = var$4;
    $e = var$3.$this$0;
    $e.$size1 = $e.$size1 + 1 | 0;
    var$2 = $e.$modCount + 1 | 0;
    $e.$modCount = var$2;
    var$3.$version = var$2;
    var$3.$currentEntry1 = null;
    return 1;
},
ju_AbstractList_iterator = $this => {
    let var$1;
    var$1 = new ju_AbstractList$1;
    var$1.$this$05 = $this;
    var$1.$modCount3 = $this.$modCount;
    var$1.$size4 = $this.$size();
    var$1.$removeIndex = (-1);
    return var$1;
},
ju_AbstractList_hashCode = $this => {
    let $hashCode, $iter, $elem;
    $hashCode = 1;
    $iter = $this.$iterator();
    while ($iter.$hasNext()) {
        $elem = $iter.$next0();
        $hashCode = (31 * $hashCode | 0) + ju_Objects_hashCode($elem) | 0;
    }
    return $hashCode;
},
ju_AbstractList_equals = ($this, $other) => {
    let $list, $i;
    if (!$rt_isInstance($other, ju_List))
        return 0;
    $list = $other;
    if ($this.$size() != $list.$size())
        return 0;
    $i = 0;
    while ($i < $list.$size()) {
        if (!ju_Objects_equals($this.$get($i), $list.$get($i)))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
},
ju_RandomAccess = $rt_classWithoutFields(0);
function ju_ArrayList() {
    let a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size0 = 0;
}
let ju_ArrayList__init_0 = $this => {
    $this.$array = $rt_createArray(jl_Object, 10);
},
ju_ArrayList__init_ = () => {
    let var_0 = new ju_ArrayList();
    ju_ArrayList__init_0(var_0);
    return var_0;
},
ju_ArrayList_ensureCapacity = ($this, $minCapacity) => {
    let var$2, $newLength;
    var$2 = $this.$array.data.length;
    if (var$2 < $minCapacity) {
        $newLength = var$2 >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max(var$2 * 2 | 0, 5));
        $this.$array = ju_Arrays_copyOf($this.$array, $newLength);
    }
},
ju_ArrayList_get = ($this, $index) => {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array.data[$index];
},
ju_ArrayList_size = $this => {
    return $this.$size0;
},
ju_ArrayList_set = ($this, $index, $element) => {
    let var$3, $old;
    ju_ArrayList_checkIndex($this, $index);
    var$3 = $this.$array.data;
    $old = var$3[$index];
    var$3[$index] = $element;
    return $old;
},
ju_ArrayList_add = ($this, $element) => {
    let var$2, var$3;
    ju_ArrayList_ensureCapacity($this, $this.$size0 + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size0;
    $this.$size0 = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
},
ju_ArrayList_clear = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6;
    var$1 = $this.$array;
    var$2 = 0;
    var$3 = $this.$size0;
    var$4 = null;
    if (var$2 > var$3) {
        var$4 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$4);
        $rt_throw(var$4);
    }
    while (var$2 < var$3) {
        var$5 = var$1.data;
        var$6 = var$2 + 1 | 0;
        var$5[var$2] = var$4;
        var$2 = var$6;
    }
    $this.$size0 = 0;
    $this.$modCount = $this.$modCount + 1 | 0;
},
ju_ArrayList_checkIndex = ($this, $index) => {
    let var$2;
    if ($index >= 0 && $index < $this.$size0)
        return;
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
},
ju_ArrayList_hashCode = $this => {
    let $result, $i;
    $result = 1;
    $i = 0;
    while ($i < $this.$size0) {
        $result = (31 * $result | 0) + ju_Objects_hashCode($this.$array.data[$i]) | 0;
        $i = $i + 1 | 0;
    }
    return $result;
},
jur_NonCapFSet = $rt_classWithoutFields(jur_FSet),
jur_NonCapFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr;
    $gr = $this.$groupIndex0;
    jur_MatchResultImpl_setConsumed($matchResult, $gr, $stringIndex - jur_MatchResultImpl_getConsumed($matchResult, $gr) | 0);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_NonCapFSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_AheadFSet = $rt_classWithoutFields(jur_FSet),
jur_AheadFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_BehindFSet = $rt_classWithoutFields(jur_FSet),
jur_BehindFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if (jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex0) != $stringIndex)
        $stringIndex = (-1);
    return $stringIndex;
};
function jur_AtomicFSet() {
    jur_FSet.call(this);
    this.$index2 = 0;
}
let jur_AtomicFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $gr;
    $gr = $this.$groupIndex0;
    jur_MatchResultImpl_setConsumed($matchResult, $gr, $stringIndex - jur_MatchResultImpl_getConsumed($matchResult, $gr) | 0);
    $this.$index2 = $stringIndex;
    return $stringIndex;
},
jur_AtomicFSet_hasConsumed = ($this, $mr) => {
    return 0;
},
jur_FinalSet = $rt_classWithoutFields(jur_FSet),
jur_FinalSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($matchResult.$mode0 != 1 && $stringIndex != $matchResult.$rightBound)
        return (-1);
    $matchResult.$valid = 1;
    jur_MatchResultImpl_setEnd($matchResult, 0, $stringIndex);
    return $stringIndex;
};
function jur_LeafSet() {
    jur_AbstractSet.call(this);
    this.$charCount0 = 0;
}
let jur_LeafSet__init_ = $this => {
    jur_AbstractSet__init_($this);
    $this.$charCount0 = 1;
},
jur_LeafSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    if (($stringIndex + $this.$charCount() | 0) > $matchResult.$rightBound) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    $shift = $this.$accepts($stringIndex, $testString);
    if ($shift < 0)
        return (-1);
    return $this.$next2.$matches($stringIndex + $shift | 0, $testString, $matchResult);
},
jur_LeafSet_charCount = $this => {
    return $this.$charCount0;
},
jur_LeafSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_EmptySet = $rt_classWithoutFields(jur_LeafSet),
jur_EmptySet__init_0 = ($this, $next) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$charCount0 = 1;
    $this.$type = 1;
    $this.$charCount0 = 0;
},
jur_EmptySet__init_ = var_0 => {
    let var_1 = new jur_EmptySet();
    jur_EmptySet__init_0(var_1, var_0);
    return var_1;
},
jur_EmptySet_accepts = ($this, $stringIndex, $testString) => {
    return 0;
},
jur_EmptySet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startStr, var$6, $high;
    $strLength = $matchResult.$rightBound;
    $startStr = $matchResult.$leftBound;
    var$6 = $testString;
    while (true) {
        $high = $rt_compare($stringIndex, $strLength);
        if ($high > 0)
            return (-1);
        if ($high < 0 && jl_Character_isLowSurrogate(jl_String_charAt(var$6, $stringIndex)) && $stringIndex > $startStr && jl_Character_isHighSurrogate(jl_String_charAt(var$6, $stringIndex - 1 | 0))) {
            $stringIndex = $stringIndex + 1 | 0;
            continue;
        }
        if ($this.$next2.$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $stringIndex = $stringIndex + 1 | 0;
    }
    return $stringIndex;
},
jur_EmptySet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $strLength, $startStr, var$7;
    $strLength = $matchResult.$rightBound;
    $startStr = $matchResult.$leftBound;
    var$7 = $testString;
    while (true) {
        if ($startSearch < $stringIndex)
            return (-1);
        if ($startSearch < $strLength && jl_Character_isLowSurrogate(jl_String_charAt(var$7, $startSearch)) && $startSearch > $startStr && jl_Character_isHighSurrogate(jl_String_charAt(var$7, $startSearch - 1 | 0))) {
            $startSearch = $startSearch + (-1) | 0;
            continue;
        }
        if ($this.$next2.$matches($startSearch, $testString, $matchResult) >= 0)
            break;
        $startSearch = $startSearch + (-1) | 0;
    }
    return $startSearch;
},
jur_EmptySet_hasConsumed = ($this, $mr) => {
    return 0;
};
function jur_JointSet() {
    let a = this; jur_AbstractSet.call(a);
    a.$children = null;
    a.$fSet = null;
    a.$groupIndex = 0;
}
let jur_JointSet__init_ = ($this, $children, $fSet) => {
    jur_AbstractSet__init_($this);
    $this.$children = $children;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$groupIndex0;
},
jur_JointSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_JointSet();
    jur_JointSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_JointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $shift;
    if ($this.$children === null)
        return (-1);
    $start = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $stringIndex);
    $size = $this.$children.$size0;
    $i = 0;
    while (true) {
        if ($i >= $size) {
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $start);
            return (-1);
        }
        $shift = (ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return $shift;
},
jur_JointSet_setNext = ($this, $next) => {
    $this.$fSet.$next2 = $next;
},
jur_JointSet_first = ($this, $set) => {
    let $i, var$3;
    a: {
        $i = $this.$children;
        if ($i !== null) {
            var$3 = ju_AbstractList_iterator($i);
            while (true) {
                if (!ju_AbstractList$1_hasNext(var$3))
                    break a;
                if (!(ju_AbstractList$1_next(var$3)).$first($set))
                    continue;
                else
                    return 1;
            }
        }
    }
    return 0;
},
jur_JointSet_hasConsumed = ($this, $matchResult) => {
    return jur_MatchResultImpl_getEnd($matchResult, $this.$groupIndex) >= 0 && jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex) == jur_MatchResultImpl_getEnd($matchResult, $this.$groupIndex) ? 0 : 1;
},
jur_JointSet_processSecondPass = $this => {
    let $child, $childrenSize, $i, $set, var$5, var$6, var$7, var$8, var$9;
    $this.$isSecondPassVisited = 1;
    $child = $this.$fSet;
    if ($child !== null && !$child.$isSecondPassVisited)
        jur_AbstractSet_processSecondPass($child);
    a: {
        $child = $this.$children;
        if ($child !== null) {
            $childrenSize = $child.$size0;
            $i = 0;
            while (true) {
                if ($i >= $childrenSize)
                    break a;
                $child = ju_ArrayList_get($this.$children, $i);
                $set = $child.$processBackRefReplacement();
                if ($set === null)
                    $set = $child;
                else {
                    $child.$isSecondPassVisited = 1;
                    var$5 = $this.$children;
                    ju_ArrayList_checkIndex(var$5, $i);
                    var$6 = var$5.$size0 - 1 | 0;
                    var$5.$size0 = var$6;
                    var$7 = $i;
                    while (var$7 < var$6) {
                        var$8 = var$5.$array.data;
                        var$9 = var$7 + 1 | 0;
                        var$8[var$7] = var$8[var$9];
                        var$7 = var$9;
                    }
                    var$5.$array.data[var$6] = null;
                    var$5.$modCount = var$5.$modCount + 1 | 0;
                    var$5 = $this.$children;
                    if ($i < 0)
                        break;
                    var$9 = var$5.$size0;
                    if ($i > var$9)
                        break;
                    ju_ArrayList_ensureCapacity(var$5, var$9 + 1 | 0);
                    var$7 = var$5.$size0;
                    var$6 = var$7;
                    while (var$6 > $i) {
                        var$8 = var$5.$array.data;
                        var$8[var$6] = var$8[var$6 - 1 | 0];
                        var$6 = var$6 + (-1) | 0;
                    }
                    var$5.$array.data[$i] = $set;
                    var$5.$size0 = var$7 + 1 | 0;
                    var$5.$modCount = var$5.$modCount + 1 | 0;
                }
                if (!$set.$isSecondPassVisited)
                    $set.$processSecondPass();
                $i = $i + 1 | 0;
            }
            $child = new jl_IndexOutOfBoundsException;
            jl_Exception__init_($child);
            $rt_throw($child);
        }
    }
    if ($this.$next2 !== null)
        jur_AbstractSet_processSecondPass($this);
},
jur_NonCapJointSet = $rt_classWithoutFields(jur_JointSet),
jur_NonCapJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i, $shift;
    $start = jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
    $size = $this.$children.$size0;
    $i = 0;
    while (true) {
        if ($i >= $size) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $start);
            return (-1);
        }
        $shift = (ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return $shift;
},
jur_NonCapJointSet_hasConsumed = ($this, $matchResult) => {
    return !jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex) ? 0 : 1;
},
jur_AtomicJointSet = $rt_classWithoutFields(jur_NonCapJointSet),
jur_AtomicJointSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $size, $i;
    $start = jur_MatchResultImpl_getConsumed($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
    $size = $this.$children.$size0;
    $i = 0;
    while ($i < $size) {
        if ((ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult) >= 0)
            return $this.$next2.$matches($this.$fSet.$index2, $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $start);
    return (-1);
},
jur_AtomicJointSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_PositiveLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i;
    $size = $this.$children.$size0;
    $i = 0;
    while ($i < $size) {
        if ((ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult) >= 0)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_PositiveLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_NegativeLookAhead = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookAhead_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i;
    $size = $this.$children.$size0;
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ((ju_ArrayList_get($this.$children, $i)).$matches($stringIndex, $testString, $matchResult) >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookAhead_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_PositiveLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_PositiveLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $leftBound, $shift, $i;
    $size = $this.$children.$size0;
    $leftBound = $matchResult.$transparentBounds ? 0 : $matchResult.$leftBound;
    a: {
        $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ($shift >= 0) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
            $i = 0;
            while (true) {
                if ($i >= $size)
                    break a;
                if ((ju_ArrayList_get($this.$children, $i)).$findBack($leftBound, $stringIndex, $testString, $matchResult) >= 0) {
                    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, (-1));
                    return $shift;
                }
                $i = $i + 1 | 0;
            }
        }
    }
    return (-1);
},
jur_PositiveLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_NegativeLookBehind = $rt_classWithoutFields(jur_AtomicJointSet),
jur_NegativeLookBehind_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $size, $i;
    $size = $this.$children.$size0;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$groupIndex, $stringIndex);
    $i = 0;
    while (true) {
        if ($i >= $size)
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ((ju_ArrayList_get($this.$children, $i)).$findBack(0, $stringIndex, $testString, $matchResult) >= 0)
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_NegativeLookBehind_hasConsumed = ($this, $matchResult) => {
    return 0;
};
function jur_SingleSet() {
    jur_JointSet.call(this);
    this.$kid = null;
}
let jur_SingleSet__init_ = ($this, $child, $fSet) => {
    jur_AbstractSet__init_($this);
    $this.$kid = $child;
    $this.$fSet = $fSet;
    $this.$groupIndex = $fSet.$groupIndex0;
},
jur_SingleSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_SingleSet();
    jur_SingleSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_SingleSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $start, $shift;
    $start = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
    jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $stringIndex);
    $shift = $this.$kid.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $start);
    return (-1);
},
jur_SingleSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$find0($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_findBack = ($this, $stringIndex, $lastIndex, $testString, $matchResult) => {
    let $res;
    $res = $this.$kid.$findBack($stringIndex, $lastIndex, $testString, $matchResult);
    if ($res >= 0)
        jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $res);
    return $res;
},
jur_SingleSet_first = ($this, $set) => {
    return $this.$kid.$first($set);
},
jur_SingleSet_processBackRefReplacement = $this => {
    let $set;
    $set = new jur_BackReferencedSingleSet;
    jur_SingleSet__init_($set, $this.$kid, $this.$fSet);
    $this.$next2 = $set;
    return $set;
},
jur_SingleSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$fSet;
    if ($set !== null && !$set.$isSecondPassVisited)
        jur_AbstractSet_processSecondPass($set);
    $set = $this.$kid;
    if ($set !== null && !$set.$isSecondPassVisited) {
        $set = $set.$processBackRefReplacement();
        if ($set !== null) {
            $this.$kid.$isSecondPassVisited = 1;
            $this.$kid = $set;
        }
        $this.$kid.$processSecondPass();
    }
},
jlr_Array = $rt_classWithoutFields(),
jlr_Array_getLength = var$1 => {
    if (var$1 === null || var$1.constructor.$meta.item === 'undefined') {
        $rt_throw(jl_IllegalArgumentException__init_());
    }
    return var$1.data.length;
},
jlr_Array_newInstance = (var$1, $length) => {
    if (var$1 === null) {
        var$1 = new jl_NullPointerException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    if (var$1 === $rt_cls($rt_voidcls)) {
        var$1 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    if ($length >= 0)
        return jlr_Array_newInstanceImpl(var$1.$platformClass, $length);
    var$1 = new jl_NegativeArraySizeException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
},
jlr_Array_newInstanceImpl = (var$1, var$2) => {
    if (var$1.$meta.primitive) {
        switch (var$1) {
        }
        ;
    }
    return $rt_createArray(var$1, var$2);
},
jl_ArrayStoreException = $rt_classWithoutFields(jl_RuntimeException),
jur_SpecialToken = $rt_classWithoutFields();
function jur_AbstractCharClass() {
    let a = this; jur_SpecialToken.call(a);
    a.$alt = 0;
    a.$altSurrogates = 0;
    a.$lowHighSurrogates = null;
    a.$charClassWithoutSurrogates = null;
    a.$charClassWithSurrogates = null;
    a.$mayContainSupplCodepoints = 0;
}
let jur_AbstractCharClass_charClasses = null,
jur_AbstractCharClass__init_ = $this => {
    $this.$lowHighSurrogates = ju_BitSet__init_0(2048);
},
jur_AbstractCharClass_getBits = $this => {
    return null;
},
jur_AbstractCharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_AbstractCharClass_hasLowHighSurrogates = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    if (!$this.$altSurrogates)
        var$1 = ju_BitSet_nextSetBit($this.$lowHighSurrogates, 0) >= 2048 ? 0 : 1;
    else {
        a: {
            var$2 = $this.$lowHighSurrogates;
            var$1 = 0;
            var$3 = var$2.$length1;
            if (var$1 < var$3) {
                var$4 = var$2.$data.data;
                var$5 = (var$4[0] ^ (-1)) >>> 0 | 0;
                if (var$5)
                    var$1 = jl_Integer_numberOfTrailingZeros(var$5) + var$1 | 0;
                else {
                    var$1 = (var$3 + 31 | 0) / 32 | 0;
                    var$5 = 1;
                    while (var$5 < var$1) {
                        if (var$4[var$5] != (-1)) {
                            var$1 = (var$5 * 32 | 0) + jl_Integer_numberOfTrailingZeros(var$4[var$5] ^ (-1)) | 0;
                            break a;
                        }
                        var$5 = var$5 + 1 | 0;
                    }
                    var$1 = var$3;
                }
            }
        }
        var$1 = var$1 >= 2048 ? 0 : 1;
    }
    return var$1;
},
jur_AbstractCharClass_mayContainSupplCodepoints = $this => {
    return $this.$mayContainSupplCodepoints;
},
jur_AbstractCharClass_getInstance = $this => {
    return $this;
},
jur_AbstractCharClass_getSurrogates = $this => {
    let $lHS, var$2;
    if ($this.$charClassWithSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        var$2 = new jur_AbstractCharClass$1;
        var$2.$this$028 = $this;
        var$2.$val$lHS = $lHS;
        jur_AbstractCharClass__init_(var$2);
        $this.$charClassWithSurrogates = var$2;
        jur_AbstractCharClass_setNegative(var$2, $this.$altSurrogates);
    }
    return $this.$charClassWithSurrogates;
},
jur_AbstractCharClass_getWithoutSurrogates = $this => {
    let $lHS, var$2;
    if ($this.$charClassWithoutSurrogates === null) {
        $lHS = $this.$getLowHighSurrogates();
        var$2 = new jur_AbstractCharClass$2;
        var$2.$this$019 = $this;
        var$2.$val$lHS0 = $lHS;
        var$2.$val$thisClass = $this;
        jur_AbstractCharClass__init_(var$2);
        $this.$charClassWithoutSurrogates = var$2;
        jur_AbstractCharClass_setNegative(var$2, $this.$alt);
        $this.$charClassWithoutSurrogates.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints;
    }
    return $this.$charClassWithoutSurrogates;
},
jur_AbstractCharClass_hasUCI = $this => {
    return 0;
},
jur_AbstractCharClass_setNegative = ($this, $value) => {
    let var$2;
    var$2 = $this.$alt;
    if (var$2 ^ $value) {
        $this.$alt = var$2 ? 0 : 1;
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
    }
    if (!$this.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    return $this;
},
jur_AbstractCharClass_isNegative = $this => {
    return $this.$alt;
},
jur_AbstractCharClass_intersects = ($cc1, $cc2) => {
    let var$3, var$4;
    if ($cc1.$getBits() !== null && $cc2.$getBits() !== null) {
        $cc1 = $cc1.$getBits();
        $cc2 = $cc2.$getBits();
        var$3 = jl_Math_min($cc1.$data.data.length, $cc2.$data.data.length);
        var$4 = 0;
        a: {
            while (var$4 < var$3) {
                if ($cc1.$data.data[var$4] & $cc2.$data.data[var$4]) {
                    var$3 = 1;
                    break a;
                }
                var$4 = var$4 + 1 | 0;
            }
            var$3 = 0;
        }
        return var$3;
    }
    return 1;
},
jur_AbstractCharClass_getPredefinedClass = ($name, $negative) => {
    let var$3, var$4, var$5;
    var$3 = 0;
    while (true) {
        var$4 = jur_AbstractCharClass$PredefinedCharacterClasses_contents.data;
        if (var$3 >= var$4.length) {
            var$5 = new ju_MissingResourceException;
            jl_RuntimeException__init_(var$5, $rt_s(2));
            var$5.$className = $rt_s(2);
            var$5.$key1 = $name;
            $rt_throw(var$5);
        }
        var$4 = var$4[var$3].data;
        if (jl_String_equals($name, var$4[0]))
            break;
        var$3 = var$3 + 1 | 0;
    }
    return jur_AbstractCharClass$LazyCharClass_getValue(var$4[1], $negative);
},
jur_AbstractCharClass__clinit_ = () => {
    jur_AbstractCharClass_charClasses = new jur_AbstractCharClass$PredefinedCharacterClasses;
};
function ju_MissingResourceException() {
    let a = this; jl_RuntimeException.call(a);
    a.$className = null;
    a.$key1 = null;
}
function jur_CharClass() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$ci = 0;
    a.$uci = 0;
    a.$hasUCI0 = 0;
    a.$invertedSurrogates = 0;
    a.$inverted = 0;
    a.$hideBits = 0;
    a.$bits = null;
    a.$nonBitSet = null;
}
let jur_CharClass__init_2 = $this => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_1();
},
jur_CharClass__init_ = () => {
    let var_0 = new jur_CharClass();
    jur_CharClass__init_2(var_0);
    return var_0;
},
jur_CharClass__init_1 = ($this, $ci, $uci) => {
    jur_AbstractCharClass__init_($this);
    $this.$bits = ju_BitSet__init_1();
    $this.$ci = $ci;
    $this.$uci = $uci;
},
jur_CharClass__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CharClass();
    jur_CharClass__init_1(var_2, var_0, var_1);
    return var_2;
},
jur_CharClass_add0 = ($this, $ch) => {
    a: {
        if ($this.$ci) {
            b: {
                if (!($ch >= 97 && $ch <= 122)) {
                    if ($ch < 65)
                        break b;
                    if ($ch > 90)
                        break b;
                }
                if ($this.$inverted) {
                    ju_BitSet_clear($this.$bits, jur_Pattern_getSupplement($ch & 65535));
                    break a;
                }
                ju_BitSet_set($this.$bits, jur_Pattern_getSupplement($ch & 65535));
                break a;
            }
            if ($this.$uci && $ch > 128) {
                $this.$hasUCI0 = 1;
                $ch = jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch));
            }
        }
    }
    if (!(!jur_Lexer_isHighSurrogate($ch) && !jur_Lexer_isLowSurrogate($ch))) {
        if ($this.$invertedSurrogates)
            ju_BitSet_clear($this.$lowHighSurrogates, $ch - 55296 | 0);
        else
            ju_BitSet_set($this.$lowHighSurrogates, $ch - 55296 | 0);
    }
    if ($this.$inverted)
        ju_BitSet_clear($this.$bits, $ch);
    else
        ju_BitSet_set($this.$bits, $ch);
    if (!$this.$mayContainSupplCodepoints && jl_Character_isSupplementaryCodePoint($ch))
        $this.$mayContainSupplCodepoints = 1;
    return $this;
},
jur_CharClass_add1 = ($this, $cc) => {
    let $curAlt, $nb, var$4;
    if (!$this.$mayContainSupplCodepoints && $cc.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    if ($this.$invertedSurrogates) {
        if (!$cc.$altSurrogates)
            ju_BitSet_andNot($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        else
            ju_BitSet_and($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
    } else if (!$cc.$altSurrogates)
        ju_BitSet_or($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        ju_BitSet_and($this.$lowHighSurrogates, $cc.$getLowHighSurrogates());
        $this.$altSurrogates = $this.$altSurrogates ? 0 : 1;
        $this.$invertedSurrogates = 1;
    }
    if (!$this.$hideBits && $cc.$getBits() !== null) {
        if ($this.$inverted) {
            if (!$cc.$alt)
                ju_BitSet_andNot($this.$bits, $cc.$getBits());
            else
                ju_BitSet_and($this.$bits, $cc.$getBits());
        } else if (!$cc.$alt)
            ju_BitSet_or($this.$bits, $cc.$getBits());
        else {
            ju_BitSet_xor($this.$bits, $cc.$getBits());
            ju_BitSet_and($this.$bits, $cc.$getBits());
            $this.$alt = $this.$alt ? 0 : 1;
            $this.$inverted = 1;
        }
    } else {
        $curAlt = $this.$alt;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$4 = new jur_CharClass$5;
                var$4.$this$020 = $this;
                var$4.$val$curAlt7 = $curAlt;
                var$4.$val$nb3 = $nb;
                var$4.$val$cc0 = $cc;
                jur_AbstractCharClass__init_(var$4);
                $this.$nonBitSet = var$4;
            } else {
                var$4 = new jur_CharClass$4;
                var$4.$this$034 = $this;
                var$4.$val$curAlt9 = $curAlt;
                var$4.$val$nb4 = $nb;
                var$4.$val$cc2 = $cc;
                jur_AbstractCharClass__init_(var$4);
                $this.$nonBitSet = var$4;
            }
        } else {
            if ($curAlt && !$this.$inverted && ju_BitSet_isEmpty($this.$bits)) {
                $nb = new jur_CharClass$1;
                $nb.$this$010 = $this;
                $nb.$val$cc3 = $cc;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else if (!$curAlt) {
                $nb = new jur_CharClass$3;
                $nb.$this$01 = $this;
                $nb.$val$curAlt = $curAlt;
                $nb.$val$cc = $cc;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$2;
                $nb.$this$00 = $this;
                $nb.$val$curAlt0 = $curAlt;
                $nb.$val$cc1 = $cc;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
    return $this;
},
jur_CharClass_add = ($this, $i, $end) => {
    let var$3, var$4, var$5, var$6, var$7;
    if ($i > $end) {
        var$3 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$3);
        $rt_throw(var$3);
    }
    a: {
        b: {
            if (!$this.$ci) {
                if ($end < 55296)
                    break b;
                if ($i > 57343)
                    break b;
            }
            $end = $end + 1 | 0;
            while (true) {
                if ($i >= $end)
                    break a;
                jur_CharClass_add0($this, $i);
                $i = $i + 1 | 0;
            }
        }
        if (!$this.$inverted)
            ju_BitSet_set0($this.$bits, $i, $end + 1 | 0);
        else {
            var$3 = $this.$bits;
            $end = $end + 1 | 0;
            if ($i >= 0 && $i <= $end) {
                var$4 = var$3.$length1;
                if ($i < var$4) {
                    var$5 = jl_Math_min(var$4, $end);
                    if ($i != var$5) {
                        var$6 = $i / 32 | 0;
                        $end = var$5 / 32 | 0;
                        if (var$6 == $end) {
                            var$7 = var$3.$data.data;
                            var$7[var$6] = var$7[var$6] & (ju_BitSet_trailingOneBits(var$3, $i) | ju_BitSet_trailingZeroBits(var$3, var$5));
                        } else {
                            var$7 = var$3.$data.data;
                            var$7[var$6] = var$7[var$6] & ju_BitSet_trailingOneBits(var$3, $i);
                            var$4 = var$6 + 1 | 0;
                            while (var$4 < $end) {
                                var$3.$data.data[var$4] = 0;
                                var$4 = var$4 + 1 | 0;
                            }
                            if (var$5 & 31) {
                                var$7 = var$3.$data.data;
                                var$7[$end] = var$7[$end] & ju_BitSet_trailingZeroBits(var$3, var$5);
                            }
                        }
                        ju_BitSet_recalculateLength(var$3);
                    }
                }
            } else {
                var$3 = new jl_IndexOutOfBoundsException;
                jl_Exception__init_(var$3);
                $rt_throw(var$3);
            }
        }
    }
    return $this;
},
jur_CharClass_union = ($this, $clazz) => {
    let var$2, $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints && $clazz.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    var$2 = $clazz;
    if (var$2.$hasUCI0)
        $this.$hasUCI0 = 1;
    $curAlt = $this.$altSurrogates;
    if (!($curAlt ^ $clazz.$altSurrogates)) {
        if (!$curAlt)
            ju_BitSet_or($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        else
            ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    } else if ($curAlt)
        ju_BitSet_andNot($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        $this.$altSurrogates = 1;
    }
    if (!$this.$hideBits && jur_CharClass_getBits(var$2) !== null) {
        $curAlt = $this.$alt;
        if (!($curAlt ^ $clazz.$alt)) {
            if (!$curAlt)
                ju_BitSet_or($this.$bits, jur_CharClass_getBits(var$2));
            else
                ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
        } else if ($curAlt)
            ju_BitSet_andNot($this.$bits, jur_CharClass_getBits(var$2));
        else {
            ju_BitSet_xor($this.$bits, jur_CharClass_getBits(var$2));
            ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
            $this.$alt = 1;
        }
    } else {
        $curAlt = $this.$alt;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$2 = new jur_CharClass$11;
                var$2.$this$014 = $this;
                var$2.$val$curAlt4 = $curAlt;
                var$2.$val$nb2 = $nb;
                var$2.$val$clazz8 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            } else {
                var$2 = new jur_CharClass$10;
                var$2.$this$021 = $this;
                var$2.$val$curAlt6 = $curAlt;
                var$2.$val$nb0 = $nb;
                var$2.$val$clazz0 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            }
        } else {
            if (!$this.$inverted && ju_BitSet_isEmpty($this.$bits)) {
                if (!$curAlt) {
                    $nb = new jur_CharClass$7;
                    $nb.$this$035 = $this;
                    $nb.$val$clazz7 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                } else {
                    $nb = new jur_CharClass$6;
                    $nb.$this$022 = $this;
                    $nb.$val$clazz6 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                }
            } else if (!$curAlt) {
                $nb = new jur_CharClass$9;
                $nb.$this$07 = $this;
                $nb.$val$clazz = $clazz;
                $nb.$val$curAlt8 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$8;
                $nb.$this$02 = $this;
                $nb.$val$clazz1 = $clazz;
                $nb.$val$curAlt2 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_intersection = ($this, $clazz) => {
    let var$2, $curAlt, $nb;
    if (!$this.$mayContainSupplCodepoints && $clazz.$mayContainSupplCodepoints)
        $this.$mayContainSupplCodepoints = 1;
    var$2 = $clazz;
    if (var$2.$hasUCI0)
        $this.$hasUCI0 = 1;
    $curAlt = $this.$altSurrogates;
    if (!($curAlt ^ $clazz.$altSurrogates)) {
        if (!$curAlt)
            ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        else
            ju_BitSet_or($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    } else if (!$curAlt)
        ju_BitSet_andNot($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
    else {
        ju_BitSet_xor($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        ju_BitSet_and($this.$lowHighSurrogates, var$2.$lowHighSurrogates);
        $this.$altSurrogates = 0;
    }
    if (!$this.$hideBits && jur_CharClass_getBits(var$2) !== null) {
        $curAlt = $this.$alt;
        if (!($curAlt ^ $clazz.$alt)) {
            if (!$curAlt)
                ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
            else
                ju_BitSet_or($this.$bits, jur_CharClass_getBits(var$2));
        } else if (!$curAlt)
            ju_BitSet_andNot($this.$bits, jur_CharClass_getBits(var$2));
        else {
            ju_BitSet_xor($this.$bits, jur_CharClass_getBits(var$2));
            ju_BitSet_and($this.$bits, jur_CharClass_getBits(var$2));
            $this.$alt = 0;
        }
    } else {
        $curAlt = $this.$alt;
        $nb = $this.$nonBitSet;
        if ($nb !== null) {
            if (!$curAlt) {
                var$2 = new jur_CharClass$17;
                var$2.$this$018 = $this;
                var$2.$val$curAlt5 = $curAlt;
                var$2.$val$nb1 = $nb;
                var$2.$val$clazz10 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            } else {
                var$2 = new jur_CharClass$16;
                var$2.$this$025 = $this;
                var$2.$val$curAlt3 = $curAlt;
                var$2.$val$nb = $nb;
                var$2.$val$clazz3 = $clazz;
                jur_AbstractCharClass__init_(var$2);
                $this.$nonBitSet = var$2;
            }
        } else {
            if (!$this.$inverted && ju_BitSet_isEmpty($this.$bits)) {
                if (!$curAlt) {
                    $nb = new jur_CharClass$13;
                    $nb.$this$023 = $this;
                    $nb.$val$clazz4 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                } else {
                    $nb = new jur_CharClass$12;
                    $nb.$this$033 = $this;
                    $nb.$val$clazz5 = $clazz;
                    jur_AbstractCharClass__init_($nb);
                    $this.$nonBitSet = $nb;
                }
            } else if (!$curAlt) {
                $nb = new jur_CharClass$15;
                $nb.$this$08 = $this;
                $nb.$val$clazz9 = $clazz;
                $nb.$val$curAlt1 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            } else {
                $nb = new jur_CharClass$14;
                $nb.$this$03 = $this;
                $nb.$val$clazz2 = $clazz;
                $nb.$val$curAlt10 = $curAlt;
                jur_AbstractCharClass__init_($nb);
                $this.$nonBitSet = $nb;
            }
            $this.$hideBits = 1;
        }
    }
},
jur_CharClass_contains = ($this, $ch) => {
    let var$2;
    var$2 = $this.$nonBitSet;
    if (var$2 !== null)
        return $this.$alt ^ var$2.$contains0($ch);
    return $this.$alt ^ ju_BitSet_get($this.$bits, $ch);
},
jur_CharClass_getBits = $this => {
    if (!$this.$hideBits)
        return $this.$bits;
    return null;
},
jur_CharClass_getLowHighSurrogates = $this => {
    return $this.$lowHighSurrogates;
},
jur_CharClass_getInstance = $this => {
    let $bs, $res;
    if ($this.$nonBitSet !== null)
        return $this;
    $bs = jur_CharClass_getBits($this);
    $res = new jur_CharClass$18;
    $res.$this$013 = $this;
    $res.$val$bs = $bs;
    jur_AbstractCharClass__init_($res);
    return jur_AbstractCharClass_setNegative($res, $this.$alt);
},
jur_CharClass_toString = $this => {
    let $temp, $i, var$3;
    $temp = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($temp);
    $i = ju_BitSet_nextSetBit($this.$bits, 0);
    while ($i >= 0) {
        jl_AbstractStringBuilder_append0($temp, jl_Character_toChars($i));
        jl_AbstractStringBuilder_append($temp, 124);
        $i = ju_BitSet_nextSetBit($this.$bits, $i + 1 | 0);
    }
    var$3 = $temp.$length0;
    if (var$3 > 0)
        jl_StringBuilder_deleteCharAt($temp, var$3 - 1 | 0);
    return jl_AbstractStringBuilder_toString($temp);
},
jur_CharClass_hasUCI = $this => {
    return $this.$hasUCI0;
};
function jur_QuantifierSet() {
    jur_AbstractSet.call(this);
    this.$innerSet = null;
}
let jur_QuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_AbstractSet__init_0($this, $next);
    $this.$innerSet = $innerSet;
    $this.$type = $type;
},
jur_QuantifierSet_getInnerSet = $this => {
    return $this.$innerSet;
},
jur_QuantifierSet_first = ($this, $set) => {
    return !$this.$innerSet.$first($set) && !$this.$next2.$first($set) ? 0 : 1;
},
jur_QuantifierSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_QuantifierSet_processSecondPass = $this => {
    let $set;
    $this.$isSecondPassVisited = 1;
    $set = $this.$next2;
    if ($set !== null && !$set.$isSecondPassVisited) {
        $set = $set.$processBackRefReplacement();
        if ($set !== null) {
            $this.$next2.$isSecondPassVisited = 1;
            $this.$next2 = $set;
        }
        $this.$next2.$processSecondPass();
    }
    $set = $this.$innerSet;
    if ($set !== null) {
        if (!$set.$isSecondPassVisited) {
            $set = $set.$processBackRefReplacement();
            if ($set !== null) {
                $this.$innerSet.$isSecondPassVisited = 1;
                $this.$innerSet = $set;
            }
            $this.$innerSet.$processSecondPass();
        } else if ($set instanceof jur_SingleSet && $set.$fSet.$isBackReferenced)
            $this.$innerSet = $set.$next2;
    }
};
function jur_LeafQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$leaf = null;
}
let jur_LeafQuantifierSet__init_ = ($this, $innerSet, $next, $type) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$leaf = $innerSet;
},
jur_LeafQuantifierSet__init_0 = (var_0, var_1, var_2) => {
    let var_3 = new jur_LeafQuantifierSet();
    jur_LeafQuantifierSet__init_(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_LeafQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $i, var$5;
    $i = 0;
    a: {
        while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
            var$5 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$5 <= 0)
                break a;
            $stringIndex = $stringIndex + var$5 | 0;
            $i = $i + 1 | 0;
        }
    }
    while (true) {
        if ($i < 0)
            return (-1);
        var$5 = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if (var$5 >= 0)
            break;
        $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
        $i = $i + (-1) | 0;
    }
    return var$5;
};
function jur_CompositeQuantifierSet() {
    jur_LeafQuantifierSet.call(this);
    this.$quantifier0 = null;
}
let jur_CompositeQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type) => {
    jur_LeafQuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier0 = $quant;
},
jur_CompositeQuantifierSet__init_0 = (var_0, var_1, var_2, var_3) => {
    let var_4 = new jur_CompositeQuantifierSet();
    jur_CompositeQuantifierSet__init_(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
jur_CompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $min, $max, $i, $shift;
    var$4 = $this.$quantifier0;
    $min = var$4.$min2;
    $max = var$4.$max1;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while ($i < $max) {
                    if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound)
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break a;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            while (true) {
                if ($i < $min)
                    return (-1);
                $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
                if ($shift >= 0)
                    break;
                $stringIndex = $stringIndex - $this.$leaf.$charCount() | 0;
                $i = $i + (-1) | 0;
            }
            return $shift;
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_GroupQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_GroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_AltQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_AltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    return $shift;
},
jur_AltQuantifierSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
    $this.$innerSet.$setNext($next);
},
jur_UnifiedQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_UnifiedQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    while (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound && $this.$leaf.$accepts($stringIndex, $testString) > 0) {
        $stringIndex = $stringIndex + $this.$leaf.$charCount() | 0;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_UnifiedQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $startSearch, $newSearch, $newSearch_0;
    $startSearch = $this.$next2.$find0($stringIndex, $testString, $matchResult);
    if ($startSearch < 0)
        return (-1);
    $newSearch = $startSearch - $this.$leaf.$charCount() | 0;
    while ($newSearch >= $stringIndex && $this.$leaf.$accepts($newSearch, $testString) > 0) {
        $newSearch_0 = $newSearch - $this.$leaf.$charCount() | 0;
        $startSearch = $newSearch;
        $newSearch = $newSearch_0;
    }
    return $startSearch;
},
jur_AbstractCharClass$PredefinedCharacterClasses = $rt_classWithoutFields(),
jur_AbstractCharClass$PredefinedCharacterClasses_space = null,
jur_AbstractCharClass$PredefinedCharacterClasses_digit = null,
jur_AbstractCharClass$PredefinedCharacterClasses_contents = null,
jur_AbstractCharClass$PredefinedCharacterClasses__clinit_ = () => {
    let var$1, var$2, var$3, var$4;
    jur_AbstractCharClass$PredefinedCharacterClasses_space = jur_AbstractCharClass$LazySpace__init_();
    jur_AbstractCharClass$PredefinedCharacterClasses_digit = jur_AbstractCharClass$LazyDigit__init_0();
    var$1 = $rt_createArray($rt_arraycls(jl_Object), 194);
    var$2 = var$1.data;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(85);
    var$4[1] = jur_AbstractCharClass$LazyLower__init_0();
    var$2[0] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(86);
    var$4[1] = jur_AbstractCharClass$LazyUpper__init_();
    var$2[1] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(87);
    var$4[1] = jur_AbstractCharClass$LazyASCII__init_0();
    var$2[2] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(88);
    var$4[1] = jur_AbstractCharClass$LazyAlpha__init_0();
    var$2[3] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(89);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[4] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(90);
    var$4[1] = jur_AbstractCharClass$LazyAlnum__init_();
    var$2[5] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(91);
    var$4[1] = jur_AbstractCharClass$LazyPunct__init_0();
    var$2[6] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(92);
    var$4[1] = jur_AbstractCharClass$LazyGraph__init_();
    var$2[7] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(93);
    var$4[1] = jur_AbstractCharClass$LazyPrint__init_();
    var$2[8] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(94);
    var$4[1] = jur_AbstractCharClass$LazyBlank__init_();
    var$2[9] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(95);
    var$4[1] = jur_AbstractCharClass$LazyCntrl__init_();
    var$2[10] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(96);
    var$4[1] = jur_AbstractCharClass$LazyXDigit__init_();
    var$2[11] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(97);
    var$4[1] = jur_AbstractCharClass$LazyJavaLowerCase__init_0();
    var$2[12] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(98);
    var$4[1] = jur_AbstractCharClass$LazyJavaUpperCase__init_();
    var$2[13] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(99);
    var$4[1] = jur_AbstractCharClass$LazyJavaWhitespace__init_0();
    var$2[14] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(100);
    var$4[1] = jur_AbstractCharClass$LazyJavaMirrored__init_0();
    var$2[15] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(101);
    var$4[1] = jur_AbstractCharClass$LazyJavaDefined__init_();
    var$2[16] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(102);
    var$4[1] = jur_AbstractCharClass$LazyJavaDigit__init_0();
    var$2[17] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(103);
    var$4[1] = jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0();
    var$2[18] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(104);
    var$4[1] = jur_AbstractCharClass$LazyJavaISOControl__init_0();
    var$2[19] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(105);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0();
    var$2[20] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(106);
    var$4[1] = jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0();
    var$2[21] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(107);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetter__init_();
    var$2[22] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(108);
    var$4[1] = jur_AbstractCharClass$LazyJavaLetterOrDigit__init_();
    var$2[23] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(109);
    var$4[1] = jur_AbstractCharClass$LazyJavaSpaceChar__init_0();
    var$2[24] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(110);
    var$4[1] = jur_AbstractCharClass$LazyJavaTitleCase__init_0();
    var$2[25] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(111);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_();
    var$2[26] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(112);
    var$4[1] = jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_();
    var$2[27] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(113);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[28] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(114);
    var$4[1] = jur_AbstractCharClass$LazyWord__init_();
    var$2[29] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(115);
    var$4[1] = jur_AbstractCharClass$LazyNonWord__init_();
    var$2[30] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(116);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_space;
    var$2[31] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(117);
    var$4[1] = jur_AbstractCharClass$LazyNonSpace__init_();
    var$2[32] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(118);
    var$4[1] = jur_AbstractCharClass$PredefinedCharacterClasses_digit;
    var$2[33] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(119);
    var$4[1] = jur_AbstractCharClass$LazyNonDigit__init_();
    var$2[34] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(120);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 127);
    var$2[35] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(121);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(128, 255);
    var$2[36] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(122);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(256, 383);
    var$2[37] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(123);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(384, 591);
    var$2[38] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(124);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(592, 687);
    var$2[39] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(125);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(688, 767);
    var$2[40] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(126);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(768, 879);
    var$2[41] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(127);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(880, 1023);
    var$2[42] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(128);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1024, 1279);
    var$2[43] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(129);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1280, 1327);
    var$2[44] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(130);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1328, 1423);
    var$2[45] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(131);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1424, 1535);
    var$2[46] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(132);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1536, 1791);
    var$2[47] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(133);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1792, 1871);
    var$2[48] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(134);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1872, 1919);
    var$2[49] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(135);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(1920, 1983);
    var$2[50] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(136);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2304, 2431);
    var$2[51] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(137);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2432, 2559);
    var$2[52] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(138);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2560, 2687);
    var$2[53] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(139);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2688, 2815);
    var$2[54] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(140);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2816, 2943);
    var$2[55] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(141);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(2944, 3071);
    var$2[56] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(142);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3072, 3199);
    var$2[57] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(143);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3200, 3327);
    var$2[58] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(144);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3328, 3455);
    var$2[59] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(145);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3456, 3583);
    var$2[60] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(146);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3584, 3711);
    var$2[61] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(147);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3712, 3839);
    var$2[62] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(148);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(3840, 4095);
    var$2[63] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(149);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4096, 4255);
    var$2[64] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(150);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4256, 4351);
    var$2[65] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(151);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4352, 4607);
    var$2[66] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(152);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4608, 4991);
    var$2[67] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(153);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(4992, 5023);
    var$2[68] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(154);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5024, 5119);
    var$2[69] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(155);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5120, 5759);
    var$2[70] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(156);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5760, 5791);
    var$2[71] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(157);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5792, 5887);
    var$2[72] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(158);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5888, 5919);
    var$2[73] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(159);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5920, 5951);
    var$2[74] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(160);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5952, 5983);
    var$2[75] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(161);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(5984, 6015);
    var$2[76] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(162);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6016, 6143);
    var$2[77] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(163);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6144, 6319);
    var$2[78] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(164);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6400, 6479);
    var$2[79] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(165);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6480, 6527);
    var$2[80] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(166);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6528, 6623);
    var$2[81] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(167);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6624, 6655);
    var$2[82] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(168);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(6656, 6687);
    var$2[83] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(169);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7424, 7551);
    var$2[84] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(170);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7552, 7615);
    var$2[85] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(171);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7616, 7679);
    var$2[86] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(172);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7680, 7935);
    var$2[87] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(173);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(7936, 8191);
    var$2[88] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(174);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8192, 8303);
    var$2[89] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(175);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8304, 8351);
    var$2[90] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(176);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8352, 8399);
    var$2[91] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(177);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8400, 8447);
    var$2[92] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(178);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8448, 8527);
    var$2[93] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(179);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8528, 8591);
    var$2[94] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(180);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8592, 8703);
    var$2[95] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(181);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8704, 8959);
    var$2[96] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(182);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(8960, 9215);
    var$2[97] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(183);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9216, 9279);
    var$2[98] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(184);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9280, 9311);
    var$2[99] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(185);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9312, 9471);
    var$2[100] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(186);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9472, 9599);
    var$2[101] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(187);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9600, 9631);
    var$2[102] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(188);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9632, 9727);
    var$2[103] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(189);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9728, 9983);
    var$2[104] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(190);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(9984, 10175);
    var$2[105] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(191);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10176, 10223);
    var$2[106] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(192);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10224, 10239);
    var$2[107] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(193);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10240, 10495);
    var$2[108] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(194);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10496, 10623);
    var$2[109] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(195);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10624, 10751);
    var$2[110] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(196);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(10752, 11007);
    var$2[111] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(197);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11008, 11263);
    var$2[112] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(198);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11264, 11359);
    var$2[113] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(199);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11392, 11519);
    var$2[114] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(200);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11520, 11567);
    var$2[115] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(201);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11568, 11647);
    var$2[116] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(202);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11648, 11743);
    var$2[117] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(203);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11776, 11903);
    var$2[118] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(204);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(11904, 12031);
    var$2[119] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(205);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12032, 12255);
    var$2[120] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(206);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12272, 12287);
    var$2[121] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(207);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12288, 12351);
    var$2[122] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(208);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12352, 12447);
    var$2[123] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(209);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12448, 12543);
    var$2[124] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(210);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12544, 12591);
    var$2[125] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(211);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12592, 12687);
    var$2[126] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(212);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12688, 12703);
    var$2[127] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(213);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12704, 12735);
    var$2[128] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(214);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12736, 12783);
    var$2[129] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(215);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12784, 12799);
    var$2[130] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(216);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(12800, 13055);
    var$2[131] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(217);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13056, 13311);
    var$2[132] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(218);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(13312, 19893);
    var$2[133] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(219);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19904, 19967);
    var$2[134] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(220);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(19968, 40959);
    var$2[135] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(221);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(40960, 42127);
    var$2[136] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(222);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42128, 42191);
    var$2[137] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(223);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(42752, 42783);
    var$2[138] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(224);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(43008, 43055);
    var$2[139] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(225);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(44032, 55203);
    var$2[140] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(226);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(55296, 56191);
    var$2[141] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(227);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56192, 56319);
    var$2[142] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(228);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(56320, 57343);
    var$2[143] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(229);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(57344, 63743);
    var$2[144] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(230);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(63744, 64255);
    var$2[145] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(231);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64256, 64335);
    var$2[146] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(232);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(64336, 65023);
    var$2[147] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(233);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65024, 65039);
    var$2[148] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(234);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65040, 65055);
    var$2[149] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(235);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65056, 65071);
    var$2[150] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(236);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65072, 65103);
    var$2[151] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(237);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65104, 65135);
    var$2[152] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(238);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65136, 65279);
    var$2[153] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(239);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(65280, 65519);
    var$2[154] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(240);
    var$4[1] = jur_AbstractCharClass$LazyRange__init_(0, 1114111);
    var$2[155] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(241);
    var$4[1] = jur_AbstractCharClass$LazySpecialsBlock__init_();
    var$2[156] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(242);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(0, 1);
    var$2[157] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(243);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(62, 1);
    var$2[158] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(244);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(1, 1);
    var$2[159] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(245);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(2, 1);
    var$2[160] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(246);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(3, 0);
    var$2[161] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(247);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(4, 0);
    var$2[162] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(248);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(5, 1);
    var$2[163] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(249);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(448, 1);
    var$2[164] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(250);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(6, 1);
    var$2[165] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(251);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(7, 0);
    var$2[166] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(252);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(8, 1);
    var$2[167] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(253);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(3584, 1);
    var$2[168] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(254);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(9, 1);
    var$2[169] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(255);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(10, 1);
    var$2[170] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(256);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(11, 1);
    var$2[171] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(257);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(28672, 0);
    var$2[172] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(258);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(12, 0);
    var$2[173] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(259);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(13, 0);
    var$2[174] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(260);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(14, 0);
    var$2[175] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(261);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_2(983040, 1, 1);
    var$2[176] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(262);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(15, 0);
    var$2[177] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(263);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(16, 1);
    var$2[178] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(264);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(18, 1);
    var$2[179] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(265);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_2(19, 0, 1);
    var$2[180] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(266);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(1643118592, 1);
    var$2[181] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(267);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(20, 0);
    var$2[182] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(268);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(21, 0);
    var$2[183] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(269);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(22, 0);
    var$2[184] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(270);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(23, 0);
    var$2[185] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(271);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(24, 1);
    var$2[186] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(272);
    var$4[1] = jur_AbstractCharClass$LazyCategoryScope__init_(2113929216, 1);
    var$2[187] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(273);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(25, 1);
    var$2[188] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(274);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(26, 0);
    var$2[189] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(275);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(27, 0);
    var$2[190] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(276);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(28, 1);
    var$2[191] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(277);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(29, 0);
    var$2[192] = var$3;
    var$3 = $rt_createArray(jl_Object, 2);
    var$4 = var$3.data;
    var$4[0] = $rt_s(278);
    var$4[1] = jur_AbstractCharClass$LazyCategory__init_(30, 0);
    var$2[193] = var$3;
    jur_AbstractCharClass$PredefinedCharacterClasses_contents = var$1;
};
function jur_AbstractCharClass$LazyCharClass() {
    let a = this; jl_Object.call(a);
    a.$posValue = null;
    a.$negValue = null;
}
let jur_AbstractCharClass$LazyCharClass_getValue = ($this, $negative) => {
    if (!$negative && $this.$posValue === null)
        $this.$posValue = $this.$computeValue();
    else if ($negative && $this.$negValue === null)
        $this.$negValue = jur_AbstractCharClass_setNegative($this.$computeValue(), 1);
    if ($negative)
        return $this.$negValue;
    return $this.$posValue;
},
jl_NumberFormatException = $rt_classWithoutFields(jl_IllegalArgumentException),
jl_NumberFormatException__init_ = $this => {
    jl_Exception__init_($this);
},
jl_NumberFormatException__init_0 = () => {
    let var_0 = new jl_NumberFormatException();
    jl_NumberFormatException__init_(var_0);
    return var_0;
};
function jur_Quantifier() {
    let a = this; jur_SpecialToken.call(a);
    a.$min2 = 0;
    a.$max1 = 0;
}
let jur_Quantifier_toString = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = $this.$min2;
    var$2 = $this.$max1;
    var$3 = var$2 != 2147483647 ? jl_Integer_toString(var$2) : $rt_s(2);
    var$4 = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_(var$4);
    jl_AbstractStringBuilder_append(var$4, 123);
    var$5 = jl_StringBuilder_append1(var$4, var$1);
    jl_AbstractStringBuilder_append(var$5, 44);
    jl_AbstractStringBuilder_append(jl_StringBuilder_append(var$5, var$3), 125);
    return jl_AbstractStringBuilder_toString(var$4);
},
jur_FSet$PossessiveFSet = $rt_classWithoutFields(jur_AbstractSet),
jur_FSet$PossessiveFSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    return $stringIndex;
},
jur_FSet$PossessiveFSet_hasConsumed = ($this, $mr) => {
    return 0;
};
function ju_BitSet() {
    let a = this; jl_Object.call(a);
    a.$data = null;
    a.$length1 = 0;
}
let ju_BitSet__init_2 = $this => {
    $this.$data = $rt_createIntArray(2);
},
ju_BitSet__init_1 = () => {
    let var_0 = new ju_BitSet();
    ju_BitSet__init_2(var_0);
    return var_0;
},
ju_BitSet__init_ = ($this, $nbits) => {
    let var$2;
    if ($nbits < 0) {
        var$2 = new jl_NegativeArraySizeException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $this.$data = $rt_createIntArray((($nbits + 32 | 0) - 1 | 0) / 32 | 0);
},
ju_BitSet__init_0 = var_0 => {
    let var_1 = new ju_BitSet();
    ju_BitSet__init_(var_1, var_0);
    return var_1;
},
ju_BitSet_set = ($this, $bitIndex) => {
    let var$2, $index, var$4;
    if ($bitIndex < 0) {
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $index = $bitIndex / 32 | 0;
    if ($bitIndex >= $this.$length1) {
        ju_BitSet_ensureCapacity($this, $index + 1 | 0);
        $this.$length1 = $bitIndex + 1 | 0;
    }
    var$4 = $this.$data.data;
    var$4[$index] = var$4[$index] | 1 << ($bitIndex % 32 | 0);
},
ju_BitSet_set0 = ($this, $fromIndex, $toIndex) => {
    let $fromDataIndex, $toDataIndex, var$5, $i, var$7;
    if ($fromIndex >= 0) {
        $fromDataIndex = $rt_compare($fromIndex, $toIndex);
        if ($fromDataIndex <= 0) {
            if (!$fromDataIndex)
                return;
            $fromDataIndex = $fromIndex / 32 | 0;
            $toDataIndex = $toIndex / 32 | 0;
            if ($toIndex > $this.$length1) {
                ju_BitSet_ensureCapacity($this, $toDataIndex + 1 | 0);
                $this.$length1 = $toIndex;
            }
            if ($fromDataIndex == $toDataIndex) {
                var$5 = $this.$data.data;
                var$5[$fromDataIndex] = var$5[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex) & ju_BitSet_trailingOneBits($this, $toIndex);
            } else {
                var$5 = $this.$data.data;
                var$5[$fromDataIndex] = var$5[$fromDataIndex] | ju_BitSet_trailingZeroBits($this, $fromIndex);
                $i = $fromDataIndex + 1 | 0;
                while ($i < $toDataIndex) {
                    $this.$data.data[$i] = (-1);
                    $i = $i + 1 | 0;
                }
                if ($toIndex & 31) {
                    var$5 = $this.$data.data;
                    var$5[$toDataIndex] = var$5[$toDataIndex] | ju_BitSet_trailingOneBits($this, $toIndex);
                }
            }
            return;
        }
    }
    var$7 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$7);
    $rt_throw(var$7);
},
ju_BitSet_trailingZeroBits = ($this, $num) => {
    return (-1) << ($num % 32 | 0);
},
ju_BitSet_trailingOneBits = ($this, $num) => {
    $num = $num % 32 | 0;
    return !$num ? 0 : (-1) >>> (32 - $num | 0) | 0;
},
ju_BitSet_clear = ($this, $bitIndex) => {
    let var$2, $index, var$4, var$5, var$6;
    if ($bitIndex < 0) {
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $index = $bitIndex / 32 | 0;
    var$4 = $this.$data.data;
    if ($index < var$4.length) {
        var$5 = var$4[$index];
        var$6 = ($bitIndex % 32 | 0) & 31;
        var$4[$index] = var$5 & ((-2) << var$6 | ((-2) >>> (32 - var$6 | 0) | 0));
        if ($bitIndex == ($this.$length1 - 1 | 0))
            ju_BitSet_recalculateLength($this);
    }
},
ju_BitSet_get = ($this, $bitIndex) => {
    let var$2, $index, var$4;
    if ($bitIndex < 0) {
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $index = $bitIndex / 32 | 0;
    var$4 = $this.$data.data;
    return $index < var$4.length && var$4[$index] & 1 << ($bitIndex % 32 | 0) ? 1 : 0;
},
ju_BitSet_nextSetBit = ($this, $fromIndex) => {
    let var$2, $top, $index, var$5, $i;
    if ($fromIndex < 0) {
        var$2 = new jl_IndexOutOfBoundsException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $top = $this.$length1;
    if ($fromIndex >= $top)
        return (-1);
    $index = $fromIndex / 32 | 0;
    var$5 = $this.$data.data;
    $i = var$5[$index] >>> ($fromIndex % 32 | 0) | 0;
    if ($i)
        return jl_Integer_numberOfTrailingZeros($i) + $fromIndex | 0;
    $top = ($top + 31 | 0) / 32 | 0;
    $i = $index + 1 | 0;
    while ($i < $top) {
        if (var$5[$i])
            return ($i * 32 | 0) + jl_Integer_numberOfTrailingZeros(var$5[$i]) | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
ju_BitSet_ensureCapacity = ($this, $capacity) => {
    let $newArrayLength, var$3, var$4, var$5;
    $newArrayLength = $this.$data.data.length;
    if ($newArrayLength >= $capacity)
        return;
    $newArrayLength = jl_Math_max(($capacity * 3 | 0) / 2 | 0, ($newArrayLength * 2 | 0) + 1 | 0);
    var$3 = $this.$data.data;
    var$4 = $rt_createIntArray($newArrayLength);
    var$5 = var$4.data;
    $capacity = jl_Math_min($newArrayLength, var$3.length);
    $newArrayLength = 0;
    while ($newArrayLength < $capacity) {
        var$5[$newArrayLength] = var$3[$newArrayLength];
        $newArrayLength = $newArrayLength + 1 | 0;
    }
    $this.$data = var$4;
},
ju_BitSet_recalculateLength = $this => {
    let $top, $i, $sz;
    $top = ($this.$length1 + 31 | 0) / 32 | 0;
    $this.$length1 = $top * 32 | 0;
    $i = $top - 1 | 0;
    a: {
        while (true) {
            if ($i < 0)
                break a;
            $sz = jl_Integer_numberOfLeadingZeros($this.$data.data[$i]);
            if ($sz < 32)
                break;
            $i = $i + (-1) | 0;
            $this.$length1 = $this.$length1 - 32 | 0;
        }
        $this.$length1 = $this.$length1 - $sz | 0;
    }
},
ju_BitSet_and = ($this, $set) => {
    let $i, $i_0, var$4, var$5;
    $i = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i_0 = 0;
    while ($i_0 < $i) {
        var$4 = $this.$data.data;
        var$4[$i_0] = var$4[$i_0] & $set.$data.data[$i_0];
        $i_0 = $i_0 + 1 | 0;
    }
    while (true) {
        var$5 = $this.$data.data;
        if ($i >= var$5.length)
            break;
        var$5[$i] = 0;
        $i = $i + 1 | 0;
    }
    $this.$length1 = jl_Math_min($this.$length1, $set.$length1);
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_andNot = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] & ($set.$data.data[$i] ^ (-1));
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_or = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_max($this.$length1, $set.$length1);
    $this.$length1 = $sz;
    ju_BitSet_ensureCapacity($this, ($sz + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] | $set.$data.data[$i];
        $i = $i + 1 | 0;
    }
},
ju_BitSet_xor = ($this, $set) => {
    let $sz, $i, var$4;
    $sz = jl_Math_max($this.$length1, $set.$length1);
    $this.$length1 = $sz;
    ju_BitSet_ensureCapacity($this, ($sz + 31 | 0) / 32 | 0);
    $sz = jl_Math_min($this.$data.data.length, $set.$data.data.length);
    $i = 0;
    while ($i < $sz) {
        var$4 = $this.$data.data;
        var$4[$i] = var$4[$i] ^ $set.$data.data[$i];
        $i = $i + 1 | 0;
    }
    ju_BitSet_recalculateLength($this);
},
ju_BitSet_isEmpty = $this => {
    return $this.$length1 ? 0 : 1;
};
function jur_LowHighSurrogateRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$surrChars = null;
    a.$alt0 = 0;
}
function jur_CompositeRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$withoutSurrogates = null;
    a.$withSurrogates = null;
}
let jur_CompositeRangeSet__init_0 = ($this, $withoutSurrogates, $withSurrogates) => {
    jur_AbstractSet__init_($this);
    $this.$withoutSurrogates = $withoutSurrogates;
    $this.$withSurrogates = $withSurrogates;
},
jur_CompositeRangeSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_CompositeRangeSet();
    jur_CompositeRangeSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_CompositeRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift, var$5, var$6, var$7, var$8, var$9;
    $shift = $this.$withoutSurrogates.$matches($stringIndex, $testString, $matchResult);
    if ($shift < 0)
        a: {
            var$5 = $this.$withSurrogates;
            var$6 = $matchResult.$leftBound;
            $shift = $matchResult.$rightBound;
            var$7 = $stringIndex + 1 | 0;
            $shift = $rt_compare(var$7, $shift);
            if ($shift > 0) {
                $matchResult.$hitEnd = 1;
                $shift = (-1);
            } else {
                var$8 = $testString;
                var$9 = jl_String_charAt(var$8, $stringIndex);
                if (!var$5.$surrChars.$contains0(var$9))
                    $shift = (-1);
                else {
                    if (jl_Character_isHighSurrogate(var$9)) {
                        if ($shift < 0 && jl_Character_isLowSurrogate(jl_String_charAt(var$8, var$7))) {
                            $shift = (-1);
                            break a;
                        }
                    } else if (jl_Character_isLowSurrogate(var$9) && $stringIndex > var$6 && jl_Character_isHighSurrogate(jl_String_charAt(var$8, $stringIndex - 1 | 0))) {
                        $shift = (-1);
                        break a;
                    }
                    $shift = var$5.$next2.$matches(var$7, $testString, $matchResult);
                }
            }
        }
    if ($shift >= 0)
        return $shift;
    return (-1);
},
jur_CompositeRangeSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
    $this.$withSurrogates.$next2 = $next;
    $this.$withoutSurrogates.$setNext($next);
},
jur_CompositeRangeSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_CompositeRangeSet_first = ($this, $set) => {
    return 1;
};
function jur_SupplRangeSet() {
    let a = this; jur_JointSet.call(a);
    a.$chars = null;
    a.$alt3 = 0;
}
let jur_SupplRangeSet__init_ = ($this, $cc) => {
    jur_AbstractSet__init_($this);
    $this.$chars = $cc.$getInstance0();
    $this.$alt3 = $cc.$alt;
},
jur_SupplRangeSet__init_0 = var_0 => {
    let var_1 = new jur_SupplRangeSet();
    jur_SupplRangeSet__init_(var_1, var_0);
    return var_1;
},
jur_SupplRangeSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $low, var$6, $high, $offset;
    $strLength = $matchResult.$rightBound;
    if ($stringIndex < $strLength) {
        $low = $stringIndex + 1 | 0;
        var$6 = $testString;
        $high = jl_String_charAt(var$6, $stringIndex);
        if ($this.$contains0($high)) {
            $offset = $this.$next2.$matches($low, $testString, $matchResult);
            if ($offset > 0)
                return $offset;
        }
        if ($low < $strLength) {
            $stringIndex = $low + 1 | 0;
            $low = jl_String_charAt(var$6, $low);
            if (jl_Character_isSurrogatePair($high, $low) && $this.$contains0(jl_Character_toCodePoint($high, $low)))
                return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        }
    }
    return (-1);
},
jur_SupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains0($ch);
},
jur_SupplRangeSet_first = ($this, $set) => {
    if ($set instanceof jur_SupplCharSet)
        return $this.$chars.$contains0($set.$ch1);
    if ($set instanceof jur_CharSet)
        return $this.$chars.$contains0($set.$ch0);
    if ($set instanceof jur_SupplRangeSet)
        return jur_AbstractCharClass_intersects($this.$chars, $set.$chars);
    if (!($set instanceof jur_RangeSet))
        return 1;
    return jur_AbstractCharClass_intersects($this.$chars, $set.$chars0);
},
jur_SupplRangeSet_getChars = $this => {
    return $this.$chars;
},
jur_SupplRangeSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_SupplRangeSet_hasConsumed = ($this, $mr) => {
    return 1;
},
jur_UCISupplRangeSet = $rt_classWithoutFields(jur_SupplRangeSet),
jur_UCISupplRangeSet_contains = ($this, $ch) => {
    return $this.$chars.$contains0(jl_Character_toLowerCase0(jl_Character_toUpperCase0($ch)));
};
function jur_UCIRangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars2 = null;
    a.$alt2 = 0;
}
let jur_UCIRangeSet__init_0 = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars2 = $cc.$getInstance0();
    $this.$alt2 = $cc.$alt;
},
jur_UCIRangeSet__init_ = var_0 => {
    let var_1 = new jur_UCIRangeSet();
    jur_UCIRangeSet__init_0(var_1, var_0);
    return var_1;
},
jur_UCIRangeSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$chars2.$contains0(jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, $strIndex)))) ? (-1) : 1;
};
function jur_RangeSet() {
    let a = this; jur_LeafSet.call(a);
    a.$chars0 = null;
    a.$alt1 = 0;
}
let jur_RangeSet__init_0 = ($this, $cc) => {
    jur_LeafSet__init_($this);
    $this.$chars0 = $cc.$getInstance0();
    $this.$alt1 = $cc.$alt;
},
jur_RangeSet__init_ = var_0 => {
    let var_1 = new jur_RangeSet();
    jur_RangeSet__init_0(var_1, var_0);
    return var_1;
},
jur_RangeSet_accepts = ($this, $strIndex, $testString) => {
    return !$this.$chars0.$contains0(jl_String_charAt($testString, $strIndex)) ? (-1) : 1;
},
jur_RangeSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return $this.$chars0.$contains0($set.$ch0);
    if ($set instanceof jur_RangeSet)
        return jur_AbstractCharClass_intersects($this.$chars0, $set.$chars0);
    if (!($set instanceof jur_SupplRangeSet)) {
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return 0;
    }
    return jur_AbstractCharClass_intersects($this.$chars0, $set.$chars);
};
function jur_HangulDecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$decomposedChar = null;
    a.$decomposedCharUTF16 = null;
    a.$decomposedCharLength = 0;
}
let jur_HangulDecomposedCharSet__init_0 = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_AbstractSet__init_($this);
    $this.$decomposedChar = $decomposedChar;
    $this.$decomposedCharLength = $decomposedCharLength;
},
jur_HangulDecomposedCharSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_HangulDecomposedCharSet();
    jur_HangulDecomposedCharSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_HangulDecomposedCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_HangulDecomposedCharSet_getDecomposedChar = $this => {
    if ($this.$decomposedCharUTF16 === null)
        $this.$decomposedCharUTF16 = jl_String__init_0($this.$decomposedChar);
    return $this.$decomposedCharUTF16;
},
jur_HangulDecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, $decompSyllable, $vIndex, $tIndex, var$8, var$9, $curSymb, $i, var$12, $lIndex, $decompCurSymb, var$15, $syllIndex;
    $rightBound = $matchResult.$rightBound;
    $decompSyllable = $rt_createIntArray(3);
    $vIndex = (-1);
    $tIndex = (-1);
    if ($strIndex >= $rightBound)
        return (-1);
    var$8 = $strIndex + 1 | 0;
    var$9 = $testString;
    $curSymb = jl_String_charAt(var$9, $strIndex);
    $i = $curSymb - 44032 | 0;
    if ($i >= 0 && $i < 11172) {
        var$12 = 4352 + ($i / 588 | 0) | 0;
        $lIndex = 4449 + (($i % 588 | 0) / 28 | 0) | 0;
        $strIndex = $i % 28 | 0;
        $decompCurSymb = !$strIndex ? $rt_createIntArrayFromData([var$12, $lIndex]) : $rt_createIntArrayFromData([var$12, $lIndex, 4519 + $strIndex | 0]);
    } else
        $decompCurSymb = null;
    if ($decompCurSymb !== null) {
        var$15 = $decompCurSymb.data;
        $i = 0;
        $strIndex = var$15.length;
        $syllIndex = $this.$decomposedCharLength;
        if ($strIndex != $syllIndex)
            return (-1);
        while (true) {
            if ($i >= $syllIndex)
                return $this.$next2.$matches(var$8, $testString, $matchResult);
            if (var$15[$i] != $this.$decomposedChar.data[$i])
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    $decompSyllable = $decompSyllable.data;
    $decompSyllable[0] = $curSymb;
    $lIndex = $curSymb - 4352 | 0;
    if ($lIndex >= 0 && $lIndex < 19) {
        if (var$8 < $rightBound) {
            $curSymb = jl_String_charAt(var$9, var$8);
            $vIndex = $curSymb - 4449 | 0;
        }
        if ($vIndex >= 0 && $vIndex < 21) {
            $lIndex = var$8 + 1 | 0;
            $decompSyllable[1] = $curSymb;
            if ($lIndex < $rightBound) {
                $curSymb = jl_String_charAt(var$9, $lIndex);
                $tIndex = $curSymb - 4519 | 0;
            }
            if ($tIndex >= 0 && $tIndex < 28) {
                a: {
                    $strIndex = $lIndex + 1 | 0;
                    $decompSyllable[2] = $curSymb;
                    if ($this.$decomposedCharLength == 3) {
                        $lIndex = $decompSyllable[0];
                        var$15 = $this.$decomposedChar.data;
                        if ($lIndex == var$15[0] && $decompSyllable[1] == var$15[1] && $decompSyllable[2] == var$15[2]) {
                            $strIndex = $this.$next2.$matches($strIndex, $testString, $matchResult);
                            break a;
                        }
                    }
                    $strIndex = (-1);
                }
                return $strIndex;
            }
            b: {
                if ($this.$decomposedCharLength == 2) {
                    $syllIndex = $decompSyllable[0];
                    var$15 = $this.$decomposedChar.data;
                    if ($syllIndex == var$15[0] && $decompSyllable[1] == var$15[1]) {
                        $strIndex = $this.$next2.$matches($lIndex, $testString, $matchResult);
                        break b;
                    }
                }
                $strIndex = (-1);
            }
            return $strIndex;
        }
        return (-1);
    }
    return (-1);
},
jur_HangulDecomposedCharSet_first = ($this, $set) => {
    return $set instanceof jur_HangulDecomposedCharSet && !jl_String_equals(jur_HangulDecomposedCharSet_getDecomposedChar($set), jur_HangulDecomposedCharSet_getDecomposedChar($this)) ? 0 : 1;
},
jur_HangulDecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_CharSet() {
    jur_LeafSet.call(this);
    this.$ch0 = 0;
}
let jur_CharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch0 = $ch;
},
jur_CharSet__init_ = var_0 => {
    let var_1 = new jur_CharSet();
    jur_CharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CharSet_charCount = $this => {
    return 1;
},
jur_CharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch0 != jl_String_charAt($testString, $strIndex) ? (-1) : 1;
},
jur_CharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$rightBound;
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$6 = jl_String_indexOf($testStr, $this.$ch0, $strIndex);
        if (var$6 < 0)
            return (-1);
        var$7 = $this.$next2;
        $strIndex = var$6 + 1 | 0;
        if (var$7.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$6;
},
jur_CharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, var$6;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            var$6 = jl_String_lastIndexOf($testStr, $this.$ch0, $lastIndex);
            if (var$6 < 0)
                break a;
            if (var$6 < $strIndex)
                break a;
            if ($this.$next2.$matches(var$6 + 1 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = var$6 + (-1) | 0;
        }
        return var$6;
    }
    return (-1);
},
jur_CharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return $set.$ch0 != $this.$ch0 ? 0 : 1;
    if (!($set instanceof jur_RangeSet)) {
        if ($set instanceof jur_SupplRangeSet)
            return $set.$contains0($this.$ch0);
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return 0;
    }
    return jur_RangeSet_accepts($set, 0, jl_Character_toString($this.$ch0)) <= 0 ? 0 : 1;
};
function jur_UCICharSet() {
    jur_LeafSet.call(this);
    this.$ch2 = 0;
}
let jur_UCICharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch2 = jl_Character_toLowerCase(jl_Character_toUpperCase($ch));
},
jur_UCICharSet__init_ = var_0 => {
    let var_1 = new jur_UCICharSet();
    jur_UCICharSet__init_0(var_1, var_0);
    return var_1;
},
jur_UCICharSet_accepts = ($this, $strIndex, $testString) => {
    return $this.$ch2 != jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($testString, $strIndex))) ? (-1) : 1;
};
function jur_CICharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$ch3 = 0;
    a.$supplement = 0;
}
let jur_CICharSet__init_0 = ($this, $ch) => {
    jur_LeafSet__init_($this);
    $this.$ch3 = $ch;
    $this.$supplement = jur_Pattern_getSupplement($ch);
},
jur_CICharSet__init_ = var_0 => {
    let var_1 = new jur_CICharSet();
    jur_CICharSet__init_0(var_1, var_0);
    return var_1;
},
jur_CICharSet_accepts = ($this, $strIndex, $testString) => {
    let var$3;
    var$3 = $this.$ch3;
    $testString = $testString;
    return var$3 != jl_String_charAt($testString, $strIndex) && $this.$supplement != jl_String_charAt($testString, $strIndex) ? (-1) : 1;
};
function jur_DecomposedCharSet() {
    let a = this; jur_JointSet.call(a);
    a.$readCharsForCodePoint = 0;
    a.$decomposedCharUTF160 = null;
    a.$decomposedChar0 = null;
    a.$decomposedCharLength0 = 0;
}
let jur_DecomposedCharSet__init_ = ($this, $decomposedChar, $decomposedCharLength) => {
    jur_AbstractSet__init_($this);
    $this.$readCharsForCodePoint = 1;
    $this.$decomposedChar0 = $decomposedChar;
    $this.$decomposedCharLength0 = $decomposedCharLength;
},
jur_DecomposedCharSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_DecomposedCharSet();
    jur_DecomposedCharSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_DecomposedCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_DecomposedCharSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $decCodePoint, $rightBound, $curChar, var$7, $decCurCodePoint, var$9, var$10, $readCodePoints;
    $decCodePoint = $rt_createIntArray(4);
    $rightBound = $matchResult.$rightBound;
    if ($strIndex >= $rightBound)
        return (-1);
    $curChar = jur_DecomposedCharSet_codePointAt($this, $strIndex, $testString, $rightBound);
    var$7 = $strIndex + $this.$readCharsForCodePoint | 0;
    $decCurCodePoint = jur_Lexer_getDecomposition($curChar);
    if ($decCurCodePoint === null) {
        $decCurCodePoint = $decCodePoint.data;
        $strIndex = 1;
        $decCurCodePoint[0] = $curChar;
    } else {
        $strIndex = $decCurCodePoint.data.length;
        jl_System_fastArraycopy($decCurCodePoint, 0, $decCodePoint, 0, $strIndex);
        $strIndex = 0 + $strIndex | 0;
    }
    a: {
        if (var$7 < $rightBound) {
            var$9 = $decCodePoint.data;
            $curChar = jur_DecomposedCharSet_codePointAt($this, var$7, $testString, $rightBound);
            while ($strIndex < 4) {
                if (!(($curChar != 832 ? 0 : 1) | ($curChar != 833 ? 0 : 1) | ($curChar != 835 ? 0 : 1) | ($curChar != 836 ? 0 : 1))) {
                    var$10 = $strIndex + 1 | 0;
                    var$9[$strIndex] = $curChar;
                } else {
                    $decCurCodePoint = (jur_Lexer_getDecomposition($curChar)).data;
                    if ($decCurCodePoint.length != 2) {
                        var$10 = $strIndex + 1 | 0;
                        var$9[$strIndex] = $decCurCodePoint[0];
                    } else {
                        $readCodePoints = $strIndex + 1 | 0;
                        var$9[$strIndex] = $decCurCodePoint[0];
                        var$10 = $readCodePoints + 1 | 0;
                        var$9[$readCodePoints] = $decCurCodePoint[1];
                    }
                }
                var$7 = var$7 + $this.$readCharsForCodePoint | 0;
                if (var$7 >= $rightBound) {
                    $strIndex = var$10;
                    break a;
                }
                $curChar = jur_DecomposedCharSet_codePointAt($this, var$7, $testString, $rightBound);
                $strIndex = var$10;
            }
        }
    }
    if ($strIndex != $this.$decomposedCharLength0)
        return (-1);
    $decCurCodePoint = $decCodePoint.data;
    $curChar = 0;
    while (true) {
        if ($curChar >= $strIndex)
            return $this.$next2.$matches(var$7, $testString, $matchResult);
        if ($decCurCodePoint[$curChar] != $this.$decomposedChar0.data[$curChar])
            break;
        $curChar = $curChar + 1 | 0;
    }
    return (-1);
},
jur_DecomposedCharSet_getDecomposedChar = $this => {
    let $strBuff, $i;
    if ($this.$decomposedCharUTF160 === null) {
        $strBuff = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($strBuff);
        $i = 0;
        while ($i < $this.$decomposedCharLength0) {
            jl_AbstractStringBuilder_append0($strBuff, jl_Character_toChars($this.$decomposedChar0.data[$i]));
            $i = $i + 1 | 0;
        }
        $this.$decomposedCharUTF160 = jl_AbstractStringBuilder_toString($strBuff);
    }
    return $this.$decomposedCharUTF160;
},
jur_DecomposedCharSet_codePointAt = ($this, $strIndex, $testString, $rightBound) => {
    let $curChar, $low, $curCodePointUTF16;
    $this.$readCharsForCodePoint = 1;
    if ($strIndex >= ($rightBound - 1 | 0))
        $curChar = jl_String_charAt($testString, $strIndex);
    else {
        $rightBound = $strIndex + 1 | 0;
        $testString = $testString;
        $curChar = jl_String_charAt($testString, $strIndex);
        $low = jl_String_charAt($testString, $rightBound);
        if (jl_Character_isSurrogatePair($curChar, $low)) {
            $curCodePointUTF16 = $rt_createCharArray(2).data;
            $curCodePointUTF16[0] = $curChar;
            $curCodePointUTF16[1] = $low;
            $rightBound = $curCodePointUTF16.length;
            if (0 < $rightBound && $rightBound <= $rightBound) {
                $curChar = 0 < ($rightBound - 1 | 0) && jl_Character_isHighSurrogate($curCodePointUTF16[0]) && jl_Character_isLowSurrogate($curCodePointUTF16[1]) ? jl_Character_toCodePoint($curCodePointUTF16[0], $curCodePointUTF16[1]) : $curCodePointUTF16[0];
                $this.$readCharsForCodePoint = 2;
            } else {
                $testString = new jl_IndexOutOfBoundsException;
                jl_Exception__init_($testString);
                $rt_throw($testString);
            }
        }
    }
    return $curChar;
},
jur_DecomposedCharSet_first = ($this, $set) => {
    return $set instanceof jur_DecomposedCharSet && !jl_String_equals(jur_DecomposedCharSet_getDecomposedChar($set), jur_DecomposedCharSet_getDecomposedChar($this)) ? 0 : 1;
},
jur_DecomposedCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
},
jur_UCIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_CIDecomposedCharSet = $rt_classWithoutFields(jur_DecomposedCharSet),
jur_PossessiveGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PossessiveGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $stringIndex_0;
    while (true) {
        $stringIndex_0 = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
        if ($stringIndex_0 <= 0)
            break;
        $stringIndex = $stringIndex_0;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_PosPlusGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_PosPlusGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        return (-1);
    if ($nextIndex > $stringIndex) {
        while (true) {
            $stringIndex = $this.$innerSet.$matches($nextIndex, $testString, $matchResult);
            if ($stringIndex <= $nextIndex)
                break;
            $nextIndex = $stringIndex;
        }
        $stringIndex = $nextIndex;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_AltGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_AltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0)
        return $nextIndex;
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_AltGroupQuantifierSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
    $this.$innerSet.$setNext($next);
},
jur_PosAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_PosAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex <= 0)
        $nextIndex = $stringIndex;
    return $this.$next2.$matches($nextIndex, $testString, $matchResult);
},
jur_PosAltGroupQuantifierSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
};
function jur_CompositeGroupQuantifierSet() {
    let a = this; jur_GroupQuantifierSet.call(a);
    a.$quantifier = null;
    a.$setCounter = 0;
}
let jur_CompositeGroupQuantifierSet__init_ = ($this, $quant, $innerSet, $next, $type, $setCounter) => {
    jur_QuantifierSet__init_($this, $innerSet, $next, $type);
    $this.$quantifier = $quant;
    $this.$setCounter = $setCounter;
},
jur_CompositeGroupQuantifierSet__init_0 = (var_0, var_1, var_2, var_3, var_4) => {
    let var_5 = new jur_CompositeGroupQuantifierSet();
    jur_CompositeGroupQuantifierSet__init_(var_5, var_0, var_1, var_2, var_3, var_4);
    return var_5;
},
jur_CompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, $nextIndex;
    $enterCounter = jur_MatchResultImpl_getEnterCounter($matchResult, $this.$setCounter);
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($enterCounter >= $this.$quantifier.$max1)
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$setCounter;
    $enterCounter = $enterCounter + 1 | 0;
    jur_MatchResultImpl_setEnterCounter($matchResult, $nextIndex, $enterCounter);
    $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex >= 0) {
        jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
        return $nextIndex;
    }
    $nextIndex = $this.$setCounter;
    $enterCounter = $enterCounter + (-1) | 0;
    jur_MatchResultImpl_setEnterCounter($matchResult, $nextIndex, $enterCounter);
    if ($enterCounter >= $this.$quantifier.$min2)
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
    return (-1);
},
jur_PosCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_PosCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $counter, $max, $nextIndex;
    $counter = 0;
    $max = $this.$quantifier.$max1;
    a: {
        while (true) {
            $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
            if ($nextIndex <= $stringIndex)
                break a;
            if ($counter >= $max)
                break;
            $counter = $counter + 1 | 0;
            $stringIndex = $nextIndex;
        }
    }
    if ($nextIndex < 0 && $counter < $this.$quantifier.$min2)
        return (-1);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_ReluctantGroupQuantifierSet = $rt_classWithoutFields(jur_GroupQuantifierSet),
jur_ReluctantGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $res;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $res = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($res >= 0)
        return $res;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
},
jur_RelAltGroupQuantifierSet = $rt_classWithoutFields(jur_AltGroupQuantifierSet),
jur_RelAltGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $nextIndex;
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    $nextIndex = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($nextIndex < 0)
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    return $nextIndex;
},
jur_RelCompositeGroupQuantifierSet = $rt_classWithoutFields(jur_CompositeGroupQuantifierSet),
jur_RelCompositeGroupQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $enterCounter, var$5, $nextIndex;
    $enterCounter = jur_MatchResultImpl_getEnterCounter($matchResult, $this.$setCounter);
    if (!$this.$innerSet.$hasConsumed($matchResult))
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    var$5 = $this.$quantifier;
    if ($enterCounter >= var$5.$max1) {
        jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
        return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    }
    if ($enterCounter < var$5.$min2) {
        jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, $enterCounter + 1 | 0);
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    } else {
        $nextIndex = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if ($nextIndex >= 0) {
            jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, 0);
            return $nextIndex;
        }
        jur_MatchResultImpl_setEnterCounter($matchResult, $this.$setCounter, $enterCounter + 1 | 0);
        $nextIndex = $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
    }
    return $nextIndex;
},
jur_DotAllQuantifierSet = $rt_classWithoutFields(jur_QuantifierSet),
jur_DotAllQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$rightBound;
    if ($strLength > $stringIndex)
        return $this.$next2.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_DotAllQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength;
    $strLength = $matchResult.$rightBound;
    if ($this.$next2.$findBack($stringIndex, $strLength, $testString, $matchResult) >= 0)
        return $stringIndex;
    return (-1);
};
function jur_DotQuantifierSet() {
    jur_QuantifierSet.call(this);
    this.$lt = null;
}
let jur_DotQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $startSearch;
    $strLength = $matchResult.$rightBound;
    $startSearch = jur_DotQuantifierSet_findLineTerminator($this, $stringIndex, $strLength, $testString);
    if ($startSearch >= 0)
        $strLength = $startSearch;
    if ($strLength > $stringIndex)
        return $this.$next2.$findBack($stringIndex, $strLength, $testString, $matchResult);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_DotQuantifierSet_find = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, $res, $nextSearch, $leftBound;
    $strLength = $matchResult.$rightBound;
    $res = $this.$next2.$find0($stringIndex, $testString, $matchResult);
    if ($res < 0)
        return (-1);
    $nextSearch = jur_DotQuantifierSet_findLineTerminator($this, $res, $strLength, $testString);
    if ($nextSearch >= 0)
        $strLength = $nextSearch;
    $strLength = jl_Math_max($res, $this.$next2.$findBack($res, $strLength, $testString, $matchResult));
    if ($strLength <= 0)
        $leftBound = $strLength ? (-1) : 0;
    else {
        $leftBound = $strLength - 1 | 0;
        $matchResult = $testString;
        a: {
            while (true) {
                if ($leftBound < $stringIndex) {
                    $leftBound = (-1);
                    break a;
                }
                if ($this.$lt.$isLineTerminator(jl_String_charAt($matchResult, $leftBound)))
                    break;
                $leftBound = $leftBound + (-1) | 0;
            }
        }
    }
    if ($leftBound >= $stringIndex)
        $stringIndex = $leftBound >= $strLength ? $leftBound : $leftBound + 1 | 0;
    return $stringIndex;
},
jur_DotQuantifierSet_findLineTerminator = ($this, $i, $to, $testString) => {
    let var$4;
    var$4 = $testString;
    while (true) {
        if ($i >= $to)
            return (-1);
        if ($this.$lt.$isLineTerminator(jl_String_charAt(var$4, $i)))
            break;
        $i = $i + 1 | 0;
    }
    return $i;
},
jur_AbstractLineTerminator = $rt_classWithoutFields(),
jur_AbstractLineTerminator_unixLT = null,
jur_AbstractLineTerminator_unicodeLT = null,
jur_AbstractLineTerminator_getInstance = $flag => {
    let var$2;
    if (!($flag & 1)) {
        var$2 = jur_AbstractLineTerminator_unicodeLT;
        if (var$2 !== null)
            return var$2;
        var$2 = new jur_AbstractLineTerminator$2;
        jur_AbstractLineTerminator_unicodeLT = var$2;
        return var$2;
    }
    var$2 = jur_AbstractLineTerminator_unixLT;
    if (var$2 !== null)
        return var$2;
    var$2 = new jur_AbstractLineTerminator$1;
    jur_AbstractLineTerminator_unixLT = var$2;
    return var$2;
},
jur_PossessiveQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_PossessiveQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    a: {
        while (true) {
            if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound)
                break a;
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            if (var$4 < 1)
                break;
            $stringIndex = $stringIndex + var$4 | 0;
        }
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_PossessiveAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_PossessiveAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
        var$4 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$4 >= 1)
            $stringIndex = $stringIndex + var$4 | 0;
    }
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_PossessiveCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_PossessiveCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $min, $max, $i, $shift;
    var$4 = $this.$quantifier0;
    $min = var$4.$min2;
    $max = var$4.$max1;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    if ($i >= $max)
                        break a;
                    if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound)
                        break a;
                    $shift = $this.$leaf.$accepts($stringIndex, $testString);
                    if ($shift < 1)
                        break;
                    $stringIndex = $stringIndex + $shift | 0;
                    $i = $i + 1 | 0;
                }
            }
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        $shift = $this.$leaf.$accepts($stringIndex, $testString);
        if ($shift < 1)
            break;
        $stringIndex = $stringIndex + $shift | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_ReluctantQuantifierSet = $rt_classWithoutFields(jur_LeafQuantifierSet),
jur_ReluctantQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4;
    while (true) {
        var$4 = $this.$next2.$matches($stringIndex, $testString, $matchResult);
        if (var$4 >= 0)
            break;
        if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
            var$4 = $this.$leaf.$accepts($stringIndex, $testString);
            $stringIndex = $stringIndex + var$4 | 0;
        }
        if (var$4 < 1)
            return (-1);
    }
    return var$4;
},
jur_ReluctantAltQuantifierSet = $rt_classWithoutFields(jur_AltQuantifierSet),
jur_ReluctantAltQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $shift;
    $shift = $this.$next2.$matches($stringIndex, $testString, $matchResult);
    if ($shift >= 0)
        return $shift;
    return $this.$innerSet.$matches($stringIndex, $testString, $matchResult);
},
jur_ReluctantCompositeQuantifierSet = $rt_classWithoutFields(jur_CompositeQuantifierSet),
jur_ReluctantCompositeQuantifierSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, $min, $max, $i, var$8, var$9;
    var$4 = $this.$quantifier0;
    $min = var$4.$min2;
    $max = var$4.$max1;
    $i = 0;
    while (true) {
        if ($i >= $min) {
            a: {
                while (true) {
                    var$8 = $this.$next2.$matches($stringIndex, $testString, $matchResult);
                    if (var$8 >= 0)
                        break;
                    if (($stringIndex + $this.$leaf.$charCount() | 0) <= $matchResult.$rightBound) {
                        var$8 = $this.$leaf.$accepts($stringIndex, $testString);
                        $stringIndex = $stringIndex + var$8 | 0;
                        $i = $i + 1 | 0;
                    }
                    if (var$8 < 1)
                        break a;
                    if ($i > $max)
                        break a;
                }
                return var$8;
            }
            return (-1);
        }
        if (($stringIndex + $this.$leaf.$charCount() | 0) > $matchResult.$rightBound) {
            $matchResult.$hitEnd = 1;
            return (-1);
        }
        var$9 = $this.$leaf.$accepts($stringIndex, $testString);
        if (var$9 < 1)
            break;
        $stringIndex = $stringIndex + var$9 | 0;
        $i = $i + 1 | 0;
    }
    return (-1);
},
jur_SOLSet = $rt_classWithoutFields(jur_AbstractSet),
jur_SOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    if ($strIndex && !($matchResult.$anchoringBounds && $strIndex == $matchResult.$leftBound))
        return (-1);
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_SOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
};
function jur_WordBoundary() {
    jur_AbstractSet.call(this);
    this.$positive = 0;
}
let jur_WordBoundary__init_0 = ($this, $positive) => {
    jur_AbstractSet__init_($this);
    $this.$positive = $positive;
},
jur_WordBoundary__init_ = var_0 => {
    let var_1 = new jur_WordBoundary();
    jur_WordBoundary__init_0(var_1, var_0);
    return var_1;
},
jur_WordBoundary_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $ch1, $ch2, $left, $leftBound;
    $ch1 = $stringIndex >= $matchResult.$rightBound ? 32 : jl_String_charAt($testString, $stringIndex);
    if (!$stringIndex)
        $ch2 = 32;
    else {
        $left = $stringIndex - 1 | 0;
        $ch2 = jl_String_charAt($testString, $left);
    }
    $leftBound = $matchResult.$transparentBounds ? 0 : $matchResult.$leftBound;
    return ($ch1 != 32 && !jur_WordBoundary_isSpace($this, $ch1, $stringIndex, $leftBound, $testString) ? 0 : 1) ^ ($ch2 != 32 && !jur_WordBoundary_isSpace($this, $ch2, $stringIndex - 1 | 0, $leftBound, $testString) ? 0 : 1) ^ $this.$positive ? (-1) : $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_WordBoundary_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_WordBoundary_isSpace = ($this, $ch, $index, $leftBound, $testString) => {
    if (!jl_Character_isLetterOrDigit($ch) && $ch != 95) {
        a: {
            if (jl_Character_getType($ch) == 6) {
                $testString = $testString;
                while (true) {
                    $index = $index + (-1) | 0;
                    if ($index < $leftBound)
                        break a;
                    $ch = jl_String_charAt($testString, $index);
                    if (jl_Character_isLetterOrDigit($ch))
                        return 0;
                    if (jl_Character_getType($ch) != 6)
                        return 1;
                }
            }
        }
        return 1;
    }
    return 0;
},
jur_PreviousMatch = $rt_classWithoutFields(jur_AbstractSet),
jur_PreviousMatch_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($stringIndex != $matchResult.$previousMatch)
        return (-1);
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_PreviousMatch_hasConsumed = ($this, $matchResult) => {
    return 0;
};
function jur_EOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter0 = 0;
}
let jur_EOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter0 = $counter;
},
jur_EOLSet__init_0 = var_0 => {
    let var_1 = new jur_EOLSet();
    jur_EOLSet__init_(var_1, var_0);
    return var_1;
},
jur_EOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound, var$5, var$6, $ch;
    $rightBound = $matchResult.$anchoringBounds ? $matchResult.$rightBound : $testString.$nativeString.length;
    if ($strIndex >= $rightBound) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, 0);
        return $this.$next2.$matches($strIndex, $testString, $matchResult);
    }
    var$5 = $rightBound - $strIndex | 0;
    if (var$5 == 2) {
        var$6 = $testString;
        if (jl_String_charAt(var$6, $strIndex) == 13 && jl_String_charAt(var$6, $strIndex + 1 | 0) == 10) {
            jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, 0);
            return $this.$next2.$matches($strIndex, $testString, $matchResult);
        }
    }
    a: {
        if (var$5 == 1) {
            $ch = jl_String_charAt($testString, $strIndex);
            if ($ch == 10)
                break a;
            if ($ch == 13)
                break a;
            if ($ch == 133)
                break a;
            if (($ch | 1) == 8233)
                break a;
        }
        return (-1);
    }
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, 0);
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_EOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter0) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter0, (-1));
    return $res;
},
jur_EOISet = $rt_classWithoutFields(jur_AbstractSet),
jur_EOISet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    if ($stringIndex < (!$matchResult.$transparentBounds ? $matchResult.$rightBound : $testString.$nativeString.length))
        return (-1);
    $matchResult.$hitEnd = 1;
    $matchResult.$requireEnd = 1;
    return $this.$next2.$matches($stringIndex, $testString, $matchResult);
},
jur_EOISet_hasConsumed = ($this, $matchResult) => {
    return 0;
};
function jur_MultiLineSOLSet() {
    jur_AbstractSet.call(this);
    this.$lt1 = null;
}
let jur_MultiLineSOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let var$4, var$5, var$6;
    a: {
        if ($strIndex != $matchResult.$rightBound) {
            if (!$strIndex)
                break a;
            if ($matchResult.$anchoringBounds && $strIndex == $matchResult.$leftBound)
                break a;
            var$4 = $this.$lt1;
            var$5 = $strIndex - 1 | 0;
            var$6 = $testString;
            if (var$4.$isAfterLineTerminator(jl_String_charAt(var$6, var$5), jl_String_charAt(var$6, $strIndex)))
                break a;
        }
        return (-1);
    }
    return $this.$next2.$matches($strIndex, $testString, $matchResult);
},
jur_MultiLineSOLSet_hasConsumed = ($this, $matchResult) => {
    return 0;
},
jur_DotAllSet = $rt_classWithoutFields(jur_JointSet),
jur_DotAllSet__init_ = $this => {
    jur_AbstractSet__init_($this);
},
jur_DotAllSet__init_0 = () => {
    let var_0 = new jur_DotAllSet();
    jur_DotAllSet__init_(var_0);
    return var_0;
},
jur_DotAllSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6, $high;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    var$6 = $testString;
    $high = jl_String_charAt(var$6, $stringIndex);
    if (jl_Character_isHighSurrogate($high)) {
        $stringIndex = $stringIndex + 2 | 0;
        if ($stringIndex <= $strLength && jl_Character_isSurrogatePair($high, jl_String_charAt(var$6, var$5)))
            return $this.$next2.$matches($stringIndex, $testString, $matchResult);
    }
    return $this.$next2.$matches(var$5, $testString, $matchResult);
},
jur_DotAllSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_DotAllSet_getType = $this => {
    return (-2147483602);
},
jur_DotAllSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_DotSet() {
    jur_JointSet.call(this);
    this.$lt0 = null;
}
let jur_DotSet__init_ = ($this, $lt) => {
    jur_AbstractSet__init_($this);
    $this.$lt0 = $lt;
},
jur_DotSet__init_0 = var_0 => {
    let var_1 = new jur_DotSet();
    jur_DotSet__init_(var_1, var_0);
    return var_1;
},
jur_DotSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6, $high, $low;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    if (var$5 > $strLength) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    var$6 = $testString;
    $high = jl_String_charAt(var$6, $stringIndex);
    if (jl_Character_isHighSurrogate($high)) {
        $stringIndex = $stringIndex + 2 | 0;
        if ($stringIndex <= $strLength) {
            $low = jl_String_charAt(var$6, var$5);
            if (jl_Character_isSurrogatePair($high, $low))
                return $this.$lt0.$isLineTerminator(jl_Character_toCodePoint($high, $low)) ? (-1) : $this.$next2.$matches($stringIndex, $testString, $matchResult);
        }
    }
    return $this.$lt0.$isLineTerminator($high) ? (-1) : $this.$next2.$matches(var$5, $testString, $matchResult);
},
jur_DotSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_DotSet_getType = $this => {
    return (-2147483602);
},
jur_DotSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_UEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter3 = 0;
}
let jur_UEOLSet__init_0 = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter3 = $counter;
},
jur_UEOLSet__init_ = var_0 => {
    let var_1 = new jur_UEOLSet();
    jur_UEOLSet__init_0(var_1, var_0);
    return var_1;
},
jur_UEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $rightBound;
    $rightBound = $matchResult.$anchoringBounds ? $matchResult.$rightBound : $testString.$nativeString.length;
    if ($strIndex >= $rightBound) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter3, 0);
        return $this.$next2.$matches($strIndex, $testString, $matchResult);
    }
    if (($rightBound - $strIndex | 0) == 1 && jl_String_charAt($testString, $strIndex) == 10) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter3, 1);
        return $this.$next2.$matches($strIndex + 1 | 0, $testString, $matchResult);
    }
    return (-1);
},
jur_UEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter3) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter3, (-1));
    return $res;
};
function jur_UMultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter2 = 0;
}
let jur_UMultiLineEOLSet__init_ = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter2 = $counter;
},
jur_UMultiLineEOLSet__init_0 = var_0 => {
    let var_1 = new jur_UMultiLineEOLSet();
    jur_UMultiLineEOLSet__init_(var_1, var_0);
    return var_1;
},
jur_UMultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    if (($matchResult.$anchoringBounds ? $matchResult.$rightBound - $strIndex | 0 : $testString.$nativeString.length - $strIndex | 0) <= 0) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter2, 0);
        return $this.$next2.$matches($strIndex, $testString, $matchResult);
    }
    if (jl_String_charAt($testString, $strIndex) != 10)
        return (-1);
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter2, 1);
    return $this.$next2.$matches($strIndex + 1 | 0, $testString, $matchResult);
},
jur_UMultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter2) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter2, (-1));
    return $res;
};
function jur_MultiLineEOLSet() {
    jur_AbstractSet.call(this);
    this.$consCounter = 0;
}
let jur_MultiLineEOLSet__init_0 = ($this, $counter) => {
    jur_AbstractSet__init_($this);
    $this.$consCounter = $counter;
},
jur_MultiLineEOLSet__init_ = var_0 => {
    let var_1 = new jur_MultiLineEOLSet();
    jur_MultiLineEOLSet__init_0(var_1, var_0);
    return var_1;
},
jur_MultiLineEOLSet_matches = ($this, $strIndex, $testString, $matchResult) => {
    let $strDif, $ch1, $ch2, var$7;
    $strDif = $matchResult.$anchoringBounds ? $matchResult.$rightBound - $strIndex | 0 : $testString.$nativeString.length - $strIndex | 0;
    if (!$strDif) {
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
        return $this.$next2.$matches($strIndex, $testString, $matchResult);
    }
    if ($strDif < 2) {
        $ch1 = jl_String_charAt($testString, $strIndex);
        $ch2 = 97;
    } else {
        var$7 = $testString;
        $ch1 = jl_String_charAt(var$7, $strIndex);
        $ch2 = jl_String_charAt(var$7, $strIndex + 1 | 0);
    }
    switch ($ch1) {
        case 10:
        case 133:
        case 8232:
        case 8233:
            jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
            return $this.$next2.$matches($strIndex, $testString, $matchResult);
        case 13:
            if ($ch2 != 10) {
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
                return $this.$next2.$matches($strIndex, $testString, $matchResult);
            }
            jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, 0);
            return $this.$next2.$matches($strIndex, $testString, $matchResult);
        default:
    }
    return (-1);
},
jur_MultiLineEOLSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter, (-1));
    return $res;
};
function jur_CIBackReferenceSet() {
    let a = this; jur_JointSet.call(a);
    a.$referencedGroup = 0;
    a.$consCounter1 = 0;
}
let jur_CIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_AbstractSet__init_($this);
    $this.$referencedGroup = $groupIndex;
    $this.$consCounter1 = $consCounter;
},
jur_CIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_CIBackReferenceSet();
    jur_CIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_CIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6, var$7, var$8;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$nativeString.length | 0) <= $matchResult.$rightBound) {
        $i = 0;
        var$6 = $testString;
        while (true) {
            if ($i >= $group.$nativeString.length) {
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, $group.$nativeString.length);
                return $this.$next2.$matches($stringIndex + $group.$nativeString.length | 0, $testString, $matchResult);
            }
            var$7 = jl_String_charAt($group, $i);
            var$8 = $stringIndex + $i | 0;
            if (var$7 != jl_String_charAt(var$6, var$8) && jur_Pattern_getSupplement(jl_String_charAt($group, $i)) != jl_String_charAt(var$6, var$8))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
},
jur_CIBackReferenceSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_CIBackReferenceSet_getString = ($this, $matchResult) => {
    let var$2, var$3;
    var$2 = $this.$referencedGroup;
    var$3 = jur_MatchResultImpl_getStart($matchResult, var$2);
    var$2 = jur_MatchResultImpl_getEnd($matchResult, var$2);
    return (var$2 | var$3 | (var$2 - var$3 | 0)) >= 0 && var$2 <= $matchResult.$string3.$nativeString.length ? jl_String_substring($matchResult.$string3, var$3, var$2) : null;
},
jur_CIBackReferenceSet_hasConsumed = ($this, $matchResult) => {
    let $res;
    $res = !jur_MatchResultImpl_getConsumed($matchResult, $this.$consCounter1) ? 0 : 1;
    jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, (-1));
    return $res;
},
jur_BackReferenceSet = $rt_classWithoutFields(jur_CIBackReferenceSet),
jur_BackReferenceSet__init_0 = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_BackReferenceSet__init_ = (var_0, var_1) => {
    let var_2 = new jur_BackReferenceSet();
    jur_BackReferenceSet__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_BackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $shift;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$nativeString.length | 0) <= $matchResult.$rightBound) {
        $shift = !jl_String_startsWith($testString, $group, $stringIndex) ? (-1) : $group.$nativeString.length;
        if ($shift < 0)
            return (-1);
        jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, $shift);
        return $this.$next2.$matches($stringIndex + $shift | 0, $testString, $matchResult);
    }
    return (-1);
},
jur_BackReferenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $group, $strLength, $testStr;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    $strLength = $matchResult.$leftBound;
    if ($group !== null && ($strIndex + $group.$nativeString.length | 0) <= $strLength) {
        $testStr = $testString;
        while (true) {
            if ($strIndex > $strLength)
                return (-1);
            $strIndex = jl_String_indexOf1($testStr, $group, $strIndex);
            if ($strIndex < 0)
                return (-1);
            if ($this.$next2.$matches($strIndex + $group.$nativeString.length | 0, $testString, $matchResult) >= 0)
                break;
            $strIndex = $strIndex + 1 | 0;
        }
        return $strIndex;
    }
    return (-1);
},
jur_BackReferenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $group, $testStr, var$7;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group === null)
        return (-1);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            $lastIndex = jl_Math_min($lastIndex, $testStr.$nativeString.length - $group.$nativeString.length | 0);
            b: {
                c: while (true) {
                    if ($lastIndex < 0) {
                        $lastIndex = (-1);
                        break b;
                    }
                    var$7 = 0;
                    while (true) {
                        if (var$7 >= $group.$nativeString.length)
                            break c;
                        if (jl_String_charAt($testStr, $lastIndex + var$7 | 0) != jl_String_charAt($group, var$7))
                            break;
                        var$7 = var$7 + 1 | 0;
                    }
                    $lastIndex = $lastIndex + (-1) | 0;
                }
            }
            if ($lastIndex < 0)
                break a;
            if ($lastIndex < $strIndex)
                break a;
            if ($this.$next2.$matches($lastIndex + $group.$nativeString.length | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = $lastIndex + (-1) | 0;
        }
        return $lastIndex;
    }
    return (-1);
},
jur_BackReferenceSet_first = ($this, $set) => {
    return 1;
},
jur_UCIBackReferenceSet = $rt_classWithoutFields(jur_CIBackReferenceSet),
jur_UCIBackReferenceSet__init_ = ($this, $groupIndex, $consCounter) => {
    jur_CIBackReferenceSet__init_($this, $groupIndex, $consCounter);
},
jur_UCIBackReferenceSet__init_0 = (var_0, var_1) => {
    let var_2 = new jur_UCIBackReferenceSet();
    jur_UCIBackReferenceSet__init_(var_2, var_0, var_1);
    return var_2;
},
jur_UCIBackReferenceSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $group, $i, var$6;
    $group = jur_CIBackReferenceSet_getString($this, $matchResult);
    if ($group !== null && ($stringIndex + $group.$nativeString.length | 0) <= $matchResult.$rightBound) {
        $i = 0;
        var$6 = $testString;
        while (true) {
            if ($i >= $group.$nativeString.length) {
                jur_MatchResultImpl_setConsumed($matchResult, $this.$consCounter1, $group.$nativeString.length);
                return $this.$next2.$matches($stringIndex + $group.$nativeString.length | 0, $testString, $matchResult);
            }
            if (jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt($group, $i))) != jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt(var$6, $stringIndex + $i | 0))))
                break;
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return (-1);
},
jl_StringBuffer = $rt_classWithoutFields(jl_AbstractStringBuilder),
jl_StringBuffer_insert0 = ($this, var$1, var$2, var$3, var$4) => {
    jl_AbstractStringBuilder_insert($this, var$1, var$2, var$3, var$4);
    return $this;
},
jl_StringBuffer_append = ($this, var$1, var$2, var$3) => {
    jl_AbstractStringBuilder_append2($this, var$1, var$2, var$3);
    return $this;
},
jl_StringBuffer_ensureCapacity = ($this, var$1) => {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
},
jl_StringBuffer_insert = ($this, var$1, var$2) => {
    jl_AbstractStringBuilder_insert0($this, var$1, var$2);
    return $this;
};
function jur_SequenceSet() {
    let a = this; jur_LeafSet.call(a);
    a.$string = null;
    a.$leftToRight = null;
    a.$rightToLeft = null;
}
let jur_SequenceSet_accepts = ($this, $strIndex, $testString) => {
    return !jur_SequenceSet_startsWith($this, $testString, $strIndex) ? (-1) : $this.$charCount0;
},
jur_SequenceSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $strLength, var$5, var$6, var$7;
    $strLength = $matchResult.$rightBound;
    var$5 = $testString;
    while (true) {
        if ($strIndex > $strLength)
            return (-1);
        var$6 = jl_String_charAt($this.$string, $this.$charCount0 - 1 | 0);
        a: {
            while (true) {
                var$7 = $this.$charCount0;
                if ($strIndex > ($strLength - var$7 | 0)) {
                    $strIndex = (-1);
                    break a;
                }
                var$7 = jl_String_charAt(var$5, ($strIndex + var$7 | 0) - 1 | 0);
                if (var$7 == var$6 && jur_SequenceSet_startsWith($this, $testString, $strIndex))
                    break;
                $strIndex = $strIndex + jur_SequenceSet$IntHash_get($this.$leftToRight, var$7) | 0;
            }
        }
        if ($strIndex < 0)
            return (-1);
        if ($this.$next2.$matches($strIndex + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $strIndex = $strIndex + 1 | 0;
    }
    return $strIndex;
},
jur_SequenceSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let var$5, var$6, var$7;
    var$5 = $testString;
    while (true) {
        if ($lastIndex < $strIndex)
            return (-1);
        var$6 = jl_String_charAt($this.$string, 0);
        var$7 = (var$5.$nativeString.length - $lastIndex | 0) - $this.$charCount0 | 0;
        if (var$7 <= 0)
            $lastIndex = $lastIndex + var$7 | 0;
        a: {
            while (true) {
                if ($lastIndex < $strIndex) {
                    $lastIndex = (-1);
                    break a;
                }
                var$7 = jl_String_charAt(var$5, $lastIndex);
                if (var$7 == var$6 && jur_SequenceSet_startsWith($this, $testString, $lastIndex))
                    break;
                $lastIndex = $lastIndex - jur_SequenceSet$IntHash_get($this.$rightToLeft, var$7) | 0;
            }
        }
        if ($lastIndex < 0)
            return (-1);
        if ($this.$next2.$matches($lastIndex + $this.$charCount0 | 0, $testString, $matchResult) >= 0)
            break;
        $lastIndex = $lastIndex + (-1) | 0;
    }
    return $lastIndex;
},
jur_SequenceSet_first = ($this, $set) => {
    let var$2;
    if ($set instanceof jur_CharSet)
        return $set.$ch0 != jl_String_charAt($this.$string, 0) ? 0 : 1;
    if ($set instanceof jur_RangeSet)
        return jur_RangeSet_accepts($set, 0, jl_String_substring($this.$string, 0, 1)) <= 0 ? 0 : 1;
    if (!($set instanceof jur_SupplRangeSet)) {
        if (!($set instanceof jur_SupplCharSet))
            return 1;
        return $this.$string.$nativeString.length > 1 && $set.$ch1 == jl_Character_toCodePoint(jl_String_charAt($this.$string, 0), jl_String_charAt($this.$string, 1)) ? 1 : 0;
    }
    a: {
        b: {
            $set = $set;
            if (!$set.$contains0(jl_String_charAt($this.$string, 0))) {
                if ($this.$string.$nativeString.length <= 1)
                    break b;
                if (!$set.$contains0(jl_Character_toCodePoint(jl_String_charAt($this.$string, 0), jl_String_charAt($this.$string, 1))))
                    break b;
            }
            var$2 = 1;
            break a;
        }
        var$2 = 0;
    }
    return var$2;
},
jur_SequenceSet_startsWith = ($this, $str, $from) => {
    let $i;
    $i = 0;
    $str = $str;
    while ($i < $this.$charCount0) {
        if (jl_String_charAt($str, $i + $from | 0) != jl_String_charAt($this.$string, $i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
};
function jur_UCISequenceSet() {
    jur_LeafSet.call(this);
    this.$string1 = null;
}
let jur_UCISequenceSet__init_ = ($this, $substring) => {
    let $res, $i, var$4;
    jur_LeafSet__init_($this);
    $res = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($res);
    $i = 0;
    while (true) {
        var$4 = $rt_compare($i, $substring.$length0);
        if (var$4 >= 0) {
            $this.$string1 = jl_AbstractStringBuilder_toString($res);
            $this.$charCount0 = $res.$length0;
            return;
        }
        if ($i < 0)
            break;
        if (var$4 >= 0)
            break;
        jl_AbstractStringBuilder_append($res, jl_Character_toLowerCase(jl_Character_toUpperCase($substring.$buffer.data[$i])));
        $i = $i + 1 | 0;
    }
    $substring = new jl_IndexOutOfBoundsException;
    jl_Exception__init_($substring);
    $rt_throw($substring);
},
jur_UCISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_UCISequenceSet();
    jur_UCISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_UCISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i, var$4;
    $i = 0;
    var$4 = $testString;
    while (true) {
        if ($i >= $this.$string1.$nativeString.length)
            return $this.$string1.$nativeString.length;
        if (jl_String_charAt($this.$string1, $i) != jl_Character_toLowerCase(jl_Character_toUpperCase(jl_String_charAt(var$4, $strIndex + $i | 0))))
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
};
function jur_CISequenceSet() {
    jur_LeafSet.call(this);
    this.$string0 = null;
}
let jur_CISequenceSet__init_ = ($this, $substring) => {
    jur_LeafSet__init_($this);
    $this.$string0 = jl_AbstractStringBuilder_toString($substring);
    $this.$charCount0 = $substring.$length0;
},
jur_CISequenceSet__init_0 = var_0 => {
    let var_1 = new jur_CISequenceSet();
    jur_CISequenceSet__init_(var_1, var_0);
    return var_1;
},
jur_CISequenceSet_accepts = ($this, $strIndex, $testString) => {
    let $i, var$4, var$5;
    $i = 0;
    $testString = $testString;
    while (true) {
        if ($i >= $this.$string0.$nativeString.length)
            return $this.$string0.$nativeString.length;
        var$4 = jl_String_charAt($this.$string0, $i);
        var$5 = $strIndex + $i | 0;
        if (var$4 != jl_String_charAt($testString, var$5) && jur_Pattern_getSupplement(jl_String_charAt($this.$string0, $i)) != jl_String_charAt($testString, var$5))
            break;
        $i = $i + 1 | 0;
    }
    return (-1);
};
function jur_UCISupplCharSet() {
    jur_LeafSet.call(this);
    this.$ch4 = 0;
}
let jur_UCISupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let $low, $high;
    $low = $strIndex + 1 | 0;
    $testString = $testString;
    $high = jl_String_charAt($testString, $strIndex);
    $low = jl_String_charAt($testString, $low);
    return $this.$ch4 != jl_Character_toLowerCase0(jl_Character_toUpperCase0(jl_Character_toCodePoint($high, $low))) ? (-1) : 2;
};
function jur_LowSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$low = 0;
}
let jur_LowSurrogateCharSet__init_0 = ($this, $low) => {
    jur_AbstractSet__init_($this);
    $this.$low = $low;
},
jur_LowSurrogateCharSet__init_ = var_0 => {
    let var_1 = new jur_LowSurrogateCharSet();
    jur_LowSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
},
jur_LowSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_LowSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let var$4, var$5, $low;
    var$4 = $stringIndex + 1 | 0;
    if (var$4 > $matchResult.$rightBound) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    var$5 = $testString;
    $low = jl_String_charAt(var$5, $stringIndex);
    if ($stringIndex > $matchResult.$leftBound && jl_Character_isHighSurrogate(jl_String_charAt(var$5, $stringIndex - 1 | 0)))
        return (-1);
    if ($this.$low != $low)
        return (-1);
    return $this.$next2.$matches(var$4, $testString, $matchResult);
},
jur_LowSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $startStr, $strLength, var$7, var$8;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $startStr = $matchResult.$leftBound;
    $strLength = $matchResult.$rightBound;
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$7 = jl_String_indexOf($testStr, $this.$low, $strIndex);
        if (var$7 < 0)
            return (-1);
        if (var$7 > $startStr && jl_Character_isHighSurrogate(jl_String_charAt($testStr, var$7 - 1 | 0))) {
            $strIndex = var$7 + 1 | 0;
            continue;
        }
        var$8 = $this.$next2;
        $strIndex = var$7 + 1 | 0;
        if (var$8.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$7;
},
jur_LowSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $startStr, $testStr;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $startStr = $matchResult.$leftBound;
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            $lastIndex = jl_String_lastIndexOf($testStr, $this.$low, $lastIndex);
            if ($lastIndex < 0)
                break a;
            if ($lastIndex < $strIndex)
                break a;
            if ($lastIndex > $startStr && jl_Character_isHighSurrogate(jl_String_charAt($testStr, $lastIndex - 1 | 0))) {
                $lastIndex = $lastIndex + (-2) | 0;
                continue;
            }
            if ($this.$next2.$matches($lastIndex + 1 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = $lastIndex + (-1) | 0;
        }
        return $lastIndex;
    }
    return (-1);
},
jur_LowSurrogateCharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_HighSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_LowSurrogateCharSet))
        return 1;
    return $set.$low != $this.$low ? 0 : 1;
},
jur_LowSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_HighSurrogateCharSet() {
    jur_JointSet.call(this);
    this.$high = 0;
}
let jur_HighSurrogateCharSet__init_0 = ($this, $high) => {
    jur_AbstractSet__init_($this);
    $this.$high = $high;
},
jur_HighSurrogateCharSet__init_ = var_0 => {
    let var_1 = new jur_HighSurrogateCharSet();
    jur_HighSurrogateCharSet__init_0(var_1, var_0);
    return var_1;
},
jur_HighSurrogateCharSet_setNext = ($this, $next) => {
    $this.$next2 = $next;
},
jur_HighSurrogateCharSet_matches = ($this, $stringIndex, $testString, $matchResult) => {
    let $strLength, var$5, $low, var$7, $high;
    $strLength = $matchResult.$rightBound;
    var$5 = $stringIndex + 1 | 0;
    $low = $rt_compare(var$5, $strLength);
    if ($low > 0) {
        $matchResult.$hitEnd = 1;
        return (-1);
    }
    var$7 = $testString;
    $high = jl_String_charAt(var$7, $stringIndex);
    if ($low < 0 && jl_Character_isLowSurrogate(jl_String_charAt(var$7, var$5)))
        return (-1);
    if ($this.$high != $high)
        return (-1);
    return $this.$next2.$matches(var$5, $testString, $matchResult);
},
jur_HighSurrogateCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$6;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$rightBound;
    while (true) {
        if ($strIndex >= $strLength)
            return (-1);
        var$6 = jl_String_indexOf($testStr, $this.$high, $strIndex);
        if (var$6 < 0)
            return (-1);
        $strIndex = var$6 + 1 | 0;
        if ($strIndex < $strLength && jl_Character_isLowSurrogate(jl_String_charAt($testStr, $strIndex))) {
            $strIndex = var$6 + 2 | 0;
            continue;
        }
        if ($this.$next2.$matches($strIndex, $testString, $matchResult) >= 0)
            break;
    }
    return var$6;
},
jur_HighSurrogateCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr, $strLength, var$7;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$rightBound;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            $lastIndex = jl_String_lastIndexOf($testStr, $this.$high, $lastIndex);
            if ($lastIndex < 0)
                break a;
            if ($lastIndex < $strIndex)
                break a;
            var$7 = $lastIndex + 1 | 0;
            if (var$7 < $strLength && jl_Character_isLowSurrogate(jl_String_charAt($testStr, var$7))) {
                $lastIndex = $lastIndex + (-1) | 0;
                continue;
            }
            if ($this.$next2.$matches(var$7, $testString, $matchResult) >= 0)
                break;
            $lastIndex = $lastIndex + (-1) | 0;
        }
        return $lastIndex;
    }
    return (-1);
},
jur_HighSurrogateCharSet_first = ($this, $set) => {
    if ($set instanceof jur_CharSet)
        return 0;
    if ($set instanceof jur_RangeSet)
        return 0;
    if ($set instanceof jur_SupplRangeSet)
        return 0;
    if ($set instanceof jur_SupplCharSet)
        return 0;
    if ($set instanceof jur_LowSurrogateCharSet)
        return 0;
    if (!($set instanceof jur_HighSurrogateCharSet))
        return 1;
    return $set.$high != $this.$high ? 0 : 1;
},
jur_HighSurrogateCharSet_hasConsumed = ($this, $matchResult) => {
    return 1;
};
function jur_SupplCharSet() {
    let a = this; jur_LeafSet.call(a);
    a.$high0 = 0;
    a.$low0 = 0;
    a.$ch1 = 0;
}
let jur_SupplCharSet_accepts = ($this, $strIndex, $testString) => {
    let $low, $high;
    $low = $strIndex + 1 | 0;
    $testString = $testString;
    $high = jl_String_charAt($testString, $strIndex);
    $low = jl_String_charAt($testString, $low);
    return $this.$high0 == $high && $this.$low0 == $low ? 2 : (-1);
},
jur_SupplCharSet_find = ($this, $strIndex, $testString, $matchResult) => {
    let $testStr, $strLength, $ch;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_find($this, $strIndex, $testString, $matchResult);
    $testStr = $testString;
    $strLength = $matchResult.$rightBound;
    while ($strIndex < $strLength) {
        $strIndex = jl_String_indexOf($testStr, $this.$high0, $strIndex);
        if ($strIndex < 0)
            return (-1);
        $strIndex = $strIndex + 1 | 0;
        if ($strIndex >= $strLength)
            continue;
        $ch = jl_String_charAt($testStr, $strIndex);
        if ($this.$low0 == $ch && $this.$next2.$matches($strIndex + 1 | 0, $testString, $matchResult) >= 0)
            return $strIndex + (-1) | 0;
        $strIndex = $strIndex + 1 | 0;
    }
    return (-1);
},
jur_SupplCharSet_findBack = ($this, $strIndex, $lastIndex, $testString, $matchResult) => {
    let $testStr;
    if (!($testString instanceof jl_String))
        return jur_AbstractSet_findBack($this, $strIndex, $lastIndex, $testString, $matchResult);
    $testStr = $testString;
    a: {
        while (true) {
            if ($lastIndex < $strIndex)
                return (-1);
            $lastIndex = jl_String_lastIndexOf($testStr, $this.$low0, $lastIndex) + (-1) | 0;
            if ($lastIndex < 0)
                break a;
            if ($lastIndex < $strIndex)
                break a;
            if ($this.$high0 == jl_String_charAt($testStr, $lastIndex) && $this.$next2.$matches($lastIndex + 2 | 0, $testString, $matchResult) >= 0)
                break;
            $lastIndex = $lastIndex + (-1) | 0;
        }
        return $lastIndex;
    }
    return (-1);
},
jur_SupplCharSet_first = ($this, $set) => {
    if ($set instanceof jur_SupplCharSet)
        return $set.$ch1 != $this.$ch1 ? 0 : 1;
    if ($set instanceof jur_SupplRangeSet)
        return $set.$contains0($this.$ch1);
    if ($set instanceof jur_CharSet)
        return 0;
    if (!($set instanceof jur_RangeSet))
        return 1;
    return 0;
},
jur_AbstractLineTerminator$1 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$1_isLineTerminator = ($this, $ch) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractLineTerminator$1_isAfterLineTerminator = ($this, $ch, $ch2) => {
    return $ch != 10 ? 0 : 1;
},
jur_AbstractLineTerminator$2 = $rt_classWithoutFields(jur_AbstractLineTerminator),
jur_AbstractLineTerminator$2_isLineTerminator = ($this, $ch) => {
    return $ch != 10 && $ch != 13 && $ch != 133 && ($ch | 1) != 8233 ? 0 : 1;
},
jur_AbstractLineTerminator$2_isAfterLineTerminator = ($this, $ch, $ch2) => {
    a: {
        b: {
            if ($ch != 10 && $ch != 133 && ($ch | 1) != 8233) {
                if ($ch != 13)
                    break b;
                if ($ch2 == 10)
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
};
function jur_SequenceSet$IntHash() {
    let a = this; jl_Object.call(a);
    a.$table = null;
    a.$values = null;
    a.$mask = 0;
    a.$size5 = 0;
}
let jur_SequenceSet$IntHash__init_0 = ($this, $size) => {
    let var$2, var$3;
    while (true) {
        var$2 = $this.$mask;
        if ($size < var$2)
            break;
        $this.$mask = var$2 << 1 | 1;
    }
    var$3 = var$2 << 1 | 1;
    $this.$mask = var$3;
    var$3 = var$3 + 1 | 0;
    $this.$table = $rt_createIntArray(var$3);
    $this.$values = $rt_createIntArray(var$3);
    $this.$size5 = $size;
},
jur_SequenceSet$IntHash__init_ = var_0 => {
    let var_1 = new jur_SequenceSet$IntHash();
    jur_SequenceSet$IntHash__init_0(var_1, var_0);
    return var_1;
},
jur_SequenceSet$IntHash_put = ($this, $key, $value) => {
    let $i, var$4, $hashCode, var$6;
    $i = 0;
    var$4 = $this.$mask;
    $hashCode = $key & var$4;
    while (true) {
        var$6 = $this.$table.data;
        if (!var$6[$hashCode])
            break;
        if (var$6[$hashCode] == $key)
            break;
        $i = ($i + 1 | 0) & var$4;
        $hashCode = ($hashCode + $i | 0) & var$4;
    }
    var$6[$hashCode] = $key;
    $this.$values.data[$hashCode] = $value;
},
jur_SequenceSet$IntHash_get = ($this, $key) => {
    let var$2, $hashCode, $i, $storedKey;
    var$2 = $this.$mask;
    $hashCode = $key & var$2;
    $i = 0;
    while (true) {
        $storedKey = $this.$table.data[$hashCode];
        if (!$storedKey)
            break;
        if ($storedKey == $key)
            return $this.$values.data[$hashCode];
        $i = ($i + 1 | 0) & var$2;
        $hashCode = ($hashCode + $i | 0) & var$2;
    }
    return $this.$size5;
},
jur_AbstractCharClass$LazySpace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpace__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazySpace__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazySpace();
    jur_AbstractCharClass$LazySpace__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpace_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add(jur_CharClass__init_(), 9, 13), 32);
},
jur_AbstractCharClass$LazyDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyDigit__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyDigit();
    jur_AbstractCharClass$LazyDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyDigit_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 48, 57);
},
jur_AbstractCharClass$LazyLower = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyLower__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyLower__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyLower();
    jur_AbstractCharClass$LazyLower__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyLower_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 97, 122);
},
jur_AbstractCharClass$LazyUpper = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyUpper__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyUpper__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyUpper();
    jur_AbstractCharClass$LazyUpper__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyUpper_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 65, 90);
},
jur_AbstractCharClass$LazyASCII = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyASCII__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyASCII__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyASCII();
    jur_AbstractCharClass$LazyASCII__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyASCII_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), 0, 127);
},
jur_AbstractCharClass$LazyAlpha = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyAlpha__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyAlpha__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlpha();
    jur_AbstractCharClass$LazyAlpha__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlpha_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 97, 122), 65, 90);
},
jur_AbstractCharClass$LazyAlnum = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlpha),
jur_AbstractCharClass$LazyAlnum__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyAlnum__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyAlnum();
    jur_AbstractCharClass$LazyAlnum__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyAlnum_computeValue = $this => {
    return jur_CharClass_add(jur_AbstractCharClass$LazyAlpha_computeValue($this), 48, 57);
},
jur_AbstractCharClass$LazyPunct = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyPunct__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyPunct__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyPunct();
    jur_AbstractCharClass$LazyPunct__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPunct_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 33, 64), 91, 96), 123, 126);
},
jur_AbstractCharClass$LazyGraph = $rt_classWithoutFields(jur_AbstractCharClass$LazyAlnum),
jur_AbstractCharClass$LazyGraph__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyGraph__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyGraph();
    jur_AbstractCharClass$LazyGraph__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyGraph_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_AbstractCharClass$LazyAlnum_computeValue($this), 33, 64), 91, 96), 123, 126);
},
jur_AbstractCharClass$LazyPrint = $rt_classWithoutFields(jur_AbstractCharClass$LazyGraph),
jur_AbstractCharClass$LazyPrint__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyPrint__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyPrint();
    jur_AbstractCharClass$LazyPrint__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyPrint_computeValue = $this => {
    return jur_CharClass_add0(jur_AbstractCharClass$LazyGraph_computeValue($this), 32);
},
jur_AbstractCharClass$LazyBlank = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyBlank__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyBlank__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyBlank();
    jur_AbstractCharClass$LazyBlank__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyBlank_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add0(jur_CharClass__init_(), 32), 9);
},
jur_AbstractCharClass$LazyCntrl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyCntrl__init_0 = $this => {
    return;
};
let jur_AbstractCharClass$LazyCntrl__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyCntrl();
    jur_AbstractCharClass$LazyCntrl__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyCntrl_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add(jur_CharClass__init_(), 0, 31), 127);
},
jur_AbstractCharClass$LazyXDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyXDigit__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyXDigit__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyXDigit();
    jur_AbstractCharClass$LazyXDigit__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyXDigit_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 48, 57), 97, 102), 65, 70);
},
jur_AbstractCharClass$LazyJavaLowerCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLowerCase__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaLowerCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLowerCase();
    jur_AbstractCharClass$LazyJavaLowerCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLowerCase_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaLowerCase$1;
    $chCl.$this$037 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaUpperCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUpperCase__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaUpperCase__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUpperCase();
    jur_AbstractCharClass$LazyJavaUpperCase__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUpperCase_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaUpperCase$1;
    $chCl.$this$012 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaWhitespace = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaWhitespace__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaWhitespace__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaWhitespace();
    jur_AbstractCharClass$LazyJavaWhitespace__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaWhitespace_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaWhitespace$1;
    var$1.$this$029 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaMirrored = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaMirrored__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaMirrored__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaMirrored();
    jur_AbstractCharClass$LazyJavaMirrored__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaMirrored_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaMirrored$1;
    var$1.$this$024 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaDefined = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDefined__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaDefined__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDefined();
    jur_AbstractCharClass$LazyJavaDefined__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDefined_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaDefined$1;
    $chCl.$this$027 = $this;
    jur_AbstractCharClass__init_($chCl);
    ju_BitSet_set0($chCl.$lowHighSurrogates, 0, 2048);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaDigit__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaDigit__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaDigit();
    jur_AbstractCharClass$LazyJavaDigit__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaDigit_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaDigit$1;
    $chCl.$this$015 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable();
    jur_AbstractCharClass$LazyJavaIdentifierIgnorable__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1;
    $chCl.$this$032 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaISOControl = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaISOControl__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaISOControl__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaISOControl();
    jur_AbstractCharClass$LazyJavaISOControl__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaISOControl_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaISOControl$1;
    var$1.$this$038 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierPart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1;
    $chCl.$this$09 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart();
    jur_AbstractCharClass$LazyJavaJavaIdentifierStart__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1;
    $chCl.$this$016 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaLetter = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetter__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaLetter__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetter();
    jur_AbstractCharClass$LazyJavaLetter__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetter_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaLetter$1;
    $chCl.$this$026 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
};
let jur_AbstractCharClass$LazyJavaLetterOrDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaLetterOrDigit();
    jur_AbstractCharClass$LazyJavaLetterOrDigit__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaLetterOrDigit$1;
    $chCl.$this$030 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaSpaceChar = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaSpaceChar__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaSpaceChar__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaSpaceChar();
    jur_AbstractCharClass$LazyJavaSpaceChar__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaSpaceChar_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaSpaceChar$1;
    var$1.$this$031 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaTitleCase = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaTitleCase__init_ = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaTitleCase__init_0 = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaTitleCase();
    jur_AbstractCharClass$LazyJavaTitleCase__init_(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaTitleCase_computeValue = $this => {
    let var$1;
    var$1 = new jur_AbstractCharClass$LazyJavaTitleCase$1;
    var$1.$this$017 = $this;
    jur_AbstractCharClass__init_(var$1);
    return var$1;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1;
    $chCl.$this$011 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart();
    jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue = $this => {
    let $chCl;
    $chCl = new jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1;
    $chCl.$this$036 = $this;
    jur_AbstractCharClass__init_($chCl);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazyWord__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyWord__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyWord();
    jur_AbstractCharClass$LazyWord__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyWord_computeValue = $this => {
    return jur_CharClass_add0(jur_CharClass_add(jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 97, 122), 65, 90), 48, 57), 95);
},
jur_AbstractCharClass$LazyNonWord = $rt_classWithoutFields(jur_AbstractCharClass$LazyWord),
jur_AbstractCharClass$LazyNonWord__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyNonWord__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonWord();
    jur_AbstractCharClass$LazyNonWord__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonWord_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass_setNegative(jur_AbstractCharClass$LazyWord_computeValue($this), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyNonSpace = $rt_classWithoutFields(jur_AbstractCharClass$LazySpace),
jur_AbstractCharClass$LazyNonSpace__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyNonSpace__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonSpace();
    jur_AbstractCharClass$LazyNonSpace__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonSpace_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass_setNegative(jur_AbstractCharClass$LazySpace_computeValue($this), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
},
jur_AbstractCharClass$LazyNonDigit = $rt_classWithoutFields(jur_AbstractCharClass$LazyDigit),
jur_AbstractCharClass$LazyNonDigit__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazyNonDigit__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazyNonDigit();
    jur_AbstractCharClass$LazyNonDigit__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazyNonDigit_computeValue = $this => {
    let $chCl;
    $chCl = jur_AbstractCharClass_setNegative(jur_AbstractCharClass$LazyDigit_computeValue($this), 1);
    $chCl.$mayContainSupplCodepoints = 1;
    return $chCl;
};
function jur_AbstractCharClass$LazyRange() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$start4 = 0;
    a.$end2 = 0;
}
let jur_AbstractCharClass$LazyRange__init_0 = ($this, $start, $end) => {
    $this.$start4 = $start;
    $this.$end2 = $end;
},
jur_AbstractCharClass$LazyRange__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyRange();
    jur_AbstractCharClass$LazyRange__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyRange_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass__init_(), $this.$start4, $this.$end2);
},
jur_AbstractCharClass$LazySpecialsBlock = $rt_classWithoutFields(jur_AbstractCharClass$LazyCharClass),
jur_AbstractCharClass$LazySpecialsBlock__init_0 = $this => {
    return;
},
jur_AbstractCharClass$LazySpecialsBlock__init_ = () => {
    let var_0 = new jur_AbstractCharClass$LazySpecialsBlock();
    jur_AbstractCharClass$LazySpecialsBlock__init_0(var_0);
    return var_0;
},
jur_AbstractCharClass$LazySpecialsBlock_computeValue = $this => {
    return jur_CharClass_add(jur_CharClass_add(jur_CharClass__init_(), 65279, 65279), 65520, 65533);
};
function jur_AbstractCharClass$LazyCategory() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category1 = 0;
    a.$mayContainSupplCodepoints0 = 0;
    a.$containsAllSurrogates0 = 0;
}
let jur_AbstractCharClass$LazyCategory__init_0 = ($this, $cat, $mayContainSupplCodepoints) => {
    $this.$mayContainSupplCodepoints0 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_0(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategory__init_1 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    $this.$containsAllSurrogates0 = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints0 = $mayContainSupplCodepoints;
    $this.$category1 = $cat;
},
jur_AbstractCharClass$LazyCategory__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategory();
    jur_AbstractCharClass$LazyCategory__init_1(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategory_computeValue = $this => {
    let $chCl;
    $chCl = jur_UnicodeCategory__init_0($this.$category1);
    if ($this.$containsAllSurrogates0)
        ju_BitSet_set0($chCl.$lowHighSurrogates, 0, 2048);
    $chCl.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints0;
    return $chCl;
};
function jur_AbstractCharClass$LazyCategoryScope() {
    let a = this; jur_AbstractCharClass$LazyCharClass.call(a);
    a.$category0 = 0;
    a.$mayContainSupplCodepoints1 = 0;
    a.$containsAllSurrogates = 0;
}
let jur_AbstractCharClass$LazyCategoryScope__init_1 = ($this, $cat, $mayContainSupplCodepoints) => {
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_ = (var_0, var_1) => {
    let var_2 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_1(var_2, var_0, var_1);
    return var_2;
},
jur_AbstractCharClass$LazyCategoryScope__init_0 = ($this, $cat, $mayContainSupplCodepoints, $containsAllSurrogates) => {
    $this.$containsAllSurrogates = $containsAllSurrogates;
    $this.$mayContainSupplCodepoints1 = $mayContainSupplCodepoints;
    $this.$category0 = $cat;
},
jur_AbstractCharClass$LazyCategoryScope__init_2 = (var_0, var_1, var_2) => {
    let var_3 = new jur_AbstractCharClass$LazyCategoryScope();
    jur_AbstractCharClass$LazyCategoryScope__init_0(var_3, var_0, var_1, var_2);
    return var_3;
},
jur_AbstractCharClass$LazyCategoryScope_computeValue = $this => {
    let $chCl;
    $chCl = new jur_UnicodeCategoryScope;
    jur_UnicodeCategory__init_($chCl, $this.$category0);
    if ($this.$containsAllSurrogates)
        ju_BitSet_set0($chCl.$lowHighSurrogates, 0, 2048);
    $chCl.$mayContainSupplCodepoints = $this.$mayContainSupplCodepoints1;
    return $chCl;
},
jl_NegativeArraySizeException = $rt_classWithoutFields(jl_RuntimeException),
jur_IntHash = $rt_classWithoutFields(),
otpp_ResourceAccessor = $rt_classWithoutFields(),
otciu_UnicodeHelper = $rt_classWithoutFields(),
otciu_UnicodeHelper_decodeCaseMapping = $text => {
    let $flow, $sz, $data, var$5, $last, $i, var$8;
    $flow = otci_CharFlow__init_(jl_String_toCharArray($text));
    $sz = otci_Base46_decodeUnsigned($flow);
    $data = $rt_createIntArray($sz * 2 | 0);
    var$5 = $data.data;
    $last = 0;
    $i = 0;
    while ($i < $sz) {
        $last = $last + otci_Base46_decodeUnsigned($flow) | 0;
        var$8 = $i * 2 | 0;
        var$5[var$8] = $last;
        var$5[var$8 + 1 | 0] = otci_Base46_decode($flow);
        $i = $i + 1 | 0;
    }
    return $data;
},
otciu_UnicodeHelper_createCharMapping = $data => {
    let $result, var$3, $last, $lastValue, $i, var$7, $key, $value, var$10, var$11;
    $result = $rt_createIntArray(65536);
    var$3 = $result.data;
    $last = 0;
    $lastValue = 0;
    $i = 0;
    a: {
        while (true) {
            var$7 = $data.data;
            if ($i >= var$7.length)
                break a;
            $key = var$7[$i];
            $value = var$7[$i + 1 | 0];
            var$10 = var$3.length;
            if ($key < var$10)
                var$10 = $key;
            else if ($key == $last)
                break;
            ju_Arrays_fill0($result, $last, var$10, $lastValue);
            $i = $i + 2 | 0;
            $last = var$10;
            $lastValue = $value;
        }
    }
    var$11 = new otciu_CharMapping;
    var$11.$binarySearchTable = $data;
    var$11.$fastTable = $result;
    return var$11;
},
otciu_UnicodeHelper_decodeByte = $c => {
    if ($c > 92)
        return (($c - 32 | 0) - 2 | 0) << 24 >> 24;
    if ($c <= 34)
        return ($c - 32 | 0) << 24 >> 24;
    return (($c - 32 | 0) - 1 | 0) << 24 >> 24;
};
function otciu_CharMapping() {
    let a = this; jl_Object.call(a);
    a.$binarySearchTable = null;
    a.$fastTable = null;
}
function otciu_UnicodeHelper$Range() {
    let a = this; jl_Object.call(a);
    a.$start3 = 0;
    a.$end1 = 0;
    a.$data0 = null;
}
let otciu_UnicodeHelper$Range__init_0 = ($this, $start, $end, $data) => {
    $this.$start3 = $start;
    $this.$end1 = $end;
    $this.$data0 = $data;
},
otciu_UnicodeHelper$Range__init_ = (var_0, var_1, var_2) => {
    let var_3 = new otciu_UnicodeHelper$Range();
    otciu_UnicodeHelper$Range__init_0(var_3, var_0, var_1, var_2);
    return var_3;
};
function otci_CharFlow() {
    let a = this; jl_Object.call(a);
    a.$characters = null;
    a.$pointer = 0;
}
let otci_CharFlow__init_0 = ($this, $characters) => {
    $this.$characters = $characters;
},
otci_CharFlow__init_ = var_0 => {
    let var_1 = new otci_CharFlow();
    otci_CharFlow__init_0(var_1, var_0);
    return var_1;
},
otci_Base46 = $rt_classWithoutFields(),
otci_Base46_decodeUnsigned = $seq => {
    let $number, $pos, var$4, $hasMore, $digit;
    $number = 0;
    $pos = 1;
    while (true) {
        var$4 = $seq.$characters.data;
        $hasMore = $seq.$pointer;
        $seq.$pointer = $hasMore + 1 | 0;
        $digit = var$4[$hasMore];
        $digit = $digit < 34 ? $digit - 32 | 0 : $digit >= 92 ? ($digit - 32 | 0) - 2 | 0 : ($digit - 32 | 0) - 1 | 0;
        $hasMore = ($digit % 2 | 0) != 1 ? 0 : 1;
        $number = $number + $rt_imul($pos, $digit / 2 | 0) | 0;
        $pos = $pos * 46 | 0;
        if (!$hasMore)
            break;
    }
    return $number;
},
otci_Base46_decode = $seq => {
    let $number, $result;
    $number = otci_Base46_decodeUnsigned($seq);
    $result = $number / 2 | 0;
    if ($number % 2 | 0)
        $result =  -$result | 0;
    return $result;
},
jl_Math = $rt_classWithoutFields(),
jl_Math_min = ($a, $b) => {
    if ($a < $b)
        $b = $a;
    return $b;
},
jl_Math_max = ($a, $b) => {
    if ($a > $b)
        $b = $a;
    return $b;
},
jl_StringIndexOutOfBoundsException = $rt_classWithoutFields(jl_IndexOutOfBoundsException);
function jur_AbstractCharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS = null;
    a.$this$028 = null;
}
let jur_AbstractCharClass$1_contains = ($this, $ch) => {
    let $index;
    $index = $ch - 55296 | 0;
    return $index >= 0 && $index < 2048 ? $this.$altSurrogates ^ ju_BitSet_get($this.$val$lHS, $index) : 0;
};
function jur_AbstractCharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$lHS0 = null;
    a.$val$thisClass = null;
    a.$this$019 = null;
}
let jur_AbstractCharClass$2_contains = ($this, $ch) => {
    let $index, $containslHS;
    $index = $ch - 55296 | 0;
    $containslHS = $index >= 0 && $index < 2048 ? $this.$altSurrogates ^ ju_BitSet_get($this.$val$lHS0, $index) : 0;
    return $this.$val$thisClass.$contains0($ch) && !$containslHS ? 1 : 0;
};
function jur_CharClass$18() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$bs = null;
    a.$this$013 = null;
}
let jur_CharClass$18_contains = ($this, $ch) => {
    return $this.$alt ^ ju_BitSet_get($this.$val$bs, $ch);
},
jur_CharClass$18_toString = $this => {
    let $temp, $i, var$3;
    $temp = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($temp);
    $i = ju_BitSet_nextSetBit($this.$val$bs, 0);
    while ($i >= 0) {
        jl_AbstractStringBuilder_append0($temp, jl_Character_toChars($i));
        jl_AbstractStringBuilder_append($temp, 124);
        $i = ju_BitSet_nextSetBit($this.$val$bs, $i + 1 | 0);
    }
    var$3 = $temp.$length0;
    if (var$3 > 0)
        jl_StringBuilder_deleteCharAt($temp, var$3 - 1 | 0);
    return jl_AbstractStringBuilder_toString($temp);
};
function jur_CharClass$1() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$cc3 = null;
    a.$this$010 = null;
}
let jur_CharClass$1_contains = ($this, $ch) => {
    return $this.$val$cc3.$contains0($ch);
};
function jur_CharClass$3() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt = 0;
    a.$val$cc = null;
    a.$this$01 = null;
}
let jur_CharClass$3_contains = ($this, $ch) => {
    return !($this.$val$curAlt ^ ju_BitSet_get($this.$this$01.$bits, $ch)) && !($this.$val$curAlt ^ $this.$this$01.$inverted ^ $this.$val$cc.$contains0($ch)) ? 0 : 1;
};
function jur_CharClass$2() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt0 = 0;
    a.$val$cc1 = null;
    a.$this$00 = null;
}
let jur_CharClass$2_contains = ($this, $ch) => {
    return !($this.$val$curAlt0 ^ ju_BitSet_get($this.$this$00.$bits, $ch)) && !($this.$val$curAlt0 ^ $this.$this$00.$inverted ^ $this.$val$cc1.$contains0($ch)) ? 1 : 0;
};
function jur_CharClass$5() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt7 = 0;
    a.$val$nb3 = null;
    a.$val$cc0 = null;
    a.$this$020 = null;
}
let jur_CharClass$5_contains = ($this, $ch) => {
    return $this.$val$curAlt7 ^ (!$this.$val$nb3.$contains0($ch) && !$this.$val$cc0.$contains0($ch) ? 0 : 1);
};
function jur_CharClass$4() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt9 = 0;
    a.$val$nb4 = null;
    a.$val$cc2 = null;
    a.$this$034 = null;
}
let jur_CharClass$4_contains = ($this, $ch) => {
    return $this.$val$curAlt9 ^ (!$this.$val$nb4.$contains0($ch) && !$this.$val$cc2.$contains0($ch) ? 0 : 1) ? 0 : 1;
};
function jur_CharClass$7() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz7 = null;
    a.$this$035 = null;
}
let jur_CharClass$7_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz7, $ch);
};
function jur_CharClass$6() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz6 = null;
    a.$this$022 = null;
}
let jur_CharClass$6_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz6, $ch) ? 0 : 1;
};
function jur_CharClass$9() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz = null;
    a.$val$curAlt8 = 0;
    a.$this$07 = null;
}
let jur_CharClass$9_contains = ($this, $ch) => {
    return !jur_CharClass_contains($this.$val$clazz, $ch) && !($this.$val$curAlt8 ^ ju_BitSet_get($this.$this$07.$bits, $ch)) ? 0 : 1;
};
function jur_CharClass$8() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz1 = null;
    a.$val$curAlt2 = 0;
    a.$this$02 = null;
}
let jur_CharClass$8_contains = ($this, $ch) => {
    return !jur_CharClass_contains($this.$val$clazz1, $ch) && !($this.$val$curAlt2 ^ ju_BitSet_get($this.$this$02.$bits, $ch)) ? 1 : 0;
};
function jur_CharClass$11() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt4 = 0;
    a.$val$nb2 = null;
    a.$val$clazz8 = null;
    a.$this$014 = null;
}
let jur_CharClass$11_contains = ($this, $ch) => {
    return !($this.$val$curAlt4 ^ $this.$val$nb2.$contains0($ch)) && !jur_CharClass_contains($this.$val$clazz8, $ch) ? 0 : 1;
};
function jur_CharClass$10() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt6 = 0;
    a.$val$nb0 = null;
    a.$val$clazz0 = null;
    a.$this$021 = null;
}
let jur_CharClass$10_contains = ($this, $ch) => {
    return !($this.$val$curAlt6 ^ $this.$val$nb0.$contains0($ch)) && !jur_CharClass_contains($this.$val$clazz0, $ch) ? 1 : 0;
};
function jur_CharClass$13() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz4 = null;
    a.$this$023 = null;
}
let jur_CharClass$13_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz4, $ch);
};
function jur_CharClass$12() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz5 = null;
    a.$this$033 = null;
}
let jur_CharClass$12_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz5, $ch) ? 0 : 1;
};
function jur_CharClass$15() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz9 = null;
    a.$val$curAlt1 = 0;
    a.$this$08 = null;
}
let jur_CharClass$15_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz9, $ch) && $this.$val$curAlt1 ^ ju_BitSet_get($this.$this$08.$bits, $ch) ? 1 : 0;
};
function jur_CharClass$14() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$clazz2 = null;
    a.$val$curAlt10 = 0;
    a.$this$03 = null;
}
let jur_CharClass$14_contains = ($this, $ch) => {
    return jur_CharClass_contains($this.$val$clazz2, $ch) && $this.$val$curAlt10 ^ ju_BitSet_get($this.$this$03.$bits, $ch) ? 0 : 1;
};
function jur_CharClass$17() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt5 = 0;
    a.$val$nb1 = null;
    a.$val$clazz10 = null;
    a.$this$018 = null;
}
let jur_CharClass$17_contains = ($this, $ch) => {
    return $this.$val$curAlt5 ^ $this.$val$nb1.$contains0($ch) && jur_CharClass_contains($this.$val$clazz10, $ch) ? 1 : 0;
};
function jur_CharClass$16() {
    let a = this; jur_AbstractCharClass.call(a);
    a.$val$curAlt3 = 0;
    a.$val$nb = null;
    a.$val$clazz3 = null;
    a.$this$025 = null;
}
let jur_CharClass$16_contains = ($this, $ch) => {
    return $this.$val$curAlt3 ^ $this.$val$nb.$contains0($ch) && jur_CharClass_contains($this.$val$clazz3, $ch) ? 0 : 1;
},
jl_IllegalStateException = $rt_classWithoutFields(jl_RuntimeException),
dba_RegExp$1 = $rt_classWithoutFields(),
dba_RegExp$1_$SwitchMap$dk$brics$automaton$RegExp$Kind = null,
dba_RegExp$1_$callClinit = () => {
    dba_RegExp$1_$callClinit = $rt_eraseClinit(dba_RegExp$1);
    dba_RegExp$1__clinit_();
},
dba_RegExp$1__clinit_ = () => {
    let var$1, var$2;
    var$1 = $rt_createIntArray((dba_RegExp$Kind_$VALUES.$clone1()).data.length);
    var$2 = var$1.data;
    dba_RegExp$1_$SwitchMap$dk$brics$automaton$RegExp$Kind = var$1;
    var$2[dba_RegExp$Kind_REGEXP_UNION.$ordinal] = 1;
    var$2[dba_RegExp$Kind_REGEXP_CONCATENATION.$ordinal] = 2;
    var$2[dba_RegExp$Kind_REGEXP_INTERSECTION.$ordinal] = 3;
    var$2[dba_RegExp$Kind_REGEXP_OPTIONAL.$ordinal] = 4;
    var$2[dba_RegExp$Kind_REGEXP_REPEAT.$ordinal] = 5;
    var$2[dba_RegExp$Kind_REGEXP_REPEAT_MIN.$ordinal] = 6;
    var$2[dba_RegExp$Kind_REGEXP_REPEAT_MINMAX.$ordinal] = 7;
    var$2[dba_RegExp$Kind_REGEXP_COMPLEMENT.$ordinal] = 8;
    var$2[dba_RegExp$Kind_REGEXP_CHAR.$ordinal] = 9;
    var$2[dba_RegExp$Kind_REGEXP_CHAR_RANGE.$ordinal] = 10;
    var$2[dba_RegExp$Kind_REGEXP_ANYCHAR.$ordinal] = 11;
    var$2[dba_RegExp$Kind_REGEXP_EMPTY.$ordinal] = 12;
    var$2[dba_RegExp$Kind_REGEXP_STRING.$ordinal] = 13;
    var$2[dba_RegExp$Kind_REGEXP_ANYSTRING.$ordinal] = 14;
    var$2[dba_RegExp$Kind_REGEXP_AUTOMATON.$ordinal] = 15;
    var$2[dba_RegExp$Kind_REGEXP_INTERVAL.$ordinal] = 16;
},
dba_BasicOperations = $rt_classWithoutFields(),
dba_BasicOperations_concatenate = $l => {
    let $all_singleton, $ns, $b, $ids, $ac, $has_aliases, $first, var$9, $a, $s;
    if (ju_AbstractCollection_isEmpty($l))
        return dba_BasicAutomata_makeEmptyString();
    $all_singleton = 1;
    $ns = $l;
    $b = ju_AbstractList_iterator($ns);
    a: {
        while (ju_AbstractList$1_hasNext($b)) {
            if (!dba_Automaton_isSingleton(ju_AbstractList$1_next($b))) {
                $all_singleton = 0;
                break a;
            }
        }
    }
    if ($all_singleton) {
        $b = new jl_StringBuilder;
        jl_AbstractStringBuilder__init_($b);
        $ids = ju_AbstractList_iterator($ns);
        while (ju_AbstractList$1_hasNext($ids)) {
            jl_StringBuilder_append0($b, (ju_AbstractList$1_next($ids)).$singleton);
        }
        return dba_BasicAutomata_makeString(jl_AbstractStringBuilder_toString($b));
    }
    $b = ju_AbstractList_iterator($ns);
    while (true) {
        if (!ju_AbstractList$1_hasNext($b)) {
            $ids = ju_HashSet__init_();
            $ac = ju_AbstractList_iterator($ns);
            $b = $ids;
            while (ju_AbstractList$1_hasNext($ac)) {
                ju_HashSet_add($b, jl_Integer_valueOf(jl_System_identityHashCode(ju_AbstractList$1_next($ac))));
            }
            $all_singleton = ju_HashSet_size($b);
            $l = $l;
            $has_aliases = $all_singleton == $l.$size0 ? 0 : 1;
            $b = ju_ArrayList_get($l, 0);
            $l = !$has_aliases ? dba_Automaton_cloneExpandedIfRequired($b) : dba_Automaton_cloneExpanded($b);
            $ac = dba_Automaton_getAcceptStates($l);
            $first = 1;
            var$9 = ju_AbstractList_iterator($ns);
            while (ju_AbstractList$1_hasNext(var$9)) {
                $a = ju_AbstractList$1_next(var$9);
                if ($first)
                    $first = 0;
                else {
                    if (dba_Automaton_isSingleton($a))
                        $all_singleton = $a.$singleton.$nativeString.length ? 0 : 1;
                    else {
                        $ids = $a.$initial;
                        $all_singleton = $ids.$accept && ju_HashSet_isEmpty($ids.$transitions) ? 1 : 0;
                    }
                    if ($all_singleton)
                        continue;
                    $ids = !$has_aliases ? dba_Automaton_cloneExpandedIfRequired($a) : dba_Automaton_cloneExpanded($a);
                    $ns = dba_Automaton_getAcceptStates($ids);
                    $a = ju_HashSet_iterator($ac);
                    $ac = $ns;
                    while ($a.$hasNext()) {
                        $s = $a.$next0();
                        $s.$accept = 0;
                        dba_State_addEpsilon($s, $ids.$initial);
                        if ($s.$accept)
                            ju_HashSet_add($ac, $s);
                    }
                    $ac = $ns;
                }
            }
            $l.$deterministic = 0;
            dba_Automaton_clearHashCode($l);
            dba_Automaton_checkMinimizeAlways($l);
            return $l;
        }
        if (dba_Automaton_isEmpty(ju_AbstractList$1_next($b)))
            break;
    }
    return dba_BasicAutomata_makeEmpty();
},
dba_BasicOperations_repeat = $a => {
    let $s, var$3;
    $a = dba_Automaton_cloneExpanded($a);
    $s = dba_State__init_();
    $s.$accept = 1;
    dba_State_addEpsilon($s, $a.$initial);
    var$3 = ju_HashSet_iterator(dba_Automaton_getAcceptStates($a));
    while (var$3.$hasNext()) {
        dba_State_addEpsilon(var$3.$next0(), $s);
    }
    $a.$initial = $s;
    $a.$deterministic = 0;
    dba_Automaton_clearHashCode($a);
    dba_Automaton_checkMinimizeAlways($a);
    return $a;
},
dba_BasicOperations_intersection = ($a1, $a2) => {
    let $transitions1, $transitions2, $c, $worklist, $newstates, $p, $q, $r, var$11, var$12, var$13, var$14, $t2, $t1, $n1, $b2, var$19, $n2, $min, $max;
    if (dba_Automaton_isSingleton($a1)) {
        if (!dba_Automaton_run($a2, $a1.$singleton))
            return dba_BasicAutomata_makeEmpty();
        return dba_Automaton_cloneIfRequired($a1);
    }
    if (dba_Automaton_isSingleton($a2)) {
        if (!dba_Automaton_run($a1, $a2.$singleton))
            return dba_BasicAutomata_makeEmpty();
        return dba_Automaton_cloneIfRequired($a2);
    }
    if ($a1 === $a2)
        return dba_Automaton_cloneIfRequired($a1);
    $transitions1 = dba_Automaton_getSortedTransitions(dba_Automaton_getStates($a1));
    $transitions2 = dba_Automaton_getSortedTransitions(dba_Automaton_getStates($a2));
    $c = dba_Automaton__init_();
    $worklist = new ju_LinkedList;
    $newstates = ju_HashMap__init_();
    $p = new dba_StatePair;
    $q = $c.$initial;
    $r = $a1.$initial;
    var$11 = $a2.$initial;
    $p.$s0 = $q;
    $p.$s1 = $r;
    $p.$s2 = var$11;
    var$12 = $worklist;
    ju_AbstractList_add(var$12, $p);
    ju_HashMap_put($newstates, $p, $p);
    while ($worklist.$size1 > 0) {
        $p = ju_LinkedList_removeFirst($worklist);
        $q = $p.$s0;
        $r = $p.$s1;
        var$13 = $r.$accept && $p.$s2.$accept ? 1 : 0;
        var$14 = $transitions1.data;
        $t2 = $transitions2.data;
        $q.$accept = var$13;
        $t1 = var$14[$r.$number];
        $t2 = $t2[$p.$s2.$number];
        $n1 = 0;
        $b2 = 0;
        while (true) {
            var$19 = $t1.data;
            if ($n1 >= var$19.length)
                break;
            while (true) {
                var$14 = $t2.data;
                var$13 = var$14.length;
                if ($b2 >= var$13)
                    break;
                if (var$14[$b2].$max0 >= var$19[$n1].$min0)
                    break;
                $b2 = $b2 + 1 | 0;
            }
            $n2 = $b2;
            while ($n2 < var$13 && var$19[$n1].$max0 >= var$14[$n2].$min0) {
                if (var$14[$n2].$max0 >= var$19[$n1].$min0) {
                    $q = dba_StatePair__init_(var$19[$n1].$to, var$14[$n2].$to);
                    $r = ju_HashMap_get($newstates, $q);
                    if ($r !== null)
                        $q = $r;
                    else {
                        $q.$s0 = dba_State__init_();
                        ju_AbstractList_add(var$12, $q);
                        ju_HashMap_put($newstates, $q, $q);
                    }
                    $min = var$19[$n1].$min0 <= var$14[$n2].$min0 ? var$14[$n2].$min0 : var$19[$n1].$min0;
                    $max = var$19[$n1].$max0 >= var$14[$n2].$max0 ? var$14[$n2].$max0 : var$19[$n1].$max0;
                    $r = $p.$s0.$transitions;
                    var$11 = dba_Transition__init_($min, $max, $q.$s0);
                    ju_HashSet_add($r, var$11);
                }
                $n2 = $n2 + 1 | 0;
            }
            $n1 = $n1 + 1 | 0;
        }
    }
    $c.$deterministic = $a1.$deterministic && $a2.$deterministic ? 1 : 0;
    dba_Automaton_removeDeadTransitions($c);
    dba_Automaton_checkMinimizeAlways($c);
    return $c;
},
dba_BasicOperations_subsetOf = ($a1, $a2) => {
    let $transitions1, $transitions2, $worklist, $visited, $p, var$8, $t1, $t2, $n1, $b2, var$13, var$14, var$15, $min1, $max1, $n2, $q;
    if ($a1 === $a2)
        return 1;
    if (dba_Automaton_isSingleton($a1)) {
        if (!dba_Automaton_isSingleton($a2))
            return dba_Automaton_run($a2, $a1.$singleton);
        return jl_String_equals($a1.$singleton, $a2.$singleton);
    }
    dba_Automaton_determinize($a2);
    $transitions1 = dba_Automaton_getSortedTransitions(dba_Automaton_getStates($a1));
    $transitions2 = dba_Automaton_getSortedTransitions(dba_Automaton_getStates($a2));
    $worklist = new ju_LinkedList;
    $visited = ju_HashSet__init_();
    $p = dba_StatePair__init_($a1.$initial, $a2.$initial);
    var$8 = $worklist;
    ju_AbstractList_add(var$8, $p);
    ju_HashSet_add($visited, $p);
    while ($worklist.$size1 > 0) {
        $a1 = ju_LinkedList_removeFirst($worklist);
        $a2 = $a1.$s1;
        if ($a2.$accept && !$a1.$s2.$accept)
            return 0;
        $t1 = $transitions1.data;
        $t2 = $transitions2.data;
        $t1 = $t1[$a2.$number];
        $t2 = $t2[$a1.$s2.$number];
        $n1 = 0;
        $b2 = 0;
        while (true) {
            var$13 = $t1.data;
            if ($n1 >= var$13.length)
                break;
            while (true) {
                var$14 = $t2.data;
                var$15 = var$14.length;
                if ($b2 >= var$15)
                    break;
                if (var$14[$b2].$max0 >= var$13[$n1].$min0)
                    break;
                $b2 = $b2 + 1 | 0;
            }
            $min1 = var$13[$n1].$min0;
            $max1 = var$13[$n1].$max0;
            $n2 = $b2;
            while ($n2 < var$15 && var$13[$n1].$max0 >= var$14[$n2].$min0) {
                if (var$14[$n2].$min0 > $min1)
                    return 0;
                if (var$14[$n2].$max0 >= 65535) {
                    $min1 = 65535;
                    $max1 = 0;
                } else
                    $min1 = var$14[$n2].$max0 + 1 | 0;
                $q = dba_StatePair__init_(var$13[$n1].$to, var$14[$n2].$to);
                if (!ju_HashSet_contains($visited, $q)) {
                    ju_AbstractList_add(var$8, $q);
                    ju_HashSet_add($visited, $q);
                }
                $n2 = $n2 + 1 | 0;
            }
            if ($min1 <= $max1)
                return 0;
            $n1 = $n1 + 1 | 0;
        }
    }
    return 1;
},
dba_BasicOperations_determinize = ($a, $initialset) => {
    let $points, $worklist, $newstate, var$6, $r, $s, $n, var$10, var$11, $p, var$13, $q, $t, $min, var$17, $max, $q_0;
    $points = dba_Automaton_getStartPoints($a);
    $worklist = new ju_LinkedList;
    $newstate = ju_HashMap__init_();
    var$6 = $worklist;
    ju_AbstractList_add(var$6, $initialset);
    $r = dba_State__init_();
    $a.$initial = $r;
    $newstate = $newstate;
    ju_HashMap_put($newstate, $initialset, $r);
    while ($worklist.$size1 > 0) {
        $s = ju_LinkedList_removeFirst($worklist);
        $r = ju_HashMap_get($newstate, $s);
        $s = $s;
        $initialset = ju_HashSet_iterator($s);
        a: {
            while (true) {
                if (!$initialset.$hasNext())
                    break a;
                if (($initialset.$next0()).$accept)
                    break;
            }
            $r.$accept = 1;
        }
        $n = 0;
        while (true) {
            var$10 = $points.data;
            var$11 = var$10.length;
            if ($n >= var$11)
                break;
            $p = ju_HashSet__init_();
            var$13 = ju_HashSet_iterator($s);
            $q = $p;
            while (var$13.$hasNext()) {
                $initialset = ju_HashSet_iterator((var$13.$next0()).$transitions);
                while ($initialset.$hasNext()) {
                    $t = $initialset.$next0();
                    if ($t.$min0 <= var$10[$n] && var$10[$n] <= $t.$max0)
                        ju_HashSet_add($q, $t.$to);
                }
            }
            if (!ju_HashSet_isEmpty($q)) {
                $q = ju_HashMap_get($newstate, $p);
                if ($q === null) {
                    ju_AbstractList_add(var$6, $p);
                    $q = dba_State__init_();
                    ju_HashMap_put($newstate, $p, $q);
                }
                $min = var$10[$n];
                var$17 = $n + 1 | 0;
                $max = var$17 >= var$11 ? 65535 : (var$10[var$17] - 1 | 0) & 65535;
                $initialset = $r.$transitions;
                $q_0 = dba_Transition__init_($min, $max, $q);
                ju_HashSet_add($initialset, $q_0);
            }
            $n = $n + 1 | 0;
        }
    }
    $a.$deterministic = 1;
    dba_Automaton_removeDeadTransitions($a);
},
dba_BasicOperations_addEpsilons = ($a, $pairs) => {
    let $forward, $back, $p, var$6, $p_0, $to, $from, $worklist, $workset, var$12, $p_1, $to_0, $from_0, $s, $pp, var$18, $qq;
    dba_Automaton_expandSingleton($a);
    $forward = ju_HashMap__init_();
    $back = ju_HashMap__init_();
    $p = $pairs;
    var$6 = ju_AbstractList_iterator($p);
    while (ju_AbstractList$1_hasNext(var$6)) {
        $p_0 = ju_AbstractList$1_next(var$6);
        $to = ju_HashMap_get($forward, $p_0.$s1);
        if ($to === null) {
            $to = ju_HashSet__init_();
            ju_HashMap_put($forward, $p_0.$s1, $to);
        }
        ju_HashSet_add($to, $p_0.$s2);
        $from = ju_HashMap_get($back, $p_0.$s2);
        if ($from === null) {
            $from = ju_HashSet__init_();
            ju_HashMap_put($back, $p_0.$s2, $from);
        }
        ju_HashSet_add($from, $p_0.$s1);
    }
    $worklist = ju_LinkedList__init_0($pairs);
    $workset = ju_HashSet__init_1($pairs);
    var$12 = $worklist;
    $to = $pairs;
    var$6 = $pairs;
    $p_0 = $worklist;
    while (!ju_AbstractCollection_isEmpty(var$12)) {
        $p_1 = ju_LinkedList_removeFirst($worklist);
        $workset.$backingMap.$remove($p_1);
        a: {
            $to_0 = ju_HashMap_get($forward, $p_1.$s2);
            $from_0 = ju_HashMap_get($back, $p_1.$s1);
            if ($to_0 !== null) {
                $to_0 = ju_HashSet_iterator($to_0);
                while (true) {
                    if (!$to_0.$hasNext())
                        break a;
                    $s = $to_0.$next0();
                    $pp = dba_StatePair__init_($p_1.$s1, $s);
                    $from = ju_AbstractList_iterator($to);
                    b: {
                        while (ju_AbstractList$1_hasNext($from)) {
                            if (ju_Objects_equals(ju_AbstractList$1_next($from), $pp)) {
                                var$18 = 1;
                                break b;
                            }
                        }
                        var$18 = 0;
                    }
                    c: {
                        if (!var$18) {
                            ju_ArrayList_add(var$6, $pp);
                            ju_HashSet_add(ju_HashMap_get($forward, $p_1.$s1), $s);
                            ju_HashSet_add(ju_HashMap_get($back, $s), $p_1.$s1);
                            ju_AbstractList_add($p_0, $pp);
                            ju_HashSet_add($workset, $pp);
                            if ($from_0 !== null) {
                                $from = ju_HashSet_iterator($from_0);
                                while (true) {
                                    if (!$from.$hasNext())
                                        break c;
                                    $qq = dba_StatePair__init_($from.$next0(), $p_1.$s1);
                                    if (!ju_HashSet_contains($workset, $qq)) {
                                        ju_AbstractList_add($p_0, $qq);
                                        ju_HashSet_add($workset, $qq);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    $forward = ju_AbstractList_iterator($p);
    while (ju_AbstractList$1_hasNext($forward)) {
        $p = ju_AbstractList$1_next($forward);
        dba_State_addEpsilon($p.$s1, $p.$s2);
    }
    $a.$deterministic = 0;
    dba_Automaton_clearHashCode($a);
    dba_Automaton_checkMinimizeAlways($a);
},
dba_BasicAutomata = $rt_classWithoutFields(),
dba_BasicAutomata_makeEmpty = () => {
    let $a;
    $a = dba_Automaton__init_();
    $a.$initial = dba_State__init_();
    $a.$deterministic = 1;
    return $a;
},
dba_BasicAutomata_makeEmptyString = () => {
    let $a;
    $a = dba_Automaton__init_();
    $a.$singleton = $rt_s(2);
    $a.$deterministic = 1;
    return $a;
},
dba_BasicAutomata_makeChar = $c => {
    let $a;
    $a = dba_Automaton__init_();
    $a.$singleton = jl_Character_toString($c);
    $a.$deterministic = 1;
    return $a;
},
dba_BasicAutomata_makeCharRange = ($min, $max) => {
    let var$3, $a, $s1, $s2, var$7;
    var$3 = $rt_compare($min, $max);
    if (!var$3)
        return dba_BasicAutomata_makeChar($min);
    $a = dba_Automaton__init_();
    $s1 = dba_State__init_();
    $s2 = dba_State__init_();
    $a.$initial = $s1;
    $s2.$accept = 1;
    if (var$3 <= 0) {
        $s1 = $s1.$transitions;
        var$7 = dba_Transition__init_($min, $max, $s2);
        ju_HashSet_add($s1, var$7);
    }
    $a.$deterministic = 1;
    return $a;
},
dba_BasicAutomata_anyOfRightLength = ($x, $n) => {
    let $s;
    $s = dba_State__init_();
    if ($x.$nativeString.length == $n)
        $s.$accept = 1;
    else
        dba_State_addTransition($s, dba_Transition__init_(48, 57, dba_BasicAutomata_anyOfRightLength($x, $n + 1 | 0)));
    return $s;
},
dba_BasicAutomata_atLeast = ($x, $n, $initials, $zeros) => {
    let $s, $c, var$7;
    $s = dba_State__init_();
    if ($x.$nativeString.length == $n)
        $s.$accept = 1;
    else {
        if ($zeros)
            ju_ArrayList_add($initials, $s);
        $c = jl_String_charAt($x, $n);
        var$7 = new dba_Transition;
        $n = $n + 1 | 0;
        dba_Transition__init_1(var$7, $c, dba_BasicAutomata_atLeast($x, $n, $initials, $zeros && $c == 48 ? 1 : 0));
        dba_State_addTransition($s, var$7);
        if ($c < 57)
            dba_State_addTransition($s, dba_Transition__init_(($c + 1 | 0) & 65535, 57, dba_BasicAutomata_anyOfRightLength($x, $n)));
    }
    return $s;
},
dba_BasicAutomata_atMost = ($x, $n) => {
    let $s, $c;
    $s = dba_State__init_();
    if ($x.$nativeString.length == $n)
        $s.$accept = 1;
    else {
        $c = jl_String_charAt($x, $n);
        dba_State_addTransition($s, dba_Transition__init_0($c, dba_BasicAutomata_atMost($x, ($n & 65535) + 1 | 0)));
        if ($c > 48)
            dba_State_addTransition($s, dba_Transition__init_(48, ($c - 1 | 0) & 65535, dba_BasicAutomata_anyOfRightLength($x, $n + 1 | 0)));
    }
    return $s;
},
dba_BasicAutomata_between = ($x, $y, $n, $initials, $zeros) => {
    let $s, $cx, $cy, var$9;
    $s = dba_State__init_();
    if ($x.$nativeString.length == $n)
        $s.$accept = 1;
    else {
        if ($zeros)
            ju_ArrayList_add($initials, $s);
        $cx = jl_String_charAt($x, $n);
        $cy = jl_String_charAt($y, $n);
        if ($cx == $cy)
            dba_State_addTransition($s, dba_Transition__init_0($cx, dba_BasicAutomata_between($x, $y, $n + 1 | 0, $initials, $zeros && $cx == 48 ? 1 : 0)));
        else {
            var$9 = new dba_Transition;
            $n = $n + 1 | 0;
            dba_Transition__init_1(var$9, $cx, dba_BasicAutomata_atLeast($x, $n, $initials, $zeros && $cx == 48 ? 1 : 0));
            dba_State_addTransition($s, var$9);
            dba_State_addTransition($s, dba_Transition__init_0($cy, dba_BasicAutomata_atMost($y, $n)));
            $zeros = $cx + 1 | 0;
            if ($zeros < $cy)
                dba_State_addTransition($s, dba_Transition__init_($zeros & 65535, ($cy - 1 | 0) & 65535, dba_BasicAutomata_anyOfRightLength($x, $n)));
        }
    }
    return $s;
},
dba_BasicAutomata_makeInterval = ($min, $max, $digits) => {
    let $a, $x, $y, $d, $bx, $i, $by, $initials, $pairs, $p;
    a: {
        $a = dba_Automaton__init_();
        $x = jl_Integer_toString($min);
        $y = jl_Integer_toString($max);
        if ($min <= $max) {
            if ($digits <= 0)
                break a;
            if ($y.$nativeString.length <= $digits)
                break a;
        }
        $a = new jl_IllegalArgumentException;
        jl_Exception__init_($a);
        $rt_throw($a);
    }
    $d = $digits <= 0 ? $y.$nativeString.length : $digits;
    $bx = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($bx);
    $i = $x.$nativeString.length;
    while ($i < $d) {
        jl_AbstractStringBuilder_append($bx, 48);
        $i = $i + 1 | 0;
    }
    jl_StringBuilder_append0($bx, $x);
    $x = jl_AbstractStringBuilder_toString($bx);
    $by = new jl_StringBuilder;
    jl_AbstractStringBuilder__init_($by);
    $i = $y.$nativeString.length;
    while ($i < $d) {
        jl_AbstractStringBuilder_append($by, 48);
        $i = $i + 1 | 0;
    }
    jl_StringBuilder_append0($by, $y);
    $y = jl_AbstractStringBuilder_toString($by);
    $initials = ju_ArrayList__init_();
    $a.$initial = dba_BasicAutomata_between($x, $y, 0, $initials, $digits > 0 ? 0 : 1);
    if ($digits > 0)
        $a.$deterministic = 1;
    else {
        $pairs = ju_ArrayList__init_();
        $bx = ju_AbstractList_iterator($initials);
        while (ju_AbstractList$1_hasNext($bx)) {
            $p = ju_AbstractList$1_next($bx);
            $x = $a.$initial;
            if ($x !== $p)
                ju_ArrayList_add($pairs, dba_StatePair__init_($x, $p));
        }
        dba_BasicOperations_addEpsilons($a, $pairs);
        $x = $a.$initial;
        dba_State_addTransition($x, dba_Transition__init_0(48, $x));
        $a.$deterministic = 0;
    }
    dba_Automaton_checkMinimizeAlways($a);
    return $a;
},
dba_BasicAutomata_makeString = $s => {
    let $a;
    $a = dba_Automaton__init_();
    $a.$singleton = $s;
    $a.$deterministic = 1;
    return $a;
},
ji_IOException = $rt_classWithoutFields(jl_Exception),
ju_Set = $rt_classWithoutFields(0),
ju_AbstractSet = $rt_classWithoutFields(ju_AbstractCollection),
ju_AbstractSet_equals = ($this, $obj) => {
    let $other, var$3, $iter;
    if ($this === $obj)
        return 1;
    if (!$rt_isInstance($obj, ju_Set))
        return 0;
    $other = $obj;
    $obj = $this;
    var$3 = ju_HashSet_size($obj);
    $other = $other;
    if (var$3 != ju_HashSet_size($other))
        return 0;
    $iter = ju_HashSet_iterator($other);
    while ($iter.$hasNext()) {
        if (ju_HashSet_contains($obj, $iter.$next0()))
            continue;
        else
            return 0;
    }
    return 1;
},
ju_AbstractSet_hashCode = $this => {
    let $result, $iter, $e;
    $result = 0;
    $iter = ju_HashSet_iterator($this);
    while ($iter.$hasNext()) {
        $e = $iter.$next0();
        if ($e !== null)
            $result = $result + $e.$hashCode() | 0;
    }
    return $result;
};
function ju_HashSet() {
    ju_AbstractSet.call(this);
    this.$backingMap = null;
}
let ju_HashSet__init_2 = $this => {
    ju_HashSet__init_0($this, ju_HashMap__init_());
},
ju_HashSet__init_ = () => {
    let var_0 = new ju_HashSet();
    ju_HashSet__init_2(var_0);
    return var_0;
},
ju_HashSet__init_3 = ($this, $collection) => {
    let $iter;
    ju_HashSet__init_0($this, ju_HashMap__init_2($collection.$size() < 6 ? 11 : $collection.$size() * 2 | 0));
    $iter = $collection.$iterator();
    while ($iter.$hasNext()) {
        ju_HashSet_add($this, $iter.$next0());
    }
},
ju_HashSet__init_1 = var_0 => {
    let var_1 = new ju_HashSet();
    ju_HashSet__init_3(var_1, var_0);
    return var_1;
},
ju_HashSet__init_0 = ($this, $backingMap) => {
    $this.$backingMap = $backingMap;
},
ju_HashSet__init_4 = var_0 => {
    let var_1 = new ju_HashSet();
    ju_HashSet__init_0(var_1, var_0);
    return var_1;
},
ju_HashSet_add = ($this, $object) => {
    return $this.$backingMap.$put0($object, $this) !== null ? 0 : 1;
},
ju_HashSet_contains = ($this, $object) => {
    return ju_HashMap_containsKey($this.$backingMap, $object);
},
ju_HashSet_isEmpty = $this => {
    return ju_HashMap_isEmpty($this.$backingMap);
},
ju_HashSet_iterator = $this => {
    return ($this.$backingMap.$keySet()).$iterator();
},
ju_HashSet_size = $this => {
    return $this.$backingMap.$elementCount;
};
function dba_Transition() {
    let a = this; jl_Object.call(a);
    a.$min0 = 0;
    a.$max0 = 0;
    a.$to = null;
}
let dba_Transition__init_1 = ($this, $c, $to) => {
    $this.$max0 = $c;
    $this.$min0 = $c;
    $this.$to = $to;
},
dba_Transition__init_0 = (var_0, var_1) => {
    let var_2 = new dba_Transition();
    dba_Transition__init_1(var_2, var_0, var_1);
    return var_2;
},
dba_Transition__init_2 = ($this, $min, $max, $to) => {
    let var$4;
    if ($max >= $min) {
        var$4 = $min;
        $min = $max;
        $max = var$4;
    }
    $this.$min0 = $max;
    $this.$max0 = $min;
    $this.$to = $to;
},
dba_Transition__init_ = (var_0, var_1, var_2) => {
    let var_3 = new dba_Transition();
    dba_Transition__init_2(var_3, var_0, var_1, var_2);
    return var_3;
},
dba_Transition_equals = ($this, $obj) => {
    let $t;
    if (!($obj instanceof dba_Transition))
        return 0;
    $t = $obj;
    return $t.$min0 == $this.$min0 && $t.$max0 == $this.$max0 && $t.$to === $this.$to ? 1 : 0;
},
dba_Transition_hashCode = $this => {
    return ($this.$min0 * 2 | 0) + ($this.$max0 * 3 | 0) | 0;
};
function dba_StatePair() {
    let a = this; jl_Object.call(a);
    a.$s0 = null;
    a.$s1 = null;
    a.$s2 = null;
}
let dba_StatePair__init_0 = ($this, $s1, $s2) => {
    $this.$s1 = $s1;
    $this.$s2 = $s2;
},
dba_StatePair__init_ = (var_0, var_1) => {
    let var_2 = new dba_StatePair();
    dba_StatePair__init_0(var_2, var_0, var_1);
    return var_2;
},
dba_StatePair_equals = ($this, $obj) => {
    let $p;
    if (!($obj instanceof dba_StatePair))
        return 0;
    $p = $obj;
    return $p.$s1 === $this.$s1 && $p.$s2 === $this.$s2 ? 1 : 0;
},
dba_StatePair_hashCode = $this => {
    return jl_Object_identity($this.$s1) + jl_Object_identity($this.$s2) | 0;
},
ju_Map = $rt_classWithoutFields(0);
function ju_AbstractMap() {
    jl_Object.call(this);
    this.$cachedKeySet = null;
}
let ju_AbstractMap_keySet = $this => {
    let var$1;
    if ($this.$cachedKeySet === null) {
        var$1 = new ju_AbstractMap$KeySet;
        var$1.$this$04 = $this;
        $this.$cachedKeySet = var$1;
    }
    return $this.$cachedKeySet;
};
function ju_HashMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$modCount0 = 0;
    a.$loadFactor0 = 0.0;
    a.$threshold = 0;
}
let ju_HashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
},
ju_HashMap__init_1 = $this => {
    ju_HashMap__init_0($this, 16);
},
ju_HashMap__init_ = () => {
    let var_0 = new ju_HashMap();
    ju_HashMap__init_1(var_0);
    return var_0;
},
ju_HashMap__init_0 = ($this, $capacity) => {
    let var$2;
    if ($capacity < 0) {
        var$2 = new jl_IllegalArgumentException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    $capacity = ju_HashMap_calculateCapacity($capacity);
    $this.$elementCount = 0;
    $this.$elementData = $this.$newElementArray($capacity);
    $this.$loadFactor0 = 0.75;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap__init_2 = var_0 => {
    let var_1 = new ju_HashMap();
    ju_HashMap__init_0(var_1, var_0);
    return var_1;
},
ju_HashMap_calculateCapacity = $x => {
    let var$2;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    $x = var$2 | var$2 >> 1;
    $x = $x | $x >> 2;
    $x = $x | $x >> 4;
    $x = $x | $x >> 8;
    return ($x | $x >> 16) + 1 | 0;
},
ju_HashMap_computeThreshold = $this => {
    $this.$threshold = $this.$elementData.data.length * $this.$loadFactor0 | 0;
},
ju_HashMap_containsKey = ($this, $key) => {
    return ju_HashMap_entryByKey($this, $key) === null ? 0 : 1;
},
ju_HashMap_get = ($this, $key) => {
    let $m;
    $m = ju_HashMap_entryByKey($this, $key);
    if ($m === null)
        return null;
    return $m.$value0;
},
ju_HashMap_entryByKey = ($this, $key) => {
    let $m, $hash;
    if ($key === null)
        $m = ju_HashMap_findNullKeyEntry($this);
    else {
        $hash = $key.$hashCode();
        $m = ju_HashMap_findNonNullKeyEntry($this, $key, $hash & ($this.$elementData.data.length - 1 | 0), $hash);
    }
    return $m;
},
ju_HashMap_findNonNullKeyEntry = ($this, $key, $index, $keyHash) => {
    let $m;
    $m = $this.$elementData.data[$index];
    while ($m !== null && !($m.$origKeyHash == $keyHash && ju_HashMap_areEqualKeys($key, $m.$key0))) {
        $m = $m.$next3;
    }
    return $m;
},
ju_HashMap_findNullKeyEntry = $this => {
    let $m;
    $m = $this.$elementData.data[0];
    while ($m !== null && $m.$key0 !== null) {
        $m = $m.$next3;
    }
    return $m;
},
ju_HashMap_isEmpty = $this => {
    return $this.$elementCount ? 0 : 1;
},
ju_HashMap_keySet = $this => {
    let var$1;
    if ($this.$cachedKeySet === null) {
        var$1 = new ju_HashMap$1;
        var$1.$this$06 = $this;
        $this.$cachedKeySet = var$1;
    }
    return $this.$cachedKeySet;
},
ju_HashMap_put = ($this, $key, $value) => {
    let var$3, var$4, var$5;
    if ($key === null) {
        var$3 = ju_HashMap_findNullKeyEntry($this);
        if (var$3 === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            var$3 = ju_HashMap_createHashedEntry($this, null, 0, 0);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                ju_HashMap_rehash($this);
        }
    } else {
        var$4 = $key.$hashCode();
        var$5 = var$4 & ($this.$elementData.data.length - 1 | 0);
        var$3 = ju_HashMap_findNonNullKeyEntry($this, $key, var$5, var$4);
        if (var$3 === null) {
            $this.$modCount0 = $this.$modCount0 + 1 | 0;
            var$3 = ju_HashMap_createHashedEntry($this, $key, var$5, var$4);
            var$4 = $this.$elementCount + 1 | 0;
            $this.$elementCount = var$4;
            if (var$4 > $this.$threshold)
                ju_HashMap_rehash($this);
        }
    }
    $key = var$3.$value0;
    var$3.$value0 = $value;
    return $key;
},
ju_HashMap_createHashedEntry = ($this, $key, $index, $hash) => {
    let $entry, var$5;
    $entry = ju_HashMap$HashEntry__init_0($key, $hash);
    var$5 = $this.$elementData.data;
    $entry.$next3 = var$5[$index];
    var$5[$index] = $entry;
    return $entry;
},
ju_HashMap_rehash0 = ($this, $capacity) => {
    let $length, $newData, $i, var$5, $entry, $index, $next;
    $length = ju_HashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $this.$newElementArray($length);
    $i = 0;
    $length = $length - 1 | 0;
    while (true) {
        var$5 = $this.$elementData.data;
        if ($i >= var$5.length)
            break;
        $entry = var$5[$i];
        var$5[$i] = null;
        while ($entry !== null) {
            var$5 = $newData.data;
            $index = $entry.$origKeyHash & $length;
            $next = $entry.$next3;
            $entry.$next3 = var$5[$index];
            var$5[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData = $newData;
    ju_HashMap_computeThreshold($this);
},
ju_HashMap_rehash = $this => {
    ju_HashMap_rehash0($this, $this.$elementData.data.length);
},
ju_HashMap_remove = ($this, $key) => {
    let $entry;
    $entry = ju_HashMap_removeByKey($this, $key);
    if ($entry === null)
        return null;
    return $entry.$value0;
},
ju_HashMap_removeByKey = ($this, $key) => {
    let $index, $last, $entry, $entry_0, $hash, var$7;
    a: {
        $index = 0;
        $last = null;
        if ($key === null) {
            $entry = $this.$elementData.data[0];
            while ($entry !== null) {
                if ($entry.$key0 === null)
                    break a;
                $entry_0 = $entry.$next3;
                $last = $entry;
                $entry = $entry_0;
            }
        } else {
            $hash = dba_StatePair_hashCode($key);
            var$7 = $this.$elementData.data;
            $index = $hash & (var$7.length - 1 | 0);
            $entry = var$7[$index];
            while ($entry !== null && !($entry.$origKeyHash == $hash && ju_HashMap_areEqualKeys($key, $entry.$key0))) {
                $entry_0 = $entry.$next3;
                $last = $entry;
                $entry = $entry_0;
            }
        }
    }
    if ($entry === null)
        return null;
    if ($last !== null)
        $last.$next3 = $entry.$next3;
    else
        $this.$elementData.data[$index] = $entry.$next3;
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    $this.$elementCount = $this.$elementCount - 1 | 0;
    return $entry;
},
ju_HashMap_size = $this => {
    return $this.$elementCount;
},
ju_HashMap_areEqualKeys = ($key1, $key2) => {
    return $key1 !== $key2 && !$key1.$equals($key2) ? 0 : 1;
},
jl_CloneNotSupportedException = $rt_classWithoutFields(jl_Exception),
jur_BackReferencedSingleSet = $rt_classWithoutFields(jur_SingleSet),
jur_BackReferencedSingleSet_find = ($this, $startSearch, $testString, $matchResult) => {
    let $res, $lastIndex, $saveStart;
    $res = 0;
    $lastIndex = $matchResult.$rightBound;
    a: {
        while (true) {
            if ($startSearch > $lastIndex) {
                $startSearch = $res;
                break a;
            }
            $saveStart = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $startSearch);
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $saveStart);
            $startSearch = $startSearch + 1 | 0;
        }
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_findBack = ($this, $stringIndex, $startSearch, $testString, $matchResult) => {
    let $res, $saveStart;
    $res = 0;
    a: {
        while (true) {
            if ($startSearch < $stringIndex) {
                $startSearch = $res;
                break a;
            }
            $saveStart = jur_MatchResultImpl_getStart($matchResult, $this.$groupIndex);
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $startSearch);
            $res = $this.$kid.$matches($startSearch, $testString, $matchResult);
            if ($res >= 0)
                break;
            jur_MatchResultImpl_setStart($matchResult, $this.$groupIndex, $saveStart);
            $startSearch = $startSearch + (-1) | 0;
        }
    }
    return $startSearch;
},
jur_BackReferencedSingleSet_processBackRefReplacement = $this => {
    return null;
},
ju_SequencedSet = $rt_classWithoutFields(0),
ju_LinkedHashSet = $rt_classWithoutFields(ju_HashSet),
ju_AbstractSequentialList = $rt_classWithoutFields(ju_AbstractList),
ju_AbstractSequentialList_get = ($this, $index) => {
    let $iter;
    if ($index < 0) {
        $iter = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($iter);
        $rt_throw($iter);
    }
    return ju_LinkedList$SequentialListIterator_next(ju_LinkedList_listIterator($this, $index));
},
ju_AbstractSequentialList_iterator = $this => {
    let var$1;
    var$1 = $this;
    return ju_LinkedList$SequentialListIterator__init_(var$1, var$1.$firstEntry, null, 0);
},
ju_Queue = $rt_classWithoutFields(0),
ju_Deque = $rt_classWithoutFields(0);
function ju_LinkedList() {
    let a = this; ju_AbstractSequentialList.call(a);
    a.$firstEntry = null;
    a.$lastEntry = null;
    a.$size1 = 0;
}
let ju_LinkedList__init_2 = $this => {
    return;
},
ju_LinkedList__init_ = () => {
    let var_0 = new ju_LinkedList();
    ju_LinkedList__init_2(var_0);
    return var_0;
},
ju_LinkedList__init_1 = ($this, $coll) => {
    let $iter, $prevEntry, $prevEntry_0;
    $iter = $coll.$iterator();
    $prevEntry = null;
    while ($iter.$hasNext()) {
        $prevEntry_0 = new ju_LinkedList$Entry;
        $prevEntry_0.$item = $iter.$next0();
        $prevEntry_0.$previous = $prevEntry;
        if ($prevEntry !== null)
            $prevEntry.$next4 = $prevEntry_0;
        else
            $this.$firstEntry = $prevEntry_0;
        $this.$size1 = $this.$size1 + 1 | 0;
        $prevEntry = $prevEntry_0;
    }
    $this.$lastEntry = $prevEntry;
},
ju_LinkedList__init_0 = var_0 => {
    let var_1 = new ju_LinkedList();
    ju_LinkedList__init_1(var_1, var_0);
    return var_1;
},
ju_LinkedList_size = $this => {
    return $this.$size1;
},
ju_LinkedList_listIterator = ($this, $index) => {
    let $prev, var$3, $next, $i;
    if ($index < 0) {
        $prev = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($prev);
        $rt_throw($prev);
    }
    var$3 = $this.$size1;
    if ($index <= (var$3 / 2 | 0)) {
        $next = $this.$firstEntry;
        $i = 0;
        while ($i < $index) {
            $next = $next.$next4;
            $i = $i + 1 | 0;
        }
        return ju_LinkedList$SequentialListIterator__init_($this, $next, $next === null ? null : $next.$previous, $index);
    }
    if ($index > var$3) {
        $prev = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($prev);
        $rt_throw($prev);
    }
    $prev = $this.$lastEntry;
    $i = $index;
    while ($i < var$3) {
        $prev = $prev.$previous;
        $i = $i + 1 | 0;
    }
    return ju_LinkedList$SequentialListIterator__init_($this, $prev === null ? null : $prev.$next4, $prev, $index);
},
ju_LinkedList_removeFirst = $this => {
    let var$1, var$2;
    if (ju_AbstractCollection_isEmpty($this)) {
        var$1 = new ju_NoSuchElementException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$1 = $this.$firstEntry;
    if (var$1 === null)
        var$1 = null;
    else {
        var$2 = var$1.$next4;
        $this.$firstEntry = var$2;
        if (var$2 !== null)
            var$2.$previous = null;
        else
            $this.$lastEntry = null;
        $this.$size1 = $this.$size1 - 1 | 0;
        $this.$modCount = $this.$modCount + 1 | 0;
        var$1 = var$1.$item;
    }
    return var$1;
},
dba_MinimizationOperations = $rt_classWithoutFields(),
dba_MinimizationOperations_addTriggers = ($transitions, $triggers, $n1, $n2) => {
    let $t1, $t2, $k1, $k2, var$9, $m1, $m2, var$12;
    $transitions = $transitions.data;
    $t1 = $transitions[$n1];
    $t2 = $transitions[$n2];
    $k1 = 0;
    $k2 = 0;
    while (true) {
        $transitions = $t1.data;
        if ($k1 >= $transitions.length)
            break;
        var$9 = $t2.data;
        if ($k2 >= var$9.length)
            break;
        if ($transitions[$k1].$max0 < var$9[$k2].$min0) {
            $k1 = $k1 + 1 | 0;
            continue;
        }
        if (var$9[$k2].$max0 < $transitions[$k1].$min0) {
            $k2 = $k2 + 1 | 0;
            continue;
        }
        if ($transitions[$k1].$to !== var$9[$k2].$to) {
            $m1 = $transitions[$k1].$to.$number;
            $m2 = var$9[$k2].$to.$number;
            if ($m1 <= $m2) {
                var$12 = $m2;
                $m2 = $m1;
                $m1 = var$12;
            }
            if (ju_ArrayList_get(ju_ArrayList_get($triggers, $m2), $m1) === null)
                ju_ArrayList_set(ju_ArrayList_get($triggers, $m2), $m1, ju_HashSet__init_());
            ju_HashSet_add(ju_ArrayList_get(ju_ArrayList_get($triggers, $m2), $m1), dba_MinimizationOperations$IntPair__init_($n1, $n2));
        }
        if ($transitions[$k1].$max0 >= var$9[$k2].$max0) {
            $k2 = $k2 + 1 | 0;
            continue;
        }
        $k1 = $k1 + 1 | 0;
    }
},
dba_MinimizationOperations_markPair = ($mark, $triggers, $n1, $n2) => {
    let var$5, var$6, $p, $m1, $m2;
    a: {
        var$5 = $mark.data;
        var$5[$n1].data[$n2] = 1;
        if (ju_ArrayList_get(ju_ArrayList_get($triggers, $n1), $n2) !== null) {
            var$6 = ju_HashSet_iterator(ju_ArrayList_get(ju_ArrayList_get($triggers, $n1), $n2));
            while (true) {
                if (!var$6.$hasNext())
                    break a;
                $p = var$6.$next0();
                $m1 = $p.$n1;
                $m2 = $p.$n2;
                if ($m1 <= $m2) {
                    $n1 = $m2;
                    $m2 = $m1;
                    $m1 = $n1;
                }
                if (!var$5[$m2].data[$m1])
                    dba_MinimizationOperations_markPair($mark, $triggers, $m2, $m1);
            }
        }
    }
},
dba_MinimizationOperations_initialize = ($list, $size) => {
    let $i;
    $i = 0;
    while ($i < $size) {
        ju_ArrayList_add($list, null);
        $i = $i + 1 | 0;
    }
},
dba_MinimizationOperations_minimizeHuffman = $a => {
    let $ss, $triggers, $transitions, $states, $n, $mark, $n1, $v, var$10, var$11, $n1_0, $n2, $n1_1, $n2_0, $newstates, var$17, $numclasses, var$19, var$20, $n_0, var$22, $s, $t;
    dba_Automaton_determinize($a);
    dba_Automaton_totalize($a);
    $ss = dba_Automaton_getStates($a);
    $triggers = $ss;
    $transitions = $rt_createArray($rt_arraycls(dba_Transition), ju_HashSet_size($triggers));
    $states = $rt_createArray(dba_State, ju_HashSet_size($triggers));
    $states = (ju_AbstractCollection_toArray($ss, $states)).data;
    $n = $states.length;
    $mark = $rt_createBooleanMultiArray([$n, $n]);
    $triggers = ju_ArrayList__init_();
    $n1 = 0;
    while ($n1 < $n) {
        $v = ju_ArrayList__init_();
        dba_MinimizationOperations_initialize($v, $n);
        ju_ArrayList_add($triggers, $v);
        $n1 = $n1 + 1 | 0;
    }
    var$10 = $mark.data;
    var$11 = $transitions.data;
    $n1_0 = 0;
    while ($n1_0 < $n) {
        $states[$n1_0].$number = $n1_0;
        var$11[$n1_0] = dba_State_getSortedTransitionArray($states[$n1_0], 0);
        $n1 = $n1_0 + 1 | 0;
        $n2 = $n1;
        while ($n2 < $n) {
            if ($states[$n1_0].$accept != $states[$n2].$accept)
                var$10[$n1_0].data[$n2] = 1;
            $n2 = $n2 + 1 | 0;
        }
        $n1_0 = $n1;
    }
    $n1_1 = 0;
    while ($n1_1 < $n) {
        $n1 = $n1_1 + 1 | 0;
        $n2_0 = $n1;
        while ($n2_0 < $n) {
            if (!var$10[$n1_1].data[$n2_0]) {
                $newstates = var$11[$n1_1];
                var$17 = var$11[$n2_0];
                $n2 = 0;
                $numclasses = 0;
                a: {
                    while (true) {
                        var$19 = $newstates.data;
                        if ($n2 >= var$19.length)
                            break;
                        var$20 = var$17.data;
                        if ($numclasses >= var$20.length)
                            break;
                        if (var$19[$n2].$max0 < var$20[$numclasses].$min0) {
                            $n2 = $n2 + 1 | 0;
                            continue;
                        }
                        if (var$20[$numclasses].$max0 < var$19[$n2].$min0) {
                            $numclasses = $numclasses + 1 | 0;
                            continue;
                        }
                        $n_0 = var$19[$n2].$to.$number;
                        var$22 = var$20[$numclasses].$to.$number;
                        if ($n_0 <= var$22) {
                            $n1_0 = var$22;
                            var$22 = $n_0;
                            $n_0 = $n1_0;
                        }
                        if (var$10[var$22].data[$n_0]) {
                            $n1_0 = 0;
                            break a;
                        }
                        if (var$19[$n2].$max0 >= var$20[$numclasses].$max0)
                            $numclasses = $numclasses + 1 | 0;
                        else
                            $n2 = $n2 + 1 | 0;
                    }
                    $n1_0 = 1;
                }
                if (!$n1_0)
                    dba_MinimizationOperations_markPair($mark, $triggers, $n1_1, $n2_0);
                else
                    dba_MinimizationOperations_addTriggers($transitions, $triggers, $n1_1, $n2_0);
            }
            $n2_0 = $n2_0 + 1 | 0;
        }
        $n1_1 = $n1;
    }
    $numclasses = 0;
    $n_0 = 0;
    while ($n_0 < $n) {
        $states[$n_0].$number = (-1);
        $n_0 = $n_0 + 1 | 0;
    }
    $n1 = 0;
    while ($n1 < $n) {
        if ($states[$n1].$number == (-1)) {
            $states[$n1].$number = $numclasses;
            $n2_0 = $n1 + 1 | 0;
            while ($n2_0 < $n) {
                if (!var$10[$n1].data[$n2_0])
                    $states[$n2_0].$number = $numclasses;
                $n2_0 = $n2_0 + 1 | 0;
            }
            $numclasses = $numclasses + 1 | 0;
        }
        $n1 = $n1 + 1 | 0;
    }
    $transitions = $rt_createArray(dba_State, $numclasses).data;
    $n_0 = 0;
    while ($n_0 < $numclasses) {
        $transitions[$n_0] = dba_State__init_();
        $n_0 = $n_0 + 1 | 0;
    }
    $n_0 = 0;
    while ($n_0 < $n) {
        $transitions[$states[$n_0].$number].$number = $n_0;
        if ($states[$n_0] === $a.$initial)
            $a.$initial = $transitions[$states[$n_0].$number];
        $n_0 = $n_0 + 1 | 0;
    }
    $n = 0;
    while ($n < $numclasses) {
        $s = $transitions[$n];
        $n1 = $s.$number;
        $s.$accept = $states[$n1].$accept;
        $ss = ju_HashSet_iterator($states[$n1].$transitions);
        while ($ss.$hasNext()) {
            $t = $ss.$next0();
            $triggers = $s.$transitions;
            $v = dba_Transition__init_($t.$min0, $t.$max0, $transitions[$t.$to.$number]);
            ju_HashSet_add($triggers, $v);
        }
        $n = $n + 1 | 0;
    }
    dba_Automaton_removeDeadTransitions($a);
},
dba_MinimizationOperations_minimizeHopcroft = $a => {
    let $tr, $t, var$4, $number, $q, $q_0, $sigma, $reverse, $states, $v, $newstates, $n, $reverse_nonempty, $partition, $block, $active2, $pending, $pending2, $split, $split2, $refine, $refine2, $splitblock, $q_1, $x, $qq, $j, $p, $k, $ip, $p_0, $m, $s, $ss, $b1, $b2, $s_0, $c, $sn, $aj, $ak;
    dba_Automaton_determinize($a);
    $tr = dba_State_getTransitions($a.$initial);
    if (ju_HashSet_size($tr) == 1) {
        $t = (ju_HashSet_iterator($tr)).$next0();
        if ($t.$to === $a.$initial && !$t.$min0 && $t.$max0 == 65535)
            return;
    }
    dba_Automaton_totalize($a);
    $tr = dba_Automaton_getStates($a);
    var$4 = $rt_createArray(dba_State, ju_HashSet_size($tr)).data;
    $number = 0;
    $tr = ju_HashSet_iterator($tr);
    while ($tr.$hasNext()) {
        $q = $tr.$next0();
        var$4[$number] = $q;
        $q_0 = $number + 1 | 0;
        $q.$number = $number;
        $number = $q_0;
    }
    $sigma = dba_Automaton_getStartPoints($a);
    $reverse = ju_ArrayList__init_();
    $q_0 = 0;
    $number = var$4.length;
    while ($q_0 < $number) {
        $states = $sigma.data;
        $v = ju_ArrayList__init_();
        dba_MinimizationOperations_initialize($v, $states.length);
        ju_ArrayList_add($reverse, $v);
        $q_0 = $q_0 + 1 | 0;
    }
    $newstates = $sigma.data;
    $n = $newstates.length;
    $reverse_nonempty = $rt_createBooleanMultiArray([$n, $number]);
    $partition = ju_ArrayList__init_();
    dba_MinimizationOperations_initialize($partition, $number);
    $block = $rt_createIntArray($number);
    $states = $rt_createMultiArray(dba_MinimizationOperations$StateList, [$n, $number]).data;
    $active2 = $rt_createMultiArray(dba_MinimizationOperations$StateListNode, [$n, $number]);
    $pending = ju_LinkedList__init_();
    $pending2 = $rt_createBooleanMultiArray([$number, $n]);
    $split = ju_ArrayList__init_();
    $split2 = $rt_createBooleanArray($number);
    $refine = ju_ArrayList__init_();
    $refine2 = $rt_createBooleanArray($number);
    $splitblock = ju_ArrayList__init_();
    dba_MinimizationOperations_initialize($splitblock, $number);
    $q_1 = 0;
    while ($q_1 < $number) {
        ju_ArrayList_set($splitblock, $q_1, ju_ArrayList__init_());
        ju_ArrayList_set($partition, $q_1, ju_LinkedList__init_());
        $x = 0;
        while ($x < $n) {
            ju_ArrayList_set(ju_ArrayList_get($reverse, $q_1), $x, ju_LinkedList__init_());
            $states[$q_1].data[$x] = dba_MinimizationOperations$StateList__init_0();
            $x = $x + 1 | 0;
        }
        $q_1 = $q_1 + 1 | 0;
    }
    $sigma = $block.data;
    $reverse_nonempty = $reverse_nonempty.data;
    $q_0 = 0;
    while ($q_0 < $number) {
        $qq = var$4[$q_0];
        $j = !$qq.$accept ? 1 : 0;
        ju_AbstractList_add(ju_ArrayList_get($partition, $j), $qq);
        $sigma[$qq.$number] = $j;
        $x = 0;
        while ($x < $n) {
            $p = dba_State_step($qq, $newstates[$x]);
            ju_AbstractList_add(ju_ArrayList_get(ju_ArrayList_get($reverse, $p.$number), $x), $qq);
            $reverse_nonempty[$p.$number].data[$x] = 1;
            $x = $x + 1 | 0;
        }
        $q_0 = $q_0 + 1 | 0;
    }
    $newstates = $active2.data;
    $j = 0;
    while ($j <= 1) {
        $x = 0;
        while ($x < $n) {
            $tr = ju_AbstractSequentialList_iterator(ju_ArrayList_get($partition, $j));
            while (ju_LinkedList$SequentialListIterator_hasNext($tr)) {
                $qq = ju_LinkedList$SequentialListIterator_next($tr);
                $number = $qq.$number;
                if ($reverse_nonempty[$number].data[$x])
                    $newstates[$number].data[$x] = dba_MinimizationOperations$StateList_add($states[$j].data[$x], $qq);
            }
            $x = $x + 1 | 0;
        }
        $j = $j + 1 | 0;
    }
    $block = $pending2.data;
    $x = 0;
    $q = $pending;
    while ($x < $n) {
        $j = $states[0].data[$x].$size2 > $states[1].data[$x].$size2 ? 1 : 0;
        ju_AbstractList_add($q, dba_MinimizationOperations$IntPair__init_($j, $x));
        $block[$x].data[$j] = 1;
        $x = $x + 1 | 0;
    }
    $pending2 = $split2.data;
    $split2 = $refine2.data;
    $k = 2;
    $v = $pending;
    $qq = $refine;
    while (!ju_AbstractCollection_isEmpty($v)) {
        $ip = ju_LinkedList_removeFirst($pending);
        $p_0 = $ip.$n1;
        $x = $ip.$n2;
        $block[$x].data[$p_0] = 0;
        $m = $states[$p_0].data[$x].$first1;
        while ($m !== null) {
            $tr = ju_AbstractSequentialList_iterator(ju_ArrayList_get(ju_ArrayList_get($reverse, $m.$q.$number), $x));
            while (ju_LinkedList$SequentialListIterator_hasNext($tr)) {
                $s = ju_LinkedList$SequentialListIterator_next($tr);
                $number = $s.$number;
                if (!$pending2[$number]) {
                    $pending2[$number] = 1;
                    ju_ArrayList_add($split, $s);
                    $j = $sigma[$s.$number];
                    ju_ArrayList_add(ju_ArrayList_get($splitblock, $j), $s);
                    if (!$split2[$j]) {
                        $split2[$j] = 1;
                        ju_ArrayList_add($refine, jl_Integer_valueOf($j));
                    }
                }
            }
            $m = $m.$next5;
        }
        $ss = ju_AbstractList_iterator($qq);
        while (ju_AbstractList$1_hasNext($ss)) {
            $j = jl_Integer_intValue(ju_AbstractList$1_next($ss));
            if (ju_ArrayList_size(ju_ArrayList_get($splitblock, $j)) < ju_LinkedList_size(ju_ArrayList_get($partition, $j))) {
                $b1 = ju_ArrayList_get($partition, $j);
                $b2 = ju_ArrayList_get($partition, $k);
                $s = ju_AbstractList_iterator(ju_ArrayList_get($splitblock, $j));
                $tr = $b1;
                $p = $b2;
                while (ju_AbstractList$1_hasNext($s)) {
                    $s_0 = ju_AbstractList$1_next($s);
                    ju_AbstractCollection_remove($tr, $s_0);
                    ju_AbstractList_add($p, $s_0);
                    $sigma[$s_0.$number] = $k;
                    $c = 0;
                    while ($c < $n) {
                        $sn = $newstates[$s_0.$number].data[$c];
                        if ($sn !== null && $sn.$sl === $states[$j].data[$c]) {
                            dba_MinimizationOperations$StateListNode_remove($sn);
                            $newstates[$s_0.$number].data[$c] = dba_MinimizationOperations$StateList_add($states[$k].data[$c], $s_0);
                        }
                        $c = $c + 1 | 0;
                    }
                }
                $c = 0;
                while ($c < $n) {
                    $aj = $states[$j].data[$c].$size2;
                    $ak = $states[$k].data[$c].$size2;
                    if (!$block[$c].data[$j] && 0 < $aj && $aj <= $ak) {
                        $block[$c].data[$j] = 1;
                        ju_AbstractList_add($q, dba_MinimizationOperations$IntPair__init_($j, $c));
                    } else {
                        $block[$c].data[$k] = 1;
                        ju_AbstractList_add($q, dba_MinimizationOperations$IntPair__init_($k, $c));
                    }
                    $c = $c + 1 | 0;
                }
                $k = $k + 1 | 0;
            }
            $tr = ju_AbstractList_iterator(ju_ArrayList_get($splitblock, $j));
            while (ju_AbstractList$1_hasNext($tr)) {
                $pending2[(ju_AbstractList$1_next($tr)).$number] = 0;
            }
            $split2[$j] = 0;
            ju_ArrayList_clear(ju_ArrayList_get($splitblock, $j));
        }
        ju_ArrayList_clear($split);
        ju_ArrayList_clear($refine);
    }
    $states = $rt_createArray(dba_State, $k).data;
    $n = 0;
    $number = $states.length;
    while ($n < $number) {
        $s = dba_State__init_();
        $states[$n] = $s;
        $ss = ju_AbstractSequentialList_iterator(ju_ArrayList_get($partition, $n));
        while (ju_LinkedList$SequentialListIterator_hasNext($ss)) {
            $q = ju_LinkedList$SequentialListIterator_next($ss);
            if ($q === $a.$initial)
                $a.$initial = $s;
            $s.$accept = $q.$accept;
            $s.$number = $q.$number;
            $q.$number = $n;
        }
        $n = $n + 1 | 0;
    }
    $n = 0;
    while ($n < $number) {
        $s = $states[$n];
        $q_0 = $s.$number;
        $s.$accept = var$4[$q_0].$accept;
        $tr = ju_HashSet_iterator(var$4[$q_0].$transitions);
        while ($tr.$hasNext()) {
            $t = $tr.$next0();
            $ss = $s.$transitions;
            $reverse = dba_Transition__init_($t.$min0, $t.$max0, $states[$t.$to.$number]);
            ju_HashSet_add($ss, $reverse);
        }
        $n = $n + 1 | 0;
    }
    dba_Automaton_removeDeadTransitions($a);
},
dba_MinimizationOperations_minimizeValmari = $automaton => {
    let $states, $stateCount, $transitionCount, $acceptStates, $blocks, $cords, $labels, var$9, var$10, $heads, var$12, $number, $s, $a, $t, $tails, $i, $t_0, $newStates, $j, $A, $F, $c, $b, $bl, $tail, $head;
    dba_Automaton_determinize($automaton);
    $states = dba_Automaton_getStates($automaton);
    dba_MinimizationOperations_splitTransitions($states);
    $stateCount = ju_HashSet_size($states);
    $transitionCount = dba_Automaton_getNumberOfTransitions($automaton);
    $acceptStates = dba_Automaton_getAcceptStates($automaton);
    $blocks = dba_MinimizationOperations$Partition__init_($stateCount);
    $cords = dba_MinimizationOperations$Partition__init_($transitionCount);
    $labels = $rt_createArray(dba_MinimizationOperations$IntPair, $transitionCount);
    var$9 = $labels.data;
    var$10 = $rt_createIntArray($transitionCount).data;
    $heads = $rt_createIntArray($transitionCount);
    var$12 = $heads.data;
    dba_Automaton_setStateNumbers($states);
    $number = 0;
    $states = ju_HashSet_iterator(dba_Automaton_getStates($automaton));
    while ($states.$hasNext()) {
        $s = $states.$next0();
        $a = ju_HashSet_iterator($s.$transitions);
        while ($a.$hasNext()) {
            $t = $a.$next0();
            var$10[$number] = $s.$number;
            var$9[$number] = dba_MinimizationOperations$IntPair__init_($t.$min0, $t.$max0);
            var$12[$number] = $t.$to.$number;
            $number = $number + 1 | 0;
        }
    }
    $acceptStates = $acceptStates;
    $states = ju_HashSet_iterator($acceptStates);
    while ($states.$hasNext()) {
        dba_MinimizationOperations$Partition_mark($blocks, ($states.$next0()).$number);
    }
    dba_MinimizationOperations$Partition_split($blocks);
    if ($transitionCount > 0) {
        $tails = $cords.$elements;
        $states = new dba_MinimizationOperations$LabelComparator;
        $states.$labels = $labels;
        ju_Arrays_sort($tails, $states);
        $tails = $cords.$markedElementCount.data;
        $tails[0] = 0;
        $cords.$setCount = 0;
        $labels = $cords.$elements.data;
        $a = var$9[$labels[0].$value];
        $i = 0;
        while ($i < $transitionCount) {
            $t_0 = $labels[$i].$value;
            if (!(var$9[$t_0].$n1 == $a.$n1 && var$9[$t_0].$n2 == $a.$n2)) {
                $a = var$9[$t_0];
                $newStates = $cords.$past.data;
                $j = $cords.$setCount;
                $number = $j + 1 | 0;
                $cords.$setCount = $number;
                $newStates[$j] = $i;
                $cords.$first0.data[$number] = $i;
                $tails[$number] = 0;
            }
            $cords.$setNo.data[$t_0] = $cords.$setCount;
            $cords.$locations.data[$t_0] = $i;
            $i = $i + 1 | 0;
        }
        $tails = $cords.$past.data;
        $i = $cords.$setCount;
        $cords.$setCount = $i + 1 | 0;
        $tails[$i] = $transitionCount;
    }
    $A = $rt_createIntArray($transitionCount);
    $tails = $A.data;
    $F = $rt_createIntArray($stateCount + 1 | 0);
    $newStates = $F.data;
    dba_MinimizationOperations_makeAdjacent($A, $F, $heads, $stateCount, $transitionCount);
    $c = 0;
    while ($c < $cords.$setCount) {
        $i = $cords.$first0.data[$c];
        while ($i < $cords.$past.data[$c]) {
            dba_MinimizationOperations$Partition_mark($blocks, var$10[$cords.$elements.data[$i].$value]);
            $i = $i + 1 | 0;
        }
        dba_MinimizationOperations$Partition_split($blocks);
        $b = 1;
        while ($b < $blocks.$setCount) {
            $i = $blocks.$first0.data[$b];
            while ($i < $blocks.$past.data[$b]) {
                $j = $newStates[$blocks.$elements.data[$i].$value];
                while ($j < $newStates[$blocks.$elements.data[$i].$value + 1 | 0]) {
                    dba_MinimizationOperations$Partition_mark($cords, $tails[$j]);
                    $j = $j + 1 | 0;
                }
                $i = $i + 1 | 0;
            }
            dba_MinimizationOperations$Partition_split($cords);
            $b = $b + 1 | 0;
        }
        $c = $c + 1 | 0;
    }
    $tails = $rt_createArray(dba_State, $blocks.$setCount).data;
    $bl = 0;
    while ($bl < $blocks.$setCount) {
        $tails[$bl] = dba_State__init_();
        if ($blocks.$first0.data[$bl] < ju_HashSet_size($acceptStates))
            $tails[$bl].$accept = 1;
        $bl = $bl + 1 | 0;
    }
    $t_0 = 0;
    while ($t_0 < $transitionCount) {
        $stateCount = $blocks.$locations.data[var$10[$t_0]];
        $newStates = $blocks.$first0.data;
        $labels = $blocks.$setNo.data;
        if ($stateCount == $newStates[$labels[var$10[$t_0]]]) {
            $tail = $tails[$labels[var$10[$t_0]]];
            $head = $tails[$labels[var$12[$t_0]]];
            dba_State_addTransition($tail, dba_Transition__init_(var$9[$t_0].$n1 & 65535, var$9[$t_0].$n2 & 65535, $head));
        }
        $t_0 = $t_0 + 1 | 0;
    }
    $labels = $blocks.$setNo.data;
    dba_Automaton_expandSingleton($automaton);
    $automaton.$initial = $tails[$labels[$automaton.$initial.$number]];
    $automaton.$singleton = null;
    dba_Automaton_reduce($automaton);
},
dba_MinimizationOperations_makeAdjacent = ($A, $F, $K, $nn, $t) => {
    let $q, $t_0, var$8, var$9, $q_0, var$11;
    $q = 0;
    while ($q <= $nn) {
        $F.data[$q] = 0;
        $q = $q + 1 | 0;
    }
    $t_0 = 0;
    while ($t_0 < $t) {
        var$8 = $F.data;
        $q = $K.data[$t_0];
        var$8[$q] = var$8[$q] + 1 | 0;
        $t_0 = $t_0 + 1 | 0;
    }
    $q = 0;
    while ($q < $nn) {
        var$9 = $F.data;
        $q_0 = $q + 1 | 0;
        var$9[$q_0] = var$9[$q_0] + var$9[$q] | 0;
        $q = $q_0;
    }
    while (true) {
        $t_0 = $t + (-1) | 0;
        if ($t <= 0)
            break;
        var$11 = $A.data;
        var$8 = $F.data;
        $nn = $K.data[$t_0];
        $t = var$8[$nn] - 1 | 0;
        var$8[$nn] = $t;
        var$11[$t] = $t_0;
        $t = $t_0;
    }
},
dba_MinimizationOperations_splitTransitions = $states => {
    let $pointSet, $t, $transitions, $t_0, $s, var$7, $start, $headSet, $tailSet, $intersection, $c, var$13, var$14;
    $pointSet = new ju_TreeSet;
    $pointSet.$map = ju_TreeMap__init_0(null);
    $t = $states;
    $states = ju_HashSet_iterator($t);
    while ($states.$hasNext()) {
        $transitions = ju_HashSet_iterator(($states.$next0()).$transitions);
        while ($transitions.$hasNext()) {
            $t_0 = $transitions.$next0();
            ju_TreeSet_add($pointSet, jl_Character_valueOf($t_0.$min0));
            ju_TreeSet_add($pointSet, jl_Character_valueOf($t_0.$max0));
        }
    }
    $states = ju_HashSet_iterator($t);
    while ($states.$hasNext()) {
        $s = $states.$next0();
        $transitions = $s.$transitions;
        dba_State_resetTransitions($s);
        $t_0 = ju_HashSet_iterator($transitions);
        while ($t_0.$hasNext()) {
            $t = $t_0.$next0();
            var$7 = $t.$min0;
            $start = $t.$max0;
            if (var$7 == $start) {
                dba_State_addTransition($s, $t);
                continue;
            }
            $headSet = jl_Character_valueOf($start);
            $headSet = ju_TreeMap$MapView_navigableKeySet(ju_TreeMap$MapView__init_($pointSet.$map, null, 0, 0, $headSet, 1, 1, 0));
            $tailSet = jl_Character_valueOf($t.$min0);
            $tailSet = ju_TreeMap$MapView_navigableKeySet(ju_TreeMap$MapView__init_($pointSet.$map, $tailSet, 0, 1, null, 0, 0, 0));
            $intersection = new ju_TreeSet;
            $transitions = new ju_TreeMap;
            $c = $headSet;
            var$13 = $c.$map0;
            ju_TreeMap__init_($transitions, var$13.$reverse1 ? var$13.$owner1.$revertedComparator : var$13.$owner1.$originalComparator);
            $intersection.$map = $transitions;
            $headSet = (ju_AbstractMap_keySet($c.$map0)).$iterator();
            while ($headSet.$hasNext()) {
                ju_TreeMap_put($intersection.$map, $headSet.$next0(), ju_TreeSet_VALUE);
            }
            $transitions = $intersection;
            ju_Objects_requireNonNull($tailSet);
            $transitions = ju_TreeSet_iterator($transitions);
            var$13 = $tailSet;
            while ($transitions.$hasNext()) {
                a: {
                    b: {
                        $c = $transitions.$next0();
                        $headSet = var$13.$map0;
                        if ($headSet.$fromChecked0) {
                            c: {
                                var$7 = $headSet.$owner1.$comparator.$compare($c, $headSet.$from1);
                                if (!$headSet.$fromIncluded) {
                                    if (var$7 > 0)
                                        break b;
                                    else
                                        break c;
                                }
                                if (var$7 >= 0)
                                    break b;
                            }
                            var$7 = 0;
                            break a;
                        }
                    }
                    d: {
                        if ($headSet.$toChecked) {
                            e: {
                                var$7 = $headSet.$owner1.$comparator.$compare($c, $headSet.$to2);
                                if (!$headSet.$toIncluded0) {
                                    if (var$7 < 0)
                                        break d;
                                    else
                                        break e;
                                }
                                if (var$7 <= 0)
                                    break d;
                            }
                            var$7 = 0;
                            break a;
                        }
                    }
                    var$7 = ju_TreeMap_findExact($headSet.$owner1, $c) === null ? 0 : 1;
                }
                if (!var$7)
                    $transitions.$remove1();
            }
            $start = $t.$min0;
            $transitions = ju_TreeSet_iterator($intersection);
            while ($transitions.$hasNext()) {
                $c = $transitions.$next0();
                dba_State_addTransition($s, dba_Transition__init_0($start, $t.$to));
                dba_State_addTransition($s, dba_Transition__init_0($c.$value1, $t.$to));
                var$14 = $c.$value1;
                if ((var$14 - $start | 0) > 1)
                    dba_State_addTransition($s, dba_Transition__init_(($start + 1 | 0) & 65535, (var$14 - 1 | 0) & 65535, $t.$to));
                $start = $c.$value1;
            }
        }
    }
};
function jur_AbstractCharClass$LazyJavaLowerCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$037 = null;
}
let jur_AbstractCharClass$LazyJavaLowerCase$1_contains = ($this, $ch) => {
    return jl_Character_getType($ch) != 2 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaUpperCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$012 = null;
}
let jur_AbstractCharClass$LazyJavaUpperCase$1_contains = ($this, $ch) => {
    return jl_Character_getType($ch) != 1 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaWhitespace$1() {
    jur_AbstractCharClass.call(this);
    this.$this$029 = null;
}
let jur_AbstractCharClass$LazyJavaWhitespace$1_contains = ($this, $ch) => {
    return jl_Character_isWhitespace($ch);
};
function jur_AbstractCharClass$LazyJavaMirrored$1() {
    jur_AbstractCharClass.call(this);
    this.$this$024 = null;
}
let jur_AbstractCharClass$LazyJavaMirrored$1_contains = ($this, $ch) => {
    return 0;
};
function jur_AbstractCharClass$LazyJavaDefined$1() {
    jur_AbstractCharClass.call(this);
    this.$this$027 = null;
}
let jur_AbstractCharClass$LazyJavaDefined$1_contains = ($this, $ch) => {
    return !jl_Character_getType($ch) ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$015 = null;
}
let jur_AbstractCharClass$LazyJavaDigit$1_contains = ($this, $ch) => {
    return jl_Character_getType($ch) != 9 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1() {
    jur_AbstractCharClass.call(this);
    this.$this$032 = null;
}
let jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains = ($this, $ch) => {
    return jl_Character_isIdentifierIgnorable($ch);
};
function jur_AbstractCharClass$LazyJavaISOControl$1() {
    jur_AbstractCharClass.call(this);
    this.$this$038 = null;
}
let jur_AbstractCharClass$LazyJavaISOControl$1_contains = ($this, $ch) => {
    a: {
        b: {
            if (!($ch >= 0 && $ch <= 31)) {
                if ($ch < 127)
                    break b;
                if ($ch > 159)
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = 0;
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$09 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains = ($this, $ch) => {
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 23:
                case 26:
                    break;
                case 7:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 24:
                case 25:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$016 = null;
}
let jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains = ($this, $ch) => {
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 10:
                case 23:
                case 26:
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 24:
                case 25:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaLetter$1() {
    jur_AbstractCharClass.call(this);
    this.$this$026 = null;
}
let jur_AbstractCharClass$LazyJavaLetter$1_contains = ($this, $ch) => {
    a: {
        switch (jl_Character_getType($ch)) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                $ch = 0;
                break a;
        }
        $ch = 1;
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaLetterOrDigit$1() {
    jur_AbstractCharClass.call(this);
    this.$this$030 = null;
}
let jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains = ($this, $ch) => {
    return jl_Character_isLetterOrDigit($ch);
};
function jur_AbstractCharClass$LazyJavaSpaceChar$1() {
    jur_AbstractCharClass.call(this);
    this.$this$031 = null;
}
let jur_AbstractCharClass$LazyJavaSpaceChar$1_contains = ($this, $ch) => {
    return jl_Character_isSpaceChar($ch);
};
function jur_AbstractCharClass$LazyJavaTitleCase$1() {
    jur_AbstractCharClass.call(this);
    this.$this$017 = null;
}
let jur_AbstractCharClass$LazyJavaTitleCase$1_contains = ($this, $ch) => {
    return jl_Character_getType($ch) != 3 ? 0 : 1;
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$011 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains = ($this, $ch) => {
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 8:
                case 9:
                case 10:
                case 23:
                    break;
                case 7:
                case 11:
                case 12:
                case 13:
                case 14:
                case 15:
                case 16:
                case 17:
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1() {
    jur_AbstractCharClass.call(this);
    this.$this$036 = null;
}
let jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains = ($this, $ch) => {
    a: {
        b: {
            switch (jl_Character_getType($ch)) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 10:
                    break;
                case 6:
                case 7:
                case 8:
                case 9:
                    break b;
                default:
                    break b;
            }
            $ch = 1;
            break a;
        }
        $ch = jl_Character_isIdentifierIgnorable($ch);
    }
    return $ch;
};
function jur_UnicodeCategory() {
    jur_AbstractCharClass.call(this);
    this.$category = 0;
}
let jur_UnicodeCategory__init_ = ($this, $category) => {
    jur_AbstractCharClass__init_($this);
    $this.$category = $category;
},
jur_UnicodeCategory__init_0 = var_0 => {
    let var_1 = new jur_UnicodeCategory();
    jur_UnicodeCategory__init_(var_1, var_0);
    return var_1;
},
jur_UnicodeCategory_contains = ($this, $ch) => {
    return $this.$alt ^ ($this.$category != jl_Character_getType($ch & 65535) ? 0 : 1);
},
jur_UnicodeCategoryScope = $rt_classWithoutFields(jur_UnicodeCategory),
jur_UnicodeCategoryScope_contains = ($this, $ch) => {
    return $this.$alt ^ (!($this.$category >> jl_Character_getType($ch & 65535) & 1) ? 0 : 1);
},
ju_Iterator = $rt_classWithoutFields(0);
function ju_AbstractList$1() {
    let a = this; jl_Object.call(a);
    a.$index1 = 0;
    a.$modCount3 = 0;
    a.$size4 = 0;
    a.$removeIndex = 0;
    a.$this$05 = null;
}
let ju_AbstractList$1_hasNext = $this => {
    return $this.$index1 >= $this.$size4 ? 0 : 1;
},
ju_AbstractList$1_next = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$modCount3;
    var$2 = $this.$this$05;
    if (var$1 < var$2.$modCount) {
        var$2 = new ju_ConcurrentModificationException;
        jl_Exception__init_(var$2);
        $rt_throw(var$2);
    }
    var$3 = $this.$index1;
    $this.$removeIndex = var$3;
    $this.$index1 = var$3 + 1 | 0;
    return var$2.$get(var$3);
},
ju_Map$Entry = $rt_classWithoutFields(0);
function ju_MapEntry() {
    let a = this; jl_Object.call(a);
    a.$key0 = null;
    a.$value0 = null;
}
let ju_MapEntry__init_ = ($this, $theKey, $theValue) => {
    $this.$key0 = $theKey;
    $this.$value0 = $theValue;
},
ju_MapEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_MapEntry();
    ju_MapEntry__init_(var_2, var_0, var_1);
    return var_2;
};
function ju_HashMap$HashEntry() {
    let a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next3 = null;
}
let ju_HashMap$HashEntry__init_ = ($this, $theKey, $hash) => {
    ju_MapEntry__init_($this, $theKey, null);
    $this.$origKeyHash = $hash;
},
ju_HashMap$HashEntry__init_0 = (var_0, var_1) => {
    let var_2 = new ju_HashMap$HashEntry();
    ju_HashMap$HashEntry__init_(var_2, var_0, var_1);
    return var_2;
},
ju_SequencedMap = $rt_classWithoutFields(0);
function ju_LinkedHashMap() {
    let a = this; ju_HashMap.call(a);
    a.$accessOrder = 0;
    a.$head = null;
    a.$tail = null;
}
let ju_LinkedHashMap_newElementArray = ($this, $s) => {
    return $rt_createArray(ju_LinkedHashMap$LinkedHashMapEntry, $s);
},
ju_LinkedHashMap_put = ($this, $key, $value) => {
    let var$3, $oldSize, var$5, var$6, var$7, var$8, var$9, $existing, var$11;
    var$3 = $this;
    $oldSize = var$3.$elementCount;
    var$5 = $this.$accessOrder;
    if (!$this.$elementCount) {
        $this.$head = null;
        $this.$tail = null;
    }
    var$6 = ju_Objects_hashCode($key);
    var$7 = var$6 & 2147483647;
    var$8 = var$7 % $this.$elementData.data.length | 0;
    var$9 = $key === null ? ju_HashMap_findNullKeyEntry($this) : ju_HashMap_findNonNullKeyEntry($this, $key, var$8, var$6);
    if (var$9 === null) {
        $this.$modCount0 = $this.$modCount0 + 1 | 0;
        var$5 = $this.$elementCount + 1 | 0;
        $this.$elementCount = var$5;
        if (var$5 > $this.$threshold) {
            ju_HashMap_rehash(var$3);
            var$8 = var$7 % $this.$elementData.data.length | 0;
        }
        $existing = new ju_LinkedHashMap$LinkedHashMapEntry;
        ju_HashMap$HashEntry__init_($existing, $key, var$6);
        $existing.$chainForward = null;
        $existing.$chainBackward = null;
        var$11 = $this.$elementData.data;
        $existing.$next3 = var$11[var$8];
        var$11[var$8] = $existing;
        $key = $this.$tail;
        if ($key === null)
            $this.$head = $existing;
        else
            $key.$chainForward = $existing;
        $existing.$chainBackward = $key;
        $this.$tail = $existing;
        var$9 = $existing;
    } else if (var$5) {
        $key = var$9.$chainForward;
        if ($key !== null) {
            $existing = var$9.$chainBackward;
            if ($existing === null)
                $this.$head = $key;
            else
                $existing.$chainForward = $key;
            $key.$chainBackward = $existing;
            $key = $this.$tail;
            if ($key !== null)
                $key.$chainForward = var$9;
            var$9.$chainBackward = $key;
            var$9.$chainForward = null;
            $this.$tail = var$9;
        }
    }
    $existing = var$9.$value0;
    var$9.$value0 = $value;
    return $existing;
},
ju_LinkedHashMap_keySet = $this => {
    let var$1;
    if ($this.$cachedKeySet === null) {
        var$1 = new ju_LinkedHashMapKeySet;
        var$1.$base0 = $this;
        var$1.$reversed = 0;
        $this.$cachedKeySet = var$1;
    }
    return $this.$cachedKeySet;
},
ju_LinkedHashMap_remove = ($this, $key) => {
    let $m;
    $m = ju_HashMap_removeByKey($this, $key);
    if ($m === null)
        return null;
    ju_LinkedHashMap_unlinkEntry($this, $m);
    return $m.$value0;
},
ju_LinkedHashMap_removeLinkedEntry = ($this, $entry) => {
    let var$2, var$3, var$4, var$5, var$6;
    var$2 = $entry.$origKeyHash;
    var$3 = $this.$elementData.data;
    var$4 = var$2 & (var$3.length - 1 | 0);
    var$5 = var$3[var$4];
    if (var$5 === $entry)
        var$3[var$4] = $entry.$next3;
    else {
        while (true) {
            var$6 = var$5.$next3;
            if (var$6 === $entry)
                break;
            var$5 = var$6;
        }
        var$5.$next3 = $entry.$next3;
    }
    $this.$modCount0 = $this.$modCount0 + 1 | 0;
    $this.$elementCount = $this.$elementCount - 1 | 0;
    ju_LinkedHashMap_unlinkEntry($this, $entry);
},
ju_LinkedHashMap_unlinkEntry = ($this, $entry) => {
    let $p, $n;
    $p = $entry.$chainBackward;
    $n = $entry.$chainForward;
    if ($p !== null) {
        $p.$chainForward = $n;
        if ($n === null)
            $this.$tail = $p;
        else
            $n.$chainBackward = $p;
    } else {
        $this.$head = $n;
        if ($n === null)
            $this.$tail = null;
        else
            $n.$chainBackward = null;
    }
},
jur_IntArrHash = $rt_classWithoutFields(),
dba_SpecialOperations = $rt_classWithoutFields(),
dba_SpecialOperations_reverse = $a => {
    let $m, $states, $accept, var$5, $t, $r, var$8, $r_0;
    $m = ju_HashMap__init_();
    $states = dba_Automaton_getStates($a);
    $accept = dba_Automaton_getAcceptStates($a);
    var$5 = $states;
    $t = ju_HashSet_iterator(var$5);
    while ($t.$hasNext()) {
        $r = $t.$next0();
        ju_HashMap_put($m, $r, ju_HashSet__init_());
        $r.$accept = 0;
    }
    var$8 = ju_HashSet_iterator(var$5);
    while (var$8.$hasNext()) {
        $r = var$8.$next0();
        $states = ju_HashSet_iterator($r.$transitions);
        while ($states.$hasNext()) {
            $t = $states.$next0();
            ju_HashSet_add(ju_HashMap_get($m, $t.$to), dba_Transition__init_($t.$min0, $t.$max0, $r));
        }
    }
    $r = ju_HashSet_iterator(var$5);
    while ($r.$hasNext()) {
        $r_0 = $r.$next0();
        $r_0.$transitions = ju_HashMap_get($m, $r_0);
    }
    $a.$initial.$accept = 1;
    $a.$initial = dba_State__init_();
    $m = ju_HashSet_iterator($accept);
    while ($m.$hasNext()) {
        $r = $m.$next0();
        dba_State_addEpsilon($a.$initial, $r);
    }
    $a.$deterministic = 0;
    return $accept;
};
function dba_MinimizationOperations$StateList() {
    let a = this; jl_Object.call(a);
    a.$size2 = 0;
    a.$first1 = null;
    a.$last = null;
}
let dba_MinimizationOperations$StateList__init_ = $this => {
    return;
},
dba_MinimizationOperations$StateList__init_0 = () => {
    let var_0 = new dba_MinimizationOperations$StateList();
    dba_MinimizationOperations$StateList__init_(var_0);
    return var_0;
},
dba_MinimizationOperations$StateList_add = ($this, $q) => {
    let var$2, var$3;
    var$2 = new dba_MinimizationOperations$StateListNode;
    var$2.$q = $q;
    var$2.$sl = $this;
    var$3 = $this.$size2;
    $this.$size2 = var$3 + 1 | 0;
    if (!var$3) {
        $this.$last = var$2;
        $this.$first1 = var$2;
    } else {
        $q = $this.$last;
        $q.$next5 = var$2;
        var$2.$prev = $q;
        $this.$last = var$2;
    }
    return var$2;
};
function dba_MinimizationOperations$StateListNode() {
    let a = this; jl_Object.call(a);
    a.$q = null;
    a.$next5 = null;
    a.$prev = null;
    a.$sl = null;
}
let dba_MinimizationOperations$StateListNode_remove = $this => {
    let var$1;
    var$1 = $this.$sl;
    var$1.$size2 = var$1.$size2 - 1 | 0;
    if (var$1.$first1 === $this)
        var$1.$first1 = $this.$next5;
    else
        $this.$prev.$next5 = $this.$next5;
    if (var$1.$last === $this)
        var$1.$last = $this.$prev;
    else
        $this.$next5.$prev = $this.$prev;
};
function dba_MinimizationOperations$IntPair() {
    let a = this; jl_Object.call(a);
    a.$n1 = 0;
    a.$n2 = 0;
}
let dba_MinimizationOperations$IntPair__init_0 = ($this, $n1, $n2) => {
    $this.$n1 = $n1;
    $this.$n2 = $n2;
},
dba_MinimizationOperations$IntPair__init_ = (var_0, var_1) => {
    let var_2 = new dba_MinimizationOperations$IntPair();
    dba_MinimizationOperations$IntPair__init_0(var_2, var_0, var_1);
    return var_2;
};
function dba_MinimizationOperations$Partition() {
    let a = this; jl_Object.call(a);
    a.$markedElementCount = null;
    a.$touchedSets = null;
    a.$touchedSetCount = 0;
    a.$setCount = 0;
    a.$elements = null;
    a.$locations = null;
    a.$setNo = null;
    a.$first0 = null;
    a.$past = null;
}
let dba_MinimizationOperations$Partition__init_0 = ($this, $size) => {
    let $i, var$3;
    $this.$setCount = $size ? 1 : 0;
    $this.$elements = $rt_createArray(jl_Integer, $size);
    $this.$locations = $rt_createIntArray($size);
    $this.$setNo = $rt_createIntArray($size);
    $this.$first0 = $rt_createIntArray($size);
    $this.$past = $rt_createIntArray($size);
    $this.$markedElementCount = $rt_createIntArray($size);
    $this.$touchedSets = $rt_createIntArray($size);
    $i = 0;
    while ($i < $size) {
        var$3 = $this.$elements.data;
        $this.$locations.data[$i] = $i;
        var$3[$i] = jl_Integer_valueOf($i);
        $this.$setNo.data[$i] = 0;
        $i = $i + 1 | 0;
    }
    if ($this.$setCount) {
        $this.$first0.data[0] = 0;
        $this.$past.data[0] = $size;
    }
},
dba_MinimizationOperations$Partition__init_ = var_0 => {
    let var_1 = new dba_MinimizationOperations$Partition();
    dba_MinimizationOperations$Partition__init_0(var_1, var_0);
    return var_1;
},
dba_MinimizationOperations$Partition_mark = ($this, $e) => {
    let $s, var$3, $i, $j, var$6, var$7;
    $s = $this.$setNo.data[$e];
    var$3 = $this.$locations.data;
    $i = var$3[$e];
    $j = $this.$first0.data[$s] + $this.$markedElementCount.data[$s] | 0;
    var$6 = $this.$elements.data;
    var$6[$i] = var$6[$j];
    var$3[var$6[$i].$value] = $i;
    var$6[$j] = jl_Integer_valueOf($e);
    $this.$locations.data[$e] = $j;
    var$3 = $this.$markedElementCount.data;
    var$7 = var$3[$s];
    var$3[$s] = var$7 + 1 | 0;
    if (!var$7) {
        var$3 = $this.$touchedSets.data;
        $e = $this.$touchedSetCount;
        $this.$touchedSetCount = $e + 1 | 0;
        var$3[$e] = $s;
    }
},
dba_MinimizationOperations$Partition_split = $this => {
    let $s, var$2, $i, var$4, $j, var$6, var$7;
    while (true) {
        $s = $this.$touchedSetCount;
        if ($s <= 0)
            break;
        var$2 = $this.$touchedSets.data;
        $i = $s - 1 | 0;
        $this.$touchedSetCount = $i;
        $s = var$2[$i];
        var$2 = $this.$first0.data;
        $i = var$2[$s];
        var$4 = $this.$markedElementCount.data;
        $j = $i + var$4[$s] | 0;
        var$6 = $this.$past.data;
        if ($j == var$6[$s]) {
            var$4[$s] = 0;
            continue;
        }
        if (var$4[$s] > (var$6[$s] - $j | 0)) {
            $i = $this.$setCount;
            var$6[$i] = var$6[$s];
            var$6[$s] = $j;
            var$2[$i] = $j;
        } else {
            $i = $this.$setCount;
            var$2[$i] = var$2[$s];
            var$2[$s] = $j;
            var$6[$i] = $j;
        }
        var$7 = $this.$setCount;
        $i = var$2[var$7];
        while ($i < var$6[var$7]) {
            $this.$setNo.data[$this.$elements.data[$i].$value] = var$7;
            $i = $i + 1 | 0;
        }
        $this.$setCount = var$7 + 1 | 0;
        var$4[var$7] = 0;
        var$4[$s] = 0;
    }
};
function dba_MinimizationOperations$LabelComparator() {
    jl_Object.call(this);
    this.$labels = null;
}
let dba_MinimizationOperations$LabelComparator_compare = ($this, var$1, var$2) => {
    let var$3, var$4;
    var$1 = var$1;
    var$2 = var$2;
    var$3 = $this.$labels.data;
    var$1 = var$3[var$1.$value];
    var$2 = var$3[var$2.$value];
    var$4 = $rt_compare(var$1.$n1, var$2.$n1);
    if (var$4 < 0)
        var$4 = (-1);
    else if (var$4 > 0)
        var$4 = 1;
    else {
        var$4 = $rt_compare(var$1.$n2, var$2.$n2);
        var$4 = var$4 < 0 ? (-1) : var$4 <= 0 ? 0 : 1;
    }
    return var$4;
};
function ju_LinkedList$Entry() {
    let a = this; jl_Object.call(a);
    a.$item = null;
    a.$next4 = null;
    a.$previous = null;
}
let ju_SortedSet = $rt_classWithoutFields(0),
ju_NavigableSet = $rt_classWithoutFields(0);
function ju_TreeSet() {
    ju_AbstractSet.call(this);
    this.$map = null;
}
let ju_TreeSet_VALUE = null,
ju_TreeSet_iterator = $this => {
    return (ju_AbstractMap_keySet($this.$map)).$iterator();
},
ju_TreeSet_add = ($this, $e) => {
    return ju_TreeMap_put($this.$map, $e, $e) === ju_TreeSet_VALUE ? 0 : 1;
},
ju_TreeSet__clinit_ = () => {
    ju_TreeSet_VALUE = new jl_Object;
},
ju_Comparator$NaturalOrder = $rt_classWithoutFields(),
ju_Comparator$NaturalOrder_INSTANCE = null,
ju_Comparator$NaturalOrder_compare = ($this, $o1, $o2) => {
    return $o1.$compareTo($o2);
},
ju_Comparator$NaturalOrder__clinit_ = () => {
    ju_Comparator$NaturalOrder_INSTANCE = new ju_Comparator$NaturalOrder;
},
ju_SortedMap = $rt_classWithoutFields(0),
ju_NavigableMap = $rt_classWithoutFields(0);
function ju_TreeMap() {
    let a = this; ju_AbstractMap.call(a);
    a.$root = null;
    a.$comparator = null;
    a.$originalComparator = null;
    a.$revertedComparator = null;
    a.$modCount1 = 0;
    a.$cachedEntrySet = null;
}
let ju_TreeMap__init_ = ($this, $comparator) => {
    $this.$originalComparator = $comparator;
    if ($comparator === null)
        $comparator = ju_Comparator$NaturalOrder_INSTANCE;
    $this.$comparator = $comparator;
},
ju_TreeMap__init_0 = var_0 => {
    let var_1 = new ju_TreeMap();
    ju_TreeMap__init_(var_1, var_0);
    return var_1;
},
ju_TreeMap_put = ($this, $key, $value) => {
    let $old;
    $this.$root = ju_TreeMap_getOrCreateNode($this, $this.$root, $key);
    $key = ju_TreeMap_findExact($this, $key);
    $old = ju_AbstractMap$SimpleEntry_setValue($key, $value);
    ju_AbstractMap$SimpleEntry_setValue($key, $value);
    $this.$modCount1 = $this.$modCount1 + 1 | 0;
    return $old;
},
ju_TreeMap_findExact = ($this, $key) => {
    let $node, $cmp;
    $node = $this.$root;
    $this.$comparator.$compare($key, $key);
    while (true) {
        if ($node === null)
            return null;
        $cmp = $this.$comparator.$compare($key, $node.$key);
        if (!$cmp)
            break;
        $node = $cmp >= 0 ? $node.$right : $node.$left;
    }
    return $node;
},
ju_TreeMap_pathToExactOrNext = ($this, $key, $reverse) => {
    let $path, var$4, $depth, $node, $cmp;
    $path = $rt_createArray(ju_TreeMap$TreeNode, ju_TreeMap_height($this));
    var$4 = $path.data;
    $depth = 0;
    $node = $this.$root;
    a: {
        while ($node !== null) {
            $cmp = $this.$comparator.$compare($key, $node.$key);
            if ($reverse)
                $cmp =  -$cmp | 0;
            if (!$cmp) {
                $reverse = $depth + 1 | 0;
                var$4[$depth] = $node;
                break a;
            }
            if ($cmp >= 0)
                $node = ju_TreeMap$TreeNode_down($node, $reverse);
            else {
                $cmp = $depth + 1 | 0;
                var$4[$depth] = $node;
                $node = ju_TreeMap$TreeNode_forward($node, $reverse);
                $depth = $cmp;
            }
        }
        $reverse = $depth;
    }
    return ju_Arrays_copyOf($path, $reverse);
},
ju_TreeMap_pathToNext = ($this, $key, $reverse) => {
    let $path, var$4, $depth, $node, $cmp;
    $path = $rt_createArray(ju_TreeMap$TreeNode, ju_TreeMap_height($this));
    var$4 = $path.data;
    $depth = 0;
    $node = $this.$root;
    while ($node !== null) {
        $cmp = $this.$comparator.$compare($key, $node.$key);
        if ($reverse)
            $cmp =  -$cmp | 0;
        if ($cmp >= 0)
            $node = ju_TreeMap$TreeNode_down($node, $reverse);
        else {
            $cmp = $depth + 1 | 0;
            var$4[$depth] = $node;
            $node = ju_TreeMap$TreeNode_forward($node, $reverse);
            $depth = $cmp;
        }
    }
    return ju_Arrays_copyOf($path, $depth);
},
ju_TreeMap_pathToFirst = ($this, $reverse) => {
    let $path, var$3, $depth, $node, var$6;
    $path = $rt_createArray(ju_TreeMap$TreeNode, ju_TreeMap_height($this));
    var$3 = $path.data;
    $depth = 0;
    $node = $this.$root;
    while ($node !== null) {
        var$6 = $depth + 1 | 0;
        var$3[$depth] = $node;
        $node = ju_TreeMap$TreeNode_forward($node, $reverse);
        $depth = var$6;
    }
    return ju_Arrays_copyOf($path, $depth);
},
ju_TreeMap_getOrCreateNode = ($this, $root, $key) => {
    let var$3, $cmp;
    if ($root === null) {
        $root = new ju_TreeMap$TreeNode;
        var$3 = null;
        $root.$key = $key;
        $root.$value2 = var$3;
        $root.$height0 = 1;
        $root.$size3 = 1;
        return $root;
    }
    $cmp = $this.$comparator.$compare($key, $root.$key);
    if (!$cmp)
        return $root;
    if ($cmp >= 0)
        $root.$right = ju_TreeMap_getOrCreateNode($this, $root.$right, $key);
    else
        $root.$left = ju_TreeMap_getOrCreateNode($this, $root.$left, $key);
    ju_TreeMap$TreeNode_fix($root);
    return ju_TreeMap$TreeNode_balance($root);
},
ju_TreeMap_deleteNode = ($this, $root, $key) => {
    let $cmp, $right, $left, $pathToMin, $minDepth, $minDepth_0, $node;
    if ($root === null)
        return null;
    $cmp = $this.$comparator.$compare($key, $root.$key);
    if ($cmp < 0)
        $root.$left = ju_TreeMap_deleteNode($this, $root.$left, $key);
    else if ($cmp > 0)
        $root.$right = ju_TreeMap_deleteNode($this, $root.$right, $key);
    else {
        $right = $root.$right;
        if ($right === null)
            return $root.$left;
        $left = $root.$left;
        $pathToMin = $rt_createArray(ju_TreeMap$TreeNode, $right.$height0).data;
        $minDepth = 0;
        while (true) {
            $root = $right.$left;
            if ($root === null)
                break;
            $minDepth_0 = $minDepth + 1 | 0;
            $pathToMin[$minDepth] = $right;
            $minDepth = $minDepth_0;
            $right = $root;
        }
        $root = $right.$right;
        while ($minDepth > 0) {
            $minDepth = $minDepth + (-1) | 0;
            $node = $pathToMin[$minDepth];
            $node.$left = $root;
            ju_TreeMap$TreeNode_fix($node);
            $root = ju_TreeMap$TreeNode_balance($node);
        }
        $right.$right = $root;
        $right.$left = $left;
        ju_TreeMap$TreeNode_fix($right);
        $root = $right;
    }
    ju_TreeMap$TreeNode_fix($root);
    return ju_TreeMap$TreeNode_balance($root);
},
ju_TreeMap_entrySet = $this => {
    if ($this.$cachedEntrySet === null)
        $this.$cachedEntrySet = ju_TreeMap$EntrySet__init_($this, null, 1, 0, null, 1, 0, 0);
    return $this.$cachedEntrySet;
},
ju_TreeMap_height = $this => {
    let var$1;
    var$1 = $this.$root;
    return var$1 === null ? 0 : var$1.$height0;
};
function ju_LinkedHashMap$LinkedHashMapEntry() {
    let a = this; ju_HashMap$HashEntry.call(a);
    a.$chainForward = null;
    a.$chainBackward = null;
}
function jl_Boolean() {
    jl_Object.call(this);
    this.$value3 = 0;
}
let jl_Boolean_TRUE = null,
jl_Boolean_FALSE = null,
jl_Boolean_TYPE = null,
jl_Boolean__init_0 = ($this, $value) => {
    $this.$value3 = $value;
},
jl_Boolean__init_ = var_0 => {
    let var_1 = new jl_Boolean();
    jl_Boolean__init_0(var_1, var_0);
    return var_1;
},
jl_Boolean__clinit_ = () => {
    jl_Boolean_TRUE = jl_Boolean__init_(1);
    jl_Boolean_FALSE = jl_Boolean__init_(0);
    jl_Boolean_TYPE = $rt_cls($rt_booleancls);
},
ju_ConcurrentModificationException = $rt_classWithoutFields(jl_RuntimeException);
function ju_AbstractMap$SimpleEntry() {
    let a = this; jl_Object.call(a);
    a.$key = null;
    a.$value2 = null;
}
let ju_AbstractMap$SimpleEntry_setValue = ($this, $value) => {
    let $old;
    $old = $this.$value2;
    $this.$value2 = $value;
    return $old;
},
ju_AbstractMap$SimpleEntry_equals = ($this, $obj) => {
    let $entry;
    if ($this === $obj)
        return 1;
    if (!$rt_isInstance($obj, ju_Map$Entry))
        return 0;
    $entry = $obj;
    $obj = $this.$key;
    $entry = $entry;
    return ju_Objects_equals($obj, $entry.$key) && ju_Objects_equals($this.$value2, $entry.$value2) ? 1 : 0;
},
ju_AbstractMap$SimpleEntry_hashCode = $this => {
    return ju_Objects_hashCode($this.$key) ^ ju_Objects_hashCode($this.$value2);
};
function ju_TreeMap$TreeNode() {
    let a = this; ju_AbstractMap$SimpleEntry.call(a);
    a.$left = null;
    a.$right = null;
    a.$height0 = 0;
    a.$size3 = 0;
}
let ju_TreeMap$TreeNode_balance = $this => {
    let $factor;
    $factor = ju_TreeMap$TreeNode_factor($this);
    if ($factor == 2) {
        if (ju_TreeMap$TreeNode_factor($this.$right) < 0)
            $this.$right = ju_TreeMap$TreeNode_rotateRight($this.$right);
        return ju_TreeMap$TreeNode_rotateLeft($this);
    }
    if ($factor != (-2))
        return $this;
    if (ju_TreeMap$TreeNode_factor($this.$left) > 0)
        $this.$left = ju_TreeMap$TreeNode_rotateLeft($this.$left);
    return ju_TreeMap$TreeNode_rotateRight($this);
},
ju_TreeMap$TreeNode_factor = $this => {
    let var$1, var$2;
    var$1 = $this.$right;
    var$2 = var$1 === null ? 0 : var$1.$height0;
    var$1 = $this.$left;
    return var$2 - (var$1 === null ? 0 : var$1.$height0) | 0;
},
ju_TreeMap$TreeNode_rotateRight = $this => {
    let $left;
    $left = $this.$left;
    $this.$left = $left.$right;
    $left.$right = $this;
    ju_TreeMap$TreeNode_fix($this);
    ju_TreeMap$TreeNode_fix($left);
    return $left;
},
ju_TreeMap$TreeNode_rotateLeft = $this => {
    let $right;
    $right = $this.$right;
    $this.$right = $right.$left;
    $right.$left = $this;
    ju_TreeMap$TreeNode_fix($this);
    ju_TreeMap$TreeNode_fix($right);
    return $right;
},
ju_TreeMap$TreeNode_fix = $this => {
    let var$1, var$2, var$3;
    var$1 = $this.$right;
    var$2 = var$1 === null ? 0 : var$1.$height0;
    var$1 = $this.$left;
    var$3 = var$1 === null ? 0 : var$1.$height0;
    $this.$height0 = jl_Math_max(var$2, var$3) + 1 | 0;
    $this.$size3 = 1;
    var$1 = $this.$left;
    if (var$1 !== null)
        $this.$size3 = 1 + var$1.$size3 | 0;
    var$1 = $this.$right;
    if (var$1 !== null)
        $this.$size3 = $this.$size3 + var$1.$size3 | 0;
},
ju_TreeMap$TreeNode_forward = ($this, $reverse) => {
    return $reverse ? $this.$right : $this.$left;
},
ju_TreeMap$TreeNode_down = ($this, $reverse) => {
    return $reverse ? $this.$left : $this.$right;
},
ju_Dictionary = $rt_classWithoutFields();
function ju_Hashtable() {
    let a = this; ju_Dictionary.call(a);
    a.$elementCount0 = 0;
    a.$elementData0 = null;
    a.$loadFactor = 0.0;
    a.$threshold0 = 0;
    a.$firstSlot = 0;
    a.$lastSlot = 0;
    a.$modCount4 = 0;
}
let ju_Hashtable_EMPTY_ENUMERATION = null,
ju_Hashtable_EMPTY_ITERATOR = null,
ju_Hashtable__init_ = $this => {
    let var$1, var$2;
    $this.$lastSlot = (-1);
    $this.$elementCount0 = 0;
    var$1 = $rt_createArray(ju_Hashtable$Entry, 11);
    var$2 = var$1.data;
    $this.$elementData0 = var$1;
    $this.$firstSlot = var$2.length;
    $this.$loadFactor = 0.75;
    ju_Hashtable_computeMaxSize($this);
},
ju_Hashtable__init_0 = () => {
    let var_0 = new ju_Hashtable();
    ju_Hashtable__init_(var_0);
    return var_0;
},
ju_Hashtable_computeMaxSize = $this => {
    $this.$threshold0 = $this.$elementData0.data.length * $this.$loadFactor | 0;
},
ju_Hashtable_get = ($this, $key) => {
    let $hash, $index, var$4, $entry;
    jl_Object_monitorEnterSync($this);
    try {
        $hash = jl_String_hashCode($key);
        $index = $hash & 2147483647;
        var$4 = $this.$elementData0.data;
        $entry = var$4[$index % var$4.length | 0];
        while ($entry !== null) {
            if (ju_Hashtable$Entry_equalsKey($entry, $key, $hash))
                return $entry.$value0;
            $entry = $entry.$next6;
        }
        return null;
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Hashtable_put = ($this, $key, $value) => {
    let $result, $hash, var$5, var$6, $index, $entry, var$9, var$10, var$11, var$12, var$13, var$14;
    jl_Object_monitorEnterSync($this);
    try {
        if ($key !== null && $value !== null) {
            $result = $key;
            $hash = jl_String_hashCode($result);
            var$5 = $hash & 2147483647;
            var$6 = $this.$elementData0.data;
            $index = var$5 % var$6.length | 0;
            $entry = var$6[$index];
            while ($entry !== null && !ju_Hashtable$Entry_equalsKey($entry, $key, $hash)) {
                $entry = $entry.$next6;
            }
            if ($entry !== null) {
                $result = $entry.$value0;
                $entry.$value0 = $value;
                return $result;
            }
            $this.$modCount4 = $this.$modCount4 + 1 | 0;
            var$9 = $this.$elementCount0 + 1 | 0;
            $this.$elementCount0 = var$9;
            if (var$9 > $this.$threshold0) {
                var$9 = ($this.$elementData0.data.length << 1) + 1 | 0;
                if (!var$9)
                    var$9 = 1;
                $hash = (-1);
                var$10 = $rt_createArray(ju_Hashtable$Entry, var$9);
                var$11 = var$10.data;
                var$12 = $this.$lastSlot + 1 | 0;
                var$13 = var$9;
                while (true) {
                    var$12 = var$12 + (-1) | 0;
                    if (var$12 < $this.$firstSlot)
                        break;
                    $entry = $this.$elementData0.data[var$12];
                    while ($entry !== null) {
                        $index = ($entry.$key0.$hashCode() & 2147483647) % var$9 | 0;
                        if ($index < var$13)
                            var$13 = $index;
                        if ($index > $hash)
                            $hash = $index;
                        var$14 = $entry.$next6;
                        $entry.$next6 = var$11[$index];
                        var$11[$index] = $entry;
                        $entry = var$14;
                    }
                }
                $this.$firstSlot = var$13;
                $this.$lastSlot = $hash;
                $this.$elementData0 = var$10;
                ju_Hashtable_computeMaxSize($this);
                $index = var$5 % $this.$elementData0.data.length | 0;
            }
            if ($index < $this.$firstSlot)
                $this.$firstSlot = $index;
            if ($index > $this.$lastSlot)
                $this.$lastSlot = $index;
            $entry = new ju_Hashtable$Entry;
            ju_MapEntry__init_($entry, $key, $value);
            $entry.$hashcode = jl_String_hashCode($result);
            var$6 = $this.$elementData0.data;
            $entry.$next6 = var$6[$index];
            var$6[$index] = $entry;
            return null;
        }
        $key = new jl_NullPointerException;
        jl_Exception__init_($key);
        $rt_throw($key);
    } finally {
        jl_Object_monitorExitSync($this);
    }
},
ju_Hashtable__clinit_ = () => {
    ju_Hashtable_EMPTY_ENUMERATION = new ju_Hashtable$1;
    ju_Hashtable_EMPTY_ITERATOR = new ju_Hashtable$2;
};
function ju_Properties() {
    ju_Hashtable.call(this);
    this.$defaults = null;
}
let ju_Properties_getProperty = ($this, $name) => {
    let $result, $property;
    $result = ju_Hashtable_get($this, $name);
    $property = !($result instanceof jl_String) ? null : $result;
    if ($property === null) {
        $result = $this.$defaults;
        if ($result !== null)
            $property = ju_Properties_getProperty($result, $name);
    }
    return $property;
},
ju_Enumeration = $rt_classWithoutFields(0),
ju_Hashtable$1 = $rt_classWithoutFields(),
ju_Hashtable$2 = $rt_classWithoutFields();
function ju_Hashtable$Entry() {
    let a = this; ju_MapEntry.call(a);
    a.$next6 = null;
    a.$hashcode = 0;
}
let ju_Hashtable$Entry_equalsKey = ($this, $aKey, $hash) => {
    return $this.$hashcode == jl_String_hashCode($aKey) && $this.$key0.$equals($aKey) ? 1 : 0;
};
function ju_HashMap$1() {
    ju_AbstractSet.call(this);
    this.$this$06 = null;
}
let ju_HashMap$1_iterator = $this => {
    let var$1, var$2;
    var$1 = new ju_HashMap$KeyIterator;
    var$2 = $this.$this$06;
    var$1.$associatedMap = var$2;
    var$1.$expectedModCount = var$2.$modCount0;
    var$1.$futureEntry = null;
    return var$1;
},
ju_NoSuchElementException = $rt_classWithoutFields(jl_RuntimeException);
function dba_TransitionComparator() {
    jl_Object.call(this);
    this.$to_first = 0;
}
let dba_TransitionComparator_compare = ($this, var$1, var$2) => {
    let var$3, var$4, var$5, var$6;
    a: {
        var$1 = var$1;
        var$2 = var$2;
        var$3 = $this.$to_first;
        if (var$3) {
            var$4 = var$1.$to;
            var$5 = var$2.$to;
            if (var$4 !== var$5) {
                if (var$4 === null) {
                    var$3 = (-1);
                    break a;
                }
                if (var$5 === null) {
                    var$3 = 1;
                    break a;
                }
                var$6 = $rt_compare(var$4.$number, var$5.$number);
                if (var$6 < 0) {
                    var$3 = (-1);
                    break a;
                }
                if (var$6 > 0) {
                    var$3 = 1;
                    break a;
                }
            }
        }
        var$6 = $rt_compare(var$1.$min0, var$2.$min0);
        if (var$6 < 0)
            var$3 = (-1);
        else if (var$6 > 0)
            var$3 = 1;
        else {
            var$6 = $rt_compare(var$1.$max0, var$2.$max0);
            if (var$6 > 0)
                var$3 = (-1);
            else if (var$6 < 0)
                var$3 = 1;
            else {
                if (!var$3) {
                    var$1 = var$1.$to;
                    var$2 = var$2.$to;
                    if (var$1 !== var$2) {
                        if (var$1 === null) {
                            var$3 = (-1);
                            break a;
                        }
                        if (var$2 === null) {
                            var$3 = 1;
                            break a;
                        }
                        var$3 = $rt_compare(var$1.$number, var$2.$number);
                        if (var$3 < 0) {
                            var$3 = (-1);
                            break a;
                        }
                        if (var$3 > 0) {
                            var$3 = 1;
                            break a;
                        }
                    }
                }
                var$3 = 0;
            }
        }
    }
    return var$3;
};
function ju_TreeMap$MapView() {
    let a = this; ju_AbstractMap.call(a);
    a.$owner1 = null;
    a.$from1 = null;
    a.$fromIncluded = 0;
    a.$fromChecked0 = 0;
    a.$to2 = null;
    a.$toIncluded0 = 0;
    a.$toChecked = 0;
    a.$entrySetCache = null;
    a.$reverse1 = 0;
    a.$cachedNavigableKeySet = null;
}
let ju_TreeMap$MapView__init_0 = ($this, $owner, $from, $fromIncluded, $fromChecked, $to, $toIncluded, $toChecked, $reverse) => {
    if (!$fromChecked) {
        if ($toChecked)
            $owner.$comparator.$compare($to, $to);
    } else if (!$toChecked)
        $owner.$comparator.$compare($from, $from);
    else if ($owner.$comparator.$compare($from, $to) > 0) {
        $owner = new jl_IllegalArgumentException;
        jl_Exception__init_($owner);
        $rt_throw($owner);
    }
    $this.$owner1 = $owner;
    $this.$from1 = $from;
    $this.$fromIncluded = $fromIncluded;
    $this.$fromChecked0 = $fromChecked;
    $this.$to2 = $to;
    $this.$toIncluded0 = $toIncluded;
    $this.$toChecked = $toChecked;
    $this.$reverse1 = $reverse;
    if ($reverse && $owner.$revertedComparator === null) {
        $from = new ju_TreeMap$ensureRevertedComparator$lambda$_5_0;
        $from.$_0 = $owner;
        $owner.$revertedComparator = $from;
    }
},
ju_TreeMap$MapView__init_ = (var_0, var_1, var_2, var_3, var_4, var_5, var_6, var_7) => {
    let var_8 = new ju_TreeMap$MapView();
    ju_TreeMap$MapView__init_0(var_8, var_0, var_1, var_2, var_3, var_4, var_5, var_6, var_7);
    return var_8;
},
ju_TreeMap$MapView_entrySet = $this => {
    if ($this.$entrySetCache === null)
        $this.$entrySetCache = ju_TreeMap$EntrySet__init_($this.$owner1, $this.$from1, $this.$fromIncluded, $this.$fromChecked0, $this.$to2, $this.$toIncluded0, $this.$toChecked, $this.$reverse1);
    return $this.$entrySetCache;
},
ju_TreeMap$MapView_navigableKeySet = $this => {
    let var$1;
    if ($this.$cachedNavigableKeySet === null) {
        var$1 = new ju_TreeMap$NavigableKeySet;
        var$1.$map0 = $this;
        $this.$cachedNavigableKeySet = var$1;
    }
    return $this.$cachedNavigableKeySet;
};
function ju_AbstractMap$KeySet() {
    ju_AbstractSet.call(this);
    this.$this$04 = null;
}
let ju_AbstractMap$KeySet_iterator = $this => {
    let var$1, var$2, $it;
    var$1 = $this.$this$04.$entrySet();
    if (var$1.$reverse2) {
        var$2 = !var$1.$toChecked0 ? ju_TreeMap_pathToFirst(var$1.$owner0, 1) : !var$1.$toIncluded ? ju_TreeMap_pathToNext(var$1.$owner0, var$1.$to0, 1) : ju_TreeMap_pathToExactOrNext(var$1.$owner0, var$1.$to0, 1);
        $it = ju_TreeMap$EntryIterator__init_(var$1.$owner0, var$2, var$1.$from0, var$1.$fromChecked, var$1.$fromIncluded0, 1);
    } else {
        var$2 = !var$1.$fromChecked ? ju_TreeMap_pathToFirst(var$1.$owner0, 0) : !var$1.$fromIncluded0 ? ju_TreeMap_pathToNext(var$1.$owner0, var$1.$from0, 0) : ju_TreeMap_pathToExactOrNext(var$1.$owner0, var$1.$from0, 0);
        $it = ju_TreeMap$EntryIterator__init_(var$1.$owner0, var$2, var$1.$to0, var$1.$toChecked0, var$1.$toIncluded, 0);
    }
    var$1 = new ju_AbstractMap$KeySet$1;
    var$1.$this$1 = $this;
    var$1.$val$it = $it;
    return var$1;
},
jl_Runnable = $rt_classWithoutFields(0);
function jl_Thread() {
    let a = this; jl_Object.call(a);
    a.$id0 = Long_ZERO;
    a.$timeSliceStart = Long_ZERO;
    a.$finishedLock = null;
    a.$name1 = null;
    a.$alive = 0;
    a.$target = null;
}
let jl_Thread_mainThread = null,
jl_Thread_currentThread = null,
jl_Thread_nextId = 0,
jl_Thread_activeCount = 0,
jl_Thread_defaultUncaughtExceptionHandler = null,
jl_Thread_setCurrentThread = $thread_0 => {
    if (jl_Thread_currentThread !== $thread_0)
        jl_Thread_currentThread = $thread_0;
    jl_Thread_currentThread.$timeSliceStart = jl_System_currentTimeMillis();
},
jl_Thread_currentThread0 = () => {
    return jl_Thread_currentThread;
},
jl_Thread__clinit_ = () => {
    let var$1, var$2, var$3;
    var$1 = new jl_Thread;
    var$2 = null;
    var$1.$finishedLock = new jl_Object;
    var$1.$alive = 1;
    var$1.$name1 = $rt_s(279);
    var$1.$target = var$2;
    var$3 = jl_Thread_nextId;
    jl_Thread_nextId = var$3 + 1 | 0;
    var$1.$id0 = Long_fromInt(var$3);
    jl_Thread_mainThread = var$1;
    jl_Thread_currentThread = var$1;
    jl_Thread_nextId = 1;
    jl_Thread_activeCount = 1;
    jl_Thread_defaultUncaughtExceptionHandler = new jl_DefaultUncaughtExceptionHandler;
};
function jl_Object$Monitor() {
    let a = this; jl_Object.call(a);
    a.$enteringThreads = null;
    a.$notifyListeners = null;
    a.$owner = null;
    a.$count = 0;
}
let jl_IllegalMonitorStateException = $rt_classWithoutFields(jl_RuntimeException);
function ju_TreeMap$ensureRevertedComparator$lambda$_5_0() {
    jl_Object.call(this);
    this.$_0 = null;
}
let ju_TreeMap$ensureRevertedComparator$lambda$_5_0_compare = (var$0, var$1, var$2) => {
    return  -ju_TreeMap$ensureRevertedComparator$lambda$_5_0_compare(var$0.$_0.$originalComparator, var$1, var$2) | 0;
},
otp_PlatformQueue = $rt_classWithoutFields(),
otp_PlatformQueue_isEmpty$static = $this => {
    return $this.length ? 0 : 1;
},
otp_PlatformRunnable = $rt_classWithoutFields(0);
function jl_Object$monitorExit$lambda$_8_0() {
    jl_Object.call(this);
    this.$_01 = null;
}
let jl_Thread$UncaughtExceptionHandler = $rt_classWithoutFields(0),
jl_DefaultUncaughtExceptionHandler = $rt_classWithoutFields(),
oti_AsyncCallback = $rt_classWithoutFields(0);
function otpp_AsyncCallbackWrapper() {
    jl_Object.call(this);
    this.$realAsyncCallback = null;
}
let otpp_AsyncCallbackWrapper_create = $realAsyncCallback => {
    let var$2;
    var$2 = new otpp_AsyncCallbackWrapper;
    var$2.$realAsyncCallback = $realAsyncCallback;
    return var$2;
},
otpp_AsyncCallbackWrapper_complete = ($this, $result) => {
    $this.$realAsyncCallback.$complete($result);
},
otpp_AsyncCallbackWrapper_error = ($this, $e) => {
    $this.$realAsyncCallback.$error($e);
};
function jl_Object$monitorEnterWait$lambda$_6_0() {
    let a = this; jl_Object.call(a);
    a.$_00 = null;
    a.$_1 = null;
    a.$_2 = 0;
    a.$_3 = null;
}
function ju_HashMap$AbstractMapIterator() {
    let a = this; jl_Object.call(a);
    a.$position = 0;
    a.$expectedModCount = 0;
    a.$futureEntry = null;
    a.$currentEntry = null;
    a.$prevEntry0 = null;
    a.$associatedMap = null;
}
let ju_HashMap$AbstractMapIterator_hasNext = $this => {
    let var$1, var$2;
    if ($this.$futureEntry !== null)
        return 1;
    while (true) {
        var$1 = $this.$position;
        var$2 = $this.$associatedMap.$elementData.data;
        if (var$1 >= var$2.length)
            break;
        if (var$2[var$1] !== null)
            return 1;
        $this.$position = var$1 + 1 | 0;
    }
    return 0;
},
ju_HashMap$AbstractMapIterator_checkConcurrentMod = $this => {
    let var$1;
    if ($this.$expectedModCount == $this.$associatedMap.$modCount0)
        return;
    var$1 = new ju_ConcurrentModificationException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
},
ju_HashMap$AbstractMapIterator_remove = $this => {
    let var$1, var$2, var$3, var$4, $index;
    ju_HashMap$AbstractMapIterator_checkConcurrentMod($this);
    var$1 = $this.$currentEntry;
    if (var$1 === null) {
        var$1 = new jl_IllegalStateException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$2 = $this.$prevEntry0;
    if (var$2 !== null)
        var$2.$next3 = var$1.$next3;
    else {
        var$3 = var$1.$origKeyHash;
        var$4 = $this.$associatedMap.$elementData.data;
        $index = var$3 & (var$4.length - 1 | 0);
        var$4[$index] = var$4[$index].$next3;
    }
    $this.$currentEntry = null;
    $this.$expectedModCount = $this.$expectedModCount + 1 | 0;
    var$1 = $this.$associatedMap;
    var$1.$modCount0 = var$1.$modCount0 + 1 | 0;
    var$1.$elementCount = var$1.$elementCount - 1 | 0;
},
ju_HashMap$KeyIterator = $rt_classWithoutFields(ju_HashMap$AbstractMapIterator),
ju_HashMap$KeyIterator_next = $this => {
    let var$1, var$2, var$3, var$4;
    ju_HashMap$AbstractMapIterator_checkConcurrentMod($this);
    if (!ju_HashMap$AbstractMapIterator_hasNext($this)) {
        var$1 = new ju_NoSuchElementException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$1 = $this.$futureEntry;
    if (var$1 === null) {
        var$2 = $this.$associatedMap.$elementData.data;
        var$3 = $this.$position;
        $this.$position = var$3 + 1 | 0;
        var$1 = var$2[var$3];
        $this.$currentEntry = var$1;
        $this.$futureEntry = var$1.$next3;
        $this.$prevEntry0 = null;
    } else {
        var$4 = $this.$currentEntry;
        if (var$4 !== null)
            $this.$prevEntry0 = var$4;
        $this.$currentEntry = var$1;
        $this.$futureEntry = var$1.$next3;
    }
    return $this.$currentEntry.$key0;
};
function ju_TreeMap$NavigableKeySet() {
    ju_AbstractSet.call(this);
    this.$map0 = null;
}
function ju_AbstractMap$KeySet$1() {
    let a = this; jl_Object.call(a);
    a.$val$it = null;
    a.$this$1 = null;
}
let ju_AbstractMap$KeySet$1_hasNext = $this => {
    return $this.$val$it.$depth <= 0 ? 0 : 1;
},
ju_AbstractMap$KeySet$1_next = $this => {
    let var$1, var$2, var$3, var$4, var$5;
    var$1 = $this.$val$it;
    if (var$1.$modCount2 != var$1.$owner2.$modCount1) {
        var$1 = new ju_ConcurrentModificationException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$2 = var$1.$depth;
    if (!var$2) {
        var$1 = new ju_NoSuchElementException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    a: {
        var$3 = var$1.$path.data;
        var$4 = var$2 - 1 | 0;
        var$1.$depth = var$4;
        var$5 = var$3[var$4];
        var$1.$last0 = var$5;
        var$5 = ju_TreeMap$TreeNode_down(var$5, var$1.$reverse0);
        if (var$5 !== null)
            while (true) {
                if (var$5 === null)
                    break a;
                var$3 = var$1.$path.data;
                var$2 = var$1.$depth;
                var$1.$depth = var$2 + 1 | 0;
                var$3[var$2] = var$5;
                var$5 = ju_TreeMap$TreeNode_forward(var$5, var$1.$reverse0);
            }
    }
    ju_TreeMap$EntryIterator_checkFinished(var$1);
    return var$1.$last0.$key;
},
ju_AbstractMap$KeySet$1_remove = $this => {
    let var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$1 = $this.$val$it;
    var$2 = var$1.$modCount2;
    var$3 = var$1.$owner2;
    if (var$2 != var$3.$modCount1) {
        var$1 = new ju_ConcurrentModificationException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$4 = var$1.$last0;
    if (var$4 === null) {
        var$1 = new jl_IllegalStateException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$3.$root = ju_TreeMap_deleteNode(var$3, var$3.$root, var$4.$key);
    var$5 = ju_TreeMap_pathToNext(var$1.$owner2, var$1.$last0.$key, var$1.$reverse0);
    var$6 = var$5.data;
    var$7 = var$1.$path;
    var$8 = var$6.length;
    jl_System_fastArraycopy(var$5, 0, var$7, 0, var$8);
    var$1.$depth = var$8;
    var$3 = var$1.$owner2;
    var$2 = var$3.$modCount1 + 1 | 0;
    var$3.$modCount1 = var$2;
    var$1.$modCount2 = var$2;
    var$1.$last0 = null;
},
ju_ListIterator = $rt_classWithoutFields(0);
function ju_LinkedList$SequentialListIterator() {
    let a = this; jl_Object.call(a);
    a.$nextEntry = null;
    a.$prevEntry = null;
    a.$currentEntry1 = null;
    a.$index0 = 0;
    a.$version = 0;
    a.$this$0 = null;
}
let ju_LinkedList$SequentialListIterator__init_0 = ($this, var$1, $nextEntry, $prevEntry, $index) => {
    $this.$this$0 = var$1;
    $this.$version = var$1.$modCount;
    $this.$nextEntry = $nextEntry;
    $this.$prevEntry = $prevEntry;
    $this.$index0 = $index;
},
ju_LinkedList$SequentialListIterator__init_ = (var_0, var_1, var_2, var_3) => {
    let var_4 = new ju_LinkedList$SequentialListIterator();
    ju_LinkedList$SequentialListIterator__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
},
ju_LinkedList$SequentialListIterator_hasNext = $this => {
    return $this.$nextEntry === null ? 0 : 1;
},
ju_LinkedList$SequentialListIterator_next = $this => {
    let var$1, $result;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    var$1 = $this.$nextEntry;
    if (var$1 === null) {
        var$1 = new ju_NoSuchElementException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    $result = var$1.$item;
    $this.$currentEntry1 = var$1;
    $this.$prevEntry = var$1;
    $this.$nextEntry = var$1.$next4;
    $this.$index0 = $this.$index0 + 1 | 0;
    return $result;
},
ju_LinkedList$SequentialListIterator_checkConcurrentModification = $this => {
    let var$1;
    if ($this.$version >= $this.$this$0.$modCount)
        return;
    var$1 = new ju_ConcurrentModificationException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
};
function ju_LinkedHashMapKeySet() {
    let a = this; ju_AbstractSet.call(a);
    a.$base0 = null;
    a.$reversed = 0;
}
let ju_LinkedHashMapKeySet_iterator = $this => {
    let var$1, var$2, var$3;
    var$1 = new ju_LinkedHashMapIterator$KeyIterator;
    var$2 = $this.$base0;
    var$3 = $this.$reversed;
    var$1.$base = var$2;
    var$1.$reversed0 = var$3;
    var$1.$expectedModCount0 = var$2.$modCount0;
    var$1.$futureEntry0 = !var$3 ? var$2.$head : var$2.$tail;
    return var$1;
},
otjc_JSObjects = $rt_classWithoutFields(),
otji_JSWrapper$Helper = $rt_classWithoutFields(),
otji_JSWrapper$Helper_hashCodes = null,
otji_JSWrapper$Helper_wrappers = null,
otji_JSWrapper$Helper_stringWrappers = null,
otji_JSWrapper$Helper_numberWrappers = null,
otji_JSWrapper$Helper_undefinedWrapper = null,
otji_JSWrapper$Helper_stringFinalizationRegistry = null,
otji_JSWrapper$Helper_numberFinalizationRegistry = null,
otji_JSWrapper$Helper_$callClinit = () => {
    otji_JSWrapper$Helper_$callClinit = $rt_eraseClinit(otji_JSWrapper$Helper);
    otji_JSWrapper$Helper__clinit_();
},
otji_JSWrapper$Helper__clinit_ = () => {
    let var$1;
    otji_JSWrapper$Helper_hashCodes = new WeakMap();
    otji_JSWrapper$Helper_wrappers = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new WeakMap();
    otji_JSWrapper$Helper_stringWrappers = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new Map();
    otji_JSWrapper$Helper_numberWrappers = !(typeof WeakRef !== 'undefined' ? 1 : 0) ? null : new Map();
    if (otji_JSWrapper$Helper_stringWrappers === null)
        var$1 = null;
    else {
        var$1 = new otji_JSWrapper$Helper$_clinit_$lambda$_3_0;
        var$1 = new FinalizationRegistry(otji_JS_function(otji_JSWrapper_unwrap(var$1), "accept"));
    }
    otji_JSWrapper$Helper_stringFinalizationRegistry = var$1;
    if (otji_JSWrapper$Helper_numberWrappers === null)
        var$1 = null;
    else {
        var$1 = new otji_JSWrapper$Helper$_clinit_$lambda$_3_1;
        var$1 = new FinalizationRegistry(otji_JS_function(otji_JSWrapper_unwrap(var$1), "accept"));
    }
    otji_JSWrapper$Helper_numberFinalizationRegistry = var$1;
},
otjc_JSUndefined = $rt_classWithoutFields(),
otjc_JSWeakRef = $rt_classWithoutFields(),
otjc_JSFinalizationRegistryConsumer = $rt_classWithoutFields(0),
otji_JSWrapper$Helper$_clinit_$lambda$_3_0 = $rt_classWithoutFields(),
otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept$exported$0 = (var$1, var$2) => {
    var$2 = otji_JSWrapper_jsToJava(var$2);
    var$1;
    otji_JSWrapper$Helper_$callClinit();
    var$1 = otji_JSWrapper$Helper_stringWrappers;
    var$2 = otji_JSWrapper_unwrap(var$2);
    var$1.delete(var$2);
},
otji_JSWrapper$Helper$_clinit_$lambda$_3_1 = $rt_classWithoutFields(),
otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept$exported$0 = (var$1, var$2) => {
    var$2 = otji_JSWrapper_jsToJava(var$2);
    var$1;
    otji_JSWrapper$Helper_$callClinit();
    var$1 = otji_JSWrapper$Helper_numberWrappers;
    var$2 = otji_JSWrapper_unwrap(var$2);
    var$1.delete(var$2);
};
function ju_LinkedHashMapIterator() {
    let a = this; jl_Object.call(a);
    a.$base = null;
    a.$reversed0 = 0;
    a.$expectedModCount0 = 0;
    a.$futureEntry0 = null;
    a.$currentEntry0 = null;
}
let ju_LinkedHashMapIterator_hasNext = $this => {
    return $this.$futureEntry0 === null ? 0 : 1;
},
ju_LinkedHashMapIterator_checkConcurrentMod = $this => {
    let var$1;
    if ($this.$expectedModCount0 == $this.$base.$modCount0)
        return;
    var$1 = new ju_ConcurrentModificationException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
},
ju_LinkedHashMapIterator_remove = $this => {
    let var$1;
    if ($this.$currentEntry0 === null) {
        var$1 = new jl_IllegalStateException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    ju_LinkedHashMapIterator_checkConcurrentMod($this);
    ju_LinkedHashMap_removeLinkedEntry($this.$base, $this.$currentEntry0);
    $this.$currentEntry0 = null;
    $this.$expectedModCount0 = $this.$expectedModCount0 + 1 | 0;
},
ju_LinkedHashMapIterator$KeyIterator = $rt_classWithoutFields(ju_LinkedHashMapIterator),
ju_LinkedHashMapIterator$KeyIterator_next = $this => {
    let var$1;
    ju_LinkedHashMapIterator_checkConcurrentMod($this);
    if (!ju_LinkedHashMapIterator_hasNext($this)) {
        var$1 = new ju_NoSuchElementException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$1 = $this.$futureEntry0;
    $this.$currentEntry0 = var$1;
    $this.$futureEntry0 = !$this.$reversed0 ? var$1.$chainForward : var$1.$chainBackward;
    return var$1.$key0;
};
function ju_Arrays$ArrayAsList() {
    ju_AbstractList.call(this);
    this.$array0 = null;
}
let ju_Arrays$ArrayAsList_get = ($this, $index) => {
    return $this.$array0.data[$index];
},
ju_Arrays$ArrayAsList_size = $this => {
    return $this.$array0.data.length;
};
function ju_TreeMap$EntrySet() {
    let a = this; ju_AbstractSet.call(a);
    a.$modCount5 = 0;
    a.$owner0 = null;
    a.$from0 = null;
    a.$fromIncluded0 = 0;
    a.$fromChecked = 0;
    a.$to0 = null;
    a.$toIncluded = 0;
    a.$toChecked0 = 0;
    a.$reverse2 = 0;
}
let ju_TreeMap$EntrySet__init_0 = ($this, $owner, $from, $fromIncluded, $fromChecked, $to, $toIncluded, $toChecked, $reverse) => {
    $this.$modCount5 = (-1);
    $this.$owner0 = $owner;
    $this.$from0 = $from;
    $this.$fromIncluded0 = $fromIncluded;
    $this.$fromChecked = $fromChecked;
    $this.$to0 = $to;
    $this.$toIncluded = $toIncluded;
    $this.$toChecked0 = $toChecked;
    $this.$reverse2 = $reverse;
},
ju_TreeMap$EntrySet__init_ = (var_0, var_1, var_2, var_3, var_4, var_5, var_6, var_7) => {
    let var_8 = new ju_TreeMap$EntrySet();
    ju_TreeMap$EntrySet__init_0(var_8, var_0, var_1, var_2, var_3, var_4, var_5, var_6, var_7);
    return var_8;
};
function ju_TreeMap$EntryIterator() {
    let a = this; jl_Object.call(a);
    a.$modCount2 = 0;
    a.$owner2 = null;
    a.$path = null;
    a.$last0 = null;
    a.$to3 = null;
    a.$toChecked1 = 0;
    a.$toIncluded1 = 0;
    a.$depth = 0;
    a.$reverse0 = 0;
}
let ju_TreeMap$EntryIterator__init_0 = ($this, $owner, $path, $to, $toChecked, $toIncluded, $reverse) => {
    let var$7, var$8;
    $this.$owner2 = $owner;
    $this.$modCount2 = $owner.$modCount1;
    $owner = $owner.$root;
    var$7 = $owner !== null ? $owner.$height0 : 0;
    var$8 = $path.data;
    $this.$path = ju_Arrays_copyOf($path, var$7);
    $this.$depth = var$8.length;
    $this.$to3 = $to;
    $this.$toChecked1 = $toChecked;
    $this.$toIncluded1 = $toIncluded;
    $this.$reverse0 = $reverse;
    ju_TreeMap$EntryIterator_checkFinished($this);
},
ju_TreeMap$EntryIterator__init_ = (var_0, var_1, var_2, var_3, var_4, var_5) => {
    let var_6 = new ju_TreeMap$EntryIterator();
    ju_TreeMap$EntryIterator__init_0(var_6, var_0, var_1, var_2, var_3, var_4, var_5);
    return var_6;
},
ju_TreeMap$EntryIterator_checkFinished = $this => {
    let var$1, $cmp;
    if ($this.$toChecked1) {
        var$1 = $this.$depth;
        if (var$1) {
            $cmp = $this.$owner2.$comparator.$compare($this.$path.data[var$1 - 1 | 0].$key, $this.$to3);
            if ($this.$reverse0)
                $cmp =  -$cmp | 0;
            if (!$this.$toIncluded1) {
                if ($cmp >= 0)
                    $this.$depth = 0;
            } else if ($cmp > 0)
                $this.$depth = 0;
            return;
        }
    }
};
$rt_packages([-1, "java", 0, "util", 1, "regex", 0, "lang"
]);
$rt_metadata([jl_Object, "Object", 3, 0, [], 0, 3, 0, 0, ["$hashCode", $rt_wrapFunction0(jl_Object_hashCode), "$equals", $rt_wrapFunction1(jl_Object_equals), "$toString", $rt_wrapFunction0(jl_Object_toString)],
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0, 0,
jlr_Type, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement, jlr_Type], 4, 3, 0, 0, 0,
otji_JS, 0, jl_Object, [], 4, 3, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0, ["$toString", $rt_wrapFunction0(jl_Throwable_toString)],
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0, 0,
jl_RuntimeException, "RuntimeException", 3, jl_Exception, [], 0, 3, 0, 0, 0,
jl_ClassCastException, "ClassCastException", 3, jl_RuntimeException, [], 0, 3, 0, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String, 0, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, 0, ["$toString", $rt_wrapFunction0(jl_String_toString), "$equals", $rt_wrapFunction1(jl_String_equals), "$hashCode", $rt_wrapFunction0(jl_String_hashCode), "$compareTo", $rt_wrapFunction1(jl_String_compareTo)],
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0, 0,
jl_Integer, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0, ["$hashCode", $rt_wrapFunction0(jl_Integer_hashCode), "$equals", $rt_wrapFunction1(jl_Integer_equals), "$compareTo", $rt_wrapFunction1(jl_Integer_compareTo)],
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, 0, ["$ensureCapacity", $rt_wrapFunction1(jl_AbstractStringBuilder_ensureCapacity), "$toString", $rt_wrapFunction0(jl_AbstractStringBuilder_toString)],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$insert1", $rt_wrapFunction4(jl_StringBuilder_insert1), "$append3", $rt_wrapFunction3(jl_StringBuilder_append3), "$toString", $rt_wrapFunction0(jl_StringBuilder_toString), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuilder_ensureCapacity), "$insert0", $rt_wrapFunction2(jl_StringBuilder_insert0)],
otcir_FieldInfo, 0, jl_Object, [], 0, 3, 0, 0, 0,
otcir_MethodInfo, 0, jl_Object, [], 0, 3, 0, 0, 0,
otcir_ClassList, 0, jl_Object, [], 0, 3, 0, 0, 0,
r_Main, 0, jl_Object, [], 0, 3, 0, r_Main_$callClinit, 0,
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0, 0,
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_String$_clinit_$lambda$_115_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, 0, ["$equals", $rt_wrapFunction1(jl_Character_equals), "$hashCode", $rt_wrapFunction0(jl_Character_hashCode), "$compareTo", $rt_wrapFunction1(jl_Character_compareTo)],
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0, 0,
otji_JSWrapper, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_IndexOutOfBoundsException, "IndexOutOfBoundsException", 3, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_Pattern, 0, jl_Object, [ji_Serializable], 4, 3, 0, 0, 0,
jur_MatchResult, 0, jl_Object, [], 3, 3, 0, 0, 0,
jur_Matcher, 0, jl_Object, [jur_MatchResult], 4, 3, 0, 0, 0,
jl_IllegalArgumentException, "IllegalArgumentException", 3, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_PatternSyntaxException, 0, jl_IllegalArgumentException, [], 0, 3, 0, 0, 0,
dba_RunAutomaton, 0, jl_Object, [ji_Serializable], 0, 3, 0, 0, 0,
dba_RegExp, 0, jl_Object, [], 0, 3, 0, 0, 0,
jur_MatchResultImpl, 0, jl_Object, [jur_MatchResult], 0, 0, 0, 0, 0,
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0, 0,
otjc_JSString, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
dba_AutomatonMatcher, 0, jl_Object, [jur_MatchResult], 0, 3, 0, 0, 0,
jl_NullPointerException, "NullPointerException", 3, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_AbstractSet, 0, jl_Object, [], 1, 0, 0, 0, ["$find0", $rt_wrapFunction3(jur_AbstractSet_find), "$findBack", $rt_wrapFunction4(jur_AbstractSet_findBack), "$getType0", $rt_wrapFunction0(jur_AbstractSet_getType), "$setNext", $rt_wrapFunction1(jur_AbstractSet_setNext), "$first", $rt_wrapFunction1(jur_AbstractSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_AbstractSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_AbstractSet_processSecondPass)],
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1, 3, 0, 0, 0,
dba_RegExp$Kind, 0, jl_Enum, [], 12, 0, 0, 0, 0,
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0, 0,
dba_Automaton, 0, jl_Object, [ji_Serializable, jl_Cloneable], 0, 3, 0, 0, ["$equals", $rt_wrapFunction1(dba_Automaton_equals), "$hashCode", $rt_wrapFunction0(dba_Automaton_hashCode)],
dba_State, 0, jl_Object, [ji_Serializable, jl_Comparable], 0, 3, 0, 0, ["$equals", $rt_wrapFunction1(dba_State_equals), "$hashCode", $rt_wrapFunction0(dba_State_hashCode), "$compareTo", $rt_wrapFunction1(dba_State_compareTo)],
jur_FSet, 0, jur_AbstractSet, [], 0, 0, 0, jur_FSet_$callClinit, ["$matches", $rt_wrapFunction3(jur_FSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_FSet_hasConsumed)],
jur_Lexer, 0, jl_Object, [], 0, 0, 0, 0, 0]);
$rt_metadata([ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0, 0,
jl_System, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, 0, 0,
ju_SequencedCollection, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_List, 0, jl_Object, [ju_SequencedCollection], 3, 3, 0, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, 0, ["$iterator", $rt_wrapFunction0(ju_AbstractList_iterator), "$hashCode", $rt_wrapFunction0(ju_AbstractList_hashCode), "$equals", $rt_wrapFunction1(ju_AbstractList_equals)],
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_ArrayList, 0, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, 0, ["$get", $rt_wrapFunction1(ju_ArrayList_get), "$size", $rt_wrapFunction0(ju_ArrayList_size), "$hashCode", $rt_wrapFunction0(ju_ArrayList_hashCode)],
jur_NonCapFSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NonCapFSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_NonCapFSet_hasConsumed)],
jur_AheadFSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AheadFSet_matches)],
jur_BehindFSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_BehindFSet_matches)],
jur_AtomicFSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AtomicFSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_AtomicFSet_hasConsumed)],
jur_FinalSet, 0, jur_FSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_FinalSet_matches)],
jur_LeafSet, 0, jur_AbstractSet, [], 1, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_LeafSet_matches), "$charCount", $rt_wrapFunction0(jur_LeafSet_charCount), "$hasConsumed", $rt_wrapFunction1(jur_LeafSet_hasConsumed)],
jur_EmptySet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_EmptySet_accepts), "$find0", $rt_wrapFunction3(jur_EmptySet_find), "$findBack", $rt_wrapFunction4(jur_EmptySet_findBack), "$hasConsumed", $rt_wrapFunction1(jur_EmptySet_hasConsumed)],
jur_JointSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_JointSet_matches), "$setNext", $rt_wrapFunction1(jur_JointSet_setNext), "$first", $rt_wrapFunction1(jur_JointSet_first), "$hasConsumed", $rt_wrapFunction1(jur_JointSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_JointSet_processSecondPass)],
jur_NonCapJointSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NonCapJointSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_NonCapJointSet_hasConsumed)],
jur_AtomicJointSet, 0, jur_NonCapJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AtomicJointSet_matches), "$setNext", $rt_wrapFunction1(jur_AtomicJointSet_setNext)],
jur_PositiveLookAhead, 0, jur_AtomicJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PositiveLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookAhead_hasConsumed)],
jur_NegativeLookAhead, 0, jur_AtomicJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NegativeLookAhead_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookAhead_hasConsumed)],
jur_PositiveLookBehind, 0, jur_AtomicJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PositiveLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_PositiveLookBehind_hasConsumed)],
jur_NegativeLookBehind, 0, jur_AtomicJointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_NegativeLookBehind_matches), "$hasConsumed", $rt_wrapFunction1(jur_NegativeLookBehind_hasConsumed)],
jur_SingleSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SingleSet_matches), "$find0", $rt_wrapFunction3(jur_SingleSet_find), "$findBack", $rt_wrapFunction4(jur_SingleSet_findBack), "$first", $rt_wrapFunction1(jur_SingleSet_first), "$processBackRefReplacement", $rt_wrapFunction0(jur_SingleSet_processBackRefReplacement), "$processSecondPass", $rt_wrapFunction0(jur_SingleSet_processSecondPass)],
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_ArrayStoreException, "ArrayStoreException", 3, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_SpecialToken, 0, jl_Object, [], 1, 0, 0, 0, 0,
jur_AbstractCharClass, 0, jur_SpecialToken, [], 1, 0, 0, 0, ["$getBits", $rt_wrapFunction0(jur_AbstractCharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_AbstractCharClass_getLowHighSurrogates), "$getInstance0", $rt_wrapFunction0(jur_AbstractCharClass_getInstance), "$hasUCI", $rt_wrapFunction0(jur_AbstractCharClass_hasUCI)],
ju_MissingResourceException, "MissingResourceException", 1, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_CharClass, "CharClass", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass_contains), "$getBits", $rt_wrapFunction0(jur_CharClass_getBits), "$getLowHighSurrogates", $rt_wrapFunction0(jur_CharClass_getLowHighSurrogates), "$getInstance0", $rt_wrapFunction0(jur_CharClass_getInstance), "$toString", $rt_wrapFunction0(jur_CharClass_toString), "$hasUCI", $rt_wrapFunction0(jur_CharClass_hasUCI)],
jur_QuantifierSet, 0, jur_AbstractSet, [], 1, 0, 0, 0, ["$first", $rt_wrapFunction1(jur_QuantifierSet_first), "$hasConsumed", $rt_wrapFunction1(jur_QuantifierSet_hasConsumed), "$processSecondPass", $rt_wrapFunction0(jur_QuantifierSet_processSecondPass)],
jur_LeafQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_LeafQuantifierSet_matches)],
jur_CompositeQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeQuantifierSet_matches)],
jur_GroupQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_GroupQuantifierSet_matches)],
jur_AltQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AltQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltQuantifierSet_setNext)],
jur_UnifiedQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UnifiedQuantifierSet_matches), "$find0", $rt_wrapFunction3(jur_UnifiedQuantifierSet_find)],
jur_AbstractCharClass$PredefinedCharacterClasses, 0, jl_Object, [], 4, 0, 0, 0, 0,
jur_AbstractCharClass$LazyCharClass, 0, jl_Object, [], 1, 0, 0, 0, 0,
jl_NumberFormatException, "NumberFormatException", 3, jl_IllegalArgumentException, [], 0, 3, 0, 0, 0,
jur_Quantifier, "Quantifier", 2, jur_SpecialToken, [jl_Cloneable], 0, 0, 0, 0, ["$toString", $rt_wrapFunction0(jur_Quantifier_toString)],
jur_FSet$PossessiveFSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_FSet$PossessiveFSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_FSet$PossessiveFSet_hasConsumed)],
ju_BitSet, 0, jl_Object, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, 0,
jur_LowHighSurrogateRangeSet, 0, jur_JointSet, [], 0, 0, 0, 0, 0,
jur_CompositeRangeSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeRangeSet_matches), "$setNext", $rt_wrapFunction1(jur_CompositeRangeSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_CompositeRangeSet_hasConsumed), "$first", $rt_wrapFunction1(jur_CompositeRangeSet_first)],
jur_SupplRangeSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SupplRangeSet_matches), "$contains0", $rt_wrapFunction1(jur_SupplRangeSet_contains), "$first", $rt_wrapFunction1(jur_SupplRangeSet_first), "$setNext", $rt_wrapFunction1(jur_SupplRangeSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_SupplRangeSet_hasConsumed)],
jur_UCISupplRangeSet, 0, jur_SupplRangeSet, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_UCISupplRangeSet_contains)],
jur_UCIRangeSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCIRangeSet_accepts)],
jur_RangeSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_RangeSet_accepts), "$first", $rt_wrapFunction1(jur_RangeSet_first)],
jur_HangulDecomposedCharSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_HangulDecomposedCharSet_setNext), "$matches", $rt_wrapFunction3(jur_HangulDecomposedCharSet_matches), "$first", $rt_wrapFunction1(jur_HangulDecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HangulDecomposedCharSet_hasConsumed)]]);
$rt_metadata([jur_CharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$charCount", $rt_wrapFunction0(jur_CharSet_charCount), "$accepts", $rt_wrapFunction2(jur_CharSet_accepts), "$find0", $rt_wrapFunction3(jur_CharSet_find), "$findBack", $rt_wrapFunction4(jur_CharSet_findBack), "$first", $rt_wrapFunction1(jur_CharSet_first)],
jur_UCICharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCICharSet_accepts)],
jur_CICharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_CICharSet_accepts)],
jur_DecomposedCharSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_DecomposedCharSet_setNext), "$matches", $rt_wrapFunction3(jur_DecomposedCharSet_matches), "$first", $rt_wrapFunction1(jur_DecomposedCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_DecomposedCharSet_hasConsumed)],
jur_UCIDecomposedCharSet, 0, jur_DecomposedCharSet, [], 0, 0, 0, 0, 0,
jur_CIDecomposedCharSet, 0, jur_DecomposedCharSet, [], 0, 0, 0, 0, 0,
jur_PossessiveGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveGroupQuantifierSet_matches)],
jur_PosPlusGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosPlusGroupQuantifierSet_matches)],
jur_AltGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_AltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_AltGroupQuantifierSet_setNext)],
jur_PosAltGroupQuantifierSet, 0, jur_AltGroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosAltGroupQuantifierSet_matches), "$setNext", $rt_wrapFunction1(jur_PosAltGroupQuantifierSet_setNext)],
jur_CompositeGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CompositeGroupQuantifierSet_matches)],
jur_PosCompositeGroupQuantifierSet, 0, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PosCompositeGroupQuantifierSet_matches)],
jur_ReluctantGroupQuantifierSet, 0, jur_GroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantGroupQuantifierSet_matches)],
jur_RelAltGroupQuantifierSet, 0, jur_AltGroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_RelAltGroupQuantifierSet_matches)],
jur_RelCompositeGroupQuantifierSet, 0, jur_CompositeGroupQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_RelCompositeGroupQuantifierSet_matches)],
jur_DotAllQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotAllQuantifierSet_matches), "$find0", $rt_wrapFunction3(jur_DotAllQuantifierSet_find)],
jur_DotQuantifierSet, 0, jur_QuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotQuantifierSet_matches), "$find0", $rt_wrapFunction3(jur_DotQuantifierSet_find)],
jur_AbstractLineTerminator, 0, jl_Object, [], 1, 0, 0, 0, 0,
jur_PossessiveQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveQuantifierSet_matches)],
jur_PossessiveAltQuantifierSet, 0, jur_AltQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveAltQuantifierSet_matches)],
jur_PossessiveCompositeQuantifierSet, 0, jur_CompositeQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PossessiveCompositeQuantifierSet_matches)],
jur_ReluctantQuantifierSet, 0, jur_LeafQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantQuantifierSet_matches)],
jur_ReluctantAltQuantifierSet, 0, jur_AltQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantAltQuantifierSet_matches)],
jur_ReluctantCompositeQuantifierSet, 0, jur_CompositeQuantifierSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_ReluctantCompositeQuantifierSet_matches)],
jur_SOLSet, 0, jur_AbstractSet, [], 4, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_SOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_SOLSet_hasConsumed)],
jur_WordBoundary, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_WordBoundary_matches), "$hasConsumed", $rt_wrapFunction1(jur_WordBoundary_hasConsumed)],
jur_PreviousMatch, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_PreviousMatch_matches), "$hasConsumed", $rt_wrapFunction1(jur_PreviousMatch_hasConsumed)],
jur_EOLSet, 0, jur_AbstractSet, [], 4, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_EOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOLSet_hasConsumed)],
jur_EOISet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_EOISet_matches), "$hasConsumed", $rt_wrapFunction1(jur_EOISet_hasConsumed)],
jur_MultiLineSOLSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_MultiLineSOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineSOLSet_hasConsumed)],
jur_DotAllSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotAllSet_matches), "$setNext", $rt_wrapFunction1(jur_DotAllSet_setNext), "$getType0", $rt_wrapFunction0(jur_DotAllSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotAllSet_hasConsumed)],
jur_DotSet, 0, jur_JointSet, [], 4, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_DotSet_matches), "$setNext", $rt_wrapFunction1(jur_DotSet_setNext), "$getType0", $rt_wrapFunction0(jur_DotSet_getType), "$hasConsumed", $rt_wrapFunction1(jur_DotSet_hasConsumed)],
jur_UEOLSet, 0, jur_AbstractSet, [], 4, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UEOLSet_hasConsumed)],
jur_UMultiLineEOLSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UMultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_UMultiLineEOLSet_hasConsumed)],
jur_MultiLineEOLSet, 0, jur_AbstractSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_MultiLineEOLSet_matches), "$hasConsumed", $rt_wrapFunction1(jur_MultiLineEOLSet_hasConsumed)],
jur_CIBackReferenceSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_CIBackReferenceSet_matches), "$setNext", $rt_wrapFunction1(jur_CIBackReferenceSet_setNext), "$hasConsumed", $rt_wrapFunction1(jur_CIBackReferenceSet_hasConsumed)],
jur_BackReferenceSet, 0, jur_CIBackReferenceSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_BackReferenceSet_matches), "$find0", $rt_wrapFunction3(jur_BackReferenceSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferenceSet_findBack), "$first", $rt_wrapFunction1(jur_BackReferenceSet_first)],
jur_UCIBackReferenceSet, 0, jur_CIBackReferenceSet, [], 0, 0, 0, 0, ["$matches", $rt_wrapFunction3(jur_UCIBackReferenceSet_matches)],
jl_StringBuffer, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, 0, ["$insert1", $rt_wrapFunction4(jl_StringBuffer_insert0), "$append3", $rt_wrapFunction3(jl_StringBuffer_append), "$ensureCapacity", $rt_wrapFunction1(jl_StringBuffer_ensureCapacity), "$insert0", $rt_wrapFunction2(jl_StringBuffer_insert)],
jur_SequenceSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_SequenceSet_accepts), "$find0", $rt_wrapFunction3(jur_SequenceSet_find), "$findBack", $rt_wrapFunction4(jur_SequenceSet_findBack), "$first", $rt_wrapFunction1(jur_SequenceSet_first)],
jur_UCISequenceSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCISequenceSet_accepts)],
jur_CISequenceSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_CISequenceSet_accepts)],
jur_UCISupplCharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_UCISupplCharSet_accepts)],
jur_LowSurrogateCharSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_LowSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_LowSurrogateCharSet_matches), "$find0", $rt_wrapFunction3(jur_LowSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_LowSurrogateCharSet_findBack), "$first", $rt_wrapFunction1(jur_LowSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_LowSurrogateCharSet_hasConsumed)],
jur_HighSurrogateCharSet, 0, jur_JointSet, [], 0, 0, 0, 0, ["$setNext", $rt_wrapFunction1(jur_HighSurrogateCharSet_setNext), "$matches", $rt_wrapFunction3(jur_HighSurrogateCharSet_matches), "$find0", $rt_wrapFunction3(jur_HighSurrogateCharSet_find), "$findBack", $rt_wrapFunction4(jur_HighSurrogateCharSet_findBack), "$first", $rt_wrapFunction1(jur_HighSurrogateCharSet_first), "$hasConsumed", $rt_wrapFunction1(jur_HighSurrogateCharSet_hasConsumed)],
jur_SupplCharSet, 0, jur_LeafSet, [], 0, 0, 0, 0, ["$accepts", $rt_wrapFunction2(jur_SupplCharSet_accepts), "$find0", $rt_wrapFunction3(jur_SupplCharSet_find), "$findBack", $rt_wrapFunction4(jur_SupplCharSet_findBack), "$first", $rt_wrapFunction1(jur_SupplCharSet_first)],
jur_AbstractLineTerminator$1, 0, jur_AbstractLineTerminator, [], 0, 0, 0, 0, ["$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$1_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$1_isAfterLineTerminator)],
jur_AbstractLineTerminator$2, 0, jur_AbstractLineTerminator, [], 0, 0, 0, 0, ["$isLineTerminator", $rt_wrapFunction1(jur_AbstractLineTerminator$2_isLineTerminator), "$isAfterLineTerminator", $rt_wrapFunction2(jur_AbstractLineTerminator$2_isAfterLineTerminator)],
jur_SequenceSet$IntHash, 0, jl_Object, [], 0, 0, 0, 0, 0,
jur_AbstractCharClass$LazySpace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpace_computeValue)]]);
$rt_metadata([jur_AbstractCharClass$LazyDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyDigit_computeValue)],
jur_AbstractCharClass$LazyLower, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyLower_computeValue)],
jur_AbstractCharClass$LazyUpper, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyUpper_computeValue)],
jur_AbstractCharClass$LazyASCII, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyASCII_computeValue)],
jur_AbstractCharClass$LazyAlpha, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlpha_computeValue)],
jur_AbstractCharClass$LazyAlnum, 0, jur_AbstractCharClass$LazyAlpha, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyAlnum_computeValue)],
jur_AbstractCharClass$LazyPunct, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPunct_computeValue)],
jur_AbstractCharClass$LazyGraph, 0, jur_AbstractCharClass$LazyAlnum, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyGraph_computeValue)],
jur_AbstractCharClass$LazyPrint, 0, jur_AbstractCharClass$LazyGraph, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyPrint_computeValue)],
jur_AbstractCharClass$LazyBlank, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyBlank_computeValue)],
jur_AbstractCharClass$LazyCntrl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCntrl_computeValue)],
jur_AbstractCharClass$LazyXDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyXDigit_computeValue)],
jur_AbstractCharClass$LazyJavaLowerCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLowerCase_computeValue)],
jur_AbstractCharClass$LazyJavaUpperCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUpperCase_computeValue)],
jur_AbstractCharClass$LazyJavaWhitespace, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaWhitespace_computeValue)],
jur_AbstractCharClass$LazyJavaMirrored, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaMirrored_computeValue)],
jur_AbstractCharClass$LazyJavaDefined, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDefined_computeValue)],
jur_AbstractCharClass$LazyJavaDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaDigit_computeValue)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaIdentifierIgnorable_computeValue)],
jur_AbstractCharClass$LazyJavaISOControl, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaISOControl_computeValue)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierPart_computeValue)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaJavaIdentifierStart_computeValue)],
jur_AbstractCharClass$LazyJavaLetter, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetter_computeValue)],
jur_AbstractCharClass$LazyJavaLetterOrDigit, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaLetterOrDigit_computeValue)],
jur_AbstractCharClass$LazyJavaSpaceChar, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaSpaceChar_computeValue)],
jur_AbstractCharClass$LazyJavaTitleCase, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaTitleCase_computeValue)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart_computeValue)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart_computeValue)],
jur_AbstractCharClass$LazyWord, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyWord_computeValue)],
jur_AbstractCharClass$LazyNonWord, 0, jur_AbstractCharClass$LazyWord, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonWord_computeValue)],
jur_AbstractCharClass$LazyNonSpace, 0, jur_AbstractCharClass$LazySpace, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonSpace_computeValue)],
jur_AbstractCharClass$LazyNonDigit, 0, jur_AbstractCharClass$LazyDigit, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyNonDigit_computeValue)],
jur_AbstractCharClass$LazyRange, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyRange_computeValue)],
jur_AbstractCharClass$LazySpecialsBlock, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazySpecialsBlock_computeValue)],
jur_AbstractCharClass$LazyCategory, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategory_computeValue)],
jur_AbstractCharClass$LazyCategoryScope, 0, jur_AbstractCharClass$LazyCharClass, [], 0, 0, 0, 0, ["$computeValue", $rt_wrapFunction0(jur_AbstractCharClass$LazyCategoryScope_computeValue)],
jl_NegativeArraySizeException, "NegativeArraySizeException", 3, jl_RuntimeException, [], 0, 3, 0, 0, 0,
jur_IntHash, 0, jl_Object, [], 0, 0, 0, 0, 0,
otpp_ResourceAccessor, 0, jl_Object, [], 4, 0, 0, 0, 0,
otciu_UnicodeHelper, 0, jl_Object, [], 4, 3, 0, 0, 0,
otciu_CharMapping, 0, jl_Object, [], 0, 3, 0, 0, 0,
otciu_UnicodeHelper$Range, 0, jl_Object, [], 0, 3, 0, 0, 0,
otci_CharFlow, 0, jl_Object, [], 0, 3, 0, 0, 0,
otci_Base46, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_Math, 0, jl_Object, [], 4, 3, 0, 0, 0,
jl_StringIndexOutOfBoundsException, "StringIndexOutOfBoundsException", 3, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0, 0,
jur_AbstractCharClass$1, "AbstractCharClass$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$1_contains)],
jur_AbstractCharClass$2, "AbstractCharClass$2", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$2_contains)],
jur_CharClass$18, "CharClass$18", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$18_contains), "$toString", $rt_wrapFunction0(jur_CharClass$18_toString)],
jur_CharClass$1, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$1_contains)]]);
$rt_metadata([jur_CharClass$3, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$3_contains)],
jur_CharClass$2, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$2_contains)],
jur_CharClass$5, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$5_contains)],
jur_CharClass$4, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$4_contains)],
jur_CharClass$7, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$7_contains)],
jur_CharClass$6, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$6_contains)],
jur_CharClass$9, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$9_contains)],
jur_CharClass$8, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$8_contains)],
jur_CharClass$11, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$11_contains)],
jur_CharClass$10, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$10_contains)],
jur_CharClass$13, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$13_contains)],
jur_CharClass$12, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$12_contains)],
jur_CharClass$15, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$15_contains)],
jur_CharClass$14, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$14_contains)],
jur_CharClass$17, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$17_contains)],
jur_CharClass$16, 0, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_CharClass$16_contains)],
jl_IllegalStateException, "IllegalStateException", 3, jl_RuntimeException, [], 0, 3, 0, 0, 0,
dba_RegExp$1, 0, jl_Object, [], 32, 0, 0, dba_RegExp$1_$callClinit, 0,
dba_BasicOperations, 0, jl_Object, [], 4, 3, 0, 0, 0,
dba_BasicAutomata, 0, jl_Object, [], 4, 3, 0, 0, 0,
ji_IOException, 0, jl_Exception, [], 0, 3, 0, 0, 0,
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0, ["$equals", $rt_wrapFunction1(ju_AbstractSet_equals), "$hashCode", $rt_wrapFunction0(ju_AbstractSet_hashCode)],
ju_HashSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$iterator", $rt_wrapFunction0(ju_HashSet_iterator), "$size", $rt_wrapFunction0(ju_HashSet_size)],
dba_Transition, 0, jl_Object, [ji_Serializable, jl_Cloneable], 0, 3, 0, 0, ["$equals", $rt_wrapFunction1(dba_Transition_equals), "$hashCode", $rt_wrapFunction0(dba_Transition_hashCode)],
dba_StatePair, 0, jl_Object, [], 0, 3, 0, 0, ["$equals", $rt_wrapFunction1(dba_StatePair_equals), "$hashCode", $rt_wrapFunction0(dba_StatePair_hashCode)],
ju_Map, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_HashMap_newElementArray), "$keySet", $rt_wrapFunction0(ju_HashMap_keySet), "$put0", $rt_wrapFunction2(ju_HashMap_put), "$remove", $rt_wrapFunction1(ju_HashMap_remove)],
jl_CloneNotSupportedException, "CloneNotSupportedException", 3, jl_Exception, [], 0, 3, 0, 0, 0,
jur_BackReferencedSingleSet, 0, jur_SingleSet, [], 0, 0, 0, 0, ["$find0", $rt_wrapFunction3(jur_BackReferencedSingleSet_find), "$findBack", $rt_wrapFunction4(jur_BackReferencedSingleSet_findBack), "$processBackRefReplacement", $rt_wrapFunction0(jur_BackReferencedSingleSet_processBackRefReplacement)],
ju_SequencedSet, 0, jl_Object, [ju_SequencedCollection, ju_Set], 3, 3, 0, 0, 0,
ju_LinkedHashSet, 0, ju_HashSet, [ju_SequencedSet, jl_Cloneable, ji_Serializable], 0, 3, 0, 0, 0,
ju_AbstractSequentialList, 0, ju_AbstractList, [], 1, 3, 0, 0, ["$get", $rt_wrapFunction1(ju_AbstractSequentialList_get), "$iterator", $rt_wrapFunction0(ju_AbstractSequentialList_iterator)],
ju_Queue, 0, jl_Object, [ju_Collection], 3, 3, 0, 0, 0,
ju_Deque, 0, jl_Object, [ju_Queue, ju_SequencedCollection], 3, 3, 0, 0, 0,
ju_LinkedList, 0, ju_AbstractSequentialList, [ju_Deque], 0, 3, 0, 0, ["$size", $rt_wrapFunction0(ju_LinkedList_size)],
dba_MinimizationOperations, 0, jl_Object, [], 4, 3, 0, 0, 0,
jur_AbstractCharClass$LazyJavaLowerCase$1, "AbstractCharClass$LazyJavaLowerCase$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLowerCase$1_contains)],
jur_AbstractCharClass$LazyJavaUpperCase$1, "AbstractCharClass$LazyJavaUpperCase$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUpperCase$1_contains)],
jur_AbstractCharClass$LazyJavaWhitespace$1, "AbstractCharClass$LazyJavaWhitespace$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaWhitespace$1_contains)],
jur_AbstractCharClass$LazyJavaMirrored$1, "AbstractCharClass$LazyJavaMirrored$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaMirrored$1_contains)],
jur_AbstractCharClass$LazyJavaDefined$1, "AbstractCharClass$LazyJavaDefined$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDefined$1_contains)],
jur_AbstractCharClass$LazyJavaDigit$1, "AbstractCharClass$LazyJavaDigit$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaDigit$1_contains)],
jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1, "AbstractCharClass$LazyJavaIdentifierIgnorable$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaIdentifierIgnorable$1_contains)],
jur_AbstractCharClass$LazyJavaISOControl$1, "AbstractCharClass$LazyJavaISOControl$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaISOControl$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1, "AbstractCharClass$LazyJavaJavaIdentifierPart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierPart$1_contains)],
jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1, "AbstractCharClass$LazyJavaJavaIdentifierStart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaJavaIdentifierStart$1_contains)],
jur_AbstractCharClass$LazyJavaLetter$1, "AbstractCharClass$LazyJavaLetter$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetter$1_contains)],
jur_AbstractCharClass$LazyJavaLetterOrDigit$1, "AbstractCharClass$LazyJavaLetterOrDigit$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaLetterOrDigit$1_contains)]]);
$rt_metadata([jur_AbstractCharClass$LazyJavaSpaceChar$1, "AbstractCharClass$LazyJavaSpaceChar$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaSpaceChar$1_contains)],
jur_AbstractCharClass$LazyJavaTitleCase$1, "AbstractCharClass$LazyJavaTitleCase$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaTitleCase$1_contains)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierPart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierPart$1_contains)],
jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1, "AbstractCharClass$LazyJavaUnicodeIdentifierStart$1", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_AbstractCharClass$LazyJavaUnicodeIdentifierStart$1_contains)],
jur_UnicodeCategory, "UnicodeCategory", 2, jur_AbstractCharClass, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_UnicodeCategory_contains)],
jur_UnicodeCategoryScope, "UnicodeCategoryScope", 2, jur_UnicodeCategory, [], 0, 0, 0, 0, ["$contains0", $rt_wrapFunction1(jur_UnicodeCategoryScope_contains)],
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_AbstractList$1_hasNext), "$next0", $rt_wrapFunction0(ju_AbstractList$1_next)],
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0, 0,
ju_SequencedMap, 0, jl_Object, [ju_Map], 3, 3, 0, 0, 0,
ju_LinkedHashMap, 0, ju_HashMap, [ju_SequencedMap], 0, 3, 0, 0, ["$newElementArray", $rt_wrapFunction1(ju_LinkedHashMap_newElementArray), "$put0", $rt_wrapFunction2(ju_LinkedHashMap_put), "$keySet", $rt_wrapFunction0(ju_LinkedHashMap_keySet), "$remove", $rt_wrapFunction1(ju_LinkedHashMap_remove)],
jur_IntArrHash, 0, jl_Object, [], 0, 0, 0, 0, 0,
dba_SpecialOperations, 0, jl_Object, [], 4, 3, 0, 0, 0,
dba_MinimizationOperations$StateList, 0, jl_Object, [], 0, 0, 0, 0, 0,
dba_MinimizationOperations$StateListNode, 0, jl_Object, [], 0, 0, 0, 0, 0,
dba_MinimizationOperations$IntPair, 0, jl_Object, [], 0, 0, 0, 0, 0,
dba_MinimizationOperations$Partition, 0, jl_Object, [], 0, 0, 0, 0, 0,
dba_MinimizationOperations$LabelComparator, 0, jl_Object, [ju_Comparator], 0, 0, 0, 0, ["$compare", $rt_wrapFunction2(dba_MinimizationOperations$LabelComparator_compare)],
ju_LinkedList$Entry, 0, jl_Object, [], 0, 0, 0, 0, 0,
ju_SortedSet, 0, jl_Object, [ju_Set, ju_SequencedSet], 3, 3, 0, 0, 0,
ju_NavigableSet, 0, jl_Object, [ju_SortedSet], 3, 3, 0, 0, 0,
ju_TreeSet, 0, ju_AbstractSet, [jl_Cloneable, ju_NavigableSet], 0, 3, 0, 0, 0,
ju_Comparator$NaturalOrder, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$compare", $rt_wrapFunction2(ju_Comparator$NaturalOrder_compare)],
ju_SortedMap, 0, jl_Object, [ju_SequencedMap], 3, 3, 0, 0, 0,
ju_NavigableMap, 0, jl_Object, [ju_SortedMap], 3, 3, 0, 0, 0,
ju_TreeMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable, ju_NavigableMap], 0, 3, 0, 0, ["$entrySet", $rt_wrapFunction0(ju_TreeMap_entrySet)],
ju_LinkedHashMap$LinkedHashMapEntry, 0, ju_HashMap$HashEntry, [], 4, 0, 0, 0, 0,
jl_Boolean, 0, jl_Object, [ji_Serializable, jl_Comparable], 0, 3, 0, 0, 0,
ju_ConcurrentModificationException, "ConcurrentModificationException", 1, jl_RuntimeException, [], 0, 3, 0, 0, 0,
ju_AbstractMap$SimpleEntry, 0, jl_Object, [ju_Map$Entry, ji_Serializable], 0, 3, 0, 0, ["$equals", $rt_wrapFunction1(ju_AbstractMap$SimpleEntry_equals), "$hashCode", $rt_wrapFunction0(ju_AbstractMap$SimpleEntry_hashCode)],
ju_TreeMap$TreeNode, 0, ju_AbstractMap$SimpleEntry, [], 0, 0, 0, 0, 0,
ju_Dictionary, 0, jl_Object, [], 1, 3, 0, 0, 0,
ju_Hashtable, 0, ju_Dictionary, [ju_Map, jl_Cloneable, ji_Serializable], 0, 3, 0, 0, 0,
ju_Properties, 0, ju_Hashtable, [], 0, 3, 0, 0, 0,
ju_Enumeration, 0, jl_Object, [], 3, 3, 0, 0, 0,
ju_Hashtable$1, 0, jl_Object, [ju_Enumeration], 0, 0, 0, 0, 0,
ju_Hashtable$2, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, 0,
ju_Hashtable$Entry, 0, ju_MapEntry, [], 0, 0, 0, 0, 0,
ju_HashMap$1, 0, ju_AbstractSet, [], 0, 0, 0, 0, ["$iterator", $rt_wrapFunction0(ju_HashMap$1_iterator)],
ju_NoSuchElementException, "NoSuchElementException", 1, jl_RuntimeException, [], 0, 3, 0, 0, 0,
dba_TransitionComparator, 0, jl_Object, [ju_Comparator, ji_Serializable], 0, 0, 0, 0, ["$compare", $rt_wrapFunction2(dba_TransitionComparator_compare)],
ju_TreeMap$MapView, 0, ju_AbstractMap, [ju_NavigableMap, ji_Serializable], 0, 0, 0, 0, ["$entrySet", $rt_wrapFunction0(ju_TreeMap$MapView_entrySet)],
ju_AbstractMap$KeySet, 0, ju_AbstractSet, [], 0, 0, 0, 0, ["$iterator", $rt_wrapFunction0(ju_AbstractMap$KeySet_iterator)],
jl_Runnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Thread, 0, jl_Object, [jl_Runnable], 0, 3, 0, 0, 0,
jl_Object$Monitor, 0, jl_Object, [], 0, 0, 0, 0, 0,
jl_IllegalMonitorStateException, "IllegalMonitorStateException", 3, jl_RuntimeException, [], 0, 3, 0, 0, 0,
ju_TreeMap$ensureRevertedComparator$lambda$_5_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0, ["$compare", $rt_wrapFunction2(ju_TreeMap$ensureRevertedComparator$lambda$_5_0_compare)]]);
$rt_metadata([otp_PlatformQueue, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
otp_PlatformRunnable, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_Object$monitorExit$lambda$_8_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, 0,
jl_Thread$UncaughtExceptionHandler, 0, jl_Object, [], 3, 3, 0, 0, 0,
jl_DefaultUncaughtExceptionHandler, 0, jl_Object, [jl_Thread$UncaughtExceptionHandler], 0, 3, 0, 0, 0,
oti_AsyncCallback, 0, jl_Object, [], 3, 3, 0, 0, 0,
otpp_AsyncCallbackWrapper, 0, jl_Object, [oti_AsyncCallback], 0, 0, 0, 0, ["$complete", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_complete), "$error", $rt_wrapFunction1(otpp_AsyncCallbackWrapper_error)],
jl_Object$monitorEnterWait$lambda$_6_0, 0, jl_Object, [otp_PlatformRunnable], 0, 3, 0, 0, 0,
ju_HashMap$AbstractMapIterator, 0, jl_Object, [], 0, 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_hasNext), "$remove1", $rt_wrapFunction0(ju_HashMap$AbstractMapIterator_remove)],
ju_HashMap$KeyIterator, 0, ju_HashMap$AbstractMapIterator, [ju_Iterator], 0, 0, 0, 0, ["$next0", $rt_wrapFunction0(ju_HashMap$KeyIterator_next)],
ju_TreeMap$NavigableKeySet, 0, ju_AbstractSet, [ju_NavigableSet], 0, 0, 0, 0, 0,
ju_AbstractMap$KeySet$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_AbstractMap$KeySet$1_hasNext), "$next0", $rt_wrapFunction0(ju_AbstractMap$KeySet$1_next), "$remove1", $rt_wrapFunction0(ju_AbstractMap$KeySet$1_remove)],
ju_ListIterator, 0, jl_Object, [ju_Iterator], 3, 3, 0, 0, 0,
ju_LinkedList$SequentialListIterator, 0, jl_Object, [ju_ListIterator], 0, 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_LinkedList$SequentialListIterator_hasNext), "$next0", $rt_wrapFunction0(ju_LinkedList$SequentialListIterator_next)],
ju_LinkedHashMapKeySet, 0, ju_AbstractSet, [ju_SequencedSet], 0, 0, 0, 0, ["$iterator", $rt_wrapFunction0(ju_LinkedHashMapKeySet_iterator)],
otjc_JSObjects, 0, jl_Object, [], 4, 3, 0, 0, 0,
otji_JSWrapper$Helper, 0, jl_Object, [], 0, 0, 0, otji_JSWrapper$Helper_$callClinit, 0,
otjc_JSUndefined, 0, jl_Object, [otj_JSObject], 0, 3, 0, 0, 0,
otjc_JSWeakRef, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0, 0,
otjc_JSFinalizationRegistryConsumer, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0, 0,
otji_JSWrapper$Helper$_clinit_$lambda$_3_0, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, 0,
otji_JSWrapper$Helper$_clinit_$lambda$_3_1, 0, jl_Object, [otjc_JSFinalizationRegistryConsumer], 0, 3, 0, 0, 0,
ju_LinkedHashMapIterator, 0, jl_Object, [], 0, 0, 0, 0, ["$hasNext", $rt_wrapFunction0(ju_LinkedHashMapIterator_hasNext), "$remove1", $rt_wrapFunction0(ju_LinkedHashMapIterator_remove)],
ju_LinkedHashMapIterator$KeyIterator, 0, ju_LinkedHashMapIterator, [ju_Iterator], 0, 0, 0, 0, ["$next0", $rt_wrapFunction0(ju_LinkedHashMapIterator$KeyIterator_next)],
ju_Arrays$ArrayAsList, 0, ju_AbstractList, [ju_RandomAccess, ji_Serializable], 0, 0, 0, 0, ["$get", $rt_wrapFunction1(ju_Arrays$ArrayAsList_get), "$size", $rt_wrapFunction0(ju_Arrays$ArrayAsList_size)],
ju_TreeMap$EntrySet, 0, ju_AbstractSet, [ju_SequencedSet], 0, 0, 0, 0, 0,
ju_TreeMap$EntryIterator, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0, 0]);
let $rt_booleanArrayCls = $rt_arraycls($rt_booleancls),
$rt_charArrayCls = $rt_arraycls($rt_charcls),
$rt_byteArrayCls = $rt_arraycls($rt_bytecls),
$rt_intArrayCls = $rt_arraycls($rt_intcls);
$rt_stringPool(["Can\'t enter monitor from another thread synchronously", "0", "", ": ", "null", "String is null", "String is empty", "String contains invalid digits: ", "String contains digits out of radix ", "The value is too big for integer type", "The value is too big for int type: ", "Illegal radix: ", "{\"id\":\"java-util\",\"name\":\"java.util.regex (TeaVM)\",\"flavor\":\"Perl-like; Harmony-derived reimplementation\",\"family\":\"Perl/PCRE\",\"version\":\"\",\"url\":\"https://github.com/konsoletyper/teavm\"}",
"{\"id\":\"dk-brics-plain\",\"name\":\"dk.brics.automaton / plain\",\"flavor\":\"minimized DFA, no extended ops (group-0)\",\"family\":\"linear\",\"version\":\"1.12\",\"url\":\"https://www.brics.dk/automaton/\"}", "{\"id\":\"dk-brics\",\"name\":\"dk.brics.automaton\",\"flavor\":\"minimized DFA (group-0)\",\"family\":\"linear\",\"version\":\"1.12\",\"url\":\"https://www.brics.dk/automaton/\"}", "{\"matched\":false,\"groups\":[]}", "{\"matched\":true,\"groups\":[[", "]]}", "{\"error\":\"invalid pattern\"}", "{\"matched\":true,\"groups\":[",
"]}", "{\"error\":", "object", "function", "string", "number", "undefined", "Patter is null", "end-of-string expected at position ", "\'", "\' not found", "unexpected end-of-string", "?*+{", ")|", "&", "0123456789", "integer expected at position ", "expected \'}\' at position ", "]", "expected \']\' at position ", "\"", "expected \'\"\' at position ", "expected \')\' at position ", ">", "expected \'>\' at position ", "interval syntax error at position ", "illegal identifier at position ", "Start must be less than or equal to end: ",
", ", "There was no available match.", "REGEXP_UNION", "REGEXP_CONCATENATION", "REGEXP_INTERSECTION", "REGEXP_OPTIONAL", "REGEXP_REPEAT", "REGEXP_REPEAT_MIN", "REGEXP_REPEAT_MINMAX", "REGEXP_COMPLEMENT", "REGEXP_CHAR", "REGEXP_CHAR_RANGE", "REGEXP_ANYCHAR", "REGEXP_EMPTY", "REGEXP_STRING", "REGEXP_ANYSTRING", "REGEXP_AUTOMATON", "REGEXP_INTERVAL", "java.version", "1.8", "os.name", "TeaVM", "file.separator", "/", "path.separator", ":", "line.separator", "\n", "java.io.tmpdir", "/tmp", "java.vm.version", "user.home",
"dk.brics.automaton.debug", "number of states exceeded Integer.MAX_VALUE", "Is", "In", "Either src or dest is null", "Lower", "Upper", "ASCII", "Alpha", "Digit", "Alnum", "Punct", "Graph", "Print", "Blank", "Cntrl", "XDigit", "javaLowerCase", "javaUpperCase", "javaWhitespace", "javaMirrored", "javaDefined", "javaDigit", "javaIdentifierIgnorable", "javaISOControl", "javaJavaIdentifierPart", "javaJavaIdentifierStart", "javaLetter", "javaLetterOrDigit", "javaSpaceChar", "javaTitleCase", "javaUnicodeIdentifierPart",
"javaUnicodeIdentifierStart", "Space", "w", "W", "s", "S", "d", "D", "BasicLatin", "Latin-1Supplement", "LatinExtended-A", "LatinExtended-B", "IPAExtensions", "SpacingModifierLetters", "CombiningDiacriticalMarks", "Greek", "Cyrillic", "CyrillicSupplement", "Armenian", "Hebrew", "Arabic", "Syriac", "ArabicSupplement", "Thaana", "Devanagari", "Bengali", "Gurmukhi", "Gujarati", "Oriya", "Tamil", "Telugu", "Kannada", "Malayalam", "Sinhala", "Thai", "Lao", "Tibetan", "Myanmar", "Georgian", "HangulJamo", "Ethiopic",
"EthiopicSupplement", "Cherokee", "UnifiedCanadianAboriginalSyllabics", "Ogham", "Runic", "Tagalog", "Hanunoo", "Buhid", "Tagbanwa", "Khmer", "Mongolian", "Limbu", "TaiLe", "NewTaiLue", "KhmerSymbols", "Buginese", "PhoneticExtensions", "PhoneticExtensionsSupplement", "CombiningDiacriticalMarksSupplement", "LatinExtendedAdditional", "GreekExtended", "GeneralPunctuation", "SuperscriptsandSubscripts", "CurrencySymbols", "CombiningMarksforSymbols", "LetterlikeSymbols", "NumberForms", "Arrows", "MathematicalOperators",
"MiscellaneousTechnical", "ControlPictures", "OpticalCharacterRecognition", "EnclosedAlphanumerics", "BoxDrawing", "BlockElements", "GeometricShapes", "MiscellaneousSymbols", "Dingbats", "MiscellaneousMathematicalSymbols-A", "SupplementalArrows-A", "BraillePatterns", "SupplementalArrows-B", "MiscellaneousMathematicalSymbols-B", "SupplementalMathematicalOperators", "MiscellaneousSymbolsandArrows", "Glagolitic", "Coptic", "GeorgianSupplement", "Tifinagh", "EthiopicExtended", "SupplementalPunctuation", "CJKRadicalsSupplement",
"KangxiRadicals", "IdeographicDescriptionCharacters", "CJKSymbolsandPunctuation", "Hiragana", "Katakana", "Bopomofo", "HangulCompatibilityJamo", "Kanbun", "BopomofoExtended", "CJKStrokes", "KatakanaPhoneticExtensions", "EnclosedCJKLettersandMonths", "CJKCompatibility", "CJKUnifiedIdeographsExtensionA", "YijingHexagramSymbols", "CJKUnifiedIdeographs", "YiSyllables", "YiRadicals", "ModifierToneLetters", "SylotiNagri", "HangulSyllables", "HighSurrogates", "HighPrivateUseSurrogates", "LowSurrogates", "PrivateUseArea",
"CJKCompatibilityIdeographs", "AlphabeticPresentationForms", "ArabicPresentationForms-A", "VariationSelectors", "VerticalForms", "CombiningHalfMarks", "CJKCompatibilityForms", "SmallFormVariants", "ArabicPresentationForms-B", "HalfwidthandFullwidthForms", "all", "Specials", "Cn", "IsL", "Lu", "Ll", "Lt", "Lm", "Lo", "IsM", "Mn", "Me", "Mc", "N", "Nd", "Nl", "No", "IsZ", "Zs", "Zl", "Zp", "IsC", "Cc", "Cf", "Co", "Cs", "IsP", "Pd", "Ps", "Pe", "Pc", "Po", "IsS", "Sm", "Sc", "Sk", "So", "Pi", "Pf", "main"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
let $rt_export_main = $rt_mainStarter(r_Main_main);
$rt_export_main.javaException = $rt_javaException;
let $rt_jso_marker = Symbol('jsoClass');
(() => {
    let c;
    c = otji_JSWrapper$Helper$_clinit_$lambda$_3_0.prototype;
    c.accept = $rt_callWithReceiver(otji_JSWrapper$Helper$_clinit_$lambda$_3_0_accept$exported$0);
    c = otji_JSWrapper$Helper$_clinit_$lambda$_3_1.prototype;
    c.accept = $rt_callWithReceiver(otji_JSWrapper$Helper$_clinit_$lambda$_3_1_accept$exported$0);
})();
export { $rt_export_main as main, r_Main_engineCount$exported$0 as engineCount, r_Main_engineInfo$exported$1 as engineInfo, r_Main_engineMatch$exported$2 as engineMatch };
