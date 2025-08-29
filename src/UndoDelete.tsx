interface UndoDeleteProps {
    undoDelete: () => void;
    disabled: boolean;
}

export default function UndoDelete({ undoDelete, disabled }: UndoDeleteProps) {
    return (
        <div>
        <button onClick={undoDelete} disabled={disabled} >
            Undo Delete 
        </button>
        </div>
    );
}