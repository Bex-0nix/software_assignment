import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      {/* <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link rel="preconnect" href="https://fonts.gstatic.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Playwrite+AU+VIC+Guides&display=swap" rel="stylesheet"></link> */}
      <title>Document</title>
    </head>
    <body style={{padding: 0, margin: 0}}>
      {children}
    </body>
    </html>
  )
}
