import dynamic from 'next/dynamic';
import Highlight from 'react-highlight'

export const PasskeySnippet = ({ snippet, isDark }: { snippet: string, isDark: boolean }) => {
  //@TODO: Only works from light -> dark and once lol. Need to figure out how to make it work both ways.
  const ThemeComponent = isDark ?
    dynamic(() => import(`./DarkTheme`), {
      ssr: false,
    }) :
    dynamic(() => import(`./LightTheme`), {
      ssr: false,
    })


  return (
    <>
      {ThemeComponent && <ThemeComponent />}
      <Highlight className='typescript' style={{ fontSize: '10px' }}>
        {snippet}
      </Highlight>
    </>
  )
};