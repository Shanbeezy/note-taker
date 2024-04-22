const util = require('util');
const fs = require('fs');

// This package was used to generate my unique ids. https://www.npm.js.com/package/uuid
const uuid1 = require('uuid/v1');

const readFileBlend = util.promisify(fs.readFile);
const writeFileBlend = util.promisify(fs.writeFile);

class Storage {
    read() {
        return readFileBlend('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileBlend('db/db.json', JSON.stringify(note));
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
        const newNote = { title, text, id : uuid1() };
    

    // Gather all notes, add new note, write all the updatted notes, then return the new note
    return this.getnotes()
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