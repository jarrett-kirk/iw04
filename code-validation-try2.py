user_code = """
def lfsr():
    print(289)
    print("yes yes yes")
    return 48
"""

try:
    # Execute the user-submitted code
    exec_globals = {}
    exec(user_code, exec_globals)

    # Capture the output of the user-submitted code
    console_output = []
    def custom_print(*args, **kwargs):
        message = ' '.join(map(str, args))
        console_output.append(message)

    # Redirect the print function to capture output
    exec_globals['print'] = custom_print

    # Run the user-defined function
    if 'lfsr' in exec_globals and callable(exec_globals['lfsr']):
        x = exec_globals['lfsr']()
        print(x)

    # Return the captured console output to the HTML page
    result = '\n'.join(console_output)

except Exception as e:
    result = f"Error: {str(e)}"
