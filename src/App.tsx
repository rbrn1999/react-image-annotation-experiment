import { Annotorious, ImageAnnotator } from '@annotorious/react';
import '@annotorious/react/annotorious-react.css';
import Annotation from './Annotation';

// This component sets up the Annotorious context and the ImageAnnotator
export default function App() {
  return (
    <Annotorious>
      <ImageAnnotator>
        <img src='example.png' alt="Image to annotate" />
      </ImageAnnotator>
      {/*
        Render the component that uses the hooks *inside* the Annotorious context.
        Pass any necessary props (like the image URL if needed for display in the details).
      */}
      <Annotation />
    </Annotorious>
  );
}
