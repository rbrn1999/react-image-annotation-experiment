import { useState, useEffect } from 'react';
import { useSelection, useAnnotation, ImageAnnotation, useAnnotations, useAnnotator } from '@annotorious/react';

// This component uses the Annotorious hooks
export default function Annotation() {
    const { selected, event } = useSelection();
    const [targetAnnotationId, setTargetAnnotationId] = useState<string | undefined>(undefined);
    const annotations: ImageAnnotation[] = useAnnotations();
    const anno = useAnnotator();
    
    function removeAnnotation() {
        anno.removeAnnotation(targetAnnotationId ?? "");
    }
    useEffect(() => {
        if (selected && selected.length > 0) {
            setTargetAnnotationId(selected[0].annotation.id);
        } else {
            setTargetAnnotationId(undefined);
        }
    }, [selected, event]);
    
    return (
        // Area to display the details of the selected annotation
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
            <button onClick={removeAnnotation}> Remove selected annotation!</button>
            <div>{targetAnnotationId}</div>
            <div>
                <ul>
                    {annotations.map(a => (
                        <li key={a.id}>{a.id}</li>
                    ))}
                </ul>
            </div>
            <AnnotationDetails key={targetAnnotationId} id={targetAnnotationId} />
        </div>

    );
}

function AnnotationDetails({ id }: { id: string | undefined }) {
    const annotationDetails = useAnnotation(id ?? "");

    return (<div>
        <h2>Selected Annotation Details</h2>
        {annotationDetails ? (
            <pre>{JSON.stringify(annotationDetails, null, 2)}</pre>
        ) : (
            <p>Select an annotation on the image to see its details.</p>
        )}
    </div>
    )
}
