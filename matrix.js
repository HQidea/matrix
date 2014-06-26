(function() {

    function matrix(context) {
        var fontSize = 16;
        var ctxWidth = context.canvas.width;
        var ctxHeight = context.canvas.height;

        var asciiStart = '!'.charCodeAt(0);
        var asciiEnd = '~'.charCodeAt(0);
        var count = asciiEnd - asciiStart + 1;

        function generateRandomChar() {
            return String.fromCharCode(Math.random() * count + asciiStart);
        }

        function columnAnimation(column, _interval, _row, _lastChar) {
            var offsetLeft = (column - 1) * fontSize;
            var interval = _interval || 100;
            var row = _row || 1;
            var lastChar = _lastChar || '';

            if (row > 1) {
                context.clearRect(offsetLeft, fontSize * (row - 2), fontSize, fontSize);
                context.fillStyle = '#0f0';
                context.fillText(lastChar, offsetLeft, fontSize * (row - 1));
            }

            context.fillStyle = '#fff';
            lastChar = generateRandomChar();
            context.fillText(lastChar, offsetLeft, fontSize * row);

            if (row > 10) {
                context.clearRect(offsetLeft, fontSize * (row - 11), fontSize, fontSize);
            }

            setTimeout(function() {
                if (row >= ctxHeight / fontSize + 10) {
                    columnAnimation(column, interval);
                }
                else {
                    columnAnimation(column, interval, ++row, lastChar);
                }
            }, interval);
        }

        function asyncRain() {
            var i;
            var count = ctxWidth / fontSize;

            for (i = 0; i < count; i++) {
                (function(_i) {
                    setTimeout(function() {
                        columnAnimation(_i);
                    }, Math.random() * ctxHeight * 10);
                })(i);
            }
        }

        return function() {
            console.log(context);

            context.font = fontSize + 'px Courier New';
            asyncRain();
        }();
    }

    var c = document.getElementById('matrix');
    var ctx = c.getContext('2d');

    c.style.background = '#000';
    matrix(ctx);

})();