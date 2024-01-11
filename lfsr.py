#!/usr/bin/env python

#-----------------------------------------------------------------------
# lfsr.py
# Author: Jarrett Kirk
#-----------------------------------------------------------------------

from PIL import Image

class myLFSR():

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

#-----------------------------------------------------------------------

def transform(input_image_path, output_image_path, lfsr_seed, lfsr_taps):
   # Load the image
   original_image = Image.open(input_image_path)
   width, height = original_image.size

   # Initialize the LFSR
   lfsr = LFSR(lfsr_seed, lfsr_taps)

   # Create a new image for obfuscated pixels
   obfuscated_image = Image.new('RGB', (width, height))

   # Iterate through each pixel in the original image
   for x in range(width):
      for y in range(height):
         # Get the RGB values of the original pixel
         original_pixel = original_image.getpixel((x, y))

         # Obfuscate the RGB values using LFSR
         obfuscated_pixel = tuple([pixel ^ lfsr.generate(8) for pixel in original_pixel])

         # Set the obfuscated pixel in the new image
         obfuscated_image.putpixel((x, y), obfuscated_pixel)

         # Advance the LFSR state
         lfsr.step()

   # Save the obfuscated image
   obfuscated_image.save(output_image_path)

# initialize an lfsr
lfsr = myLFSR([0, 0, 0, 1], [1, 0, 0, 1])

# test step and print bits before and after
print("lfsr.bits before step: ", lfsr.bits)
lfsr.step()
print("lfsr.bits after step: ", lfsr.bits)

k = lfsr.generate(5)
print(k)


    # ----- perform other tests ----- #