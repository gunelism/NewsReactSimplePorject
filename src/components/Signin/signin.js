import React, {Component} from 'react';
import './signin.css';
import FormField from '../widgets/FormFields/formfields';
import {firebase} from '../../firebase';
class Signin extends Component{
    
    state = {
        registerError: "",
        loading:false,
        formdata: {
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:""
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'Enter your password'
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:""
            }
        }
    }

    updateForm = (element) =>{
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.e.target.value;
        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        this.setState({
            formdata:newFormdata
        })
    }
    validate = (element) => {
        let error = [true,''];
        
        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email' : ''}`;
            error = !valid ? [valid,message] : error;
        }
        if(element.validation.password){
            const valid = element.value.length >= 6;
            const message = `${!valid ? 'Must be greater than 6' : ''}`;
            error = !valid ? [valid,message] : error;
        }
        if(element.validation.required){
            const valid = element.value.trim() !=='';
            const message = `${!valid ? 'Field is required' : ''}`;
            error = !valid ? [valid,message] : error;
        }
        return error;
    }
    submitButton = () => (
        this.state.loading ? 
        '...loading' 
        :
        <div>
            <button onClick={event=>this.submitForm(event,true)}>Login</button>
            <button onClick={event=>this.submitForm(event,false)}>Register Now</button>
        </div>
    )
    showError = () => (
        this.state.registerError !== '' ? 
            <div className="error">{this.state.registerError}</div>
        : ''
    )
    submitForm = (event,type) => {
        event.preventDefault();
        if(type !== null){
            let dataToSubmit = {};
            let formIsValid = true;

            for(let key in this.state.formdata){
                dataToSubmit[key] = this.state.formdata[key].value;
            }
            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid;
            }
            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                });
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    )
                    .then(()=>{
                        this.props.history.push('/')
                    }).catch(error=>{
                        this.setState({
                            loading:false,
                            registerError: error.message
                        });
                    })
                }else{
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(()=>{
                        this.props.history.push('/')
                    }).catch(error=>{
                        this.setState({
                            loading:false,
                            registerError: error.message
                        });
                    })
                }
            }
        }
    }
    render(){
        return(
            <div className="logContainer">
                <form onSubmit={event=>this.submitForm(event,null)}>
                    <h2>Log in / Register</h2>
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element)=>this.updateForm(element)}
                    />
                    {this.submitButton()}
                    {this.showError()}
                </form>
            </div>
        )
    }
}

export default Signin;