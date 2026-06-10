import { languages, getLangFromUrl } from "../i18n"

export default function ChangeLanguage() {
    const lang = getLangFromUrl(new URL(window.location.href));
    const langToChange = Object.keys(languages).find((key) => key !== lang) as keyof typeof languages;

    const changeLang = () => {
        const currentRoute = window.location.pathname;
        if (langToChange === 'en') {
            window.location.href = currentRoute.replace(/^\/es/, '') || '/';
        } else {
            window.location.href = '/es' + currentRoute;
        }
    }

    return (
        <button onClick={changeLang} className="font-bold uppercase cursor-pointer p-1">{langToChange}</button>
    )
}
