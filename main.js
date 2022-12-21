const thinkApi='http://api.thingspeak.com/channels/872256/feeds.json?api_key=FJTEMQ9DCW8FK8HE&results=2'

const electron=require('electron');
const url=require('url');
const http=require('http');

const {app,BrowserWindow,Menu}=electron;
let delay=1000;
let baseUrl;
let mainMenu;
let mainWindow;
let longit;
let lat;

longit=0;
lat=0;

baseUrl='http://www.google.com/maps/place/'

function checkChange(){
    let newLat;
    let newLongit;
    http.get(thinkApi, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // Consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            newLat=parsedData.feeds[1].field1;
            newLongit=parsedData.feeds[1].field2;
            if(newLat!=lat || newLongit!=longit){
                lat=newLat;
                longit=newLongit;
                refresh();
            }
        } 
        catch (e) {
            console.error(e.message);
        }
    });
    }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
    });
}

function refresh(){
    let title='Crash location: '+lat+','+longit
    let urlFinal=baseUrl+lat+','+longit;
    mainWindow.loadURL(urlFinal);
}

app.on('ready',function(){
    mainWindow=new BrowserWindow({});
    mainMenu=Menu.buildFromTemplate(menuTemp);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.loadURL(baseUrl);
});

const menuTemp=[
    {
        label:'Refresh',
        accelerator:'ctrl+r',
        click(){
            refresh();
        }
    },
    {
        label:'Exit',
        accelerator:'ctrl+c',
        click(){
            app.exit();
        }
    }
];

let myVar = setInterval(function(){ checkChange() }, delay);