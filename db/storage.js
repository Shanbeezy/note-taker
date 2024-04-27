/*
const util = require('util');
const fs = require('fs');

// This package was used to generate my unique ids. https://www.npm.js.com/package/uuid
const {v1 : uuidv1} = require('uuid');

const readFileBlend = util.promisify(fs.readFile);
const writeFileBlend = util.promisify(fs.writeFile);

class Storage {
    read() {
        return readFileBlend('/db/db.json', 'utf8');
    }

    write(note) {
        return writeFileBlend('/db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            // If notes is not an array or can't be turned into an array, send back a new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("The 'title' and 'text' must not be left blank");
        }

        // Add a unique id to the note using uuid blank
        const newNote = { title, text, id : uuidv1() };
    

    // Gather all notes, add new note, write all the updatted notes, then return the new note
    return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }

    deleteNote(id) {
        // Get all the notes, remove notes with specific id, write the filtered notes
        return this.getNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Storage();
*/

const util = require('util');
const fs = require('fs');
const path = require('path');
const { v1: uuidv1 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    constructor() {
        // Correct the path by ensuring no extra slashes
        this.filePath = path.join(__dirname, '..', 'db', 'db.json');
    }

    read() {
        return readFileAsync(this.filePath, 'utf8');
    }

    write(notes) {
        return writeFileAsync(this.filePath, JSON.stringify(notes));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }
        const newNote = { title, text, id: uuidv1() };

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
    }

    deleteNote(id) {
        return this.getNotes()
            .then((notes) => notes.filter(note => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Storage();
