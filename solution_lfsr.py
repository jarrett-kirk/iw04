class LFSR():

   def __init__(self, bits, taps):
      self.bits = bits
      self.taps = taps
      self.output = []

   def step(self):
      lastIndex = len(self.bits) - 1
      outputBit = self.bits[lastIndex]
      self.output.append(outputBit)

      # shift the bits
      self.bits = self.bits[:lastIndex]
      self.bits = [outputBit] + self.bits

      # if output is 1, flip bits in tap positions
      if outputBit == 1:
         for i in range(len(self.bits)):
            # ignore first tap position
            if i == 0:
               continue
            # XOR bits with outputBit
            if (self.taps[i] == 1):
               self.bits[i] = self.bits[i] ^ outputBit

      return outputBit

   def generate(self, k):
      for _ in range(k - 1):      
         self.step()
      return self.output

   def cycle(self):
      originalState = self.bits
      cycle_count = 0

      while True: 
         self.step()
         cycle_count = cycle_count + 1
         if (originalState == self.bits):
            break

      return cycle_count
