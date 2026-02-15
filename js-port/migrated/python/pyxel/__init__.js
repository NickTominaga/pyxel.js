// Auto-generated from __init__.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import os
// TODO(import): import sys

// TODO(import): from .pyxel_wrapper import *  # type: ignore  # noqa: F403

// TODO(python): _reset_info = {
    // TODO(python): "exec": sys.executable,
    // TODO(python): "cwd": os.getcwd(),
    // TODO(python): "argv": getattr(sys, "orig_argv", sys.argv[:]),
};


function Reset() {
    if (WATCH_STATE_FILE_ENV in os.environ) {
        os._exit(WATCH_RESET_EXIT_CODE);

    }
    if (sys.platform == "darwin") {
        // TODO(python): try:
            // TODO(python): with open(os.devnull, "wb") as f:
                os.dup2(f.fileno(), 2);
        // TODO(python): except OSError:
            // pass

    }
    // TODO(import): import subprocess

    subprocess.Popen(;
        // TODO(python): [_reset_info["exec"]] + _reset_info["argv"][1:],
        // TODO(python): cwd=_reset_info["cwd"],
        // TODO(python): env=os.environ.copy(),
    // TODO(python): )
    sys.exit(0);


}
_set_reset_func(_reset);
