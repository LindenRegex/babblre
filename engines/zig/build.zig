const std = @import("std");
pub fn build(b: *std.Build) void {
    const target = b.resolveTargetQuery(.{ .cpu_arch = .wasm32, .os_tag = .freestanding });
    const optimize: std.builtin.OptimizeMode = .ReleaseSmall;
    const regex_mod = b.createModule(.{ .root_source_file = b.path("../../vendor/zig-regex/src/regex.zig"), .target = target, .optimize = optimize });
    const root_mod = b.createModule(.{ .root_source_file = b.path("bridge.zig"), .target = target, .optimize = optimize });
    root_mod.addImport("regex", regex_mod);
    const exe = b.addExecutable(.{ .name = "zig_regex", .root_module = root_mod });
    exe.entry = .disabled;
    exe.rdynamic = true;
    b.installArtifact(exe);
}
