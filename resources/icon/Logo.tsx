import * as React from "react"
import Svg, { Path } from "react-native-svg"

export default function Logo(props: any) {
  return (
    <Svg
      width={88}
      height={88}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M44 0C19.698 0 0 19.698 0 44s19.698 44 44 44 44-19.698 44-44S68.302 0 44 0zm28.774 42.068l-10.88-10.886v20.843h-3.305v-20.55l-19.565 19.56-2.335-2.336L55.97 29.416H35.654v-3.304h21.159L45.655 14.95l2.335-2.336 10.6 10.593V12.73h3.303V23.5l7.865-7.865 2.336 2.336-8.142 8.141H75v3.304H64.793L75.11 39.733l-2.336 2.335z"
        fill="#A055FF"
      />
    </Svg>
  )
}
