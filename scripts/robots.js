const fs = require('fs')

const generatedRobots = `
User-agent: *
Disallow: /client/
Disallow: /carrier/
Disallow: /playground/
#DaumWebMasterTool:16f9d425dc2d4c29f37ad1f5d612277e5f3cda8e71ed54ae3250cd183191c9bc:gF0y8sqYrfCGAP0E6sHYPA==
`

fs.writeFileSync('../public/robots.txt', generatedRobots, 'utf-8')
