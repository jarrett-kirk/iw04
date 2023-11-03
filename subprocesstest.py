import subprocess

code_string = """
print('Hello outer world!')
x = 4 
y = 6
print(x+y)
if x == 4:
    print('yes')
"""
result = subprocess.run(["python", "-c", code_string], capture_output = True, text = True)

print(result.stdout)
print(result.stderr)