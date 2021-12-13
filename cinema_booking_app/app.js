"use strict";

const container = document.querySelector(".container");
const koltuklar = document.querySelector(".row .koltuk:not(.satildi)");
const sayac = document.getElementById("say");
const ucret = document.getElementById("ucret");
const filmSec = document.getElementById("film");

populateUI();

let biletFiyati = +filmSec.nodeValue;

function setFilmData(filmIndex, filmUcreti) {
  localStorage.setItem("selectedFilmIndex", filmIndex);
  localStorage.setItem("selectedFilmUcreti", filmUcreti);
}

function guncelleSelectedSayi() {
  const selectedKoltuklar = document.querySelectorAll(".row .koltuk.secildi");
  const koltukIndex = [...selectedKoltuklar].map((koltuk) =>
    [...selectedKoltuklar].indexOf(koltuk)
  );
  localStorage.setItem("selectedKoltuklar", JSON.stringify(koltukIndex));
  const selectedKoltukSayisi = selectedKoltuklar.length;
  sayac.innerText = selectedKoltukSayisi;
  ucret.innerText = selectedKoltukSayisi * biletFiyati;
  setFilmData(filmSec.selectedIndex, filmSec.value);
}

function populateUI() {
  const selectedKoltuklar = JSON.parse(
    localStorage.getItem("selectedKoltuklar")
  );
  if (selectedKoltuklar !== null && selectedKoltuklar.length > -1) {
    selectedKoltuklar.forEach((koltuk, index) => {
      if (selectedKoltuklar.indexOf(index) > -1) {
        koltuklar.classList.add("secildi");
      }
    });
  }
  const selectedFilmIndex = localStorage.getItem("selectedFilmIndex");
  if (selectedFilmIndex !== null) {
    filmSec.selectedIndex = selectedFilmIndex;
  }
}

filmSec.addEventListener("change", (e) => {
  biletFiyati = +e.target.value;
  setFilmData(e.target.selectedIndex, e.target.value);
  guncelleSelectedSayi();
});

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("koltuk") &&
    !e.target.classList.contains("satildi")
  ) {
    e.target.classList.toggle("secildi");
    guncelleSelectedSayi();
  }
});

guncelleSelectedSayi();
