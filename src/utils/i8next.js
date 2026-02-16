import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

i18next
    .use(initReactI18next)
    .init({
    fallbackLng: 'bg',
    debug: true,
    resources: {
        en: {
            translation: {
                SignIn: "Sign in",
                Login: "Login",
                Compare: "Compare"
            }
        },
        bg: {
            translation: {
                SignIn: "Вход",
                Login: "Влез",
                Compare: "Сравни"
            }
        }
    }
});