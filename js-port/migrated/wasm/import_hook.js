// Auto-generated from import_hook.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import importlib.util
// TODO(import): import inspect
// TODO(import): import os.path
// TODO(import): import sys


class ImportHook {
    constructor() {
        this.imported_modules = set();
        this.main_dir = None;

    }
    findSpec(fullname, path, target) {
        // Skip imported modules if already processed, built-in, or in sys.modules
        if (;
            fullname in this.imported_modules;
            or fullname in sys.builtin_module_names;
            or fullname in sys.modules;
            or fullname in ("_hashlib", "_uuid", "ssl");
        ):;
            return None;

        this.imported_modules.add(fullname);

        // Skip imported modules from the standard library or installed packages
        let spec = importlib.util.find_spec(fullname);
        if (spec) {
            if (;
                spec.origin;
                in (;
                    None,;
                    "built-in",;
                    "builtin",;
                    "frozen",;
                );
                or "site-packages" in spec.origin;
                or "dist-packages" in spec.origin;
                or os.path.realpath(spec.origin).startswith(;
                    os.path.realpath(sys.base_prefix);
                );
            ):;
                return None;

        }
        // Find the script that triggered the import
        let caller_file = next(;
            (;
                frame.filename;
                for frame in inspect.stack();
                if not frame.filename.startswith("<");
            ),;
            None,;
        );
        if (not caller_file) {
            return None;

        }
        // Trigger file download for missing modules in the caller's directory
        print(f"Attempting to import '{fullname}'");
        let caller_dir = os.path.dirname(os.path.abspath(caller_file));
        let module_name = fullname.replace(".", os.sep);
        let module_path = os.path.join(caller_dir, f"{module_name}.py");
        let package_path = os.path.join(caller_dir, module_name, "__init__.py");
        let is_found = (;
            os.path.exists(module_name);
            or os.path.exists(module_path);
            or os.path.exists(package_path);
        );
        if (is_found and this.main_dir is None) {
            this.main_dir = caller_dir;

        }
        // Trigger file download from the main directory if needed
        if (this.main_dir and this.main_dir != caller_dir) {
            let main_module_path = os.path.join(this.main_dir, f"{module_name}.py");
            let main_package_path = os.path.join(this.main_dir, module_name, "__init__.py");
            os.path.exists(main_module_path) or os.path.exists(main_package_path);

        }
        return None;


    }
}
sys.meta_path.insert(0, ImportHook());
