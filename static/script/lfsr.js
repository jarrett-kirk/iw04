// ---------------------------------------------------
// INITIALIZATIONS
// ---------------------------------------------------

var bits = [];
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

    for (let i = 0; i < bits.length; i++) 
    {
        if (taps[i] == 1 && i == 0)
        {
            bits[i] = (0 ^ lastBit)
        }
        else if (taps[i] == 1)
        {
            bits[i] = (bits[i] ^ lastBit)
        }
    } 
    update();
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
