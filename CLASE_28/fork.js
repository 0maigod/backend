const { fork } = require('child_process')

p1 = fork('./saludo.js')
p1.send('Jose')