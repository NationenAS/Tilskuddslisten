var numberWithCommas = function (x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

function toggleInfo(e) {

  let orgnr = e.dataset.orgnr;

  get2020(e, orgnr).then((data) => {
    if (data.entries.length > 1) { console.log("får flere treff. noe feil har skjedd"); return }

    if (data.entries.length == 0) {
      e.querySelector('.lab-til__tilskudd2020').innerHTML = `<div class="lab-til__tilskudd2020">Sum tilskudd 2020: <span > 0 kr </span></div>`;
      e.querySelector('.lab-til__avløser2020').innerHTML = `<div class="lab-til__avløser2020">Hvorav avløsertilskudd 2020: <span>0 kr</span></div>`;

      return
    }

    if (data.entries.length == 1) {
      e.querySelector('.lab-til__tilskudd2020').innerHTML = `<div class="lab-til__tilskudd2020">Sum tilskudd 2020:  <span >  ${numberWithCommas(data.entries[0].sum_produksjons_og_avloesertilskudd)} kr </span></div>`;
      e.querySelector('.lab-til__avløser2020').innerHTML = `<div class="lab-til__avløser2020">Hvorav avløsertilskudd 2020: <span>${numberWithCommas(data.entries[0].avloesertilskudd)} kr</span></div>`;
    }
  });
  e.classList.toggle("open")
}


async function get2020(e, orgnr) {
  let result = await jQuery.ajax({
    method: 'GET',
    url: "https://hotell.difi.no/api/json/ldir/produksjon-og-avlosertilskudd/2020?query=" + orgnr,
    async: true,
    success: function (response, text, request) { }

  });
  return result;
};