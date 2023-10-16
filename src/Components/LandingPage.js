import React from "react";
import Introduction from "./documents/introduction";
import Image from "../assets/image_icone_loupe.svg"; 
import Card from "./Card";
import { useEffect } from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";

const LandingPage = () => {

    const [data, setData] = useState([])
    const [selectedValue, setSelectedValue] = useState('Difficultés');
    const [selectedValue_2, setSelectedValue_2] = useState('Durée');

    /*const [displayCards, setDisplayCards] => useState()*/
    const [pageNumber, setPageNumber] = useState(0);
    const cardsPerPage = 5;
    const pagesVisited = pageNumber * cardsPerPage;

    const displayCards = data.slice(pagesVisited, pagesVisited + cardsPerPage).map(({titre, auteur, key, id}) => {
       return(
        <Card
        id= {id}
        key={key}
        titre = {titre}
        auteur = {auteur}/>
       ) 
    });

    const pageCount = Math.ceil(data.length / cardsPerPage);
    const changePage = ({selected}) => {
        setPageNumber(selected)
    }


    useEffect(() => {

        fetch(`http://localhost:3000/api/cards`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setData(data);
                } 
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données :', error);
            });

    }, []);


    const handleSelectChange = (e) => {
        setSelectedValue(e.target.value);
    }; 
        
    const handleSelectChange_2 = (e) => {
        setSelectedValue_2(e.target.value);
    };
            
    /*
    <div className="cards_area">
                {data.map(({titre, auteur, key, id}) => (
                <Card 
                id= {id}
                key={key}
                titre = {titre}
                auteur = {auteur}
                 />))}
            </div>*/ 

    return (
        <div>
        <div className="div_presentation">

            <section className="explanation_landingpage">
                <Introduction/>
            </section>

            <section className="search_scene">
                <div className="search_div">
                    
                    <form className="form_research">

                        <div className="title_author_research">
                            <label htmlFor="title">Titre de la scène</label>
                            <input type="text" placeholder="Nom de la scène" id="title"></input>
                            <label htmlFor="name">Auteur</label>
                            <input type="text" placeholder="Nom de l'auteur" id="name"></input>
                        </div>

                        <div className="other_attributes_button">
                            <div className="first_row_research">

                            <select required name="difficulties" value={selectedValue}  onChange={handleSelectChange}>
                                    <option  disabled hidden>Difficultés</option>
                                    <option value="1">facile</option>
                                    <option value="2">intermédiaire</option>
                                    <option value="3">difficile</option>
                                </select>

                                <select required name="duration" value={selectedValue_2} onChange={handleSelectChange_2} >
                                    <option  disabled hidden >Durée</option>
                                    <option value="1">15 minutes ou moins</option>
                                    <option value="2">30 minutes ou moins</option>
                                    <option value="3">45 minutes ou moins</option>
                                    <option value="4">60 minutes ou moins</option>
                                </select>

                                <div>
                                    <label>Public majeur</label>
                                    <input type="checkbox"></input>
                                </div>

                            </div>

                            <div className="button_research">
                                <button>
                                    Lancer la recherche <img alt="icone de loupe" src={Image}/>
                                </button> 
                            </div>  
                            
                        </div>
                    </form>

                </div>
                

            </section>
            <div className="cards_area">
                {displayCards}
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                />
            </div>
            

        </div>
        
        </div>
        
    )
};
export default LandingPage;