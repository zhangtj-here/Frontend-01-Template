/*

var tty = require("tty");
var ttys = require("ttys");
// var rl = require("readline");

var stdin = ttys.stdin;
var stdout = ttys.stdout;

stdout.write("hello, world\n");
stdout.write("\033[1A");
stdout.write("kirin\n");

// console.log("hello");

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function ask(question) {
    return new Promise((resolve, reject) => {
        rl.question(question, (answer) => {
            // TODO: Log the answer in a database
            // console.log(`Thank you for your valuable feedback: ${answer}`);

            // rl.close();
            resolve(answer);
            rl.close();
        });
    })
}

void async function() {
    console.log(await ask("your project name?"))
}();

*/


// var stdin = process.openStdin();
// stdin.on('data', function(chunk) { console.log("Got chunk: " + chunk); });

// var stdin = process.openStdin();
// // require('ttys').setRawMode(true);
//
// stdin.on('keypress', function (chunk, key) {
//     process.stdout.write('Get Chunk: ' + chunk + '\n');
//     if (key && key.ctrl && key.name == 'c') process.exit();
// });


var tty = require("tty");
var ttys = require("ttys");
var rl = require("readline");

var stdin = ttys.stdin;
var stdout = ttys.stdout;
// var stdin = process.stdin;


// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
// stdin.on( 'data', function( key ){
//     // ctrl-c ( end of text )
//     if ( key === '\u0003' ) {
//         process.exit();
//     }
//     // write the key to stdout all normal like
//     process.stdout.write( key.toString().charCodeAt(0).toString() );
// });

function getChar(){
    return new Promise(resolve => {
        stdin.once( 'data', function( key ){
            resolve(key);
        });
    });
}

function up(n = 1) {
    stdout.write('\033[' + n + 'A');
}

function down(n = 1) {
    stdout.write('\033[' + n + 'B');
}

function right(n = 1) {
    stdout.write('\033[' + n + 'C');
}

function left(n = 1) {
    stdout.write('\033[' + n + 'D');
}

void async function (){
    stdout.write("which framework do you want to use?\n");
    let answer = await select(["vue", "react", "angular"]);
    stdout.write("you selected " + answer + "\b\n");
    process.exit();

}()

async function select(choices) {
    let selected = 0;
    for (let i = 0; i < choices.length; i ++) {
        let choice = choices[i];
        if (i === selected) {
            stdout.write("[x] " + choice + "\n");
        } else {
            stdout.write("[ ] " + choice + "\n");
        }
    }
    up(choices.length);
    right();
    while(true) {
        let char = await getChar();
        if (char === "\u0003") {
            process.exit();
            break;
        }
        if (char === "w" && selected > 0) {
            stdout.write(" ");
            left();
            selected --;
            up();
            stdout.write("x");
            left();
        }
        if (char === "s" && selected < choices.length - 1) {
            stdout.write(" ");
            left();
            selected ++;
            down();

            stdout.write("x");
            left();
        }
        if (char === "\r") {
            down(choices.length - selected);
            left();
            return choices[selected];
        }
        // console.log(char.split('').map(c => c.charCodeAt(0)));
    }


}

