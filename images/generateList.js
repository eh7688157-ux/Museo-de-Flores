const fs = require('fs');

fs.readdir('./images', (err, files) => {
    if (err) throw err;

    files = files.filter(file => !file.endsWith(".js") && !file.endsWith(".json"));

    let oldList = {};

    try {
        const oldData = JSON.parse(fs.readFileSync('./images/images.json', 'utf8'));

        for (const image of oldData.images) {
            oldList[image.file] = image.title;
        }
    } catch (error) {
        console.log("No se encontró una lista anterior. Se crearán títulos automáticamente.");
    }

    const list = files.map(file => ({
        title: oldList[file] || file.split('.').slice(0, -1).join('.'),
        file,
    }));

    let json = JSON.stringify({images: list}, null, 4);
    fs.writeFileSync('./images/images.json', json);
});