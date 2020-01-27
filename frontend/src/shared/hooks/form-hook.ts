import { useCallback, useReducer } from 'react';

type State = {
  inputs: Inputs,
  isValid: boolean,
};

type Inputs = {
  [key: string]: {
    value: string,
    isValid: boolean,
  }
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

type returnArray = [State, (id: string, value: string, isValid: boolean) => void];

export const useForm = (initialInputs: Inputs, initialFormValidity: boolean): returnArray => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id: string, value: string, isValid: boolean) => {
    dispatch({
      type: 'INPUT_CHANGE',
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  return [formState, inputHandler];
};
