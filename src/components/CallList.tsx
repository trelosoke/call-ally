import type { Call } from "../types/calls";

type CallListProps = {
    items: Call[]
}

function CallList({ items }: CallListProps) {
    return (
        <ul>
            {items.map(call =>
                <li key={call.id}>{call.title}</li>
            )}
        </ul>
    );
}

export default CallList;