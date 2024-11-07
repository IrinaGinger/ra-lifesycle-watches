export interface IForm {
    name: string;
    timezone: string;
}

export interface IFormProps {
    onFormSubmit: (form: IForm) => void,
}

export interface IClockData {
    id: string,
    name: string,
    timezone: string,
};

export interface IClockProps {
    id: string,
    name: string,
    timezone: string,
    onDeleteClick: (id: string) => void,
}