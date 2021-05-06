const calculo = () => {
    let sum = 0
    let i = 0
    for (i; i < 6e9; i++) {
        sum += i
        console.log('Vamos por el: ' + sum)
    }
    return sum
    // console.log('Aca haria el calculao')
    // return 'Terminando'
}

process.on('message', msg => {
    console.log('Mensaje del padre: ', msg)
    process.send(  calculo() )
})