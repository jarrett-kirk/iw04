from RestrictedPython import safe_builtins, compile_restricted
from RestrictedPython.Eval import default_guarded_getitem


def execute_user_code(user_code, user_func, *args, **kwargs):
    """ Executed user code in restricted env
        Args:
            user_code(str) - String containing the unsafe code
            user_func(str) - Function inside user_code to execute and return value
            *args, **kwargs - arguments passed to the user function
        Return:
            Return value of the user_func
    """

    def _apply(f, *a, **kw):
        return f(*a, **kw)

    try:
        # This is the variables we allow user code to see. @result will contain return value.
        restricted_locals = {
            "result": None,
            "args": args,
            "kwargs": kwargs,
        }

        # If you want the user to be able to use some of your functions inside his code,
        # you should add this function to this dictionary.
        # By default many standard actions are disabled. Here I add _apply_ to be able to access
        # args and kwargs and _getitem_ to be able to use arrays. Just think before you add
        # something else. I am not saying you shouldn't do it. You should understand what you
        # are doing thats all.
        restricted_globals = {
            "__builtins__": safe_builtins,
            "_getitem_": default_guarded_getitem,
            "_apply_": _apply,
        }

        # Add another line to user code that executes @user_func
        user_code += "\nresult = {0}(*args, **kwargs)".format(user_func)

        # Compile the user code
        byte_code = compile_restricted(user_code, filename="<user_code>", mode="exec")

        # Run it
        exec(byte_code, restricted_globals, restricted_locals)

        # User code has modified result inside restricted_locals. Return it.
        return restricted_locals["result"]

    except SyntaxError as e:
        # Do whaever you want if the user has code that does not compile
        raise
    except Exception as e:
        # The code did something that is not allowed. Add some nasty punishment to the user here.
        raise

example = """
#!/usr/bin/env python

#-----------------------------------------------------------------------
# lfsr.py
# Author: Jarrett Kirk
#-----------------------------------------------------------------------

# citations
# https://pine-j.medium.com/how-to-html-canvas-buttons-396267c6e5b5

from functools import reduce
from operator import xor

class LFSR():
    def __init__(self, fill, taps):
        self.register = fill
        self.taps = taps

    def step(self):
        new_bit = reduce(xor, [self.register[(len(self.register)-1)-t] for t in self.taps]) # binary number, read from right to left
        del self.register[0]
        self.register.append(new_bit)
        return self.register[-1]
   
    def rand(self, k):
        num = 0
        for _ in range(k):      
            num *= 2
            num += self.step()
        return num

    def __str__(self):
        return "<LFSR: {}, taps: {}>".format(''.join(map(str,self.register)), self.taps)

#-----------------------------------------------------------------------

def main():
    register = LFSR(fill=[0,1,1,0,1,0,0,0,0,1,0], taps=[6])

    # advance the register 3 steps
    for i in range(3):
        register.step()
        print("Step {}\\n{}".format(i+1, register))

    # generate a couple of pseudorandom numbers
    print("Pseudorandom numbers:")
    for _ in range(3):
        print(register.rand(8))

#-----------------------------------------------------------------------

"""
# Lets see how this works
print(execute_user_code(example, "test", 5))
# Result: Johny likes 25