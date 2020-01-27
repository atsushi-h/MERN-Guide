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

type InputChangeAction = {
  type: 'INPUT_CHANGE',
  inputId: string,
  value: string,
  isValid: boolean,
};

type SetDataAction = {
  type: 'SET_DATA',
  inputs: Inputs,
  formIsValid: boolean,
};

type Actions = InputChangeAction | SetDataAction;

const formReducer = (state: State, action: Actions) => {
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
    case 'SET_DATA':
      return {
        inputs: action.inputs,
        isValid: action.formIsValid
      };
    default: 
      return state;
  }
};

// 戻り値の配列
type returnArray = [
  State,
  (id: string, value: string, isValid: boolean) => void,
  (inputData: Inputs, formValidity: boolean) => void,
];

// フック本体
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

  const setFormData = useCallback((inputData: Inputs, formValidity: boolean) => {
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
