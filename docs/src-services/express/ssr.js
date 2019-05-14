import { createSSRRouter } from '@marcopeg/react-ssr/lib/create-ssr-router'
import { EXPRESS_ROUTE, EXPRESS_SSR } from './hooks'

export const register = ({ registerAction, createHook }) =>
    registerAction({
        hook: EXPRESS_ROUTE,
        name: EXPRESS_SSR,
        trace: __filename,
        handler: async ({ app, settings }) => {
            const port = settings.port || process.env.REACT_APP_PORT || process.env.PORT || '8080'

            const options = {
                ...(settings.ssr || {}),
                port,
            }

            await createHook(EXPRESS_SSR, {
                async: 'serie',
                args: { options },
            })

            app.use(createSSRRouter(options))
        },
        priority: -999,
        route: '/',
    })
