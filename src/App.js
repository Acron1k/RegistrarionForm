import styles from './App.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import React, { useEffect, useRef } from 'react';

const fieldScheme = yup.object().shape({
	email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i, 'Введите корректный email'),
	password: yup
		.string()
		.matches(
			/^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20})$/,
			'Пароль должен содержать: цифру, строчную букву, заглавную букву, специальный символ, длину от 6 до 20 символов',
		),
	confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать!'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(fieldScheme),
	});
	const registerBtnRef = useRef(null);

	useEffect(() => {
		const isFormValid = Object.keys(errors).length === 0;
		if (isFormValid) {
			registerBtnRef.current.focus();
		}
	}, [errors]);

	const onSubmitForm = (formData) => {
		console.log(formData);
	};

	return (
		<div className={styles.App}>
			<div className={styles.formWindow}>
				<p className={styles.title}>Регистрация</p>
				<form onSubmit={handleSubmit(onSubmitForm)}>
					<div className={styles.emailBox}>
						<input
							className={styles.inputBox}
							type="email"
							name="email"
							{...register('email')}
							placeholder="Email"
						/>
						{errors.email && <div className={styles.errorMessage}>{errors.email.message}</div>}
					</div>
					<div className={styles.passwordBox}>
						<input
							className={styles.inputBox}
							type="password"
							name="password"
							{...register('password')}
							placeholder="Password"
						/>
						{errors.password && <div className={styles.errorMessage}>{errors.password.message}</div>}
					</div>
					<div className={styles.confirmPasswordBox}>
						<input
							className={styles.inputBox}
							type="password"
							name="confirmPassword"
							{...register('confirmPassword')}
							placeholder="Confirm Password"
						/>
						{errors.confirmPassword && (
							<div className={styles.errorMessage}>{errors.confirmPassword.message}</div>
						)}
					</div>

					<button
						type="submit"
						className={styles.subBtn}
						disabled={Object.keys(errors).length > 0}
						ref={registerBtnRef}
					>
						Зарегистрироваться
					</button>
				</form>
			</div>
		</div>
	);
};
