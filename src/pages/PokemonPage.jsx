import React, { useContext, useEffect, useState } from 'react';
import { PokemonContext } from '../context/PokemonContext';
import { useParams } from 'react-router-dom';
import { primerMayuscula } from '../helper/helper';
import { Loader } from '../components';

export const PokemonPage = () => {
    const {getPokemonByID} = useContext(PokemonContext);

	const species = 'https://pokeapi.co/api/v2/pokemon-species/';

    const [loading, setLoading] = useState(true);
    const [pokemon, setPokemon] = useState({});

    const { id } = useParams();

    const fetchPokemon = async(id) => {
        const data = await getPokemonByID(id);
        setPokemon(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchPokemon(id);
    },[]);

  return (
    <main className='container main-pokemon'>
        {loading ? (
                <Loader />
            ) : (
                <>
                    <div className='header-main-pokemon'>
						<span className='number-pokemon'>#{pokemon.id}</span>
						<div className='container-img-pokemon'>
							<img
								src={pokemon.sprites.other.home.front_default}
								alt={`Pokemon ${pokemon?.name}`}
							/>
						</div>
						<div className='container-info-pokemon'>
							<h1>{primerMayuscula(pokemon.name)}</h1>
							<div className='card-types info-pokemon-type'>
								{pokemon.types.map(type => (
									<span key={type.type.name} className={`${type.type.name}`}>
										{primerMayuscula(type.type.name)}
									</span>
								))}
							</div>
                            <hr />
							<div className='info-pokemon'>
								<div className='group-info'>
									<p>Altura</p>
									<span>{pokemon.height} dm.</span>
									<p>Sprites</p>
									<div>
										<img src={pokemon.sprites.front_default} /> 
										<img src={pokemon.sprites.back_default} />
									</div>
									{/* <p>Description</p>
									<span>{primerMayuscula(species)} </span> */}
								</div>
								<div className='group-info'>
									<p>Peso</p>
									<span>{pokemon.weight} Kg.</span>
									<p>Habilidad</p>
									<span>{primerMayuscula(pokemon.abilities.map(ability => ability.ability.name).join(', '))}.</span>
								</div>
							</div>
						</div>
					</div>
                    <hr />
					<div className='container-stats'>
						<h1>Estadísticas</h1>
						<div className='stats'>
							<div className='stat-group'>
								<span className='atributes'>Hp</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[0].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span className='atributes'>Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[1].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span className='atributes'>Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[2].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span className='atributes'>Special Attack</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[3].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span className='atributes'>Special Defense</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[4].base_stat}
								</span>
							</div>
							<div className='stat-group'>
								<span className='atributes'>Speed</span>
								<div className='progress-bar'></div>
								<span className='counter-stat'>
									{pokemon.stats[5].base_stat}
								</span>
							</div>
						</div>
					</div>
                </>
            )}
    </main>
    );
};
