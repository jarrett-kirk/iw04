from RestrictedPython import compile_restricted
from RestrictedPython.PrintCollector import PrintCollector


_print_ = PrintCollector

code_string = """
print('Hello outer world!')
results = printed
"""

# Compile and excecute restricted code:
compiled_code = compile_restricted(code_string, '<string>', 'exec')
exec(compiled_code)

# Now we have `results` available as a global:
print(results.split('\n')) # convert string into list of lines

# We should get:
# >>> ['Hello inner world!', 'Hello outer world!', '', '']