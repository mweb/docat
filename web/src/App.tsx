import { createHashRouter, RouterProvider } from 'react-router-dom'
import React from 'react'
import { ConfigDataProvider } from './data-providers/ConfigDataProvider'
import { ProjectDataProvider } from './data-providers/ProjectDataProvider'
import Claim from './pages/Claim'
import Delete from './pages/Delete'
import Docs from './pages/Docs'
import Help from './pages/Help'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Upload from './pages/Upload'
import EscapeSlashForDocsPath from './pages/EscapeSlashForDocsPath'
import { MessageBannerProvider } from './data-providers/MessageBannerProvider'
import { SearchProvider } from './data-providers/SearchProvider'

function App (): JSX.Element {
  const router = createHashRouter([
    {
      path: '/',
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: <Home />
        },
        {
          path: 'upload',
          element: <Upload />
        },
        {
          path: 'claim',
          element: <Claim />
        },
        {
          path: 'delete',
          element: <Delete />
        },
        {
          path: 'help',
          element: <Help />
        },
        {
          path: ':project',
          children: [
            {
              path: '',
              element: <Docs />
            },
            {
              path: ':version',
              children: [
                {
                  path: '',
                  element: <Docs />
                },
                {
                  path: ':page',
                  children: [
                    {
                      path: '',
                      element: <Docs />
                    },
                    {
                      path: '*',
                      element: <EscapeSlashForDocsPath />
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ])

  return (
    <div className="App">
      <MessageBannerProvider>
        <ConfigDataProvider>
          <ProjectDataProvider>
            <SearchProvider>
              <RouterProvider router={router} />
            </SearchProvider>
          </ProjectDataProvider>
        </ConfigDataProvider>
      </MessageBannerProvider>
    </div>
  )
}

export default App
