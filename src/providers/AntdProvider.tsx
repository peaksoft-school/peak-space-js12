import { FC, ReactNode } from 'react';
import { ConfigProvider, theme } from 'antd';

interface AntdProviderProps {
	children: ReactNode;
}

const AntdProvider: FC<AntdProviderProps> = ({ children }) => {
	const antdThemeConfig = {
		algorithm: theme.defaultAlgorithm,
		token: {
			// colorPrimary: '#9336fd',
			colorPrimary: '#535288',
			borderRadius: 6
			// colorBgContainer: '#2a2a2a'
		},
		components: {
			Input: {
				// colorPrimary: '#444444',
				colorBgContainer: '#fafafa',
				algorithm: true // Enable algorithm
			}
		}
	};
	return (
		<>
			<ConfigProvider theme={antdThemeConfig}>{children}</ConfigProvider>
		</>
	);
};
export default AntdProvider;
