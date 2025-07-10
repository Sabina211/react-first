import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import './styles.css';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import { BrowserRouter } from 'react-router-dom';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
root.render(
	<Provider store={store}>
		<StrictMode>
			<BrowserRouter basename="/react-first">
				<App />
			</BrowserRouter>
		</StrictMode>
	</Provider>
);
