const { cli } = require("../../lib/utils/cli")

test('help', async () => {
    await cli(`--help`)
})
