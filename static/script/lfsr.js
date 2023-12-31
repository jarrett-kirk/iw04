// ---------------------------------------------------
// INITIALIZATIONS
// ---------------------------------------------------

var bits = [];
var bits_copy = [];

for (var i = 0; i < 8; i++) 
{
    bits.push(Math.round(Math.random()));
}

var taps = [];
for (var i = 0; i < 7; i++) 
{
    taps.push(Math.round(Math.random()));
}

for (let i = 0; i < bits.length; i++) 
{
    document.getElementById("bit" + i).innerHTML = bits[i];
}

for (let i = 0; i < taps.length; i++) 
{
    if (taps[i] == 1)
    {
        document.getElementById("tap" + i).innerHTML = "X";
        taps[i] = 1
    }
    else 
    {
        document.getElementById("tap" + i).innerHTML = " ";
        taps[i] = 0
    }
}

drawArrows();

// ---------------------------------------------------
// UPDATE FUNCTION
// ---------------------------------------------------

function update()
{
    for (let i = 0; i < bits.length; i++) 
    {
        document.getElementById("bit" + i).innerHTML = bits[i];
    }

    for (let i = 0; i < taps.length; i++) 
    {
        if (taps[i] == 1)
        {
            document.getElementById("tap" + i).innerHTML = "X";
        }
        else 
        {
            document.getElementById("tap" + i).innerHTML = " ";
        }
    }
    bits_copy = bits;
    updateArrows();
}

// ---------------------------------------------------
// BIT AND TAP FUNCTIONS
// ---------------------------------------------------

function changeBit(index) 
{
    if (document.getElementById("bit" + index).innerHTML == 1)
    {
        bits[index] = 0;
    }
    else 
    {
        bits[index] = 1;
    }
    update();
}

function changeTap(index)
{
    if (document.getElementById("tap" + index).innerHTML == "X")
    {
        taps[index] = 0;
    }
    else 
    {
        taps[index] = 1;
    }
    update()
}

function step()
{
    // shift all bits and get rid of the last bit
    bits.unshift(0);
    let lastBit = bits[8];
    bits.pop();

    bits[0] = lastBit
    for (let i = 1; i < bits.length; i++) 
    {
        if (taps[i - 1] == 1 && i == 0)
        {
            bits[i] = (0 ^ lastBit)
        }
        else if (taps[i - 1] == 1)
        {
            bits[i] = (bits[i] ^ lastBit)
        }
    } 
    update();
    document.getElementById("output-bits").innerHTML += lastBit;
}

function step_copy(bit_list)
{
    // shift all bits and get rid of the last bit
    bit_list.unshift(0);
    let lastBit = bit_list[8];
    bit_list.pop();

    bit_list[0] = lastBit
    for (let i = 1; i < bit_list.length; i++) 
    {
        if (taps[i - 1] == 1 && i == 0)
        {
            bit_list[i] = (0 ^ lastBit)
        }
        else if (taps[i - 1] == 1)
        {
            bit_list[i] = (bit_list[i] ^ lastBit)
        }
    }
    console.log("in here")
    return bits_copy.join('')
}

// ---------------------------------------------------
// ARROW FUNCTIONS
// ---------------------------------------------------

function clearArrows() {
    for (let i = 0; i < taps.length; i++) 
    {
        document.getElementById("tap" + i + "-arrows0").innerHTML = '';
        document.getElementById("tap" + i + "-arrows1").innerHTML = '';
        document.getElementById("tap" + i + "-arrows2").innerHTML = '';
    }
  }
  
  function drawArrows() {
    for (let i = 0; i < taps.length; i++) 
    {
        if (taps[i] == 0) 
        {
            document.getElementById("tap" + i + "-arrows0").innerHTML = '<div class="small-container"><svg><use href="#arrow-right"/></svg></div><div class="small-container"></div><div class="small-container"></div><div class="small-container"><svg><use href="#line-bottom"/></svg></div>'
            document.getElementById("tap" + i + "-arrows2").innerHTML = '<svg><use href="#line-bottom"/></svg>'
        }
        else
        {
            document.getElementById("tap" + i + "-arrows0").innerHTML = '<div class="big-container"><svg><use href="#arrow-flowchart"/></svg></div><div class="small-container"><svg><use href="#line-bottom"/></svg></div>'
            document.getElementById("tap" + i + "-arrows1").innerHTML = '<svg><use href="#arrow-up"/></svg>'
            document.getElementById("tap" + i + "-arrows2").innerHTML = '<svg><use href="#arrow-up-bottom"/></svg>'
        }
    }
  }
  
  function updateArrows() {
    clearArrows();
    drawArrows();
  }

let visForm = document.getElementById("vis-form");

$(document).ready(function() {
    $('#vis-form').on('submit',function(e){
        sol = step_copy(bits_copy)
        bits_copy = bits
    $.ajax({
        data : {
        visanswer : $('#visanswer').val(),
        solution : sol,
        },
        type : 'POST',
        url : '/visualization'
    })
    .done(function(data){
        $('#output').text(data.output).show();
    });
    e.preventDefault();
    });
});
