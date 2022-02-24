'use strict'
const fs = require('fs')

// rowsConfiguration is an already formatted strinf
const writeFile = function(path, rowsConfiguration) {
    try {
        fs.writeFileSync(path, rowsConfiguration)
    } catch (err) {
        console.error(err)
    }

}

const stringify = function (s){
    let resString = ''
    for(let i = 0; i < s.length; i++){
        let elem = s[i]
        elem = typeof elem === 'string' ? elem : elem.join(" ")
        resString += (elem + '\n')
    }
    return resString
}

const readFile = function(path) {
    try {
        const data = fs.readFileSync(path, 'utf8')
        let row = data.split("\n").filter((elem) => elem).map(elem => elem.split(" "))
        const rowInt = row.map(elem => elem.map(e => parseInt(e)))
        const [rows, slots, unavail, pool, servers] = rowInt[0]
        const structure = {
            rows,
            slots,
            unavail,
            pool,
            servers,
            unavail_coord: [],
            servers_numbers: []
        }
        for(let i = 0; i < unavail; i++) {
            structure.unavail_coord.push(
                rowInt[1+i]
            )
        }
        let server_index = 0
        for(let i = unavail; i < rowInt.length - 1; i++) {
            structure.servers_numbers.push(
                [...rowInt[1+i], server_index]
            )
            server_index++
        }
        return structure
    } catch (err) {
        console.error(err)
    }

}

const isMatching = function (server, row, col, unavail_coord, max_cols){
    const server_size = server[0]
    if(col + server_size > max_cols ){
        return false
    }
    const filtered_unavail_coord = unavail_coord.filter(elem => elem[0] === row)
    for(let coord = 0; coord < filtered_unavail_coord.length; coord ++){
        const y_unavailable = filtered_unavail_coord[coord][1]
        if(y_unavailable < server_size + col && y_unavailable >= col) {
            return false
        }
    }
    return true
}

const index = function(){
    fs.readdir('./inputFiles', (err, files) => {
        files.forEach(file => {
            const structure = readFile(`./inputFiles/${file}`)
            const optimization = runOptimization(structure)
            const result = stringify(optimization)
            writeFile(`${file}`, result)
        });
    });
}

index()
