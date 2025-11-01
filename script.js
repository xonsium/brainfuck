function execute() {
    let code = document.getElementById("code").value;
    let input = Array.from(
        document.getElementById("input").value
    );
    console.log(input);
    let output = document.getElementById("output");
    output.value = '';
    let chars = Array.from(code)
    let mem = new Array(30000).fill(0)
    let ptr = 0;
    let pc = 0;
    let ic = 0;


    while (pc < chars.length) {
        switch (chars[pc]) {
            case '+':
                mem[ptr] = (mem[ptr] + 1) & 0xFF; // wrap 0–255
                break;
            case '-':
                mem[ptr] = (mem[ptr] - 1 + 256) & 0xFF;
                break;
            case '>':
                ptr++;
                break;
            case '<':
                ptr--;
                break;
            case '[':
                if (mem[ptr] === 0) {
                    let open = 1;
                    while (open > 0) {
                        pc++;
                        if (chars[pc] === '[') open++;
                        else if (chars[pc] === ']') open--;
                    }
                }
                break;
            case ']':
                if (mem[ptr] !== 0) {
                    let close = 1;
                    while (close > 0) {
                        pc--;
                        if (chars[pc] === ']') close++;
                        else if (chars[pc] === '[') close--;
                    }
                }
                break;
            case '.':
                output.value += String.fromCharCode(mem[ptr]);
                break;
            case ',':
                if (ic < input.length) {
                    mem[ptr] = input[ic].charCodeAt(0);
                    ic++;
                } else {
                    mem[ptr] = 0;
                }
                break;
        }
        pc++;
    }

}

function hello() {
    let code = document.getElementById("code");
    code.value = ">+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.[-]>++++++++[<++++>-] <.>+++++++++++[<++++++++>-]<-.--------.+++.------.--------.[-]>++++++++[<++++>- ]<+.[-]++++++++++."
}