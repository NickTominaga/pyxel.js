// Auto-generated from import_hook.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import importlib.util
// TODO(import): import inspect
// TODO(import): import os.path
// TODO(import): import sys


class ImportHook {
    constructor() {
        this.imported_modules = set();
        this.main_dir = null;

    }
    findSpec(fullname, path, target) {
        // Skip imported modules if already processed, built-in, or in sys.modules
        if (;
            fullname in this.imported_modules;
            || fullname in sys.builtin_module_names;
            || fullname in sys.modules;
            || fullname in ("_hashlib", "_uuid", "ssl");
        // TODO(python): ):
            return null;

        this.imported_modules.add(fullname);

        // Skip imported modules from the standard library or installed packages
        let spec = importlib.util.find_spec(fullname);
        if (spec) {
            if (;
                spec.origin;
                in (;
                    // TODO(python): None,
                    // TODO(python): "built-in",
                    // TODO(python): "builtin",
                    // TODO(python): "frozen",
                // TODO(python): )
                || "site-packages" in spec.origin;
                || "dist-packages" in spec.origin;
                || os.path.realpath(spec.origin).startswith(;
                    os.path.realpath(sys.base_prefix);
                // TODO(python): )
            // TODO(python): ):
                return null;

        }
        // Find the script that triggered the import
        let caller_file = next(;
            // TODO(python): (
                frame.filename;
                for frame in inspect.stack();
                if ! frame.filename.startswith("<");
            // TODO(python): ),
            // TODO(python): None,
        // TODO(python): )
        if (! caller_file) {
            return null;

        }
        // Trigger file download for missing modules in the caller's directory
        print(`Attempting to import '{fullname}'`);
        let caller_dir = os.path.dirname(os.path.abspath(caller_file));
        let module_name = fullname.replace(".", os.sep);
        let module_path = os.path.join(caller_dir, `{module_name}.py`);
        let package_path = os.path.join(caller_dir, module_name, "__init__.py");
        // TODO(python): is_found = (
            os.path.exists(module_name);
            || os.path.exists(module_path);
            || os.path.exists(package_path);
        // TODO(python): )
        if (is_found && this.main_dir === null) {
            this.main_dir = caller_dir;

        }
        // Trigger file download from the main directory if needed
        if (this.main_dir && this.main_dir != caller_dir) {
            let main_module_path = os.path.join(this.main_dir, `{module_name}.py`);
            let main_package_path = os.path.join(this.main_dir, module_name, "__init__.py");
            os.path.exists(main_module_path) || os.path.exists(main_package_path);

        }
        return null;


    }
}
sys.meta_path.insert(0, ImportHook());
