import React from 'react';

import { IClockProps } from '../../interfaces';

import './clock.css';

interface ITimeFormat {
    hour: number,
    min: number,
    sec: number,
};

class Clock extends React.Component<IClockProps, ITimeFormat> {
    constructor(props: IClockProps) {
        super(props);

        this.state = this.getInitialState(props.timezone);
    }

    getUserTime(timezone: string) {
        const parsedTimezone: number = +Number.parseFloat(timezone);
        const hoursTimezone: number = Math.trunc(parsedTimezone);
        const minutesTimezone: number = Number((parsedTimezone % 1).toFixed(2)) * 100;
        const userTime = new Date();
        const timezoneOffset: number = userTime.getTimezoneOffset();
        const hoursTimezoneOffset: number = Math.floor(timezoneOffset / 60);
        const minutesTimezoneOffset: number = timezoneOffset % 60;

        userTime.setHours(userTime.getHours() + hoursTimezoneOffset + hoursTimezone);
        userTime.setMinutes(userTime.getMinutes() + minutesTimezoneOffset + minutesTimezone);
       
        return userTime;
    }

    getInitialState(timezone: string) {
        const currentTime = this.getUserTime(timezone);

        const currentHour: number = currentTime.getHours();
        const currentMin: number = currentTime.getMinutes();
        const currentSec: number = currentTime.getSeconds();

        const hourPos: number = (currentHour * 360 / 12) + (currentMin * (360 / 60) / 12);
        const minPos: number = (currentMin * 360 / 60) + (currentSec * (360 / 60) / 60);
        const secPos: number = currentSec * 360 / 60;

        return {
            hour: hourPos,
            min: minPos,
            sec: secPos,
        };
    }

    tick() {
        this.setState({
            hour: this.state.hour + (3 / 360),
            min: this.state.min + (6 / 60),
            sec: this.state.sec + 6,
        })
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    render() {
        return (
            <div className="clock-box" id={this.props.id}>
                <h3 className="clock-name">{this.props.name}</h3>
                <svg className="clock" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
                    <g className="clock-face">
                        <circle className="clock-face-circle" cx="300" cy="300" r="254" />    
                        <circle className="clock-face-center" cx="300" cy="300" r="16" />
                    </g>
                    <g className="clock-hour" style={{ transform: `rotate(${this.state.hour}deg)` }}>
                        <marker id="hour-arrowhead" markerWidth="5" markerHeight="5"
                            refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" />
                        </marker>
                        <path className="clock-hour-hand" d="M300 298V142" marker-end="url(#hour-arrowhead)" />
                        <circle className="hand-box" cx="300" cy="300" r="254" />
                    </g>
                    <g className="clock-minute" style={{ transform: `rotate(${this.state.min}deg)` }}>
                        <marker id="minute-arrowhead" markerWidth="5" markerHeight="5"
                            refX="4" refY="2.5" orient="auto">
                            <polygon points="0 0, 5 2.5, 0 5" />
                        </marker>
                        <path className="clock-minute-hand" d="M300 298V67" marker-end="url(#minute-arrowhead)" />
                        <circle className="hand-box" cx="300" cy="300" r="254" />
                    </g>
                    <g className="clock-second" style={{ transform: `rotate(${this.state.sec}deg)` }}>                
                        <path className="clock-second-hand" d="M300 300V60" />
                        <circle className="hand-box" cx="300" cy="300" r="254" />
                    </g>
                </svg>
                <button 
                    type="submit"
                    className="clock-delete" 
                    onClick={(e) => {
                        e.preventDefault();
                        this.props.onDeleteClick(this.props.id);
                        }
                    }
                >
                    &#10005;
                </button>
            </div>
        );
    }
}

export default Clock;