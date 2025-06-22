import React, { useEffect, useRef } from "react";
import ePub from "epubjs";

const EpubReader = ({ url }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!url || !viewerRef.current) return;

    const book = ePub(url);

    const rendition = book.renderTo(viewerRef.current, {
      width: "100%",
      height: "100vh",
      contained: true, // ✅ Prevent iframe srcdoc sandbox
    });

    rendition.display();

    return () => {
      rendition.destroy();
      book.destroy();
    };
  }, [url]);

  return (
    <div
      ref={viewerRef}
      id="epub-viewer"
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    />
  );
};

export default EpubReader;
