const fs = require ("fs");

//console.log('TATSUMAKI SENPUKYAKU');

const fileUrl = process.argv[2];

const outputUrl = createOutputUrl(fileUrl)

const data = readFile(fileUrl);

if (data) {
    const report = createReport(data);
    writeData(outputUrl, report)
    
}

function createOutputUrl(url){

    //./demo-files/demo.txt => ./demo-files/demo-report.txt

    const splittedUrl = url.split('.');

    //console.log(splittedUrl);
    const lastPart = splittedUrl.pop();
    //console.log(lastPart);
    const firstPart = splittedUrl.join('.');
    //console.log(firstPart);
    //const finalUrl = '.' + splittedUrl[1] + '-report.' + splittedUrl[2];

    const finalUrl = firstPart + '-report.' + lastPart;
    //console.log(finalUrl);
    return finalUrl;
}

//console.log(fileUrl);



function readFile(url){
    try {
        const data = fs.readFileSync(url, "utf8");
        return data;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}


function writeData(url, data){
    try {
        fs.writeFileSync(url, data);
    } catch (err) {
        console.error(err.message);
    }
}

function createReport(data){

    let report = 'Numero di caratteri: ' + countChars(data) +'\n' + 
                 'Numero di parole: ' + countWords(data) + '\n' + 
                 'Carattere più comune: ' + mostUsedChar(data);
    
    return report;

}

function countChars(data){

    const dataWithoutSpaces = data.replace(/ /g, '')
    //console.log(dataWithoutSpaces);
    return dataWithoutSpaces.length;
}

function countWords(data){

    const dataArray = data.split(' ');
    return dataArray.length;

}

//mappa delle occorrenze
function mostUsedChar(data){

    const dataWithoutSpaces = data.replace(/ /g, '')

    let charMap = {};

    for (let i = 0; i < dataWithoutSpaces.length; i++) {
        const char = dataWithoutSpaces[i];
        
        //se esiste la proprietà con quel nome all'interno della mia mappa, la aumento di 1
        if (charMap[char]) {
            charMap[char] += 1;
        } else {
            charMap[char] = 1;
        }

    }

    console.log(charMap);

    const keyValues = Object.entries(charMap);
   
    keyValues.sort((e1, e2) => {
        const firstValue = e1[1];
        const secondValue = e2[1];
        return secondValue - firstValue;
        
    })
    return keyValues[0][0];
}

function mostUsedWord(data){

    const splittedData = data.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").split(' ');  //questo non funziona, bisogna aggiungere cose alla regex
    let wordMap = {};

    for (let i = 0; i < splittedData.length; i++) {
        const word = splittedData[i];
        
        if (wordMap[word]) {
          wordMap[word] += 1;  
        } else {

            wordMap[word] = 1;
        }

    }

    const keyValues = Object.entries(wordMap);

    keyValues.sort((e1, e2) => {
        const firstValue = e1[1];
        const secondValue = e2[1];
        return secondValue - firstValue;
        
    })
    return keyValues[0][0];

}