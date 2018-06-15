const fs = require('fs');
const inq = require("inquirer");
const nnz = require("node-native-zip");

let zip = new nnz();
let output = [];
let files = [];
let preguntas = [
    {
        message: "Nombre del Archivo",
        type: "input",
        name: "File"
    },
    {
        message: '¿Quieres agregar otro archivo?',
        type: 'confirm',
        default: false,
        name: 'addFile'
    }
];

let preguntas2 = [
    {
        message: "Nombre del archivo comprimido",
        type: "input",
        name: "ZipFile"
    }
];


function ask() {
    inq.prompt(preguntas)
    .then(respuestas => {
        // fs.stat(respuestas.File, (err, stat) => {
        //     if(err !== null) {
        //         output.push(respuestas.File)
        //     }
        //     else {
        //         console.log("El archivo no existe")
        //     }
        // });        
        if (respuestas.addFile) {
            ask();
        }
        else {
            inq.prompt(preguntas2)
            .then(respuestas2 => {
                for (r of output) {
                    files.push({name: `${r}`, path: `./${r}`})
                }
                console.log(files);
                zip.addFiles(files,
                    err => {
                        if (err) {
                            return console.log("Error while adding files", err)
                        };
                        let buff = zip.toBuffer();
                        fs.writeFile(`./${respuestas2.ZipFile}.zip`, buff, () => {
                            console.log(`Archivos comprimidos!
                            Gracias por usar nbuestra app`);
                        })
                    }
                );
            });
        };
    })
}

ask();




