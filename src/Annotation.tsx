import { useState, useEffect } from 'react';
import { useSelection, useAnnotation } from '@annotorious/react';

// This component uses the Annotorious hooks
export default function Annotation() {
    const { selected, event } = useSelection();
    const [targetAnnotationId, setTargetAnnotationId] = useState<string | undefined>(undefined);

    useEffect(() => {
        // console.log('useSelection hook updated. Selected:', selected, 'Event:', event); // Keep logs for debugging
        if (selected && selected.length > 0) {
            setTargetAnnotationId(selected[0].annotation.id);
        } else {
            setTargetAnnotationId(undefined);
        }
    }, [selected, event]);

    return (
        // Area to display the details of the selected annotation
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <div>{targetAnnotationId}</div>
            <h2>Selected Annotation Details</h2>
            <AnnotationDetails key={targetAnnotationId} id={targetAnnotationId} />
        </div>
    );
}

function AnnotationDetails({ id }: { id: string | undefined }) {
    const annotationDetails = useAnnotation(id ?? "");

    return (<div>
        {annotationDetails ? (
            <pre>{JSON.stringify(annotationDetails, null, 2)}</pre>
        ) : (
            <p>Select an annotation on the image to see its details.</p>
        )}
    </div>
    )
}
