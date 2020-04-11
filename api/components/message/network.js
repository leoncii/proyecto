const express = require('express')
const response = require('../../network/response')
const controller = require('./controller')
const router = express.Router()

router.get('/', (req, res) => {
  const filterUser = req.query.chat || null
  controller
    .getMessages(filterUser)
    .then(messageList => {
      response.success(req, res, messageList, 200)
    })
    .catch(e => {
      response.error(req, res, 'Error inesperado', 500, e)
    })
})

router.post('/', (req, res) => {
  controller
    .addMessage(req.body.chat, req.body.user, req.body.message)
    .then(fullMessage =>
      response.success(req, res, fullMessage, 201),
    )
    .catch(e => {
      response.error(
        req,
        res,
        'Informacion invalida',
        401,
        ' Es solo una simulacion',
      )
    })
})

router.patch('/:id', (req, res) => {
  controller
    .updateMessage(req.params.id, req.body.message)
    .then(data => {
      response.success(req, res, data, 200)
    })
    .catch(e => {
      response.error(req, res, 'error interno', 500, e)
    })
})

router.delete('/:id', (req, res) => {
  controller
    .deleteMessage(req.params.id)
    .then(() => {
      response.success(
        req,
        res,
        `Usuario ${req.params.id} eliminado`,
        200,
      )
    })
    .catch(e => {
      response.error(req, res, 'Error interno', 500, e)
    })
})

module.exports = router
