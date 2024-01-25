var data = [];
var alleKommuner = [];
var urlBase = 'https://hotell.difi.no/api/json/ldir/produksjon-og-avlosertilskudd/2022?query=';
var url = urlBase;
var kommuneUrlBase = '&kommunenr=';
var page = 1;
var pages = 0;
var pageUrl = "&page=";
var kommuneUrl = kommuneUrlBase;
var kommune = "";

let dropdown = jQuery('#kommune-liste');

const currentPage = document.getElementById("currentPage");
const totalPage = document.getElementById("totalPage");
const hits = document.getElementById("treff");
const table = document.getElementById("lab-til__entries");

// Sorterer kommunene fra A til Å
var compare = function (a, b) {
    // Use toUpperCase() to ignore character casing
    const nameA = a.kommunenavnNorsk.toUpperCase();
    const nameB = b.kommunenavnNorsk.toUpperCase();

    let comparison = 0;
    if (nameA > nameB) {
        comparison = 1;

    } else if (nameA < nameB) {
        comparison = -1;
    }
    return comparison;
};

//Sorterer tilskudd fra mest til minst
var compare2 = function (a, b) {

    // rydder unna tomme verdier
    if (a.sum_produksjons_og_avloesertilskudd === "") {
        return 1;
    }
    if (b.sum_produksjons_og_avloesertilskudd === "") {
        return -1;
    }

    // Use toUpperCase() to ignore character casing
    const valA = parseInt(a.sum_produksjons_og_avloesertilskudd, 10);
    const valB = parseInt(b.sum_produksjons_og_avloesertilskudd, 10);

    if (a.sum_produksjons_og_avloesertilskudd === "") {
        return 1;
    }
    if (b.sum_produksjons_og_avloesertilskudd === "") {
        return -1;
    }

    let comparison = 0;
    if (valA > valB) {
        comparison = -1;
    } else if (valA < valB) {
        comparison = 1;
    }
    return comparison;
};


