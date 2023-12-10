#!/usr/bin/env python

#-----------------------------------------------------------------------
# testLFSR.py
# Author: Jarrett Kirk
#-----------------------------------------------------------------------

import lfsr
import sys
from io import StringIO

def test_user_code(user_code):

    try:
        # Create a namespace for the user's code to be executed
        exec_globals = {}
        passed = 0
        result = ''
        err = ''

        print(user_code)

        original_stdout = sys.stdout
        sys.stdout = captured_output = StringIO()

        exec(user_code, exec_globals)

        # Restore the original stdout
        sys.stdout = original_stdout
        result = captured_output.getvalue()

        # Instantiate the LFSR class from the user's code
        user_lfsr_name = exec_globals.get("LFSR", None)

        # Run the test cases if the user's LFSR class is defined
        if user_lfsr_name:

            uL = user_lfsr_name([0, 0, 0, 1], [1, 1, 0, 0])
            mL = lfsr.myLFSR([0, 0, 0, 1], [1, 1, 0, 0])

            # preliminary tests
            assert uL.bits == mL.bits, "__init__() is failing"
            assert uL.taps == mL.taps, "__init__() is failing"

            # test step()
            uL.step()
            mL.step()
            assert uL.bits == mL.bits, "step() is failing"

            # test cycle()
            uL_cycle = uL.cycle()
            mL_cycle = mL.cycle()
            assert uL_cycle == mL_cycle, "cycle() is failing"
            assert uL.bits == mL.bits, "cycle() is failing"

            # test generate()
            uL_generate = uL.generate(10)
            mL_generate = mL.generate(10)
            assert uL_generate == mL_generate, "generate() is failing"
            assert uL.bits == mL.bits, "generate() is failing"

            # output test
            assert uL.output == mL.output, "output array is not the same"

            # all good!
            print("==================================")
            print("ALL TESTS PASSED!!!")
            print("==================================")
            passed = 1

        else:
            print("User's LFSR class not found.")

    except AssertionError as assertion_error:
        err = f"Assertion Error: {str(assertion_error)}"

    except Exception as e:
        err = f"Error: {str(e)}"

    return passed, result, err
