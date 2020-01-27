import React, { useReducer, useEffect, ChangeEvent } from 'react';

import { validate } from '../../util/validators';
import './Input.css';

type State = {
  value: string,
  isValid: boolean,
  isTouched: boolean,
};

type ChageAction = {
  type: "CHANGE",
  val: string,
  validators: Validater[],
};

type TouchAction = {
  type: "TOUCH",
};

type Validater = {
  type: string
};

type Actions = ChageAction | TouchAction;

const inputReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
    case 'TOUCH':
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

type Props = {
  element: "input" | "textarea",
  id: string,
  type?: string,
  placeholder?: string,
  rows?: number,
  label: string,
  validators: Validater[],
  errorText: string,
  onInput: (id: string, value: string, isValid: boolean) => void,
  initialValue?: string,
  initialValid?: boolean,
};

const Input: React.FC<Props> = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [id, value, isValid, onInput]);

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element = props.element === 'input' ? (
    <input
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    />
  ) : (
    <textarea
      id={props.id}
      rows={props.rows || 3}
      onChange={changeHandler}
      onBlur={touchHandler}
      value={inputState.value}
    />
  );

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
