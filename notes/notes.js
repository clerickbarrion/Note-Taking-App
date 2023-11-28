// module that allows you to modify your files
const fs = require('fs')
// module that makes you have colored text
const chalk = require('chalk')

// takes a title and body and creates a note object with them
const addNote = (title, body) => {
    // gets current notes
    const notes = loadNotes()
    // finds if inputted note title is already in notes
    const duplicateNote = notes.find(note => note.title === title)
    // if no duplicate add a the new note object
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        // pastes it in notes.json
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken')
    }
}

// takes a note object and adds it to notes.json
const saveNotes = notes => {
    // converts it to JSON string 
    const dataJSON = JSON.stringify(notes)
    // puts it in JSON file
    fs.writeFileSync('notes.json',dataJSON)
}

// reads notes.json and returns the note objects
const loadNotes = () => {
    try {
        // converts notes.json to bytes
        const dataBuffer = fs.readFileSync('notes.json')
        // converts bytes to string
        const dataJSON = dataBuffer.toString()
        // converts string to object
        return JSON.parse(dataJSON)
    } catch(e){
        // returns empty array if error
        return []
    }
    
}

// removes a note
const removeNote = title => {
    const notes = loadNotes()
    // array with notes that do not equal the inputted title
    const notesToKeep = notes.filter(note => note.title !== title)
    // if no change than no note found
    if (notes.length === notesToKeep.length) {console.log(chalk.red.inverse('Note not found'))}
    // saves array with without the inputted note
    else {saveNotes(notesToKeep); console.log(chalk.green.inverse('Removed note'))}
   
}

// logs title of each note
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.green('Your notes:'))
    notes.forEach(note => console.log(note.title))
}

// logs title and body of inputted note
const readNote = title => {
    const notes = loadNotes()
    // find the note
    const note = notes.find(note => note.title === title)
    // logs title and body if note exists, throws error message if not
    note ? console.log(chalk.bold(note.title+':'),note.body) : console.log(chalk.red('note not found'))
}

//exports functions
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}