alleKommuner = [["Sokndal","1111"],["Eigersund","1101"],["Hå","1119"],["Lund","1112"],["Klepp","1120"],["Bjerkreim","1114"],["Sola","1124"],["Time","1121"],["Kvitsøy","1144"],["Sandnes","1108"],["Gjesdal","1122"],["Karmøy","1149"],["Randaberg","1127"],["Stavanger","1103"],["Utsira","1151"],["Bokn","1145"],["Strand","1130"],["Hjelmeland","1133"],["Tysvær","1146"],["Suldal","1134"],["Haugesund","1106"],["Sauda","1135"],["Vindafjord","1160"],["Volda","1577"],["Vanylven","1511"],["Sande","1514"],["Ulstein","1516"],["Herøy","1515"],["Giske","1532"],["Ørsta","1520"],["Hareid","1517"],["Stranda","1525"],["Ålesund","1507"],["Sula","1531"],["Sykkylven","1528"],["Aukra","1547"],["Fjord","1578"],["Hustadvika","1579"],["Molde","1506"],["Rauma","1539"],["Averøy","1554"],["Vestnes","1535"],["Kristiansund","1505"],["Gjemnes","1557"],["Sunndal","1563"],["Smøla","1573"],["Tingvoll","1560"],["Surnadal","1566"],["Aure","1576"],["Bindal","1811"],["Sømna","1812"],["Brønnøy","1813"],["Vega","1815"],["Grane","1825"],["Herøy","1818"],["Vevelstad","1816"],["Vefsn","1824"],["Træna","1835"],["Alstahaug","1820"],["Hattfjelldal","1826"],["Rødøy","1836"],["Dønna","1827"],["Hemnes","1832"],["Røst","1856"],["Lurøy","1834"],["Leirfjord","1822"],["Rana","1833"],["Værøy","1857"],["Meløy","1837"],["Nesna","1828"],["Saltdal","1840"],["Moskenes","1874"],["Bodø","1804"],["Beiarn","1839"],["Fauske","1841"],["Flakstad","1859"],["Gildeskål","1838"],["Sørfold","1845"],["Vestvågøy","1860"],["Steigen","1848"],["Hamarøy","1875"],["Vågan","1865"],["Narvik","1806"],["Bø","1867"],["Lødingen","1851"],["Evenes","1853"],["Øksnes","1868"],["Hadsel","1866"],["Andøy","1871"],["Sortland","1870"],["Hvaler","3011"],["Fredrikstad","3004"],["Råde","3017"],["Sarpsborg","3003"],["Moss","3002"],["Halden","3001"],["Asker","3025"],["Våler","3018"],["Rakkestad","3016"],["Drammen","3005"],["Vestby","3019"],["Skiptvet","3015"],["Aremark","3012"],["Øvre Eiker","3048"],["Lier","3049"],["Frogn","3022"],["Indre Østfold","3014"],["Marker","3013"],["Kongsberg","3006"],["Modum","3047"],["Bærum","3024"],["Nesodden","3023"],["Ås","3021"],["Aurskog-Høland","3026"],["Flesberg","3050"],["Sigdal","3045"],["Hole","3038"],["Nordre Follo","3020"],["Nes","3034"],["Rollag","3051"],["Krødsherad","3046"],["Ringerike","3007"],["Enebakk","3028"],["Lillestrøm","3030"],["Eidsvoll","3035"],["Nore og Uvdal","3052"],["Flå","3039"],["Ullensaker","3033"],["Hurdal","3037"],["Hol","3044"],["Lunner","3054"],["Lørenskog","3029"],["Rælingen","3027"],["Gjerdrum","3032"],["Nannestad","3036"],["Ål","3043"],["Nesbyen","3040"],["Jevnaker","3053"],["Nittedal","3031"],["Hemsedal","3042"],["Gol","3041"],["Eidskog","3416"],["Sør-Odal","3415"],["Nord-Odal","3414"],["Kongsvinger","3401"],["Stange","3413"],["Grue","3417"],["Østre Toten","3442"],["Åsnes","3418"],["Vestre Toten","3443"],["Ringsaker","3411"],["Våler","3419"],["Gran","3446"],["Gjøvik","3407"],["Hamar","3403"],["Løten","3412"],["Søndre Land","3447"],["Lillehammer","3405"],["Åmot","3422"],["Elverum","3420"],["Trysil","3421"],["Sør-Aurdal","3449"],["Nordre Land","3448"],["Øyer","3440"],["Stor-Elvdal","3423"],["Engerdal","3425"],["Nord-Aurdal","3451"],["Gausdal","3441"],["Rendalen","3424"],["Os","3430"],["Vestre Slidre","3452"],["Etnedal","3450"],["Ringebu","3439"],["Alvdal","3428"],["Tolga","3426"],["Tynset","3427"],["Vang","3454"],["Øystre Slidre","3453"],["Sør-Fron","3438"],["Folldal","3429"],["Lom","3434"],["Dovre","3431"],["Skjåk","3433"],["Vågå","3435"],["Nord-Fron","3436"],["Sel","3437"],["Lesja","3432"],["Kragerø","3814"],["Drangedal","3815"],["Nissedal","3822"],["Bamble","3813"],["Fyresdal","3823"],["Kviteseid","3821"],["Skien","3807"],["Larvik","3805"],["Tokke","3824"],["Nome","3816"],["Porsgrunn","3806"],["Vinje","3825"],["Midt-Telemark","3817"],["Seljord","3820"],["Siljan","3812"],["Sandefjord","3804"],["Tinn","3818"],["Notodden","3808"],["Tønsberg","3803"],["Færder","3811"],["Hjartdal","3819"],["Holmestrand","3802"],["Horten","3801"],["Lindesnes","4205"],["Lyngdal","4225"],["Farsund","4206"],["Evje og Hornnes","4219"],["Flekkefjord","4207"],["Kvinesdal","4227"],["Åseral","4224"],["Vennesla","4223"],["Sirdal","4228"],["Hægebostad","4226"],["Bygland","4220"],["Iveland","4218"],["Kristiansand","4204"],["Bykle","4222"],["Froland","4214"],["Birkenes","4216"],["Valle","4221"],["Åmli","4217"],["Lillesand","4215"],["Tvedestrand","4213"],["Grimstad","4202"],["Vegårshei","4212"],["Arendal","4203"],["Gjerstad","4211"],["Risør","4201"],["Sveio","4612"],["Bømlo","4613"],["Austevoll","4625"],["Stord","4614"],["Øygarden","4626"],["Fitjar","4615"],["Kvinnherad","4617"],["Fedje","4633"],["Bergen","4601"],["Tysnes","4616"],["Etne","4611"],["Solund","4636"],["Alver","4631"],["Askøy","4627"],["Bjørnafjorden","4624"],["Ullensvang","4618"],["Askvoll","4645"],["Gulen","4635"],["Austrheim","4632"],["Samnanger","4623"],["Kvam","4622"],["Eidfjord","4619"],["Kinn","4602"],["Fjaler","4646"],["Hyllestad","4637"],["Osterøy","4630"],["Vaksdal","4628"],["Voss","4621"],["Ulvik","4620"],["Bremanger","4648"],["Sunnfjord","4647"],["Høyanger","4638"],["Masfjorden","4634"],["Aurland","4641"],["Gloppen","4650"],["Modalen","4629"],["Vik","4639"],["Lærdal","4642"],["Stad","4649"],["Stryn","4651"],["Sogndal","4640"],["Årdal","4643"],["Luster","4644"],["Oppdal","5021"],["Rindal","5061"],["Heim","5055"],["Rennebu","5022"],["Hitra","5056"],["Orkland","5059"],["Frøya","5014"],["Midtre Gauldal","5027"],["Osen","5020"],["Ørland","5057"],["Melhus","5028"],["Holtålen","5026"],["Flatanger","5049"],["Åfjord","5058"],["Indre Fosen","5054"],["Skaun","5029"],["Selbu","5032"],["Røros","5025"],["Nærøysund","5060"],["Namsos","5007"],["Trondheim","5001"],["Tydal","5033"],["Leka","5052"],["Steinkjer","5006"],["Frosta","5036"],["Malvik","5031"],["Meråker","5034"],["Høylandet","5046"],["Overhalla","5047"],["Inderøy","5053"],["Levanger","5037"],["Stjørdal","5035"],["Verdal","5038"],["Snåsa","5041"],["Namsskogan","5044"],["Grong","5045"],["Lierne","5042"],["Røyrvik","5043"],["Bardu","5416"],["Lavangen","5415"],["Gratangen","5414"],["Salangen","5417"],["Tjeldsund","5412"],["Sørreisa","5419"],["Kvæfjord","5411"],["Ibestad","5413"],["Dyrøy","5420"],["Målselv","5418"],["Harstad","5402"],["Senja","5421"],["Balsfjord","5422"],["Storfjord","5425"],["Tromsø","5401"],["Kåfjord","5426"],["Karlsøy","5423"],["Lyngen","5424"],["Nordreisa","5428"],["Loppa","5432"],["Kautokeino","5430"],["Hasvik","5433"],["Skjervøy","5427"],["Kvænangen","5429"],["Karasjok","5437"],["Hammerfest","5406"],["Alta","5403"],["Tana","5441"],["Måsøy","5434"],["Porsanger","5436"],["Nesseby","5442"],["Nordkapp","5435"],["Lebesby","5438"],["Vadsø","5405"],["Sør-Varanger","5444"],["Gamvik","5439"],["Båtsfjord","5443"],["Berlevåg","5440"],["Vardø","5404"],["Oslo","0301"]];

