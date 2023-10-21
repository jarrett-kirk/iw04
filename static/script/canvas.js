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
        c.fillStyle = this.fillColor;
        c.fillRect(this.x, this.y, this.width, this.height);
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

// --------------------------------------------------------------------

var canvas = document.getElementById("main");
var c = canvas.getContext('2d');
var buttons = [];
function init() {
    for (let i = 0; i < bits.length; i++) 
    {
        var bitButton = new Button(bits[i], '#FFFFFF', '#000000');
        bitButton.setPosition(64 + (89 * i), 100);
        bitButton.setSize(50, 60);
        bitButton.onClick = function () 
        { 
            if (bitButton.text == "1")
            {
                return bitButton.setText("0")
            }
            else
            {
                return bitButton.setText("1")
            }
        };
        buttons.push(bitButton);
    }
    console.log(buttons)
    update();
}
function update() {
    c.fillStyle = "#000000";
    c.fillRect(0, 0, canvas.width, canvas.height);
    buttons.forEach(function (b) { return b.draw(c); });
}
canvas.addEventListener('click', function (event) {
    var x = event.pageX - (canvas.clientLeft + canvas.offsetLeft);
    var y = event.pageY - (canvas.clientTop + canvas.offsetTop);
    console.log("x: ", x);
    console.log("y: ", y);
    buttons.forEach(function (b) {
        if (b.inBounds(x, y) && b.onClick) 
        {
            if (b.text == "1")
            {
                b.setText("0")
            }
            else
            {
                b.setText("1");
            }
        }
        update();
    });
});
init();
