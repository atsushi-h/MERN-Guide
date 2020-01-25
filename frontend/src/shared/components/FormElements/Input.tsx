import React, { useReducer, ChangeEvent } from 'react';

import './Input.css';

type State = {
  value: string,
  isValid: boolean,
};

type Action = {
  type: "CHANGE",
  val: string,
};

const inputReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: true
      };
    default:
      return state;
  }
};

type Props = {
  element: "input" | "textarea",
  id?: string,
  type: string,
  placeholder?: string,
  rows?: number,
  label: string,
  validators: [],
  errorText: string,
};

const Input: React.FC<Props> = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isValid: false
  });

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({ type: 'CHANGE', val: e.target.value });
  };

  const element = props.element === 'input' ? (
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      value={inputState.value}
    />
  ) : (
    <textarea
      id={props.id}
      rows={props.rows || 3}
      onChange={changeHandler}
      value={inputState.value}
    />
  );

  return (
    <div className={`form-control ${!inputState.isValid && 'form-control--invalid'}`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
