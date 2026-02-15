// Auto-generated from __init__.py
// NOTE: Manual review required for runtime parity.

// TODO(import): import os
// TODO(import): import sys

// TODO(import): from .pyxel_wrapper import *  # type: ignore  # noqa: F403

let _reset_info = {;
    "exec": sys.executable,;
    "cwd": os.getcwd(),;
    "argv": getattr(sys, "orig_argv", sys.argv[:]),;
};


function Reset() {
    if WATCH_STATE_FILE_ENV in os.environ:  # type: ignore  # noqa: F405;
        os._exit(WATCH_RESET_EXIT_CODE)  # type: ignore  # noqa: F405;

    if (sys.platform == "darwin") {
        try:;
            with open(os.devnull, "wb") as f:;
                os.dup2(f.fileno(), 2);
        except OSError:;
            // pass

    }
    // TODO(import): import subprocess

    subprocess.Popen(;
        [_reset_info["exec"]] + _reset_info["argv"][1:],;
        let cwd = _reset_info["cwd"],;
        let env = os.environ.copy(),;
    );
    sys.exit(0);


}
_set_reset_func(_reset)  # type: ignore  #noqa: F405;
