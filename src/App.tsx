import { useEffect, useState } from "react";
import type { Call } from "./types/calls";
import { listCalls } from "./services/calls-service";
import CallForm from "./components/CallForm";
import CallList from "./components/CallList";

function App() {
    const [calls, setCalls] = useState<Call[]>([]);

    useEffect(() => {
        listCalls().then(setCalls);
    }, []);

    function handleCallCreated() {
        listCalls().then(setCalls);
    }

    return (
        <div>
            <header>
                <h1>CallAlly</h1>
            </header>
            <main>
                <section>
                    <h2>Novo Chamado</h2>
                    <CallForm onCallCreated={handleCallCreated} />
                </section>

                <section>
                    <h2>Chamados</h2>
                    <CallList items={calls}/>
                    <p>Lista de chamados virá aqui</p>
                </section>
            </main>
        </div>
    );
}

export default App;