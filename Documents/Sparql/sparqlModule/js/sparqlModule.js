
//liste des requestes possibles
var querys= [
            'SELECT ?item ?itemLabel WHERE{?item wdt:P31 wd:Q146 . SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }}',
            'SELECT ?item ?itemLabel WHERE{?item wdt:P21 ?gender FILTER isBLANK(?gender) . SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }}',
            'SELECT DISTINCT ?pokemon ?pokemonLabel ?pokedexNumber WHERE { ?pokemon wdt:P31/wdt:P279* wd:Q3966183 . ?pokemon p:P1112 ?statment. ?statment ps:P1112 ?pokedexNumber; pq:P642 wd:Q20005020. FILTER ( !isBLANK(?pokedexNumber) ) . SERVICE wikibase:label { bd:serviceParam wikibase:language "en" } } ORDER BY (?pokedexNumber)'
            ];


(function(ext) {
    var device = null;
    
	var levels = {
		HIGH:1,
		LOW:0
	};
    
	ext.resetAll = function(){};
	
	ext.runArduino = function(){
		
	};

    //****************************************************************************************
    //****************************************************************************************

    var arr=[];
    var array =[];
    var actualQuery=2;

    //testQuery(actualQuery);

     //effectue la requette
    function testQuery(val){
        
        var endpoint = "https://query.wikidata.org/sparql";
        var query = querys[val];

        /*
        $.ajax({
                    url: endpoint,
                    dataType: 'json', 
                    data: { 
                        queryLn: 'SPARQL',
                        query: query , 
                        limit: 'none',
                        infer: 'true',
                        Accept: 'application/sparql-results+json'
                    },
                    success: displayResult, 
                    error: displayError
            });
        
        */
    }
    function displayError(xhr, textStatus, errorThrown) {
        
        console.log(textStatus);
        console.log(errorThrown);
    }

    function displayResult(data) {
        arr = $.map(data, function(el) { return el; })
        array = $.map(arr[1].bindings, function(value, index) {
            var content=[];

            for (var i = 0; i < Object.keys(value).length; i++) {
                content.push(value[Object.keys(value)[i]].value)
            }
            return [content];
        });
        console.log("Request done :");
        console.log(arr);

    }

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.  
    ext.test = function(callback) {

        trace("TEST");
        trace(1);
        trace(0);

        console.log('in ');
        console.log("arr");
        console.log(arr);
        console.log("arr0:");
        console.log(arr[0].vars);
        console.log("arr1:");
        console.log(arr[1].bindings);
        console.log("out");
        callback();
    }

    ext.request = function(request,callback) {
        for (i = 0; i < collN.length; i++) { 
            console.log(collN[0]);
            if(request == collN[i])
            {
                actualQuery=i;
            }
        }
        testQuery(actualQuery);
        console.log("Rdone");
        callback();
    }

    /*TODO syteme general de get (dans test query)*/
    ext.tab = function(x,y) {
        return array[x][y];
    };

    ext.size = function() {
        return 17;
        //return arr[1].bindings.length;
    };

    ext.colName = function() {
        return 5;
        //return arr[0].vars.length;
    };



    //****************************************************************************************
    //****************************************************************************************


    function processData(bytes) {
        trace(bytes);
    }

    // Extension API interactions
    var potentialDevices = [];
    ext._deviceConnected = function(dev) {
        potentialDevices.push(dev);

        if (!device) {
            tryNextDevice();
        }
    }

    function tryNextDevice() {
        // If potentialDevices is empty, device will be undefined.
        // That will get us back here next time a device is connected.
        device = potentialDevices.shift();
        if (device) {
            device.open({ stopBits: 0, bitRate: 115200, ctsFlowControl: 0 }, deviceOpened);
        }
    }

    function deviceOpened(dev) {
        if (!dev) {
            // Opening the port failed.
            tryNextDevice();
            return;
        }
        device.set_receive_handler('demo',function(data) {
            processData(data);
        });
    };

    ext._deviceRemoved = function(dev) {
        if(device != dev) return;
        device = null;
    };

    ext._shutdown = function() {
        if(device) device.close();
        device = null;
    };

    ext._getStatus = function() {
        if(!device) return {status: 1, msg: 'demo disconnected'};
        return {status: 2, msg: 'demo connected'};
    }

    var descriptor = {};
	ScratchExtensions.register('demo', descriptor, ext, {type: 'serial'});
})({});
