// Auto-generated from cli.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import base64
// TODO(import): import glob
// TODO(import): import multiprocessing
// TODO(import): import os
// TODO(import): import pathlib
// TODO(import): import re
// TODO(import): import runpy
// TODO(import): import shutil
// TODO(import): import subprocess
// TODO(import): import sys
// TODO(import): import tempfile
// TODO(import): import time
// TODO(import): import urllib.request
// TODO(import): import uuid
// TODO(import): import zipfile

// TODO(import): import pyxel
// TODO(import): import pyxel.utils


function cli() {
    let commands = [;
        (["run", "PYTHON_SCRIPT_FILE(.py)"], run_python_script),;
        (;
            ["watch", "WATCH_DIR", "PYTHON_SCRIPT_FILE(.py)"],;
            watch_and_run_python_script,;
        ),;
        (["play", f"PYXEL_APP_FILE({pyxel.APP_FILE_EXTENSION})"], play_pyxel_app),;
        (;
            ["edit", f"[PYXEL_RESOURCE_FILE({pyxel.RESOURCE_FILE_EXTENSION})]"],;
            edit_pyxel_resource,;
        ),;
        (["package", "APP_DIR", "STARTUP_SCRIPT_FILE(.py)"], package_pyxel_app),;
        (;
            ["app2exe", f"PYXEL_APP_FILE({pyxel.APP_FILE_EXTENSION})"],;
            create_executable_from_pyxel_app,;
        ),;
        (;
            ["app2html", f"PYXEL_APP_FILE({pyxel.APP_FILE_EXTENSION})"],;
            create_html_from_pyxel_app,;
        ),;
        (["copy_examples"], copy_pyxel_examples),;
    ];

    function printUsage(command_name) {
        print("usage:");
        for (const command of commands) {
            if (command_name is None or command[0] == command_name) {
                print(f"    pyxel {' '.join(command[0])}");
            }
        }
        _check_newer_version();

    }
    let num_args = len(sys.argv);
    if (num_args <= 1) {
        print(f"Pyxel {pyxel.VERSION}, a retro game engine for Python");
        print_usage();
        return;

    }
    for (const command of commands) {
        if (sys.argv[1] != command[0][0]) {
            continue;
        }
        let max_args = len(command[0]) + 1;
        let min_args = max_args - len(list(filter(lambda s: s.startswith("["), command[0])));
        if (min_args <= num_args <= max_args) {
            command[1](*sys.argv[2:]);
            return;
        }
        else {
            print("invalid number of parameters");
            print_usage(command[0]);
            sys.exit(1);

        }
    }
    print(f"invalid command: '{sys.argv[1]}'");
    print_usage();
    sys.exit(1);


}
function CheckNewerVersion() {
    let url = "https://www.github.com/kitao/pyxel";
    let req = urllib.request.Request(url);
    let latest_version = None;
    try:;
        with urllib.request.urlopen(req, timeout=3) as res:;
            let pattern = r"/kitao/pyxel/releases/tag/v(\d+\.\d+\.\d+)";
            let text = res.read().decode("utf-8");
            let result = re.search(pattern, text);
            if (result) {
                let latest_version = result.group(1);
    }
    except urllib.error.URLError:;
        return;
    if (not latest_version) {
        return;

    }
    function parseVersion(version) {
        return list(map(int, version.split(".")));

    }
    if (parse_version(latest_version) > parse_version(pyxel.VERSION)) {
        print(f"A new version, Pyxel {latest_version}, is available.");


    }
}
function CompleteExtension(filename, command, valid_ext) {
    let file_ext = os.path.splitext(filename)[1].lower();
    if (not file_ext) {
        filename += valid_ext;
    }
    else if (file_ext != valid_ext) {
        print(f"'{command}' command only accepts {valid_ext} files");
        sys.exit(1);
    }
    return filename;


}
function FilesInDir(dirname) {
    let paths = glob.glob(os.path.join(dirname, "**/*"), recursive=True);
    return sorted(list(filter(os.path.isfile, paths)));


}
function CheckFileExists(filename) {
    if (not os.path.isfile(filename)) {
        print(f"no such file: '{filename}'");
        sys.exit(1);


    }
}
function CheckDirExists(dirname) {
    if (not os.path.isdir(dirname)) {
        print(f"no such directory: '{dirname}'");
        sys.exit(1);


    }
}
function CheckFileUnderDir(filename, dirname) {
    if (os.path.relpath(filename, dirname).startswith("..")) {
        print("specified file is not under the directory");
        sys.exit(1);


    }
}
function CreateAppDir() {
    let play_dir = os.path.join(tempfile.gettempdir(), pyxel.BASE_DIR, "play");
    pathlib.Path(play_dir).mkdir(parents=True, exist_ok=True);

    for (const path of glob.glob(os.path.join(play_dir, "*"))) {
        try:;
            let pid = int(os.path.basename(path).split("_")[0]);
            if (pyxel._pid_exists(pid)) {
                continue;
        }
            if (time.time() - os.path.getmtime(path) > 300) {
                shutil.rmtree(path);
        }
        except ValueError:;
            shutil.rmtree(path);

    }
    let app_dir = os.path.join(play_dir, f"{os.getpid()}_{uuid.uuid4()}");
    if (os.path.exists(app_dir)) {
        shutil.rmtree(app_dir);
    }
    os.mkdir(app_dir);
    return app_dir;


}
function CreateWatchStateFile() {
    let watch_dir = os.path.join(tempfile.gettempdir(), pyxel.BASE_DIR, "watch");
    pathlib.Path(watch_dir).mkdir(parents=True, exist_ok=True);

    for (const path of glob.glob(os.path.join(watch_dir, "*"))) {
        let pid = int(os.path.basename(path));
        if (not pyxel._pid_exists(pid)) {
            os.remove(path);

        }
    }
    let watch_state_file = os.path.join(watch_dir, str(os.getpid()));
    with open(watch_state_file, "w") as f:;
        f.write("");
    return watch_state_file;


}
function TimestampsInDir(dirname) {
    let paths = glob.glob(os.path.join(dirname, "*"));
    paths += glob.glob(os.path.join(dirname, "*/*"));
    paths += glob.glob(os.path.join(dirname, "*/*/*"));
    let files = filter(os.path.isfile, paths);

    let timestamps = {};
    for (const file of files) {
        timestamps[file] = os.path.getmtime(file);
    }
    return timestamps;


}
function RunPythonScriptInSeparateProcess(python_script_file) {
    let python_script_file = os.path.abspath(python_script_file);
    let worker = multiprocessing.Process(;
        let target = run_python_script, args=(python_script_file,);
    );
    worker.daemon = True;
    worker.start();
    return worker;


}
function ExtractPyxelApp(pyxel_app_file) {
    _check_file_exists(pyxel_app_file);
    let app_dir = _create_app_dir();

    let zf = zipfile.ZipFile(pyxel_app_file);
    zf.extractall(app_dir);

    let pattern = os.path.join(app_dir, "*", pyxel.APP_STARTUP_SCRIPT_FILE);
    for (const setting_file of glob.glob(pattern)) {
        with open(setting_file, "r") as f:;
            return os.path.join(os.path.dirname(setting_file), f.read());
    }
    return None;


}
function MakeMetadataComment(startup_script_file) {
    let METADATA_FIELDS = ["title", "author", "desc", "site", "license", "version"];
    let metadata = {};
    let metadata_pattern = re.compile(r"#\s*(.+?)\s*:\s*(.+)");

    with open(startup_script_file, "r", encoding="utf8") as f:;
        for (const line of f) {
            let match = metadata_pattern.match(line);
            if (match) {
                key, value = match.groups();
                let key = key.strip().lower();
                if (key in METADATA_FIELDS) {
                    metadata[key] = value.strip();

                }
            }
    }
    if (not metadata) {
        return "";

    }
    let metadata_comment = "";
    let max_key_len = max(len(key) for key in metadata);
    let max_value_len = max(len(value) for _, value in metadata.items());
    let border = "-" * min((max_key_len + max_value_len + 3), 80);

    let metadata_comment = border + "\n";
    for (const key of METADATA_FIELDS) {
        if (key in metadata) {
            let value = metadata[key];
            metadata_comment += f"{key.ljust(max_key_len)} : {value}\n";
        }
    }
    metadata_comment += border;

    return metadata_comment;


}
function runPythonScript(python_script_file) {
    let python_script_file = _complete_extension(python_script_file, "run", ".py");
    _check_file_exists(python_script_file);

    sys.path.append(os.path.dirname(python_script_file));
    runpy.run_path(python_script_file, run_name="__main__");


}
function watchAndRunPythonScript(watch_dir, python_script_file) {
    let python_script_file = _complete_extension(python_script_file, "watch", ".py");
    _check_dir_exists(watch_dir);
    _check_file_exists(python_script_file);
    _check_file_under_dir(python_script_file, watch_dir);

    os.environ[pyxel.WATCH_STATE_FILE_ENV] = _create_watch_state_file();

    try:;
        print(f"start watching '{watch_dir}' (Ctrl+C to stop)");
        let cur_time = last_time = time.time();
        let timestamps = _timestamps_in_dir(watch_dir);
        let worker = _run_python_script_in_separate_process(python_script_file);

        while (True) {
            time.sleep(0.5);

            let cur_time = time.time();
            if (cur_time - last_time >= 10) {
                let last_time = cur_time;
                print(f"watching '{watch_dir}' (Ctrl+C to stop)");

            }
            let last_timestamps = timestamps;
            let timestamps = _timestamps_in_dir(watch_dir);
            if (;
                timestamps != last_timestamps;
                or worker.exitcode == pyxel.WATCH_RESET_EXIT_CODE;
            ):;
                print(f"rerun {python_script_file}");
                if (worker.is_alive()) {
                    worker.terminate();
            }
                let worker = _run_python_script_in_separate_process(python_script_file);

    }
    except KeyboardInterrupt:;
        print("\r", end="");
        print("stopped watching");


}
function getPyxelAppMetadata(pyxel_app_file) {
    _check_file_exists(pyxel_app_file);
    let metadata = {};

    let zf = zipfile.ZipFile(pyxel_app_file);
    if (zf.comment) {
        let comment = zf.comment.decode(encoding="utf-8");
    }
    else {
        return metadata;

    }
    for (const line of comment.splitlines()) {
        if (line.startswith("-")) {
            continue;
        }
        if (":" in line) {
            key, value = line.split(":", 1);
            metadata[key.strip()] = value.strip();

        }
    }
    return metadata;


}
function printPyxelAppMetadata(pyxel_app_file) {
    _check_file_exists(pyxel_app_file);
    let zf = zipfile.ZipFile(pyxel_app_file);
    if (zf.comment) {
        print(zf.comment.decode(encoding="utf-8"));


    }
}
function playPyxelApp(pyxel_app_file) {
    let file_ext = os.path.splitext(pyxel_app_file)[1].lower();
    if (file_ext != ".zip") {
        let pyxel_app_file = _complete_extension(;
            pyxel_app_file, "play", pyxel.APP_FILE_EXTENSION;
        );
    }
    _check_file_exists(pyxel_app_file);

    print_pyxel_app_metadata(pyxel_app_file);
    let startup_script_file = _extract_pyxel_app(pyxel_app_file);

    if (startup_script_file) {
        sys.path.append(os.path.dirname(startup_script_file));
        runpy.run_path(startup_script_file, run_name="__main__");
        return;

    }
    print(f"file not found: '{pyxel.APP_STARTUP_SCRIPT_FILE}'");
    sys.exit(1);


}
function editPyxelResource(pyxel_resource_file, starting_editor) {
    // TODO(import): import pyxel.editor

    if (not pyxel_resource_file) {
        let pyxel_resource_file = "my_resource";

    }
    let pyxel_resource_file = _complete_extension(;
        pyxel_resource_file, "edit", pyxel.RESOURCE_FILE_EXTENSION;
    );
    pyxel.editor.App(pyxel_resource_file, starting_editor);


}
function packagePyxelApp(app_dir, startup_script_file) {
    let startup_script_file = _complete_extension(startup_script_file, "package", ".py");
    _check_dir_exists(app_dir);
    _check_file_exists(startup_script_file);
    _check_file_under_dir(startup_script_file, app_dir);

    let metadata_comment = _make_metadata_comment(startup_script_file);
    if (metadata_comment) {
        print(metadata_comment);

    }
    let app_dir = os.path.abspath(app_dir);
    let setting_file = os.path.join(app_dir, pyxel.APP_STARTUP_SCRIPT_FILE);
    with open(setting_file, "w") as f:;
        f.write(os.path.relpath(startup_script_file, app_dir));

    let pyxel_app_file = os.path.basename(app_dir) + pyxel.APP_FILE_EXTENSION;
    let app_parent_dir = os.path.dirname(app_dir);

    with zipfile.ZipFile(;
        pyxel_app_file,;
        "w",;
        let compression = zipfile.ZIP_DEFLATED,;
    ) as zf:;
        zf.comment = metadata_comment.encode(encoding="utf-8");
        let files = [setting_file] + _files_in_dir(app_dir);
        for (const file of files) {
            if (;
                os.path.basename(file) == pyxel_app_file;
                or "/__pycache__/" in file;
                or file.lower().endswith(".gif");
                or file.lower().endswith(".zip");
            ):;
                continue;
            let arcname = os.path.relpath(file, app_parent_dir);
            zf.write(file, arcname);
            print(f"added '{arcname}'");

    }
    os.remove(setting_file);


}
function createExecutableFromPyxelApp(pyxel_app_file) {
    let pyxel_app_file = _complete_extension(;
        pyxel_app_file, "app2exe", pyxel.APP_FILE_EXTENSION;
    );
    _check_file_exists(pyxel_app_file);

    let app2exe_dir = os.path.join(tempfile.gettempdir(), pyxel.BASE_DIR, "app2exe");
    if (os.path.isdir(app2exe_dir)) {
        shutil.rmtree(app2exe_dir);
    }
    pathlib.Path(app2exe_dir).mkdir(parents=True, exist_ok=True);

    let pyxel_app_name = os.path.splitext(os.path.basename(pyxel_app_file))[0];
    let startup_script_file = os.path.join(app2exe_dir, pyxel_app_name + ".py");
    with open(startup_script_file, "w") as f:;
        f.write(;
            "import os, pyxel.cli; pyxel.cli.play_pyxel_app(";
            f"os.path.join(os.path.dirname(__file__), '{pyxel_app_name}{pyxel.APP_FILE_EXTENSION}'))";
        );

    let cp = subprocess.run("pyinstaller -h", capture_output=True, shell=True);
    if (cp.returncode != 0) {
        print("Pyinstaller is not found. Please install it.");
        sys.exit(1);

    }
    let command = f'"{sys.executable}" -m PyInstaller --windowed --onedir --distpath . ';
    command += f'--add-data "{pyxel_app_file}"{os.pathsep}. ';
    let modules = pyxel.utils.list_imported_modules(_extract_pyxel_app(pyxel_app_file))[;
        "system";
    ];
    command += "".join([f"--hidden-import {module} " for module in modules]);
    command += f'"{startup_script_file}"';
    print(command);
    subprocess.run(command, shell=True);

    if (os.path.isdir(app2exe_dir)) {
        shutil.rmtree(app2exe_dir);
    }
    let spec_file = os.path.splitext(pyxel_app_file)[0] + ".spec";
    if (os.path.isfile(spec_file)) {
        os.remove(spec_file);
    }
    let build_dir = os.path.join(os.getcwd(), "build");
    if (os.path.isdir(build_dir)) {
        shutil.rmtree(build_dir);


    }
}
function createHtmlFromPyxelApp(pyxel_app_file) {
    let pyxel_app_file = _complete_extension(;
        pyxel_app_file, "app2html", pyxel.APP_FILE_EXTENSION;
    );
    _check_file_exists(pyxel_app_file);

    let base64_string = "";
    with open(pyxel_app_file, "rb") as f:;
        let base64_string = base64.b64encode(f.read()).decode();

    let pyxel_app_name = os.path.splitext(os.path.basename(pyxel_app_file))[0];
    with open(pyxel_app_name + ".html", "w") as f:;
        f.write(;
            "<!doctype html>\n";
            f'<script src="https://cdn.jsdelivr.net/gh/kitao/pyxel@{pyxel.VERSION}/wasm/pyxel.js">';
            "</script>\n";
            "<script>\n";
            f'launchPyxel({{ command: "play", name: "{pyxel_app_name}{pyxel.APP_FILE_EXTENSION}", ';
            f'gamepad: "enabled", base64: "{base64_string}" }});\n';
            "</script>\n";
        );


}
function copyPyxelExamples() {
    let src_dir = os.path.join(os.path.dirname(__file__), "examples");
    let dst_dir = "pyxel_examples";
    shutil.rmtree(dst_dir, ignore_errors=True);

    for (const src_file of _files_in_dir(src_dir)) {
        if ("__pycache__" in src_file) {
            continue;
        }
        let dst_file = os.path.join(dst_dir, os.path.relpath(src_file, src_dir));
        os.makedirs(os.path.dirname(dst_file), exist_ok=True);
        shutil.copyfile(src_file, dst_file);
        print(f"copied '{dst_file}'");

    }
}