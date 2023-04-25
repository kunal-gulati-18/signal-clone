import { Provider } from 'react-redux';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/es/integration/react';
import Routes from './Routes';

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routes />
			</PersistGate>
		</Provider>
	);
}
