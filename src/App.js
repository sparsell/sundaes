import Container from 'react-bootstrap/Container';
import './App.css';
import OrderEntry from './pages/entry/OrderEntry';
import { OrderDetailsProvider } from './contexts/OrderDetails';
import SummaryForm from './pages/summary/SummaryForm';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and entry page need provider */}
        <OrderEntry />
      </OrderDetailsProvider>    
    </Container>
  );
}

export default App;
