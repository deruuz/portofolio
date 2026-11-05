export type Lang = 'en' | 'id' | 'ja'

export const LANGS: { key: Lang; label: string }[] = [
  { key: 'en', label: 'EN' },
  { key: 'id', label: 'ID' },
  { key: 'ja', label: '日本語' },
]

export function useLang() {
  const lang = useState<Lang>('lang', () => 'en')
  const setLang = (l: Lang) => { lang.value = l }
  return { lang, setLang }
}
