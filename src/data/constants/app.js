export const
	APP_BASE_URL 		= process.env.APP_BASE_URL || 'http://localhost:2000',
	WORKERS_BASE_URL	= process.env.WORKERS_BASE_URL || 'http://localhost:3000/worker',
	LEGACY_WORKERS_BASE_URL=WORKERS_BASE_URL

export const
	API_ENDPOINT_URL 	= `${process.env.NODE_ENV == 'production' || RAINDROP_ENVIRONMENT == 'react-native' ? process.env.API_ENDPOINT_URL : 'http://localhost:3000' }/v1/`,
	API_RETRIES 		= 3,
	API_TIMEOUT 		= 30000,
	FAVICON_URL 		= `${WORKERS_BASE_URL}/favicon`,
	RENDER_URL 			= `${WORKERS_BASE_URL}/render`,
	PREVIEW_URL			= process.env.PREVIEW_URL || 'http://localhost:3000/preview'