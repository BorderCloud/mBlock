/* Extension demonstrating a blocking command block */
/* Sayamindu Dasgupta <sayamindu@media.mit.edu>, May 2014 */
//https://io.datascience-paris-saclay.fr/exampleView.php?ex_id=102#
console.log("TEST");


//liste des requestes possibles
var querys=	[
			'SELECT ?item ?itemLabel WHERE{?item wdt:P31 wd:Q146 . SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }}',
			'SELECT ?item ?itemLabel WHERE{?item wdt:P21 ?gender FILTER isBLANK(?gender) . SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }}',
			'SELECT DISTINCT ?pokemon ?pokemonLabel ?pokedexNumber WHERE { ?pokemon wdt:P31/wdt:P279* wd:Q3966183 . ?pokemon p:P1112 ?statment. ?statment ps:P1112 ?pokedexNumber; pq:P642 wd:Q20005020. FILTER ( !isBLANK(?pokedexNumber) ) . SERVICE wikibase:label { bd:serviceParam wikibase:language "en" } } ORDER BY (?pokedexNumber)'
			];

//nom des requetes possibles
var collN=["nom de chats","nom des gens de genre inconnu","liste des pokemon"];


new (function() {


	//init
    var ext = this;

    var arr=[];
    var array =[];
    var actualQuery=0;
// testQuery(actualQuery);
   



    //effectue la requette
	function testQuery(val){
	    var endpoint = "https://query.wikidata.org/sparql";
	    var query = querys[val];

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



    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    // Functions for block with type 'w' will get a callback function as the 
    // final argument. This should be called to indicate that the block can
    // stop waiting.  
    ext.test = function(callback) {
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

    	console.log('got "' + array[x][y] + '"');
    	return array[x][y];
    };

    ext.size = function() {
    	console.log('size: ' + arr[1].bindings.length + '.');
    	return arr[1].bindings.length;
    };

    ext.colNum = function() {
    	console.log('coll: ' + arr[0].vars.length + '.');
    	return arr[0].vars.length;
    };


    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ["r", "get tab %n %n ", "tab",0],
            ["w", "test ", "test"],
            ["r", "Number of columns ", "colNum"],
            ["w", "process request %m.request ", "request",collN[0]],
            ["r", "size ", "size"],

        ],
        menus: {
        	request: (collN)
    	}
	};

    // Register the extension
    ScratchExtensions.register('Sparql Extension', descriptor, ext);
})();