export const fetchHeroes = async () => {
  const url = `https://akabab.github.io/superhero-api/api/all.json`;

  const resp = await fetch(url);

  const data = await resp.json();

  const heroesFetch = await data.map(hero => ({
    id: hero.id,
    superhero: hero.name,
    publisher: hero.biography.publisher,
    alter_ego: hero.biography.alterEgos,
    first_appearance: hero.biography.firstAppearance,
    characters: hero.biography.fullName,
    heroImageUrl: hero.images.lg,
    gender: hero.appearance.gender,
    work: hero.work.occupation,
    race: hero.appearance.race,
  }));

  return heroesFetch;
};
