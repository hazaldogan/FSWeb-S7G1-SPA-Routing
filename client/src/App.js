import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import KaydedilenlerListesi from "./Filmler/KaydedilenlerListesi";
import FilmListesi from "./Filmler/FilmListesi";
import Film from "./Filmler/Film";

export default function App() {
  const [saved, setSaved] = useState([
    {
      id: 0,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      metascore: 100,
    },
  ]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const FilmleriAl = () => {
      axios
        .get("http://localhost:5001/api/filmler") // Burayı Postman'le çalışın
        .then((response) => {
          // Bu kısmı log statementlarıyla çalışın
          console.log(response);
          // ve burdan gelen response'u 'movieList' e aktarın
          setMovieList(response.data);
        })
        .catch((error) => {
          console.error("Sunucu Hatası", error);
        });
    };
    FilmleriAl();
  }, []);

  const KaydedilenlerListesineEkle = (id) => {
    // Burası esnek. Aynı filmin birden fazla kez "saved" e eklenmesini engelleyin

    const varMi = saved.find((film) => film.id === Number(id));
    if (!varMi) {
      /* ------ ÖNEMLİ -------- */
      const kaydedilecekFilm = movieList.find((film) => film.id === Number(id));
      setSaved([...saved, kaydedilecekFilm]);
      /*----------------------*/
    }
  };

  return (
    <div>
      <KaydedilenlerListesi list={saved} />

      <Switch>
        <Route path="/filmler/:id">
          <Film KaydedilenlerListesineEkle={KaydedilenlerListesineEkle} />
        </Route>
        <Route path="/">
          <FilmListesi movies={movieList} />
        </Route>
      </Switch>
    </div>
  );
}
