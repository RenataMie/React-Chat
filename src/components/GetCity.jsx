
import React, { useState, useRef, useEffect, useMemo } from "react";
import {Field, ErrorMessage} from 'formik';
import {TextField} from '@material-ui/core';

import "./index.css";



function GetCity({ data, onSelect, onKeyPress, isHighlighted})  {

	const fieldName = "city";

    const [isVisbile, setVisiblity] = useState(false);
    const [search, setSearch] = useState("");
    const [cursor, setCursor] = useState(-1);
    


    const searchContainer = useRef(null);
    const searchResultRef = useRef(null);



    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);

        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);



    const scrollIntoView = position => {
        searchResultRef.current.parentNode.scrollTo({
            top: position,
            behavior: "smooth"
        });
    };




    useEffect(() => {
        if (cursor < 0 || cursor > suggestions.length || !searchResultRef) {
            return () => {};
        }

        let listItems = Array.from(searchResultRef.current.children);
        listItems[cursor] && scrollIntoView(listItems[cursor].offsetTop);
    }, [cursor]);



    
    const suggestions = useMemo(() => {
        if (!search) return ("");

        setCursor(-1);
        scrollIntoView(0);

        return data.filter(item =>
            item.nome.toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search]);




    const handleClickOutside = event => {
        if (
            searchContainer.current &&
            !searchContainer.current.contains(event.target)
        ) {
            hideSuggestion();
        }
    };



    function showSuggestion() {
		 setVisiblity(true);
	}


    function hideSuggestion() {
    	setVisiblity(false);
    }



    return (



        <div   className="answers2">


            <Field

            	name={fieldName}
				className="input"
                autoComplete="off"
                onClick={showSuggestion}
                onChange={e => setSearch(e.target.value)}
                value={search}
                placeholder="Selecione uma cidade"
                onKeyPress={onKeyPress}

            />
            
             <div >
                    
               {isVisbile && (
              
            
                <ul className="list-group" ref={searchResultRef} >

                    {Object.keys(suggestions).map((key, idx) => (

                    	

                    	<li className={`list-group-item ${isHighlighted ? "active highlighted" : "" }`}
            				
            				onClick={() => {
            					hideSuggestion();
            					setSearch(`${suggestions[key].nome}` +"," + `${suggestions[key].microrregiao.mesorregiao.UF.sigla}`);
            					onSelect(`${suggestions[key].nome}` +"," + `${suggestions[key].microrregiao.mesorregiao.UF.sigla}`);
            					
            				}} 
            				
            					>
            
                    				{suggestions[key].nome}, {suggestions[key].microrregiao.mesorregiao.UF.sigla}
                      			
        				</li>

        				

        				

                      
                    ))}
                </ul>

                )}

            </div>
        </div>
    );
};

export default GetCity;