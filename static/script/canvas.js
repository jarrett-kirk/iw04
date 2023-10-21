var Button = /** @class */ (function () {
    function Button(text, fillColor, textColor) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.text = text;
        this.fillColor = fillColor;
        this.textColor = textColor;
    }
    Button.prototype.draw = function (c) {
        c.strokeStyle = this.fillColor;
        c.rect(this.x, this.y, this.width, this.height);
        c.stroke();
        c.fillStyle = this.textColor;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.font = '25px arial';
        c.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.width);
    };
    Button.prototype.drawRound = function (c) {
        c.strokeStyle = this.fillColor;
        c.beginPath();
        c.roundRect(this.x, this.y, this.width, this.height, [10]);
        c.stroke();
        c.fillStyle = this.textColor;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.font = '25px arial';
        c.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2, this.width);
    };
    Button.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Button.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
    };
    Button.prototype.setText = function (text) {
        this.text = text;
    };
    Button.prototype.inBounds = function (mouseX, mouseY) {
        return !(mouseX < this.x || mouseX > this.x + this.width || mouseY < this.y || mouseY > this.y + this.height);
    };
    return Button;
}());

// --------------------------------------------------------------------

function drawArrow(ctx, fromx, fromy, tox, toy, arrowWidth, color){
    //variables to be used when creating the arrow
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);
 
    ctx.save();
    ctx.strokeStyle = color;
 
    //starting path of the arrow from the start square to the end square
    //and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = arrowWidth;
    ctx.stroke();
 
    //starting a new path from the head of the arrow to one of the sides of
    //the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),
               toy-headlen*Math.sin(angle+Math.PI/7));
 
    //path from the side point back to the tip of the arrow, and then
    //again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),
               toy-headlen*Math.sin(angle-Math.PI/7));
 
    //draws the paths created above
    ctx.stroke();
    ctx.restore();
}

// --------------------------------------------------------------------
// --------------------------------------------------------------------
// --------------------------------------------------------------------

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

// --------------------------------------------------------------------

var canvas = document.getElementById("main");
var c = canvas.getContext('2d');
var bitButtons = [];
var tapButtons = [];
var nextButton;

function init() {
    for (let i = 0; i < bits.length; i++) 
    {
        var bitButton = new Button(bits[i], '#FFFFFF', '#FFFFFF');
        bitButton.setPosition(64 + (89 * i), 100);
        bitButton.setSize(50, 60);
        bitButtons.push(bitButton);
    }
    for (let i = 0; i < taps.length; i++) 
    {
        let tap;
        if (taps[i] == 0)
        {
            tap = " ";
        }
        else
        {
            tap = "X";
        }
        var tapButton = new Button(tap, '#FFFFFF', '#FFFFFF');
        tapButton.setPosition(64 + (89 * i), 200);
        tapButton.setSize(50, 30);
        tapButtons.push(tapButton);
    }
    nextButton = new Button("NEXT", '#9747FF', '#FFFFFF')
    nextButton.setPosition(612, 296);
    nextButton.setSize(124, 60);

    update();
}

function update() 
{
    c.fillStyle = "#000000";
    c.fillRect(0, 0, canvas.width, canvas.height);

    bitButtons.forEach(function (b) { return b.draw(c); });
    tapButtons.forEach(function (b) { return b.draw(c); });
    nextButton.drawRound(c);
    // arrows.forEach(function (a) { return a.draw(c); });
}

function step() 
{
    // shift all bits and get rid of the last bit
    var newButton = new Button(0, '#FFFFFF', '#FFFFFF');
    newButton.setPosition(64, 100);
    newButton.setSize(50, 60);

    bitButtons.unshift(newButton);
    let lastBit = bitButtons[8].text;
    bitButtons.pop();

    for (let i = 0; i < bitButtons.length; i++) 
    {
        bitButtons[i].setPosition(64 + (89 * i), 100);
    }

    for (let i = 0; i < bitButtons.length; i++) 
    {
        console.log("tapButtons[i].text: ", tapButtons[i].text)
        if (tapButtons[i].text == "X" && i == 0)
        {
            console.log("lastBit before ^: ", lastBit);
            console.log("bitButtons[i].text before ^: ", bitButtons[i].text);
            bitButtons[i].setText(0 ^ lastBit);
            console.log("bitButtons[i].text after ^: ", bitButtons[i].text);
        }
        else if (tapButtons[i].text == "X")
        {
            console.log("lastBit before ^: ", lastBit);
            console.log("bitButtons[i].text before ^: ", bitButtons[i].text);
            bitButtons[i].setText(bitButtons[i].text ^ lastBit);
            console.log("bitButtons[i].text after ^: ", bitButtons[i].text);
        }
    } 
}

canvas.addEventListener('click', function (event) {
    var x = event.pageX - (canvas.clientLeft + canvas.offsetLeft);
    var y = event.pageY - (canvas.clientTop + canvas.offsetTop);
    bitButtons.forEach(function (b) {
        if (b.inBounds(x, y)) 
        {
            if (b.text == "1")
            {
                b.setText("0");
            }
            else
            {
                b.setText("1");
            }
        }
        update();
    });
    tapButtons.forEach(function (b) {
        if (b.inBounds(x, y)) 
        {
            if (b.text == "X")
            {
                b.setText(" ")
            }
            else
            {
                b.setText("X");
            }
        }
        update();
    });
    if (nextButton.inBounds(x, y))
    {
        step();
        update();
    }
});
init();
