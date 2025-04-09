import { useState, ChangeEvent } from 'react';

export const useForm = <T extends Record<string, string>>(inputValues: T) => {
	const [formValues, setFormValues] = useState(inputValues);

	const handleInputsChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;
		setFormValues({ ...formValues, [name]: value });
	};
	return { formValues, handleInputsChange, setFormValues };
};
