// index.spec.js

// const { handle } = require("../../lib/actions/create.action")
import { expectPrompts, createPromptModule } from '../../__mocks__/inquirer'
const inquirer = require('inquirer');
const { cli } = require("../../lib/utils/cli")
const { handle } = require("../../lib/actions/create.action")

jest.mock('inquirer', () => {
    return {
        prompt: jest.fn(() => Promise.resolve({ 'project-name': 'world' }))
    }
})
describe('create.action', () => {

    test('input', async () => {

        let inputs = {
            'project-name': 'test_project',
            'repository': 'test_url'
        }
        let options = {
            preset: true
        }
        await handle(inputs, options)
        expect(inquirer.prompt).toHaveBeenCalled()
    })
})


test('create', async () => {
    await cli(`create test_project test_url`)
})