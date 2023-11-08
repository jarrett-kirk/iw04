import subprocess

user_code = """
def main():
    return 289

main()
"""

result = subprocess.check_output(["python", "-c", user_code])

from RestrictedPython import compile_restricted
from RestrictedPython import safe_globals

source_code = """

def main():
    def example(x, y):
        return x + y
    return example(4, 6)
"""
loc = {}
byte_code = compile_restricted(source_code, '<inline>', 'exec')
exec(byte_code, safe_globals, loc)
print(loc['main']())