//Henter alle kommuner fra Datanorge

var getKommune = function (compare, populateDrop) {
    alleKommuner = alleKommuner
        .map(([kommunenavnNorsk, kommunenummer]) => ({kommunenavnNorsk, kommunenummer}))
        .sort((a,b) => a.kommunenavnNorsk.localeCompare(b.kommunenavnNorsk));
    populateDrop(alleKommuner);
    return alleKommuner;
};

// Henter dataem fra DataNorge       !!legge til pages
var getTable = function (url, kommuneUrl) {
    jQuery.ajax({
        method: 'GET',
        url: url + kommuneUrl,
        success: function (response, text, request) {
            data = response;
            data = data.entries.sort(compare2); //sorterer etter tilskudd mest til minst

            populateTable(data);
            return response;
        }
    });
};

//Henter verdi fra søkefeltet og legger til URL
var getUrl = function () {
    var value = jQuery('#search-input').val();
    url = urlBase + value + "*";
    return url;
};

async function populateTable(data) {

    table.innerHTML = ''; //tømmer tabellen for gamle resultat
    if (!data) {
        console.log("no data");
        return
    }

    // Legger til riktig kommunenavnNorsk etter komunenummer
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < alleKommuner.length; j++) {
            if (data[i].kommunenr == alleKommuner[j].kommunenummer) {
                kommune = alleKommuner[j].kommunenavnNorsk;
                kommune = kommune.toUpperCase();
            }
        }

        //legger til komma til sum.


        // Legger til de 50 øverste på lista til tabell
        if (i < 100) {

            var row = ` <div class="lab-til__entry" data-orgnr="${data[i].orgnr}" onclick="toggleInfo(this)">
            <div>
                <div>${data[i].orgnavn}</div>
                <div>${kommune}</div>
                <div>${numberWithCommas(data[i].sum_produksjons_og_avloesertilskudd)} kr</div>
                <div><svg><use xlink:href="#down-caret"></use></svg></div>
            </div>
            <div>
                <div>Org.nr. <span class="lab-til__id">${data[i].orgnr}</span></div>
                <div>Hvorav avløsertilskudd: <span>${numberWithCommas(data[i].avloesertilskudd)} kr</span></div>
                <div class="lab-til__tilskudd2020">Fjorårets tilskudd <span > </span></div>
                <div class="lab-til__avløser2020">Hvorav fjoråets avløsertilskudd: <span> </span></div>
            </div>
        </div>`;

            table.innerHTML += row;
        } else {


            return
        } //hopper ut når max antall er nådd
    }


};

