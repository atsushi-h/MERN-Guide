import React, { useCallback, useReducer, ChangeEvent } from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators';
import './NewPlace.css';

type State = {
  inputs: {
    [key: string]: {
      value: string,
      isValid: boolean,
    }
  },
  isValid: boolean,
};

type Action = {
  type: 'INPUT_CHANGE',
  inputId: string,
  value: string,
  isValid: boolean,
};

const formReducer = (state: State, action: Action) => {
  switch(action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    default: 
      return state;
  }
};

const NewPlace: React.FC = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatch({
      type: 'INPUT_CHANGE',
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  const placeSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState.inputs); // サーバに送るデータ
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address."
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
