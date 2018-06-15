const fs = require('fs');
const inq = require("inquirer");
const nnz = require("node-native-zip");

let Qs = [
    {
        message: "¿Cuantos archivos quieres comprimir?",
        type: "input",
        name: "Amount",
    },
    {
        message: "File 1 path",
        type: "input",
        name: "File1",
    },
    {
        message: "File 1 path",
        type: "input",
        name: "File2",
    },
    {
        message: "File 1 path",
        type: "input",
        name: "File3",
    },
];

let zip = new nnz();

inq.prompt(Qs)
.then((Answ) => {


    zip.addFiles([
        {name:"text1.txt", path: "./text1.txt"},
        {name:"text2.txt", path: "./text2.txt"},
        {name:"text3.txt", path: "./text3.txt"}
    ], err => {
        if (err) {
            return console.log("Error while adding files", err)
        };
        let buff = zip.toBuffer();

        fs.writeFile("./CompressedFiles.zip", buff, () => {
            console.log("Compression End");
        })
    })
})




