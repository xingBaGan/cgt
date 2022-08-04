// index.spec.js

// const { handle } = require("../../lib/actions/create.action")
const inquirer = require('inquirer');
const { cli } = require("../../lib/utils/cli")
const { handle } = require("../../lib/actions/generate.action")

jest.mock('inquirer', () => {
    return {
        prompt: jest.fn(() => Promise.resolve({ 'project-name': 'world' }))
    }
})
describe('create.action', () => {

    test('input', async () => {

        let inputs = {
            'schematic': 'class',
            'name': 'cat'
        }
        let options = {
            preset: true
        }
        await handle(inputs, options)
        expect(inquirer.prompt).toHaveBeenCalled()
    })  
})


test('create', async () => {
    await cli(`generate class Cat`)
})