// Auto-generated from utils.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import ast
// TODO(import): import os


function ToModuleFilename(module_path) {
    let filename = module_path + ".py";
    if (os.path.isfile(filename)) {
        return filename;
    }
    else if (os.path.isdir(module_path)) {
        let filename = os.path.join(module_path, "__init__.py");
        if (os.path.isfile(filename)) {
            return filename;
        }
    }
    return null;


}
function ListImportedModules(imports, filename, checked_files) {
    if (filename in checked_files) {
        return;
    }
    checked_files.add(filename);

    let dir_path = os.path.dirname(filename);
    // TODO(python): with open(filename, encoding="utf8") as file:
        let root = ast.parse(file.read());

    for (const node of ast.walk(root)) {
        if (isinstance(node, ast.Import)) {
            for (const alias of node.names) {
                let module_path = os.path.join(dir_path, alias.name.replace(".", os.sep));
                let module_filename = _to_module_filename(module_path);

                if (module_filename) {
                    imports["local"].add(os.path.abspath(module_filename));
                    _list_imported_modules(imports, module_filename, checked_files);
                }
                else {
                    imports["system"].add(alias.name);

                }
            }
        }
        else if (isinstance(node, ast.ImportFrom)) {
            if (node.module) {
                let module_path = os.path.join(;
                    // TODO(python): dir_path,
                    // TODO(python): *([".."] * (node.level - 1)),
                    // TODO(python): node.module.replace(".", os.sep),
                // TODO(python): )
                let module_filename = _to_module_filename(module_path);

                if (module_filename) {
                    imports["local"].add(os.path.abspath(module_filename));
                    _list_imported_modules(imports, module_filename, checked_files);
                }
                else if (node.level == 0) {
                    imports["system"].add(node.module);
                }
            }
            else {
                for (const alias of node.names) {
                    let module_path = os.path.join(;
                        // TODO(python): dir_path,
                        // TODO(python): *([".."] * (node.level - 1)),
                        // TODO(python): alias.name.replace(".", os.sep),
                    // TODO(python): )
                    let module_filename = _to_module_filename(module_path);

                    if (module_filename) {
                        imports["local"].add(module_filename);
                        _list_imported_modules(imports, module_filename, checked_files);
                    }
                    else {
                        imports["system"].add(alias.name);


                    }
                }
            }
        }
    }
}
function listImportedModules(filename) {
    let imports = {"system": set(), "local": set()};
    let checked_files = set();
    _list_imported_modules(imports, filename, checked_files);

    return {;
        // TODO(python): "system": sorted(imports["system"]),
        // TODO(python): "local": sorted(imports["local"]),
    };

}