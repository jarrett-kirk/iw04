// citations: https://www.tutorialspoint.com/how-to-display-a-dialog-box-on-the-page

var editor = CodeMirror.fromTextArea(document.getElementById("codetext"), { 
    mode: "python",
    theme: "monokai",
    lineNumbers: true, 
    indentUnit: 4, 
    matchBrackets: true
}); 

console.log("initializing");

editor.setValue(
  `class LFSR():

    # Initialize an lfsr with three arrays: bits, taps, and an empty output array.
    def __init__(self, bits, taps):
        self.bits = bits
        self.taps = taps
        self.output = []

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

# ----- Example Testing ----- #

# Initialize an lfsr.
lfsr = LFSR([0, 0, 0, 1], [1, 0, 0, 1])

# Test step and print bits before and after to the console.
print("lfsr.bits before step: ", lfsr.bits)
lfsr.step()
print("lfsr.bits after step: ", lfsr.bits)

# ----- Perform other tests. ----- #
`);

console.log("editor.getValue():", editor.getValue());

let codeForm = document.getElementById("code-form");

$(document).ready(function() {
    $('#code-form').on('submit',function(e){
      $.ajax({
        data : {
          codetext : editor.getValue(),
        },
        type : 'POST',
        url : '/code'
      })
      .done(function(data){
        $('#passed').text(data.passed).show();
        $('#output').text(data.output).show();
        $('#error').text(data.error).show();
      });
      e.preventDefault();
      console.log(codetext)
    });
  });

const openButton = document.getElementById('open-dialog-btn');
const dialog = document.getElementById('my-dialog');
const closeButton = document.getElementById('close-dialog');

openButton.addEventListener('click', () => {
    dialog.showModal();
});

closeButton.addEventListener('click', () => {
    dialog.close();
});