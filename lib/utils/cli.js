const execa = require("execa")
const cli = (argv = "",command = 'cgt') => new Promise((resolve, reject) => {
    const subprocess = execa.command(`${command} ${argv}`)
    subprocess.stdout.pipe(process.stdout)
    subprocess.stderr.pipe(process.stderr)
    Promise.resolve(subprocess).then(resolve)
})

module.exports = {
    cli
}