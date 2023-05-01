import { useColorMode } from "@chakra-ui/react"
import * as React from "react"
import { SVGProps } from "react"
export const PasskeyImageMain = (props: SVGProps<SVGSVGElement>) => {
  const { colorMode } = useColorMode()
  const stroke = colorMode === 'dark' ? '#fff' : '#000';
  const fill = colorMode === 'dark' ? '#fff' : '#000';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 1.5,
      }}
      viewBox="0 0 106 65"
      {...props}
    >
      <path
        d="m432 96 7.867-4.066L432 88v-8l16-8h16.265l15.794 7.897v8.056l-16.271 8.135h-15.514l-48.108 24.054v7.775l-8.485 4.242L376 124l56-28Z"
        style={{
          fill: "none",
          stroke,
          strokeWidth: "1.33px",
        }}
        transform="translate(-375.333 -71.333)"
      />
      <path
        d="m61.073 22.464-4.363-2.266-.043-3.531 7.896 3.948-3.49 1.849Z"
        style={{
          fill,
        }}
      />
      <path
        d="m456 76-16.133 8.066 16.089 8.045 16.04-8.021L456 76Z"
        style={{
          fill: "none",
          stroke,
          strokeWidth: 1,
        }}
        transform="translate(-375.333 -71.333)"
      />
      <path
        d="m96.663 12.757-4.442 2.22-11.622-5.796-11.439 5.732-4.493-2.246L80.39 4.805l16.273 7.952ZM104.726 16.697v3.765l-16.059 7.903H72.531L52.366 38.516v4.26L44.514 46.7l-3.807-1.904-7.961 3.981 3.71 1.994-3.789 1.895-4.066-2.034-.171 7.915-11.763 5.817-16-8v-3.283l16 7.492 8-4 .088-7.956 48-24 15.779.023 16.192-7.944Z"
        style={{
          fill,
        }}
      />
    </svg>
  )
}
