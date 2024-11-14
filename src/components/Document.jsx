import { Document as DocumentComponent } from "@react-pdf/renderer";

const Document = ({ pdfMode, children }) => {
  return (
    <>
      {pdfMode ? <DocumentComponent>{children}</DocumentComponent> : children}
    </>
  );
};

export default Document;