var populateTablePage = function (data, page) {
    var table = document.getElementById("lab-til__entries");
    table.innerHTML = ''; //tømmer tabellen for gamle resultat
    let tableTemp = '';

    if (data === undefined) {
        return
    }


    // Legger til riktig kommunenavnNorsk etter komunenummer
    for (let i = (page - 1) * 100; i < data.length; i++) {


        for (let j = 0; j < alleKommuner.length; j++) {
            if (data[i].kommunenr == alleKommuner[j].kommunenummer) {
                kommune = alleKommuner[j].kommunenavnNorsk;
                kommune = kommune.toUpperCase();
            }
        }


        // Legger til de 100 øverste på lista til tabell
        if (i < (page) * 100) {
            let row = ` <div class="lab-til__entry" data-orgnr="${data[i].orgnr}" onclick="toggleInfo(this)">
            <div>
                <div>${data[i].orgnavn}</div>
                <div>${kommune}</div>
                <div>${numberWithCommas(data[i].sum_produksjons_og_avloesertilskudd)} kr</div>
                <div><svg><use xlink:href="#down-caret"></use></svg></div>
            </div>
            <div>
                <div>Org.nr. <span class="lab-til__id">${data[i].orgnr}</span></div>
                <div>Hvorav avløsertilskudd: <span>${numberWithCommas(data[i].avloesertilskudd)} kr</span></div>
                <div class="lab-til__tilskudd2020">Fjorårets tilskudd <span > </span></div>
                <div class="lab-til__avløser2020">Hvorav fjoråets avløsertilskudd: <span> </span></div>
            </div>
        </div>`;

            tableTemp += row;
        }
    }

    table.innerHTML = tableTemp;
};


