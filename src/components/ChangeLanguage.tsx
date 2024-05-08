import { languages, getLangFromUrl } from "../i18n"

export default function ChangeLanguage() {
    const currentRoute = window.location.pathname

    const lang = getLangFromUrl(new URL(window.location.href));
    const langToChange = Object.keys(languages).find((key) => key !== lang);
    const changeLang = (langToChange: string) => {
        if (langToChange == 'en') window.location.href = currentRoute.replace('/es/', '/')
        else window.location.href = currentRoute.replace('/', '/es/')
    }

    return (
        <button onClick={() => changeLang(langToChange as keyof typeof languages)} className="font-bold uppercase cursor-pointer p-1" >{langToChange}</button>
    )
}
