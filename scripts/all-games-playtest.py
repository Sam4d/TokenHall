"""Compatibility entry point for the integrated 3D-floor checks."""
import runpy
from pathlib import Path
runpy.run_path(str(Path(__file__).with_name('floor-playtest.py')),run_name="__main__")
