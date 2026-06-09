const std = @import("std");
const Regex = @import("regex").Regex;

var arena_buf: [1 << 22]u8 = undefined;
var heap_buf: [1 << 20]u8 = undefined;
var heap_top: usize = 0;
var out_buf: [1 << 18]u8 = undefined;
var out_len: usize = 4;

export fn alloc(len: usize) ?[*]u8 {
    if (len > heap_buf.len - heap_top) return null; // loader reports "input too large"
    const base: [*]u8 = @ptrCast(&heap_buf);
    const p = base + heap_top;
    heap_top += len;
    return p;
}
export fn dealloc(ptr: [*]u8, len: usize) void {
    // bump allocator: both inputs are dead once a request finishes
    _ = ptr;
    _ = len;
    heap_top = 0;
}

fn emit(s: []const u8) void {
    for (s) |ch| {
        if (out_len < out_buf.len) {
            out_buf[out_len] = ch;
            out_len += 1;
        }
    }
}
fn emitNum(n: usize) void {
    var tmp: [20]u8 = undefined;
    emit(std.fmt.bufPrint(&tmp, "{d}", .{n}) catch unreachable);
}
fn finish() [*]u8 {
    std.mem.writeInt(u32, out_buf[0..4], @intCast(out_len - 4), .little);
    return @ptrCast(&out_buf[0]);
}

export fn engine_count() usize {
    return 1;
}

export fn engine_info(i: usize) [*]u8 {
    _ = i;
    out_len = 4;
    emit("{\"id\":\"zig-regex\",\"name\":\"zig-regex\",\"flavor\":\"backtracking (full)\",\"family\":\"other\",\"version\":\"\",\"url\":\"https://github.com/tiehuis/zig-regex\"}");
    return finish();
}

export fn engine_match(i: usize, pp: [*]const u8, pl: usize, ip: [*]const u8, il: usize) [*]u8 {
    _ = i;
    out_len = 4;
    var fba = std.heap.FixedBufferAllocator.init(&arena_buf);
    const a = fba.allocator();
    const pat = pp[0..pl];
    const input = ip[0..il];
    var re = Regex.compile(a, pat) catch {
        emit("{\"error\":\"compile error\"}");
        heap_top = 0;
        return finish();
    };
    const maybe = re.captures(input) catch {
        emit("{\"error\":\"exec error\"}");
        heap_top = 0;
        return finish();
    };
    if (maybe) |c| {
        emit("{\"matched\":true,\"groups\":[");
        var k: usize = 0;
        const n = re.compiled.slot_count / 2;
        while (k < n) : (k += 1) {
            if (k != 0) emit(",");
            if (c.boundsAt(k)) |sp| {
                emit("[");
                emitNum(sp.lower);
                emit(",");
                emitNum(sp.upper);
                emit("]");
            } else emit("null");
        }
        emit("]}");
    } else {
        emit("{\"matched\":false,\"groups\":[]}");
    }
    heap_top = 0;
    return finish();
}
