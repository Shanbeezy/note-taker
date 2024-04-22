const router = require('express').Router();
const storage = require('../storage');

// GET "/notes" responds with all notes from database
router.get('/notes', (req, res) => {
    storage
        .getNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((err) => res.status(500).json(err));
});

router.post('/notes', (req, res) => {
    storage
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch((err) => res.status(500).json(err));
});

// DELETE "/notes/:id" deletes the note with an id equal to req.params.id
router.delete('/notes/:id', (req, res) => {
    storage
        .deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch((err) => res.status(500).json(err));
});

module.exports = router;