//legger inn kommunene i dropdownmenyen
var populateDrop = function (alleKommuner) {
    dropdown.empty();
    dropdown.append('<option selected="true" value="" >Alle kommuner</option>');
    dropdown.prop('selectedIndex', 0);
    for (var k = 0; k < alleKommuner.length; k++) {
        dropdown.append(jQuery('<option></option>').attr('value', alleKommuner[k].kommunenummer).text(alleKommuner[k]
            .kommunenavnNorsk));
    }
};

getKommune(compare, populateDrop);

// window.onload = setTimeout(function() {
//     getTable(url, kommuneUrl);
// }, 50)


let typingTimer; //timer identifier
const doneTypingInterval = 1000; //time in ms
const input = jQuery('#search-input');

input.on('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
});

input.on('keydown', function () {
    clearTimeout(typingTimer);
})


function doneTyping() {
    page = 1; // stiller siden tilbake til 1

    var str = jQuery('#search-input').val();
    var value = str.replace(' ', '+');
    var value2 = jQuery('#kommune-liste').val();
    if (value.length == '' && value2.length == '') {
        var table = document.getElementById("lab-til__entries");
        document.getElementById('nextPage').style.opacity = "0";
        document.getElementById('nextPage').style.cursor = "auto";
        pages = 1;
        data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //placehodler for 10høyeste
        refreshMeta();
        table.innerHTML = `<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>LUNDSTAD GRØNT AS</div>
    <div>ØSTRE TOTEN</div>
    <div>7 192 466 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">992600713</span></div>
    <div>Hvorav avløsertilskudd: <span>0 kr</span></div>
</div>
</div>

<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>BRØDRENE FREBERG DA</div>
    <div>Færder</div>
    <div>6 233 094 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">998866383</span></div>
    <div>Hvorav avløsertilskudd: <span>0 kr</span></div>
</div>
</div>

<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>JAMTSVE/HANEMO SAMDRIFT DA</div>
    <div>NAMSOS</div>
    <div>5 428 713 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">987172592</span></div>
    <div>Hvorav avløsertilskudd: <span>96 580 kr</span></div>
</div>
</div>

<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>OLE KRISTIAN KARLSRUD</div>
    <div>NORDRE FOLLO</div>
    <div>4 420 334 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">969098520</span></div>
    <div>Hvorav avløsertilskudd: <span>96 580 kr</span></div>
</div>
</div>

<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>ELSTØEN GARTNERI AS</div>
    <div>HOLE</div>
    <div>4 316 850 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">988390747</span></div>
    <div>Hvorav avløsertilskudd: <span>0 kr</span></div>
</div>
</div>

<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>KLØVERBAKKEN SAMDRIFT DA</div>
    <div>INDRE ØSTFOLD</div>
    <div>3 911 090 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">990844011</span></div>
    <div>Hvorav avløsertilskudd: <span>96 580 kr</span></div>
</div>
</div>

<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>GAMKINN LANDBRUK V/ JENS PETTER GAMKINN</div>
    <div>GRAN</div>
    <div>3 904 048 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">973053515</span></div>
    <div>Hvorav avløsertilskudd: <span>96 580 kr</span></div>
</div>
</div>

<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>PER ISINGRUD</div>
    <div>ULLENSAKER</div>
    <div>3 903 740 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">959119252</span></div>
    <div>Hvorav avløsertilskudd: <span>0 kr</span></div>
</div>
</div>

<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>BJERTNÆS OG HOEL AS</div>
    <div>FÆRDER</div>
    <div>3 768 480 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">98809473</span></div>
    <div>Hvorav avløsertilskudd: <span>0 kr</span></div>
</div>
</div>

<div class="lab-til__entry" onclick="toggleInfo(this)">
<div>
    <div>JO POPPE</div>
    <div>FREDRIKSTAD</div>
    <div>3 679 291 kr</div>
    <div><svg><use xlink:href="#down-caret"></use></svg></div>
</div>
<div>
    <div>Org.nr. <span class="lab-til__id">974352869</span></div>
    <div>Hvorav avløsertilskudd: <span>96 580 kr</span></div>
</div>
    </div>`;
        return

    }
    if (value.length < 3 && value.length > 0) {
        return
    } //returnerer hvis søkefeltet er kortere enn 3 bokstaver 

    var table = document.getElementById("lab-til__entries");
    //table.innerHTML = `<img style="width:100px; display:block; margin: 75px auto; height:100px " src="https://tunmedia.s3.us-east-2.amazonaws.com/natlab/scripts/loader-loading.gif"></img>`;
    table.innerHTML = `<svg id="tractor-waiting" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 962.4 518.9">
<path fill="none" stroke="black" stroke-width="3" stroke-dasharray="4670" stroke-dashoffset="4670" d="M0.6,507c39.2,17.2,87,12.9,122.5-11s57.4-66.6,56.2-109.4c-1.1-36.9-22.7-75.9-58.4-85c-35.6-9.1-74.4,16.3-86.2,51.1s0.6,74.8,25.4,101.9s60.3,42.4,96.4,49.3s73.1,6,109.8,5c33.7-0.9,67.5-1.7,101.2-2.6c48-1.2,100.5-4.2,135.9-36.5c21.4-19.6,33.6-48.1,36.6-77c6.1-58.4-26.8-119.6-80.1-144.2s-123-8.6-158.2,38.4c-38.1,51-28.5,130.4,18.7,173.1S445,505.6,497.1,469c18.9-13.3,34.7-31.1,45.3-51.7c23.6-45.7,19.3-104.6-10.7-146.4c-30.1-41.8-84.5-64.6-135.4-56.7c-19.8,3.1-38.8,10.3-58.6,12.3c-19.9,2-42.2-2.5-54.4-18.3c-12.4-16-10.9-38.4-8.9-58.6c4.5-44.8,11.5-94.4,46.4-122.9C352,1.3,396.1,0.9,436.5,1.7c32.8,0.7,68.2,2.2,93.8,22.7c50.3,40.1,35.4,128.9,85.7,168.9c55.9,44.4,147.9-4.4,206.3,36.7c27.9,19.7,40,55,45.5,88.8c4.2,25.5,5.7,51.4,4.4,77.2c-1,20.6-4.7,42.9-19.8,56.8c-15.1,13.9-71.7,24-46.8-7.5c24.9-31.5,22.9-77.6,0.2-109.7c-22.7-32.2-68.4-46-105-31.5c-36.6,14.5-60.6,56-54.4,94.9c6.1,38.9,41.9,71.1,81.3,72.9c22.9,1,46.6-8,61-25.9c14.3-17.9,17.7-44.6,6-64.3c-11.8-19.9-36.8-29.7-59.9-27.5c-23.1,2.2-44.2,14.7-61.1,30.6c-22.9,21.5-39.9,55.8-25.9,84c8.5,17.2,26.8,27.8,45.5,31.8c18.7,4,38.2,2.2,57.2,0.4c70.6-6.6,141.2-13.2,211.8-19.8"/>
</svg>`

    data = [];
    //if(value.length == 0) {populateTable(data)};
    url = 'https://hotell.difi.no/api/json/ldir/produksjon-og-avlosertilskudd/2022?query=' + value + '*';


    fetchAndPublish();
};

