const countries = [
    { name: "Canada", continent: "North America", cities: ["Calgary","Montreal","Toronto"], photos: ["canada1.jpg","canada2.jpg","canada3.jpg"] },
    { name: "United States", continent: "North America", cities: ["Boston","Chicago","New York","Seattle","Washington"], photos: ["us1.jpg","us2.jpg"] },
    { name: "Italy", continent: "Europe", cities: ["Florence","Milan","Naples","Rome"], photos: ["italy1.jpg","italy2.jpg","italy3.jpg","italy4.jpg","italy5.jpg","italy6.jpg"] },
    { name: "Spain", continent: "Europe", cities: ["Almeria","Barcelona","Madrid"], photos: ["spain1.jpg","spain2.jpg"] }
];

const lab = document.getElementsByClassName('flex-container justify')[0];
for (const i in countries) {
    lab.innerHTML=lab.innerHTML+'<div class="item"><h2>'+countries[i].name+'</h2><h3>'+countries[i].continent+'</h3><div class="inner-box"><h2 class="cities"></h2><ul></ul></div><div><h2 class="photos"></h2><div class="photoItem"></div></div><div><button></button></div>'
    document.getElementsByClassName('cities')[i].innerHTML='Cities';
    document.getElementsByClassName('photos')[i].innerHTML='Popular Photos';
    document.getElementsByTagName('button')[i].innerHTML='Visit';
    for(const j in countries[i].cities){
        document.getElementsByTagName('ul')[i].innerHTML+='<li>'+countries[i].cities[j]+'</li>';
    }
    for (const k in countries[i].photos){
        document.getElementsByClassName('photoItem')[i].innerHTML+='<img class="photo" src="images/'+countries[i].photos[k]+'">';
    }
}