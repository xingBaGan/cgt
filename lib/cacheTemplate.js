import { loggerError, loggerSuccess, getDirPath } from '@/util'
import { loadFile, writeFile } from '@/util/file'


const addTpl = async (tplUr, name, desc) => {
  const cacheTpl = getDirPath('../cacheTpl')
  try {
    const tplConfig = loadFile(`${cacheTpl}/.tpl.json`)
    let file = [{
      tplUrl,
      name,
      desc
    }]
    if (tplConfig) {
      const isExist = tplConfig.some(tpl => tpl.name === name)
      if (isExist) {
        file = tplConfig.map(tpl => {
          if (tpl.name === name) {
            return {
              tplUrl,
              name,
              desc
            }
          }
          return tpl
        })
      } else {
        file = [
          ...tplConfig,
          ...file
        ]
      }
    }
    writeFile(cacheTpl, '.tpl.json', JSON.stringify(file, null, "\t"))
    loggerSuccess('Add Template Successful!')
  } catch (error) {
    loggerError(error)
  }
}

export {
  addTpl,
}
