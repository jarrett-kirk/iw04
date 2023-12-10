class LFSR():

    # Initialize an lfsr with three arrays: bits, taps, and an empty output array.
    def __init__(self, bits, taps):

    # Perform one step through the lfsr and return the output bit. A good approach would be to
    # first shift the bits, and then if the output bit is 1, XOR all the bits with a tap position
    # whos value is 1
    def step(self):
        return 0

    # Takes in an integer k, and returns an array of size k. The contents of the array should be
    # produced by using the step() function.
    def generate(self, k):
        return 0

    # Take the current state of the LFSR and perform step() until it comes back around to the
    # original state. Return the number of steps it required.
    def cycle(self):
        return 0

# Example testing.
def main():
    # Initialize an lfsr.
    lfsr = LFSR([0, 0, 0, 1], [1, 0, 0, 1])

    # Test step and print bits before and after.
    print("lfsr.bits before step: ", lfsr.bits)
    lfsr.step()
    print("lfsr.bits after step: ", lfsr.bits)

    # ----- Perform other tests. ----- #
