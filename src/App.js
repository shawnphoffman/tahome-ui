import { memo, Suspense } from 'react'
import * as Sentry from '@sentry/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ThemeProvider from 'context/ThemeContext'
import { useDeviceTheme } from 'hooks/useDeviceTheme'
import themeConditional from 'hooks/useThemeConditional'

import AppRoutes from './AppRoutes'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			suspense: true,
			staleTime: 30000,
		},
	},
})

function App() {
	// Theme
	const theme = useDeviceTheme()
	const themeClass = themeConditional(theme)

	return (
		<Sentry.ErrorBoundary fallback={<div>Uh Oh!</div>}>
			<ThemeProvider>
				<div className={themeClass}>
					<Suspense fallback={<div>Loading...</div>}>
						<QueryClientProvider client={queryClient}>
							<AppRoutes />
						</QueryClientProvider>
					</Suspense>
				</div>
			</ThemeProvider>
		</Sentry.ErrorBoundary>
	)
}

export default memo(App)
