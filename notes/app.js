//module containing notes functions
const notes = require('./notes.js')
//module that allows you to input custom commands to the terminal
const yargs = require('yargs')

// adds a note
yargs.command({
    // 3rd argument after "node apps.js"
    command: 'add',
    describe: 'add note',
    // arguments after "node app.js COMMAND" starting with a "--"
    // ex: --title="Shopping List"
    // turns anything after "--" into a key in the yargs.argv object
    builder: {
        // key names
        // --KEYNAME="CONTENT"
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    // function that runs when command is entered
    handler: argv => notes.addNote(argv.title, argv.body)
})

// removes a note
// inputted the same way as above except without a body key
yargs.command({
    command: 'remove',
    describe: 'remove note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => notes.removeNote(argv.title)
})

// lists notes
yargs.command({
    command: 'list',
    describe: 'list notes',
    handler: () => notes.listNotes()
})

// reads a note and takes in title key
// displays title and body
yargs.command({
    command: 'read',
    describe: 'read notes',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => notes.readNote(argv.title)
})