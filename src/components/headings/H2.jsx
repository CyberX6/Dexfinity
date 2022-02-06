import React from 'react'
import ReactHtmlParser from 'react-html-parser'

export const H2 = ({ text }) => {
  return <h2 className="custom-h2">{ReactHtmlParser(text)}</h2>
}
