// index.spec.js
const execa = require("execa")
const cli = (argv = "") => new Promise((resolve, reject) => {
    const subprocess = execa.command(`cgt ${argv}`)
    subprocess.stdout.pipe(process.stdout)
    subprocess.stderr.pipe(process.stderr)
    Promise.resolve(subprocess).then(resolve)
})

// test('create', async () => {
//     await cli(`create test-project gitUrl`)
//     expect(process.env.NODE_ENV).toBe('test')
// })


test('create', async () => {
    await cli(`create test-project gitUrl`)
    expect(process.env.NODE_ENV).toBe('test')
})

// import sum from './sum';

// test('adds 1 + 2 to equal 3', () => {
//     expect(sum(1, 2)).toBe(3);
// });