import React from "react";
// import React, { Component } from "react";
import { nanoid } from 'nanoid';
import { getDatabase, child, ref, set, get } from "firebase/database";
import { iswebUrl } from 'valid-url';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

class Form extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            longURL: '',
            preferedAlias: '',
            generatedURL: '',
            loading: '',
            errors: [],
            errormessage: {},
            toolTipMessage: 'Copy To Clip Board'
        };
    }

    //When the user click submit, this methd will be called
    onSubmit = async (event) => {
        event.preventDefault(); // Preventd the page from reloading when the submit is clicked 
        this.setState({
            loading: true,
            generatedURL: ''
        })

        //Validate the input when the user has submitted the form 
        let isFormValid = await this.validateInput()
        if (!isFormValid) {
            return
        }

        let generatedKey = nanoid(5);
        let generatedURL = "minilinkkit.com/" + generatedKey

        if(this.state.preferedAlias !== '') {
            generatedKey = this.state.preferedAlias
            generatedURL = "minilinkkit.com/" + this.state.preferedAlias
        }

        const db = getDatabase();
        set(ref(db, '/' + generatedKey), {

            generatedKey: generatedKey,
            longURL: this.state.longURL,
            preferedAlias: this.state.preferedAlias,
            generatedURL: generatedURL
        }).then((result) => {
            this.setState({
                generatedURL: generatedURL,
                loading: false
            })
        }).catch((e) => {
            //Handle error
        })
    }

    //Checked if field has an error
    hasError = (key) => {
        return this.state.errors.indexOf(key) !== -1;
    }

    //Save the content of the form as the user is typing
    handleChange = (e) => {
        const {id, value} = e.target
        this.setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    validateInput = async () => {
        var errors = [];
        var errormessage = this.state.errormessage

        //Validate Long Url
        if(this.state.longURL.length === 0) {
            errors.push("longURL");
            errormessage['longURL'] = 'Please enter your URL';

        }else if (!iswebUrl(this.state.longURL)) {
            errors.push("longURL");
            errormessage['longURL'] = 'Please enter a URL in a form of https://www.....'; 
        }

            //Preferes Alias
        if(this.state.preferedAlias !== '') {
            if(this.state.preferedAlias.length > 7) {
                errors.push("suggestedAlias");
                errormessage['suggestedAlias'] = 'Please enter an alias less than 7 characters'
            } else if (this.state.preferedAlias.indexOf(' ') >= 0) {
                errors.push("suggestedAlias");
                errormessage['suggestedAlias'] = "Spaces are not allowed in URLS";
            }

            var keyExists = await this.checkKeyExist()

            if (keyExists.exist()) {
                errors.push("suggestedAlais");
                errormessage['suggestedAlias'] = 'The Alias you have eneted is already exist: Please enter another one'
            }            
        }

    }
}