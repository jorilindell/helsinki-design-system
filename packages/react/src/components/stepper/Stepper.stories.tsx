import React, { useReducer, useRef } from 'react';

import { Stepper } from './Stepper';
import styles from './Stepper.module.scss';
import { Step, StepState } from './Step';
import { Button } from '../button';
import { IconArrowLeft, IconArrowRight } from '../../icons';
import { TextInput } from '../textInput';
import { NumberInput } from '../numberInput';
import { Card } from '../card';
import { ErrorSummary } from '../errorSummary';
import { FileInput } from '../fileInput/FileInput';

export default {
  component: Stepper,
  title: 'Components/Stepper',
  decorators: [(storyFn) => <div style={{ maxWidth: '700px' }}>{storyFn()}</div>],
  parameters: {
    controls: { expanded: true },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: 'white',
        },
        {
          name: 'gray',
          value: '#e5e5e5',
        },
      ],
    },
  },
  args: {},
};

const commonReducer = (stepsTotal) => (state, action) => {
  switch (action.type) {
    case 'completeStep': {
      const activeStepIndex = action.payload === stepsTotal - 1 ? stepsTotal - 1 : action.payload + 1;
      return {
        activeStepIndex,
        steps: state.steps.map((step, index) => {
          if (index === action.payload && index !== stepsTotal - 1) {
            // current one but not last one
            return {
              state: StepState.completed,
              label: step.label,
            };
          }
          if (index === action.payload + 1) {
            // next one
            return {
              state: StepState.available,
              label: step.label,
            };
          }
          return step;
        }),
      };
    }
    case 'setActive': {
      return {
        activeStepIndex: action.payload,
        steps: state.steps.map((step, index) => {
          if (index === action.payload) {
            return {
              state: StepState.available,
              label: step.label,
            };
          }
          return step;
        }),
      };
    }
    default:
      throw new Error();
  }
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Default = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStepIndex: 0,
    steps: [
      {
        label: 'Step 1',
        state: StepState.available,
      },
      {
        label: 'Step 2',
        state: StepState.disabled,
      },
      {
        label: 'Step 3',
        state: StepState.disabled,
      },
      {
        label: 'Step 4 - longer text',
        state: StepState.disabled,
      },
      {
        label: 'Step 5',
        state: StepState.disabled,
      },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const lastStep = state.activeStepIndex === state.steps.length - 1;

  return (
    <div>
      <Stepper
        className="stepper-margin"
        steps={state.steps}
        language="en"
        selectedStep={state.activeStepIndex}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />

      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          variant={lastStep ? 'primary' : 'secondary'}
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={lastStep ? undefined : <IconArrowRight />}
        >
          {lastStep ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

Default.parameters = {
  docs: {
    source: { type: 'dynamic' },
  },
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Small = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStepIndex: 0,
    steps: [
      {
        label: 'Step 1',
        state: StepState.available,
      },
      {
        label: 'Step 2',
        state: StepState.disabled,
      },
      {
        label: 'Step 3',
        state: StepState.disabled,
      },
      {
        label: 'Step 4 - longer text',
        state: StepState.disabled,
      },
      {
        label: 'Step 5',
        state: StepState.disabled,
      },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const lastStep = state.activeStepIndex === state.steps.length - 1;

  return (
    <div className="stepper-small">
      <Stepper
        steps={state.steps}
        language="en"
        small
        selectedStep={state.activeStepIndex}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />

      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          variant={lastStep ? 'primary' : 'secondary'}
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={lastStep ? undefined : <IconArrowRight />}
        >
          {lastStep ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithStepHeading = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStepIndex: 0,
    steps: [
      {
        label: 'Step 1 - longer text',
        state: StepState.available,
      },
      {
        label: 'Step 2',
        state: StepState.disabled,
      },
      {
        label: 'Step 3',
        state: StepState.disabled,
      },
      {
        label: 'Step 4',
        state: StepState.disabled,
      },
      {
        label: 'Step 5',
        state: StepState.disabled,
      },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const lastStep = state.activeStepIndex === state.steps.length - 1;

  return (
    <div>
      <Stepper
        headingClassName="stepper-heading"
        steps={state.steps}
        language="en"
        stepHeading
        selectedStep={state.activeStepIndex}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />

      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
          marginLeft: '10px',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          variant={lastStep ? 'primary' : 'secondary'}
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={lastStep ? undefined : <IconArrowRight />}
        >
          {lastStep ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const Overflow = (args) => {
  const reducer = commonReducer(12);

  const initialState = {
    activeStepIndex: 0,
    steps: [
      {
        state: StepState.available,
        label: 'Step 1 - longer text',
      },
      {
        state: StepState.disabled,
        label: 'Step 2',
      },
      {
        state: StepState.disabled,
        label: 'Step 3',
      },
      {
        state: StepState.disabled,
        label: 'Step 4',
      },
      {
        state: StepState.disabled,
        label: 'Step 5',
      },
      {
        state: StepState.disabled,
        label: 'Step 6',
      },
      {
        state: StepState.disabled,
        label: 'Step 7',
      },
      {
        state: StepState.disabled,
        label: 'Step 8',
      },
      {
        state: StepState.disabled,
        label: 'Step 9',
      },
      {
        state: StepState.disabled,
        label: 'Step 10',
      },
      {
        state: StepState.disabled,
        label: 'Step 11',
      },
      {
        state: StepState.disabled,
        label: 'Step 12',
      },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const lastStep = state.activeStepIndex === state.steps.length - 1;

  return (
    <div style={{ maxWidth: '400px' }}>
      <Stepper
        steps={state.steps}
        language="en"
        selectedStep={state.activeStepIndex}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />
      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
          marginLeft: '10px',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          variant={lastStep ? 'primary' : 'secondary'}
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={lastStep ? undefined : <IconArrowRight />}
        >
          {lastStep ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const WithCustomTheme = (args) => {
  const reducer = commonReducer(5);

  const initialState = {
    activeStepIndex: 0,
    steps: [
      {
        label: 'Step 1 - longer text',
        state: StepState.available,
      },
      {
        label: 'Step 2',
        state: StepState.disabled,
      },
      {
        label: 'Step 3',
        state: StepState.disabled,
      },
      {
        label: 'Step 4',
        state: StepState.disabled,
      },
      {
        label: 'Step 5',
        state: StepState.disabled,
      },
    ],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const lastStep = state.activeStepIndex === state.steps.length - 1;

  const theme = {
    '--hds-stepper-color': 'var(--color-black-90)',
    '--hds-step-content-color': 'var(--color-black-90)',
    '--hds-stepper-background-color': 'var(--color-black-10)',
    '--hds-step-background-color': 'var(--color-black-5)',
    '--hds-stepper-focus-border-color': 'var(--color-black-90)',
    '--hds-stepper-disabled-color': 'var(--color-black-30)',
    '--hds-not-selected-step-label-color': 'var(--color-black-90)',
  };

  return (
    <div style={{ backgroundColor: 'var(--color-black-10)' }}>
      <Stepper
        theme={theme}
        steps={state.steps}
        language="en"
        selectedStep={state.activeStepIndex}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />
      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
          marginLeft: '10px',
        }}
      >
        <Button
          theme="black"
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          theme="black"
          variant={lastStep ? 'primary' : 'secondary'}
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={lastStep ? undefined : <IconArrowRight />}
        >
          {lastStep ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

WithCustomTheme.parameters = {
  backgrounds: { default: 'gray' },
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const SimpleFormExample = (args) => {
  const initialState = {
    showErrorSummary: false,
    activeStepIndex: 0,
    steps: [
      {
        state: StepState.available,
        label: 'First name',
      },
      {
        state: StepState.disabled,
        label: 'Last name',
      },
      {
        state: StepState.disabled,
        label: 'Age',
      },
      {
        state: StepState.disabled,
        label: 'Files',
      },
      {
        state: StepState.disabled,
        label: 'Review and send',
      },
    ],
    fields: {
      firstName: {
        value: '',
        visited: false,
      },
      lastName: {
        value: '',
        visited: false,
      },
      age: {
        value: undefined,
        visited: false,
      },
      files: {
        value: null,
        visited: false,
      },
    },
  };
  const lastStep = initialState.steps.length - 1;

  const activeStepIsValid = (state) => {
    if (state.activeStepIndex === 0) {
      // first name
      return state.fields.firstName.value && state.fields.firstName.value.length > 0;
    }
    if (state.activeStepIndex === 1) {
      // last name
      return state.fields.lastName.value && state.fields.lastName.value.length > 0;
    }

    if (state.activeStepIndex === 2) {
      // age
      return state.fields.age.value && state.fields.age.value.length > 0;
    }

    if (state.activeStepIndex === 3) {
      // files
      return state.fields.files.value && state.fields.files.value.length > 0;
    }

    return state.activeStepIndex === 4;
  };

  const weAreInLastAvailableStep = (state) => {
    let indexOfLastNonDisabledStep = 0;
    state.steps.forEach((step, index) => {
      if (step.state !== StepState.disabled && index > indexOfLastNonDisabledStep) {
        indexOfLastNonDisabledStep = index;
      }
    });

    return state.activeStepIndex === indexOfLastNonDisabledStep;
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeField': {
        if (action.newValue.length === 0) {
          return {
            showErrorSummary: state.showErrorSummary,
            activeStepIndex: state.activeStepIndex,
            steps: state.steps,
            fields: {
              ...state.fields,
              [action.fieldName]: {
                value: action.newValue,
                visited: true,
              },
            },
          };
        }

        return {
          showErrorSummary: false,
          activeStepIndex: state.activeStepIndex,
          steps: state.steps.map((step, index) => {
            if (index === state.activeStepIndex) {
              return {
                state: StepState.completed,
                label: step.label,
              };
            }
            return step;
          }),
          fields: {
            ...state.fields,
            [action.fieldName]: {
              value: action.newValue,
              visited: true,
            },
          },
        };
      }
      case 'completeStep': {
        if (!activeStepIsValid(state)) {
          return {
            showErrorSummary: true,
            activeStepIndex: state.activeStepIndex,
            steps: state.steps,
            fields: {
              ...state.fields,
            },
          };
        }
        const activeStepIndex = action.payload === lastStep ? lastStep : action.payload + 1;
        return {
          showErrorSummary: state.showErrorSummary,
          activeStepIndex,
          steps: state.steps.map((step, index) => {
            if (index === action.payload && index !== lastStep) {
              // current one but not last one
              return {
                state: StepState.completed,
                label: step.label,
              };
            }
            if (index === action.payload + 1) {
              // next one
              return {
                state: StepState.available,
                label: step.label,
              };
            }
            return step;
          }),
          fields: {
            ...state.fields,
          },
        };
      }
      case 'setActive': {
        if (!activeStepIsValid(state) && !weAreInLastAvailableStep(state)) {
          return {
            showErrorSummary: true,
            activeStepIndex: state.activeStepIndex,
            steps: state.steps,
            fields: {
              ...state.fields,
            },
          };
        }

        return {
          showErrorSummary: false,
          activeStepIndex: action.payload,
          steps: state.steps.map((step, index) => {
            if (index === action.payload) {
              return {
                state: StepState.available,
                label: step.label,
              };
            }
            if (index === state.activeStepIndex && activeStepIsValid(state)) {
              return {
                state: StepState.completed,
                label: step.label,
              };
            }
            return step;
          }),
          fields: {
            ...state.fields,
          },
        };
      }
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const isLastStep = state.activeStepIndex === state.steps.length - 1;
  const errorRef = useRef(null);

  return (
    <form>
      <h1 style={{ marginTop: '0', fontSize: '52px', lineHeight: '62px' }}>Simple form example</h1>
      <Stepper
        className="stepper-form-validation"
        steps={state.steps}
        language="en"
        stepHeading
        selectedStep={state.activeStepIndex}
        onStepClick={(event, stepIndex) => {
          if (state.showErrorSummary && stepIndex !== state.activeStepIndex) {
            // focus to error summary label
            errorRef.current.children[0].children[0].focus();
          }
          dispatch({ type: 'setActive', payload: stepIndex });
        }}
      />
      {state.showErrorSummary && (
        <div style={{ marginTop: 'var(--spacing-l)' }}>
          <ErrorSummary ref={errorRef} autofocus label="Form contains following errors">
            <ul>
              {state.activeStepIndex === 0 && (
                <li>
                  Error 1: <a href="#firstName">Please enter your first name</a>
                </li>
              )}
              {state.activeStepIndex === 1 && (
                <li>
                  Error 1: <a href="#lastName">Please enter your last name</a>
                </li>
              )}
              {state.activeStepIndex === 2 && (
                <li>
                  Error 1: <a href="#age">Please enter your age</a>
                </li>
              )}
              {state.activeStepIndex === 3 && (
                <li>
                  Error 1: <a href="#files">Please enter a file or files</a>
                </li>
              )}
            </ul>
          </ErrorSummary>
        </div>
      )}
      {[0, 1, 2, 3].includes(state.activeStepIndex) && (
        <div>
          {state.activeStepIndex === 0 && (
            <TextInput
              style={{ width: '300px', paddingTop: 'var(--spacing-l)' }}
              required
              id="firstName"
              label="First name"
              invalid={state.fields.firstName.value.length === 0 && state.fields.firstName.visited === true}
              errorText={
                state.fields.firstName.value.length === 0 &&
                state.fields.firstName.visited === true &&
                'Please enter your first name'
              }
              value={state.fields.firstName.value}
              onChange={(event) =>
                dispatch({ type: 'changeField', fieldName: 'firstName', newValue: event.target.value })
              }
            />
          )}
          {state.activeStepIndex === 1 && (
            <TextInput
              style={{ width: '300px', paddingTop: 'var(--spacing-l)' }}
              required
              id="lastName"
              label="Last name"
              invalid={state.fields.lastName.value.length === 0 && state.fields.lastName.visited === true}
              errorText={
                state.fields.lastName.value.length === 0 &&
                state.fields.lastName.visited === true &&
                'Please enter your last name'
              }
              value={state.fields.lastName.value}
              onChange={(event) =>
                dispatch({ type: 'changeField', fieldName: 'lastName', newValue: event.target.value })
              }
            />
          )}
          {state.activeStepIndex === 2 && (
            <NumberInput
              style={{ width: '300px', paddingTop: 'var(--spacing-l)' }}
              required
              id="age"
              label="Age"
              invalid={
                (!state.fields.age.value || state.fields.age.value.length === 0) && state.fields.age.visited === true
              }
              errorText={
                (!state.fields.age.value || state.fields.age.value.length === 0) &&
                state.fields.age.visited === true &&
                'Please enter your age'
              }
              value={state.fields.age.value}
              onChange={(event) => dispatch({ type: 'changeField', fieldName: 'age', newValue: event.target.value })}
            />
          )}
          {state.activeStepIndex === 3 && (
            <FileInput
              multiple
              label="Select file(s)"
              accept=".png,.jpg"
              defaultValue={state.fields.files.value || null}
              language="en"
              invalid={
                (!state.fields.files.value || state.fields.files.value.length === 0) &&
                state.fields.files.visited === true
              }
              errorText={
                (!state.fields.age.value || state.fields.age.value.length === 0) &&
                state.fields.age.visited === true &&
                'Please enter your age'
              }
              onChange={(event) => dispatch({ type: 'changeField', fieldName: 'files', newValue: event })}
            />
          )}
        </div>
      )}
      {state.activeStepIndex === 4 && (
        <div style={{ marginTop: 'var(--spacing-l)', marginBottom: 'var(--spacing-2-xl)' }}>
          <Card className="stepper-card" border heading="Review your basic information" headingAriaLevel={3}>
            <p style={{ margin: 0 }}>First name: {state.fields.firstName.value}</p>
            <p style={{ margin: 0 }}>Last name: {state.fields.lastName.value}</p>
            <p style={{ margin: 0 }}>Age: {state.fields.age.value}</p>
            <p style={{ margin: 0 }}>Files: {state.fields.files.value.map((file) => file.name).join(', ')}</p>
          </Card>
        </div>
      )}

      <div
        style={{
          height: '140px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: '24px',
          marginTop: 'var(--spacing-xl',
        }}
      >
        <Button
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => {
            if (state.showErrorSummary) {
              // focus to error summary label
              errorRef.current.children[0].children[0].focus();
            }
            dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 });
          }}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          variant={isLastStep ? 'primary' : 'secondary'}
          onClick={() => {
            if (state.showErrorSummary) {
              // focus to error summary label
              errorRef.current.children[0].children[0].focus();
            }
            dispatch({ type: 'completeStep', payload: state.activeStepIndex });
          }}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={isLastStep ? undefined : <IconArrowRight />}
        >
          {isLastStep ? 'Send' : 'Next'}
        </Button>
      </div>
    </form>
  );
};

// args is required for docs tab to show source code
// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
export const States = (args) => {
  return (
    <div className={styles.stepperContainer}>
      <div
        className={styles.stepper}
        style={{
          display: 'grid',
          columnGap: '10px !important',
          gap: '32px',
          justifyItems: 'center',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
        }}
      >
        <Step label="Available" language="en" index={0} stepsTotal={9} state={StepState.available} />
        <Step label="Selected" language="en" index={1} stepsTotal={9} selected state={StepState.available} />
        <Step label="Completed" language="en" index={2} stepsTotal={9} state={StepState.completed} />
        <Step label="Disabled" language="en" index={3} stepsTotal={9} state={StepState.disabled} />
        <Step label="Needs attention" language="en" index={4} stepsTotal={9} state={StepState.attention} />
        <Step
          label="Attention + selected"
          language="en"
          selected
          index={5}
          stepsTotal={9}
          state={StepState.attention}
        />
        <Step label="Paused" language="en" index={6} stepsTotal={9} state={StepState.paused} />
        <Step label="Paused + selected" language="en" selected index={7} stepsTotal={9} state={StepState.paused} />
        <div className={styles.step}>
          <p style={{ fontSize: 'var(--fontsize-body-m)', lineHeight: 'var(--lineheight-l)' }}>Small variant:</p>
          <Step
            label="Available"
            language="en"
            index={8}
            stepsTotal={9}
            small
            state={StepState.available}
            style={{ justifySelf: 'center' }}
          />
        </div>
      </div>
    </div>
  );
};

export const Playground = (args) => {
  const reducer = commonReducer(5);

  const [state, dispatch] = useReducer(reducer, {
    activeStepIndex: args.activeStepIndex,
    steps: [
      {
        label: 'Step 1',
        state: StepState.available,
      },
      {
        label: 'Step 2',
        state: StepState.disabled,
      },
      {
        label: 'Step 3',
        state: StepState.disabled,
      },
      {
        label: 'Step 4',
        state: StepState.disabled,
      },
      {
        label: 'Step 5',
        state: StepState.disabled,
      },
    ],
  });

  const lastStep = state.activeStepIndex === state.steps.length - 1;

  const theme = {
    '--hds-stepper-color': args.stepperColor,
    '--hds-step-content-color': args.stepperContentColor,
    '--hds-stepper-background-color': args.stepperBackgroundColor,
    '--hds-stepper-focus-border-color': args.stepperFocusBorderColor,
    '--hds-stepper-disabled-color': args.stepperDisabledColor,
    '--hds-step-background-color': args.stepBackgroundColor,
    '--hds-not-selected-step-label-color': args.notSelectedStepLabelColor,
  };

  return (
    <div>
      <Stepper
        theme={theme}
        small={args.small}
        stepHeading={args.stepHeading}
        steps={state.steps}
        language="en"
        selectedStep={args.activeStepIndex}
        onStepClick={(event, stepIndex) => dispatch({ type: 'setActive', payload: stepIndex })}
      />
      <div
        style={{
          height: '300px',
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          gap: '24px',
          marginLeft: '10px',
        }}
      >
        <Button
          theme="black"
          disabled={state.activeStepIndex === 0}
          variant="secondary"
          onClick={() => dispatch({ type: 'setActive', payload: state.activeStepIndex - 1 })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconLeft={<IconArrowLeft />}
        >
          Previous
        </Button>
        <Button
          theme="black"
          variant={lastStep ? 'primary' : 'secondary'}
          onClick={() => dispatch({ type: 'completeStep', payload: state.activeStepIndex })}
          style={{ height: 'fit-content', width: 'fit-content' }}
          iconRight={lastStep ? undefined : <IconArrowRight />}
        >
          {lastStep ? 'Send' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

Playground.parameters = {
  loki: { skip: true },
};

Playground.args = {
  stepperColor: '#0000bf',
  stepperContentColor: '#0000bf',
  stepperBackgroundColor: '#ffffff',
  stepperFocusBorderColor: '#0072c6',
  stepperDisabledColor: '#cccccc',
  stepBackgroundColor: '#ffffff',
  notSelectedStepLabelColor: '#0000bf',
  small: false,
  stepHeading: false,
  activeStepIndex: 0,
};

Playground.argTypes = {
  stepperColor: { control: { type: 'color' } },
  stepperContentColor: { control: { type: 'color' } },
  stepperBackgroundColor: { control: { type: 'color' } },
  stepperFocusBorderColor: { control: { type: 'color' } },
  stepperDisabledColor: { control: { type: 'color' } },
  stepBackgroundColor: { control: { type: 'color' } },
  notSelectedStepLabelColor: { control: { type: 'color' } },
  activeStepIndex: { control: { type: 'number', min: 0, max: 4, step: 1 } },
};
