const { Router } = require('express');

const router = Router();

router.route('/upload').post((req, res) => {
    console.log(req.file);
    res.send('Image uploaded!');
})

module.exports = router;