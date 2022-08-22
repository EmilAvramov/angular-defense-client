const router = require('express').Router()
const {register} = require('../services/userService')

router.post('/users/login', (req: Request, res: Response) => {
    const data = req.body

})

module.exports = router