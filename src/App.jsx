import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WebSearch from './components/core/websearch/WebSearch'
import Layout from './components/core/layout/Layout'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from './pages/Home'
import Results from './pages/Results'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Layout />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/results',
        element:<Results />
      }

    ]
  }
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
