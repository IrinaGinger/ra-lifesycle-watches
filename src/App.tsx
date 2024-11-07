import { useState } from 'react';

import Clock from './components/Clock/clock';
import ClockForm from './components/ClockForm/clockform';

import { IForm, IClockData } from './interfaces';

import './App.css';

function App() {
  const [clocks, setClocks] = useState<IClockData[]>([]);

  function handleFormSubmit(form: IForm) {
    setClocks((prevState: IClockData[]) => [...prevState, {
      id: String(Date.now()),
      name: form.name,
      timezone: form.timezone,
      }
    ]);
  }

  function handleDeleteClick(id: string) {
    const actualClocks: IClockData[] = clocks.filter(item => item.id !== id);

    setClocks(actualClocks);
  }

  return (
    <div className="App-container">
      <div className="clock-form-container">
        <ClockForm onFormSubmit={handleFormSubmit} />
      </div>
      
      <div className="clocks-container">
        {clocks.map((clock) => {
          return (
            <Clock
              key={clock.id}
              id={clock.id}
              name={clock.name}
              timezone={clock.timezone}
              onDeleteClick={handleDeleteClick}
            />
          );
        })}
      </div>
    </div>
  )
}

export default App;