async function fetchAndPublish() {

    let pp = await getPage(url, kommuneUrl);

    if (pp.pages < 2) {
        document.getElementById('nextPage').style.opacity = "0";
        document.getElementById('nextPage').style.cursor = "auto";
    }
    if (pp.pages > 1) {
        document.getElementById('nextPage').style.opacity = "1";
        document.getElementById('nextPage').style.cursor = "pointer";
    }
    if (pp.posts == 0) { //fanger opp hvis søket har 0 treff
        table.innerHTML = "";
        refreshMeta();
        return
    }

    let aall = await getAllPages(pp.pages);

    // populateTable(aall);

    // refreshMeta();
    document.querySelector(".lab-til").scrollIntoView();
}

jQuery('#kommune-liste').on('change', function () {
    page = 1;

    kommuneUrl = kommuneUrlBase + this.value;
    url = getUrl();

    fetchAndPublish();
});

function setPage(p) {
    pages = p;
    return pages;
}

async function getPage(url, kommuneUrl) {
    return jQuery.ajax({
        method: 'GET',
        url: url + kommuneUrl,
        success: function (resp) {
            var data6 = resp;
            setPage(data6.pages); // setter pages til antallet i søket
        }
    });
}


async function getAllPages(pages) {

    const promises = [];
    const prom = [];

    let tempArray = [];
    let tempArray2 = [];
    if (pages == 0) {
        return
    }

    // function addPromis(i) {

    //     console.log("fooo", i);
    // }

    for (let i = 1; i <= pages; i++) {
        if(i > 10) {pages = 10; return;}
        if (i > 5) {
            setTimeout(() => {
                prom.push(getData(url, kommuneUrl, i));
            }, 150 * i)            
                
            console.log("for mange sider");        

        } else {           
            promises.push(getData(url, kommuneUrl, i));
        }
    }

    //løser ut alle promises
    Promise.all(promises)
        .then((result) => {

            for (let i = 0; i < result.length; i++) {
                tempArray = tempArray.concat(result[i].entries);
            }

            data = tempArray; //lagrer dataen vi henter i data[]
            try {
                data = data.sort(compare2); //sorterer etter tilskudd mest til minst
            } catch (error) {
                console.log(error)
            }

            populateTable(data);
            refreshMeta();
            document.querySelector("#lab-til__scroll_to").scrollIntoView();

            return tempArray

        }).catch(err => console.log("error ", err))

    function toManyPages() {
        Promise.all(prom).then((result2) => {

            for (let resIndex = 0; resIndex < result2.length; resIndex++) {
                tempArray2 = tempArray2.concat(result2[resIndex].entries);
            }

            data = data.concat(tempArray2);
            try {
                data = data.sort(compare2); //sorterer etter tilskudd mest til minst
            } catch (error) {
                console.log(error)
            }
            refreshMeta();
            populateTable(data);
            return result2
        });
    }

    setTimeout(() => {
        toManyPages();
    }, 3000);
}

