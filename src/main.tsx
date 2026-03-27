import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <AppRouter />
);
