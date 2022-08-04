const { expectPrompts, prompt, createPromptModule } = require('../../__mocks__/inquirer')

test('migrate command', () => {
    // create user input data
    let prompts = [
        {
            type: 'input',
            name:'project_name',
            input: 'test_project'
        },
        {
            type: 'input',
            name: 'repository',
            input: 'test_url'
        },
        {
            type:'confirm',
            name:'preset',
            message: 'Are you ok',
            confirm: true
        }
    ];
    expectPrompts(
        prompts
    )
    let prompt = createPromptModule()
    prompt(prompts).then((answers)=>{
        expect(answers).toEqual({
            project_name:'test_project',
            repository:'test_url',
            preset:true
        });
    })
})

