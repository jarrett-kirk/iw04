// initializations

// random bits
var bits = [];
for (var i = 0; i < 8; i++) 
{
    bits.push(Math.round(Math.random()));
}

// random taps
var taps = [];
for (var i = 0; i < 8; i++) 
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

const startingElement = document.querySelector('bit0');
const endingElement = document.querySelector('bit1');
const line = new LeaderLine (startingElement, endingElement);

// --------------------------------------------------------------------

// update functions

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
}

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
    // console.logs
    console.log("bits[] before step(): ", bits)

    // shift all bits and get rid of the last bit
    bits.unshift(0);
    let lastBit = bits[8];
    bits.pop();

    console.log("lastBit: ", lastBit)
    console.log("bits[] after unshift: ", bits)

    for (let i = 0; i < bits.length; i++) 
    {
        if (taps[i] == 1 && i == 0)
        {
            console.log("lastBit before ^: ", lastBit)
            console.log("bits[i] before ^: ", bits[i])
            bits[i] = (0 ^ lastBit)
            console.log("bits[i] after ^: ", bits[i])
        }
        else if (taps[i] == 1)
        {
            console.log("lastBit before ^: ", lastBit)
            console.log("bits[i] before ^: ", bits[i])
            bits[i] = (bits[i] ^ lastBit)
            console.log("bits[i] after ^: ", bits[i])
        }
    } 
    console.log("bits[] after step(): ", bits)
    update();
}