async function getData(url, kommuneUrl, i) {
    setTimeout(() => { console.log(i); }, i * 250)
    let result = await jQuery.ajax({
        method: 'GET',
        tryCount: 0,
        retryLimit: 3,
        url: url + kommuneUrl + pageUrl + i,
        async: true,
        success: function (response, text, request) {
             console.log("suksess " + i)
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(textStatus, " inni ajax ", errorThrown);
        }
    });

    return result;
};

function prevPage() {
    if (page == 1) {
        return
    }
    if (page > 1) {
        document.getElementById('nextPage').style.opacity = "1";
        document.getElementById('nextPage').style.cursor = "pointer"
    }
    if (pages == 0) {
        return
    }
    page = page - 1;
    if (page == 1) {
        document.getElementById('prevPage').style.opacity = "0";
        document.getElementById('prevPage').style.cursor = "auto"
    }
    populateTablePage(data, page);
    refreshMeta();




}

function nextPage() {

    if (page < pages) {
        page++
    }

    if (page == pages) {
        document.getElementById('nextPage').style.opacity = "0";
        document.getElementById('nextPage').style.cursor = "auto";
    }

    if (page != 1) {
        document.getElementById('prevPage').style.opacity = "1";
        document.getElementById('prevPage').style.cursor = "pointer";
    }
    if (pages == 0) {
        return
    }



    populateTablePage(data, page);
    refreshMeta();

}

function refreshMeta() {

    currentPage.innerHTML = page;
    totalPage.innerHTML = pages;
    hits.innerHTML = data.length;
}