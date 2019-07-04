const colors = require('colors')

colors.setTheme({
  info: 'green',
  error: 'red'
})

const error = (s) => {
  console.error(colors.error(`ERROR: ${s}`))
}

const info = (s) => {
  console.log(colors.info(`INFO: ${s}`))
}

module.exports = {
  error,
  info
}
