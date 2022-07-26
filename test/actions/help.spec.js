// index.spec.js
const execa = require("execa")
const cli = (argv = "") => new Promise((resolve, reject) => {
    const subprocess = execa.command(`cgt ${argv}`)
    subprocess.stdout.pipe(process.stdout)
    subprocess.stderr.pipe(process.stderr)
    Promise.resolve(subprocess).then(resolve)
})

test.skip('help', async () => {
    // await cli(`--help`)
})
