const { execFile } = require('child_process')

const ls = execFile(`${__dirname}/script.sh`, (error, stdout, stderr) => {
    if (error) {
        console.log(error.stack)
        console.log(`Error code: ${error.code}`)
        console.log(`Signal received: ${error.signal}`)
        return
     }

    
    console.log(`Child Process STDOUT: ${stdout}`)
    console.log(`Child Process STDERR: ${stderr}`)
})

ls.on('exit', function (code) {
    console.log('Child process exited with exit code ' + code)
})